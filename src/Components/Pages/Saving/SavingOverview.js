import React, { useState, useEffect, useMemo } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import {
  Row,
  Col,
  ListGroup,
  Table,
  Tooltip,
  Button,
  Card,
} from "react-bootstrap";
import Chart from "react-apexcharts";
import Loading from "../../Helper/Loading2";
import { formatCompactNumber } from "../../../Config/formatCompactNumber";
import { requestHeader } from "../../Helper/Constants/constant";
import axios from "axios";
import apiUrls from "../../../Config/apiUrls";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip as Tool,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./css/SavingData.css";
import countriesData from "../../Helper/Constants/countries.json";

const SavingOverview = () => {
  // Individual loading states for each chart
  const [loadingSourcing, setLoadingSourcing] = useState(true);
  const [loadingBU, setLoadingBU] = useState(true);
  const [loadingWaterfall, setLoadingWaterfall] = useState(true);
  const [loadingMonth, setLoadingMonth] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingTopSupplier, setLoadingTopSupplier] = useState(true);
  const [loadingMap, setLoadingMap] = useState(true);
  const [savingKpi, setSavingKpi] = useState([]);
  const [spendSavingShareName, setSpendSavingShareName] = useState([]);
  const [spendSavingShareData, setSpendSavingShareData] = useState([0, 0]);

  const [waterfall, setwaterfall] = useState([]);

  const [savingByMonthData, setSavingByMonthData] = useState([
    {
      name: "Saving",
      data: [],
    },
  ]);
  const [savings, setSavings] = useState([]);
  const [reductions, setReductions] = useState([]);
  const [savingsLabels, setSavingsLabels] = useState([]);
  const [reductionsLabels, setReductionsLabels] = useState([]);
  const [savingBUName, setSavingBUName] = useState([]);
  const [savingBUData, setSavingBUData] = useState([
    { name: "Saving", data: [] },
  ]);
  const [savingBySupplierData, setsavingBySupplierData] = useState([
    { name: "Saving", data: [] },
  ]);
  const [table, setTable] = useState([]);
  const [topSup, setTopSup] = useState([]);

  const [itemByCategory, setItemByCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);

  const [activePopover, setActivePopover] = useState(null);

  const handleToggle = (id) => {
    setActivePopover(activePopover === id ? null : id); // Toggle visibility
  };

  const [countryData, setCountryData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(2);

  const [costSaving, setCostSaving] = useState([{ name: "Saving", data: [] }]);
  const [costReduction, setCostReduction] = useState([
    { name: "Reduction", data: [] },
  ]);
  const [costRoi, setCostRoi] = useState([{ name: "ROI", data: [] }]);
  const [costAvoid, setCostAvoid] = useState([{ name: "Avoidance", data: [] }]);

  //dataload spend kpi
  const getSavingKpi = async () => {
    await axios
      .get(`${apiUrls.urlPrefix}/new-saving-kpi`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSavingKpi(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      });
  };

  const getSavingByMonth = async () => {
    setLoadingMonth(true);
    await axios
      .get(`${apiUrls.urlPrefix}/saving-by-month`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSavingByMonthData([
          {
            name: "Actual Saving",
            type: "column",
            data: data,
          },
          {
            name: "Targeted Saving",
            type: "line",
            data: [
              { x: "Jan", y: 3097528.4833346694 },
              { x: "Feb", y: 4048321.7054628323 },
              { x: "Mar", y: 4075085.235984173 },
              { x: "Apr", y: 4588041.8511194657 },
              { x: "May", y: 1405608.666510129 },
              { x: "Jun", y: 2224225.8283986733 },
              { x: "July", y: 2628293.3895020634 },
              { x: "Aug", y: 18408955.618833095 },
              { x: "Sept", y: 11563760.27606404 },
              { x: "Oct", y: 3426511.560461891 },
              { x: "Nov", y: 4209429.190337357 },
              { x: "Dec", y: 2009429.190337357 },
            ],
          },
        ]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingMonth(false));
  };

  const getSavingReduction = async () => {
    await axios
      .get(`${apiUrls.urlPrefix}/saving-reduction`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSavingsLabels(data?.saving[0]);
        setSavings(data?.saving[1]);
        setReductionsLabels(data?.saving[0]);
        setReductions(data?.saving[1]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      });
  };

  const getSavingBySourcing = async () => {
    setLoadingSourcing(true);
    await axios
      .get(`${apiUrls.urlPrefix}/saving-by-sourcing`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSpendSavingShareName(data?.name);
        setSpendSavingShareData([27300587.163916405, 15300587.163916405]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingSourcing(false));
  };

  const getSavingByCategory = async () => {
    setLoadingCategory(true);
    await axios
      .get(`${apiUrls.urlPrefix}/saving-by-category`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setItemByCategory(data);
        let a = [];
        data.forEach((x, i) => {
          if (i === 0) {
            setActiveItems(x.items);
            setActiveCategory(x.category);
          }
          a.push(x.category);
        });
        setCategoryList(a);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingCategory(false));
  };

  const getSavingByBU = async () => {
    setLoadingBU(true);
    await axios
      .get(`${apiUrls.urlPrefix}/saving-by-bu`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSavingBUName(data?.name);
        setSavingBUData([{ name: "Saving", data: data?.save }]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingBU(false));
  };

  const getTopSupplierWithCategory = async () => {
    setLoadingTopSupplier(true);
    await axios
      .get(
        `${apiUrls.urlPrefix}/saving-category-with-supplier`,
        requestHeader.json
      )
      .then((response) => {
        const data = response.data.result;
        setTable(data);
        const allTopSuppliers = data.flatMap(
          (category) => category.topSuppliers
        );
        const top5SuppliersOverall = allTopSuppliers
          .sort((a, b) => b.TotalSaving - a.TotalSaving)
          .slice(0, 5);
        setTopSup(top5SuppliersOverall);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingTopSupplier(false));
  };

  const getMapChart = async () => {
    await axios
      .get(`${apiUrls.urlPrefix}/saving-map`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setCountryData(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      });
  };

  const getCostChart = async () => {
    await axios
      .get(`${apiUrls.urlPrefix}/saving-cost-chart`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setCostSaving([{ name: "Saving", data: data.saving }]);
        setCostReduction([{ name: "Reduction", data: data.reduction }]);
        setCostRoi([{ name: "ROI", data: data.roi }]);
        setCostAvoid([{ name: "Avoidance", data: data.avoidance }]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      });
  };

  const getWaterFall = async () => {
    setLoadingWaterfall(true);
    await axios
      .get(`${apiUrls.urlPrefix}/saving-tracker-chart-data`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        let arr = [],
          total = 0;
        data.IL.forEach((x, i) => {
          if (i > 0 && i < 6) {
            arr.push({ label: x, y: data.savings[i], color: "#38858e" });
            total = total + data.savings[i];
          }
        });
        arr.push({
          label: "Total",
          y: total,
          isCumulativeSum: true,
          indexLabel: "{y}",
          color: "#8cbf9e",
        });
        arr.push({
          label: "Gap",
          y: data.target / 4 - total,
          color: "#f97061",
        });

        arr.push({
          label: "Target",
          y: -(data.target / 4),
          color: "#b9b9b9",
        });

        setwaterfall(arr);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingWaterfall(false));
  };

  useEffect(() => {
    getSavingKpi();
    getSavingBySourcing();
    getSavingByMonth();
    getSavingReduction();
    getSavingByCategory();
    getSavingByBU();
    getTopSupplierWithCategory();
    getMapChart();
    getCostChart();
    getWaterFall();
  }, []);

  // spend saving share chart
  const spendSavingShareChart = {
    chart: {
      type: "pie",
    },
    colors: [
      "#227c9e",
      "#8cbf9e",
      "var(--color-main-light)",
      "var(--color-main)",
      "#ffc857",
      "#f97061",
    ],
    labels: spendSavingShareName,
    tooltip: {
      style: {
        fontSize: "10px",
      },
      y: {
        formatter: (val) => {
          // Format the number (e.g., adding commas or currency symbols)
          return `${formatCompactNumber(val)}`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "bottom", // Display legend at the top
      fontSize: "10px", // Set font size here (applies to the entire legend)
    },
    dataLabels: {
      style: {
        colors: ["#2f3a3a"], // Label color
        fontWeight: "normal", // Font weight normal
      },
      dropShadow: {
        enabled: false, // Completely remove text shadow
      },
      position: "outer", // Show labels outside the pie
    },
  };

  //line chart
  const savingByMonthChart = {
    chart: {
      type: "line",
    },

    colors: ["var(--color-main-light)", "var(--color-main)"],
    stroke: {
      width: 4, // Set the stroke width uniformly
    },
    dataLabels: {
      enabled: false, // Disable data labels for cleaner look
      formatter: (val) => formatCompactNumber(val),
    },
    markers: {
      size: 6, // Size of the bullet/circle
      shape: "circle", // Shape of the marker
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      shared: true,
      y: {
        formatter: (value, { seriesIndex }) => {
          return seriesIndex === 0
            ? `${formatCompactNumber(value)}` // Customize for 'Spend' series
            : `${value}`; // Customize for 'Supplier' series
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    tooltip: {
      y: {
        formatter: (val) => `${formatCompactNumber(val)}`,
      },
    },
  };

  const savingByCategory = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "all", // 'all', 'last'
        horizontal: true,
        barHeight: "30%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: activeItems.map((x) => x.item),
      labels: {
        show: true, // Show x-axis labels for better clarity
        formatter: (value) => formatCompactNumber(value), // Format numbers correctly
      },
      min: Math.min(...activeItems.flatMap((x) => x.values)), // Auto-adjust min based on data
      max: Math.max(...activeItems.flatMap((x) => x.values)), // Auto-adjust max based on data
    },
    yaxis: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value) =>
          `${value > 0 ? "+" : ""}${formatCompactNumber(value)}`, // Show + for positive values
      },
    },
    colors: ["var(--color-main-light)", "#FF4560"], // Green for saving, red for reduction
  };

  const savingBySupplier = {
    chart: {
      type: "bar",
    },
    colors: ["var(--color-main)", "var(--color-main-light)"],
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "10px",
        endingShape: "rounded",
        stacked: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: topSup.map((item) => item.vendor),
      labels: {
        show: false, // Hides horizontal axis labels
      },
      axisBorder: {
        show: false, // Optional: hides the X-axis border as well
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Optional: hides grid lines for the X-axis
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${formatCompactNumber(val)}`,
      },
    },
  };

  const savingByBU = {
    chart: {
      type: "bar",
    },
    colors: ["var(--color-main)", "var(--color-main-light)"],
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "10px",
        endingShape: "rounded",
        stacked: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: savingBUName,
      labels: {
        show: false, // Hides horizontal axis labels
      },
      axisBorder: {
        show: false, // Optional: hides the X-axis border as well
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Optional: hides grid lines for the X-axis
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${formatCompactNumber(val)}`,
      },
    },
  };

  const RoiChart = {
    chart: {
      type: "line",
      height: 30,
    },
    colors: ["var(--color-main-light)", "var(--color-main)"],
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: ["2020", "2021", "2022", "2023", "2024"],
    yaxis: {
      show: false,
    },
    // tooltip: {
    //   shared: true, // Show combined tooltip for both series
    //   y: {
    //     formatter: (value, { seriesIndex }) => {
    //       // Customize tooltip format for each series
    //       return seriesIndex === 0
    //         ? `${formatCompactNumber(value)}` // Customize for 'Spend' series
    //         : `${value}`; // Customize for 'Supplier' series
    //     },
    //   },
    // },
    legend: {
      position: "top", // Positions the legend at the top
      horizontalAlign: "center", // Centers the legend horizontally
    },
  };

  const roiData = [
    {
      name: "ROI",
      type: "column",
      data: [100, 90, 102, 85, 95],
    },
    {
      name: "Procurement",
      type: "line",
      data: [80, 85, 90, 100, 90],
    },
  ];

  const savingReductionChart = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: "end", // 'around', 'end'
        borderRadiusWhenStacked: "all", // 'all', 'last'
        horizontal: true,
        barHeight: "30%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: activeItems.map((x) => x.item),
      labels: {
        show: false, // Hide number labels on x-axis
      },
    },
    yaxis: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value) =>
          value < 0
            ? `-${formatCompactNumber(Math.abs(value))}`
            : formatCompactNumber(Math.abs(value)),
      },
    },
    colors: ["var(--color-main-light)", "#FF4560"], // Green for saving, Light color for reduction
  };

  const savingReductionData = [
    {
      name: "Saving",
      data: savings, // Positive values for saving
    },
    {
      name: "Reduction",
      data: reductions.map((x) => -x), // Negative values for reduction
    },
  ];

  //category switch into item chart

  useEffect(() => {
    if (itemByCategory.length === 0) return;
    let index = itemByCategory.findIndex((x) => x.category === activeCategory);
    setActiveItems(itemByCategory[index].items);
  }, [activeCategory]);

  // line chart
  const costLineChart = (color) => ({
    chart: {
      type: "line",
      toolbar: {
        show: false, // Hide toolbar
      },
      animations: {
        enabled: false, // Disable animations for instant rendering
      },
      sparkline: {
        enabled: true, // Removes extra spacing around the chart
      },
    },
    colors: [color], // Dynamic color for lines
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      labels: {
        show: false,
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
        show: false,
      },
    },
    grid: {
      show: false, // Hides the grid to remove spacing
    },
    markers: {
      size: 3,
      colors: [color], // Dynamic marker color
      strokeColors: "#fff",
      strokeWidth: 1,
    },
    tooltip: {
      y: {
        formatter: (value) =>
          value < 0
            ? `-${formatCompactNumber(Math.abs(value))}`
            : formatCompactNumber(Math.abs(value)),
      },
    },
  });

  // Custom hook to listen to zoom level changes
  function ZoomListener() {
    const map = useMap(); // Get the map instance
    useEffect(() => {
      const onZoom = () => {
        setZoomLevel(map.getZoom()); // Update the zoom level when zoom changes
      };
      map.on("zoomend", onZoom); // Listen for zoomend event
      return () => {
        map.off("zoomend", onZoom); // Cleanup event listener
      };
    }, [map]);

    return null;
  }

  useEffect(() => {
    // Map country names to their coordinates from the local JSON file
    const locationsWithCoordinates = countryData.map((country) => {
      const countryInfo = countriesData.find(
        (data) => data.name === country.name
      );

      if (countryInfo) {
        return {
          name: country.name,
          position: countryInfo.coordinates,
          saving: country.saving,
          color: "red",
        };
      } else {
        console.warn(`Coordinates not found for ${country.name}`);
        return null;
      }
    });

    setLocations(
      locationsWithCoordinates.filter((location) => location !== null)
    );
  }, [countryData]);

  // Helper function to scale bubble sizes dynamically based on zoom level
  const getBubbleSize = (saving) => {
    const maxSpend = Math.max(...countryData.map((data) => data.saving));
    const minRadius = 5; // Minimum size for smallest spend
    const maxRadius = 50; // Maximum size for largest spend

    // Adjust bubble size based on zoom level
    const zoomFactor = zoomLevel / 2; // Scale bubbles proportionally with zoom
    return (
      ((saving / maxSpend) * (maxRadius - minRadius) + minRadius) * zoomFactor
    );
  };

  //last

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const formatNumber = (value) => {
    if (value == null || isNaN(value)) return ""; // Handle undefined/null values

    const absValue = Math.abs(value); // Work with absolute values
    let formattedValue;

    if (absValue >= 1_000_000_000)
      formattedValue = (absValue / 1_000_000_000).toFixed(1) + "B";
    else if (absValue >= 1_000_000)
      formattedValue = (absValue / 1_000_000).toFixed(1) + "M";
    else if (absValue >= 1_000)
      formattedValue = (absValue / 1_000).toFixed(1) + "K";
    else formattedValue = absValue.toFixed(2);

    return value < 0 ? `-$${formattedValue}` : `$${formattedValue}`;
  };

  const options = {
    height: 220,
    animationEnabled: true,
    axisY: {
      includeZero: true,
      gridThickness: 0, // Removes grid lines
      lineThickness: 0, // Hides Y-axis line
      tickThickness: 0, // Hides Y-axis ticks
      labelFormatter: (e) => formatNumber(e?.value), // Ensure e.value exists
    },
    axisX: {
      gridThickness: 0, // Removes X-axis grid lines
    },
    toolTip: {
      shared: true, // Ensure tooltip shows correctly for all points
      contentFormatter: function (e) {
        return e.entries
          .map(
            (entry) =>
              `${entry.dataSeries.name}: ${formatNumber(entry.dataPoint.y)}`
          )
          .join("<br>");
      },
    },
    data: [
      {
        type: "waterfall",
        indexLabelOrientation: "vertical",
        dataPoints: waterfall.map((point) => ({
          ...point,
          y: point.y ?? 0, // Default to 0 if undefined
          indexLabel: formatNumber(point.y ?? 0), // Ensure a valid number
          toolTipContent: formatNumber(point.y ?? 0), // Format tooltip value
        })),
      },
    ],
  };

  return (
    <div className="container-fluid p-2">
      {/* KPI - Keeping original styling */}
      <div className="global-kpi-container mt-1 ps-2 pe-2 mb-2">
        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {savingKpi?.totalAmount
              ? formatCompactNumber(savingKpi.totalAmount)
              : 0}
            <span className="global-kpi-name">Total Spend</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {savingKpi?.totalSaving
              ? formatCompactNumber(savingKpi.totalSaving)
              : 0}
            <span className="global-kpi-name">Saving Potential</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {savingKpi?.priceVariance
              ? formatCompactNumber(savingKpi.priceVariance)
              : 0}
            <span className="global-kpi-name">Price Variance</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {savingKpi?.quantityCount
              ? formatCompactNumber(savingKpi.quantityCount)
              : 0}
            <span className="global-kpi-name">Quantity</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {savingKpi?.companyCount
              ? formatCompactNumber(savingKpi.companyCount)
              : 0}
            <span className="global-kpi-name">Company</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {savingKpi?.supplierCount
              ? formatCompactNumber(savingKpi.supplierCount)
              : 0}
            <span className="global-kpi-name">Supplier</span>
          </p>
        </div>
      </div>

      {/* First Charts Row */}
      <Row className="g-2 mb-2">
        {/* Saving by Sourcing Type */}
        <Col xs={12} md={6} lg={4} xl={2}>
          <Card className="h-100 shadow-sm" style={{ zIndex: 1000 }}>
            <Card.Body>
              <p className="head-theme">Saving by Sourcing Type</p>
              <div style={{ height: "220px" }}>
                {loadingSourcing ? (
                  <Loading />
                ) : (
                  <Chart
                    options={spendSavingShareChart}
                    series={spendSavingShareData}
                    type="pie"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Business Unit By Saving */}
        <Col xs={12} md={6} lg={4} xl={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">
                Top Business Unit By Saving
              </p>

              <div style={{ height: "220px" }}>
                {loadingBU ? (
                  <Loading />
                ) : (
                  <Chart
                    options={savingByBU}
                    series={savingBUData}
                    type="bar"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Saving Measures */}
        <Col xs={12} md={6} lg={4} xl={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">Saving Measures</p>

              <div style={{ height: "220px", paddingTop: "10px" }}>
                {loadingWaterfall ? (
                  <Loading />
                ) : (
                  <CanvasJSChart options={options} />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Saving By Month (Actual vs Targeted) */}
        <Col xs={12} md={6} lg={4} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">
                {" "}
                Saving By Month (Actual vs Targeted)
              </p>

              <div style={{ height: "220px" }}>
                {loadingMonth ? (
                  <Loading />
                ) : (
                  <Chart
                    options={savingByMonthChart}
                    series={savingByMonthData}
                    type="line"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Second Charts Row */}
      <Row className="g-2 ">
        {/* Saving by Category Items */}
        <Col xs={12} md={4} lg={4} xl={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="head-theme text-start">
                  Saving by Category Items
                </p>
                <select
                  className="form-select"
                  aria-label="Select Category"
                  value={activeCategory || ""}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  style={{
                    width: "150px",
                    fontSize: "12px",
                    padding: "5px",
                    height: "30px",
                  }}
                >
                  {categoryList.map((x, index) => (
                    <option key={index} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ height: "200px" }}>
                {loadingCategory ? (
                  <Loading />
                ) : (
                  <Chart
                    options={savingReductionChart}
                    series={[
                      {
                        name: "Saving",
                        data: activeItems.map((x) =>
                          x.saving > 0 ? x.saving : 0
                        ),
                      },
                      {
                        name: "Risk",
                        data: activeItems.map((x) =>
                          x.saving < 0 ? x.saving : 0
                        ),
                      },
                    ]}
                    type="bar"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Supplier and Category by Saving */}
        <Col xs={12} md={6} lg={4} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="head-theme text-start">
                  Top Supplier and Category by Saving
                </p>
                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  overlay={
                    <Tooltip className="custom-tooltip">
                      <Chart
                        options={savingBySupplier}
                        series={[
                          {
                            name: "Saving",
                            data: topSup.map((item) => item.TotalSaving),
                          },
                        ]}
                        type="bar"
                        height={"200px"}
                      />
                    </Tooltip>
                  }
                >
                  <Button
                    className="btn-theme"
                    variant="primary"
                    size="sm"
                    style={{
                      fontSize: "11px",
                      padding: "3px 5px",
                    }}
                  >
                    Overall supplier Ranking
                  </Button>
                </OverlayTrigger>
              </div>
              <div className="table-responsive" style={{ height: "300px" }}>
                {loadingTopSupplier ? (
                  <Loading />
                ) : (
                  <Table
                    style={{
                      textAlign: "left",
                      fontSize: "12px",
                    }}
                    size="sm"
                  >
                    <thead className="sticky-top">
                      <tr>
                        <th
                          style={{ width: "35%", color: "var(--color-main)" }}
                        >
                          Category
                        </th>
                        <th
                          style={{ width: "20%", color: "var(--color-main)" }}
                        >
                          Total Supplier
                        </th>
                        <th
                          style={{ width: "45%", color: "var(--color-main)" }}
                        >
                          Saving
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((x, index) => (
                        <tr key={index}>
                          <td>{x.category} </td>
                          <td>{x?.totalSuppliers}</td>
                          <td>
                            <div
                              className="progress w-100 me-2"
                              style={{ height: "20px", borderRadius: "5px" }}
                            >
                              <OverlayTrigger
                                trigger="click"
                                placement="left"
                                overlay={
                                  <Popover id={`popover-${x.index}`}>
                                    <ListGroup>
                                      <p
                                        style={{
                                          margin: "0px",
                                          padding: "5px 20px",
                                          fontWeight: 500,
                                          color: "var(--color-main)",
                                        }}
                                      >
                                        Top 5 Supplier
                                      </p>
                                      {x?.topSuppliers.map((z) => {
                                        return (
                                          <ListGroup.Item>
                                            <span>{z.vendor} -</span>
                                            <strong
                                              style={{
                                                marginLeft: "10px",
                                                color: "var(--color-main)",
                                              }}
                                            >
                                              {formatCompactNumber(
                                                z.TotalSaving
                                              )}
                                            </strong>
                                          </ListGroup.Item>
                                        );
                                      })}
                                    </ListGroup>
                                  </Popover>
                                }
                                key={index}
                                show={activePopover === index}
                                onToggle={() => handleToggle(index)}
                              >
                                <div
                                  role="progressbar"
                                  style={{
                                    cursor: "pointer",
                                    width: `${x?.percentage}%`,
                                    background:
                                      x?.percentage > 0
                                        ? "var(--color-main-light)"
                                        : "#f97061",
                                    color:
                                      x?.percentage > 0
                                        ? "var(--color-main)"
                                        : "white",
                                    fontSize: "12px",
                                    paddingTop: "1px",
                                    paddingLeft: "10px",
                                    fontWeight: 500,
                                  }}
                                  aria-valuenow={x?.percentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {x?.percentage}%
                                </div>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Geographic Presence of Vendor by Saving */}
        <Col xs={12} md={12} lg={4} xl={5}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start mb-2">
                Geographic Presence of Vendor by Saving
              </p>

              <div style={{ height: "300px" }}>
                {loadingMap ? (
                  <Loading />
                ) : (
                  <MapContainer
                    center={[20, 0]}
                    zoom={2}
                    style={{ height: "100%", width: "100%" }}
                    worldCopyJump={true}
                    maxBounds={[
                      [-90, -180],
                      [90, 180],
                    ]}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <ZoomListener />
                    {locations.map((location, index) => (
                      <CircleMarker
                        key={index}
                        center={location.position}
                        radius={getBubbleSize(location.saving)}
                        fillColor={location.color}
                        color="none"
                        fillOpacity={0.4}
                        stroke={true}
                      >
                        <Tool
                          direction="top"
                          offset={[0, -5]}
                          opacity={1}
                          permanent={false}
                        >
                          <div>
                            <b>{location.name}</b>
                            <br />
                            Saving: {formatCompactNumber(location.saving)}
                          </div>
                        </Tool>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SavingOverview;
