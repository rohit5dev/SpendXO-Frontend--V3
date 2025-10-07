//REACT
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MultiColorProgressBar from "../../Helper/MultiColorProgress";
import ReactApexChart from "react-apexcharts";
import apiUrls from "../../../Config/apiUrls";
import { formatCompactNumber } from "../../../Config/formatCompactNumber";
import { formatDate, formatDate2 } from "../../../Config/formatDate";
import Loading from "../../Helper/Loading";
import { requestHeader } from "../../Helper/Constants/constant";
import errorMessages from "../../Helper/Constants/errorMessages";
import tooltipMessages from "../../Helper/Constants/tooltipMessages";
import { ChartContainer } from "../../Helper/chartContainerHelper";
import {
  dashboardKPIData,
  dashboardChartsData,
  supplierPerformanceData,
} from "./Data/DashboardData";
import { OverlayTrigger, Popover, ListGroup } from "react-bootstrap";
import { getRiskColor } from "../../Helper/Constants/riskBtnColor";

//CSS
import "./Dashboard.css";
//ICONS
import { MdSavings } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { FaBoxes } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { getStatusColor } from "../../Helper/Constants/statusBtnColor";

const Dashboard = () => {
  // STATES

  // Popover state for KPI details
  const [activePopover, setActivePopover] = useState(null);
  const handleToggle = (id) => {
    setActivePopover(activePopover === id ? null : id);
  };
  const [kpiData, setKpiData] = useState(dashboardKPIData);

  const [categoryReportChart, setCategoryReportChart] = useState(
    dashboardChartsData.categReportsData
  );

  // spend vs saving
  const [spendsChartData, setSpendsChartData] = useState(
    dashboardChartsData.spendAndSavingData.spendData
  );
  const [savingsChartData, setSavingsChartData] = useState(
    dashboardChartsData.spendAndSavingData.savingsData
  );
  const [spendCompanies, setSpendCompanies] = useState(
    Object.keys(dashboardChartsData.spendAndSavingData.spendData)
  );
  const [selectedSpendCompany, setSelectedSpendCompany] = useState(
    Object.keys(dashboardChartsData.spendAndSavingData.spendData)[0]
  );

  // Supplier Risk
  const [supplierRiskChartsData, setSupplierRiskChartsData] = useState(
    dashboardChartsData.supplierRiskData
  );
  const [supplierRiskCountries, setSupplierRiskCountries] = useState(
    dashboardChartsData.supplierRiskData.map((item) => item.country)
  );
  const [selectedSupplierRiskCountry, setSelectedSupplierRiskCountry] =
    useState(0);

  // Help Query Stats Chart
  const [helpChart, setHelpChart] = useState(dashboardChartsData.helpChartData);

  // State for managing KPI loading
  const [isLoading, setIsLoading] = useState(true);

  // // function for fetching the Kpi Data
  // const fetchKpiData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${apiUrls.urlPrefix}/dashboard-kpis`,
  //       requestHeader.json
  //     );
  //     if (response.data) {
  //       setKpiData(response.data.result);
  //       setIsKpiLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsKpiLoading(false);
  //     // toast.error(toastMessages.errorMsgApi);
  //   }
  // };

  // // function for fetching the charts Data
  // const fetchChartsData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${apiUrls.urlPrefix}/dashboard-charts`,
  //       requestHeader.json
  //     );
  //     if (response?.data) {
  //       // setChartsData(response?.data?.result);
  //       setHelpChart(response?.data?.result?.help_chart);
  //       setCategoryReportChart(
  //         response?.data?.result?.categ_reports_chart_data
  //       );
  //       setSpendsChartData(response?.data?.result?.spends_chart_data);
  //       setSelectedCompany(response?.data?.result?.spend_companies[0]);
  //       setSpendCompanies(response?.data?.result?.spend_companies);
  //       setSavingsChartData(response?.data?.result?.savings_chart_data);
  //       setSupplierRiskCountries(
  //         response?.data?.result?.supplier_risk_countries
  //       );
  //     } else {
  //       console.log(errorMessages?.responseFromApi);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // toast.error(toastMessages.errorMsgApi);
  //   }
  // };

  // useEffect(() => {
  //   fetchKpiData();
  //   fetchChartsData();
  // }, []);

  // KPI DATA - Generating list for the Kpi cards with the content to show
  const kpiDataList = [
    {
      title: "Spend Analytics",
      icon: <GiPayMoney className="dash-kpi-icon" size={24} />,
      tooltipMsg: tooltipMessages.spendKpi,
      num:
        formatCompactNumber(kpiData?.spend_analysis?.totalSpendAmount) || "N/A",
      num_title: "Total Spend",
      details: [
        {
          label: "Total Entities",
          value:
            formatCompactNumber(kpiData?.spend_analysis?.companyCount) || "N/A",
        },
        {
          label: "Total Transactions",
          value:
            formatCompactNumber(kpiData?.spend_analysis?.totalTransactions) ||
            "N/A",
        },
        {
          label: "Serving Countries",
          value:
            formatCompactNumber(kpiData?.spend_analysis?.countryCount) || "N/A",
        },

        {
          label: "L4 Category",
          value: formatCompactNumber(kpiData?.spend_analysis?.l4Count) || "N/A",
        },
      ],
      duration:
        (formatDate2(kpiData?.spend_analysis?.postingDateRange[1]) || "N/A") +
        " - " +
        (formatDate2(kpiData?.spend_analysis?.postingDateRange[0]) || "N/A"),
    },
    {
      title: "Saving Analytics",
      tooltipMsg: tooltipMessages.savingKpi,
      icon: <MdSavings className="dash-kpi-icon" size={24} />,
      num_title: "Total Saving",

      num: formatCompactNumber(kpiData?.saving_analysis?.totalSavings) || "N/A",
      details: [
        {
          label: "Total Entities",
          value:
            formatCompactNumber(kpiData?.spend_analysis?.totalEntries) || "N/A",
        },
        {
          label: "Price Variance",
          value:
            formatCompactNumber(kpiData?.saving_analysis?.price_Varience_YTD) ||
            "N/A",
        },
        {
          label: "Regions",
          value:
            formatCompactNumber(kpiData?.saving_analysis?.savingRegions) ||
            "N/A",
        },
        {
          label: "Suppliers",
          value:
            formatCompactNumber(
              kpiData?.saving_analysis?.action_tracker.actionSupplier
            ) || "N/A",
        },
        {
          label: "Action Number",
          value:
            formatCompactNumber(
              kpiData?.saving_analysis?.action_tracker.actionNumber
            ) || "N/A",
        },
        {
          label: "Action Savings",
          value:
            formatCompactNumber(
              kpiData?.saving_analysis?.action_tracker.actionSaving
            ) || "N/A",
        },
      ],
      duration:
        (formatDate2(kpiData?.spend_analysis?.postingDateRange[1]) || "N/A") +
        " - " +
        (formatDate2(kpiData?.spend_analysis?.postingDateRange[0]) || "N/A"),
    },
    {
      title: "Supplier Performance",
      tooltipMsg: tooltipMessages.supplierKpi,
      icon: <FaShippingFast className="dash-kpi-icon" size={24} />,
      num_title: "Total Suppliers",

      num:
        formatCompactNumber(kpiData?.supplier_risk.totalSupplierCount) || "N/A",
      details: [
        {
          label: "Total Suppliers",
          value:
            formatCompactNumber(kpiData?.supplier_risk?.totalSupplierCount) ||
            "N/A",
        },
        {
          label: "Total Spends",
          value:
            formatCompactNumber(kpiData?.supplier_risk?.totalSpends) || "N/A",
        },
        {
          label: "Total Revenue",
          value:
            formatCompactNumber(kpiData?.supplier_risk?.totalRevenue) || "N/A",
        },
        {
          label: "On-Time Delivery Rate",
          value: "92.3%",
        },
        {
          label: "High Risk",
          value:
            formatCompactNumber(
              kpiData?.supplier_risk?.overall_risk.OverallRiskHighCount
            ) || "N/A",
        },
        {
          label: "Medium Risk",
          value:
            formatCompactNumber(
              kpiData?.supplier_risk?.overall_risk.OverallRiskMidCount
            ) || "N/A",
        },
        {
          label: "Low Risk",
          value:
            formatCompactNumber(
              kpiData?.supplier_risk?.overall_risk.OverallRiskLowCount
            ) || "N/A",
        },
      ],
      duration:
        (formatDate2(kpiData?.supplier_risk?.dateRange[1]) || "N/A") +
        " - " +
        (formatDate2(kpiData?.supplier_risk?.dateRange[0]) || "N/A"),
    },
    {
      title: "Category",
      sub_title: "Flat Steel",
      tooltipMsg: tooltipMessages.sourcingKpi,
      icon: <TbCategoryFilled className="dash-kpi-icon" size={24} />,
      num_title: "Market Size",

      num: kpiData?.category_intelligence?.market_size || "N/A",
      details: [
        {
          label: "Total Categories",
          value:
            formatCompactNumber(
              kpiData?.category_intelligence.total_categories
            ) || "N/A",
        },
        {
          label: "Current Price",
          value:
            formatCompactNumber(
              kpiData?.category_intelligence.current_price
            ) || "N/A",
        },
        {
          label: "Market Size",
          value:
            
              kpiData?.category_intelligence.market_size
             || "N/A",
        },
        {
          label: "Global Production",
          value:
              kpiData?.category_intelligence.global_production
            || "N/A",
        },
        {
          label: "Global Consumption",
          value:
              kpiData?.category_intelligence.global_consumption
            || "N/A",
        },
      ],
      duration:
        (formatDate2(kpiData?.supplier_risk?.dateRange[1]) || "N/A") +
        " - " +
        (formatDate2(kpiData?.supplier_risk?.dateRange[0]) || "N/A"),
    },
    {
      title: "Commodity",
      sub_title: "Flat Steel",
      tooltipMsg: tooltipMessages.sourcingKpi,
      icon: <FaBoxes className="dash-kpi-icon" size={24} />,
      num_title: "Current Price*",

      num: formatCompactNumber(54100) || "N/A",
      unit: "/Tonne",
      details: [
        {
          label: "Tracked Commodities",
          value:
            formatCompactNumber(
              kpiData?.commodity_intelligence.tracked_commodities
            ) || "N/A",
        },
        {
          label: "High-Risk Commodities",
          value:
            formatCompactNumber(
              kpiData?.commodity_intelligence.high_risk_commodities
            ) || "N/A",
        },
        {
          label: "Price Volatility Index",
          value:
            formatCompactNumber(
              kpiData?.commodity_intelligence.price_volatility_index
            ) || "N/A",
        },
      ],
      duration:
        (formatDate2(kpiData?.supplier_risk?.dateRange[1]) || "N/A") +
        " - " +
        (formatDate2(kpiData?.supplier_risk?.dateRange[0]) || "N/A"),
    },
  ];

  // #################### CHART DATA ####################
  // Spend Section Chart
  const [spendInsights, setSpendInsights] = useState({
    series: [
      {
        data: [1380, 1200, 1100, 690, 580, 540, 470, 448, 430, 400],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "center",
          },
        },
      },
      colors: ["#0d9dadda", "#127985"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"],
          fontSize: "12px",
          fontWeight: "bold",
        },
        formatter: function (val) {
          return val + " $";
        },
        dropShadow: {
          enabled: true,
        },
        offsetX: 0,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [
          "Synthetics belts",
          "POM",
          "Standard woven fabrics",
          "Thermoplastic (TPU)",
          "Positive drive belts",
          "Other",
          "Flat belts",
          "PA66",
          "Powder",
          "Not specified (PNL)",
        ],
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontSize: "10px",
          },
        },
      },
      legend: {
        show: false, // This will hide the legend
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " $";
          },
          title: {
            formatter: function () {
              return "Spend";
            },
          },
        },
      },
    },
  });

  // Saving Section Chart - actual vs targeted savings
  const [savingInsights, setSavingInsights] = useState({
    series: [
      {
        name: "Actual Savings",
        type: "column",
        data: [
          40.0, 37.5, 46.0, 42.0, 44.5, 50.0, 47.0, 53.0, 64.0, 62.5, 62.0,
          60.0,
        ], // in $ millions
        color: "#0ba9bbff",
      },
      {
        name: "Forecasted Savings",
        type: "line",
        data: [
          42.0, 38.0, 44.0, 45.0, 47.0, 52.0, 50.0, 55.0, 60.0, 58.0, 65.0,
          62.0,
        ], // in $ millions
        color: "#ff9b3dff",
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      stroke: {
        width: [0, 2], // Column (0) vs. Line (2)
        curve: "smooth",
        dashArray: [0, 3], // Solid column, dashed line
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 5,
        colors: ["#0ba9bbff", "#ff9b3dff"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
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
        ],
        labels: {
          style: {
            fontSize: "10px",
          },
        },
      },
      yaxis: [
        {
          title: {
            text: "Actual Savings ($M)",
          },
          min: 35,
          max: 70,
          tickAmount: 7,
          labels: {
            formatter: (value) => `$${value.toFixed(0)}`,
          },
        },
        {
          opposite: true,
          title: {
            text: "Forecasted Savings ($M)",
          },
          min: 35,
          max: 70,
          tickAmount: 7,
          labels: {
            formatter: (value) => `$${value.toFixed(0)}`,
          },
        },
      ],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value) => `$${value.toFixed(1)}M`,
        },
      },
    },
  });

  // Supplier Insights Chart
  const [supplierInsights, setSupplierInsights] = useState({
    series: [
      {
        name: "Reliable Materials Inc.",
        data: [45, 38, 70, 95, 90],
      },
      {
        name: "Global Parts Co.",
        data: [80, 92, 65, 72, 52],
      },
      {
        name: "Precision Suppliers Ltd.",
        data: [92, 85, 92, 40, 95],
      },
    ],
    options: {
      colors: ["#3B82F6", "#10B981", "#F59E0B"], // Blue, Emerald, Amber
      stroke: {
        width: 2,
        curve: "smooth",
      },
      fill: {
        opacity: 0.15,
      },
      markers: {
        size: 5,
        hover: {
          size: 10,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: function (val) {
            return val + "%";
          },
          style: {
            fontSize: "10px",
          },
        },
      },
      xaxis: {
        categories: ["Delivery", "Quality", "Efficiency", "Time", "Support"],
        labels: {
          style: {
            fontSize: "10px",
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "% score";
          },
          title: {
            formatter: function (seriesName) {
              return seriesName;
            },
          },
        },
      },
      legend: {
        position: "right",
        fontSize: "10px",
      },
    },
  });

  // CATEGORY REPORT CHART
  const categoryReportOptions = {
    chart: {
      type: "donut",
    },
    labels: categoryReportChart.options || [1, 2, 3, 4],
    colors: [
      "#227c9e",
      "var(--color-main)",
      "#ffc857",
      "#f97061",
      "#8cbf9e",
      "var(--color-main-light)",
    ],
    plotOptions: {
      donut: {
        // Donut specific options
        size: "70%", // Adjust the size of the donut hole
        labels: {
          show: true, // Show labels inside the donut
          total: {
            show: true, // Show total in the center
            label: "Total",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true, // You might want to enable this for donut charts
      style: {
        fontWeight: 200,
      },
    },
    legend: {
      position: "right",
    },
    tooltip: {
      y: {
        formatter: (val) => `${formatCompactNumber(val)}`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const categoryReportSeries = categoryReportChart.series || [];

  // Spend vs Saving Chart
  const spendSavingChartSeries = [
    {
      name: "Spend",
      data: spendsChartData[selectedSpendCompany] || [0, 0],
    },
    {
      name: "Saving",
      data: savingsChartData[selectedSpendCompany] || [0, 0],
    },
  ];

  const spendSavingChartOptions = {
    chart: {
      type: "bar",
      height: "100%",
    },
    colors: ["var(--color-main)", "var(--color-main-light)"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20px",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["2021", "2022"],
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      y: {
        formatter: (val) => `$${val} M`, // Tooltip shows $X.XM format
        title: {
          formatter: (seriesName) => `${seriesName}:`, // "Actual Savings: $XXM"
        },
      },
    },
  };

  // Set Loading Status based on data availability
  useEffect(() => {
    const allChartsPresent =
      kpiData &&
      categoryReportChart &&
      spendsChartData &&
      savingsChartData &&
      spendCompanies &&
      spendCompanies.length > 0 &&
      supplierRiskChartsData &&
      supplierRiskCountries &&
      supplierRiskCountries.length > 0 &&
      helpChart;
    if (allChartsPresent) {
      setIsLoading(false);
    }
  }, [
    kpiData,
    categoryReportChart,
    spendsChartData,
    savingsChartData,
    spendCompanies,
    supplierRiskChartsData,
    supplierRiskCountries,
    helpChart,
  ]);

  return (
    <>
      {/* {JSON.stringify(kpiData)} */}
      {isLoading && <Loading />}
      {/* *****************KPI version 1***************** */}
      {/* <div className="global-kpi-container mt-1 px-0">
        {kpiDataList.map((kpi, index) => (
          <div
            className="global-kpi-box align-items-center "
            style={{ height: "12vh", cursor: "pointer" }}
            key={index}
          >
            <div
              className="d-flex justify-content-between "
              style={{ width: "100%", height: "100%" }}
            >
              <div className=" ">
                <div className="d-flex align-items-center">
                  <div>{kpi.icon}</div>
                  <p className="global-kpi-name ps-0 ms-1">{kpi.title}</p>
                </div>
                <p
                  className="global-kpi-num"
                  style={{ fontSize: "20px", fontWeight: "620" }}
                >
                  {kpi.num}
                </p>
                <p className="kpi-date mt-2 pt-1">{kpi.duration}</p>
              </div>

              <div>
                <ul className="kpi-list">
                  {kpi.details.map((detail, idx) => (
                    <li className="kpi-list-item" key={idx}>
                      {detail.label}: {detail.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* *****************KPI version 3*****************  */}
      <div
        className="global-kpi-container mt-1 px-0 d-flex flex-wrap"
        style={{ gap: "4px" }}
      >
        {kpiDataList.map((kpi, index) => (
          <OverlayTrigger
            trigger="click"
            placement={index === 0 ? "right" : "left"} // First card: right, others: left
            flip={false} // Prevents auto-flipping if space is insufficient
            overlay={
              <Popover
                id={`popover-${index}`}
                style={{
                  boxShadow:
                    "0 4px 24px 0 rgba(0, 0, 0, 0.16), 0 1.5px 6px 0 rgba(0, 0, 0, 0.23)",
                  borderRadius: "10px",
                  border: "none",
                  minWidth: "260px",
                  ...(Popover?.defaultProps?.style || {}),
                }}
              >
                {/* Popover content remains the same */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 10px",
                  }}
                >
                  <p className="head-theme">
                    {kpi.title} Details{" "}
                    {kpi.sub_title && (
                      <span
                        className="ms-1 global-font-sm"
                        style={{ color: "#6c757d" }}
                      >
                        ({kpi.sub_title})
                      </span>
                    )}
                  </p>
                  <IoMdClose
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#888",
                      marginLeft: "30px",
                    }}
                    onClick={() => setActivePopover(null)}
                    aria-label="Close"
                  />
                </div>
                <ListGroup>
                  {kpi.details.map((detail) => (
                    <ListGroup.Item key={detail.label}>
                      <div className="d-flex justify-content-between global-font">
                        <span>{detail.label}:</span>
                        <strong
                          style={{
                            color: "var(--color-main)",
                            marginLeft: "10px",
                          }}
                        >
                          {detail.value}
                        </strong>
                      </div>
                    </ListGroup.Item>
                  ))}
                  {kpi.duration && (
                    <ListGroup.Item>
                      <div className="d-flex justify-content-between global-font align-items-center">
                        <span>Duration:</span>
                        <span
                          className="ms-2"
                          style={{
                            color: "var(--color-main)",
                            fontSize: "11px",
                          }}
                        >
                          {kpi.duration}
                        </span>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Popover>
            }
            key={index}
            show={activePopover === index}
            onToggle={() => handleToggle(index)}
          >
            <div
              className="global-kpi-box"
              style={{
                height: "auto",
                minHeight: "7vh",
                cursor: "pointer",
                padding: "8px 12px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                flex: "1 1 auto",
                minWidth: "200px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <div
                  className="d-flex flex-column"
                  style={{
                    width: "calc(100% - 40px)",
                    overflow: "hidden",
                    minWidth: 0,
                  }}
                >
                  <p
                    className="global-kpi-name mb-0 p-0 text-truncate"
                    style={{
                      fontSize: "12px",
                      lineHeight: "1.2",
                      color: "#333",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {kpi.title}
                    {kpi.sub_title && (
                      <span
                        className="ms-1 global-font-sm"
                        style={{ color: "#6c757d" }}
                      >
                        ({kpi.sub_title})
                      </span>
                    )}
                  </p>
                  <p
                    className="global-kpi-num mb-0 text-truncate"
                    style={{
                      fontSize: "22px",
                      fontWeight: "630",
                      lineHeight: "1.2",
                      color: "var(--color-main)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {kpi.num}
                    {kpi.unit && (
                      <span
                        className="global-font"
                        style={{ color: "var(--color-main)" }}
                      >
                        {kpi.unit}
                      </span>
                    )}
                    <span
                      className="ms-1 global-font-sm"
                      style={{ color: "#6c757d" }}
                    >
                      {kpi.num_title}
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    minWidth: "40px",
                    flexShrink: 0,
                    color: "var(--color-main)",
                  }}
                >
                  {kpi.icon}
                </div>
              </div>
            </div>
          </OverlayTrigger>
        ))}
      </div>

      {/* MAIN DASHBOARD - CARDS */}
      <div className="dashboard">
        <div className="dashboard-left">
          {" "}
          {/* ROW-1 */}
          {/* Charts with fixed containers */}
          <div className="row g-2 pt-1">
            {/* Saving Insights */}
            <div className="col-12 col-md-6">
              <div className="global-cards2 h-100 p-2 d-flex flex-column">
                <p className="head-theme text-start m-2">
                  Actual vs Targeted Savings
                </p>
                <ChartContainer minHeight={250}>
                  <ReactApexChart
                    options={savingInsights.options}
                    series={savingInsights.series}
                    type="line"
                    width="100%"
                    height={250}
                  />
                </ChartContainer>
              </div>
            </div>

            {/* Spend Insights */}
            <div className="col-12 col-md-6">
              <div className="global-cards2 h-100 p-2 d-flex flex-column">
                <p className="head-theme text-start m-2">
                  Top Categories With Vendor Spend
                </p>
                <ChartContainer minHeight={250}>
                  <ReactApexChart
                    options={spendInsights.options}
                    series={spendInsights.series}
                    type="bar"
                    width="100%"
                    height={250}
                  />
                </ChartContainer>
              </div>
            </div>
          </div>
          {/* ROW-2 */}
          {/* Charts with fixed containers */}
          <div className="row g-2 pt-2">
            {/* CATEGORY REPORTS CHART*/}

            <div className="col-12 col-md-4">
              <div
                className="global-cards2 h-100 p-2 d-flex flex-column"
                style={{ minHeight: "270px", position: "relative" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <p className="head-theme text-start m-2">Spend vs Saving</p>
                  <div style={{ width: "150px" }}>
                    <select
                      className="form-select"
                      aria-label="Select Company"
                      value={selectedSpendCompany || ""}
                      onChange={(e) => setSelectedSpendCompany(e.target.value)}
                      style={{
                        fontSize: "12px", // Small font size
                        padding: "5px", // Adjust padding for smaller size
                        height: "30px", // Adjust height
                      }}
                    >
                      {spendCompanies.map((company, index) => (
                        <option key={index} value={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex-grow-1" style={{ position: "relative" }}>
                  {spendsChartData && (
                    // <ChartContainer minHeight={240}>
                    <ReactApexChart
                      options={spendSavingChartOptions}
                      series={spendSavingChartSeries}
                      type="bar"
                      height={240}
                      width="100%"
                    />
                    // </ChartContainer>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-md-4">
              <div className="global-cards2 h-100 p-2 d-flex flex-column">
                <p className="head-theme text-start m-2">Category Reports</p>
                <ChartContainer minHeight={250}>
                  <ReactApexChart
                    options={categoryReportOptions}
                    series={categoryReportSeries}
                    type="donut"
                    height={250}
                  />
                </ChartContainer>
              </div>
            </div> */}

            {/* Supplier Comparison */}
            <div className="col-12 col-md-8">
              <div className="global-cards2 h-100 p-2 d-flex flex-column">
                <p className="head-theme text-start m-2">Supplier Comparison</p>
                <div className="">
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "265px", overflowY: "auto" }}
                  >
                    <table className="table table-bordered table-sm m-0">
                      <thead className="table-light">
                        <tr>
                          <th
                            className="p-1 text-start defaultStyleHead"
                            style={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "#fff",
                              zIndex: 2,
                            }}
                          >
                            Supplier
                          </th>
                          <th
                            className="p-1 text-start defaultStyleHead"
                            style={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "#fff",
                              zIndex: 2,
                            }}
                          >
                            Annual Spend
                          </th>
                          <th
                            className="p-1 text-start defaultStyleHead"
                            style={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "#fff",
                              zIndex: 2,
                            }}
                          >
                            Savings
                          </th>
                          <th
                            className="p-1 text-start defaultStyleHead"
                            style={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "#fff",
                              zIndex: 2,
                            }}
                          >
                            Performance
                          </th>
                          <th
                            className="p-1 text-start defaultStyleHead"
                            style={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "#fff",
                              zIndex: 2,
                            }}
                          >
                            Risk Level
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierPerformanceData.map((data, index) => (
                          <tr key={index}>
                            <td className="p-1 defaultStyles px-2">
                              {data.supplier}
                            </td>
                            <td className="p-1 defaultStyles px-2">
                              $ {formatCompactNumber(data.spend)}
                            </td>
                            <td
                              className="p-1 defaultStyles px-2"
                              style={{ color: "#05af4fff" }}
                            >
                              $ {formatCompactNumber(data.savings)}
                            </td>
                            <td className="p-1 defaultStyles px-2">
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  className="progress flex-grow-1"
                                  role="progressbar"
                                  style={{ height: "5px" }}
                                >
                                  <div
                                    className="progress-bar"
                                    style={{ width: data.performance, backgroundColor:"#30abb9" }}
                                  ></div>
                                </div>
                                <span>{data.performance}%</span>
                              </div>
                            </td>
                            <td className="p-1 defaultStyles px-2">
                              <span
                                style={{
                                  background: getRiskColor(data.risk) + "20",
                                  border: "1px solid" + getRiskColor(data.risk),
                                  color: getRiskColor(data.risk),
                                  padding: "2px 4px",
                                  fontWeight: 600,
                                  borderRadius: "5px",
                                  fontSize: "10px",
                                }}
                              >
                                {data.risk || "N/A"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-right">
          {/* Critical Alerts */}
          <div className="">
            <div className="critical-alerts-container">
              <div className="global-cards2 h-100 p-3 d-flex flex-column">
                <p className="head-theme text-start mb-2">Critical Alerts</p>

                <div className="alert-item position-relative ps-3 text-start">
                  <div className="critical-alert-bar mb-1"></div>
                  <h6 className="alert-title mb-1 global-font">Savings Gap</h6>
                  <p className="alert-detail mb-1 global-font">
                    $177.4M shortfall vs target, urgent action needed.
                  </p>
                </div>

                <div className="alert-item mt-2 position-relative ps-3 text-start">
                  <div
                    className="critical-alert-bar mb-1"
                    style={{ backgroundColor: "#ffc857" }}
                  ></div>
                  <h6
                    className="alert-title mb-1 global-font"
                    style={{ color: "#e6af43ff" }}
                  >
                    Underperforming Initiatives
                  </h6>
                  <p className="alert-detail mb-1 global-font">
                    IL1–IL5 below expected savings; IL4 & IL5 minimal.
                  </p>
                </div>

                <div className="alert-item mt-2 position-relative ps-3 text-start">
                  <div
                    className="critical-alert-bar mb-1"
                    style={{ backgroundColor: "#22c55e" }}
                  ></div>
                  <h6
                    className="alert-title mb-1 global-font"
                    style={{ color: "#22c55e" }}
                  >
                    Category & Supplier Gaps
                  </h6>
                  <p className="alert-detail mb-1 global-font">
                    No major savings from top categories or suppliers.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div className=" mt-2 ">
              <div className="global-cards2 p-3 h-100 d-flex flex-column">
                <p className="head-theme text-start mb-1">
                  Strategic Recommendations
                </p>

                <div className="alert-item mt-2 position-relative ps-3 text-start">
                  <div
                    className="critical-alert-bar mb-1"
                    style={{ backgroundColor: "#22c55e" }}
                  ></div>
                  <h6
                    className="alert-title mb-1 global-font"
                    style={{ color: "#22c55e" }}
                  >
                    Focus on High-Yield Levers
                  </h6>
                  <p className="alert-detail mb-1 global-font">
                    Scale IL3 & IL2 for stronger savings impact.
                  </p>
                </div>

                <div className="alert-item mt-2 position-relative ps-3 text-start">
                  <div
                    className="critical-alert-bar mb-1"
                    style={{ backgroundColor: "#a855f7" }}
                  ></div>
                  <h6
                    className="alert-title mb-1 global-font"
                    style={{ color: "#a855f7ff" }}
                  >
                    Category Deep Dive
                  </h6>
                  <p className="alert-detail mb-1 global-font">
                    Target price variance and quantity optimization.
                  </p>
                </div>
                <div className="alert-item mt-2 position-relative ps-3 text-start">
                  <div
                    className="critical-alert-bar mb-1"
                    style={{ backgroundColor: "#6366f1" }}
                  ></div>
                  <h6
                    className="alert-title mb-1 global-font"
                    style={{ color: "#6366f1ff" }}
                  >
                    Supplier Engagement
                  </h6>
                  <p className="alert-detail mb-1 global-font">
                    Launch supplier programs for cost efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*Supplier Risk */}

          <div className="mt-2">
            <div className="global-cards2 h-100 p-2 d-flex flex-column ">
              <div className="">
                <div className="d-flex justify-content-between mb-3">
                  <p className="head-theme text-start ">Supplier Risk</p>
                  <div style={{ width: "120px" }}>
                    <select
                      className="form-select"
                      aria-label="Select Location"
                      value={selectedSupplierRiskCountry || ""}
                      onChange={(e) =>
                        setSelectedSupplierRiskCountry(e.target.value)
                      } // Fix here
                      style={{
                        fontSize: "12px",
                        padding: "5px",
                        height: "30px",
                      }}
                    >
                      {supplierRiskCountries.map((country, index) => (
                        <option key={index} value={index}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <MultiColorProgressBar
                  values={[
                    supplierRiskChartsData[selectedSupplierRiskCountry]
                      ?.lowspend,
                    supplierRiskChartsData[selectedSupplierRiskCountry]
                      ?.midspend,
                    supplierRiskChartsData[selectedSupplierRiskCountry]
                      ?.highspend,
                  ]}
                  labels={["Low", "Medium", "High"]}
                  colors={["#227c9e", "#ffc857", "#f97061"]}
                />
              </div>
            </div>
          </div>

          {/* Help Query Stats */}
          <div className=" mt-2 ">
            <div className="global-cards2 p-2 h-100 d-flex flex-column">
              <div className="d-flex justify-content-between mb-3">
                <p className="head-theme text-start">Help Query Stats</p>
                <p
                  className="text-end m-0"
                  style={{
                    color: "var(--color-num)",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  {helpChart?.totalStatus}
                  <span
                    style={{
                      fontSize: "10px",
                      color: "grey",
                      marginLeft: "5px",
                    }}
                  >
                    Total Tickets
                  </span>
                </p>
              </div>
              <div>
                <MultiColorProgressBar
                  values={[
                    helpChart?.pendingCount,
                    helpChart?.progressCount,
                    helpChart?.successCount,
                  ]}
                  labels={["Pending", "In Progress", "Completed"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
