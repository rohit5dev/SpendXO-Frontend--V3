import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { IFMTabsData } from "../../Data/IFMTabsData";
import { Form } from "react-bootstrap"; // Import Form for the switch

// ICONS
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const IFMSpendAnalysisTab = () => {
  // States
  const [showData, setShowData] = useState(false);

  // ################# IFM Spend Breakdown-  CHART DATA ####################
  const [IFMSpendBreakdown, setIFMSpendBreakdown] = useState({
    series: [
      {
        name: "Annual Spend",
        data: [180, 140, 100, 60, 50, 40, 35, 30, 20, 15],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      colors: ["#048D9C"], // Teal color for all bars
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return "₹" + val + " Cr";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Cleaning",
          "Security Personnel",
          "HVAC Systems",
          "Pest Control",
          "Energy Management",
          "Landscaping",
          "Asset Management",
          "Waste Management",
          "Labeling & Tags",
          "Space Planning",
        ],
        labels: {
          style: {
            fontSize: "10px",
          },
          rotate: -45, // Rotate labels for better readability
          hideOverlappingLabels: true,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          text: "Amount (₹ Crore)",
          style: {
            fontSize: "12px",
            fontWeight: 600,
          },
        },
        labels: {
          formatter: function (val) {
            return "₹" + val + " Cr";
          },
          style: {
            fontSize: "12px",
          },
        },
        axisBorder: {
          show: true,
          color: "#E5E7EB",
        },
        axisTicks: {
          show: true,
          color: "#E5E7EB",
        },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "₹" + val + " Crore";
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 700,
            },
            xaxis: {
              labels: {
                rotate: -90,
              },
            },
          },
        },
      ],
    },
  });

  // ################# IFM Spend Trend-  CHART DATA ####################
  const [IFMSpendTrend, setIFMSpendTrend] = useState({
    series: [
      {
        name: "Spend",
        data: [
          110, 115, 135, 120, 105, 110, 130, 125, 130, 140, 155, 150, 150, 155,
          175, 165, 170, 178, 195, 185,
        ],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2, // Set line width (default is 2)
        colors: "rgba(4, 141, 156, 0.9)", // Set line color (red in this example)
      },
      markers: {
        size: 4, // Set the size of the markers
        colors: "#078391", // Same color as the line
        strokeColors: "#fff", // Border color of markers
        strokeWidth: 2, // Border width of markers
        hover: {
          size: 8, // Size when hovered
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Q1 2020",
          "Q2 2020",
          "Q3 2020",
          "Q4 2020",
          "Q1 2021",
          "Q2 2021",
          "Q3 2021",
          "Q4 2021",
          "Q1 2022",
          "Q2 2022",
          "Q3 2022",
          "Q4 2022",
          "Q1 2023",
          "Q2 2023",
          "Q3 2023",
          "Q4 2023",
          "Q1 2024",
          "Q2 2024",
          "Q3 2024",
          "Q4 2024",
        ],
      },
    },
  });

  // ################# Cost per Sq. Ft. by Region  -  CHART DATA ####################
  const [IFMCostByRegion, setIFMCostByRegion] = useState({
    series: [
      {
        name: "Client IFM Spend",
        data: [86, 82, 80, 74, 60, 78, 68, 70],
      },
      {
        name: "Industry Benchmark",
        data: [73, 70, 68, 62, 55, 65, 58, 60],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 430,
        stacked: false,
      },
      colors: ["rgb(45, 176, 190)", "#127985"],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
          dataLabels: {
            position: "center", // Changed from 'top' to 'center'
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
          fontWeight: "bold",
        },
        formatter: function (val) {
          return "₹" + val;
        },
        background: {
          enabled: false,
        },
        offsetX: 20, // Right padding (moves label rightward)
        textAnchor: "start", // Aligns text to the left of the position
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (val) {
            return "₹" + val + " / Sq. Ft.";
          },
        },
      },
      xaxis: {
        categories: [
          "USA",
          "UK",
          "Germany",
          "Saudi Arabia",
          "India",
          "UAE",
          "Egypt",
          "Other Regions",
        ],
        labels: {
          position: "bottom",
          style: {
            fontSize: "12px",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 600,
          },
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "12px",
      },
    },
  });

  // ################# IFM Spend Forecasted -  CHART DATA ####################
  const [IFMSpendForecasted, setIFMSpendForecasted] = useState({
    series: [
      {
        name: "Forecasted Spend",
        data: [680, 710, 745, 780, 820],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "straight",
        width: 2,
        colors: "rgba(4, 141, 156, 0.9)",
        dashArray: [3, 3], // This makes the line dotted/dashed
      },
      markers: {
        size: 4, // Set the size of the markers
        colors: "#078391", // Same color as the line
        strokeColors: "#fff", // Border color of markers
        strokeWidth: 2, // Border width of markers
        hover: {
          size: 8, // Size when hovered
        },
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["2024 (Actual)", "2025", "2026", "2027", "2028"],
      },
    },
  });

  return (
    <div className="commodity-data">
      {/* ################# Level 1 #################### */}

      <div className="row row-cols-1 row-cols-md-5 g-2 mt-2">
        {/* kpi card-1 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Total IFM Spend (Annual)​</p>

            <div className="px-2">
              <div className="d-flex justify-content-between align-items-center px-2">
                <div className="text-start">
                  <p
                    className="global-kpi-num text-start "
                    style={{
                      fontSize: "clamp(18px, 2vw, 30px)",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ 160
                    <span
                      className="global-kpi-name"
                      style={{ color: "#74a3a2" }}
                    >
                      Crore
                    </span>
                  </p>
                </div>

                <div>
                  <p className="kpi-secondary-title mt-2">
                    <span
                      className="kpi-secondary-data-1"
                      style={{ fontSize: "16px" }}
                    >
                      <FaArrowUp size={12} className="me-1" />
                      2.9%
                    </span>{" "}
                    <br />
                    MOM Change
                  </p>
                  <p className="kpi-secondary-title mt-1">
                    <span
                      className="kpi-secondary-data-2"
                      style={{ fontSize: "16px" }}
                    >
                      <FaArrowDown size={12} className="me-1" />
                      1.4%
                    </span>{" "}
                    <br />
                    YOY Change
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* kpi card-2 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Top Sub-Service spend​</p>

            <div className="d-flex justify-content-center align-items-center flex-column px-2 ">
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                ₹ 180
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  Crore (26.5 %)
                </span>
              </p>
              {/* <p className="global-kpi-name">(Cleaning Services)​</p> */}
              <p className="global-font fst-italic">
                Cleaning Services is the largest contributor to overall IFM
                spend ​​
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-3 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Cost per Sq. Ft.​​</p>

            <div className="d-flex justify-content-center flex-column px-2 align-items-center">
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                ₹ 72​
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  / Sq. Ft.
                </span>
              </p>
              {/* <p className="global-kpi-name">(Cleaning Services)​</p> */}
              <p className="global-font fst-italic">
                Avg. cost per square foot for IFM services vs. benchmark​​​
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-4 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Top Regional Spend​​</p>

            <div className="d-flex justify-content-center flex-column px-2 align-items-center">
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                ₹ 280
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  Crore
                </span>
              </p>
              {/* <p className="global-kpi-name">UAE​</p> */}
              <p className="global-font fst-italic">
                UAE is largest share of IFM spend​​​
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-5 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Identified Saving Potential​​</p>

            <div className="position-relative">
              {/* Blurred Content */}
              <div
                className="d-flex justify-content-center flex-column px-2 align-items-center"
                style={{
                  filter: "blur(5px)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                <p
                  className="global-kpi-num"
                  style={{
                    fontSize: "clamp(18px, 2vw, 25px)",
                    fontWeight: "bold",
                  }}
                >
                  ₹ 15 ​
                  <span
                    className="global-kpi-name"
                    style={{ color: "#74a3a2" }}
                  >
                    Crore/year
                  </span>
                </p>
                <p className="global-font fst-italic">
                  Projected savings → via bundling Cleaning, Security, and Pest
                  Mgmt​​​
                </p>
              </div>

              {/* Overlay Message */}
              <div
                className="position-absolute top-50 start-50 translate-middle text-center"
                style={{
                  zIndex: 10,
                  width: "100%",
                }}
              >
                <div
                  className="bg-light p-2 rounded d-inline-block"
                  style={{
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <p className="m-0 global-font">
                    🔒 To unlock more details, subscription is required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 2 #################### */}
      <div className="row g-2 mt-1">
        {/* CHART 1 */}
        <div className="col-md-6">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2">
              IFM Spend Trend (2020 - 2024)
            </p>
            <p className="text-start global-font ms-2 mb-2">
              Cleaning and Security together account for nearly half of total
              IFM spend — presenting key opportunities for optimization​
            </p>
            <div className="flex-grow-1">
              <ReactApexChart
                options={IFMSpendTrend.options}
                series={IFMSpendTrend.series}
                type="line"
                height={250}
              />
            </div>
          </div>
        </div>

        {/* CHART 2 */}
        <div className="col-md-6">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2">
              Forecasted IFM Spend Growth (2024 – 2028)
            </p>
            <p className="text-start global-font ms-2 mb-2">
              Consistent spikes observed in Q3 → Likely aligned with festive
              seasons (e.g., Ramadan, Eid, Year-end sales) → Driving increased
              Cleaning & Security costs
            </p>
            <div className="flex-grow-1">
              <ReactApexChart
                options={IFMSpendForecasted.options}
                series={IFMSpendForecasted.series}
                type="line"
                height={250}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 3 #################### */}
      <div className="row g-2 mt-2">
        {/* CHART 3 */}
        <div className="col-md-6">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <div className="d-flex justify-content-between mb-2 pb-1">
              <p className="head-theme text-start m-2">
                Cost per Sq. Ft. by Region
              </p>
              <div className="d-flex justify-content-end align-items-center">
                <label className="global-font"> Show Data </label>
                <Form.Check
                  type="switch"
                  id="chart-table-switch"
                  checked={showData}
                  onChange={() => setShowData(!showData)}
                />
              </div>
            </div>

            {showData ? (
              <div
                className="table-container pe-1"
                // style={{ maxHeight: "245px", overflowY: "auto" }}
              >
                <table className="table table-bordered table-sm m-0">
                  <thead>
                    <tr>
                      <th className="p-1 text-start defaultStyleHead">
                        Region
                      </th>
                      <th className="p-1 text-start defaultStyleHead">
                        Client IFM Spend <br />
                        (₹ / Sq. Ft.)
                      </th>
                      <th className="p-1 text-start defaultStyleHead">
                        Industry Benchmark <br />
                        (₹ / Sq. Ft.)
                      </th>
                      <th className="p-1 text-start defaultStyleHead">
                        Variance
                      </th>
                      <th className="p-1 text-start defaultStyleHead">
                        % Above/Below <br /> Benchmark
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {IFMTabsData.Cost_by_region_data.map((data, index) => (
                      <tr key={index}>
                        <td className="p-1 defaultStyles">{data.region}</td>
                        <td className="p-1 defaultStyles">
                          {data.client_spend}
                        </td>
                        <td className="p-1 defaultStyles">
                          {data.industry_benchmark}
                        </td>
                        <td className="p-1 defaultStyles">{data.variance}</td>
                        <td className="p-1 defaultStyles">{data.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex-grow-1">
                <ReactApexChart
                  options={IFMCostByRegion.options}
                  series={IFMCostByRegion.series}
                  type="bar"
                />
              </div>
            )}
          </div>
        </div>

        {/* CHART 4 */}
        <div className="col-md-6">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2">
              IFM Spend Breakdown by Sub-Service (Annual | ₹ Cr)
            </p>
            <p className="text-start global-font ms-2 mb-2">
              Projected spend growth of ~4.5–5.0% annually driven by
              inflationary pressures, sustainability initiatives, and store
              expansion.​
            </p>
            <div className="flex-grow-1">
              <ReactApexChart
                options={IFMSpendBreakdown.options}
                series={IFMSpendBreakdown.series}
                type="bar"
                height={380}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFMSpendAnalysisTab;
