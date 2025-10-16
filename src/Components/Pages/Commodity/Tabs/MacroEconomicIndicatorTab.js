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
    <div className="p-2">
      {/* Filters - Single Row */}
      <div className="d-flex text-start  gap-2 mb-2">
        <div className="">
          <Form.Group className="global-filter-input">
            <Form.Label className="global-filter-label">
              Commodity Group
            </Form.Label>
            <Form.Select
              value={commodityGroup}
              onChange={(e) => setCommodityGroup(e.target.value)}
              className="form-select-sm global-font"
              size="sm"
            >
              {filtersCommodityGroup.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="">
          <Form.Group className="global-filter-input">
            <Form.Label className="global-filter-label">
              Commodity Name
            </Form.Label>
            <Form.Select
              value={commodityName}
              onChange={(e) => setCommodityName(e.target.value)}
              className="form-select-sm global-font"
              size="sm"
            >
              {filtersCommodityName.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="2">
          <Form.Group className="global-filter-input">
            <Form.Label className="global-filter-label">
              Region
            </Form.Label>
            <Form.Select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="form-select-sm global-font"
              size="sm"
            >
              {filtersRegion.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-2 mb-2">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="global-cards p-2">
              <p className="kpi-label small fw-medium mb-1 text-truncate">
                {kpi.label}
              </p>
              <p className="kpi-value small fw-bold text-primary mb-0">
                {kpi.value}
              </p>
            </div>
          </div>
        ))}
        {/* All other main KPI cards */}
        {KPI_META.map((kpi, idx) => (
          <div key={kpi.label} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="global-cards h-100 p-2">
              <p className="kpi-label small fw-medium mb-1 text-truncate">
                {kpi.label}
              </p>
              <p className="kpi-value small fw-bold text-primary mb-0">
                {kpi.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="row g-2">
        {/* Heatmap */}
        <div className="col-xxl-8 col-xl-7 col-lg-6">
          <div className="chart-container h-100">
            <div className="global-cards h-100">
              <div className="card-body">
                <h6 className="card-title fw-semibold mb-2">
                  Correlation of Economic Factors (2013-2025)
                </h6>
                <div className="chart-wrapper">
                  <Chart
                    options={heatmapOptions}
                    series={heatmapSeries}
                    type="heatmap"
                    height={350}
                    width="100%"
                  />
                </div>
                <p className="small text-muted mt-2 mb-0">
                  *This correlation matrix is shared for both HRC and CRC and shows
                  how each is statistically related to each other as well as other
                  economic indicators
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right two stacked charts */}
        <div className="col-xxl-4 col-xl-5 col-lg-6">
          <div className="row g-2 h-100">
            <div className="col-12">
              <div className="global-cards h-100">
                <div className="card-body">
                  <h6 className="card-title fw-semibold mb-2">
                    Finished Steel Surplus/Deficit Over Time - India
                  </h6>
                  <Chart 
                    options={options} 
                    series={series} 
                    type="line" 
                    height={200}
                    width="100%"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="global-cards h-100">
                <div className="card-body">
                  <h6 className="card-title fw-semibold mb-2">
                    Finished Steel Import and Export Over Time - India
                  </h6>
                  <Chart
                    options={volumeBarOptions}
                    series={volumeBarSeries}
                    type="bar"
                    height={170}
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroEconomicIndicatorTab;