import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { documents } from "../Data/DocsData";
import { knowledgeItems } from "../Data/CoursesData";
import { diagrams } from "../Data/ProcessTransformationData";
// ICONS
import {
  FiArrowLeft,
  FiCheck,
  FiPlay,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import { FaProjectDiagram } from "react-icons/fa";

export default function CoursePlayer() {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();

  // Fetch course data based on URL params
  const course = getCourseById(parseInt(courseId));
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => {
    return lessonId ? parseInt(lessonId) : 0;
  });

  const [courseProgress, setCourseProgress] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("courseProgress");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
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

  const [lessonProgress, setLessonProgress] = useState(() => {
    if (typeof window !== "undefined" && course) {
      const saved = localStorage.getItem(`lessonProgress_${course.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const progressMap = new Map();
          Object.entries(parsed).forEach(([lessonIndex, progress]) => {
            progressMap.set(Number.parseInt(lessonIndex), progress);
          });
          return progressMap;
        } catch (error) {
          console.error("Error parsing saved lesson progress:", error);
        }
      }
    }
    return new Map();
  });

  // Function to fetch course by ID
  function getCourseById(id) {
    return knowledgeItems.find((item) => item.id === id);
  }

  // Update URL when lesson changes
  useEffect(() => {
    if (course) {
      navigate(
        `/knowledge-hub/courses/${course.id}/lesson/${currentLessonIndex}`,
        { replace: true }
      );
    }
  }, [currentLessonIndex, course, navigate]);

  // Update lesson index when URL param changes
  useEffect(() => {
    if (lessonId !== undefined) {
      setCurrentLessonIndex(parseInt(lessonId));
    }
  }, [lessonId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const progressObj = {};
      courseProgress.forEach((lessonSet, courseId) => {
        progressObj[courseId] = Array.from(lessonSet);
      });
      localStorage.setItem("courseProgress", JSON.stringify(progressObj));
    }
  }, [courseProgress]);

  useEffect(() => {
    if (typeof window !== "undefined" && course) {
      const progressObj = {};
      lessonProgress.forEach((progress, lessonIndex) => {
        progressObj[lessonIndex] = progress;
      });
      localStorage.setItem(
        `lessonProgress_${course.id}`,
        JSON.stringify(progressObj)
      );
    }
  }, [lessonProgress, course]);

  // Handle case where course is not found
  if (!course) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="text-center">
          <h3 className="mb-3">Course Not Found</h3>
          <p className="text-muted mb-4">
            The course you're looking for doesn't exist.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/knowledge-hub/videos")}
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const completedLessons = courseProgress.get(course.id) || new Set();
  const currentLesson = course.lessons[currentLessonIndex];

  // Handle case where lesson is not found
  if (!currentLesson) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="text-center">
          <h3 className="mb-3">Lesson Not Found</h3>
          <p className="text-muted mb-4">
            The lesson you're looking for doesn't exist in this course.
          </p>
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate(`/knowledge-hub/courses/${course.id}/lesson/0`)
            }
          >
            Go to First Lesson
          </button>
        </div>
      </div>
    );
  }

  const handleLessonSelect = (index) => {
    setCurrentLessonIndex(index);
  };

  // Handle Back Buttons
  const handleBackToHub = () => navigate("/knowledge-hub/videos");
  const handleBack = () => navigate(-1);

  // Handle Mark Complete / Uncomplete
  const handleLessonComplete = () => {
    setCourseProgress((prev) => {
      const newProgress = new Map(prev);
      const courseCompletedLessons = newProgress.get(course.id) || new Set();
      courseCompletedLessons.add(currentLessonIndex);
      newProgress.set(course.id, courseCompletedLessons);
      return newProgress;
    });

    setLessonProgress((prev) => new Map([...prev, [currentLessonIndex, 100]]));
    if (currentLessonIndex < course.lessons.length - 1) {
      setTimeout(() => {
        setCurrentLessonIndex(currentLessonIndex + 1);
      }, 1000);
    }
  };

  // Unmark Complete
  const handleLessonUncomplete = () => {
    setCourseProgress((prev) => {
      const newProgress = new Map(prev);
      const courseCompletedLessons = new Set(newProgress.get(course.id) || []);
      courseCompletedLessons.delete(currentLessonIndex);
      newProgress.set(course.id, courseCompletedLessons);
      return newProgress;
    });

    setLessonProgress((prev) => {
      const newProgress = new Map(prev);
      newProgress.set(currentLessonIndex, 0);
      return newProgress;
    });
  };

  const getYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(
    currentLesson.videoUrl || "https://www.youtube.com/watch?v=-8OXU_tHV48&t=2s"
  );

  const fetchCourseDetails = (refDocId) => {
    return (
      documents.find((d) => d.id === refDocId)?.title || "Reference Document"
    );
  };
  const fetchDiagramDetails = (refDocId) => {
    return (
      diagrams.find((d) => d.id === refDocId)?.title || "Reference Flow Diagram"
    );
  };

  return (
    <div
      className="min-vh-100 text-start"
      style={{ backgroundColor: "#f9f9f9" }}
    >
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

      <div className="container-fluid px-3">
        <div className="row g-3">
          <div className="col-9">
            {/* Video Player Card */}
            <div className="card mb-1 border-0 shadow-sm">
              <div className="position-relative">
                <div
                  className="ratio ratio-16x9"
                  style={{ backgroundColor: "#000" }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-100 h-100 rounded-top"
                    style={{ minHeight: "400px" }}
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Video Info Card */}
            <div className="card border-1 shadow-sm">
              <div className="card-body">
                <h4 className="mb-0 text-dark">{currentLesson.title}</h4>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ color: "#606060", fontSize: "14px" }}
                  >
                    {/* <span>{course.author}</span>
                    <span>•</span> */}
                    <span>{currentLesson.views || "190"} views</span>
                    <span>•</span>
                    <span>3 years ago</span>
                  </div>

                  <button
                    className={`btn btn-sm ${
                      completedLessons.has(currentLessonIndex)
                        ? "btn-danger"
                        : "btn-outline-secondary"
                    }`}
                    onClick={
                      completedLessons.has(currentLessonIndex)
                        ? handleLessonUncomplete
                        : handleLessonComplete
                    }
                    style={{ fontSize: "12px", padding: "4px 12px" }}
                  >
                    {completedLessons.has(currentLessonIndex) ? (
                      <>
                        <FiCheck size={12} className="me-1" />
                        Unmark Complete
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </button>
                </div>

                {/* Video Description */}
                <div
                  className="border-top pt-3"
                  style={{ borderColor: "#e0e0e0" }}
                >
                  <p
                    style={{ color: "#606060", fontSize: "14px" }}
                    className="mb-0"
                  >
                    {currentLesson.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div
              className="card border-1 shadow-sm"
              style={{ position: "sticky", top: "20px" }}
            >
              <div className="card-header bg-white border-bottom py-2">
                <h6 className="mb-1 text-dark" style={{ fontSize: "13px" }}>
                  {course.title}
                </h6>
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ color: "#606060", fontSize: "11px" }}
                >
                  {/* <span>{course.author}</span> */}
                  <span>•</span>
                  <span>
                    {currentLessonIndex + 1} / {course.lessons.length}
                  </span>
                </div>
              </div>

              <div
                className="card-body p-0"
                style={{ height: "400px", overflowY: "auto" }}
              >
                {course.lessons.map((lesson, index) => {
                  const progress = lessonProgress.get(index) || 0;
                  const isCompleted = completedLessons.has(index);

                  return (
                    <div key={lesson.id} className="position-relative">
                      <div
                        className={`d-flex gap-2 p-2 border-bottom cursor-pointer position-relative ${
                          index === currentLessonIndex
                            ? "bg-primary bg-opacity-10"
                            : ""
                        } ${isCompleted ? "text-muted" : ""}`}
                        style={{
                          backgroundColor:
                            index === currentLessonIndex
                              ? "#e6fffa"
                              : "transparent",
                          cursor: "pointer",
                          borderLeft:
                            index === currentLessonIndex
                              ? "3px solid #0d9488"
                              : "3px solid transparent",
                          opacity: isCompleted ? 0.6 : 1,
                        }}
                        onClick={() => handleLessonSelect(index)}
                        onMouseEnter={(e) => {
                          if (index !== currentLessonIndex) {
                            e.currentTarget.style.backgroundColor = "#f8f9fa";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (index !== currentLessonIndex) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <div
                          className="flex-shrink-0 d-flex align-items-center justify-content-center"
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#606060",
                            fontSize: "11px",
                          }}
                        >
                          {index === currentLessonIndex ? (
                            <FiPlay size={10} style={{ color: "#0d9488" }} />
                          ) : isCompleted ? (
                            <FiCheck size={10} style={{ color: "#0d9488" }} />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>

                        <div
                          className="flex-shrink-0 position-relative"
                          style={{ width: "70px", height: "40px" }}
                        >
                          <img
                            src={lesson.thumbnail || course.thumbnail}
                            alt={lesson.title}
                            className="rounded w-100 h-100"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              filter: isCompleted
                                ? "grayscale(80%) brightness(0.9)"
                                : "none",
                            }}
                          />
                          <div
                            className="position-absolute bg-dark text-white px-1 rounded"
                            style={{
                              fontSize: "9px",
                              top: "2px",
                              left: "2px",
                              backgroundColor: "rgba(0,0,0,0.8)",
                              zIndex: 2,
                            }}
                          >
                            {lesson.duration}
                          </div>
                          {isCompleted && (
                            <div
                              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded"
                              style={{
                                backgroundColor: "rgba(13, 148, 136, 0.2)",
                              }}
                            >
                              <div
                                className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "16px", height: "16px" }}
                              >
                                <FiCheck
                                  size={10}
                                  style={{ color: "#0d9488" }}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <h6
                            className={`mb-1 ${
                              isCompleted ? "text-muted" : "text-dark"
                            }`}
                            style={{
                              fontSize: "11px",
                              lineHeight: "1.2",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {lesson.title}
                          </h6>
                          <div
                            style={{
                              color: isCompleted ? "#b0b0b0" : "#606060",
                              fontSize: "10px",
                            }}
                          >
                            <div>{course.author}</div>
                            <div className="d-flex align-items-center gap-1 mt-1">
                              {progress > 0 && !isCompleted && (
                                <>
                                  <span>•</span>
                                  <span style={{ color: "#0d9488" }}>
                                    {progress}%
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {progress > 0 && (
                        <div
                          className="position-absolute bottom-0 start-0 bg-secondary bg-opacity-25"
                          style={{ height: "2px", width: "100%" }}
                        >
                          <div
                            className="h-100 transition-all"
                            style={{
                              backgroundColor: "#0d9488",
                              width: `${progress}%`,
                              transition: "width 0.3s ease",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* REFERENCES */}
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
                  <div className="d-flex align-items-center justify-content-between">
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
                        <FiFileText size={12} style={{ color: "#0d6efd" }} />
                      </div>
                      <div>
                        <div
                          className="text-dark mb-0"
                          style={{ fontSize: "12px", fontWeight: "500" }}
                        >
                          {fetchCourseDetails(currentLesson.refDocId)}
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-theme global-font d-flex align-items-center ms-1"
                      onClick={() =>
                        navigate(
                          `/knowledge-hub/docs/view/${currentLesson.refDocId}`
                        )
                      }
                    >
                      Open
                      <FiExternalLink className="ms-1" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagrams */}
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
                  {currentLesson.refDiagramIds &&
                  currentLesson.refDiagramIds.length > 0 ? (
                    currentLesson.refDiagramIds.map((id) => (
                      <div
                        className="d-flex align-items-center justify-content-between mb-2 "
                        style={{
                          borderBottom: "2px solid #e0e0e0",
                          paddingBottom: "2px",
                        }}
                      >
                        <div className="d-flex align-items-start ">
                          <div
                            className="rounded d-flex align-items-center justify-content-center me-2 "
                            style={{
                              width: "28px",
                              height: "28px",
                              backgroundColor: "#7d0dfd1a",
                              border: "1px solid rgba(13, 110, 253, 0.2)",
                            }}
                          >
                            <FaProjectDiagram
                              size={10}
                              style={{ color: "#7d0dfd" }}
                            />
                          </div>
                          <div>
                            <div
                              className="text-dark mb-0"
                              style={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {fetchDiagramDetails(id)}
                            </div>
                          </div>
                        </div>

                        <FiExternalLink
                          className="ms-1 "
                          size={20}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/knowledge-hub/process/view/${id}`)
                          }
                        />
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
  );
}
