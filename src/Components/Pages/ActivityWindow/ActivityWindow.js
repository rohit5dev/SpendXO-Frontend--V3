import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ActionAtivities from "./Tabs/ActionActivities.js";
import CategoryActivities from "./Tabs/CategoryActivities.js";
import ActionTrackerActivities from "./Tabs/ActionTrackerActivities.js";
import ValidationActivities from "./Tabs/ValidationActivities.js";

const ActivityWindow = () => {
  const [activeTab, setActiveTab] = useState("action");

  const renderContent = () => {
    switch (activeTab) {
      case "action":
        return <ActionAtivities />;
      case "category":
        return <CategoryActivities />;
      case "validation":
        return <ValidationActivities />;
      case "tracker":
        return <ActionTrackerActivities />;
      // case "helpDesk":
      //   return <HelpDeskActivities />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mt-1">
        <div className="card"style={{fontSize:"12px"}}>
          <div className="card-header bg-light">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "action" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("action")}
                >
                  Action Tree
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "category" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("category")}
                >
                  Category Tree
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "validation" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("validation")}
                >
                  Validation
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "tracker" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("tracker")}
                >
                  Action Tracker
                </button>
              </li>
             
            </ul>
          </div>
          <div className="card-body">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default ActivityWindow;
