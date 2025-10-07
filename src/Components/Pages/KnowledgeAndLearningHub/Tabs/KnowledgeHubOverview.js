import { useMemo, useEffect, useState } from "react";
import {
  FiPlay,
  FiClock,
  FiEye,
  FiTrendingUp,
  FiBookOpen,
  FiTarget,
  FiAward,
  FiActivity,
} from "react-icons/fi";
import { knowledgeItems } from "../Data/CoursesData";
import ReactApexChart from "react-apexcharts";
import { ChartContainer } from "../../../Helper/chartContainerHelper";
import { useNavigate } from "react-router-dom";


export default function KnowledgeHubOverview() {
  const [activityData, setActivityData] = useState([]);
  const navigate = useNavigate();

  // chart
  const [learningStats] = useState({
    series: [
      {
        name: "Time Spent",
        data: [2, 3, 4, 3, 5, 6, 4], // dummy weekly course activity
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1.5, // thinner line (default is 2.5)
      },
      markers: {
        size: 3, // small dots
        strokeWidth: 1,
        hover: { size: 5 },
      },
      grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 4,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Weekly labels
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (val) => `${val} hr`, // adds "h" unit to each tick
          style: { fontSize: "12px" },
        },
      },
      tooltip: {
        x: { show: true },
      },
      colors: ["#0d9488", "#7c3aed"], // teal for courses, purple for docs
    },
  });

  const [courseProgress] = useState(() => {
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

  // Get user's watched time from localStorage
  const getUserWatchedTime = () => {
    if (typeof window !== "undefined") {
      const watchedTime = localStorage.getItem("userWatchedTime");
      return watchedTime ? JSON.parse(watchedTime) : {};
    }
    return {};
  };

  useEffect(() => {
    const loadActivityData = () => {
      const weeklyData = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        // Get real activity from localStorage
        const courseActivity = JSON.parse(
          localStorage.getItem(`courseActivity_${dayKey}`) || "0"
        );
        const documentActivity = JSON.parse(
          localStorage.getItem(`documentActivity_${dayKey}`) || "0"
        );

        weeklyData.push({
          day: dayName,
          date: dayKey,
          courses: courseActivity,
          documents: documentActivity,
          total: courseActivity + documentActivity,
        });
      }

      setActivityData(weeklyData);
    };

    loadActivityData();

    // Update activity data when user interacts with content
    const handleStorageChange = () => {
      loadActivityData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const stats = useMemo(() => {
    if (!knowledgeItems || !Array.isArray(knowledgeItems)) {
      return {
        totalCourses: 0,
        totalDurationHours: 0,
        totalDurationMinutes: 0,
        overallProgress: 0,
        coursesCompleted: 0,
        coursesInProgress: 0,
        totalLessons: 0,
        completedLessons: 0,
        topCategories: [],
        timeWatched: "0h 0m",
        watchTimeProgress: 0,
        averageSessionTime: 0,
        coursesStarted: 0,
        completionRate: 0,
      };
    }

    const courses = knowledgeItems.filter((item) => item.type === "course");

    // Calculate total duration for courses
    const totalDuration = courses.reduce((sum, course) => {
      const duration = course.duration || "0h 0m";
      const hours = Number.parseInt(duration.match(/(\d+)h/)?.[1] || "0");
      const minutes = Number.parseInt(duration.match(/(\d+)m/)?.[1] || "0");
      return sum + hours * 60 + minutes;
    }, 0);

    // Calculate completion stats from courseProgress localStorage data
    let totalLessons = 0;
    let completedLessons = 0;
    let coursesInProgress = 0;
    let coursesCompleted = 0;
    let coursesStarted = 0;

    courses.forEach((course) => {
      const lessonCount = course.lessons?.length || 0;
      totalLessons += lessonCount;

      const completed = courseProgress?.get(course.id) || new Set();
      completedLessons += completed.size;

      if (completed.size > 0) {
        coursesStarted++;
        if (completed.size === lessonCount) {
          coursesCompleted++;
        } else {
          coursesInProgress++;
        }
      }
    });

    const overallProgress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    // Calculate realistic time watched based on lessons completed
    // Assume average lesson is 8 minutes, with some variation
    const estimatedWatchedMinutes =
      completedLessons * 8 + Math.floor(coursesInProgress * 2 * 8); // partial progress for in-progress courses
    const watchedHours = Math.floor(estimatedWatchedMinutes / 60);
    const watchedMinutes = estimatedWatchedMinutes % 60;
    const timeWatched = `${watchedHours}h ${watchedMinutes}m`;

    // Calculate watch time progress based on estimated watched vs total content duration
    const watchTimeProgress =
      totalDuration > 0
        ? Math.min(
            Math.round((estimatedWatchedMinutes / totalDuration) * 100),
            100
          )
        : 0;

    // Calculate completion rate from actual localStorage data
    const completionRate =
      coursesStarted > 0
        ? Math.round((coursesCompleted / coursesStarted) * 100)
        : 0;

    // Calculate average session time from activityData (localStorage)
    const recentSessions = activityData.filter((day) => day.total > 0);
    const averageSessionTime =
      recentSessions.length > 0
        ? Math.round(
            (recentSessions.reduce((sum, day) => sum + day.total, 0) /
              recentSessions.length) *
              60
          ) // Convert to minutes
        : completedLessons > 0
        ? 25
        : 0; // Default to 25 minutes if there's progress but no activity data

    // Get popular categories from knowledgeItems data
    const categoryStats = {};
    knowledgeItems.forEach((item) => {
      if (item.category) {
        categoryStats[item.category] =
          (categoryStats[item.category] || 0) + (item.views || 0);
      }
    });

    const topCategories = Object.entries(categoryStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      totalCourses: courses.length,
      totalDurationHours: Math.floor(totalDuration / 60),
      totalDurationMinutes: totalDuration % 60,
      overallProgress,
      coursesCompleted,
      coursesInProgress,
      totalLessons,
      completedLessons,
      topCategories,
      timeWatched,
      watchTimeProgress,
      averageSessionTime,
      coursesStarted,
      completionRate,
    };
  }, [knowledgeItems, courseProgress, activityData]);

  const recentCourses = useMemo(() => {
    if (!knowledgeItems || !Array.isArray(knowledgeItems)) {
      return [];
    }

    const courses = knowledgeItems.filter((item) => item.type === "course");

    const inProgressCourses = courses.filter((course) => {
      const completedLessons = courseProgress?.get(course.id) || new Set();
      return (
        completedLessons.size > 0 &&
        completedLessons.size < (course.lessons?.length || 0)
      );
    });

    // If we have in-progress courses, show them
    if (inProgressCourses.length > 0) {
      return inProgressCourses.slice(0, 4);
    }

    // Otherwise show suggested courses (most popular)
    const suggestedCourses = courses
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 4);

    return suggestedCourses;
  }, [knowledgeItems, courseProgress]);

  const getCourseCompletionPercentage = (courseId, totalLessons) => {
    if (!courseProgress) return 0;

    const completedLessons = courseProgress.get(courseId) || new Set();
    return Math.round((completedLessons.size / totalLessons) * 100);
  };

  return (
    <div>
      <div className="m-1 mt-2">
        {/* Stats Cards */}
        <div className="row g-1 mb-2">
          <div className="col d-flex text-start">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-body p-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3
                      className="h4 fw-bold mb-1"
                      style={{ color: "#0d9488" }}
                    >
                      {stats.watchTimeProgress}%
                      <span className="global-font ms-1">
                        {" "}
                        ({stats.timeWatched})
                      </span>
                    </h3>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      Time Watched
                    </p>
                  </div>
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#ccfbf1" }}
                  >
                    <FiClock size={20} style={{ color: "#0d9488" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col d-flex text-start">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-body p-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3
                      className="h4 fw-bold mb-1"
                      style={{ color: "#7c3aed" }}
                    >
                      {stats.coursesCompleted}/{stats.totalCourses}
                    </h3>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      Courses Completed
                    </p>
                  </div>
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#f3e8ff" }}
                  >
                    <FiAward size={20} style={{ color: "#7c3aed" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col d-flex text-start">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-body p-2 ">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3
                      className="h4 fw-bold mb-1"
                      style={{ color: "#f59e0b" }}
                    >
                      {stats.completedLessons}/{stats.totalLessons}
                    </h3>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      Lessons Completed
                    </p>
                  </div>
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#fef3c7" }}
                  >
                    <FiBookOpen size={20} style={{ color: "#f59e0b" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col d-flex text-start">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-body p-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3
                      className="h4 fw-bold mb-1"
                      style={{ color: "#10b981" }}
                    >
                      {stats.coursesInProgress}
                    </h3>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      Courses In Progress
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col d-flex text-start">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-body p-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3
                      className="h4 fw-bold mb-1"
                      style={{ color: "#0ea5e9" }}
                    >
                      {stats.averageSessionTime}m
                    </h3>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      Avg Session Time
                    </p>
                  </div>
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#e0f2fe" }}
                  >
                    <FiActivity size={20} style={{ color: "#0ea5e9" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-lg-6 d-flex">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-header bg-white border-0 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5
                    className="mb-0 head-theme text-start"
                    style={{ fontSize: "16px" }}
                  >
                    Weekly Activity
                  </h5>
                  <div
                    className="p-2 rounded"
                    style={{ backgroundColor: "#f0fdf4" }}
                  >
                    <FiTrendingUp size={16} style={{ color: "#10b981" }} />
                  </div>
                </div>
              </div>
              <ChartContainer minHeight={210}>
                <ReactApexChart
                  options={learningStats.options}
                  series={learningStats.series}
                  type="area"
                  width="100%"
                  height={210}
                />
              </ChartContainer>
            </div>
          </div>
          <div className="col-lg-6 d-flex">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-header bg-white border-0 pb-0">
                <h5
                  className=" mb-0 head-theme text-start pt-1"
                  style={{ fontSize: "16px" }}
                >
                  Learning Progress
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-2 mb-2">
                  <div className="col-4">
                    <div
                      className="text-center p-2 rounded"
                      style={{ backgroundColor: "#f0fdf4" }}
                    >
                      <div
                        className="h5 fw-bold mb-1"
                        style={{ color: "#10b981" }}
                      >
                        {stats.coursesCompleted}
                      </div>
                      <div className="text-muted" style={{ fontSize: "10px" }}>
                        Completed
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="text-center p-2 rounded"
                      style={{ backgroundColor: "#fffbeb" }}
                    >
                      <div
                        className="h5 fw-bold mb-1"
                        style={{ color: "#f59e0b" }}
                      >
                        {stats.coursesInProgress}
                      </div>
                      <div className="text-muted" style={{ fontSize: "10px" }}>
                        In Progress
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="text-center p-2 rounded"
                      style={{ backgroundColor: "#fef2f2" }}
                    >
                      <div
                        className="h5 fw-bold mb-1"
                        style={{ color: "#ef4444" }}
                      >
                        {stats.totalCourses - stats.coursesStarted}
                      </div>
                      <div className="text-muted" style={{ fontSize: "10px" }}>
                        Not Started
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Velocity */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div
                      className="text-center p-2 rounded"
                      style={{ backgroundColor: "#f0f9ff" }}
                    >
                      <div
                        className="h6 fw-bold mb-1"
                        style={{ color: "#0ea5e9" }}
                      >
                        {stats.completionRate}%
                      </div>
                      <div className="text-muted" style={{ fontSize: "10px" }}>
                        Completion Rate
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="text-center p-2 rounded"
                      style={{ backgroundColor: "#faf5ff" }}
                    >
                      <div
                        className="h6 fw-bold mb-1"
                        style={{ color: "#8b5cf6" }}
                      >
                        {Math.ceil(
                          stats.totalCourses > 0
                            ? ((stats.totalCourses - stats.coursesCompleted) *
                                stats.averageSessionTime *
                                2.5) /
                                60
                            : 0
                        )}
                        h
                      </div>
                      <div className="text-muted" style={{ fontSize: "10px" }}>
                        Est. Remaining
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span style={{ fontSize: "12px" }}>Lessons Progress</span>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>
                      {stats.completedLessons} / {stats.totalLessons}
                    </span>
                  </div>
                  <div className="progress mb-2" style={{ height: "6px" }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${stats.overallProgress}%`,
                        backgroundColor: "#0d9488",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span style={{ fontSize: "12px" }}>
                      Watch Time Progress
                    </span>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>
                      {stats.timeWatched} / {stats.totalDurationHours}h{" "}
                      {stats.totalDurationMinutes}m
                    </span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${stats.watchTimeProgress}%`,
                        backgroundColor: "#7c3aed",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Categories and Recent Courses */}
        <div className="row g-2 mt-1">
          <div className="col-lg-4 d-flex">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-header bg-white border-0 pb-0 pt-3">
                <h5
                  className="mb-0 head-theme text-start"
                  style={{ fontSize: "16px" }}
                >
                  Popular Categories
                </h5>
              </div>
              <div className="card-body">
                {stats.topCategories.length > 0 ? (
                  stats.topCategories.map(([category, views], index) => (
                    <div
                      key={category}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="badge rounded-pill"
                          style={{
                            backgroundColor: "#ccfbf1",
                            color: "#0d9488",
                            fontSize: "10px",
                          }}
                        >
                          #{index + 1}
                        </span>
                        <span style={{ fontSize: "14px" }}>{category}</span>
                      </div>
                      <span className="text-muted" style={{ fontSize: "12px" }}>
                        {views.toLocaleString()} views
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    className="text-center text-muted py-4"
                    style={{ fontSize: "14px" }}
                  >
                    No categories available yet
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Recent Courses */}
          <div className="col-lg-8 d-flex">
            <div className="card border-0 shadow-sm w-100">
              <div className="card-header bg-white border-0 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5
                    className="mb-0 head-theme text-start pt-1"
                    style={{ fontSize: "16px" }}
                  >
                    {recentCourses.some((course) => {
                      const completedLessons =
                        courseProgress?.get(course.id) || new Set();
                      return (
                        completedLessons.size > 0 &&
                        completedLessons.size < (course.lessons?.length || 0)
                      );
                    })
                      ? "Continue Learning"
                      : "Suggested Courses"}
                  </h5>
                </div>
              </div>
              <div className="card-body">
                {recentCourses.length > 0 ? (
                  <div className="row g-1">
                    {recentCourses.map((course) => {
                      const completionPercentage =
                        getCourseCompletionPercentage(
                          course.id,
                          course.lessons?.length || 0
                        );

                      return (
                        <div
                          key={course.id}
                          className="col-md-6 col-lg-3 d-flex g-3 mt-0"
                        >
                          <div
                            className="card border-0 w-100 "
                            style={{
                              backgroundColor: "#f9fafb",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate(
                                `/knowledge-hub/courses/${course.id}`
                              );
                            }}
                          >
                            <img
                              src={
                                course.thumbnail ||
                                `/placeholder.svg?height=120&width=200&query=${
                                  encodeURIComponent(
                                    course.title + " course thumbnail"
                                  ) || "/placeholder.svg"
                                }`
                              }
                              alt={course.title}
                              className="card-img-top"
                              style={{ height: "100px", objectFit: "cover" }}
                            />
                            <div className="card-body text-start p-1">
                              <h6
                                className="card-title"
                                style={{
                                  fontSize: "13px",
                                  lineHeight: "1.3",
                                  color: "#1f2937",
                                }}
                              >
                                {course.title}
                              </h6>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span
                                  className="text-muted"
                                  style={{ fontSize: "11px" }}
                                >
                                  {course.lessons?.length || 0} lessons
                                </span>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: "11px" }}
                                >
                                  {course.views || 0} views
                                </span>
                              </div>
                              {completionPercentage > 0 && (
                                <div
                                  className="progress"
                                  style={{ height: "3px" }}
                                >
                                  <div
                                    className="progress-bar"
                                    style={{
                                      width: `${completionPercentage}%`,
                                      backgroundColor:
                                        completionPercentage === 100
                                          ? "#10b981"
                                          : "#0d9488",
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="text-center text-muted py-4"
                    style={{ fontSize: "14px" }}
                  >
                    Start learning to see your progress here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
