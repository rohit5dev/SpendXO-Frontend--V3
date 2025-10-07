import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import apiUrls from "../../../../Config/apiUrls";
import Moment from "moment";
import Loading from "../../../Helper/Loading";
import "../../HelpDesk/HelpDesk.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { requestHeader } from "../../../Helper/Constants/constant";
import { toast } from "react-toastify";
import toastMessages from "../../../Helper/Constants/toastMessages";

const CategoryApproval = () => {
  // Navigate back to the previous page
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  // fetching id
  const { Id } = useParams();
  // other states
  const [status, setStatus] = useState("Pending");
  const [approvalDetailsData, setApprovalDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMsg, setResponseMsg] = useState("");

  const fetchCategApprovalData = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/categ-tree/get-categ-tree-by-id/${Id}`,
        requestHeader.json
      );
      if (response.data.status) {
        setApprovalDetailsData(response.data.result);
        setStatus(response.data.result.Status);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error Occurred While Fetching details`);
      console.log(`Error: ${error}`);
      toast.error(toastMessages.errorMsgApi);
    }
  };

  useEffect(() => {
    fetchCategApprovalData();
  }, []);

  // HANDLE APPROVE - REJECT
  const handleApproval = async (e, st) => {
    if (responseMsg === "" && st === "Pending") {
      // toast.error("Response message required");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.put(
        `${apiUrls.urlPrefix}/approval-window/category-approval/${Id}?Status=${st}&Description=${responseMsg}`,

        {},
        requestHeader.json
      );
      if (response.data.status) {
        setStatus(st);
        if (st === "Approved") toast.success(toastMessages.categApproval);
        if (st === "Rejected") toast.success(toastMessages.categRejection);

        setTimeout(() => {
          navigate("/approval-window");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(toastMessages.errorMsgUpdate);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div
          className="card shadow mt-5"
          style={{ width: "60%", maxWidth: "800px" }}
        >
          <div className="card-body ">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <button
                    className="btn bck-btn-outline p-1 d-flex align-items-center me-3"
                    onClick={handleGoBack}
                  >
                    <IoMdArrowRoundBack />
                  </button>
                  <h5 className="card-title mb-0">
                    Category Tree Approval Details
                  </h5>
                </div>
                <span
                  className="badge"
                  style={{
                    fontWeight: 500,
                    backgroundColor:
                      status === "Rejected"
                        ? "#f9706130"
                        : status === "Approved"
                        ? "#8cbf9e30"
                        : status === "Progress"
                        ? "#227c9e30"
                        : status === "Pending"
                        ? "#ffc85730"
                        : "#808b9630",
                    color:
                      status === "Rejected"
                        ? "#e56459"
                        : status === "Approved"
                        ? "#8cbf9e"
                        : status === "Progress"
                        ? "#227c9e"
                        : status === "Pending"
                        ? "#ffc857"
                        : "#808b96",
                    border:
                      status === "Rejected"
                        ? "1px solid #e56459"
                        : status === "Approved"
                        ? "1px solid #8cbf9e"
                        : status === "Progress"
                        ? "1px solid #227c9e"
                        : status === "Pending"
                        ? "1px solid #ffc857"
                        : "1px solid #808b96",
                    padding: "5px 10px",
                    fontSize: "10px",
                  }}
                >
                  {status}
                </span>
              </div>

              {[
                {
                  label: "L1 Category",
                  value: approvalDetailsData?.L1Category || "N/A",
                },
                {
                  label: "L2 Category",
                  value: approvalDetailsData?.L2Category || "N/A",
                },
                {
                  label: "L3 Category",
                  value: approvalDetailsData?.L3Category || "N/A",
                },
                {
                  label: "L4 Category",
                  value: approvalDetailsData?.L4Category || "N/A",
                },
                {
                  label: "Description",
                  value: approvalDetailsData?.Description || "N/A",
                  multiline: true,
                },
                {
                  label: "Approver",
                  value: approvalDetailsData?.Approver || "N/A",
                },
                {
                  label: "Edited On",
                  value:
                    Moment(approvalDetailsData?.Editedon).format(
                      "DD MMM YYYY"
                    ) || "N/A",
                },
              ].map((item, index) => (
                <div className="mb-3 help-details" key={index}>
                  <div className="row">
                    <div className="col-4 text-start">{item.label}</div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control text-start help-details"
                        value={item.value}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mb-3 help-details">
                <div className="row">
                  <div className="col-4 text-start">Attachment(s)</div>
                  <div className="col-8 text-start">
                    {approvalDetailsData?.Attachment ? (
                      approvalDetailsData?.Attachment.split(",").map(
                        (url, index) => (
                          <div key={index}>
                            <a
                              href={url.trim()}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Attachment {index + 1}
                            </a>
                          </div>
                        )
                      )
                    ) : (
                      <span>No attachment</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4  text-start" style={{ fontSize: "12px" }}>
                  Approver Response
                </div>
                <div className="col-8  text-start">
                  {approvalDetailsData.ApproverResponse === "" &&
                  status === "Pending" ? (
                    <textarea
                      style={{ fontSize: "12px" }}
                      className="form-control"
                      value={responseMsg}
                      onChange={(e) => setResponseMsg(e.target.value)}
                      rows="2"
                    ></textarea>
                  ) : (
                    <textarea
                      style={{ fontSize: "12px" }}
                      className="form-control"
                      value={approvalDetailsData.ApproverResponse || ""}
                      disabled
                      rows="2"
                    ></textarea>
                  )}
                </div>
              </div>

              {status === "Pending" && (
                <div className="row mt-3">
                  <div className="col">
                    <button
                      className="btn btn-green btn-sm w-100"
                      style={{ fontSize: "12px" }}
                      onClick={(e) => handleApproval(e, "Approved")}
                    >
                      Approve
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-red btn-sm w-100"
                      style={{ fontSize: "12px" }}
                      onClick={(e) => handleApproval(e, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryApproval;
