import React, { useState, useRef, useCallback, useMemo } from "react";
import Chart from "react-apexcharts";
import { Dropdown, Tabs, Tab } from "react-bootstrap";
import "../css/CommodityIntelligenceNew.css";
import "leaflet/dist/leaflet.css";
import { commodityOverviewData } from "../Data/overviewData";

const OverviewTab = () => {
  // State Management
  const [activeChartTab, setActiveChartTab] = useState("PriceTrend");
  const [globalSelectedCommodity, setGlobalSelectedCommodity] =
    useState("hrcPriceData");
  const [globalSelectedYear, setGlobalSelectedYear] = useState("All Years");
  const [forecastingDataBasis, setForecastingDataBasis] =
    useState("Monthly Data");
  const [forecastingSelectedNews, setForecastingSelectedNews] = useState([]);
  const [forecastingSelectedNewsDate, setForecastingSelectedNewsDate] =
    useState(null);

  const forecastingChartContainerRef = useRef(null);

  // Constants
  const commodityOptions = [
    { key: "hrcPriceData", label: "HRC Price" },
    { key: "crcPriceData", label: "CRC Price" },
  ];

  const commodityKeyMap = {
    hrcPriceData: {
      key: "hrc",
      yAxis: "HRC Price (INR/Tonne)",
      legend: "HRC Price",
    },
    crcPriceData: {
      key: "crc",
      yAxis: "CRC Price (INR/Tonne)",
      legend: "CRC Price",
    },
  };

  // Helper Functions
  const parseDate = (dateString) => {
    if (!dateString) return new Date();
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatXAxisLabel = (dateString, basis) => {
    const date = parseDate(dateString);
    if (basis === "Yearly Data") return date.getFullYear().toString();
    if (basis === "Quarterly Data") {
      const month = date.getMonth();
      const year = date.getFullYear();
      const quarters = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
      return `${quarters[Math.floor(month / 3)]} ${year}`;
    }
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  const filterDataByYear = (data, year) =>
    year === "All Years"
      ? data
      : data.filter(
          (item) =>
            parseDate(item.Date || item.date)
              .getFullYear()
              .toString() === year
        );

  const filterDataByBasis = (basis, data) => {
    if (basis === "Monthly Data") return data;

    if (basis === "Quarterly Data") {
      return data.reduce((acc, item, i) => {
        if (i % 3 === 0) {
          const quarterData = data.slice(i, i + 3);
          const avgPrice =
            quarterData.reduce(
              (sum, d) => sum + (d.HRC_Price || d.price || 0),
              0
            ) / quarterData.length;
          acc.push({
            Date: quarterData[quarterData.length - 1].Date,
            HRC_Price: avgPrice,
            isForecasted: quarterData[quarterData.length - 1].isForecasted,
            best_buy_price: quarterData[quarterData.length - 1].best_buy_price,
          });
        }
        return acc;
      }, []);
    }

    const yearMap = {};
    data.forEach((item) => {
      const year = parseDate(item.Date || item.date).getFullYear();
      if (!yearMap[year])
        yearMap[year] = {
          total: 0,
          count: 0,
          isForecasted: item.isForecasted,
          best_buy_price: item.best_buy_price,
        };
      yearMap[year].total += item.HRC_Price || item.price || 0;
      yearMap[year].count += 1;
    });

    return Object.keys(yearMap).map((year) => ({
      Date: `31-12-${year}`,
      HRC_Price: yearMap[year].total / yearMap[year].count,
      isForecasted: yearMap[year].isForecasted,
      best_buy_price: yearMap[year].best_buy_price,
    }));
  };

  const getNewsForDate = (dateString) => {
    const targetDate = parseDate(dateString);
    return (commodityOverviewData.newsData || []).filter((newsItem) => {
      const newsDate = parseDate(newsItem.published);
      return (
        newsDate.getMonth() === targetDate.getMonth() &&
        newsDate.getFullYear() === targetDate.getFullYear()
      );
    });
  };

  // Memoized Values
  const uniqueYears = useMemo(() => {
    const allYears = new Set();
    commodityOptions.forEach((commodity) => {
      (commodityOverviewData.commodityPricingData[commodity.key] || []).forEach(
        (item) => {
          if (item.date) allYears.add(parseDate(item.date).getFullYear());
        }
      );
    });
    return ["All Years", ...Array.from(allYears).sort((a, b) => b - a)];
  }, []);

  const commodityData = useMemo(
    () =>
      commodityOverviewData.commodityPricingData[globalSelectedCommodity] || [],
    [globalSelectedCommodity]
  );

  const historicalData = useMemo(
    () =>
      commodityData
        .filter((item) => item.price !== undefined)
        .map((item) => ({
          Date: item.date,
          HRC_Price: item.price,
          isForecasted: false,
          best_buy_price: item.best_buy_price,
        }))
        .sort((a, b) => parseDate(a.Date) - parseDate(b.Date)),
    [commodityData]
  );

  const forecastedData = useMemo(
    () =>
      commodityData
        .filter((item) => item.forecasted_price !== undefined)
        .map((item) => ({
          Date: item.date,
          HRC_Price: item.forecasted_price,
          isForecasted: true,
          best_buy_price: item.best_buy_price,
        }))
        .sort((a, b) => parseDate(a.Date) - parseDate(b.Date)),
    [commodityData]
  );

  const filteredChartData = useMemo(() => {
    const allData = [...historicalData, ...forecastedData];
    const yearFiltered = filterDataByYear(allData, globalSelectedYear).sort(
      (a, b) => parseDate(a.Date) - parseDate(b.Date)
    );
    return filterDataByBasis(forecastingDataBasis, yearFiltered);
  }, [
    historicalData,
    forecastedData,
    globalSelectedYear,
    forecastingDataBasis,
  ]);

  const filteredKPIs = useMemo(() => {
    const baseKPIs = commodityOverviewData.kpis || [];
    const replacementKey =
      globalSelectedCommodity === "hrcPriceData"
        ? { from: "CRC", to: "HRC" }
        : { from: "HRC", to: "CRC" };
    return baseKPIs.map((kpi) => ({
      ...kpi,
      items: kpi.items.map((item) => ({
        ...item,
        label: item.label.replace(
          new RegExp(replacementKey.from, "g"),
          replacementKey.to
        ),
        value: item.value.replace(
          new RegExp(replacementKey.from, "g"),
          replacementKey.to
        ),
      })),
    }));
  }, [globalSelectedCommodity]);

  const filteredNegotiationLevers = useMemo(() => {
    const baseLevers = commodityOverviewData.negotiationLeversData || [];
    const filterKey =
      globalSelectedCommodity === "hrcPriceData" ? "HRC" : "CRC";
    const excludeKey =
      globalSelectedCommodity === "hrcPriceData" ? "CRC" : "HRC";
    return baseLevers.filter(
      (lever) =>
        lever.quarter.includes(filterKey) || !lever.quarter.includes(excludeKey)
    );
  }, [globalSelectedCommodity]);

  // Chart Configuration Generator
  const createDeltaChart = (dataKey, settledMode = false) => {
    const commodityKey = commodityKeyMap[globalSelectedCommodity].key;
    const sourceData = settledMode
      ? commodityOverviewData.settledDeltaChartData?.[commodityKey]
      : commodityOverviewData.deltaViewChartData?.[commodityKey];

    const defaultData = {
      categories: [],
      actualDelta: [],
      [settledMode ? "settledDelta" : "forecastedDelta"]: [],
    };
    const chartData = sourceData || defaultData;
    const secondSeriesKey = settledMode ? "settledDelta" : "forecastedDelta";

    const categoriesWithYears = chartData.categories.map((category, index) => {
      const yearMatch = category.match(/\d{4}/);
      return {
        category,
        year: yearMatch ? yearMatch[0] : "",
        actualDelta: chartData.actualDelta[index],
        [secondSeriesKey]: chartData[secondSeriesKey][index],
      };
    });

    let filteredData =
      globalSelectedYear !== "All Years"
        ? categoriesWithYears.filter((item) => item.year === globalSelectedYear)
        : categoriesWithYears;

    if (forecastingDataBasis === "Yearly Data") {
      const yearlyGroups = {};
      filteredData.forEach((item) => {
        if (!yearlyGroups[item.year]) {
          yearlyGroups[item.year] = { actualDelta: [], [secondSeriesKey]: [] };
        }
        if (item.actualDelta !== null)
          yearlyGroups[item.year].actualDelta.push(item.actualDelta);
        if (item[secondSeriesKey] !== null)
          yearlyGroups[item.year][secondSeriesKey].push(item[secondSeriesKey]);
      });

      filteredData = Object.keys(yearlyGroups).map((year) => ({
        category: year,
        year,
        actualDelta:
          yearlyGroups[year].actualDelta.length > 0
            ? yearlyGroups[year].actualDelta.reduce((a, b) => a + b, 0) /
              yearlyGroups[year].actualDelta.length
            : null,
        [secondSeriesKey]:
          yearlyGroups[year][secondSeriesKey].length > 0
            ? yearlyGroups[year][secondSeriesKey].reduce((a, b) => a + b, 0) /
              yearlyGroups[year][secondSeriesKey].length
            : null,
      }));
    }

    const pendingAnnotations = settledMode
      ? filteredData
          .map((item, index) =>
            item[secondSeriesKey] === null
              ? {
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
                    style: { color: "#fff", background: "#FF4560" },
                    text: "Pending Settlement",
                    offsetY: -20,
                  },
                }
              : undefined
          )
          .filter((point) => point !== undefined)
      : [];

    return {
      options: {
        chart: {
          type: "line",
          height: 400,
          zoom: { enabled: true },
          toolbar: { show: true },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config?.dataPointIndex !== undefined)
                console.log(
                  `${settledMode ? "Settled" : "Delta"} View clicked:`,
                  filteredData[config.dataPointIndex]
                );
            },
          },
        },
        stroke: { curve: "stepline", width: 3, dashArray: [0, 5] },
        dataLabels: {
          enabled: true,
          formatter: (val) => (val !== null ? `₹${val.toFixed(2)}` : ""),
          style: { fontSize: "10px" },
        },
        xaxis: {
          categories: filteredData.map((item) => item.category),
          labels: { rotate: -45, style: { fontSize: "10px" } },
          title: {
            text: "Time Period",
            style: { fontSize: "12px", fontWeight: "bold" },
          },
        },
        yaxis: {
          title: {
            text: "Delta Value (₹/Tonne)",
            style: { fontSize: "12px", fontWeight: "bold" },
          },
          labels: {
            formatter: (value) =>
              "₹" + (value !== null ? value.toFixed(2) : "0"),
          },
        },
        grid: { borderColor: "#f1f1f1" },
        colors: settledMode ? ["#008FFB", "#FF4560"] : ["#008FFB", "#00E396"],
        markers: { size: 4, hover: { size: 6 } },
        legend: { position: "top" },
        tooltip: {
          y: {
            formatter: (value) =>
              value !== null
                ? "₹" + value.toFixed(2) + "/Tonne"
                : settledMode
                ? "Not Settled"
                : "No data",
          },
          custom: ({ series, seriesIndex, dataPointIndex }) => {
            const dataPoint = filteredData[dataPointIndex];
            if (!dataPoint) return "";
            const seriesName =
              seriesIndex === 0
                ? "Actual Delta"
                : settledMode
                ? "Settled Delta"
                : "Forecasted Delta";
            const value = series[seriesIndex][dataPointIndex];
            const displayValue =
              value !== null
                ? "₹" + value.toFixed(2) + "/Tonne"
                : settledMode
                ? "Not Settled Yet"
                : "No data";
            return `<div style="padding: 8px 12px"><strong>${dataPoint.category}</strong><br/>${seriesName}: ${displayValue}</div>`;
          },
        },
        ...(settledMode && { annotations: { points: pendingAnnotations } }),
      },
      series: [
        {
          name: "Actual Delta",
          data: filteredData.map((item) => item.actualDelta),
        },
        {
          name: settledMode ? "Settled Delta" : "Forecasted Delta",
          data: filteredData.map((item) => item[secondSeriesKey]),
        },
      ],
    };
  };

  const deltaViewChart = useMemo(
    () => createDeltaChart("deltaViewChartData"),
    [globalSelectedCommodity, globalSelectedYear, forecastingDataBasis]
  );

  const settledDeltaChart = useMemo(
    () => createDeltaChart("settledDeltaChartData", true),
    [globalSelectedCommodity, globalSelectedYear, forecastingDataBasis]
  );

  // Chart Event Handlers
  const handleChartClick = useCallback(
    (event, chartContext, config) => {
      setTimeout(() => {
        if (
          !config ||
          config.dataPointIndex === -1 ||
          !filteredChartData?.length
        )
          return;
        const dataPoint = filteredChartData[config.dataPointIndex];
        if (!dataPoint?.Date) return;
        setForecastingSelectedNews(getNewsForDate(dataPoint.Date));
        setForecastingSelectedNewsDate(dataPoint.Date);
      }, 100);
    },
    [filteredChartData]
  );

  // Chart Series and Options
  const chartSeries = useMemo(() => {
    const createSeriesData = (isForecasted) =>
      filteredChartData.map((item) =>
        item.isForecasted === isForecasted ? item.HRC_Price : null
      );

    return [
      { name: "Historical Data", type: "line", data: createSeriesData(false) },
      {
        name: undefined,
        type: "bar",
        data: createSeriesData(false),
        showInLegend: false,
      },
      { name: "Forecasted Data", type: "line", data: createSeriesData(true) },
      {
        name: undefined,
        type: "bar",
        data: createSeriesData(true),
        showInLegend: false,
      },
      {
        name: "Best Buy Price",
        type: "scatter",
        data: filteredChartData.map((item) => item.best_buy_price ?? null),
      },
    ];
  }, [filteredChartData]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        height: 350,
        zoom: { enabled: true },
        toolbar: { show: true },
        animations: { enabled: false },
        events: { dataPointSelection: handleChartClick },
      },
      stroke: {
        curve: "smooth",
        width: [2, 2, 2, 2, 0],
        dashArray: [0, 0, 2, 0, 0],
        colors: ["#38858e", "#4ac7d4ff", "#db3f3fff", "#ffcdcdff", "#00FF00"],
      },
      markers: {
        size: [0, 0, 0, 0, 6],
        colors: ["#38858e", "#4ac7d4ff", "#db3f3fff", "#ffcdcdff", "#00FF00"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: { size: 8 },
      },
      xaxis: {
        categories: filteredChartData.map((item) =>
          formatXAxisLabel(item.Date, forecastingDataBasis)
        ),
        labels: { rotate: -45, style: { fontSize: "10px" } },
      },
      yaxis: {
        title: { text: commodityKeyMap[globalSelectedCommodity].yAxis },
        labels: {
          formatter: (value) => (value ? value.toLocaleString() : "0"),
        },
      },
      tooltip: {
        shared: false,
        followCursor: false,
        fixed: { enabled: false },
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const dataPoint = filteredChartData[dataPointIndex];
          if (!dataPoint?.Date || dataPoint.HRC_Price === undefined)
            return "<div style='padding:8px 12px'>No data available</div>";

          const newsList = getNewsForDate(dataPoint.Date);
          let html = `<div style="padding:8px 12px; max-width: 600px;"><strong>${formatXAxisLabel(
            dataPoint.Date,
            forecastingDataBasis
          )}</strong><br/>`;
          html += `<span>Price: ₹${dataPoint.HRC_Price.toLocaleString()}/Tonne ${
            dataPoint.isForecasted
              ? '<span style="color:#ff6b6b;">(Forecasted)</span>'
              : ""
          }</span>`;

          if (dataPoint.best_buy_price !== undefined) {
            html += `<br/><span style="color:#00AA00; font-weight:bold;">Best Buy Price: ₹${dataPoint.best_buy_price.toLocaleString()}/Tonne</span>`;
          }

          if (newsList?.length > 0) {
            html += `<hr style="margin:6px 0"/><div style="max-width:500px">`;
            newsList.slice(0, 2).forEach((news) => {
              const sentimentBg =
                news.sentiment_score > 0
                  ? "rgb(181, 255, 207)"
                  : news.sentiment_score < 0
                  ? "rgba(255, 167, 157)"
                  : "rgb(255, 220, 151)";
              const sentimentText =
                news.sentiment_score > 0
                  ? "Positive Sentiment"
                  : news.sentiment_score < 0
                  ? "Negative Sentiment"
                  : "Neutral Sentiment";
              const impactBg =
                news.impactLevel === "High Impact"
                  ? "rgb(181, 255, 207)"
                  : news.impactLevel === "Low Impact"
                  ? "rgba(255, 167, 157)"
                  : "rgb(255, 220, 151)";
              const durationBg =
                news.impactDuration === "Long-term Impact"
                  ? "rgb(181, 255, 207)"
                  : news.impactDuration === "Short-term Impact"
                  ? "rgba(255, 167, 157)"
                  : "rgb(255, 220, 151)";

              html += `<div style="text-align:start; display:flex;align-items:flex-start;justify-content:flex-start;margin-bottom:6px" class="card p-2">
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
                <div class="mt-1" style="font-size:11px;color:rgba(0, 0, 0, 0.8); background-color: ${sentimentBg}; padding:2px 6px; border-radius:4px; display:inline-block;">${sentimentText}</div>
                <div style="font-size:11px;color:rgba(0, 0, 0, 0.8); background-color: ${impactBg}; padding:2px 6px; border-radius:4px; display:inline-block;">${
                news.impactLevel
              }</div>
                <div style="font-size:11px;color:rgba(0, 0, 0, 0.8); background-color: ${durationBg}; padding:2px 6px; border-radius:4px; display:inline-block;">${
                news.impactDuration
              }</div>
              </div>
            </div>`;
            });
            if (newsList.length > 2)
              html += `<div style="font-size:11px;color:#888">+${
                newsList.length - 2
              } more news</div>`;
            html += `</div>`;
          }
          return html;
        },
      },
      plotOptions: { bar: { columnWidth: "50%" } },
      legend: {
        show: true,
        showForSingleSeries: false,
        customLegendItems: [
          "Historical Data",
          "Forecasted Data",
          "Best Buy Price",
        ],
        markers: { fillColors: ["#38858e", "#ff6b6b", "#00FF00"] },
      },
      colors: ["#38858e", "#38858e", "#ff6b6b", "#ff6b6b", "#00FF00"],
      responsive: [
        {
          breakpoint: 768,
          options: { chart: { height: 250 }, legend: { show: false } },
        },
      ],
    }),
    [
      filteredChartData,
      forecastingDataBasis,
      globalSelectedCommodity,
      handleChartClick,
    ]
  );

  // Reset Functions
  const resetChartFilters = () => {
    setForecastingDataBasis("Monthly Data");
    setForecastingSelectedNews([]);
    setForecastingSelectedNewsDate(null);
  };

  const resetAllFilters = () => {
    setGlobalSelectedCommodity("hrcPriceData");
    setGlobalSelectedYear("All Years");
    resetChartFilters();
  };

  const newsToShow =
    forecastingSelectedNews?.length > 0
      ? forecastingSelectedNews
      : commodityOverviewData.newsData || [];
  const newsTitle =
    forecastingSelectedNews?.length > 0 && forecastingSelectedNewsDate
      ? `News for ${formatXAxisLabel(
          forecastingSelectedNewsDate,
          forecastingDataBasis
        )}`
      : "All News";

  return (
    <div className="commodity-data mt-2">
      {/* Global Filters */}
      <div className="global-cards mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="head-theme mb-0">Global Filters</p>
          <div className="d-flex gap-2 align-items-center">
            <Dropdown onSelect={setGlobalSelectedCommodity}>
              <Dropdown.Toggle variant="light" size="sm">
                {commodityOptions.find((c) => c.key === globalSelectedCommodity)
                  ?.label || "Select Commodity"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {commodityOptions.map((commodity) => (
                  <Dropdown.Item key={commodity.key} eventKey={commodity.key}>
                    {commodity.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={setGlobalSelectedYear}>
              <Dropdown.Toggle variant="light" size="sm">
                {globalSelectedYear}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {uniqueYears.map((year, index) => (
                  <Dropdown.Item key={index} eventKey={year}>
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <button
              className="btn btn-theme global-font"
              onClick={resetAllFilters}
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
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
                  <p className="head-theme small text-muted mb-0">
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
          onSelect={setActiveChartTab}
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
                        commodityOptions.find(
                          (c) => c.key === globalSelectedCommodity
                        )?.label
                      }
                    </p>
                    <div className="d-flex gap-2">
                      <Dropdown onSelect={setForecastingDataBasis}>
                        <Dropdown.Toggle variant="light" size="sm">
                          {forecastingDataBasis}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {[
                            "Monthly Data",
                            "Quarterly Data",
                            "Yearly Data",
                          ].map((basis) => (
                            <Dropdown.Item key={basis} eventKey={basis}>
                              {basis}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      <button
                        className="btn btn-theme global-font"
                        onClick={resetChartFilters}
                      >
                        Reset Chart
                      </button>
                    </div>
                  </div>
                  {filteredChartData?.length > 0 ? (
                    <div
                      key={`${globalSelectedCommodity}-${globalSelectedYear}-${forecastingDataBasis}`}
                    >
                      <Chart
                        options={chartOptions}
                        series={chartSeries}
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
                <div
                  className="news-card mt-2 pt-3 global-cards text-start"
                  style={{
                    height: 400,
                    overflowY: "auto",
                    backgroundColor: "rgba(255, 255, 255, 0.62)",
                  }}
                >
                  <p className="head-theme">{newsTitle}</p>
                  <div>
                    {newsToShow.map((x, idx) => (
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
                          onClick={() => window.open(x.url, "_blank")}
                        >
                          <p className="mb-1 p-0 global-font">{x.category}</p>
                          <p
                            className="fw-bold m-0 mb-2 p-0 global-font"
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
                    {[
                      "Year",
                      "Quarter",
                      "Month",
                      "Statxo Forecasted Quarterly Delta",
                      "CRISIL Actual Quarterly Delta",
                      "Delta Difference",
                      "Accuracy",
                      "Forecast Frozen In",
                    ].map((header) => (
                      <th key={header} className="text-start defaultStyleHead">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const staticData =
                      commodityOverviewData.staticQuarterlyData || {};
                    const selectedKey =
                      commodityKeyMap[globalSelectedCommodity]?.key || "hrc";
                    let quarterlyArray = staticData[selectedKey] || [];

                    if (
                      globalSelectedYear &&
                      globalSelectedYear !== "All Years"
                    ) {
                      quarterlyArray = quarterlyArray.filter(
                        (d) => String(d.year) === String(globalSelectedYear)
                      );
                    }

                    if (!quarterlyArray.length) {
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

      {/* Negotiation Levers */}
      <div className="global-cards">
        <p className="head-theme">
          Negotiation Levers -{" "}
          {
            commodityOptions.find((c) => c.key === globalSelectedCommodity)
              ?.label
          }
        </p>
        <div className="table-container my-2">
          <table className="table table-bordered table-sm m-0">
            <thead>
              <tr>
                {[
                  "Quarter",
                  "Active Scenario",
                  "Likelihood",
                  "Active Delta Range",
                  "Model Delta",
                  "Market Sentiment",
                  "Key Drivers",
                  "Delta Trend",
                  "Negotiation Strategy",
                ].map((header) => (
                  <th key={header} className="text-start defaultStyleHead">
                    {header}
                  </th>
                ))}
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
