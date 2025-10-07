export const commodityOverviewData = {
  globalTrends: [
    {
      CountryRegion: "China",
      Categorization: "Top Producer & Exporter",
      StrategicMarketAnalysis:
        "China remains the world's largest steel producer and exporter, accounting for over 50% of global output. In 2024, exports surged by 25%, reaching ~118 million tonnes. Oversupply, driven by weak domestic demand and aggressive pricing, is flooding global markets, creating deflationary price pressure and triggering trade defenses.",
      Badge: "High Leverage Opportunity",
      Tooltip:
        "Oversupply allows negotiation leverage and low-cost imports, but risk of anti-dumping duties.",
    },
    {
      CountryRegion: "India",
      Categorization: "Top Producer & Exporter",
      StrategicMarketAnalysis:
        "India is the second-largest steel producer globally and a net exporter. Domestic demand is recovering, yet the influx of cheap Chinese steel and softened prices pose risks to local mills. The government's support policies and potential trade barriers may stabilize pricing but could also reduce global competitiveness.",
      Badge: "Tariff Watch Zone",
      Tooltip:
        "Use threat of import substitution to push for better domestic pricing. Monitor tariff policies.",
    },
    {
      CountryRegion: "USA",
      Categorization: "Top Importer & Producer",
      StrategicMarketAnalysis:
        "The US steel market is characterized by strong protectionist policies, with recent 2025 tariffs reinforcing Section 232 actions. While domestic production is steady, import volumes from Asia—especially China—are under scrutiny. Buyers face elevated prices due to limited import options but benefit from stable domestic supply.",
      Badge: "High Tariff Risk",
      Tooltip:
        "Expect price stability or mild increases. Prioritize sourcing from exempted partners.",
    },
    {
      CountryRegion: "EU",
      Categorization: "Top Importer & Consumer",
      StrategicMarketAnalysis:
        "The European steel sector is under pressure from sluggish demand, particularly in construction. Imports from Asia continue despite trade safeguards, challenging local producers. High energy prices and carbon costs further strain competitiveness. EU buyers may see short-term price relief, but longer-term risks remain elevated.",
      Badge: "Price Negotiation Window",
      Tooltip:
        "Global mills may offload excess into EU. Good time to negotiate import contracts at lower prices.",
    },
  ],

  //#2
  geographicalTrends: {
    export: [
      { Country: "China", Qty: 94.3 },
      { Country: "Japan", Qty: 32.2 },
      { Country: "South Korea", Qty: 27 },
      { Country: "European Union", Qty: 26 },
      { Country: "Germany", Qty: 22.5 },
      { Country: "Italy", Qty: 16.1 },
      { Country: "Belgium", Qty: 14.6 },
      { Country: "Russia", Qty: 13.9 },
      { Country: "Türkiye", Qty: 12.7 },
      { Country: "Brazil", Qty: 12.3 },
      { Country: "Iran", Qty: 11.9 },
      { Country: "Netherlands", Qty: 11.8 },
      { Country: "France", Qty: 9.9 },
      { Country: "India", Qty: 9.9 },
      { Country: "Indonesia", Qty: 9.6 },
      { Country: "Taiwan, China", Qty: 9.5 },
      { Country: "United States", Qty: 8.9 },
      { Country: "Viet Nam", Qty: 8.6 },
      { Country: "Spain", Qty: 7.8 },
      { Country: "Malaysia", Qty: 7.6 },
    ],
    import: [
      { Country: "European Union", Qty: 39.2 },
      { Country: "United States", Qty: 26.4 },
      { Country: "Germany", Qty: 18.7 },
      { Country: "Italy", Qty: 18.7 },
      { Country: "Türkiye", Qty: 18 },
      { Country: "Mexico", Qty: 17.5 },
      { Country: "South Korea", Qty: 15 },
      { Country: "Viet Nam", Qty: 14 },
      { Country: "Thailand", Qty: 13.7 },
      { Country: "Indonesia", Qty: 12.4 },
      { Country: "France", Qty: 11.8 },
      { Country: "Belgium", Qty: 11.6 },
      { Country: "Poland", Qty: 11.6 },
      { Country: "China", Qty: 11 },
      { Country: "Spain", Qty: 10.2 },
      { Country: "India", Qty: 9.8 },
      { Country: "Netherlands", Qty: 9 },
      { Country: "Canada", Qty: 8.6 },
      { Country: "Taiwan, China", Qty: 7.5 },
      { Country: "Malaysia", Qty: 7.1 },
    ],
  },
  //  #3
  executiveSummary: {
    currentPrice: {
      currentPrice: 59000,
      mom: -2.31,
      yoy: -10.1,
    },
    marketsize: { marketsize: 4.3, cagr: 8.4, forecasted: 8.9 },
    topProducers: {
      country: ["China", "India", "Japan", "United States", "Russia"],
      production: [1019.1, 140.8, 87, 81.4, 76],
    },
    topConsumers: {
      country: ["China", "India", "United States", "Japan", "South Korea"],
      consumer: [895.7, 133.4, 90.5, 53.3, 54.7],
    },
    keyPlayers: {
      companies: [
        "China Baowu Group",
        "ArcelorMittal",
        "Ansteel Group",
        "Nippon Steel Corporation",
        "HBIS Group",
      ],
      production: [130.77, 68.52, 55.89, 43.66, 41.34],
    },
  },

  // #4
  globalTrends: [
    {
      country: "China",
      categorization: "Top Producer & Exporter",
      strategicMarketAnalysis:
        "China remains the world's largest steel producer and exporter, accounting for over 50% of global output. In 2024, exports surged by 25%, reaching ~118 million tonnes. Oversupply, driven by weak domestic demand and aggressive pricing, is flooding global markets, creating deflationary price pressure and triggering trade defenses.",
      badge: "High Leverage Opportunity",
      tooltip:
        "Oversupply allows negotiation leverage and low-cost imports, but risk of anti-dumping duties.",
    },
    {
      country: "India",
      categorization: "Top Producer & Exporter",
      strategicMarketAnalysis:
        "India is the second-largest steel producer globally and a net exporter. Domestic demand is recovering, yet the influx of cheap Chinese steel and softened prices pose risks to local mills. The government's support policies and potential trade barriers may stabilize pricing but could also reduce global competitiveness.",
      badge: "Tariff Watch Zone",
      tooltip:
        "Use threat of import substitution to push for better domestic pricing. Monitor tariff policies.",
    },
    {
      country: "United States",
      categorization: "Top Importer & Producer",
      strategicMarketAnalysis:
        "The US steel market is characterized by strong protectionist policies, with recent 2025 tariffs reinforcing Section 232 actions. While domestic production is steady, import volumes from Asia—especially China—are under scrutiny. Buyers face elevated prices due to limited import options but benefit from stable domestic supply.",
      badge: "High Tariff Risk",
      tooltip:
        "Expect price stability or mild increases. Prioritize sourcing from exempted partners.",
    },
    {
      country: "EU",
      categorization: "Top Importer & Consumer",
      strategicMarketAnalysis:
        "The European steel sector is under pressure from sluggish demand, particularly in construction. Imports from Asia continue despite trade safeguards, challenging local producers. High energy prices and carbon costs further strain competitiveness. EU buyers may see short-term price relief, but longer-term risks remain elevated.",
      badge: "Price Negotiation Window",
      tooltip:
        "Global mills may offload excess into EU. Good time to negotiate import contracts at lower prices.",
    },
  ],

  // #5
  hrcPriceData: [
    { date: "01-04-2015", price: 39506 },
    { date: "01-05-2015", price: 39638 },
    { date: "01-06-2015", price: 36575 },
    { date: "01-07-2015", price: 34694 },
    { date: "01-08-2015", price: 33425 },
    { date: "01-09-2015", price: 35919 },
    { date: "01-10-2015", price: 35350 },
    { date: "01-11-2015", price: 32200 },
    { date: "01-12-2015", price: 32463 },
    { date: "01-01-2016", price: 30319 },
    { date: "01-02-2016", price: 33513 },
    { date: "01-03-2016", price: 34388 },
    { date: "01-04-2016", price: 35656 },
    { date: "01-05-2016", price: 35831 },
    { date: "01-06-2016", price: 34431 },
    { date: "01-07-2016", price: 34672 },
    { date: "01-08-2016", price: 35122 },
    { date: "01-09-2016", price: 37382 },
    { date: "01-10-2016", price: 37538 },
    { date: "01-11-2016", price: 38270 },
    { date: "01-12-2016", price: 43739 },
    { date: "01-01-2017", price: 44264 },
    { date: "01-02-2017", price: 42327 },
    { date: "01-03-2017", price: 41783 },
    { date: "01-04-2017", price: 42725 },
    { date: "01-05-2017", price: 40987 },
    { date: "01-06-2017", price: 41132 },
    { date: "01-07-2017", price: 42047 },
    { date: "01-08-2017", price: 44270 },
    { date: "01-09-2017", price: 44237 },
    { date: "01-10-2017", price: 43806 },
    { date: "01-11-2017", price: 43920 },
    { date: "01-12-2017", price: 43808 },
    { date: "01-01-2018", price: 46595 },
    { date: "01-02-2018", price: 51778 },
    { date: "01-03-2018", price: 57378 },
    { date: "01-04-2018", price: 56640 },
    { date: "01-05-2018", price: 54776 },
    { date: "01-06-2018", price: 54351 },
    { date: "01-07-2018", price: 54737 },
    { date: "01-08-2018", price: 55554 },
    { date: "01-09-2018", price: 57569 },
    { date: "01-10-2018", price: 56170 },
    { date: "01-11-2018", price: 56362 },
    { date: "01-12-2018", price: 54189 },
    { date: "01-01-2019", price: 50328 },
    { date: "01-02-2019", price: 50964 },
    { date: "01-03-2019", price: 51330 },
    { date: "01-04-2019", price: 51805 },
    { date: "01-05-2019", price: 49763 },
    { date: "01-06-2019", price: 47963 },
    { date: "01-07-2019", price: 47701 },
    { date: "01-08-2019", price: 45437 },
    { date: "01-09-2019", price: 43680 },
    { date: "01-10-2019", price: 43480 },
    { date: "01-11-2019", price: 42170 },
    { date: "01-12-2019", price: 44040 },
    { date: "01-01-2020", price: 47120 },
    { date: "01-02-2020", price: 47780 },
    { date: "01-03-2020", price: 47430 },
    { date: "01-04-2020", price: 46120 },
    { date: "01-05-2020", price: 45152 },
    { date: "01-06-2020", price: 84883 },
    { date: "01-07-2020", price: 84883 },
    { date: "01-08-2020", price: 84883 },
    { date: "01-09-2020", price: 84883 },
    { date: "01-10-2020", price: 84883 },
    { date: "01-11-2020", price: 84883 },
    { date: "01-12-2020", price: 84883 },
    { date: "01-01-2021", price: 84883 },
    { date: "01-02-2021", price: 84883 },
    { date: "01-03-2021", price: 84883 },
    { date: "01-04-2021", price: 84883 },
    { date: "01-05-2021", price: 84883 },
    { date: "01-06-2021", price: 84883 },
    { date: "01-07-2021", price: 84883 },
    { date: "01-08-2021", price: 84883 },
    { date: "01-09-2021", price: 84883 },
    { date: "01-10-2021", price: 84883 },
    { date: "01-11-2021", price: 84883 },
    { date: "01-12-2021", price: 80470 },
    { date: "01-01-2022", price: 80010 },
    { date: "01-02-2022", price: 80010 },
    { date: "01-03-2022", price: 92630 },
    { date: "01-04-2022", price: 88270 },
    { date: "01-05-2022", price: 84850 },
    { date: "01-06-2022", price: 74930 },
    { date: "01-07-2022", price: 72570 },
    { date: "01-08-2022", price: 70210 },
    { date: "01-09-2022", price: 70090 },
    { date: "01-10-2022", price: 67260 },
    { date: "01-11-2022", price: 67260 },
    { date: "01-12-2022", price: 65780 },
    { date: "01-01-2023", price: 71370 },
    { date: "01-02-2023", price: 72500 },
    { date: "01-03-2023", price: 71980 },
    { date: "01-04-2023", price: 70492 },
    { date: "01-05-2023", price: 67850 },
    { date: "01-06-2023", price: 64910 },
    { date: "01-07-2023", price: 67250 },
    { date: "01-08-2023", price: 68030 },
    { date: "01-09-2023", price: 68390 },
    { date: "01-10-2023", price: 67850 },
    { date: "01-11-2023", price: 65990 },
    { date: "01-12-2023", price: 65900 },
    { date: "01-01-2024", price: 65440 },
    { date: "01-02-2024", price: 64670 },
  ],

  // #6
  keyPriceDriversData: {
    BOF: [
      {
        Input: "Iron Ore",
        "Qty / Ton": "1,370 kg",
        "Unit Price (₹)": 6.52,
        "Unit Change Sensitivity": "2.32%",
        Volatility: "Medium",
      },
      {
        Input: "Metallurgical Coal",
        "Qty / Ton": "780 kg",
        "Unit Price (₹)": 17.14,
        "Unit Change Sensitivity": "1.32%",
        Volatility: "High",
      },
      {
        Input: "Limestone",
        "Qty / Ton": "270 kg",
        "Unit Price (₹)": 2.8,
        "Unit Change Sensitivity": "0.46%",
        Volatility: "Low",
      },
      {
        Input: "Recycled Steel",
        "Qty / Ton": "125 kg",
        "Unit Price (₹)": 31.93,
        "Unit Change Sensitivity": "0.21%",
        Volatility: "High",
      },
      {
        Input: "Manganese",
        "Qty / Ton": "15 Kg",
        "Unit Price (₹)": 83.91,
        "Unit Change Sensitivity": "0.03%",
        Volatility: "High",
      },
      {
        Input: "Silicon",
        "Qty / Ton": "4 Kg",
        "Unit Price (₹)": 86.32,
        "Unit Change Sensitivity": "0.01%",
        Volatility: "High",
      },
      {
        Input: "Electricity",
        "Qty / Ton": "0.1 MWh",
        "Unit Price (₹)": 5,
        "Unit Change Sensitivity": "",
        Volatility: "Low",
      },
      {
        Input: "Natural Gas",
        "Qty / Ton": "0.003 MWh",
        "Unit Price (₹)": 6.5,
        "Unit Change Sensitivity": "",
        Volatility: "High",
      },
      {
        Input: "Other Energy Sources",
        "Qty / Ton": "0.001 MWh",
        "Unit Price (₹)": "",
        "Unit Change Sensitivity": "",
        Volatility: "Low",
      },
    ],
    EAF: [
      {
        Input: "Scrap Steel",
        "Qty / Ton": 710,
        "Unit Price (₹)": 31.93,
        "Unit Change Sensitivity": "1.203%",
        Volatility: "High",
      },
      {
        Input: "Iron Ore",
        "Qty / Ton": 586,
        "Unit Price (₹)": 6.52,
        "Unit Change Sensitivity": "0.993%",
        Volatility: "Medium",
      },
      {
        Input: "Metallurgical Coal",
        "Qty / Ton": 150,
        "Unit Price (₹)": 17.14,
        "Unit Change Sensitivity": "0.254%",
        Volatility: "High",
      },
      {
        Input: "Limestone",
        "Qty / Ton": 88,
        "Unit Price (₹)": 2.8,
        "Unit Change Sensitivity": "0.149%",
        Volatility: "Low",
      },
      {
        Input: "Manganese",
        "Qty / Ton": "1.5%",
        "Unit Price (₹)": 83.91,
        "Unit Change Sensitivity": "0.025%",
        Volatility: "High",
      },
      {
        Input: "Silicon",
        "Qty / Ton": "0.4%",
        "Unit Price (₹)": 86.32,
        "Unit Change Sensitivity": "0.007%",
        Volatility: "High",
      },
      {
        Input: "Electricity",
        "Qty / Ton": "0.639 MWh",
        "Unit Price (₹)": 5,
        "Unit Change Sensitivity": "",
        Volatility: "Low",
      },
      {
        Input: "Natural Gas",
        "Qty / Ton": "0.486 MWh",
        "Unit Price (₹)": 6.5,
        "Unit Change Sensitivity": "",
        Volatility: "High",
      },
      {
        Input: "Other Sources",
        "Qty / Ton": "0.013 MWh",
        "Unit Price (₹)": "",
        "Unit Change Sensitivity": "",
        Volatility: "Low",
      },
    ],
  },

  // #8
  negotiationLevers: [
    {
      NegotiationLever: "Leverage Global Supply Surplus",
      Description:
        "Global steel production has outpaced demand, leading to an oversupply in the market. Buyers can use this surplus as a bargaining tool to negotiate lower prices with mills eager to offload excess inventory.",
      ImpactDuration: "Short-Term",
      RiskLevel: "Low",
      GeographiesAffected: "Global",
      Source:
        "https://agmetalminer.com/2024/10/09/steel-prices-higher-output-plummets/",
    },
    {
      NegotiationLever: "Highlight Declining Raw Material Costs",
      Description:
        "Recent reductions in the prices of essential raw materials, such as iron ore and coking coal, have decreased production costs for steel mills. Buyers can argue that these savings should be passed on, resulting in lower HRC prices.",
      ImpactDuration: "Medium-Term",
      RiskLevel: "Moderate",
      GeographiesAffected: "Global",
      Source: "https://blog.tatanexarc.com/da/factors-affecting-steel-prices/",
    },
    {
      NegotiationLever: "Emphasize Weakening Demand in Key Sectors",
      Description:
        "Industries like automotive and construction are experiencing reduced activity, leading to decreased steel demand. Buyers can leverage this downturn to negotiate better pricing, as mills seek to maintain sales volumes amid declining orders.",
      ImpactDuration: "Short-Term",
      RiskLevel: "Moderate",
      GeographiesAffected: "Global",
      Source:
        "https://luxmetalgroup.com/global-hot-rolled-coil-market-faces-uncertainty-rising-prices-amid-weak-demand-and-economic-challenges/",
    },
    {
      NegotiationLever: "Utilize Futures Contracts for Price Stability",
      Description:
        "Engaging in futures contracts can lock in current HRC prices, providing protection against potential price increases. This strategy offers mills guaranteed sales, which can be used to negotiate more favorable terms.",
      ImpactDuration: "Long-Term",
      RiskLevel: "Low",
      GeographiesAffected: "Global",
      Source:
        "https://www.cmegroup.com/education/courses/hedging-price-risk-with-steel-future-contracts/hedging-with-hot-rolled-coil-hrc-steel-futures-contracts.html",
    },
    {
      NegotiationLever: "Reference Recent Price Reductions by Competitors",
      Description:
        "Some steel producers have recently reduced their HRC prices to stimulate demand. Buyers can use these instances as benchmarks to negotiate similar concessions from other suppliers.",
      ImpactDuration: "Short-Term",
      RiskLevel: "Low",
      GeographiesAffected: "Global",
      Source:
        "https://www.fastmarkets.com/insights/us-steel-hrc-buyers-calling-the-shots-for-2023-contracts/",
    },
    {
      NegotiationLever: "Capitalize on Regional Price Discrepancies",
      Description:
        "Significant price variations exist between regions due to factors like tariffs and local demand. Buyers can explore importing HRC from lower-priced regions or use these discrepancies as leverage in negotiations with domestic suppliers.",
      ImpactDuration: "Medium-Term",
      RiskLevel: "Moderate",
      GeographiesAffected: "Global",
      Source:
        "https://gmk.center/en/news/prices-for-rolled-steel-products-in-the-eu-to-rise-q2-wsd/",
    },
    {
      NegotiationLever: "Negotiate Long-Term Contracts for Volume Discounts",
      Description:
        "Committing to long-term purchase agreements can incentivize mills to offer volume discounts, ensuring steady demand for producers and cost savings for buyers.",
      ImpactDuration: "Long-Term",
      RiskLevel: "Low",
      GeographiesAffected: "Global",
      Source:
        "https://eoxs.com/new_blog/securing-favorable-terms-contract-negotiation-strategies-for-steel-buyers/",
    },
    {
      NegotiationLever: "Monitor and Respond to Trade Policy Changes",
      Description:
        "Stay informed about trade policies, such as tariffs and quotas, which can impact steel prices. Buyers can time purchases strategically or seek exemptions to mitigate cost increases resulting from such policies.",
      ImpactDuration: "Short-Term",
      RiskLevel: "High",
      GeographiesAffected: "Global",
      Source:
        "https://www.wsj.com/economy/trade/trump-imposes-global-25-steel-aluminum-tariffs-49df0110",
    },
    {
      NegotiationLever: "Assess Mill Lead Times and Production Schedules",
      Description:
        "Understanding mills' production schedules and lead times can help buyers negotiate better prices during periods of low capacity utilization, as mills may be more willing to offer discounts to keep operations running efficiently.",
      ImpactDuration: "Short-Term",
      RiskLevel: "Moderate",
      GeographiesAffected: "Global",
      Source:
        "https://www.steelmarketupdate.com/2025/03/20/smu-survey-lead-times-stabilize-as-tariff-induced-buying-slows/",
    },
    {
      NegotiationLever: "Highlight High Inventory Levels at Service Centers",
      Description:
        "Elevated inventory levels at service centers reduce their urgency for new purchases, which can be leveraged by buyers to negotiate lower prices due to decreased immediate demand.",
      ImpactDuration: "Short-Term",
      RiskLevel: "Low",
      GeographiesAffected: "Global",
      Source:
        "https://luxmetalgroup.com/global-hot-rolled-coil-market-faces-uncertainty-rising-prices-amid-weak-demand-and-economic-challenges/",
    },
  ],

  // #9
  riskAndOpportunity: [
    {
      Headline: "Escalating Global Trade Tensions Impacting Steel Markets",
      Description:
        "The U.S. has imposed tariffs on steel imports from multiple countries, leading to retaliatory measures and heightened trade disputes. These actions have disrupted global steel supply chains and increased market volatility.",
      ImpactDuration: "Medium-Term",
      RiskLevel: "High",
      GeographiesAffected: "Global",
      Source: "https://mepsinternational.com/gb/en/news",
    },
    {
      Headline: "China's Steel Overcapacity Floods Global Markets",
      Description:
        "China's steel production surged to 78.9 million tonnes in February 2025, exacerbating global oversupply and driving down prices. This overcapacity has led to increased exports, impacting steel producers worldwide.",
      ImpactDuration: "Long-Term",
      RiskLevel: "High",
      GeographiesAffected: "Global",
      Source:
        "https://worldsteel.org/media/press-releases/2025/february-2025-crude-steel-production/",
    },
    {
      Headline:
        "European Steel Sector Struggles Amidst Energy Crisis and Import Competition",
      Description:
        "European steelmakers face challenges due to high energy costs and competition from low-cost imports, particularly from China. The European Commission is considering protectionist measures, including tighter import quotas, to support the domestic industry.",
      ImpactDuration: "Medium-Term",
      RiskLevel: "High",
      GeographiesAffected: "Europe",
      Source:
        "https://www.reuters.com/markets/commodities/europes-future-metals-strategy-hindered-by-current-crisis-andy-home-2025-03-28/",
    },
    {
      Headline: "UK Steel Industry at Crossroads with Potential Plant Closures",
      Description:
        "British Steel's Chinese owner, Jingye, is seeking £1 billion in state support to maintain operations at the Scunthorpe plant and transition to greener production methods. Failure to secure funding may result in the closure of blast furnaces, putting thousands of jobs at risk.",
      ImpactDuration: "Short-Term",
      RiskLevel: "High",
      GeographiesAffected: "United Kingdom",
      Source: "https://www.ft.com/content/e4212f12-b53e-46f8-b41e-ee01d454a2f7",
    },
    {
      Headline:
        "Global Push Towards Green Steel Presents Both Opportunities and Challenges",
      Description:
        "The steel industry, responsible for 7%-9% of global carbon emissions, is under pressure to decarbonize. Transitioning to green steel production using hydrogen and renewable energy requires significant investment but offers potential for substantial economic and environmental benefits.",
      ImpactDuration: "Long-Term",
      RiskLevel: "Moderate",
      GeographiesAffected: "Global",
      Source:
        "https://www.reuters.com/markets/commodities/green-iron-is-prize-worth-billions-winning-is-trick-russell-2025-03-27/",
    },
    {
      Headline:
        "Fluctuations in Raw Material Prices Affecting Steel Production Costs",
      Description:
        "Volatility in the prices of essential raw materials like iron ore and coking coal is impacting production costs for steelmakers. Securing stable and cost-effective sources remains a critical challenge for the industry.",
      ImpactDuration: "Short-Term",
      RiskLevel: "Moderate",
      GeographiesAffected: "Global",
      Source:
        "https://eoxs.com/new_blog/key-factors-influencing-credit-risk-in-the-steel-industry/",
    },
    {
      Headline: "Safety and Health Concerns Persist in Steel Manufacturing",
      Description:
        "The steel industry continues to face safety challenges, with leading causes of fatalities including falls, moving machinery, and exposure to hazardous substances. Ongoing efforts are required to enhance worker safety and health standards.",
      ImpactDuration: "Ongoing",
      RiskLevel: "Moderate",
      GeographiesAffected: "Global",
      Source:
        "https://worldsteel.org/safety-and-health/safety-and-health-in-the-steel-industry-data-report-2023/",
    },
  ],

  // news
  FlatSteelNews: [
    {
      title:
        "Ailing China Steel Sector Seized by Talk of ‘Supply Reform 2.0’ - Bloomberg",
      description:
        "Ailing China Steel Sector Seized by Talk of ‘Supply Reform 2.0’",
      url: "https://news.google.com/rss/articles/CBMisgFBVV95cUxQZmZXaUhQMHYwS0REb29SLTJ3MzlkaFdrbERBWkx5ZzVENkg4MXVfZE8yOVJXajJBZ0xPcjVzeU1YZTNoYUxabXVqdkRhd2VZWjEyd0RsYzF2cGJNME1tUGFLaTV1cUZBYVhqTkNLejNzZ3dzUlZfeHByQzV5Z2lYR3FHNmx4dkFWNU9vVldyY3J4S3VHdFdibHVhbGZPdW9zc21XT2tUZjFoYnFCc09EWm93?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "supply chain disruptions",
    },
    {
      title:
        "Iron ore logs monthly loss on China steel export concerns - ETEnergyWorld",
      description: "Iron ore logs monthly loss on China steel export concerns",
      url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxPYnJoNFc2bklxUW9xeXM4eFpvaEV5clhmd0xWR0pwOVlwb2V0XzQway12b0ltekJSSTBoSXExaTdZQUFJVER2eGdtNTFwMEFBNWYtXzdPTVJBaE9vb0t0NnNWSi11ckh4OFd1XzgzVW9PRWhHd2NHd1U1di12amtBcU5vOTFKNmpENTdxcDZVc3lUTWF6Tk80NnJJaEdvbDgweWwwalhER1Z2V004NFpRUy1wVHRacU11dFIwV1Rn0gHDAUFVX3lxTE5BaUh0d3ZSLUJHSDJUbDhINmotRXRVMnRpbXdSU2wycmdvWUdrU042clBlc05ncjV0N21BR0o2VVAtUVgxdjdwQ0VfZlFFTVFDNnJDQW5DN0FMeXZ6TFI0blRJYzFxazVURTVOc0JjbW5nOEdCTlM2LVJ2aV96ZXBuUHZCX05aV2I0bHFqMVY3MVVmVVh5MExZWms2ZURvLW5LLVpZM2JEbjVlZHg1cVVicS1MWF9ZRGNPVWRVX2R2ME9pMA?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998393238,
      classification: "supply chain disruptions",
    },
    {
      title:
        "Iron and Steel Market Growth Expected to Expand at a CAGR of 4.1 Percentage from 2025 to 2032 - openPR",
      description:
        "Iron and Steel Market Growth Expected to Expand at a CAGR of 4.1 Percentage from 2025 to 2032",
      url: "https://news.google.com/rss/articles/CBMiogFBVV95cUxQWHdiWVNNUUJkaDdiZzd0YlpRMjkxMXlmSTlBTDFsTjVIRE9jZDU4d2laenVrMkRNaGdsX0FMRVpxcU9tSWVUbkxoUWxoeWdHVW5FaDZ0MUlFWFJlOVNoVFdDWWJ4aW53MzNMTlFNanRhSzJsVURuYWlObXRmdlJuTnI2YVZiMUlQbXdobklPMDJkTFVkY0tkTGNjRENFNzNIM2c?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9995618462562561,
      classification: "global market impact",
    },
    {
      title:
        "Laminated Steel Market Size & Share | Industry Report, 2030 - Grand View Research",
      description:
        "Laminated Steel Market Size & Share | Industry Report, 2030",
      url: "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPOThndGV3YkJydHdxd05QS04tUUFvRnFKSUJrUlk1OG55LXBDYXJEVWdQYWltRU90dmtwS1RhSUZHS3JfNFNaTy04WW1Vd2x5ZVJWcVVzZUlRcE53U3g1dDZIekMtUk03SmRxdmx3SlQtcEI4NUZqNWZjd0tzMGpEQWp5WnZza2RJ?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "global market impact",
    },
    {
      title:
        "EU steel demand may rise in Q2 despite high risks – WSD - GMK Center | English",
      description: "EU steel demand may rise in Q2 despite high risks – WSD",
      url: "https://news.google.com/rss/articles/CBMiiAFBVV95cUxQQ192dWRyY2ZhSWdlQlAwWUJpOUpFUmgxWGh6Rm1yd1NJbnR1cng5VEhTZ1MtWGp6Nm1XMW1YRkl0bXNzVTdkVmh6WkMxYlowV2J1ZjE1cnpNN3pjQjFwMmNsX21PYy05WXcwSGlxcWNOc2dUOXFOTktXYU9UMjIzMUlDU0tuV1Q40gGOAUFVX3lxTE1XXzM3VUR1UzUyaGd4emFoOEdkdmxQWTlkSjU2Z1hJRzJWV2JPbnlRRHdBTWc0UmN1Qmh5a08ySmgwNWpSN3Q5aE12QndoV3ZLY2dMdGhydm5DRFJuTHMyRVQ0dFBtQldiU3c5Q1BsVE5HVUczX0NXcXdxYkdpQVpVQXdWX0V5d0tobkphV0E?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9994716048240662,
      classification: "macro-economic events",
    },
    {
      title:
        "Vietnam steel body seeks tariffs on Chinese, Korean galvanized steel",
      description:
        "Vietnam steel body seeks tariffs on Chinese, Korean galvanized steel",
      url: "https://news.google.com/rss/articles/CBMib0FVX3lxTE9ONnRrb2p1T1NIS0JvcmhEMnNyckpCYmZWZVRjQkpkdDRpT1NQMGJkc3d1QVA3TXFlUHJMbjU1c0dObHFqVzNyNWFJRGJXdFhMaE4ybmo3X3hfVEtEY3oxbVJNTTlvc2JQalhZc2JiTdIBcEFVX3lxTE03VHM2czc4Ym5JMnBQZ05ZNzFrV09HQ3V5TjhfTVYxb1BsTjhRV0h3VmhnRTZjcjlyV3M5dm5CVFU5RG5NcklpM1V1SkpwQ083YmwtcVNvUzdfYklKamxsQmZvVWhobFJMVjl1blhRUFo?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.866850376,
      classification: "trade and tariff",
    },
    {
      title:
        "Amino Acid Import Prices Continue Upward Trend Amid Global Supply Chain Disruptions - ChemAnalyst",
      description:
        "Amino Acid Import Prices Continue Upward Trend Amid Global Supply Chain Disruptions",
      url: "https://news.google.com/rss/articles/CBMiygFBVV95cUxNYjU5NWhBN3JlQkJSd2xFemdWaDNxQnBHRkF3cnA2bWNJZ2NLNjNpeHFxZUQ0bjA5Zjd1YjBRYUloY3lHaDY1LTRJaWw5OTN2N0xJbE5rRW04Nkh5M2t3MVNoUUVIYzZCalB6QkZPaXBjQU5KUUpYNWFQaTBnU1FtQWNnWDNaenZRVE9WUE5adXFkaVVOTEVZMUtUcUZkaHl0TW1LQzBSb3pmVTNRTkFpbDNGMVFnQ3hYOHVNQWU3Q196ZTNBbkJtSEF3?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9979123473167419,
      classification: "supply chain disruptions",
    },
    {
      title: "The Real Cost of the Tariffs on Steel and Aluminum - Catalyst",
      description: "The Real Cost of the Tariffs on Steel and Aluminum",
      url: "https://news.google.com/rss/articles/CBMidkFVX3lxTE9nMWI0Q3c1ekw1UC1EU0F4UlR5ZGg5VEdfZFdhNnp6U3V0ZnhFTndfLWQ3UC1IMVgyWnFCSS1veVRNTXpVX29YMkpEa0U2WlNPc1RENm1RcXJhbjRvcnVucHl0TkkySjBwcy1wcmp2XzlkSHlpWWc?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "trade and tariff",
    },
    {
      title:
        "[SMM Coking Coal Analysis] Losses Occur, Coke Oven Capacity Utilisation Rate May Slightly Decline Next Week - SMM - Shanghai Metals Market",
      description:
        "[SMM Coking Coal Analysis] Losses Occur, Coke Oven Capacity Utilisation Rate May Slightly Decline Next Week",
      url: "https://news.google.com/rss/articles/CBMi5gFBVV95cUxPOTlsVWZLZFloTkhTTV9qaTZqYjd5aF9Eczh5dV82ampkdTZpenhRcU91bWhOZ3VDdU9CTzRza3RmZUtwQlc1UXJXVTgwMExmRGp6QUh6TnV3c09JLUI1Y0JRemdEWURzYkYwUFpVRmdHMmgxMXN0c2xHcHcwa2gxWnFRcktiR2lPZXRPbDJGc1FBeElGcjQ5YjlBMUxmRi1ocUFxWVdxbEJfanJ2RXk4Z2psQnhBSm9QcE9YbFNLemtiQnREUFVmSms0Y2xCUjNCVC1hOEV0Q3FBTnFfMHF4X1RSNVNIdw?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.99799782,
      classification: "output and capacity",
    },
    {
      title:
        "Stainless Steel Inventory Continues to Build Up, Demand Awaits Release [SMM Stainless Steel Spot Daily Review] - SMM - Shanghai Metals Market",
      description:
        "Stainless Steel Inventory Continues to Build Up, Demand Awaits Release [SMM Stainless Steel Spot Daily Review]",
      url: "https://news.google.com/rss/articles/CBMi6gFBVV95cUxNZC1OcTk4SFEtYTI0V014aWJtcGdwV0ZYU3dnMVhkM2VjVlBqQWtvMHpoWXhaekxhdXB3X1FHeDBHUGIyT3lrWFV4SW9UdXI3d0RiYkNlVXV2VDVDQkRQREJXdFV4b2pGb3I0Um1HRjFGRFdWekpzU3l4WW9LYmJ2c0JIS3UzYnYtQVY5ZkdLb0RmRFNLczRuZnozQWtLZ0lybDJJS0tkQ0x6THBXZDEwQXpodUdvVGo1VG1tazZCd0V3Y3Z1M196T2w0LXhYOTdadXNlTm9nZHZzUV9sYWFnVUc2RTdjOW1sZHc?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9980395436286926,
      classification: "global market impact",
    },
    {
      title:
        "China's Hot-Rolled Non-Alloy Steel Wire Rods Market to Exhibit +3.0% CAGR Growth Through 2035 - IndexBox, Inc.",
      description:
        "China's Hot-Rolled Non-Alloy Steel Wire Rods Market to Exhibit +3.0% CAGR Growth Through 2035",
      url: "https://news.google.com/rss/articles/CBMimgFBVV95cUxQUy1xOFU2dzFKek9GUk9lNzJOSVUzbkhpeUdqclRQNVZvMkN5bzVtMEdXVks5Sjd6M3dEOFBrdTVmQjI5QW1BNWdodm5SSWJlSG1FWVZWU2t3cEhhTGpyOFR0VWJValBUazJuVWNVYXVrU2xRdzM5VXp5dXd1TGtPQmZpbmdLZm1aX0Z3eGFrZGRXMGlSZkdXV2tn?oc=5",
      published: "2025-02-28",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9996602535247803,
      classification: "output and capacity",
    },
    {
      title:
        "Global Steel Market: HRC Prices Show Mixed Trends Across Key Regions - ChemAnalyst",
      description:
        "Global Steel Market: HRC Prices Show Mixed Trends Across Key Regions",
      url: "https://news.google.com/rss/articles/CBMixAFBVV95cUxQTi1IVTV0N2FsY05BZ0R6bUhBMVRyVC1rVU0wekhya3BteW1BTXFtU1l4am9tSjZMU3JzOUNKQWxIcC03RnNBY2RZNk5LOGtEel9rdXpvelBwR2ZnMkQxaElFWGtqSGk5M1hZYW55a1JWbTZqTkV6cmJ4VHAxNU1UOG96d0Vkc0piMHBKd2NWMUE0d0l1QUhGVENsUjVrR19oQ2pCc1FMZVJNandUTUNkNHZnQ2w4dGVWRlVLUXdnSXZvYm9R?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "global market impact",
    },
    {
      title:
        "Hyundai Steel sales to global car firms tops 1 million tons - The Korea JoongAng Daily",
      description:
        "Hyundai Steel sales to global car firms tops 1 million tons",
      url: "https://news.google.com/rss/articles/CBMi2gFBVV95cUxQb1E0TnMxOFdfVld0S01fb2FOYjdKR2NiQkMtUk1JRUgxaUJWaF8tYUtOTmVoT3F4dm9ZTUhlQ21xU2F1MTFoOVBESHotWVVPZVNIWldYTkJFZ1dGR2J6dW96OFNDdmk3VDZsODF0bDgxUVRvU2xkNzJLNVVSZFh1R2syOHVEbHJxeFA4bjhrQTBha0FMZVktMU42WDJFdUVCNXBEaGVKX1Z6WVppWmpxQjBWWC1ydnFfVnpxdTF3ZHRPbEFXWTV2NU9lUjRKODA2Q2hfWkM2eEljQQ?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.8950422406196594,
      classification: "global market impact",
    },
    {
      title:
        "In December 2024, global steel production increased against 2023, but remained at a low level - AK&M News",
      description:
        "In December 2024, global steel production increased against 2023, but remained at a low level",
      url: "https://news.google.com/rss/articles/CBMivAFBVV95cUxPOHNXSTEzZ1BMMzFWckk1dDR2aUwwZmx6YjEzU3FUSDhyX3Y2anNrZ2tvRm1FUDBkVm1VSHBBaHNoaEE5a3FpdTFHaEc0cV94NjNSdUF4VUVQcEg5WTJXV1dWdlNEdC1jWE9pWmoyTkNiZk9jR05icXpYbkFtdVBEU3FnSXRsbGtnNW9SY1FKdkYzcEZsU0FqZm1fYWMzcGwwVDFZOGx0QnV1QVdDNlhQWGJXMFRyWm9VWG9DdQ?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9997237324714661,
      classification: "global market impact",
    },
    {
      title:
        "Sukha Balka Mine Advances with New Iron Ore Block Development - News and Statistics - IndexBox, Inc.",
      description:
        "Sukha Balka Mine Advances with New Iron Ore Block Development - News and Statistics",
      url: "https://news.google.com/rss/articles/CBMihAFBVV95cUxORVZWWlgtTTFxSVdfTHJkRWkxVWZGVmN6MVdOYlliMFFJRDBkaktwdnJycFJNdHZsU3c4ZmRpT0RuWmlkZHFTVTk1NmVvcDZkRDZpMktqWFFnSmhadXloOFdMdVRYdXhKU2RReVNFWWpoQ1FLdk56cXNvZHM5cUtwQTJiMWI?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "geo-political factor",
    },
    {
      title:
        "Steel Rebar Market Poised to Reach US$ 506.06 Billion Expanding at a 4.9% CAGR From 2025 to 2034 - EIN News",
      description:
        "Steel Rebar Market Poised to Reach US$ 506.06 Billion Expanding at a 4.9% CAGR From 2025 to 2034",
      url: "https://news.google.com/rss/articles/CBMi0gFBVV95cUxONDNlRnFUbmFwYUU4UnZTeVhJbXhrMXhtWjA4NFBOTnJSLXUzRDdYZ21zZzY4MXhrdGNBTDZ4M0x6dnhnUXN5dHpReFRwdmFHSmpzVTFWemh2VWZfVmdtMGpKSElSNHY0aDRSY3ZnLWd2VnJzZzlobXhrenRLclhXaFZKZ0tQTmRNUWE2WFhyNDBfOHNEdkItTjltTFJTSlVNV2o4NENMekMtYUR2WTFMNXJsek9TRXMtbUhJSUtFVWJva240bVdORnBmeUJscWZ2YXfSAdcBQVVfeXFMTThXdUdCOXlDYTJVcHZZcVQtNEdwSldqY3hEZ282NDlIRjdueHJTcVRfRkE4M2ZXbmFZMVl3S0ZkRDlmMmZGQnBGVDl6a3JMdm9kbERScVZsOGJqeVNCNmRqZXFhRFNFSzZScTJaVjF1SUNiejRPTUh3SlhTOHJJSFYteFZUSHJzT095TVo3UnRWMnNMLVM1VVdDVmFaX0JJb0JhZXl0WjQyTWhMUV9LQTlyR0lsaDYybkstbzdZNzhaWFFnNnVvcVFXS2IxSU1CLUdtdmRhRGM?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999476969,
      classification: "global market impact",
    },
    {
      title:
        "EU steel industry needs more protection, says French industry minister - Reuters",
      description:
        "EU steel industry needs more protection, says French industry minister",
      url: "https://news.google.com/rss/articles/CBMixwFBVV95cUxNX0dBLW5Nb1FlR2hzNzYxZXE3cHBTR1RZX1dGakJWcnlDMGdNR3JvVnJNOHVSM1BmckZhck1CNkMyQWdicDNYWkNkZXh0cWRmUTV6T01YZmxWTnF2VklxbFFJZGRZMFJWUmtES29naXJDWHpHSW91X0JUUHZRc0l3YmxSb1RYYmM3dDJwUE9MWW1fbTM0WUZ3ZlR2NUhiWmwwSGd3MVNNcE9UNl96b2lqY0tHTk1oM3ozUWxmQ1RScnFxbFZpNDR3?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "trade and tariff",
    },
    {
      title:
        "Steel Rebar Prices Up Globally: Key Industries Drive Demand Amid Supply Challenges - ChemAnalyst",
      description:
        "Steel Rebar Prices Up Globally: Key Industries Drive Demand Amid Supply Challenges",
      url: "https://news.google.com/rss/articles/CBMi1wFBVV95cUxPcm01dk9WR1J0YjEwNzhET3VtV2lPWWZhSHp0ZjAzSXpoZVFCU0RJM3NaRjJPVGlBeW9pTmNmYVZTazRfVDhrMkdFcDRoZG9CcGRQSUcwejZWUE1xTGlvbXZQd1Jickh3b2pHY1p4a3VtNjZUdWFIQmNSZkF5cXlVRUxJUndmR1NuS1RRQTZwbFlaUUJLX2tjSXNBclIxVEY5SjJGYjdLYXhyMG5FZUFCSFN0N25fSks5QUN3b2pTYmdub2pGeDB0VlhWYlBVZlRIbEpQYWNBTQ?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9993102550506592,
      classification: "global market impact",
    },
    {
      title:
        "China's Iron and Non-Alloy Steel Angles, Shapes and Sections Market to Reach 159M Tons and $165.6B by 2035 - IndexBox, Inc.",
      description:
        "China's Iron and Non-Alloy Steel Angles, Shapes and Sections Market to Reach 159M Tons and $165.6B by 2035",
      url: "https://news.google.com/rss/articles/CBMidkFVX3lxTE1FRFR2MlI5b3N0Mjg0d0F5R3JiWWdhdmpyazF2NUVFWVY1Z0ZxYXFrcmcxYlFjSkNxelNuMk5Ld2ZhamJPSDlReFBpM3hWRzdzNndJV09CODJwSV9jaFYzQk5lTDVIWUMwSmpNUGFCbTFTZmtEM1E?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9644278883934021,
      classification: "output and capacity",
    },
    {
      title:
        "Impact of New Tariffs on China's Steel Export Markets - News and Statistics - IndexBox, Inc.",
      description:
        "Impact of New Tariffs on China's Steel Export Markets - News and Statistics",
      url: "https://news.google.com/rss/articles/CBMirAFBVV95cUxQRnB0OHZyMDQ3Ql9ubWxTWmNCOHcteVgweWRkMFoycmxURXdPeV85RjB0T240Yzk5WFkwNWFfTDNhYUk5bGd4TVlHa2dBdVNLMHdjTFJjQVlzNG11clpUNzRnMngtdmlQRmx1SXg3VzlGMTBLVnNEZ0xsZVVYWFFPcGZTdEQ0YTFtbEY0YWJiRkxrYTk4d3BpWm1zcWV6MXFQVV9zcDdaNXhPQVZn?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "trade and tariff",
    },
    {
      title:
        "Iron Ore Price Drop Amid Steel Export Tariffs and Supply Recovery: Implications for the Chemical Industry - ChemAnalyst",
      description:
        "Iron Ore Price Drop Amid Steel Export Tariffs and Supply Recovery: Implications for the Chemical Industry",
      url: "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPbjBiR3NrOE94UUJzTm1Yd0I0QkRueGw0WGc4OWE0RU5scURwMkJRNFpWNUZyZEpGNUN1VVNCQnZmdzFkb2FXcWJoaEZsMlphc1lkQ0dpNkdiX3N0ampjSjQxU05VZElNSnhlbzd5OUtQdG9yb0pDZndhVTdid3BlZWtHZllZNkxSd0FVRVlIZ29CSlJ2NTRVSkRENUQ3eDJWY293cThzTktuTG9Ea2doU3ZJTFhvaHk4b2ExU2lhcWpBZw?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998033464,
      classification: "trade and tariff",
    },
    {
      title:
        "Middle East's Iron Ores and Concentrates Market to Reach 114M Tons and $16.6B by 2035 - IndexBox, Inc.",
      description:
        "Middle East's Iron Ores and Concentrates Market to Reach 114M Tons and $16.6B by 2035",
      url: "https://news.google.com/rss/articles/CBMie0FVX3lxTE8zUTZFZ3lFZ2VUTWdySDZlWFNYYzRrZ2Q2NWtEOEFxU01IbW5MWnJ1azRnR1RZV18yd2dsNW5VVDZxbGVNMzI4Q0VUX2tOM1NmbTlzM1E5UnpiT2l2dWk1Y3FnUkk5RExXQWN0OWl1OVhJejNUaTZ4R25lUQ?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.8074770569801331,
      classification: "output and capacity",
    },
    {
      title:
        "Global steelmakers start off 2025 at slower pace - Recycling Today",
      description: "Global steelmakers start off 2025 at slower pace",
      url: "https://news.google.com/rss/articles/CBMinwFBVV95cUxPVG5BX242OTNWWmVna01tMlppX29LZ1dqSGwxWERZQWlLMkRwTnVpNmhPdjFOVWo3WHYzMUM0VUhKUklvaWtMZG9PNjRFajVGSGFEakZnRzZVa3NXY1FDbjNRbVk3VEZVVVl3MHRBZURkRTBJU2dWcGdraU01WnZnZmdMdjVxT1JKSEp1T3BVY2l4M0JMX2xMa0Q4NWRaVzQ?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.938370705,
      classification: "global market impact",
    },
    {
      title:
        "Iron Ore Price Drop Amid Steel Export Tariffs and Supply Recovery: Implications for the Chemical Industry - ChemAnalyst",
      description:
        "Iron Ore Price Drop Amid Steel Export Tariffs and Supply Recovery: Implications for the Chemical Industry",
      url: "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPbjBiR3NrOE94UUJzTm1Yd0I0QkRueGw0WGc4OWE0RU5scURwMkJRNFpWNUZyZEpGNUN1VVNCQnZmdzFkb2FXcWJoaEZsMlphc1lkQ0dpNkdiX3N0ampjSjQxU05VZElNSnhlbzd5OUtQdG9yb0pCZw?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998033464,
      classification: "trade and tariff",
    },
    {
      title:
        "Ukraine’s iron & steel industry restored its export positions in 2024 - GMK Center | English",
      description:
        "Ukraine’s iron & steel industry restored its export positions in 2024",
      url: "https://news.google.com/rss/articles/CBMiowFBVV95cUxNVU9jTmpGZUc0T3dFR040TGVDenFwcG16OVhSdFVLQ0JPTktVS09LLXhPcEcwcWxSN1NfZHk5Q29TTFhLc1NZbmg4aTViWFpmZlNFaTAyaTJLd3N4TXFteW8wSGdCaDB2NmhIQUxfb1k1alMxMlFkN3ItYW5IMU5yelc5VmdhSl8wQVJyZmtkbnA1UnhmdzYxZTJnQ1ltMXBsZnlR0gGoAUFVX3lxTE9QSkhJM1JfVjltZTNQazkwUmRKTWNVbzMxYThpOENJNmhYY1FpdkY4aHF1N002ZGdHaFFOUFFFS2lzYkxqLTNuZzZOTHdaVHVQM2N1TFpJbnNsbFg5eGk1Rm9HQTNKTWVlaVVYOEhMNUdYUjAzMXRvQ2dGdUJIckVLUDVKbUpydkpuZ1U0clVyV194MTJXYjdJbkRGTkRqSTNGMVBwNlNabQ?oc=5",
      published: "2025-02-27",
      Relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.9995070695877075,
      classification: "output and capacity",
    },
  ],
};
