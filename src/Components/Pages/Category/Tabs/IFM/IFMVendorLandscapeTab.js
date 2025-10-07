import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { IFMTabsData } from "../../Data/IFMTabsData";

const IFMVendorLandscapeTab = () => {
  // ################# Top 5 Vendors by Annual IFM Spend -  CHART DATA ####################
  const [IFMTopVendorBySpend, setIFMTopVendorBySpend] = useState({
    series: [
      {
        name: "Annual Spend",
        data: [180, 140, 95, 75, 60],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      colors: ["#048D9C"], // Teal color for all bars
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return "₹" + val + " Cr";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "ISS Facility",
          "G4S",
          "ENGIE Impact",
          "Rentokil",
          "CBRE MaintPro",
        ],
        labels: {
          style: {
            fontSize: "10px",
          },
          rotate: -45, // Rotate labels for better readability
          hideOverlappingLabels: true,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "₹" + val + " Crore";
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 700,
            },
            xaxis: {
              labels: {
                rotate: -40,
              },
            },
          },
        },
      ],
    },
  });

  // ################# Vendor Mix by Type -  PIE CHART DATA ####################
  const [IFMVendorMixByType, setIFMVendorMixByType] = useState({
    series: [40, 33, 27],
    options: {
      labels: ["Global Vendors", "Regional Vendors", "Local Vendors"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "10px",
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
        style: {
          fontSize: "10px",
        },
      },
      colors: ["#2dadbb", "#8cbf9e", "#127985"],
    },
  });

  return (
    <div className="commodity-data">
      {/* ################# Level 1 #################### */}

      <div className="row row-cols-1 row-cols-md-5 g-2 mt-2">
        {/* kpi card-1 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Total No. of Vendors</p>

            <div
              className="d-flex justify-content-center align-items-center flex-column px-2"
              data-toggle="tooltip"
              data-placement="top"
              title="Represents the total number of active suppliers
engaged across all IFM services and sub-services globally"
              style={{ cursor: "default" }}
            >
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                32
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  Vendors
                </span>
              </p>
              <p
                className="global-font fst-italic text-center mt-1"
                style={{ fontSize: "clamp(10px, 1.5vw, 12px)" }}
              >
                Total active suppliers engaged across global IFM operations
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-2 */}
        <div className="col">
          <div
            className="card h-100 d-flex flex-column rounded-3 p-2"
            style={{ overflow: "hidden" }}
          >
            <p className="head-theme mb-2 text-truncate">Vendor Mix by Type</p>

            <div
              className="d-flex justify-content-center align-items-center flex-column px-2 w-100"
              data-toggle="tooltip"
              data-placement="top"
              title="Breakdown of suppliers by their service footprint — global vendors offer wide coverage, while regional and local vendors provide niche or localized expertise"
              style={{
                cursor: "default",
                maxWidth: "100%",
                wordWrap: "break-word",
              }}
            >
              <div className="d-flex justify-content-evenly w-100 flex-wrap">
                <div
                  className="text-center px-1"
                  style={{ minWidth: "fit-content" }}
                >
                  <p
                    className="global-kpi-num m-0"
                    style={{
                      fontSize: "clamp(12px, 2vw, 25px)",
                      fontWeight: "bold",
                      lineHeight: 1.2,
                    }}
                  >
                    40%
                    <span
                      className="global-kpi-name ps-1 d-block"
                      style={{
                        color: "#74a3a2",
                        fontSize: "clamp(8px, 1.5vw, 10px)",
                      }}
                    >
                      Global
                    </span>
                  </p>
                </div>
                <div
                  className="text-center px-1"
                  style={{ minWidth: "fit-content" }}
                >
                  <p
                    className="global-kpi-num m-0"
                    style={{
                      fontSize: "clamp(12px, 2vw, 25px)",
                      fontWeight: "bold",
                      lineHeight: 1.2,
                    }}
                  >
                    33%
                    <span
                      className="global-kpi-name ps-1 d-block"
                      style={{
                        color: "#74a3a2",
                        fontSize: "clamp(8px, 1.5vw, 10px)",
                      }}
                    >
                      Regional
                    </span>
                  </p>
                </div>
                <div
                  className="text-center px-1"
                  style={{ minWidth: "fit-content" }}
                >
                  <p
                    className="global-kpi-num m-0"
                    style={{
                      fontSize: "clamp(12px, 2vw, 25px)",
                      fontWeight: "bold",
                      lineHeight: 1.2,
                    }}
                  >
                    27%
                    <span
                      className="global-kpi-name ps-1 d-block"
                      style={{
                        color: "#74a3a2",
                        fontSize: "clamp(8px, 1.5vw, 10px)",
                      }}
                    >
                      Local
                    </span>
                  </p>
                </div>
              </div>
              <p
                className="global-font fst-italic text-center mt-1"
                style={{ fontSize: "clamp(10px, 1.5vw, 12px)" }}
              >
                Proportion of vendors by operational scope
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-3 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Spend Concentration</p>

            <div
              className="d-flex justify-content-center flex-column px-2 align-items-center"
              data-toggle="tooltip"
              data-placement="top"
              title="Indicates the share of total IFM spend attributed to the Top 5 suppliers. High
concentration → strategic potential for negotiating bundled contracts"
              style={{ cursor: "default" }}
            >
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                82%
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  of Total IFM Spend
                </span>
              </p>{" "}
              <p className="global-font fst-italic">
                Heavy reliance on the top 5 vendors → bundling opportunities
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-4 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">Preferred Vendor Coverage</p>

            <div
              className="d-flex justify-content-center flex-column px-2 align-items-center"
              data-toggle="tooltip"
              data-placement="top"
              title="Based on vendor performance evaluations — preferred vendors
consistently meet or exceed expectations across key procurement KPIs"
              style={{ cursor: "default" }}
            >
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                60%
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  of Vendors Preferred
                </span>
              </p>{" "}
              <p className="global-font fst-italic">
                Consistently strong performers on cost, quality & delivery
              </p>
            </div>
          </div>
        </div>

        {/* kpi card-5 */}
        <div className="col">
          <div className="card h-100 d-flex flex-column rounded-3 p-2">
            <p className="head-theme mb-1">High-Risk Vendors</p>

            <div
              className="d-flex justify-content-center flex-column px-2 align-items-center"
              data-toggle="tooltip"
              data-placement="top"
              title="Vendors flagged due to risks such as geo-dependency, financial health, or
regulatory uncertainty. Action recommended for procurement resilience"
              style={{ cursor: "default" }}
            >
              <p
                className="global-kpi-num"
                style={{
                  fontSize: "clamp(18px, 2vw, 25px)",
                  fontWeight: "bold",
                }}
              >
                15%
                <span className="global-kpi-name" style={{ color: "#74a3a2" }}>
                  at High Risk
                </span>
              </p>{" "}
              <p className="global-font fst-italic">
                Priority for mitigation or alternate sourcing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 2 #################### */}
      <div className="row g-2 mt-1">
        {/* CARD 1 - Major Vendors Across IFM Sub-Services */}
        <div className="col-md-6">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2 mb-0">
              Major Vendors Across IFM Sub-Services
            </p>

            <p className="text-start global-font ms-2 mb-2">
              Top 5 suppliers account for over 80% of IFM spend → significant
              opportunity to negotiate bundled contracts for greater savings
            </p>

            <div className="table-container pe-1">
              <table className="table table-bordered table-sm m-0">
                <thead>
                  <tr>
                    <th className="p-1 text-start defaultStyleHead">
                      Sub-Service
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Top Vedors
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Vendor Type
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Region Presence
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {IFMTabsData.ifm_major_vendors.map((data, index) => (
                    <tr key={index}>
                      <td className="p-1 defaultStyles">{data.sub_service}</td>
                      <td className="p-1 defaultStyles">{data.top_vendors}</td>
                      <td className="p-1 defaultStyles">{data.vendor_type}</td>
                      <td className="p-1 defaultStyles">
                        {data.region_presence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CARD 2 -Supplier Risk Analysis */}
        <div className="col-md-6">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2 mb-0">
              Supplier Risk Analysis{" "}
            </p>
            <p className="text-start global-font ms-2 mb-2">
              Immediate action required for CBRE MaintPro due to high dependency
              risk → alternative supplier onboarding recommended.
            </p>
            <div className="table-container pe-1">
              <table className="table table-bordered table-sm m-0">
                <thead>
                  <tr>
                    <th className="p-1 text-start defaultStyleHead">Vendor</th>
                    <th className="p-1 text-start defaultStyleHead">
                      Service Provided
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Risk Type
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Risk Level
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Notes / Action Required
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {IFMTabsData.ifm_supplier_risk.map((data, index) => (
                    <tr key={index}>
                      <td className="p-1 defaultStyles">{data.vendor}</td>
                      <td className="p-1 defaultStyles">
                        {data.service_provided}
                      </td>
                      <td className="p-1 defaultStyles">{data.risk_type}</td>
                      <td className="p-1 defaultStyles">{data.risk_level}</td>
                      <td className="p-1 defaultStyles">{data.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ################# Level 3 #################### */}
      <div className="row g-2 mt-2">
        {/* CARD 3 - Top 5 Vendors by Annual IFM Spend (₹ Cr) */}
        <div className="col-md-4">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2 mb-0">
              Top 5 Vendors by Annual IFM Spend (₹ Cr)
            </p>
            <p className="text-start global-font ms-2 mb-2">
              Top 5 suppliers account for over 80% of IFM spend → significant
              opportunity to negotiate bundled contracts for greater savings.
            </p>

            <div className="flex-grow-1">
              <ReactApexChart
                options={IFMTopVendorBySpend.options}
                series={IFMTopVendorBySpend.series}
                type="bar"
                height={250}
              />
            </div>
          </div>
        </div>

        {/* CARD 4 - Major Vendors Across IFM Sub-Services */}
        <div className="col-md-3">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2 mb-3">
              Major Vendors Across IFM Sub-Services
            </p>

            <ReactApexChart
              options={IFMVendorMixByType.options}
              series={IFMVendorMixByType.series}
              type="donut"
              height={280}
            />
          </div>
        </div>

        {/* CARD 5 - Supplier Performance Scorecard */}
        <div className="col-md-5">
          <div className="global-cards h-100 p-2 d-flex flex-column">
            <p className="head-theme text-start m-2">
              Supplier Performance Scorecard
            </p>

            <div className="table-container pe-1">
              <table className="table table-bordered table-sm m-0">
                <thead>
                  <tr>
                    <th className="p-1 text-start defaultStyleHead">Vendor</th>
                    <th className="p-1 text-start defaultStyleHead">
                      Service Type
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Cost Efficiency
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Service Quality
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Delivery Reliability
                    </th>
                    <th className="p-1 text-start defaultStyleHead">
                      Overall Score
                    </th>
                    <th className="p-1 text-start defaultStyleHead">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {IFMTabsData.ifm_supplier_performance.map((data, index) => (
                    <tr key={index}>
                      <td className="p-1 defaultStyles">{data.vendor}</td>
                      <td className="p-1 defaultStyles">{data.service_type}</td>
                      <td className="p-1 defaultStyles pe-4">
                        {data.cost_competitiveness}
                      </td>
                      <td className="p-1 defaultStyles">
                        {data.service_quality}
                      </td>
                      <td className="p-1 defaultStyles pe-4">
                        {data.delivery_reliability}
                      </td>
                      <td className="p-1 defaultStyles">
                        {data.overall_score} /5
                      </td>
                      <td className="p-1 defaultStyles">{data.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFMVendorLandscapeTab;
