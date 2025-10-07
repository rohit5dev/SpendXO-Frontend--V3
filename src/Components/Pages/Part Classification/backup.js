import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  Tab,
  Tabs,
  InputGroup,
  FormControl,
  Modal,
  Button,
  ListGroup,
  Form,
  Dropdown,
} from "react-bootstrap";

import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls } from "@react-three/drei";

import { IoIosSearch } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { MdOutlineRestartAlt } from "react-icons/md";

// ag grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const PartClassification = () => {
  const output = [
    {
      id: "A4003122587",
      match: 0.94,
      image: "https://dummyimage.com/150x50/000/fff&text=Bracket+A",
    },
    {
      id: "A4003120688",
      match: 0.86,
      image: "https://dummyimage.com/180x60/000/fff&text=Bracket+B",
    },
    {
      id: "A4003122287",
      match: 0.83,
      image: "https://dummyimage.com/50x50/000/fff&text=Hex+Nut+M8",
    },
    {
      id: "A4003124388",
      match: 0.74,
      image: "https://dummyimage.com/50x50/000/fff&text=Hex+Nut+M8",
    },
  ];
  const [result, setResult] = useState(false);
  const [activePart, setActivePart] = useState([]);
  const [partOutput, setPartOutput] = useState([]);
  const [partData, setPartData] = useState([
    {
      id: 101,
      name: "Bracket Type A",
      length: "150mm",
      height: "50mm",
      thickness: "5mm",
      category: "Structural",
      subcategory: "Support",
      parent_name: "Main Frame",
      material: "Steel",
      weight: "0.75kg",
      image: "https://dummyimage.com/150x50/000/fff&text=Bracket+A",
    },
    {
      id: 102,
      name: "Bracket Type B",
      length: "180mm",
      height: "60mm",
      thickness: "6mm",
      category: "Structural",
      subcategory: "Mounting",
      parent_name: "Side Panel",
      material: "Aluminum",
      weight: "0.80kg",
      image: "https://dummyimage.com/180x60/000/fff&text=Bracket+B",
    },
    {
      id: 103,
      name: "Hex Nut M8",
      length: "10mm",
      height: "10mm",
      thickness: "8mm",
      category: "Fasteners",
      subcategory: "Hex Nut",
      parent_name: "Bolt Assembly",
      material: "Stainless Steel",
      weight: "0.05kg",
      image: "https://dummyimage.com/50x50/000/fff&text=Hex+Nut+M8",
    },
    {
      id: 104,
      name: "Hex Nut M10",
      length: "12mm",
      height: "12mm",
      thickness: "10mm",
      category: "Fasteners",
      subcategory: "Hex Nut",
      parent_name: "Bolt Assembly",
      material: "Carbon Steel",
      weight: "0.06kg",
      image: "https://dummyimage.com/50x50/000/fff&text=Hex+Nut+M10",
    },
    {
      id: 105,
      name: "Hex Bolt M8",
      length: "50mm",
      height: "N/A",
      thickness: "8mm",
      category: "Fasteners",
      subcategory: "Hex Bolt",
      parent_name: "Bolt Assembly",
      material: "Carbon Steel",
      weight: "0.15kg",
      image: "https://dummyimage.com/50x150/000/fff&text=Hex+Bolt+M8",
    },
    {
      id: 106,
      name: "Hex Bolt M10",
      length: "60mm",
      height: "N/A",
      thickness: "10mm",
      category: "Fasteners",
      subcategory: "Hex Bolt",
      parent_name: "Bolt Assembly",
      material: "Galvanized Steel",
      weight: "0.20kg",
      image: "https://dummyimage.com/50x160/000/fff&text=Hex+Bolt+M10",
    },
    {
      id: 107,
      name: "Plain Washer M8",
      length: "15mm",
      height: "N/A",
      thickness: "2mm",
      category: "Fasteners",
      subcategory: "Plain Washer",
      parent_name: "Bolt Assembly",
      material: "Galvanized Steel",
      weight: "0.02kg",
      image: "https://dummyimage.com/50x50/000/fff&text=Washer+M8",
    },
    {
      id: 108,
      name: "I-Beam 2000mm",
      length: "2000mm",
      height: "150mm",
      thickness: "10mm",
      category: "Structural",
      subcategory: "I-Beam",
      parent_name: "Main Structure",
      material: "Mild Steel",
      weight: "20kg",
      image: "https://dummyimage.com/200x150/000/fff&text=I-Beam",
    },
  ]);

  const [partColumns, setPartColumns] = useState([
    { field: "id", headerName: "Part Id", width: "100px" },
    { field: "name", headerName: "Name", width: "150px" },
    { field: "length", headerName: "Length", width: "100px" },
    { field: "height", headerName: "Height", width: "100px" },
    { field: "thickness", headerName: "Thickness", width: "150px" },
    { field: "category", headerName: "Category", width: "150px" },
    { field: "subcategory", headerName: "Subcategory", width: "150px" },
    { field: "parent_name", headerName: "Parent Name", width: "150px" },
    { field: "material", headerName: "Material", width: "150px" },
    { field: "weight", headerName: "Weight", width: "100px" },
    {
      field: "image",
      width: 150, // Width should be a number
      pinned: "right",
      headerName: "Image",
      cellRenderer: (params) => {
        return (
          <button
            style={{
              padding: "5px 10px",
              fontSize: "12px",
              cursor: "pointer",
              backgroundColor: "var(--color-main)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={() => {
              if (params?.data) {
                handlePartModal(params?.data);
              }
            }}
          >
            View
          </button>
        );
      },
    },
  ]);

  //modal handle
  const handlePartModal = (data) => {
    setActivePart(data);
    handleShow();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //start

  //filters
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  const [activeTab, setActiveTab] = useState("partTable");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    const cate = new Set(),
      subCate = new Set(),
      mt = new Set();

    // Convert values to numbers, removing non-numeric characters
    const parseNum = (val) => {
      if (!val) return null;
      const num = parseFloat(val.toString().replace(/[^\d.-]/g, "")); // Remove non-numeric characters
      return isNaN(num) ? null : num;
    };

    const isWithinRange = (itemValue, filterValue) => {
      if (!filterValue) return true;
      const numValue = parseNum(filterValue);
      const itemNum = parseNum(itemValue);
      return (
        numValue !== null &&
        itemNum !== null &&
        Math.abs(itemNum - numValue) <= numValue * 0.01
      );
    };

    let filtered = partData.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesFilters =
        (!category || item.category === category) &&
        (!subCategory || item.subcategory === subCategory) &&
        (!material || item.material === material) &&
        isWithinRange(item.length, width) &&
        isWithinRange(item.height, height) &&
        isWithinRange(item.thickness, thickness);

      return matchesSearch && matchesFilters;
    });

    // **Update filter options dynamically**
    filtered.forEach((item) => {
      if (!category || item.category === category) cate.add(item.category);
      if (!subCategory || item.subcategory === subCategory)
        subCate.add(item.subcategory);
      if (!material || item.material === material) mt.add(item.material);
    });

    setCategoryList([...cate]);
    setSubCategoryList([...subCate]);
    setMaterialList([...mt]);

    return filtered;
  }, [
    searchQuery,
    partData,
    category,
    subCategory,
    material,
    width,
    height,
    thickness,
  ]);

  const resetFilters = () => {
    setCategory("");
    setSubCategory("");
    setMaterial("");
    setWidth("");
    setHeight("");
    setThickness("");
  };

  //ag grid
  const [rowFont, setRowFont] = useState(11);
  const [rowHeight, setRowHeight] = useState(24);

  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState(partColumns);
  // Default column settings
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      headerClass: "grid-style",
      height: "250px",
      cellStyle: {
        fontSize: rowFont,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      },
    }),
    [rowFont]
  );

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Adjust row height and font size
  const updateRowSize = (size) => {
    setRowHeight(size);
    gridRef.current.api.forEachNode((rowNode) => {
      rowNode.setRowHeight(size);
    });

    let fontSize;
    if (size === 24) {
      fontSize = "11px";
    } else if (size === 30) {
      fontSize = "13px";
    } else if (size === 35) {
      fontSize = "15px";
    }
    setRowFont(fontSize);

    const updatedColumnDefs = columnDefs.map((colDef) => ({
      ...colDef,
      cellStyle: { fontSize },
    }));
    setColumnDefs(updatedColumnDefs);

    const headerHeight = size + 10;
    const headerElements = document.querySelectorAll(".ag-header");
    headerElements.forEach((header) => {
      header.style.height = `${headerHeight}px`;
    });

    gridRef.current.api.onRowHeightChanged();
    gridRef.current.api.refreshCells();
  };

  const fileInputRef = useRef(null); // Create a ref for the file input field

  const [file, setFile] = useState(null);
  const [widthForm, setWidthForm] = useState("");
  const [heightForm, setHeightForm] = useState("");
  const [thicknessForm, setThicknessForm] = useState("");
  const [weightForm, setWeightForm] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError("");
      } else {
        setFile(null);
        setError("Invalid file format. Only PDF and images are allowed.");
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a valid file.");
      return;
    }
    console.log("File", file);
    console.log("MetaData", widthForm, heightForm, thicknessForm, weightForm);
    setResult(true);
    setPartOutput(output);
    handleResetForm();
  };

  const handleResetForm = () => {
    setWidthForm("");
    setHeightForm("");
    setThicknessForm("");
    setWeightForm("");
    setFile(null);
    fileInputRef.current.value = "";
  };

  const handleResetOutput = () => {
    setResult(false);
    setPartOutput([]);
  };

  //output table
  const gridRef2 = useRef(null);
  const [columnDefs2, setColumnDefs2] = useState([
    { field: "id", headerName: "Part Id", width: "100px" },
    {
      field: "match",
      headerName: "Match",
      width: "150px",
      pinned: "right",
      cellRenderer: (params) => {
        return (
          <p
            style={{
              margin: "0px",
              color: "black",
              fontWeight: 500,
              background:
                params?.data?.match > 59
                  ? "#8cbf9e"
                  : params?.data?.match <= 30
                  ? "#f97061"
                  : "#ffc857",
              padding: "10px",
              width: `${params?.data?.match}%`,
              borderRadius: "5px",
            }}
          >
            {params?.data.match}%
          </p>
        );
      },
    },
    {
      field: "image",
      width: 150, // Width should be a number
      pinned: "right",
      headerName: "Image",
      cellRenderer: (params) => {
        return (
          <button
            style={{
              padding: "5px 10px",
              fontSize: "12px",
              cursor: "pointer",
              backgroundColor: "var(--color-main)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={() => {
              if (params?.data) {
                handlePartModal(params?.data);
              }
            }}
          >
            View
          </button>
        );
      },
    },
  ]);
  // Default column settings
  const defaultColDef2 = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      headerClass: "grid-style",
      height: "250px",
      cellStyle: {
        fontSize: rowFont,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
      },
    }),
    [rowFont]
  );

  const cellClickedListener2 = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  //export
  const handleExport = () => {
    gridRef.current.api.exportDataAsExcel();
  };

  function Model(props) {
    const { scene } = useGLTF("/A4003120026.glb");

    return <primitive object={scene} {...props} />;
  }

  //last
  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        id="justify-tab-example"
        justify
        className="action-tabs"
      >
        <Tab eventKey="partTable" title="Parts Bucktization">
          {/* SEARCH INPUT */}
          <InputGroup className="mb-1 mt-1" style={{ width: "400px" }}>
            <FormControl
              type="text"
              placeholder="Search Parts"
              value={searchQuery}
              style={{ fontSize: "13px" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroup.Text>
              <IoIosSearch />
            </InputGroup.Text>
          </InputGroup>

          {/* FILTERS */}
          <div
            className="d-flex"
            style={{ gap: "16px", alignItems: "flex-end" }}
          >
            {[
              {
                label: "Category",
                setValue: setCategory,
                value: category,
                options: categoryList || [],
                select: true,
              },
              {
                label: "Sub Category",
                setValue: setSubCategory,
                value: subCategory,
                options: subCategoryList || [],
                select: true,
              },
              {
                label: "Material",
                setValue: setMaterial,
                value: material,
                options: materialList || [],
                select: true,
              },
              {
                label: "Length",
                setValue: setWidth,
                value: width,
                select: false,
              },
              {
                label: "Height",
                setValue: setHeight,
                value: height,
                select: false,
              },
              {
                label: "Thickness",
                setValue: setThickness,
                value: thickness,
                select: false,
              },
            ].map(({ label, value, setValue, options, select }, index) => (
              <Form.Group
                key={index}
                className="global-filter-input"
                style={{ gap: "8px" }}
              >
                <Form.Label className="global-filter-label">{label}</Form.Label>
                {select ? (
                  <Form.Select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ fontSize: "11px" }}
                  >
                    <option value="">All</option>
                    {options?.map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  <div>
                    <FormControl
                      type="text"
                      size="sm"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                )}
              </Form.Group>
            ))}
          </div>

          {/* OPTIONS */}
          <div className="d-flex mt-2">
            {/* Reset Button */}
            <Button
              className="btn-theme"
              onClick={resetFilters}
              size="sm"
              style={{ fontSize: "10px", margin: "2px 5px" }}
            >
              Reset
              <MdOutlineRestartAlt
                style={{
                  fontSize: "14px",
                  marginLeft: "5px",
                  paddingBottom: "1px",
                }}
              />
            </Button>
            <Dropdown>
              <Dropdown.Toggle
                style={{ fontSize: "10px", margin: "2px 5px" }}
                size="sm"
                id="dropdown-basic"
                className="btn-theme"
              >
                Density
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  style={{ fontSize: "10px" }}
                  onClick={() => {
                    updateRowSize(24);
                  }}
                >
                  Small
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontSize: "10px" }}
                  onClick={() => {
                    updateRowSize(30);
                  }}
                >
                  Medium
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontSize: "10px" }}
                  onClick={() => {
                    updateRowSize(35);
                  }}
                >
                  Large
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              className="btn-theme"
              onClick={handleExport}
              size="sm"
              style={{ fontSize: "10px", margin: "2px 5px" }}
            >
              Export
              <CiExport
                style={{
                  fontSize: "15px",
                  marginLeft: "5px",
                  paddingBottom: "3px",
                }}
              />
            </Button>
          </div>

          {/* PART DATA TABLE */}
          <div
            className="ag-theme-alpine global-ag-table"
            style={{
              fontSize: rowFont,
            }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={filteredData}
              rowHeight={rowHeight}
              headerHeight={30}
              pagination={true}
              paginationPageSize={1000}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onCellClicked={cellClickedListener}
            />
          </div>

          {/* PART MODAL */}
          <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title
                style={{ color: "var(--color-main)", fontSize: "18px" }}
              >
                {activePart?.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {show && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "500px",
                      position: "relative",
                    }}
                  >
                    <Canvas
                      dpr={[1, 2]}
                      shadows
                      camera={{ fov: 50, position: [0, 0, 5] }}
                      style={{ position: "absolute" }}
                    >
                      <color attach="background" args={["#cbd6e7"]} />

                      {/* Add a shadowed plane for better visibility */}
                      <mesh
                        receiveShadow
                        position={[0, -1, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <planeGeometry args={[10, 10]} />
                        <shadowMaterial opacity={0.5} />
                      </mesh>

                      {/* Lights */}
                      <ambientLight intensity={0.5} />
                      <directionalLight
                        position={[5, 5, 5]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                      />

                      {/* Model with shadows */}
                      <PresentationControls
                        speed={1.5}
                        global
                        zoom={0.5}
                        polar={[-0.1, Math.PI / 4]}
                      >
                        <Model scale={0.005} position={[0, -0.5, 0]} />
                      </PresentationControls>
                    </Canvas>
                  </div>
                  <ListGroup
                    style={{
                      width: "30%",
                      marginLeft: "10px",
                    }}
                  >
                    <p style={{ fontWeight: 500, color: "var(--color-main)" }}>
                      Specifications
                    </p>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Parent :
                      </span>
                      {activePart?.parent_name}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Category :
                      </span>
                      {activePart?.category}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Subcategory :
                      </span>
                      {activePart?.subcategory}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Length :
                      </span>
                      {activePart?.length}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Height :
                      </span>
                      {activePart?.height}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Thickness :
                      </span>
                      {activePart?.thickness}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Weight :
                      </span>
                      {activePart?.weight}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        background: "var(--color-main)",
                        color: "white",
                      }}
                    >
                      <span style={{ width: "150px", marginRight: "10px" }}>
                        Material :
                      </span>
                      {activePart?.material}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </Tab>
        <Tab
          eventKey="partMatch"
          title="Parts Classification"
          style={{ padding: "5px" }}
        >
          {result && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "var(--color-main)",
                  margin: "10px 0px",
                }}
              >
                {/* {file?.name} */}
                Matching Results
              </p>
              <Button
                style={{
                  marginLeft: "20px",
                  fontSize: "12px",
                }}
                size="sm"
                className="btn-theme-dark"
                onClick={handleResetOutput}
              >
                Reset
              </Button>
            </div>
          )}
          {/* OUTPUT TABLE */}
          {result ? (
            <div
              className="ag-theme-alpine global-ag-table"
              style={{
                fontSize: rowFont,
              }}
            >
              <AgGridReact
                ref={gridRef2}
                rowData={partOutput}
                rowHeight={rowHeight}
                headerHeight={30}
                pagination={true}
                paginationPageSize={1000}
                columnDefs={columnDefs2}
                defaultColDef={defaultColDef2}
                onCellClicked={cellClickedListener2}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow effect
                  width: "350px", // Set a fixed width
                  textAlign: "center",
                }}
              >
                <p style={{ color: "var(--color-main)", fontWeight: 500 }}>
                  Match Parts 3D Models
                </p>
                <Form
                  style={{
                    textAlign: "left",
                  }}
                >
                  <Form.Group>
                    <Form.Label
                      style={{ color: "var(--color-main)", fontSize: "12px" }}
                    >
                      Select a file (PDF or Image)
                    </Form.Label>
                    <Form.Control
                      ref={fileInputRef} // Attach ref to the file input
                      type="file"
                      accept=".pdf, .jpg, .jpeg, .png, .gif, .webp"
                      onChange={handleFileChange}
                    />
                    {error && (
                      <p
                        className="text-danger mt-2"
                        style={{ fontSize: "11px", margin: "2px" }}
                      >
                        {error}
                      </p>
                    )}
                  </Form.Group>
                  {/* Width Input */}
                  <Form.Group>
                    <Form.Label
                      style={{
                        color: "var(--color-main)",
                        fontSize: "12px",
                        margin: "0px",
                        marginTop: "15px",
                      }}
                    >
                      Width (mm)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={widthForm}
                      onChange={(e) => setWidthForm(e.target.value)}
                      placeholder="Enter width"
                      size="sm"
                    />
                  </Form.Group>

                  {/* Height Input */}
                  <Form.Group>
                    <Form.Label
                      style={{
                        color: "var(--color-main)",
                        fontSize: "12px",
                        margin: "0px",
                        marginTop: "15px",
                      }}
                    >
                      Height (mm)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={heightForm}
                      onChange={(e) => setHeightForm(e.target.value)}
                      placeholder="Enter height"
                    />
                  </Form.Group>

                  {/* Thickness Input */}
                  <Form.Group>
                    <Form.Label
                      style={{
                        color: "var(--color-main)",
                        fontSize: "12px",
                        margin: "0px",
                        marginTop: "15px",
                      }}
                    >
                      Thickness (mm)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={thicknessForm}
                      onChange={(e) => setThicknessForm(e.target.value)}
                      placeholder="Enter thickness"
                    />
                  </Form.Group>

                  {/* Weight Input */}
                  <Form.Group>
                    <Form.Label
                      style={{
                        color: "var(--color-main)",
                        fontSize: "12px",
                        margin: "0px",
                        marginTop: "15px",
                      }}
                    >
                      Weight (kg)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={weightForm}
                      onChange={(e) => setWeightForm(e.target.value)}
                      placeholder="Enter weight"
                    />
                  </Form.Group>
                </Form>
                <Button
                  variant="primary"
                  className="btn-theme-dark mt-3"
                  size="sm"
                  style={{
                    fontSize: "13px",
                    padding: "5px 20px",
                  }}
                  onClick={handleUpload}
                >
                  Match
                </Button>
                <Button
                  variant="primary"
                  className="btn-theme-dark mt-3"
                  size="sm"
                  style={{
                    fontSize: "13px",
                    padding: "5px 20px",
                    marginLeft: "10px",
                  }}
                  onClick={handleResetForm}
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default PartClassification;
