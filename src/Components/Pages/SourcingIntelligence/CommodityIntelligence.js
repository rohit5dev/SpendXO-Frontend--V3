//REACT
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import apiUrls from "../../../Config/apiUrls";
import { formatDate } from "../../../Config/formatDate.js";
//SUBMENU
import SourcingMenu from "./SourcingMenu.js";
//CHARTS
import Chart from "react-apexcharts";
import newsdata from "./Data/newsData.json";
import { Dropdown, DropdownButton, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { requestHeader } from "../../Helper/Constants/constant.js";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { months } from "../../Helper/Constants/constant.js";

const options = {
  chart: {
    type: "bar",
  },
  colors: ["var(--color-main)", "var(--color-main-light)"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "10px",
      borderRadius: 2,
      borderRadiusApplication: "end",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["2020", "2021", "2022", "2023", "2024"],
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " MMT";
      },
    },
  },
};

const series = [
  {
    name: "Demand",
    data: [76, 85, 101, 98, 87],
  },
  {
    name: "Supply",
    data: [44, 55, 57, 56, 61],
  },
];

//START COMPONENT
const CommodityIntelligence = (props) => {
  const { groupName, commodityName } = useParams();
  const [commodityList, setCommodityList] = useState([]);
  const location = useLocation();
  //STATES
  const [detail, setDetail] = useState([0, 0, 0, 0]);
  const [currency, setcurrency] = useState("");
  const [group, setGroup] = useState("");
  const [name, setName] = useState("");
  const [geo, setGeo] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [compare, setCompare] = useState([]);
  const [forecast, setForecast] = useState([[{ x: "", y: "" }]]);
  const [sortedNews, setSortedNews] = useState([]);
  const [newsList, setNewsList] = useState([]);
  //LIST STATES
  const [compareList, setCompareList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [geoList, setGeoList] = useState([]);
  const [commodityData, setCommodityData] = useState([]);
  const [commodityTable, setCommodityTable] = useState([]);
  const [commodityTableMain, setCommodityTableMain] = useState([]); //BACKUP FOR COMMODITY TABLE
  const [historicalData, setHistoricalData] = useState([{ x: "", y: "" }]);
  const [historicalDataMain, setHistoricalDataMain] = useState([]);
  const [fromToList, setFromToList] = useState([]);
  //TABLE FILTER STATES
  const [monthFilter, setMonthFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [ylist, setYlist] = useState([]);

  //LOAD CATEGORY LIST
  function handleLoadList(data, groupName, commodityName) {
    let grp = [],
      nm = [],
      lc = [];
    data.forEach((x) => {
      if (!grp.some((z) => z === x["Commodity Group"]))
        grp.push(x["Commodity Group"]);
      if (groupName === x["Commodity Group"]) {
        if (!nm.some((z) => z === x["Commodity Name"]))
          nm.push(x["Commodity Name"]);
      }
      if (commodityName === x["Commodity Name"]) {
        if (!lc.some((z) => z === x["Location"])) lc.push(x["Location"]);
      }
    });
    setGroupList(grp);
    setNameList(nm);
    setGeoList(lc);
    setGeo(lc.length > 0 ? lc[0] : "");
    dataLoad(groupName, commodityName, lc.length > 0 ? lc[0] : "");
  }

  // Generate historical data
  const generateHistoricalData = (data) => {
    if (!data || data.length === 0) return [];

    const result = [];

    data.forEach((entry, index) => {
      if (!entry || typeof entry.Close !== "number" || !entry.Date) return; // Skip invalid entries

      const date = new Date(entry.Date); // Parse the date
      const currentMonth = `${date.getMonth() + 1}/${date.getFullYear()}`; // Format as MM/YYYY

      const isLastEntry = index === data.length - 1;
      const nextDate = data[index + 1] ? new Date(data[index + 1].Date) : null;
      const nextMonth = nextDate
        ? `${nextDate.getMonth() + 1}/${nextDate.getFullYear()}`
        : null;

      // Add entry if it's the last entry of the current month or the last entry in the array
      if (currentMonth !== nextMonth || isLastEntry) {
        result.push({ x: currentMonth, y: Number(entry.Close.toFixed(2)) });
      }
    });

    return result;
  };

  // Function to calculate MoM, YoY, and last 3 months % change and latest price
  const calculatePriceChanges = (data) => {
    if (!data || data.length === 0) return {};

    // Filter out entries with invalid or undefined `Close` or `Date`
    const validData = data.filter(
      (item) => item && typeof item.Close === "number" && item.Date
    );

    // Sort the data by Date in descending order (latest first)
    validData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    if (validData.length === 0) return {}; // Return empty if no valid entries

    // Get the latest price (most recent data point)
    const latestPrice = validData[0].Close.toFixed(2);
    const latestDate = new Date(validData[0].Date);

    // Calculate MoM (Month-over-Month) change
    const lastMonthData = validData.find((item) => {
      const itemDate = new Date(item.Date);
      return (
        itemDate.getMonth() === latestDate.getMonth() - 1 &&
        itemDate.getFullYear() === latestDate.getFullYear()
      );
    });

    const momChange = lastMonthData
      ? Number(
          ((latestPrice - lastMonthData.Close) / lastMonthData.Close) * 100
        ).toFixed(2)
      : null;

    // Calculate YoY (Year-over-Year) change
    const lastYearData = validData.find((item) => {
      const itemDate = new Date(item.Date);
      return (
        itemDate.getFullYear() === latestDate.getFullYear() - 1 &&
        itemDate.getMonth() === latestDate.getMonth()
      );
    });

    const yoyChange = lastYearData
      ? Number(
          ((latestPrice - lastYearData.Close) / lastYearData.Close) * 100
        ).toFixed(2)
      : null;

    // Calculate the last 3 months change
    const lastThreeMonthsData = validData.filter((item) => {
      const itemDate = new Date(item.Date);
      return (
        itemDate >=
        new Date(latestDate.getFullYear(), latestDate.getMonth() - 3, 1)
      );
    });

    const threeMonthsAgoPrice =
      lastThreeMonthsData.length > 0
        ? lastThreeMonthsData[lastThreeMonthsData.length - 1].Close
        : null;

    const lastThreeMonthsChange = threeMonthsAgoPrice
      ? Number(
          ((latestPrice - threeMonthsAgoPrice) / threeMonthsAgoPrice) * 100
        ).toFixed(2)
      : null;

    return {
      latestPrice,
      momChange,
      yoyChange,
      lastThreeMonthsChange,
    };
  };

  //GENERATE FORECAST FOR NEXT 12 MONTHS
  const generateForecastData = (data) => {
    const last = data[data.length - 1];
    let lastMonth = Number(last?.x.split("/")[0]);
    let lastYear = Number(last?.x.split("/")[1]);
    let lastPrice = last?.y;
    const arr = [...data];
    for (let i = 0; i < 12; i++) {
      if (lastMonth === 12) {
        lastMonth = 1;
        lastYear++;
      } else {
        lastMonth++;
      }
      lastPrice = (lastPrice * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2);

      arr.push({ x: lastMonth + "/" + lastYear, y: lastPrice });
    }
    return arr;
  };

  //HANDLE COMMODITY RESPONSE
  function handleResponse(data) {
    setcurrency(data.length > 0 ? data[0]?.Currency : "");
    //calculate mom yoy and last 3 month and current price
    const { latestPrice, momChange, yoyChange, lastThreeMonthsChange } =
      calculatePriceChanges(data);
    setDetail([latestPrice, momChange, yoyChange, lastThreeMonthsChange]);
    //HANDLE CREATE HISTORICAL DATA
    const historyData = generateHistoricalData(data);
    setHistoricalData(historyData);
    //form-to date range
    if (historyData.length > 0) {
      setFrom(historyData[0].x);
      setTo(historyData[historyData.length - 1].x);
      const fromto = historyData.map((item) => item.x);
      setFromToList(fromto);
    }
    //GET FORCAST DATA
    let forecastInput =
      historyData.length > 12
        ? historyData.slice(-12) // Take the last 12 entries if the length exceeds 12
        : historyData; // Otherwise, take the entire data

    const forecastData = generateForecastData(forecastInput);
    console.log(forecastData, "forecast data");
    setForecast(forecastData);
    //commodity table
    const table = [],
      yearList = [];
    data.forEach((x, i) => {
      const current = parseFloat(x.Close.toFixed(2)); // Get the current Close price rounded to two decimal places
      const prev = i > 0 ? parseFloat(data[i - 1].Close.toFixed(2)) : 0; // Get the previous Close price, or 0 if it's the first entry
      const change = i === 0 ? 0 : parseFloat((current - prev).toFixed(2)); // Calculate the change from the previous value
      const color =
        change < 0 ? "#ea7461" : change > 0 ? "var(--color-main)" : "#93a3ad"; // Determine color based on the change
      const year = x.Date.split("-")[0]; // Extract the year from the Date string

      // Add year to the yearList if it's not already included
      if (!yearList.includes(year)) yearList.push(year);

      // Push the data into the table
      table.push({
        "Commodity Group": x["Commodity Group"],
        "Commodity Name": x["Commodity Name"],
        Location: x.Location,
        Currency: x.Currency,
        Date: x.Date,
        Close: current,
        Change: change,
        color: color,
      });
    });
    setCommodityTableMain(table);
    setCommodityTable(table);
    setYlist(yearList);
  }

  //CATEGORY NEWS LOAD
  const newsLoad = async (groupName, commodityName) => {
    try {
      const response = await axios.get(
        `${
          apiUrls.urlPrefix
        }/sourcing-news?NewsType=Commodity&Section=${groupName?.trim()}&SubSection=${commodityName}`,
        requestHeader.json
      );
      let newsData = response.data?.news;
      setNewsList(newsData);
      console.log("Commodity News Loaded");
    } catch (error) {
      console.error("Error loading menu data:", error);
    }
  };

  //COMMODITY DATA LOAD
  const dataLoad = async (groupName, commodityName, geoName) => {
    await axios
      .get(
        `${apiUrls.urlPrefix}/commodity-data?group=${groupName}&name=${commodityName}&geo=${geoName}`
      )
      .then((res) => {
        let data = res.data.result;
        handleResponse(data, groupName, commodityName, geoName);
        console.log(data, "Commodity Data Loaded");
      });
  };

  const optionLoad = async (categoryName, sectionName) => {
    try {
      const response = await axios.get(
        `${
          apiUrls.urlPrefix
        }/sourcing-menu?isCategory=${false}&isCommodity=${true}`,
        requestHeader.json
      );
      let optionData = response.data?.result?.commodityList[0];
      setCommodityList(optionData);
      handleLoadList(optionData, groupName, commodityName);
      console.log("Category Menu Data Loaded");
    } catch (error) {
      console.error("Error loading menu data:", error);
    }
  };

  useEffect(() => {
    setGroup(groupName);
    setName(commodityName);
    optionLoad(groupName, commodityName);
    newsLoad(groupName, commodityName);
  }, [groupName, commodityName]);

  //CONVERT DATE STRING
  function convertDateString(dateStr) {
    if (dateStr) {
      const [month, year] = dateStr.split("/");

      // Create a new Date object with day set to 1
      return new Date(`${year}-${month.padStart(2, "0")}-01`);
    }
    return null; // Return null if the date is invalid
  }

  //FORECAST CHART
  const options2 = {
    chart: {
      type: "line",
    },
    forecastDataPoints: {
      count: 12,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      tickAmount: 10,
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["var(--color-main)"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
  };

  const series2 = [
    {
      name: "Price",
      data: forecast, // Data for the single line
    },
  ];

  //HISTORICAL CHARTS
  const options3 = {
    chart: {
      height: 300,
      type: "line",
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      tickAmount: 10,
      categories:
        historicalData.length !== 0
          ? historicalData
              .filter(
                (item) =>
                  convertDateString(item.x) >= convertDateString(from) &&
                  convertDateString(item.x) <= convertDateString(to)
              )
              .map((item) => item.x)
          : [],
    },
    colors: ["var(--color-main)", "var(--color-main-light)"],
  };

  const series3 = [
    {
      name: "Price",
      data:
        historicalData.length !== 0
          ? historicalData
              .filter(
                (item) =>
                  convertDateString(item.x) >= convertDateString(from) &&
                  convertDateString(item.x) <= convertDateString(to)
              )
              .map((item) => ({
                x: item.x, // Ensure the `x` is properly formatted
                y: item.y, // Map `y` values to maintain correct structure
              }))
          : [{ x: "", y: "" }],
    },
  ];

  //AG GRID
  const gridRefcom = useRef();
  const changeCellStyle = (params) => {
    const color = params.data.color;
    return {
      color: color,
      fontWeight: "bold",
      fontSize: "12px",
    };
    // return null;
  };
  const columnDefscom = [
    { field: "Commodity Group", headerName: "Group", width: "120px" },
    { field: "Commodity Name", headerName: "Name", width: "130px" },
    { field: "Location", width: "100px" },
    { field: "Currency", width: "100px" },
    { field: "Date", width: "150px" },
    { field: "Close", width: "130px" },
    { field: "Change", width: "130px", cellStyle: changeCellStyle },
  ];
  const defaultColDefcom = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      autoHeight: true,
      headerClass: "grid-style",
      cellStyle: { fontSize: "11px", height: "20px" },
    };
  }, []);

  //FILTER FUNCTION FOR COMMODITY TABLE
  useEffect(() => {
    let arr = [...commodityTableMain];
    if (yearFilter !== "All")
      arr = arr.filter((x) => {
        let yr = x.Date.split("-")[0];
        return yr === yearFilter;
      });

    if (monthFilter !== "All")
      arr = arr.filter((x) => {
        let index = x.Date.split("-")[1];
        let mn = months[Number(index) - 1];
        return mn === monthFilter;
      });
    setCommodityTable(arr);
  }, [monthFilter, yearFilter]);

  //CHANGE GEO
  const handleChangeGeo = (geoName) => {
    setGeo(geoName);
    dataLoad(group, name, geoName);
  };

  //CHANGE COMMODITY
  const handleChangeName = (comName) => {
    setName(comName);

    const newList = commodityList
      .filter(
        (x) => x["Commodity Name"] === comName && x["Commodity Group"] === group
      )
      .map((x) => x.Location);

    setGeo(newList[0] || ""); // Set the first location or empty string if no match
    setGeoList(newList); // Set the filtered list of locations
    dataLoad(group, comName, newList[0] || ""); // Pass the first location or empty string to dataLoad
    newsLoad(group, comName);
  };

  //CHANGE GROUP
  const handleChangeGroup = (gName) => {
    setGroup(gName);
    const newGeo = [],
      newCom = [];
    commodityList.forEach((x) => {
      if (x["Commodity Group"] === gName) {
        if (!newCom.some((z) => z === x["Commodity Name"]))
          newCom.push(x["Commodity Name"]);
        if (newCom.length > 0) {
          if (x["Commodity Name"] === newCom[0]) {
            if (!newGeo.some((z) => z === x["Location"]))
              newGeo.push(x["Location"]);
          }
        }
      }
    });
    setNameList(newCom);
    setGeoList(newGeo);
    setName(newCom[0]);
    setGeo(newGeo[0]);
    dataLoad(gName, newCom[0], newGeo[0]);
    newsLoad(gName, newCom[0]);
  };

  //START RENDER
  return (
    <div
      style={{
        padding: "5px",
      }}
    >
      {/* SUBMENU */}
      <SourcingMenu />

      <div style={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
        <div style={{ width: "70%" }}>
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: "5px",
              padding: "5px",
            }}
          >
            <DropdownButton
              variant="outline-secondary"
              size="sm"
              title={group}
              onSelect={handleChangeGroup}
            >
              {groupList.map((item) => (
                <Dropdown.Item style={{ fontSize: "12px" }} eventKey={item}>
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton
              variant="outline-secondary"
              size="sm"
              title={name}
              onSelect={handleChangeName}
            >
              {nameList.map((item) => (
                <Dropdown.Item style={{ fontSize: "12px" }} eventKey={item}>
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton
              variant="outline-secondary"
              size="sm"
              title={geo}
              onSelect={handleChangeGeo}
            >
              {geoList.map((item) => (
                <Dropdown.Item style={{ fontSize: "12px" }} eventKey={item}>
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          {/* COMMODITY DETAILS */}
          <div
            style={{
              padding: "5px",
              display: "flex",
              justifyContent: "space-around",
              textAlign: "center",
              background: "white",
              marginTop: "5px",
              borderRadius: "5px",
              boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                borderRight: "1px solid #b0c1d5",
                paddingRight: "10%",
              }}
            >
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "12px",
                  margin: "2px",
                }}
              >
                Price
              </p>
              <p style={{ margin: "2px" }} className="global-kpi-num">
                {detail[0]}
              </p>
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "8px",
                  margin: "2px",
                }}
              >
                ( {currency} Price )
              </p>
            </div>
            <div
              style={{
                borderRight: "1px solid #b0c1d5",
                paddingRight: "10%",
              }}
            >
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "12px",
                  margin: "2px",
                }}
              >
                MOM
              </p>
              <p className="global-kpi-num" style={{ margin: "2px" }}>
                {detail[1]}
              </p>
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "8px",
                  margin: "2px",
                }}
              >
                ( In Percentage )
              </p>
            </div>
            <div
              style={{
                borderRight: "1px solid #b0c1d5",
                paddingRight: "10%",
              }}
            >
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "12px",
                  margin: "2px",
                }}
              >
                YOY
              </p>
              <p className="global-kpi-num" style={{ margin: "2px" }}>
                {detail[2]}
              </p>
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "8px",
                  margin: "2px",
                }}
              >
                ( In Percentage )
              </p>
            </div>
            <div>
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "12px",
                  margin: "2px",
                }}
              >
                Last 3 Month
              </p>
              <p className="global-kpi-num" style={{ margin: "2px" }}>
                {detail[3]}
              </p>
              <p
                style={{
                  color: "var(--color-main)",
                  fontSize: "8px",
                  margin: "2px",
                }}
              >
                ( In Percentage )
              </p>
            </div>
          </div>
          {/* SUPPLY AND DEMAND - FORECAST */}
          <Row style={{ marginTop: "10px", gap: 0 }}>
            <Col md={6}>
              <div
                style={{
                  background: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  Supply & Demand
                </p>
                <p style={{ margin: "0px", color: "grey", fontSize: "11px" }}>
                  In Million Metric Tons
                </p>
                <Chart
                  options={options}
                  series={series}
                  type="bar"
                  height={250}
                />
              </div>
            </Col>
            <Col md={6}>
              <div
                style={{
                  background: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  Commodity Forecast
                </p>
                <p style={{ margin: "0px", color: "grey", fontSize: "11px" }}>
                  Displaying a 12-month commodity forecast.
                </p>
                <Chart
                  options={options2}
                  series={series2}
                  type="line"
                  height={250}
                />
              </div>
            </Col>
          </Row>
          {/* HISTORICAL DATA */}
          <div
            style={{
              background: "white",
              padding: "5px",
              borderRadius: "5px",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "2px",
              }}
            >
              Historical Commodity Price -{" "}
              {group + " " + name + " (" + geo + ")"}
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <Form.Group
                className="global-filter-input"
                style={{ gap: "8px" }}
              >
                <Form.Label className="global-filter-label">From</Form.Label>
                <Form.Select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  style={{ fontSize: "11px" }}
                >
                  {fromToList?.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="global-filter-input"
                style={{ gap: "8px" }}
              >
                <Form.Label className="global-filter-label">To</Form.Label>
                <Form.Select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  style={{ fontSize: "11px" }}
                >
                  {fromToList?.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <Chart
              options={options3}
              series={series3}
              type="line"
              height={300}
            />
          </div>
          {/* COMMODITY TABLE */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                paddingTop: "20px",
              }}
            >
              Daily Price Movement
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <Form.Group
                className="global-filter-input"
                style={{ gap: "8px" }}
              >
                <Form.Label className="global-filter-label">Month</Form.Label>
                <Form.Select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  style={{ fontSize: "11px" }}
                >
                  <option value={"All"}>All</option>
                  {months?.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="global-filter-input"
                style={{ gap: "8px" }}
              >
                <Form.Label className="global-filter-label">Year</Form.Label>
                <Form.Select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  style={{ fontSize: "11px" }}
                >
                  <option value={"All"}>All</option>
                  {ylist?.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ marginTop: "10px", height: "70vh" }}
          >
            <AgGridReact
              rowHeight={25}
              headerHeight={30}
              ref={gridRefcom}
              rowData={commodityTable}
              columnDefs={columnDefscom}
              defaultColDef={defaultColDefcom}
            />
          </div>
        </div>

        <div style={{ width: "30%" }}>
          {/* 35% width for right side */}
          <div style={{ height: "100px", width: "100%", padding: "10px 0" }}>
            <h5 style={{ fontSize: "14px", textAlign: "left" }}>
              Commodity News
            </h5>
            <div style={{ height: "500px", overflow: "auto" }}>
              {newsList.map((x) => {
                return (
                  <div
                    style={{
                      background: "white",
                      boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
                      marginTop: "5px",
                      padding: "5px",
                      display: "flex",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.open(x["News Url"]);
                    }}
                  >
                    <div>
                      <img
                        src={x["News Image Url"]}
                        style={{
                          width: "60px",
                          height: "50px",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "10px",
                          color: "var(--color-main)",
                          textAlign: "center",
                          marginTop: "5px",
                        }}
                      >
                        {formatDate(x["News Date"])}
                      </p>
                    </div>
                    <div style={{ paddingLeft: "5px" }}>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          textAlign: "left",
                          color: "var(--color-main)",
                          margin: "0px",
                        }}
                      >
                        {x["News Title"]?.length > 120
                          ? x["News Title"].slice(0, 120) + "..."
                          : x["News Title"]}
                      </p>
                      <p
                        style={{
                          fontSize: "8px",
                          color: "grey",
                          marginTop: "2px",
                          textAlign: "left",
                          margin: "0px",
                        }}
                      >
                        {x["News Body"]?.length > 150
                          ? x["News Body"].slice(0, 150) + "..."
                          : x["News Body"]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommodityIntelligence;
