import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import { Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import apiUrls from "../../../Config/apiUrls";
import axios from "axios";
import Loading from "../../Helper/Loading";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import the required icons
import { IoMdAdd } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { MdOutlineRestartAlt } from "react-icons/md";
import "./css/ActionTracker.css";
// ag grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Cookies from "universal-cookie";
import { months, requestHeader } from "../../Helper/Constants/constant";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";
import errorMessages from "../../Helper/Constants/errorMessages";

const ActionTracker = () => {
  let cookies = new Cookies();
  let user = cookies.get("spendXoUser");
  // STATES
  const [activeTab, setActiveTab] = useState("actionform");
  const [loadingAT, setLoadingAT] = useState(false);
  const [loadingFT, setLoadingFT] = useState(false);
  const [loadingAL, setLoadingAL] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  //FILTERS STATE
  const [l1Category, setL1Category] = useState("");
  const [l2Category, setL2Category] = useState("");
  const [l3Category, setL3Category] = useState("");
  const [l4Category, setL4Category] = useState("");
  const [country, setCountry] = useState("");
  const [supplier, setSupplier] = useState("");
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState("");
  const [actionNameFilter, setActionNameFilter] = useState([]);
  const [actionTypeFilter, setActionTypeFilter] = useState([]);
  const [l1CategoryFilter, setL1CategoryFilter] = useState([]);
  const [l2CategoryFilter, setL2CategoryFilter] = useState([]);
  const [l3CategoryFilter, setL3CategoryFilter] = useState([]);
  const [l4CategoryFilter, setL4CategoryFilter] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);
  const [supplierFilter, setSupplierFilter] = useState([]);
  //AG-GRID
  const [actionTrackerData, setActionTrackerData] = useState([]);
  const [filteredActionTrackerData, setFilteredActionTrackerData] = useState(
    []
  );
  const [rowFont, setRowFont] = useState(11);
  const [rowHeight, setRowHeight] = useState(24);
  //FORM WIDNOW STATE
  const [formWindow, setFormWindow] = useState(false);

  //FORM STATES
  const [undoChange, setUndoChange] = useState([]);
  const [finalChange, setFinalChange] = useState([]);
  const [actionNameForm, setActionNameForm] = useState("");
  const [actionTypeForm, setActionTypeForm] = useState("");
  const [typeDetailForm, setTypeDetailForm] = useState("");
  const [valueForm, setValueForm] = useState("");
  const [discountForm, setDiscountForm] = useState("");
  const [owner, setOwner] = useState(user.displayName);
  const [supplierForm, setSupplierForm] = useState("");
  const [categoryForm, setCategoryForm] = useState("");
  const [subCategoryForm, setSubCategoryForm] = useState("");
  const [itemId, setItemId] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [pre, setPre] = useState(0);
  const [post, setPost] = useState(0);
  const [dis, setDis] = useState(0);
  const [formTable, setFormTable] = useState([]);
  const [filteredFormTable, setFilteredFormTable] = useState([]);
  //FORM ERROR
  //error states
  const [actionNameError, setActionNameError] = useState(false);
  const [actionTypeError, setActionTypeError] = useState(false);
  const [typeDetailError, setTypeDetailError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [discountError, setDiscountError] = useState(false);
  const [supplierError, setSupplierError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const [itemIdError, setItemIdError] = useState(false);
  const [startMonthError, setStartMonthError] = useState(false);
  const [startYearError, setStartYearError] = useState(false);
  const [endMonthError, setEndMonthError] = useState(false);
  const [endYearError, setEndYearError] = useState(false);

  //FORM LIST
  const [actionList, setActionList] = useState([]);
  const [actionNameList, setActionNameList] = useState([]);
  const [actionTypeList, setActionTypeList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [itemIdList, setItemIdList] = useState([]);

  //Logs
  const [logsData, setLogsData] = useState();

  //HANDLE FORM WINDOW VISIBILITY
  const handleShow = () => {
    setFormWindow(!formWindow);
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
    setL1CategoryFilter(distinctValues("ReportingLevel1"));
    setL2CategoryFilter(distinctValues("ReportingLevel2"));
    setL3CategoryFilter(distinctValues("ReportingLevel3"));
    setL4CategoryFilter(distinctValues("ReportingLevel4"));
    setCountryFilter(distinctValues("Entity_Country"));
    setSupplierFilter(distinctValues("VendorNameHarmonized"));
    setActionTypeFilter(distinctValues("ActionType"));
    setActionNameFilter(distinctValues("ActionName"));
  };

  //LOAD ACTION LIST FOR FORM
  const handleLoadActionList = (actionTree) => {
    const an = [],
      at = [];
    actionTree.forEach((x) => {
      const actionNameValue = x["ActionName"] ? x["ActionName"].trim() : null;
      const actionTypeValue = x["ActionType"] ? x["ActionType"].trim() : null;

      if (actionNameValue && !an.includes(actionNameValue)) {
        an.push(actionNameValue);
      }

      if (actionTypeValue && !at.includes(actionTypeValue)) {
        at.push(actionTypeValue);
      }
    });

    setActionNameList(an);
    setActionTypeList(at);
  };

  //PREPARE FORM TABLE DATA AND LISTS
  function handlePrepareFormTable(res) {
    let data1 = res[0];
    let arr = [];
    data1.forEach((x) => {
      let date = x.MonthYear.slice(0, 7).split("-");
      x.MonthYear = Number(date[1]) + "/" + date[0];
      x["AmountEUR(Pre)"] = Number(x["AmountEUR(Pre)"]).toFixed(2);
      arr.push(x);
    });
    setFilteredFormTable(arr);
    setFormTable(arr);
    let data = res[0];
    let a = [],
      b = [],
      c = [],
      d = [];
    data.forEach((x) => {
      if (!a.some((z) => z === x.VendorNameHarmonized))
        a.push(x.VendorNameHarmonized);
      if (!b.some((z) => z === x.ReportingLevel3)) b.push(x.ReportingLevel3);
      if (!c.some((z) => z === x.ReportingLevel4)) c.push(x.ReportingLevel4);
      if (!d.some((z) => z === x["Item Id"])) d.push(x["Item Id"]);
    });
    setSupplierList(a);
    setCategoryList(b);
    setSubCategoryList(c);
    setItemIdList(d);
  }

  // Fetch Action tracker data
  const fetchActionTrackerData = async () => {
    try {
      setLoadingAT(true);
      const response = await axios.get(
        `${apiUrls.urlPrefix}/action-tracker-data`,
        requestHeader.json
      );
      if (response?.data) {
        setActionTrackerData(response?.data?.result);
        setFilteredActionTrackerData(response?.data?.result);
        handleLoadFilters(response?.data?.result);
        setLoadingAT(false);
      }
    } catch (error) {
      console.log(toastMessages.errorMsgApi);
      setLoadingAT(false);
      console.log(error);
      console.log(toastMessages.errorMsgApi);
    }
  };

  //FETCH ACTION TREE LIST
  const fetchActionTreeList = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/action-tree-list`,
        requestHeader.json
      );
      if (response?.data) {
        setActionList(response?.data.result);
        handleLoadActionList(response?.data.result);
      }
    } catch (error) {
      console.log(error);
      console.log(toastMessages.errorMsgApi);
    }
  };

  // Fetch ACTION FORM TABLE
  const fetchActionFormTable = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/action-table`,
        requestHeader.json
      );
      if (response?.data) {
        setLoadingFT(false);
        handlePrepareFormTable(response?.data?.result);
      }
    } catch (error) {
      console.log(toastMessages.errorMsgApi);
      setLoadingFT(false);
      console.log(error);
      console.log(toastMessages.errorMsgApi);
    }
  };

  //HANDLE LOAD ACTION LOGS
  const fetchActionLogsData = async (cn) => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/action-logs`,
        requestHeader.json
      );
      if (response?.data) {
        setLoadingAL(false);
        setLogsData(response?.data?.result);
        if (cn === true) setActiveTab("actionlogs");
      }
    } catch (error) {
      console.log(toastMessages.errorMsgApi);
      setLoadingAL(false);
      console.log(error);
      console.log(toastMessages.errorMsgApi);
    }
  };

  useEffect(() => {
    fetchActionTrackerData();
    fetchActionTreeList();
    fetchActionFormTable();
    fetchActionLogsData();
  }, []);

  const actionTrackerDataColDef = [
    {
      field: "CompanyName",
      width: 140,
    },
    { field: "BusinessUnit", width: 135 },
    { field: "BusinessUnitName", width: 170 },
    { field: "Channel", width: 105 },
    { field: "VendorNameHarmonized", width: 150 },
    { field: "ReportingLevel1", width: 160 },
    { field: "ReportingLevel2", width: 160 },
    { field: "ReportingLevel3", width: 160 },
    { field: "ReportingLevel4", width: 160 },
    { field: "Type", width: 100 },
    { field: "Quantity", width: 100 },
    { field: "AmountEUR", width: 100 },
    { field: "PostingYear", width: 100 },
    { field: "PostingMonth", width: 100 },
    { field: "Entity_Country", width: 100 },
    { field: "Entity_Currency", width: 100 },
    { field: "Entity_HoldingPrimaryClusterP" },
    { field: "Entity_OperatingUnitP", width: 150 },
    { field: "Entity_PrimaryClusterP" },
    { field: "Entity_RegionP", width: 120 },
    { field: "PostingDate" },
    { field: "ItemType", width: 100 },
    { field: "FinanceType", width: 100 },
    { field: "AmountLCY", width: 100 },
    { field: "YearMonth", width: 100 },
    { field: "MonthIndex", width: 100 },
    {
      field: "ActionType",
      width: 150,
    },
    { field: "ActionNumber", width: 150 },
    {
      field: "ActionName",
      width: 150,
    },
    {
      field: "Value/Percent",
      width: 100,
    },
    {
      field: "NumericalValue",
      width: 100,
    },
    { field: "ActionDescription", width: 100 },
    { field: "Status", width: 100 },
    { field: "EditedBy", width: 100 },
    { field: "EditedOn", width: 150 },
    {
      field: "StartingMonth",
      width: 150,
    },
    {
      field: "EndingMonth",
      width: 150,
    },
  ];

  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState(actionTrackerDataColDef);
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
    setCountry("");
    setSupplier("");
    setActionType("");
    setActionName("");
  };

  useEffect(() => {
    const filteredData = actionTrackerData.filter((row) => {
      return (
        (!l1Category || row["ReportingLevel1"] === l1Category) &&
        (!l2Category || row["ReportingLevel2"] === l2Category) &&
        (!l3Category || row["ReportingLevel3"] === l3Category) &&
        (!l4Category || row["ReportingLevel4"] === l4Category) &&
        (!country || row["Entity_Country"] === country) &&
        (!supplier || row["VendorNameHarmonized"] === supplier) &&
        (!actionType || row["ActionType"] === actionType) &&
        (!actionName || row["ActionName"] === actionName)
      );
    });

    setFilteredActionTrackerData(filteredData);
  }, [
    l1Category,
    l2Category,
    l3Category,
    l4Category,
    country,
    supplier,
    actionType,
    actionName,
    actionTrackerData,
  ]);

  //form grid

  // const onGridReadyForm = () => {
  //   gridRefForm.current.api.setHeaderHeight(24);
  //   gridRefForm.current.api.onRowHeightChanged();
  // };

  const gridRefForm = useRef();
  const formColumnDefs = [
    {
      field: "VendorNameHarmonized",

      headerName: "Supplier",
      width: 125,
    },
    { field: "ReportingLevel3", headerName: "Category", width: 120 },
    {
      field: "ReportingLevel4",
      headerName: "Subcategory",
      width: 135,
    },
    { field: "MonthYear", width: 115 },
    { field: "Item Id", width: 100 },
    {
      field: "AmountEUR(Pre)",
      headerName: "PreAmount",
      width: 125,
      aggFunc: "sum",
    },
    {
      field: "AmountEUR(Post)",
      pinned: "right",
      headerName: "PostAmount",
      width: 125,
      aggFunc: "sum",
    },
    { field: "Percentage/Value", width: 100 },
    { field: "Numeric Value", headerName: "Value", width: 90 },
    { field: "Discount", headerName: "Discount Type", width: 115 },
    { field: "ActionName", width: 120 },
    { field: "ActionType", width: 120 },
    { field: "Edited By", width: 100 },
    { field: "Edited On", width: 100 },
  ];

  const formDefaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      headerClass: "grid-style",
      cellStyle: { fontSize: "10px" },
    };
  }, []);

  const getRowStyle = (params) => {
    let date = params.data.MonthYear.split("/");
    let rowDate = new Date(`${date[0]}/01/${date[1]}`);
    let startDate = new Date(`${startMonth}/01/${startYear}`);
    let endDate = new Date(`${endMonth}/01/${endYear}`);
    if (
      startMonth !== "" &&
      endMonth !== "" &&
      startYear !== "" &&
      endYear !== "" &&
      rowDate >= startDate &&
      rowDate <= endDate
    ) {
      return { background: "#44CD5B", color: "white" };
    } else return null;
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (actionNameForm === "") {
      setActionNameError(true);
    } else {
      setActionNameError(false);
    }
    if (actionTypeForm === "") {
      setActionTypeError(true);
    } else {
      setActionTypeError(false);
    }
    if (typeDetailForm === "") {
      setTypeDetailError(true);
    } else {
      setTypeDetailError(false);
    }
    if (valueForm === "") {
      setValueError(true);
    } else if (/^\d+$/.test(valueForm) === false) {
      setValueError(true);
    } else {
      setValueError(false);
    }
    if (discountForm === "") {
      setDiscountError(true);
    } else {
      setDiscountError(false);
    }
    if (supplierForm === "") {
      setSupplierError(true);
    } else {
      setSupplierError(false);
    }
    if (categoryForm === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
    if (subCategoryForm === "") {
      setSubCategoryError(true);
    } else {
      setSubCategoryError(false);
    }
    if (itemId === "") {
      setItemIdError(true);
    } else {
      setItemIdError(false);
    }
    if (startMonth === "") {
      setStartMonthError(true);
    } else {
      setStartMonthError(false);
    }
    if (startYear === "") {
      setStartYearError(true);
    } else {
      setStartYearError(false);
    }
    if (endMonth === "") {
      setEndMonthError(true);
    } else {
      setEndMonthError(false);
    }
    if (endYear === "") {
      setEndYearError(true);
    } else {
      setEndYearError(false);
    }

    if (
      actionNameForm === "" ||
      actionTypeForm === "" ||
      typeDetailForm === "" ||
      valueForm === "" ||
      supplierForm === "" ||
      categoryForm === "" ||
      subCategoryForm === "" ||
      discountForm === "" ||
      itemId === "" ||
      startMonth === "" ||
      startYear === "" ||
      endMonth === "" ||
      endYear === ""
    )
      return;
    else {
      let data = filteredFormTable;
      let undo = [],
        final = [],
        final2 = [];
      let a = 0,
        b = 0,
        c = 0;
      data.forEach((x, i) => {
        let date = x.MonthYear.split("/");
        let rowDate = new Date(`${date[0]}/01/${date[1]}`);
        let startDate = new Date(`${startMonth}/01/${startYear}`);
        let endDate = new Date(`${endMonth}/01/${endYear}`);
        let obj = x;
        if (rowDate >= startDate && rowDate <= endDate) {
          undo.push([
            i,
            x["Percentage/Value"],
            x["Numeric Value"],
            x.Discount,
            x.ActionName,
            x.ActionType,
            x["Edited By"],
            x["Edited On"],
            x[["AmountEUR(Pre)"]],
            x["AmountEUR(Post)"],
          ]);

          let amount = Number(x["AmountEUR(Pre)"]);
          let d = 0,
            price = 0;
          if (typeDetailForm === "Percentage") {
            d = (amount / 100) * Number(valueForm);
          } else d = Number(valueForm);
          price = amount - d;
          a = a + amount;
          b = b + d;
          c = c + price;
          obj["AmountEUR(Post)"] = price;
          obj["ActionName"] = actionNameForm;
          obj["ActionType"] = actionTypeForm;
          obj["Edited By"] = owner;
          obj["Numeric Value"] = valueForm;
          obj["Discount"] = discountForm;
          obj["Percentage/Value"] = typeDetailForm;
          final2.push(obj);
        }
        final.push(obj);
      });
      setUndoChange(undo);
      setFilteredFormTable(final);
      setFinalChange(final2);
      setPre(a);
      setDis(b);
      setPost(c);
      gridRefForm.current.api.refreshCells();
    }
  };

  const resetChanges = () => {
    let data = filteredFormTable;
    let undo = undoChange;

    undo.forEach((x) => {
      let index = x[0];
      let obj = data[index];
      obj["Percentage/Value"] = x[1];
      obj["Numeric Value"] = x[2];
      obj["Discount"] = x[3];
      obj["ActionName"] = x[4];
      obj["ActionType"] = x[5];
      obj["Edited By"] = x[6];
      obj["Edited On"] = x[7];
      obj[["AmountEUR(Pre)"]] = x[8];
      obj[["AmountEUR(Post)"]] = x[9];
      data[index] = obj;
    });
    setFilteredFormTable(data);
    setUndoChange([]);
    setFinalChange([]);
    setPre(0);
    setPost(0);
    setDis(0);
    gridRefForm.current.api.refreshCells();
  };

  const resetForm = (cn) => {
    //state
    setActionNameForm("");
    setActionTypeForm("");
    setTypeDetailForm("");
    setValueForm("");
    // setOwner("");
    setDiscountForm("");
    setSupplierForm("");
    setCategoryForm("");
    setSubCategoryForm("");
    setItemId("");
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");

    //error
    setActionNameError(false);
    setActionTypeError(false);
    setTypeDetailError(false);
    setValueError(false);
    setDiscountError(false);
    setSupplierError(false);
    setCategoryError(false);
    setSubCategoryError(false);
    setItemIdError(false);
    setStartMonthError(false);
    setStartYearError(false);
    setEndMonthError(false);
    setEndYearError(false);
    if (cn) resetChanges();
  };

  // section 1 filter apply
  useEffect(() => {
    let arr = actionList;
    if (actionNameForm !== "") {
      arr = arr.filter((x) => x.ActionName === actionNameForm);
    }
    if (actionTypeForm !== "") {
      arr = arr.filter((x) => x.ActionType === actionTypeForm);
    }
    handleLoadActionList(arr);
  }, [actionNameForm, actionTypeForm, actionList]);

  // form supplier & category filter apply
  useEffect(() => {
    let arr = formTable;
    if (!arr) return;
    let a = [],
      b = [],
      c = [],
      d = [];
    if (supplierForm !== "") {
      arr = arr.filter(
        (x) => x.VendorNameHarmonized.trim() === supplierForm.trim()
      );
    }
    if (categoryForm !== "") {
      arr = arr.filter((x) => x.ReportingLevel3.trim() === categoryForm.trim());
    }
    if (subCategoryForm !== "") {
      arr = arr.filter(
        (x) => x.ReportingLevel4.trim() === subCategoryForm.trim()
      );
    }
    if (itemId !== "") {
      arr = arr.filter((x) => x["Item Id"].trim() === itemId.trim());
    }

    setFilteredFormTable(arr);

    arr.forEach((x) => {
      if (!a.some((z) => z === x["VendorNameHarmonized"].trim()))
        a.push(x["VendorNameHarmonized"].trim());
      if (!b.some((z) => z === x["ReportingLevel3"].trim()))
        b.push(x["ReportingLevel3"].trim());
      if (!c.some((z) => z === x["ReportingLevel4"].trim()))
        c.push(x["ReportingLevel4"].trim());
      if (!d.some((z) => z === x["Item Id"].trim()))
        d.push(x["Item Id"].trim());
    });
    setSupplierList(a);
    setCategoryList(b);
    setSubCategoryList(c);
    setItemIdList(d);
  }, [supplierForm, categoryForm, subCategoryForm, itemId, formTable]);

  const handleSubmit = async () => {
    setLoadingForm(true);
    let data = finalChange;
    // setSubmitLoading(true);
    await axios
      .put(
        `${apiUrls.urlPrefix}/action-update`,
        {
          data: JSON.stringify(data),
        },
        requestHeader.json
      )
      .then((res) => {
        toast.success(toastMessages.updationSubmit);
        setLoadingForm(false);
        // setSubmitLoading(false);
        setUndoChange([]);
        setFinalChange([]);
        resetForm(false);
        fetchActionLogsData(true);
      })
      .catch((error) => {
        setLoadingForm(false);
        // setSubmitLoading(false);
        console.log(error.message);
        console.log(toastMessages.errorMsgSubmit);
      });
  };

  //ACTION LOGS TABLE
  const gridRefLogs = useRef();
  const logsColumnDefs = [
    {
      field: "VendorNameHarmonized",

      headerName: "Supplier",
      width: 125,
    },
    { field: "ReportingLevel3", headerName: "Category", width: 120 },
    {
      field: "ReportingLevel4",
      headerName: "Subcategory",
      width: 135,
    },
    { field: "Item Id", width: 100 },
    { field: "MonthYear", headerName: "Plan Range", width: 150 },
    {
      field: "PreAmounts",
      pinned: "right",
      headerName: "PreAmount",
      width: 112,
      aggFunc: "sum",
      cellClass: "post-cell",
    },
    {
      field: "Difference",
      pinned: "right",
      headerName: "Discount",
      width: 105,
      aggFunc: "sum",
      cellClass: "pre-cell",
    },
    {
      field: "PostAmounts",
      pinned: "right",
      headerName: "PostAmount",
      width: 114,
      aggFunc: "sum",
      cellClass: "post-cell",
    },
    { field: "ActionName", width: 120 },
    { field: "ActionType", width: 120 },
    { field: "Discount", headerName: "Offer Type", width: 115 },
    { field: "Percentage/Value", headerName: "Unit", width: 100 },
    { field: "Numeric Value", headerName: "Value", width: 90 },
    { field: "Edited By", width: 100 },
    { field: "Edited On", width: 100 },
  ];

  const logsDefaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      headerClass: "grid-style",
      cellStyle: { fontSize: "10px" },
    };
  }, []);

  return (
    <div>
      {!formWindow ? (
        <div>
          {/* CATEGORY DATA FILTERS */}
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
                  label: "Action Name",
                  value: actionName,
                  setValue: setActionName,
                  options: actionNameFilter,
                },
                {
                  label: "Action Type",
                  value: actionType,
                  setValue: setActionType,
                  options: actionTypeFilter,
                },
                {
                  label: "Country",
                  value: country,
                  setValue: setCountry,
                  options: countryFilter,
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
                  <Form.Label className="global-filter-label">
                    {label}
                  </Form.Label>
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

            <Button
              className="btn-theme"
              onClick={handleShow}
              size="sm"
              style={{ fontSize: "10px", margin: "2px 5px" }}
            >
              Add New Action{" "}
              <IoMdAdd
                style={{
                  fontSize: "15px",
                  marginLeft: "2px",
                  paddingBottom: "3px",
                }}
              />
            </Button>
          </div>
          {/* AG-GRID TABLE FOR Action Tacker DATA */}
          <div
            className="ag-theme-alpine global-ag-table"
            style={{
              fontSize: rowFont,
            }}
          >
            {loadingAT ? (
              <Loading />
            ) : (
              <AgGridReact
                ref={gridRef}
                onGridReady={onGridReady}
                rowData={filteredActionTrackerData}
                rowHeight={rowHeight}
                headerHeight={30}
                pagination={true}
                paginationPageSize={1000}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onCellClicked={cellClickedListener}
              />
            )}
          </div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <Button
            style={{
              fontSize: "10px",
              position: "absolute",
              right: 10,
              top: 5,
              width: "150px",
            }}
            size="sm"
            className="btn-theme"
            onClick={() => {
              setFormWindow(false);
            }}
          >
            Go To Action Tracker
          </Button>
          {/* FORM LAYOUT AND LOGS */}
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            id="justify-tab-example"
            justify
            className="global-tabs"
          >
            <Tab eventKey="actionform" title="Action Form">
              {loadingForm && <Loading />}

              <div className="form-window">
                <div className="form-card">
                  <p className="head-theme">Action & Discount</p>
                  <div className="form-end">
                    {[
                      {
                        label: "Action Name",
                        value: actionNameForm,
                        setValue: setActionNameForm,
                        options: actionNameList,
                        error: actionNameError,
                        select: true,
                      },
                      {
                        label: "Action Type",
                        value: actionTypeForm,
                        setValue: setActionTypeForm,
                        options: actionTypeList,
                        error: actionTypeError,
                        select: true,
                      },
                      {
                        label: "Offer Type",
                        value: discountForm,
                        setValue: setDiscountForm,
                        options: ["Discount", "Rebate"],
                        error: discountError,
                        select: true,
                      },
                      {
                        label: "Unit & Value",
                        value: [typeDetailForm, valueForm],
                        setValue: [setTypeDetailForm, setValueForm],
                        options: ["Percentage", "Value"],
                        error: [typeDetailError, valueError],
                        select: false,
                        error: [typeDetailError, valueError],
                      },
                    ].map(
                      (
                        { label, value, setValue, options, select, error },
                        index
                      ) => (
                        <Form.Group
                          key={index}
                          className="global-filter-input"
                          style={{ width: "100%" }}
                        >
                          <Form.Label className="global-filter-label">
                            {label}
                          </Form.Label>
                          {select ? (
                            <Form.Select
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              style={{ fontSize: "11px" }}
                              isInvalid={error}
                            >
                              <option value="">Select Option</option>
                              {options?.map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))}
                            </Form.Select>
                          ) : (
                            <InputGroup className="mb-3">
                              <Form.Select
                                value={value[0]}
                                onChange={(e) => setValue[0](e.target.value)}
                                style={{ fontSize: "11px" }}
                                isInvalid={error[0]}
                              >
                                <option value="">Select Option</option>
                                {options?.map((x) => (
                                  <option key={x} value={x}>
                                    {x}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control
                                isInvalid={error[1]}
                                type="text"
                                value={value[1]}
                                placeholder="Value"
                                onChange={(e) => setValue[1](e.target.value)}
                                style={{ fontSize: "11px" }}
                                disabled={label === "Owner" ? true : false}
                              />
                            </InputGroup>
                          )}
                        </Form.Group>
                      )
                    )}
                  </div>
                </div>

                <div className="form-card">
                  <p className="head-theme">Supplier & Category</p>
                  <div className="form-end">
                    {[
                      {
                        label: "Supplier",
                        value: supplierForm,
                        setValue: setSupplierForm,
                        options: supplierList,
                        error: supplierError,
                        select: true,
                      },
                      {
                        label: "Item Id",
                        value: itemId,
                        setValue: setItemId,
                        options: itemIdList,
                        error: itemIdError,
                        select: true,
                      },
                      {
                        label: "Category",
                        value: categoryForm,
                        setValue: setCategoryForm,
                        options: categoryList,
                        error: categoryError,
                        select: true,
                      },
                      {
                        label: "Sub Category",
                        value: subCategoryForm,
                        setValue: setSubCategoryForm,
                        options: subCategoryList,
                        error: subCategoryError,
                        select: true,
                      },
                    ].map(
                      (
                        { label, value, setValue, options, select, error },
                        index
                      ) => (
                        <Form.Group
                          key={index}
                          className="global-filter-input"
                          style={{ width: "100%" }}
                        >
                          <Form.Label className="global-filter-label">
                            {label}
                          </Form.Label>
                          <Form.Select
                            isInvalid={error}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            style={{ fontSize: "11px" }}
                          >
                            <option value="">Select Option</option>
                            {options?.map((x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      )
                    )}
                  </div>
                </div>

                <div className="form-card">
                  <p className="head-theme">Offer Range</p>
                  <div className="form-end">
                    {[
                      {
                        label: "Start Month",
                        value: startMonth,
                        setValue: setStartMonth,
                        options: months,
                        error: startMonthError,
                        select: true,
                      },
                      {
                        label: "Start Year",
                        value: startYear,
                        setValue: setStartYear,
                        options: ["2024"],
                        error: startYearError,
                        select: true,
                      },
                      {
                        label: "End Month",
                        value: endMonth,
                        setValue: setEndMonth,
                        options: months,
                        error: endMonthError,
                        select: true,
                      },
                      {
                        label: "End Year",
                        value: endYear,
                        setValue: setEndYear,
                        options: ["2024"],
                        error: endYearError,
                        select: true,
                      },
                    ].map(
                      (
                        { label, value, setValue, options, select, error },
                        index
                      ) => (
                        <Form.Group
                          key={index}
                          className="global-filter-input"
                          style={{ width: "100%" }}
                        >
                          <Form.Label className="global-filter-label">
                            {label}
                          </Form.Label>
                          <Form.Select
                            isInvalid={error}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            style={{ fontSize: "11px" }}
                          >
                            <option value="">Select Option</option>
                            {options?.map((x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      )
                    )}
                  </div>
                </div>

                <div className="form-card-btn">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="apply-tooltip" style={{ fontSize: "10px" }}>
                        Apply form action
                      </Tooltip>
                    }
                  >
                    <Button
                      className="btn-theme-dark"
                      size="sm"
                      style={{ fontSize: "10px", margin: "5px", width: "100%" }}
                      onClick={handleApply}
                      disabled={undoChange.length === 0 ? false : true}
                      toolt
                    >
                      Apply
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="apply-tooltip" style={{ fontSize: "10px" }}>
                        Submit applied action
                      </Tooltip>
                    }
                  >
                    <Button
                      className="btn-theme-dark"
                      size="sm"
                      style={{ fontSize: "10px", margin: "5px", width: "100%" }}
                      onClick={handleSubmit}
                      disabled={undoChange.length !== 0 ? false : true}
                    >
                      Submit
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="apply-tooltip" style={{ fontSize: "10px" }}>
                        Reset form and applied changes
                      </Tooltip>
                    }
                  >
                    <Button
                      className="btn-theme-dark"
                      size="sm"
                      style={{ fontSize: "10px", margin: "5px", width: "100%" }}
                      onClick={() => {
                        resetForm(true);
                      }}
                    >
                      Reset
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="apply-tooltip" style={{ fontSize: "10px" }}>
                        Undo applied changes
                      </Tooltip>
                    }
                  >
                    <Button
                      className="btn-theme-dark"
                      size="sm"
                      style={{ fontSize: "10px", margin: "5px", width: "100%" }}
                      onClick={resetChanges}
                    >
                      Undo
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <div
                className="ag-theme-alpine"
                style={{
                  width: "100%",
                  height: "60vh",
                  fontWeight: "normal",
                  marginTop: "5px",
                  fontSize: rowFont,
                }}
              >
                {loadingFT ? (
                  <div
                    style={{
                      position: "relative",
                      height: "60vh !important",
                    }}
                  >
                    <Loading />
                  </div>
                ) : (
                  <AgGridReact
                    ref={gridRefForm}
                    rowData={filteredFormTable} // Row Data for Rows
                    columnDefs={formColumnDefs} // Column Defs for Columns
                    defaultColDef={formDefaultColDef}
                    headerHeight={25}
                    rowHeight={24}
                    // onGridReady={onGridReadyForm}
                    animateRows={true}
                    getRowStyle={getRowStyle}
                  />
                )}
              </div>
            </Tab>
            <Tab eventKey="actionlogs" title="Action Logs">
              <div
                className="ag-theme-alpine"
                style={{
                  width: "100%",
                  height: "80vh",
                  fontWeight: "normal",
                  marginTop: "5px",
                  fontSize: rowFont,
                }}
              >
                {loadingAL ? (
                  <div
                    style={{
                      position: "relative",
                      height: "80vh !important",
                    }}
                  >
                    <Loading />
                  </div>
                ) : (
                  <AgGridReact
                    ref={gridRefLogs}
                    rowData={logsData} // Row Data for Rows
                    columnDefs={logsColumnDefs} // Column Defs for Columns
                    defaultColDef={logsDefaultColDef}
                    headerHeight={25}
                    rowHeight={24}
                    animateRows={true}
                  />
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ActionTracker;
