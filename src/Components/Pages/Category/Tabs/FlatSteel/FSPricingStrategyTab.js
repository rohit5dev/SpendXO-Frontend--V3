import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import Chart from "react-apexcharts";
import { Dropdown, Form } from "react-bootstrap";
import { keyPriceDriversDataCharts } from "../../../Commodity/Data/commodityData";
import { categoryOverviewData } from "../../Data/categoryOverviewData";
import ReactApexChart from "react-apexcharts";

const FSPricingStrategyTab = () => {
  const [dataBasis, setDataBasis] = useState("Monthly Data");
  const [priceDriverMethod, setPriceDriverMethod] = useState("BOF");
  const [showChart, setShowChart] = useState(true);
  const [selectedYear, setSelectedYear] = useState("All Years");

  // Default column settings (for styling)
  const defaultStyles = {
    fontSize: "12px",
    textAlign: "start",
    padding: "8px",
  };
  const defaultStyleHead = {
    fontSize: "12px",
    textAlign: "center",
    padding: "8px",
    backgroundColor: "rgba(4, 141, 156, 0.25)",
    color: "(var(--color-main)",
    border: "1px solid #ddd",
  };

  // ################# FORECAST CHART DATA ####################
  const [forecastChart, setForecastChart] = useState({
    series: [
      {
        name: "HRC PRice",
        data: [
          54100, 53898, 53206, 51769, 51548, 51943, 52176, 52929, 51687, 51658,
          52938, 52287, 53924, 53456, 53541, 52612, 52164, 52449, 52605,
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
        width: 2,
        colors: "rgba(4, 141, 156, 0.9)",
        dashArray: [3, 3], // This makes the line dotted/dashed
      },
      markers: {
        size: 4,
        colors: "#078391",
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 8,
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
          "Apr-25",
          "May-25",
          "Jun-25",
          "Jul-25",
          "Aug-25",
          "Sep-25",
          "Oct-25",
          "Nov-25",
          "Dec-25",
          "Jan-26",
          "Feb-26",
          "Mar-26",
          "Apr-26",
          "May-26",
          "Jun-26",
          "Jul-26",
          "Aug-26",
          "Sep-26",
          "Oct-26",
        ],
      },
    },
  });

  // ################# OTHER CHARTS ####################
  const parseDate = (dateString) => {
    if (!dateString) {
      console.warn("Invalid date string:", dateString);
      return new Date();
    }
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterDataByBasis = (basis, data) => {
    const selectedData = data;
    if (basis === "Monthly Data") {
      return selectedData;
    } else if (basis === "Quarterly Data") {
      const quarterlyData = [];
      for (let i = 0; i < selectedData.length; i += 3) {
        const quarterData = selectedData.slice(i, i + 3);
        const avgPrice =
          quarterData.reduce((sum, item) => sum + item.HRC_Price, 0) /
          quarterData.length;
        quarterlyData.push({
          Date: quarterData[quarterData.length - 1].Date,
          HRC_Price: avgPrice,
        });
      }
      return quarterlyData;
    } else if (basis === "Yearly Data") {
      const yearlyData = [];
      const yearMap = {};

      selectedData.forEach((item) => {
        const year = parseDate(item.Date || item.date).getFullYear();
        if (!yearMap[year]) {
          yearMap[year] = { total: 0, count: 0 };
        }
        yearMap[year].total += item.HRC_Price || item.price;
        yearMap[year].count += 1;
      });

      for (const year in yearMap) {
        yearlyData.push({
          Date: `31-12-${year}`,
          HRC_Price: yearMap[year].total / yearMap[year].count,
        });
      }

      return yearlyData;
    }
    return selectedData;
  };

  // Extract unique years from hrcPriceData
  const uniqueYears = [
    "All Years",
    ...new Set(
      categoryOverviewData.hrcPriceData.map((item) =>
        parseDate(item.date).getFullYear()
      )
    ),
  ];

  // Filter data based on selected year
  const filterDataByYear = (data, year) => {
    if (year === "All Years") return data;
    return data.filter((item) => {
      const parsedDate = parseDate(item.Date || item.date);
      return parsedDate.getFullYear().toString() === year;
    });
  };

  const filteredHRCData = filterDataByYear(
    categoryOverviewData.hrcPriceData.map((item) => ({
      Date: item.date,
      HRC_Price: item.price,
    })),
    selectedYear
  );

  const filteredChartData = filterDataByBasis(dataBasis, filteredHRCData);

  const formatXAxisLabel = (dateString, basis) => {
    const date = parseDate(dateString);
    if (basis === "Yearly Data") {
      return date.getFullYear().toString();
    } else if (basis === "Quarterly Data") {
      const month = date.getMonth();
      const year = date.getFullYear();
      if (month >= 0 && month <= 2) return `Jan-Mar ${year}`;
      if (month >= 3 && month <= 5) return `Apr-Jun ${year}`;
      if (month >= 6 && month <= 8) return `Jul-Sep ${year}`;
      return `Oct-Dec ${year}`;
    } else {
      return date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
  };

  // PRICE BREAKDOWN CHART
  const seriesCostBreakDown = [
    {
      name: "CAPEX",
      data: [94, 58],
    },
    {
      name: "Fixed OPEX",
      data: [87, 54],
    },
    {
      name: "Fuel Cost",
      data: [80, 90],
    },
    {
      name: "Raw Material Cost",
      data: [100, 300],
    },
  ];

  const optionsCostBreakDown = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.5,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    xaxis: {
      categories: ["Commercial BF-BOF", "Scrap-based EAF"],
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      hover: {
        filter: "none",
      },
    },
    legend: {
      position: "right",
      offsetY: 0,
      fontSize: "10px",
    },
    colors: ["#2dadbb", "#f97061", "#8cbf9e", "#127985"],
  };

  const priceDriverData =
    categoryOverviewData?.keyPriceDriversData[priceDriverMethod];

  const priceDriverChartData = {
    series: Object.values(keyPriceDriversDataCharts[priceDriverMethod]),
    options: {
      labels: Object.keys(keyPriceDriversDataCharts[priceDriverMethod]),
      legend: {
        position: "right",
        horizontalAlign: "center",
        fontSize: "10px",
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
        style: {
          fontSize: "12px",
        },
      },
      colors: ["#2dadbb", "#f97061", "#8cbf9e", "#127985"],
    },
  };

  // HRC PRICE CHART
  const categories = categoryOverviewData?.hrcPriceData
    .map((item) => item.month)
    .reverse();

  const optionsHRC = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["var(--color-main-light)"],
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: "10px",
        },
      },
    },
    yaxis: {
      title: {
        text: "HRCPrice (INR/Tonne)",
      },
      labels: {
        formatter: function (value) {
          return value.toLocaleString();
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return "₹" + value.toLocaleString() + "/Tonne";
        },
      },
    },
  };

  const resetFilters = () => {
    setDataBasis("Monthly Data");
    setSelectedYear("All Years");
  };

  {
    /* ################# HEATMAP CHART #################### */
  }

  // Group by year as shown above
  const groupedByYear = categoryOverviewData?.hrcPriceData.reduce(
    (acc, item) => {
      const year = item.date.split("-")[2];
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    },
    {}
  );

  // Sort each year's data
  Object.keys(groupedByYear).forEach((year) => {
    groupedByYear[year].sort((a, b) => {
      const [dayA, monthA] = a.date.split("-").map(Number);
      const [dayB, monthB] = b.date.split("-").map(Number);
      return monthA - monthB || dayA - dayB;
    });
  });

  // Create series
  const heatMapSeries = Object.keys(groupedByYear).map((year, index) => ({
    name: `${year}`,
    data: groupedByYear[year].map((item) => item.price),
  }));

  const [heatMapChartData, setHeatMapChartData] = useState({
    series: heatMapSeries,
    options: {
      chart: {
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 30000,
                color: "#8cbf9e", // Muted green (medium-low)
                name: "Low",
              },
              {
                from: 30001,
                to: 45000,
                color: "rgb(125, 190, 182)", // Coral (medium-high)
                name: "Medium",
              },
              {
                from: 45001,
                to: 60000,
                color: "#127985", // Dark teal (highest)
                name: "High",
              },

              {
                from: 60001,
                to: 90000,
                color: "#f97060", // Dark teal (highest)
                name: "Extreme",
              },
            ],
          },
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  });

  return (
    <div className="commodity-data">
      {/* ################# Level 1 #################### */}

      <div className="row row-cols-1 row-cols-md-4 g-2 mt-2">
        {/* kpi card-1 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Current Price*</p>

            <div className="d-flex justify-content-center px-2 align-items-center">
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                ₹ 54,100
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  / tonne
                </span>
              </p>
            </div>
            <div className="mt-auto">
              <hr
                className="p-0 mb-0"
                style={{ color: "rgba(0, 0, 0, 0.5)" }}
              />
              <p
                className="p-0 m-0 text-secondary"
                style={{
                  fontSize: "10px",
                }}
              >
                Last Updated : April 2025
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-2 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Change Percentage</p>

            <div className="d-flex justify-content-between px-2 flex-grow-1 align-items-center">
              <p
                className="kpi-secondary-data-1"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                <FaArrowUp size={16} />
                2.9%
                <span className="global-kpi-name">MOM</span>
              </p>
              <p
                className="kpi-secondary-data-2"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                <FaArrowDown size={16} />
                1.4%
                <span className="global-kpi-name">YOY</span>
              </p>
            </div>
            <div className="mt-auto">
              <hr
                className="p-0 mb-0"
                style={{ color: "rgba(0, 0, 0, 0.5)" }}
              />
              <p
                className="p-0 m-0 text-secondary"
                style={{
                  fontSize: "10px",
                }}
              >
                Last Updated : April 2025
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-3 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Contract Benchmark Gap</p>

            <div className="position-relative d-flex flex-column justify-content-center px-2 flex-grow-1 align-items-center">
              {/* Blurred Content */}
              <div
                className="w-100"
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
                  - ₹ 1,250
                  <span className="global-kpi-name">
                    (i.e. market is cheaper)
                  </span>
                </p>
               
              </div>

              {/* Overlay Message - Centered */}
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

            <div className="mt-0">
              <hr
                className="p-0 mb-0"
                style={{ color: "rgba(0, 0, 0, 0.5)" }}
              />
              <p
                className="p-0 m-0 text-secondary"
                style={{
                  fontSize: "10px",
                }}
              >
                Last Updated : April 2025
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-4 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Forecasted Price ( ₹ per tonne)*</p>

            <div className="d-flex justify-content-between px-2 flex-grow-1 align-items-center">
              <div className="d-flex flex-column text-start">
                <p
                  className="global-kpi-num"
                  style={{
                    fontSize: "clamp(18px, 2vw, 25px)",
                    fontWeight: "bold",
                  }}
                >
                  ₹ 53,898
                  <span
                    className="global-kpi-name"
                    style={{ color: "#74a3a2" }}
                  >
                    / tonne
                  </span>
                </p>
                <p className="global-kpi-name">May 2025</p>
              </div>
              <div className="d-flex flex-column text-start">
                <p
                  className="kpi-secondary-data-2 mb-0"
                  style={{
                    fontSize: "clamp(18px, 2vw, 25px)",
                    fontWeight: "bold",
                  }}
                >
                  <FaArrowDown size={16} />
                  0.4%
                </p>
                <p className="global-kpi-name">MOM Change</p>
              </div>
            </div>
            <div className="mt-auto">
              <hr
                className="p-0 mb-0"
                style={{ color: "rgba(0, 0, 0, 0.5)" }}
              />
              <p
                className="p-0 m-0 text-secondary"
                style={{
                  fontSize: "10px",
                }}
              >
                Last Updated : April 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 2 #################### */}
      <div className="row g-2 mt-1">
        <div className="col">
          {/* Steel Price Trend */}
          <div className="w-100 mb-2 global-cards " style={{ height: "320px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3 px-2">
              <p className="head-theme">Price Trend</p>
              <div className="d-flex gap-2">
                <Dropdown onSelect={(key) => setSelectedYear(key)}>
                  <Dropdown.Toggle variant="light" size="sm">
                    {selectedYear}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {uniqueYears.map((year, index) => (
                      <Dropdown.Item key={index} eventKey={year}>
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown onSelect={(key) => setDataBasis(key)}>
                  <Dropdown.Toggle variant="light" size="sm">
                    {dataBasis}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Monthly Data">
                      Monthly Data
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Quarterly Data">
                      Quarterly Data
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Yearly Data">
                      Yearly Data
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <button
                  className="btn btn-theme global-font"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
            <Chart
              options={{
                ...optionsHRC,
                xaxis: {
                  ...optionsHRC.xaxis,
                  categories: filteredChartData.map((item) =>
                    formatXAxisLabel(item.Date, dataBasis)
                  ),
                },
              }}
              series={[
                {
                  name: "HRC Price",
                  data: filteredChartData.map((item) => item.HRC_Price),
                },
              ]}
              type="line"
              height={260}
            />
          </div>
        </div>
        <div className="col">
          <div className="global-cards p-2 ">
            <p className="head-theme text-start m-2">
              {" "}
              Price Trend: Forecasted
            </p>

            <ReactApexChart
              className=""
              options={forecastChart.options}
              series={forecastChart.series}
              type="line"
              height={252}
            />
          </div>
        </div>
      </div>

      {/* ################# Level 3 ####################  */}
      <div className="row g-2">
        <div className="col-6">
          <div className="w-100 global-cards">
            <p className="head-theme text-start m-2">Cost Breakdown Analysis</p>
            <Chart
              options={optionsCostBreakDown}
              series={seriesCostBreakDown}
              type="bar"
              height={140}
            />
          </div>
          <div className="w-100 global-cards mt-2">
            <div className="d-flex justify-content-between mb-2 pb-1">
              <p className="head-theme text-start m-2">
                Key Price Drivers Analysis
              </p>
            </div>
            <div
              className="table-responsive px-1"
              style={{ maxHeight: "310px", overflowY: "auto" }}
            >
              <table className="table table-striped">
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#fff",
                    zIndex: "1",
                  }}
                >
                  <tr>
                    {Object.keys(priceDriverData[0]).map((key, index) => (
                      <th key={index} style={defaultStyleHead}>
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceDriverData.map((row, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx} style={defaultStyles}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="global-cards">
            <p className="head-theme text-start m-2">
              {" "}
              Commodity Price Seasonality Heatmap
            </p>
            <ReactApexChart
              options={heatMapChartData.options}
              series={heatMapChartData.series}
              type="heatmap"
              height={520}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSPricingStrategyTab;
