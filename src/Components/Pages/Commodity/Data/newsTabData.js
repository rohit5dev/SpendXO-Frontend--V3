export const newsTabData = {
  priceTrendData: [
    {
      region: "North America",
      priceTrend: "Increasing",
      notes:
        "Steel prices have surged due to the U.S. imposing a 25% tariff on steel imports, leading domestic mills to raise prices.",
      source:
        "https://www.reuters.com/markets/commodities/us-aluminium-steel-prices-hover-near-peaks-tariffs-kick-2025-03-12/",
    },
    {
      region: "Europe",
      priceTrend: "Increasing",
      notes:
        "The European Commission has imposed provisional anti-dumping duties on hot rolled coil steel imports from Egypt, Japan, and Vietnam, effective April 7.",
      source:
        "https://oilprice.com/Metals/Commodities/New-Dumping-Duties-Target-Steel-Imports-in-Europe.html",
    },
    {
      region: "Asia",
      priceTrend: "Decreasing",
      notes:
        "US government’s 25% steel tariff – primarily targeting China is flooding South-east Asia with surplus Chinese steel, raising the threat of a price war.",
      source:
        "https://www.businesstimes.com.sg/international/asean/steel-squeeze-asean-risk-becoming-worlds-steel-dumping-ground",
    },
    {
      region: "South America",
      priceTrend: "Decreasing",
      notes:
        "Chinese steelmakers are expected to keep pushing out steel shipments in 2025, likely worsening the already vulnerable position of the Latin American steel industry.",
      source:
        "https://dialogo-americas.com/articles/chinas-steel-dumping-set-to-continue-worsen-latin-america-steel-industry/",
    },
    {
      region: "Africa",
      priceTrend: "Increasing",
      notes:
        "ArcelorMittal South Africa has announced plans to cease its long steel production by April 2025, citing weak domestic demand and an influx of Chinese imports.",
      source:
        "https://www.bloomberg.com/news/articles/2025-03-19/south-africa-facing-mill-closures-begins-steel-tariff-review?utm_source=chatgpt.com",
    },
    // {
    //   region: "Middle East",
    //   priceTrend: "Stable",
    //   notes: "Donald Trump's proposed US steel tariffs will put Turkish producers most at risk in the Middle East, while Gulf steel exporters will be sheltered from the worst of the damage.",
    //   source: "https://www.agbi.com/manufacturing/2025/02/what-trump-steel-tariffs-mean-for-middle-east-producers/"
    // }
  ],
  marketTrendData: [
    {
      themeCategory: "Trade & Tariffs",
      trendTitle: "U.S. Reinstates and Expands Steel and Aluminum Tariffs",
      insightfulDescription:
        "In March 2025, the U.S. reinstated a 25% tariff on global steel imports and increased the aluminum tariff from 10% to 25%, removing previous country exemptions. This move aims to protect U.S. industries but poses challenges for exporters, including those from India. While India's direct steel exports to the U.S. are limited, the broader implications may lead to increased competition in other markets as countries redirect their exports. Additionally, the tariffs could result in surplus steel being diverted to markets like India, exerting downward pressure on domestic prices and impacting local producers.",
      sentiment: "Negative",
      impactLevel: "Medium",
      impactDuration: "Medium-Term",
      geographicLocation: "Global",
    },
    {
      themeCategory: "Global Market Impact",
      trendTitle: "Global Surplus & Weak Demand in Key Markets",
      insightfulDescription:
        "Weak demand in Europe and the US has resulted in a global steel supply surplus, exerting significant price pressure on the Indian market. In early 2024, Indian HRC prices dropped by ₹2,500 per ton as global steelmakers redirected excess inventory to markets like India, intensifying competition. The oversupply scenario has strengthened buyers’ bargaining power, allowing them to secure better pricing and negotiate favorable terms. This situation presents a strategic opportunity for Indian buyers to leverage the global surplus by locking in long-term contracts at discounted rates, while also pressuring domestic producers to lower their prices to remain competitive.",
      sentiment: "Positive",
      impactLevel: "Medium",
      impactDuration: "Long-Term",
      geographicLocation: "Europe, USA",
    },
    {
      themeCategory: "Output and Capacity",
      trendTitle: "Rising Steel Imports & China's Market Influence",
      insightfulDescription:
        "India’s finished steel imports from China reached a 7-year high during April-December 2024, with China shipping 2.1 million metric tonnes (+13.3% YoY). The sharp rise in imports led to a 25% surge between April-August, pushing down domestic prices significantly. Hot-rolled coil (HRC) prices dropped from ₹76,000 to ₹51,000 per tonne, increasing buyer leverage.",
      sentiment: "Positive",
      impactLevel: "High",
      impactDuration: "Long-Term",
      geographicLocation: "China, Global",
    },
    {
      themeCategory: "Trade & Tariffs",
      trendTitle: "Vietnamese & Chinese BIS Certifications Renewal",
      insightfulDescription:
        "In May 2024, the Indian government renewed long-stalled BIS licenses for Vietnamese and Chinese steel producers, including Formosa Ha Tinh, easing import restrictions. This move increases import availability, intensifies competition for domestic producers, and provides buyers with more sourcing options at competitive rates.",
      sentiment: "Positive",
      impactLevel: "Medium",
      impactDuration: "Short-Term",
      geographicLocation: "India, China, Vietnam",
    },
  ],
  riskAlert: [
    {
      category: "Tariffs & Trade Restrictions",
      geographicLocation: "USA, India",
      description:
        "The U.S. recently imposed a 25% tariff on steel imports from India as part of its global protectionist policies",
      riskLevel: "High",
      impactDuration: "Medium-Term",
      source:
        "https://timesofindia.indiatimes.com/business/international-business/donald-trumps-25-tariffs-on-steel-and-aluminum-imports-take-effect-impact-on-india/articleshow/118915137.cms",
    },
    {
      category: "Policy Changes",
      geographicLocation: "Europe",
      description:
        "The European Union plans to implement measures to limit tariff-free steel imports starting July 1, 2025",
      riskLevel: "High",
      impactDuration: "Long-Term",
      source:
        "https://www.wsj.com/economy/trade/eu-to-limit-tariff-free-steel-imports-amid-push-to-protect-steelmakers-0fbd0f2b",
    },
    {
      category: "Production Cuts",
      geographicLocation: "China",
      description:
        "Chinese steel producers have begun reducing production in response to Beijing's initiative to curtail overcapacity",
      riskLevel: "High",
      impactDuration: "Medium-Term",
      source:
        "https://www.reuters.com/markets/commodities/some-chinese-steel-makers-start-output-cuts-heeding-national-call-2025-03-24/",
    },
  ],

  marketOpportunity: [
    {
      geographicLocation: "India",
      description:
        "Domestic mills in India have produced excess HRC due to high production capacities, leading to oversupply and price cuts",
      riskLevel: "Low",
      opportunityDuration: "Short-Term",
      source:
        "https://www.deccanherald.com/business/economy/price-decline-chinese-imports-may-derail-indias-2030-steel-output-target-3352039",
      category: "Supply Surplus",
    },
    {
      geographicLocation: "Vietnam, China, India",
      description:
        "The Indian government renewed long-stuck BIS certifications for Vietnamese and Chinese steel producers, including Formosa Ha Tinh, easing import restrictions",
      riskLevel: "Low",
      opportunityDuration: "Short-Term",
      source:
        "https://www.bigmint.co/insights/detail/india-govt-renews-bis-licence-of-vietnams-formosa-ha-tinh-2-620994",
      category: "Renewed Import Licenses",
    },
    {
      geographicLocation: "China, India",
      description:
        "China's finished steel imports to India reached a 7-year high during April-December 2024, with China shipping 2.1 million metric tonnes",
      riskLevel: "Moderate",
      opportunityDuration: "Long-Term",
      source:
        "https://www.reuters.com/markets/commodities/indian-steel-prices-facing-risk-chinese-imports-tariff-pressures-fitch-says-2025-03-18/",
      category: "Rising Imports",
    },
  ],

  newsData: [
    {
      title:
        "Ailing China Steel Sector Seized by Talk of 'Supply Reform 2.0' - Bloomberg",
      description:
        "China's billion-ton steel industry is edging toward its biggest shake-up in a decade, with speculation growing that Beijing will order plant closures in response to a construction slowdown at home and a wave of protectionism overseas.",
      imageUrl:
        "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iO6JQ8R1sJIk/v1/1020x680.webp",
      url: "https://news.google.com/rss/articles/CBMisgFBVV95cUxQZmZXaUhQMHYwS0REb29SLTJ3MzlkaFdrbERBWkx5ZzVENkg4MXVfZE8yOVJXajJBZ0xPcjVzeU1YZTNoYUxabXVqdkRhd2VZWjEyd0RsYzF2cGJNME1tUGFLaTV1cUZBYVhqTkNLejNzZ3dzUlZfeHByQzV5Z2lYR3FHNmx4dkFWNU9vVldyY3J4S3VHdFdibHVhbGZPdW9zc21XT2tUZjFoYnFCc09EWm93?oc=5",
      published: "2025-02-28",
      relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "Supply Chain Disruption",
    },
    {
      title:
        "Iron ore logs monthly loss on China steel export concerns - ETEnergyWorld",
      description:
        "Iron ore futures prices fell on Friday and were set for monthly losses, pressured by U>S> tariff concerns and mounting trade frictions against Chinese steel exports.",
      imageUrl: "https://etimg.etb2bimg.com/photo/118624733.cms",
      url: "https://news.google.com/rss/articles/CBMivgFBVV95cUxPYnJoNFc2bklxUW9xeXM4eFpvaEV5clhmd0xWR0pwOVlwb2V0XzQway12b0ltekJSSTBoSXExaTdZQUFJVER2eGdtNTFwMEFBNWYtXzdPTVJBaE9vb0t0NnNWSi11ckh4OFd1XzgzVW9PRWhHd2NHd1U1di12amtBcU5vOTFKNmpENTdxcDZVc3lUTWF6Tk80NnJJaEdvbDgweWwwalhER1Z2V004NFpRUy1wVHRacU11dFIwV1Rn0gHDAUFVX3lxTE5BaUh0d3ZSLUJHSDJUbDhINmotRXRVMnRpbXdSU2wycmdvWUdrU042clBlc05ncjV0N21BR0o2VVAtUVgxdjdwQ0VfZlFFTVFDNnJDQW5DN0FMeXZ6TFI0blRJYzFxazVURTVOc0JjbW5nOEdCTlM2LVJ2aV96ZXBuUHZCX05aV2I0bHFqMVY3MVVmVVh5MExZWms2ZURvLW5LLVpZM2JEbjVlZHg1cVVicS1MWF9ZRGNPVWRVX2R2ME9pMA?oc=5",
      published: "2025-02-28",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998393238,
      classification: "Supply Chain Disruption",
    },
    {
      title:
        "EU steel demand may rise in Q2 despite high risks - WSD - GMK Center | English",
      description:
        "Steel demand in the European Union remains unstable, but analysts at World Steel Dynamics (WSD) forecast a gradual recovery in Q2 2025.",
      imageUrl:
        "https://gmk.center/wp-content/uploads/2024/02/shutterstock_2298455111-e1707750412770.jpg",
      url: "https://news.google.com/rss/articles/CBMiiAFBVV95cUxQQ192dWRyY2ZhSWdlQlAwWUJpOUpFUmgxWGh6Rm1yd1NJbnR1cng5VEhTZ1MtWGp6Nm1XMW1YRkl0bXNzVTdkVmh6WkMxYlowV2J1ZjE1cnpNN3pjQjFwMmNsX21PYy05WXcwSGlxcWNOc2dUOXFOTktXYU9UMjIzMUlDU0tuV1Q40gGOAUFVX3lxTE1XXzM3VUR1UzUyaGd4emFoOEdkdmxQWTlkSjU2Z1hJRzJWV2JPbnlRRHdBTWc0UmN1Qmh5a08ySmgwNWpSN3Q5aE12QndoV3ZLY2dMdGhydm5DRFJuTHMyRVQ0dFBtQldiU3c5Q1BsVE5HVUczX0NXcXdxYkdpQVpVQXdWX0V5d0tobkphV0E?oc=5",
      published: "2025-02-28",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999471605,
      classification: "Macroeconomic Events",
    },
    {
      title:
        "Vietnam steel body seeks tariffs on Chinese, Korean galvanized steel - Korea Times",
      description:
        "Vietnam's Steel Association has asked the government to impose tariffs on galvanized steel imported from China and Korea to protect domestic production.",
      imageUrl:
        "https://newsimg.koreatimes.co.kr/2025/02/28/990f0435-c42a-418e-8ce1-80db6880ee30.jpg",
      url: "https://news.google.com/rss/articles/CBMib0FVX3lxTE9ONnRrb2p1T1NIS0JvcmhEMnNyckpCYmZWZVRjQkpkdDRpT1NQMGJkc3d1QVA3TXFlUHJMbjU1c0dObHFqVzNyNWFJRGJXdFhMaE4ybmo3X3hfVEtEY3oxbVJNTTlvc2JQalhZc2JiTdIBcEFVX3lxTE03VHM2czc4Ym5JMnBQZ05ZNzFrV09HQ3V5TjhfTVYxb1BsTjhRV0h3VmhnRTZjcjlyV3M5dm5CVFU5RG5NcklpM1V1SkpwQ083YmwtcVNvUzdfYklKamxsQmZvVWhobFJMVjl1blhRUFo?oc=5",
      published: "2025-02-28",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.866850376,
      classification: "Trade & Tariff",
    },
    {
      title:
        "Steel Rebar Market Poised to Reach US$ 506.06 Billion Expanding at a 4.9% CAGR From 2025 to 2034 - EIN News",
      description:
        "The global steel rebar market has obtained traction and customary commodity and technological advancements are being initiated in the market adhoc.",
      imageUrl: "https://img.einnews.com/medium/843717/steel-rebar-market.jpeg",
      url: "https://news.google.com/rss/articles/CBMi0gFBVV95cUxONDNlRnFUbmFwYUU4UnZTeVhJbXhrMXhtWjA4NFBOTnJSLXUzRDdYZ21zZzY4MXhrdGNBTDZ4M0x6dnhnUXN5dHpReFRwdmFHSmpzVTFWemh2VWZfVmdtMGpKSElSNHY0aDRSY3ZnLWd2VnJzZzlobXhrenRLclhXaFZKZ0tQTmRNUWE2WFhyNDBfOHNEdkItTjltTFJTSlVNV2o4NENMekMtYUR2WTFMNXJsek9TRXMtbUhJSUtFVWJva240bVdORnBmeUJscWZ2YXfSAdcBQVVfeXFMTThXdUdCOXlDYTJVcHZZcVQtNEdwSldqY3hEZ282NDlIRjdueHJTcVRfRkE4M2ZXbmFZMVl3S0ZkRDlmMmZGQnBGVDl6a3JMdm9kbERScVZsOGJqeVNCNmRqZXFhRFNFSzZScTJaVjF1SUNiejRPTUh3SlhTOHJJSFYteFZUSHJzT095TVo3UnRWMnNMLVM1VVdDVmFaX0JJb0JhZXl0WjQyTWhMUV9LQTlyR0lsaDYybkstbzdZNzhaWFFnNnVvcVFXS2IxSU1CLUdtdmRhRGM?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999476969,
      classification: "Global Market Impact",
    },
    {
      title:
        "EU steel industry needs more protection, says French industry minister - Reuters",
      description:
        "Europe's ailing steel sector needs to be better protected from cheap imports as current measures are insufficient, French industry minister Marc Ferracci said on Thursday.",
      imageUrl:
        "https://www.reuters.com/resizer/v2/6LAWRE5HP5JBNOR37RDMM4STNQ.jpg?auth=64b0b668aafeaca4d3a79dbdd8337e7d468fdf181fba05af184fd60c9128abaa&width=960&quality=80",
      url: "https://news.google.com/rss/articles/CBMixwFBVV95cUxNX0dBLW5Nb1FlR2hzNzYxZXE3cHBTR1RZX1dGakJWcnlDMGdNR3JvVnJNOHVSM1BmckZhck1CNkMyQWdicDNYWkNkZXh0cWRmUTV6T01YZmxWTnF2VklxbFFJZGRZMFJWUmtES29naXJDWHpHSW91X0JUUHZRc0l3YmxSb1RYYmM3dDJwUE9MWW1fbTM0WUZ3ZlR2NUhiWmwwSGd3MVNNcE9UNl96b2lqY0tHTk1oM3ozUWxmQ1RScnFxbFZpNDR3?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "Trade & Tariff",
    },
    {
      title:
        "Global steelmakers start off 2025 at slower pace - Recycling Today",
      description:
        "Steel mills produced 4.4 percent less steel worldwide this January compared with one year ago.",
      imageUrl:
        "https://www.recyclingtoday.com/remote/aHR0cHM6Ly9naWVjZG4uYmxvYi5jb3JlLndpbmRvd3MubmV0L2ZpbGV1cGxvYWRzL2ltYWdlLzIwMjUvMDIvMjYvbnVjb3JtaWxsaW50ZXJpb3J3ZWIuanBn.2wsnkKSFoUE.jpg?format=webp",
      url: "https://news.google.com/rss/articles/CBMinwFBVV95cUxPVG5BX242OTNWWmVna01tMlppX29LZ1dqSGwxWERZQWlLMkRwTnVpNmhPdjFOVWo3WHYzMUM0VUhKUklvaWtMZG9PNjRFajVGSGFEakZnRzZVa3NXY1FDbjNRbVk3VEZVVVl3MHRBZURkRTBJU2dWcGdraU01WnZnZmdMdjVxT1JKSEp1T3BVY2l4M0JMX2xMa0Q4NWRaVzQ?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.938370705,
      classification: "Global Market Impact",
    },
    {
      title:
        "Ukraine's iron & steel industry restored its export positions in 2024 - GMK Center | English",
      description:
        "In 2024, Ukrainian iron & steel companies continued to expand their presence in foreign markets, adapting to the war. Exports grew for all items except ferroalloys, where key companies faced prolonged downtime and almost complete suspension of shipments at the beginning of the year.",
      imageUrl:
        "https://gmk.center/wp-content/uploads/2025/02/info_exp_EN-3.png",
      url: "https://news.google.com/rss/articles/CBMiowFBVV95cUxNVU9jTmpGZUc0T3dFR040TGVDenFwcG16OVhSdFVLQ0JPTktVS09LLXhPcEcwcWxSN1NfZHk5Q29TTFhLc1NZbmg4aTViWFpmZlNFaTAyaTJLd3N4TXFteW8wSGdCaDB2NmhIQUxfb1k1alMxMlFkN3ItYW5IMU5yelc5VmdhSl8wQVJyZmtkbnA1UnhmdzYxZTJnQ1ltMXBsZnlR0gGoAUFVX3lxTE9QSkhJM1JfVjltZTNQazkwUmRKTWNVbzMxYThpOENJNmhYY1FpdkY4aHF1N002ZGdHaFFOUFFFS2lzYkxqLTNuZzZOTHdaVHVQM2N1TFpJbnNsbFg5eGk1Rm9HQTNKTWVlaVVYOEhMNUdYUjAzMXRvQ2dGdUJIckVLUDVKbUpydkpuZ1U0clVyV194MTJXYjdJbkRGTkRqSTNGMVBwNlNabQ?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.99950707,
      classification: "Output & Capacity",
    },
    {
      title:
        "Iron ore falters on higher imports, Chinese steel export concerns - Yahoo Finance",
      description:
        "Iron ore futures prices closed lower on Thursday, pressured by escalating tariff measures against Chinese steel, though solid demand for the steel-making ingredient in top consumer China cushioned the downward trend.",
      imageUrl:
        "https://s.yimg.com/ny/api/res/1.2/.LoWv3RggexPOfnlC_25Qw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/reuters-finance.com/2b50304b42e09681b35c46b29e17eab4",
      url: "https://news.google.com/rss/articles/CBMigwFBVV95cUxPV1BYYUR5V2FHR0poSUljWDhQbUNEcVhlUHMxRGEteVI3amRZeEhXT2xuazBzdE1jSWR2S1huNlJyUDF5dlJxUUUxUmxPd2VuZjFua1N4RnB3dHAwNU1WcFRibnFFZjRCVnE3UEJ0TFhBcGZPNUEzdmxsUlpVdS02bWNOTQ?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998032272,
      classification: "Global Market Impact",
    },
    {
      title:
        "Anti-dumping tariffs on Chinese steel to boost local products - vietnamnews.vn",
      description:
        "The recent imposition of temporary anti-dumping duties on certain hot-rolled coil (HRC) steel products imported from China is expected to have positive impacts on certain Vietnamese steel producers, according to experts.",
      imageUrl:
        "https://image.vietnamnews.vn/uploadvnnews/Article/2025/3/20/411306_5114459879485359_1.jpg",
      url: "https://vietnamnews.vn/economy/1692879/anti-dumping-tariffs-on-chinese-steel-to-boost-local-products.html",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999502659,
      classification: "Trade & Tariff",
    },
    {
      title:
        "US HR prices rising faster than offshore tags - Steel Market Update",
      description:
        "HR Coil prices continued to rally in the US thus week, quickly outpacing price gains seen abroad.",
      imageUrl:
        "https://www.steelmarketupdate.com/wp-content/uploads/sites/2/2025/02/SMU_ForeignVs.Domestic_2025-0227_Thumbnail-1024x1024.png",
      url: "https://news.google.com/rss/articles/CBMilgFBVV95cUxQdExyRlVMMWdlSktsemRLalRNQjUyQ2R4Q2NSZkxUeEgtM29QeDIzTklTTHRTN3cyR0xaQkNhYlJzWTVmZ0RPMERJano3b2JuXzEwb3FUVWtsQWl4Q213NmV3NnUwWjhkYWdhb3R3Z1VlVWxjZlBfMFRNY1dkWHAzVW10RDdURHZLQVNlZ3U5V2ppcFhjbFE?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.992245972,
      classification: "Macroeconomic Events",
    },
    {
      title: "Steel imports increase in January - Recycling Today",
      description:
        "Citing preliminary Census Bureau data, the American Iron and Steel Institute (AISI) says the U.S. imported nearly 3.07 million net tons of steel in January, including 2.31 million net tons of finished steel, an increase of 43.5 percent and 26.5 percent, respectively, from December 2024.",
      imageUrl:
        "https://www.recyclingtoday.com/remote/aHR0cHM6Ly9naWVjZG4uYmxvYi5jb3JlLndpbmRvd3MubmV0L2ZpbGV1cGxvYWRzL2ltYWdlLzIwMjUvMDIvMjcvYWRvYmVzdG9ja18yMjQ2Nzk1MDEuanBn.-pzueAOoriw.jpg?format=webp",
      url: "https://news.google.com/rss/articles/CBMitAFBVV95cUxQUEYtMWdJd2p0dUw2Y0MzSDZFN2tTTExUVGh3Y1IyblBrdHFIaF82ekdvc2dHZDhPNzdNRjluZmtEV3ZuSWhIUTZSOEpqX3hKYVpzSV8yeUFpNU52SkZpNXZ4bVJRV2NSUnVCUVVlMHNMVW0yVnBlNUhuLU1xT3VCVWhnQnVMQm1nQ3lEd0NGSU1GSS1BUF9uOXg3TnNQSFZXZmpMVGZpekhqOXlIbG11TnRsQUg?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999599278,
      classification: "Global Market Impact",
    },
    {
      title:
        "Tariffs threaten Canadian supply chains. Here's how consumers and businesses can prepare. - UBC News",
      description:
        "UBC expert in geopolitical disruptions and supply chain risk discussed what's coming and how Canadian consumers and businesses can prepare for the upcoming U.S. tariffs on Canada.",
      imageUrl:
        "https://news.ubc.ca/wp-content/uploads/2025/02/jon-parry-iwj_2qtgrpo-unsplash.jpg",
      url: "https://news.google.com/rss/articles/CBMid0FVX3lxTE9tcHp5UDNXRDlyejNmNUtWUHhHMzVfZmgzcWt2VHpvVmYtbS1WVlZXSHp6R0VBZEpUNmFwMGpCTUV2aFdEWTN1bmxTdDZ3eEZEQ09kNzNuQkpFMTc2MjRtUnJmZDJkNkdMTGtTTm53VW01RXJqakk4?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.892233193,
      classification: "Supply Chain Disruption",
    },
    {
      title: "Durable goods orders see uptick in January - Steel Market Update",
      description:
        "New orders for manufactured durable goods rose in January after two consecutive months of declines",
      imageUrl:
        "https://www.steelmarketupdate.com/wp-content/uploads/sites/2/2025/02/black-coupe-auto-car-1024x640.jpg",
      url: "https://news.google.com/rss/articles/CBMikgFBVV95cUxOTWwzRDlXY1BKY2hNYUw2YUwxdmhJRFY4Yi15MWg3WVhhNFZ2SUg1SDNnbFhENnVZaEpaRUdIRjFzZWNod1dvci1yOFVKX18yTVZHVFNWQ1g3dTlvelIyU2ZlZU82M1lYbjJsQnVIWlJrb3BNWEpOTGVUeENqS05ENnotWXZhNld1bXk2dU9xa1djUQ?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999687791,
      classification: "Macroeconomic Events",
    },
    {
      title:
        "Used car prices are up, thanks to supply chain snarls 3 years ago - Marketplace",
      description:
        "New car leases commonly last three years. And three years ago, pandemic-induced disruptions snarled the vehicle supply chain.",
      imageUrl:
        "https://www.marketplace.org/wp-content/uploads/2025/02/GettyImages-2107850087-scaled.jpg?w=720",
      url: "https://news.google.com/rss/articles/CBMirgFBVV95cUxOaENTakI0N05TdF9kcWU2dzAxNFl0RjNQMTBJa3hTY0hhM285a080OEJna0NaamUweGF1aENNUkpRamdSNEg0X2pGVEdrd1dnaVR5cU9WalllMnF2OF9GMkw0Y1lIei1oUmZvX2NKMVVKdkVCd1FFWXBkaUd5QXdVQ1V5akZLLVpJLUlCUFB6ZTBrdWxMXzhvUWJwTXh0RDNHaWhSdUdBNjYxVFhHU2c?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999420881,
      classification: "Supply Chain Disruption",
    },
    {
      title:
        "What are tariffs, why is Trump using them, and will prices rise? - BBC.com",
      description:
        "The US has introduced a 25% tariff on all steel and aluminium imports from around the world. In response, Canada and the EU have announced new tariffs on US goods worth billions of dollars, stoking fears of a global trade war.",
      imageUrl:
        "https://ichef.bbci.co.uk/news/1024/cpsprodpb/b0e7/live/29a7f5e0-fa6c-11ef-9e61-71ee71f26eb1.png.webp",
      url: "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBweHdveUp5S2F0aGJwSEs2U2lOMkF6NzRNZTd3bEJUdTQwVjhRX0pjZmFzZ25hRzk4MHE0WW9KVkEtUjIxRUNWbXRzX3pmd1A5UWhyaE5Ja1ZWd9IBX0FVX3lxTE82Y0Q0dVVkNUhXb1o4Tkt6V1AycjA1dmkzbUs3d3JydDktMVNrSnNsNDI1Zk9BdmpMc1BQbGJneThSUDBmUkdUdFhDVTZaTTRGaGlwdDhnR3NPeXhDYW9F?oc=5",
      published: "2025-02-27",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.552496314,
      classification: "Trade & Tariff",
    },
    {
      title:
        "Ukraine reduced imports of long steel products by 38% y/y in January - GMK Center | English",
      description:
        "Deliveries for the month amounted to 6.26 thousand tons. Angles, shaped and special sections accounted for more than 50% of the total.",
      imageUrl:
        "https://gmk.center/wp-content/uploads/2023/03/shutterstock_2198817863-1-1024x538.png",
      url: "https://news.google.com/rss/articles/CBMimwFBVV95cUxNWEMzZTlSS3dCZ1JNeWw0SEpqeHFidkZRMDBFWnk1TVRWczJOSndJTjA5LWtqSVkwQnBodHNnRHFCVXE2d2RoSEI5RERGVGY5cUkyMjlNVTY5dDZtUjQ0ejQzMnZFS2U1TG5xbXFtWVJiM2FZMVF6X3laNnFTdEU4NncwSGhkVFdJYkZpbEFmR3llMWMzZTlZdEZFa9IBoAFBVV95cUxOU0VDZVFRMW54VkdQRjBlMmRNeWpJVU5relp2NnJwTlF1SV9yZFZydy1QSzNYbmN4REw2aW5adFF4aDViQm05ajNfOU9SbEd5cElrWEF4ajBfYTZNS2w1cF9UTnZMeC1qX1dhY1l3X3g0Y3YyR3VkYktua0U0M3ZUYzN2U0pZMHJCOHFYMy1CSWJEVDY1ZzBwb3lRcy1ZYTZo?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.99636215,
      classification: "Output & Capacity",
    },
    {
      title:
        "Turkey increased steel production by 7.5% m/m in January - GMK Center | English",
      description:
        "In January 2025, steel enterprises in Turkey increased steel production by 7.5% compared to the previous month, to 3.2 million tons.",
      imageUrl:
        "https://gmk.center/wp-content/uploads/2023/12/shutterstock_2266566427-1-1024x538.png",
      url: "https://news.google.com/rss/articles/CBMiiwFBVV95cUxPaUwwS2psMlpJZ3NPYXVFR3FZc3lncjFoVHdTb0dzUzlrbW14Q2RweVNiR19qMTBKQjRGRXZGcHpIb2JsOHBVajlDZDd0VkU3QlBhVldrdkZhVC1MSnNiU0VfRDlkXzQzWEpXakZWYThfMlFsM0E4WWdYWDJMV1JBWXEwU2VEb2toS3dR0gGQAUFVX3lxTE1pQ0FkelNwMkNQZ19ybzZndF9nWTc2bDgwR252UEZkUHFSdEMzaGRMNkh1MXdpRlduT1lZWWNIZzhXZF9PdVpWaUVyRjgtbzMwS3B0aV9zTVB1T2duOWNpWU5DZi0yVHM5ak1hN3pJSU1KQ3hoVjl0SG82ZUdraW9zb1VuS2I1Q2NPUXJ4ZVZkMw?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.999664187,
      classification: "Output & Capacity",
    },
    {
      title: "Trump sets tariff sight on European Union - Steel Market Update",
      description:
        "The European Union has become the next target of Trump's tariff threats.",
      imageUrl:
        "https://www.steelmarketupdate.com/wp-content/uploads/sites/2/2024/08/EU-european-union-flag-1024x683.jpg",
      url: "https://news.google.com/rss/articles/CBMikAFBVV95cUxPVFR4ajNYMkJjZzhmekJSQ2VoRDNHR3NxQ3ROUV93Mnl3VzRTV2syRGh5WEdsMnVSTnFXZUtMY3ZyY2lwYkwxd085WkhqdEFYS1pDXzRVUHFOdkNURnA3SWtXVjlRRGtUTlAxdlNVQmZteGFkeW5rT1c4R01ZTEtHZTh4bWVPbmNPdFFZU2VrYTI?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "Trade & Tariff",
    },
    {
      title:
        "AWMI Panel: Aluminum demand, production under pressure with tariffs on horizon - Steel Market Update",
      description:
        "As the steel and aluminum markets wait to see how new tariffs will play out, one big question is what they will mean for demand.",
      imageUrl:
        "https://www.steelmarketupdate.com/wp-content/uploads/sites/2/2024/11/tariffs2-300x225.png",
      url: "https://news.google.com/rss/articles/CBMivwFBVV95cUxPSl9Fa3RQQVg5V3l5X21KZ05Ed0dELTd5Qkw4V0dLV2dHLVpfaTBrUmxvVVREVzRSOFNsTktkbEwzRmV6azhJQWRsSGxaVXZmRnZEUVVXUzNzYnFFbUMwR0RUaUVwZ0RFSVNJV3FldGhhdlN5aVhTWFpfemxFd01GZXBJTjUxelBMMHZqOVFELUNpUVlPX3V4MkNzVUNaLTNIaEh2ZmZieURUT0ZwUW5YcUtGdnFlLU8wN0RlazhkMA?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.992800832,
      classification: "Trade & Tariff",
    },
    {
      title:
        "Steel Imports Up in January 2025 vs. December 2024 - American Iron and Steel Institute",
      description: "Finished Import Market Share YTD at 25%",
      imageUrl:
        "https://www.steel.org/wp-content/themes/steel-org/assets/images/steel-logo.png",
      url: "https://news.google.com/rss/articles/CBMihwFBVV95cUxQLXlKUFBSZ1VjX2lTZ2ZDTWxFa0ZZVXE1Y3pqaHV5Q0stV3JmNU9yQkRwWkp2dDJ2SVVaRUhWa2JDWHptTVhvUnNKMVRvWUlRcW9tZGpRd3E1MjhxczRBTnhTa2xqTFU2bFVpOWhMNWlzc0t3ckxicDVxSjRXRVhZV010VkNLUGM?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.998509705,
      classification: "Global Market Impact",
    },
    {
      title:
        "Iron ore dips on Chinese steel export concerns, US-Sino trade tensions - TradingView",
      description:
        "Iron ore futures prices weakened for a third straight session on Wednesday, weighed by a dampening outlook for Chinese steel exports and rising trade tensions between the U.S. and top consumer China.",
      imageUrl: "https://s3.tradingview.com/news/logo/reuters--theme-light.svg",
      url: "https://news.google.com/rss/articles/CBMi1gFBVV95cUxNMHpNUFg2VGxjN2Jnb2x3anRiaUc1RW1qRF9BaHZWejdRMUR1Z2k1c1NZbkdpdjQxVHBidVlUNDJJWmdRZnJDZmN6d2dtZ1F2bkJsdzdVQ3RJODJjcjJjYS1NUVZmR2c1MmI4MHNKNGJ2UmRtLWdWTktkN21MX2czLU5WWUVzQi14Q240bDZ4MVREclM2MWdXM0c3aXBpVWlGSGVmallNNTJvaE1NODRtX0dFZ240VmJSWEtveWtLZXUtdUlqZmZEcmNjcjNiOHZZRE9CYmVB?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998182654,
      classification: "Geopolitical Factors",
    },
    {
      title:
        "Dalian iron ore extends losing streak on Chinese steel export outlook - TradingView",
      description:
        "Iron ore futures prices weakened for a third consecutive session on Wednesday, weighed down by dour outlook for Chinese steel exports and heightened trade tensions between the U.S. and top consumer China.",
      imageUrl: "https://s3.tradingview.com/news/logo/reuters--theme-light.svg",
      url: "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQX05sdzFiM2lMUUZISnVKZ2hpSkFCdi10US04Q3ctT3FiOVZMaXNpcXhCZUlJWVNlVC03ZWc3WV9NVHk5YnhqbFJzWlB5UmN1UGMtbnRtM0VHcVNUSl8zdTVjUmprekYwSlM4NVVEZ0ZFT2x0M0hHWkdWcFlRaTZRR3R4ZzNSYWU4WEQzNDlIVXFkZlR4SzJycmFaU284RGZPTWtlRmVJMUlBa2JhR0JhRU4wTUU5MFpWaWJxOUxpdHZqbG5HckQ0VlVuOTg1RHc0RWsxUmRB?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998547137,
      classification: "Global Market Impact",
    },
    {
      title:
        "Dalian iron ore extends losing streak on Chinese steel export outlook - Yahoo Finance",
      description:
        "Iron ore futures prices weakened for a third consecutive session on Wednesday, weighed down by dour outlook for Chinese steel exports and heightened trade tensions between the U.S. and top consumer China.",
      imageUrl:
        "https://s.yimg.com/ny/api/res/1.2/iTHT7RFKHJNckfA99KkLTw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTc0NTtjZj13ZWJw/https://media.zenfs.com/en/reuters-finance.com/8fded849425c06785a20345bf1cd7aff",
      url: "https://news.google.com/rss/articles/CBMifkFVX3lxTFBuSXA1MU5GYkg2OWlfdU1PV0RDZXlXaFJGZDRGUVIzbXlYajRGUDJXUnpkdHFwakd1SFJoMi1fZjAtQkVXRUstV3NsZGNVZGtRcUFQTFpEQ0JOdnRfa0NCbnV0b09PaXo1WXgtMnBXZVhZUU1CWUxMQXdybGdXdw?oc=5",
      published: "2025-02-26",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998580575,
      classification: "Global Market Impact",
    },
    {
      title:
        "Global steel production in January decreased by 4.4% y/y - GMK Center | English",
      description:
        "Global steel production in January 2025 decreased by 4.4% compared to the same month in 2024 - to 151.4 million tons. The figure increased by 4.8% compared to the previous month.",
      imageUrl:
        "https://gmk.center/wp-content/uploads/2023/10/shutterstock_1594042801-1.jpg",
      url: "https://news.google.com/rss/articles/CBMiiwFBVV95cUxOS1I1OTZoRnFJZjVMV3o4WTMyZ1hoc2RSZExjR3hzbnhGV2syQzBVZGFuQm52OUxFYWxCZGRBbENTenJKYnJ1MGZQQUVhVFlFV2Z3SWNXamQxZEJmWE50azFDaXhLSHJhYVBvbFRLWTdvQVhOZXBaejZ5d3ZvbHVid3dIQUswX3dBakNv0gGQAUFVX3lxTFA1ZWVjX1RyeVZvU3VYeTdNemlITHhMZE1FTzJHVVViWjZVbzZFVU82d3p2SlN3U2stUXZfc2NhVkY2dGVVeG5IVm02TDhkejJ3ak9FT29JNlRNM3ExYm1lVmxYUHdKT21iZnByeEswODNSLXcxMzdkM0E5MWJtWmdTUHgyOHdRYnJmQW85eElzNA?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998424411,
      classification: "Global Market Impact",
    },
    {
      title: "Iron ore price slump to knock ARM interim earnings - Miningmx",
      description:
        "THE decline in iron ore prices is expected to feature heavily in the interim results of African Rainbow Minerals (ARM) scheduled for March 7.",
      imageUrl:
        "https://www.miningmx.com/wp-content/uploads/2017/08/Application_Iron-Ore_723x365.jpg",
      url: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPZXg0c1RUbTFCbjlSNG1paGZKTGwtZXFBWEtLaXJhUTZiZ05WYkd3Z2pSTk0tQXBPNkUzaXVwMHZQLVhZN21zcE1mSHo1TlRKM1ctcUVXQmpqZVRvbFpGUGRJT1dxX18wb2R1em0xbjlnVTNoM3VZVjlmaEcyRlBHWjFwa1R2V1MyMHhZRGRoeklhQkx2RzlN?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.99858129,
      classification: "Global Market Impact",
    },
    {
      title:
        "EU promises support for steel sector as US trade tariffs loom - Kitco NEWS",
      description:
        "The EU Commission on Tuesday said it will present plans to make Europe's ailing steel sector more competitive and to shield it from looming US trade tariffs in the spring.",
      imageUrl:
        "https://images.kitco.com/img/height_756,width_1340/icms/4f4bfcc6-f6ca-473f-b229-b22ec6be021e.png",
      url: "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQeTVPZkcxaGRWdXc0Nm1rTm02X19jY3NfS2F4X2NaNXdLZmJBaWFHWlBEZ0paQmhIS1c2NDdGSTBIQ0JCQmcyUnBMVzJRcTYzaFp1cHBwV3Vyejc4RVItQXh2VVNnMko5ZnU5cWM3MXltWXVKYzN3aVhIQ1NNYzA0UWVkSGJ3cTRqV0IxclNzckFneDNreWxjSXczdnVOOFJjUFlWNjE1dmM?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.998936117,
      classification: "Trade & Tariff",
    },
    {
      title:
        "Iron ore declines on recovery in shipments, duties on Chinese steel - Reuters",
      description:
        "Iron ore futures prices faltered on Tuesday, weighed down by a recovery in iron ore shipments, with increasing levies and legislations on Chinese steel exports putting further pressure on sentiment.",
      imageUrl:
        "https://www.reuters.com/resizer/v2/EBX6X4QTJFKZFCRU5NJ7FQBHUQ.jpg?auth=19eae76b295e2b7c6625997a1d97bfb145620eb03ed4e4f9053c956b2be75822&width=960&quality=80",
      url: "https://news.google.com/rss/articles/CBMiswFBVV95cUxOR0dzcHdYUVF4Q1F4NVFqajNnYXNiVEd0d2tKbUlkMjJrbkhlWHJ5MVk0QWxPV0kxWXZYbXpzTlQ0dnNpcERadGJyVnZoWHlqcEh6WldQUERuVmYxMUQySHhLNFlUbnhUWWJBMDZ0MEttcWZCTU9xeTJuWGx5UE82NzRUaVZlSVlLY0RXTktLOVpGX3ViN25GVkdVak1JVkRCS3h3VUhDZmVfXzljdkVKR3dQVQ?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998391092,
      classification: "Trade & Tariff",
    },
    {
      title:
        "Spot Supply Remains Ample; Tenth Round of Coke Price Cuts May Be Implemented - SMM - Shanghai Metals Market",
      description:
        "Spot supply remained ample, while demand recovery was relatively slow. The tenth round of coke price cuts is expected to materialize, and no new significant favorable macro factors have emerged to boost the market.",
      imageUrl:
        "https://imgqn.smm.cn/production/admin/news/cn/pic/lQxDS20250225154859.png?imageView2/2/w/800",
      url: "https://news.google.com/rss/articles/CBMiogJBVV95cUxQLTN0bmxxZ0U2MUxIUmFvckNWWjJDUHBiNVRQLUlodExZSnJaT2xtcFcxUlBYTmlnd21UcTBER01JZ3ZQcVNCbHVuTGR2R1NlZ2pLOUZwTUpQTlBJQV9vVjVoNUstM0M1OUZ5VzFDdVlEdE92Rlp0bHBaRUdDNFhCUXVGa0hENXVwcjFZdkVVcW92LW1GOWpCSEZ1UllVWVNZUDI0dVlvQ2dwbWVFOTg5QzYtTy1ibkJCMkNDcVhWZFdteG1oYnJnYldBQnZxSy1YOUNpcFl2Vk5CYnlrOG5kSWNZdWFKZ0hUMGsyVEkxRDZvNDA0N19udVpNeWVEelNyYndCdlJGc3ZWZHBvZDRpMXd1Qy1qWks2eUVmZUFKQkctdw?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: 1,
      sentiment_continuous_score: 0.514158547,
      classification: "Output & Capacity",
    },
    {
      title: "Outlook for coking coal continues to be bearish - BusinessLine",
      description:
        "The outlook for coking (metallurgical) coal prices continues to be bearish due to poor steel production growth and a generally weak sentiment towards commodities priced in the US dollar after the election of US President Donald Trump.",
      imageUrl:
        "https://bl-i.thgim.com/public/incoming/tyowcl/article69261887.ece/alternates/LANDSCAPE_1200/IMG_Coal_mining_in_an_op_2_1_55DPQ2KD.jpg",
      url: "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPbWYzS0tYMmZGdURnb2dHeFotRkIzckV4Qm0wY1NEU2trOU43TlNWVnBwYWFHTWlxLTd6U0pqVjhYS3dBU2hYUGV5b3U1NHBibFdMdVFPNGQ3N0RtX2otc05IVDhfaUlBWXZkVlMzdW5nMG1BMmtfT1NuSkZwemFjQ0tSa3g5ZDRHSnd5REFWcW4xR0tnZ0Z2RndPam1HRkN6V0xDTi1nY0Y1aUdoU1Y0UFMtZ01ldVZVb0tqZktXY3R6d9IByAFBVV95cUxPQlJueGVQNWllQkh4OEhKUy1FempGNlZMaU5KOW5OcUQzclp3ZC11ZW1sZWpudGZCZHF2cHo4YmNJdmtvWWRKMkZmb1cxZ0wxb00wMnJ2UE8zZnVScm52TG52c0RKMWFOMndZMHQ1MWRQV29MS2xINDY2emtWTVM1a2lwSWhGWVpzSTRXbWU2MjZwMlJoUDFKVmhWa1VnRktWVFRSN3hwV1RLQ0szaU90QUZNb0g4ODJINnlpR0JSR3Ntb0ZWeTRfYg?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998263657,
      classification: "Global Market Impact",
    },
    {
      title:
        "Bulk Buys: Met coal price forecasts slide; M&A shows hunger for iron ore still remains - Stockhead",
      description:
        "S&P Global has revised down its met coal forecasts for both the March quarter and full year. Indian steel demand has been unable to lift prices for Aussie producers, with thermal coal sinking even further.",
      imageUrl:
        "https://stockhead.com.au/wp-content/uploads/2025/02/GettyImages-181817319-1200x675-1-1024x576.jpg",
      url: "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNMzJQRnU2ZHVGUkdFR3M1ZXVWeEN6cUFBbXRzZ3pfa1Z1aHRRMXVsaTBKWXFSa0dlbHlFXzl6OG9OazNTalRrcFZ3Y1JtcVVVZzkweWdpbDhsMmtHelVaZ3FwQlNEOGxaYUpGUWoyWEY1RDhrb1VYMXZidnktNkxIckdybDF2QUdjdExZdHZMYXJEaV9idkpOWTh0QU8zOGJjWlNjd21NMWMtQi16T19aVGk3YW91LUlOTDdr0gHAAUFVX3lxTE1UQkpuZXZldFVucTNVVnB1TkZ1elV2YzFiU3hKMDVXNFRHTllwN1RJb2x0QVBoSjFxREwwUEZJVlpaSGNIVW5iemxEcTlKQ1BaMHlNQXV2UFlXNU9Ua3h6dDRBS2xJREtkTmkteTVDZE5xSkFxU0RzdUZXclBrcjRXZFhOSmRqa1JkRy1XTXAzUW12cW1nenVNaTdtNFJQM2xRQm4xQkxFSHBtb2JoREtlVmh6cVNYR0pYMUhWTGFOcA?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: -1,
      sentiment_continuous_score: -0.998430192,
      classification: "Global Market Impact",
    },
    {
      title:
        "The Impact of Tariffs on Vietnamese Exports: US-Vietnam Trade Relations Under Trump 2.0 - Vietnam Briefing",
      description:
        "Over the course of February, US President Donald Trump announced a series of escalating tariffs aimed at key US trading partners, with Canada, Mexico, and China the first targets, as well as blanket tariffs on steel and aluminum imports and a worldwide reciprocal tariff plan. ",
      imageUrl:
        "https://www.vietnam-briefing.com/assets/images/logo-vb-slogan.svg",
      url: "https://news.google.com/rss/articles/CBMirwFBVV95cUxOWjloeGYxcm5BZW5WMTQ4cExTTmVad2FETzRTdzlEM21FLWI1eENLbnJiNVItVEhFbTlWUkdsUlZIVlptUmpxMkUxVFM0WWVCeWFzQmZpRnR1Z2hNcXdsV3pyUVhaQi0xdjdTVk9hSHlsUDlCMGJnLXAtdTh0YkdBak1sQ05ReU1CMXFLMF96SnpvdEdFckRMLVE4MGhQVnB4YWdaUkJ6UjkwNkZzeE5n?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "Trade & Tariff",
    },
    {
      title:
        "Survey: Freight Industry Prepares for Supply Chain Shocks in 2025 - SupplyChainBrain",
      description:
        "As disruptions have become the new normal for the transportation industry, the majority of shippers and ocean carriers say that they're prepared to handle whatever is thrown their way in 2025.",
      imageUrl:
        "https://www.supplychainbrain.com/ext/resources/2023/11/14/SHIPPING-CONTAINERS-iStock--Fahroni--1411027460.jpg?t=1699982713&width=1080",
      url: "https://news.google.com/rss/articles/CBMisgFBVV95cUxNb1RPYWdxbVppemJGTmxNN1hXcGVjd0V1NGE0Q0hadk1oLS1LZ1RpMzhfRHk0b1lVM3Q2RHQ0WElPeG10dFEyZ1F3ZVZlcUd4Z2RqZzhfVi1NX1dSTlRkdWRJbm05cUZfejB0TUd1NU1GSWpWMTU3TU05U2tvaWNvOGxvRFdNOWg3U29VbExsMmhDWVNvQXlsVEJfS1BkdnlHZDdNQzdXWXZXNmhwZUJpdjV3?oc=5",
      published: "2025-02-25",
      relevance: 1,
      sentiment_score: 0,
      sentiment_continuous_score: 0,
      classification: "Supply Chain Disruption",
    },
  ],
};

