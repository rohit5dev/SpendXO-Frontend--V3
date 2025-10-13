import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import Chart from "react-apexcharts";
import "../css/PriceDecompositionTab.css";
import { rawDecompData } from "../Data/PriceDecompData";

const getQuarter = (date) => {
  const m = date.getMonth();
  if (m < 3) return "Q1";
  if (m < 6) return "Q2";
  if (m < 9) return "Q3";
  return "Q4";
};

const PriceDecompositionTab = () => {
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");
  const [quarter, setQuarter] = useState("All");
  const [commodityGroup, setCommodityGroup] = useState("All");
  const [commodityName, setCommodityName] = useState("HRC");
  const [region, setRegion] = useState("All");

  const filterOptions = useMemo(() => {
    const years = new Set(["All"]);
    const months = new Set(["All"]);
    const commodityGroups = new Set(["All"]);
    const commodityNames = new Set();
    const regions = new Set(["All"]);
    rawDecompData.forEach((item) => {
      const date = new Date(item.Date);
      years.add(date.getFullYear().toString());
      months.add(date.toLocaleString("en-US", { month: "long" }));
      if (item["Commodity Group"]) commodityGroups.add(item["Commodity Group"]);
      if (item["Commodity Name"]) commodityNames.add(item["Commodity Name"]);
      if (item.Region) regions.add(item.Region);
    });
    return {
      years: Array.from(years).sort(),
      months: [
        "All",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      quarters: ["All", "Q1", "Q2", "Q3", "Q4"],
      commodityGroups: Array.from(commodityGroups).sort(),
      commodityNames: Array.from(commodityNames).sort(),
      regions: Array.from(regions).sort(),
    };
  }, []);

  const filteredData = useMemo(() => {
    return rawDecompData.filter((item) => {
      const date = new Date(item.Date);
      const itemYear = date.getFullYear().toString();
      const itemMonth = date.toLocaleString("en-US", { month: "long" });
      const itemQuarter = getQuarter(date);
      if (year !== "All" && itemYear !== year) return false;
      if (month !== "All" && itemMonth !== month) return false;
      if (quarter !== "All" && itemQuarter !== quarter) return false;
      if (
        commodityGroup !== "All" &&
        item["Commodity Group"] !== commodityGroup
      )
        return false;
      if (commodityName !== "All" && item["Commodity Name"] !== commodityName)
        return false;
      if (region !== "All" && item.Region !== region) return false;
      return true;
    });
  }, [year, month, quarter, commodityGroup, commodityName, region]);

  const chartData = useMemo(
    () => ({
      dates: filteredData.map((item) => item.Date.split(" ")[0]),
      priceActual: filteredData.map((item) => item["Close Price"] || null),
      priceForecasted: filteredData.map(
        (item) => item["Forecasted Price"] || null
      ),
      trend: filteredData.map((item) => item.Trend || null),
      trendForecasted: filteredData.map(
        (item) => item["Forecasted Trend"] || null
      ),
      seasonality: filteredData.map((item) => item.Seasonality || null),
      seasonalityForecasted: filteredData.map(
        (item) => item["Forecasted Seasonality"] || null
      ),
      residual: filteredData.map((item) => item.Residual || null),
      residualForecasted: filteredData.map(
        (item) => item["Forecasted Residual"] || null
      ),
    }),
    [filteredData]
  );

  const kpis = useMemo(() => {
    const prices = filteredData.map((d) => d["Close Price"]).filter((p) => p);
    if (prices.length === 0) return null;
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const overallChange = (
      ((lastPrice - firstPrice) / firstPrice) *
      100
    ).toFixed(2);
    let increaseCount = 0,
      decreaseCount = 0,
      noChangeCount = 0;
    for (let i = 1; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff > 0) increaseCount++;
      else if (diff < 0) decreaseCount++;
      else noChangeCount++;
    }
    const seasonalities = filteredData
      .map((d) => d.Seasonality)
      .filter((s) => s);
    const maxSeasonality =
      seasonalities.length > 0 ? Math.max(...seasonalities).toFixed(2) : "1.00";
    return {
      overallChange,
      increaseCount,
      decreaseCount,
      noChangeCount,
      maxSeasonality,
      trend: parseFloat(overallChange) > 0 ? "Increase" : "Decrease",
      seasonalVariation: "1.00",
    };
  }, [filteredData]);

  const tableData = useMemo(() => {
    return filteredData
      .filter((item) => item["Forecasted Price"])
      .slice(-9)
      .map((item) => {
        const date = new Date(item.Date);
        return {
          year: date.getFullYear(),
          month: date.toLocaleString("en-US", { month: "long" }),
          forecastedPrice: item["Forecasted Price"]
            ? `₹${Math.round(item["Forecasted Price"]).toLocaleString()}`
            : "-",
          forecastedTrend: item["Forecasted Trend"]
            ? item["Forecasted Trend"].toFixed(2)
            : "-",
          forecastedSeasonality: item["Forecasted Seasonality"]
            ? item["Forecasted Seasonality"].toFixed(2)
            : "-",
          forecastedResidual: item["Forecasted Residual"]
            ? item["Forecasted Residual"].toFixed(2)
            : "-",
        };
      });
  }, [filteredData]);

  const chartOptions = (colors, label) => ({
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "'Segoe UI', Arial",
      zoom: { enabled: false },
      animations: { enabled: true },
    },
    xaxis: {
      categories: chartData.dates,
      labels: { fontSize: "10px", rotate: 0 },
      tickAmount: 10,
    },
    yaxis: { labels: { fontSize: "10px" } },
    stroke: { curve: "smooth", width: 2 },
    colors,
    legend: {
      show: true,
      fontSize: "11px",
      position: "top",
      horizontalAlign: "center",
      markers: { width: 10, height: 10, radius: 10 },
    },
    grid: { borderColor: "#f0f0f0", strokeDashArray: 3 },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, shared: true },
    title: { text: label, align: "center", style: { fontSize: 14 } },
  });

  return (
    <div className="price-decomp-tab-root">
      <div className="global-filters">
        {[
          ["Year", year, setYear, filterOptions.years],
          ["Month", month, setMonth, filterOptions.months],
          ["Quarter", quarter, setQuarter, filterOptions.quarters],
          [
            "Commodity Group",
            commodityGroup,
            setCommodityGroup,
            filterOptions.commodityGroups,
          ],
          [
            "Commodity Name",
            commodityName,
            setCommodityName,
            filterOptions.commodityNames,
          ],
          ["Region", region, setRegion, filterOptions.regions],
        ].map(([label, val, setter, options]) => (
          <Form.Group className="global-filter-input" key={label}>
            <Form.Label className="global-filter-label kp-text">
              {label}
            </Form.Label>
            <Form.Select
              value={val}
              onChange={(e) => setter(e.target.value)}
              className="kp-text"
              style={{ fontSize: "12px", minWidth: 112 }}
            >
              {options.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ))}
      </div>

      <div className="decomp-top-kpis-row">
        <div className="kpi-box">
          <div
            className="kp-text kpi-title"
            style={{ marginBottom: 4, color: "#31846a" }}
          >
            Commodity
          </div>
          <div className="kp-text kpi-large">{commodityName}</div>
        </div>
        <div className="kpi-box">
          <div className="kp-text kpi-title">Current Delta</div>
        </div>
        <div className="kpi-box">
          <div className="kp-text kpi-title">Month</div>
          <div
            className="kp-text"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            ₹0.10 /Kg | Aug'25
          </div>
        </div>
        <div className="kpi-box">
          <div className="kp-text kpi-title">Quarter</div>
          <div
            className="kp-text"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            ₹-1.34 | Jul-Sep'25
          </div>
        </div>
        <div className="kpi-box">
          <div className="kp-text kpi-title">Steel Production (MT)</div>
          <div
            className="kp-text"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            108.32
            <span style={{ color: "#d9334f", fontSize: "11px", marginLeft: 4 }}>
              ▼ -24.69% YoY Change (24–25)
            </span>
          </div>
        </div>
        <div className="kpi-box">
          <div className="kp-text kpi-title">Steel Consumption (MT)</div>
          <div
            className="kp-text"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            110.91
            <span style={{ color: "#d9334f", fontSize: "11px", marginLeft: 4 }}>
              ▼ -24.93% YoY Change (24–25)
            </span>
          </div>
        </div>
      </div>

      <div className="decomposition-main-row">
        <div className="decomp-col">
          <div className="decomp-section">
            <div
              className="kp-text kpi-title decomp-c-title"
              style={{ fontSize: 17 }}
            >
              Decomposition Component
            </div>
            <div
              className="decomp-desc kp-text"
              style={{ whiteSpace: "pre-line" }}
            >
              • Trend: Long-term movement ... • Seasonality: ... • Residual: ...
              {"\n\n"}Multiplicative Model: HRC Price = Trend × Seasonality ×
              Residual
            </div>
            <div>
              <div className="decomp-table-title kp-text">
                Price Decomposition Table
                <button className="view-history-btn">
                  View Historic Decomposition
                </button>
              </div>
              <div
                style={{
                  border: "1px solid #ecedf2",
                  borderRadius: 6,
                  overflow: "auto",
                  maxHeight: 220,
                }}
              >
                <table className="decomp-table">
                  <thead>
                    <tr>
                      <th className="kp-text">Year</th>
                      <th className="kp-text">Month</th>
                      <th className="kp-text">Forecasted Price</th>
                      <th className="kp-text">Forecasted Trend</th>
                      <th className="kp-text">Forecasted Seasonality</th>
                      <th className="kp-text">Forecasted Residual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="kp-text">{row.year}</td>
                        <td className="kp-text">{row.month}</td>
                        <td className="kp-text">{row.forecastedPrice}</td>
                        <td className="kp-text">{row.forecastedTrend}</td>
                        <td className="kp-text">{row.forecastedSeasonality}</td>
                        <td className="kp-text">{row.forecastedResidual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="charts-col">
          <div className="main-chart-wrapper">
            <div className="kp-text kpi-title chart-title">HRC Price</div>
            <Chart
              options={chartOptions(["#2491f7", "#24ea5d"], "HRC Price")}
              series={[
                { name: "Actual", data: chartData.priceActual },
                { name: "Forecasted", data: chartData.priceForecasted },
              ]}
              type="line"
              height={220}
            />
          </div>
          {[
            [
              "Trend",
              chartData.trend,
              chartData.trendForecasted,
              "#6386d8",
              "#b0bdf4",
            ],
            [
              "Seasonality",
              chartData.seasonality,
              chartData.seasonalityForecasted,
              "#98ccfd",
              "#90caf9",
            ],
            [
              "Residuals",
              chartData.residual,
              chartData.residualForecasted,
              "#9cb8c9",
              "#c9e4f5",
            ],
          ].map(([label, seriesA, seriesB, colA, colB], idx) => (
            <div
              className="component-chart-item"
              key={label}
              style={{ marginBottom: 8 }}
            >
              <div className="kp-text kpi-title chart-title">{label}</div>
              <Chart
                options={chartOptions([colA, colB], label)}
                series={[
                  { name: label, data: seriesA },
                  { name: "Forecasted", data: seriesB },
                ]}
                type="line"
                height={115}
              />
            </div>
          ))}
        </div>

        <div className="kpi-col">
          {kpis && (
            <div className="decomp-right-kpi-panel">
              <div className="kpi-side-panel-card">
                <div
                  className="kp-text"
                  style={{ fontWeight: 700, color: "#22A06B", fontSize: 18 }}
                >
                  {kpis.trend}
                </div>
                <div
                  className="kp-text"
                  style={{
                    color: "#22A06B",
                    fontWeight: 600,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Price Trend
                </div>
              </div>
              <div className="kpi-side-panel-card">
                <div
                  className="kp-text"
                  style={{ fontWeight: 700, color: "#d9334f", fontSize: 18 }}
                >
                  {kpis.overallChange}%
                </div>
                <div
                  className="kp-text"
                  style={{
                    color: "#d9334f",
                    fontWeight: 600,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Overall % Change
                </div>
              </div>
              <div className="kpi-side-panel-card">
                <div
                  className="kp-text"
                  style={{ fontWeight: 700, color: "#22A06B", fontSize: 16 }}
                >
                  {kpis.increaseCount}
                </div>
                <div
                  className="kp-text"
                  style={{
                    color: "#22A06B",
                    fontWeight: 600,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Price Incr. Occur
                </div>
              </div>
              <div className="kpi-side-panel-card">
                <div
                  className="kp-text"
                  style={{ fontWeight: 700, color: "#d9334f", fontSize: 16 }}
                >
                  {kpis.decreaseCount}
                </div>
                <div
                  className="kp-text"
                  style={{
                    color: "#d9334f",
                    fontWeight: 600,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Price Decr. Occur
                </div>
              </div>
              <div className="kpi-side-panel-card">
                <div
                  className="kp-text"
                  style={{ fontWeight: 700, color: "#444", fontSize: 16 }}
                >
                  {kpis.noChangeCount}
                </div>
                <div
                  className="kp-text"
                  style={{
                    color: "#444",
                    fontWeight: 600,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  No Change Occur
                </div>
              </div>
              <div className="kpi-side-panel-card">
                <div
                  className="kp-text"
                  style={{ fontWeight: 700, color: "#444", fontSize: 16 }}
                >
                  {kpis.seasonalVariation}
                </div>
                <div
                  className="kp-text"
                  style={{
                    color: "#444",
                    fontWeight: 600,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Seasonal Variation
                </div>
              </div>
              <div className="kpi-side-panel-card">
                <div
                  className="kp-text"
                  style={{ fontWeight: 700, color: "#444", fontSize: 16 }}
                >
                  {kpis.maxSeasonality}
                </div>
                <div
                  className="kp-text"
                  style={{
                    color: "#444",
                    fontWeight: 600,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Max +ve Variation
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceDecompositionTab;
