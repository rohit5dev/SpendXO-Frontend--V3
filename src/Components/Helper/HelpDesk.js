import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { IoIosClose } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import apiUrls from "../../Config/apiUrls";
import { Button, Form } from "react-bootstrap";
import { MdOutlineSupportAgent, MdClose } from "react-icons/md";
import axios from "axios";
import { requestHeader } from "./Constants/constant";
import Loading from "./Loading";
import { toast } from "react-toastify";
import toastMessages from "./Constants/toastMessages";
import "./css/HelpDesk.css";

const HelpDeskPopUp = ({top,bottom,right,position}) => {
  // Location
  let location = useLocation();
  let path = location.pathname.split("/")[1].split("-").join(" ");
  path = path.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
  const pList = [
    "P1: Need support within 1 hour",
    "P2: Need support by EOD today",
    "P3: Need support within a week",
    "P4: No immediate deadline",
  ];
  //form states
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Renamed from comment
  const [priority, setPriority] = useState(pList[0]);
  const [section, setSection] = useState("");

  // Error states
  const [titleError, setTitleError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleErrorText, setTitleErrorText] = useState("");
  const [priorityErrorText, setPriorityErrorText] = useState("");
  const [descriptionErrorText, setDescriptionErrorText] = useState("");

  const [popupVisible, setPopupVisible] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCoords, setStartCoords] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);
  const selectionRef = useRef(null);
  const greyBoxRef = useRef(null); // Reference to grey box element
  const iconButtonRef = useRef(null); // Reference to icon button element
  const fileInputRef = useRef(null); // Reference to file input
  const [snapshotCount, setSnapshotCount] = useState(1);
  const [snapshot, setSnapshot] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const togglePopup = useCallback(() => {
    setPopupVisible((prev) => !prev);
  }, []);

  const handleCaptureClick = () => {
    document.body.style.cursor = "crosshair"; // Change cursor on Capture button click
    setOverlayVisible(true);
  };

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.button !== 0) return; // Only allow left mouse button

      if (document.body.style.cursor === "crosshair") {
        const { clientX: x, clientY: y } = event;
        setStartCoords({ x, y });
        setIsSelecting(true);
        document.body.style.userSelect = "none"; // Prevent text selection

        // Add selection layer
        if (selectionRef.current) {
          selectionRef.current.style.display = "block";
        }
      }
    };

    const handleMouseMove = (event) => {
      if (!isSelecting || !startCoords) return;

      const { clientX: x, clientY: y } = event;
      setCurrentRect({
        x: Math.min(startCoords.x, x),
        y: Math.min(startCoords.y, y),
        width: Math.abs(x - startCoords.x),
        height: Math.abs(y - startCoords.y),
      });
    };

    const handleMouseUp = () => {
      if (startCoords && currentRect) {
        // Log coordinates
        console.log("Selected area coordinates:", currentRect);

        // Pass coordinates to the snapshot function
        takeSnapshot(currentRect);

        // Reset selection
        setIsSelecting(false);
        setStartCoords(null);
        setCurrentRect(null);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto"; // Re-enable text selection
        setOverlayVisible(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting, startCoords, currentRect]);

  const takeSnapshot = async (rect) => {
    setOverlayVisible(false);
    const greyBoxElement = greyBoxRef.current;
    const iconButtonElement = iconButtonRef.current;
    const selectionLayer = selectionRef.current;
    const greyFilterElement = document.getElementById("greyFilter");

    if (greyBoxElement) {
      greyBoxElement.style.visibility = "hidden"; // Hide elements you don't want in the snapshot
    }
    if (iconButtonElement) {
      iconButtonElement.style.visibility = "hidden";
    }
    if (selectionLayer) {
      selectionLayer.style.display = "none"; // Hide selection layer
    }
    if (greyFilterElement) {
      greyFilterElement.style.display = "none"; // Hide the grey filter layer
    }

    try {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      // Take a snapshot of the selected area
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        x: rect.x + scrollX,
        y: rect.y + scrollY,
        width: rect.width,
        height: rect.height,
        scrollX: scrollX,
        scrollY: scrollY,
      });

      const imgData = canvas.toDataURL("image/png");
      const blob = await (await fetch(imgData)).blob();
      const fileName = `snapshot${snapshotCount}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // Add the new snapshot to the state
      setSnapshot((prevSnapshots) => [...prevSnapshots, file]);

      // Download the snapshot
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      console.log(file, "taken snapshot"); // Log the file object to the console

      setSnapshotCount(snapshotCount + 1); // Increment the count for the next snapshot
    } catch (error) {
      console.error("Error taking snapshot:", error);
    } finally {
      if (greyBoxElement) {
        greyBoxElement.style.visibility = "visible"; // Restore element visibility
      }
      if (iconButtonElement) {
        iconButtonElement.style.visibility = "visible";
      }
      if (selectionLayer) {
        selectionLayer.style.display = "block"; // Restore selection layer
      }
      if (greyFilterElement) {
        greyFilterElement.style.display = "block"; // Restore the grey filter layer
      }
    }
  };

  const handleRemoveImage = (index) => {
    setSnapshot((prevSnapshot) => {
      const updatedSnapshot = prevSnapshot.filter((_, i) => i !== index);
      console.log("Remaining snapshots:", updatedSnapshot);
      return updatedSnapshot;
    });
  };

  const handleButtonClick = () => {
    // Trigger file input click event
    fileInputRef.current.click();
  };

  const handleHelpDesk = async () => {
    let isValid = true;
    if (!title) {
      setTitleError(true);
      setTitleErrorText("Title is required");
      isValid = false;
    } else {
      setTitleError(false);
      setTitleErrorText("");
    }

    if (!description) {
      setDescriptionError(true);
      setDescriptionErrorText("Description is required");
      isValid = false;
    } else {
      setDescriptionError(false);
      setDescriptionErrorText("");
    }

    if (!priority) {
      setPriorityError(true);
      setPriorityErrorText("Priority is required");
      isValid = false;
    } else {
      setPriorityError(false);
      setPriorityErrorText("");
    }

    if (isValid) {
      setLoading(true);
      await axios
        .post(
          `${apiUrls.urlPrefix}/help/add-new-query`,
          {
            title: title,
            comment: description,
            date: new Date().toISOString().split("T")[0],
            priority: priority,
            section: path,
            file: snapshot,
          },
          requestHeader.mutipart
        )
        .then((res) => {
          setLoading(false);
          let data = res.data;
          console.log(data);
          toast.success(toastMessages.helpQuerySubmit);

          // auto close popup window
          togglePopup();
          // reset fields
          setTitle("");
          setPriority("");
          setDescription("");
          setTitleError(false);
          setPriorityError(false);
          setDescriptionError(false);
          setTitleErrorText("");
          setPriorityErrorText("");
          setDescriptionErrorText("");
          setSnapshot([]);
          fileInputRef.current.value = "";
          setSnapshotCount(1);
        })
        .catch((error) => {
          setLoading(false);
          // auto close popup window
          togglePopup();
          console.log(error.message);
          //   toast.error("Failed To Send Help Request", {
          //     position: "top-center",
          //   });
        });
    }
  };

  const handleFileChange = (e) => {
    // Convert the FileList to an array and merge with the existing snapshot
    const newFiles = Array.from(e.target.files);
    setSnapshot((prevSnapshot) => [...prevSnapshot, ...newFiles]);
  };

  useEffect(() => {
    // Reset the form when the URL changes
    setTitle("");
    setPriority(pList[0]);
    setDescription("");
    setTitleError(false);
    setPriorityError(false);
    setDescriptionError(false);
    setTitleErrorText("");
    setPriorityErrorText("");
    setDescriptionErrorText("");
    setSnapshot([]);
    fileInputRef.current.value = "";
    setSnapshotCount(1);
  }, [location.pathname]);

  //START RENDER
  return (
    <div>
      {overlayVisible && (
        <div
          id="greyFilter"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(13, 27, 41, 0.5)", // Grey filter
            zIndex: 9999,
          }}
        />
      )}
      {isSelecting && currentRect && (
        <div
          ref={selectionRef}
          style={{
            position: "fixed",
            top: currentRect.y,
            left: currentRect.x,
            width: currentRect.width,
            height: currentRect.height,
            border: "1px solid rgba(0, 0, 255, 0.5)",
            backgroundColor: "rgba(255,255,255, 0.3)",
            zIndex: 10000,
            pointerEvents: "none",
            display: "block", // Default display state is block
          }}
        />
      )}
      {/* POPUP BOX */}
      <div
        ref={greyBoxRef}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "60px",
          background: "white",
          boxShadow: "5px 5px 10px rgba(0,0,0,0.2)",
          width: popupVisible ? "300px" : "0px",
          zIndex: 10000,
          transform: popupVisible ? "scale(1)" : "scale(0)",
          transition: "transform 0.3s ease-out",
          overflow: "hidden",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: popupVisible ? "10px" : "0px", // Adjust padding only when visible
          visibility: popupVisible ? "visible" : "hidden", // Hide completely when not visible
        }}
      >
        {loading && <Loading />}
        <div
          style={{
            display: "flex",
            marginBottom: "5px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button className="help_desk_btn" onClick={handleCaptureClick}>
            <IoCameraOutline size={"16px"} style={{ marginRight: "5px" }} />
            Capture
          </button>

          <button className="help_desk_btn" onClick={handleButtonClick}>
            <MdOutlineAddPhotoAlternate
              size={"16px"}
              style={{ marginRight: "5px" }}
            />
            Select File
          </button>
        </div>

        <div style={{ width: "100%", marginTop: "10px" }}>
          {snapshot.map((file, index) => {
            console.log(file); // Log the file object
            const objectURL = URL.createObjectURL(file);
            return (
              <div
                key={index}
                style={{
                  margin: "5px",
                  marginTop: "0px",
                  border: "1px solid var(--color-main)",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <IoIosClose
                  style={{
                    color: "white",
                    background: "red",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveImage(index)}
                />
                <img
                  width="45px"
                  height="45px"
                  src={objectURL}
                  alt={`Snapshot ${index}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(objectURL, "_blank")}
                />
              </div>
            );
          })}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          style={{
            display: "block",
            paddingLeft: "20px",
            marginBottom: "15px",
            display: "none",
          }} // Display the file input
          onChange={handleFileChange} // Handle file selection
          multiple // Allow multiple file selection
        />
        <Form.Control
          placeholder="Title"
          size="sm"
          value={title}
          isInvalid={titleError}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{
            width: "100%",
            height: "30px",
            marginBottom: "15px",
            fontSize: "12px",
          }}
        />

        <Form.Control
          placeholder="Description"
          value={description}
          isInvalid={descriptionError}
          size="sm"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          style={{
            width: "100%",
            height: "30px",
            marginBottom: "15px",
            fontSize: "12px",
          }}
        />

        <Form.Select
          value={priority}
          onChange={(event) => {
            setPriority(event.target.value);
          }}
          style={{ fontSize: "12px", marginBottom: "15px" }}
        >
          {pList.map((x) => {
            return <option value={x}>{x}</option>;
          })}
        </Form.Select>

        <Form.Control
          placeholder="Description"
          value={path}
          disabled
          style={{
            width: "100%",
            height: "30px",
            marginBottom: "15px",
            fontSize: "12px",
          }}
        />

        <Button
          className="btn-blue"
          onClick={handleHelpDesk}
          size="small"
          className="btn-theme"
          style={{ fontSize: "11px" }}
        >
          Submit
        </Button>
      </div>
      <Button
        ref={iconButtonRef}
        onClick={togglePopup}
        style={{
          position: position,
          top:top,
          bottom: bottom,
          right: right,
          borderColor: " var(--color-main)",
          backgroundColor: "var(--color-main)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          zIndex: 1300,
          borderRadius: "50%",
          width: "40px", // Set button to 40px width
          height: "40px", // Set button to 40px height
          display: "flex", // Flexbox to center the icon
          alignItems: "center", // Vertical centering
          justifyContent: "center", // Horizontal centering
          padding: 0, // Remove extra padding
          transition: "transform 0.3s ease-out",
          transform: popupVisible ? "rotate(135deg)" : "rotate(0deg)",
        }}
      >
        {popupVisible ? (
          <MdClose
            style={{
              color: "white",
              fontSize: "20px", // Icon size
              transform: "rotate(45deg)", // Rotate icon
              transition: "transform 0.3s ease-out", // Smooth rotation
            }}
          />
        ) : (
          <MdOutlineSupportAgent
            style={{
              color: "white",
              fontSize: "20px", // Icon size
              transition: "transform 0.3s ease-out", // Smooth transition for consistency
            }}
          />
        )}
      </Button>
    </div>
  );
};

export default HelpDeskPopUp;
