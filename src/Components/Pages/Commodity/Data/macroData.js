// macroEconomicData.js

export const filtersCommodityGroup = ["All", "Flat Steel"];
export const filtersCommodityName = ["HRC", "CRC"];
export const filtersRegion = ["All", "India"];

export const HRC_KPI = [
  { label: "Month", value: "₹0.20 /Kg | Aug’25" },
  { label: "Quarter", value: "₹-1.72 | Jul-Sep’25" },
];
export const CRC_KPI = [
  { label: "Month", value: "₹0.10 /Kg | Aug’25" },
  { label: "Quarter", value: "₹-1.34 | Jul-Sep’25" },
];

export const KPI_META = [
  {
    label: "Steel Production (MT)",
    value: (
      <>
        108.32
        <span style={{ color: "#d9334f", fontSize: "10px" }}>
          ▼ -24.69% YoY Change (24–25)
        </span>
      </>
    ),
  },
  {
    label: "Steel Consumption (MT)",
    value: (
      <>
        110.91
        <span style={{ color: "#d9334f", fontSize: "10px" }}>
          ▼ -24.93% YoY Change (24–25)
        </span>
      </>
    ),
  },
  {
    label: "Steel Import (MT)",
    value: (
      <>
        6.25
        <span style={{ color: "#22A06B", fontSize: "10px" }}>
          ▲ -38.57% YoY Change (24–25)
        </span>
      </>
    ),
  },
  {
    label: "Steel Export (MT)",
    value: (
      <>
        3.91
        <span style={{ color: "#d9334f", fontSize: "10px" }}>
          ▼ -38.96% YoY Change (24–25)
        </span>
      </>
    ),
  },
];

export const getKPIs = (commodityName) => {
  if (commodityName === "CRC") {
    return CRC_KPI;
  }
  return HRC_KPI;
};

export const heatmapCategories = [
  "HRC",
  "CRC",
  "WPI CRC",
  "WPI HRC",
  "Pig Iron",
  "Iron Ore F65",
  "Crude Oil",
  "Coking Coal (Aus)",
  "Inflation",
  "Natural Gas",
  "Electricity WPI",
];
export const heatmapOptions = {
  chart: { type: "heatmap", height: 400 },
  dataLabels: { enabled: true, style: { colors: ["#fff"] } },
  xaxis: { categories: heatmapCategories, labels: { rotate: -45 } },
  yaxis: { categories: heatmapCategories },
  legend: { show: false },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.7,
      radius: 2,
      useFillColorAsStroke: true,
      colorScale: {
        ranges: [
          { from: -1, to: -0.1, color: "#ef5350", name: "Negative" },
          { from: -0.1, to: 0.15, color: "#bdb06b", name: "Neutral" },
          { from: 0.15, to: 0.7, color: "#90caf9", name: "Positive" },
          { from: 0.7, to: 0.95, color: "#38858e", name: "Strong Positive" },
          { from: 0.95, to: 1, color: "#283593", name: "Very Strong Positive" },
        ],
      },
    },
  },
  colors: ["#283593"],
};

export const heatmapSeries = [
  {
    name: "HRC",
    data: [1.0, 1.0, 0.99, 0.99, 0.86, 0.91, 0.75, 0.68, 0.2, 0.57, 0.35],
  },
  {
    name: "CRC",
    data: [1.0, 1.0, 0.98, 0.98, 0.83, 0.94, 0.71, 0.76, 0.2, 0.53, 0.3],
  },
  {
    name: "WPI CRC",
    data: [0.99, 0.98, 1.0, 1.0, 0.93, 0.91, 0.83, 0.78, 0.18, 0.66, 0.46],
  },
  {
    name: "WPI HRC",
    data: [0.99, 0.98, 1.0, 1.0, 0.93, 0.84, 0.96, 0.84, 0.14, 0.8, 0.48],
  },
  {
    name: "Pig Iron",
    data: [0.86, 0.83, 0.93, 0.93, 1.0, 0.61, 0.8, 0.61, 0.11, 0.85, 0.03],
  },
  {
    name: "Iron Ore F65",
    data: [0.91, 0.94, 0.91, 0.84, 0.61, 1.0, 0.47, 0.35, 0.01, 0.33, 0.47],
  },
  {
    name: "Crude Oil",
    data: [0.75, 0.71, 0.83, 0.96, 0.8, 0.47, 1.0, 0.97, 0.01, -0.27, 0.88],
  },
  {
    name: "Coking Coal (Aus)",
    data: [0.68, 0.76, 0.78, 0.84, 0.61, 0.35, 0.97, 1.0, 0.0, -0.27, 1.0],
  },
  {
    name: "Inflation",
    data: [0.2, 0.2, 0.18, 0.14, 0.11, 0.01, 0.01, 0.0, 1.0, -0.27, -0.07],
  },
  {
    name: "Natural Gas",
    data: [0.57, 0.53, 0.66, 0.8, 0.85, 0.33, -0.27, -0.27, -0.27, 1.0, 0.88],
  },
  {
    name: "Electricity WPI",
    data: [0.35, 0.3, 0.46, 0.48, 0.03, 0.47, 0.88, 1.0, -0.07, 0.88, 1.0],
  },
];

export const categories = [
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

export const production = [
  7.25, 7.25, 6.62, 7.57, 8.29, 7.05, 8.12, 1.57, 8.48, 9.4, 9.39, 11.17, 12.46,
];

export const consumption = [
  5.46, 5.46, 5.82, 5.82, 6.45, 3.32, 7.69, 1.09, 7.86, 8.68, 9.86, 11.1, 12.4,
];

export const surplus = [
  1.79, 1.79, 0.04, 0.49, 1.02, -4.91, -0.85, -0.35, 0.62, 0.72, -0.31, -0.89,
  0.06,
];

export const options = {
  chart: {
    type: "line",
    height: 200,
    toolbar: { show: false },
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  colors: ["var(--color-main)", "#90CAF9", "#F05B45"],
  dataLabels: { enabled: false },
  stroke: { width: [0, 0, 3], curve: "smooth" },
  xaxis: {
    categories,
    labels: { style: { fontSize: "10px" } },
  },
  yaxis: [
    {
      title: { text: "Production (MT)", style: { fontSize: "11px" } },
      labels: { style: { fontSize: "11px" } },
      min: 0,
      max: 15,
    },
    {
      opposite: true,
      title: { text: "Consumption (MT)", style: { fontSize: "11px" } },
      labels: { style: { fontSize: "11px" } },
      min: 0,
      max: 15,
    },
  ],
  legend: {
    show: true,
    position: "top",
    fontWeight: 500,
    fontSize: "9px",
  },
  grid: { padding: { top: 8, bottom: 2, right: 18, left: 10 } },
  tooltip: { shared: true, intersect: false },
};

export const series = [
  { name: "Finished Steel Production", type: "bar", data: production },
  { name: "Finished Steel Consumption", type: "bar", data: consumption },
  { name: "Surplus/Deficit", type: "line", data: surplus },
];

export const yearsArray = [
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];

export const volumeBarOptions = {
  chart: {
    type: "bar",
    height: 200,
    toolbar: { show: false },
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },
  colors: ["var(--color-main)", "var(--color-main-light)"],
  dataLabels: { enabled: false },
  xaxis: {
    categories: yearsArray,
    labels: { style: { fontSize: "8px" } },
  },
  yaxis: [
    {
      title: { text: "Volume (MT)", style: { fontSize: "10px" } },
      labels: { style: { fontSize: "9px" } },
      min: 0,
      max: 0.8,
    },
  ],
  legend: {
    show: true,
    position: "top",
    fontWeight: 500,
    fontSize: "9px",
  },
  grid: { padding: { top: 8, bottom: 2, right: 18, left: 10 } },
  tooltip: { shared: true, intersect: false },
};

export const volumeBarSeries = [
  {
    name: "Finished Steel Import",
    data: [
      0.77, 0.77, 0.77, 0.54, 0.64, 0.43, 0.52, 0.59, 0.6, 0.61, 0.61, 0.63,
      0.61,
    ],
  },
  {
    name: "Finished Steel Export",
    data: [
      0.42, 0.42, 0.5, 0.35, 0.26, 0.36, 0.33, 0.38, 0.43, 0.45, 0.46, 0.39,
      0.39,
    ],
  },
];
