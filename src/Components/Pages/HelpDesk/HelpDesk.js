import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import apiUrls from "../../../Config/apiUrls";
import axios from "axios";
import moment from "moment";
import "./HelpDesk.css";
import Loading from "../../Helper/Loading";
import { MdOutlineRestartAlt } from "react-icons/md";
import { requestHeader } from "../../Helper/Constants/constant";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";
import errorMessages from "../../Helper/Constants/errorMessages";
import { getStatusColor } from "../../Helper/Constants/statusBtnColor";
import { useNavigate } from "react-router-dom";

const HelpDesk = () => {
  const navigate = useNavigate();
  // STATES
  const [helpDeskFilters, setHelpDeskFilters] = useState([]);
  const [section, setSection] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Table Data
  const [helpDeskData, setHelpDeskData] = useState([]);
  const [filteredHelpDeskData, setFilteredHelpDeskData] = useState([]);
  const [rowFont, setRowFont] = useState(11);
  const [rowHeight, setRowHeight] = useState(24);
  const [tableLoading, setTableLoading] = useState(false);

  // Fetch help desk data
  const fetchHelpDeskQueriesData = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get(
        `${apiUrls.urlPrefix}/help/help-queries`,
        requestHeader.json
      );
      if (response?.data) {
        setHelpDeskData(response?.data?.result);
        setFilteredHelpDeskData(response?.data?.result);
        setTableLoading(false);
      }
    } catch (error) {
      console.log(error);
      setTableLoading(false);
      // toast.error(toastMessages.errorMsgApi);
      console.log(toastMessages.errorMsgApi);
    }
  };

  // Fetch Help Desk Filters
  const fetchHelpDeskFilters = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/help/help-filters`,
        requestHeader.json
      );
      if (response?.data) {
        const result = response?.data?.result || "";
        setHelpDeskFilters(result);
        const startDate = moment(result?.dateRange?.MinDate).format(
          "YYYY-MM-DD"
        );
        const endDate = moment(result?.dateRange?.MaxDate).format("YYYY-MM-DD");
        setDateRange({ startDate: startDate, endDate: endDate });
        setStartDate(startDate);
        setEndDate(endDate);
      }
    } catch (error) {
      console.log(error);
      // toast.error(toastMessages.errorMsgFilters);
      console.log(toastMessages.errorMsgFilters);
    }
  };

  useEffect(() => {
    fetchHelpDeskQueriesData();
    fetchHelpDeskFilters();
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
    setPriority("");
    setStatus("");
    setStartDate(dateRange?.startDate || "");
    setEndDate(dateRange?.endDate || "");
    setFilteredHelpDeskData(helpDeskData);
  };

  // Filter help desk data
  useEffect(() => {
    const filteredData = helpDeskData.filter((row) => {
      const isWithinDateRange =
        (!startDate || moment(row.RequestDate).isAfter(startDate)) &&
        (!endDate || moment(row.RequestDate).isBefore(endDate));
      return (
        (!section || row.Section === section) &&
        (!priority || row.Priority === priority) &&
        (!status || row.Status === status) && // Apply status filter
        isWithinDateRange
      );
    });
    setFilteredHelpDeskData(filteredData);
  }, [section, priority, status, startDate, endDate, helpDeskData]);

  return (
    <div className=" mt-1 card p-2">
      {/* HELP DESK FILTERS*/}
      <div
        className="d-flex mb-2"
        style={{ gap: "16px", alignItems: "flex-end" }}
      >
        <div className="d-flex" style={{ gap: "16px", alignItems: "flex-end" }}>
          {[
            {
              label: "Section",
              value: section,
              setValue: setSection,
              options: helpDeskFilters?.sections || [],
            },
            {
              label: "Priority",
              value: priority,
              setValue: setPriority,
              options: helpDeskFilters?.priority || [],
            },
            {
              label: "Status",
              value: status,
              setValue: setStatus,
              options: helpDeskFilters?.status || [], // Status filter options
            },
          ].map(({ label, value, setValue, options }, index) => (
            <Form.Group
              key={index}
              className="global-filter-input"
              style={{ gap: "8px" }}
            >
              <Form.Group
                className="global-filter-input"
                style={{ gap: "8px" }}
              >
                <Form.Label className="global-filter-label">{label}</Form.Label>
                <Form.Select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{ fontSize: "11px" }}
                >
                  <option value="">All</option>
                  {options?.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form.Group>
          ))}
        </div>

        <div className="d-flex">
          <div className="global-filter-input">
            <Form.Label className="global-filter-label">Start Date</Form.Label>
            <Form.Control
              className="global-filter-input-date global-font"
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
              className="global-filter-input-date global-font"
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
              <th style={defaultStyleHead}>Section</th>
              <th style={defaultStyleHead}>Title</th>
              <th style={defaultStyleHead}>Priority</th>
              <th style={defaultStyleHead}>Request Date</th>
              <th style={defaultStyleHead}>Status</th>
              <th style={defaultStyleHead}>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredHelpDeskData.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={defaultStyles}>{row.Section}</td>
                <td style={defaultStyles}>{row.Title}</td>
                <td style={defaultStyles}>{row.Priority}</td>
                <td style={defaultStyles}>
                  {moment(row.RequestDate).format("D MMM YYYY")}
                </td>
                <td style={defaultStyles}>
                  <span
                    style={{
                      background: getStatusColor(row.Status) + "20",
                      border: "1px solid" + getStatusColor(row.Status),
                      color: getStatusColor(row.Status),
                      padding: "4px",
                      fontWeight: 600,
                      borderRadius: "5px",
                      fontSize: "10px",
                    }}
                  >
                    {row.Status}
                  </span>
                </td>
                <td style={defaultStyles}>
                  <span
                    onClick={() => {
                      navigate(`/help-details/${row.Id}`);
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

export default HelpDesk;
