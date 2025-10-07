import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import KnowledgeHubOverview from "./Tabs/KnowledgeHubOverview";
import KnowledgeHubVideos from "./Tabs/KnowledgeHubVideos";
import KnowledgeHubDocs from "./Tabs/KnowledgeHubDocs";
import KnowledgeHubProcessTransformation from "./Tabs/KnowledgeHubProcessTransformation";

const KnowledgeHub = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract current tab from URL, default to "overview"
  const currentTab = location.pathname.split("/")[2] || "overview";

  const handleSelect = (key) => {
    navigate(`/knowledge-hub/${key}`);
  };

  return (
    <div>
      <Tabs
        activeKey={currentTab}
        onSelect={handleSelect}
        className="global-tabs"
        style={{ width: "100%" }}
      >
        <Tab eventKey="overview" title="Overview">
          <KnowledgeHubOverview />
        </Tab>

        <Tab eventKey="videos" title="Courses & Videos">
          <KnowledgeHubVideos />
        </Tab>

        <Tab eventKey="docs" title="Documentations">
          <KnowledgeHubDocs />
        </Tab>
        <Tab eventKey="process-transformation" title="Process Transformation">
          <KnowledgeHubProcessTransformation />
        </Tab>
      </Tabs>
    </div>
  );
};

export default KnowledgeHub;
