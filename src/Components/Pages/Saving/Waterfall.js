import React from "react";

const WaterfallChart = ({ data }) => {
  if (!data || data.length === 0) return <div>No data provided</div>;

  // Calculate running total and determine min/max values
  let runningTotal = 0;
  const processedData = data.map((item, index) => {
    const start = runningTotal;
    runningTotal += item.value;
    return {
      ...item,
      start,
      end: runningTotal,
    };
  });

  // Calculate dimensions
  const maxValue = Math.max(
    Math.max(...processedData.map((item) => item.end)),
    Math.max(...processedData.map((item) => item.start))
  );
  const minValue = Math.min(
    Math.min(...processedData.map((item) => item.end)),
    Math.min(...processedData.map((item) => item.start))
  );
  const range = maxValue - minValue;

  // Chart dimensions
  const chartHeight = 300;
  const barWidth = 40;
  const barSpacing = 20;
  const chartWidth = data.length * (barWidth + barSpacing);

  // Calculate scale and offset for vertical positioning
  const scale = chartHeight / range;
  const offset = minValue < 0 ? Math.abs(minValue) * scale : 0;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">Waterfall Chart</h3>
      <div
        className="relative"
        style={{ height: `${chartHeight}px`, width: `${chartWidth}px` }}
      >
        {/* Zero line if we have negative values */}
        {minValue < 0 && (
          <div
            className="absolute border-t border-gray-400 w-full"
            style={{ bottom: `${offset}px` }}
          />
        )}

        {/* Bars */}
        {processedData.map((item, index) => {
          const height = Math.abs(item.end - item.start) * scale;
          const isPositive = item.value >= 0;
          const bottom = isPositive
            ? Math.min(item.start, item.end) * scale + offset
            : Math.max(item.start, item.end) * scale + offset;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${index * (barWidth + barSpacing)}px`,
                width: `${barWidth}px`,
                height: `${height}px`,
                bottom: `${bottom}px`,
                backgroundColor: item.value > 0 ? "#4CAF50" : "#F44336",
                transition: "height 0.5s, bottom 0.5s",
              }}
            >
              {/* Value label */}
              <div className="absolute w-full text-center text-xs -top-6">
                {item.value > 0 ? `+${item.value}` : item.value}
              </div>

              {/* Total label for the last bar */}
              {index === processedData.length - 1 && (
                <div className="absolute w-full text-center text-xs font-bold top-2">
                  Total: {item.end}
                </div>
              )}
            </div>
          );
        })}

        {/* X-axis labels */}
        <div
          className="absolute w-full"
          style={{ top: `${chartHeight + 10}px` }}
        >
          {processedData.map((item, index) => (
            <div
              key={index}
              className="absolute text-xs text-center"
              style={{
                left: `${index * (barWidth + barSpacing)}px`,
                width: `${barWidth}px`,
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterfallChart;
