export const documents = [
  {
    id: 1,
    title: "SAP Concur Step-by-Step Guidebook",
    description:
      "Detailed instructions on expense reports, travel requests, approvals, receipt uploads, and mobile app use in Concur.",
    category: "SAP Concur",
    author: "UNC Finance Resources",
    thumbnail:
      "https://www.concur.com/sites/default/files/step_by_step_guide.png",
    tags: ["SAP Concur", "Expense", "Travel", "Mobile"],
    views: 245,
    uploadDate: "2025-08-21",
    fileUrl:
      "https://finance.unc.edu/wp-content/uploads/sites/298/2021/04/concur-step-by-step-guidebook.pdf",
    fileSize: "3.2 MB",
    fileType: "pdf",
    refLessonIds: [{ courseId: 1, lessonIds: [2, 3] }],
    refDiagramIds: [4, 6, 7],
  },
  {
    id: 2,
    title: "Concur Travel & Expense Manual",
    description:
      "Comprehensive manual covering login, travel booking, expense reporting, and FAQs in SAP Concur.",
    category: "SAP Concur",
    author: "Baylor College of Medicine",
    thumbnail:
      "https://s3-eu-west-1.amazonaws.com/cover2.galileo-press.de/print/9781493214563_800_2d.png",
    tags: ["SAP Concur", "Travel", "Expense", "Manual"],
    views: 382,
    uploadDate: "2025-08-21",
    fileUrl:
      "https://www.bcm.edu/sites/default/files/2018/f6/sap-concur-travel-and-expense-manual.pdf",
    fileSize: "4.5 MB",
    fileType: "pdf",
    refLessonIds: [{ courseId: 1, lessonIds: [1, 4, 5, 6] }],
    refDiagramIds: [4, 5, 7],
  },
  {
    id: 3,
    title: "SAP Procure-to-Pay (Services) – ByDesign",
    description:
      "Quick guide to procure-to-pay workflow in SAP Business ByDesign: purchase orders, invoicing, and payments.",
    category: "ERP – Procurement / P2P",
    author: "SAP",
    thumbnail:
      "https://targetintegration.com/wp-content/uploads//2022/12/Blue-and-Yellow-Modern-Success-In-Business-Youtube-Thumbnail9.png",
    tags: ["SAP", "P2P", "Procurement", "ByDesign"],
    views: 156,
    uploadDate: "2025-08-21",
    fileUrl:
      "https://help.sap.com/doc/50587a11a60b4aed8b2e934b79cf554a/2405/en-US/Procure_to_Pay_Services_EN.pdf",
    fileSize: "2.1 MB",
    fileType: "pdf",
    refLessonIds: [{ courseId: 2, lessonIds: [2, 5] }],
    refDiagramIds: [],
  },
  {
    id: 4,
    title: "SAP Procure-to-Pay (Stock) – ByDesign",
    description:
      "Procure-to-pay process in SAP Business ByDesign for stock materials—purchase requests, orders, goods receipt, invoice, payments.",
    category: "ERP – Procurement / P2P",
    author: "SAP",
    thumbnail:
      "https://www.icajobguarantee.com/blog/wp-content/uploads/2024/02/Procure-to-pay-process.webp",
    tags: ["SAP", "P2P", "Stock", "ByDesign"],
    views: 198,
    uploadDate: "2025-08-21",
    fileUrl:
      "https://help.sap.com/doc/e776c7e682454a298db0e4ce83b10d7a/2405/en-US/Procure_to_Pay_Stock_EN.pdf",
    fileSize: "2.8 MB",
    fileType: "pdf",
    refLessonIds: [{ courseId: 2, lessonIds: [3, 6] }],
    refDiagramIds: [],
  },
  {
    id: 5,
    title: "SAP Procure-to-Pay (Non-Stock) – ByDesign",
    description:
      "Procure-to-pay process in SAP Business ByDesign for non-stock items—shopping carts, orders, services, invoice and payment scenarios.",
    category: "ERP – Procurement / P2P",
    author: "SAP",
    thumbnail:
      "https://www.icacourse.in/blog/wp-content/uploads/2025/05/blog-01.webp",
    tags: ["SAP", "P2P", "Non-Stock", "ByDesign"],
    views: 420,
    uploadDate: "2025-08-21",
    fileUrl:
      "https://help.sap.com/doc/7c2a54bfb3254ac18f4ba4a9bbe2106b/2405/en-US/Procure_to_Pay_NonStock_EN.pdf",
    fileSize: "3.6 MB",
    fileType: "pdf",
    refLessonIds: [{ courseId: 2, lessonIds: [4] }],
    refDiagramIds: [],
  },
  {
    id: 6,
    title: "SAP Business ByDesign – Business Scenario Explorer",
    description:
      "Overview of the Cash and Liquidity Management scenario in SAP Business ByDesign—including payables, receivables, payment processing, petty cash, liquidity forecasting, and cash monitoring.",
    category: "ERP – Finance / Cash Management",
    author: "SAP Business ByDesign Documentation",
    thumbnail:
      "https://gcdpk.com/wp-content/uploads/2024/05/how-to-improve-p2p-procure-to-pay-automation.jpg",
    tags: ["SAP", "Finance", "Cash Flow", "Liquidity", "Business ByDesign"],
    views: 220,
    uploadDate: "2025-08-29",
    fileUrl:
      "https://help.sap.com/doc/44400b7cf8564dd78d01f011da2cc96f/2405/en-US/Cash_and_Liquidity_Management_EN.pdf",
    fileSize: "16 pages",
    fileType: "pdf",
    refLessonIds: [
      { courseId: 2, lessonIds: [1] },
      { courseId: 3, lessonIds: [1, 2, 3, 4, 5, 6] },
      { courseId: 4, lessonIds: [1, 2, 3, 4, 5, 6] },
    ],
    refDiagramIds: [],
  },
];


export const categories = [
  "All",
  "SAP Concur",
  "ERP – Procurement / P2P",
  "Recruitment Process",
];
