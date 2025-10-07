import React, { useState } from "react";
import { newsTabData } from "../Data/newsTabData";
import "../css/LatestNewsTab.css";
import { formatDate } from "../../../../Config/formatDate";

// ICONS
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";

const LatestNewsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSentiment("");
    setSelectedCategory("");
  };

  const filteredNews = newsTabData?.newsData?.filter((data) => {
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

      <div className="row g-2">
        {" "}
        {/* Increase gap between Level 1 cards */}
        <div className="col-4">
          <div className="global-cards mt-2" style={{ height: "580px" }}>
            <p className="head-theme mb-2">Market Trend Alerts & Analysis</p>
            <div className="d-flex d-flex flex-column gap-1">
              {newsTabData?.marketTrendData?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2"
                >
                  <div style={{ maxHeight: "530px", overflowY: "auto" }}>
                    <div className="d-flex justify-content-between">
                      <p className="global-font p-0 m-0">
                        {data.themeCategory}
                      </p>
                      <div>
                        {" "}
                        <IoIosLink
                          onClick={() => window.open(data.sourceURL, "_blank")}
                          style={{ cursor: "pointer" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Open source article"
                        />
                        <LuSquareArrowOutUpRight
                          className="ms-2"
                          onClick={() => openModal(data)}
                          style={{ cursor: "pointer" }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Expand"
                        />
                      </div>
                    </div>
                    <p className="head-theme text-start">{data.trendTitle}</p>
                    <p
                      className="global-font mb-0 rs-text-justify"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "4.5em",
                        lineHeight: "1.5em", // Add consistent line height
                        wordBreak: "break-word", // Handle long words
                      }}
                    >
                      {data.insightfulDescription}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mt-2 ">
                    <p
                      className="global-font p-0 m-0 rounded-4 px-2 "
                      style={{
                        backgroundColor: `${
                          data.sentiment === "Neutral"
                            ? "var(--color-bg-yellow)"
                            : data.sentiment === "Negative"
                            ? "var(--color-bg-red)"
                            : "var(--color-bg-green)"
                        }`,
                      }}
                    >
                      {data.sentiment} Sentiment
                    </p>
                    <p className="global-font bg-warning p-0 m-0 rounded-4 px-2 ">
                      {data.impactDuration} Impact
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-8 ">
          {/* ########## MAIN NEWS ######### */}
          <div className="global-cards mt-2" style={{ height: "580px" }}>
            <p className="head-theme">News</p>

            {/* filters for news*/}
            <div className="d-flex align-items-center gap-2 my-2">
              <input
                type="text"
                className="global-font form-control"
                placeholder="Search news by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="form-select global-font"
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
              >
                <option value="">All Sentiments</option>
                <option value="1">Positive Sentiment</option>
                <option value="0">Neutral Sentiment</option>
                <option value="-1">Negative Sentiment</option>
              </select>
              <select
                className="form-select global-font"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {Array.from(
                  new Set(
                    newsTabData?.newsData?.map((data) => data.classification)
                  )
                ).map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-theme global-font"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {/* News cards */}
              <div className="d-flex justify-content-between overflow-auto my-2 gap-1 flex-column me-1">
                {filteredNews.map((data, index) => (
                  <div
                    key={index}
                    className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 text-start "
                    style={{ cursor: "pointer" }}
                    onClick={() => window.open(data.url, "_blank")}
                  >
                    <div className="row g-3">
                      <div className="col-2 center-image p-0  d-flex justify-content-center">
                        <div className="image-container">
                          <img
                            src={data.imageUrl}
                            alt="newsImg"
                            width="130px"
                            height="80px"
                            className="rounded-3"
                          />
                          <p className="classification-text bg-warning p-0 m-0 rounded-3 ">
                            {data.classification}
                          </p>
                        </div>
                      </div>
                      <div className="col-10">
                        {" "}
                        <div>
                          <div className="d-flex justify-content-between align-items-start">
                            <p
                              className="global-font fw-bold p-0 m-0 flex-grow-1"
                              style={{ color: "var(--color-main)" }}
                            >
                              {data.title}
                            </p>
                            <p
                              className={`global-font p-0 m-0  text-center rounded-3 ms-2`}
                              style={{
                                width: "120px",
                                backgroundColor: `${
                                  data.sentiment_score === 0
                                    ? "var(--color-bg-yellow)"
                                    : data.sentiment_score < 0
                                    ? "var(--color-bg-red)"
                                    : "var(--color-bg-green)"
                                }`,
                              }}
                            >
                              {data.sentiment_score === 0
                                ? "Neutral Sentiment"
                                : data.sentiment_score < 0
                                ? "Negative Sentiment"
                                : "Positive Sentiment"}
                            </p>
                          </div>

                          <p className="global-font p-0 m-0">
                            Released {formatDate(data.published)}
                          </p>

                          <p className="d-flex flex-column global-font mb-0 rs-text-justify">
                            {data.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNewsTab;
