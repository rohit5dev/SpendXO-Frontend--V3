import { useState, useMemo } from "react";
import { Form, Row, Col, Card, Table, Button } from "react-bootstrap";
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
      dates: filteredData.map((item) => {
        const date = new Date(item.Date);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }),
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

  const chartOptions = (colors, label, showLegend = false) => ({
    chart: {
      type: "line",
      toolbar: { show: false },
      fontFamily: "'Segoe UI', Arial",
      zoom: { enabled: false },
      animations: { enabled: true },
    },
    xaxis: {
      categories: chartData.dates,
      labels: { show: false },
      tickAmount: 10,
    },
    yaxis: {
      labels: {
        fontSize: "8px",
        formatter: (value) => {
          return Math.abs(value) >= 1000
            ? `${(value / 1000).toFixed(1)}k`
            : value;
        },
      },
    },
    stroke: { curve: "smooth", width: 2 },
    colors,
    legend: {
      show: showLegend,
      fontSize: "11px",
      position: "top",
      horizontalAlign: "center",
      markers: { width: 10, height: 10, radius: 10 },
    },
    grid: { borderColor: "#f0f0f0", strokeDashArray: 3 },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, shared: true },
  });

  const resetFilters = () => {
    setYear("All");
    setMonth("All");
    setQuarter("All");
    setCommodityGroup("All");
    setCommodityName("HRC");
    setRegion("All");
  };

  return (
    <div className="container-fluid p-0">
      {/* Filters */}
      <div className="d-flex gap-2 mb-2 align-items-end">
        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Year</Form.Label>
          <Form.Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ fontSize: "11px" }}
          >
            {filterOptions.years.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Month</Form.Label>
          <Form.Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ fontSize: "11px" }}
          >
            {filterOptions.months.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Quarter</Form.Label>
          <Form.Select
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            style={{ fontSize: "11px" }}
          >
            {filterOptions.quarters.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">
            Commodity Group
          </Form.Label>
          <Form.Select
            value={commodityGroup}
            onChange={(e) => setCommodityGroup(e.target.value)}
            style={{ fontSize: "11px" }}
          >
            {filterOptions.commodityGroups.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">
            Commodity Name
          </Form.Label>
          <Form.Select
            value={commodityName}
            onChange={(e) => setCommodityName(e.target.value)}
            style={{ fontSize: "11px" }}
          >
            {filterOptions.commodityNames.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">Region</Form.Label>
          <Form.Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={{ fontSize: "11px" }}
          >
            {filterOptions.regions.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <button className="btn btn-theme global-font" onClick={resetFilters}>
          Reset All
        </button>
      </div>

      {/* Top KPIs Row */}
      <Row className="g-2 mb-2">
        <Col>
          <div className="global-cards p-2 flex-fill text-start">
            <p className="head-theme small text-muted mb-0">Commodity</p>
            <p className="global-font fw-semibold mb-0 mt-0">{commodityName}</p>
          </div>
        </Col>
        <Col>
          <div className="global-cards p-2 flex-fill text-start">
            <p className="head-theme small text-muted mb-0">Current Delta</p>
            <p className="global-font fw-semibold mb-0 mt-0">--</p>
          </div>
        </Col>
        <Col>
          <div className="global-cards p-2 flex-fill text-start">
            <p className="head-theme small text-muted mb-0">Month</p>
            <p className="global-font fw-semibold mb-0 mt-0">
              ₹0.10 /Kg | Aug'25
            </p>
          </div>
        </Col>
        <Col>
          <div className="global-cards p-2 flex-fill text-start">
            <p className="head-theme small text-muted mb-0">Quarter</p>
            <p className="global-font fw-semibold mb-0 mt-0">
              ₹-1.34 | Jul-Sep'25
            </p>
          </div>
        </Col>
        <Col>
          <div className="global-cards p-2 flex-fill text-start">
            <p className="head-theme small text-muted mb-0">
              Steel Production (MT)
            </p>
            <p className="global-font fw-semibold mb-0 mt-0">
              108.32
              <span className="text-danger ms-1">▼ -24.69% YoY Change</span>
            </p>
          </div>
        </Col>
        <Col>
          <div className="global-cards p-2 flex-fill text-start">
            <p className="head-theme small text-muted mb-0">
              Steel Consumption (MT)
            </p>
            <p className="global-font fw-semibold mb-0 mt-0">
              110.91
              <span className="text-danger ms-1">▼ -24.93% YoY Change</span>
            </p>
          </div>
        </Col>
      </Row>

      {/* Main Content Row */}
      <Row className="g-2">
        {/* Left Column - Decomposition Components */}
        <div className="col-md-5">
          <div className="global-cards mb-2">
            <div className="global-font text-start">
              <p className="head-theme text-start mb-2">
                Decomposition Component
              </p>
              <div
                className="small text-secondary mb-3"
                style={{ whiteSpace: "pre-line" }}
              >
                • <b>Trend:</b> Long-term movement in the data, showing the
                overall direction (upward, downward, or flat) over time.
                {"\n"}• <b>Seasonality:</b> Regular, predictable patterns or
                fluctuations in the data due to seasonal factors.
                {"\n"}• <b>Residuals:</b> Irregular, random variations in the
                data that cannot be explained by trend or seasonality.
                {"\n\n"} <b>Multiplicative Model</b>
                <br /> HRC Price = Trend × Seasonality × Residual
                <br />
                This model assumes that all parts are connected, so a change in
                one causes proportional changes in the others.
              </div>
            </div>
          </div>

          <div className="global-cards">
            <p className="head-theme text-start mb-2">
              Price Decomposition Table
            </p>
            {/* <div className="btn global-font">
              Historic Decomposition
            </div> */}

            <div
              className="table-container my-2"
              style={{
                overflowX: "auto",
                overflowY: "auto",
              }}
            >
              <table className="table table-bordered table-sm m-0">
                <thead className="table-light sticky-top">
                  <tr style={{ backgroundColor: "#bfe1e5" }}>
                    <th className="text-start defaultStyleHead">Year</th>
                    <th className="text-start defaultStyleHead">Month</th>
                    <th className="text-start defaultStyleHead">
                      Forecasted Price
                    </th>
                    <th className="text-start defaultStyleHead">
                      Forecasted Trend
                    </th>
                    <th className="text-start defaultStyleHead">
                      Forecasted Seasonality
                    </th>
                    <th className="text-start defaultStyleHead">
                      Forecasted Residual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="defaultStyles">{row.year}</td>
                      <td className="defaultStyles">{row.month}</td>
                      <td className="defaultStyles">{row.forecastedPrice}</td>
                      <td className="defaultStyles">{row.forecastedTrend}</td>
                      <td className="defaultStyles">
                        {row.forecastedSeasonality}
                      </td>
                      <td className="defaultStyles">
                        {row.forecastedResidual}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Middle Column - Charts */}
        <div className="col-md-6">
          <div className="mb-2">
            <div className="global-cards h-100 p-0 d-flex flex-column">
              <p className="head-theme text-start m-2  mb-0">HRC Price</p>

              <div className="flex-grow-1">
                <Chart
                  options={chartOptions(
                    ["#2491f7", "#24ea5d"],
                    "HRC Price",
                    true
                  )}
                  series={[
                    { name: "Actual", data: chartData.priceActual },
                    { name: "Forecasted", data: chartData.priceForecasted },
                  ]}
                  type="line"
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="global-cards h-100 p-0 d-flex flex-column">
              <p className="head-theme text-start m-2  mb-0">Trend</p>

              <div className="flex-grow-1">
                <Chart
                  options={chartOptions(["#2491f7", "#24ea5d"], "Trend")}
                  series={[
                    { name: "Actual", data: chartData.trend },
                    { name: "Forecasted", data: chartData.trendForecasted },
                  ]}
                  type="line"
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="global-cards h-100 p-0 d-flex flex-column">
              <p className="head-theme text-start m-2 mb-0">Seasonality</p>

              <div className="flex-grow-1">
                <Chart
                  options={chartOptions(["#2491f7", "#24ea5d"], "Seasonality")}
                  series={[
                    { name: "Actual", data: chartData.seasonality },
                    {
                      name: "Forecasted",
                      data: chartData.seasonalityForecasted,
                    },
                  ]}
                  type="line"
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="global-cards h-100 p-0 d-flex flex-column">
              <p className="head-theme text-start m-2  mb-0">Residuals</p>

              <div className="flex-grow-1">
                <Chart
                  options={chartOptions(["#2491f7", "#24ea5d"], "Residuals")}
                  series={[
                    { name: "Actual", data: chartData.residual },
                    {
                      name: "Forecasted",
                      data: chartData.residualForecasted,
                    },
                  ]}
                  type="line"
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - KPIs */}
        <div className="col-md-1">
          {kpis && (
            <div className="d-grid gap-2">
              <div className="global-cards p-2 flex-fill text-start">
                <p className="head-theme small text-muted mb-0">Price Trend</p>
                <p className="global-font fw-semibold mb-0 mt-0 text-success">
                  {kpis.trend}
                </p>
              </div>

              <div className="global-cards p-2 flex-fill text-start">
                <p className="head-theme small text-muted mb-0">
                  Overall % Change
                </p>
                <p className="global-font fw-semibold mb-0 mt-0 text-danger">
                  {kpis.overallChange}%
                </p>
              </div>

              <div className="global-cards p-2 flex-fill text-start">
                <p className="head-theme small text-muted mb-0">
                  Price Incr. Occur
                </p>
                <p className="global-font fw-semibold mb-0 mt-0 text-success">
                  {kpis.increaseCount}
                </p>
              </div>

              <div className="global-cards p-2 flex-fill text-start">
                <p className="head-theme small text-muted mb-0">
                  Price Decr. Occur
                </p>
                <p className="global-font fw-semibold mb-0 mt-0 text-danger">
                  {kpis.decreaseCount}
                </p>
              </div>

              <div className="global-cards p-2 flex-fill text-start">
                <p className="head-theme small text-muted mb-0">
                  No Change Occur
                </p>
                <p className="global-font fw-semibold mb-0 mt-0">
                  {kpis.noChangeCount}
                </p>
              </div>

              <div className="global-cards p-2 flex-fill text-start">
                <p className="head-theme small text-muted mb-0">
                  Seasonal Variation
                </p>
                <p className="global-font fw-semibold mb-0 mt-0">
                  {kpis.seasonalVariation}
                </p>
              </div>

              <div className="global-cards p-2 flex-fill text-start">
                <p className="head-theme small text-muted mb-0">
                  Max +ve Variation
                </p>
                <p className="global-font fw-semibold mb-0 mt-0">
                  {kpis.maxSeasonality}
                </p>
              </div>
            </div>
          )}
        </div>
      </Row>
    </div>
  );
};

export default PriceDecompositionTab;
