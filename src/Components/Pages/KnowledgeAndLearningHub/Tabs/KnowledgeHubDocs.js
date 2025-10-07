import { useState, useMemo } from "react";
import { FiSearch, FiEye, FiClock, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { documents, categories } from "../Data/DocsData";

export default function KnowledgeHubDocs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || doc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleDocumentView = (document) => {
    // Navigate to document viewer with document ID in URL
    navigate(`/knowledge-hub/docs/view/${document.id}`);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container mt-2">
        <div className="my-3">
          <div className="row g-3 mb-3">
            <div className="">
              <div className="position-relative">
                <FiSearch
                  className="position-absolute top-50 start-0 translate-middle-y ms-3"
                  style={{
                    color: "#0d9488",
                  }}
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="search documents & references"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderColor: "#0d9488",
                    boxShadow: "none",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0d9488";
                    e.target.style.boxShadow =
                      "0 0 0 0.2rem rgba(13, 148, 136, 0.25)";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`btn btn-sm ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setSelectedCategory(category)}
                style={{
                  backgroundColor:
                    selectedCategory === category ? "#0d9488" : "transparent",
                  borderColor: "#0d9488",
                  color: selectedCategory === category ? "white" : "#0d9488",
                  fontSize: "12px",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-start">
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Showing {filteredDocuments.length} document
            {filteredDocuments.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        <div className="row g-3">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="col-md-6 col-lg-3">
              <div
                className="card h-100 shadow-sm border-0 d-flex flex-column"
                style={{
                  borderColor: "#a7f3d0",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0.5rem 1rem rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)";
                }}
              >
                <div className="position-relative">
                  <img
                    src={
                      doc.thumbnail ||
                      "https://media.istockphoto.com/id/1179640294/vector/contract-or-document-signing-icon-document-folder-with-stamp-and-text-contract-conditions.jpg?s=612x612&w=0&k=20&c=87Bu41EuMtdXDfJbm1YrquzUmHtPjFiCb9PCsrsWP1c="
                    }
                    alt={doc.title}
                    className="card-img-top"
                    style={{
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  <span
                    className="badge position-absolute top-0 start-0 m-2"
                    style={{ backgroundColor: "#0d9488", fontSize: "10px" }}
                  >
                    <FiFileText size={10} className="me-1" />
                    {doc.fileType.toUpperCase()}
                  </span>
                  <span
                    className="badge bg-secondary position-absolute bottom-0 end-0 m-2"
                    style={{ fontSize: "10px" }}
                  >
                    {doc.fileSize}
                  </span>
                </div>

                <div className="card-body p-2 px-3 d-flex flex-column h-100">
                  <div className="mb-2">
                    <div className="d-flex flex-wrap gap-1">
                      {doc.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="badge"
                          style={{
                            backgroundColor: "#ccfbf1",
                            color: "#0d9488",
                            fontSize: "9px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 2 && (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: "#ccfbf1",
                            color: "#0d9488",
                            fontSize: "9px",
                          }}
                        >
                          +{doc.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <h6
                    className="card-title text-start"
                    style={{ fontSize: "14px", lineHeight: "1.3" }}
                  >
                    {doc.title}
                  </h6>

                  <p
                    className="card-text text-muted text-start mb-1"
                    style={{
                      fontSize: "12px",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {doc.description}
                  </p>

                  <div
                    className="d-flex align-items-center justify-content-between text-muted mb-1 mt-0"
                    style={{ fontSize: "10px", marginTop: "0" }}
                  >
                    <div className="d-flex align-items-center gap-1">
                      <FiEye size={10} />
                      {doc.views} views
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FiClock size={10} />
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    className="btn w-100 btn-sm mt-auto"
                    style={{
                      backgroundColor: "#0d9488",
                      borderColor: "#0d9488",
                      color: "white",
                      fontSize: "12px",
                    }}
                    onClick={() => handleDocumentView(doc)}
                  >
                    <FiEye size={12} className="me-1" />
                    View Document
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-5">
            <FiSearch size={64} className="mb-4" style={{ color: "#5eead4" }} />
            <h3 className="fw-semibold mb-2" style={{ fontSize: "18px" }}>
              No documents found
            </h3>
            <p className="text-muted" style={{ fontSize: "14px" }}>
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}