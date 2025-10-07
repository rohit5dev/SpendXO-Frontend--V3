import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap"; // Import Form for the switch
import { categoryOverviewData } from "../../Data/categoryOverviewData.js";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import countriesData from "../../../../Helper/Constants/countries.json";
import { countryCodes } from "../../../../Helper/Constants/constant.js";

// ICONS
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";

const FSCommodityOverviewTab = () => {
  const [geoFilter, setGeoFilter] = useState("export"); // State to toggle between import and export

  // Map Chart States
  const [locations, setLocations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [modalData, setModalData] = useState(null); // Add state for modal data

  const openModal = (data) => {
    const code = countryCodes[data.country]; // Get country code dynamically
    const lowerCaseCode = code?.toLowerCase();
    const flagUrl = lowerCaseCode
      ? `https://flagcdn.com/w40/${lowerCaseCode}.png`
      : ""; // Generate flag URL dynamically

    setModalData({ ...data, flagUrl }); // Add flag URL to modalData
  };

  const closeModal = () => setModalData(null); // Function to close the modal

  useEffect(() => {
    // Update map data based on selected filter
    const selectedData = categoryOverviewData.geographicalTrends[geoFilter];
    const locationsWithCoordinates = selectedData.map((country) => {
      const countryInfo = countriesData.find(
        (data) => data.name === country.Country
      );

      if (countryInfo) {
        return {
          name: country.Country,
          position: countryInfo.coordinates,
          qty: country.Qty,
          color: "var(--color-red)", // Different colors for export and import
        };
      } else {
        console.warn(`Coordinates not found for ${country.Country}`);
        return null;
      }
    });

    setLocations(
      locationsWithCoordinates.filter((location) => location !== null)
    );
  }, [geoFilter]); // Re-run when geoFilter changes

  // Helper function to scale bubble sizes dynamically based on zoom level
  const getBubbleSize = (qty) => {
    const maxQty = Math.max(...locations.map((data) => data.qty)); // Use locations data
    const minRadius = 5;
    const maxRadius = 25;

    // Adjust bubble size based on quantity
    return (qty / maxQty) * (maxRadius - minRadius) + minRadius;
  };

  // Custom hook to listen to zoom level changes
  function ZoomListener() {
    const map = useMap();
    useEffect(() => {
      const onZoom = () => {
        setZoomLevel(map.getZoom());
      };
      map.on("zoomend", onZoom);
      return () => {
        map.off("zoomend", onZoom);
      };
    }, [map]);

    return null;
  }

  // TABLE STYLE
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


  // China Flag
  const code = countryCodes["China"]; 
  const lowerCaseCode = code?.toLowerCase();
  const chinaFlagUrl = lowerCaseCode
    ? `https://flagcdn.com/w40/${lowerCaseCode}.png`
    : ""; 

  return (
    <div className="commodity-data">
      {/* ################# Level 1 #################### */}
      <div className="row g-2">
        {/* KPIs */}
        <div className="col-6 ">
          {" "}
          <div>
            <div className="d-flex gap-2 ">
              {/* Current Price Card */}
              <div className="card d-flex flex-column rounded-3 p-2 w-100">
                <p className="head-theme">Current Price*</p>

                <div className="d-flex justify-content-between  px-2">
                  <div className="text-start">
                    <p
                      className="global-kpi-num text-start pt-2 "
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      ₹ 54,100
                    </p>
                    <p className="global-kpi-name">per tonne</p>
                  </div>
                  <div className="">
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
                <div>
                  <hr
                    className="p-0 mb-0"
                    style={{ color: "rgba(0, 0, 0, 0.5)" }}
                  />
                  <p
                    className=" p-0 m-0 text-secondary"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Last Updated : April 2025
                  </p>
                </div>
              </div>

              {/*  Current Market Size Card */}
              <div className="card d-flex flex-column rounded-3 p-2 w-100">
                <p className="head-theme">Current Market Size</p>

                <div className="d-flex justify-content-between  px-2">
                  <div className="text-start">
                    <p
                      className="global-kpi-num text-start pt-2"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      ₹ 43.4
                    </p>
                    <p className="global-kpi-name">Lakh Cr.</p>
                  </div>
                  <div className="">
                    <p className="kpi-secondary-title mt-2">
                      <span
                        className="kpi-secondary-data-1"
                        style={{ fontSize: "16px" }}
                      >
                        <FaArrowUp size={12} className="me-1" />
                        8.4%
                      </span>{" "}
                      <br />
                      CAGR
                    </p>
                    <p className="kpi-secondary-title mt-1">
                      <span
                        className="global-kpi-num"
                        style={{ fontSize: "16px" }}
                      >
                        ₹ 8.9 <span style={{ fontSize: "10px" }}>Lakh Cr.</span>
                      </span>{" "}
                      <br />
                      Forecasted (2030)
                    </p>
                  </div>
                </div>
                <div>
                  <hr
                    className="p-0 mb-0"
                    style={{ color: "rgba(0, 0, 0, 0.5)" }}
                  />
                  <p
                    className=" p-0 m-0 text-secondary"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Last Updated : April 2025
                  </p>
                </div>
              </div>

              <div className="card rounded-3 p-3 w-100 d-flex flex-column align-items-start">
                <p className="head-theme ">Key Global Players</p>
                <div className="d-flex flex-column align-items-start">
                  {categoryOverviewData?.executiveSummary?.keyPlayers?.companies.map(
                    (data) => (
                      <li className="global-font p-0 m-0">{data}</li>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* TOP Consumer , Producers, Players */}
            <div className="d-flex gap-2 mt-2">
              <div className="card rounded-3 p-2 w-100 d-flex flex-column ">
                <p className="head-theme ">Global Steel Production (2023)​</p>

                <div className="d-flex flex-column justify-content-center px-2 align-items-center">
                  <p
                    className="global-kpi-num"
                    style={{
                      fontSize: "clamp(18px, 2vw, 20px)",
                      fontWeight: "bold",
                    }}
                  >
                    188 Cr.
                  </p>
                  <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                    Tonnes
                  </p>
                </div>
              </div>

              <div className="card rounded-3 p-2 w-100 d-flex flex-column ">
                <p className="head-theme ">Global Steel Consumption (2024)​​</p>

                <div className="d-flex flex-column justify-content-center px-2 align-items-center">
                  <p
                    className="global-kpi-num"
                    style={{
                      fontSize: "clamp(18px, 2vw, 20px)",
                      fontWeight: "bold",
                    }}
                  >
                    179.2 Cr.
                  </p>
                  <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                    Tonnes
                  </p>
                </div>
              </div>

              <div className="card rounded-3 p-3 w-100 d-flex flex-column ">
                <p className="head-theme ">Top Steel Producer</p>

                <div className="d-flex flex-column justify-content-center px-2 align-items-center">
                  <div className="d-flex justify-content-center align-items-center">
                    {" "}
                    <img
                      src={chinaFlagUrl}
                      alt="China Flag"
                      style={{ width: 20, height: 14, marginRight: 6 }}
                    />
                    <p
                      className="global-kpi-num"
                      style={{
                        fontSize: "clamp(18px, 2vw, 20px)",
                        fontWeight: "bold",
                      }}
                    >
                      China
                    </p>
                  </div>
                  <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                    101.91 Cr. Tonnes
                  </p>
                </div>
              </div>
              <div className="card rounded-3 p-3 w-100 d-flex flex-column ">
                <p className="head-theme ">Top Steel Consumer</p>

                <div className="d-flex flex-column justify-content-center px-2 align-items-center">
                 <div className="d-flex justify-content-center align-items-center">
                    {" "}
                    <img
                      src={chinaFlagUrl}
                      alt="China Flag"
                      style={{ width: 20, height: 14, marginRight: 6 }}
                    />
                    <p
                      className="global-kpi-num"
                      style={{
                        fontSize: "clamp(18px, 2vw, 20px)",
                        fontWeight: "bold",
                      }}
                    >
                      China
                    </p>
                  </div>
                  <p className="global-kpi-name" style={{ color: "#74a3a2" }}>
                    188 Cr. Tonnes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Definitions */}
        <div className="col-6">
          <div
            className="card rounded-3 p-2 bg-white"
            style={{ minHeight: "120px" }}
          >
            <p className="head-theme text-start">Definition</p>

            <p className="global-font rs-text-justify">
              Hot Rolled Coil (HRC) is a fundamental flat steel product,
              produced by rolling slabs at high temperatures. It is a strategic
              input material across infrastructure, automotive, construction,
              and capital goods. As the most actively traded steel benchmark
              globally, HRC prices directly influence procurement strategies for
              a wide range of steel-intensive industries.
            </p>
          </div>
          <div
            className="card rounded-3 p-2 bg-white mt-2"
            style={{ minHeight: "130px" }}
          >
            <p className="head-theme text-start">
              Position in Global Supply Chain
            </p>
            <p className="global-font rs-text-justify">
              <strong>● Intermediate Material: </strong>
              HRC is an upstream product used to manufacture CRC, galvanized
              steel, pipes, and structural components.
              <br />
              <strong>● Trade-Exposed: </strong>
              It is widely exported, priced in spot and futures markets, and
              sensitive to global trade dynamics, cost inflation, and
              geopolitical shif
            </p>
          </div>
        </div>
      </div>

      {/* ################# Level 2 #################### */}

      <div className="row g-2">
        {" "}
        <div className="col-8">
          {/* Map chart */}
          <div className="card p-2 pt-3 rounded-3 mt-2 w-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="head-theme">Geographical Trends</p>

              <Dropdown onSelect={(key) => setGeoFilter(key)}>
                <Dropdown.Toggle variant="light" size="sm">
                  {geoFilter.charAt(0).toUpperCase() + geoFilter.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="export">Export</Dropdown.Item>
                  <Dropdown.Item eventKey="import">Import</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="row g-2">
              <div className="col-3">
                {" "}
                {/* Geographical Trends Data in a tabular form */}
                <div
                  className="table-container pe-1"
                  style={{ maxHeight: "245px", overflowY: "auto" }}
                >
                  <table className="table table-bordered table-sm m-0">
                    <thead>
                      <tr>
                        <th
                          className="p-1 text-start py-2"
                          style={{
                            ...defaultStyleHead,
                            fontSize: "10px",
                          }}
                        >
                          Country
                        </th>
                        <th
                          className="p-1 text-start"
                          style={{
                            ...defaultStyleHead,
                            fontSize: "10px",
                          }}
                        >
                          Total {geoFilter === "export" ? "Exports" : "Imports"}{" "}
                          (MT)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryOverviewData.geographicalTrends[geoFilter].map(
                        (country, index) => (
                          <tr key={index}>
                            <td
                              className="p-0 px-1"
                              style={{
                                ...defaultStyles,
                                fontSize: "10px",
                              }}
                            >
                              {country.Country}
                            </td>
                            <td
                              className="p-0 px-1"
                              style={{
                                ...defaultStyles,
                                fontSize: "10px",
                              }}
                            >
                              {country.Qty.toLocaleString()}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col">
                <div
                  className="map-container "
                  style={{ height: "250px", width: "100%" }}
                >
                  <MapContainer
                    center={[20, 0]} // Center of the map (World view)
                    zoom={zoomLevel}
                    style={{ height: "100%", width: "100%" }}
                    worldCopyJump={true}
                    maxBounds={[
                      [-90, -180], // Southwest corner
                      [90, 180], // Northeast corner
                    ]}
                    attributionControl={false} // Disable attribution control
                  >
                    {/* map link */}
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    <ZoomListener />
                    {locations.map((location, index) => (
                      <CircleMarker
                        key={index}
                        center={location.position}
                        radius={getBubbleSize(location.qty)} // Dynamic bubble size based on quantity
                        fillColor={location.color} // Color based on filter
                        color="none"
                        fillOpacity={0.4}
                        stroke={true}
                      >
                        <Tooltip
                          direction="top"
                          offset={[0, -5]}
                          opacity={1}
                          interactive={true} // Allow interaction to ensure visibility
                          permanent={false} // Tooltip will appear on hover
                        >
                          <div>
                            <b>{location.name}</b>
                            <br />
                            Qty: {location.qty.toLocaleString()} MT
                          </div>
                        </Tooltip>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-2 pt-3 rounded-3 mt-2 mb-2">
            <p className="head-theme">
              Global Market Outlook & Trade Risks by Region​
            </p>
            <div
              className="d-flex flex-column justify-content-between overflow-auto my-2 pe-1"
              style={{ maxHeight: "245px", overflowY: "auto" }}
            >
              {categoryOverviewData?.globalTrends?.map((data, index) => {
                const code = countryCodes[data.country]; // Get country code dynamically
                const lowerCaseCode = code?.toLowerCase();
                const flagUrl = lowerCaseCode
                  ? `https://flagcdn.com/w40/${lowerCaseCode}.png`
                  : ""; // Generate flag URL dynamically

                return (
                  <div
                    key={index}
                    className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 mt-2"
                  >
                    <div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          {flagUrl && (
                            <img
                              src={flagUrl}
                              alt={`${data.country} flag`}
                              style={{ width: 20, height: 14, marginRight: 6 }}
                            />
                          )}
                          <p className="head-theme p-0 m-0">{data.country}</p>
                        </div>
                        <p className="global-font fw-bold p-0 m-0 text-secondary">
                          # {data.categorization}
                        </p>
                      </div>
                      <p
                        className="global-font mb-0 rs-text-justify"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxHeight: "4.5em",
                          lineHeight: "1.5em", // Add consistent line height
                          minHeight: "4.5em", // Ensure consistent height
                          wordBreak: "break-word", // Handle long words
                        }}
                      >
                        {data.strategicMarketAnalysis}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <p
                        className="global-font p-0 m-0 rounded-4 px-2"
                        style={{
                          backgroundColor: "var(--color-main-light2)",
                        }}
                      >
                        {data.badge}
                      </p>
                      <div>
                        <IoIosLink
                          onClick={() => window.open(data.sourceURL, "_blank")}
                          style={{ cursor: "pointer" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Open source article"
                          size={14}
                        />
                        <LuSquareArrowOutUpRight
                          className="me-2 ms-2"
                          onClick={() => openModal(data)}
                          style={{ cursor: "pointer" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Expand"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Modal for full description */}
        {modalData && (
          <div
            className="modal show d-block"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Center the modal
              zIndex: 1050,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a semi-transparent background
            }}
          >
            <div className="modal-dialog mt-5">
              <div
                className=" modal-content global-dashed-card d-flex flex-column justify-content-between rounded-4 p-3"
                style={{ backgroundColor: "#e0eeef" }}
              >
                <div className="text-end">
                  <button
                    className="btn-close"
                    onClick={closeModal}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Close"
                  />
                </div>
                <div>
                  <div className="d-flex justify-content-start align-items-center">
                    {modalData.flagUrl && (
                      <img
                        src={modalData.flagUrl}
                        alt={`${modalData.country} flag`}
                        style={{ width: 24, height: 16, marginRight: 8 }}
                      />
                    )}
                    <p className="head-theme p-0 m-0">{modalData.country}</p>
                  </div>
                  <p className="global-font mb-0 rs-text-justify">
                    {modalData.strategicMarketAnalysis}
                  </p>
                  <div className="d-flex justify-content-between mt-2 ">
                    <p className="global-font fw-bold p-0 m-0">
                      # {modalData.categorization}
                    </p>
                    <p
                      className="global-font p-0 m-0 rounded-4 px-2 "
                      style={{
                        backgroundColor: "var(--color-bg-yellow)",
                      }}
                    >
                      {modalData.badge}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FSCommodityOverviewTab;
