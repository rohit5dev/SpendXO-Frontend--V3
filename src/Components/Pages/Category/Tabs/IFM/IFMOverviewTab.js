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
import ReactApexChart from "react-apexcharts";

// ICONS
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { IFMTabsData } from "../../Data/IFMTabsData.js";

const CommodityOverviewTab = () => {
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
    const selectedData = IFMTabsData.ifm_spend_data;
    const locationsWithCoordinates = selectedData.map((IFMData) => {
      const countryInfo = countriesData.find(
        (data) => data.name === IFMData.region
      );

      if (countryInfo) {
        return {
          name: IFMData.region,
          position: countryInfo.coordinates,
          annual_spend: IFMData.annual_spend,
          color: "var(--color-red)", // Different colors for export and import
        };
      } else {
        console.warn(`Coordinates not found for ${IFMData.region}`);
        return null;
      }
    });

    setLocations(
      locationsWithCoordinates.filter((location) => location !== null)
    );
  }, []); // Re-run when geoFilter changes

  // Helper function to scale bubble sizes dynamically based on zoom level
  const getBubbleSize = (annual_spend) => {
    const maxQty = Math.max(...locations.map((data) => data.annual_spend)); // Use locations data
    const minRadius = 5;
    const maxRadius = 25;

    // Adjust bubble size based on quantity
    return (annual_spend / maxQty) * (maxRadius - minRadius) + minRadius;
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

  // Pie chart
  const [IFMSpendBreakDown, setIFMSpendBreakDown] = useState({
    series: [45, 30, 20, 5],
    options: {
      labels: [
        "Soft Services",
        "Hard Services",
        "Security Services",
        "Specialized Services",
      ],
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
  });

  // bar-chart
  const [IFMSpendByCateg, setIFMSpendByCateg] = useState({
    series: [
      {
        name:"Indirect Spend",
        data: [440, 360, 300, 200, 170, 160, 140, 230],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },

       tooltip: {
        y: {
          formatter: function (val) {
            return "₹" + val + " Crore";
          },
        },
      },
      xaxis: {
        categories: [
          "Integrated Facilities Management (IFM)",
          "Freight & Carrier Services",
          "Postal & Courier Services",
          "Advertising & Marketing",
          "Cleaning Supplies & Consumables",
          "Office Supplies & Equipment",
          "IT & Communication Services",
          "Others",
        ],
      },
      colors: ["#127985"],
    },
  });

  return (
    <div className="commodity-data">
      {/* ################# Level 1 #################### */}
      <div className="row g-2">
        <div
          className="col-4 card p-2"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
        >
          <p className="head-theme text-start px-1">
            Integrated Facilities Management (IFM) Market Size
          </p>
          <div className="row g-2 mt-1">
            {/* kpi card-1 */}
            <div className="col">
              <div className="card h-100 d-flex flex-column rounded-3 p-2">
                <p className="head-theme mb-1">Current* (2024)</p>

                <div className="d-flex justify-content-center px-2 align-items-center">
                  <p
                    className="global-kpi-num"
                    style={{
                      fontSize: "clamp(18px, 2vw, 20px)",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ 10 <span style={{ fontSize: "10px" }}>Lakh Cr.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* kpi card-2 */}
            <div className="col">
              <div className="card h-100 d-flex flex-column rounded-3 p-2">
                <p className="head-theme mb-1">Forecasted (2030)</p>

                <div className="d-flex justify-content-center px-2 align-items-center">
                  <p
                    className="global-kpi-num"
                    style={{
                      fontSize: "clamp(18px, 2vw, 20px)",
                      fontWeight: "bold",
                    }}
                  >
                    ₹16.8 <span style={{ fontSize: "10px" }}>Lakh Cr.</span>
                  </p>
                </div>
              </div>
            </div>
            {/* kpi card-3 */}
            <div className="col">
              <div className="card h-100 d-flex flex-column rounded-3 p-2">
                <p className="head-theme mb-1">CAGR(2025-2033)</p>

                <div className="d-flex justify-content-center px-2 align-items-center">
                  <p
                    className="kpi-secondary-data-1"
                    style={{
                      fontSize: "clamp(18px, 2vw, 20px)",
                      fontWeight: "bold",
                    }}
                  >
                    <FaArrowUp size={16} />
                    5.62%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-2 h-100">
            <p className="head-theme text-start">Definition</p>
            <p className="global-font rs-text-justify">
              Integrated Facilities Management (IFM) refers to the consolidation
              of multiple facility-related services under a single management
              framework or service provider. It enables organizations to
              efficiently manage their facilities by streamlining operations,
              reducing costs, and ensuring consistent service quality across
              locations.
            </p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-2 h-100">
            <p className="head-theme text-start">
              Global Position in Procurement
            </p>
            <p className="global-font rs-text-justify">
              "Globally, IFM is a mature procurement category, increasingly
              driven by efficiency needs and sustainability goals, especially in
              the retail and real estate sectors." For retail businesses, IFM
              plays a critical role in maintaining store hygiene, safety, and
              operational functionality, directly impacting customer experience
              and compliance with regulatory standards.
            </p>
          </div>
        </div>
      </div>

      <div className="row g-2">
        {" "}
        <div className="col-8">
          {/* ################# Level 2 #################### */}

          <div className="row g-2">
            <div className="col-5">
              <div
                className="card p-2 pt-3 rounded-3 mt-2 w-100"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
              >
                <p className="head-theme text-start mb-2 px-1">
                  Key Service Areas
                </p>
                <div className="d-flex ">
                  {/* kpi cards */}

                  <div className="row row-cols-1 row-cols-md-2 g-2 text-start">
                    {Object.entries(IFMTabsData.ifm_facility_services).map(
                      ([key, services], index) => (
                        <div className="col" key={index}>
                          <div className="card h-100 d-flex flex-column rounded-3 p-2">
                            <p className="head-theme mb-1">
                              {key
                                .replace("_", " ") // Replace underscore with space
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                            </p>
                            <div className="">
                              {services.map((service, i) => (
                                <li key={i} style={{ fontSize: "10px" }}>
                                  {service}
                                </li>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className="card p-2 pt-3 rounded-3 mt-2 w-100 ">
                <div className="col">
                  <p className="head-theme text-start mb-2 px-1">
                    Breakdown of IFM Spend by Service Type​
                  </p>
                  <ReactApexChart
                    options={IFMSpendBreakDown.options}
                    series={IFMSpendBreakDown.series}
                    type="donut"
                    height={255}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ################# Level 3 #################### */}
          <div className="card p-2 pt-3 rounded-3 mt-2 w-100">
            <p className="head-theme text-start mb-2 px-1">
              Regional Distribution of IFM Spend (Annual | ₹ Cr.)
            </p>

            <div className="row g-2">
              <div className="col-4">
                {" "}
                {/* Geographical Trends Data in a tabular form */}
                <div
                  className="table-container pe-1"
                  // style={{ maxHeight: "245px", overflowY: "auto" }}
                >
                  <table className="table table-bordered table-sm m-0">
                    <thead>
                      <tr>
                        <th
                          className="p-1 text-start "
                          style={{
                            ...defaultStyleHead,
                          }}
                        >
                          Region
                        </th>
                        <th
                          className="p-1 text-start"
                          style={{
                            ...defaultStyleHead,
                          }}
                        >
                          Annual Spend (₹ Cr.)
                        </th>
                        <th
                          className="p-1 text-start"
                          style={{
                            ...defaultStyleHead,
                          }}
                        >
                          % of IFM Spend
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {IFMTabsData.ifm_spend_data.map((country, index) => (
                        <tr key={index}>
                          <td
                            className="p-1"
                            style={{
                              ...defaultStyles,
                            }}
                          >
                            {country.region}
                          </td>
                          <td
                            className="p-1"
                            style={{
                              ...defaultStyles,
                            }}
                          >
                            {country.annual_spend}
                          </td>
                          <td
                            className="p-1"
                            style={{
                              ...defaultStyles,
                            }}
                          >
                            {country.percent_of_ifm_spend}
                          </td>
                        </tr>
                      ))}
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
                        radius={getBubbleSize(location.annual_spend)} // Dynamic bubble size based on quantity
                        fillColor={location.color} // Color based on filter
                        color="none"
                        fillOpacity={0.4}
                        stroke={true}
                      >
                        <Tooltip
                          direction="top"
                          offset={[0, -5]}
                          opacity={1}
                          interactive={true}
                          permanent={false}
                        >
                          <div>
                            <b>{location.name}</b>
                            <br />
                            Qty: {location.annual_spend} MT
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
        {/* Side - 2 & 3 level */}
        <div className="col-4">
          <div className="card p-2 pt-3 rounded-3 mt-2 w-100 h-100">
            <p className="head-theme text-start mb-3 px-1">
              Breakdown of Indirect Spend by Category <br />
              (Annual Spend | ₹ Cr.)
            </p>
            <p className="text-start global-font ms-2 mb-2">
              IFM accounts for 22% of total indirect spend, representing a key
              area for driving procurement efficiency and cost savings​
            </p>
            <ReactApexChart
              options={IFMSpendByCateg.options}
              series={IFMSpendByCateg.series}
              type="bar"
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommodityOverviewTab;
