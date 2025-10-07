import React, { useState, useRef } from "react";
import { FaArrowsAlt } from "react-icons/fa"; // Fullscreen icon from react-icons

const SupplierPerformance = () => {
  const iframeRef = useRef(null); // Reference to the iframe element
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      // Request fullscreen for the entire page (iframe and button)
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        // Firefox
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        // IE/Edge
        iframeRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen mode for the entire page
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Handling fullscreen changes (optional for better user experience)
  const onFullscreenChange = () => {
    if (
      document.fullscreenElement === iframeRef.current ||
      document.webkitFullscreenElement === iframeRef.current ||
      document.mozFullscreenElement === iframeRef.current ||
      document.msFullscreenElement === iframeRef.current
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  // Add fullscreen change listener on component mount
  React.useEffect(() => {
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("msfullscreenchange", onFullscreenChange);

    // Clean up on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        onFullscreenChange
      );
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("msfullscreenchange", onFullscreenChange);
    };
  }, []);

  return (
    <div>
      {/* Fullscreen iframe with reference */}
      <iframe
        ref={iframeRef}
        src="https://app.powerbi.com/reportEmbed?reportId=93b42793-75a5-4669-a7da-565c9688e949&autoAuth=true&ctid=55e0a09f-7836-4d37-b386-b5605b46a125"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          marginTop: "5px",
        }}
        title="Fullscreen Iframe"
      />
      {/* Fullscreen button fixed to bottom-right corner */}
      <button onClick={handleFullscreenToggle} className="full-scrn-button">
        <FaArrowsAlt />
      </button>
    </div>
  );
};

export default SupplierPerformance;
