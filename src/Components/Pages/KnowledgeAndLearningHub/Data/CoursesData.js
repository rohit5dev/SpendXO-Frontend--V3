export const knowledgeItems = [
  {
    id: 1,
    type: "course",
    title: "SAP Concur Essentials (Expense, Travel & Invoice)",
    description:
      "Practical SAP Concur training covering expense reports, travel booking, receipts, approvals, and demos.",
    category: "SAP / Concur",
    duration: "2h 45m",
    author: "Corporate Learning Academy",
    thumbnail: "https://img.youtube.com/vi/6vvjE2UEHFw/maxresdefault.jpg",
    tags: ["SAP", "Concur", "Expense", "Travel", "Invoice"],
    views: 2150,
    uploadDate: "2025-08-22",
    lessons: [
      {
        id: 1,
        title: "SAP Concur Full Tutorial & Training 2025",
        duration: "28:00",
        videoUrl: "https://www.youtube.com/watch?v=6vvjE2UEHFw",
        thumbnail: "https://img.youtube.com/vi/6vvjE2UEHFw/hqdefault.jpg",
        refDocId: 2,
        refDiagramIds: [4, 5, 7], // process outline, open platform, implementation
        description:
          "Comprehensive 2025 tutorial covering Concur expense, travel, and invoice features with practical navigation demos."
      },
      {
        id: 2,
        title: "Concur Expense Demonstration (Official)",
        duration: "12:00",
        videoUrl: "https://www.youtube.com/watch?v=8G8MckIpwZA",
        thumbnail: "https://img.youtube.com/vi/8G8MckIpwZA/hqdefault.jpg",
        refDocId: 1,
        refDiagramIds: [4, 6], // system diagram + ERD
        description:
          "Official SAP Concur demo showing how to create and submit expenses, attach receipts, and manage approvals."
      },
      {
        id: 3,
        title: "Creating an Expense Report in Concur",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=850s7m-bJAY",
        thumbnail: "https://img.youtube.com/vi/850s7m-bJAY/hqdefault.jpg",
        refDocId: 1,
        refDiagramIds: [4, 6], // expense ERD + flow
        description:
          "Step-by-step walkthrough of creating, editing, and submitting an expense report in SAP Concur."
      },
      {
        id: 4,
        title: "How to Book Travel in Concur",
        duration: "15:00",
        videoUrl: "https://www.youtube.com/watch?v=YsNA4TngEJs",
        thumbnail: "https://img.youtube.com/vi/YsNA4TngEJs/hqdefault.jpg",
        refDocId: 2,
        refDiagramIds: [4, 7], // process diagram + implementation
        description:
          "Guide to booking flights, hotels, and cars in Concur, including travel profiles and itinerary management."
      },
      {
        id: 5,
        title: "Concur Travel & Expense Demo",
        duration: "08:30",
        videoUrl: "https://www.youtube.com/watch?v=11qtedm2SvY",
        thumbnail: "https://img.youtube.com/vi/11qtedm2SvY/hqdefault.jpg",
        refDocId: 2,
        refDiagramIds: [4, 5, 7], // integrated T&E view
        description:
          "Demonstration of integrated travel and expense features, showing how both modules work together."
      },
      {
        id: 6,
        title: "Concur Travel Demonstration (Profile & Booking)",
        duration: "18:00",
        videoUrl: "https://www.youtube.com/watch?v=1zk-DizqOb4",
        thumbnail: "https://img.youtube.com/vi/1zk-DizqOb4/hqdefault.jpg",
        refDocId: 2,
        refDiagramIds: [4, 7], // travel booking process flow
        description:
          "Hands-on demo of setting up travel profiles and making bookings using SAP Concur Travel."
      }
    ]
  },
  {
    id: 2,
    type: "course",
    title: "Procure-to-Pay (P2P) & Accounts Payable (AP) Fundamentals",
    description:
      "End-to-end P2P and AP training: requisitioning, PO, GRN, 3-way match, invoices, and payments.",
    category: "Procurement / AP",
    duration: "3h 15m",
    author: "Finance Training Hub",
    thumbnail: "https://img.youtube.com/vi/u9O6ab541Dk/maxresdefault.jpg",
    tags: ["Procurement", "P2P", "Accounts Payable", "Finance"],
    views: 1890,
    uploadDate: "2025-08-22",
    lessons: [
      {
        id: 1,
        title: "Accounts Payable Tutorial for Beginners",
        duration: "23:00",
        videoUrl: "https://www.youtube.com/watch?v=u9O6ab541Dk",
        thumbnail: "https://img.youtube.com/vi/u9O6ab541Dk/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Beginner-friendly explanation of Accounts Payable workflows, vendor invoices, and payment cycles."
      },
      {
        id: 2,
        title: "Procure-to-Pay (P2P) Process Overview",
        duration: "22:00",
        videoUrl: "https://www.youtube.com/watch?v=_ZvqhI2HGWw",
        thumbnail: "https://img.youtube.com/vi/_ZvqhI2HGWw/hqdefault.jpg",
        refDocId: 3,
        refDiagramIds: [-1],
        description:
          "Overview of the Procure-to-Pay lifecycle covering requisitioning, purchase orders, and vendor payments."
      },
      {
        id: 3,
        title: "Learn SAP Procure-to-Pay Business Process Steps",
        duration: "29:00",
        videoUrl: "https://www.youtube.com/watch?v=OlIf3YQyG7w",
        thumbnail: "https://img.youtube.com/vi/OlIf3YQyG7w/hqdefault.jpg",
        refDocId: 4,
        refDiagramIds: [-1],
        description:
          "Detailed breakdown of SAP P2P steps including PR to PO creation, goods receipt, and invoice posting."
      },
      {
        id: 4,
        title: "P2P in SAP — End-User Series (Video 1)",
        duration: "19:00",
        videoUrl: "https://www.youtube.com/watch?v=9UZzV-KiHvU",
        thumbnail: "https://img.youtube.com/vi/9UZzV-KiHvU/hqdefault.jpg",
        refDocId: 5,
        refDiagramIds: [-1],
        description:
          "End-user focused training video showing P2P tasks inside SAP for non-stock procurement."
      },
      {
        id: 5,
        title: "Procure-to-Pay Overview (D365 SCM concepts)",
        duration: "33:00",
        videoUrl: "https://www.youtube.com/watch?v=BUN861PBA6Q",
        thumbnail: "https://img.youtube.com/vi/BUN861PBA6Q/hqdefault.jpg",
        refDocId: 3,
        refDiagramIds: [-1],
        description:
          "High-level P2P process explained with Microsoft Dynamics 365 Supply Chain Management context."
      },
      {
        id: 6,
        title: "An Overview of the Procure-to-Pay Process",
        duration: "16:00",
        videoUrl: "https://www.youtube.com/watch?v=OHPv_REE6EA",
        thumbnail: "https://img.youtube.com/vi/OHPv_REE6EA/hqdefault.jpg",
        refDocId: 4,
        refDiagramIds: [-1],
        description:
          "Quick overview of the P2P process, highlighting stock procurement and vendor invoice handling."
      }
    ]
  },
  {
    id: 3,
    type: "course",
    title: "Employee Performance (EP) Data & HR KPIs",
    description:
      "Capture, track, and analyze employee performance using KPIs, dashboards, and review practices.",
    category: "HR / EP",
    duration: "2h 50m",
    author: "HR Academy",
    thumbnail: "https://img.youtube.com/vi/hHJ1dLZ-STQ/maxresdefault.jpg",
    tags: ["Employee Performance", "HR", "KPIs", "Analytics"],
    views: 1750,
    uploadDate: "2025-08-22",
    lessons: [
      {
        id: 1,
        title: "Employee Performance Dashboard in Excel",
        duration: "20:00",
        videoUrl: "https://www.youtube.com/watch?v=hHJ1dLZ-STQ",
        thumbnail: "https://img.youtube.com/vi/hHJ1dLZ-STQ/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "How to design and use an Excel dashboard to track and visualize employee performance metrics."
      },
      {
        id: 2,
        title: "Use These KPIs to Measure Employee Performance",
        duration: "14:00",
        videoUrl: "https://www.youtube.com/watch?v=DpqcU6T5MGQ",
        thumbnail: "https://img.youtube.com/vi/DpqcU6T5MGQ/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Essential HR KPIs explained with tips on selecting the right indicators to measure performance."
      },
      {
        id: 3,
        title: "What Are Important KPIs for HR?",
        duration: "12:00",
        videoUrl: "https://www.youtube.com/watch?v=TLhVr1rmlYM",
        thumbnail: "https://img.youtube.com/vi/TLhVr1rmlYM/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Explains the most important HR KPIs and how they support workforce performance analysis."
      },
      {
        id: 4,
        title: "Define Performance Metrics for HR & Admin",
        duration: "15:00",
        videoUrl: "https://www.youtube.com/watch?v=mQyZmUhqT6A",
        thumbnail: "https://img.youtube.com/vi/mQyZmUhqT6A/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Covers HR & Admin performance metrics with examples for evaluating organizational effectiveness."
      },
      {
        id: 5,
        title: "Performance Management System — Explained",
        duration: "18:00",
        videoUrl: "https://www.youtube.com/watch?v=BXD8VaO-Dss",
        thumbnail: "https://img.youtube.com/vi/BXD8VaO-Dss/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Introduction to performance management systems and how they streamline HR evaluation processes."
      },
      {
        id: 6,
        title: "Performance Management: Managing KPIs (Webinar)",
        duration: "22:00",
        videoUrl: "https://www.youtube.com/watch?v=sepiN_s5ewQ",
        thumbnail: "https://img.youtube.com/vi/sepiN_s5ewQ/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Webinar session showing best practices in defining, tracking, and managing HR KPIs."
      }
    ]
  },
  {
    id: 4,
    type: "course",
    title: "Record-to-Report (RP/R2R) & Reporting in Finance",
    description:
      "Understand Record-to-Report (R2R) cycles and reporting foundations with SAP context and Fiori analytics.",
    category: "Reporting / R2R",
    duration: "3h 00m",
    author: "Finance Ops Academy",
    thumbnail: "https://img.youtube.com/vi/NnVggX1mZoo/maxresdefault.jpg",
    tags: ["R2R", "Reporting", "Financial Close", "SAP Fiori"],
    views: 1600,
    uploadDate: "2025-08-22",
    lessons: [
      {
        id: 1,
        title: "What is Record-to-Report in SAP? (Quick Guide)",
        duration: "13:00",
        videoUrl: "https://www.youtube.com/watch?v=NnVggX1mZoo",
        thumbnail: "https://img.youtube.com/vi/NnVggX1mZoo/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Quick guide to understanding Record-to-Report processes in SAP, covering journal entries and reporting."
      },
      {
        id: 2,
        title: "Record-to-Report (R2R) Process — Explained",
        duration: "17:00",
        videoUrl: "https://www.youtube.com/watch?v=na7bwQMnhUQ",
        thumbnail: "https://img.youtube.com/vi/na7bwQMnhUQ/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Explains the overall R2R process including financial consolidation, reconciliations, and reporting cycles."
      },
      {
        id: 3,
        title: "R2R Process Overview (Financial Reporting)",
        duration: "14:00",
        videoUrl: "https://www.youtube.com/watch?v=bRFhSHCWPHY",
        thumbnail: "https://img.youtube.com/vi/bRFhSHCWPHY/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Covers R2R reporting basics with examples of month-end close and financial statement preparation."
      },
      {
        id: 4,
        title: "Record-to-Report in SAP S/4HANA Finance",
        duration: "18:00",
        videoUrl: "https://www.youtube.com/watch?v=ELuk1HPTRHA",
        thumbnail: "https://img.youtube.com/vi/ELuk1HPTRHA/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Explains how R2R is performed in SAP S/4HANA with real-time financial reporting and analytics."
      },
      {
        id: 5,
        title: "SAP S/4HANA Fiori — Beginner Navigation",
        duration: "20:00",
        videoUrl: "https://www.youtube.com/watch?v=EChF4X48Qn0",
        thumbnail: "https://img.youtube.com/vi/EChF4X48Qn0/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Beginner’s walkthrough of SAP Fiori interface with navigation tips for finance and reporting apps."
      },
      {
        id: 6,
        title: "Analytical List Page in SAP Fiori (Practical Guide)",
        duration: "25:00",
        videoUrl: "https://www.youtube.com/watch?v=3tia4iuw88E",
        thumbnail: "https://img.youtube.com/vi/3tia4iuw88E/hqdefault.jpg",
        refDocId: 6,
        refDiagramIds: [-1],
        description:
          "Practical guide to using SAP Fiori’s Analytical List Page for interactive financial reporting."
      }
    ]
  }
];


export const categories = [
  "All",
  "SAP / Concur",
  "Procurement / AP",
  "HR / EP",
  "Reporting / R2R",
];
