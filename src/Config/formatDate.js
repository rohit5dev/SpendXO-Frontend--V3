export function formatDate(dateString) {
  const date = new Date(dateString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}


export function formatDate2(dateString) {
  const date = new Date(dateString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}
