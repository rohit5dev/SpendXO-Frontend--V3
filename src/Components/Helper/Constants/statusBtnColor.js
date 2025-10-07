export const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#ffc857";
    case "Rejected":
      return "#f97061";
    case "Approved":
      return "#8cbf9e";
    default:
      return "#50bac7";
  }
};
