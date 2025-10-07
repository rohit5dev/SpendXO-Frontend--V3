import { useState, useMemo, useEffect } from "react";
import { FiSearch, FiPlay, FiEye, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CoursePlayer from "../HelperComponents/CoursePlayer";
import { knowledgeItems, categories } from "../Data/CoursesData";

export default function KnowledgeHubVideos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courseProgress, setCourseProgress] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("courseProgress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Convert plain object back to Map with Set values
          const progressMap = new Map();
          Object.entries(parsed).forEach(([courseId, lessonIds]) => {
            progressMap.set(Number.parseInt(courseId), new Set(lessonIds));
          });
          return progressMap;
        } catch (error) {
          console.error("Error parsing saved progress:", error);
        }
      }
    }
    return new Map();
  });

  const navigate = useNavigate();

  const filteredItems = useMemo(() => {
    return knowledgeItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleCourseStart = (course, lessonIndex = 0) => {
    // Navigate to the course player with course ID and lesson index
    navigate(`/knowledge-hub/courses/${course.id}/lesson/${lessonIndex}`);
  };

  const getCourseCompletionPercentage = (courseId, totalLessons) => {
    const completedLessons = courseProgress.get(courseId) || new Set();
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Convert Map with Set values to plain object for JSON serialization
      const progressObj = {};
      courseProgress.forEach((lessonSet, courseId) => {
        progressObj[courseId] = Array.from(lessonSet);
      });
      localStorage.setItem("courseProgress", JSON.stringify(progressObj));
    }
  }, [courseProgress]);

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container mt-2">
        <div className="my-3">
          <div className="row g-3 mb-3">
            {/* Search Bar */}
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
                  placeholder="search courses & videos..."
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
                  onBlur={(e) => {
                    e.target.style.borderColor = "#0d9488";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
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
            Showing {filteredItems.length} video course
            {filteredItems.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        <div className="row g-3">
          {filteredItems.map((item) => {
            const completionPercentage = getCourseCompletionPercentage(
              item.id,
              item.lessons.length
            );

            return (
              <div key={item.id} className="col-md-6 col-lg-3">
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
                    <div>
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="card-img-top"
                        style={{
                          aspectRatio: "16/9",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => handleCourseStart(item)}
                      className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        opacity: 0,
                        cursor: "pointer",
                        transition: "opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "0")
                      }
                    >
                      <FiPlay size={36} color="white" />
                    </div>
                    <span
                      className="badge position-absolute top-0 start-0 m-2"
                      style={{ backgroundColor: "#0d9488", fontSize: "10px" }}
                    >
                      <FiPlay size={10} className="me-1" />
                      Course
                    </span>
                    <span
                      className="badge bg-secondary position-absolute bottom-0 end-0 m-2"
                      style={{ fontSize: "10px" }}
                    >
                      {item.duration}
                    </span>
                    {item.lessons && (
                      <span
                        className="badge bg-info position-absolute bottom-0 start-0 m-2"
                        style={{ fontSize: "10px" }}
                      >
                        {item.lessons.length} lessons
                      </span>
                    )}
                  </div>

                  <div className="card-body pt-1 flex-grow-1 d-flex flex-column">
                    <div className="mb-2">
                      <div className="d-flex flex-wrap gap-1 justify-content-between">
                        <div>
                          {item.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="badge me-1"
                              style={{
                                backgroundColor: "#ccfbf1",
                                color: "#0d9488",
                                fontSize: "9px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}

                          {item.tags.length > 2 && (
                            <span
                              className="badge"
                              style={{
                                backgroundColor: "#ccfbf1",
                                color: "#0d9488",
                                fontSize: "9px",
                              }}
                            >
                              +{item.tags.length - 2}
                            </span>
                          )}
                        </div>
                        <div>
                          {" "}
                          {completionPercentage === 100 ? (
                            <span
                              className="badge d-flex align-items-center gap-1"
                              style={{
                                backgroundColor: "#10b981",
                                color: "white",
                                fontSize: "9px",
                              }}
                            >
                              <span>✓</span>
                              <span>Completed</span>
                            </span>
                          ) : (
                            <span
                              className="badge"
                              style={{
                                backgroundColor: "#fbbf24",
                                color: "white",
                                fontSize: "9px",
                              }}
                            >
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <h6
                      className="card-title text-start"
                      style={{ fontSize: "14px", lineHeight: "1.3" }}
                    >
                      {item.title}
                    </h6>

                    <p
                      className="card-text text-muted text-start mb-2"
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
                      {item.description}
                    </p>

                    <div
                      className="d-flex align-items-center justify-content-between text-muted "
                      style={{ fontSize: "10px", marginTop: "0" }}
                    >
                      <div className="d-flex align-items-center gap-1">
                        <FiEye size={10} />
                        {item.views} views
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <FiClock size={10} />
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Progress bar and percentage always at the bottom of the card */}
                    {completionPercentage !== 0 && (
                      <div
                        className="d-flex align-items-center gap-2 ps-3 mt-auto"
                        style={{
                          marginLeft: "-1rem",
                          marginRight: "-1rem",
                          marginBottom: "-0.5rem",
                          marginTop: "0.75rem",
                          paddingLeft: 0,
                          paddingRight: 0,
                        }}
                      >
                        <div className="flex-grow-1">
                          <div
                            className="progress"
                            style={{
                              height: "4px",
                              borderRadius: 0,
                              backgroundColor: "#e0f2f1",
                            }}
                          >
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: `${completionPercentage}%`,
                                backgroundColor:
                                  completionPercentage === 100
                                    ? "#10b981"
                                    : "#0d9488",
                                borderRadius: 0,
                              }}
                              aria-valuenow={completionPercentage}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                        <span
                          className="text-muted pe-3"
                          style={{
                            fontSize: "11px",
                            minWidth: "32px",
                            textAlign: "right",
                            paddingRight: "0.5rem",
                          }}
                        >
                          {completionPercentage}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-5">
            <FiSearch size={64} className="mb-4" style={{ color: "#5eead4" }} />
            <h3 className="fw-semibold mb-2" style={{ fontSize: "18px" }}>
              No results found
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