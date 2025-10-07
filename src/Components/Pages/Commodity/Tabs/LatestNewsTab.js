import React, { useState } from "react";
import { newsTabData } from "../Data/newsTabData";
import "../css/LatestNewsTab.css";
import { formatDate } from "../../../../Config/formatDate";
import ReactApexChart from "react-apexcharts"; // Add this import
// ICONS
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

const LatestNewsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sentimentCompositionChart, setSentimentCompositionChart] = useState({
    series: [276, 486, 241],
    options: {
      chart: {
        width: 600, // Ensure the chart is large enough
        type: "pie",
      },
      labels: [
        "Positive Sentiments",
        "Negative Sentiments",
        "Neutral Sentiments",
      ],
      colors: [
        "#66CDAA", // Medium Aquamarine for Positive
        "#F97061", // Light Coral for Negative
        "#FFC857", // Mustard Yellow for Neutral
      ],
      legend: {
        fontSize: "10px", // Ensure legend text is readable
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350, // Adjust for smaller screens
            },
            legend: {
              position: "bottom",
              fontSize: "9px", // Slightly smaller font for smaller screens
            },
          },
        },
      ],
    },
  });
  const [categoryVsSentimentChart, setCategoryVsSentimentChart] = useState({
    series: [
      {
        name: "Positive Sentiment",
        data: [15, 136, 47, 24, 36, 5, 13],
      },
      {
        name: "Negative Sentiment",
        data: [69, 177, 88, 87, 48, 14, 3],
      },
      {
        name: "Neutral Sentiment",
        data: [21, 60, 46, 74, 22, 10, 8],
      },
    ],
    options: {
      dataLabels: {
        enabled: false,
      },
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            enabled: false, // This will disable all data labels on the bars
            total: {
              enabled: false,
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [
          "supply chain disruptions",
          "global market impact",
          "macro-economic events",
          "trade and tariff",
          "output and capacity",
          "geo-political factor",
          "climate and sustainability",
        ],
        labels: {
          formatter: function (val) {
            return val ;
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " News Articles";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        fontSize: "10px", // Set legend font size to 10px
      },
    },
  });

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
    <div className="commodity-data">
      {/* ########## PRICE TREND ######### */}
      <div className="d-flex justify-content-between overflow-auto my-2 gap-2">
        {newsTabData?.priceTrendData?.map((data, index) => (
          <div
            key={index}
            className="global-cards"
            style={{ width: "250px", cursor: "pointer" }}
            onClick={() =>
              window.open(data.source, "_blank", "noopener noreferrer")
            }
          >
            <div className="d-flex justify-content-between">
              <p className="head-theme">{data.region}</p>
              <p
                className="global-font p-0 m-0 rounded-2 px-2"
                style={{
                  backgroundColor: `${
                    data.priceTrend === "Decreasing"
                      ? "var(--color-bg-red)"
                      : "var(--color-bg-green)"
                  }`,

                  color: `${
                    data.priceTrend === "Decreasing"
                      ? "var(--color-red)"
                      : "var(--color-green)"
                  }`,
                }}
              >
                Price Trend{" "}
                {data.priceTrend === "Increasing" ? (
                  <FaAngleDoubleUp />
                ) : (
                  <FaAngleDoubleDown />
                )}
              </p>
            </div>
            <p className="d-flex flex-column global-font mb-0 rs-text-justify">
              {data.notes}
            </p>
          </div>
        ))}
      </div>

      {/* ########## MARKET TREND ######### */}

      <div className="global-cards">
        <p className="head-theme">Market Trend Alerts & Analysis</p>
        <div className="d-flex justify-content-between overflow-auto my-2 gap-1">
          {newsTabData?.marketTrendData?.map((data, index) => (
            <div
              key={index}
              className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2"
              style={{ width: "310px" }}
            >
              <div>
                <div className="d-flex justify-content-between">
                  <p className="global-font p-0 m-0">{data.themeCategory}</p>
                  <LuSquareArrowOutUpRight
                    onClick={() => openModal(data)}
                    style={{ cursor: "pointer" }}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Expand"
                  />
                </div>
                <p className="head-theme text-start">{data.trendTitle}</p>
                <p
                  className="global-font mb-0 rs-text-justify"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxHeight: "4.5em",
                    lineHeight: "1.5em", // Add consistent line height
                    minHeight: "4.5em", // Ensure consistent height
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
        <div className="col-4 ">
          {/* ########## RISK ALERT ######### */}
          <div className="global-cards mt-2">
            <p className="head-theme">Risk Alert</p>
            <div className="d-flex justify-content-between overflow-auto my-2 gap-1 flex-column ">
              {newsTabData?.riskAlert?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 "
                  style={{
                    cursor: "pointer",

                    backgroundColor: `${
                      data.riskLevel === "Moderate"
                        ? `rgb(255, 220, 151,0.2)`
                        : data.riskLevel === "High"
                        ? `rgba(255, 167, 157, 0.2)`
                        : `rgb(181, 255, 207,0.2)`
                    }`,
                    border: `1px dashed ${
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
          {/* ########## MARKET OPPORTUNITY ######### */}
          <div className="global-cards mt-2">
            <p className="head-theme">Market Opportunity</p>
            <div className="d-flex justify-content-between overflow-auto my-2 gap-1 flex-column ">
              {newsTabData?.marketOpportunity?.map((data, index) => (
                <div
                  key={index}
                  className="global-dashed-card d-flex flex-column justify-content-between rounded-4 p-2 "
                  style={{
                    cursor: "pointer",
                    backgroundColor: `${
                      data.riskLevel === "Moderate"
                        ? `rgb(255, 220, 151,0.2)`
                        : data.riskLevel === "High"
                        ? `rgba(255, 167, 157, 0.2)`
                        : `rgb(181, 255, 207,0.2)`
                    }`,
                    border: `1px dashed ${
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

                    <p className="global-font p-0 m-0 rounded-4 px-3" style={{backgroundColor: `var(--color-main-light)`}}>
                      {data.opportunityDuration} Oppertunity
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-8 ">
          {/* ########## CHARTS ######### */}
          <div className="row">
            <div className="d-flex justify-content-between mt-2">
              <div className="global-cards" style={{ width: "48%" }}>
                <p className="head-theme">Category-Wise Sentiment Breakdown</p>
                <ReactApexChart
                  options={categoryVsSentimentChart.options}
                  series={categoryVsSentimentChart.series}
                  type="bar"
                  height={250}
                />
              </div>
              <div className="global-cards" style={{ width: "51%" }}>
                <p className="head-theme">Global Sentiment Composition</p>
                <div className="mt-4 ms-3">
                  <ReactApexChart
                    options={sentimentCompositionChart.options}
                    series={sentimentCompositionChart.series}
                    type="pie"
                    width={400}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ########## MAIN NEWS ######### */}
          <div className="global-cards mt-2">
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
            <div style={{ maxHeight: "340px", overflowY: "auto" }}>
              {/* News cards */}
              <div className="d-flex justify-content-between overflow-auto my-2 gap-1 flex-column ">
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
