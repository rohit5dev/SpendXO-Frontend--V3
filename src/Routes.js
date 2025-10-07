import { MdOutlineDashboard, MdOutlineQueryStats } from "react-icons/md";
import { GrLineChart } from "react-icons/gr";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { RiToolsFill } from "react-icons/ri";
import { TbDatabaseDollar } from "react-icons/tb";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { MdOutlineSavings } from "react-icons/md";
import { TbDatabaseCog } from "react-icons/tb";
import { TbDeviceDesktopDollar } from "react-icons/tb";
import { LuPackageSearch } from "react-icons/lu";
import { MdOutlineAccountTree } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";
import { LuListChecks } from "react-icons/lu";
import { TbEyeDollar } from "react-icons/tb";
import { RiRobot3Line } from "react-icons/ri";
import { BsListCheck } from "react-icons/bs";
import { LuSquarePlus } from "react-icons/lu";
import { GrDocumentPerformance } from "react-icons/gr";
import { BsPersonCheck } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { AiOutlineGold } from "react-icons/ai";
import { MdDisplaySettings } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";

const Routes = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdOutlineDashboard className="sidenav-icons" />,
    sub: false,
  },
  {
    name: "Spend",
    icon: <AiOutlineDollarCircle className="sidenav-icons" />,
    sub: true,
    routes: [
      {
        name: "Spend Overview",
        link: "/spend-overview",
        icon: <TbEyeDollar className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Spend Dashboard",
        link: "/spend-dashboard",
        icon: <TbLayoutDashboard className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Spend Data",
        link: "/spend-data",
        icon: <TbDatabaseDollar className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Validation",
        link: "/validation",
        icon: <RiVerifiedBadgeLine className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Impact Analysis",
        link: "/impact-analysis",
        icon: <MdOutlineQueryStats className="sidenav-sub-icons" />,
        sub: false,
      },
    ],
  },
  {
    name: "Saving",
    icon: <MdOutlineSavings className="sidenav-icons" />,
    sub: true,
    routes: [
      {
        name: "Saving Overview",
        link: "/saving-overview",
        icon: <TbEyeDollar className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Saving Dashboard",
        link: "/saving-dashboard",
        icon: <TbLayoutDashboard className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Saving Data",
        link: "/saving-data",
        icon: <TbDatabaseCog className="sidenav-sub-icons" />,
        sub: false,
      },
      // {
      //   name: "Action Tracker",
      //   link: "/action-tracker",
      //   icon: <TbDeviceDesktopDollar className="sidenav-sub-icons" />,
      //   sub: false,
      // },
      {
        name: "Saving Tracker",
        link: "/saving-tracker",
        icon: <TbDeviceDesktopDollar className="sidenav-sub-icons" />,
        sub: false,
      },
    ],
  },
  {
    name: "Commodity",
    icon: (
      <AiOutlineGold className="sidenav-icons" style={{ fontSize: "19px" }} />
    ),
    sub: true,
    routes: [
      {
        name: "Commodity Intelligence",
        link: "/commodity-intelligence",
        icon: <TbEyeDollar className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Commodity Forecast",
        link: "/commodity-forecast",
        icon: <GrLineChart className="sidenav-sub-icons" />,
        sub: false,
      },
    ],
  },
  {
    name: "Category",
    icon: <TbCategory className="sidenav-icons" style={{ fontSize: "19px" }} />,
    sub: true,
    routes: [
      {
        name: "Category Intelligence",
        link: "/category-intelligence",
        icon: <TbEyeDollar className="sidenav-sub-icons" />,
        sub: false,
      },
    ],
  },
  {
    name: "Supplier",
    icon: (
      <LuPackageSearch className="sidenav-icons" style={{ fontSize: "19px" }} />
    ),
    sub: true,
    routes: [
      {
        name: "Supplier Risk",
        link: "/supplier-risk",
        icon: <LuPackageSearch className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Supplier Performance",
        link: "/supplier-performance",
        icon: <GrDocumentPerformance className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Supplier Profile",
        link: "/supplier",
        icon: <BsPersonCheck className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Supplier Intelligence",
        link: "/supplier-intelligence",
        icon: <GiBrain className="sidenav-sub-icons" />,
        sub: false,
      },
    ],
  },

  // {
  //   name: "Sourcing Intelligence",
  //   link: "/sourcing-intelligence",
  //   icon: (
  //     <LuBrainCircuit className="sidenav-icons" style={{ fontSize: "19px" }} />
  //   ),
  //   sub: false,
  // },

  {
    name: "Category Tree",
    link: "/category-tree",
    icon: <MdOutlineAccountTree className="sidenav-icons" />,
    sub: false,
  },

  // {
  //   name: "Action Tree",
  //   link: "/action-tree",
  //   icon: <TbBinaryTree className="sidenav-icons" />,
  //   sub: false,
  // },

  {
    name: "ProcXO",
    link: "/procxo-ai-chatbot",
    icon: <RiRobot3Line className="sidenav-icons" />,
    sub: false,
  },

  {
    name: "Knowledge Hub",
    link: "/knowledge-hub",
    icon: <HiOutlineLightBulb className="sidenav-icons" />,
    sub: false,
  },

  {
    name: "Project Tracker",
    link: "/project-tracker",
    icon: <BsListCheck className="sidenav-icons" />,
    sub: false,
  },
  {
    name: "Part Classifier",
    link: "/part-classifier",
    icon: <RiToolsFill className="sidenav-icons" />,
    sub: false,
  },

  {
    name: "Help Desk",
    link: "/help-desk",
    icon: <BiHelpCircle className="sidenav-icons" />,
    sub: false,
  },
  {
    name: "Additional Sections",
    icon: <LuSquarePlus className="sidenav-icons" />,
    sub: true,
    routes: [
      // {
      //   name: "Part Classifier",
      //   link: "/part-classifier",
      //   icon: <RiToolsFill className="sidenav-sub-icons" />,
      //   sub: false,
      // },
      {
        name: "Activity Window",
        link: "/activity-window",
        icon: <CgUserList className="sidenav-sub-icons" />,
        sub: false,
      },
      {
        name: "Approval Window",
        link: "/approval-window",
        icon: <LuListChecks className="sidenav-sub-icons" />,
        sub: false,
      },
    ],
  },
];

export default Routes;
