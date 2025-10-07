import React, { useState } from "react";
import { Tabs, Tab, Form } from "react-bootstrap"; // Import Form for the switch
import "../css/CategoryIntelligenceNew.css";
import FSLatestNewsTab from "../Tabs/FlatSteel/FSLatestNewsTab"; // Import the new component
import FSCategoryOverviewTab from "../Tabs/FlatSteel/FSOverviewTab";
import FSPricingStrategyTab from "../Tabs/FlatSteel/FSPricingStrategyTab";
import FSSourcingStrategyTab from "../Tabs/FlatSteel/FSSourcingStrategyTab";

const FlatSteel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div>
      {" "}
      {/* TABS */}
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="global-tabs"
        style={{
          width: "100%",
        }}
      >
        <Tab eventKey="overview" title="Category Overview" className="mt-2">
          <FSCategoryOverviewTab />
        </Tab>

        <Tab eventKey="pricing_strategy" title="Pricing Strategy">
          <FSPricingStrategyTab />
        </Tab>

        <Tab eventKey="sourcing_strategy" title="Sourcing Strategy">
          <FSSourcingStrategyTab />
        </Tab>

        <Tab eventKey="news" title="Latest News">
          <FSLatestNewsTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default FlatSteel;
