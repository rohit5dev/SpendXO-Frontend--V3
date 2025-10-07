import React, { useRef, useState } from "react";
import { Button, ListGroup, Form, Modal } from "react-bootstrap";
import { LuBot, LuLoader } from "react-icons/lu";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiToolsFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import { BarLoader } from "react-spinners";
import axios from "axios";
import STLViewer from "./STLViewer";
import Test2 from "./Test2";
import { PuffLoader } from "react-spinners";
import * as XLSX from "sheetjs-style";

const PartClassification = () => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [stlFile, setStlFile] = useState("");
  const [isoImage, setIsoImage] = useState("");
  const [partId, setPartId] = useState("");
  const [partCategory, setPartCategory] = useState("");
  const [partIdentified, setPartIdentified] = useState(false);
  const [partConfidence, setPartConfidence] = useState(0);
  const [partDimension, setPartDimension] = useState();
  const [threshold, setThreshold] = useState(60);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPartId(file.name.split(".")[0]);
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // console.log("Uploading file:", selectedFile);
      setLoading1(true);
      const formData = new FormData();
      // formData.append("src_container_name", "dicv-part-classifier");
      // formData.append("dest_container_name", "dicv-part-classifier");
      formData.append("stp_file", selectedFile);
      try {
        const response = await axios.post(
          `https://dicv-part-classifier-cpu-b7ambdhrdpb4f7bd.northeurope-01.azurewebsites.net/predict`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          setLoading1(false);
          // console.log(response.data);
          const data = response.data;
          setStep1(true);
          setStlFile(data?.stl_url);
          setIsoImage(data.isometric_image);
          setPartCategory(data.label);
          setPartConfidence(data.confidence);
          setPartDimension(data.dimensions);
          if (data.label !== "New Part identified") setPartIdentified(true);
          else setPartIdentified(false);
          // console.log(response.data);
        }
      } catch (error) {
        console.log(error.message);
        setLoading1(false);
      }
    }
  };

  const handleHome = () => {
    handleReset2();
    handleReset1();
  };

  const handleReset1 = () => {
    setStep1(false);
    //other states as well
    setStlFile(null);
    setPartIdentified(false);
    setPartId("");
    setPartCategory("");
    setPartDimension();
    setPartConfidence(0);
    setIsoImage("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Use empty string instead of null
    }
    setThreshold(60);
    //also handle id this reset1 clicked from step2
  };

  const handleReset2 = () => {
    setStep2(false);
    //other states as well
  };

  //handle modal for train model
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [loadTrain, setLoadTrain] = useState(false);
  const handleSubmitTrain = (e) => {
    e.preventDefault();
    setLoadTrain(true);
    setTimeout(() => {
      setLoadTrain(false);
      alert("Model sent for training approval");
    }, 2000);
  };

  //handle Find Similar function
  const handleMatch = () => {
    setStep2(true);
  };

  const childRef = useRef();

  const getFormattedValue = (val, cn) =>
    val !== undefined && val !== null && Math.abs(val) >= 0.001
      ? `${val.toFixed(2)} ${cn}`
      : "N/A";

  //last
  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px",
      }}
    >
      {!step1 && !step2 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              color: "var(--color-main)",
              fontWeight: 500,
              margin: "5px",
              fontSize: "20px",
            }}
          >
            AI-Powered Part Classifier <br /> for Smarter Decision-Making
          </p>
          <p style={{ color: "grey", margin: "5px", fontSize: "11px" }}>
            Enhance Accuracy, Save Time, and Reduce Operational Costs with AI
          </p>

          {/* Upload Box */}
          <div
            style={{
              background: "rgba(81, 166, 176, 0.1)",
              padding: "20px",
              width: "500px",
              border: "1px dashed var(--color-main)",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            <RiToolsFill
              style={{
                fontSize: "40px",
                color: "var(--color-main)",
                marginBottom: "20px",
                width: "100%",
              }}
            />
            <input
              type="file"
              accept=".stp,.step"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            {!loading1 ? (
              <div>
                <Button
                  size="sm"
                  variant="primary"
                  className="btn-theme-dark"
                  style={{ fontSize: "12px" }}
                  onClick={handleChooseClick}
                >
                  Choose File{" "}
                  <IoCloudUploadOutline
                    style={{ fontSize: "18px", marginLeft: "10px" }}
                  />
                </Button>
                <p style={{ fontSize: "10px", marginTop: "7px" }}>
                  Use Only STP & STEP File.
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "10px", marginTop: "7px" }}>
                  Processing 3D file for classification.
                </p>
                <div style={{ background: "#f5f5f5", width: "100%" }}>
                  <BarLoader
                    color="var(--color-main)"
                    width={"100%"}
                    loading={loading1}
                  />
                </div>
              </div>
            )}
          </div>

          {/* File Preview + Upload Button */}
          {selectedFile && (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <div
                style={{
                  background: "rgba(81, 166, 176, 0.2)",
                  padding: "10px",
                  fontSize: "13px",
                  width: "500px",
                  borderRadius: "5px",
                }}
                className="d-flex justify-content-between align-items-center"
              >
                <p style={{ margin: "0px", marginTop: "5px" }}>
                  {selectedFile.name}
                </p>

                {loading1 ? (
                  <Button
                    size="sm"
                    variant="primary"
                    className="btn-theme-dark"
                    style={{ fontSize: "12px", margin: "0px" }}
                  >
                    Processing
                    <LuLoader
                      style={{ fontSize: "18px", marginLeft: "10px" }}
                    />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    className="btn-theme-dark"
                    style={{ fontSize: "12px", margin: "0px" }}
                    onClick={handleUpload}
                  >
                    Upload{" "}
                    <MdOutlineCloudUpload
                      style={{ fontSize: "18px", marginLeft: "10px" }}
                    />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Feature Cards */}
          <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap">
            {[
              "🔍 AI-Powered Parts Similarity Detection",
              "📊 Multi-Metric Analysis for Maximum Accuracy",
              "📈 Scalable & Customizable for Your Industry",
              "🎨 Comprehensive Visual Data Insights",
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  width: "150px",
                  height: "80px",
                  fontSize: "12px",
                  padding: "10px",
                  background: "var(--color-main)",
                  margin: "5px",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      ) : step1 && !step2 ? (
        <div>
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              marginLeft: "5px",
            }}
          >
            <p
              onClick={handleReset1}
              style={{
                margin: "0px 5px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Home
            </p>
            <p style={{ margin: "0px 5px", fontSize: "12px" }}>/</p>
            <p
              style={{
                margin: "0px 5px",
                fontSize: "12px",
                cursor: "pointer",
                color: "var(--color-main)",
                textDecoration: "underline",
              }}
            >
              Classifier
            </p>
          </div>
          <div
            style={{
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "70%",
                padding: "0px 5px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  paddingLeft: "5px",
                }}
              >
                3D Model Viewer
              </p>
              <STLViewer url={stlFile} />
            </div>
            <div style={{ width: "30%", padding: "0px 20px" }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  paddingLeft: "5px",
                }}
              >
                Specifications
              </p>
              <ListGroup style={{ fontSize: "11px", width: "100%" }}>
                {[
                  {
                    label: "Part Identification",
                    value: partIdentified ? "True" : "False",
                  },
                  { label: "Category", value: partCategory },
                  { label: "Part Id", value: partId },
                  {
                    label: "Confidence",
                    value: `${(partConfidence * 100).toFixed(2)}%`,
                    background: "var(--color-main-light)",
                  },
                  {
                    label: "Length",
                    value: getFormattedValue(partDimension?.length, "(mm)"),
                  },
                  {
                    label: "Breadth",
                    value: getFormattedValue(partDimension?.breadth, "(mm)"),
                  },
                  {
                    label: "Thickness",
                    value: getFormattedValue(partDimension?.thickness, "(mm)"),
                  },
                  {
                    label: "Height",
                    value: getFormattedValue(partDimension?.height, "(mm)"),
                  },
                  {
                    label: "Volume",
                    value: getFormattedValue(partDimension?.volume, "(mm³)"),
                  },
                  {
                    label: "Weight",
                    value: getFormattedValue(partDimension?.weight, "(kg)"),
                  },
                ].map((item, index) => (
                  <ListGroup.Item
                    style={{
                      padding: "5px 15px",
                      display: "flex",
                      width: "100%",
                    }}
                    key={index}
                    action
                  >
                    <span
                      style={{
                        fontWeight: 550,
                        color: "var(--color-main)",
                        minWidth: "100px",
                        textAlign: "left",
                      }}
                    >
                      {item.label} :
                    </span>
                    <span style={{ flex: 1 }}>{item.value}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {partIdentified ? (
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      marginTop: "15px",
                      fontWeight: 500,
                      paddingLeft: "5px",
                    }}
                  >
                    Actions
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      marginTop: "15px",
                      fontWeight: 500,
                      paddingLeft: "5px",
                      margin: 0,
                    }}
                  >
                    Threshold
                  </p>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <div className="position-relative" style={{ width: "70%" }}>
                      <Form.Control
                        type="range"
                        min="0"
                        max="100"
                        value={threshold}
                        onChange={(e) => setThreshold(Number(e.target.value))}
                        className="custom-range"
                        style={{
                          height: "10px",
                          background: `linear-gradient(to right, var(--color-main-light) ${threshold}%, #ddd ${threshold}%)`,
                        }}
                      />
                    </div>
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      size="sm"
                      value={threshold}
                      style={{ width: "30%", fontSize: "11px" }}
                      onChange={(e) => {
                        const val = Math.min(
                          100,
                          Math.max(0, Number(e.target.value))
                        );
                        setThreshold(val);
                      }}
                      className="text-center"
                    />
                  </div>
                  <Button
                    onClick={handleMatch}
                    size="sm"
                    variant="primary"
                    className="btn-theme-dark"
                    style={{
                      fontSize: "12px",
                      marginTop: "20px",
                      width: "100%",
                    }}
                  >
                    Find Similar Parts{" "}
                    <IoSearch style={{ fontSize: "14px", marginLeft: "8px" }} />
                  </Button>

                  <Button
                    onClick={handleReset1}
                    size="sm"
                    variant="primary"
                    className="btn-theme-dark"
                    style={{
                      fontSize: "12px",
                      marginTop: "10px",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    Reset Classifier{" "}
                    <MdOutlineRestartAlt
                      style={{ fontSize: "16px", marginLeft: "22px" }}
                    />
                  </Button>
                </div>
              ) : (
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      marginTop: "20px",
                      fontWeight: 500,
                      paddingLeft: "5px",
                      marginBottom: 0,
                    }}
                  >
                    Future Feature{" "}
                  </p>
                  <Button
                    onClick={handleShow}
                    size="sm"
                    variant="primary"
                    className="btn-theme-dark"
                    style={{
                      fontSize: "12px",
                      marginTop: "10px",
                      width: "100%",
                    }}
                  >
                    Train Model{" "}
                    <LuBot style={{ fontSize: "15px", marginLeft: "35px" }} />
                  </Button>
                  <p
                    style={{
                      fontSize: "13px",
                      marginTop: "20px",
                      fontWeight: 500,
                      paddingLeft: "5px",
                      marginBottom: 0,
                    }}
                  >
                    Actions
                  </p>
                  <Button
                    onClick={handleReset1}
                    size="sm"
                    variant="primary"
                    className="btn-theme-dark"
                    style={{
                      fontSize: "12px",
                      marginTop: "10px",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    Reset Classifier{" "}
                    <MdOutlineRestartAlt
                      style={{ fontSize: "16px", marginLeft: "22px" }}
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              marginLeft: "5px",
            }}
          >
            <p
              onClick={handleHome}
              style={{
                margin: "0px 5px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Home
            </p>
            <p style={{ margin: "0px 5px", fontSize: "12px" }}>/</p>
            <p
              onClick={handleReset2}
              style={{
                margin: "0px 5px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Classifier
            </p>
            <p style={{ margin: "0px 5px", fontSize: "12px" }}>/</p>
            <p
              style={{
                margin: "0px 5px",
                fontSize: "12px",
                cursor: "pointer",
                color: "var(--color-main)",
                textDecoration: "underline",
              }}
            >
              Part Similarity
            </p>
          </div>
          <Test2
            partDetails={{
              partId: partId,
              partCategory: partCategory,
              partDimension: partDimension,
              partConfidence: partConfidence,
              stlFile: stlFile,
              stpFile: selectedFile,
              isoImage,
              threshold: threshold,
              setThreshold: setThreshold,
            }}
            ref={childRef}
          />
        </div>
      )}
      {/* TRAIN MODEL */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Train Model for New Part
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadTrain ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "var(--color-main)",
                width: "100%",
                paddingLeft: "45%",
              }}
            >
              <PuffLoader color="var(--color-main)" />
            </div>
          ) : (
            <Form style={{ fontSize: "12px", textAlign: "left" }}>
              <p style={{ fontSize: "10px", color: "grey" }}>
                Selected 3D File
              </p>
              <div
                style={{
                  background: "rgba(81, 166, 176, 0.1)",
                  padding: "10px",
                  border: "1px dashed var(--color-main)",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--color-main)",
                    margin: 0,
                  }}
                >
                  {selectedFile && selectedFile?.name}
                </p>
              </div>
              <Form.Group>
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  // accept=".stp"
                  // onChange={(e) => handleTrainFile(e)}
                />
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  style={{ fontSize: "12px" }}
                  className="mt-2 btn-theme-dark"
                  onClick={handleSubmitTrain}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PartClassification;
