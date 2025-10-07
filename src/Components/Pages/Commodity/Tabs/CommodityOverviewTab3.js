import React, { useState, useRef, useCallback } from "react";
import Chart from "react-apexcharts";
import { Dropdown } from "react-bootstrap";

import "../css/CommodityIntelligenceNew.css";
import { commodityOverviewDataN } from "../Data/CommodityOverviewData3";

const CommodityOverviewTab3 = () => {
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
    // Removed Commodity A and Commodity B
  ];

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

  // Helper to get all news for a given date (match all news by month and year)
  const forecastingGetNewsForDate = (dateString) => {
    const targetDate = forecastingParseDate(dateString);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    // Return all news with same month and year
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
          text: "HRC Price (INR/Tonne)",
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
          enabled: true,
          position: "topRight",
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
              tooltipHtml += `<hr style="margin:6px 0"/><div style="max-width:500px;display:flex;flex-direction:column;gap:8px;">`;
              newsList.forEach((news) => {
                if (news && news.title) {
                  tooltipHtml += `<div style="text-align:start; display:flex; flex-direction:row; align-items:flex-start; margin-bottom:0;">
                    <div class="d-flex flex-column">
                    <div class="card p-2 w-100">
                      <div  style="font-weight:600;font-size:12px;line-height:1.2;" title="${
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
                      </div>
                      </div>
                    </div>
                  </div>`;
                }
              });
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
        customLegendItems: ["HRC Price"],
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
    ]
  );

  // Chart series - Memoized to prevent unnecessary re-renders
  const forecastingChartSeries = React.useMemo(
    () => [
      {
        name: "HRC Price",
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
    [forecastingFilteredChartData]
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

  return (
    <div className="commodity-data">
      {/* ################# Level 4 #################### */}
      <div className="row g-2 mb-2">
        {/* Chart and News side by side */}
        <div className="col-9">
          <div
            className="w-100 mb-2 global-cards mt-2"
            style={{ minHeight: "380px" }}
            ref={forecastingChartContainerRef}
          >
            <div className="d-flex justify-content-between align-items-center mb-3  px-2">
              <p className="head-theme">Pricing & Forecast</p>
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
              {forecastingNewsToShow.map((news, idx) => (
                <div
                  key={idx}
                  className="news-item d-flex flex-column justify-content-start text-start mt-2"
                >
                  <div className="global-cards">
                    <img
                      src={
                        news.imageUrl ||
                        "https://via.placeholder.com/100x60?text=News"
                      }
                      alt="news"
                      style={{
                        width: 100,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      {news.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      {news.published} | Classification: {news.classification}
                    </div>
                    <div style={{ fontSize: 12, color: "#333", marginTop: 4 }}>
                      {news.summary || news.description}
                    </div>
                    <div
                      className="d-flex justify-content-start mt-2 flex-wrap"
                      style={{
                        marginTop: 6,
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          background:
                            news.sentiment_score > 0
                              ? "#b5ffcf"
                              : news.sentiment_score < 0
                              ? "#ffa79d"
                              : "#ffdc97",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {news.sentiment_score > 0
                          ? "Positive Sentiment"
                          : news.sentiment_score < 0
                          ? "Negative Sentiment"
                          : "Neutral Sentiment"}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          background:
                            news.impactLevel === "High Impact"
                              ? "#b5ffcf"
                              : news.impactLevel === "Low Impact"
                              ? "#ffa79d"
                              : "#ffdc97",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {news.impactLevel}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          background:
                            news.impactDuration === "Long-term Impact"
                              ? "#b5ffcf"
                              : news.impactDuration === "Short-term Impact"
                              ? "#ffa79d"
                              : "#ffdc97",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {news.impactDuration}
                      </span>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      {news.url && (
                        <button
                          className="btn btn-sm btn-outline-secondary global-font"
                          onClick={() => window.open(news.url, "_blank")}
                        >
                          Read more
                        </button>
                      )}
                    </div>
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

export default CommodityOverviewTab3;
