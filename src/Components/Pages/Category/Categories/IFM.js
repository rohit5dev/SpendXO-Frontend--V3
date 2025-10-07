import React, { useState } from "react";
import { Tabs, Tab, Form } from "react-bootstrap"; // Import Form for the switch
import "../css/CategoryIntelligenceNew.css";
import IFMLatestNewsTab from "../Tabs/IFM/IFMLatestNewsTab";
import IFMCategoryOverviewTab from "../Tabs/IFM/IFMOverviewTab";
import IFMSpendAnalysisTab from "../Tabs/IFM/IFMSpendAnalysisTab";
import IFMVendorLandscapeTab from "../Tabs/IFM/IFMVendorLandscapeTab";

const IFM = () => {
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
          <IFMCategoryOverviewTab />
        </Tab>

        <Tab eventKey="spend_analysis" title="Spend Analysis">
          <IFMSpendAnalysisTab />
        </Tab>

         <Tab eventKey="vendor_landscape" title="Vendor Landscape">
          <IFMVendorLandscapeTab />
        </Tab>

        <Tab eventKey="news" title="Latest News">
          <IFMLatestNewsTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default IFM;
