import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
// import "./Components/Helper/css/Sidenav.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "universal-cookie";
import { setPlatformColors } from "./Components/Helper/Constants/colors";
import Loading from "./Components/Helper/Loading";
import CommodityIntelligenceNew from "./Components/Pages/Commodity/CommodityIntelligenceNew.js";
import CategoryLandingPage from "./Components/Pages/Category/CategoryLandingPage.js";
import ProjectTrackerFile from "./Components/Pages/ChangeManagement/ProjectTrackerFile.js";
import CoursePlayer from "./Components/Pages/KnowledgeAndLearningHub/HelperComponents/CoursePlayer.js";
import DocumentViewer from "./Components/Pages/KnowledgeAndLearningHub/HelperComponents/DocumentViewer.js";
import KnowledgeHubProcessTransformation from "./Components/Pages/KnowledgeAndLearningHub/Tabs/KnowledgeHubProcessTransformation.js";
import DiagramViewer from "./Components/Pages/KnowledgeAndLearningHub/HelperComponents/DiagramViewer.js";

// Category & Commodity Intelligence
const CommodityLanding = lazy(() =>
  import("./Components/Pages/Commodity/CommodityLanding.js")
);

// Helper Components
const MenuNavbar = lazy(() => import("./Components/Helper/Navbar"));
const Sidenavbar = lazy(() => import("./Components/Helper/Sidenav"));
const HelpDeskPopUp = lazy(() => import("./Components/Helper/HelpDesk"));

// const ProjectManager = lazy(() =>
//   import("./Components/Pages/ProjectManager/ProjectManager.js")
// );

const ImpactAnalysis = lazy(() =>
  import("./Components/Pages/Spend/NewDashSpend.js")
);

const PartClassifier = lazy(() =>
  import("./Components/Pages/Part Classification/PartClassifier.js")
);
// Authentication
const Login = lazy(() => import("./Components/Pages/Login/Login"));

// Dashboard
const Dashboard = lazy(() => import("./Components/Pages/Dashboard/Dashboard"));
const SpendDashboard = lazy(() =>
  import("./Components/Pages/Spend/SpendDashboard")
);
const SupplierRisk = lazy(() =>
  import("./Components/Pages/Supplier/SupplierRisk.js")
);
const SupplierPerformance = lazy(() =>
  import("./Components/Pages/Supplier/SupplierPerformance.js")
);
const SavingDashboard = lazy(() =>
  import("./Components/Pages/Saving/SavingDashboard")
);

// Spend & Saving
const SpendData = lazy(() => import("./Components/Pages/Spend/SpendData"));
const SavingData = lazy(() => import("./Components/Pages/Saving/SavingData"));
const SpendOverview = lazy(() =>
  import("./Components/Pages/Spend/SpendOverview")
);
const SavingOverView = lazy(() =>
  import("./Components/Pages/Saving/SavingOverview")
);
const SavingTracker = lazy(() =>
  import("./Components/Pages/Saving/SavingTracker")
);

// Category & Action Trees
const CategoryTree = lazy(() =>
  import("./Components/Pages/CategoryTree/CategoryTree")
);
const ActionTree = lazy(() =>
  import("./Components/Pages/ActionTree/ActionTree")
);
const ActionTracker = lazy(() =>
  import("./Components/Pages/Saving/ActionTracker")
);

// Help Desk
const HelpDesk = lazy(() => import("./Components/Pages/HelpDesk/HelpDesk"));
const HelpQueryDetails = lazy(() =>
  import("./Components/Pages/HelpDesk/HelpQueryDetails")
);

// Activity Window
const ActivityWindow = lazy(() =>
  import("./Components/Pages/ActivityWindow/ActivityWindow")
);

const ActionTrackerActivityDetails = lazy(() =>
  import(
    "./Components/Pages/ActivityWindow/ActivityDetails/ActionTrackerActivityDetails"
  )
);
const CategoryActivityDetails = lazy(() =>
  import(
    "./Components/Pages/ActivityWindow/ActivityDetails/CategoryActivityDetails"
  )
);
const ActionActivityDetails = lazy(() =>
  import(
    "./Components/Pages/ActivityWindow/ActivityDetails/ActionActivityDetails"
  )
);
const ValidationActivityDetails = lazy(() =>
  import(
    "./Components/Pages/ActivityWindow/ActivityDetails/ValidationActivityDetails"
  )
);

// Approval Window
const ApprovalWindow = lazy(() =>
  import("./Components/Pages/Approval Window/ApprovalWindow")
);
const CategoryApproval = lazy(() =>
  import("./Components/Pages/Approval Window/ApproveReject/CategoryApproval")
);
const ActionApproval = lazy(() =>
  import("./Components/Pages/Approval Window/ApproveReject/ActionApproval")
);
const HelpApproval = lazy(() =>
  import("./Components/Pages/Approval Window/ApproveReject/HelpApproval")
);

// Sourcing Intelligence
const SourcingIntelligence = lazy(() =>
  import("./Components/Pages/SourcingIntelligence/SourcingIntelligence")
);
const CategoryIntelligence = lazy(() =>
  import("./Components/Pages/SourcingIntelligence/CategoryIntelligence")
);
const CommodityIntelligence = lazy(() =>
  import("./Components/Pages/SourcingIntelligence/CommodityIntelligence")
);
const Supplier = lazy(() => import("./Components/Pages/Supplier/Supplier.js"));
const SupplierProfile = lazy(() =>
  import("./Components/Pages/Supplier/SupplierProfile")
);
const NewsDashboard = lazy(() =>
  import("./Components/Pages/SourcingIntelligence/NewsDashboard")
);
const SupplierIntelligence = lazy(() =>
  import("./Components/Pages/Supplier/SupplierIntelligence.js")
);
const CommodityForecast = lazy(() =>
  import("./Components/Pages/SourcingIntelligence/CommodityForecast")
);
const AddCategoryReport = lazy(() =>
  import("./Components/Pages/SourcingIntelligence/AddCategoryReport")
);

// Validation
const Validation = lazy(() => import("./Components/Pages/Spend/Validation"));

const UserAccessForm = lazy(() =>
  import("./Components/Pages/UserAccess/UserAccessForm")
);

const PartClassification = lazy(() =>
  import("./Components/Pages/Part Classification/PartClassification")
);

// ProcXO ChatBot
const ChatBot = lazy(() => import("./Components/Pages/ChatBot/ChatBot.js"));

// Change Management
const SurveyAnalysis = lazy(() =>
  import("./Components/Pages/ChangeManagement/SurveyAnalysis.js")
);
// knowledge hub
const KnowledgeHub = lazy(() =>
  import("./Components/Pages/KnowledgeAndLearningHub/KnowledgeHub.js")
);

// Custom Toast
const toastConfig = (
  <ToastContainer
    stacked
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    style={{ fontSize: "12px" }}
  />
);

function App() {
  const location = useLocation();
  const path = location.pathname;
  const cookies = new Cookies();
  //get coockies
  let auth = cookies.get("spendXoIsAuth");
  let token = cookies.get("spendXoToken");

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidenavCollapse = (collapsedState) => {
    setIsCollapsed(collapsedState);
  };

  //Defining colors for the platform
  useEffect(() => {
    setPlatformColors();
  }, []);

  // custom for approval window
  const showToastContainer = location.pathname.startsWith("/approval-window");

  return (
    <div className="App">
      {showToastContainer && (
        <ToastContainer
          stacked
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ fontSize: "12px" }}
        />
      )}
      {/* Main route condition: if on root path, show login, otherwise render sidebar */}
      {path === "/" ? (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Routes>
            {/* Root route */}
            <Route
              path="/"
              element={auth ? <Navigate to="/dashboard" /> : <Login />}
            />
          </Routes>
        </Suspense>
      ) : (
        <>
          <div className="left-main">
            <Sidenavbar onCollapseChange={handleSidenavCollapse} />
          </div>
          <div
            className="right-main"
            style={{ marginLeft: isCollapsed ? "200px" : "60px" }}
          >
            <MenuNavbar />
            <Routes>
              <Route
                path="/dashboard"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <div>
                        <Dashboard />
                        {toastConfig}
                      </div>
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/spend-dashboard"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <SpendDashboard />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/spend-data"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <SpendData />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/validation"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      {" "}
                      <Validation />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/saving-dashboard"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <SavingDashboard />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/saving-data"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      {" "}
                      <SavingData />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/saving-tracker"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      {" "}
                      <SavingTracker />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/action-tracker"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      {" "}
                      <ActionTracker />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/supplier-risk"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      {" "}
                      <SupplierRisk />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/supplier-performance"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      {" "}
                      <SupplierPerformance />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/category-tree"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <CategoryTree />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/action-tree"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <ActionTree />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/sourcing-intelligence"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <SourcingIntelligence /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/category-intelligence/:categoryName/:sectionName/:reportName"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <CategoryIntelligence /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/commodity/:groupName/:commodityName"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <CommodityIntelligence /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/commodity-forecast"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <CommodityForecast /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/supplier-intelligence"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <SupplierIntelligence /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/supplier"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <Supplier /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/supplier-profile/:id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <SupplierProfile /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/news-dashboard"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <NewsDashboard /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    {auth ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
                    {toastConfig}
                  </Suspense>
                }
              />
              /* Help Desk */
              <Route
                path="/help-desk"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <HelpDesk />
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/help-details/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <HelpQueryDetails />
                    {toastConfig}
                  </Suspense>
                }
              />
              /* Activity Window */
              <Route
                path="/activity-window/"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ActivityWindow />
                    {toastConfig}
                  </Suspense>
                }
              />
              /* Activity Details */
              <Route
                path="/activity-window/action-activity-details/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ActionActivityDetails />
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/activity-window/categ-activity-details/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <CategoryActivityDetails />
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/activity-window/action-tracker-activity-details/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ActionTrackerActivityDetails />
                    {toastConfig}
                  </Suspense>
                }
              />
              <Route
                path="/activity-window/validation-activity-details/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ValidationActivityDetails />
                    {toastConfig}
                  </Suspense>
                }
              />
              {/* Approval Window */}
              <Route
                path="/approval-window/"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ApprovalWindow />
                  </Suspense>
                }
              />
              {/* Approval Details*/}
              <Route
                path="/approval-window/action-approval/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ActionApproval />
                  </Suspense>
                }
              />
              <Route
                path="/approval-window/category-approval/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <CategoryApproval />
                  </Suspense>
                }
              />
              <Route
                path="/approval-window/help-approval/:Id"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <HelpApproval />
                  </Suspense>
                }
              />
              {/* Add Category Reports */}
              <Route
                path="/add-category-reports"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <AddCategoryReport />
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/spend-overview"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <SpendOverview />
                  </Suspense>
                }
              />
              <Route
                path="/saving-overview"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <SavingOverView />
                  </Suspense>
                }
              />
              <Route
                path="/procxo-ai-chatbot"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ChatBot />
                  </Suspense>
                }
              />
              <Route
                path="/user-access"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <UserAccessForm />
                  </Suspense>
                }
              />
              <Route
                path="/impact-analysis"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <ImpactAnalysis />
                  </Suspense>
                }
              />
              <Route
                path="/part-classifier"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <PartClassification />
                  </Suspense>
                }
              />
              <Route
                path="/part-classification"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <PartClassifier />
                  </Suspense>
                }
              />
              <Route
                path="/commodity-intelligence"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <CommodityIntelligenceNew />
                  </Suspense>
                }
              />
              <Route
                path="/category-intelligence"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <CategoryLandingPage />
                  </Suspense>
                }
              />
              <Route
                path="/part-classification"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading />
                      </div>
                    }
                  >
                    <PartClassification />
                  </Suspense>
                }
              />
              {/* CHANGE MANAGEMENT ROUTES */}
              {/* Redirect plain /survey-analysis to default "dashboard" tab */}
              <Route
                path="/survey-analysis"
                element={<Navigate to="/survey-analysis/dashboard" replace />}
              />
              {/* Route with dynamic tab */}
              <Route
                path="/survey-analysis/:tab"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <SurveyAnalysis />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* Project Tracker */}
              <Route
                path="/project-tracker"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <ProjectTrackerFile />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* knowledge hub */}
              {/* knowledge hub */}
              <Route
                path="/knowledge-hub/courses/:courseId/lesson/:lessonId"
                element={<CoursePlayer />}
              />
              <Route
                path="/knowledge-hub/courses/:courseId"
                element={<CoursePlayer />}
              />
              <Route
                path="/knowledge-hub"
                element={<Navigate to="/knowledge-hub/overview" replace />}
              />
              <Route
                path="/knowledge-hub/:tab"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <KnowledgeHub />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* Document viewer */}
              <Route
                path="/knowledge-hub/docs/view/:id"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <DocumentViewer />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* Process flow list */}
              <Route
                path="/knowledge-hub/process"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <KnowledgeHubProcessTransformation />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* Process flow viewer */}
              <Route
                path="/knowledge-hub/process/view/:id"
                element={
                  auth ? (
                    <Suspense
                      fallback={
                        <div>
                          <Loading />
                        </div>
                      }
                    >
                      <DiagramViewer />
                      {toastConfig}
                    </Suspense>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>

            <HelpDeskPopUp bottom="20px" right="20px" position="fixed" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
