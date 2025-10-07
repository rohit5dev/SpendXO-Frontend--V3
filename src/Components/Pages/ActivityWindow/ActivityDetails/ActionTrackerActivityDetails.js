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

const ActionTrackerActivityDetails = () => {
  // Navigate back to the previous page
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  // fetching id
  const { Id } = useParams();
  // other states
  const [activityDetailsData, setActivityDetailsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivityDetails = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.urlPrefix}/activity-window/action-tracker-activity-by-id/${Id}`,
        requestHeader.json
      );
      if (response.data.status) {
        setActivityDetailsData(response.data.result[0]);
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
                    Action Tracker Activity Details
                  </h5>
                </div>
              </div>

              {[
                {
                  label: "Supplier",
                  value: activityDetailsData?.VendorNameHarmonized || "N/A",
                },
                {
                  label: "Category",
                  value: activityDetailsData?.ReportingLevel3 || "N/A",
                },
                {
                  label: "Sub Category",
                  value: activityDetailsData?.ReportingLevel4 || "N/A",
                },
                {
                  label: "Discount Type",
                  value: activityDetailsData["Discount"] || "N/A",
                },

                {
                  label: "Discount Unit",
                  value: activityDetailsData["Percentage/Value"] || "N/A",
                },
                {
                  label: "Discount",
                  value: `${activityDetailsData["Numeric Value"] || "N/A"}${
                    activityDetailsData["Percentage/Value"] === "Percentage"
                      ? "%"
                      : ""
                  }`,
                },
                {
                  label: "Pre-Amount",
                  value: activityDetailsData["AmountEUR(Pre)"] || "N/A",
                },
                {
                  label: "Post-Amount",
                  value: activityDetailsData["AmountEUR(Post)"] || "N/A",
                },
                {
                  label: "Edited By",
                  value: activityDetailsData["Edited By"] || "N/A",
                },
                {
                  label: "Edited On",
                  value:
                    Moment(activityDetailsData["Edited On"]).format(
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

export default ActionTrackerActivityDetails;
