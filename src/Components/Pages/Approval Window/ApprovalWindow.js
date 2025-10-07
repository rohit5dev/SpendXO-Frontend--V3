import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ActionApproval from "./Tabs/ActionApprovalTab";
import CategoryApproval from "./Tabs/CategoryApprovalTab";
import HelpApproval from "./Tabs/HelpApprovalTab";

const ApprovalWindow = () => {
  const [activeTab, setActiveTab] = useState("action");

  const renderContent = () => {
    switch (activeTab) {
      case "action":
        return <ActionApproval />;
      case "category":
        return <CategoryApproval />;
      case "help":
        return <HelpApproval />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mt-1">
        <div className="card" style={{ fontSize: "12px" }}>
          <div className="card-header bg-light">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "action" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("action")}
                >
                  Action Approval
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "category" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("category")}
                >
                  Category Approval
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "help" ? "active" : ""}`}
                  onClick={() => setActiveTab("help")}
                >
                  Help Approval
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

export default ApprovalWindow;
