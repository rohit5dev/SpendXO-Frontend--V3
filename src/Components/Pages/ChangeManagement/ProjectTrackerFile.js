import React, { useState, useEffect } from "react";
import "./CSS/ProjectTrackerFile.css";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Dropdown,
  Tab,
  Tabs,
  ListGroup,
  Offcanvas,
  ProgressBar,
  Alert,
  Table,
} from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  FaFilter,
  FaPlus,
  FaEdit,
  FaFolderOpen,
  FaTrash,
  FaEllipsisV,
  FaUser,
  FaCalendar,
  FaFlag,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaTrophy,
  FaCheckCircle,
  FaMinusCircle,
  FaCrosshairs,
  FaMoneyBillWave,
} from "react-icons/fa";

// Dummy Employee Data
const EMPLOYEES = [
  {
    id: "1",
    name: "Nisha Rathee",
    email: "nisha.rathee@statxo.com",
    initials: "NR",
    role: "Data Analytics Team Lead",
    department: "Data Analytics",
  },
  {
    id: "2",
    name: "Suyog Sonawane",
    email: "suyog.sonawane@statxo.com",
    initials: "SS",
    role: "Lead Analyst",
    department: "Data Analytics",
  },
  {
    id: "3",
    name: "Mohit Raykwar",
    email: "mohit.raykwar@statxo.com",
    initials: "MR",
    role: "Sr. Software Engineer",
    department: "Engineering",
  },
  {
    id: "4",
    name: "Rohit Kumar",
    email: "rohit.kumar@statxo.com",
    initials: "RK",
    role: "Associate Software Engineer",
    department: "Engineering",
  },
  {
    id: "5",
    name: "Akshat Bhatt",
    email: "akshat.bhatt@statxo.com",
    initials: "AB",
    role: "Sr. Data Scientist",
    department: "Data Science",
  },
  {
    id: "6",
    name: "Saurbhal Baghel",
    email: "saurbhal.baghel@statxo.com",
    initials: "SB",
    role: "Data Scientist",
    department: "Data Science",
  },
];

const ProjectTrackerFile = () => {
  // State Management
  const [projects, setProjects] = useState([
    {
      id: "101",
      name: "Supplier Consolidation FY25",
      key: "SCFY25",
      description:
        "Consolidate long-tail suppliers to reduce PO volume and improve leverage.",
      status: "active", // auto-updates via your effect when tasks change
      priority: "high",
      leadId: "1", // Nisha
      startDate: "2025-09-01",
      endDate: "2025-10-31",
      teamIds: ["1", "2", "5", "6"],
      createdDate: "2025-09-01",
      updatedDate: "2025-09-03",
      budget: 50000,
      estimatedHours: 420,
    },
    {
      id: "102",
      name: "Commodity Savings Q4 (Metals & Packaging)",
      key: "CSQ4",
      description:
        "Negotiate Q4 rates for steel, aluminum, corrugate, and flexible packaging.",
      status: "planning",
      priority: "medium",
      leadId: "2", // Suyog
      startDate: "2025-09-10",
      endDate: "2025-11-15",
      teamIds: ["1", "2", "5", "6"],
      createdDate: "2025-09-02",
      updatedDate: "2025-09-03",
      budget: 30000,
      estimatedHours: 360,
    },
    {
      id: "103",
      name: "E-Procurement Rollout (Phase 2)",
      key: "EPR2",
      description:
        "Roll out catalogs, approvals, and supplier onboarding workflows.",
      status: "completed",
      priority: "high",
      leadId: "3", // Mohit
      startDate: "2025-08-15",
      endDate: "2025-09-20",
      teamIds: ["3", "4", "1"],
      createdDate: "2025-08-10",
      updatedDate: "2025-09-02",
      budget: 80000,
      estimatedHours: 520,
    },
  ]);

  const [tasks, setTasks] = useState([
    // — Project 101 (Active): mix of statuses so project auto-shows active
    {
      id: "301",
      projectId: "101",
      sprintId: "201",
      title: "Clean supplier spend baseline",
      description: "Normalize supplier names, map to categories & GLs.",
      status: "inprogress",
      priority: "high",
      assigneeId: "1", // Nisha
      issueType: "story",
      dueDate: "2025-09-06",
    },
    {
      id: "302",
      projectId: "101",
      sprintId: "201",
      title: "Draft RFP for corrugate & flex Packaging",
      description: "Scope, SLAs, service levels, penalty terms.",
      status: "review",
      priority: "medium",
      assigneeId: "2", // Suyog
      issueType: "story",
      dueDate: "2025-09-07",
    },
    {
      id: "303",
      projectId: "101",
      sprintId: "201",
      title: "Supplier long-list creation",
      description: "20 suppliers across 4 regions from past PO history.",
      status: "done",
      priority: "low",
      assigneeId: "6", // Saurbhal
      issueType: "task",
      dueDate: "2025-09-10",
    },
    {
      id: "304",
      projectId: "101",
      sprintId: "202",
      title: "Negotiation playbook",
      description: "TCO levers, step-down pricing, rebate tiers.",
      status: "todo",
      priority: "high",
      assigneeId: "5", // Akshat
      issueType: "task",
      dueDate: "2025-09-18",
    },

    // — Project 102 (Planning): only todo so project stays planning
    {
      id: "305",
      projectId: "102",
      sprintId: "203",
      title: "Commodity index mapping (steel, alu, paper)",
      description: "Link contracts to LME/CRU indices; set trigger bands.",
      status: "todo",
      priority: "high",
      assigneeId: "2", // Suyog
      issueType: "story",
      dueDate: "2025-09-20",
    },
    {
      id: "306",
      projectId: "102",
      sprintId: "203",
      title: "Should-cost model for corrugate",
      description: "BOM + freight + scrap recovery; sensitivity curves.",
      status: "todo",
      priority: "medium",
      assigneeId: "5", // Akshat
      issueType: "story",
      dueDate: "2025-09-24",
    },

    // — Project 103 (Completed): all done, so project shows completed
    {
      id: "307",
      projectId: "103",
      sprintId: "204",
      title: "Supplier onboarding workflow",
      description: "Registration → risk checks → catalog enablement.",
      status: "done",
      priority: "medium",
      assigneeId: "3", // Mohit
      issueType: "story",
      dueDate: "2025-09-02",
    },
    {
      id: "308",
      projectId: "103",
      sprintId: "204",
      title: "e-Procurement training for buyers",
      description: "3 cohorts, sandbox scenarios, quiz signoff.",
      status: "done",
      priority: "low",
      assigneeId: "4", // Rohit
      issueType: "task",
      dueDate: "2025-09-05",
    },
    {
      id: "309",
      projectId: "103",
      sprintId: "204",
      title: "Catalog approval flow bugfix",
      description: "Fix duplicate approver when cost center missing.",
      status: "done",
      priority: "high",
      assigneeId: "3", // Mohit
      issueType: "bug",
      dueDate: "2025-09-01",
    },
  ]);

  const [sprints, setSprints] = useState([
    // Project 101
    {
      id: "201",
      name: "Sprint 1 - Supplier RFP",
      goal: "Draft & release RFP to top suppliers; clean baseline spend.",
      startDate: "2025-09-01",
      endDate: "2025-09-14",
      status: "active",
      projectId: "101",
    },
    {
      id: "202",
      name: "Sprint 2 - Negotiations",
      goal: "Conduct negotiation rounds; shortlist suppliers.",
      startDate: "2025-09-15",
      endDate: "2025-09-30",
      status: "planning",
      projectId: "101",
    },

    // Project 102
    {
      id: "203",
      name: "Sprint 1 - Commodity Baseline",
      goal: "Price index mapping, volume forecast & should-cost models.",
      startDate: "2025-09-12",
      endDate: "2025-09-26",
      status: "planning",
      projectId: "102",
    },

    // Project 103
    {
      id: "204",
      name: "Sprint 3 - Rollout & Training",
      goal: "Supplier onboarding, catalogs, approval flows, UAT signoff.",
      startDate: "2025-08-25",
      endDate: "2025-09-08",
      status: "completed",
      projectId: "103",
    },
  ]);

  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSprintModal, setShowSprintModal] = useState(false);
  const [showAddTaskToSprintModal, setShowAddTaskToSprintModal] =
    useState(false);
  const [showSprintCompletionModal, setShowSprintCompletionModal] =
    useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingSprint, setEditingSprint] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectSidebar, setShowProjectSidebar] = useState(false);
  const [activeSprintId, setActiveSprintId] = useState(
    sprints.length > 0 ? sprints[0].id : null
  );
  const [selectedTasksForSprint, setSelectedTasksForSprint] = useState([]);
  const [completingSprint, setCompletingSprint] = useState(null);

  //last
  const [activeTabKey, setActiveTabKey] = useState("overview"); // default to your default tab

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: "",
    key: "",
    description: "",
    status: "planning",
    priority: "medium",
    leadId: "",
    startDate: "",
    endDate: "",
    teamIds: [],
    budget: "",
    estimatedHours: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    issueType: "task",
    assigneeId: "",
    dueDate: "",
    projectId: "",
    sprintId: "",
    estimatedHours: "",
  });

  const [sprintForm, setSprintForm] = useState({
    name: "",
    goal: "",
    startDate: "",
    endDate: "",
    projectId: "",
  });

  // Drag and drop state to prevent errors
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Helper functions
  const getEmployeeById = (id) => {
    return EMPLOYEES.find((emp) => emp.id === id);
  };

  // Utility functions
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "planning":
        return "#579AC9";
      case "active":
        return "#70B56D";
      case "on-hold":
        return "#D4C84A";
      case "completed":
        return "#57AD5B";
      case "cancelled":
        return "#D14D4D";
      case "todo":
        return "#B3ABAB";
      case "inprogress":
        return "#FF7B30";
      case "review":
        return "#51B2F0";
      case "done":
        return "#57AD5B";
      default:
        return "#6c757d";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "highest":
        return "#dc3545";
      case "high":
        return "#fd7e14";
      case "medium":
        return "#ffc107";
      case "low":
        return "#20c997";
      case "lowest":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  const calculateProjectProgress = (projectId) => {
    const projectTasks = tasks.filter((task) => task.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(
      (task) => task.status === "done"
    ).length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  // Check if sprint should be marked as completed
  const checkSprintCompletion = (sprintId) => {
    const sprintTasks = getSprintTasks(sprintId);
    const sprint = sprints.find((s) => s.id === sprintId);

    if (
      sprintTasks.length > 0 &&
      sprintTasks.every((task) => task.status === "done") &&
      sprint?.status !== "completed"
    ) {
      setCompletingSprint(sprint);
      setShowSprintCompletionModal(true);
    }
  };

  // Enhanced drag and drop handlers with @dnd-kit
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    // Parse container ID and status from over.id (format: "sprintId-status")
    const containerParts = over.id.toString().split("-");
    if (containerParts.length < 2) {
      console.warn("Invalid container ID format:", over.id);
      return;
    }

    const destStatus = containerParts.slice(1).join("-");
    const destSprintId = containerParts[0];

    // Validate that status is valid
    const validStatuses = ["todo", "inprogress", "review", "done"];
    if (!validStatuses.includes(destStatus)) {
      console.warn("Invalid status:", destStatus);
      return;
    }

    const taskId = active.id;
    const newStatus = destStatus;

    setTasks((prev) => {
      const updatedTasks = prev.map((task) => {
        if (task.id === taskId) {
          const updates = {
            status: newStatus,
            updatedDate: new Date().toISOString(),
          };

          // If moving between sprints, update sprint assignment
          if (task.sprintId !== destSprintId) {
            updates.sprintId = destSprintId;
          }

          return { ...task, ...updates };
        }
        return task;
      });

      // Check sprint completion after state update
      const task = updatedTasks.find((t) => t.id === taskId);
      if (task?.sprintId && newStatus === "done") {
        setTimeout(() => checkSprintCompletion(task.sprintId), 100);
      }

      return updatedTasks;
    });
  };

  // Draggable Task Item component for @dnd-kit
  const DraggableTaskItem = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({ id: task.id });

    const style = {
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
    };

    const assignee = task.assigneeId ? getEmployeeById(task.assigneeId) : null;

    return (
      <Card
        ref={setNodeRef}
        style={style}
        className={`task-card mb-2 border ${isDragging ? "shadow" : ""}`}
        {...listeners}
        {...attributes}
      >
        <Card.Body className="p-2">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge
              bg={
                task.issueType === "bug"
                  ? "danger"
                  : task.issueType === "story"
                  ? "success"
                  : "primary"
              }
              className="me-2"
            >
              {task.issueType.toUpperCase()}
            </Badge>
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                size="sm"
                className="text-decoration-none p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <FaEllipsisV />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEditTask(task)}>
                  <FaEdit className="me-2" />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleRemoveTaskFromSprint(task.id)}
                  className="text-warning"
                >
                  <FaMinusCircle className="me-2" />
                  Remove from Sprint
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-danger"
                >
                  <FaTrash className="me-2" />
                  Delete Permanently
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card.Title className="task-title h6">{task.title}</Card.Title>
          {task.description && (
            <Card.Text className="task-description small text-muted">
              {task.description}
            </Card.Text>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaFlag
                color={getPriorityColor(task.priority)}
                className="me-1"
                size={12}
              />
              <small className="priority-text">{task.priority}</small>
            </div>
            {assignee && (
              <div
                className="assignee-avatar rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: "24px", height: "24px", fontSize: "10px" }}
                title={assignee.name}
              >
                {assignee.initials}
              </div>
            )}
          </div>
          {task.dueDate && (
            <small className="due-date text-muted">
              <FaCalendar className="me-1" />
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </small>
          )}
        </Card.Body>
      </Card>
    );
  };

  // Droppable container component for @dnd-kit
  const DroppableColumn = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
      <Card.Body
        ref={setNodeRef}
        className="kanban-body"
        style={{
          minHeight: "400px",
          maxHeight: "600px",
          overflowY: "auto",
          backgroundColor: isOver ? "#f8f9fa" : "transparent",
        }}
      >
        {children}
      </Card.Body>
    );
  };

  // Enhanced KPI calculations for managers
  // Active Projects
  const getActiveProjects = () =>
    projects.filter((p) => p.status === "active").length;

  // Overdue Projects = today > endDate AND not completed
  const getOverdueProjects = () => {
    const today = new Date();
    return projects.filter(
      (p) =>
        p.endDate && new Date(p.endDate) < today && p.status !== "completed"
    ).length;
  };

  // Task Completion %
  const getTaskCompletionRate = () => {
    if (!tasks.length) return 0;
    const completed = tasks.filter((t) => t.status === "done").length;
    return Math.round((completed / tasks.length) * 100);
  };

  // Project Completion %
  const getProjectCompletionRate = () => {
    if (!projects.length) return 0;
    const completed = projects.filter((p) => p.status === "completed").length;
    return Math.round((completed / projects.length) * 100);
  };

  // Resource Utilization %
  const getResourceUtilization = () => {
    const activeTasks = tasks.filter((t) => t.status !== "done");
    if (!activeTasks.length) return 0;
    const assigned = activeTasks.filter((t) => t.assigneeId).length;
    return Math.round((assigned / activeTasks.length) * 100);
  };

  //new insights
  const getResourceAllocation = () => {
    const allocationMap = {};

    tasks.forEach((task) => {
      const emp = EMPLOYEES.find((e) => e.id === task.assigneeId);
      const assigneeName = emp ? emp.name : "Unassigned";
      allocationMap[assigneeName] = (allocationMap[assigneeName] || 0) + 1;
    });

    return {
      labels: Object.keys(allocationMap),
      series: Object.values(allocationMap),
    };
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    const addDays = (days) =>
      new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

    const in7 = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) <= addDays(7)
    ).length;
    const in14 = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) > addDays(7) &&
        new Date(t.dueDate) <= addDays(14)
    ).length;
    const in30 = tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) > addDays(14) &&
        new Date(t.dueDate) <= addDays(30)
    ).length;

    return {
      labels: ["Next 7 days", "Next 14 days", "Next 30 days"],
      series: [in7, in14, in30],
    };
  };

  const getAssigneeWorkload = () => {
    const workloadMap = {};

    tasks.forEach((task) => {
      const emp = EMPLOYEES.find((e) => e.id === task.assigneeId);
      const assigneeName = emp ? emp.name : "Unassigned";
      workloadMap[assigneeName] = (workloadMap[assigneeName] || 0) + 1;
    });

    return {
      labels: Object.keys(workloadMap),
      series: Object.values(workloadMap),
    };
  };

  const handleCreateProject = () => {
    if (!projectForm.name || !projectForm.key || !projectForm.leadId) {
      alert("Please fill in all required fields");
      return;
    }

    const newProjectId = editingProject
      ? editingProject.id
      : Date.now().toString();

    const newProject = {
      id: newProjectId,
      name: projectForm.name,
      key: projectForm.key.toUpperCase(),
      description: projectForm.description,
      status: projectForm.status,
      priority: projectForm.priority,
      leadId: projectForm.leadId,
      startDate: projectForm.startDate,
      endDate: projectForm.endDate,
      teamIds: projectForm.teamIds,
      budget: parseFloat(projectForm.budget) || 0,
      estimatedHours: parseFloat(projectForm.estimatedHours) || 0,
      createdDate: editingProject
        ? editingProject.createdDate
        : new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    if (editingProject) {
      // Update existing project
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? newProject : p))
      );
    } else {
      // Add new project
      setProjects((prev) => [...prev, newProject]);

      // Add suggested tasks mapped with new project ID and status todo
      if (suggestedTasksToAdd.length > 0) {
        const newTasks = suggestedTasksToAdd.map((task, index) => ({
          id: "task_" + Date.now() + "_" + index,
          projectId: newProjectId,
          title: task.name || task.title || "New Task",
          description: task.description || "",
          status: "todo",
          priority: "medium",
          assigneeId: "",
          issueType: "task",
          dueDate: "",
          sprintId: "",
        }));

        setTasks((prev) => [...prev, ...newTasks]);

        // Clear suggested tasks once added
        setSuggestedTasksToAdd([]);
        alert("Suggested project tasks added successfully!");
        if (activeTabKey !== "portfolio") {
          setActiveTabKey("portfolio");
        }
      }
    }

    resetProjectForm();
    setShowProjectModal(false);
    setCurrentSuggested(null);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      key: project.key,
      description: project.description,
      status: project.status,
      priority: project.priority,
      leadId: project.leadId,
      startDate: project.startDate,
      endDate: project.endDate,
      teamIds: project.teamIds,
      budget: project.budget?.toString() || "",
      estimatedHours: project.estimatedHours?.toString() || "",
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = (projectId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? This will also delete all associated tasks."
      )
    ) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setTasks((prev) => prev.filter((t) => t.projectId !== projectId));
      setSprints((prev) => prev.filter((s) => s.projectId !== projectId));
    }
  };

  const handleCreateTask = () => {
    if (!taskForm.title || !taskForm.projectId) {
      alert("Please fill in all required fields");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskForm.title,
      description: taskForm.description,
      priority: taskForm.priority,
      status: taskForm.status,
      issueType: taskForm.issueType,
      assigneeId: taskForm.assigneeId || undefined,
      dueDate: taskForm.dueDate || undefined,
      estimatedHours: parseFloat(taskForm.estimatedHours) || 0,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      projectId: taskForm.projectId,
      sprintId: taskForm.sprintId || undefined,
    };

    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...newTask, id: editingTask.id } : t
        )
      );
    } else {
      setTasks((prev) => [...prev, newTask]);
    }

    resetTaskForm();
    setShowTaskModal(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      issueType: task.issueType,
      assigneeId: task.assigneeId || "",
      dueDate: task.dueDate || "",
      projectId: task.projectId,
      sprintId: task.sprintId || "",
      estimatedHours: task.estimatedHours?.toString() || "",
    });
    setShowTaskModal(true);
  };

  const handleDeleteTask = (taskId) => {
    if (
      window.confirm("Are you sure you want to delete this task permanently?")
    ) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleRemoveTaskFromSprint = (taskId) => {
    if (window.confirm("Remove this task from the current sprint?")) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                sprintId: undefined,
                updatedDate: new Date().toISOString(),
              }
            : task
        )
      );
    }
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              updatedDate: new Date().toISOString(),
            }
          : task
      );

      // Check sprint completion after state update
      setTimeout(() => {
        const task = updatedTasks.find((t) => t.id === taskId);
        if (task?.sprintId && newStatus === "done") {
          checkSprintCompletion(task.sprintId);
        }
      }, 100);

      return updatedTasks;
    });
  };

  const handleCreateSprint = () => {
    if (!sprintForm.name || !sprintForm.projectId) {
      alert("Please fill in all required fields");
      return;
    }

    const newSprint = {
      id: Date.now().toString(),
      name: sprintForm.name,
      goal: sprintForm.goal,
      startDate: sprintForm.startDate,
      endDate: sprintForm.endDate,
      status: "planning",
      projectId: sprintForm.projectId,
    };

    if (editingSprint) {
      setSprints((prev) =>
        prev.map((s) =>
          s.id === editingSprint.id ? { ...newSprint, id: editingSprint.id } : s
        )
      );
    } else {
      setSprints((prev) => [...prev, newSprint]);
    }

    resetSprintForm();
    setShowSprintModal(false);
  };

  const handleEditSprint = (sprint) => {
    setEditingSprint(sprint);
    setSprintForm({
      name: sprint.name,
      goal: sprint.goal,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      projectId: sprint.projectId,
    });
    setShowSprintModal(true);
  };

  const handleDeleteSprint = (sprintId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this sprint? Tasks will be moved back to backlog."
      )
    ) {
      // Remove sprint from tasks
      setTasks((prev) =>
        prev.map((task) =>
          task.sprintId === sprintId ? { ...task, sprintId: undefined } : task
        )
      );
      // Delete sprint
      setSprints((prev) => prev.filter((s) => s.id !== sprintId));

      // Switch to first available sprint
      const remainingSprints = sprints.filter((s) => s.id !== sprintId);
      if (remainingSprints.length > 0 && activeSprintId === sprintId) {
        setActiveSprintId(remainingSprints[0].id);
      }
    }
  };

  const handleCompleteSprintConfirm = () => {
    if (completingSprint) {
      setSprints((prev) =>
        prev.map((sprint) =>
          sprint.id === completingSprint.id
            ? { ...sprint, status: "completed" }
            : sprint
        )
      );
      setShowSprintCompletionModal(false);
      setCompletingSprint(null);
    }
  };

  const handleAddTasksToSprint = () => {
    if (selectedTasksForSprint.length === 0) {
      alert("Please select at least one task");
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        selectedTasksForSprint.includes(task.id)
          ? { ...task, sprintId: activeSprintId }
          : task
      )
    );

    setSelectedTasksForSprint([]);
    setShowAddTaskToSprintModal(false);
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setShowProjectSidebar(true);
  };

  const resetProjectForm = () => {
    setProjectForm({
      name: "",
      key: "",
      description: "",
      status: "planning",
      priority: "medium",
      leadId: "",
      startDate: "",
      endDate: "",
      teamIds: [],
      budget: "",
      estimatedHours: "",
    });
    setEditingProject(null);
  };

  const resetTaskForm = () => {
    setTaskForm({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      issueType: "task",
      assigneeId: "",
      dueDate: "",
      projectId: selectedProject?.id || "",
      sprintId: "",
      estimatedHours: "",
    });
    setEditingTask(null);
  };

  const resetSprintForm = () => {
    setSprintForm({
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
      projectId: "",
    });
    setEditingSprint(null);
  };

  // Chart data functions
  const getTaskDistributionData = () => {
    const totalTasks = tasks.length;
    if (totalTasks === 0)
      return {
        series: [0, 0, 0, 0],
        labels: ["To Do", "In Progress", "Review", "Done"],
      };

    const todoTasks = tasks.filter((t) => t.status === "todo").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "inprogress"
    ).length;
    const reviewTasks = tasks.filter((t) => t.status === "review").length;
    const doneTasks = tasks.filter((t) => t.status === "done").length;

    return {
      series: [todoTasks, inProgressTasks, reviewTasks, doneTasks],
      labels: ["To Do", "In Progress", "Review", "Done"],
    };
  };

  const getProjectStatusData = () => {
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});

    return {
      series: [
        {
          data: Object.values(statusCounts),
        },
      ],
      categories: Object.keys(statusCounts).map(
        (status) =>
          status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
      ),
    };
  };

  const getPriorityDistributionData = () => {
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    return {
      series: Object.values(priorityCounts),
      labels: Object.keys(priorityCounts).map(
        (p) => p.charAt(0).toUpperCase() + p.slice(1)
      ),
    };
  };

  const getSprintProgressData = () => {
    const sprintData = sprints.map((sprint) => {
      const sprintTasks = tasks.filter((t) => t.sprintId === sprint.id);
      const completedTasks = sprintTasks.filter(
        (t) => t.status === "done"
      ).length;
      const progress =
        sprintTasks.length > 0
          ? Math.round((completedTasks / sprintTasks.length) * 100)
          : 0;

      return {
        name: sprint.name,
        progress: progress,
        total: sprintTasks.length,
        completed: completedTasks,
      };
    });

    return {
      series: [
        {
          name: "Progress %",
          data: sprintData.map((s) => s.progress),
        },
      ],
      categories: sprintData.map((s) => s.name),
    };
  };

  const getResourceAllocationData = () => {
    const departmentCounts = EMPLOYEES.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});

    return {
      series: Object.values(departmentCounts),
      labels: Object.keys(departmentCounts),
    };
  };

  const taskDistribution = getTaskDistributionData();
  const projectStatus = getProjectStatusData();
  const priorityDistribution = getPriorityDistributionData();
  const sprintProgress = getSprintProgressData();
  const resourceAllocation = getResourceAllocationData();

  const priorityLabels = ["High", "Medium", "Low"];
  const priorityColors = ["#dc3545", "#d8b752ff", "var(--color-main-light)"];

  const options = {
    chart: { type: "bar" },
    xaxis: { categories: priorityLabels },
    plotOptions: {
      bar: {
        horizontal: true,
        // borderRadius: 4,
        distributed: true, // <-- THIS ENABLES PER-BAR COLORING
      },
    },
    colors: priorityColors, // Each bar will take the color in order!
    dataLabels: { enabled: true },
  };

  const updateProjectStatuses = (projects, tasks) => {
    return projects.map((project) => {
      const projectTasks = tasks.filter((t) => t.projectId === project.id);

      // Default status
      let newStatus = "planning";

      if (projectTasks.length > 0) {
        if (projectTasks.every((t) => t.status === "done")) {
          // ✅ All tasks done → completed
          newStatus = "completed";
        } else if (
          projectTasks.some((t) =>
            ["inprogress", "review", "done"].includes(t.status)
          )
        ) {
          // ✅ At least one task in progress/review/done → active
          newStatus = "active";
        } else {
          // ✅ Only "todo" tasks → planning
          newStatus = "planning";
        }
      }

      return { ...project, status: newStatus };
    });
  };

  useEffect(() => {
    setProjects((prevProjects) => updateProjectStatuses(prevProjects, tasks));
  }, [tasks]);

  // Get tasks for current sprint
  const getSprintTasks = (sprintId) => {
    return tasks.filter((task) => task.sprintId === sprintId);
  };

  // Get available tasks (not assigned to any sprint)
  const getAvailableTasks = () => {
    return tasks.filter((task) => !task.sprintId);
  };
  // Suggested projects example array (replace with your own or fetch dynamically)
  const suggestedProjectss = [
    {
      id: "104",
      name: "Logistics Automation Pilot",
      description: "Automate tracking and reporting for logistics flows.",
      tasks: [
        { id: "401", title: "Map logistics flows" },
        { id: "402", title: "Integrate tracking API" },
      ],
    },
    {
      id: "105",
      name: "Supplier Data Cleanup",
      description: "Clean up supplier records and standardize naming.",
      tasks: [
        { id: "501", title: "Identify duplicates" },
        { id: "502", title: "Standardize categories" },
      ],
    },
  ];

  // Modal control for suggested project tasks popup
  const [showSuggestedModal, setShowSuggestedModal] = useState(false);

  // Stores which suggested project modal is open
  const [currentSuggested, setCurrentSuggested] = useState(null);

  const [suggestedProjects, setSuggestedProjects] = useState([
    {
      projectName: "SAP Concur / Sage - Integration Gaps",
      description:
        "Blocking a supplier in SAP doesn’t reflect in Sage, requiring duplicate updates. Additionally, SAP and Sage lack integration, causing manual extraction, Excel reformatting, and re-entry of data into Sage, creating errors and rework.",
      leanWasteType: "Overprocessing",
      tasks: [
        {
          name: "Explore integration of Canopy with SAP & Sage for synchronized supplier onboarding/offboarding",
          timeline: "Medium-Term Win",
          impact: "High-Impact",
          responsibleTeam: ["Procurement", "Finance"],
        },
        {
          name: "Explore single ERP platform for procure-to-pay eliminating rework",
          timeline: "Long-Term Win",
          impact: "Medium-Impact",
          responsibleTeam: ["Procurement", "Finance"],
        },
      ],
    },
    {
      projectName: "SAP Concur - Configuration Gap",
      description:
        "SAP Concur faces multiple gaps: credit card receipt reminders trigger too early, GL–cost centre combinations are not validated, invoices are submitted without POs, requesters can self-approve with no thresholds, invoices under £500 pass without checks, and PO attachments over £50k are not enforced.",
      leanWasteType: "Defects / Overprocessing",
      tasks: [
        {
          name: "Configure reminders on transaction posting/settlement events (via Concur Professional)",
          timeline: "Medium-Term Win",
          impact: "Low-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Enable GL–CC validation rules in SAP Concur",
          timeline: "Medium-Term Win",
          impact: "High-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Provide requesters with quick-reference GL–CC mapping sheet",
          timeline: "Medium-Term Win",
          impact: "High-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Deploy policy handbook with PO mandate ('No PO, No Pay'), publish on Confluence",
          timeline: "Quick-Win",
          impact: "High-Impact",
          responsibleTeam: ["Procurement", "Finance"],
        },
        {
          name: "Configure SAP to route rejected non-PO invoices back to requesters",
          timeline: "Quick-Win",
          impact: "High-Impact",
          responsibleTeam: ["Procurement", "Finance"],
        },
        {
          name: "Define structured approval workflow with monetary thresholds; configure in SAP",
          timeline: "Medium-Term Win",
          impact: "High-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Conduct periodic sampling of low-value invoices (< £500) and validate against service records",
          timeline: "Quick-Win",
          impact: "Medium-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Introduce control for PO attachments > £50k via SAP Concur Professional",
          timeline: "Medium-Term Win",
          impact: "High-Impact",
          responsibleTeam: ["Finance"],
        },
      ],
    },
    {
      projectName: "SAP Concur - System Constraints",
      description:
        "SAP Concur has rigid system constraints: no read-only roles lead to granting broad access, open POs cannot be closed in bulk, workflows require manual updates when roles change, and there is no test environment to validate changes before going live.",
      leanWasteType: "Overprocessing / Inventory",
      tasks: [
        {
          name: "Check if SAP Concur Professional supports role-based permissions like read-only or department-limited access",
          timeline: "Medium-Term Win",
          impact: "Low-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Establish quarterly PO closure reviews for open POs, highlight POs idle >90 days, Finance reviews for closure",
          timeline: "Medium-Term Win",
          impact: "Medium-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Explore bulk PO closure options or reports/scripts to accelerate cleanup",
          timeline: "Medium-Term Win",
          impact: "Medium-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Explore SAP Concur Professional’s dynamic role-based workflows to reduce manual update effort when roles change",
          timeline: "Medium-Term Win",
          impact: "Medium-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Leverage SAP Concur Professional’s sandbox for safe workflow/config testing",
          timeline: "Medium-Term Win",
          impact: "Low-Impact",
          responsibleTeam: ["Finance"],
        },
      ],
    },
    {
      projectName: "SAP Concur - Lack of Process Awareness",
      description:
        "Approvals often stall in SAP Concur when approvers are absent because delegation is underused. Many users are unaware of the delegate setup feature, leading to idle requests and unnecessary delays.",
      leanWasteType: "Waiting",
      tasks: [
        {
          name: "Update SAP training guide with delegate setup instructions",
          timeline: "Medium-Term Win",
          impact: "High-Impact",
          responsibleTeam: ["Finance"],
        },
        {
          name: "Publish delegate process on Confluence for visibility",
          timeline: "Medium-Term Win",
          impact: "High-Impact",
          responsibleTeam: ["Finance"],
        },
      ],
    },
    {
      projectName: "TravelPerk - Configuration Gap",
      description:
        "TravelPerk lacks configured reminders and escalation for approval delays. Requesters must manually chase managers, and if approvals are not completed in time, requests expire, wasting time and risking higher costs.",
      leanWasteType: "Overprocessing",
      tasks: [
        {
          name: "Configure daily reminders and escalations for pending approvals in TravelPerk",
          timeline: "Medium-Term Win",
          impact: "Low-Impact",
          responsibleTeam: ["TravelPerk Manager"],
        },
        {
          name: "Define SLA (48–72 hours) for travel approvals and embed into expense policy",
          timeline: "Medium-Term Win",
          impact: "Low-Impact",
          responsibleTeam: ["TravelPerk Manager"],
        },
        {
          name: "Publish SLA to Confluence and communicate to managers",
          timeline: "Medium-Term Win",
          impact: "Low-Impact",
          responsibleTeam: ["TravelPerk Manager"],
        },
      ],
    },
  ]);

  const ragColors = {
    Red: "danger",
    Amber: "warning",
    Green: "success",
  };

  const [showModal, setShowModal] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const handleCardClick = (project) => {
    setActiveProject(project);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setActiveProject(null);
  };

  // Store tasks from suggested project selected for integration
  const [suggestedTasksToAdd, setSuggestedTasksToAdd] = useState([]);

  //filters
  const [leanFilter, setLeanFilter] = useState("");
  const [responsibleFilter, setResponsibleFilter] = useState("");

  // Compute distinct filter options
  const leanWasteTypes = Array.from(
    new Set(
      suggestedProjects.flatMap((p) =>
        p.leanWasteType ? p.leanWasteType.split(" / ") : []
      )
    )
  );
  const responsibleTeams = Array.from(
    new Set(
      suggestedProjects.flatMap(
        (p) => p.tasks?.flatMap((t) => t.responsibleTeam || []) || []
      )
    )
  );

  // Filter logic
  const filteredProjects = suggestedProjects.filter((project) => {
    const leanMatch =
      !leanFilter ||
      (project.leanWasteType && project.leanWasteType.includes(leanFilter));
    const responsibleMatch =
      !responsibleFilter ||
      (project.tasks &&
        project.tasks.some((task) =>
          Array.isArray(task.responsibleTeam)
            ? task.responsibleTeam.includes(responsibleFilter)
            : task.responsibleTeam === responsibleFilter
        ));
    return leanMatch && responsibleMatch;
  });

  // Reset handler
  const handleResetFilters = () => {
    setLeanFilter("");
    setResponsibleFilter("");
  };

  //last
  return (
    <div fluid className="project-tracker-main global-font">
      <Tabs
        defaultActiveKey="overview"
        id="main-tabs"
        className="global-tabs"
        style={{
          width: "100%",
        }}
        activeKey={activeTabKey}
        onSelect={(k) => setActiveTabKey(k)}
      >
        {/* Enhanced Overview Tab */}
        <Tab eventKey="overview" title={<>Executive Overview</>}>
          {/* Executive KPI Cards */}
          <Row className="g-2 mt-1">
            <Col md={2} className="d-flex">
              <div className="card border-0 shadow-sm w-100 text-center">
                <div className="card-body p-1">
                  <h3 className="h5 fw-bold mb-1 text-secondary">
                    {projects.length}
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                    Total Projects
                  </p>
                </div>
              </div>
            </Col>

            <Col md={2} className="d-flex">
              <div className="card border-0 shadow-sm w-100 text-center">
                <div className="card-body p-1">
                  <h3 className="h5 fw-bold mb-1 text-primary">
                    {getActiveProjects()}
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                    Active Projects
                  </p>
                </div>
              </div>
            </Col>

            <Col md={2} className="d-flex">
              <div className="card border-0 shadow-sm w-100 text-center">
                <div className="card-body p-1">
                  <h3 className="h5 fw-bold mb-1 text-danger">
                    {getOverdueProjects()}
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                    Overdue Projects
                  </p>
                </div>
              </div>
            </Col>

            <Col md={2} className="d-flex">
              <div className="card border-0 shadow-sm w-100 text-center">
                <div className="card-body p-1">
                  <h3 className="h5 fw-bold mb-1 text-success">
                    {getTaskCompletionRate()}%
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                    Task Completion
                  </p>
                </div>
              </div>
            </Col>

            <Col md={2} className="d-flex">
              <div className="card border-0 shadow-sm w-100 text-center">
                <div className="card-body p-1">
                  <h3 className="h5 fw-bold mb-1 text-info">
                    {getProjectCompletionRate()}%
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                    Project Completion
                  </p>
                </div>
              </div>
            </Col>

            <Col md={2} className="d-flex">
              <div className="card border-0 shadow-sm w-100 text-center">
                <div className="card-body p-1">
                  <h3 className="h5 fw-bold mb-1 text-warning">
                    {getResourceUtilization()}%
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                    Resource Utilization
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {/* Executive Charts */}
          {/* Executive Charts */}
          <Row className="g-2 mt-1">
            <Col md={4}>
              <div className="global-cards chart-card">
                <h5 className="head-theme text-start">Task Distribution</h5>
                <div className="chart-container">
                  <ReactApexChart
                    options={{
                      chart: { type: "pie" },
                      labels: taskDistribution.labels,
                      colors: [
                        "#227c9e",
                        "var(--color-main)",
                        "#ffc857",
                        "#8cbf9e",
                        "var(--color-main-light)",
                        "#f97061",
                      ],
                      legend: { position: "bottom" },
                      dataLabels: {
                        enabled: true,
                        formatter: (val) => Math.round(val) + "%",
                      },
                    }}
                    series={taskDistribution.series}
                    type="pie"
                    height="100%"
                  />
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="global-cards chart-card">
                <h5 className="head-theme text-start">Sprint Progress</h5>
                <div className="chart-container">
                  <ReactApexChart
                    options={{
                      chart: { type: "bar" },
                      xaxis: { categories: sprintProgress.categories },
                      colors: ["var(--color-main)"],
                      plotOptions: {
                        bar: { horizontal: false },
                      },
                      yaxis: {
                        min: 0,
                        max: 100,
                        // title: { text: "Completion %" },
                      },
                      dataLabels: {
                        enabled: true,
                        formatter: (val) => val + "%",
                      },
                    }}
                    series={sprintProgress.series}
                    type="bar"
                    height="100%"
                  />
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="global-cards chart-card">
                <h5 className="head-theme text-start">Resource Allocation</h5>
                <div className="chart-container">
                  <ReactApexChart
                    options={{
                      chart: { type: "donut" },
                      labels: getResourceAllocation().labels,
                      colors: [
                        "#227c9e",
                        "var(--color-main)",
                        "#ffc857",
                        "#f97061",
                        "#8cbf9e",
                        "var(--color-main-light)",
                      ],
                      legend: { position: "bottom" },
                      dataLabels: {
                        enabled: true,
                        formatter: (val) => Math.round(val) + "%",
                      },
                    }}
                    series={getResourceAllocation().series}
                    type="donut"
                    height="100%"
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="g-2 mt-1">
            <Col md={4}>
              <div className="global-cards chart-card">
                <h5 className="head-theme text-start">Priority Distribution</h5>
                <div className="chart-container">
                  <ReactApexChart
                    options={options}
                    series={[{ name: "Tasks", data: [4, 3, 2] }]}
                    type="bar"
                    height="100%"
                  />
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="global-cards chart-card">
                <h5 className="head-theme text-start">Upcoming Deadlines</h5>
                <div className="chart-container">
                  <ReactApexChart
                    options={{
                      chart: { type: "bar" },
                      xaxis: { categories: getUpcomingDeadlines().labels },
                      colors: [
                        "#227c9e",
                        "var(--color-main)",
                        "#ffc857",
                        "#f97061",
                        "#8cbf9e",
                        "var(--color-main-light)",
                      ],
                      dataLabels: { enabled: true },
                    }}
                    series={[
                      { name: "Tasks", data: getUpcomingDeadlines().series },
                    ]}
                    type="bar"
                    height="100%"
                  />
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="global-cards chart-card">
                <h5 className="head-theme text-start">
                  Assignee Workload (Top 5)
                </h5>
                <div className="chart-container">
                  <ReactApexChart
                    options={{
                      chart: { type: "bar" },
                      xaxis: { categories: getAssigneeWorkload().labels },
                      colors: [
                        "var(--color-main-light)",
                        "#227c9e",
                        "var(--color-main)",
                        "#ffc857",
                        "#f97061",
                        "#8cbf9e",
                      ],
                      plotOptions: {
                        bar: { horizontal: true },
                      },
                      dataLabels: { enabled: true },
                    }}
                    series={[
                      { name: "Tasks", data: getAssigneeWorkload().series },
                    ]}
                    type="bar"
                    height="100%"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Tab>

        {/* Portfolio Tab */}
        <Tab
          eventKey="portfolio"
          className="text-start global-font"
          title={<>Portfolio</>}
        >
          <div className="mb-3 d-flex justify-content-end">
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: "#0d9488",
                borderColor: "#0d9488",
                color: "white",
                fontSize: "12px",
              }}
              onClick={() => setShowProjectModal(true)}
            >
              <FaPlus className="me-2" />
              Add Project
            </button>
          </div>

          <Row>
            <p
              style={{
                color: "var(--color-main)",
                fontSize: "15px",
                fontWeight: 500,
                margin: 0,
                paddingLeft: "20px",
                marginBottom: "10px",
              }}
            >
              Projects List
            </p>
            {projects.map((project) => {
              const lead = getEmployeeById(project.leadId);
              return (
                <Col md={6} lg={4} key={project.id} className="mb-4">
                  <div
                    className="global-cards h-100 p-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          className="me-2"
                          style={{
                            backgroundColor: getStatusBadgeVariant(
                              project.status
                            ),
                            color: "white",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "13px",
                            border:
                              "2px solid getStatusBadgeVariant(project.status)",
                            fontWeight: 500,
                          }}
                        >
                          {project.status}
                        </div>
                        <div
                          style={{
                            backgroundColor: "white",
                            border: "2px solid var(--color-main)",
                            color: "var(--color-main)",
                            padding: "0px 8px",
                            borderRadius: "12px",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {project.key}
                        </div>
                      </div>

                      <Dropdown>
                        {/* <FaFolderOpen
                          onClick={() => openProjectDetails(project)}
                          className="me-3"
                          style={{ fontSize: "18px", cursor: "pointer" }}
                        /> */}
                        <Dropdown.Toggle
                          as="button" // render as a normal button
                          variant="light" // clean style
                          size="sm"
                          className="border-0 bg-transparent shadow-none p-0"
                          bsPrefix="dropdown-toggle-no-caret" // custom class to suppress caret
                        >
                          <FaEllipsisV />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {/* <Dropdown.Item
                            onClick={() => openProjectDetails(project)}
                          >
                            <FaTasks className="me-2" /> View Details
                          </Dropdown.Item> */}
                          <Dropdown.Item
                            onClick={() => handleEditProject(project)}
                          >
                            <FaEdit className="me-2" /> Edit
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-danger"
                          >
                            <FaTrash className="me-2" /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="global-font">
                      <h5
                        className=" mb-0 head-theme text-start pt-1 mb-1"
                        style={{ fontSize: "20px" }}
                      >
                        {project.name}
                      </h5>
                      <h5 className="project-description global-font">
                        {project.description.slice(0, 170)}...
                      </h5>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="progress-label">Progress</span>
                          <span className="progress-value">
                            {calculateProjectProgress(project.id)}%
                          </span>
                        </div>
                        <ProgressBar
                          now={calculateProjectProgress(project.id)}
                        />
                      </div>
                      <div className="d-flex justify-content-between text-muted">
                        <small className="project-meta">
                          <FaUser className="me-1" />
                          {lead?.name || "Unknown"}
                        </small>
                        <small className="project-meta">
                          <FaUsers className="me-1" />
                          {project.teamIds.length} members
                        </small>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Tab>

        {/* Enhanced Kanban Tab */}
        <Tab
          eventKey="kanban"
          className="global-font text-start"
          title={<>Sprint Board</>}
        >
          <div className="mb-3 d-flex justify-content-end gap-2 global-font">
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: "#0d9488",
                borderColor: "#0d9488",
                color: "white",
                fontSize: "12px",
              }}
              onClick={() => setShowSprintModal(true)}
            >
              <FaPlus className="me-2" />
              Create Sprint
            </button>
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: "#0d9488",
                borderColor: "#0d9488",
                color: "white",
                fontSize: "12px",
              }}
              onClick={() => setShowTaskModal(true)}
            >
              <FaPlus className="me-2" />
              Add Task
            </button>
          </div>

          {/* Sprint Tabs */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Tabs
              activeKey={activeSprintId}
              onSelect={(k) => k && setActiveSprintId(k)}
              className="global-tabs mb-3 "
              style={{
                width: "100%",
              }}
            >
              {sprints.map((sprint) => (
                <Tab
                  className="global-font"
                  key={sprint.id}
                  eventKey={sprint.id}
                  title={
                    <span
                      className={
                        sprint.status === "completed" &&
                        activeSprintId === sprint.id
                          ? "text-white sprint-completed"
                          : sprint.status === "completed"
                          ? "text-success sprint-completed"
                          : ""
                      }
                    >
                      {sprint.name}
                      <Badge
                        bg={getStatusBadgeVariant(sprint.status)}
                        className="ms-2"
                      >
                        {getSprintTasks(sprint.id).length}
                      </Badge>
                      {sprint.status === "completed" && (
                        <FaCheckCircle
                          className="ms-1"
                          style={{
                            color:
                              activeSprintId === sprint.id
                                ? "white"
                                : undefined,
                          }}
                        />
                      )}
                    </span>
                  }
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="sprint-title">
                        {sprint.name}
                        {sprint.status === "completed" && (
                          <Badge bg="success" size="sm" className="ms-2">
                            Completed
                          </Badge>
                        )}
                      </h4>
                      <p className="sprint-goal text-muted mb-0">
                        {sprint.goal}
                      </p>
                    </div>
                    <div>
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          backgroundColor: "#0d9488",
                          borderColor: "#0d9488",
                          color: "white",
                          fontSize: "12px",
                        }}
                        onClick={() => setShowAddTaskToSprintModal(true)}
                      >
                        <FaPlus className="me-1" />
                        Add Task
                      </button>

                      <Dropdown className="d-inline">
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          size="sm"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleEditSprint(sprint)}
                          >
                            <FaEdit className="me-2" />
                            Edit Sprint
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDeleteSprint(sprint.id)}
                            className="text-danger"
                          >
                            <FaTrash className="me-2" />
                            Delete Sprint
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  <Row>
                    {["todo", "inprogress", "review", "done"].map((status) => (
                      <Col md={3} key={`${sprint.id}-${status}-col`}>
                        <Card className="kanban-column mb-4">
                          <Card.Header className="kanban-header">
                            <div className="d-flex justify-content-between">
                              <strong className="column-title">
                                {status === "inprogress"
                                  ? "In Progress"
                                  : status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                              </strong>
                              <Badge bg="secondary" className="task-count">
                                {
                                  getSprintTasks(sprint.id).filter(
                                    (t) => t.status === status
                                  ).length
                                }
                              </Badge>
                            </div>
                          </Card.Header>
                          <DroppableColumn id={`${sprint.id}-${status}`}>
                            {getSprintTasks(sprint.id)
                              .filter((task) => task.status === status)
                              .map((task) => (
                                <DraggableTaskItem key={task.id} task={task} />
                              ))}
                            {getSprintTasks(sprint.id).filter(
                              (t) => t.status === status
                            ).length === 0 && (
                              <div className="empty-column text-center text-muted py-4">
                                <p className="empty-text">No tasks</p>
                              </div>
                            )}
                          </DroppableColumn>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Tab>
              ))}
            </Tabs>
            <DragOverlay>
              {activeId ? (
                <DraggableTaskItem
                  task={tasks.find((t) => t.id === activeId)}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </Tab>

        {/* New Suggested Projects Tab last */}
        <Tab eventKey="suggested" title="Suggested Projects">
          <div
            className="suggested-projects-container"
            style={{ padding: "1rem" }}
          >
            <Row className="mb-3" style={{ alignItems: "center", gap: 0 }}>
              {/* Filter Icon */}
              <Col
                xs="auto"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: 0,
                }}
              >
                <FaFilter
                  style={{
                    fontSize: 18,
                    color: "var(--color-main)",
                    marginLeft: "10px",
                  }}
                />
              </Col>

              {/* Lean Waste Type dropdown */}
              <Col xs="auto" style={{ paddingLeft: 20, paddingRight: 0 }}>
                <Form.Select
                  value={leanFilter}
                  onChange={(e) => setLeanFilter(e.target.value)}
                  size="sm"
                  style={{ minWidth: 180, fontSize: 13 }}
                >
                  <option value="">All Lean Waste Types</option>
                  {leanWasteTypes.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              {/* Responsible dropdown */}
              <Col xs="auto" style={{ paddingLeft: 10, paddingRight: 0 }}>
                <Form.Select
                  value={responsibleFilter}
                  onChange={(e) => setResponsibleFilter(e.target.value)}
                  size="sm"
                  style={{ minWidth: 160, fontSize: 13 }}
                >
                  <option value="">All Responsible</option>
                  {responsibleTeams.map((team) => (
                    <option value={team} key={team}>
                      {team}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              {/* Reset Button right after inputs */}
              <Col xs="auto" style={{ paddingLeft: 10 }}>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  style={{ fontSize: 13, padding: "6px", marginLeft: "10px" }}
                  onClick={handleResetFilters}
                >
                  Reset
                </Button>
              </Col>
            </Row>

            <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-4">
              {filteredProjects.length === 0 ? (
                <Col>
                  <p>No suggested projects available.</p>
                </Col>
              ) : (
                filteredProjects.map((project) => {
                  const ragVariant =
                    ragColors[project.ragStatus] || "secondary";
                  const allResponsibleTeams = Array.from(
                    new Set(
                      (project.tasks || []).flatMap(
                        (task) => task.responsibleTeam || []
                      )
                    )
                  );

                  return (
                    <Col key={project.id}>
                      <Card
                        className="shadow-sm suggested-project-card h-100"
                        style={{
                          cursor: "pointer",
                          borderRadius: 10,
                          minHeight: 170,
                          textAlign: "left",
                        }}
                        onClick={() => handleCardClick(project)}
                      >
                        <Card.Body style={{ padding: "1rem 1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              textAlign: "left",
                            }}
                          >
                            <h5
                              style={{
                                fontWeight: 600,
                                fontSize: 20,
                                color: "var(--color-main)",
                                margin: 0,
                                flexGrow: 1,
                                textAlign: "left",
                              }}
                            >
                              {project.projectName}
                            </h5>
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                                alignItems: "center",
                              }}
                            >
                              {project.ragStatus && (
                                <Badge
                                  pill
                                  bg={ragVariant}
                                  style={{
                                    fontSize: 12,
                                    padding: "5px",
                                    minWidth: 50,
                                    textAlign: "center",
                                  }}
                                >
                                  {project.ragStatus}
                                </Badge>
                              )}
                              <div
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: 16,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  background: "var(--color-main-light)",
                                  color: "#fff",
                                  userSelect: "none",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {project.leanWasteType}
                              </div>
                            </div>
                          </div>
                          <div
                            className="project-description mt-2"
                            style={{
                              fontSize: 13,
                              color: "#5A5A5A",
                              marginTop: 10,
                              minHeight: 40,
                              lineHeight: 1.3,
                              textAlign: "left",
                            }}
                          >
                            {project.description}
                          </div>
                          <div
                            style={{
                              marginTop: 8,
                              display: "flex",
                              gap: 6,
                              flexWrap: "wrap",
                            }}
                          >
                            {allResponsibleTeams.length > 0 && (
                              <>
                                <span
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: "#196683",
                                    marginRight: 8,
                                  }}
                                >
                                  Responsible:
                                </span>
                                {allResponsibleTeams.map((team) => (
                                  <div
                                    key={team}
                                    style={{
                                      padding: "3px 10px",
                                      borderRadius: 16,
                                      fontSize: 12,
                                      fontWeight: 600,
                                      color: "var(--color-main)",
                                      border: "1.5px solid var(--color-main)",
                                      backgroundColor: "#fff",
                                      userSelect: "none",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {team}
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>

            {/* Project Tasks Modal */}
            <Modal
              show={showModal}
              onHide={handleClose}
              size="lg"
              centered
              dialogClassName="rounded-modal"
            >
              <Modal.Header
                closeButton
                style={{ border: "none", paddingBottom: 0 }}
              >
                <Modal.Title
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#203E5F",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  {activeProject ? activeProject.projectName : ""}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  padding: "1.5rem",
                  background: "#FAFAFA",
                  borderRadius: "0 0 1rem 1rem",
                }}
              >
                {activeProject &&
                activeProject.tasks &&
                activeProject.tasks.length > 0 ? (
                  <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    responsive
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 2px 10px rgba(32,62,95,0.04)",
                      marginBottom: 0,
                    }}
                  >
                    <thead>
                      <tr style={{ background: "#F3F6FA" }}>
                        <th
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#203E5F",
                            borderTopLeftRadius: 8,
                          }}
                        >
                          Task Name
                        </th>
                        <th
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#203E5F",
                          }}
                        >
                          Timeline
                        </th>
                        <th
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#203E5F",
                          }}
                        >
                          Impact
                        </th>
                        <th
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#203E5F",
                            borderTopRightRadius: 8,
                          }}
                        >
                          Responsible Team
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeProject.tasks.map((task, idx) => {
                        // Impact color logic
                        let impactColor = "#45B36B"; // default low = green
                        if (task.impact.toLowerCase().includes("high"))
                          impactColor = "#D63333"; // red
                        else if (task.impact.toLowerCase().includes("medium"))
                          impactColor = "#E6A23C"; // yellow

                        // Timeline color logic
                        let timelineColor = "#45B36B"; // default quick-win = green
                        if (task.timeline.toLowerCase().includes("long"))
                          timelineColor = "#D63333"; // red
                        else if (task.timeline.toLowerCase().includes("medium"))
                          timelineColor = "#E6A23C"; // yellow

                        return (
                          <tr key={idx} style={{ verticalAlign: "middle" }}>
                            <td
                              style={{
                                fontSize: 13,
                                color: "#34495E",
                                maxWidth: 280,
                              }}
                            >
                              {task.name}
                            </td>
                            <td
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: timelineColor,
                              }}
                            >
                              {task.timeline}
                            </td>
                            <td
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: impactColor,
                              }}
                            >
                              {task.impact}
                            </td>
                            <td style={{ fontSize: 13, color: "#6B7280" }}>
                              {task.responsibleTeam.join(", ")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <p style={{ color: "#888", fontSize: 14, marginBottom: 0 }}>
                    No tasks available for this project.
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer
                style={{
                  border: "none",
                  justifyContent: "flex-end",
                  paddingTop: 0,
                }}
              >
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowSuggestedModal(false);

                    // Prefill Add Project form modal with suggested data
                    setProjectForm((prev) => ({
                      ...prev,
                      name: activeProject?.projectName || "",
                      description: activeProject?.description || "",
                      // Also prefill other fields as needed
                    }));

                    // Save suggested tasks to add later on form submit
                    setSuggestedTasksToAdd(activeProject?.tasks || []);

                    setShowProjectModal(true);
                  }}
                  className="btn-theme"
                  style={{
                    backgroundColor: "#0d9488",
                    borderColor: "#0d9488",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  Apply
                </Button>

                <Button
                  variant="outline-primary"
                  style={{
                    borderColor: "#0d9488",
                    color: "#0d9488",
                    background: "white",
                    fontSize: "12px",
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Tab>
      </Tabs>

      {/* All Modals - keeping them from previous version but with improved styling */}
      {/* Project Modal */}
      <Modal
        className="global-font"
        show={showProjectModal}
        onHide={() => {
          setShowProjectModal(false);
          resetProjectForm();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <h5
            className=" mb-0 head-theme text-start pt-1"
            style={{ fontSize: "20px" }}
          >
            {editingProject ? "Edit Project" : "Create New Project"}
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4 py-0">
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Project Name *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="global-font"
                    value={projectForm.name}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, name: e.target.value })
                    }
                    placeholder="Enter project name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Project Key *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="global-font"
                    value={projectForm.key}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        key: e.target.value.toUpperCase(),
                      })
                    }
                    // placeholder="PROJ"
                    maxLength={10}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                className="global-font"
                rows={3}
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                placeholder="Describe your project..."
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Status
                  </Form.Label>
                  <Form.Select
                    className="global-font"
                    value={projectForm.status}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, status: e.target.value })
                    }
                  >
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Priority
                  </Form.Label>
                  <Form.Select
                    className="global-font"
                    value={projectForm.priority}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Project Lead *
                  </Form.Label>
                  <Form.Select
                    className="global-font"
                    value={projectForm.leadId}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, leadId: e.target.value })
                    }
                    required
                  >
                    <option value="">Select project lead</option>
                    {EMPLOYEES.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} - {employee.role}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Estimated Hours
                  </Form.Label>
                  <Form.Control
                    className="global-font"
                    type="number"
                    value={projectForm.estimatedHours}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        estimatedHours: e.target.value,
                      })
                    }
                    placeholder="2000"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Start Date
                  </Form.Label>
                  <Form.Control
                    className="global-font"
                    type="date"
                    value={projectForm.startDate}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        startDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    End Date
                  </Form.Label>
                  <Form.Control
                    className="global-font"
                    type="date"
                    value={projectForm.endDate}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        endDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "white", // outline effect (no fill)
              borderColor: "#0d9488", // teal border
              color: "#0d9488", // teal text
              fontSize: "12px",
              borderWidth: "1px", // ensure border is visible
            }}
            onClick={() => {
              setShowProjectModal(false);
              resetProjectForm();
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#0d9488",
              borderColor: "#0d9488",
              color: "white",
              fontSize: "12px",
            }}
            onClick={handleCreateProject}
          >
            {editingProject ? "Update Project" : "Create Project"}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Task Modal */}
      <Modal
        show={showTaskModal}
        onHide={() => {
          setShowTaskModal(false);
          resetTaskForm();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <h5 className="head-theme text-start" style={{ fontSize: "20px" }}>
            {editingTask ? "Edit Task" : "Create New Task"}
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4 py-0">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Summary *
              </Form.Label>
              <Form.Control
                className="global-font"
                type="text"
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, title: e.target.value })
                }
                placeholder="Brief description of the task"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Description
              </Form.Label>
              <Form.Control
                className="global-font"
                as="textarea"
                rows={3}
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
                placeholder="Detailed description of the task..."
              />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Issue Type
                  </Form.Label>
                  <Form.Select
                    className="global-font"
                    value={taskForm.issueType}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, issueType: e.target.value })
                    }
                  >
                    <option value="story">Story</option>
                    <option value="task">Task</option>
                    <option value="bug">Bug</option>
                    <option value="epic">Epic</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Priority
                  </Form.Label>
                  <Form.Select
                    className="global-font"
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, priority: e.target.value })
                    }
                  >
                    <option value="lowest ">Lowest</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="highest">Highest</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Status
                  </Form.Label>
                  <Form.Select
                    className="global-font"
                    value={taskForm.status}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, status: e.target.value })
                    }
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Done</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Project *
              </Form.Label>
              <Form.Select
                className="global-font"
                value={taskForm.projectId}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, projectId: e.target.value })
                }
                required
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.key} - {project.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Assignee
              </Form.Label>
              <Form.Select
                className="global-font"
                value={taskForm.assigneeId}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, assigneeId: e.target.value })
                }
              >
                <option value="">Select assignee</option>
                {EMPLOYEES.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.role}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Due Date
                  </Form.Label>
                  <Form.Control
                    className="global-font"
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, dueDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Estimated Hours
                  </Form.Label>
                  <Form.Control
                    className="global-font"
                    type="number"
                    value={taskForm.estimatedHours}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        estimatedHours: e.target.value,
                      })
                    }
                    placeholder="8"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Sprint
              </Form.Label>
              <Form.Select
                className="global-font"
                value={taskForm.sprintId}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, sprintId: e.target.value })
                }
              >
                <option value="">No Sprint</option>
                {sprints
                  .filter((s) => s.projectId === taskForm.projectId)
                  .map((sprint) => (
                    <option key={sprint.id} value={sprint.id}>
                      {sprint.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            style={{
              backgroundColor: "white", // outline effect (no fill)
              borderColor: "#0d9488", // teal border
              color: "#0d9488", // teal text
              fontSize: "12px",
              borderWidth: "1px", // ensure border is visible
            }}
            onClick={() => {
              setShowTaskModal(false);
              resetTaskForm();
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-sm"
            style={{
              backgroundColor: "#0d9488",
              borderColor: "#0d9488",
              color: "white",
              fontSize: "12px",
            }}
            onClick={handleCreateTask}
          >
            {editingTask ? "Update Task" : "Create Task"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sprint Modal */}
      <Modal
        show={showSprintModal}
        onHide={() => {
          setShowSprintModal(false);
          resetSprintForm();
        }}
      >
        <Modal.Header closeButton>
          <h5 className="head-theme text-start " style={{ fontSize: "20px" }}>
            {editingSprint ? "Edit Sprint" : "Create New Sprint"}
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4 py-0">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Sprint Name *
              </Form.Label>
              <Form.Control
                className="global-font"
                type="text"
                value={sprintForm.name}
                onChange={(e) =>
                  setSprintForm({ ...sprintForm, name: e.target.value })
                }
                placeholder="Sprint 1"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Sprint Goal
              </Form.Label>
              <Form.Control
                className="global-font"
                as="textarea"
                rows={2}
                value={sprintForm.goal}
                onChange={(e) =>
                  setSprintForm({ ...sprintForm, goal: e.target.value })
                }
                placeholder="What do you want to achieve in this sprint?"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label-project global-font">
                Project *
              </Form.Label>
              <Form.Select
                className="global-font"
                value={sprintForm.projectId}
                onChange={(e) =>
                  setSprintForm({ ...sprintForm, projectId: e.target.value })
                }
                required
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.key} - {project.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    Start Date
                  </Form.Label>
                  <Form.Control
                    className="global-font"
                    type="date"
                    value={sprintForm.startDate}
                    onChange={(e) =>
                      setSprintForm({
                        ...sprintForm,
                        startDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-project global-font">
                    End Date
                  </Form.Label>
                  <Form.Control
                    className="global-font"
                    type="date"
                    value={sprintForm.endDate}
                    onChange={(e) =>
                      setSprintForm({ ...sprintForm, endDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn btn-sm"
            style={{
              backgroundColor: "white", // outline effect (no fill)
              borderColor: "#0d9488", // teal border
              color: "#0d9488", // teal text
              fontSize: "12px",
              borderWidth: "1px", // ensure border is visible
            }}
            onClick={() => {
              setShowSprintModal(false);
              resetSprintForm();
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-sm"
            style={{
              backgroundColor: "#0d9488",
              borderColor: "#0d9488",
              color: "white",
              fontSize: "12px",
            }}
            onClick={handleCreateSprint}
          >
            {editingSprint ? "Update Sprint" : "Create Sprint"}
          </Button>
        </div>
      </Modal>

      {/* Sprint Completion Modal */}
      <Modal
        show={showSprintCompletionModal}
        onHide={() => setShowSprintCompletionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <FaTrophy className="text-warning me-2" />
            Sprint Complete!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            <FaCheckCircle className="me-2" />
            Congratulations! All tasks in{" "}
            <strong>{completingSprint?.name}</strong> have been completed.
          </Alert>
          <p className="modal-text">
            Would you like to mark this sprint as completed?
          </p>
          <p className="modal-subtext text-muted">
            This will move the sprint to completed status and display it with a
            green indicator.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSprintCompletionModal(false)}
          >
            Not Now
          </Button>
          <Button variant="success" onClick={handleCompleteSprintConfirm}>
            <FaTrophy className="me-1" />
            Mark as Completed
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Tasks to Sprint Modal */}
      <Modal
        show={showAddTaskToSprintModal}
        onHide={() => setShowAddTaskToSprintModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <h5 className="head-theme text-start " style={{ fontSize: "20px" }}>
            Add Tasks to Sprint
          </h5>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-muted">
            Select tasks from available projects to add to the current sprint:
          </p>
          {projects.length === 0 ? (
            <p className="text-center text-muted">
              No projects available. Create a project first.
            </p>
          ) : (
            projects.map((project) => {
              const projectTasks = getAvailableTasks().filter(
                (task) => task.projectId === project.id
              );
              if (projectTasks.length === 0) return null;

              return (
                <div key={project.id} className="mb-4">
                  <h6 className="project-section-title mb-3">
                    <FaProjectDiagram className="me-2" />
                    {project.key} - {project.name}
                  </h6>
                  {projectTasks.map((task) => {
                    const assignee = task.assigneeId
                      ? getEmployeeById(task.assigneeId)
                      : null;
                    return (
                      <div key={task.id} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={task.id}
                          id={`task-${task.id}`}
                          checked={selectedTasksForSprint.includes(task.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTasksForSprint((prev) => [
                                ...prev,
                                task.id,
                              ]);
                            } else {
                              setSelectedTasksForSprint((prev) =>
                                prev.filter((id) => id !== task.id)
                              );
                            }
                          }}
                        />
                        <label
                          className="form-check-label d-flex justify-content-between align-items-center w-100"
                          htmlFor={`task-${task.id}`}
                        >
                          <div>
                            <Badge
                              bg={
                                task.issueType === "bug"
                                  ? "danger"
                                  : task.issueType === "story"
                                  ? "success"
                                  : "primary"
                              }
                              className="me-2"
                            >
                              {task.issueType.toUpperCase()}
                            </Badge>
                            <strong className="task-check-title">
                              {task.title}
                            </strong>
                            {task.description && (
                              <div className="task-check-description">
                                {task.description}
                              </div>
                            )}
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <Badge variant="outline-secondary">
                              {task.priority}
                            </Badge>
                            {assignee && (
                              <span className="task-check-assignee">
                                Assignee: {assignee.name}
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
          {getAvailableTasks().length === 0 && (
            <p className="text-center text-muted">
              No available tasks found. All tasks are already assigned to
              sprints or no tasks exist.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "white", // outline effect (no fill)
              borderColor: "#0d9488", // teal border
              color: "#0d9488", // teal text
              fontSize: "12px",
              borderWidth: "1px", // ensure border is visible
            }}
            onClick={() => setShowAddTaskToSprintModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#0d9488",
              borderColor: "#0d9488",
              color: "white",
              fontSize: "12px",
            }}
            onClick={handleAddTasksToSprint}
            disabled={selectedTasksForSprint.length === 0}
          >
            Add {selectedTasksForSprint.length} Tasks to Sprint
          </button>
        </Modal.Footer>
      </Modal>

      {/* Project Details Sidebar */}
      <Offcanvas
        show={showProjectSidebar}
        onHide={() => setShowProjectSidebar(false)}
        placement="end"
        style={{ width: "600px" }}
        className="global-font"
      >
        <Offcanvas.Header closeButton>
          <h5 className="head-theme text-start" style={{ fontSize: "20px" }}>
            {selectedProject?.name} ({selectedProject?.key})
          </h5>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4">
          {selectedProject && (
            <>
              <div className="mb-4 global-font">
                <p className="sidebar-description mb-2">
                  {selectedProject.description}
                </p>
                <div className="d-flex gap-2 mb-3">
                  <Badge bg={getStatusBadgeVariant(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                  <Badge bg="outline-secondary">
                    {selectedProject.priority} priority
                  </Badge>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Progress</span>
                    <span className="progress-value">
                      {calculateProjectProgress(selectedProject.id)}%
                    </span>
                  </div>
                  <ProgressBar
                    now={calculateProjectProgress(selectedProject.id)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5
                  className=" mb-0 head-theme text-start pt-1"
                  style={{ fontSize: "16px" }}
                >
                  Tasks
                </h5>
                <Button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#0d9488",
                    borderColor: "#0d9488",
                    color: "white",
                    fontSize: "12px",
                  }}
                  onClick={() => {
                    setTaskForm((prev) => ({
                      ...prev,
                      projectId: selectedProject.id,
                    }));
                    setShowTaskModal(true);
                  }}
                >
                  <FaPlus className="me-1" />
                  Add Task
                </Button>
              </div>
              <ListGroup>
                {tasks
                  .filter((task) => task.projectId === selectedProject.id)
                  .map((task) => {
                    const assignee = task.assigneeId
                      ? getEmployeeById(task.assigneeId)
                      : null;

                    return (
                      <ListGroup.Item
                        key={task.id}
                        className="sidebar-task-item"
                      >
                        <div className="d-flex justify-content-between align-items-start w-100">
                          {/* Left Section: Task Details */}
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-2">
                              <Badge
                                bg={
                                  task.issueType === "bug"
                                    ? "danger"
                                    : task.issueType === "story"
                                    ? "success"
                                    : "primary"
                                }
                                className="me-2"
                                style={{ fontSize: "10px" }}
                              >
                                {task.issueType.toUpperCase()}
                              </Badge>
                              <strong className="sidebar-task-title">
                                {task.title}
                              </strong>
                            </div>

                            {task.description && (
                              <p className="sidebar-task-description mb-1">
                                {task.description}
                              </p>
                            )}

                            <div className="d-flex align-items-center gap-3">
                              {/* Status Dropdown */}
                              <Form.Select
                                size="sm"
                                className="status-select"
                                value={task.status}
                                onChange={(e) =>
                                  handleTaskStatusChange(
                                    task.id,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="todo">To Do</option>
                                <option value="inprogress">In Progress</option>
                                <option value="review">In Review</option>
                                <option value="done">Done</option>
                              </Form.Select>

                              {/* Priority */}
                              <div className="d-flex align-items-center">
                                <FaFlag
                                  color={getPriorityColor(task.priority)}
                                  className="me-1"
                                  size={12}
                                />
                                <small className="priority-text">
                                  {task.priority}
                                </small>
                              </div>

                              {/* Assignee */}
                              {assignee && (
                                <div className="d-flex align-items-center">
                                  <div className="sidebar-avatar me-1">
                                    {assignee.initials}
                                  </div>
                                  <small className="assignee-name">
                                    {assignee.name}
                                  </small>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Section: Actions */}
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              variant="link"
                              size="sm"
                              className="text-decoration-none"
                            >
                              <FaEllipsisV />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => handleEditTask(task)}
                              >
                                <FaEdit className="me-2" />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-danger"
                              >
                                <FaTrash className="me-2" />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </ListGroup.Item>
                    );
                  })}

                {tasks.filter((task) => task.projectId === selectedProject.id)
                  .length === 0 && (
                  <ListGroup.Item className="text-center text-muted">
                    <p className="empty-text">
                      No tasks yet. Create your first task!
                    </p>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProjectTrackerFile;
