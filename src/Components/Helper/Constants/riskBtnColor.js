export const getRiskColor = (risk) => {
  switch (risk) {
    case "High":
      return "#f97061";
    case "Medium":
      return "#ffc857";
    default:
      return "#8cbf9e";
  }
};
