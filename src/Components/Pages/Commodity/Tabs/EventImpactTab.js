import { use } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { EventImpactTabData } from "../Data/eventImpactTabData";

const EventImpactTab = () => {
  const [indVsUsPRiceData] = useState({
    series: [
      {
        name: "India Price",
        data: [
          29.5, 43.78, 11.22, 22.15, 49.45, 84.3, 60.02, 65.92, 181.99, 184.4,
          159.07, 130.66, 17.63,
        ],
      },
      {
        name: "US Price",
        data: [
          32.17, 46.07, 15.43, 24.99, 40.58, 74.22, 38.05, 34.61, 194.77,
          104.47, 88.01, 66.2, 9.59,
        ],
      },
    ],

    options: {
      chart: {
        height: 400,
        type: "line",
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#1E3A8A", "#60A5FA"], // Dark blue for India, light blue for US
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      // title: {
      //   text: "India vs US Price",
      //   align: "left",
      //   style: {
      //     fontSize: "16px",
      //     fontWeight: 600,
      //   },
      // },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 4,
      },
      xaxis: {
        categories: [
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
        ],
        title: {
          text: "Year",
        },
        labels: {
          style: { fontSize: "12px" },
        },
      },
      // yaxis: {
      //   title: {
      //     text: "India Price and US Price",
      //   },
      // },
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
    },
  });
  // const data = [
  //   { date: "2020-01-01", price: 583.14, sentiment: 0 },
  //   { date: "2020-02-01", price: 579.05, sentiment: 0 },
  //   { date: "2020-03-01", price: 567.45, sentiment: -1 },
  //   { date: "2020-04-01", price: 511.71, sentiment: 0 },
  //   { date: "2020-05-01", price: 480.55, sentiment: -1 },
  //   { date: "2020-06-01", price: 505.64, sentiment: 0.5 },
  //   { date: "2020-07-01", price: 480.0, sentiment: 0 },
  //   { date: "2020-08-01", price: 469.1, sentiment: 0 },
  //   { date: "2020-09-01", price: 544.43, sentiment: 0 },
  //   { date: "2020-10-01", price: 644.5, sentiment: -1 },
  //   { date: "2020-11-01", price: 726.05, sentiment: 0 },
  //   { date: "2020-12-01", price: 866.32, sentiment: 1 },
  //   { date: "2021-01-01", price: 1072.26, sentiment: -1 },
  //   { date: "2021-02-01", price: 1178.32, sentiment: 0 },
  //   { date: "2021-03-01", price: 1268.0, sentiment: -1 },
  //   { date: "2021-04-01", price: 1377.19, sentiment: -1 },
  //   { date: "2021-05-01", price: 1532.05, sentiment: 1 },
  //   { date: "2021-06-01", price: 1663.27, sentiment: 1 },
  //   { date: "2021-07-01", price: 1799.62, sentiment: 1 },
  //   { date: "2021-08-01", price: 1891.86, sentiment: -1 },
  //   { date: "2021-09-01", price: 1928.19, sentiment: -1 },
  //   { date: "2021-10-01", price: 1884.14, sentiment: -1 },
  //   { date: "2021-11-01", price: 1765.48, sentiment: 1 },
  //   { date: "2021-12-01", price: 1592.14, sentiment: 1 },
  //   { date: "2022-01-01", price: 1377.05, sentiment: -1 },
  //   { date: "2022-02-01", price: 1120.42, sentiment: 0 },
  //   { date: "2022-03-01", price: 1148.0, sentiment: -1 },
  //   { date: "2022-04-01", price: 1472.15, sentiment: 0 },
  //   { date: "2022-05-01", price: 1338.36, sentiment: 1 },
  //   { date: "2022-06-01", price: 1120.68, sentiment: -1 },
  //   { date: "2022-07-01", price: 909.14, sentiment: -1 },
  //   { date: "2022-08-01", price: 803.43, sentiment: 1 },
  //   { date: "2022-09-01", price: 794.64, sentiment: 1 },
  //   { date: "2022-10-01", price: 745.9, sentiment: 1 },
  //   { date: "2022-11-01", price: 666.33, sentiment: -1 },
  //   { date: "2022-12-01", price: 675.91, sentiment: 1 },
  //   { date: "2023-01-01", price: 737.23, sentiment: 1 },
  //   { date: "2023-02-01", price: 852.1, sentiment: 1 },
  //   { date: "2023-03-01", price: 1069.52, sentiment: -1 },
  //   { date: "2023-04-01", price: 1157.53, sentiment: -1 },
  //   { date: "2023-05-01", price: 1087.55, sentiment: -1 },
  //   { date: "2023-06-01", price: 920.14, sentiment: -1 },
  //   { date: "2023-07-01", price: 870.52, sentiment: -1 },
  //   { date: "2023-08-01", price: 800.0, sentiment: 0 },
  //   { date: "2023-09-01", price: 710.57, sentiment: 0 },
  //   { date: "2023-10-01", price: 735.5, sentiment: -1 },
  //   { date: "2023-11-01", price: 905.48, sentiment: 1 },
  //   { date: "2023-12-01", price: 1075.7, sentiment: -1 },
  //   { date: "2024-01-01", price: 1076.52, sentiment: 1 },
  //   { date: "2024-02-01", price: 924.86, sentiment: 1 },
  //   { date: "2024-03-01", price: 802.6, sentiment: 0 },
  //   { date: "2024-04-01", price: 841.95, sentiment: 0.5 },
  //   { date: "2024-05-01", price: 786.91, sentiment: 1 },
  //   { date: "2024-06-01", price: 722.29, sentiment: 1 },
  //   { date: "2024-07-01", price: 666.36, sentiment: -1 },
  //   { date: "2024-08-01", price: 680.14, sentiment: -0.5 },
  //   { date: "2024-09-01", price: 706.6, sentiment: -0.33 },
  //   { date: "2024-10-01", price: 708.52, sentiment: -1 },
  //   { date: "2024-11-01", price: 693.65, sentiment: -0.29 },
  //   { date: "2024-12-01", price: 688.9, sentiment: -0.57 },
  //   { date: "2025-01-01", price: 704.48, sentiment: 0 },
  //   { date: "2025-02-01", price: 785.37, sentiment: -1 },
  //   { date: "2025-03-01", price: 924.33, sentiment: -0.34 },
  //   { date: "2025-04-01", price: 929.24, sentiment: -1 },
  //   { date: "2025-05-01", price: 884.92, sentiment: 0.71 },
  // ];

  // // Separate arrays for chart
  // const prices = data.map((d) => d.price);
  // const dates = data.map((d) => d.date);

  // // Determine point color based on sentiment
  // const markerColors = data.map((d) => {
  //   if (d.sentiment > 0.5) return "#00FF00"; // green
  //   if (d.sentiment > 0) return "#FFD700"; // yellow
  //   if (d.sentiment < 0) return "#FF0000"; // red
  //   return "#999999"; // neutral gray
  // });

 

  // const [priceSentimentAnalysis] = useState({  series : [
  //   {
  //     name: "HRC Price",
  //     data: prices,
  //   },
  // ],options:{
  //   chart: {
  //     height: 400,
  //     type: "line",
  //     zoom: { enabled: false },
  //     toolbar: { show: true },
  //   },
  //   stroke: {
  //     curve: "smooth",
  //     width: 3,
  //     colors: ["#007bff"],
  //   },
  //   markers: {
  //     size: 5,
  //     colors: markerColors,
  //     strokeWidth: 0,
  //   },
  //   dataLabels: { enabled: false },

  //   xaxis: {
  //     categories: dates,
  //     labels: {
  //       rotate: -45,
  //       formatter: (val) => (val ? val.slice(0, 7) : ""),
  //     },
  //     title: { text: "Date" },
  //   },

  //   yaxis: {
  //     title: { text: "HRC Price" },
  //   },
  //   tooltip: {
  //     shared: true,
  //     y: {
  //       formatter: (val, { dataPointIndex }) =>
  //         `${val.toFixed(2)} | Sentiment: ${data[dataPointIndex].sentiment}`,
  //     },
  //   },
  // }});

  const [impactProfilingCategDist] = useState({
    series: [37, 32, 29, 17, 3, 1], // values from your table
    options: {
      chart: {
        type: "donut",
        toolbar: { show: false },
      },
      labels: [
        "Trade & Tariff Shocks",
        "Market Distortion",
        "Cost Push/Material",
        "Demand Cycle",
        "Supply Chain Disruption",
        "Macroeconomic Shifts",
      ],
      colors: [
        "#2E93fA", // Trade & Tariff Shocks - blue
        "#1E40AF", // Market Distortion - dark blue
        "#E67E22", // Cost Push/Material - orange
        "#6D28D9", // Demand Cycle - purple
        "#EC4899", // Supply Chain Disruption - pink
        "#A855F7", // Macroeconomic Shifts - violet
      ],
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(0)}%`,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
                formatter: (val) => `${val}%`,
              },
              total: {
                show: true,
                label: "Total",
                formatter: () => "100%",
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });


const data = EventImpactTabData.priceSentimentAnalysisData;
const dates = data.map((d) => d.date);

// Transform data to include marker colors
const seriesData = data.map((d) => ({
  x: d.date,
  y: d.price,
  fillColor: d.sentiment === "Positive" ? "#89e79aff" 
            : d.sentiment === "Negative" ? "#ff7d6fff" 
            : "#FFD966"
}));

const [priceSentimentAnalysis] = useState({
  series: [
    {
      name: "HRC Price",
      data: seriesData,
    },
  ],
  options: {
    chart: {
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: true },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#007bff"],
    },
    markers: {
      size: 5,
      strokeWidth: 0,
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "category",
      categories: dates,
      labels: {
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: false,
        style: {
          fontSize: "10px",
        },
        formatter: (val) => {
          if (!val) return "";
          const date = new Date(val);
          if (isNaN(date)) return val; // fallback for invalid date strings
          const day = date.getDate();
          const month = date.toLocaleString("en-US", { month: "short" });
          const year = date.getFullYear();
          return `${day} ${month} ${year}`;
        },
      },
      title: { text: "Date" },
    },
    yaxis: {
      title: { text: "HRC Price" },
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const point = data[dataPointIndex];
        return `
          <div style="padding:8px; min-width:200px; background:white; border:1px solid #ddd; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.1)">
            <div style="font-weight:600; text-align:center; margin-bottom:6px;">Monthly Event Analysis</div>
            <table style="width:100%; border-collapse:collapse; font-size:12px;">
              <thead>
                <tr style="background:#f3f4f6;">
                  <th style="padding:4px; text-align:left;">Date</th>
                  <th style="padding:4px; text-align:center;">Sentiment</th>
                  <th style="padding:4px; text-align:right;">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:4px;">${point.date}</td>
                  <td style="padding:4px; text-align:center; background:${
                    point.sentiment === "Negative"
                      ? "#FCA5A5"
                      : point.sentiment === "Positive"
                      ? "#86EFAC"
                      : "#FDE68A"
                  }; border-radius:4px;">
                    ${point.sentiment}
                  </td>
                  <td style="padding:4px; text-align:right;">${point.price.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
      },
    },
  },
});


  return (
    <div className="commodity-data">
      {/* ################# Level 2 #################### */}
      <div className="row g-2 mt-1">
        {/* CHART 1 */}
        <div className="col-md-5">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2">India vs US Price</p>

            <div className="flex-grow-1">
              <ReactApexChart
                options={indVsUsPRiceData.options}
                series={indVsUsPRiceData.series}
                type="line"
                height={300}
              />
            </div>
          </div>
        </div>

        {/* CHART 2 */}
        <div className="col-md-7">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2">
              Price Sentiment Analysis
            </p>

            <div className="flex-grow-1">
              <ReactApexChart
                options={priceSentimentAnalysis.options}
                series={priceSentimentAnalysis.series}
                type="line"
                height={300}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 3 #################### */}
      <div className="row g-2 mt-1">
        {/* CHART 3 */}
        <div className="col-md-4">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2">
              IFM Spend Breakdown by Sub-Service (Annual | ₹ Cr)
            </p>
            <ReactApexChart
              options={impactProfilingCategDist.options}
              series={impactProfilingCategDist.series}
              type="donut"
              height={300}
            />
          </div>
        </div>

        {/* CHART 4 */}

        <div className="col-md-8">
          <div className="flex-grow-1">
            <div className="global-cards h-100 d-flex flex-column">
              <p className="head-theme">Trade & Tariff Shocks - 2025</p>

              {/* 🔹 Scroll container */}
              <div
                className="table-container my-2"
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "300px",
                }}
              >
                <table className="table table-bordered table-sm m-0">
                  <thead className="table-light sticky-top">
                    <tr style={{ backgroundColor: "#bfe1e5" }}>
                      {[
                        "Year",
                        "Month",
                        "Category",
                        "Sub Category",
                        "Estimated Impact % Range",
                        "Impact Direction",
                        "Duration Estimate",
                        "Confidence Level",
                        "Volatility Likelihood",
                        "Strategic Justification",
                      ].map((header) => (
                        <th
                          key={header}
                          className="text-start defaultStyleHead"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {EventImpactTabData.newsImpactProfiling.map(
                      (row, index) => (
                        <tr key={index}>
                          <td className="defaultStyles">{row.year}</td>
                          <td className="defaultStyles">{row.month}</td>
                          <td className="defaultStyles">{row.category}</td>
                          <td className="defaultStyles">{row.subCategory}</td>
                          <td className="defaultStyles">
                            {row.estimatedImpactRange}
                          </td>
                          <td className="defaultStyles">
                            {row.direction === "up" ? (
                              <span className="text-danger">↑</span>
                            ) : (
                              <span className="text-success">↓</span>
                            )}
                          </td>
                          <td className="defaultStyles">
                            {row.durationEstimate}
                          </td>
                          <td className="defaultStyles">
                            <span className="badge bg-danger">
                              {row.confidenceLevel}
                            </span>
                          </td>
                          <td className="defaultStyles">
                            <span className="badge bg-warning text-dark">
                              {row.volatilityLikelihood}
                            </span>
                          </td>
                          <td
                            className="defaultStyles"
                            style={{
                              whiteSpace: "pre-line",
                              maxWidth: "400px",
                            }}
                          >
                            {row.strategicJustification}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventImpactTab;
