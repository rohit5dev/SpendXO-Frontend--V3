import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import apiUrls from "../../../Config/apiUrls";
import axios from "axios";
import Loading from "../../Helper/Loading";
import Loading2 from "../../Helper/Loading2";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CiExport } from "react-icons/ci";
// ag grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "../ActionTree/ActionTree.css";
import "./css/CategoryTree.css";
import { MdOutlineRestartAlt } from "react-icons/md";
import { requestHeader } from "../../Helper/Constants/constant";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";
import errorMessages from "../../Helper/Constants/errorMessages";
import Cookies from "universal-cookie";

const CategoryTree = () => {
  // User Details
  const cookies = new Cookies();
  let user = cookies.get("spendXoUser").displayName;
  // STATES
  const [categTreeFilters, setCategTreeFilters] = useState([]);
  const [L1Category, setL1Category] = useState("");
  const [L2Category, setL2Category] = useState("");
  const [owner, setOwner] = useState("");
  const [approver, setApprover] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [categDataLoading, setCategDataLoading] = useState(false);
  // Error states
  const [l1Error, setL1Error] = useState(false);
  const [l2Error, setL2Error] = useState(false);
  const [l3Error, setL3Error] = useState(false);
  const [l4Error, setL4Error] = useState(false);
  const [ownerError, setOwnerError] = useState(false);

  //AG-GRID
  const [categTreeData, setCategTreeData] = useState([]);
  const [filteredCategData, setFilteredCategData] = useState([]);
  const [rowFont, setRowFont] = useState(11);
  const [rowHeight, setRowHeight] = useState(24);
  // NEW CATEGORY CREATION FORM
  const [addInput, setAddInput] = useState([false, false]);
  const [attachment, setAttachment] = useState("");
  const [formData, setFormData] = useState({
    owner: "",
    approver: "Mohit Raykwar",
    description: "",
  });
  const [selectedL1, setSelectedL1] = useState("");
  const [selectedL2, setSelectedL2] = useState("");
  const [selectedL3, setSelectedL3] = useState("");
  const [selectedL4, setSelectedL4] = useState("");

  //modal add category popup
  const [show, setShow] = useState(false);
  const handleClose = () => {
    handleResetForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //export
  const handleExport = () => {
    gridRef.current.api.exportDataAsExcel();
  };

  // Fetch category tree data
  const fetchCategoryTreeData = async () => {
    try {
      setCategDataLoading(true);
      const response = await axios.get(
        `${apiUrls.urlPrefix}/categ-tree/categ-tree-data`,
        requestHeader.json
      );
      if (response?.data) {
        setCategTreeData(response?.data?.result);
        setFilteredCategData(response?.data?.result);
        setCategDataLoading(false);
      }
    } catch (error) {
      console.log(error);
      setCategDataLoading(false);
      // toast.error(toastMessages.errorMsgApi);
      console.log(toastMessages.errorMsgApi);
    }
  };

  // Fetch Category Tree Filters
  const fetchCategoryTreeFilters = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/categ-tree/categ-tree-filters`,
        requestHeader.json
      );
      if (response?.data) {
        setCategTreeFilters(response?.data?.result);
      }
    } catch (error) {
      console.log(error);
      // toast.error(toastMessages.errorMsgFilters);
      console.log(toastMessages.errorMsgFilters);
    }
  };

  useEffect(() => {
    fetchCategoryTreeData();
    fetchCategoryTreeFilters();
  }, []);

  const categTreeDataColDef = [
    { field: "L1Category", width: 180, filter: "agSetColumnFilter" },
    { field: "L2Category", width: 280, filter: "agSetColumnFilter" },
    { field: "L3Category", width: 180, filter: "agSetColumnFilter" },
    { field: "L4Category", width: 300, filter: "agSetColumnFilter" },
    { field: "Owner", filter: "agSetColumnFilter" },
    { field: "Approver", filter: "agSetColumnFilter" },
    { field: "Status", filter: "agSetColumnFilter" },
    { field: "EditedOn", filter: "agSetColumnFilter" },
  ];
  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState(categTreeDataColDef);
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
    setL2Category("");
    setL1Category("");
    setOwner("");
    setApprover("");
    setFilteredCategData(categTreeData);
  };

  useEffect(() => {
    const filteredData = categTreeData.filter((row) => {
      return (
        (!L2Category || row.L2Category === L2Category) &&
        (!L1Category || row.L1Category === L1Category) &&
        (!owner || row.Owner === owner) &&
        (!approver || row.Approver === approver)
      );
    });
    setFilteredCategData(filteredData);
  }, [L2Category, L1Category, owner, approver, categTreeData]);

  // FORM
  //form state
  const approverValue = {
    "Mohit Raykwar": "mohit.raykwar@statxo.com",
    "Rohit Kumar": "rohit.kumar@statxo.com",
    "Abhishek Singh": "abhishek.singh@statxo.com",
    "Prashant Yadav": "prashant.yadav@statxo.com",
    "Nisha Rathee": "nisha.rathee@statxo.com",
    "Vishal Bhasin": "vishal.bhasin@statxo.com",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLE OPTIONAL CATEGORY SELECTION IN NEW CATEG CREATE FORM
  const handleL1Change = (value) => {
    setSelectedL1(value);
    setSelectedL2("");
    setSelectedL3("");
    setSelectedL4("");
  };

  const handleL2Change = (value) => {
    setSelectedL2(value);
    setSelectedL3("");
    setSelectedL4("");
  };

  const handleL3Change = (value) => {
    setSelectedL3(value);
    setSelectedL4("");
  };

  const handleL4Change = (value) => {
    setSelectedL4(value);
  };

  const filteredL2Options = filteredCategData.filter(
    (item) => item.L1Category === selectedL1
  );
  const filteredL3Options = filteredL2Options.filter(
    (item) => item.L2Category === selectedL2
  );
  const filteredL4Options = filteredL3Options.filter(
    (item) => item.L3Category === selectedL3
  );

  // HANDLE RESET FORM
  const handleResetForm = () => {
    setFormData({
      owner: "",
      approver: "Mohit Raykwar",
      description: "",
    });
    setSelectedL1("");
    setSelectedL2("");
    setSelectedL3("");
    setSelectedL4("");
    setAttachment("");

    // reset error states
    setL1Error(false);
    setL2Error(false);
    setL3Error(false);
    setL4Error(false);
    setOwnerError(false);

    // reset l1,l2,l3,l4 categ input
    setIsNewL1(false);
    setIsNewL2(false);
    setIsNewL3(false);
    setIsNewL4(false);
  };

  // HANDLE NEW CATEGORY TREE FORM SUBMIT
  const handleSubmit = async () => {
    try {
      // Hierarchical validation
      if (!selectedL1) {
        setL1Error(true);
        return;
      }
      if (!selectedL2) {
        setL1Error(false);
        setL2Error(true);
        return;
      }
      if (!selectedL3) {
        setL2Error(false);
        setL3Error(true);
        return;
      }
      if (!selectedL4) {
        setL3Error(false);
        setL4Error(true);
        return;
      }
      if (!user) {
        setL4Error(false);
        setOwnerError(true);
        return;
      }
      if (!formData.approver) {
        return;
      }
      setOwnerError(false);

      setSubmitLoading(true);
      let approverMail = approverValue[formData.approver];
      let OwnerMail = approverValue[formData.owner];
      const formDataToSubmit = new FormData();

      // Append form data
      formDataToSubmit.append("l1category", selectedL1);
      formDataToSubmit.append("l2category", selectedL2);
      formDataToSubmit.append("l3category", selectedL3);
      formDataToSubmit.append("l4category", selectedL4);
      formDataToSubmit.append("Description", formData.description);
      formDataToSubmit.append("Owner", formData.owner);
      formDataToSubmit.append("OwnerMail", OwnerMail);
      formDataToSubmit.append("Approver", formData.approver);
      formDataToSubmit.append("ApproverMail", approverMail);

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

      const response = await axios.post(
        `${apiUrls.urlPrefix}/categ-tree/add-new-categ-tree`,
        formDataToSubmit,
        requestHeader.mutipart
      );

      if (response?.data) {
        console.log("Success");
        setFormData({
          L1Category: "",
          L2Category: "",
          L3Category: "",
          L4Category: "",
          owner: "",
          approver: "",
          description: "",
        });
        setAttachment("");
        fetchCategoryTreeData();
        setSubmitLoading(false);
        toast.success(toastMessages.categTreeSubmit);
      }
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
      // toast.error(toastMessages.errorMsgSubmit);
      console.log(toastMessages.errorMsgSubmit);
    }
    handleClose();
  };

  // handle attachments
  const handleAttachment = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setAttachment((prevAttachments) => [...prevAttachments, ...files]); // Add new files to the existing state
  };

  // Button test - add new categ
  const [isNewL1, setIsNewL1] = useState(false);
  const [isNewL2, setIsNewL2] = useState(false);
  const [isNewL3, setIsNewL3] = useState(false);
  const [isNewL4, setIsNewL4] = useState(false);

  const toggleNewL1 = () => {
    setIsNewL1((prev) => !prev);
    if (isNewL1) {
      // If Cancel for L1, reset L2, L3, L4 to select
      setIsNewL2(false);
      setIsNewL3(false);
      setIsNewL4(false);
      setSelectedL2(""); // Reset selected values
      setSelectedL3("");
      setSelectedL4("");
    } else {
      // If input for L1, reset all others to input
      setIsNewL2(true);
      setIsNewL3(true);
      setIsNewL4(true);
    }
  };

  const toggleNewL2 = () => {
    setIsNewL2((prev) => !prev);
    if (isNewL2) {
      // If Cancel for L2, reset L3, L4 to select
      setIsNewL3(false);
      setIsNewL4(false);
      setSelectedL3(""); // Reset selected values
      setSelectedL4("");
    } else {
      // If input for L2, reset L3, L4 to input
      setIsNewL3(true);
      setIsNewL4(true);
    }
  };

  const toggleNewL3 = () => {
    setIsNewL3((prev) => !prev);
    if (isNewL3) {
      // If Cancel for L3, reset L4 to select
      setIsNewL4(false);
      setSelectedL4(""); // Reset selected value
    } else {
      // If input for L3, set L4 to input
      setIsNewL4(true);
    }
  };

  const toggleNewL4 = () => {
    setIsNewL4((prev) => !prev);
  };

  return (
    <div>
      {/* CATEGORY DATA FILTERS */}
      <div
        className="d-flex justify-content-between mb-2"
        style={{ gap: "16px", alignItems: "flex-end" }}
      >
        <div className="d-flex" style={{ gap: "16px", alignItems: "flex-end" }}>
          {[
            {
              label: "L1Category",
              setValue: setL1Category,
              value: L1Category,
              options: categTreeFilters?.L1Category || [],
            },
            {
              label: "L2Category",
              value: L2Category,
              setValue: setL2Category,
              options: categTreeFilters?.L2Category || [],
            },

            {
              label: "Owner",
              value: owner,
              setValue: setOwner,
              options: categTreeFilters?.owners,
            },
            {
              label: "Approver",
              value: approver,
              setValue: setApprover,
              options: categTreeFilters?.approvers,
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
          Add New Category{" "}
          <IoMdAdd
            style={{
              fontSize: "15px",
              marginLeft: "2px",
              paddingBottom: "3px",
            }}
          />
        </Button>
      </div>

      {/* ADD NEW CATEGORY POPUP */}
      <div>
        {" "}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="form-header" closeButton>
            <Modal.Title className="form-head">Add New Category</Modal.Title>
          </Modal.Header>

          {submitLoading ? (
            <Modal.Body>
              <div className="d-flex justify-content-center align-items-center">
                <Loading2 width="100px" height="100px" />
              </div>
            </Modal.Body>
          ) : (
            <>
              <Modal.Body>
                <div>
                  {/* L1 Category */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {isNewL1 ? (
                      <Form.Control
                        className="modal-input"
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL1}
                        onChange={(e) => handleL1Change(e.target.value)}
                        placeholder="Enter new L1 Category"
                        isInvalid={l1Error}
                      />
                    ) : (
                      <Form.Select
                        className={`modal-input`}
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL1}
                        onChange={(e) => handleL1Change(e.target.value)}
                        isInvalid={l1Error}
                      >
                        <option value="">Select L1 Category</option>
                        {[
                          ...new Set(
                            filteredCategData.map((item) => item.L1Category)
                          ),
                        ].map((l1) => (
                          <option key={l1} value={l1}>
                            {l1}
                          </option>
                        ))}
                      </Form.Select>
                    )}

                    <button
                      style={{
                        background: !isNewL1
                          ? "var(--color-main)"
                          : "var(--color-main-light)",
                        color: "white",
                      }}
                      className="modal-icon-button"
                      onClick={() => toggleNewL1()}
                    >
                      {isNewL1 ? <FaMinus /> : <FaPlus />}
                    </button>
                  </div>

                  {/* L2 Category */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {isNewL2 ? (
                      <Form.Control
                        className="modal-input"
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL2}
                        onChange={(e) => handleL2Change(e.target.value)}
                        placeholder="Enter new L2 Category"
                        disabled={!selectedL1}
                        isInvalid={l2Error}
                      />
                    ) : (
                      <Form.Select
                        className="modal-input"
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL2}
                        onChange={(e) => handleL2Change(e.target.value)}
                        disabled={!selectedL1}
                        isInvalid={l2Error}
                      >
                        <option value="">Select L2 Category</option>
                        {[
                          ...new Set(
                            filteredL2Options.map((item) => item.L2Category)
                          ),
                        ].map((l2) => (
                          <option key={l2} value={l2}>
                            {l2}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                    <button
                      className="modal-icon-button"
                      onClick={() => toggleNewL2()}
                      disabled={!selectedL1}
                      style={{
                        background: selectedL1
                          ? "var(--color-main)"
                          : "var(--color-main-light)",
                        color: "white",
                      }}
                    >
                      {isNewL2 ? <FaMinus /> : <FaPlus />}
                    </button>
                  </div>

                  {/* L3 Category */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {isNewL3 ? (
                      <Form.Control
                        className="modal-input"
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL3}
                        onChange={(e) => handleL3Change(e.target.value)}
                        placeholder="Enter new L3 Category"
                        disabled={!selectedL2}
                        isInvalid={l3Error}
                      />
                    ) : (
                      <Form.Select
                        className="modal-input"
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL3}
                        onChange={(e) => handleL3Change(e.target.value)}
                        disabled={!selectedL2}
                        isInvalid={l3Error}
                      >
                        <option value="">Select L3 Category</option>
                        {[
                          ...new Set(
                            filteredL3Options.map((item) => item.L3Category)
                          ),
                        ].map((l3) => (
                          <option key={l3} value={l3}>
                            {l3}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                    <button
                      className="modal-icon-button"
                      onClick={() => toggleNewL3()}
                      disabled={!selectedL2}
                      style={{
                        background: selectedL2
                          ? "var(--color-main)"
                          : "var(--color-main-light)",
                        color: "white",
                      }}
                    >
                      {isNewL3 ? <FaMinus /> : <FaPlus />}
                    </button>
                  </div>

                  {/* L4 Category */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {isNewL4 ? (
                      <Form.Control
                        className="modal-input"
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL4}
                        onChange={(e) => handleL4Change(e.target.value)}
                        placeholder="Enter new L4 Category"
                        disabled={!selectedL3}
                        isInvalid={l4Error}
                      />
                    ) : (
                      <Form.Select
                        className="modal-input"
                        style={{ fontSize: "11px", flex: 1 }}
                        value={selectedL4}
                        onChange={(e) => handleL4Change(e.target.value)}
                        disabled={!selectedL3}
                        isInvalid={l4Error}
                      >
                        <option value="">Select L4 Category</option>
                        {[
                          ...new Set(
                            filteredL4Options.map((item) => item.L4Category)
                          ),
                        ].map((l4) => (
                          <option
                            key={l4}
                            value={l4}
                            disabled={true}
                            style={{ backgroundColor: "#d4d4d4" }}
                          >
                            {l4}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                    <button
                      className="modal-icon-button"
                      onClick={() => toggleNewL4()}
                      disabled={!selectedL3}
                      style={{
                        background: selectedL3
                          ? "var(--color-main)"
                          : "var(--color-main-light)",
                        color: "white",
                      }}
                    >
                      {isNewL4 ? <FaMinus /> : <FaPlus />}
                    </button>
                  </div>
                </div>

                {/* OWNER FILED */}
                <Form.Control
                  className="modal-input"
                  style={{ fontSize: "11px", marginTop: "10px" }}
                  size="lg"
                  type="text"
                  name="owner"
                  placeholder="Owner"
                  value={user}
                  disabled
                  isInvalid={ownerError}
                />

                {/* APPROVER FILED */}
                <Form.Select
                  className="modal-input"
                  aria-label="Approver"
                  style={{ fontSize: "11px", marginTop: "10px" }}
                  name="approver"
                  value={formData.approver}
                  onChange={handleInputChange}
                >
                  {[
                    "Mohit Raykwar",
                    "Rohit Kumar",
                    "Prashant Yadav",
                    "Nisha Rathee",
                    "Vishal Bhasin",
                  ].map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </Form.Select>

                {/* DESCRIPTION FILED */}
                <Form.Control
                  placeholder="Description"
                  as="textarea"
                  rows={3}
                  style={{ fontSize: "11px", marginTop: "10px" }}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />

                <Form.Control
                  className="modal-input"
                  style={{ fontSize: "11px", marginTop: "10px" }}
                  size="lg"
                  type="file"
                  name="attachment"
                  onChange={handleAttachment}
                  multiple
                />
              </Modal.Body>
              <Modal.Footer className="form-header">
                <Button
                  style={{ fontSize: "12px" }}
                  size="sm"
                  variant="outline-danger"
                  onClick={handleResetForm}
                >
                  Reset
                </Button>
                <Button
                  style={{ fontSize: "12px" }}
                  size="sm"
                  className="btn-theme-dark"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>

      {/* loading  */}
      {categDataLoading && <Loading />}

      {/* AG-GRID TABLE FOR ACTION TREE DATA */}
      <div
        className="ag-theme-alpine global-ag-table"
        style={{
          fontSize: rowFont,
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          rowData={filteredCategData}
          rowHeight={rowHeight}
          headerHeight={30}
          pagination={true}
          paginationPageSize={1000}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};

export default CategoryTree;
