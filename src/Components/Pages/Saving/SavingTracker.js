import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import {
  Tabs,
  Tab,
  Form,
  Button,
  Modal,
  ListGroup,
  Dropdown,
} from "react-bootstrap";
import { MdOutlineRestartAlt } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import apiUrls from "../../../Config/apiUrls";
import { requestHeader } from "../../Helper/Constants/constant";
import toastMessages from "../../Helper/Constants/toastMessages";
import Loading from "../../Helper/Loading";
import { formatDate } from "../../../Config/formatDate";
import { toast } from "react-toastify";
import { formatCompactNumber } from "../../../Config/formatCompactNumber";
// ICONS
import { CiExport } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

const SavingTracker = () => {
  const gridRef = useRef(null);

  const [savingTrackerData, setSavingTrackerData] = useState([]);
  const [rowHeight, setRowHeight] = useState(24);
  const [rowFont, setRowFont] = useState(11);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState("levelup");
  const [formLoading, setFormLoading] = useState(false);
  const [editErrors, setEditErrors] = useState({});
  const [density, setDensity] = useState("compact");
  const [initialStartDate, setInitialStartDate] = useState("");
  const [initialTargetDate, setInitialTargetDate] = useState("");
  const [filters, setFilters] = useState({
    ideaType: "",
    startDate: "",
    targetDate: "",
    supplierName: "",
    status: "", // Added status filter
    currency: "", // Added currency filter
  });
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Handle density change
  const handleDensityChange = (newDensity) => {
    setDensity(newDensity);
    switch (newDensity) {
      case "compact":
        setRowHeight(24);
        setRowFont(11);
        break;
      case "standard":
        setRowHeight(32);
        setRowFont(13);
        break;
      case "comfortable":
        setRowHeight(40);
        setRowFont(15);
        break;
      default:
        setRowHeight(24);
        setRowFont(11);
    }
  };

  // Idea Submission states
  const [activeTab, setActiveTab] = useState("setup");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Idea Setup tab
    IdeaType: "Commercial",
    PartId: "PRT-1001",
    ReasonCode: "PC001: Raw Material (RM) Negotiation",
    SupplierName: "",
    Currency: "$",
    AVOB: "",
    SavingTarget: "",

    IdeaLevel: "IL0",
    Reason: "",
    Attachment: null,
    IdeaTitle: "",
    Description: "",
    StartDate: "",
    TargetDate: "",
  });

  // Idea Level Update States
  const [showEditModal, setShowEditModal] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Id: "",
    IdeaLevel: "",
    Reason: "",
  });

  // FETCH SAVING TRACKER DATA
  const fetchSavingTrackerData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrls.urlPrefix}/saving-tracker-data`,
        requestHeader.json
      );
      if (response.data) {
        setSavingTrackerData(response.data.result);

        // Set initial filter dates
        const startDates = response.data.result.map(
          (item) => new Date(item.StartDate)
        );
        const targetDates = response.data.result.map(
          (item) => new Date(item.TargetDate)
        );
        const minStartDate = new Date(Math.min(...startDates))
          .toISOString()
          .split("T")[0];
        const maxTargetDate = new Date(Math.max(...targetDates))
          .toISOString()
          .split("T")[0];
        setInitialStartDate(minStartDate);
        setInitialTargetDate(maxTargetDate);
        setFilters((prev) => ({
          ...prev,
          startDate: minStartDate,
          targetDate: maxTargetDate,
        }));

        // Set unique supplier options
        const uniqueSuppliers = [
          ...new Set(response.data.result.map((item) => item.SupplierName)),
        ];
        setSupplierOptions(uniqueSuppliers);

        setLoading(false);
      }
    } catch (error) {
      console.log(
        `Error Occurred While Fetching saving tracker data.Error: ${error}`
      );

      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSavingTrackerData();
  }, []);

  // Filtered data based on filters and search text
  const filteredData = useMemo(() => {
    return savingTrackerData.filter((item) => {
      const matchesIdeaType = filters.ideaType
        ? item.IdeaType === filters.ideaType
        : true;
      const matchesStartDate = filters.startDate
        ? new Date(item.StartDate) >= new Date(filters.startDate)
        : true;
      const matchesTargetDate = filters.targetDate
        ? new Date(item.TargetDate) <= new Date(filters.targetDate)
        : true;
      const matchesSupplierName = filters.supplierName
        ? item.SupplierName.toLowerCase().includes(
            filters.supplierName.toLowerCase()
          )
        : true;
      const matchesStatus = filters.status
        ? (new Date() > new Date(item.TargetDate) ? "Delayed" : "On Track") ===
          filters.status
        : true;
      const matchesCurrency = filters.currency
        ? item.Currency === filters.currency
        : true;
      const matchesSearchText = searchText
        ? Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
          )
        : true;
      return (
        matchesIdeaType &&
        matchesStartDate &&
        matchesTargetDate &&
        matchesSupplierName &&
        matchesStatus &&
        matchesCurrency &&
        matchesSearchText
      );
    });
  }, [savingTrackerData, filters, searchText]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      ideaType: "",
      startDate: initialStartDate,
      targetDate: initialTargetDate,
      supplierName: "",
      status: "",
      currency: "",
    });
  };

  // ADD NEW IDEA TO SAVING TRACKER DATA
  const addSavingTracker = async () => {
    try {
      setFormLoading(true);
      // Ensure formData is defined
      if (!formData) {
        throw new Error("Form data is not defined.");
      }

      const formDataToSubmit = new FormData();

      // Append all form fields to FormData
      formDataToSubmit.append("IdeaType", formData.IdeaType || "");
      formDataToSubmit.append(
        "PartId",
        formData.PartId === "custom" ? formData.customPartId : formData.PartId
      );
      formDataToSubmit.append("ReasonCode", formData.ReasonCode || "");
      formDataToSubmit.append("SupplierName", formData.SupplierName || "");
      formDataToSubmit.append("Currency", formData.Currency || "");
      formDataToSubmit.append("AVOB", formData.AVOB || "");
      formDataToSubmit.append("SavingTarget", formData.SavingTarget || "");

      formDataToSubmit.append("IdeaLevel", formData.IdeaLevel || "");
      formDataToSubmit.append("Reason", formData.Reason || "");
      formDataToSubmit.append("IdeaTitle", formData.IdeaTitle || "");
      formDataToSubmit.append("Description", formData.Description || "");
      formDataToSubmit.append("StartDate", formData.StartDate || "");
      formDataToSubmit.append("TargetDate", formData.TargetDate || "");
      // Handle attachments
      if (
        attachment &&
        (Array.isArray(attachment) || attachment instanceof FileList) &&
        attachment.length > 0
      ) {
        attachment.forEach((file) => {
          formDataToSubmit.append("attachment", file);
        });
      } else {
        console.log("No attachments provided.");
      }

      // Send the request
      const response = await axios.post(
        `${apiUrls.urlPrefix}/add-saving-tracker-data`,
        formDataToSubmit,
        requestHeader.mutipart
      );

      // Handle response
      if (response.data.status) {
        resetFormData(); // Ensure this function is defined
        fetchSavingTrackerData(); // Ensure this function is defined
        setShowModal(false); // Close the modal on success
      } else {
        throw new Error(
          "Failed to add saving tracker: " + response.data.message
        );
      }
    } catch (error) {
      console.error(
        `Error Occurred While Adding Saving Tracker. Error: ${error.message}`
      );
    } finally {
      setFormLoading(false); // Stop loading
    }
  };

  // UPDATE SAVING TRACKER DATA- IL update
  const handleUpdate = async () => {
    const newErrors = {};
    if (!editFormData.IdeaLevel) {
      newErrors.IdeaLevel = "Measure Level is required";
    }
    if (!editFormData.Reason) {
      newErrors.Reason = "Reason is required";
    }
    setEditErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (!formData) {
      throw new Error("Form data is not defined.");
    }

    setUpdateLoading(true);
    const formDataToSubmit = new FormData();

    // Append all form fields to FormData
    formDataToSubmit.append("IdeaLevel", editFormData.IdeaLevel || "");
    formDataToSubmit.append("Reason", editFormData.Reason || "");

    // Handle attachments
    if (
      attachment &&
      (Array.isArray(attachment) || attachment instanceof FileList) &&
      attachment.length > 0
    ) {
      attachment.forEach((file) => {
        formDataToSubmit.append("attachment", file);
      });
    } else {
      console.log("No attachments provided.");
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `${apiUrls.urlPrefix}/saving-tracker/${editFormData.Id}`,
        formDataToSubmit,
        requestHeader.mutipart
      );
      if (response.data) {
        resetEditFormData();
        fetchSavingTrackerData();
      }

      // Close the modal
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating record:", error);
    } finally {
      // Reset loading state
      setLoading(false);
      setUpdateLoading(false);
    }
  };

  // Edit button renderer component
  const EditButtonRenderer = (props) => {
    const handleClick = () => {
      const row = props.node.data;
      setSelectedRow(row);
      setEditFormData({
        Id: row.Id,
        IdeaLevel: row.IdeaLevel,
        Reason: "",
      });
      setShowEditModal(true);
    };

    return (
      <button
        onClick={handleClick}
        className="btn btn-sm btn-theme"
        style={{ fontSize: "10px", padding: "2px 5px" }}
      >
        <FiEdit3 />
      </button>
    );
  };

  // Default column settings -AgGrid
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

  // Column definitions -AgGrid
  const columnDefs = [
    {
      headerName: "Status",
      valueGetter: (params) => {
        const currentDate = new Date();
        const targetDate = new Date(params.data.TargetDate);
        const ideaLevel = params.data.IdeaLevel;
        const logs = params.data.Logs || [];

        if (ideaLevel === "IL5") {
          const il5Log = logs.find(
            (log) => log.IdeaLevel === "IL5" && new Date(log.date) <= targetDate
          );
          if (il5Log) {
            return "Completed";
          }
        }

        if (ideaLevel === "IL6") {
          return "Rejected";
        }

        return currentDate > targetDate ? "Delayed" : "On Track";
      },
      cellStyle: (params) => {
        const currentDate = new Date();
        const targetDate = new Date(params.data.TargetDate);
        const ideaLevel = params.data.IdeaLevel;
        const logs = params.data.Logs || [];

        if (ideaLevel === "IL5") {
          const il5Log = logs.find(
            (log) => log.IdeaLevel === "IL5" && new Date(log.date) <= targetDate
          );
          if (il5Log) {
            return {
              fontSize: "11px",
              backgroundColor: "rgba(0, 255, 0, 0.2)",
            };
          }
        }

        if (ideaLevel === "IL6") {
          return {
            fontSize: "11px",
            backgroundColor: "rgba(128, 128, 128, 0.2)",
          };
        }

        return {
          fontSize: "11px",
          backgroundColor:
            currentDate > targetDate
              ? "rgba(255, 30, 0, 0.2)"
              : "rgba(0, 130, 236, 0.2)",
        };
      },
      sortable: true,
      width: 90,
      pinned: "right",
    },
    {
      headerName: "Actions",
      cellRenderer: EditButtonRenderer,
      pinned: "right",
      width: 80,
    },
    {
      field: "Id",
      headerName: "Id",
      sortable: true,
      width: 70,
    },
    {
      field: "IdeaLevel",
      headerName: "Measure Level",
      sortable: true,
      width: 130,
    },

    {
      field: "ReasonCode",
      headerName: "Reason Code",
      sortable: true,
      width: 120,
    },
    {
      field: "IdeaType",
      headerName: "Measure Type",
      sortable: true,
      width: 130,
    },
    {
      field: "PartId",
      headerName: "Part Id",
      sortable: true,
      width: 90,
    },
    {
      field: "SupplierName",
      headerName: "Supplier Name",
      sortable: true,
      width: 130,
    },
    {
      field: "IdeaTitle",
      headerName: "Measure Title",
      sortable: true,
    },
    {
      field: "Description",
      headerName: "Measure Description",
      sortable: true,
    },

    { field: "Currency", headerName: "Currency", sortable: true, width: 100 },

    {
      field: "AVOB",
      headerName: "AVOB",
      valueFormatter: (params) => formatCompactNumber(params.value),
      sortable: true,
      width: 90,
    },
    {
      field: "SavingTarget",
      headerName: "Saving Target (%)",
      valueFormatter: (params) =>
        `${params.value && params.value.toFixed(2)} %`,
      sortable: true,
      width: 150,
    },
    {
      field: "ExpectedSavings",
      headerName: "Expectrd Savings",
      valueFormatter: (params) => formatCompactNumber(params.value),
      sortable: true,
      width: 150,
    },
    { field: "Reason", headerName: "Level Up Reason", sortable: true },
    {
      field: "StartDate",
      headerName: "Initiation Date",
      valueFormatter: (params) => formatDate(params.value),
      sortable: true,
      width: 130,
    },
    {
      field: "TargetDate",
      headerName: "Implementation Date",
      valueFormatter: (params) => formatDate(params.value),
      sortable: true,
      width: 160,
    },
  ];

  // handle attachments
  const handleAttachment = (event) => {
    const files = Array.from(event.target.files);
    setAttachment((prevAttachments) => [...prevAttachments, ...files]);
  };

  //  Handle input change in the new idea form
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Full validation for final submission
  const validateForm = () => {
    const newErrors = {};

    // Setup tab validation
    if (!formData.IdeaType) newErrors.IdeaType = "Measure Type is required";
    if (formData.IdeaType !== "Technical" && !formData.PartId)
      newErrors.PartId = "Part Id is required";
    if (!formData.ReasonCode) newErrors.ReasonCode = "Reason Code is required";
    if (!formData.SupplierName)
      newErrors.SupplierName = "Supplier Name is required";
    if (!formData.Currency) newErrors.Currency = "Currency is required";
    if (!formData.AVOB) newErrors.AVOB = "AVOB is required";
    if (!formData.SavingTarget)
      newErrors.SavingTarget = "Saving Target is required";

    // Idea tab validation
    if (!formData.IdeaLevel) newErrors.IdeaLevel = "Measure Level is required";
    if (formData.IdeaLevel !== "IL0" && !formData.Reason)
      newErrors.Reason = "Reason is required";
    if (!formData.IdeaTitle) newErrors.IdeaTitle = "Measure Title is required";
    if (!formData.Description)
      newErrors.Description = "Description is required";
    if (!formData.StartDate) newErrors.StartDate = "Start Date is required";
    if (!formData.TargetDate) newErrors.TargetDate = "Target Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Define the tab order
  const tabOrder = ["setup", "idea", "review"];

  // Validate only the required fields for the current tab
  const validateCurrentTab = () => {
    const tabErrors = {};

    if (activeTab === "setup") {
      if (!formData.IdeaType) tabErrors.IdeaType = "Measure Type is required";
      if (formData.IdeaType !== "Technical" && !formData.PartId)
        tabErrors.PartId = "Part Id is required";
      if (!formData.ReasonCode)
        tabErrors.ReasonCode = "Reason Code is required";
      if (!formData.SupplierName)
        tabErrors.SupplierName = "Supplier Name is required";
      if (!formData.Currency) tabErrors.Currency = "Currency is required";
      if (!formData.AVOB) tabErrors.AVOB = "AVOB is required";
      if (!formData.SavingTarget)
        tabErrors.SavingTarget = "Saving Target is required";
    } else if (activeTab === "idea") {
      if (!formData.IdeaLevel)
        tabErrors.IdeaLevel = "Measure Level is required";
      if (formData.IdeaLevel !== "IL0" && !formData.Reason)
        tabErrors.Reason = "Reason is required";
      if (!formData.IdeaTitle)
        tabErrors.IdeaTitle = "Measure Title is required";
      if (!formData.Description)
        tabErrors.Description = "Description is required";
      if (!formData.StartDate) tabErrors.StartDate = "Start Date is required";
      if (!formData.TargetDate)
        tabErrors.TargetDate = "Target Date is required";
    }

    setErrors((prev) => ({ ...prev, ...tabErrors }));
    return Object.keys(tabErrors).length === 0;
  };

  // Handle changes in the IL edit/update form
  const handleEditInputChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Custom tab select handler that only allows moving forward if current tab is valid.
  const handleTabSelect = (k) => {
    // If moving forward, validate the current tab.
    if (tabOrder.indexOf(k) > tabOrder.indexOf(activeTab)) {
      if (!validateCurrentTab()) {
        return;
      }
    }
    setActiveTab(k);
  };

  // Function to move to the next tab
  const goToNextTab = () => {
    if (validateCurrentTab()) {
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex < tabOrder.length - 1) {
        const nextTab = tabOrder[currentIndex + 1];
        handleTabSelect(nextTab);
      }
    } else {
      console.log("Please fill all required fields before proceeding.");
    }
  };

  // Handle new Idea form submission
  const handleSubmit = () => {
    if (validateForm()) {
      addSavingTracker();
    } else {
      console.log("Form has errors");
    }
  };

  //   Reset Form Data (new idea form)
  const resetFormData = () => {
    setFormData({
      IdeaType: "Commercial",
      PartId: "PRT-1001",
      ReasonCode: "PC001: Raw Material (RM) Negotiation",
      SupplierName: "",
      Currency: "$",
      AVOB: "",
      SavingTarget: "",

      IdeaLevel: "IL0",
      Reason: "",
      Attachment: null,
      IdeaTitle: "",
      Description: "",
      StartDate: "",
      TargetDate: "",
      TargetDate: "",
    });
    setAttachment("");
    setErrors({});
    setActiveTab("setup");
  };

  // Reset form data (IL update form)
  const resetEditFormData = () => {
    setEditFormData({
      Id: "",
      IdeaLevel: "",
      Reason: "",
    });
    setAttachment("");
    setEditErrors({});
    setActiveEditTab("levelup");
  };

  // Function to export Excel (Enterprise feature)
  const exportToExcel = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel();
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {/* Filter Section */}

      <div className="d-flex mb-2">
        <div>
          {" "}
          <Form.Group className="me-2 ">
            <Form.Label className="global-filter-label">
              Global Search
            </Form.Label>
            <Form.Control
              className="global-font"
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Group>
        </div>

        <Form.Group className="me-2 global-filter-input">
          <Form.Label className="global-filter-label">Measure Type</Form.Label>
          <Form.Select
            className="global-font"
            value={filters.ideaType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, ideaType: e.target.value }))
            }
          >
            <option value="">All</option>
            <option value="Commercial">Commercial</option>
            <option value="Technical">Technical</option>
            <option value="Techno-Commercial">Techno-Commercial</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="me-2 global-filter-input">
          <Form.Label className="global-filter-label">Supplier Name</Form.Label>
          <Form.Select
            className="global-font"
            value={filters.supplierName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, supplierName: e.target.value }))
            }
          >
            <option value="">All</option>
            {supplierOptions.map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="me-2 global-filter-input">
          <Form.Label className="global-filter-label">Status</Form.Label>
          <Form.Select
            className="global-font"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="">All</option>
            <option value="On Track">On Track</option>
            <option value="Delayed">Delayed</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="me-2 global-filter-input">
          <Form.Label className="global-filter-label">Currency</Form.Label>
          <Form.Select
            className="global-font"
            value={filters.currency}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, currency: e.target.value }))
            }
          >
            <option value="">All</option>
            <option value="$">Dollar ($)</option>
            <option value="€">Euro (€)</option>
            <option value="₹">Rupee (₹)</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="me-2 global-filter-input">
          <Form.Label className="global-filter-label">Start Date</Form.Label>
          <Form.Control
            className="global-font"
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
        </Form.Group>
        <Form.Group className="me-2">
          <Form.Label className="global-filter-label">Target Date</Form.Label>
          <Form.Control
            className="global-font"
            type="date"
            value={filters.targetDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, targetDate: e.target.value }))
            }
          />
        </Form.Group>
      </div>

      {/* HOME PAGE ADD IDEA BUTTON */}
      <div className="d-flex">
        {" "}
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
                handleDensityChange("compact");
              }}
            >
              Small
            </Dropdown.Item>
            <Dropdown.Item
              style={{ fontSize: "10px" }}
              onClick={() => {
                handleDensityChange("standard");
              }}
            >
              Medium
            </Dropdown.Item>
            <Dropdown.Item
              style={{ fontSize: "10px" }}
              onClick={() => {
                handleDensityChange("comfortable");
              }}
            >
              Large
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* Export Data Feature */}
        <Button
          className="btn-theme"
          onClick={exportToExcel}
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
        <Button
          className="btn-theme"
          onClick={() => setShowModal(true)}
          size="sm"
          style={{ fontSize: "10px", margin: "2px 5px" }}
        >
          Add New Measure{" "}
          <IoMdAdd
            style={{
              fontSize: "15px",
              marginLeft: "2px",
              paddingBottom: "3px",
            }}
          />
        </Button>
      </div>

      <div className="ag-theme-alpine global-ag-table ">
        <AgGridReact
          ref={gridRef}
          rowData={filteredData}
          rowHeight={rowHeight}
          headerHeight={30}
          pagination={true}
          paginationPageSize={50}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableCsvExport={true}
          enableExcelExport={true}
        />
      </div>

      {/* MODAL FORM FOR IDEA SUBMISSION */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetFormData();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Measure</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto", maxHeight: "80vh" }}>
          {formLoading && <Loading />}
          <Tabs
            activeKey={activeTab}
            onSelect={handleTabSelect}
            className="mb-3 global-font"
          >
            {/* SETUP TAB */}
            <Tab eventKey="setup" title="Setup" className="global-font">
              <Form>
                <div className="row">
                  <div className="col">
                    <Form.Group className="mb-3">
                      <Form.Label>Measure Type</Form.Label>
                      <Form.Select
                        className="global-font"
                        value={formData.IdeaType}
                        onChange={(e) =>
                          handleInputChange("IdeaType", e.target.value)
                        }
                        isInvalid={!!errors.IdeaType}
                      >
                        <option value="Commercial">Commercial</option>
                        <option value="Technical">Technical</option>
                        <option value="Techno-Commercial">
                          Techno-Commercial
                        </option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.IdeaType}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {formData.IdeaType !== "Technical" && (
                      <Form.Group className="mb-3">
                        <Form.Label>Part Id</Form.Label>
                        <Form.Select
                          className="global-font"
                          value={formData.PartId}
                          onChange={(e) =>
                            handleInputChange("PartId", e.target.value)
                          }
                          isInvalid={!!errors.PartId}
                        >
                          {[
                            "PRT-1001",
                            "PRT-2003",
                            "PRT-3010",
                            "PRT-4005",
                            "PRT-5007",
                            "PRT-6002",
                            "PRT-7009",
                            "PRT-8012",
                          ].map((pc) => (
                            <option key={pc} value={pc}>
                              {pc}
                            </option>
                          ))}
                          <option value="custom">Custom Id</option>
                        </Form.Select>
                        {formData.PartId === "custom" && (
                          <Form.Control
                            className="global-font mt-2"
                            type="text"
                            placeholder="Enter custom Part Id"
                            value={formData.customPartId || ""}
                            onChange={(e) =>
                              handleInputChange("customPartId", e.target.value)
                            }
                            isInvalid={!!errors.customPartId}
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors.PartId || errors.customPartId}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                      <Form.Label>Reason Code</Form.Label>

                      <Form.Select
                        className="global-font"
                        value={formData.ReasonCode}
                        onChange={(e) =>
                          handleInputChange("ReasonCode", e.target.value)
                        }
                        isInvalid={!!errors.ReasonCode}
                      >
                        {[
                          {
                            code: "PC001",
                            text: "Raw Material (RM) Negotiation",
                          },
                          { code: "PC002", text: "Long-Term Agreements (LTA)" },
                          {
                            code: "PC003",
                            text: "Terms & Conditions Revision",
                          },
                          { code: "PC004", text: "Commodity Price Impact" },
                          { code: "PC005", text: "Quality Improvement" },
                          { code: "PC006", text: "Technical Efficiency Gains" },
                          { code: "PC007", text: "Energy Cost Adjustments" },
                          { code: "PC008", text: "Volume & Mix Optimization" },
                          { code: "PC009", text: "Supplier Competition" },
                          {
                            code: "PC010",
                            text: "Dual Sourcing / Second Contract",
                          },
                          {
                            code: "PC011",
                            text: "Part Number Rationalization",
                          },
                          {
                            code: "PC012",
                            text: "Supplier Resource Adjustments",
                          },
                          {
                            code: "PC013",
                            text: "Process/Technology-Based Cost Split",
                          },
                          {
                            code: "PC014",
                            text: "Interface & Miscellaneous Changes",
                          },
                        ].map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.code}: {option.text}
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {errors.ReasonCode}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Supplier Name</Form.Label>
                      <Form.Control
                        className="global-font"
                        type="text"
                        value={formData.SupplierName}
                        onChange={(e) =>
                          handleInputChange("SupplierName", e.target.value)
                        }
                        isInvalid={!!errors.SupplierName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.SupplierName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col">
                    {" "}
                    <Form.Group className="mb-3">
                      <Form.Label>Currency</Form.Label>

                      <Form.Select
                        className="global-font"
                        value={formData.Currency}
                        onChange={(e) =>
                          handleInputChange("Currency", e.target.value)
                        }
                        isInvalid={!!errors.Currency}
                      >
                        <option value="$">Dollar ($)</option>
                        <option value="€">Euro (€)</option>
                        <option value="₹">Rupee (₹)</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.Currency}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>AVOB</Form.Label>
                      <Form.Control
                        className="global-font"
                        type="number"
                        value={formData.AVOB}
                        onChange={(e) =>
                          handleInputChange("AVOB", e.target.value)
                        }
                        isInvalid={!!errors.AVOB}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.AVOB}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Saving Target (%)</Form.Label>

                      <Form.Control
                        className="global-font"
                        type="number"
                        value={formData.SavingTarget}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value >= 0) {
                            handleInputChange("SavingTarget", value);
                          } else {
                            handleInputChange("SavingTarget", 0);
                          }
                        }}
                        isInvalid={!!errors.SavingTarget}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.SavingTarget}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>

                {/* Add type="button" to prevent form submission */}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={goToNextTab}
                    className="btn btn-sm btn-theme"
                  >
                    Next
                  </button>
                </div>
              </Form>
            </Tab>

            {/* IDEA TAB */}
            <Tab eventKey="idea" title="Measure" className="global-font">
              <Form>
                <div className={formData.IdeaLevel !== "IL0" ? "row" : ""}>
                  <div className={formData.IdeaLevel !== "IL0" ? "col" : ""}>
                    <Form.Group className="mb-3">
                      <Form.Label>Measure Level</Form.Label>
                      <Form.Select
                        className="global-font"
                        value={formData.IdeaLevel}
                        onChange={(e) =>
                          handleInputChange("IdeaLevel", e.target.value)
                        }
                        isInvalid={!!errors.IdeaLevel}
                      >
                        <option value="IL0">IL0</option>
                        <option value="IL1">IL1</option>
                        <option value="IL2">IL2</option>
                        <option value="IL3">IL3</option>
                        <option value="IL4">IL4</option>
                        <option value="IL5">IL5</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.IdeaLevel}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {formData.IdeaLevel !== "IL0" && (
                      <div>
                        {" "}
                        <Form.Group className="mb-3">
                          <Form.Label>Reason</Form.Label>
                          <Form.Control
                            className="global-font"
                            as="textarea"
                            rows={3}
                            value={formData.Reason}
                            onChange={(e) =>
                              handleInputChange("Reason", e.target.value)
                            }
                            isInvalid={!!errors.Reason}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Reason}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Upload Document</Form.Label>
                          <Form.Control
                            className="global-font"
                            type="file"
                            name="attachment"
                            onChange={handleAttachment}
                          />
                        </Form.Group>
                      </div>
                    )}
                  </div>

                  <div className={formData.IdeaLevel !== "IL0" ? "col" : ""}>
                    <Form.Group className="mb-3">
                      <Form.Label>Measure Title</Form.Label>
                      <Form.Control
                        className="global-font"
                        type="text"
                        value={formData.IdeaTitle}
                        onChange={(e) =>
                          handleInputChange("IdeaTitle", e.target.value)
                        }
                        isInvalid={!!errors.IdeaTitle}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.IdeaTitle}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        className="global-font"
                        as="textarea"
                        rows={3}
                        value={formData.Description}
                        onChange={(e) =>
                          handleInputChange("Description", e.target.value)
                        }
                        isInvalid={!!errors.Description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.Description}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-between gap-3">
                      <Form.Group className="mb-3 w-50">
                        <Form.Label>Initiation Date</Form.Label>
                        <Form.Control
                          className="global-font"
                          type="date"
                          value={formData.StartDate}
                          onChange={(e) =>
                            handleInputChange("StartDate", e.target.value)
                          }
                          isInvalid={!!errors.StartDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.StartDate}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3 w-50">
                        <Form.Label>Implementation Date</Form.Label>
                        <Form.Control
                          className="global-font"
                          type="date"
                          value={formData.TargetDate}
                          onChange={(e) =>
                            handleInputChange("TargetDate", e.target.value)
                          }
                          isInvalid={!!errors.TargetDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.TargetDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                {/* Add type="button" to prevent form submission */}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={goToNextTab}
                    className="btn btn-sm btn-theme"
                  >
                    Next
                  </button>
                </div>
              </Form>
            </Tab>

            {/* REVIEW ALL THE DETAILS AND SUBMIT */}
            <Tab eventKey="review" title="Review & Submit">
              <ListGroup style={{ fontSize: "12px", marginBottom: "15px" }}>
                {Object.entries(formData)
                  .filter(([_, value]) => value) // Only include fields with values
                  .reduce((rows, [key, value], index) => {
                    // Create a new row for every two key-value pairs
                    if (index % 2 === 0) {
                      rows.push([]);
                    }
                    rows[rows.length - 1].push([key, value]);
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <ListGroup.Item key={rowIndex}>
                      <div className="row">
                        {row.map(([key, value], colIndex) => (
                          <React.Fragment key={key}>
                            <div className="col-6">
                              <div className="row">
                                <div className="col-4 text-start">
                                  {key === "IdeaType"
                                    ? "Measure Type"
                                    : key === "IdeaLevel"
                                    ? "Measure Level"
                                    : key === "IdeaTitle"
                                    ? "Measure Title"
                                    : key === "StartDate"
                                    ? "Initiation Date"
                                    : key === "TargetDate"
                                    ? "Implementation Date"
                                    : key === "SupplierName"
                                    ? "Supplier Name"
                                    : key === "ReasonCode"
                                    ? "Reason Code"
                                    : key}
                                </div>
                                <div className="col-8">
                                  <input
                                    type="text"
                                    className="form-control text-start global-font"
                                    value={value}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>

              {/* Display Attachments */}
              {attachment.length > 0 && (
                <ListGroup style={{ fontSize: "12px", marginBottom: "15px" }}>
                  <ListGroup.Item>
                    <div className="row">
                      <div className="col-12">
                        <strong>Attachments:</strong>
                      </div>
                    </div>
                    <div className="row">
                      {attachment.map((file, index) => (
                        <div
                          className="d-flex justify-content-between"
                          key={index}
                        >
                          <div>{file.name}</div>
                          <div>
                            <a
                              href={URL.createObjectURL(file)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button>View</button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              )}

              <div className="d-flex justify-content-between align-items-center ">
                <div>
                  {" "}
                  <Form.Group className="mb-3 ms-2">
                    <Form.Label className="global-font">Assign to</Form.Label>
                    <Form.Select
                      className="global-font"
                      value={editFormData.IdeaLevel}
                      onChange={(e) =>
                        handleEditInputChange("IdeaLevel", e.target.value)
                      }
                    >
                      <option value="prashant.yadav@statxo.com">
                        prashant.yadav@statxo.com
                      </option>
                      <option value="mohit.raykwar@statxo.com">
                        mohit.raykwar@statxo.com
                      </option>
                      <option value="rohit.kumar@statxo.com">
                        rohit.kumar@statxo.com
                      </option>
                      <option value="suyog.sonawane@statxo.com">
                        suyog.sonawane@statxo.com
                      </option>
                      <option value="akshat.bhatt@statxo.com">
                        akshat.bhatt@statxo.com
                      </option>
                      <option value="vishal.bhasin@statxo.com">
                        vishal.bhasin@statxo.com
                      </option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div>
                  {" "}
                  <button
                    onClick={handleSubmit}
                    className="btn btn-sm btn-theme"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>

      {/* EDIT MODAL */}
      {/* {updateLoading && <Loading />} */}
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          resetEditFormData();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Measure Level</Modal.Title>
        </Modal.Header>
        <Modal.Body className="global-font">
          {updateLoading && <Loading />}
          <Tabs
            activeKey={activeEditTab}
            onSelect={(key) => setActiveEditTab(key)}
            className="mb-3 global-font"
          >
            <Tab eventKey="levelup" title="Level Up" className="global-font">
              <Form>
                {/* Form to update  */}
                <Form.Group className="mb-3">
                  <Form.Label>Measure Level</Form.Label>
                  <Form.Select
                    className="global-font"
                    value={editFormData.IdeaLevel}
                    onChange={(e) =>
                      handleEditInputChange("IdeaLevel", e.target.value)
                    }
                    isInvalid={!!editErrors.IdeaLevel}
                  >
                    <option value="IL0">IL0</option>
                    <option value="IL1">IL1</option>
                    <option value="IL2">IL2</option>
                    <option value="IL3">IL3</option>
                    <option value="IL4">IL4</option>
                    <option value="IL5">IL5</option>
                    <option value="IL6">IL6</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {editErrors.IdeaLevel}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    className="global-font"
                    as="textarea"
                    rows={3}
                    value={editFormData.Reason}
                    onChange={(e) =>
                      handleEditInputChange("Reason", e.target.value)
                    }
                    isInvalid={!!editErrors.Reason}
                  />
                  <Form.Control.Feedback type="invalid">
                    {editErrors.Reason}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>

              <Form.Group className="mb-3 ">
                <Form.Label>Upload Document</Form.Label>
                <Form.Control
                  className="global-font"
                  type="file"
                  name="attachment"
                  onChange={handleAttachment}
                />
              </Form.Group>
            </Tab>
            <Tab eventKey="logs" title="Logs" className="global-font">
              <div>
                {selectedRow?.Logs.length > 0 && (
                  <table
                    className="table table-striped"
                    style={{ fontSize: rowFont }}
                  >
                    <thead
                      style={{
                        position: "sticky",
                        top: "0",
                        backgroundColor: "#fff",
                      }}
                    >
                      <tr>
                        <th>Measure Level</th>
                        <th>Level Up Reason</th>
                        <th>Attachment</th>
                        <th>Update By</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRow?.Logs.map((row) => (
                        <tr
                          key={row.id}
                          style={{ borderBottom: "1px solid #ddd" }}
                        >
                          <td>{row.IdeaLevel || "N/A"}</td>
                          <td>{row.Reason || "N/A"}</td>
                          <td>
                            {row.attachments ? (
                              <a href={row.attachments} target="_blank">
                                {" "}
                                attachment{" "}
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td>{row.updatedBy || "N/A"}</td>
                          <td>{formatDate(row.date) || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
        {activeEditTab === "levelup" && (
          <Modal.Footer>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setShowEditModal(false)}
            >
              Close
            </button>
            <button className="btn btn-sm btn-theme" onClick={handleUpdate}>
              Update
            </button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default SavingTracker;
