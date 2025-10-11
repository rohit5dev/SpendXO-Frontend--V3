import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Chart from "react-apexcharts";
import "../css/MacroEconomicIndicatorTab.css";
import {
  filtersCommodityGroup,
  filtersCommodityName,
  filtersRegion,
  getKPIs,
  KPI_META,
  heatmapOptions,
  heatmapSeries,
  options,
  series,
  volumeBarOptions,
  volumeBarSeries,
} from "../Data/macroData.js";

const MacroEconomicIndicatorTab = () => {
  const [commodityGroup, setCommodityGroup] = useState("All");
  const [commodityName, setCommodityName] = useState("HRC");
  const [region, setRegion] = useState("All");

  // KPIs update reactively based on commodityName selection
  const kpiData = getKPIs(commodityName);

  return (
    <div>
      {/* Filters */}
      <div
        className="global-filters"
        style={{ width: "300px", gap: 10, marginBottom: 5 }}
      >
        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">
            Commodity Group
          </Form.Label>
          <Form.Select
            value={commodityGroup}
            onChange={(e) => setCommodityGroup(e.target.value)}
            style={{ fontSize: "12px" }}
          >
            {filtersCommodityGroup.map((x) => (
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
            style={{ fontSize: "12px" }}
          >
            {filtersCommodityName.map((x) => (
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
            style={{ fontSize: "12px" }}
          >
            {filtersRegion.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      {/* KPI cards: Month, Quarter for current commodity */}
      <div
        className="kpi-container"
        style={{ gap: "16px", marginBottom: "10px" }}
      >
        {kpiData.map((kpi, idx) => (
          <div
            className="kpi-box"
            key={idx}
            style={{ minWidth: 175, maxWidth: 225 }}
          >
            <p className="kp-text" style={{ fontWeight: 500, marginBottom: 2 }}>
              {kpi.label}
            </p>
            <p
              className="kp-text"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-main)",
              }}
            >
              {kpi.value}
            </p>
          </div>
        ))}
        {/* All other main KPI cards */}
        {KPI_META.map((kpi, idx) => (
          <div
            className="kpi-box"
            key={kpi.label}
            style={{ minWidth: 175, maxWidth: 225 }}
          >
            <p className="kp-text" style={{ fontWeight: 500, marginBottom: 2 }}>
              {kpi.label}
            </p>
            <p
              className="kp-text"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-main)",
              }}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main charts */}
      <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
        {/* Heatmap */}
        <div
          style={{
            flex: 1.1,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(40,48,70,0.07)",
            padding: 12,
            marginRight: 0,
            minWidth: 500,
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
            Correlation of Economic Factors (2013-2025)
          </div>
          <Chart
            options={heatmapOptions}
            series={heatmapSeries}
            type="heatmap"
            height={380}
          />
          <div style={{ fontSize: 12, marginTop: 6, color: "#5a667d" }}>
            *This correlation matrix is shared for both HRC and CRC and shows
            how each is statistically related to each other as well as other
            economic indicators
          </div>
        </div>
        {/* Right two stacked charts */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(40,48,70,0.07)",
              padding: 12,
              marginBottom: 0,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 0 }}>
              Finished Steel Surplus/Deficit Over Time - India
            </div>
            <Chart options={options} series={series} type="line" height={200} />
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(40,48,70,0.07)",
              padding: 12,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
              Finished Steel Import and Export Over Time - India
            </div>
            <Chart
              options={volumeBarOptions}
              series={volumeBarSeries}
              type="bar"
              height={170}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroEconomicIndicatorTab;
