import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Chart from "react-apexcharts";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { MdEdit } from "react-icons/md";
import { Form, Button } from "react-bootstrap";
import apiUrls from "../../../Config/apiUrls";
import axios from "axios";
import Loading from "../../Helper/Loading";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import the required icons
import { IoMdAdd } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { MdOutlineRestartAlt } from "react-icons/md";
import { GrUndo } from "react-icons/gr";

import "./css/Validation.css";
// ag grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { requestHeader } from "../../Helper/Constants/constant";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";
import errorMessages from "../../Helper/Constants/errorMessages";

const Validation = () => {
  const [highlight, setHighlight] = useState([]);
  // STATES
  const [validationChartsData, setValidationChartsData] = useState([]);
  const [validationChartsLabel, setValidationChartsLabel] = useState([]);
  const [statusChartsLabel, setStatusChartsLabel] = useState([]);
  const [statusChartsData, setStatusChartsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationInsights, setValidationInsights] = useState([]);
  //FILTERS STATE
  const [l1Category, setL1Category] = useState("");
  const [l2Category, setL2Category] = useState("");
  const [l3Category, setL3Category] = useState("");
  const [l4Category, setL4Category] = useState("");
  const [company, setCompany] = useState("");
  const [supplier, setSupplier] = useState("");
  const [l1CategoryFilter, setL1CategoryFilter] = useState([]);
  const [l2CategoryFilter, setL2CategoryFilter] = useState([]);
  const [l3CategoryFilter, setL3CategoryFilter] = useState([]);
  const [l4CategoryFilter, setL4CategoryFilter] = useState([]);
  const [companyFilter, setCompanyFilter] = useState([]);
  const [supplierFilter, setSupplierFilter] = useState([]);
  //AG-GRID
  const [validationData, setValidationData] = useState([]);
  const [filteredValidationData, setFilteredValidationData] = useState([]);
  const [rowFont, setRowFont] = useState(11);
  const [rowHeight, setRowHeight] = useState(24);
  //GRID EDIT
  const [isEditable, setIsEditable] = useState(false);
  const [changesArray, setChangesArray] = useState([]);
  const getDistinctValues = (data, column) => {
    // Function to extract the numerical part for sorting
    const extractNumber = (str) => {
      const match = str.match(/^([\d.]+)/);
      return match ? parseFloat(match[0]) : 0;
    };
    // Extract distinct values from the specified column
    const values = data.map((row) => row[column]);
    const distinctValues = [...new Set(values)];
    // Sort the distinct values based on the numerical part
    console.log(distinctValues);
    return distinctValues.sort((a, b) => extractNumber(a) - extractNumber(b));
  };

  const EditableCellRenderer = (props) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.colDef.editable && (
          <MdEdit
            style={{
              width: "15px",
              height: "15px",
              color: "var(--color-main-light)",
            }}
          />
        )}
        <span>{props.value}</span>
      </div>
    );
  };

  const toggleEditable = () => {
    if (isEditable) {
      gridRef.current.api.stopEditing(); // Stop edit mode if already editable
    }
    setIsEditable(!isEditable);
    setColumnDefs((prevDefs) =>
      prevDefs.map((colDef) => {
        if (
          colDef.field === "New L4 - Global Procurement" ||
          colDef.field === "New Supplier" ||
          colDef.field === "New Parent Company" ||
          colDef.field === "Comments"
        ) {
          return {
            ...colDef,
            editable: !isEditable,
            cellEditor:
              colDef.field === "New L4 - Global Procurement"
                ? "agRichSelectCellEditor"
                : undefined,
            cellEditorParams:
              colDef.field === "New L4 - Global Procurement"
                ? {
                    values: getDistinctValues(
                      validationData,
                      "Level 4 Category"
                    ),
                    useFormatter: true,
                  }
                : undefined,
            cellRenderer: EditableCellRenderer,
          };
        }
        return colDef;
      })
    );
  };

  const [editHistory, setEditHistory] = useState([]);
  const [editBackup, setEditBackup] = useState([]);
  const [editChanges, setEditChanges] = useState([]);
  const [isUndo, setIsUndo] = useState(false);

  const onCellValueChanged = (params) => {
    let changes = [...editChanges];
    let history = [...editHistory];
    let backup = [...editBackup];
    const { colDef, data, newValue, oldValue, node } = params;
    const field = colDef.field;
    //HANDLE INGORE FIELDS
    const nonEditableFields = [
      "Proposed Status",
      "L4 Change",
      "Supplier Change",
      "Supplier Parent Change",
    ];
    // Skip processing if there's no change or the field is non-editable
    if (newValue === oldValue || nonEditableFields.includes(field)) return;
    //HANDLE HISTORY STATUS
    const oldStatus = data["Proposed Status"];
    const oldL4 = data["L4 Change"];
    const oldSup = data["Supplier Change"];
    const oldParent = data["Supplier Parent Change"];
    //HANDLE UNDO
    if (isUndo && history.length > 0) {
      const last = history[history.length - 1];
      //UPDATE  STATUS
      node.setDataValue("Proposed Status", last[0]);
      node.setDataValue("L4 Change", last[1]);
      node.setDataValue("Supplier Change", last[2]);
      node.setDataValue("Supplier Parent Change", last[3]);
      history.pop();
      setEditHistory(history);
      setIsUndo(false);
      //HANDLE CHANGES UPDATES
      console.log(data.Id, field, newValue, oldValue);
      const index = changes.findIndex((item) => item.Id === data.Id);
      changes[index][field] = newValue;
      console.log("back-check", backup[backup.length - 1]);
      backup.pop();
      setEditBackup(backup);
      const indx = backup.findIndex(
        (x) => x.Id === data.Id && x.field === field
      );
      if (indx === -1) {
        delete changes[index][field];
      }
      const keys = Object.keys(changes[index]);
      if (
        keys.includes("New L4 - Global Procurement") ||
        keys.includes("New Supplier") ||
        keys.includes("New Parent Company")
      ) {
        changes[index].ProposedStatus = last[0];
        changes[index].L4Change = last[1];
        changes[index].SupplierChange = last[2];
        changes[index].SupplierParentChange = last[3];
      } else {
        changes.splice(index, 1);
      }

      if (history.length === 0) setEditChanges([]);
      else setEditChanges(changes);
    } else {
      //HANDLE BACKUP FIELDS
      backup.push({ Id: data.Id, field: field, value: oldValue });
      console.log("backup set", oldValue);
      setEditBackup(backup);
      //HANDLE SET HISTORY
      history.push([oldStatus, oldL4, oldSup, oldParent]);
      console.log(history);
      setEditHistory(history);
      //UPDATE PROPOSED STATUS
      if (oldStatus !== "Please review") {
        node.setDataValue("Proposed Status", "Please review");
      }
      // Update dependent fields based on the edited field
      if (field === "New L4 - Global Procurement") {
        node.setDataValue("L4 Change", "Yes");
      } else if (field === "New Supplier") {
        node.setDataValue("Supplier Change", "Yes");
      } else if (field === "New Parent Company") {
        node.setDataValue("Supplier Parent Change", "Yes");
      }
      // Find if the current Id already exists in changes array
      const existingChangeIndex = changes.findIndex(
        (item) => item.Id === data.Id
      );
      if (existingChangeIndex !== -1) {
        // If the Id exists, update the existing change object with the new field and value
        changes[existingChangeIndex] = {
          ...changes[existingChangeIndex],
          [field]: newValue,
          ProposedStatus: "Please review", // always mark as "Please review"
          L4Change: data["L4 Change"],
          SupplierChange: data["Supplier Change"],
          SupplierParentChange: data["Supplier Parent Change"],
        };
      } else {
        // If the Id doesn't exist, create a new change object and push it
        changes.push({
          Id: data.Id,
          Company: data["Company Code"],
          [field]: newValue,
          ProposedStatus: "Please review", // always mark as "Please review"
          L4Change: data["L4 Change"],
          SupplierChange: data["Supplier Change"],
          SupplierParentChange: data["Supplier Parent Change"],
        });
      }
      // Update the state with the new changes
      setEditChanges(changes);
      // Debugging logs (optional)
      console.log("Changes:", changes);
    }
  };

  const handleUndo = () => {
    setIsUndo(true);
    gridRef.current.api.undoCellEditing();
  };

  const handleHighlight = () => {
    const changes = [...editChanges];
    const arr = [];
    changes.forEach((x) => {
      arr.push(x.Company);
    });
    setHighlight(arr);
    console.log(arr);
  };

  const handleSubmit = async () => {
    const changes = [...editChanges];
    console.log(changes);
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiUrls.urlPrefix}/validation-update`,
        {
          data: changes,
        },
        requestHeader.json
      );
      if (response?.data) {
        toast.success(toastMessages.updationSubmit);
        console.log(response?.data?.result);
        fetchValidationInsights();
        fetchValidationCharts();
        //highlight company
        handleHighlight();
        setLoading(false);
        setEditChanges([]);
        setEditHistory([]);
        setEditBackup([]);
      }
    } catch (error) {
      toast.error(toastMessages.errorMsgSubmit);
      setLoading(false);
      console.log(error);
    }
  };

  //export
  const handleExport = () => {
    gridRef.current.api.exportDataAsExcel();
  };

  //HANDLE VALIDATION FILTER LOAD BY TABLE DATA
  const handleLoadFilters = (data) => {
    const distinctValues = (key) => [
      ...new Set(data.map((x) => x[key]).filter(Boolean)),
    ];

    setL1CategoryFilter(distinctValues("Level 1 Category"));
    setL2CategoryFilter(distinctValues("Level 2 Category"));
    setL3CategoryFilter(distinctValues("Level 3 Category"));
    setL4CategoryFilter(distinctValues("Level 4 Category"));
    setCompanyFilter(distinctValues("Company Name"));
    setSupplierFilter(distinctValues("Supplier Harmonized Name"));
  };

  //LOADING VALIDATION ISNIGHT TABLE
  const fetchValidationInsights = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/validation-insights`,
        requestHeader.json
      );
      if (response?.data) {
        setValidationInsights(response?.data?.result);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      // toast.error(toastMessages.errorMsgApi);
      console.log(toastMessages.errorMsgApi);
    }
  };

  //LOADING VALIDATION ISNIGHT TABLE
  const fetchValidationCharts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/validation-charts`,
        requestHeader.json
      );
      if (response?.data) {
        setValidationChartsLabel(
          response?.data?.result?.validationChartData?.company
        );
        setValidationChartsData(
          response?.data?.result?.validationChartData?.validation
        );
        //status chart updates
        setStatusChartsLabel(response?.data?.result?.statusChartData?.label);
        setStatusChartsData(response?.data?.result?.statusChartData?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      // toast.error(toastMessages.errorMsgApi);
    }
  };

  // Fetch validation tree data
  const fetchValidationData = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/validation-data`,
        requestHeader.json
      );
      if (response?.data) {
        setValidationData(response?.data?.result);
        setFilteredValidationData(response?.data?.result);
        handleLoadFilters(response?.data?.result);
      }
    } catch (error) {
      console.log(error);
      // toast.error(toastMessages.errorMsgApi);
    }
  };

  useEffect(() => {
    fetchValidationInsights();
    fetchValidationCharts();
    fetchValidationData();
  }, []);

  const validationDataColDef = [
    { field: "Level 1 Category" },
    { field: "Level 2 Category" },
    { field: "Level 3 Category" },
    { field: "Level 4 Category" },
    { field: "Company Code" },
    { field: "Company Name" },
    { field: "Supplier Harmonized Name" },
    { field: "Supplier Parent Name" },
    { field: "2018" },
    { field: "2019" },
    { field: "2020" },
    { field: "2021" },
    { field: "2022" },
    { field: "Grand Total" },
    { field: "Spend Bucket" },
    { field: "New Supplier -2022" },
    { field: "Proposed L4 Mapping" },
    { field: "Proposed Status" },
    {
      field: "New L4 - Global Procurement",
      editable: isEditable,
    },
    { field: "New Supplier", editable: isEditable },
    { field: "New Parent Company", editable: isEditable },
    { field: "Comments", editable: isEditable },
    { field: "L4 Change" },
    { field: "Supplier Change" },
    { field: "Supplier Parent Change" },
    { field: "EditedBy" },
    { field: "EditedOn" },
  ];

  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState(validationDataColDef);
  // Default column settings
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      headerClass: "grid-style",
      height: "250px",
      cellStyle: {
        fontSize: rowFont,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      },
    }),
    [rowFont]
  );

  const onGridReady = () => {
    const api = gridRef.current.api;
  };

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Adjust row height and font size
  const updateRowSize = (size) => {
    setRowHeight(size);
    gridRef.current.api.forEachNode((rowNode) => {
      rowNode.setRowHeight(size);
    });

    let fontSize;
    if (size === 24) {
      fontSize = "11px";
    } else if (size === 30) {
      fontSize = "13px";
    } else if (size === 35) {
      fontSize = "15px";
    }
    setRowFont(fontSize);

    const updatedColumnDefs = columnDefs.map((colDef) => ({
      ...colDef,
      cellStyle: { fontSize },
    }));
    setColumnDefs(updatedColumnDefs);

    const headerHeight = size + 10;
    const headerElements = document.querySelectorAll(".ag-header");
    headerElements.forEach((header) => {
      header.style.height = `${headerHeight}px`;
    });

    gridRef.current.api.onRowHeightChanged();
    gridRef.current.api.refreshCells();
  };

  const resetFilters = () => {
    setL1Category("");
    setL2Category("");
    setL3Category("");
    setL4Category("");
    setCompany("");
    setSupplier("");
  };

  useEffect(() => {
    const filteredData = validationData.filter((row) => {
      return (
        (!l1Category || row["Level 1 Category"] === l1Category) &&
        (!l2Category || row["Level 2 Category"] === l2Category) &&
        (!l3Category || row["Level 3 Category"] === l3Category) &&
        (!l4Category || row["Level 4 Category"] === l4Category) &&
        (!company || row["Company Name"] === company) &&
        (!supplier || row["Supplier Harmonized Name"] === supplier)
      );
    });

    setFilteredValidationData(filteredData);
  }, [
    l1Category,
    l2Category,
    l3Category,
    l4Category,
    company,
    supplier,
    validationData,
  ]);

  // Truncate function for labels
  const truncateLabel = (label) =>
    label.length > 15 ? `${label.substring(0, 15)}...` : label;

  // Process the labels
  const processedLabels =
    validationChartsLabel && validationChartsLabel.map(truncateLabel);

  const validationChartOptions = {
    chart: {
      type: "bar",
      height: 300,
      scrollable: true,
    },
    colors: ["var(--color-main-light)"],
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "5px",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: processedLabels, // Use processed labels
    },
    fill: {
      opacity: 1,
    },
    xaxis: {
      categories: processedLabels, // Use processed labels
      labels: {
        show: false, // Hide x-axis labels
      },
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  const validationChartSeries = [
    {
      name: "Validation",
      data: validationChartsData,
    },
  ];

  //VALIDATION STATUS CHART
  const validationStatusOptions = {
    chart: {
      type: "pie",
    },
    colors: [
      "var(--color-main)",
      "var(--color-main-light)",
      "#227c9e",
      "#8cbf9e",
      "#f97061",
      "#ffc857",
    ],
    labels: statusChartsLabel,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom", // Legend will appear below the chart on smaller screens
          },
        },
      },
    ],
    legend: {
      position: "bottom", // Legend is displayed at the top by default
      fontSize: "10px", // Font size for the legend
    },
    dataLabels: {
      style: {
        fontSize: "10px", // Font size for the percentage labels
        colors: ["#f5f5f5"],
      },
      formatter: (val, opts) => {
        return `${val.toFixed(2)}%`;
      },
    },
  };

  const validationStatusSeries = statusChartsData;

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

  return (
    <div>
      {/* LOADING */}
      {loading && <Loading />}
      {/* VALIDATION INSIGHTS AND CHARTS */}

      <div className="row g-2 mt-1">
        <div className="col-6">
          <div className="card h-100 d-flex flex-column">
            <div
              style={{ height: "260px", overflowY: "auto", flex: "1 1 auto" }}
            >
              <table
                className="table hover"
                style={{ fontSize: rowFont, width: "100%" }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: "0",
                    backgroundColor: "#fff",
                  }}
                >
                  <tr>
                    <th style={defaultStyleHead}>Company</th>
                    <th style={defaultStyleHead}>Spend</th>
                    <th style={defaultStyleHead}>Supplier</th>
                    <th style={defaultStyleHead}>Validated Spend</th>
                    <th style={defaultStyleHead}>PID</th>
                    <th style={defaultStyleHead}>Mapping Accuracy</th>
                    <th style={defaultStyleHead}>Validated L4</th>
                  </tr>
                </thead>
                <tbody>
                  {validationInsights.map((row) => (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        padding: "0px",
                      }}
                    >
                      <td
                        style={defaultStyles}
                        className={
                          highlight.includes(row["Company Code"])
                            ? "highlight"
                            : ""
                        }
                      >
                        {row["Company Code"]}
                      </td>
                      <td
                        style={defaultStyles}
                        className={
                          highlight.includes(row["Company Code"])
                            ? "highlight"
                            : ""
                        }
                      >
                        {row.spend}
                      </td>
                      <td
                        style={defaultStyles}
                        className={
                          highlight.includes(row["Company Code"])
                            ? "highlight"
                            : ""
                        }
                      >
                        {row.supplier}
                      </td>
                      <td
                        style={defaultStyles}
                        className={
                          highlight.includes(row["Company Code"])
                            ? "highlight"
                            : ""
                        }
                      >
                        {row.validatedspend}
                      </td>
                      <td
                        style={defaultStyles}
                        className={
                          highlight.includes(row["Company Code"])
                            ? "highlight"
                            : ""
                        }
                      >
                        {row.pid}
                      </td>
                      <td
                        style={defaultStyles}
                        className={
                          highlight.includes(row["Company Code"])
                            ? "highlight"
                            : ""
                        }
                      >
                        {row.map}
                      </td>
                      <td
                        style={defaultStyles}
                        className={
                          highlight.includes(row["Company Code"])
                            ? "highlight"
                            : ""
                        }
                      >
                        {row.l4validation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card h-100 d-flex flex-column">
            <div
              className="card-body d-flex flex-column"
              style={{ flex: "1 1 auto" }}
            >
              <p className="head-theme mb-2">Category Validation By Entity</p>
              <div
                style={{ height: "200px", overflowY: "auto", flex: "1 1 auto" }}
              >
                <Chart
                  options={validationChartOptions}
                  series={validationChartSeries}
                  type="bar"
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card h-100 d-flex flex-column">
            <div
              className="card-body d-flex flex-column"
              style={{ flex: "1 1 auto" }}
            >
              <p className="head-theme mb-2">Validation Proposed Status</p>
              <div style={{ flex: "1 1 auto" }}>
                <Chart
                  options={validationStatusOptions}
                  series={validationStatusSeries}
                  type="pie"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY DATA FILTERS */}
      <div className="card p-2 mt-2">
        <div
          className="d-flex justify-content-between mb-2"
          style={{ gap: "16px", alignItems: "flex-end" }}
        >
          <div
            className="d-flex"
            style={{ gap: "16px", alignItems: "flex-end" }}
          >
            {[
              {
                label: "L1Category",
                setValue: setL1Category,
                value: l1Category,
                options: l1CategoryFilter || [],
              },
              {
                label: "L2Category",
                value: l2Category,
                setValue: setL2Category,
                options: l2CategoryFilter || [],
              },

              {
                label: "L3Category",
                value: l3Category,
                setValue: setL3Category,
                options: l3CategoryFilter || [],
              },

              {
                label: "L4Category",
                value: l4Category,
                setValue: setL4Category,
                options: l4CategoryFilter || [],
              },

              {
                label: "Comapny",
                value: company,
                setValue: setCompany,
                options: companyFilter,
              },
              {
                label: "Supplier",
                value: supplier,
                setValue: setSupplier,
                options: supplierFilter,
              },
            ].map(({ label, value, setValue, options }, index) => (
              <Form.Group
                key={index}
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
            ))}
          </div>
        </div>
        <div className="d-flex">
          {/* Reset Button */}
          {/* Reset Button */}
          <Button
            className="btn-theme"
            onClick={resetFilters}
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

          <Button
            className="btn-theme"
            onClick={handleExport}
            size="sm"
            style={{ fontSize: "10px", margin: "2px 5px" }}
          >
            Export
            <CiExport
              style={{
                fontSize: "15px",
                marginLeft: "5px",
                paddingBottom: "3px",
              }}
            />
          </Button>
          {editHistory.length > 0 && (
            <Button
              className="btn-theme"
              onClick={handleUndo}
              size="sm"
              style={{ fontSize: "10px", margin: "2px 5px" }}
            >
              Undo
              <GrUndo
                style={{
                  fontSize: "15px",
                  marginLeft: "5px",
                  paddingBottom: "3px",
                }}
              />
            </Button>
          )}
          {editChanges.length > 0 && (
            <Button
              className="btn-theme"
              onClick={handleSubmit}
              size="sm"
              style={{ fontSize: "10px", margin: "2px 5px" }}
            >
              Submit
              {/* <CiExport
              style={{
                fontSize: "15px",
                marginLeft: "5px",
                paddingBottom: "3px",
              }}
            /> */}
            </Button>
          )}

          {/* EDIT TOGGLE */}
          <Form>
            <Form.Check // prettier-ignore
              style={{
                fontSize: "12px",
                marginLeft: "10px",
                paddingTop: "5px",
              }}
              type="switch"
              id="edit-switch"
              label="Edit"
              checked={isEditable} // Controlled value
              onChange={toggleEditable} // Handle change
            />
          </Form>
        </div>

        {/* AG-GRID TABLE FOR VALIDATION DATA */}
        <div
          className="ag-theme-alpine global-ag-table"
          style={{
            fontSize: rowFont,
          }}
        >
          <AgGridReact
            ref={gridRef}
            onGridReady={onGridReady}
            rowData={filteredValidationData}
            rowHeight={rowHeight}
            headerHeight={30}
            pagination={true}
            paginationPageSize={1000}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onCellClicked={cellClickedListener}
            singleClickEdit={true}
            undoRedoCellEditing={true}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default Validation;
