//REACT
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./css/SpendOverview.css";
import Chart from "react-apexcharts";
import axios from "axios";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
//COMPONENT & HELPER
import apiUrls from "../../../Config/apiUrls";
import { formatCompactNumber } from "../../../Config/formatCompactNumber";
import { requestHeader } from "../../Helper/Constants/constant";
import countriesData from "../../Helper/Constants/countries.json";
import Loading from "../../Helper/Loading2";

const SpendOverview = () => {
  const [spendKpi, setSpendKpi] = useState([]);
  const [series, setSeries] = useState([]);
  const [spendByCompanyName, setSpendByCompanyName] = useState([]);
  const [spendByCompanyData, setSpendByCompanyData] = useState([]);
  const [spendByCostName, setSpendByCostName] = useState([]);
  const [spendByCostData, setSpendByCostData] = useState([
    { name: "Spend", data: [] },
  ]);
  const [spendCategory, setSpendCategory] = useState([]);
  const [spendCategoryData, setSpendCategoryData] = useState([
    { name: "Spend", data: [] },
  ]);
  const [spendCom, setSpendCom] = useState([]);
  const [spendComData, setSpendComData] = useState([
    { name: "Spend", data: [] },
  ]);
  const [countryData, setCountryData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(2);

  //tree chart
  const [treeMapData, setTreeMapData] = useState([
    {
      data: [],
    },
  ]);

  const [bucket, setBucket] = useState([]);
  const [mixedSpend, setMixedSpend] = useState([]);
  const [mixedSup, setMixedSup] = useState([]);
  // Individual loading states for each chart
  const [loadingKpi, setLoadingKpi] = useState(true);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingCost, setLoadingCost] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [loadingCateCom, setLoadingCateCom] = useState(true);
  const [loadingTreeMap, setLoadingTreeMap] = useState(true);
  const [loadingMap, setLoadingMap] = useState(true);

  //dataload spend kpi
  const getSpendKpi = async () => {
    setLoadingKpi(true);
    await axios
      .get(`${apiUrls.urlPrefix}/new-spend-kpi`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSpendKpi(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingKpi(false));
  };

  //spend by company
  const getSpendByCompany = async () => {
    setLoadingCompany(true);
    await axios
      .get(`${apiUrls.urlPrefix}/spend-by-company`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSpendByCompanyData(data?.totalSpends);
        setSpendByCompanyName(data?.companyNames);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingCompany(false));
  };

  //spend by cost
  const getSpendByCost = async () => {
    setLoadingCost(true);
    await axios
      .get(`${apiUrls.urlPrefix}/spend-by-cost`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSpendByCostName(data?.costNames);
        setSpendByCostData([{ name: "Spend", data: data?.totalSpends }]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingCost(false));
  };

  //spend vendor tree map
  const getTreeMapData = async () => {
    setLoadingTreeMap(true);
    await axios
      .get(`${apiUrls.urlPrefix}/spend-tree-map`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        const transformedData = data.map(({ Category, supName, Spend }) => ({
          x: `${Category} - ${supName}`,
          y: Spend,
          category: Category,
        }));
        setTreeMapData([
          {
            data: transformedData,
          },
        ]);

        const updatedSeries = Object.values(
          data.reduce((acc, { Category, supName, Spend }) => {
            acc[Category] = acc[Category] || { name: Category, data: [] };
            acc[Category].data.push({
              x: `${Category} - ${supName}`,
              y: Spend,
            });
            return acc;
          }, {})
        );

        setSeries(updatedSeries);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingTreeMap(false));
  };

  const getCateVsCom = async () => {
    setLoadingCateCom(true);
    await axios
      .get(`${apiUrls.urlPrefix}/spend-cate-comm`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setSpendCategory(data?.category[0]);
        setSpendCategoryData([{ name: "Spend", data: data?.category[1] }]);
        setSpendCom(data?.commodity[0]);
        setSpendComData([{ name: "Spend", data: data?.commodity[1] }]);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingCateCom(false));
  };

  const getMapChart = async () => {
    setLoadingMap(true);
    await axios
      .get(`${apiUrls.urlPrefix}/spend-map-chart`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setCountryData(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingMap(false));
  };

  const getPaymentData = async () => {
    setLoadingPayment(true);
    await axios
      .get(`${apiUrls.urlPrefix}/spend-payment-bucket`, requestHeader.json)
      .then((response) => {
        const data = response.data.result;
        setBucket(data?.bucket);
        setMixedSpend(data?.spend);
        setMixedSup(data?.supplier);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(toastMessages.errorMsgApi);
      })
      .finally(() => setLoadingPayment(false));
  };

  useEffect(() => {
    getSpendKpi();
    getSpendByCompany();
    getSpendByCost();
    getPaymentData();
    getCateVsCom();
    getTreeMapData();
    getMapChart();
  }, []);

  //charts
  const spendByCompanyChart = {
    chart: {
      type: "pie",
    },
    colors: [
      "#227c9e",
      "var(--color-main)",
      "#ffc857",
      "#f97061",
      "#8cbf9e",
      "var(--color-main-light)",
    ],
    labels: spendByCompanyName,
    tooltip: {
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

  const spendByCostChart = {
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
      categories: spendByCostName,
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

  //tree chart
  const treeMapChart = {
    legend: {
      show: false,
    },
    chart: {
      type: "treemap",
    },
    colors: [
      "#227c9e",
      "var(--color-main)",
      "#ffc857",
      "#f97061",
      "#8cbf9e",
      "var(--color-main-light)",
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
        layout: {
          padding: 5, // Optional: Add padding to boxes for better spacing
        },
        label: {
          style: {
            fontSize: "14px", // Increase font size for labels
            fontWeight: "bold",
            colors: ["#fff"], // Optional: Set label color
          },
        },
        group: {
          enabled: true, // Enable grouping
          groupBy: "category", // Group by category
        },
      },
    },
  };

  const treeMapChartMemo = useMemo(() => {
    return (
      <Chart
        options={treeMapChart}
        series={treeMapData}
        type="treemap"
        height={"90%"}
        width={"100%"}
      />
    );
  }, [treeMapData]);

  // commodity vs catgeory by spend
  const spendCategoryChart = {
    chart: {
      type: "bar",
    },
    colors: ["var(--color-main-light)"],
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
      categories: spendCategory,
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

  const spendCommodityChart = {
    chart: {
      type: "bar",
    },
    colors: ["#f97061"],
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
      categories: spendCom,
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

  //mapp

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
          spend: country.spend,
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
  const getBubbleSize = (spend) => {
    const maxSpend = Math.max(...countryData.map((data) => data.spend));
    const minRadius = 5; // Minimum size for smallest spend
    const maxRadius = 50; // Maximum size for largest spend

    // Adjust bubble size based on zoom level
    const zoomFactor = zoomLevel / 2; // Scale bubbles proportionally with zoom
    return (
      ((spend / maxSpend) * (maxRadius - minRadius) + minRadius) * zoomFactor
    );
  };

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

  //mixed chart
  const mixedOptions = {
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
    labels: bucket,
    yaxis: {
      show: false,
    },
    tooltip: {
      shared: true, // Show combined tooltip for both series
      y: {
        formatter: (value, { seriesIndex }) => {
          // Customize tooltip format for each series
          return seriesIndex === 0
            ? `${formatCompactNumber(value)}` // Customize for 'Spend' series
            : `${value}`; // Customize for 'Supplier' series
        },
      },
    },
    legend: {
      position: "bottom", // Positions the legend at the top
      horizontalAlign: "center", // Centers the legend horizontally
    },
  };

  const mixedSeries = [
    {
      name: "Spend",
      type: "column",
      data: mixedSpend,
    },
    {
      name: "Supplier",
      type: "line",
      data: mixedSup,
    },
  ];

  // heat map chart - Top Categories with Vendor by Spend
  const options = {
    chart: {
      type: "treemap",
    },
    colors: ["#38858e", "#ffc857", "#227c9e", "#8cbf9e", "#84b9c1"],
    legend: {
      show: false,
    },
    tooltip: {
      style: {
        zIndex: 99999, // Very high value
        position: "absolute", // Ensure proper positioning
      },
    },
  };

  return (
    <div className="container-fluid p-2">
      {/* KPI - Keeping original styling */}
      <div className="global-kpi-container mt-1 ps-2 pe-2 mb-2">
        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.totalAmount
              ? formatCompactNumber(spendKpi.totalAmount)
              : 0}
            <span className="global-kpi-name">Total Spend</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.totalAmount
              ? formatCompactNumber(spendKpi.tailSpend)
              : 0}
            <span className="global-kpi-name">Tail Spend</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.companyCount
              ? formatCompactNumber(spendKpi.companyCount)
              : 0}
            <span className="global-kpi-name">Company</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.supplierCount
              ? formatCompactNumber(spendKpi.supplierCount)
              : 0}
            <span className="global-kpi-name">Supplier</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.glCount ? formatCompactNumber(spendKpi.glCount) : 0}
            <span className="global-kpi-name">GL Account</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.l4Count ? formatCompactNumber(spendKpi.l4Count) : 0}
            <span className="global-kpi-name">L4 Category</span>
          </p>
        </div>

        <div className="global-kpi-box">
          <p className="global-kpi-num">
            {spendKpi?.itemCount ? formatCompactNumber(spendKpi.itemCount) : 0}
            <span className="global-kpi-name">Items</span>
          </p>
        </div>
      </div>

      {/* First Charts Row */}
      <Row className="g-2 mb-2">
        {/* Spend by Company */}
        <Col xs={12} md={6} lg={4} xl={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">Spend by Company</p>
              <div style={{ height: "220px" }}>
                {loadingCompany ? (
                  <Loading />
                ) : (
                  <Chart
                    options={spendByCompanyChart}
                    series={spendByCompanyData}
                    type="pie"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment Term by Suppliers */}
        <Col xs={12} md={6} lg={4} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">Payment Term by Suppliers</p>
              <div style={{ height: "220px" }}>
                {loadingPayment ? (
                  <Loading />
                ) : (
                  <Chart
                    options={mixedOptions}
                    series={mixedSeries}
                    type="line"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Categories & Commodities */}
        <Col xs={12} md={12} lg={4} xl={5}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">
                Top 10 Categories(L4) & Top 10 Commodities Used
              </p>
              <Row className="g-2">
                <Col xs={12} md={6}>
                  <div style={{ height: "220px" }}>
                    {loadingCateCom ? (
                      <Loading />
                    ) : (
                      <Chart
                        options={spendCategoryChart}
                        series={spendCategoryData}
                        type="bar"
                        height="100%"
                        width="100%"
                      />
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div style={{ height: "220px" }}>
                    {loadingCateCom ? (
                      <Loading />
                    ) : (
                      <Chart
                        options={spendCommodityChart}
                        series={spendComData}
                        type="bar"
                        height="100%"
                        width="100%"
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Second Charts Row */}
      <Row className="g-2">
        {/* Spend by Cost Center */}
        <Col xs={12} md={6} lg={4} xl={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">Spend by Cost Center</p>
              <div style={{ height: "300px" }}>
                {loadingCost ? (
                  <Loading />
                ) : (
                  <Chart
                    options={spendByCostChart}
                    series={spendByCostData}
                    type="bar"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Categories with Vendor */}
        <Col xs={12} md={6} lg={4} xl={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start">
                Top Categories with Vendor by Spend
              </p>
              <div style={{ height: "300px" }}>
                {loadingTreeMap ? (
                  <Loading />
                ) : (
                  <Chart
                    options={options}
                    series={series}
                    type="treemap"
                    height="100%"
                    width="100%"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Geographic Presence */}
        <Col xs={12} md={12} lg={4} xl={5}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <p className="head-theme text-start mb-2">
                Geographic Presence of Vendor by Spend
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
                        radius={getBubbleSize(location.spend)}
                        fillColor={location.color}
                        color="none"
                        fillOpacity={0.4}
                        stroke={true}
                      >
                        <Tooltip
                          direction="top"
                          offset={[0, -5]}
                          opacity={1}
                          permanent={false}
                        >
                          <div>
                            <b>{location.name}</b>
                            <br />
                            Spend: {formatCompactNumber(location.spend)}
                          </div>
                        </Tooltip>
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

export default SpendOverview;
