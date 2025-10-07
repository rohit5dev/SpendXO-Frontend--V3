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

export default function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch document by ID
  const fetchDocumentById = (docId) => {
    try {
      const document = documents.find((d) => d.id === parseInt(docId));
      if (!document) {
        throw new Error("Document not found");
      }
      return document;
    } catch (err) {
      throw new Error(`Error fetching document: ${err.message}`);
    }
  };

  useEffect(() => {
    const loadDocument = () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error("Document ID not provided");
        }

        const document = fetchDocumentById(id);
        setDoc(document);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [id]);

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleFullscreen = () => {
    setShowFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setShowFullscreen(false);
  };

  const handleDownload = () => {
    if (!doc) return;

    // Create download link and trigger download
    const link = document.createElement("a");
    link.href = doc.fileUrl;
    link.download = `${doc.title}.${doc.fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Back Buttons
  const handleBackToHub = () => navigate("/knowledge-hub/docs");
  const handleBack = () => navigate(-1);

  // Loading state
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#0d9488" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted" style={{ fontSize: "14px" }}>
            Loading document...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center">
          <FiFileText size={64} className="mb-4" style={{ color: "#dc3545" }} />
          <h3 className="fw-semibold mb-2" style={{ fontSize: "18px" }}>
            Document Not Found
          </h3>
          <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
            {error}
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
            Back to Documents
          </button>
        </div>
      </div>
    );
  }

  // Document not found
  if (!doc) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center">
          <FiFileText size={64} className="mb-4" style={{ color: "#dc3545" }} />
          <h3 className="fw-semibold mb-2" style={{ fontSize: "18px" }}>
            Document Not Found
          </h3>
          <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
            The requested document could not be found.
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
            Back to Documents
          </button>
        </div>
      </div>
    );
  }

  // fetchDiagramDetails
  const fetchDiagramDetails = (id) => {
    return diagrams.find((d) => d.id === id)?.title || "Reference Document";
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
      <div className="text-start" style={{ backgroundColor: "#f8f9fa" }}>
        {/* Back Button */}
        <div className="py-3">
          <div className="container-fluid d-flex gap-2">
            <button
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
              style={{ fontSize: "12px", padding: "4px 8px" }}
              onClick={handleBackToHub}
            >
              <FiArrowLeft size={14} />
              Back to Hub
            </button>
            <button
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
              style={{ fontSize: "12px", padding: "4px 8px" }}
              onClick={handleBack}
            >
              <FiArrowLeft size={14} />
         Back to Previous
            </button>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row g-4">
            {/* Main Content */}
            <div className={`${showPreview ? "col-8" : "col-12"}`}>
              {/* Document Info Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={doc.thumbnail || "/placeholder.svg"}
                        alt={doc.title}
                        className="img-fluid rounded"
                        style={{
                          height: "200px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <h2 className="h4 mb-3">{doc.title}</h2>
                      <p
                        className="text-muted mb-3"
                        style={{ fontSize: "14px" }}
                      >
                        {doc.description}
                      </p>

                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {doc.tags.map((tag) => (
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
                            {doc.views} views
                          </div>
                          <div>Author: {doc.author}</div>
                        </div>
                        <div className="col-6">
                          <div className="mb-2">Size: {doc.fileSize}</div>
                          <div>Type: {doc.fileType.toUpperCase()}</div>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={handlePreview}
                          style={{
                            backgroundColor: "#0d9488",
                            borderColor: "#0d9488",
                            fontSize: "12px",
                          }}
                        >
                          <FiEye size={14} />
                          Preview
                        </button>
                        <button
                          onClick={handleDownload}
                          className="btn btn-sm global-font d-flex gap-2 align-items-center border-1"
                          style={{
                            backgroundColor: "white",
                            borderColor: "#0d9488",
                            color: "#0d9488",
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
                        {doc.refLessonIds && doc.refLessonIds.length > 0 ? (
                          doc.refLessonIds[0].lessonIds.map((id) => (
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
                                      doc.refLessonIds[0].courseId
                                    )}
                                  </div>
                                </div>
                              </div>
                              <button
                                className="btn btn-sm btn-theme global-font d-flex align-items-center ms-1"
                                onClick={() =>
                                  navigate(
                                    `/knowledge-hub/courses/${doc.refLessonIds[0].courseId}/lesson/${id}`
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
                {/* Ref Diagrams */}
                <div className="col-md-6">
                  <div className="mt-3">
                    <div className="card border-1 shadow-sm">
                      <div className="card-header bg-light border-bottom py-2 px-3">
                        <h5
                          className="mb-0 head-theme"
                          style={{ fontSize: "14px", fontWeight: "600" }}
                        >
                          Reference Diagrams
                        </h5>
                      </div>
                      <div className="card-body py-2 px-3">
                        {doc.refDiagramIds && doc.refDiagramIds.length > 0 ? (
                          doc.refDiagramIds.map((id) => (
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
                                    {fetchDiagramDetails(id)}
                                  </div>
                                </div>
                              </div>
                              <button
                                className="btn btn-sm btn-theme global-font d-flex align-items-center ms-1"
                                onClick={() =>
                                  navigate(`/knowledge-hub/process/view/${id}`)
                                }
                              >
                                Open
                                <FiExternalLink className="ms-1" size={12} />
                              </button>
                            </div>
                          ))
                        ) : (
                          <>
                            <p className="global-font text-muted">
                              No reference diagrams
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Preview Sidebar */}
            {showPreview && (
              <div className="col-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-bottom d-flex align-items-center justify-content-between py-3">
                    <h6
                      className="mb-0 d-flex align-items-center gap-2"
                      style={{ fontSize: "14px" }}
                    >
                      <FiFileText size={16} />
                      Document Preview
                    </h6>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleFullscreen}
                        style={{ fontSize: "12px" }}
                        title="Open in fullscreen"
                      >
                        <FiMaximize size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={handleClosePreview}
                        style={{ fontSize: "12px" }}
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ height: "600px", backgroundColor: "#f8f9fa" }}
                    >
                      {doc.fileType === "pdf" ? (
                        <iframe
                          src={`${doc.fileUrl}#toolbar=0`}
                          className="w-100 h-100 border-0"
                          title="Document Preview"
                        />
                      ) : (
                        <div className="text-center text-muted">
                          <FiFileText size={48} className="mb-3" />
                          <p style={{ fontSize: "14px" }}>
                            Preview not available for{" "}
                            {doc.fileType.toUpperCase()} files
                          </p>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={handleDownload}
                            style={{
                              backgroundColor: "#0d9488",
                              borderColor: "#0d9488",
                              fontSize: "12px",
                            }}
                          >
                            <FiDownload size={12} className="me-1" />
                            Download to View
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 1050,
          }}
        >
          <div className="w-100 h-100 position-relative">
            {/* Fullscreen Header */}
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
                <FiFileText size={18} />
                {doc.title}
              </h6>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm global-font d-flex gap-2 align-items-center border-1"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#0d9488",
                    color: "#0d9488",
                  }}
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

            {/* Fullscreen Content */}
            <div className="w-100 h-100 pt-5">
              {doc.fileType === "pdf" ? (
                <iframe
                  src={`${doc.fileUrl}#toolbar=0`}
                  className="w-100 h-100 border-0"
                  title="Document Fullscreen Preview"
                  style={{ marginTop: "60px", height: "calc(100vh - 60px)" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center h-100 text-white"
                  style={{ marginTop: "60px", height: "calc(100vh - 60px)" }}
                >
                  <div className="text-center">
                    <FiFileText size={64} className="mb-4" />
                    <p style={{ fontSize: "18px", marginBottom: "20px" }}>
                      Preview not available for {doc.fileType.toUpperCase()}{" "}
                      files
                    </p>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={handleDownload}
                      style={{
                        fontSize: "12px",
                        borderColor: "#0d9488",
                        color: "#0d9488",
                      }}
                    >
                      <FiDownload size={16} className="me-2" />
                      download to view
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
