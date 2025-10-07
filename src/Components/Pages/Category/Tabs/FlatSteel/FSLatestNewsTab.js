import React, { useState } from "react";
import "../../css/LatestNewsTab.css";
import { formatDate } from "../../../../../Config/formatDate";
import { FSNewsTabsData } from "../../Data/FSTabsData";

// ICONS
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";

const FSLatestNewsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSentiment("");
    setSelectedCategory("");
  };

  const filteredNews = FSNewsTabsData?.newsData?.filter((data) => {
    const matchesSearch =
      data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSentiment =
      selectedSentiment === "" ||
      data.sentiment_score === Number(selectedSentiment);
    const matchesCategory =
      !selectedCategory || data.classification === selectedCategory;

    return matchesSearch && matchesSentiment && matchesCategory;
  });

  const [modalData, setModalData] = useState(null); // State for modal data

  const openModal = (data) => {
    setModalData(data); // Set the data for the modal
  };

  const closeModal = () => {
    setModalData(null); // Clear the modal data
  };

  return (
    <div className="commodity-data ">
      {/* Modal for full description */}
      {modalData && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Center the modal
            zIndex: 1050,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a semi-transparent background
          }}
        >
          <div className="modal-dialog mt-5">
            <div
              className=" modal-content global-dashed-card d-flex flex-column justify-content-between rounded-4 p-3"
              style={{ backgroundColor: "#e0eeef" }}
            >
              <div className="text-end">
                <button
                  className="btn-close"
                  onClick={closeModal}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Close"
                />
              </div>
              <div>
                <p className="global-font p-0 m-0">{modalData.themeCategory}</p>
                <p className="head-theme">{modalData.trendTitle}</p>
                <p className="d-flex flex-column global-font mb-0 rs-text-justify">
                  {modalData.insightfulDescription}
                </p>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <p
                  className="global-font p-0 m-0 rounded-4 px-3"
                  style={{
                    backgroundColor: `${
                      modalData.sentiment === "Neutral"
                        ? "var(--color-bg-yellow)"
                        : modalData.sentiment === "Negative"
                        ? "var(--color-bg-red)"
                        : "var(--color-bg-green)"
                    }`,
                  }}
                >
                  {modalData.sentiment} Sentiment
                </p>
                <p className="global-font bg-warning p-0 m-0 rounded-4 px-3">
                  {modalData.impactDuration} Impact
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row g-2 pt-2">
        <div className="col-2">
          <p className="head-theme ps-3 mt-2" style={{ textAlign: "left" }}>
            News Filter
          </p>
          {/* filters for news*/}
          <div className="align-items-center gap-2 my-2">
            <input
              type="text"
              className="global-font form-control mt-2"
              placeholder="Search news by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select global-font mt-2"
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
            >
              <option value="">All Sentiments</option>
              <option value="1">Positive Sentiment</option>
              <option value="0">Neutral Sentiment</option>
              <option value="-1">Negative Sentiment</option>
            </select>
            <select
              className="form-select global-font mt-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {Array.from(
                new Set(
                  FSNewsTabsData?.newsData?.map((data) => data.classification)
                )
              ).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              className="btn btn-theme global-font mt-2 w-100"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="col-7 pt-1">
          <p className="head-theme ps-3" style={{ textAlign: "left" }}>
            Category News
          </p>

          <div
            className="d-flex overflow-auto my-2 gap-1 flex-column"
            style={{ height: "550px", overflowY: "auto", padding: "0px 10px" }}
          >
            {filteredNews.map((data, index) => (
              <div
                key={index}
                className="global-cards rounded-4 px-3 mb-1"
                style={{
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  minHeight: "fit-content",
                }}
                onClick={() => window.open(data.url, "_blank")}
              >
                <div className="row g-3 align-items-start">
                  {/* Image Column */}
                  <div className="col-12 col-sm-3 col-md-2 p-0 d-flex flex-column">
                    <div className="w-100" style={{ aspectRatio: "10/6" }}>
                      <img
                        src={data.imageUrl}
                        alt="newsImg"
                        className="rounded-3 w-100 h-100"
                        style={{
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                    <p className="classification-text bg-warning p-1 mt-1 mb-0 rounded-2 w-100 mt-2">
                      {data.classification}
                    </p>
                  </div>

                  {/* Content Column */}
                  <div className="col-12 col-sm-9 col-md-10 ps-3 d-flex flex-column">
                    {/* Title and Sentiment Row */}
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <div>
                        {" "}
                        <h6
                          className="global-font fw-bold m-0 flex-grow-1 text-start"
                          style={{
                            color: "var(--color-main)",
                            wordBreak: "break-word",
                          }}
                        >
                          {data.title}
                        </h6>
                        {/* Date */}
                        <p className="global-font small text-muted m-0 text-start">
                          Released on {formatDate(data.published)}
                        </p>
                      </div>
                      <span
                        className={`global-font p-0 px-2 rounded-2 text-nowrap`}
                        style={{
                          fontSize: "8px",
                          backgroundColor: `${
                            data.sentiment_score === 0
                              ? "var(--color-bg-yellow)"
                              : data.sentiment_score < 0
                              ? "var(--color-bg-red)"
                              : "var(--color-bg-green)"
                          }`,
                          flexShrink: 0,
                        }}
                      >
                        {data.sentiment_score === 0
                          ? "Neutral"
                          : data.sentiment_score < 0
                          ? "Negative"
                          : "Positive"}{" "}
                        Sentiment
                      </span>
                    </div>

                    {/* Description with line clamping */}
                    <p
                      className="global-font mb-0 text-start"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trend Alerts & Analysis */}
        <div className="col-3 pt-1 ">
          <div
            style={{
         
              height: "570px",
              overflowY: "auto",
              padding: "10px",
            }}
          >
            <p
              className="head-theme mb-2"
              style={{
                textAlign: "left",
              }}
            >
              Market Trend Alerts & Analysis
            </p>
            <div className="d-flex flex-column gap-1">
              {FSNewsTabsData?.marketTrendData?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex flex-column rounded-2 px-3 py-1 shadow-sm pb-2 mb-1"
                    style={{
                      cursor: "pointer",
                      backgroundColor: `${
                        data.sentiment === "Neutral"
                          ? `rgb(255, 220, 151,0.1)`
                          : data.sentiment === "Negative"
                          ? `rgba(255, 167, 157, 0.1)`
                          : `rgb(181, 255, 207,0.1)`
                      }`,
                      border: `1px solid ${
                        data.sentiment === "Neutral"
                          ? "var(--color-yellow)"
                          : data.sentiment === "Negative"
                          ? "var(--color-red)"
                          : "var(--color-green)"
                      }`,
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-0">
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#646a70ff",
                        }}
                      >
                        {data.themeCategory}
                      </p>

                      <LuSquareArrowOutUpRight
                        onClick={() => openModal(data)}
                        style={{
                          cursor: "pointer",
                          fontSize: "12px",
                          color: "#6C757D",
                        }}
                        title="Expand"
                      />
                    </div>

                    {/* Title */}
                    <p
                      className="fw-semibold mb-2"
                      style={{
                        fontSize: "12px",
                        color: "#212529",
                        lineHeight: "1.4",
                        textAlign: "left",
                      }}
                    >
                      {data.trendTitle}
                    </p>

                    {/* Badges */}
                    <div className="d-flex gap-2">
                      <span
                        className="px-2 py-1 rounded-pill text-white"
                        style={{
                          fontSize: "10px",
                          backgroundColor:
                            data.sentiment === "Neutral"
                              ? "#ADB5BD"
                              : data.sentiment === "Negative"
                              ? "#ea877c"
                              : "var(--color-main-light)",
                        }}
                      >
                        {data.sentiment} Sentiment
                      </span>

                      <span
                        className="px-2 py-1 rounded-pill"
                        style={{
                          fontSize: "10px",
                          backgroundColor: "#FFD966",
                          color: "#000",
                        }}
                      >
                        {data.impactDuration} Impact
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSLatestNewsTab;
