export const IFMTabsData = {
  ifm_spend_data: [
    { region: "UAE", annual_spend: 280, percent_of_ifm_spend: 40 },
    { region: "Egypt", annual_spend: 120, percent_of_ifm_spend: 17 },
    { region: "Saudi Arabia", annual_spend: 60, percent_of_ifm_spend: 8.5 },
    { region: "India", annual_spend: 50, percent_of_ifm_spend: 7 },
    { region: "United Kingdom", annual_spend: 40, percent_of_ifm_spend: 5.5 },
    { region: "Germany", annual_spend: 30, percent_of_ifm_spend: 4.5 },
    { region: "United States", annual_spend: 70, percent_of_ifm_spend: 10 },
    { region: "Other Regions", annual_spend: 30, percent_of_ifm_spend: 4.5 },
  ],
  ifm_facility_services: {
    hard_services: [
      "HVAC Systems",
      "Plumbing",
      "Electrical Maintenance",
      "Fire Safety Systems",
      "Asset Management",
      "Maintenance Management",
    ],
    security_services: [
      "Security Personnel",
      "Surveillance Systems (CCTV)",
      "Access Control Systems",
    ],
    soft_services: [
      "Cleaning",
      "Pest Control",
      "Waste Management",
      "Landscaping",
    ],
    specialized_services: [
      "Sustainability Initiatives",
      "Energy Management & Efficiency",
      "Façade Cleaning",
      "Space Planning",
    ],
  },

  Cost_by_region_data: [
    {
      region: "USA",
      client_spend: "₹ 86",
      industry_benchmark: "₹ 73",
      variance: "₹ 13",
      percentage: "18%",
    },
    {
      region: "UK",
      client_spend: "₹ 82",
      industry_benchmark: "₹ 70",
      variance: "₹ 12",
      percentage: "17%",
    },
    {
      region: "Germany",
      client_spend: "₹ 80",
      industry_benchmark: "₹ 68",
      variance: "₹ 12",
      percentage: "18%",
    },
    {
      region: "Saudi Arabia",
      client_spend: "₹ 74",
      industry_benchmark: "₹ 62",
      variance: "₹ 12",
      percentage: "19%",
    },
    {
      region: "India",
      client_spend: "₹ 60",
      industry_benchmark: "₹ 55",
      variance: "₹ 5",
      percentage: "9%",
    },
    {
      region: "UAE",
      client_spend: "₹ 78",
      industry_benchmark: "₹ 65",
      variance: "₹ 13",
      percentage: "20%",
    },
    {
      region: "Egypt",
      client_spend: "₹ 68",
      industry_benchmark: "₹ 58",
      variance: "₹ 10",
      percentage: "17%",
    },
  ],

  ifm_major_vendors: [
    {
      sub_service: "Cleaning",
      top_vendors: "ISS Facility Services, CleanPro, EcoClean",
      vendor_type: "Global / Regional",
      region_presence: "Global, UAE, Egypt",
    },
    {
      sub_service: "Security",
      top_vendors: "G4S, SafeGuard, GuardOne",
      vendor_type: "Global / Regional",
      region_presence: "UAE, Egypt, USA",
    },
    {
      sub_service: "Pest Control",
      top_vendors: "Rentokil, PestSafe, UrbanShield",
      vendor_type: "Global / Regional",
      region_presence: "Global, Middle East",
    },
    {
      sub_service: "HVAC Systems",
      top_vendors: "Trane Technologies, Daikin, Emirates HVAC",
      vendor_type: "Global / Local",
      region_presence: "Global, UAE, India",
    },
    {
      sub_service: "Energy Management",
      top_vendors: "ENGIE Impact, EcoSolutions, GreenPower",
      vendor_type: "Global / Regional",
      region_presence: "Global, Europe, India",
    },
    {
      sub_service: "Asset Management",
      top_vendors: "Trimble, AssetWise, FMTrack",
      vendor_type: "Global Tech Vendors",
      region_presence: "Global",
    },
    {
      sub_service: "Maintenance Management",
      top_vendors: "CBRE, MaintPro, TechFix Maintenance",
      vendor_type: "Global / Local",
      region_presence: "Global, UAE",
    },
    {
      sub_service: "Safety Compliance",
      top_vendors: "SGS, RiskPro, ComplianceSafe",
      vendor_type: "Global / Regional",
      region_presence: "Global, UAE",
    },
    {
      sub_service: "Labeling & Tags",
      top_vendors: "Avery Dennison, LabelMasters, PrintPro",
      vendor_type: "Global / Regional",
      region_presence: "Global, UAE",
    },
    {
      sub_service: "Space Planning",
      top_vendors: "JLL Design, SpaceLogic Interiors, Planify",
      vendor_type: "Global / Local",
      region_presence: "Global, UAE, Europe",
    },
  ],

  ifm_supplier_performance: [
    {
      vendor: "ISS Facility",
      service_type: "Cleaning",
      cost_competitiveness: "4.2 ★★★★☆",
      service_quality: "4.3 ★★★★☆",
      delivery_reliability: "4.7 ★★★★★",
      overall_score: "4.4",
      status: "Preferred",
    },
    {
      vendor: "G4S",
      service_type: "Security",
      cost_competitiveness: "3.8 ★★★☆☆",
      service_quality: "4.8 ★★★★★",
      delivery_reliability: "4.2 ★★★★☆",
      overall_score: "4.3",
      status: "Preferred",
    },
    {
      vendor: "Rentokil",
      service_type: "Pest Control",
      cost_competitiveness: "4.1 ★★★★☆",
      service_quality: "4.0 ★★★★☆",
      delivery_reliability: "4.1 ★★★★☆",
      overall_score: "4.1",
      status: "Potential",
    },
    {
      vendor: "Daikin",
      service_type: "HVAC",
      cost_competitiveness: "3.7 ★★★☆☆",
      service_quality: "4.3 ★★★★☆",
      delivery_reliability: "4.0 ★★★★☆",
      overall_score: "4",
      status: "Monitor",
    },
    {
      vendor: "ENGIE Impact",
      service_type: "Energy Mgmt",
      cost_competitiveness: "4.3 ★★★★☆",
      service_quality: "4.1 ★★★★☆",
      delivery_reliability: "4.4 ★★★★☆",
      overall_score: "4.3",
      status: "Preferred",
    },
    {
      vendor: "SGS",
      service_type: "Compliance",
      cost_competitiveness: "3.5 ★★★☆☆",
      service_quality: "4.9 ★★★★★",
      delivery_reliability: "4.0 ★★★★☆",
      overall_score: "4.1",
      status: "Monitor",
    },
  ],

  ifm_supplier_risk: [
    {
      vendor: "ISS Facility",
      service_provided: "Cleaning",
      risk_type: "Geo-dependency",
      risk_level: "Medium Risk",
      notes:
        "68% of spend concentrated in UAE → explore alternates in EU/India.",
    },
    {
      vendor: "G4S",
      service_provided: "Security",
      risk_type: "Financial Stability",
      risk_level: "Low Risk",
      notes: "No significant issues. Solid global financials.",
    },
    {
      vendor: "ENGIE Impact",
      service_provided: "Energy Management",
      risk_type: "Regulatory (Carbon)",
      risk_level: "Medium Risk",
      notes: "Future EU/ME regulatory shifts on emissions.",
    },
    {
      vendor: "Rentokil",
      service_provided: "Pest Control",
      risk_type: "Market Competition",
      risk_level: "Low Risk",
      notes: "Multiple suppliers → minimal switching risk.",
    },
    {
      vendor: "CBRE MaintPro",
      service_provided: "Maintenance Mgmt",
      risk_type: "Vendor Dependency",
      risk_level: "High Risk",
      notes: "Single-source for critical ops → identify backups.",
    },
    {
      vendor: "SGS",
      service_provided: "Compliance",
      risk_type: "Geo-concentration (APAC)",
      risk_level: "Medium Risk",
      notes: "Alternative suppliers needed outside APAC focus.",
    },
  ],

  // ################ NEWS TAB Data ################
  newsData: [
    {
      title:
        "Aramark and Pringle Robotics Team up to deploy Autonomous Floor Cleaning Robots Across the Company's Businesses",
      description:
        "To improve efficiency and achieve superior cleaning results, Aramark, (NYSE: ARMK), a leading global provider of food and facilities services, with operations spanning the education, healthcare, business and industry, sports, leisure, and corrections industries is partnering with Pringle Robotics, a developer of autonomous robotic solutions for facilities management, to install floor cleaning robots and operational software solutions at key customer facilities, it was announced today.",
      imageUrl:
        "https://www.aramark.com/content/dam/aramark/en/about/newsroom/news-articles/2024/june-2024/pringle-hero.png",
      url: "https://www.aramark.com/newsroom/news/2024/june/aramark-pringle-robotics",
      published: "2024-06-06",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9,
      classification: "Cleaning Automation",
    },
    {
      title: "Using robotics to revamp modern maintenance",
      description:
        "The industrial and commercial maintenance sectors are at a critical juncture, poised for a significant evolution. Integrating advanced technologies is not a theoretical prospect but a pressing need that promises to make facilities more immaculate, safe, and sustainable in 2025. Autonomous robotics, IoT-enabled smart buildings, and AI-driven predictive systems are not just buzzwords, but practical solutions that directly address the escalating demands of facility managers.",
      imageUrl:
        "https://www.reminetwork.com/wp-content/uploads/edit-1-1536x872.jpg",
      url: "https://www.reminetwork.com/articles/using-robotics-to-revamp-modern-maintenance/",
      published: "2025-01-17",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.85,
      classification: "Maintenance Technology",
    },
    {
      title:
        "2025 Energy Management Trends: Insights from the Spacewell Energy Survey",
      description:
        "As the world grapples with the urgency of achieving sustainability, the energy sector is at the heart of this transformation. Professionals and organizations are exploring innovative strategies and technologies to meet growing efficiency demands and align with global goals. Through the Spacewell Energy Survey 2024, we've gained unique insights into the priorities and challenges shaping the future. Coupled with broader industry research, these findings point at key trends poised to redefine energy management in 2025.",
      imageUrl:
        "https://spacewell.com/wp-content/uploads/2025/01/EN-Energy-Survey-Report-Infographics-2024-Consumption.png.webp",
      url: "https://spacewell.com/resources/blog/2025-energy-management-trends-energy-management-survey-report",
      published: "2025-01-21",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.8,
      classification: "Energy Management",
    },
    {
      title: "Enhancing Industrial Security with CCTV Access Control Systems",
      description:
        "Industrial facilities require robust security measures to protect assets, ensure operational continuity and comply with regulatory standards. CCTV access control systems have become essential in industrial facilities management, offering real-time surveillance, automated access authentication and data-driven security insights. As the IFM Expo 2025 approaches, industry leaders in the GCC region are focusing on integrating advanced security technologies that enhance efficiency and risk mitigation.",
      imageUrl:
        "https://ifmexpo.com/wp-content/uploads/2025/02/istockphoto-2148033973-612x612-1.jpg",
      url: "https://ifmexpo.com/blog/enhancing-industrial-security-with-cctv-access-control-systems/",
      published: "2025-02-07",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.8,
      classification: "Security Systems",
    },
    {
      title: "How robots are helping retail stores stay clean and stocked",
      description:
        "Autonomous Mobile Robots (AMRs) can automate tasks such as remote site management, floor cleaning, and inventory management, freeing up human employees to focus on more value-added activities. By leveraging the power of AI and robotics, AMRs enable retailers to enhance operational efficiency, improve customer experience, and meet the demands of the modern retail landscape.",
      imageUrl:
        "https://cdn.prod.website-files.com/650caff2e60146b72295e227/664ba9c0336d4b9543a10592_A054_B094_1214Z2.0000608-p-2000.jpg",
      url: "https://www.braincorp.com/resources/how-robots-are-helping-retail-stores-stay-clean-and-stocked",
      published: "2025-03-05",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.85,
      classification: "Cleaning Automation",
    },
    {
      title:
        "Integrating renewable energy and digital infrastructure: Pioneering the next generation",
      description:
        "The outlook for energy demand, particularly electricity, is increasing at a rate not seen in decades. This increase in demand will characterise the energy infrastructure landscape over the coming decades, creating unique challenges and significant opportunities. Key drivers of this growth include the digital economy—particularly the rise of high-performance computing for AI training and inference—the electrification of heating and transportation, industrial decarbonisation, and the resurgence of manufacturing through nearshoring and reshoring. The primary driver of rising electricity demand is the convergence of energy and digital infrastructure in the private sector, rather than by government policy which has become more uncertain globally.",
      imageUrl:
        "https://www.ucs.org/sites/default/files/styles/large/public/images/energy-renewable-solar-panel-transmission-lines.jpg?itok=yZS3wCfy",
      url: "https://www.ifminvestors.com/news-and-insights/thought-leadership/integrating-renewable-energy-and-digital-infrastructure-pioneering-the-next-generation/?utm_source=chatgpt.com",
      published: "2025-03-18",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.8,
      classification: "Sustainability / Energy",
    },
    {
      title:
        "Infrastructure Horizons 2025: Artificial intelligence, energy security and renewable fuels are reshaping the future of infrastructure investment",
      description:
        "Domestic steel prices have seen an increase over the past couple of months in anticipation of a safeguard duty, but a looming global trade war is likely to weigh as threat of import rises and prospect of export flounders.",
      imageUrl:
        "https://www.ifminvestors.com/siteassets/shared-media/media-images/media-image-dots/media-release-12.png?width=928&height=522",
      url: "https://www.ifminvestors.com/news-and-insights/media-centre/infrastructure-horizons-2025-artificial-intelligence-energy-security-and-renewable-fuels-are-reshaping-the-future-of-infrastructure-investment/?utm_source=chatgpt.com",
      published: "2025-03-31",
      relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0.1,
      classification: "Market & Infrastructure",
    },
    {
      title:
        "Key Trends Redefining HVAC Systems In 2025: Smart HVAC systems will revolutionize building efficiency, cybersecurity, and customer experience, predicts Frost & Sullivan.",
      description:
        "The global HVAC industry is undergoing a transformational shift, driven by the convergence of IoT, cloud computing, artificial intelligence (AI), and sustainability initiatives, according to Frost & Sullivan's latest analysis of the sector. These trends are redefining how heating, ventilation, and air conditioning systems are designed, managed, and secured across residential, commercial, and industrial environments.",
      imageUrl:
        "https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_800/https://facilityexecutive.com/wp-content/uploads/2025/03/adobestock_991632757.jpeg",
      url: "https://facilityexecutive.com/key-trends-redefining-hvac-systems-in-2025/",
      published: "2025-03-31",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.85,
      classification: "HVAC Systems",
    },
    {
      title:
        "Energy Management Collaborative Nears Historic 25 Billion Kilowatt-Hours Energy Savings Milestone this Earth Day 2025",
      description:
        "Energy Management Collaborative (EMC), a leader in turnkey energy efficiency solutions, is on track to reach the monumental milestone of 25 billion kilowatt-hours (kWh) in cumulative energy savings for its customers this July. Carefully tracked and reported each Earth Day for more than a decade by the energy services provider, this approaching achievement reflects EMC's unwavering effort to drive innovative energy solutions for Fortune 500 companies across North America.",
      imageUrl:
        "https://educationpost.in/_next/image?url=https%3A%2F%2Fapi.educationpost.in%2Fs3-images%2F1748251540471-compressed_solar.jpg&w=3840&q=75",
      url: "https://www.prweb.com/releases/energy-management-collaborative-nears-historic-25-billion-kilowatt-hours-energy-savings-milestone-this-earth-day-2025-302432900.html",
      published: "2025-04-22",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9,
      classification: "Energy Management",
    },
    {
      title:
        "What Facility Managers Can Learn from Global Cleaning Industry Innovations",
      description:
        "During the NFMT and Clean Buildings Conferences earlier this year, Daniëlle Inostroza from RAI sat down with Corinne Zudonyi, Chief Editor for the Cleaning Market, to share insights from Interclean Amsterdam, the world's largest professional cleaning and hygiene trade show, that reveal how European trends are influencing U.S. cleaning practices.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx-fwKnjBgP-Pid9tqLmQk0hCrS0ZbW8sUFg&s",
      url: "https://www.facilitiesnet.com/maintenanceoperations/tip/What-Facility-Managers-Can-Learn-from-Global-Cleaning-Industry-Innovations--55305?utm_source=chatgpt.com",
      published: "2025-05-23",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.8,
      classification: "Cleaning Innovations",
    },
    {
      title:
        "Pudu Robotics Launches its Latest AI-Powered Autonomous Cleaning Robot – PUDU CC1 Pro",
      description:
        "Pudu Robotics, the global leader in service robotics, today launched the PUDU CC1 Pro, an AI-powered autonomous cleaning robot. The award-winning PUDU CC1 set a new benchmark with its four-in-one cleaning solution combining sweeping, scrubbing, vacuuming, and dust-mopping. Building on this successful model, the PUDU CC1 Pro advances intelligent cleaning automation with powerful AI-driven perception and decision-making integrated into every stage of the cleaning process.",
      imageUrl:
        "https://pudu-file-host.oss-cn-beijing.aliyuncs.com/official_website/PUDU%20CC1%20Pro_Features_2025-05-27_17%3A28%3A36.png",
      url: "https://www.pudurobotics.com/en/news/1107",
      published: "2025-05-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9,
      classification: "Cleaning Automation",
    },
    {
      title:
        "Reolink Enters the Middle East Market Unveiling Next-Gen Smart Security Solutions",
      description:
        "Reolink, a global leader in smart security solutions, has officially launched its operations in the Middle East through a strategic partnership with Trigon Gulf and AAMAAL in UAE , KSA and Oman respectively. This highly anticipated entry brings to the region a new era of surveillance innovation, with products designed to redefine security standards for homes, businesses, and remote environments.",
      imageUrl:
        "https://www.builtenvironmentme.com/uploads/articles/20250609040610_Reolink.jpg",
      url: "https://www.builtenvironmentme.com/news/ifm/reolink-enters-the-middle-east-market-unveiling-next-gen-smart-security-solutions?utm_source=chatgpt.com",
      published: "2025-06-08",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.85,
      classification: "Security Systems",
    },
  ],
  marketTrendData: [
    {
      themeCategory: "Cleaning Automation",
      trendTitle:
        "Rise of Autonomous Cleaning Solutions in Facility Management",
      insightfulDescription:
        "Surge in adoption of AI-powered cleaning robots (e.g., Aramark-Pringle, Pudu Robotics) is redefining cleaning operations, helping reduce manpower dependency and enhance hygiene standards. This automation wave represents a fundamental shift in facility maintenance practices, offering consistent cleaning quality while addressing labor shortages. The technology's rapid evolution suggests even greater capabilities will emerge in the medium to long term.",
      sentiment: "Positive",
      impactDuration: "Medium-Term",
    },
    {
      themeCategory: "Energy Management",
      trendTitle:
        "Growing Adoption of Energy-Efficient Infrastructure in Facilities",
      insightfulDescription:
        "Energy efficiency takes center stage as facilities increasingly integrate renewable sources, digital infrastructure, and smart grids. This transition aligns with both ESG mandates and long-term cost optimization strategies. The move toward sustainable energy solutions reflects a broader industry recognition that environmental responsibility and operational efficiency are not mutually exclusive, but rather complementary objectives in modern facility management.",
      sentiment: "Positive",
      impactDuration: "Long-Term",
    },
    {
      themeCategory: "Maintenance Technology",
      trendTitle:
        "Technology Reshaping Maintenance Strategies with Robotics & AI",
      insightfulDescription:
        "Modern maintenance practices are undergoing a transformation through robotics and IoT-enabled predictive analytics, enabling proactive asset upkeep and reduced downtime. This technological shift represents more than just efficiency gains - it's fundamentally changing the nature of maintenance work from reactive repairs to predictive care. The medium-term impact suggests we'll see continued evolution in maintenance roles and required skill sets across the industry.",
      sentiment: "Positive",
      impactDuration: "Medium-Term",
    },
    {
      themeCategory: "Security Systems",
      trendTitle: "Security System Upgrades Driven by Rising Compliance Needs",
      insightfulDescription:
        "Industrial facilities are experiencing an uptick in surveillance, access control systems, and AI-enabled monitoring, particularly in GCC and Middle East markets. This trend is driven by both compliance mandates and growing operational risk awareness. The medium-term impact suggests security will become increasingly integrated with other facility systems, creating more comprehensive protection ecosystems rather than standalone solutions.",
      sentiment: "Positive",
      impactDuration: "Medium-Term",
    },
    {
      themeCategory: "Market & Infrastructure",
      trendTitle:
        "Volatility in Infrastructure Investments Amidst Global Trade Tensions",
      insightfulDescription:
        "Infrastructure investments tied to IFM face uncertainty amid global trade disruptions, with potential supply chain risks impacting large-scale facility expansion plans. This volatility creates a complex environment where strategic planning must account for both geopolitical factors and market fluctuations. The short to medium term impact suggests facility managers will need to develop more agile investment strategies to navigate this uncertain landscape.",
      sentiment: "Neutral",
      impactDuration: "Short-Term",
    },
  ],
};
