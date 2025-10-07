import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiX,
  FiDownload,
  FiEye,
  FiImage,
  FiFileText,
  FiMaximize,
  FiExternalLink,
} from "react-icons/fi";
import { diagrams } from "../Data/ProcessTransformationData";
import { documents } from "../Data/DocsData";
import { FaPlay } from "react-icons/fa";
import { knowledgeItems } from "../Data/CoursesData";

export default function DiagramViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [diagram, setDiagram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch diagram by ID
  const fetchDiagramById = (diagramId) => {
    try {
      const diagram = diagrams.find((d) => d.id === parseInt(diagramId));
      if (!diagram) throw new Error("Diagram not found");
      return diagram;
    } catch (err) {
      throw new Error(`Error fetching diagram: ${err.message}`);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      if (!id) throw new Error("Diagram ID not provided");
      const d = fetchDiagramById(id);
      setDiagram(d);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleFullscreen = () => setShowFullscreen(true);
  const handleCloseFullscreen = () => setShowFullscreen(false);

  const handleDownload = () => {
    if (!diagram) return;
    const link = document.createElement("a");
    link.href = diagram.imageUrl; // fixed
    link.download = `${diagram.title}.${diagram.imageType || "png"}`; // fixed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackToHub = () =>
    navigate("/knowledge-hub/process-transformation");
  const handleBack = () => navigate(-1);

  // Loading state
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border" style={{ color: "#0d9488" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted" style={{ fontSize: "14px" }}>
            Loading diagram...
          </p>
        </div>
      </div>
    );
  }

  // Error or not found
  if (error || !diagram) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <FiImage size={64} className="mb-4" style={{ color: "#dc3545" }} />
          <h3 className="fw-semibold mb-2" style={{ fontSize: "18px" }}>
            Diagram Not Found
          </h3>
          <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
            {error || "The requested diagram could not be found."}
          </p>
          <button
            className="btn btn-primary"
            onClick={handleBackToHub}
            style={{
              backgroundColor: "#0d9488",
              borderColor: "#0d9488",
              fontSize: "12px",
            }}
          >
            <FiArrowLeft size={14} className="me-2" />
            Back to Diagrams
          </button>
        </div>
      </div>
    );
  }

  // fetchCourseDetails
  const fetchDocDetails = (refDocId) => {
    return (
      documents.find((d) => d.id === refDocId)?.title || "Reference Document"
    );
  };
  // fetchVideosDetails
  const fetchVideosDetails = (id, cid) => {
    return (
      knowledgeItems.find((d) => d.id === cid)?.lessons.find((l) => l.id === id)
        ?.title || "Reference Video"
    );
  };

  return (
    <>
      <div className="min-vh-100 text-start bg-light">
        <div className="py-3">
          <div className="container-fluid d-flex gap-2">
            <button
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
              onClick={handleBackToHub}
              style={{ fontSize: "12px", padding: "4px 8px" }}
            >
              <FiArrowLeft size={14} />
              Back to Hub
            </button>
            <button
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
              onClick={handleBack}
              style={{ fontSize: "12px", padding: "4px 8px" }}
            >
              <FiArrowLeft size={14} />
            Back to Previous
            </button>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row g-4">
            {/* Main Content */}
            <div className="col-12">
              {/* Diagram Info Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-5">
                      <img
                        src={diagram.thumbnail || "/placeholder.svg"}
                        alt={diagram.title}
                        className="img-fluid rounded"
                        style={{
                          height: "250px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-md-7">
                      <h2 className="h4 mb-3">{diagram.title}</h2>
                      <p
                        className="text-muted mb-3"
                        style={{ fontSize: "14px" }}
                      >
                        {diagram.description}
                      </p>

                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {diagram.tags.map((tag) => (
                          <span
                            key={tag}
                            className="badge"
                            style={{
                              backgroundColor: "#ccfbf1",
                              color: "#0d9488",
                              fontSize: "11px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div
                        className="row text-muted mb-3"
                        style={{ fontSize: "12px" }}
                      >
                        <div className="col-6">
                          <div className="d-flex align-items-center gap-1 mb-2">
                            <FiEye size={12} />
                            {diagram.views} views
                          </div>
                          <div>Author: {diagram.author}</div>
                        </div>
                        <div className="col-6">
                          <div>Type: {diagram.imageType || "png"}</div>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm d-flex gap-2 align-items-center border-1 "
                          onClick={handleFullscreen}
                          style={{
                            backgroundColor: "white",
                            borderColor: "#0d9488",
                            color: "#0d9488",
                          }}
                        >
                          <FiMaximize size={14} />
                          Fullscreen
                        </button>
                        <button
                          onClick={handleDownload}
                          className="btn  btn-primary d-flex align-items-center gap-2"
                          style={{
                            backgroundColor: "#0d9488",
                            borderColor: "#0d9488",
                            fontSize: "12px",
                          }}
                        >
                          <FiDownload size={14} />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-2">
                {/* Ref Videos */}
                <div className="col-md-6">
                  <div className="mt-3">
                    <div className="card border-1 shadow-sm">
                      <div className="card-header bg-light border-bottom py-2 px-3">
                        <h5
                          className="mb-0 head-theme"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          Reference Lessons (videos)
                        </h5>
                      </div>
                      <div className="card-body py-2 px-3">
                        {diagram.refLessonIds &&
                        diagram.refLessonIds.length > 0 ? (
                          diagram.refLessonIds[0].lessonIds.map((id) => (
                            <div
                              className="d-flex align-items-center justify-content-between"
                              style={{
                                borderBottom: "2px solid #e0e0e0",
                              }}
                            >
                              <div className="d-flex align-items-center py-1">
                                <div
                                  className="rounded d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: "28px",
                                    height: "28px",
                                    backgroundColor: " #e93b3b2d",
                                    border: "1px solid rgba(13, 110, 253, 0.2)",
                                  }}
                                >
                                  <FaPlay
                                    size={12}
                                    style={{ color: "#e93b3bff" }}
                                  />
                                </div>
                                <div>
                                  <div
                                    className="text-dark mb-0"
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {fetchVideosDetails(
                                      id,
                                      diagram.refLessonIds[0].courseId
                                    )}
                                  </div>
                                </div>
                              </div>
                              <button
                                className="btn btn-sm btn-theme global-font d-flex align-items-center ms-1"
                                onClick={() =>
                                  navigate(
                                    `/knowledge-hub/courses/${diagram.refLessonIds[0].courseId}/lesson/${id}`
                                  )
                                }
                              >
                                Open
                                <FiExternalLink className="ms-1" size={12} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Ref Documents */}
                <div className="col-md-6">
                  <div className="mt-3">
                    <div className="card border-1 shadow-sm">
                      <div className="card-header bg-light border-bottom py-2 px-3">
                        <h5
                          className="mb-0 head-theme"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                           Reference Documentations
                        </h5>
                      </div>
                      <div className="card-body py-2 px-3">
                        {diagram.refDocIds && diagram.refDocIds.length > 0 ? (
                          diagram.refDocIds.map((id) => (
                            <div
                              className="d-flex align-items-center justify-content-between py-1"
                              style={{
                                borderBottom: "2px solid #e0e0e0",
                              }}
                            >
                              <div className="d-flex align-items-center">
                                <div
                                  className="rounded d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: "28px",
                                    height: "28px",
                                    backgroundColor: "rgba(13, 110, 253, 0.1)",
                                    border: "1px solid rgba(13, 110, 253, 0.2)",
                                  }}
                                >
                                  <FiFileText
                                    size={12}
                                    style={{ color: "#0d6efd" }}
                                  />
                                </div>
                                <div>
                                  <div
                                    className="text-dark mb-0"
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {fetchDocDetails(id)}
                                  </div>
                                </div>
                              </div>
                              <button
                                className="btn btn-sm btn-theme global-font d-flex align-items-center ms-1"
                                onClick={() =>
                                  navigate(`/knowledge-hub/docs/view/${id}`)
                                }
                              >
                                Open
                                <FiExternalLink className="ms-1" size={12} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", zIndex: 1050 }}
        >
          <div className="w-100 h-100 position-relative">
            <div
              className="position-absolute top-0 start-0 w-100 d-flex align-items-center justify-content-between px-4 py-3"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                zIndex: 1051,
              }}
            >
              <h6
                className="mb-0 d-flex align-items-center gap-2"
                style={{ fontSize: "16px", color: "#333" }}
              >
                <FiImage size={18} />
                {diagram.title}
              </h6>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm d-flex gap-2 align-items-center border-1"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#0d9488",
                    color: "#0d9488",
                  }}
                  onClick={handleDownload}
                >
                  <FiDownload size={14} className="me-1" />
                  Download
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleCloseFullscreen}
                  style={{ fontSize: "12px" }}
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
            <div className="w-100 h-100 pt-5 d-flex align-items-center justify-content-center">
              <img
                src={diagram.imageUrl}
                alt={diagram.title}
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: "calc(100vh - 60px)",
                  maxWidth: "95%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
