//REACT
import apiUrls from "../../../Config/apiUrls";
import React, { useState, useEffect } from "react";
import { LuBrainCircuit } from "react-icons/lu";
import { BsBarChartLine } from "react-icons/bs";
import { MdEmojiTransportation } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import SourcingMenu from "./SourcingMenu";
import Chart from "react-apexcharts";
import { Tabs, Tab, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const chartOptions = {
  chart: {
    type: "bar",
    height: "100%",
  },
  colors: ["var(--color-main)", "var(--color-main-light)"],
  plotOptions: {
    bar: {
      horizontal: false, // Keep bars vertical
      columnWidth: "10px", // Set the width of each column/bar
      endingShape: "rounded", // Optional: makes the bars' edges rounded
      // Ensure bars are grouped side by side instead of stacked
      stacked: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Basware", "Synertrade", "Procmart", "Claritum", "B2BE"], // Sorted categories to match spend values
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val) => `${val}M`,
    },
  },
};

const chartData = [
  {
    name: "Spend",
    data: [75, 60, 50, 45, 40], // Sorted spend values in descending order
  },
];

const piechart = {
  chart: {
    type: "donut",
  },
  colors: [
    "#227c9e",
    "var(--color-main)",
    "#ffc857",
    "#f97061",
    "#8cbf9e",
    "var(--color-main-light)",
  ],
  labels: [
    "Facility Management",
    "Logistics",
    "Marketing",
    "Flat Steel",
    "Polyethylene Glycol",
  ],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  legend: {
    position: "bottom", // Display legend at the top
    fontSize: "10px", // Set font size here (applies to the entire legend)
  },
  dataLabels: {
    style: {
      colors: ["#2f3a3a"], // Label color
      fontWeight: "normal", // Font weight normal
    },
    dropShadow: {
      enabled: false, // Completely remove text shadow
    },
    position: "outer", // Show labels outside the pie
  },
};

const spendChart = [10, 20, 30, 40, 50];
const savingChart = [5, 15, 25, 35, 45];

// KPI Data
const kpi = [
  {
    name: "Category Reports",
    count: 7,
    icon: (
      <LuBrainCircuit
        style={{ color: "var(--color-icon)", fontSize: "24px" }}
      />
    ),
  },
  {
    name: "Commodity",
    count: 12,
    icon: (
      <BsBarChartLine
        style={{ color: "var(--color-icon)", fontSize: "24px" }}
      />
    ),
  },
  {
    name: "Suppliers",
    count: 100,
    icon: (
      <MdEmojiTransportation
        style={{ color: "var(--color-icon)", fontSize: "24px" }}
      />
    ),
  },
  {
    name: "News",
    count: 300,
    icon: (
      <FaRegNewspaper
        style={{ color: "var(--color-icon)", fontSize: "24px" }}
      />
    ),
  },
];

const SourcingIntelligence = () => {
  const [kpiData] = useState(kpi);
  const [categoryList, setCategoryList] = useState([
    "All",
    "Direct",
    "Indirect",
  ]);
  const [categData, setCategData] = useState([]);
  const [activeTabCateg, setActiveTabCateg] = useState("All"); // Set default to "All"
  const [categLoading, setCategLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrls.urlPrefix}/category-intelligence`
        );
        setCategData(response.data.result[0]);
        setCategLoading(false);
        console.log("Category Data Loaded", response.data.result[0]);
      } catch (error) {
        console.error("Error fetching category data", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on component mount

  const handleTabChangeCateg = (key) => {
    setActiveTabCateg(key);
  };

  const handleCategoryIntelligence = (row) => {
    console.log("Category clicked:", row);
  };

  const sampleData = {
    marketSize: ["13.3M", "24.5M", "18.23M", "51M", "10M", "51M", "10M", "27M"],
    suppliers: ["12", "25", "18", "15", "20", "15", "20", "23"],
    spendShare: ["52%", "45%", "38%", "65%", "70%", "65%", "70%", "65%"],
    growth: ["64%", "55%", "45%", "75%", "90%", "65%", "70%", "65%"],
  };

  //COMMODITY DATA LIST LOAD
  const [activeTab, setActiveTab] = useState("All");
  const [commodityList] = useState([
    "All",
    "Plastic",
    "Metal",
    "Agri",
    "Energy",
  ]);
  const [commodityData] = useState([
    {
      title: "MS Billet",
      "Current Price": "46200.00 ",
      commodity: "Metal",
      curr: "₹",
      CAGR: "1.03%",
      MOM: "0.30%",
      YOY: "-3.04%",
      end3Month: "0.64%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "Aluminium",
      "Current Price": "2553.00 ",
      commodity: "Metal",
      curr: "₹",
      CAGR: "1.03%",
      MOM: "0.02%",
      YOY: "-3.04%",
      end3Month: "-0.01%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "Sponge Iron",
      "Current Price": "30600.00 ",
      commodity: "Metal",
      curr: "₹",
      CAGR: "1.03%",
      MOM: "-1.23%",
      YOY: "-12.57%",
      end3Month: "-0.94%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "Copper",
      "Current Price": "3.14 ",
      commodity: "Metal",
      curr: "₹",
      CAGR: "2.71%",
      MOM: "1.69%",
      YOY: "-16.94%",
      end3Month: "1.91%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "Coal",
      "Current Price": "141.81 ",
      commodity: "Energy",
      curr: "₹",
      CAGR: "2.71%",
      MOM: "-0.77%",
      YOY: "-16.94%",
      end3Month: "0.03%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "Flat Steel",
      "Current Price": "863.00 ",
      commodity: "Metal",
      curr: "₹",
      CAGR: "2.71%",
      MOM: "0.16%",
      YOY: "-16.94%",
      end3Month: "0.15%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "Aluminium",
      "Current Price": "2553.26",
      commodity: "Metal",
      curr: "$",
      CAGR: "1.79%",
      MOM: "-0.26%",
      YOY: "0.49%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "PET Bottle",
      "Current Price": "1140.01",
      commodity: "Plastic",
      curr: "€",
      CAGR: "3.18%",
      MOM: "-0.03%",
      YOY: "-0.78%",
      end3Month: "0.01%",
      Date: 31 / 12 / 2023,
    },
    {
      title: "HDPE",
      "Current Price": "54.52",
      commodity: "Plastic",
      curr: "€",
      CAGR: "3.18%",
      MOM: "0.36%",
      YOY: "-0.78%",
      end3Month: "-0.66%",
      Date: 31 / 12 / 2023,
    },

    {
      title: "Cotton",
      "Current Price": "61920.00",
      commodity: "Agri",
      curr: "₹",
      CAGR: "2.34%",
      MOM: "0.56%",
      YOY: "-0.42%",
      end3Month: "-0.55%",
      Date: 31 / 12 / 2023,
    },
  ]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const formatCompactNumber = (number) => {
    // Replace this with your desired formatting logic
    return number;
  };

  const handleOpenLink = (link) => {
    window.open(link, "_blank");
  };
  const mainNews = [
    {
      "News Title":
        "CBRE GWS Reappointed on an Expanded Facilities Management contract for BBVA in Spain and Portugal",
      "News Intro":
        "CBRE GWS will again oversee and optimize the operation of BBVA’s corporate buildings and retail branches in central and southern Spain (including the Canary Islands) and all of Portugal.",
      "News Body":
        "CBRE Global Workplace Solutions (GWS) has renewed and expanded part of its technical maintenance and facility management (FM) contract with the multinational financial services company, BBVA.\nBBVA has again entrusted CBRE with the integral management of its corporate buildings and retail branches across Spain (central, south and Canary Islands) and Portugal. CBRE will be responsible for ensuring the optimal operation of 745,163 square metres of BBVA's portfolio in the Iberian Peninsula.\nCBRE will now provide an expanded catalogue of services including; management of BBVA’s historical assets, logistics and support services, assistance and maintenance of closed premises, telephone switchboard, front of house, event management and mailroom services – in addition to services already provided such as maintenance, cleaning, gardening, pest control, confidential document destruction, planned waste management, energy management and environmental consultancy.",
      "News Image Url":
        "https://content.presspage.com/uploads/1261/1920_bbvahdm16-013317-min.jpg?10000",
      "News Url":
        "https://news.cbre.co.uk/cbre-gws-reappointed-on-an-expanded-facilities-management-contract-for-bbva-in-spain-and-portugal/",
      "News Date": "23-11-2024",
      "Source Type": "Company Website",
      Source: "news.cbre.co.uk/",
      "Content Type": "News Article",
      Country: "Spain and Portugal",
      Region: "Europe, Middle East, Africa",
      "News Type": "Contract Win",
      Organization: "CBRE & BBVA",
      "Business Impact": "Medium",
      Section: "Facility Management",
    },
    {
      "News Title":
        "Liaoning Oxiranchem, Inc (300082.SZ): Polyethylene glycol series products are currently mainly used in the fields of pharmaceutical active pharmaceutical ingredients, lithium battery new energy, and daily chemicals.",
      "News Intro":
        "On September 25, Gelonhui reported that Liaoning Oxiranchem, Inc. (300082.SZ) stated on the investor interaction platform that the company's polyethylene glycol series products have a wide range of specifications and have good application research in many fields. Currently, they are mainly used in the fields of pharmaceutical active pharmaceutical ingredients, lithium battery new energy, and daily chemicals. The company pays close attention to new applications of existing products in different fields.",
      "News Body":
        "On September 25, Gelonhui reported that Liaoning Oxiranchem, Inc. (300082.SZ) stated on the investor interaction platform that the company's polyethylene glycol series products have a wide range of specifications and have good application research in many fields. Currently, they are mainly used in the fields of pharmaceutical active pharmaceutical ingredients, lithium battery new energy, and daily chemicals. The company pays close attention to new applications of existing products in different fields.",
      "News Image Url":
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6pzmu9dZcqE9sEXqctxy2K9g6HroHUOlTig&s",
      "News Url":
        "https://www.moomoo.com/news/post/43890142/liaoning-oxiranchem-inc-300082-sz-polyethylene-glycol-series-products-are?level=1&data_ticket=6c3760165589dfb208fff949047b658f",
      "News Date": "15-10-2024",
      "Source Type": "News Website",
      Source: "www.moomoo.com/us/",
      "Content Type": "News Article",
      Country: "China",
      Region: "Asia Pacific",
      "News Type": "Market Update",
      Organization: "Liaoning Oxiranchem Inc",
      "Business Impact": "Low",
      Section: "Polyethylene Glycol",
    },
    {
      "News Title":
        "Dow Restarts Polyethylene Production in Argentina Following Repairs",
      "News Intro":
        "Dow Chemical, a behemoth in the US petrochemical industry, has achieved a successful resumption of olefins and polyethylene production at its facility located in Bahia Blanca, Argentina, following a strategically planned maintenance period. The facility's substantial production capacity is impressive, with an annual output that includes 455 thousand tons of ethylene, 20 thousand tons of propylene, 495 thousand tons of LDL, and 69 thousand tons of HDPE. The decision to temporarily suspend operations for maintenance, initiated in December of the preceding year, was a calculated move aimed at optimizing and elevating operational efficiency.",
      "News Body":
        "Dow Chemical, a behemoth in the US petrochemical industry, has achieved a successful resumption of olefins and polyethylene production at its facility located in Bahia Blanca, Argentina, following a strategically planned maintenance period. The facility's substantial production capacity is impressive, with an annual output that includes 455 thousand tons of ethylene, 20 thousand tons of propylene, 495 thousand tons of LDL, and 69 thousand tons of HDPE. The decision to temporarily suspend operations for maintenance, initiated in December of the preceding year, was a calculated move aimed at optimizing and elevating operational efficiency.\r\n\r\nA notable incident that transpired on September 15 of the same year brought to light the challenges faced by Dow Chemical at its Bahia Blanca plants. These plants, integral to the production of ethylene, propylene, LDPE, LDL, and LDPE, underwent a temporary shutdown due to a power failure on August 31. The repercussions of this power outage extended beyond Dow Chemical's operations, triggering a widespread shutdown across the entire city of Bahia Blanca. In response to this critical incident, Dow Chemical swiftly mobilized efforts to address the issues, and by September 15, operations at the plants had successfully resumed.\r\n\r\nHeadquartered in Midland, Michigan, Dow Chemical stands as a formidable and diversified chemical powerhouse with significant influence. Specializing in the manufacturing of polymer products, which include but are not limited to polystyrene, polyurethane, polyethylene, polypropylene, and synthetic rubbers, the company proudly boasts an extensive and diverse portfolio. With a global footprint, Dow Chemical operates in 37 countries, overseeing and managing more than 188 production facilities and offering a comprehensive spectrum of over five thousand products.\r\n\r\nThe recent revitalization of olefins and polyethylene production at the Bahia Blanca plant in Argentina underscores Dow Chemical's unwavering commitment to sustaining operational continuity and optimizing its production capabilities. The strategic decision to temporarily halt operations for maintenance aligns with the company's overarching focus on enhancing efficiency and ensuring the reliability of its critical facility. As Dow Chemical confronts industry challenges head-on and strategically invests in the maintenance of its global facilities, it remains at the forefront of the petrochemical sector, playing a pivotal and influential role. Through its substantial contributions, the company facilitates the production of essential materials that find diverse applications across various industries.\r\n\r\nIn navigating the complexities of the petrochemical landscape, Dow Chemical's strategic initiatives, including planned maintenance periods and swift responses to unforeseen challenges, exemplify its commitment to excellence and operational resilience. The successful resumption of operations in Bahia Blanca serves as a testament to the company's adaptability and capacity to overcome hurdles. As Dow Chemical continues to spearhead advancements in the petrochemical domain, its contributions resonate not only in Argentina but on a global scale, influencing industries and shaping the trajectory of polymer production.",
      "News Image Url":
        "https://companieslogo.com/img/orig/DOW-2c6cad56.png?t=1720244491",
      "News Url":
        "https://www.chemanalyst.com/NewsAndDeals/NewsDetails/dow-restarts-polyethylene-production-in-argentina-following-repairs-25487",
      "News Date": "26-02-2024",
      "Source Type": "Specialized News Website",
      Source: "www.chemanalyst.com/",
      "Content Type": "News Article",
      Country: "United States",
      Region: "Americas",
      "News Type": "Market Update",
      Organization: "Dow",
      "Business Impact": "Medium",
      Section: "Polyethylene Glycol",
    },
    {
      "News Title":
        "Sustainable air freight: Kuehne+Nagel and Mercedes-Benz use sustainable aviation fuel in transport logistics",
      "News Intro":
        "As a long-standing airfreight partner of Mercedes-Benz, Kuehne+Nagel has also been supporting Mercedes-Benz's logistics chains to the USA since 2019, for example for the plant in Alabama. For over a year, sustainable fuels have been used in this strategic partnership in the area of transport logistics. Sustainable aviation fuel is used for the vehicle manufacturer's air freight transport, thus, actively supporting Mercedes-Benz in the decarbonisation of their supply chain.",
      "News Body":
        'As a long-standing airfreight partner of Mercedes-Benz, Kuehne+Nagel has also been supporting Mercedes-Benz\'s logistics chains to the USA since 2019, for example for the plant in Alabama. For over a year, sustainable fuels have been used in this strategic partnership in the area of transport logistics. Sustainable aviation fuel is used for the vehicle manufacturer\'s air freight transport, thus, actively supporting Mercedes-Benz in the decarbonisation of their supply chain.\r\n\r\nThanks to the use of SAF, Mercedes-Benz has been able to reduce around 11,000 tonnes of CO2 emissions in the past twelve months, in comparison to only using conventional fuels. SAF was used on charter flights with Kuehne+Nagel\'s own Boeing 747-8F cargo aircraft ‘Inspire’ on the route from Stuttgart (Germany) to Birmingham (Alabama, USA).\r\n\r\n"Our vision of becoming the most trusted logistics partner for a sustainable future by 2030 means that: As an industry leader we take our responsibility to support our customers in reducing their CO2 emissions seriously", says Heiko Schuhmacher, Senior Vice President Global Air Logistics at Kuehne+Nagel. "We are proud that this pilot project has developed into a long-term collaboration in the spirit of decarbonisation with a strong partner."\r\n\r\nMercedes-Benz and Kuehne+Nagel have set themselves the goal of avoiding and actively reducing emissions in transport logistics. "Transport logistics is a key part of the automotive value chain. By using sustainable aviation fuel for air freight transport, we can reduce emissions along our value chain and take an important step towards net carbon neutrality. We are delighted to reach another milestone in sustainable logistics together with our partner Kuehne+Nagel," says Jörg Burzer, Member of the Board of Management of Mercedes-Benz Group AG, Production, Quality and Supply Chain Management.',
      "News Image Url":
        "https://content.presspage.com/uploads/1918/bf915237-3ec7-45db-beba-0ce94e733275/partnership-mercedes-benz-kuehne-nagel.jpg?x=1722235877030",
      "News Url":
        "https://newsroom.kuehne-nagel.com/sustainable-air-freight-kuehnenagel-and-mercedes-benz-use-sustainable-aviation-fuel-in-transport-logistics/",
      "News Date": "30-07-2024",
      "Source Type": "Company Website",
      Source: "www.newsroom.kuehne-nagel.com",
      "Content Type": "News Article",
      Country: "United States",
      Region: "Americas",
      "News Type": "Sustainability",
      Organization: "Kuehne+Nagel",
      "Business Impact": "Medium",
      Section: "Logistics",
    },
    {
      "Market Data/Market Access": "Market Data",
      "News Title":
        "EVERSANA Transforms Pharmacovigilance & Drug Safety Industry with Oracle Collaboration, New Global Patient Support Model",
      "News Intro":
        "CHICAGO, IL (October 10, 2024) – EVERSANA, a leading provider of global commercialization services to the life sciences industry, today announced transformational elements to its pharmacovigilance and drug safety offering to meet the growing needs of the industry. ",
      "News Body":
        "CHICAGO, IL (October 10, 2024) – EVERSANA, a leading provider of global commercialization services to the life sciences industry, today announced transformational elements to its pharmacovigilance and drug safety offering to meet the growing needs of the industry. \r\n\r\nFirst, EVERSANA has signed an agreement with Oracle Argus Cloud to offer comprehensive features and functionalities including AI-enabled automation, workflow optimization, and conditional touchless processing to manage rapidly increasing caseloads and changing regulations across the life sciences industry. Several EVERSANA pharmacovigilance customers have transitioned to the platform, and all future customers can benefit from the unmatched power of the leading drug safety management system.  \r\n\r\nAdditionally, as an Oracle Partner Network Member since 2023, EVERSANA is committed to investing and growing its drug safety management capabilities and is now promoted by Oracle to global customers for our pharmacovigilance and implementation services. \r\n\r\nBoth milestones reinforce EVERSANA’s continued growth in drug safety management capabilities and the role it plays in commercialization success.  \r\n\r\n“We believe that pharmacovigilance services across the life sciences industry are powered by innovation and transformational thinking,” said Jim Lang, CEO, EVERSANA. “Together with Oracle’s leading systems, we are doing just this, combining our experience and operational excellence with best-in-class systems to drive better outcomes and put patient safety first.”  \r\n\r\nComplimenting Technology Solutions with New Global Support Model with Leading Skilled Workforce \r\n\r\nIn addition to the power of technology to drive greater efficiency and operational excellence, EVERSANA has also rapidly expanded its global medical information contact center capabilities. The company now offers multi-language and around-the-clock support across four regional hubs including North America, Europe, India and Japan. Here, trained experts are available to answer calls from clinicians, patients, and caregivers in their native language to ensure they have the latest information on therapy and can report any adverse effects or product complaints as necessary. \r\n\r\n“Today’s drug safety industry demands that service providers deliver critical medical information to doctors and patients in their region and at any time,” noted Lang. “Our investments in global experts  top talent  and transformational technology will help bring this commitment to life.” \r\n\r\nTo learn more about EVERSANA’s global compliance services and pharmacovigilance offering, click here. ",
      "News Image Url":
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkYTNFerOy7gkL9PQb2H_hYWIi2aDs3UNy1Q&s.png",
      "News Url":
        "https://www.eversana.com/2024/10/10/eversana-transforms-pharmacovigilance-drug-safety-industry-with-oracle-collaboration-new-global-patient-support-model/",
      "News Date": "10-10-2024",
      "Source Type": "Company Website",
      Source: "www.eversana.com/",
      "Content Type": "News Article",
      Country: "United States",
      Region: "Americas",
      "News Type": "Partnership",
      Organization: "Eversana",
      "Business Impact": "Medium",
      Section: "Marketing",
    },
    {
      "News Title": "India’s Jindal to acquire Vitkovice steel",
      "News Intro":
        "Indian steelmaker Jindal is due to become the new owner of Czech Vitkovice Steel, completing its first acquisition in Europe, the company said.",
      "News Body":
        "Indian steelmaker Jindal is due to become the new owner of Czech Vitkovice Steel, completing its first acquisition in Europe, the company said.\r\n\r\nJindal intends to invest up to €150mn in the development of the firm to promote the expansion of Vitkovice's production capacity of rolled sheets and high value-added products.\r\n\r\nBoth companies maintained close ties even before these developments, given that this past spring Vitkovice entered into a binding agreement with Jindal subsidiary Vulcan Green Steel over the supply of slab.\r\n\r\nThe agreement specifies that up to 1mn t/yr of slab will be delivered to Vitkovice from Oman.\r\n\r\nRecently the Czech Republic's financial analytical office dropped its investigation into Vitkovice after alleged ownership links to Russia.\r\n\r\nThis outcome was described as a prerequisite for the investor's entry, the Czech steelmaker said.\r\n\r\nThe deal awaits approval from the anti-monopoly office, Vitkovice noted.",
      "News Image Url":
        "https://img.etimg.com/thumb/msid-113820846,width-300,height-225,imgsize-17796,resizemode-75/tata-steel.jpg",
      "News Url":
        "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2616527-india-s-jindal-to-acquire-vitkovice-steel",
      "News Date": "09-10-2024",
      "Source Type": "Specialized News Website",
      Source: "www.argusmedia.com",
      "Content Type": "News Article",
      Country: "India",
      Region: "Asia Pacific",
      "News Type": "M&A",
      Organization: "Jindal Steel, Vitkovice steel",
      "Business Impact": "Medium",
      Section: "Flat Steel",
    },
    {
      "News Title":
        "WCIL Wins Rs 41-crore Contract from Tata Steel Sponge Iron",
      "News Intro":
        "Leading logistics company Western Carriers (India) Ltd on Friday said it has secured a Rs 41-crore contract from Tata Steel Sponge Iron Joda (TSSIJ) in Odisha.",
      "News Body":
        'Leading logistics company Western Carriers (India) Ltd on Friday said it has secured a Rs 41-crore contract from Tata Steel Sponge Iron Joda (TSSIJ) in Odisha.\r\n\r\nWCIL, which hit the capital market with an IPO of Rs 492 crore last month, has been appointed as the sole supply chain partner for in-plant logistics and container rake transportation for TSSIJ plant for three years, the company said in a statement.\r\n\r\nThe contract entails comprehensive handling support and container rake transportation for both loose and bagged direct reduced iron (DRI/sponge iron), it said.\r\n\r\n"This order represents a crucial partnership for our company, reinforcing our position as a trusted player in the third-party and fourth-party logistics space," WCIL chairman and managing director Rajendra Sethia said.\r\n\r\nHe emphasised the alignment of the contract with WCIL\'s strategy to leverage rail transport, providing efficient and sustainable logistics solutions.\r\n\r\nWCIL offers a wide range of end-to-end logistics services, ensuring the movement of goods across various modes of transport, including road, rail, and sea/river.',
      "News Image Url": "https://im.rediff.com/money/2017/apr/27container.jpg",
      "News Url":
        "https://money.rediff.com/news/market/wcil-wins-rs-41-crore-contract-from-tata-steel-sponge-iron/17288920241018",
      "News Date": "18-10-2024",
      "Source Type": "News Website",
      Source: "www.money.rediff.com/index.html",
      "Content Type": "News Article",
      Country: "India",
      Region: "Asia Pacific",
      "News Type": "Contract Win",
      Organization: "Western Carriers (India) Ltd",
      "Business Impact": "Medium",
      Section: "Metal",
      "Commodity Name": "Sponge Iron",
    },
    {
      "News Title":
        "Steel maker Rudra Global Infra to set up 30 MW solar plant at Rs 190 cr",
      "News Intro":
        "Steel maker Rudra Global Infra Products on Friday said the company will invest around Rs 190 crore to set up a 30 megawatt captive solar project in Gujarat.\r\n\r\nThe solar plant is scheduled to commence operations by January 2025, the company said in a statement.",
      "News Body":
        '"The first phase of the project entails a capital expenditure of Rs 190 crore, with 80 per cent of the funding secured through financial institutions over a five-year tenure. The remaining 20 per cent will be invested by the company," the statement said.\r\n\r\nThe clean power generated will be primarily utilised to meet the energy requirements of the company\'s existing billet and TMT bar manufacturing operations. This initiative is expected to increase the capacity utilization of the SMS (steel melting shop) division from the current 33 per cent to 50 per cent.\r\n\r\nWith the project, the company aims to produce 1 lakh tonne of billets and 2.1 lakh tonne of TMT bars annually.\r\n\r\n"By harnessing solar energy, we aim to significantly reduce our operational costs, enhance our environmental footprint, and bolster our bottom line. We envision this project reaching a break-even point within two years of commercialization, propelling us towards a turnover of over Rs 1000 crore in the next three years," Managing Director Sahil Gupta said.\r\n\r\nRudra Global Infra Products Ltd, earlier known as MDICL, manufactures thermo-mechanically treated bars and mild steel (MS) billets.',
      "News Image Url":
        "https://bsmedia.business-standard.com/_media/bs/img/article/2019-06/11/full/1560264216-1932.jpg?im=FitAndFill=(826,465)",
      "News Url":
        "https://www.business-standard.com/companies/news/steel-maker-rudra-global-infra-to-set-up-30-mw-solar-plant-at-rs-190-cr-124080900562_1.html",
      "News Date": "09-08-2024",
      "Source Type": "News Website",
      Source: "www.business-standard.com/",
      "Content Type": "News Article",
      Country: "India",
      Region: "Asia Pacific",
      "News Type": "Sustainability/ ESG/ Decarbonization",
      Organization: "Rudra Global Infra",
      "Business Impact": "Medium",
      Section: "Metal",
      "Commodity Name": "MS Billet",
    },
  ];

  return (
    <div>
      <SourcingMenu />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div style={{ width: "64%", height: "100vh" }}>
          <div
            style={{
              display: "flex",
              padding: "0px 8px",
              justifyContent: "space-between",
            }}
          >
            {kpiData.map((item, index) => (
              <div
                style={{
                  background: "white",
                  width: "180px",
                  boxShadow: "0px 0px 3px rgba(0,0,0,0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 15px",
                }}
              >
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 600 }}>
                    {item.name}
                  </p>
                  <p className="global-kpi-num" style={{ textAlign: "left" }}>
                    {item.count}
                  </p>
                </div>
                <div style={{ paddingRight: "10px" }}>{item.icon}</div>
              </div>
            ))}
          </div>
          {/* CATEGORY BOX */}
          <div className="d-flex justify-content-between align-items-end mt-2 p-2">
            <h5 className="head-theme">Category Intelligence</h5>
          </div>
          <div className="graph-tab-container bg-light p-2">
            {!categLoading ? (
              <>
                <Tabs
                  style={{ fontSize: "11px" }}
                  id="global-tabs"
                  activeKey={activeTabCateg}
                  onSelect={handleTabChangeCateg}
                  className="mb-3"
                >
                  {categoryList.map((c, index) => (
                    <Tab eventKey={c} title={c} key={index}></Tab>
                  ))}
                </Tabs>
                {categoryList.map(
                  (item, index) =>
                    activeTabCateg === item && (
                      <Row className="mt-3" key={index}>
                        {categData
                          .filter(
                            (row) => row.Category === item || item === "All"
                          )
                          .slice(0, 3) // Limit to 9 items for 3 rows
                          .map((row, i) => (
                            <Col
                              className="mb-3"
                              xs={12}
                              sm={6}
                              md={4}
                              key={row.Name}
                            >
                              <div
                                className="p-3 bg-white rounded shadow-sm text-center h-100"
                                onClick={() => handleCategoryIntelligence(row)}
                                style={{ cursor: "pointer" }}
                              >
                                <h6
                                  className="mb-2"
                                  style={{ fontSize: "13px", fontWeight: 600 }}
                                >
                                  {row.Name}
                                </h6>
                                <h4 className="global-kpi-num">
                                  {sampleData.marketSize[i]}
                                </h4>
                                <p
                                  className="text-muted small mb-2"
                                  style={{ fontSize: "11px" }}
                                >
                                  Market Size
                                </p>
                                <Row>
                                  <Col>
                                    <h5
                                      className="global-kpi-num"
                                      style={{ fontSize: "14px" }}
                                    >
                                      {sampleData.suppliers[i]}
                                    </h5>
                                    <p
                                      className="text-muted small"
                                      style={{ fontSize: "10px" }}
                                    >
                                      Supplier
                                    </p>
                                  </Col>
                                  <Col>
                                    <h5
                                      className="global-kpi-num"
                                      style={{ fontSize: "14px" }}
                                    >
                                      {sampleData.spendShare[i]}
                                    </h5>
                                    <p
                                      className="text-muted small"
                                      style={{ fontSize: "10px" }}
                                    >
                                      Spend Share
                                    </p>
                                  </Col>
                                  <Col>
                                    <h5
                                      className="global-kpi-num"
                                      style={{ fontSize: "14px" }}
                                    >
                                      {sampleData.growth[i]}
                                    </h5>
                                    <p
                                      className="text-muted small"
                                      style={{ fontSize: "10px" }}
                                    >
                                      Growth
                                    </p>
                                  </Col>
                                </Row>
                                <p
                                  className="text-muted small mt-3"
                                  style={{ fontSize: "11px" }}
                                >
                                  Updated On: 09-12-2020
                                </p>
                              </div>
                            </Col>
                          ))}
                      </Row>
                    )
                )}
              </>
            ) : (
              <div className="text-center py-3">Loading...</div>
            )}
          </div>

          {/* COMMODITY BOX */}
          <div className="d-flex justify-content-between align-items-center mb-2 p-2">
            <h5 className="head-theme">Commodity Intelligence</h5>
          </div>

          {/* Tabs */}
          <Tabs
            style={{ fontSize: "11px" }}
            id="global-tabs"
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="graph-tab-container bg-light p-2"
            fill
          >
            {commodityList.map((c) => (
              <Tab eventKey={c} title={c} key={c}>
                {/* Tab Content */}
                <Row>
                  {commodityData
                    .filter((row) => row.commodity === c || c === "All")
                    .slice(0, 3)
                    .map((row, index) => (
                      <Col
                        style={{ marginTop: "10px" }}
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                      >
                        <Card className="mb-3" style={{ cursor: "pointer" }}>
                          <Card.Body>
                            <Card.Title style={{ fontSize: "13px" }}>
                              {row.title}
                            </Card.Title>
                            <Card.Text>
                              <div className="d-flex justify-content-center">
                                <h6 className="global-kpi-num">
                                  {formatCompactNumber(row["Current Price"])}
                                </h6>
                                <span
                                  style={{ fontSize: "12px", color: "#5BAAE8" }}
                                >
                                  {row.curr}
                                </span>
                              </div>
                              <small
                                style={{ color: "gray", fontSize: "11px" }}
                              >
                                Current Price
                              </small>
                            </Card.Text>

                            <Row>
                              <Col className="text-center">
                                <h6
                                  className="global-kpi-num"
                                  style={{ fontSize: "14px" }}
                                >
                                  {row.CAGR}
                                </h6>
                                <small
                                  style={{ color: "gray", fontSize: "10px" }}
                                >
                                  CAGR
                                </small>
                              </Col>
                              <Col className="text-center">
                                <h6
                                  className="global-kpi-num"
                                  style={{ fontSize: "14px" }}
                                >
                                  {row.MOM}
                                </h6>
                                <small
                                  style={{ color: "gray", fontSize: "10px" }}
                                >
                                  MOM
                                </small>
                              </Col>
                              <Col className="text-center">
                                <h6
                                  className="global-kpi-num"
                                  style={{ fontSize: "14px" }}
                                >
                                  {row.YOY}
                                </h6>
                                <small
                                  style={{ color: "gray", fontSize: "10px" }}
                                >
                                  YOY
                                </small>
                              </Col>
                            </Row>

                            <div
                              className="text-center"
                              style={{ marginTop: "10px" }}
                            >
                              <small
                                style={{ color: "grey", fontSize: "11px" }}
                              >
                                Updated On : 10/10/2023
                              </small>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Tab>
            ))}
          </Tabs>
        </div>
        <div style={{ width: "35%", height: "100vh" }}>
          <h5 style={{ fontSize: "14px", textAlign: "left" }}>Sourcing News</h5>
          <div
            style={{
              overflowY: "scroll",
              height: "700px",
              marginTop: "5px",
            }}
            container
            spacing={2}
          >
            {mainNews.map((x, i) => {
              if (i >= 10) return;
              let style, snt, s1, s2;
              if (x["Business Impact"] === "Low") {
                s1 = "rgba(107,198,123)";
                style = "rgba(107,198,123,0.2)";
              } else if (x["Business Impact"] === "Medium") {
                s1 = "rgba(222,165,77)";
                style = "rgba(222,165,77,0.2)";
              } else {
                s1 = "rgba(220,76,62)";
                style = "rgba(220,76,62,0.2)";
              }

              if (x["Sentiment"] === "Positive Impact") {
                s2 = "rgba(107,198,123)";
                snt = "rgba(107,198,123,0.2)";
              } else if (x["Sentiment"] === "Negative Impact") {
                s2 = "rgba(220,76,62)";
                snt = "rgba(220,76,62,0.2)";
              } else {
                s2 = "rgba(255,255,255)";
                snt = "rgba(0,0,0,0.2)";
              }
              return (
                <div
                  style={{
                    background: "white",
                    boxShadow: `0px 0px 2px rgba(0,0,0,0.3)`,
                    borderRadius: "5px",
                    cursor: "pointer",
                    overflow: "hidden",
                    padding: "5px",
                    margin: "5px 5px",
                  }}
                  onClick={() => {
                    handleOpenLink(x["News Url"]);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <img
                        src={x["News Image Url"]}
                        width="100px"
                        height="70px"
                      />

                      <p
                        title="New Type"
                        style={{
                          width: "100px",
                          fontSize: "10px",
                          background: "var(--color-main)",
                          color: "white",
                          textAlign: "center",
                          padding: "2px",
                          fontWeight: 600,
                          margin: "0px",
                        }}
                      >
                        {x["News Date"]}
                      </p>

                      <p
                        title="Business Impact"
                        style={{
                          margin: "0px",
                          background: style,
                          color: s1,
                          width: "100px",
                          fontSize: "10px",
                          textAlign: "center",
                          padding: "2px",
                          fontWeight: 600,
                        }}
                      >
                        {x["Business Impact"]}
                      </p>
                    </div>
                    <div style={{ marginLeft: "6px", textAlign: "left" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          margin: "0px",
                          color: "var(--color-main)",
                        }}
                      >
                        {x["News Title"].slice(0, 140)}...
                      </p>
                      <p
                        style={{
                          fontSize: "9px",
                          color: "#929EB6",
                          marginTop: "5px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            margin: "0px",
                            marginTop: "5px",
                          }}
                        >
                          {x["News Date"]}
                        </p>
                        {x["News Body"].slice(0, 130)}...
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcingIntelligence;
