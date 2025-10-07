import React, { useState, useRef, useEffect } from "react";
import { FaArrowsAlt } from "react-icons/fa";
import { Tabs, Tab } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SurveyAnalysis = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  // Current tab from URL (default handled by redirect in routes)
  const currentTab = tab;

  // Refs for iframes
  const dashboardIframeRef = useRef(null);
  const invoiceIframeRef = useRef(null);
  const purchaseIframeRef = useRef(null);
  const procurementIframeRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    const iframe = dashboardIframeRef.current;
    if (!isFullscreen && iframe) {
      if (iframe.requestFullscreen) iframe.requestFullscreen();
      else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen();
      else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
      else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen changes
  const onFullscreenChange = () => {
    const iframe = dashboardIframeRef.current;
    if (
      document.fullscreenElement === iframe ||
      document.webkitFullscreenElement === iframe ||
      document.mozFullscreenElement === iframe ||
      document.msFullscreenElement === iframe
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("msfullscreenchange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("msfullscreenchange", onFullscreenChange);
    };
  }, []);

  // When user switches tab
  const handleSelect = (key) => {
    navigate(`/survey-analysis/${key}`);
  };

  return (
    <div>
      <Tabs
        activeKey={currentTab}
        onSelect={handleSelect}
        className="global-tabs"
        style={{ width: "100%" }}
      >
        <Tab eventKey="dashboard" title="Dashboard" unmountOnExit>
          <div>
            <iframe
              ref={dashboardIframeRef}
              src="https://app.powerbi.com/reportEmbed?reportId=e824d6b2-af66-465e-8f71-14a258cfbe2c&autoAuth=true&ctid=55e0a09f-7836-4d37-b386-b5605b46a125"
              style={{
                width: "100%",
                height: "100vh",
                border: "none",
                marginTop: "5px",
              }}
              title="Dashboard Iframe"
            />
            <button onClick={handleFullscreenToggle} className="full-scrn-button">
              <FaArrowsAlt />
            </button>
          </div>
        </Tab>

        <Tab eventKey="form-invoice" title="Invoice Tracking" unmountOnExit>
          <iframe
            ref={invoiceIframeRef}
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=n6DgVTZ4N02zhrVgW0ahJeZJGqC4P1RGgxdoLVF68nlUN0M4V0kzSUVKSUxMNjc5SjZJUVNYQUY0WCQlQCN0PWcu&embed=true"
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="Invoice Tracking Iframe"
          />
        </Tab>

        <Tab eventKey="form-purchase" title="Purchase Tracking" unmountOnExit>
          <iframe
            ref={purchaseIframeRef}
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=n6DgVTZ4N02zhrVgW0ahJeZJGqC4P1RGgxdoLVF68nlUMUc2QVIyUEE4ODBXTjFQSko1OUQ4SVY4UiQlQCN0PWcu&embed=true"
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="Purchase Tracking Iframe"
          />
        </Tab>

        <Tab eventKey="form-procurement" title="Procurement Function" unmountOnExit>
          <iframe
            ref={procurementIframeRef}
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=n6DgVTZ4N02zhrVgW0ahJeZJGqC4P1RGgxdoLVF68nlUOVlDNFFUTks5RUc5SDZGMzI0UFZCNjZYMSQlQCN0PWcu&embed=true"
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="Procurement Function Iframe"
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SurveyAnalysis;
