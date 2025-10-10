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
  return (
    <div
      className="global-cards  p-2 mt-2"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.29)" }}
    >

      {/* TABS */}
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="global-tabs"
        style={{
          width: "100%",
        }}
      >


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
