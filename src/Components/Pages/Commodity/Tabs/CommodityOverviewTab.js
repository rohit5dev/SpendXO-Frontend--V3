import React, { useEffect, useState, useRef, useCallback } from "react";
import Chart from "react-apexcharts";
import { Dropdown, Form } from "react-bootstrap"; // Import Form for the switch
import { keyPriceDriversDataCharts } from "../Data/commodityData.js";
import "../css/CommodityIntelligenceNew.css";
import Tree from "../../../Helper/Tree.js"; // Import the new component
import { formatDate } from "../../../../Config/formatDate.js";
import { commodityOverviewData } from "../Data/commodityOverviewData.js";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/CommodityIntelligenceNew.css";
import countriesData from "../../../Helper/Constants/countries.json";
import { countryCodes } from "../../../Helper/Constants/constant.js";

import "../css/CommodityIntelligenceNew.css";
import { commodityOverviewDataN } from "../Data/CommodityOverviewData3.js";
import { categoryOverviewData } from "../../Category/Data/categoryOverviewData.js";

// ICONS
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const CommodityOverviewTab = () => {
  const [dataBasis, setDataBasis] = useState("Monthly Data");
  const [priceDriverMethod, setPriceDriverMethod] = useState("BOF"); // New state for price driver method
  const [geoFilter, setGeoFilter] = useState("export"); // State to toggle between import and export
  const [selectedYear, setSelectedYear] = useState("All Years"); // New state for year filter

  const [forecastingDataBasis, setForecastingDataBasis] =
    useState("Monthly Data");
  const [forecastingSelectedYear, setForecastingSelectedYear] =
    useState("All Years"); // New state for year filter
  const [forecastingSelectedCommodity, setForecastingSelectedCommodity] =
    useState("hrcPriceData"); // New state for commodity

  // State for selected news (for card display)
  const [forecastingSelectedNews, setForecastingSelectedNews] = useState([]);
  const [forecastingSelectedNewsDate, setForecastingSelectedNewsDate] =
    useState(null);

  const forecastingChartContainerRef = useRef(null);
  const forecastingChartRef = useRef(null); // Add direct chart reference

  const forecastingParseDate = (dateString) => {
    if (!dateString) {
      console.warn("Invalid date string:", dateString);
      return new Date(); // Return the current date as a fallback
    }
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const forecastingFilterDataByBasis = (basis, data) => {
    const selectedData = data;
    if (basis === "Monthly Data") {
      return selectedData;
    } else if (basis === "Quarterly Data") {
      // Group data by quarters and average the HRC prices
      const quarterlyData = [];
      for (let i = 0; i < selectedData.length; i += 3) {
        const quarterData = selectedData.slice(i, i + 3);
        const avgPrice =
          quarterData.reduce((sum, item) => sum + item.HRC_Price, 0) /
          quarterData.length;
        quarterlyData.push({
          Date: quarterData[quarterData.length - 1].Date,
          HRC_Price: avgPrice,
        });
      }
      return quarterlyData;
    } else if (basis === "Yearly Data") {
      // Group data by years and average the HRC prices
      const yearlyData = [];
      const yearMap = {};

      selectedData.forEach((item) => {
        const year = forecastingParseDate(item.Date || item.date).getFullYear();
        if (!yearMap[year]) {
          yearMap[year] = { total: 0, count: 0 };
        }
        yearMap[year].total += item.HRC_Price || item.price;
        yearMap[year].count += 1;
      });

      for (const year in yearMap) {
        yearlyData.push({
          Date: `31-12-${year}`,
          HRC_Price: yearMap[year].total / yearMap[year].count,
        });
      }

      return yearlyData;
    }
    return selectedData;
  };

  // Commodity options based on keys in commodityPricingData
  const forecastingCommodityOptions = [
    { key: "hrcPriceData", label: "HRC Price" },
    { key: "CRCPriceData", label: "CRC Price" },
    // Removed Commodity A and Commodity B
  ];

  // Dynamic y-axis and legend name based on selected commodity
  const forecastingYAxisTitle =
    forecastingSelectedCommodity === "hrcPriceData"
      ? "HRC Price (INR/Tonne)"
      : "CRC Price (INR/Tonne)";
  const forecastingLegendName =
    forecastingSelectedCommodity === "hrcPriceData" ? "HRC Price" : "CRC Price";

  // Extract unique years from selected commodity data
  const forecastingUniqueYears = [
    "All Years",
    ...new Set(
      (
        commodityOverviewDataN.commodityPricingData[
          forecastingSelectedCommodity
        ] || []
      ).map((item) => forecastingParseDate(item.date).getFullYear())
    ),
  ];

  // Filter data based on selected year
  const forecastingFilterDataByYear = (data, year) => {
    if (year === "All Years") return data;
    return data.filter((item) => {
      const parsedDate = forecastingParseDate(item.Date || item.date);
      return parsedDate.getFullYear().toString() === year;
    });
  };

  // Prepare filtered data for chart
  const forecastingFilteredCommodityData = forecastingFilterDataByYear(
    (
      commodityOverviewDataN.commodityPricingData[
        forecastingSelectedCommodity
      ] || []
    ).map((item) => ({
      Date: item.date,
      HRC_Price: item.price,
    })),
    forecastingSelectedYear
  )
    // Sort by date ascending (oldest to newest)
    .slice() // shallow copy to avoid mutating original
    .sort(
      (a, b) => forecastingParseDate(a.Date) - forecastingParseDate(b.Date)
    );

  const forecastingFilteredChartData = forecastingFilterDataByBasis(
    forecastingDataBasis,
    forecastingFilteredCommodityData
  );

  const forecastingFormatXAxisLabel = (dateString, basis) => {
    const date = forecastingParseDate(dateString);
    if (basis === "Yearly Data") {
      return date.getFullYear().toString(); // Correctly format year
    } else if (basis === "Quarterly Data") {
      const month = date.getMonth();
      const year = date.getFullYear();
      // Determine quarter based on month and return range
      if (month >= 0 && month <= 2) return `Jan-Mar ${year}`;
      if (month >= 3 && month <= 5) return `Apr-Jun ${year}`;
      if (month >= 6 && month <= 8) return `Jul-Sep ${year}`;
      return `Oct-Dec ${year}`;
    } else {
      // Monthly
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
    // Find news with same month and year
    const news = (commodityOverviewDataN.newsData || []).filter((newsItem) => {
      const newsDate = forecastingParseDate(newsItem.published);
      return (
        newsDate.getMonth() === targetMonth &&
        newsDate.getFullYear() === targetYear
      );
    });
    return news;
  };

  // Chart point click handler - improved with debouncing and better error handling
  const forecastingHandleChartClick = useCallback(
    (event, chartContext, config) => {
      // Add a small delay to ensure DOM is stable
      setTimeout(() => {
        try {
          // Add null checks and validation
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

          // Validate data index
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
      }, 100); // 100ms delay to ensure DOM stability
    },
    [forecastingFilteredChartData]
  );

  // HRC PRICE CHART OPTIONS - Memoized to prevent unnecessary re-renders
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
          enabled: false, // Disable animations to prevent DOM timing issues
        },
        events: {
          dataPointSelection: forecastingHandleChartClick,
        },
      },
      stroke: {
        curve: "smooth",
        width: [2, 2],
        colors: "#38858e",
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
        followCursor: false, // Prevent tooltip from following cursor
        fixed: {
          enabled: false,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          try {
            // Defensive: avoid error if data is missing or chart is not mounted
            if (
              !forecastingFilteredChartData ||
              dataPointIndex < 0 ||
              dataPointIndex >= forecastingFilteredChartData.length ||
              !forecastingFilteredChartData[dataPointIndex] ||
              !forecastingFilteredChartData[dataPointIndex].Date
            ) {
              return "<div style='padding:8px 12px'>No data available</div>";
            }

            // Get the date for this data point
            const date = forecastingFilteredChartData[dataPointIndex]?.Date;
            const price =
              forecastingFilteredChartData[dataPointIndex]?.HRC_Price;

            if (!date || price === undefined) {
              return "<div style='padding:8px 12px'>Invalid data</div>";
            }

            const newsList = forecastingGetNewsForDate(date);

            let tooltipHtml = `<div style="padding:8px 12px; max-width: 600px;"><strong>${forecastingFormatXAxisLabel(
              date,
              forecastingDataBasis
            )}</strong><br/>`;
            tooltipHtml += `<span>Price: ₹${price.toLocaleString()}/Tonne</span>`;

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
                          : `rgb(255, 220, 151)` // yellow bg for neutral
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
                    : `rgb(255, 220, 151)` // yellow bg for neutral
                }; padding:2px 6px; border-radius:4px; display:inline-block;">
                  ${news.impactLevel}
                </div>

                
                <div style="font-size:11px;color:rgba(0, 0, 0, 0.8); background-color: ${
                  news.impactDuration === "Long-term Impact"
                    ? `rgb(181, 255, 207)`
                    : news.impactDuration === "Short-term Impact"
                    ? `rgba(255, 167, 157)`
                    : `rgb(255, 220, 151)` // yellow bg for neutral
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
          colors: {
            ranges: [
              {
                from: 0,
                to: 100000,
                color: "rgb(153, 197, 204)",
              },
            ],
          },
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: [forecastingLegendName],
      },
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
      forecastingSelectedCommodity,
      forecastingHandleChartClick,
      forecastingYAxisTitle,
      forecastingLegendName,
    ]
  );

  // Chart series - Memoized to prevent unnecessary re-renders
  const forecastingChartSeries = React.useMemo(
    () => [
      {
        name: forecastingLegendName,
        type: "line",
        data: forecastingFilteredChartData.map((item) => item.HRC_Price || 0),
      },
      {
        name: undefined,
        type: "bar",
        data: forecastingFilteredChartData.map((item) => item.HRC_Price || 0),
        showInLegend: false,
        showLegend: false,
      },
    ],
    [forecastingFilteredChartData, forecastingLegendName]
  );

  const forecastingResetFiltersForecastChart = () => {
    setForecastingDataBasis("Monthly Data");
    setForecastingSelectedYear("All Years");
    setForecastingSelectedCommodity("hrcPriceData");
    setForecastingSelectedNews([]);
    setForecastingSelectedNewsDate(null);
  };

  // Show all news if nothing is selected
  const forecastingNewsToShow =
    forecastingSelectedNews && forecastingSelectedNews.length > 0
      ? forecastingSelectedNews
      : commodityOverviewDataN.newsData || [];
  const forecastingNewsTitle =
    forecastingSelectedNews &&
    forecastingSelectedNews.length > 0 &&
    forecastingSelectedNewsDate
      ? `News for ${forecastingFormatXAxisLabel(
          forecastingSelectedNewsDate,
          forecastingDataBasis
        )}`
      : "All News";

  const [steelUsageChart, setSteelUsageChart] = React.useState({
    series: [52, 16, 12, 10, 5, 3, 2],
    options: {
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
              horizontalAlign: "center",
              fontSize: "10px",
            },
          },
        },
      ],
      labels: [
        "Building & Infrastructure",
        "Mechanical Equipment",
        "Automotive",
        "Metal Products",
        "Other Transport",
        "Electrical Equipment",
        "Domestic Appliances",
      ],
      tooltip: {
        y: {
          formatter: function (value) {
            return `${value}%`; // Add % to tooltip
          },
        },
      },
      colors: [
        "#2dadbb",
        "#f97061",
        "#8cbf9e",
        "#ffdc97",
        "rgb(5, 133, 207)",
        "rgb(226, 131, 255)",
        "rgb(163, 255, 151)",
      ],
    },
  });

  // Map Chart States
  const [locations, setLocations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [modalData, setModalData] = useState(null); // Add state for modal data

  const openModal = (data) => {
    const code = countryCodes[data.country]; // Get country code dynamically
    const lowerCaseCode = code?.toLowerCase();
    const flagUrl = lowerCaseCode
      ? `https://flagcdn.com/w40/${lowerCaseCode}.png`
      : ""; // Generate flag URL dynamically

    setModalData({ ...data, flagUrl }); // Add flag URL to modalData
  };

  const closeModal = () => setModalData(null); // Function to close the modal

  useEffect(() => {
    // Update map data based on selected filter
    const selectedData = commodityOverviewData.geographicalTrends[geoFilter];
    const locationsWithCoordinates = selectedData.map((country) => {
      const countryInfo = countriesData.find(
        (data) => data.name === country.Country
      );

      if (countryInfo) {
        return {
          name: country.Country,
          position: countryInfo.coordinates,
          qty: country.Qty,
          color: "var(--color-red)", // Different colors for export and import
        };
      } else {
        console.warn(`Coordinates not found for ${country.Country}`);
        return null;
      }
    });

    setLocations(
      locationsWithCoordinates.filter((location) => location !== null)
    );
  }, [geoFilter]); // Re-run when geoFilter changes

  // Helper function to scale bubble sizes dynamically based on zoom level
  const getBubbleSize = (qty) => {
    const maxQty = Math.max(...locations.map((data) => data.qty)); // Use locations data
    const minRadius = 5;
    const maxRadius = 25;

    // Adjust bubble size based on quantity
    return (qty / maxQty) * (maxRadius - minRadius) + minRadius;
  };

  // Custom hook to listen to zoom level changes
  function ZoomListener() {
    const map = useMap();
    useEffect(() => {
      const onZoom = () => {
        setZoomLevel(map.getZoom());
      };
      map.on("zoomend", onZoom);
      return () => {
        map.off("zoomend", onZoom);
      };
    }, [map]);

    return null;
  }

  // TABLE STYLE
  // Default column settings (for styling)
  const defaultStyles = {
    fontSize: "12px",
    textAlign: "start",
    padding: "8px",
  };
  const defaultStyleHead = {
    fontSize: "12px",
    textAlign: "center",
    padding: "8px",
    backgroundColor: "rgba(4, 141, 156, 0.25)",
    color: "(var(--color-main)",
    border: "1px solid #ddd",
  };

  const parseDate = (dateString) => {
    if (!dateString) {
      console.warn("Invalid date string:", dateString);
      return new Date(); // Return the current date as a fallback
    }
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterDataByBasis = (basis, data) => {
    const selectedData = data;
    if (basis === "Monthly Data") {
      return selectedData;
    } else if (basis === "Quarterly Data") {
      // Group data by quarters and average the HRC prices
      const quarterlyData = [];
      for (let i = 0; i < selectedData.length; i += 3) {
        const quarterData = selectedData.slice(i, i + 3);
        const avgPrice =
          quarterData.reduce((sum, item) => sum + item.HRC_Price, 0) /
          quarterData.length;
        quarterlyData.push({
          Date: quarterData[quarterData.length - 1].Date,
          HRC_Price: avgPrice,
        });
      }
      return quarterlyData;
    } else if (basis === "Yearly Data") {
      // Group data by years and average the HRC prices
      const yearlyData = [];
      const yearMap = {};

      selectedData.forEach((item) => {
        const year = parseDate(item.Date || item.date).getFullYear();
        if (!yearMap[year]) {
          yearMap[year] = { total: 0, count: 0 };
        }
        yearMap[year].total += item.HRC_Price || item.price;
        yearMap[year].count += 1;
      });

      for (const year in yearMap) {
        yearlyData.push({
          Date: `31-12-${year}`,
          HRC_Price: yearMap[year].total / yearMap[year].count,
        });
      }

      return yearlyData;
    }
    return selectedData;
  };

  // Extract unique years from hrcPriceData
  const uniqueYears = [
    "All Years",
    ...new Set(
      commodityOverviewData.hrcPriceData.map((item) =>
        parseDate(item.date).getFullYear()
      )
    ),
  ];

  // Filter data based on selected year
  const filterDataByYear = (data, year) => {
    if (year === "All Years") return data;
    return data.filter((item) => {
      const parsedDate = parseDate(item.Date || item.date); // Ensure correct field is used
      return parsedDate.getFullYear().toString() === year;
    });
  };

  const filteredHRCData = filterDataByYear(
    commodityOverviewData.hrcPriceData.map((item) => ({
      Date: item.date,
      HRC_Price: item.price,
    })),
    selectedYear
  );

  const filteredChartData = filterDataByBasis(dataBasis, filteredHRCData);

  const formatXAxisLabel = (dateString, basis) => {
    const date = parseDate(dateString);
    if (basis === "Yearly Data") {
      return date.getFullYear().toString(); // Correctly format year
    } else if (basis === "Quarterly Data") {
      const month = date.getMonth();
      const year = date.getFullYear();
      // Determine quarter based on month and return range
      if (month >= 0 && month <= 2) return `Jan-Mar ${year}`;
      if (month >= 3 && month <= 5) return `Apr-Jun ${year}`;
      if (month >= 6 && month <= 8) return `Jul-Sep ${year}`;
      return `Oct-Dec ${year}`;
    } else {
      // Monthly
      return date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
  };

  // PRICE BREAKDOWN CHART
  // Chart data
  const seriesCostBreakDown = [
    {
      name: "CAPEX",
      data: [94, 58],
    },
    {
      name: "Fixed OPEX",
      data: [87, 54],
    },
    {
      name: "Fuel Cost",
      data: [80, 90],
    },
    {
      name: "Raw Material Cost",
      data: [100, 300],
    },
  ];

  const optionsCostBreakDown = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.5,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },

    xaxis: {
      categories: ["Commercial BF-BOF", "Scrap-based EAF"],
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      hover: {
        filter: "none",
      },
    },
    legend: {
      position: "right",
      offsetY: 0,
      fontSize: "10px",
    },
    colors: ["#2dadbb", "#f97061", "#8cbf9e", "#127985"],
  };

  // METALS AND MINERALS CARD DATA
  const treeData = [
    {
      name: "Metals & Minerals",
      children: [
        {
          name: "Ferrous Metals",
          children: [
            {
              name: "Flat Steel",
              children: [
                { name: "Hot Rolled Coil (HRC)" },
                { name: "Cold Rolled Coil (CRC)" },
                { name: "Galvanized Steel" },
              ],
            },
          ],
        },
        {
          name: "Non-Ferrous Metals",
        },
      ],
    },
  ];

  const priceDriverData =
    commodityOverviewData?.keyPriceDriversData[priceDriverMethod]; // Get data based on selected method

  const priceDriverChartData = {
    series: Object.values(keyPriceDriversDataCharts[priceDriverMethod]),
    options: {
      labels: Object.keys(keyPriceDriversDataCharts[priceDriverMethod]),
      legend: {
        position: "right",
        horizontalAlign: "center",
        fontSize: "10px",
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
        style: {
          fontSize: "12px",
        },
      },
      colors: ["#2dadbb", "#f97061", "#8cbf9e", "#127985"],
    },
  };

  // HRC PRICE CHART
  // Prepare the data for the chart
  const categories = commodityOverviewData?.hrcPriceData
    .map((item) => item.month)
    .reverse();

  const optionsHRC = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["var(--color-main-light)"], // Set line color
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: "10px",
        },
      },
    },
    yaxis: {
      title: {
        text: "HRCPrice (INR/Tonne)",
      },
      labels: {
        formatter: function (value) {
          return value.toLocaleString();
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (value) {
          return "₹" + value.toLocaleString() + "/Tonne";
        },
      },
    },
  };

  const resetFilters = () => {
    setDataBasis("Monthly Data");
    setSelectedYear("All Years");
  };

  // China Flag 
  const code = countryCodes["China"];
  const lowerCaseCode = code?.toLowerCase();
  const chinaFlagUrl = lowerCaseCode
    ? `https://flagcdn.com/w40/${lowerCaseCode}.png`
    : "";

  return (
    <div className="commodity-data">
      {/* ################# Level 1 #################### */}
      <div className="row  g-2">
        <div className="col-2">
          <div className=" w-100 global-cards" style={{ height: "190px" }}>
            <p className="head-theme ">Metals & Minerals</p>
            <div
              className="mt-2"
              style={{
                height: "135px",
                overflowY: "auto",
                textAlign: "justify",
                overflow: "hidden",
              }}
            >
              <Tree data={treeData} />
            </div>
          </div>
        </div>
        <div className="col-10">
          {" "}
          <div className="w-100 global-cards">
            <p className="head-theme" style={{ marginBottom: "22px" }}>
              Commodity Definition
            </p>
            <div className="row g-2 ">
              <div className="col m-0">
                <div className="card d-flex flex-column justify-content-between rounded-4 p-2 bg-white">
                  <p className="head-theme text-start">Definition</p>

                  <p className="global-font rs-text-justify">
                    Hot Rolled Coil (HRC) is a fundamental flat steel product,
                    produced by rolling slabs at high temperatures. It is a
                    strategic input material across infrastructure, automotive,
                    construction, and capital goods. As the most actively traded
                    steel benchmark globally, HRC prices directly influence
                    procurement strategies for a wide range of steel-intensive
                    industries.
                  </p>
                </div>
              </div>
              <div className="col m-0">
                {" "}
                <div className="card d-flex flex-column justify-content-between rounded-4 p-2 bg-white">
                  <p className="head-theme text-start">
                    Position in Global Supply Chain
                  </p>

                  <p className="global-font rs-text-justify">
                    <strong>● Intermediate Material: </strong>
                    HRC is an upstream product used to manufacture CRC,
                    galvanized steel, pipes, and structural components.
                    <br />
                    <strong>● Trade-Exposed: </strong>
                    It is widely exported, priced in spot and futures markets,
                    and sensitive to global trade dynamics, cost inflation, and
                    geopolitical shif
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 2 #################### */}
      <div className="row g-2">
        {" "}
        <div className="col-6">
          {/* Map chart */}
          <div
            className="global-cards mt-2 w-100"
            style={{ height: "280px", position: "relative" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="head-theme">Geographical Trends</p>

              <Dropdown onSelect={(key) => setGeoFilter(key)}>
                <Dropdown.Toggle variant="light" size="sm">
                  {geoFilter.charAt(0).toUpperCase() + geoFilter.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="export">Export</Dropdown.Item>
                  <Dropdown.Item eventKey="import">Import</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="row g-2">
              <div className="col-3">
                {" "}
                {/* Geographical Trends Data in a tabular form */}
                <div
                  className="table-container pe-1"
                  style={{
                    height: "230px", // Match height with the map container
                    overflowY: "auto", // Enable vertical scrolling
                  }}
                >
                  <table className="table table-bordered table-sm m-0">
                    <thead>
                      <tr>
                        <th
                          className="p-1 text-start py-2"
                          style={{
                            ...defaultStyleHead,
                            fontSize: "10px",
                          }}
                        >
                          Country
                        </th>
                        <th
                          className="p-1 text-start"
                          style={{
                            ...defaultStyleHead,
                            fontSize: "10px",
                          }}
                        >
                          Total {geoFilter === "export" ? "Exports" : "Imports"}{" "}
                          (MT)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {commodityOverviewData.geographicalTrends[geoFilter].map(
                        (country, index) => (
                          <tr key={index}>
                            <td
                              className="p-0 px-1"
                              style={{
                                ...defaultStyles,
                                fontSize: "10px",
                              }}
                            >
                              {country.Country}
                            </td>
                            <td
                              className="p-0 px-1"
                              style={{
                                ...defaultStyles,
                                fontSize: "10px",
                              }}
                            >
                              {country.Qty.toLocaleString()}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col">
                <div
                  className="map-container"
                  style={{ height: "230px", width: "100%" }}
                >
                  <MapContainer
                    center={[20, 0]} // Center of the map (World view)
                    zoom={zoomLevel}
                    style={{ height: "100%", width: "100%" }}
                    worldCopyJump={true}
                    maxBounds={[
                      [-90, -180], // Southwest corner
                      [90, 180], // Northeast corner
                    ]}
                    attributionControl={false} // Disable attribution control
                  >
                    {/* map link */}
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    <ZoomListener />
                    {locations.map((location, index) => (
                      <CircleMarker
                        key={index}
                        center={location.position}
                        radius={getBubbleSize(location.qty)} // Dynamic bubble size based on quantity
                        fillColor={location.color} // Color based on filter
                        color="none"
                        fillOpacity={0.4}
                        stroke={true}
                      >
                        <Tooltip
                          direction="top"
                          offset={[0, -5]}
                          opacity={1}
                          interactive={true} // Allow interaction to ensure visibility
                          permanent={false} // Tooltip will appear on hover
                        >
                          <div>
                            <b>{location.name}</b>
                            <br />
                            Qty: {location.qty.toLocaleString()} MT
                          </div>
                        </Tooltip>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          {" "}
          <div className="d-flex gap-2 mt-2">
            {/* Current Price Card */}
            <div className="card d-flex flex-column rounded-3 p-2 w-100">
              <p className="head-theme">Current Price*</p>

              <div className="d-flex justify-content-between  px-2">
                <div className="text-start">
                  <p
                    className="global-kpi-num text-start pt-2 "
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    ₹ 54,100
                  </p>
                  <p className="global-kpi-name">per tonne</p>
                </div>
                <div className="">
                  <p className="kpi-secondary-title mt-2">
                    <span
                      className="kpi-secondary-data-1"
                      style={{ fontSize: "16px" }}
                    >
                      <FaArrowUp size={12} className="me-1" />
                      2.9%
                    </span>{" "}
                    <br />
                    MOM Change
                  </p>
                  <p className="kpi-secondary-title mt-1">
                    <span
                      className="kpi-secondary-data-2"
                      style={{ fontSize: "16px" }}
                    >
                      <FaArrowDown size={12} className="me-1" />
                      1.4%
                    </span>{" "}
                    <br />
                    YOY Change
                  </p>
                </div>
              </div>
              <div>
                <hr
                  className="p-0 mb-0"
                  style={{ color: "rgba(0, 0, 0, 0.5)" }}
                />
                <p
                  className=" p-0 m-0 text-secondary"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Last Updated : April 2025
                </p>
              </div>
            </div>

            {/*  Current Market Size Card */}
            <div className="card d-flex flex-column rounded-3 p-2 w-100">
              <p className="head-theme">Current Market Size</p>

              <div className="d-flex justify-content-between  px-2">
                <div className="text-start">
                  <p
                    className="global-kpi-num text-start pt-2"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    ₹ 4.3
                  </p>
                  <p className="global-kpi-name">Lakh Cr.</p>
                </div>
                <div className="">
                  <p className="kpi-secondary-title mt-2">
                    <span
                      className="kpi-secondary-data-1"
                      style={{ fontSize: "16px" }}
                    >
                      <FaArrowUp size={12} className="me-1" />
                      8.4%
                    </span>{" "}
                    <br />
                    CAGR
                  </p>
                  <p className="kpi-secondary-title mt-1">
                    <span
                      className="global-kpi-num"
                      style={{ fontSize: "16px" }}
                    >
                      ₹ 8.9 <span style={{ fontSize: "10px" }}>Lakh Cr.</span>
                    </span>{" "}
                    <br />
                    Forecasted (2030)
                  </p>
                </div>
              </div>
              <div>
                <hr
                  className="p-0 mb-0"
                  style={{ color: "rgba(0, 0, 0, 0.5)" }}
                />
                <p
                  className=" p-0 m-0 text-secondary"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Last Updated : April 2025
                </p>
              </div>
            </div>

            <div className="card rounded-3 p-3 w-100 d-flex flex-column align-items-start">
              <p className="head-theme ">Key Global Players</p>
              <div className="d-flex flex-column align-items-start">
                {categoryOverviewData?.executiveSummary?.keyPlayers?.companies.map(
                  (data) => (
                    <li className="global-font p-0 m-0">{data}</li>
                  )
                )}
              </div>
            </div>
          </div>
          {/* TOP Consumer , Producers, Players */}
          <div className="d-flex gap-2 mt-2">
            <div className="card rounded-3 p-2 w-100 d-flex flex-column ">
              <p className="head-theme ">Global Steel Production (2023)​</p>

              <div className="d-flex flex-column justify-content-center px-2 align-items-center">
                <p
                  className="global-kpi-num"
                  style={{
                    fontSize: "clamp(18px, 2vw, 20px)",
                    fontWeight: "bold",
                  }}
                >
                  188 Cr.
                </p>
                <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  Tonnes
                </p>
              </div>
            </div>

            <div className="card rounded-3 p-2 w-100 d-flex flex-column ">
              <p className="head-theme ">Global Steel Consumption (2024)​​</p>

              <div className="d-flex flex-column justify-content-center px-2 align-items-center">
                <p
                  className="global-kpi-num"
                  style={{
                    fontSize: "clamp(18px, 2vw, 20px)",
                    fontWeight: "bold",
                  }}
                >
                  179.2 Cr.
                </p>
                <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  Tonnes
                </p>
              </div>
            </div>

            <div className="card rounded-3 p-3 w-100 d-flex flex-column ">
              <p className="head-theme ">Top Steel Producer</p>

              <div className="d-flex flex-column justify-content-center px-2 align-items-center">
               <div className="d-flex justify-content-center align-items-center">
                    {" "}
                    <img
                      src={chinaFlagUrl}
                      alt="China Flag"
                      style={{ width: 20, height: 14, marginRight: 6 }}
                    />
                    <p
                      className="global-kpi-num"
                      style={{
                        fontSize: "clamp(18px, 2vw, 20px)",
                        fontWeight: "bold",
                      }}
                    >
                      China
                    </p>
                  </div>
                <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  101.91 Cr. Tonnes
                </p>
              </div>
            </div>
            <div className="card rounded-3 p-3 w-100 d-flex flex-column ">
              <p className="head-theme ">Top Steel Consumer</p>

              <div className="d-flex flex-column justify-content-center px-2 align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    {" "}
                    <img
                      src={chinaFlagUrl}
                      alt="China Flag"
                      style={{ width: 20, height: 14, marginRight: 6 }}
                    />
                    <p
                      className="global-kpi-num"
                      style={{
                        fontSize: "clamp(18px, 2vw, 20px)",
                        fontWeight: "bold",
                      }}
                    >
                      China
                    </p>
                  </div>
                <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  188 Cr. Tonnes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 3 ####################  */}

      <div className="global-cards mt-1">
        <p className="head-theme">
          Global Market Outlook & Trade Risks by Region​
        </p>
        <div className="d-flex justify-content-between overflow-auto my-2 gap-1">
          {commodityOverviewData?.globalTrends?.map((data, index) => {
            const code = countryCodes[data.country]; // Get country code dynamically
            const lowerCaseCode = code?.toLowerCase();
            const flagUrl = lowerCaseCode
              ? `https://flagcdn.com/w40/${lowerCaseCode}.png`
              : ""; // Generate flag URL dynamically

            return (
              <div
                key={index}
                className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2"
                style={{ width: "310px" }}
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      {flagUrl && (
                        <img
                          src={flagUrl}
                          alt={`${data.country} flag`}
                          style={{ width: 20, height: 14, marginRight: 6 }}
                        />
                      )}
                      <p className="head-theme p-0 m-0">{data.country}</p>
                    </div>
                    <p className="global-font fw-bold p-0 m-0 text-secondary">
                      # {data.categorization}
                    </p>
                  </div>
                  <p
                    className="global-font mb-0 rs-text-justify"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "4.5em",
                      lineHeight: "1.5em", // Add consistent line height
                      minHeight: "4.5em", // Ensure consistent height
                      wordBreak: "break-word", // Handle long words
                    }}
                  >
                    {data.strategicMarketAnalysis}
                  </p>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <p
                    className="global-font p-0 m-0 rounded-4 px-2"
                    style={{
                      backgroundColor: "var(--color-main-light2)",
                    }}
                  >
                    {data.badge}
                  </p>
                  <LuSquareArrowOutUpRight
                    className="me-2"
                    onClick={() => openModal(data)}
                    style={{ cursor: "pointer" }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Expand"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Modal for full description */}
      {modalData && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the modal
            zIndex: 1050,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a semi-transparent background
          }}
        >
          <div className="modal-dialog mt-5">
            <div
              className=" modal-content global-dashed-card d-flex flex-column justify-content-between rounded-4 p-3"
              style={{ backgroundColor: "#e0eeef" }}
            >
              <div className="text-end">
                <button
                  className="btn-close"
                  onClick={closeModal}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Close"
                />
              </div>
              <div>
                <div className="d-flex justify-content-start align-items-center">
                  {modalData.flagUrl && (
                    <img
                      src={modalData.flagUrl}
                      alt={`${modalData.country} flag`}
                      style={{ width: 24, height: 16, marginRight: 8 }}
                    />
                  )}
                  <p className="head-theme p-0 m-0">{modalData.country}</p>
                </div>
                <p className="global-font mb-0 rs-text-justify">
                  {modalData.strategicMarketAnalysis}
                </p>
                <div className="d-flex justify-content-between mt-2 ">
                  <p className="global-font fw-bold p-0 m-0">
                    # {modalData.categorization}
                  </p>
                  <p
                    className="global-font p-0 m-0 rounded-4 px-2 "
                    style={{
                      backgroundColor: "var(--color-bg-yellow)",
                    }}
                  >
                    {modalData.badge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ################# Price Trend #################### */}

      <div className="row g-2 mb-2">
        {/* Chart and News side by side */}
        <div className="col-9">
          <div
            className="w-100 mb-2 global-cards mt-2"
            style={{ minHeight: "380px" }}
            ref={forecastingChartContainerRef}
          >
            <div className="d-flex justify-content-between align-items-center mb-3  px-2">
              <p className="head-theme">Price Trend</p>
              <div className="d-flex gap-2">
                {/* Commodity Filter */}
                <Dropdown
                  onSelect={(key) => {
                    setForecastingSelectedCommodity(key);
                    setForecastingSelectedYear("All Years"); // Reset year on commodity change
                  }}
                >
                  <Dropdown.Toggle variant="light" size="sm">
                    {forecastingCommodityOptions.find(
                      (c) => c.key === forecastingSelectedCommodity
                    )?.label || "Select Commodity"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {forecastingCommodityOptions.map((commodity) => (
                      <Dropdown.Item
                        key={commodity.key}
                        eventKey={commodity.key}
                      >
                        {commodity.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {/* Year Filter */}
                <Dropdown onSelect={(key) => setForecastingSelectedYear(key)}>
                  <Dropdown.Toggle variant="light" size="sm">
                    {forecastingSelectedYear}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {forecastingUniqueYears.map((year, index) => (
                      <Dropdown.Item key={index} eventKey={year}>
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {/* Data Basis Filter */}
                <Dropdown onSelect={(key) => setForecastingDataBasis(key)}>
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
                  Reset
                </button>
              </div>
            </div>
            {/* Only render Chart if data is available */}
            {forecastingFilteredChartData &&
            forecastingFilteredChartData.length > 0 ? (
              <div
                key={`${forecastingSelectedCommodity}-${forecastingSelectedYear}-${forecastingDataBasis}`}
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
          {/* News Card Display - always visible */}
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
                    //  className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 "
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

      {/* ################# Level 4 #################### */}
      <div className="row g-2 mb-2">
        {" "}
        <div className="col-3">
          {" "}
          <div className="w-100 global-cards mt-2">
            <p className="head-theme">Commodity News Feed</p>
            <div className="overflow-auto pe-1" style={{ height: "320px" }}>
              {commodityOverviewData?.FlatSteelNews.map((x) => {
                return (
                  <div
                    className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 mt-1 text-start position-relative"
                    //  className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 "
                    style={{
                      cursor: "pointer",

                      backgroundColor: `${
                        x.sentiment_score === 0
                          ? ` rgb(255, 220, 151,0.3)`
                          : x.sentiment_score < 0
                          ? `rgba(255, 167, 157, 0.3)`
                          : ` rgb(181, 255, 207,0.3)`
                      }`,
                      border: `1px dashed ${
                        x.sentiment_score === 0
                          ? "var(--color-yellow)"
                          : x.sentiment_score < 0
                          ? "var(--color-red)"
                          : "var(--color-green)"
                      }`,
                    }}
                    onClick={() => {
                      window.open(x.url, "_blank");
                    }}
                  >
                    <p className=" mb-1 p-0 global-font ">{x.classification}</p>
                    <p
                      className="fw-bold m-0 mb-2 p-0 global-font "
                      style={{ color: "var(--color-main)" }}
                    >
                      {x.title}
                    </p>

                    <p className="global-font p-0 m-0 text-secondary">
                      Released {formatDate(x.published)}
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
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="row g-2 ">
            <div className="col-6">
              <div className="w-100 global-cards">
                <div className="d-flex justify-content-between mb-2 pb-1">
                  <p className="head-theme text-start">
                    Key Price Drivers Analysis
                  </p>
                </div>
                <div
                  className="table-responsive px-1"
                  style={{ maxHeight: "310px", overflowY: "auto" }}
                >
                  <table className="table table-striped">
                    <thead
                      style={{
                        position: "sticky",
                        top: "0",
                        backgroundColor: "#fff",
                        zIndex: "1",
                      }}
                    >
                      <tr>
                        {Object.keys(priceDriverData[0]).map((key, index) => (
                          <th key={index} style={defaultStyleHead}>
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {priceDriverData.map((row, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          {Object.values(row).map((value, idx) => (
                            <td key={idx} style={defaultStyles}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="w-100 global-cards ">
                <p className="head-theme">Cost Breakdown Analysis</p>
                <Chart
                  options={optionsCostBreakDown}
                  series={seriesCostBreakDown}
                  type="bar"
                  height={120}
                />
              </div>

              <div className="w-100 global-cards mt-2">
                <p className="head-theme">Steel Use By Industry</p>
                <Chart
                  options={steelUsageChart.options}
                  series={steelUsageChart.series}
                  type="donut"
                  height={140}
                  width={460}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 5 #################### */}
      <div className="row g-2">
        {" "}
        <div className="col-4">
          <div className="w-100  global-cards" style={{ height: "450px" }}>
            <p className="head-theme">Strategic Risk & Opportunity Insights</p>

            <div
              className="d-flex justify-content-between overflow-auto my-2 gap-1 flex-column pe-1 "
              style={{ gap: "10px", overflowY: "auto", maxHeight: "400px" }}
            >
              {commodityOverviewData?.riskAndOpportunity?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 text-start "
                  style={{
                    cursor: "pointer",
                    backgroundColor: `${
                      data.RiskLevel === "Moderate"
                        ? `rgb(255, 220, 151,0.2)`
                        : data.RiskLevel === "High"
                        ? `rgba(255, 167, 157, 0.2)`
                        : `rgb(181, 255, 207,0.2)`
                    }`,
                    border: `1px dashed ${
                      data.RiskLevel === "Moderate"
                        ? "var(--color-yellow)"
                        : data.RiskLevel === "High"
                        ? "var(--color-red)"
                        : "var(--color-green)"
                    }`,
                  }}
                  onClick={() => window.open(data.Source, "_blank")}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <p
                        className="global-font p-0 m-0 "
                        style={{
                          color: "var(--color-main)",
                          fontWeight: "550",
                          width: "80%",
                        }}
                      >
                        {data.Headline}
                      </p>
                      <p
                        className="global-font fw-bold m-0 rounded-3 d-flex align-items-center"
                        style={{
                          color: `${
                            data.RiskLevel === "Moderate"
                              ? "var(--color-yellow)"
                              : data.RiskLevel === "High"
                              ? "var(--color-red)"
                              : "var(--color-green)"
                          }`,
                        }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`${data.RiskLevel} Risk`}
                      >
                        {data.RiskLevel === "High" && (
                          <FaCaretUp style={{ marginRight: "2px" }} />
                        )}
                        {data.RiskLevel === "Low" && (
                          <FaCaretDown style={{ marginRight: "2px" }} />
                        )}
                        {data.RiskLevel === "Moderate" && (
                          <RiExpandUpDownFill style={{ marginRight: "2px" }} />
                        )}
                        Risk
                      </p>
                    </div>

                    <p className="d-flex flex-column global-font mb-0 rs-text-justify">
                      {data.Description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-2 align-items-center">
                    <p className="global-font  p-0 m-0">
                      <BsGlobeEuropeAfrica className="text-secondary" />
                      {" | "}

                      {data.GeographiesAffected}
                    </p>

                    <p
                      className="global-font p-0 m-0 rounded-4 px-3"
                      style={{
                        backgroundColor: `${
                          data.ImpactDuration === "Medium-Term"
                            ? "var(--color-bg-yellow)"
                            : data.ImpactDuration === "Long-Term"
                            ? "var(--color-bg-red)"
                            : "var(--color-bg-green)"
                        }`,
                      }}
                    >
                      {data.ImpactDuration} Impact
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-8">
          {" "}
          <div className="w-100 global-cards" style={{ height: "450px" }}>
            <p className="head-theme">Negotiation Levers</p>
            <div
              className="d-grid mt-2 pe-1"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)", // Set 3 cards per row
                gap: "10px",
                overflowY: "auto",
                maxHeight: "400px",
              }}
            >
              {commodityOverviewData?.negotiationLevers?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 text-start"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                  }}
                  onClick={() => window.open(data.Source, "_blank")}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <p
                        className="global-font p-0 m-0 mb-1"
                        style={{
                          color: "var(--color-main)",
                          fontWeight: "550",
                        }}
                      >
                        {data.NegotiationLever}
                      </p>
                      <div
                        className="global-font fw-bold  m-0 rounded-3 d-flex align-items-center"
                        style={{
                          color: `${
                            data.RiskLevel === "Moderate"
                              ? "var(--color-yellow)"
                              : data.RiskLevel === "High"
                              ? "var(--color-red)"
                              : "var(--color-green)"
                          }`,
                        }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`${data.RiskLevel} Risk`}
                      >
                        {data.RiskLevel === "High" && (
                          <FaCaretUp style={{ marginRight: "2px" }} />
                        )}
                        {data.RiskLevel === "Low" && (
                          <FaCaretDown style={{ marginRight: "2px" }} />
                        )}
                        {data.RiskLevel === "Moderate" && (
                          <RiExpandUpDownFill style={{ marginRight: "2px" }} />
                        )}
                        Risk
                      </div>
                    </div>
                    <p className="global-font mb-0 rs-text-justify">
                      {data.Description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <p className="global-font p-0 m-0">
                      <BsGlobeEuropeAfrica className="text-secondary" />
                      {" | "}
                      {data.GeographiesAffected}
                    </p>
                    <p
                      className="global-font p-0 m-0 rounded-4 px-3"
                      style={{
                        backgroundColor: `${
                          data.ImpactDuration === "Medium-Term"
                            ? "var(--color-bg-yellow)"
                            : data.ImpactDuration === "Long-Term"
                            ? "var(--color-bg-red)"
                            : "var(--color-bg-green)"
                        }`,
                      }}
                    >
                      {data.ImpactDuration} Impact
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommodityOverviewTab;
