import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import apiUrls from "../../../../Config/apiUrls";
import axios from "axios";
import moment from "moment";
import "../../HelpDesk/HelpDesk.css";
import Loading from "../../../Helper/Loading";
import { MdOutlineRestartAlt } from "react-icons/md";
import { requestHeader } from "../../../Helper/Constants/constant";
import { toast } from "react-toastify";
import toastMessages from "../../../Helper/Constants/toastMessages";
import errorMessages from "../../../Helper/Constants/errorMessages";
import { useNavigate } from "react-router-dom";

const ValidationActivities = () => {
  const navigate = useNavigate();

  // STATES

  const [validationActivities, setValidationActivities] = useState([]);

  // Column States
  const [section, setSection] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Table Data
  const [filteredvalidationActivities, setFilteredvalidationActivities] =
    useState([]);
  const [rowFont, setRowFont] = useState(11);
  const [rowHeight, setRowHeight] = useState(24);
  const [tableLoading, setTableLoading] = useState(false);

  // Fetch help desk data
  const fetchValidationActivities = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get(
        `${apiUrls.urlPrefix}/activity-window/validation-activities`,
        requestHeader.json
      );
      if (response?.data) {
        const resData = response?.data;
        setValidationActivities(resData?.result);
        setFilteredvalidationActivities(resData?.result);
        const startDate = moment(resData?.minDate).format("YYYY-MM-DD");
        // const endDate = moment().format("YYYY-MM-DD");
        const endDate = moment().add(1, "days").format("YYYY-MM-DD");
        setDateRange({ startDate: startDate, endDate: endDate });
        setStartDate(startDate);
        setEndDate(endDate);
        setTableLoading(false);
      } else {
        console.log(errorMessages?.responseFromApi);
        setTableLoading(false);
      }
    } catch (error) {
      console.log(error);
      setTableLoading(false);
      toast.error(toastMessages.errorMsgApi);
    }
  };

  useEffect(() => {
    fetchValidationActivities();
  }, []);

  // Default column settings (for styling)
  const defaultStyles = {
    fontSize: rowFont,
    textAlign: "center",
    padding: "8px",
  };
  const defaultStyleHead = {
    fontSize: rowFont,
    textAlign: "center",
    padding: "8px",
    backgroundColor: "var(--bg-ag)",
    color: "white",
  };

  // Adjust row height and font size
  const updateRowSize = (size) => {
    setRowHeight(size);
    let fontSize;
    if (size === 24) fontSize = "11px";
    else if (size === 30) fontSize = "13px";
    else if (size === 35) fontSize = "15px";
    setRowFont(fontSize);
  };

  // Reset Filters
  const resetFilters = () => {
    setSection("");
    setStatus("");
    setStartDate(dateRange?.startDate || "");
    setEndDate(dateRange?.endDate || "");
    setFilteredvalidationActivities(validationActivities);
  };

  // Filter help desk data
  useEffect(() => {
    const filteredData = validationActivities.filter((row) => {
      const isWithinDateRange =
        (!startDate || moment(row.EditedOn).isSameOrAfter(startDate)) &&
        (!endDate || moment(row.EditedOn).isSameOrBefore(endDate));
      return (
        (!status || row.Status === status) && // Apply status filter
        isWithinDateRange
      );
    });
    setFilteredvalidationActivities(filteredData);
  }, [section, status, startDate, endDate, validationActivities]);

  return (
    <div>
      {/* HELP DESK FILTERS*/}
      <div
        className="d-flex mb-2"
        style={{ gap: "16px", alignItems: "flex-end" }}
      >
        <div className="d-flex">
          <div className="global-filter-input">
            <Form.Label className="global-filter-label">Start Date</Form.Label>
            <Form.Control
              className="global-filter-input-date"
              type="date"
              size="sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-end p-1"> - </div>

          <div className="global-filter-input ">
            <Form.Label className="global-filter-label">End Date</Form.Label>
            <Form.Control
              className="global-filter-input-date"
              type="date"
              size="sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-start">
          {/* Reset Button */}
          <Button
            className="btn-theme"
            onClick={() => resetFilters()}
            size="sm"
            style={{ fontSize: "10px", margin: "2px 5px" }}
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

          {/* Density Dropdown */}
          <Dropdown>
            <Dropdown.Toggle
              style={{ fontSize: "10px", margin: "2px 5px" }}
              size="sm"
              id="dropdown-basic"
              className="btn-theme"
            >
              Density
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                style={{ fontSize: "10px" }}
                onClick={() => {
                  updateRowSize(24);
                }}
              >
                Small
              </Dropdown.Item>
              <Dropdown.Item
                style={{ fontSize: "10px" }}
                onClick={() => {
                  updateRowSize(30);
                }}
              >
                Medium
              </Dropdown.Item>
              <Dropdown.Item
                style={{ fontSize: "10px" }}
                onClick={() => {
                  updateRowSize(35);
                }}
              >
                Large
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* HELP DESK QUERY DATA TABLE*/}
      <div
        style={{
          height: "70vh",
          overflow: "auto",
          border: "1px solid #ddd",
          marginTop: "10px",
        }}
      >
        {tableLoading && <Loading />}
        <table className="table table-striped" style={{ fontSize: rowFont }}>
          <thead
            style={{ position: "sticky", top: "0", backgroundColor: "#fff" }}
          >
            <tr>
              <th style={defaultStyleHead}>L4 Category</th>
              <th style={defaultStyleHead}>Supplier</th>
              <th style={defaultStyleHead}>Edited By</th>
              <th style={defaultStyleHead}>Edited On</th>
              <th style={defaultStyleHead}>Comments</th>
              <th style={defaultStyleHead}>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredvalidationActivities.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={defaultStyles}>
                  {row["Level 4 Category"] || "N/A"}
                </td>
                <td style={defaultStyles}>
                  {row["Supplier Harmonized Name"] || "N/A"}
                </td>
                <td style={defaultStyles}>{row.EditedBy || "N/A"}</td>
                <td style={defaultStyles}>
                  {moment(row.EditedOn).format("D MMM YYYY") || "N/A"}
                </td>
                <td style={defaultStyles}>{row.Comments || "N/A"}</td>
                <td style={defaultStyles}>
                  <span
                    onClick={() => {
                      navigate(
                        `/activity-window/validation-activity-details/${row.Id}`
                      );
                    }}
                    className="view-update-btn"
                  >
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidationActivities;
