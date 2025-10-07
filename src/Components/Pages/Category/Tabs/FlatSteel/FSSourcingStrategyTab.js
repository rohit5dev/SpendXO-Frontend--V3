import React, { useState } from "react";
import { newsTabData } from "../../Data/newsTabData";
import { sourcingStrategyData } from "../../Data/sourcingStrategyData";
// ICONS
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { categoryOverviewData } from "../../Data/categoryOverviewData";

const FSSourcingStrategyTab = () => {
  return (
    <div className="commodity-data">
      {/* ################# Level 1 #################### */}
      <div className="row g-2 mt-1">
        <div className="col-md-7">
          {/*Sourcing Best Practices*/}
          <div className="global-cards">
            <p className="head-theme">Sourcing Best Practices</p>
            <div className="table-container my-2">
              <table className="table table-bordered table-sm m-0">
                <thead>
                  <tr>
                    <th className="text-start defaultStyleHead">Parameter</th>
                    <th className="text-start defaultStyleHead">
                      Best Practice
                    </th>
                    <th className="text-start defaultStyleHead">
                      Ease of Procurement{" "}
                      <IoIosInformationCircleOutline
                        style={{ cursor: "pointer" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={
                          "Ease of Procurement: score out of 5 (Higher is better)"
                        }
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sourcingStrategyData.best_practices.map((data, index) => (
                    <tr key={index}>
                      <td className="defaultStyles">{data.parameter}</td>
                      <td className="defaultStyles">
                        <ul>
                          {data.best_practice.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </ul>
                      </td>
                      <td className="defaultStyles">
                        {data.ease_of_procurement} / 5
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Critical KPIs for Strategic Sourcing */}
        <div className="col-md-5">
          <div className="global-cards h-100">
            <p className="head-theme">Critical KPIs for Strategic Sourcing</p>
            <div className="table-container my-2">
              <table className="table table-bordered table-sm m-0">
                <thead>
                  <tr>
                    <th className="text-start  defaultStyleHead">
                      KPI Category
                    </th>
                    <th className="text-start defaultStyleHead">KPI</th>
                    <th className="text-start defaultStyleHead">
                      Industry Average
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sourcingStrategyData.critical_KPI.map((data, index) => (
                    <tr key={index}>
                      <td className="defaultStyles">{data.category}</td>
                      <td className="defaultStyles">{data.kpi}</td>
                      <td className="defaultStyles">{data.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 2 #################### */}
      <div className="row g-2 pt-2 mb-2">
        {/* Negotiation Levers */}
        <div className="col-md-6">
          <div className="global-cards h-100" style={{ minHeight: "380px" }}>
            <p className="head-theme">Negotiation Levers</p>
            <div
              className="d-grid mt-2 pe-1"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "10px",
                overflowY: "auto",
                maxHeight: "345px",
              }}
            >
              {categoryOverviewData?.negotiationLevers?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-2 p-2 text-start"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                  }}
                  onClick={() => window.open(data.Source, "_blank")}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <p
                        className="global-font p-0 m-0 mb-1"
                        style={{
                          color: "var(--color-main)",
                          fontWeight: "550",
                        }}
                      >
                        {data.NegotiationLever}
                      </p>
                      <div
                        className="global-font fw-bold  m-0 rounded-3 d-flex align-items-center"
                        style={{
                          color: `${
                            data.RiskLevel === "Moderate"
                              ? "var(--color-yellow)"
                              : data.RiskLevel === "High"
                              ? "var(--color-red)"
                              : "var(--color-green)"
                          }`,
                        }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`${data.RiskLevel} Risk`}
                      >
                        {data.RiskLevel === "High" && (
                          <FaCaretUp style={{ marginRight: "2px" }} />
                        )}
                        {data.RiskLevel === "Low" && (
                          <FaCaretDown style={{ marginRight: "2px" }} />
                        )}
                        {data.RiskLevel === "Moderate" && (
                          <RiExpandUpDownFill style={{ marginRight: "2px" }} />
                        )}
                        Risk
                      </div>
                    </div>
                    <p className="global-font mb-0 rs-text-justify">
                      {data.Description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <p className="global-font p-0 m-0">
                      <BsGlobeEuropeAfrica className="text-secondary" />
                      {" | "}
                      {data.GeographiesAffected}
                    </p>
                    <p
                      className="global-font p-0 m-0 rounded-4 px-3"
                      style={{
                        backgroundColor: `${
                          data.ImpactDuration === "Medium-Term"
                            ? "var(--color-bg-yellow)"
                            : data.ImpactDuration === "Long-Term"
                            ? "var(--color-bg-red)"
                            : "var(--color-bg-green)"
                        }`,
                      }}
                    >
                      {data.ImpactDuration} Impact
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Alert */}
        <div className="col-md-3">
          <div className="global-cards h-100" style={{ minHeight: "380px" }}>
            <p className="head-theme mb-2">Risk Alert</p>
            <div
              className="overflow-auto pe-1"
              style={{ maxHeight: "345px", overflowY: "auto" }}
            >
              {newsTabData?.riskAlert?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-2 p-2 mb-2"
                  onClick={() => window.open(data.sourceURL, "_blank")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: `${
                      data.riskLevel === "Moderate"
                        ? `rgb(255, 220, 151,0.1)`
                        : data.riskLevel === "High"
                        ? `rgba(255, 167, 157, 0.1)`
                        : `rgb(181, 255, 207,0.1)`
                    }`,
                    border: `1px solid ${
                      data.riskLevel === "Moderate"
                        ? "var(--color-yellow)"
                        : data.riskLevel === "High"
                        ? "var(--color-red)"
                        : "var(--color-green)"
                    }`,
                  }}
                >
                  <div>
                    <div className="d-flex justify-content-between ">
                      <p className="global-font fw-bold p-0 m-0">
                        {data.category}
                      </p>
                      <p
                        className="global-font fw-bold px-2 m-0 rounded-3 d-flex align-items-center"
                        style={{
                          color: `${
                            data.riskLevel === "Moderate"
                              ? "var(--color-yellow)"
                              : data.riskLevel === "High"
                              ? "var(--color-red)"
                              : "var(--color-green)"
                          }`,
                        }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`${data.riskLevel} Risk`}
                      >
                        {data.riskLevel === "High" && (
                          <FaCaretUp style={{ marginRight: "2px" }} />
                        )}
                        {data.riskLevel === "Low" && (
                          <FaCaretDown style={{ marginRight: "2px" }} />
                        )}
                        {data.riskLevel === "Moderate" && (
                          <RiExpandUpDownFill style={{ marginRight: "2px" }} />
                        )}
                        Risk
                      </p>
                    </div>

                    <p className="d-flex flex-column global-font mb-0 rs-text-justify">
                      {data.description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <p className="global-font  p-0 m-0">
                      <BsGlobeEuropeAfrica className="text-secondary" />
                      {" | "}
                      {data.geographicLocation}
                    </p>

                    <p
                      className="global-font p-0 m-0 rounded-4 px-3"
                      style={{
                        backgroundColor: `${
                          data.impactDuration === "Medium-Term"
                            ? "var(--color-bg-yellow)"
                            : data.impactDuration === "Long-Term"
                            ? "var(--color-bg-red)"
                            : "var(--color-bg-green)"
                        }`,
                      }}
                    >
                      {data.impactDuration} Impact
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="col-md-3">
          <div className="global-cards h-100" style={{ minHeight: "380px" }}>
            <p className="head-theme mb-2">Market Opportunity</p>
            <div
              className="overflow-auto pe-1"
              style={{ maxHeight: "345px", overflowY: "auto" }}
            >
              {newsTabData?.marketOpportunity?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-2 p-2 mb-2"
                  onClick={() => window.open(data.sourceURL, "_blank")}
                  style={{
                    cursor: "pointer",
                    backgroundColor: `${
                      data.riskLevel === "Moderate"
                        ? `rgb(255, 220, 151,0.1)`
                        : data.riskLevel === "High"
                        ? `rgba(255, 167, 157, 0.1)`
                        : `rgb(181, 255, 207,0.1)`
                    }`,
                    border: `1px solid ${
                      data.riskLevel === "Moderate"
                        ? "var(--color-yellow)"
                        : data.riskLevel === "High"
                        ? "var(--color-red)"
                        : "var(--color-green)"
                    }`,
                  }}
                >
                  <div>
                    <div className="d-flex justify-content-between ">
                      <p className="global-font fw-bold p-0 m-0">
                        {data.category}
                      </p>
                      <p
                        className="global-font fw-bold px-2 m-0 rounded-3 d-flex align-items-center"
                        style={{
                          color: `${
                            data.riskLevel === "Moderate"
                              ? "var(--color-yellow)"
                              : data.riskLevel === "High"
                              ? "var(--color-red)"
                              : "var(--color-green)"
                          }`,
                        }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`${data.riskLevel} Risk`}
                      >
                        {data.riskLevel === "High" && (
                          <FaCaretUp style={{ marginRight: "2px" }} />
                        )}
                        {data.riskLevel === "Low" && (
                          <FaCaretDown style={{ marginRight: "2px" }} />
                        )}
                        {data.riskLevel === "Moderate" && (
                          <RiExpandUpDownFill style={{ marginRight: "2px" }} />
                        )}
                        Risk
                      </p>
                    </div>

                    <p className="d-flex flex-column global-font mb-0 rs-text-justify">
                      {data.description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <p className="global-font  p-0 m-0">
                      <BsGlobeEuropeAfrica className="text-secondary" />
                      {" | "}
                      {data.geographicLocation}
                    </p>

                    <p
                      className="global-font p-0 m-0 rounded-4 px-3"
                      style={{ backgroundColor: `var(--color-main-light)` }}
                    >
                      {data.opportunityDuration} Oppertunity
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSSourcingStrategyTab;
