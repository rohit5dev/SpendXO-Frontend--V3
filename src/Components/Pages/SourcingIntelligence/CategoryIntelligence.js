//REACT
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
//REACT BOOTSTRAP
import { Dropdown, DropdownButton, Container, Button } from "react-bootstrap";
//OTHER
import apiUrls from "../../../Config/apiUrls";
import SourcingMenu from "./SourcingMenu";
import axios from "axios";
import { requestHeader } from "../../Helper/Constants/constant";
import { formatDate } from "../../../Config/formatDate";

const CategoryIntelligence = (props) => {
  const { categoryName, sectionName, reportName } = useParams();

  //STATE
  const [categoryReport, setCategoryReport] = useState([]);
  const [categoryReportList, setCategoryReportList] = useState([]);
  const [category, setCategory] = useState("");
  const [section, setSection] = useState("");
  const [name, setName] = useState("");
  const [tab, setTab] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [categoryNews, setCategoryNews] = useState([]);

  //LOAD CATEGORY LIST
  function handleLoadList(data, categoryName, sectionName) {
    let sec = [],
      nm = [];
    data.forEach((x) => {
      if (x.Category === categoryName) {
        if (!sec.some((z) => z === x.Section)) sec.push(x.Section);
        if (x.Section === sectionName) {
          if (!nm.some((z) => z === x.Name)) nm.push(x.Name);
        }
      }
    });
    setSectionList(sec);
    setNameList(nm);
  }

  //CATEGORY REPORT LOAD
  const dataLoad = async (categoryName, sectionName, reportName) => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/category-report?Category=${categoryName}&Section=${sectionName}&Name=${reportName}`,
        requestHeader.json
      );
      let reportData = response.data?.result[0].Insights;
      if (reportData) reportData = JSON.parse(reportData);
      console.log(reportData);
      setCategoryReport(reportData);
      //set tab list
      const t = [];
      reportData.forEach((x, i) => {
        if (i === 0) {
          setTab(x.name);
          setActiveLink(x.link);
        }
        t.push(x.name);
      });
      setTabList(t);
      console.log("Report Data Loaded");
    } catch (error) {
      console.error("Error loading menu data:", error);
    }
  };

  //CATEGORY NEWS LOAD
  const newsLoad = async (sectionName) => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/sourcing-news?NewsType=Category&Section=${sectionName}`,
        requestHeader.json
      );
      let newsData = response.data?.news;
      setCategoryNews(newsData);
      console.log("Category News Loaded");
    } catch (error) {
      console.error("Error loading menu data:", error);
    }
  };

  const optionLoad = async (categoryName, sectionName) => {
    try {
      const response = await axios.get(
        `${
          apiUrls.urlPrefix
        }/sourcing-menu?isCategory=${true}&isCommodity=${false}`,
        requestHeader.json
      );
      let optionData = response.data?.result?.categoryList[0];
      setCategoryReportList(optionData);
      handleLoadList(optionData, categoryName, sectionName);
      console.log("Category Menu Data Loaded");
    } catch (error) {
      console.error("Error loading menu data:", error);
    }
  };

  useEffect(() => {
    setCategory(categoryName);
    setSection(sectionName);
    setName(reportName);
    //load report
    dataLoad(categoryName, sectionName, reportName);
    optionLoad(categoryName, sectionName);
    newsLoad(sectionName);
  }, [categoryName, sectionName, reportName]);

  //FULL SCREEN IFRAME
  const iframeRef = useRef();
  const handleFullscreen = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  //CATEGORY CHANGE
  const handleChangeCategory = (val) => {
    setTab("");
    setActiveLink("");
    setTabList([]);
    setCategory(val);
    let l1 = [],
      l2 = [];
    let sectionName = "";
    categoryReportList.forEach((x) => {
      if (x.Category === val) {
        if (!l1.some((z) => z === x.Section)) {
          if (l1.length === 0) sectionName = x.Section;
          l1.push(x.Section);
        }
        if (x.Section === sectionName) l2.push(x.Name);
      }
    });
    setSectionList(l1);
    setNameList(l2);
    setSection(l1[0]);
    setName(l2[0]);
    dataLoad(val, l1[0], l2[0]);
    newsLoad(l1[0]);
    newsLoad(l1[0]);
  };

  //SECTION CHNAGE
  const handleChangeSection = (sectionName) => {
    setTab("");
    setActiveLink("");
    setTabList([]);
    setSection(sectionName);
    let l1 = [];
    categoryReportList.forEach((x) => {
      if (x.Category === category && x.Section === sectionName) {
        l1.push(x.Name);
      }
    });
    setName(l1[0]);
    setNameList(l1);
    dataLoad(category, sectionName, l1[0]);
    newsLoad(sectionName);
  };

  //NAME CHANGE
  const handleChangeName = (name) => {
    setTab("");
    setActiveLink("");
    setTabList([]);
    setName(name);
    dataLoad(category, section, name);
  };

  // TAB CHANGE
  const handleChangeTab = (tabName) => {
    const data = categoryReport.filter((x) => x.name === tabName);
    setActiveLink(data[0].link);
    setTab(tabName);
  };

  return (
    <Container fluid style={{ padding: "5px" }}>
      <SourcingMenu />
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        <div
          style={{
            padding: "5px",
            marginTop: "5px",
            background: "white",
            width: "70%",
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <DropdownButton
              variant="outline-secondary"
              size="sm"
              title={category}
              onSelect={handleChangeCategory}
            >
              <Dropdown.Item style={{ fontSize: "12px" }} eventKey={"Direct"}>
                Direct
              </Dropdown.Item>
              <Dropdown.Item style={{ fontSize: "12px" }} eventKey={"Indirect"}>
                Indirect
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="outline-secondary"
              size="sm"
              title={section}
              onSelect={handleChangeSection}
            >
              {sectionList.map((item) => (
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
              title={tab}
              onSelect={handleChangeTab}
            >
              {tabList.map((item) => (
                <Dropdown.Item style={{ fontSize: "12px" }} eventKey={item}>
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Button
              size="sm"
              className="btn-theme"
              style={{ fontSize: "12px" }}
              onClick={handleFullscreen}
            >
              Fullscreen
            </Button>
          </div>
          {/* IFRAME */}
          <div style={{ marginTop: "10px" }}>
            {activeLink !== "" ? (
              <iframe
                ref={iframeRef}
                title="Category Report"
                src={activeLink}
                width="100%"
                height="500px"
              ></iframe>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "var(--color-main-light)",
                  alignContent: "center",
                }}
              >
                No report available
              </div>
            )}
          </div>
        </div>
        {/* NEWS  */}
        <div style={{ width: "30%", padding: "10px 5px" }}>
          <h5 style={{ fontSize: "15px", textAlign: "left" }}>Category News</h5>
          <div style={{ height: "500px", overflow: "auto" }}>
            {categoryNews.map((x) => {
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
    </Container>
  );
};

export default CategoryIntelligence;
