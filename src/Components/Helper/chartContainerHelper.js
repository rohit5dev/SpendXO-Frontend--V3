import  { useState, useEffect, useRef } from "react";

// Custom hook to handle chart container sizing
const useChartContainerReady = (minHeight = 300) => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return { isReady, containerRef, minHeight };
};

// Reusable chart container component
export const ChartContainer = ({ children, minHeight }) => {
  const { isReady, containerRef } = useChartContainerReady(minHeight);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: `${minHeight}px`,
        height: "100%",
      }}
    >
      {isReady && children}
    </div>
  );
};
