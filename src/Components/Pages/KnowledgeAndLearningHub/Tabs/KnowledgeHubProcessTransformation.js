import { useState, useMemo } from "react";
import { FiSearch, FiEye, FiClock, FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { diagrams, categories } from "../Data/ProcessTransformationData";

export default function KnowledgeHubProcessTransformation() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFlows = useMemo(() => {
    return diagrams.filter((flow) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        flow.title.toLowerCase().includes(query) ||
        flow.description.toLowerCase().includes(query) ||
        flow.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === "All" || flow.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleFlowView = (id) => {
    navigate(`/knowledge-hub/process/view/${id}`);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container mt-2">
        {/* Search + Filters */}
        <div className="my-3">
          <div className="row g-3 mb-3">
            <div>
              <div className="position-relative">
                <FiSearch
                  className="position-absolute top-50 start-0 translate-middle-y ms-3"
                  style={{ color: "#0d9488" }}
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search process flows & diagrams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderColor: "#0d9488",
                    boxShadow: "none",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="d-flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  className={`btn btn-sm ${
                    isActive ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: isActive ? "#0d9488" : "transparent",
                    borderColor: "#0d9488",
                    color: isActive ? "white" : "#0d9488",
                    fontSize: "12px",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3 text-start">
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Showing {filteredFlows.length} flow
            {filteredFlows.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Results Grid */}
        <div className="row g-3">
          {filteredFlows.map((flow) => (
            <div key={flow.id} className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 d-flex flex-column">
                {/* Thumbnail */}
                <div className="position-relative">
                  <img
                    src={
                      flow.thumbnail ||
                      "https://cdn-icons-png.flaticon.com/512/1829/1829586.png"
                    }
                    alt={flow.title}
                    className="card-img-top"
                    style={{
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />

                  {flow.imageType && (
                    <span
                      className="badge position-absolute top-0 start-0 m-2"
                      style={{ backgroundColor: "#0d9488", fontSize: "10px" }}
                    >
                      <FiImage size={10} className="me-1" />
                      {flow.imageType}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="card-body p-2 px-3 d-flex flex-column h-100">
                  {/* Tags */}
                  <div className="mb-2 d-flex flex-wrap gap-1">
                    {flow.tags.slice(0, 2).map((tag) => (
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
                    {flow.tags.length > 2 && (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#ccfbf1",
                          color: "#0d9488",
                          fontSize: "9px",
                        }}
                      >
                        +{flow.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h6
                    className="card-title text-start mb-1"
                    style={{ fontSize: "14px", lineHeight: "1.3" }}
                  >
                    {flow.title}
                  </h6>

                  {/* Description */}
                  <p
                    className="card-text text-muted text-start flex-grow-0"
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
                    {flow.description}
                  </p>

                  {/* Meta */}
                  <div
                    className="d-flex align-items-center justify-content-between text-muted mb-2"
                    style={{ fontSize: "10px" }}
                  >
                    <span className="d-flex align-items-center gap-1">
                      <FiEye size={10} /> {flow.views} views
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <FiClock size={10} />{" "}
                      {new Date(flow.uploadDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Action */}
                  <button
                    className="btn btn-sm mt-auto w-100 btn-theme-dark global-font"
                    onClick={() => handleFlowView(flow.id)}
                  >
                    <FiEye size={12} className="me-1" />
                    View Diagram
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredFlows.length === 0 && (
          <div className="text-center py-5">
            <FiSearch size={64} className="mb-4" style={{ color: "#5eead4" }} />
            <h3 className="fw-semibold mb-2" style={{ fontSize: "18px" }}>
              No process flows found
            </h3>
            <p className="text-muted" style={{ fontSize: "14px" }}>
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
