import React from "react";
import PropTypes from "prop-types";
import { formatCompactNumber } from "../../Config/formatCompactNumber";

const MultiColorProgressBar = ({ values, labels, colors }) => {
  const total = values.reduce((acc, value) => acc + value, 0);
  const minPercentage = 15;
  const numSections = values.length;

  // Calculate initial widths and apply minimum width constraint
  let widths = values.map((value) =>
    Math.max((value / total) * 100, minPercentage)
  );

  // Adjust widths to ensure the total is exactly 100%
  const totalWidth = widths.reduce((acc, width) => acc + width, 0);
  const excess = totalWidth - 100;

  if (excess > 0) {
    // Reduce widths proportionally if total exceeds 100%
    widths = widths.map(
      (width) =>
        width -
        (excess * (width - minPercentage)) /
          (totalWidth - minPercentage * numSections)
    );
  }

  return (
    <div>
      {/* Progress bar container */}
      <div style={styles.progressBarContainer}>
        {values.map((value, index) => (
          <div
            key={index}
            style={{
              ...styles.progressBarSection,
              width: `${widths[index]}%`,
              backgroundColor: colors[index % colors.length],
            }}
          >
            <span style={styles.valueText}>{formatCompactNumber(value)}</span>
          </div>
        ))}
      </div>

      {/* Labels container below the progress bar */}
      <div style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <span
            key={index}
            style={{
              ...styles.label,
              color: colors[index % colors.length],
              fontWeight: 600,
            }}
          >
            <span
              style={{
                color: colors[index % colors.length],
                marginRight: "2px",
              }}
            >
              ⦿
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

// Default props for fallback values
MultiColorProgressBar.defaultProps = {
  colors: ["#227c9e", "#ffc857", "#8cbf9e"],
};

//  "#f97061"

// PropTypes for type checking
MultiColorProgressBar.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

// CSS styles as an object
const styles = {
  progressBarContainer: {
    display: "flex",
    width: "100%",
    height: "20px",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative",
  },
  progressBarSection: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  valueText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "10px",
  },
  labelsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  label: {
    textAlign: "center",
    fontSize: "10px",
  },
};

export default MultiColorProgressBar;
