import React, { useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { MdCompareArrows } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import searching from "../../../Images/Parts/searching.gif";
import partMatch from "../../../Images/Parts/partMatch.gif";
import { Canvas } from "@react-three/fiber";
import { RiToolsFill } from "react-icons/ri";
import {
  useGLTF,
  PresentationControls,
  OrbitControls,
} from "@react-three/drei";
import { IoIosArrowDown } from "react-icons/io";
import ssim1 from "../../../Images/Parts/2587SSIM.png";
import ssim2 from "../../../Images/Parts/0688SSIM.png";
import ssim3 from "../../../Images/Parts/2287SSIM.png";
import ssim4 from "../../../Images/Parts/4388SSIM.png";
import orb1 from "../../../Images/Parts/fm_1.png";
import orb2 from "../../../Images/Parts/fm_2.png";
import orb3 from "../../../Images/Parts/fm_3.png";
import orb4 from "../../../Images/Parts/fm_4.png";
import axios from "axios";

const PartClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictName, setPredictName] = useState("");
  const [predictConf, setPredictConf] = useState(0);
  const [similar, setSimilar] = useState([]);
  const [cmp, setCmp] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [test, setTest] = useState(false);
  const [test1, setTest1] = useState(false);
  const [test2, setTest2] = useState(false);
  const [test3, setTest3] = useState(false);
  const [test4, setTest4] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);
  const [modelName, setModelName] = useState([
    "",
    { width: "", length: "", height: "" },
  ]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleUpload = async () => {
    setStep1(true);
    setLoading1(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(selectedFile);
    // request call
    try {
      const response = await axios.post(
        `https://dicv-part-classifier-cpu-backend-era6csgud7bnacab.northeurope-01.azurewebsites.net/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setLoading1(false);
        console.log(response.data);
        setPredictName(response.data.label);
        setPredictConf(response.data.confidence);
      }
    } catch (error) {
      console.log(error.message);
      setLoading1(false);
    }
  };

  function Model(props) {
    const { scene } = useGLTF("/A4003122587.glb");
    return <primitive object={scene} {...props} />;
  }

  const handleMatch = async () => {
    setStep2(true);
    setLoading2(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    // request call
    try {
      const response = await axios.post(
        `https://dicv-part-classifier-cpu-backend-era6csgud7bnacab.northeurope-01.azurewebsites.net/similar_images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        setLoading2(false);
        console.log(response.data);
        setSimilar(response.data.similar_images);
      }
    } catch (error) {
      console.log(error.message);
      setLoading2(false);
    }
    // setTimeout(() => {
    //   setLoading2(false);
    //   setTest(true);
    //   setTest1(true);
    // }, 2000);
    // setTimeout(() => {
    //   setTest1(false);
    //   setTest2(true);
    // }, 5000);
    // setTimeout(() => {
    //   setTest2(false);
    //   setTest3(true);
    // }, 8000);
    // setTimeout(() => {
    //   setTest3(false);
    //   setTest4(true);
    // }, 11000);
    // setTimeout(() => {
    //   setTest(false);
    //   setTest4(false);
    // }, 14000);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const viewer = <div></div>;

  const handleView = (index, name, org) => {
    handleShow();
    setViewIndex(index);
    setModelName([name, org]);
  };

  const [openRow, setOpenRow] = useState([]);

  const handleToggle = (index) => {
    setOpenRow((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  // const handleExpandAll = () => {
  //   if (openRow.length === data.length) {
  //     setOpenRow([]); // Collapse all if all are open
  //   } else {
  //     setOpenRow(data.map((_, index) => index)); // Open all rows
  //   }
  // };

  const handleReset = () => {
    setSimilar([]);
    setStep2(false);
  };

  //last
  return (
    <Container className="mt-4" style={{ display: "flex" }}>
      {step1 && !step2 && (
        <div
          style={{
            width: "70%",
            padding: "0px 20px",
            // background: "white",
            borderRight: "1px dashed var(--color-main)",
            // borderRadius: "5px",
            marginRight: "20px",
            height: "80vh",
          }}
        >
          {loading1 ? (
            <div>
              <img
                src={searching}
                style={{ width: "100px", marginTop: "50px" }}
              />
              <p style={{ color: "var(--color-main)", fontSize: "13px" }}>
                Searching uploaded Image for identification.
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "var(--color-main)",
                    fontWeight: 500,
                    margin: "5px",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    Part Identified :
                  </span>{" "}
                  {predictName}
                </p>
                <div style={{ fontSize: "12px", display: "flex" }}>
                  <p
                    style={{
                      background: "#d4e2e4",
                      margin: "0px",
                      padding: "5px 10px",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    Confidence : {predictConf}
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  background: "white",
                  height: "450px",
                  marginTop: "5px",
                  position: "relative",
                  border: "1px solid var(--color-main)",
                }}
              >
                <Button
                  onClick={handleMatch}
                  size="sm"
                  variant="primary"
                  className="btn-theme-dark"
                  style={{
                    fontSize: "12px",
                    margin: "0px",
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    zIndex: 1001,
                  }}
                >
                  Find Similar Parts
                </Button>

                {selectedFile && (
                  <div>
                    <img
                      style={{ width: "100%", height: "450px" }}
                      src={URL.createObjectURL(selectedFile)}
                      alt="Uploaded File"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {!step2 && (
        <div
          className={step1 ? "ms-auto" : ""}
          style={{ transition: "all 0.5s ease", width: step1 ? "30%" : "100%" }}
        >
          <p
            style={{
              color: "var(--color-main)",
              fontWeight: 500,
              margin: "5px",
              fontSize: "20px",
            }}
          >
            AI-Powered Part Classifier <br /> for Smarter Decision-Making{" "}
          </p>
          <p
            style={{
              color: "grey",
              margin: "5px",
              fontSize: "11px",
            }}
          >
            Enhance Accuracy, Save Time, and Reduce Operational Costs with AI
          </p>
          <div className="d-flex justify-content-center align-items-center">
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
                }}
              />
              <Form>
                <Form.Group>
                  <Form.Control
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    size="sm"
                    variant="primary"
                    className="btn-theme-dark"
                    style={{ fontSize: "12px" }}
                    onClick={triggerFileInput}
                  >
                    Choose File{" "}
                    <IoCloudUploadOutline
                      style={{ fontSize: "18px", marginLeft: "10px" }}
                    />
                  </Button>
                  <p style={{ fontSize: "10px", marginTop: "7px" }}>
                    Png / Jpg files allowed
                  </p>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4">
            {selectedFile && (
              <div
                style={{
                  background: "rgba(81, 166, 176, 0.2)",
                  padding: "10px",
                  fontSize: "13px",
                  width: "500px",
                  borderRadius: "5px",
                }}
                className="d-flex justify-content-between"
              >
                {selectedFile && (
                  <p style={{ margin: "0px", marginTop: "5px" }}>
                    {selectedFile.name}
                  </p>
                )}
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
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap">
            <div
              style={{
                width: "150px",
                height: "80px",
                fontSize: "12px",
                padding: "10px",
                background: "var(--color-main)",
                margin: "5px",
                color: "white",
              }}
            >
              🔍 AI-Powered Parts Similarity Detection
            </div>
            <div
              style={{
                width: "150px",
                height: "80px",
                fontSize: "12px",
                padding: "10px",
                background: "var(--color-main)",
                margin: "5px",
                color: "white",
              }}
            >
              📊 Multi-Metric Analysis for Maximum Accuracy
            </div>
            <div
              style={{
                width: "150px",
                height: "80px",
                fontSize: "12px",
                padding: "10px",
                background: "var(--color-main)",
                margin: "5px",
                color: "white",
              }}
            >
              📈 Scalable & Customizable for Your Industry
            </div>
            <div
              style={{
                width: "150px",
                height: "80px",
                fontSize: "12px",
                padding: "10px",
                background: "var(--color-main)",
                margin: "5px",
                color: "white",
              }}
            >
              🎨 Comprehensive Visual Data Insights
            </div>
          </div>
        </div>
      )}
      {step2 && (
        <div
          style={{ width: "100%" }}
          className="d-flex justify-content-center align-items-center"
        >
          {loading2 ? (
            <div>
              <img
                src={partMatch}
                style={{
                  width: "200px",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              />
              <p style={{ color: "var(--color-main)", fontSize: "13px" }}>
                Finding similar parts to the given one.
              </p>
            </div>
          ) : test ? (
            <div>
              <img
                src={partMatch}
                style={{
                  width: "200px",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              />
              {test1 ? (
                <p>Statiscal Analysis is Processing.</p>
              ) : test2 ? (
                <p>Overlap Test is Processing.</p>
              ) : test3 ? (
                <p>Feature Vector Analysis is Processing.</p>
              ) : (
                <p>Dimensional Check Analysis is Processing.</p>
              )}
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--color-main)",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  Input Part : {predictName}
                </p>
                {/* <p
                  style={{
                    fontSize: "13px",
                    color: "var(--color-main)",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  Gusset Plate -{" "}
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    A4003122587
                  </span>
                </p> */}
                {/* <div style={{ display: "flex", marginBottom: "10px" }}>
                  <p
                    style={{
                      fontSize: "11px",
                      background: "white",
                      padding: "5px 10px",
                      margin: 0,
                    }}
                  >
                    Width : 300mm
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      background: "white",
                      padding: "5px 10px",
                      margin: 0,
                      marginLeft: "10px",
                    }}
                  >
                    Height : 52.5mm
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      background: "white",
                      padding: "5px 10px",
                      margin: 0,
                      marginLeft: "10px",
                    }}
                  >
                    Length : 157mm
                  </p>
                </div> */}

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--color-main)",
                      fontWeight: 500,
                    }}
                  >
                    Matching Results -{" "}
                    <span style={{ color: "grey", fontSize: "12px" }}>
                      Found {similar.length} parts results.
                    </span>
                  </p>
                  <div>
                    <Button
                      size="sm"
                      className="btn-theme-dark"
                      style={{
                        margin: 0,
                        fontSize: "10px",
                        marginLeft: "10px",
                        padding: "5px 10px",
                        marginBottom: "10px",
                      }}
                      // onClick={handleExpandAll}
                      onClick={() => setCmp((prev) => !prev)}
                    >
                      {cmp ? "Close" : "Compare All"}
                    </Button>

                    <Button
                      size="sm"
                      className="btn-theme-dark"
                      style={{
                        margin: 0,
                        fontSize: "10px",
                        marginLeft: "10px",
                        padding: "5px 10px",
                        marginBottom: "10px",
                      }}
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              {cmp && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "10px 0",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "12px", margin: "2px" }}>
                      Input Part
                    </p>

                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Input"
                      style={{
                        width: "150px",
                        height: "120px",
                        border: "2px dashed var(--color-main)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MdCompareArrows
                      size={30}
                      style={{ color: "var(--color-main)" }}
                    />
                  </div>
                  {similar.map((x) => {
                    return (
                      <div>
                        <p style={{ fontSize: "12px", margin: "2px" }}>
                          {x.name}
                        </p>
                        <img
                          src={`data:image/png;base64,${x.image}`}
                          // src={URL.createObjectURL(selectedFile)}
                          alt="Input"
                          style={{
                            width: "150px",
                            height: "120px",
                            border: "2px dashed var(--color-main)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tablee */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(81, 166, 176, 0.3)",
                  color: "var(--color-main)",
                  fontSize: "12px",
                  fontWeight: 500,
                  padding: "5px 20px",
                }}
              >
                <p style={{ margin: 0, width: "15%" }}>Part Id</p>
                <p style={{ margin: 0, width: "20%" }}>Overall Match</p>
                <p style={{ margin: 0, width: "15%" }}>
                  Statiscal Analysis (MSE)
                </p>
                <p style={{ margin: 0, width: "15%" }}>Overlap Test (SSIM)</p>
                <p style={{ margin: 0, width: "15%" }}>
                  Feature Vector Analysis (ORB)
                </p>
                <p style={{ margin: 0, width: "20%" }}>Output</p>
              </div>
              {similar.map((row, index) => (
                <div
                  key={row.name}
                  style={{
                    marginBottom: "10px",
                    background: "#eff4f5",
                  }}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      background: "white",
                      color: "var(--color-main)",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      fontWeight: 500,
                      padding: "5px 20px",
                      border: "1px solid grey",
                    }}
                  >
                    <p style={{ margin: 0, width: "15%" }}>{row.name}</p>
                    <div
                      className="progress me-2"
                      style={{
                        margin: 0,
                        width: "20%",
                        height: "17px",
                        borderRadius: "10px",
                        background: "#becdd0",
                        color: "white",
                      }}
                    >
                      <div
                        role="progressbar"
                        style={{
                          width: `${Math.round(row.score * 100)}%`,
                          background: "var(--color-main)",
                          fontSize: "10px",
                        }}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        Overall Match : {Math.round(row.score * 100)}%
                      </div>
                    </div>

                    <p style={{ margin: 0, width: "15%" }}>
                      {row?.mse.toFixed(2)}
                    </p>
                    <p style={{ margin: 0, width: "15%" }}>
                      {row?.ssim.toFixed(2)}
                    </p>
                    <p style={{ margin: 0, width: "15%" }}>{row?.orb}</p>
                    <div style={{ margin: 0, width: "15%" }}>
                      <img
                        src={`data:image/png;base64,${row.image}`}
                        alt="Input"
                        style={{
                          width: "150px",
                          height: "100px",
                          border: "2px dashed var(--color-main)",
                        }}
                      />
                    </div>
                    {/* <Button
                      size="sm"
                      className="btn-theme-dark"
                      style={{
                        margin: 0,
                        width: "5%",
                        fontSize: "10px",
                        position: "relative",
                        zIndex: 100,
                      }}
                      onClick={() => {
                        handleView(index, row.id, row.original);
                      }}
                    >
                      View
                    </Button> */}
                    {/* <Button
                      size="sm"
                      className="btn-theme"
                      style={{
                        margin: 0,
                        width: "10%",
                        fontSize: "10px",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleToggle(index)}
                    >
                      <IoIosArrowDown />
                    </Button> */}
                  </div>
                  {openRow.includes(index) && (
                    <div
                      style={{
                        background: "rgba(81, 166, 176, 0.1)",
                        transition: "max-height 0.3s ease-in-out",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        fontWeight: 500,
                        padding: "5px 20px",
                        border: "1px dashed grey",
                      }}
                    >
                      {/* <div style={{ margin: 0, width: "15%" }}>
                        <p
                          style={{
                            marginBottom: "5px",
                            marginLeft: "5px",
                            textAlign: "left",
                          }}
                        >
                          Dimensional Similarity %
                        </p>
                        <div
                          className="progress w-100 me-2"
                          style={{
                            height: "15px",
                            borderRadius: "10px",
                            background: "white",
                          }}
                        >
                          <div
                            role="progressbar"
                            style={{
                              width: `${row.matchingPercentage.width}%`,
                              background: "var(--color-main-light)",
                              fontSize: "10px",
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Width : {row.matchingPercentage.width.toFixed(2)}%
                          </div>
                        </div>

                        <div
                          className="progress w-100 me-2 mt-2"
                          style={{
                            height: "15px",
                            borderRadius: "10px",
                            background: "white",
                          }}
                        >
                          <div
                            role="progressbar"
                            style={{
                              width: `${row.matchingPercentage.length}%`,
                              background: "var(--color-main-light)",
                              fontSize: "10px",
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Length : {row.matchingPercentage.length.toFixed(2)}%
                          </div>
                        </div>

                        <div
                          className="progress w-100 me-2 mt-2"
                          style={{
                            height: "15px",
                            borderRadius: "10px",
                            background: "white",
                          }}
                        >
                          <div
                            role="progressbar"
                            style={{
                              width: `${row.matchingPercentage.height}%`,
                              background: "var(--color-main-light)",
                              fontSize: "10px",
                            }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            Height : {row.matchingPercentage.height.toFixed(2)}%
                          </div>
                        </div>
                      </div> */}
                      <p style={{ margin: 0, width: "40%" }}>
                        <img
                          src={`data:image/png;base64,${row.image}`}
                          // src={URL.createObjectURL(selectedFile)}
                          alt="Input"
                          style={{
                            width: "200px",
                            height: "150px",
                            border: "2px dashed var(--color-main)",
                          }}
                        />
                      </p>
                      <p style={{ margin: 0, width: "40%" }}>
                        <img
                          src={`data:image/png;base64,${row.image}`}
                          alt="Output"
                          style={{
                            width: "200px",
                            height: "150px",
                            border: "2px dashed var(--color-main)",
                          }}
                        />
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {/* TABLE */}
              <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{ color: "var(--color-main)", fontSize: "14px" }}
                  >
                    {modelName[0]}
                  </Modal.Title>
                  <p
                    style={{
                      fontSize: "12px",
                      margin: 0,
                      padding: "5px 10px",
                      background: "#d4e2e4",
                      marginLeft: "20px",
                    }}
                  >
                    Width : {modelName[1].width}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      margin: 0,
                      padding: "5px 10px",
                      background: "#d4e2e4",
                      marginLeft: "5px",
                    }}
                  >
                    Length : {modelName[1].length}mm
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      margin: 0,
                      padding: "5px 10px",
                      background: "#d4e2e4",
                      marginLeft: "5px",
                    }}
                  >
                    Height : {modelName[1].height}mm
                  </p>
                </Modal.Header>
                <Modal.Body>
                  {show && (
                    <div>
                      <p style={{ marginBottom: "4px", fontSize: "11px" }}>
                        The left section represents the input part, while the
                        right section displays the corresponding similar part.
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "400px",
                            position: "relative",
                          }}
                        >
                          {viewer}
                        </div>
                      </div>
                    </div>
                  )}
                </Modal.Body>
              </Modal>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default PartClassifier;
