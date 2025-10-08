import React, { useEffect, useState, useRef, useCallback } from "react";
import Chart from "react-apexcharts";
import { Dropdown } from "react-bootstrap";
import "../css/CommodityIntelligenceNew.css";
import "leaflet/dist/leaflet.css";
import { commodityOverviewData } from "../Data/overviewData";
import { Tabs, Tab, Form } from "react-bootstrap"; // Import Form for the switch

const OverviewTab = () => {
  // Tabs
  const [activeChartTab, setActiveChartTab] = useState("PriceTrend");

  // others
  const [forecastingDataBasis, setForecastingDataBasis] =
    useState("Monthly Data");
  const [forecastingSelectedYear, setForecastingSelectedYear] =
    useState("All Years");
  const [forecastingSelectedCommodity, setForecastingSelectedCommodity] =
    useState("hrcPriceData");

  // State for selected news (for card display)
  const [forecastingSelectedNews, setForecastingSelectedNews] = useState([]);
  const [forecastingSelectedNewsDate, setForecastingSelectedNewsDate] =
    useState(null);

  const forecastingChartContainerRef = useRef(null);
  const forecastingChartRef = useRef(null);

  const forecastingParseDate = (dateString) => {
    if (!dateString) {
      console.warn("Invalid date string:", dateString);
      return new Date();
    }
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

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
        });
      }
      return quarterlyData;
    } else if (basis === "Yearly Data") {
      const yearlyData = [];
      const yearMap = {};

      selectedData.forEach((item) => {
        const year = forecastingParseDate(item.Date || item.date).getFullYear();
        if (!yearMap[year]) {
          yearMap[year] = { total: 0, count: 0 };
        }
        yearMap[year].total += item.HRC_Price || item.price || 0;
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
    { key: "crcPriceData", label: "CRC Price" },
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
        commodityOverviewData.commodityPricingData[
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

  // Prepare filtered data for chart - SEPARATE historical and forecasted data
  const commodityData =
    commodityOverviewData.commodityPricingData[forecastingSelectedCommodity] ||
    [];

  // Separate historical and forecasted data
  const historicalData = commodityData
    .filter((item) => item.price !== undefined)
    .map((item) => ({
      Date: item.date,
      HRC_Price: item.price,
      isForecasted: false,
    }))
    .sort(
      (a, b) => forecastingParseDate(a.Date) - forecastingParseDate(b.Date)
    );

  const forecastedData = commodityData
    .filter((item) => item.forecasted_price !== undefined)
    .map((item) => ({
      Date: item.date,
      HRC_Price: item.forecasted_price,
      isForecasted: true,
    }))
    .sort(
      (a, b) => forecastingParseDate(a.Date) - forecastingParseDate(b.Date)
    );

  // Combine and filter by year
  const allCommodityData = [...historicalData, ...forecastedData];
  const forecastingFilteredCommodityData = forecastingFilterDataByYear(
    allCommodityData,
    forecastingSelectedYear
  ).sort((a, b) => forecastingParseDate(a.Date) - forecastingParseDate(b.Date));

  const forecastingFilteredChartData = forecastingFilterDataByBasis(
    forecastingDataBasis,
    forecastingFilteredCommodityData
  );

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

  // CHART OPTIONS - Updated to handle multiple series
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
        width: [2, 2, 2, 2],
        dashArray: [0, 0, 2, 0], // only forecasted line is dotted
        colors: ["#38858e", "#38858e", "#db3f3fff", "#ffcdcdff"],
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
        customLegendItems: ["Historical Data", "Forecasted Data"],
        markers: {
          fillColors: ["#38858e", "#ff6b6b"],
        },
      },
      colors: ["#38858e", "#38858e", "#ff6b6b", "#ff6b6b"], // Consistent colors for all series
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

  // CHART SERIES - Four series: historical line, historical bar, forecasted line, forecasted bar
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
    ];
  }, [forecastingFilteredChartData]);

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

  // KPIS Data
  const kpis = [
    {
      title: "Current Delta",
      items: [
        { label: "Month", value: "₹0.45 /Kg | May'25" },
        { label: "Quarter", value: "₹1.90 | Apr–Jun'25" },
      ],
    },
    {
      title: "Next Delta (F)",
      items: [
        { label: "Month", value: "₹ -0.15 /Kg | Jun'25" },
        { label: "Quarter", value: "₹0.17 | Jul–Sep'25" },
      ],
    },
    {
      title: "Accuracy",
      items: [
        { label: "Model", value: "May-25: 98.7%" },
        { label: "Delta Difference", value: "May-25 : ₹0.81 /Kg" },
      ],
    },
    {
      title: "Data As Of",
      items: [
        { label: "Price", value: "May-25" },
        { label: "News", value: "17-06-25" },
      ],
    },
  ];

  // table data
  // Data structure based on the image
  const negotiationLeversData = [
    {
      quarter: "Q2-2025\n(Apr–Jun)",
      activeScenario: "Base",
      likelihood: "High",
      activeDeltaRange: "₹1.1 to ₹1.2",
      modelDelta: "₹ 1.14",
      marketSentiment: "Stable",
      keyDrivers:
        "The sharp rise in HRC prices during Mar–Apr has plateaued. In June, mills held list prices flat despite muted demand. No new hikes were announced. While safeguard duty (12%) remains in effect, speculation of a 24% hike is building. Imports from SEA remain elevated, and the recent U.S. tariff hike on Chinese steel raises risk of regional oversupply.",
      deltaTrend: [
        "Trend 1: Safeguard duty effect has been fully priced in. Duty hike speculation from 12% to 24% is being used as a forward-looking justification by mills, but remains uncertain.",
        "Trend 2: Imports remain elevated despite duty; Korea and Japan continue to supply actively.",
        "Trend 3: U.S. doubling of tariffs on imported steel has raised risk of regional redirection and softening benchmarks.",
        "Trend 4: Infrastructure and construction demand is seasonally suppressed, adding downward pressure on mill realizations.",
      ],
      negotiationStrategy: [
        "Lever 1: Defer major buys to late June or July to capture downside from demand dip and import competition.",
        "Lever 2: Do not accept duty hike arguments as fact — demand transparent, even-based pricing.",
        "Lever 3: Benchmark against Korean/Japanese landed offers to enforce pricing discipline.",
        "Lever 4: Use oversupply signals (China redirection + SEA pricing) to push for short-term flexible rate bands.",
      ],
    },
    {
      quarter: "Q1-2025\n(Jan–Mar)",
      activeScenario: "Upside",
      likelihood: "High",
      activeDeltaRange: "₹2.0 to ₹2.5",
      modelDelta: "₹ 3.35",
      marketSentiment: "Negative",
      keyDrivers:
        "Safeguard duty anticipation and resilient domestic demand outweigh raw material cost softness, supporting firm pricing into March.",
      deltaTrend: [
        "Trend 1: Steel prices faced slight downward pressure in January–February driven by weak demand and increased import inflows.",
        "Trend 2: From March onwards, mills firmed pricing due to safeguard duty anticipation and expected tightening of global supply.",
      ],
      negotiationStrategy: [
        "Lever 1: Leverage early-quarter import oversupply and lower raw material costs to secure favorable deals.",
        "Lever 2: Push back against any speculative price hikes tied to an unconfirmed safeguard policy.",
        "Lever 3: Secure strategic volumes cautiously before full safeguard duty confirmation to mitigate late-quarter price firming risks.",
      ],
    },
  ];

  return (
    <div className="commodity-data mt-2">
      {/* ################# KPIs #################### */}
      <div className="d-flex gap-2 flex-wrap w-100">
        {kpis.map((card, index) => (
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
                  <p className="head-theme">Price Trend</p>
                  <div className="d-flex gap-2">
                    {/* Commodity Filter */}
                    <Dropdown
                      onSelect={(key) => {
                        setForecastingSelectedCommodity(key);
                        setForecastingSelectedYear("All Years");
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
                    <Dropdown
                      onSelect={(key) => setForecastingSelectedYear(key)}
                    >
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
          <p />
        </Tab>
        <Tab eventKey="ForecastedDelta" title="Forecasted Delta">
          <p />
        </Tab>
        <Tab eventKey="SettledDelta" title="Settled Delta">
          <p />
        </Tab>
        <Tab eventKey="QuarterlyDelta" title="Static Quarterly Delta">
          <p />
        </Tab>
      </Tabs>

      {/* ################# Level 3 #################### */}

      <div className="global-cards">
        <p className="head-theme">Negotiation Levers</p>
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
              {negotiationLeversData.map((data, index) => (
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
