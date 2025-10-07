import React, { useState, useEffect } from "react";
import apiUrls from "../../../Config/apiUrls";
import SourcingMenu from "./SourcingMenu";
import { months } from "../../Helper/Constants/constant";
import { requestHeader } from "../../Helper/Constants/constant";
import axios from "axios";
import { MdOutlineRestartAlt } from "react-icons/md";
import {
  Form,
  Button,
  Row,
  Col,
  Tab,
  Tabs,
  Modal,
  Card,
} from "react-bootstrap";
import "./css/news.css";
import { LiaNewspaperSolid } from "react-icons/lia";
import { GoOrganization } from "react-icons/go";
import { MdStackedLineChart } from "react-icons/md";
import { MdOutlineMultilineChart } from "react-icons/md";
import { MdOutlineBubbleChart } from "react-icons/md";
import { ListGroup } from "react-bootstrap";
import { MdOutlineArrowRight } from "react-icons/md";
import { FaBuilding, FaUser } from "react-icons/fa";
import Chart from "react-apexcharts";

const NewsDashboard = () => {
  //state
  const [mainNews, setMainNews] = useState([]);
  const [newsTable, setNewsTable] = useState([]);
  const [newsInsight, setNewsInsight] = useState([]);
  //kpi state
  const [bkpi, setbkpi] = useState([0, 0, 0]);
  const [skpi, setskpi] = useState([0, 0, 0]);
  const [pkpi, setpkpi] = useState([0, 0, 0]);
  const [company, setcompany] = useState("");
  const [clist, setclist] = useState([]);
  const [klist, setklist] = useState([]);
  const [newsVolume, setNewsVolume] = useState([]);
  const [impact, setimpact] = useState([]);
  const [sentiment, setsentiment] = useState([]);
  const [activeNews, setActiveNews] = useState({
    source: "",
    date: "",
    image: "",
    type: "",
    org: "",
    impact: "",
    sentiment: "",
    title: "",
    body: "",
    url: "",
    summary: [],
    tech: [],
    inorg: [],
    country: "",
    region: "",
  });

  //filters

  const [newsTypeFilter, setNewsTypeFilter] = useState("All");
  const [orgFilter, setOrgFilter] = useState("All");
  const [impFilter, setImpFilter] = useState("All");
  const [sntFilter, setSntFilter] = useState("All");
  const [cntFilter, setCntFilter] = useState("All");
  const [yrFilter, setYrFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  //filters list
  const [newsTypeFilterList, setNewsTypeFilterList] = useState(["All"]);
  const [orgFilterList, setOrgFilterList] = useState(["All"]);
  const [impFilterList, setImpFilterList] = useState(["All"]);
  const [sntFilterList, setSntFilterList] = useState(["All"]);
  const [cntFilterList, setCntFilterList] = useState(["All"]);
  const [yrFilterList, setYrFilterList] = useState(["All"]);
  const [sectionFilterList, setSectionFilterList] = useState(["All"]);

  const resetFilters = () => {
    setNewsTypeFilter("All");
    setOrgFilter("All");
    setImpFilter("All");
    setSntFilter("All");
    setCntFilter("All");
  };

  //data loading
  useEffect(() => {
    const dataLoad = async () => {
      let retryCount = 0;
      const maxRetries = 3;
      while (retryCount < maxRetries) {
        try {
          let getNews = await axios
            .get(`${apiUrls.urlPrefix}/get-news`, requestHeader.json)
            .then((response) => {
              response3(response, false);
              console.log("News Data Loaded");
            });

          Promise.all([getNews]);
          break;
        } catch (error) {
          console.error("Error:", error);
          retryCount++;
        }
      }
      if (retryCount === maxRetries) {
        console.error("Data load failed after maximum retries.");
      }
    };
    dataLoad();
  }, []);

  //response function
  function response1(res) {
    console.log(res.data);
    setcompany(res.data.kpi.org);
    let bchartkpi = res.data.chartkpi1[0];
    let schartkpi = res.data.chartkpi2[0];
    let pchartkpi = res.data.chartkpi3[0];
    setbkpi([bchartkpi.low, bchartkpi.mid, bchartkpi.high]);
    setskpi([schartkpi.Positive, schartkpi.Negative, schartkpi.Neutral]);
    setpkpi([pchartkpi.yes, pchartkpi.maybe, pchartkpi.no]);
  }

  const [first, setFirst] = useState(false);
  useEffect(() => {
    if (!first) {
      setFirst(true);
      return;
    } else {
      console.log("entered");
      let arr = [...mainNews];
      if (newsTypeFilter !== "All") {
        arr = arr.filter(
          (x) => (x["News Type"] || "").trim() === newsTypeFilter
        );
      }

      if (orgFilter !== "All") {
        arr = arr.filter(
          (x) => (x["Organization Name"] || "").trim() === orgFilter
        );
      }

      if (impFilter !== "All") {
        arr = arr.filter(
          (x) =>
            (x["Business Impact "] || "").trim().toUpperCase() ===
            impFilter.toUpperCase()
        );
      }

      if (sntFilter !== "All") {
        arr = arr.filter(
          (x) =>
            (x["Business Impact Sentiment"] || "").trim().toUpperCase() ===
            sntFilter.toUpperCase()
        );
      }

      if (cntFilter !== "All") {
        arr = arr.filter((x) => (x["Country"] || "").trim() === cntFilter);
      }
      // call response3
      response3(arr, true);
    }
  }, [newsTypeFilter, orgFilter, impFilter, sntFilter, cntFilter]);

  function response3(res, cn) {
    let data;
    if (!cn) {
      console.log(res.data);
      data = res.data.news;
      setMainNews(data);
    } else data = res;
    setNewsTable(data);
    //filters data list
    let ntList = [],
      orglist = [],
      implist = [],
      sntlist = [],
      cntlist = [];
    data.forEach((x) => {
      const newsType = (x["News Type"] || "").trim();
      const organization = (x["Organization Name"] || "").trim();
      const businessImpact = (x["Business Impact "] || "").trim().toUpperCase();
      const sentiment = (x["Business Impact Sentiment"] || "")
        .trim()
        .toUpperCase();
      const country = (x["Country"] || "").trim();

      if (!ntList.includes(newsType)) ntList.push(newsType);
      if (!orglist.includes(organization)) orglist.push(organization);
      if (!implist.includes(businessImpact)) implist.push(businessImpact);
      if (!sntlist.includes(sentiment)) sntlist.push(sentiment);
      if (!cntlist.includes(country)) cntlist.push(country);
    });

    setNewsTypeFilterList(ntList);
    setOrgFilterList(orglist);
    setImpFilterList(implist);
    setSntFilterList(sntlist);
    setCntFilterList(cntlist);

    let arr = [],
      ar2 = [],
      inf = [],
      imp = [],
      sent = [],
      c = 1;
    let company = [],
      bimp = [0, 0, 0],
      sntkpi = [0, 0],
      ptokpi = [0, 0, 0];
    data.forEach((x) => {
      //kpi load
      if (!company.some((z) => z === x["Organization Name"]))
        company.push(x["Organization Name"]);
      let i = x["Business Impact "];
      if (i.toUpperCase() === "LOW IMPACT") bimp[0]++;
      else if (i.toUpperCase() === "MEDIUM IMPACT") bimp[1]++;
      else if (i.toUpperCase() === "HIGH IMPACT") bimp[2]++;

      let s = x["Business Impact Sentiment"];
      if (s.toUpperCase() === "POSITIVE IMPACT") sntkpi[0]++;
      else if (s.toUpperCase() === "NEGATIVE IMPACT") sntkpi[1]++;

      let p = x["Potential Opportunity"];
      if (p.toUpperCase() === "YES") ptokpi[0]++;
      else if (p.toUpperCase() === "NO") ptokpi[1]++;
      else ptokpi[2]++;

      //company list
      if (arr.some((z) => z.name === x["Organization Name"])) {
        let index = arr.findIndex((z) => z.name == x["Organization Name"]);
        let count = arr[index].count;
        count = count + 1;
        arr[index].count = count;
      } else {
        arr.push({
          name: x["Organization Name"],
          count: c,
        });
      }
      //key influencer list
      if (inf.some((z) => z.name === x["Key Influencer"])) {
        let index = inf.findIndex((z) => z.name === x["Key Influencer"]);
        let count = inf[index].count;
        count = count + 1;
        inf[index].count = count;
      } else {
        inf.push({
          name: x["Key Influencer"],
          count: 1,
        });
      }
      //news volume
      let mindex = ar2.findIndex((z) => z.month === x["News Month"]);
      if (mindex !== -1) {
        let c = 0,
          nc = 0;
        if (x["Competitor News vs. Non-Competitor News"] === "Competitor News")
          c = 1;
        else nc = 1;
        let mn = ar2[mindex];
        mn.competitor = mn.competitor + c;
        mn.noncompetitor = mn.noncompetitor + nc;
        ar2[mindex] = mn;
      } else {
        let c = 0,
          nc = 0;
        if (x["Competitor News vs. Non-Competitor News"] === "Competitor News")
          c = 1;
        else nc = 1;
        ar2.push({
          month: x["News Month"],
          competitor: c,
          noncompetitor: nc,
        });
      }
      // business impact chart
      if (imp.some((z) => z.name === x["News Type"])) {
        let index = imp.findIndex((z) => z.name === x["News Type"]);
        let obj = imp[index];
        if (x["Business Impact "] === "Low Impact") obj.low++;
        else if (x["Business Impact "] === "Medium Impact") obj.mid++;
        else if (x["Business Impact "] === "High Impact") obj.high++;
      } else {
        let l = 0,
          m = 0,
          h = 0;
        if (x["Business Impact "] === "Low Impact") l = 1;
        else if (x["Business Impact "] === "Medium Impact") m = 1;
        else if (x["Business Impact "] === "High Impact") h = 1;
        imp.push({
          name: x["News Type"],
          low: l,
          mid: m,
          high: h,
        });
      }
      // sentiment chart
      if (sent.some((z) => z.name === x["News Type"])) {
        let index = sent.findIndex((z) => z.name === x["News Type"]);
        let obj = sent[index];
        if (x["Business Impact Sentiment"] === "Positive Impact") obj.low++;
        else if (x["Business Impact Sentiment"] === "Negative Impact")
          obj.high++;
      } else {
        let p = 0,
          n = 0;
        if (x["Business Impact Sentiment"] === "Positive Impact") p = 1;
        else if (x["Business Impact Sentiment"] === "Negative Impact") n = 1;
        sent.push({
          name: x["News Type"],
          low: p,
          high: n,
        });
      }
    });
    arr.sort((a, b) => {
      let numA = parseInt(a.count);
      let numB = parseInt(b.count);
      return numB - numA;
    });
    inf.sort((a, b) => {
      let numA = parseInt(a.count);
      let numB = parseInt(b.count);
      return numB - numA;
    });
    let arr2 = [],
      arr3 = [];
    ar2.map((x) => {
      arr2.push({
        x: x.month,
        y: x.competitor,
      });
      arr3.push({
        x: x.month,
        y: x.noncompetitor,
      });
    });
    // const dataMap = new Map(arr2.map(([m, ...d]) => [m, d]));
    // const alignData = months.map((m) => [m, ...(dataMap.get(m) || [0, 0, 0])]);
    // alignData.unshift(["Month", "Competitor News", "Non-Competitor News"]);

    let imp1 = [],
      imp2 = [],
      imp3 = [],
      imp4 = [];
    imp.forEach((x) => {
      imp1.push({ x: x.name, y: x.low });
      imp2.push({ x: x.name, y: x.mid });
      imp3.push({ x: x.name, y: x.high });
      imp4.push(x.name);
    });

    let snt1 = [],
      snt2 = [],
      snt3 = [];

    sent.forEach((x) => {
      if (x.low > 0 || x.high > 0) {
        snt1.push({ x: x.name, y: x.low });
        snt2.push({ x: x.name, y: -x.high });
        snt3.push(x.name);
      }
    });
    setcompany(company.length);
    setbkpi(bimp);
    setskpi(sntkpi);
    setpkpi(ptokpi);
    setclist(arr);
    setklist(inf);
    setNewsVolume([arr2, arr3]);
    setimpact([imp1, imp2, imp3, imp4]);
    setsentiment([snt1, snt2, snt3]);
  }

  useEffect(() => {
    console.log(newsVolume);
  }, [newsVolume]);

  //tabs
  const [activeTab, setActiveTab] = useState("insights");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  //news popup
  const [open, setOpen] = React.useState(false);

  const handleOpenNews = (x) => {
    setOpen(true);
    let organizations = x["Organization(s) Involved"]
      .split(">")
      .map((org) => org.trim());
    let summary = x["News Summary"].split(">").map((org) => org.trim());
    let tech = x["Technology"].split(">").map((org) => org.trim());
    organizations.shift();
    tech.shift();
    summary.shift();
    let obj = {
      source: x["Source Name"],
      date: x["News Date"],
      image: x["News Image URL.1"],
      type: x["News Type"],
      org: x["Organization Name"],
      impact: x["Business Impact "],
      sentiment: x["Business Impact Sentiment"],
      title: x["News Title"],
      body: x["News Body"],
      url: x["News URLs"],
      summary: summary,
      tech: tech,
      inorg: organizations,
      country: x["Country"],
      region: x["Region"],
    };
    setActiveNews(obj);
  };
  const handleCloseNews = () => {
    setOpen(false);
    setActiveNews({
      source: "",
      date: "",
      image: "",
      type: "",
      org: "",
      impact: "",
      sentiment: "",
      title: "",
      body: "",
      url: "",
      summary: [],
      tech: [],
      inorg: [],
      country: "",
      region: "",
    });
  };

  const options = {
    chart: {
      height: 300,
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

  const series = [
    {
      name: "Competitor",
      data: newsVolume[0],
    },
    {
      name: "Non Competitor",
      data: newsVolume[1],
    },
  ];

  const options2 = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        columnWidth: "10px", // Set column width
      },
    },
    xaxis: {
      type: "category",
      categories: impact[3],
      labels: {
        style: {
          fontSize: "9px", // Set font size
        },
      },
    },
    grid: {
      show: false,
      borderColor: "#e0e0e0",
      strokeDashArray: 0, // Remove dashed lines in the grid
    },
    legend: {
      position: "top",
      offsetY: 0,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#8cbf9e", "#ffc857", "#f97061"],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series2 = [
    {
      name: "Low",
      data: impact[0],
    },
    {
      name: "Medium",
      data: impact[1],
    },
    {
      name: "High",
      data: impact[2],
    },
  ];

  const options3 = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        columnWidth: "10px", // Set column width
      },
    },
    xaxis: {
      type: "category",
      categories: sentiment[2],
      labels: {
        style: {
          fontSize: "8px", // Set font size
        },
      },
    },
    grid: {
      show: false,
      borderColor: "#e0e0e0",
      strokeDashArray: 0, // Remove dashed lines in the grid
    },
    legend: {
      position: "top",
      offsetY: 0,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#8cbf9e", "#f97061"],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series3 = [
    {
      name: "Product A",
      data: sentiment[0],
    },
    {
      name: "Product B",
      data: sentiment[1],
    },
  ];

  return (
    <div>
      <SourcingMenu />
      <div
        className="d-flex justify-content-between align-items-end mb-2"
        style={{ gap: "16px", padding: "5px" }}
      >
        <div
          className="d-flex flex-wrap align-items-end"
          style={{ gap: "16px" }}
        >
          {[
            {
              label: "News Type",
              value: newsTypeFilter,
              setValue: setNewsTypeFilter,
              options: newsTypeFilterList || [],
            },
            {
              label: "Organisation",
              value: orgFilter,
              setValue: setOrgFilter,
              options: orgFilterList || [],
            },
            {
              label: "Business Impact",
              value: impFilter,
              setValue: setImpFilter,
              options: impFilterList,
            },
            {
              label: "Sentiment",
              value: sntFilter,
              setValue: setSntFilter,
              options: sntFilterList,
            },
            {
              label: "Country",
              value: cntFilter,
              setValue: setCntFilter,
              options: cntFilterList,
            },
          ].map(({ label, value, setValue, options }, index) => (
            <Form.Group
              key={index}
              className="global-filter-input"
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <Form.Label
                className="global-filter-label"
                style={{ fontSize: "12px" }}
              >
                {label}
              </Form.Label>
              <Form.Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ fontSize: "11px", width: "150px" }}
              >
                <option value="">All</option>
                {options?.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ))}
        </div>

        {/* Reset Button */}
        <Button
          className="btn-theme"
          onClick={resetFilters}
          size="sm"
          style={{
            fontSize: "10px",
            margin: "2px 5px",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
          }}
        >
          Reset
          <MdOutlineRestartAlt
            style={{
              fontSize: "14px",
              marginLeft: "5px",
              paddingBottom: "1px",
            }}
          />
        </Button>
      </div>
      {/* KPI */}
      <Row className="mt-1" style={{ padding: "0px 5px" }}>
        {/* News Article Card */}
        <Col xs={12} md={6} lg={2}>
          <div className="news-kpi">
            <div>
              <p style={{ fontSize: "12px", color: "grey", margin: "0px" }}>
                News Article
              </p>
              <p className="global-kpi-num">{newsTable.length}</p>
            </div>
            <LiaNewspaperSolid
              className="global-kpi-icon"
              style={{
                paddingRight: "10px",
                fontSize: "40px",
                color: "var(--color-main)",
              }}
            />
          </div>
        </Col>

        <Col xs={12} md={6} lg={2}>
          <div className="news-kpi">
            <div>
              <p style={{ fontSize: "12px", color: "grey", margin: "0px" }}>
                Organisation
              </p>
              <p className="global-kpi-num">{company}</p>
            </div>
            <GoOrganization
              className="global-kpi-icon"
              style={{
                paddingRight: "10px",
                fontSize: "40px",
                color: "var(--color-main)",
              }}
            />
          </div>
        </Col>

        <Col xs={12} md={6} lg={2}>
          <div className="news-kpi">
            <div>
              <p style={{ fontSize: "12px", color: "grey", margin: "0px" }}>
                Business Impact
              </p>
              <div className="d-flex">
                <p
                  style={{
                    color: "#7DCEA0 ",
                    margin: "0px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {bkpi[0]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    Low
                  </p>
                </p>
                <p
                  style={{
                    color: "#F8C471",
                    margin: "0px",
                    marginLeft: "15px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {bkpi[1]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    Medium
                  </p>
                </p>
                <p
                  style={{
                    color: "#F58D75",
                    margin: "0px",
                    marginLeft: "15px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {bkpi[2]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    High
                  </p>
                </p>
              </div>
            </div>
            <MdStackedLineChart
              className="global-kpi-icon"
              style={{
                paddingRight: "10px",
                fontSize: "40px",
                color: "var(--color-main)",
              }}
            />
          </div>
        </Col>

        <Col xs={12} md={6} lg={2}>
          <div className="news-kpi">
            <div>
              <p style={{ fontSize: "12px", color: "grey", margin: "0px" }}>
                Sentiment
              </p>
              <div className="d-flex">
                <p
                  style={{
                    color: "#7DCEA0 ",
                    margin: "0px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {skpi[0]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    Positive
                  </p>
                </p>
                <p
                  style={{
                    color: "#F58D75",
                    margin: "0px",
                    marginLeft: "15px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {skpi[1]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    Negative
                  </p>
                </p>
              </div>
            </div>
            <MdOutlineMultilineChart
              className="global-kpi-icon"
              style={{
                paddingRight: "10px",
                fontSize: "40px",
                color: "var(--color-main)",
              }}
            />
          </div>
        </Col>
        <Col xs={12} md={6} lg={2}>
          <div className="news-kpi">
            <div>
              <p style={{ fontSize: "12px", color: "grey", margin: "0px" }}>
                Potential Opportunity
              </p>
              <div className="d-flex">
                <p
                  style={{
                    color: "#7DCEA0 ",
                    margin: "0px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {pkpi[0]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    Yes
                  </p>
                </p>
                <p
                  style={{
                    color: "#F8C471",
                    margin: "0px",
                    marginLeft: "15px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {pkpi[1]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    May be
                  </p>
                </p>
                <p
                  style={{
                    color: "#F58D75",
                    margin: "0px",
                    marginLeft: "15px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {pkpi[2]}
                  <p style={{ fontSize: "8px", color: "grey", margin: "0px" }}>
                    No
                  </p>
                </p>
              </div>
            </div>
            <MdOutlineBubbleChart
              className="global-kpi-icon"
              style={{
                paddingRight: "10px",
                fontSize: "40px",
                color: "var(--color-main)",
              }}
            />
          </div>
        </Col>
      </Row>
      {/* TABS */}
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        id="justify-tab-example"
        justify
        className="global-tabs"
      >
        <Tab eventKey="insights" title="News Insights">
          <Row className="mb-3 mt-1">
            {/* Organisation's Coverage */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white rounded p-3" style={{ height: "300px" }}>
                <h6 className="mb-2" style={{ fontSize: "13px" }}>
                  Organisation's Coverage
                </h6>
                <ListGroup style={{ overflowY: "auto", height: "260px" }}>
                  {clist.map((x, i) => (
                    <ListGroup.Item
                      style={{ border: "none" }}
                      key={i}
                      className="d-flex justify-content-between"
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "50%" }}
                      >
                        <FaBuilding
                          className="me-2"
                          style={{ color: "var(--color-main)" }}
                          size={10}
                        />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 300,
                            color: "var(--color-main)",
                          }}
                        >
                          {x.name}
                        </span>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "50%" }}
                      >
                        <div
                          className="progress w-100 me-2"
                          style={{ height: "10px", borderRadius: "10px" }}
                        >
                          <div
                            // className="progress-bar bg-primary"
                            role="progressbar"
                            style={{
                              width: `${x.count}%`,
                              background: "var(--color-main-light)",
                            }}
                            aria-valuenow={x.count}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <span
                          style={{
                            color: "var(--color-main)",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {x.count}
                        </span>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>

            {/* Key Influencers */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white rounded p-3" style={{ height: "300px" }}>
                <h6 className="mb-2" style={{ fontSize: "13px" }}>
                  Key Influencers
                </h6>
                <ListGroup style={{ overflowY: "auto", height: "260px" }}>
                  {klist.map((x, i) => (
                    <ListGroup.Item
                      key={i}
                      style={{ border: "none" }}
                      className="d-flex justify-content-between"
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "50%" }}
                      >
                        <FaUser
                          className=" me-2"
                          style={{ color: "var(--color-main)" }}
                          size={10}
                        />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 300,
                            color: "var(--color-main)",
                          }}
                        >
                          {x.name}
                        </span>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ width: "50%" }}
                      >
                        <div
                          style={{
                            width: `${x.count * 1.2}%`,
                            borderTop: "1px dashed var(--color-main)",
                            height: "10px",
                            marginTop: "11px",
                          }}
                        ></div>
                        <span className="text-primary mx-0">
                          <MdOutlineArrowRight
                            style={{
                              padding: "0px",
                              color: "var(--color-main)",
                              paddingBottom: "2px",
                              fontSize: "20px",
                              margin: "0px",
                            }}
                          />
                        </span>
                        <div
                          className="rounded-circle text-white d-flex justify-content-center align-items-center"
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "var(--color-main-light)",
                            fontSize: "12px",
                          }}
                        >
                          {x.count}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
            {/* NEWS VOLUME */}
            <Col xs={12} md={6} lg={4}>
              <div className="bg-white rounded p-3" style={{ height: "300px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  News Volume
                </p>
                <Chart
                  options={options}
                  series={series}
                  type="line"
                  height={260}
                />
              </div>
            </Col>

            {/* BUSINESS IMPACT CHART */}
            <Col className="mt-3" xs={12} md={6} lg={6}>
              <div className="bg-white rounded p-3" style={{ height: "400px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  Business Impact by News Type
                </p>
                <Chart
                  options={options2}
                  series={series2}
                  type="bar"
                  height={380}
                />
              </div>
            </Col>
            {/* Sentiment CHARTS */}
            <Col className="mt-3" xs={12} md={6} lg={6}>
              <div className="bg-white rounded p-3" style={{ height: "400px" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "2px",
                  }}
                >
                  Sentiment by News Type
                </p>
                <Chart
                  options={options3}
                  series={series3}
                  type="bar"
                  height={380}
                />
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="studies" title="News Studies">
          <Row className="mt-1" style={{ padding: "0px 5px" }}>
            {/* News Studies Card */}
            {newsTable.map((x) => {
              return (
                <Col xs={12} md={6} lg={3} className="mt-3 text-start">
                  <div
                    style={{
                      background: "white",
                      width: "100%",
                      height: "300px",
                      borderRadius: "5px",
                      overflow: "hidden",
                      boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleOpenNews(x);
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "130px",
                        marginBottom: "10px",
                      }}
                      src={x["News Image URL.1"]}
                      alt=""
                    />
                    <div style={{ padding: "10px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--color-main)",
                          margin: "0px",
                        }}
                      >
                        {x["Source Name"]}
                      </p>
                      <p
                        style={{
                          fontSize: "9px",
                          color: "grey",
                          margin: "0px",
                          marginTop: "5px",
                        }}
                      >
                        {x["News Date"].slice(0, 10)}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          marginTop: "5px",
                          marginBottom: "5px",
                          color: "var(--color-main)",
                        }}
                      >
                        {x["News Title"]}
                      </p>
                      <p style={{ fontSize: "8px", color: "grey" }}>
                        {x["News Body"].slice(0, 150)}
                        {x["News Body"].length <= 150 ? (
                          <span></span>
                        ) : (
                          <span>..</span>
                        )}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          {/* NWS POPUP */}

          <Modal show={open} onHide={handleCloseNews} size="lg" centered>
            <Modal.Header style={{ padding: "7px 15px" }} closeButton>
              <Modal.Title
                style={{ fontSize: "14px", padding: "0px", fontWeight: 600 }}
              >
                News Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  <Card
                    style={{
                      background: "white",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <Row className="mb-2">
                      <Col xs={1}>
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            background: "var(--color-main)",
                            borderRadius: "50%",
                            color: "white",
                            textAlign: "center",
                            lineHeight: "30px",
                          }}
                        >
                          {activeNews.source.slice(0, 1)}
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <p style={{ fontSize: "12px", margin: 0 }}>
                            {activeNews.source}
                          </p>
                          <p
                            style={{
                              fontSize: "9px",
                              color: "grey",
                              margin: 0,
                            }}
                          >
                            {activeNews.date.slice(0, 10)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <img
                      src={activeNews.image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "300px",
                        marginBottom: "10px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--color-main)",
                        fontWeight: 600,
                      }}
                    >
                      {activeNews.title}
                    </p>
                    <div style={{ height: "200px", overflowY: "auto" }}>
                      <p style={{ color: "grey", fontSize: "9px" }}>
                        {activeNews.body}
                      </p>
                    </div>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Header
                      style={{
                        background: "var(--color-main-light)",
                        color: "white",
                        fontSize: "13px",
                        padding: "3px 10px",
                      }}
                    >
                      Details
                    </Card.Header>
                    <ListGroup style={{ fontSize: "11px" }} variant="flush">
                      <ListGroup.Item>
                        <strong
                          style={{
                            color: "var(--color-main)",
                          }}
                        >
                          News Type:
                        </strong>{" "}
                        <span style={{ color: "#4B94DC" }}>
                          {activeNews.type}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong style={{ color: "var(--color-main)" }}>
                          Business Impact:
                        </strong>{" "}
                        <span
                          style={{
                            color:
                              activeNews.impact === "High Impact"
                                ? "#E55454"
                                : activeNews.impact === "Low Impact"
                                ? "#5CC850"
                                : "#E5C168",
                          }}
                        >
                          {activeNews.impact}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong style={{ color: "var(--color-main)" }}>
                          Sentiment:
                        </strong>{" "}
                        <span
                          style={{
                            color:
                              activeNews.sentiment === "Negative Impact"
                                ? "#E55454"
                                : activeNews.sentiment === "Positive Impact"
                                ? "#7AE46E"
                                : "#E5C168",
                          }}
                        >
                          {activeNews.sentiment}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong style={{ color: "var(--color-main)" }}>
                          Organisation:
                        </strong>{" "}
                        {activeNews.org}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong style={{ color: "var(--color-main)" }}>
                          Country:
                        </strong>{" "}
                        {activeNews.country}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong style={{ color: "var(--color-main)" }}>
                          Region:
                        </strong>{" "}
                        {activeNews.region}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                  <Card className="mt-3">
                    <Card.Header
                      style={{
                        background: "var(--color-main-light)",
                        color: "white",
                        fontSize: "13px",
                        padding: "3px 10px",
                      }}
                    >
                      Organisations Involved
                    </Card.Header>
                    <ListGroup style={{ fontSize: "11px" }} variant="flush">
                      {activeNews.inorg.map((org, index) => (
                        <ListGroup.Item key={index}>● {org}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                  <Card className="mt-3">
                    <Card.Header
                      style={{
                        background: "var(--color-main-light)",
                        color: "white",
                        fontSize: "13px",
                        padding: "3px 10px",
                      }}
                    >
                      Technologies
                    </Card.Header>
                    <ListGroup style={{ fontSize: "11px" }} variant="flush">
                      {activeNews.tech.map((tech, index) => (
                        <ListGroup.Item key={index}>● {tech}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                  <Card className="mt-3">
                    <Card.Header
                      style={{
                        background: "var(--color-main-light)",
                        color: "white",
                        fontSize: "13px",
                        padding: "3px 10px",
                      }}
                    >
                      News Summary
                    </Card.Header>
                    <ListGroup
                      variant="flush"
                      style={{
                        height: "160px",
                        overflowY: "scroll",
                        fontSize: "11px",
                      }}
                    >
                      {activeNews.summary.map((summary, index) => (
                        <ListGroup.Item key={index}>● {summary}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Tab>
      </Tabs>
    </div>
  );
};

export default NewsDashboard;
