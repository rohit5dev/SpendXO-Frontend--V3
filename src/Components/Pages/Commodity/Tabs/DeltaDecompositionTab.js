import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import CanvasJSReact from "@canvasjs/react-charts";
import "../css/deltaDecompTab.css";
import {
  KPI_DATA,
  hrcWaterfallData,
  crcWaterfallData,
  hrcTableRows,
  crcTableRows,
  hrcScenarioRows,
  crcScenarioRows,
} from "../Data/deltaDecompData";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const filtersCommodityGroup = ["All", "Flat Steel"];
const filtersCommodityName = ["HRC", "CRC"];
const filtersRegion = ["All", "India"];

const DeltaDecomposition = () => {
  const [commodityGroup, setCommodityGroup] = useState("All");
  const [commodityName, setCommodityName] = useState("HRC");
  const [region, setRegion] = useState("All");
  const currentKPIData = KPI_DATA[commodityName];

  // Select chart/table/scenario data based on current filter
  const waterfallData =
    commodityName === "HRC" ? hrcWaterfallData : crcWaterfallData;
  const tableRows = commodityName === "HRC" ? hrcTableRows : crcTableRows;
  const scenarioRows =
    commodityName === "HRC" ? hrcScenarioRows : crcScenarioRows;

  const enhancedWaterfallOptions = {
    animationEnabled: true,
    animationDuration: 800,
    theme: "light2",
    backgroundColor: "#ffffff",
    exportEnabled: false,
    height: 230,
    axisY: {
      title: "% Share In Total Delta",
      titleFontFamily: "'Segoe UI', 'Arial', sans-serif",
      titleFontSize: 13,
      titleFontWeight: "normal",
      labelFontFamily: "'Segoe UI', 'Arial', sans-serif",
      labelFontSize: 11,
      includeZero: true,
      suffix: "%",
      gridThickness: 0.5,
      gridColor: "#f0f0f0",
      lineThickness: 1,
      tickThickness: 1,
    },
    axisX: {
      labelFontFamily: "'Segoe UI', 'Arial', sans-serif",
      labelFontSize: 10,
      interval: 1,
      labelAngle: -45,
      labelWrap: true,
      labelMaxWidth: 70,
      gridThickness: 0,
      lineThickness: 1,
      tickThickness: 1,
      margin: 10,
    },
    toolTip: {
      enabled: true,
      shared: false,
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      fontSize: 12,
      borderThickness: 1,
      cornerRadius: 4,
      backgroundColor: "#ffffff",
      borderColor: "#999999",
      contentFormatter: function (e) {
        var dataPoint = e.entries[0].dataPoint;
        return dataPoint.label + ": " + dataPoint.y + "%";
      },
      updated: function (e) {
        var toolTip = e.chart.toolTip;
        var canvas = e.chart.container;
        var canvasRect = canvas.getBoundingClientRect();
        var toolTipDiv = document.querySelector(".canvasjs-chart-tooltip");

        if (toolTipDiv) {
          var rect = toolTipDiv.getBoundingClientRect();
          // Keep tooltip within chart bounds
          if (rect.right > canvasRect.right) {
            toolTipDiv.style.left = canvasRect.right - rect.width - 10 + "px";
          }
          if (rect.left < canvasRect.left) {
            toolTipDiv.style.left = canvasRect.left + 10 + "px";
          }
        }
      },
    },
    data: [
      {
        type: "waterfall",
        yValueFormatString: "#,##0",
        indexLabel: "{y}%",
        indexLabelFontSize: 10,
        indexLabelFontFamily: "'Segoe UI', 'Arial', sans-serif",
        indexLabelFontWeight: "normal",
        indexLabelPlacement: "outside",
        risingColor: "#d9334f",
        fallingColor: "#22A06B",
        dataPoints: waterfallData,
        lineThickness: 1,
        bevelEnabled: false,
      },
    ],
  };

  return (
    <div>
      {/* FILTERS */}
      <div className=" d-flex gap-2  my-2" style={{ width: 400 }}>
        <Form.Group className="global-filter-input">
          <Form.Label className="global-filter-label">
            Commodity Group
          </Form.Label>
          <Form.Select
            value={commodityGroup}
            onChange={(e) => setCommodityGroup(e.target.value)}
            style={{ fontSize: "11px" }}
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
            style={{ fontSize: "11px" }}
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
            style={{ fontSize: "11px" }}
          >
            {filtersRegion.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      {/* KPI Cards */}
      <div className="kpi-container d-flex gap-2 mb-2 mt-0 ">
        {currentKPIData.map((kpi, idx) => (
          <div className="kpi-box" key={idx}>
            <p className="kp-text">{kpi.label}</p>
            <p className="kp-text">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Insights Row */}
      <Row className="gx-2">
        <Col md={6}>
          <div className="rb-col-box insight-box">
            <div className="fw-semibold mb-2" style={{ fontSize: "13px" }}>
              % Share of Delta Components
            </div>
            <div
              style={{
                padding: "0 10px",
                height: 230,
                width: "100%",
                position: "relative",
                overflow: "visible",
              }}
            >
              <CanvasJSChart
                options={enhancedWaterfallOptions}
                containerProps={{
                  style: {
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  },
                }}
              />
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="rb-col-box insight-box">
            <div className="fw-semibold mb-2" style={{ fontSize: "13px" }}>
              {commodityName} Delta Breakdown
            </div>
            {/* Table header stays, tbody scrolls */}
            <table className="styled-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Delta Components</th>
                  <th>Share in Total Delta</th>
                  <th>Justification</th>
                  <th>Modelled Impact Pathway</th>
                </tr>
              </thead>
            </table>
            <div className="scroll-tbody">
              <table className="styled-table" style={{ width: "100%" }}>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={i}>
                      <td>{row.component}</td>
                      <td
                        style={{
                          color:
                            parseFloat(row.share) > 0 ? "#d9334f" : "#22A06B",
                          fontWeight: 600,
                        }}
                      >
                        {row.share}
                      </td>
                      <td>{row.justification}</td>
                      <td>{row.pathway}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col md={12}>
          <div className="rb-col-box insight-box">
            <div className="fw-semibold mb-2" style={{ fontSize: "13px" }}>
              {commodityName} Scenario Analysis
            </div>
            {/* Table header stays fixed; tbody scrolls */}
            <div className="scenario-table-container">
              <table
                className="styled-table"
                style={{ width: "100%", marginBottom: 0 }}
              >
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Scenario Summary</th>
                    <th>Delta Range (Rs/kg)</th>
                    <th>Price Range (Rs/kg)</th>
                    <th>Main Drivers Behind Delta</th>
                    <th>Recommended Buyer Action</th>
                  </tr>
                </thead>
              </table>
              <div
                className="scroll-tbody"
                style={{ maxHeight: "180px", overflowY: "auto" }}
              >
                <table className="styled-table" style={{ width: "100%" }}>
                  <tbody>
                    {scenarioRows.map((row, i) => (
                      <tr key={i}>
                        <td>{row.scenario}</td>
                        <td>{row.summary}</td>
                        <td>{row.deltaRange}</td>
                        <td>{row.priceRange}</td>
                        <td>{row.drivers}</td>
                        <td>{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeltaDecomposition;
