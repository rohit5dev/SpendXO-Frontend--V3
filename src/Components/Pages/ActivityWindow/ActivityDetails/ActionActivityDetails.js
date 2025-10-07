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
import {getStatusColor} from "../../../Helper/Constants/statusBtnColor"

const ActionActivityDetails = () => {
  // Navigate back to the previous page
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  // fetching id
  const { Id } = useParams();
  // other states
  const [status, setStatus] = useState("Pending");
  const [activityDetailsData, setActivityDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivityDetails = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/activity-window/action-tree-activity-by-id/${Id}`,
        requestHeader.json
      );
      if (response.data.status) {
        setActivityDetailsData(response.data.result[0]);
        setStatus(response.data.result[0].Status);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error Occurred While Fetching details`);
      console.log(`Error: ${error}`);
      toast.error(toastMessages.errorMsgApi);
    }
  };

  useEffect(() => {
    fetchActivityDetails();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div
          className="card shadow"
          style={{ width: "60%", maxWidth: "800px" }}
        >
          <div className="card-body">
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
                    Action Tree Activity Details
                  </h5>
                </div>
                <span
                   style={{
                    background: getStatusColor(status) + "20",
                    border: "1px solid" + getStatusColor(status),
                    color: getStatusColor(status),
                    padding: "4px",
                    fontWeight: 600,
                    borderRadius: "5px",
                    fontSize: "10px",
                  }}
                >
                  {status}
                </span>
              </div>

              {[
                {
                  label: "Action Number",
                  value: activityDetailsData?.ActionNumber || "N/A",
                },
                {
                  label: "Action Type",
                  value: activityDetailsData?.ActionType || "N/A",
                },
                {
                  label: "Action Name",
                  value: activityDetailsData?.ActionName || "N/A",
                },
                {
                  label: "Description",
                  value: activityDetailsData?.ActionDescription || "N/A",
                },
                {
                  label: "Owner",
                  value: activityDetailsData?.Owner || "N/A",
                },
                {
                  label: "Approver",
                  value: activityDetailsData?.Approver || "N/A",
                },
                {
                  label: "Edited On",
                  value:
                    Moment(activityDetailsData?.EditedOn).format(
                      "DD MMM YYYY"
                    ) || "N/A",
                },
                {
                  label: "Approver Response",
                  value: activityDetailsData?.ApproverResponse || "N/A",
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
                    {activityDetailsData.Attachment ? (
                      activityDetailsData.Attachment.split(",").map(
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionActivityDetails;
