import React, { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import partMatch from "../../../Images/Parts/partMatch.gif";
import { RiToolsFill } from "react-icons/ri";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoIosList } from "react-icons/io";
import { MdFilterListAlt } from "react-icons/md";
import { Button, Form, Table, Modal, Collapse } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import * as XLSX from "sheetjs-style";
import { saveAs } from "file-saver";
import { DualSTLViewer } from "./CompareViewer";
import { LuBadgeInfo } from "react-icons/lu";
import { SemiCircleProgress } from "react-semicircle-progressbar";
import Loading from "../../Helper/Loading";
import { set } from "rsuite/esm/internals/utils/date";

const Test2 = ({ partDetails }) => {
  const [similar, setSimilar] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading2, setLoading2] = useState(false);

  const [inputPrice, setInputPrice] = useState();

  const handleMatch = async () => {
    setLoading2(true);
    const formData = new FormData();
    formData.append("stp_file", partDetails.stpFile);
    formData.append("threshold", `${partDetails.threshold}`);
    // request call
    try {
      const response = await axios.post(
        `https://dicv-part-classifier-cpu-b7ambdhrdpb4f7bd.northeurope-01.azurewebsites.net/similar_images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        setLoading2(false);
        // console.log(response.data.similar_images, "data loaded");
        const data = response.data.similar_images;
        setInputPrice(response.data.price);
        // console.log(data, "check1");
        // const arr = data.filter((x) =>
        //   specifications.some(
        //     (z) =>
        //       z["Product Name"] === x.name && z.Label === partDetails.partId
        //   )
        // );
        // console.log(arr, "check2");
        const sortedArray = data.sort((a, b) => {
          if (a.overall_similarity > b.overall_similarity) return -1; // a comes first (descending)
          if (a.overall_similarity < b.overall_similarity) return 1; // b comes first
          return 0; // equal
        });
        setSimilar(sortedArray);
        // console.log(sortedArray, "check3");
        const hsData = {
          input: partDetails.partId,
          category: partDetails.partCategory,
          predictConfidence: partDetails.partConfidence,
          threshold: partDetails.threshold,
          output: [],
          date: new Date().toISOString(),
        };

        sortedArray.forEach((x) => {
          hsData.output.push({
            id: x.name,
            score: x.overall_similarity.toFixed(2),
          });
        });

        const hs = localStorage.getItem("userLogs"); // get before the check

        if (hs === null) {
          localStorage.setItem("userLogs", JSON.stringify([hsData]));
          // console.log([hsData]);
        } else {
          const historyData = JSON.parse(hs);
          historyData.push(hsData);
          localStorage.setItem("userLogs", JSON.stringify(historyData));
          // console.log(historyData);
          setHistory(historyData);
        }
      }
    } catch (error) {
      console.log(error.message);
      setLoading2(false);
    }
  };

  useEffect(() => {
    handleMatch();
  }, []);

  //image viewers
  const [zoom, setZoom] = useState(1); // Zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position
  const [dragging, setDragging] = useState(false); // Drag state
  const [start, setStart] = useState({ x: 0, y: 0 }); // Drag start position

  // Zoom In
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));

  // Zoom Out (reset position if at minimum zoom)
  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.2, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 }); // Reset position when fully zoomed out
      return newZoom;
    });
  };

  // Start Drag
  const handleMouseDown = (e) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Move Image
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - start.x, y: e.clientY - start.y });
  };

  // Stop Drag
  const handleMouseUp = () => setDragging(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setDragging(false);
    setStart({ x: 0, y: 0 });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleViewImage = (image) => {
    handleShow();
    setSelectedImage(image);
  };

  //part compare modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setShow1(false);
  };
  const handleShow1 = () => setShow1(true);

  const [activeOutputId, setActiveOutputId] = useState("");
  const [activeOutputLink, setActiveOutputLink] = useState("");
  const handleCompare = (id, link) => {
    handleShow1();
    setActiveOutputId(id);
    setActiveOutputLink(link);
  };

  // export
  const exportToExcel = () => {
    const data = similar.map(
      ({
        name,
        overall_similarity,
        score,
        volume_similarity,
        mse,
        ssim,
        orb,
        volumes,
        dimension_similarity,
      }) => {
        const dimensions = dimension_similarity.details || {};
        return {
          Output: name,
          "Overall Score (%)": overall_similarity,
          "Visual Similarity (%)": (score * 100).toFixed(2),
          "Volume Similarity (%)": volume_similarity.toFixed(2),
          MSE: mse,
          SSIM: ssim,
          ORB: orb,
          "ORB (%)": ((orb / 500) * 100).toFixed(2),
          "Length Similarity (%)": dimensions.length.toFixed(2) || 0,
          "Height Similarity (%)": dimensions.height.toFixed(2) || 0,
          "Thickness Similarity (%)": dimensions.thickness.toFixed(2) || 0,
          "Breadth Similarity (%)": dimensions.breadth.toFixed(2) || 0,
          "Volume (mm³)": volumes.compare_volume?.toFixed(2),
          Dimensions: `Length: ${
            dimensions.length.toFixed(2) || 0
          } mm | Breadth: ${
            dimensions.breadth.toFixed(2) || 0
          } mm | Thickness: ${
            dimensions.thickness.toFixed(2) || 0
          } mm | Height: ${dimensions.height.toFixed(2) || 0} mm`,
        };
      }
    );

    const currentDate = new Date().toISOString().slice(0, 10);
    const filename = `Part_Similarity_Report_${partDetails.partId}_${currentDate}.xlsx`;

    const workbook = XLSX.utils.book_new();

    const dimensionsString = `Length: ${partDetails.partDimension.length.toFixed(
      2
    )} mm | Breadth: ${partDetails.partDimension.breadth.toFixed(
      2
    )} mm | Thickness: ${partDetails.partDimension.thickness.toFixed(
      2
    )} mm | Height: ${partDetails.partDimension.height.toFixed(
      2
    )} mm | | Volume: ${partDetails.partDimension.volume?.toFixed(2)} mm³`;

    const worksheetData = [
      ["Part Similarity Report"],
      ["Input Part ID:", partDetails.partId],
      ["Category:", partDetails.partCategory],
      [dimensionsString],
      [],
      Object.keys(data[0]),
      ...data.map((item) => Object.values(item)),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    if (!worksheet["!merges"]) worksheet["!merges"] = [];

    worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 11 } });
    worksheet["!merges"].push({ s: { r: 3, c: 0 }, e: { r: 3, c: 11 } });

    const baseStyle = {
      alignment: { horizontal: "left", vertical: "center", wrapText: false },
      font: { name: "Calibri", sz: 11 },
    };

    worksheet["A1"].s = {
      ...baseStyle,
      fill: { fgColor: { rgb: "38858E" } },
      font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 },
    };

    for (let row = 1; row <= 3; row++) {
      const cell = XLSX.utils.encode_cell({ r: row, c: 0 });
      worksheet[cell].s = {
        ...baseStyle,
        fill: { fgColor: { rgb: "D0E7EB" } },
        font: { bold: true },
      };
    }

    worksheet["A4"].s = {
      ...baseStyle,
      fill: { fgColor: { rgb: "D0E7EB" } },
      font: { bold: true },
    };

    for (let col = 0; col < Object.keys(data[0]).length; col++) {
      const cell = XLSX.utils.encode_cell({ r: 5, c: col });
      worksheet[cell].s = {
        ...baseStyle,
        fill: { fgColor: { rgb: "38858E" } },
        font: { bold: true, color: { rgb: "FFFFFF" } },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };
    }

    for (let row = 6; row < data.length + 6; row++) {
      for (let col = 0; col < Object.keys(data[0]).length; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        worksheet[cellRef] = worksheet[cellRef] || {};
        worksheet[cellRef].s = {
          ...baseStyle,
          ...(col === 0 && {
            fill: { fgColor: { rgb: "FFF2CC" } },
            font: { bold: true },
          }),
        };
      }
    }

    // ✅ Apply column widths (min 120px ≈ 20 wch, Dimensions ≈ 40 wch)
    worksheet["!cols"] = Object.keys(data[0]).map((key) => ({
      wch: key === "Dimensions" ? 40 : 17,
    }));

    XLSX.utils.book_append_sheet(workbook, worksheet, "Similarity Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, filename);
  };

  //logs modal
  const [showLogs, setShowLogs] = useState(false);
  const handleOpenLogs = () => setShowLogs(true);
  const handleCloseLogs = () => setShowLogs(false);

  const [openRow1, setOpenRow1] = useState(null);

  const toggleDropdown = (index) => {
    setOpenRow1(openRow1 === index ? null : index);
  };

  //tooltip
  const InfoIcon = ({ text }) => (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip style={{ whiteSpace: "pre-wrap", fontSize: "10px" }}>
          {text}
        </Tooltip>
      }
    >
      <span
        style={{ marginLeft: 6, cursor: "pointer", color: "var(--color-main)" }}
      >
        <LuBadgeInfo />
      </span>
    </OverlayTrigger>
  );

  //supplier price compare modal
  const [supplierData, setSupplierData] = useState([]);
  const [load, setLoad] = useState(false);

  const [expandedRow, setExpandedRow] = useState(null);

  const handleSupplierPrice = async (id, rowIndex, cn) => {
    setSupplierData([]);
    if (cn) {
      setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
      return;
    } else setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
    setLoad(true);
    try {
      const response = await axios.get(
        "https://dicv-part-classifier-cpu-b7ambdhrdpb4f7bd.northeurope-01.azurewebsites.net/supplier?id=" +
          id,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        // console.log(response.data);
        setSupplierData(response.data);
      }
    } catch (error) {
      console.error("Data loading failed:", error.message);
    } finally {
      setLoad(false);
    }
  };

  //last
  return (
    <div style={{ textAlign: "left" }}>
      {loading2 ? (
        <div style={{ width: "500px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              color: "var(--color-main)",
              fontSize: "15px",
              marginTop: "50px",
              fontWeight: 500,
            }}
          >
            Identifying similar parts using the input image.
          </p>
          <img
            src={partMatch}
            style={{
              width: "200px",
              margin: "10px 0px",
            }}
          />

          {/* Center all feature blocks */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              flexWrap: "wrap", // allows wrapping on small screens
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--color-main)",
              marginTop: "20px",
            }}
          >
            {[
              {
                src: "https://cdn.iconscout.com/icon/free/png-256/free-statistical-analysis-icon-download-in-svg-png-gif-file-formats--analytics-logo-barchart-report-growth-market-research-corporate-management-teamwork-pack-business-icons-1297647.png",
                label: "Statistical Analysis",
              },
              {
                src: "https://cdn-icons-png.flaticon.com/512/847/847756.png",
                label: "Overlap Test",
              },
              {
                src: "https://png.pngtree.com/element_our/png/20181208/list-icon-png_265066.jpg",
                label: "Feature Vector Analysis",
              },
              {
                src: "https://cdn-icons-png.freepik.com/512/16247/16247920.png",
                label: "Dimensional Test",
              },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <img
                  src={item.src}
                  alt={item.label}
                  style={{ width: "30px", height: "30px" }}
                />
                <p style={{ margin: "10px 0 0" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={partDetails.isoImage}
                alt="Input"
                style={{
                  width: "100px",
                  height: "80px",
                  background: "black",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleViewImage(partDetails.isoImage);
                }}
              />
              <div style={{ padding: "5px 10px" }}>
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--color-main)",
                    marginBottom: "5px",
                  }}
                >
                  <RiToolsFill style={{ fontSize: "15px" }} />{" "}
                  {partDetails?.partCategory} - {partDetails?.partId}
                </p>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px",
                      fontSize: "10px",
                    }}
                  >
                    Length : {partDetails?.partDimension?.length.toFixed(2)} mm
                  </p>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Breadth : {partDetails?.partDimension?.breadth.toFixed(2)}{" "}
                    mm
                  </p>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Thickness :{" "}
                    {partDetails?.partDimension?.thickness.toFixed(2)} mm
                  </p>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Height : {partDetails?.partDimension?.height.toFixed(2)} mm
                  </p>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Volume : {partDetails?.partDimension?.volume.toFixed(2)} mm³
                  </p>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Weight : {partDetails?.partDimension?.weight.toFixed(2)} kg
                  </p>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    RM Spend : ₹ {inputPrice ? inputPrice?.toFixed(2) : "N/A"}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    margin: "0px",
                  }}
                >
                  <IoIosList style={{ fontSize: "13px" }} /> Found{" "}
                  {similar.length} matching part's results.
                </p>
              </div>
            </div>
            {/* threshold */}
            <div>
              <div style={{ display: "flex" }}>
                <div>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "var(--color-main)",
                      marginBottom: "10px",
                    }}
                  >
                    Threshold Filter <MdFilterListAlt />
                  </p>
                  <div className="d-flex align-items-center gap-2 mt-0">
                    <div className="position-relative">
                      <Form.Control
                        type="range"
                        min="0"
                        max="100"
                        value={partDetails?.threshold}
                        onChange={(e) =>
                          partDetails?.setThreshold(Number(e.target.value))
                        }
                        className="custom-range"
                        style={{
                          height: "10px",
                          background: `linear-gradient(to right, var(--color-main) ${partDetails?.threshold}%, #ddd ${partDetails?.threshold}%)`,
                        }}
                      />
                    </div>
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      size="sm"
                      value={partDetails?.threshold}
                      style={{ fontSize: "11px", width: "50px" }}
                      onChange={(e) => {
                        const val = Math.min(
                          100,
                          Math.max(0, Number(e.target.value))
                        );
                        partDetails?.setThreshold(val);
                      }}
                      className="text-center"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="btn-theme-dark"
                    style={{
                      margin: 0,
                      fontSize: "10px",
                      width: "100%",
                    }}
                    onClick={handleMatch}
                  >
                    Apply
                  </Button>
                </div>

                <div style={{ marginTop: "27px" }}>
                  <Button
                    size="sm"
                    className="btn-theme-dark"
                    style={{
                      margin: 0,
                      fontSize: "10px",
                      display: "block",
                      marginLeft: "10px",
                      padding: "5px 10px",
                      marginBottom: "4px",
                      width: "100px",
                    }}
                    onClick={handleOpenLogs}
                  >
                    Logs
                  </Button>

                  <Button
                    size="sm"
                    className="btn-theme-dark"
                    style={{
                      margin: 0,
                      fontSize: "10px",
                      display: "block",
                      marginLeft: "10px",
                      padding: "5px 10px",
                      marginBottom: "4px",
                      width: "100px",
                    }}
                    onClick={exportToExcel}
                  >
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Table */}
          <Table
            style={{ fontSize: "12px", textAlign: "left" }}
            // striped
            hover
            responsive
          >
            <thead>
              <tr>
                <th
                  style={{
                    color: "var(--color-main)",
                    borderRight: "1px solid var(--color-main)",
                    width: "17%",
                    background: "rgba(81, 166, 176, 0.1)",
                  }}
                >
                  Part Id
                </th>
                <th
                  style={{
                    color: "var(--color-main)",
                    borderRight: "1px solid var(--color-main)",
                    background: "rgba(81, 166, 176, 0.1)",
                    width: "15%",
                  }}
                >
                  Visual & Volume Similarity
                </th>
                <th
                  style={{
                    color: "var(--color-main)",
                    borderRight: "1px solid var(--color-main)",
                    background: "rgba(81, 166, 176, 0.1)",
                    width: "18%",
                  }}
                >
                  Dimension Similarity{" "}
                </th>
                <th
                  style={{
                    color: "var(--color-main)",
                    borderRight: "1px solid var(--color-main)",
                    width: "12%",
                    background: "rgba(81, 166, 176, 0.1)",
                  }}
                >
                  Statistical Analysis (MSE)
                  <InfoIcon
                    text={`MSE – Mean Squared Error (↓ Lower is Better):\nIndicates pixel-level difference between images.\nLower % = more similar, 0% = perfect match.`}
                  />
                </th>

                <th
                  style={{
                    color: "var(--color-main)",
                    borderRight: "1px solid var(--color-main)",
                    width: "16%",
                    background: "rgba(81, 166, 176, 0.1)",
                  }}
                >
                  Overlap Test (SSIM)
                  <InfoIcon
                    text={`SSIM – Structural Similarity Index (↑ Higher is Better):\nCaptures visual and structural similarity (edges, textures).\nHigher % = more visually alike, 100% = identical structure.`}
                  />
                </th>

                <th
                  style={{
                    color: "var(--color-main)",
                    borderRight: "1px solid var(--color-main)",
                    width: "17%",
                    background: "rgba(81, 166, 176, 0.1)",
                  }}
                >
                  Feature Vector Analysis (ORB)
                  <InfoIcon
                    text={`ORB – Keypoint Matching (↑ Higher is Better):\nCompares feature points (like corners and edges).\nHigher % = better geometric/feature match.`}
                  />
                </th>
                <th
                  style={{
                    color: "var(--color-main)",
                    borderRight: "1px solid var(--color-main)",
                    background: "rgba(81, 166, 176, 0.1)",
                    width: "5%",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {similar.map((row, rowIndex) => (
                <React.Fragment key={row.id}>
                  <tr>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          padding: "5px",
                          paddingBottom: "0px",
                        }}
                      >
                        <img
                          onClick={() => {
                            handleViewImage(row.image);
                          }}
                          src={row.image}
                          alt="Output"
                          style={{
                            width: "100px",
                            height: "80px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        />
                        <div
                          style={{
                            padding: "0px 10px",
                            width: "100%",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: 550,
                              color: "var(--color-main)",
                              margin: 0,
                            }}
                          >
                            {row.name}
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 500,
                              margin: 0,
                              marginBottom: "0px",
                              marginTop: "5px",
                            }}
                          >
                            Overall Score
                          </p>
                          <div>
                            <SemiCircleProgress
                              percentage={row.overall_similarity.toFixed(2)}
                              size={{
                                width: 60,
                                height: 60,
                              }}
                              strokeWidth={10}
                              strokeColor="var(--color-main)"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          margin: 0,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          width: "100%",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: "10px",
                            color: "grey",
                            fontWeight: 550,
                          }}
                        >
                          RM Spend -{" "}
                          <span
                            style={{
                              color: "var(--color-main)",
                            }}
                          >
                            ₹ {row.price}
                          </span>
                        </p>
                        <Button
                          size="small"
                          style={{
                            minWidth: "auto",
                            padding: "0 4px",
                            lineHeight: 1,
                            fontSize: "14px",
                            background: "none",
                            border: "1px solid var(--color-main)",
                            color: "var(--color-main)",
                            textTransform: "none",
                            marginRight: "15px",
                            borderRadius: 0, // removes rounded corners
                          }}
                          onClick={() =>
                            handleSupplierPrice(
                              row.name,
                              rowIndex,
                              expandedRow === rowIndex && true
                            )
                          }
                          disabled={load && expandedRow === rowIndex}
                        >
                          {expandedRow === rowIndex ? "−" : "+"}
                        </Button>
                      </div>
                    </td>
                    <td>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          margin: 0,
                          marginBottom: "5px",
                          marginTop: "0px",
                        }}
                      >
                        Visual Similarity Score
                      </p>
                      <div
                        className="progress me-2"
                        style={{
                          margin: 0,
                          width: "15%",
                          height: "17px",
                          borderRadius: "10px",
                          background: "#becdd0",
                          color: "white",
                          position: "relative",
                          width: "90%",
                        }}
                      >
                        <div
                          role="progressbar"
                          style={{
                            width: `${Math.round(row.score * 100)}%`,
                            background: "#5dabb4",
                            fontSize: "10px",
                            fontWeight: 550,
                          }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <p
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 10,
                            }}
                          >
                            {Math.round(row.score * 100)}%
                          </p>
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          margin: 0,
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                      >
                        Part Volume -{" "}
                        <span style={{ color: "var(--color-main)" }}>
                          {row?.volumes?.compare_volume?.toFixed(2)} mm³
                        </span>
                      </p>
                      <div
                        className="progress me-2"
                        style={{
                          margin: 0,
                          width: "15%",
                          height: "17px",
                          borderRadius: "10px",
                          background: "#becdd0",
                          color: "white",
                          position: "relative",
                          width: "90%",
                        }}
                      >
                        <div
                          role="progressbar"
                          style={{
                            width: `${Math.round(
                              row.volume_similarity.toFixed(2)
                            )}%`,
                            background: "#5dabb4",
                            fontSize: "10px",
                            fontWeight: 550,
                          }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <p
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 10,
                            }}
                          >
                            Volume Similarity :{" "}
                            {Math.round(row.volume_similarity.toFixed(2))}%
                          </p>
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          margin: 0,
                          marginBottom: "5px",
                          marginTop: "5px",
                        }}
                      >
                        Part Weight -{" "}
                        <span style={{ color: "var(--color-main)" }}>
                          {row?.weights?.compare_weight?.toFixed(2)} kg
                        </span>
                      </p>
                      <div
                        className="progress me-2"
                        style={{
                          margin: 0,
                          width: "15%",
                          height: "17px",
                          borderRadius: "10px",
                          background: "#becdd0",
                          color: "white",
                          position: "relative",
                          width: "90%",
                        }}
                      >
                        <div
                          role="progressbar"
                          style={{
                            width: `${Math.round(
                              row.volume_similarity.toFixed(2)
                            )}%`,
                            background: "#5dabb4",
                            fontSize: "10px",
                            fontWeight: 550,
                          }}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <p
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 10,
                            }}
                          >
                            Weight Similarity :{" "}
                            {Math.round(row.weight_similarity.toFixed(2))}%
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "5px",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "5px",
                          fontSize: "10px",
                          color: "grey",
                          fontWeight: 500,
                          paddingLeft: "10px",
                        }}
                      >
                        % of dimension similarity
                      </p>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbar
                            strokeWidth={10}
                            styles={buildStyles({
                              pathColor: "var(--color-main)",
                              textColor: "var(--color-main)",
                            })}
                            style={{ color: "red !important" }}
                            value={row.dimension_similarity.overall}
                            text={
                              row.dimension_similarity.overall.toFixed(2) + "%"
                            }
                          />
                        </div>
                        <div style={{ paddingLeft: "10px" }}>
                          <p
                            style={{
                              fontSize: "9px",
                              color: "grey",
                              margin: 0,
                            }}
                          >
                            Length Similarity :{" "}
                            {row.dimension_similarity.details.length.toFixed(2)}
                            %
                          </p>
                          <p
                            style={{
                              fontSize: "9px",
                              color: "grey",
                              margin: 0,
                            }}
                          >
                            Breadth Similarity :{" "}
                            {row.dimension_similarity.details.breadth.toFixed(
                              2
                            )}
                            %
                          </p>
                          <p
                            style={{
                              fontSize: "9px",
                              color: "grey",
                              margin: 0,
                            }}
                          >
                            Thickness Similarity :
                            {row.dimension_similarity.details.thickness.toFixed(
                              2
                            )}
                            %
                          </p>
                          <p
                            style={{
                              fontSize: "9px",
                              color: "grey",
                              margin: 0,
                            }}
                          >
                            Height Similarity :{" "}
                            {row.dimension_similarity.details.height.toFixed(2)}
                            %
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p
                        style={{
                          textAlign: "center",
                          paddingTop: "25px",
                          color: "var(--color-main)",
                          fontWeight: 500,
                        }}
                      >
                        {row.mse.toFixed(2)}
                      </p>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <img
                          src={row.ssim_image}
                          onClick={() => {
                            handleViewImage(row.ssim_image);
                          }}
                          alt="MSE"
                          style={{
                            width: "100px",
                            height: "80px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        />
                        <div style={{ paddingTop: "10px", paddingLeft: "5px" }}>
                          <p
                            style={{
                              color: "var(--color-main)",
                              fontWeight: 500,
                              fontSize: "12px",
                              margin: "0px",
                            }}
                          >
                            {row.ssim.toFixed(2)}
                          </p>
                          <p
                            style={{
                              color: "grey",
                              fontSize: "10px",
                              margin: 0,
                            }}
                          >
                            SSIM Similarity Check Result
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex" }}>
                        <img
                          src={row.orb_image}
                          onClick={() => {
                            handleViewImage(row.orb_image);
                          }}
                          alt="MSE"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        />
                        <div style={{ paddingTop: "10px", paddingLeft: "5px" }}>
                          <p
                            style={{
                              color: "var(--color-main)",
                              fontSize: "12px",
                              margin: 0,
                              fontWeight: 500,
                              marginBottom: "5px",
                            }}
                          >
                            ORB Result
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              margin: "0px",
                              color: "grey",
                            }}
                          >
                            Value :{" "}
                            <span
                              style={{
                                color: "var(--color-main)",
                                fontWeight: 500,
                              }}
                            >
                              {row.orb}
                            </span>
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              margin: "0px",
                              color: "grey",
                            }}
                          >
                            Percentage :{" "}
                            <span
                              style={{
                                color: "var(--color-main)",
                                fontWeight: 500,
                              }}
                            >
                              {((row.orb / 500) * 100).toFixed(2)}%
                            </span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: "center", paddingTop: "20px" }}>
                      <Button
                        size="sm"
                        className="btn-theme-dark"
                        style={{
                          margin: 0,
                          fontSize: "10px",
                        }}
                        onClick={() =>
                          handleCompare(row.name, row.output_stl_file)
                        }
                      >
                        Compare
                      </Button>
                    </td>
                  </tr>
                  {expandedRow === rowIndex && (
                    <tr>
                      <td
                        colSpan="7"
                        style={{ padding: "10px", background: "#EEEEEE" }}
                      >
                        {load ? (
                          <div style={{ textAlign: "center" }}>
                            <PulseLoader color="#357b83" size={10} />
                          </div>
                        ) : (
                          <Table
                            style={{ fontSize: "11px", margin: 0 }}
                            striped
                            bordered
                            hover
                            responsive
                            size="sm"
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  Supplier Name
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  Supplier Id
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  RM Grade
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  RM Grade Spec
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  Gross Weight
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  Finished Weight
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  Scrap Weight
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  Raw Material Price
                                </th>
                                <th
                                  style={{
                                    background: "rgba(81, 166, 176, 0.3)",
                                    color: "var(--color-main)",
                                  }}
                                >
                                  Part Price
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {supplierData.map((supplier, idx) => (
                                <tr key={idx}>
                                  <td>{supplier.supplier}</td>
                                  <td>{supplier.supplier_id}</td>
                                  <td>{supplier.rm_grade}</td>
                                  <td>{supplier.rm_grade_spec}</td>
                                  <td>{supplier.gross_weight}</td>
                                  <td>{supplier.finished_weight} kg</td>
                                  <td>{supplier.scrap_weight}</td>
                                  <td>₹ {supplier.raw_material_price}</td>
                                  <td>₹ {supplier.part_price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          {/* IMAGE VIEWER MODAL */}
          <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton style={{ padding: "5px 10px" }}>
              <Modal.Title style={{ fontSize: "13px" }}>
                Preview Image
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="text-center"
              style={{ background: "black", padding: "0px" }}
            >
              <div className="d-flex flex-column align-items-center">
                {/* Image Container with Zoom & Drag */}
                <div
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    cursor: dragging
                      ? "grabbing"
                      : zoom > 1
                      ? "grab"
                      : "default",
                    position: "relative",
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={() => setDragging(false)}
                >
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      bottom: 20,
                      right: 20,
                    }}
                  >
                    <Button
                      variant="outline-secondary"
                      className="btn-theme-dark"
                      onClick={handleZoomIn}
                      size="sm"
                    >
                      <FaSearchPlus />
                    </Button>
                    <Button
                      className="btn-theme-dark"
                      variant="outline-secondary"
                      onClick={handleZoomOut}
                      size="sm"
                      style={{ marginLeft: "10px" }}
                    >
                      <FaSearchMinus />
                    </Button>
                  </div>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Zoomable"
                      style={{
                        transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                        transition: dragging
                          ? "none"
                          : "transform 0.3s ease-in-out",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {/* 3D PART COMPARE MODAL */}
          <Modal show={show1} onHide={handleClose1} centered size="lg">
            <Modal.Header closeButton style={{ padding: "5px 10px" }}>
              <Modal.Title style={{ fontSize: "13px" }}>
                Part Comparison
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: "0px" }}>
              <div>
                <DualSTLViewer
                  url1={partDetails.stlFile}
                  url2={activeOutputLink}
                  names={[partDetails.partId, activeOutputId]}
                />
              </div>
            </Modal.Body>
          </Modal>
          {/* LOGS MODAL */}
          <Modal
            show={showLogs}
            onHide={handleCloseLogs}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title
                style={{ fontSize: "15px", color: "var(--color-main)" }}
              >
                User Logs
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {history.length === 0 ? (
                <p>No history available.</p>
              ) : (
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <Table
                    style={{ fontSize: "13px" }}
                    striped
                    bordered
                    hover
                    responsive
                    size="sm"
                  >
                    <thead>
                      <tr>
                        {[
                          "No.",
                          "Date",
                          "Input",
                          "Category",
                          "Confidence %",
                          "Threshold %",
                          "Output Count",
                          "Action",
                        ].map((header) => (
                          <th
                            key={header}
                            style={{
                              color: "var(--color-main)",
                              background: "rgba(81, 166, 176, 0.1)",
                              position: "sticky",
                              top: 0,
                              zIndex: 1,
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((log, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{new Date(log.date).toLocaleString()}</td>
                            <td>{log.input}</td>
                            <td>{log.category}</td>
                            <td>{(log.predictConfidence * 100).toFixed(2)}%</td>
                            <td>{log.threshold}</td>
                            <td>{log.output?.length} </td>
                            <td>
                              {" "}
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => toggleDropdown(index)}
                                style={{
                                  marginLeft: "5px",
                                  fontSize: "11px",
                                  padding: "1px 6px",
                                }}
                                className="btn-theme-dark"
                              >
                                Show
                              </Button>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan="7"
                              style={{ padding: 0, border: "none" }}
                            >
                              <Collapse in={openRow1 === index}>
                                <div
                                  style={{
                                    padding: "8px 16px",
                                    background: "#f8f9fa",
                                  }}
                                >
                                  {log.output?.map((item, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        fontSize: "12px",
                                        width: "220px",
                                        padding: "5px 10px",
                                        marginTop: "2px",
                                        background: "rgba(81, 166, 176, 0.3)",
                                      }}
                                    >
                                      <strong>ID:</strong> {item.id} &nbsp;
                                      <strong>Score:</strong> {item.score}%
                                    </div>
                                  ))}
                                </div>
                              </Collapse>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Test2;
