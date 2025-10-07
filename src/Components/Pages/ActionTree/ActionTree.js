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
// ag grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./ActionTree.css";
import { MdOutlineRestartAlt } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { requestHeader } from "../../Helper/Constants/constant";
import { toast } from "react-toastify";
import toastMessages from "../../Helper/Constants/toastMessages";
import errorMessages from "../../Helper/Constants/errorMessages";
import Cookies from "universal-cookie";
const cookies = new Cookies();
let token = cookies.get("spendXoToken");

const ActionTree = () => {
  // user details
  const cookies = new Cookies();
  let user = cookies.get("spendXoUser").displayName;
  // STATES
  const [actionTreeFilters, setActionTreeFilters] = useState([]);
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState("");
  const [owner, setOwner] = useState("");
  const [approver, setApprover] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [actionDataLoading, setActionDataLoading] = useState(false);

  // Error states
  const [actionTypeError, setActionTypeError] = useState(false);
  const [actionNameError, setActionNameError] = useState(false);
  const [ownerError, setOwnerError] = useState(false);

  //modal add action popup
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

  //ag grid
  const [actionTreeData, setActionTreeData] = useState([]);
  const [filteredActionData, setFilteredActionData] = useState([]);
  const [rowFont, setRowFont] = useState(11);
  const [rowHeight, setRowHeight] = useState(24);
  // for new action tree form
  const [addInput, setAddInput] = useState([false, false]);
  const [attachment, setAttachment] = useState("");
  const [formData, setFormData] = useState({
    actionType: "",
    actionName: "",
    owner: "",
    approver: "Mohit Raykwar",
    description: "",
  });

  // Fetch action tree data
  const fetchActionTreeData = async () => {
    try {
      setActionDataLoading(true);
      const response = await axios.get(
        `${apiUrls.urlPrefix}/action-tree/action-tree-data`,
        requestHeader.json
      );
      if (response?.data) {
        setActionTreeData(response?.data?.result);
        setFilteredActionData(response?.data?.result);
        setActionDataLoading(false);
      }
    } catch (error) {
      console.log(error);
      setActionDataLoading(false);
      toast.error(toastMessages.errorMsgApi);
    }
  };

  // Fetch Action Tree Filters
  const fetchActionTreeFilters = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/action-tree/action-tree-filters`,
        requestHeader.json
      );
      if (response?.data) {
        setActionTreeFilters(response?.data?.result);
      }
    } catch (error) {
      console.log(error);
      toast.error(toastMessages.errorMsgApi);
    }
  };

  useEffect(() => {
    fetchActionTreeData();
    fetchActionTreeFilters();
  }, []);

  const actionTreeDataColDef = [
    { field: "ActionType", width: 200, filter: "agSetColumnFilter" },
    { field: "ActionNumber", width: 200, filter: "agSetColumnFilter" },
    { field: "ActionName", width: 200, filter: "agSetColumnFilter" },
    { field: "ActionDescription", width: 200, filter: "agSetColumnFilter" },
    { field: "Owner", width: 110, filter: "agSetColumnFilter" },
    { field: "Approver", width: 115, filter: "agSetColumnFilter" },
    { field: "EditedOn", width: 160, filter: "agSetColumnFilter" },
    { field: "Attachment", width: 130, filter: "agSetColumnFilter" },
    { field: "Status", width: 130, filter: "agSetColumnFilter" },
  ];
  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState(actionTreeDataColDef);
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
    setActionName("");
    setActionType("");
    setOwner("");
    setApprover("");
    setFilteredActionData(actionTreeData);
  };

  useEffect(() => {
    const filteredData = actionTreeData.filter((row) => {
      return (
        (!actionName || row.ActionName === actionName) &&
        (!actionType || row.ActionType === actionType) &&
        (!owner || row.Owner === owner) &&
        (!approver || row.Approver === approver)
      );
    });
    setFilteredActionData(filteredData);
  }, [actionName, actionType, owner, approver, actionTreeData]);

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

  const handleChangeInput = (index) => {
    const updatedInputs = [...addInput];
    updatedInputs[index] = !updatedInputs[index];
    setAddInput(updatedInputs);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  // HANDLE RESET FORM
  const handleResetForm = () => {
    setAddInput([false, false]);
    setFormData({
      actionType: "",
      actionName: "",
      owner: "",
      approver: "Mohit Raykwar",
      description: "",
    });
    setActionTypeError(false);
    setActionNameError(false);
    setOwnerError(false);
    setAttachment("");
  };

  // HANDLE NEW ACTION TREE FORM SUBMIT
  const handleSubmit = async () => {
    console.log(formData);

    try {
      // Hierarchical validation

      if (!formData.actionType) {
        setActionTypeError(true);
        return;
      }
      if (!formData.actionName) {
        setActionTypeError(false);
        setActionNameError(true);
        return;
      }

      if (!user) {
        setActionNameError(false);
        setOwnerError(true);
        return;
      }
      if (!formData.approver) {
        return;
      }
      setOwnerError(false);

      setSubmitLoading(true);
      let approverMail = approverValue[formData.approver];
      let ownerMail = approverValue[formData.owner];
      const formDataToSubmit = new FormData();

      // Append form data
      formDataToSubmit.append("ActionType", formData.actionType);
      formDataToSubmit.append("ActionName", formData.actionName);
      formDataToSubmit.append("ActionDescription", formData.description);
      formDataToSubmit.append("Owner", formData.owner);
      formDataToSubmit.append("OwnerMail", ownerMail);
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
        `${apiUrls.urlPrefix}/action-tree/add-new-action-tree`,
        formDataToSubmit,
        requestHeader.mutipart
      );

      if (response?.data) {
        console.log("Success");
        setFormData({
          actionType: "",
          actionName: "",
          owner: "",
          approver: "",
          description: "",
        });
        setAttachment("");
        fetchActionTreeData();
        setSubmitLoading(false);
        toast.success(toastMessages.actionTreeSubmit);
      }
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
      toast.error(toastMessages.errorMsgSubmit);
    }
    handleClose();
  };

  // handle attachments
  const handleAttachment = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setAttachment((prevAttachments) => [...prevAttachments, ...files]); // Add new files to the existing state
  };
  return (
    <div>
      {/* Action DATA FILTERS */}
      <div
        className="d-flex justify-content-between mb-2"
        style={{ gap: "16px", alignItems: "flex-end" }}
      >
        <div className="d-flex" style={{ gap: "16px", alignItems: "flex-end" }}>
          {[
            {
              label: "Action Type",
              value: actionType,
              setValue: setActionType,
              options: actionTreeFilters?.actionTypes || [],
            },
            {
              label: "Action Name",
              value: actionName,
              setValue: setActionName,
              options: actionTreeFilters?.actionNames || [],
            },

            {
              label: "Owner",
              value: owner,
              setValue: setOwner,
              options: actionTreeFilters?.owners,
            },
            {
              label: "Approver",
              value: approver,
              setValue: setApprover,
              options: actionTreeFilters?.approvers,
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

      {/* ADD NEW Action POPUP */}
      <div>
        {" "}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="form-header" closeButton>
            <Modal.Title className="form-head">Add New Action</Modal.Title>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  {addInput[0] ? (
                    // ACTION TYPE FIELD
                    <Form.Control
                      style={{ fontSize: "11px" }}
                      size="lg"
                      type="text"
                      name="actionType"
                      placeholder="Action Type"
                      value={formData.actionType}
                      onChange={handleInputChange}
                      isInvalid={actionTypeError}
                    />
                  ) : (
                    <Form.Select
                      className={actionTypeError ? "is-invalid" : ""}
                      value={formData.actionType || ""}
                      onChange={(e) =>
                        handleSelectChange("actionType", {
                          label: e.target.value,
                          value: e.target.value,
                        })
                      }
                      style={{ fontSize: "12px" }} // Apply font size
                      isInvalid={actionTypeError}
                    >
                      <option value="" disabled style={{ fontSize: "12px" }}>
                        Action Type
                      </option>
                      {actionTreeFilters?.actionTypes?.map((item) => (
                        <option
                          key={item}
                          value={item}
                          style={{ fontSize: "12px" }}
                        >
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                  )}

                  <button
                    className="modal-icon-button"
                    style={{ background: "var(--color-main)", color: "white" }}
                    onClick={() => handleChangeInput(0)}
                  >
                    {addInput[0] ? <FaMinus /> : <FaPlus />}
                  </button>
                </div>

                {/* ACTION NAME FILED */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  {addInput[1] ? (
                    <Form.Control
                      style={{ fontSize: "11px" }}
                      size="lg"
                      type="text"
                      name="actionName"
                      placeholder="Action Name"
                      value={formData.actionName}
                      onChange={handleInputChange}
                      isInvalid={actionNameError}
                    />
                  ) : (
                    <Form.Select
                      className={actionNameError ? "is-invalid" : ""}
                      value={formData.actionName || ""}
                      onChange={(e) =>
                        handleSelectChange("actionName", {
                          label: e.target.value,
                          value: e.target.value,
                        })
                      }
                      style={{ fontSize: "12px" }} // Apply font size
                      isInvalid={actionNameError}
                    >
                      <option value="" disabled style={{ fontSize: "12px" }}>
                        Action Name
                      </option>
                      {actionTreeFilters?.actionNames?.map((item) => (
                        <option
                          key={item}
                          value={item}
                          style={{ fontSize: "12px" }}
                        >
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  <button
                    className="modal-icon-button"
                    style={{ background: "var(--color-main)", color: "white" }}
                    onClick={() => handleChangeInput(1)}
                  >
                    {addInput[1] ? <FaMinus /> : <FaPlus />}
                  </button>
                </div>

                {/* OWNER FILED */}
                <Form.Control
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
                  className="btn-theme-dark"
                  style={{ fontSize: "12px" }}
                  size="sm"
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
      {actionDataLoading && <Loading />}

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
          rowData={filteredActionData}
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

export default ActionTree;
