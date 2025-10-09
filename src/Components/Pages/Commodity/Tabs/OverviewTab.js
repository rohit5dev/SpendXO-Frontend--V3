import React, { useEffect, useState, useRef, useCallback } from "react";
import Chart from "react-apexcharts";
import { Dropdown } from "react-bootstrap";
import "../css/CommodityIntelligenceNew.css";
import "leaflet/dist/leaflet.css";
import { commodityOverviewData } from "../Data/overviewData";
import { Tabs, Tab, Form } from "react-bootstrap";

const OverviewTab = () => {
  // Tabs
  const [activeChartTab, setActiveChartTab] = useState("PriceTrend");

  // Global filters
  const [globalSelectedCommodity, setGlobalSelectedCommodity] =
    useState("hrcPriceData");
  const [globalSelectedYear, setGlobalSelectedYear] = useState("All Years");

  // Chart specific filter
  const [forecastingDataBasis, setForecastingDataBasis] =
    useState("Monthly Data");

  // State for selected news (for card display)
  const [forecastingSelectedNews, setForecastingSelectedNews] = useState([]);
  const [forecastingSelectedNewsDate, setForecastingSelectedNewsDate] =
    useState(null);

  const forecastingChartContainerRef = useRef(null);
  const forecastingChartRef = useRef(null);

  // Commodity options based on keys in commodityPricingData
  const forecastingCommodityOptions = [
    { key: "hrcPriceData", label: "HRC Price" },
    { key: "crcPriceData", label: "CRC Price" },
  ];

  // Helper function to parse dates
  const forecastingParseDate = (dateString) => {
    if (!dateString) {
      console.warn("Invalid date string:", dateString);
      return new Date();
    }
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Extract unique years from all commodities data
  const forecastingUniqueYears = React.useMemo(() => {
    const allYears = new Set();

    // Add years from all commodities
    forecastingCommodityOptions.forEach((commodity) => {
      const data =
        commodityOverviewData.commodityPricingData[commodity.key] || [];
      data.forEach((item) => {
        if (item.date) {
          const year = forecastingParseDate(item.date).getFullYear();
          allYears.add(year);
        }
      });
    });

    return ["All Years", ...Array.from(allYears).sort((a, b) => b - a)];
  }, []);

  // Filter data based on selected year
  const forecastingFilterDataByYear = (data, year) => {
    if (year === "All Years") return data;
    return data.filter((item) => {
      const parsedDate = forecastingParseDate(item.Date || item.date);
      return parsedDate.getFullYear().toString() === year;
    });
  };

  // Filter data by basis (Monthly, Quarterly, Yearly)
  const forecastingFilterDataByBasis = (basis, data) => {
    const selectedData = data;
    if (basis === "Monthly Data") {
      return selectedData;
    } else if (basis === "Quarterly Data") {
      const quarterlyData = [];
      for (let i = 0; i < selectedData.length; i += 3) {
        const quarterData = selectedData.slice(i, i + 3);
        const avgPrice =
          quarterData.reduce(
            (sum, item) => sum + (item.HRC_Price || item.price || 0),
            0
          ) / quarterData.length;
        quarterlyData.push({
          Date: quarterData[quarterData.length - 1].Date,
          HRC_Price: avgPrice,
          isForecasted: quarterData[quarterData.length - 1].isForecasted,
          best_buy_price: quarterData[quarterData.length - 1].best_buy_price,
        });
      }
      return quarterlyData;
    } else if (basis === "Yearly Data") {
      const yearlyData = [];
      const yearMap = {};

      selectedData.forEach((item) => {
        const year = forecastingParseDate(item.Date || item.date).getFullYear();
        if (!yearMap[year]) {
          yearMap[year] = {
            total: 0,
            count: 0,
            isForecasted: item.isForecasted,
            best_buy_price: item.best_buy_price,
          };
        }
        yearMap[year].total += item.HRC_Price || item.price || 0;
        yearMap[year].count += 1;
      });

      for (const year in yearMap) {
        yearlyData.push({
          Date: `31-12-${year}`,
          HRC_Price: yearMap[year].total / yearMap[year].count,
          isForecasted: yearMap[year].isForecasted,
          best_buy_price: yearMap[year].best_buy_price,
        });
      }

      return yearlyData;
    }
    return selectedData;
  };

  // Dynamic y-axis and legend name based on selected commodity
  const forecastingYAxisTitle =
    globalSelectedCommodity === "hrcPriceData"
      ? "HRC Price (INR/Tonne)"
      : "CRC Price (INR/Tonne)";
  const forecastingLegendName =
    globalSelectedCommodity === "hrcPriceData" ? "HRC Price" : "CRC Price";

  // Prepare filtered data for chart - SEPARATE historical and forecasted data
  const commodityData = React.useMemo(
    () =>
      commodityOverviewData.commodityPricingData[globalSelectedCommodity] || [],
    [globalSelectedCommodity]
  );

  // Separate historical and forecasted data with best buy prices
  const historicalData = React.useMemo(
    () =>
      commodityData
        .filter((item) => item.price !== undefined)
        .map((item) => ({
          Date: item.date,
          HRC_Price: item.price,
          isForecasted: false,
          best_buy_price: item.best_buy_price,
        }))
        .sort(
          (a, b) => forecastingParseDate(a.Date) - forecastingParseDate(b.Date)
        ),
    [commodityData]
  );

  const forecastedData = React.useMemo(
    () =>
      commodityData
        .filter((item) => item.forecasted_price !== undefined)
        .map((item) => ({
          Date: item.date,
          HRC_Price: item.forecasted_price,
          isForecasted: true,
          best_buy_price: item.best_buy_price,
        }))
        .sort(
          (a, b) => forecastingParseDate(a.Date) - forecastingParseDate(b.Date)
        ),
    [commodityData]
  );

  // Combine and filter by year
  const allCommodityData = React.useMemo(
    () => [...historicalData, ...forecastedData],
    [historicalData, forecastedData]
  );

  const forecastingFilteredCommodityData = React.useMemo(
    () =>
      forecastingFilterDataByYear(allCommodityData, globalSelectedYear).sort(
        (a, b) => forecastingParseDate(a.Date) - forecastingParseDate(b.Date)
      ),
    [allCommodityData, globalSelectedYear]
  );

  const forecastingFilteredChartData = React.useMemo(
    () =>
      forecastingFilterDataByBasis(
        forecastingDataBasis,
        forecastingFilteredCommodityData
      ),
    [forecastingDataBasis, forecastingFilteredCommodityData]
  );

  // Filter KPIs data based on global selections
  const filteredKPIs = React.useMemo(() => {
    const baseKPIs = commodityOverviewData.kpis || [];

    // Filter KPIs based on selected commodity and year
    return baseKPIs.map((kpi) => {
      if (globalSelectedCommodity === "hrcPriceData") {
        // Return HRC specific KPIs or all if not commodity specific
        return {
          ...kpi,
          items: kpi.items.map((item) => ({
            ...item,
            // Update labels for HRC
            label: item.label.replace(/CRC/g, "HRC"),
            value: item.value.replace(/CRC/g, "HRC"),
          })),
        };
      } else {
        // Return CRC specific KPIs
        return {
          ...kpi,
          items: kpi.items.map((item) => ({
            ...item,
            // Update labels for CRC
            label: item.label.replace(/HRC/g, "CRC"),
            value: item.value.replace(/HRC/g, "CRC"),
          })),
        };
      }
    });
  }, [globalSelectedCommodity, globalSelectedYear]);

  // Filter negotiation levers data based on global selections
  const filteredNegotiationLevers = React.useMemo(() => {
    const baseLevers = commodityOverviewData.negotiationLeversData || [];

    // Filter based on selected commodity
    if (globalSelectedCommodity === "hrcPriceData") {
      return baseLevers.filter(
        (lever) =>
          lever.quarter.includes("HRC") || !lever.quarter.includes("CRC")
      );
    } else {
      return baseLevers.filter(
        (lever) =>
          lever.quarter.includes("CRC") || !lever.quarter.includes("HRC")
      );
    }
  }, [globalSelectedCommodity]);

  // Separate filtered data into historical and forecasted for chart rendering
  const historicalChartData = forecastingFilteredChartData.filter(
    (item) => !item.isForecasted
  );
  const forecastedChartData = forecastingFilteredChartData.filter(
    (item) => item.isForecasted
  );

  const forecastingFormatXAxisLabel = (dateString, basis) => {
    const date = forecastingParseDate(dateString);
    if (basis === "Yearly Data") {
      return date.getFullYear().toString();
    } else if (basis === "Quarterly Data") {
      const month = date.getMonth();
      const year = date.getFullYear();
      if (month >= 0 && month <= 2) return `Jan-Mar ${year}`;
      if (month >= 3 && month <= 5) return `Apr-Jun ${year}`;
      if (month >= 6 && month <= 8) return `Jul-Sep ${year}`;
      return `Oct-Dec ${year}`;
    } else {
      return date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
  };

  // Helper to get news for a given date (match by month and year only)
  const forecastingGetNewsForDate = (dateString) => {
    const targetDate = forecastingParseDate(dateString);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    const news = (commodityOverviewData.newsData || []).filter((newsItem) => {
      const newsDate = forecastingParseDate(newsItem.published);
      return (
        newsDate.getMonth() === targetMonth &&
        newsDate.getFullYear() === targetYear
      );
    });
    return news;
  };

  // Chart point click handler
  const forecastingHandleChartClick = useCallback(
    (event, chartContext, config) => {
      setTimeout(() => {
        try {
          if (
            !config ||
            config.dataPointIndex === undefined ||
            config.dataPointIndex === -1
          ) {
            console.log("Invalid chart click config:", config);
            return;
          }

          if (
            !forecastingFilteredChartData ||
            forecastingFilteredChartData.length === 0
          ) {
            console.log("No chart data available");
            return;
          }

          const dataIndex = config.dataPointIndex;

          if (
            dataIndex < 0 ||
            dataIndex >= forecastingFilteredChartData.length
          ) {
            console.log("Data index out of bounds:", dataIndex);
            return;
          }

          const dataPoint = forecastingFilteredChartData[dataIndex];
          if (!dataPoint || !dataPoint.Date) {
            console.log("Invalid data point:", dataPoint);
            return;
          }

          const date = dataPoint.Date;
          const newsList = forecastingGetNewsForDate(date);

          console.log(
            "Chart clicked - Date:",
            date,
            "News found:",
            newsList.length
          );

          setForecastingSelectedNews(newsList);
          setForecastingSelectedNewsDate(date);
        } catch (error) {
          console.error("Error handling chart click:", error);
        }
      }, 100);
    },
    [forecastingFilteredChartData]
  );

  // CHART OPTIONS - Updated to include best buy price markers
  const forecastingOptionsHRC = React.useMemo(
    () => ({
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
        animations: {
          enabled: false,
        },
        events: {
          dataPointSelection: forecastingHandleChartClick,
        },
      },
      stroke: {
        curve: "smooth",
        width: [2, 2, 2, 2, 0], // No stroke for scatter points
        dashArray: [0, 0, 2, 0, 0], // only forecasted line is dotted
        colors: ["#38858e", "#4ac7d4ff", "#db3f3fff", "#ffcdcdff", "#00FF00"],
      },
      markers: {
        size: [0, 0, 0, 0, 6], // Only show markers for best buy prices
        colors: ["#38858e", "#4ac7d4ff", "#db3f3fff", "#ffcdcdff", "#00FF00"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 8,
        },
      },
      xaxis: {
        categories: forecastingFilteredChartData.map((item) =>
          forecastingFormatXAxisLabel(item.Date, forecastingDataBasis)
        ),
        labels: {
          rotate: -45,
          style: {
            fontSize: "10px",
          },
        },
      },
      yaxis: {
        title: {
          text: forecastingYAxisTitle,
        },
        labels: {
          formatter: function (value) {
            return value ? value.toLocaleString() : "0";
          },
        },
      },
      tooltip: {
        shared: false,
        followCursor: false,
        fixed: {
          enabled: false,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          try {
            if (
              !forecastingFilteredChartData ||
              dataPointIndex < 0 ||
              dataPointIndex >= forecastingFilteredChartData.length ||
              !forecastingFilteredChartData[dataPointIndex] ||
              !forecastingFilteredChartData[dataPointIndex].Date
            ) {
              return "<div style='padding:8px 12px'>No data available</div>";
            }

            const dataPoint = forecastingFilteredChartData[dataPointIndex];
            const date = dataPoint?.Date;
            const price = dataPoint?.HRC_Price;
            const isForecasted = dataPoint?.isForecasted;
            const bestBuyPrice = dataPoint?.best_buy_price;

            if (!date || price === undefined) {
              return "<div style='padding:8px 12px'>Invalid data</div>";
            }

            const newsList = forecastingGetNewsForDate(date);

            let tooltipHtml = `<div style="padding:8px 12px; max-width: 600px;"><strong>${forecastingFormatXAxisLabel(
              date,
              forecastingDataBasis
            )}</strong><br/>`;
            tooltipHtml += `<span>Price: ₹${price.toLocaleString()}/Tonne ${
              isForecasted
                ? '<span style="color:#ff6b6b;">(Forecasted)</span>'
                : ""
            }</span>`;

            // Add best buy price to tooltip if available
            if (bestBuyPrice !== undefined) {
              tooltipHtml += `<br/><span style="color:#00AA00; font-weight:bold;">Best Buy Price: ₹${bestBuyPrice.toLocaleString()}/Tonne</span>`;
            }

            if (newsList && newsList.length > 0) {
              tooltipHtml += `<hr style="margin:6px 0"/><div style="max-width:500px">`;
              newsList.slice(0, 2).forEach((news) => {
                if (news && news.title) {
                  tooltipHtml += `<div style="text-align:start; display:flex;align-items:flex-start;justify-content:flex-start;margin-bottom:6px" class="card p-2">
                  <div style="flex:1;min-width:0">
                    <div style="font-weight:600;font-size:12px;line-height:1.2;" title="${
                      news.title
                    }">${
                    news.title.length > 50
                      ? news.title.substring(0, 50) + "..."
                      : news.title
                  }</div>
                    <div style="font-size:10px;color:#888">${
                      news.published || "No date"
                    }</div>
                      <div class="mt-1" style="font-size:11px;color:rgba(0, 0, 0, 0.8); background-color: ${
                        news.sentiment_score > 0
                          ? `rgb(181, 255, 207)`
                          : news.sentiment_score < 0
                          ? `rgba(255, 167, 157)`
                          : `rgb(255, 220, 151)`
                      }; padding:2px 6px; border-radius:4px; display:inline-block;">
                  ${
                    news.sentiment_score > 0
                      ? "Positive Sentiment"
                      : news.sentiment_score < 0
                      ? "Negative Sentiment"
                      : "Neutral Sentiment"
                  }
                </div> <div style="font-size:11px;color:rgba(0, 0, 0, 0.8); background-color: ${
                  news.impactLevel === "High Impact"
                    ? `rgb(181, 255, 207)`
                    : news.impactLevel === "Low Impact"
                    ? `rgba(255, 167, 157)`
                    : `rgb(255, 220, 151)`
                }; padding:2px 6px; border-radius:4px; display:inline-block;">
                  ${news.impactLevel}
                </div>
                <div style="font-size:11px;color:rgba(0, 0, 0, 0.8); background-color: ${
                  news.impactDuration === "Long-term Impact"
                    ? `rgb(181, 255, 207)`
                    : news.impactDuration === "Short-term Impact"
                    ? `rgba(255, 167, 157)`
                    : `rgb(255, 220, 151)`
                }; padding:2px 6px; border-radius:4px; display:inline-block;">
                  ${news.impactDuration}
                </div>
                  </div>
                </div>`;
                }
              });
              if (newsList.length > 2) {
                tooltipHtml += `<div style="font-size:11px;color:#888">+${
                  newsList.length - 2
                } more news</div>`;
              }
              tooltipHtml += `</div>`;
            }

            return tooltipHtml;
          } catch (error) {
            console.error("Error in tooltip generation:", error);
            return "<div style='padding:8px 12px'>Error loading tooltip</div>";
          }
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      legend: {
        show: true,
        showForSingleSeries: false,
        customLegendItems: [
          "Historical Data",
          "Forecasted Data",
          "Best Buy Price",
        ],
        markers: {
          fillColors: ["#38858e", "#ff6b6b", "#00FF00"],
        },
      },
      colors: ["#38858e", "#38858e", "#ff6b6b", "#ff6b6b", "#00FF00"],
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 250,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
    }),
    [
      forecastingFilteredChartData,
      forecastingDataBasis,
      globalSelectedCommodity,
      forecastingHandleChartClick,
      forecastingYAxisTitle,
      forecastingLegendName,
    ]
  );

  // CHART SERIES - Five series: historical line, historical bar, forecasted line, forecasted bar, best buy prices
  const forecastingChartSeries = React.useMemo(() => {
    // Create arrays with null values for the gaps between series
    const historicalLineData = forecastingFilteredChartData.map((item) =>
      item.isForecasted ? null : item.HRC_Price
    );

    const historicalBarData = forecastingFilteredChartData.map((item) =>
      item.isForecasted ? null : item.HRC_Price
    );

    const forecastedLineData = forecastingFilteredChartData.map((item) =>
      !item.isForecasted ? null : item.HRC_Price
    );

    const forecastedBarData = forecastingFilteredChartData.map((item) =>
      !item.isForecasted ? null : item.HRC_Price
    );

    // Best buy price data as scatter points
    const bestBuyPriceSeries = forecastingFilteredChartData.map((item) =>
      item.best_buy_price !== undefined ? item.best_buy_price : null
    );

    return [
      {
        name: "Historical Data",
        type: "line",
        data: historicalLineData,
      },
      {
        name: undefined, // Hidden from legend
        type: "bar",
        data: historicalBarData,
        showInLegend: false,
      },
      {
        name: "Forecasted Data",
        type: "line",
        data: forecastedLineData,
      },
      {
        name: undefined, // Hidden from legend
        type: "bar",
        data: forecastedBarData,
        showInLegend: false,
      },
      {
        name: "Best Buy Price",
        type: "scatter",
        data: bestBuyPriceSeries,
      },
    ];
  }, [forecastingFilteredChartData]);

  // Delta View Chart with global filters applied
  const deltaViewChart = React.useMemo(() => {
    const commodityKey =
      globalSelectedCommodity === "hrcPriceData" ? "hrc" : "crc";
    const deltaData = commodityOverviewData.deltaViewChartData?.[
      commodityKey
    ] || {
      categories: [],
      actualDelta: [],
      forecastedDelta: [],
    };

    // Extract years from categories for filtering
    const categoriesWithYears = deltaData.categories.map((category, index) => {
      const yearMatch = category.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : "";
      return {
        category,
        year,
        actualDelta: deltaData.actualDelta[index],
        forecastedDelta: deltaData.forecastedDelta[index],
      };
    });

    // Apply year filter
    let filteredData;
    if (globalSelectedYear !== "All Years") {
      filteredData = categoriesWithYears.filter(
        (item) => item.year === globalSelectedYear
      );
    } else {
      filteredData = categoriesWithYears;
    }

    // Apply data basis filter (Quarterly, Yearly)
    let finalData = filteredData;

    if (forecastingDataBasis === "Yearly Data") {
      // Group by year and calculate averages
      const yearlyGroups = {};
      filteredData.forEach((item) => {
        if (!yearlyGroups[item.year]) {
          yearlyGroups[item.year] = {
            categories: [],
            actualDelta: [],
            forecastedDelta: [],
            count: 0,
          };
        }
        yearlyGroups[item.year].categories.push(item.category);
        if (item.actualDelta !== null)
          yearlyGroups[item.year].actualDelta.push(item.actualDelta);
        if (item.forecastedDelta !== null)
          yearlyGroups[item.year].forecastedDelta.push(item.forecastedDelta);
        yearlyGroups[item.year].count++;
      });

      finalData = Object.keys(yearlyGroups).map((year) => ({
        category: year,
        year: year,
        actualDelta:
          yearlyGroups[year].actualDelta.length > 0
            ? yearlyGroups[year].actualDelta.reduce((a, b) => a + b, 0) /
              yearlyGroups[year].actualDelta.length
            : null,
        forecastedDelta:
          yearlyGroups[year].forecastedDelta.length > 0
            ? yearlyGroups[year].forecastedDelta.reduce((a, b) => a + b, 0) /
              yearlyGroups[year].forecastedDelta.length
            : null,
      }));
    }

    const finalCategories = finalData.map((item) => item.category);
    const finalActualDelta = finalData.map((item) => item.actualDelta);
    const finalForecastedDelta = finalData.map((item) => item.forecastedDelta);

    return {
      options: {
        chart: {
          type: "line",
          height: 400,
          zoom: { enabled: true },
          toolbar: { show: true },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config && config.dataPointIndex !== undefined) {
                const selectedData = finalData[config.dataPointIndex];
                if (selectedData) {
                  console.log("Delta View clicked:", selectedData);
                }
              }
            },
          },
        },
        stroke: {
          curve: "stepline",
          width: 3,
          dashArray: [0, 5], // Solid for actual, dashed for forecasted
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val !== null ? `₹${val.toFixed(2)}` : "";
          },
          style: {
            fontSize: "10px",
          },
        },
        xaxis: {
          categories: finalCategories,
          labels: {
            rotate: -45,
            style: {
              fontSize: "10px",
            },
          },
          title: {
            text: "Time Period",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
            },
          },
        },
        yaxis: {
          title: {
            text: "Delta Value (₹/Tonne)",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
            },
          },
          labels: {
            formatter: function (value) {
              return "₹" + (value !== null ? value.toFixed(2) : "0");
            },
          },
        },
        grid: {
          borderColor: "#f1f1f1",
        },
        colors: ["#008FFB", "#00E396"],
        markers: {
          size: 4,
          hover: {
            size: 6,
          },
        },
        legend: {
          position: "top",
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return value !== null
                ? "₹" + value.toFixed(2) + "/Tonne"
                : "No data";
            },
          },
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const dataPoint = finalData[dataPointIndex];
            if (!dataPoint) return "";

            return `
              <div style="padding: 8px 12px">
                <strong>${dataPoint.category}</strong><br/>
                ${seriesIndex === 0 ? "Actual Delta" : "Forecasted Delta"}: 
                ${
                  series[seriesIndex][dataPointIndex] !== null
                    ? "₹" +
                      series[seriesIndex][dataPointIndex].toFixed(2) +
                      "/Tonne"
                    : "No data"
                }
              </div>
            `;
          },
        },
      },
      series: [
        {
          name: "Actual Delta",
          data: finalActualDelta,
        },
        {
          name: "Forecasted Delta",
          data: finalForecastedDelta,
        },
      ],
    };
  }, [globalSelectedCommodity, globalSelectedYear, forecastingDataBasis]);

  // Settled Delta Chart with global filters applied
  const settledDeltaChart = React.useMemo(() => {
    const commodityKey =
      globalSelectedCommodity === "hrcPriceData" ? "hrc" : "crc";
    const settledData = commodityOverviewData.settledDeltaChartData?.[
      commodityKey
    ] || {
      categories: [],
      actualDelta: [],
      settledDelta: [],
    };

    // Extract years from categories for filtering
    const categoriesWithYears = settledData.categories.map(
      (category, index) => {
        const yearMatch = category.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : "";
        return {
          category,
          year,
          actualDelta: settledData.actualDelta[index],
          settledDelta: settledData.settledDelta[index],
        };
      }
    );

    // Apply year filter
    let filteredData;
    if (globalSelectedYear !== "All Years") {
      filteredData = categoriesWithYears.filter(
        (item) => item.year === globalSelectedYear
      );
    } else {
      filteredData = categoriesWithYears;
    }

    // Apply data basis filter (Quarterly, Yearly)
    let finalData = filteredData;

    if (forecastingDataBasis === "Yearly Data") {
      // Group by year and calculate averages
      const yearlyGroups = {};
      filteredData.forEach((item) => {
        if (!yearlyGroups[item.year]) {
          yearlyGroups[item.year] = {
            categories: [],
            actualDelta: [],
            settledDelta: [],
            actualCount: 0,
            settledCount: 0,
          };
        }
        yearlyGroups[item.year].categories.push(item.category);
        if (item.actualDelta !== null) {
          yearlyGroups[item.year].actualDelta.push(item.actualDelta);
          yearlyGroups[item.year].actualCount++;
        }
        if (item.settledDelta !== null) {
          yearlyGroups[item.year].settledDelta.push(item.settledDelta);
          yearlyGroups[item.year].settledCount++;
        }
      });

      finalData = Object.keys(yearlyGroups).map((year) => ({
        category: year,
        year: year,
        actualDelta:
          yearlyGroups[year].actualDelta.length > 0
            ? yearlyGroups[year].actualDelta.reduce((a, b) => a + b, 0) /
              yearlyGroups[year].actualDelta.length
            : null,
        settledDelta:
          yearlyGroups[year].settledDelta.length > 0
            ? yearlyGroups[year].settledDelta.reduce((a, b) => a + b, 0) /
              yearlyGroups[year].settledDelta.length
            : null,
      }));
    }

    const finalCategories = finalData.map((item) => item.category);
    const finalActualDelta = finalData.map((item) => item.actualDelta);
    const finalSettledDelta = finalData.map((item) => item.settledDelta);

    return {
      options: {
        chart: {
          type: "line",
          height: 400,
          zoom: { enabled: true },
          toolbar: { show: true },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config && config.dataPointIndex !== undefined) {
                const selectedData = finalData[config.dataPointIndex];
                if (selectedData) {
                  console.log("Settled Delta clicked:", selectedData);
                }
              }
            },
          },
        },
        stroke: {
          curve: "stepline",
          width: 3,
          dashArray: [0, 5], // Solid for actual, dashed for settled
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val !== null ? `₹${val.toFixed(2)}` : "";
          },
          style: {
            fontSize: "10px",
          },
        },
        xaxis: {
          categories: finalCategories,
          labels: {
            rotate: -45,
            style: {
              fontSize: "10px",
            },
          },
          title: {
            text: "Time Period",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
            },
          },
        },
        yaxis: {
          title: {
            text: "Delta Value (₹/Tonne)",
            style: {
              fontSize: "12px",
              fontWeight: "bold",
            },
          },
          labels: {
            formatter: function (value) {
              return "₹" + (value !== null ? value.toFixed(2) : "0");
            },
          },
        },
        grid: {
          borderColor: "#f1f1f1",
        },
        colors: ["#008FFB", "#FF4560"], // Different color for settled delta
        markers: {
          size: 4,
          hover: {
            size: 6,
          },
        },
        legend: {
          position: "top",
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return value !== null
                ? "₹" + value.toFixed(2) + "/Tonne"
                : "Not Settled";
            },
          },
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const dataPoint = finalData[dataPointIndex];
            if (!dataPoint) return "";

            const seriesName =
              seriesIndex === 0 ? "Actual Delta" : "Settled Delta";
            const value = series[seriesIndex][dataPointIndex];
            const displayValue =
              value !== null
                ? "₹" + value.toFixed(2) + "/Tonne"
                : "Not Settled Yet";

            return `
              <div style="padding: 8px 12px">
                <strong>${dataPoint.category}</strong><br/>
                ${seriesName}: ${displayValue}
            </div>
          `;
          },
        },

        annotations: {
          points: finalData
            .map((item, index) => {
              if (item.settledDelta === null) {
                return {
                  x: item.category,
                  y: item.actualDelta,
                  marker: {
                    size: 6,
                    fillColor: "#FF4560",
                    strokeColor: "#fff",
                    strokeWidth: 2,
                    radius: 2,
                  },
                  label: {
                    borderColor: "#FF4560",
                    style: {
                      color: "#fff",
                      background: "#FF4560",
                    },
                    text: "Pending Settlement",
                    offsetY: -20,
                  },
                };
              }
              return undefined;
            })
            .filter((point) => point !== undefined),
        },
      },
      series: [
        {
          name: "Actual Delta",
          data: finalActualDelta,
        },
        {
          name: "Settled Delta",
          data: finalSettledDelta,
        },
      ],
    };
  }, [globalSelectedCommodity, globalSelectedYear, forecastingDataBasis]);

  const forecastingResetFiltersForecastChart = () => {
    setForecastingDataBasis("Monthly Data");
    setForecastingSelectedNews([]);
    setForecastingSelectedNewsDate(null);
  };

  const globalResetFilters = () => {
    setGlobalSelectedCommodity("hrcPriceData");
    setGlobalSelectedYear("All Years");
    setForecastingDataBasis("Monthly Data");
    setForecastingSelectedNews([]);
    setForecastingSelectedNewsDate(null);
  };

  // Show all news if nothing is selected
  const forecastingNewsToShow =
    forecastingSelectedNews && forecastingSelectedNews.length > 0
      ? forecastingSelectedNews
      : commodityOverviewData.newsData || [];
  const forecastingNewsTitle =
    forecastingSelectedNews &&
    forecastingSelectedNews.length > 0 &&
    forecastingSelectedNewsDate
      ? `News for ${forecastingFormatXAxisLabel(
          forecastingSelectedNewsDate,
          forecastingDataBasis
        )}`
      : "All News";

  return (
    <div className="commodity-data mt-2">
      {/* ################# GLOBAL FILTERS #################### */}
      <div className="global-cards mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="head-theme mb-0">Global Filters</p>
          <div className="d-flex gap-2 align-items-center">
            {/* Commodity Filter */}
            <Dropdown
              onSelect={(key) => {
                setGlobalSelectedCommodity(key);
              }}
            >
              <Dropdown.Toggle variant="light" size="sm">
                {forecastingCommodityOptions.find(
                  (c) => c.key === globalSelectedCommodity
                )?.label || "Select Commodity"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {forecastingCommodityOptions.map((commodity) => (
                  <Dropdown.Item key={commodity.key} eventKey={commodity.key}>
                    {commodity.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Year Filter */}
            <Dropdown onSelect={(key) => setGlobalSelectedYear(key)}>
              <Dropdown.Toggle variant="light" size="sm">
                {globalSelectedYear}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {forecastingUniqueYears.map((year, index) => (
                  <Dropdown.Item key={index} eventKey={year}>
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <button
              className="btn btn-theme global-font"
              onClick={globalResetFilters}
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* ################# KPIs #################### */}
      <div className="d-flex gap-2 flex-wrap w-100">
        {filteredKPIs.map((card, index) => (
          <div
            key={index}
            className="global-cards p-2 flex-fill"
            style={{ minWidth: "260px" }}
          >
            <p className="head-theme mb-2 fw-semibold">{card.title}</p>

            <div className="d-flex gap-1 w-100">
              {card.items.map((item, idx) => (
                <div
                  key={idx}
                  className="global-cards p-2 flex-fill text-start"
                  style={{ minWidth: "120px" }}
                >
                  <p className="head-theme small text-muted mb-0 ">
                    {item.label}
                  </p>
                  <p className="global-font fw-semibold mb-0 mt-0">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="global-cards my-2">
        <Tabs
          activeKey={activeChartTab}
          onSelect={(key) => setActiveChartTab(key)}
          className="global-tabs"
          style={{ width: "100%" }}
        >
          <Tab eventKey="PriceTrend" title="Price Trend">
            <div className="row g-2 mb-2">
              <div className="col-9">
                <div
                  className="w-100 mb-2 global-cards mt-2"
                  style={{ minHeight: "380px" }}
                  ref={forecastingChartContainerRef}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                    <p className="head-theme">
                      Price Trend -{" "}
                      {
                        forecastingCommodityOptions.find(
                          (c) => c.key === globalSelectedCommodity
                        )?.label
                      }
                    </p>
                    <div className="d-flex gap-2">
                      {/* Data Basis Filter - Only this remains in chart */}
                      <Dropdown
                        onSelect={(key) => setForecastingDataBasis(key)}
                      >
                        <Dropdown.Toggle variant="light" size="sm">
                          {forecastingDataBasis}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="Monthly Data">
                            Monthly Data
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="Quarterly Data">
                            Quarterly Data
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="Yearly Data">
                            Yearly Data
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <button
                        className="btn btn-theme global-font"
                        onClick={forecastingResetFiltersForecastChart}
                      >
                        Reset Chart
                      </button>
                    </div>
                  </div>
                  {forecastingFilteredChartData &&
                  forecastingFilteredChartData.length > 0 ? (
                    <div
                      key={`${globalSelectedCommodity}-${globalSelectedYear}-${forecastingDataBasis}`}
                    >
                      <Chart
                        ref={forecastingChartRef}
                        options={forecastingOptionsHRC}
                        series={forecastingChartSeries}
                        type="line"
                        height={320}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-5 text-muted">
                      No data available for the selected filters.
                    </div>
                  )}
                </div>
              </div>
              <div className="col-3">
                {/* News Card Display */}
                <div
                  className="news-card mt-2 pt-3 global-cards text-start"
                  style={{
                    height: 400,
                    overflowY: "auto",
                    backgroundColor: "rgba(255, 255, 255, 0.62)",
                  }}
                >
                  <p className="head-theme">{forecastingNewsTitle}</p>
                  <div>
                    {forecastingNewsToShow.map((x, idx) => (
                      <div
                        key={idx}
                        className="news-item d-flex flex-column justify-content-start text-start mt-2"
                      >
                        <div
                          className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 mt-1 text-start position-relative"
                          style={{
                            cursor: "pointer",
                            backgroundColor: "rgb(245, 245, 245)",
                          }}
                          onClick={() => {
                            window.open(x.url, "_blank");
                          }}
                        >
                          <p className=" mb-1 p-0 global-font ">{x.category}</p>
                          <p
                            className="fw-bold m-0 mb-2 p-0 global-font "
                            style={{ color: "var(--color-main)" }}
                          >
                            {x.title}
                          </p>
                          <p className="global-font p-0 m-0 text-secondary">
                            Released on {x.published}
                          </p>
                          <p
                            className="position-absolute bottom-0 end-0 text-center px-2 global-font rounded-2 m-2"
                            style={{
                              background:
                                x.sentiment_score === 0
                                  ? "var(--color-bg-yellow)"
                                  : x.sentiment_score === 1
                                  ? "var(--color-bg-green)"
                                  : "var(--color-bg-red)",
                              width: "130px",
                            }}
                          >
                            {x.sentiment_score === 0
                              ? "Neutral"
                              : x.sentiment_score === 1
                              ? "Positive"
                              : "Negative"}{" "}
                            Sentiment
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="DeltaView" title="Delta View">
            <div className="row g-2 mb-2">
              <div className="col-12">
                <div
                  className="w-100 mb-2 global-cards mt-2"
                  style={{ minHeight: "380px" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3 px-2"></div>
                  {deltaViewChart.series[0].data.length > 0 ||
                  deltaViewChart.series[1].data.length > 0 ? (
                    <Chart
                      options={deltaViewChart.options}
                      series={deltaViewChart.series}
                      type="line"
                      height={320}
                    />
                  ) : (
                    <div className="text-center py-5 text-muted">
                      No delta data available for the selected filters.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="ForecastedDelta" title="Forecasted Delta">
            <p />
          </Tab>

          <Tab eventKey="SettledDelta" title="Settled Delta">
            <div className="row g-2 mb-2">
              <div className="col-12">
                <div
                  className="w-100 mb-2 global-cards mt-2"
                  style={{ minHeight: "380px" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3 px-2"></div>
                  {settledDeltaChart.series[0].data.length > 0 ? (
                    <Chart
                      options={settledDeltaChart.options}
                      series={settledDeltaChart.series}
                      type="line"
                      height={320}
                    />
                  ) : (
                    <div className="text-center py-5 text-muted">
                      No settled delta data available for the selected filters.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="QuarterlyDelta" title="Static Quarterly Data">
            <p className="text-start global-font ms-2 mt-2 mb-1">
              <strong>NOTE:</strong>
              <br />
              1. The quarterly delta forecasts shown in table were finalized at
              the end of the previous quarter, based on prevailing market
              conditions and indicators. No revisions were made during the
              quarter.
              <br />
              2. June 2025 CRISIL actuals are not yet available. Therefore,
              STATXO's forecasted price for June has been used for Q2 (F)
              accuracy calculation and the Percent may slightly change once the
              actual price is available.
            </p>

            <div className="table-container mb-2">
              <table className="table table-bordered table-sm m-0">
                <thead>
                  <tr>
                    <th className="text-start defaultStyleHead">Year</th>
                    <th className="text-start defaultStyleHead">Quarter</th>
                    <th className="text-start defaultStyleHead">Month</th>
                    <th className="text-start defaultStyleHead">
                      Statxo Forecasted Quarterly Delta
                    </th>
                    <th className="text-start defaultStyleHead">
                      CRISIL Actual Quarterly Delta
                    </th>
                    <th className="text-start defaultStyleHead">
                      Delta Difference
                    </th>
                    <th className="text-start defaultStyleHead">Accuracy</th>
                    <th className="text-start defaultStyleHead">
                      Forecast Frozen In
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    // Map global commodity keys to staticQuarterlyData keys
                    const commodityKeyMap = {
                      hrcPriceData: "hrc",
                      crcPriceData: "crc",
                    };

                    const staticData =
                      commodityOverviewData.staticQuarterlyData || {};

                    const selectedKey =
                      commodityKeyMap[globalSelectedCommodity] ||
                      // fall back to hrc if nothing matches
                      "hrc";

                    let quarterlyArray = staticData[selectedKey] || [];

                    // Apply global year filter if a specific year is selected
                    if (
                      globalSelectedYear &&
                      globalSelectedYear !== "All Years"
                    ) {
                      quarterlyArray = quarterlyArray.filter(
                        (d) => String(d.year) === String(globalSelectedYear)
                      );
                    }

                    // Render rows; if no rows, show a placeholder
                    if (!quarterlyArray || quarterlyArray.length === 0) {
                      return (
                        <tr>
                          <td className="defaultStyles" colSpan={8}>
                            No quarterly data available for the selected
                            filters.
                          </td>
                        </tr>
                      );
                    }

                    return quarterlyArray.map((data, index) => (
                      <tr key={`${selectedKey}-${index}`}>
                        <td className="defaultStyles">{data.year}</td>
                        <td className="defaultStyles">{data.quarter}</td>
                        <td className="defaultStyles">{data.month}</td>
                        <td className="defaultStyles">
                          {data.statxoForecastedQuarterlyDelta}
                        </td>
                        <td className="defaultStyles">
                          {data.crisilActualQuarterlyDelta || "-"}
                        </td>
                        <td className="defaultStyles">
                          {data.deltaDifference || "-"}
                        </td>
                        <td className="defaultStyles">
                          {data.accuracy ? (
                            <span className="badge bg-success">
                              {data.accuracy}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="defaultStyles">
                          {data.forecastFrozenIn || "-"}
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </div>
      {/* ################# Level 3 #################### */}

      <div className="global-cards">
        <p className="head-theme">
          Negotiation Levers -{" "}
          {
            forecastingCommodityOptions.find(
              (c) => c.key === globalSelectedCommodity
            )?.label
          }
        </p>
        <div className="table-container my-2">
          <table className="table table-bordered table-sm m-0">
            <thead>
              <tr>
                <th className="text-start defaultStyleHead">Quarter</th>
                <th className="text-start defaultStyleHead">Active Scenario</th>
                <th className="text-start defaultStyleHead">Likelihood</th>
                <th className="text-start defaultStyleHead">
                  Active Delta Range
                </th>
                <th className="text-start defaultStyleHead">Model Delta</th>
                <th className="text-start defaultStyleHead">
                  Market Sentiment
                </th>
                <th className="text-start defaultStyleHead">Key Drivers</th>
                <th className="text-start defaultStyleHead">Delta Trend</th>
                <th className="text-start defaultStyleHead">
                  Negotiation Strategy
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNegotiationLevers.map((data, index) => (
                <tr key={index}>
                  <td
                    className="defaultStyles"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {data.quarter}
                  </td>
                  <td className="defaultStyles">
                    <span
                      className={
                        data.activeScenario === "Upside" ? "text-danger" : ""
                      }
                    >
                      {data.activeScenario === "Upside" && "↑ "}
                      {data.activeScenario}
                    </span>
                  </td>
                  <td className="defaultStyles">
                    <span className="badge bg-danger">{data.likelihood}</span>
                  </td>
                  <td className="defaultStyles">{data.activeDeltaRange}</td>
                  <td className="defaultStyles">{data.modelDelta}</td>
                  <td className="defaultStyles">
                    <span
                      className={
                        data.marketSentiment === "Negative" ? "text-danger" : ""
                      }
                    >
                      {data.marketSentiment === "Negative" && "🔴"}
                      {data.marketSentiment === "Stable" && "🟡"}
                      {data.marketSentiment}
                    </span>
                  </td>
                  <td className="defaultStyles">{data.keyDrivers}</td>
                  <td className="defaultStyles">
                    <ul className="mb-0 ps-3">
                      {data.deltaTrend.map((trend, idx) => (
                        <li key={idx}>{trend}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="defaultStyles">
                    <ul className="mb-0 ps-3">
                      {data.negotiationStrategy.map((strategy, idx) => (
                        <li key={idx}>{strategy}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
