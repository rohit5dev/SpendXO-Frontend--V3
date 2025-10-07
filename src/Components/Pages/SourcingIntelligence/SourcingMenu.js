//REACT
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//REACT-BOOTSTRAP
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
//AXIOS
import axios from "axios";
//OTHER
import apiUrls from "../../../Config/apiUrls";
import { requestHeader } from "../../Helper/Constants/constant";
//CSS
import "../../Helper/css/Navbar.css";

const SourcingMenu = () => {
  //NAVIGATE
  const navigate = useNavigate();
  //STATES
  const [directList, setDirectList] = useState([]);
  const [indirectList, setIndirectList] = useState([]);
  const [comList, setComList] = useState([]);
  //DATA LOADING
  useEffect(() => {
    const dataLoad = async () => {
      try {
        const response = await axios.get(
          `${
            apiUrls.urlPrefix
          }/sourcing-menu?isCategory=${true}&isCommodity=${true}`,
          requestHeader.json
        );
        menuResponse(response); // Assuming menuResponse is a function that handles the response data
        console.log("Menu Data Loaded");
      } catch (error) {
        console.error("Error loading menu data:", error);
      }
    };

    dataLoad();
  }, []); // Empty dependency array ensures the effect runs only once

  //RESPONSE FUNCTION
  function menuResponse(res) {
    const { categoryList, commodityList } = res.data.result;
    const directSectionGroup = [];
    const indirectSectionGroup = [];
    const commodityGroup = [];

    // CATEGORY DROPDOWN - GROUP BY SECTION
    categoryList[0].forEach((item) => {
      const targetGroup =
        item.Category === "Direct" ? directSectionGroup : indirectSectionGroup;
      const sectionIndex = targetGroup.findIndex(
        (group) => group.section === item.Section
      );

      if (sectionIndex !== -1) {
        targetGroup[sectionIndex].report.push(item.Name);
      } else {
        targetGroup.push({
          category: item.Category,
          section: item.Section,
          report: [item.Name],
        });
      }
    });

    setDirectList(directSectionGroup);
    setIndirectList(indirectSectionGroup);

    // COMMODITY GROUP - FOR DROPDOWN
    commodityList[0].forEach((item) => {
      const groupIndex = commodityGroup.findIndex(
        (group) => group.group === item["Commodity Group"]
      );

      if (groupIndex !== -1) {
        // Ensure the commodity name is not already present
        if (!commodityGroup[groupIndex].name.includes(item["Commodity Name"])) {
          commodityGroup[groupIndex].name.push(item["Commodity Name"]);
        }
      } else {
        commodityGroup.push({
          group: item["Commodity Group"],
          name: [item["Commodity Name"]],
        });
      }
    });
    setComList(commodityGroup);
  }

  //HANDLE CATEGORY NAVIGATION
  const handleCategoryNavigation = (category, section, name) => {
    navigate(`/category-intelligence/${category}/${section}/${name}`);
  };

  //HANDLE COMMODITY NAVIGATION
  const handleCommodityNavigation = (group, name) => {
    navigate(`/commodity/${group}/${name}`);
  };

  //START RENDER
  return (
    <Navbar
      style={{ marginTop: "10px" }}
      bg="light"
      expand="lg"
      className="navbar"
    >
      <Navbar.Brand
        className="head-theme"
        style={{
          cursor: "pointer",
          fontSize: "14px",
          color: "var(--color-main)",
        }}
        onClick={() => navigate("/sourcing-intelligence")}
      >
        Sourcing Intelligence
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        style={{ fontSize: "11px", marginLeft: "5%" }}
        id="basic-navbar-nav"
      >
        <Nav className="ml-auto">
          <NavDropdown
            style={{ fontSize: "11px" }}
            title="Category"
            id="category-dropdown"
          >
            <NavDropdown
              style={{ fontSize: "11px", paddingLeft: "10px" }}
              title="Direct"
              id="direct-dropdown"
            >
              {directList.map((x) => (
                <NavDropdown
                  style={{ fontSize: "11px", paddingLeft: "10px" }}
                  title={x.section}
                  id={x.section}
                  key={x.section}
                >
                  {x.report.map((z) => (
                    <NavDropdown.Item
                      style={{ fontSize: "11px", paddingLeft: "10px" }}
                      key={z}
                      onClick={() =>
                        handleCategoryNavigation("Direct", x.section, z)
                      }
                    >
                      {z}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </NavDropdown>
            <NavDropdown
              style={{ fontSize: "11px", paddingLeft: "10px" }}
              title="Indirect"
              id="indirect-dropdown"
            >
              {indirectList.map((x) => (
                <NavDropdown
                  style={{ fontSize: "11px", paddingLeft: "10px" }}
                  title={x.section}
                  id={x.section}
                  key={x.section}
                >
                  {x.report.map((z) => (
                    <NavDropdown.Item
                      style={{ fontSize: "11px", paddingLeft: "10px" }}
                      key={z}
                      onClick={() =>
                        handleCategoryNavigation("Indirect", x.section, z)
                      }
                    >
                      {z}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </NavDropdown>
          </NavDropdown>

          <NavDropdown
            style={{ fontSize: "11px", paddingLeft: "10px" }}
            title="Commodity"
            id="commodity-dropdown"
          >
            <NavDropdown.Item
              style={{ fontSize: "11px" }}
              onClick={() => navigate("/commodity-forecast")}
            >
              Commodity Forecast
            </NavDropdown.Item>
            <NavDropdown
              style={{ fontSize: "11px", paddingLeft: "10px" }}
              title="Commodity Groups"
              id="commodity-groups"
            >
              {comList.map((x) => (
                <NavDropdown
                  style={{ fontSize: "11px", paddingLeft: "10px" }}
                  title={x.group}
                  id={x.group}
                  key={x.group}
                >
                  {x.name.map((z) => (
                    <NavDropdown.Item
                      style={{ fontSize: "11px", paddingLeft: "10px" }}
                      key={z}
                      onClick={() => handleCommodityNavigation(x.group, z)}
                    >
                      {z}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </NavDropdown>
          </NavDropdown>

          <NavDropdown
            style={{ fontSize: "11px" }}
            title="Supplier"
            id="supplier-dropdown"
          >
            <NavDropdown.Item
              style={{ fontSize: "11px" }}
              onClick={() => navigate("/supplier")}
            >
              Supplier Profile
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ fontSize: "11px" }}
              onClick={() => navigate("/supplier-intelligence")}
            >
              Supplier Intelligence
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            style={{ fontSize: "11px" }}
            title="News"
            id="news-dropdown"
          >
            <NavDropdown.Item
              style={{ fontSize: "11px" }}
              onClick={() => navigate("/news-dashboard")}
            >
              News Dashboard
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SourcingMenu;
