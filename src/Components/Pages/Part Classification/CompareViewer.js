import React, { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LuAxis3D } from "react-icons/lu";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";

import { HiOutlineZoomIn } from "react-icons/hi";
import { HiOutlineZoomOut } from "react-icons/hi";
import { RiResetLeftFill } from "react-icons/ri";

// Custom STL loading component that preserves orientation
const STLModel = ({ url, onLoadProgress, onLoadComplete }) => {
  const [model, setModel] = useState(null);
  const { scene, camera } = useThree();

  useEffect(() => {
    const loader = new STLLoader();

    loader.load(
      url,
      (geometry) => {
        // Create mesh with the loaded geometry
        const material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          flatShading: true,
        });
        const mesh = new THREE.Mesh(geometry, material);

        // Center the model but preserve orientation
        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;

        // Calculate center
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);

        // Create a group to hold both mesh and edges
        const group = new THREE.Group();
        group.rotation.set(-1.57, 0, -1.57);
        // Add mesh to group
        mesh.position.set(-center.x, -center.y, -center.z);
        group.add(mesh);

        // Add edges with the same transformations
        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({
          color: "#565353",
          linewidth: 1,
        });
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        edges.position.copy(mesh.position);
        group.add(edges);

        // Calculate scale to fit model in a reasonable viewing area
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 4; // Target size in world units
        const scale = targetSize / maxDim;

        // Apply scale to group
        group.scale.set(scale, scale, scale);

        // Add to scene
        scene.add(group);

        // Update camera to look at the center of the model
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        setModel({
          group,
          geometry,
          material,
          edgesGeometry,
          edgesMaterial,
        });

        // Signal that loading is complete
        if (onLoadComplete) onLoadComplete();
      },
      (xhr) => {
        const progress = (xhr.loaded / xhr.total) * 100;
        console.log(progress + "% loaded");
        // Pass progress to parent component
        if (onLoadProgress) onLoadProgress(progress);
      },
      (error) => {
        console.error("Error loading STL:", error);
        // Signal error in loading
        if (onLoadProgress) onLoadProgress(-1);
      }
    );

    // Cleanup function
    return () => {
      if (model) {
        scene.remove(model.group);
        model.geometry.dispose();
        model.material.dispose();
        model.edgesGeometry.dispose();
        model.edgesMaterial.dispose();
      }
    };
  }, [url, scene, camera, onLoadProgress, onLoadComplete]);

  return null;
};

const ModelAxisHelper = ({ modelRef }) => {
  const { camera, size } = useThree();
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current) return;

    const arrowLength = 0.1; // Increased arrow size
    const headLength = 0.01;
    const headWidth = 0.005;

    // Create arrows (X, Y, Z)
    const xArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      arrowLength,
      0xff5555,
      headLength,
      headWidth
    );
    const yArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      arrowLength,
      0x55ff55,
      headLength,
      headWidth
    );
    const zArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      arrowLength,
      0x5555ff,
      headLength,
      headWidth
    );
    groupRef.current.add(xArrow, yArrow, zArrow);

    // Create labels with better visibility
    const createLabel = (text, color, offset) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128; // Larger canvas for crisper text
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.font = "bold 12px Arial"; // Larger font
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(offset);
      sprite.scale.set(0.15, 0.15, 0.15); // Larger label
      return sprite;
    };

    // Position labels slightly beyond arrow tips
    groupRef.current.add(
      createLabel("X", "#ff5555", new THREE.Vector3(arrowLength + 0.02, 0, 0))
    );
    groupRef.current.add(
      createLabel("Y", "#55ff55", new THREE.Vector3(0, arrowLength + 0.02, 0))
    );
    groupRef.current.add(
      createLabel("Z", "#5555ff", new THREE.Vector3(0, 0, arrowLength + 0.02))
    );

    return () => {
      if (groupRef.current) {
        groupRef.current.clear();
      }
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current || !modelRef.current) return;

    // Position in bottom-right (adjust values as needed)
    const right = size.width - 180;
    const bottom = size.height - 80;
    const x = (right / size.width) * 2 - 1;
    const y = -(bottom / size.height) * 2 + 1;
    const position = new THREE.Vector3(x, y, -0.5);
    position.unproject(camera);
    groupRef.current.position.copy(position);

    // Sync rotation with model
    groupRef.current.quaternion.copy(modelRef.current.quaternion);

    // Scale to ~100px
    groupRef.current.scale.set(0.2, 0.2, 0.2);
  });

  return <group ref={groupRef} />;
};

// Create a custom loading spinner component
const LoadingSpinner = ({ progress }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background: "#1c1c1c",
        color: "#fff",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: "20px", fontSize: "18px" }}>
        Loading 3D Model
      </div>
      <div
        style={{
          width: "200px",
          height: "6px",
          backgroundColor: "#333",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: "3px",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        {progress >= 0 ? `${Math.round(progress)}%` : "Error loading model"}
      </div>
    </div>
  );
};

// Individual STL viewer canvas component
const STLCanvas = ({
  url,
  controlsRef,
  modelRef,
  onLoadProgress,
  onLoadComplete,
}) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 50,
      }}
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={0.7} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
      />
      <pointLight position={[-10, -10, -10]} intensity={1} />

      {/* STL Model */}
      <mesh ref={modelRef} rotation={[-1.57, 0, -1.57]}>
        <STLModel
          url={url}
          onLoadProgress={onLoadProgress}
          onLoadComplete={onLoadComplete}
        />
      </mesh>
      {/* Helpers */}
      <gridHelper args={[10, 10]} />
      <ModelAxisHelper modelRef={modelRef} />

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableZoom
        zoomSpeed={1.2}
        minDistance={1}
        maxDistance={15}
      />
    </Canvas>
  );
};

// Component that synchronizes controls between two viewers
const DualSTLViewer = ({ url1, url2, names, height = "400px" }) => {
  const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;

  // Controls refs for both viewers
  const controlsRef1 = useRef();
  const controlsRef2 = useRef();

  // Model refs for both viewers
  const modelRef1 = useRef();
  const modelRef2 = useRef();

  // Track which viewer initiated the change
  const syncSource = useRef(null);

  // Loading states for both models
  const [loadProgress1, setLoadProgress1] = useState(0);
  const [loadProgress2, setLoadProgress2] = useState(0);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  const isSyncing = useRef(false);

  useEffect(() => {
    if (!controlsRef1.current || !controlsRef2.current) return;

    const syncViewers = (source, target) => {
      if (isSyncing.current) return;
      isSyncing.current = true;

      try {
        target.object.position.copy(source.object.position);
        target.target.copy(source.target);
        target.update();
      } finally {
        // Use setTimeout to break the synchronous update chain
        setTimeout(() => {
          isSyncing.current = false;
        }, 0);
      }
    };

    const onControl1Change = () => {
      if (!isSyncing.current && controlsRef1.current && controlsRef2.current) {
        syncViewers(controlsRef1.current, controlsRef2.current);
      }
    };

    const onControl2Change = () => {
      if (!isSyncing.current && controlsRef1.current && controlsRef2.current) {
        syncViewers(controlsRef2.current, controlsRef1.current);
      }
    };

    controlsRef1.current.addEventListener("change", onControl1Change);
    controlsRef2.current.addEventListener("change", onControl2Change);

    return () => {
      controlsRef1.current?.removeEventListener("change", onControl1Change);
      controlsRef2.current?.removeEventListener("change", onControl2Change);
    };
  }, [isLoading1, isLoading2]);

  const zoomIn = () => {
    if (controlsRef1.current) {
      controlsRef1.current.dollyIn(1.2);
      controlsRef1.current.update();
    }
  };

  const zoomOut = () => {
    if (controlsRef1.current) {
      controlsRef1.current.dollyOut(1.2);
      controlsRef1.current.update();
    }
  };

  const resetView = () => {
    if (controlsRef1.current) {
      controlsRef1.current.reset();
    }
  };

  // This function handles the different view positions
  const setViewPosition = (position) => {
    if (!controlsRef1.current) return;

    switch (position) {
      case "isometric":
        controlsRef1.current.setAzimuthalAngle(Math.PI / 4);
        controlsRef1.current.setPolarAngle(Math.PI / 4);
        break;
      case "front":
        controlsRef1.current.setAzimuthalAngle(0);
        controlsRef1.current.setPolarAngle(Math.PI / 2);
        break;
      case "back":
        controlsRef1.current.setAzimuthalAngle(Math.PI);
        controlsRef1.current.setPolarAngle(Math.PI / 2);
        break;
      case "top":
        controlsRef1.current.setAzimuthalAngle(0);
        controlsRef1.current.setPolarAngle(0);
        break;
      case "bottom":
        controlsRef1.current.setAzimuthalAngle(0);
        controlsRef1.current.setPolarAngle(Math.PI);
        break;
      case "left":
        controlsRef1.current.setAzimuthalAngle(-Math.PI / 2);
        controlsRef1.current.setPolarAngle(Math.PI / 2);
        break;
      case "right":
        controlsRef1.current.setAzimuthalAngle(Math.PI / 2);
        controlsRef1.current.setPolarAngle(Math.PI / 2);
        break;
      default:
        break;
    }
    controlsRef1.current.update();
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "0px",
        position: "relative",
      }}
    >
      {/* First STL Viewer */}
      <div style={{ width: "50%", height, position: "relative" }}>
        {isLoading1 && <LoadingSpinner progress={loadProgress1} />}
        <p
          style={{
            padding: "5px 10px",
            margin: 0,
            fontSize: "13px",
            background: "rgba(81, 166, 176, 0.6)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1000,
            color: "white",
            width: "160px",
          }}
        >
          Input - {names[0]}
        </p>
        <STLCanvas
          url={url1}
          controlsRef={controlsRef1}
          modelRef={modelRef1}
          onLoadProgress={(progress) => setLoadProgress1(progress)}
          onLoadComplete={() => setIsLoading1(false)}
        />
      </div>

      {/* Second STL Viewer */}
      <div style={{ width: "50%", height, position: "relative" }}>
        {isLoading2 && <LoadingSpinner progress={loadProgress2} />}
        <p
          style={{
            padding: "5px 10px",
            margin: 0,
            fontSize: "13px",
            background: "rgba(81, 166, 176, 0.6)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1000,
            color: "white",
            width: "160px",
          }}
        >
          Output - {names[1]}
        </p>
        <STLCanvas
          url={url2}
          controlsRef={controlsRef2}
          modelRef={modelRef2}
          onLoadProgress={(progress) => setLoadProgress2(progress)}
          onLoadComplete={() => setIsLoading2(false)}
        />
      </div>

      {/* Shared Controls Panel */}
      <div
        style={{
          position: "absolute",
          right: 5,
          top: 0,
        }}
      >
        <OverlayTrigger
          placement="top"
          overlay={renderTooltip("Isometric View")}
        >
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={() => setViewPosition("isometric")}
          >
            <LuAxis3D />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Front View")}>
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={() => setViewPosition("front")}
          >
            <FaAngleLeft />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Back View")}>
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={() => setViewPosition("back")}
          >
            <FaAngleRight />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Top View")}>
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={() => setViewPosition("top")}
          >
            <FaArrowUp />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Bottom View")}>
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={() => setViewPosition("bottom")}
          >
            <FaArrowDown />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Left View")}>
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={() => setViewPosition("left")}
          >
            <FaArrowLeft />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Right View")}>
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={() => setViewPosition("right")}
          >
            <FaArrowRight />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Zoom In")}>
          <Button
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            size="sm"
            className="btn-theme-dark"
            onClick={zoomOut}
          >
            <HiOutlineZoomIn />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Zoom Out")}>
          <Button
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            size="sm"
            className="btn-theme-dark"
            onClick={zoomIn}
          >
            <HiOutlineZoomOut />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={renderTooltip("Reset View")}>
          <Button
            size="sm"
            className="btn-theme-dark"
            style={{ fontSize: "12px", display: "block", marginTop: "13px" }}
            onClick={resetView}
          >
            <RiResetLeftFill />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export { DualSTLViewer };
