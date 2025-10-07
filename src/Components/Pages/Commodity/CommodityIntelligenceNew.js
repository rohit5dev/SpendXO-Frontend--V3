import React, { useState } from "react";
import { Tabs, Tab, Form } from "react-bootstrap"; // Import Form for the switch
import "./css/CommodityIntelligenceNew.css";
import LatestNewsTab from "./Tabs/LatestNewsTab";
import CommodityOverviewTab from "./Tabs/CommodityOverviewTab";
import CommodityOverviewTab3 from "./Tabs/CommodityOverviewTab3";
import OverviewTab from "./Tabs/OverviewTab";
import DeltaDecompositionTab from "./Tabs/DeltaDecompositionTab";
import MacroEconomicIndicatorTab from "./Tabs/MacroEconomicIndicatorTab";
import PriceDecompositionTab from "./Tabs/PriceDecompositionTab";
import EventImpactTab from "./Tabs/EventImpactTab";

const CommodityIntelligenceNew = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  // const [commodityType, setCommodityType] = useState(
  //   "Flat Steel- Hot Rolled Coil (HRC)​"
  // ); // New state for commodity type
  // const [specification, setSpecification] = useState("IS 2062 E250​​"); // New state for commodity type
  // const [region, setRegion] = useState("India​​"); // New state for commodity type

  return (
    <div
      className="global-cards  p-2 mt-2"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.29)" }}
    >
      {/* <div className=" d-flex justify-content-between align-items-center">
        <h5
          className="head-theme"
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "var(--color-main)",
          }}
        >
          Commodity Intelligence
        </h5>
        <div className="d-flex align-items-center">
          <Form.Group className="global-filter-input">
            <Form.Label className="global-filter-label">Commodity</Form.Label>
            <Form.Select
              value={commodityType}
              onChange={(e) => setCommodityType(e.target.value)}
              style={{
                fontSize: "11px",
                width: "100%",
                textOverflow: "ellipsis", // Ensure single-line text
                overflow: "hidden",
              }}
            >
              <option value="Flat Steel- Hot Rolled Coil (HRC)​">
                Flat Steel- Hot Rolled Coil (HRC)​
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="global-filter-input ms-3">
            <Form.Label className="global-filter-label">
              Specification
            </Form.Label>
            <Form.Select
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              style={{
                fontSize: "11px",
                width: "100%",
                textOverflow: "ellipsis", // Ensure single-line text
                overflow: "hidden",
              }}
            >
              <option value="IS 2062 E250​​">IS 2062 E250​​</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="global-filter-input ms-3">
            <Form.Label className="global-filter-label">Region</Form.Label>
            <Form.Select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                fontSize: "11px",
                width: "100%",
                textOverflow: "ellipsis", // Ensure single-line text
                overflow: "hidden",
              }}
            >
              <option value="India​​">India​​</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div> */}

      {/* TABS */}
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="global-tabs"
        style={{
          width: "100%",
        }}
      >
        {/* <Tab eventKey="overview" title="Commodity Overview" className="mt-2">
          <CommodityOverviewTab />
        </Tab> */}
        {/* <Tab eventKey="overview2" title="Commodity Overview - New" className="mt-2">
          <CommodityOverviewTab3 />
        </Tab> */}
        {/* <Tab eventKey="news" title="Latest News">
          <LatestNewsTab />
        </Tab> */}

        {/* New Version Commodity */}
        <Tab eventKey="Overview" title="Overview">
          <OverviewTab />
        </Tab>
        <Tab eventKey="DeltaDecomposition" title="Delta Decomposition">
          <DeltaDecompositionTab />
        </Tab>
        <Tab eventKey="MacroEconomicIndicator" title="Macroeconomic Indicator">
          <MacroEconomicIndicatorTab />
        </Tab>
        <Tab eventKey="PriceDecomposition" title="Price Decomposition">
          <PriceDecompositionTab />
        </Tab>
        <Tab eventKey="EventImpact" title="Event Impact">
          <EventImpactTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CommodityIntelligenceNew;
