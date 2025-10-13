export const KPI_DATA = {
  HRC: [
    { label: "Commodity", value: "HRC" },
    { label: "Delta", value: "₹ 1.14 Rs/Kg | Q2 2025" },
    { label: "Last Quarter Close Price", value: "₹ 52,550 | Mar–2025" },
    { label: "Q1-2025 (Jan-Mar)", value: "—" },
    { label: "Q2-2025 (Apr-Jun)", value: "—" },
  ],
  CRC: [
    { label: "Commodity", value: "CRC" },
    { label: "Delta", value: "₹ 1.90 Rs/Kg | Q2 2025" },
    { label: "Last Quarter Close Price", value: "₹ 59,350 | Mar–2025" },
    { label: "Q1-2025 (Jan-Mar)", value: "—" },
    { label: "Q2-2025 (Apr-Jun)", value: "—" },
  ],
};

/* --- CHART DATA --- */
export const hrcWaterfallData = [
  { label: "Safeguard Duty Enforcement", y: 67 },
  { label: "Macroeconomic Tailwinds", y: 30 },
  { label: "Sentiment & Spec Holdouts", y: 15 },
  { label: "Domestic Supply Disruptions", y: 13 },
  { label: "Export Slump", y: -5 },
  { label: "Input Cost Relief", y: -5 },
  { label: "Seasonal Infra & Housing Slump", y: -7 },
  { label: "Import Pressure", y: -8 },
  { label: "Total", isIntermediateSum: true, color: "#0056b3" },
];

export const crcWaterfallData = [
  { label: "Safeguard Duty Enforcement", y: 68 },
  { label: "Macroeconomic Tailwinds", y: 29 },
  { label: "Sentiment & Speculative Holdouts", y: 15 },
  { label: "Spread Defense (CRC–HRC Compression)", y: 14 },
  { label: "U.S. Tariff Shock (China → SEA Diversion Risk)", y: -4 },
  { label: "White Goods & Appliance Demand Dip", y: -4 },
  { label: "Input Cost Relief (Coking Coal, Iron Ore)", y: -5 },
  { label: "CRC Export Slump (Italy, EU)", y: -6 },
  { label: "Import Pressure (Korea, Japan)", y: -7 },
  { label: "Total", isIntermediateSum: true, color: "#0056b3" },
];

/* --- DELTA TABLE DATA --- */
export const hrcTableRows = [
  // (same as your original HRC data...)
  {
    component: "Safeguard Duty Enforcement (Formal Imposition)",
    share: "67.00%",
    justification:
      "Formal post-April 22 imposition lifted mill pricing confidence, triggering April spike. Effect fully internalized by May.",
    pathway: "Reflected in import contraction and April WPI-HRC price uptick.",
  },
  {
    component: "Macroeconomic Tailwinds (GDP, IIP, Inflation)",
    share: "30.00%",
    justification:
      "Moderate IIP resilience and inflation control provided limited support to price floors but couldn't offset other pressures.",
    pathway:
      "Modeled via CPI/WPI, IIP, PMI trends, and fiscal capex timelines.",
  },
  {
    component: "Sentiment & Speculative Holdouts (Apr only)",
    share: "15.00%",
    justification:
      "Buyer pushback softened in May–June. Holdouts lost strength as safeguard narrative matured.",
    pathway:
      "Captured via offer resistance, transaction lag data, and April resistance band in pricing curve.",
  },
  {
    component: "Domestic Supply Disruptions (JSW, Tata)",
    share: "13.00%",
    justification:
      "JSW Dolvi and Tata outages reduced supply in April–early May. Supply normalized by mid-June.",
    pathway:
      "Seen in production dip, inventory pipeline lag, and spot price leadership pattern.",
  },
  {
    component: "Export Slump (Domestic Inventory Overhang)",
    share: "-5.00%",
    justification:
      "Finished steel exports fell ~25.7% YoY in April, redirecting surplus into the domestic market and creating inventory drag.",
    pathway:
      "Modeled via export data, domestic production > consumption, and inventory rollover into May.",
  },
  {
    component: "Input Cost Relief (Coking Coal, Iron Ore)",
    share: "-5.00%",
    justification:
      "Coal and ore prices softened through June, easing mill-side margin stress and reducing cost-push justification.",
    pathway:
      "Tracked via commodity indices, steel WPI–input WPI gap, and margins reconstructed from cost benchmarks.",
  },
  {
    component: "Seasonal Infra & Housing Demand Slump (Monsoon)",
    share: "-7.00%",
    justification:
      "Infra-linked steel demand declined mid-June as monsoon delayed project timelines across key regions.",
    pathway: "Observed via IIP–infra segment dip and buyer delay patterns.",
  },
  {
    component: "Import Pressure (Korea, China Spillover)",
    share: "-8.00%",
    justification:
      "Korean and Japanese HRC imports remained strong despite the 12% duty. U.S. tariff on China (June 4) raised redirection risk into Asia, capping strong import flow.",
    pathway:
      "Modeled via import volumes, landed cost comparison, and import share in total CRC availability.",
  },
];

export const crcTableRows = [
  {
    component: "Safeguard Duty Enforcement (Formal Imposition)",
    share: "68.00%",
    justification:
      "CRC gained pricing strength in April from the 12% safeguard duty. However, the impact was absorbed early in Q2 and did not hold in June.",
    pathway: "Reflected in import volume dip, domestic CRC price firming.",
  },
  {
    component: "Macroeconomic Tailwinds (GDP, IIP, Inflation)",
    share: "29.00%",
    justification:
      "Moderate industrial resilience and IIP stability cushioned sharp price declines early in the quarter.",
    pathway: "Modeled via macroeconomic indicators like IIP, CPI/WPI trends.",
  },
  {
    component: "Sentiment & Speculative Holdouts (Apr only)",
    share: "15.00%",
    justification:
      "Buyer pushback softened in May–June. Holdouts lost strength as safeguard narrative matured.",
    pathway:
      "Captured via lagged buyer resistance and deal-level trade resistance patterns in early Q2.",
  },
  {
    component: "Spread Defense (CRC–HRC Compression)",
    share: "14.00%",
    justification:
      "With HRC prices falling, mills reduced CRC margins to preserve competitiveness and volume. Spread narrowed significantly.",
    pathway:
      "Modeled via internal spread ratio tracking (₹/kg), price floor correlation, and rolling average adjustment triggers.",
  },
  {
    component: "U.S. Tariff Shock (China → SEA Diversion Risk)",
    share: "-4.00%",
    justification:
      "U.S. doubled steel tariffs on China (June 4). Potential redirection of Chinese CRC to SEA adds softening pressure.",
    pathway:
      "Captured via media/API tagging, price holding pattern in offers, and deviation from seasonal decline trend.",
  },
  {
    component: "White Goods & Appliance Demand Dip",
    share: "-4.00%",
    justification:
      "Seasonal dip in white goods, durables, and infra CRC use triggered lower buying volumes through June.",
    pathway:
      "Reflected in IIP for consumer durables, CPI for appliances, and consumption < production delta.",
  },
  {
    component: "Input Cost Relief (Coking Coal, Iron Ore)",
    share: "-5.00%",
    justification:
      "CRC benefitted from falling ore and coking coal prices, softening mill push for markups.",
    pathway:
      "Tracked via commodity indices, steel WPI–input WPI gap, and margins reconstructed from cost benchmarks.",
  },
  {
    component: "CRC Export Slump (Italy, EU)",
    share: "-6.00%",
    justification:
      "CRC exports fell ~60% to Italy; total CRC exports declined ~24%. This flooded the domestic market with surplus CRC.",
    pathway:
      "Captured via export volume decline, CRC production > consumption spread, and month-end inventory increases.",
  },
  {
    component: "Import Pressure (Korea, Japan)",
    share: "-7.00%",
    justification:
      "CRC imports stayed firm despite 12% duty, especially from Korea. These landed prices acted as price ceiling signals.",
    pathway:
      "Modeled via import volumes, landed cost comparison, and import share in total CRC availability.",
  },
];

/* --- SCENARIO DATA --- */
export const hrcScenarioRows = [
  {
    scenario: "Base Case (Currently Active)",
    summary:
      "Pricing stabilizes after April highs; safeguard impact is fully priced in; May–June corrections reflect seasonal demand drop and easing cost pressures.",
    deltaRange: "₹1.14",
    priceRange: "₹53,700",
    drivers:
      "Safeguard duty priced in, mill offers steady, slight demand dip in June.",
    action:
      "Lock majority of volumes now. Use mix of fixed and short-term flexible rates to stay responsive.",
  },
  {
    scenario: "Downside",
    summary:
      "US Tariffs cause increased trade diversion into India, Prices may fall more if demand drops and mills cut offers due to rising inventory or cost relief.",
    deltaRange: "₹0.65 – ₹1.05",
    priceRange: "₹53,200 – ₹53,600",
    drivers:
      "Higher supply, monsoon slowdown, export weakness, raw material decline.",
    action:
      "Pause large-volume buys. Lock small lots on flexible terms. Be ready to negotiate lower in late June.",
  },
  {
    scenario: "Upside",
    summary:
      "Prices may rise if supply tightens again or duty hike speculation gains traction.",
    deltaRange: "₹1.25 – ₹1.80",
    priceRange: "₹53,800 – ₹54,350",
    drivers: "Stronger infra demand, safeguard duty hike speculation.",
    action:
      "Advance volume locking. Secure rates with caps or conditional clauses to protect against further hikes.",
  },
];

export const crcScenarioRows = [
  {
    scenario: "Base Case (Currently Active)",
    summary:
      "Prices are higher than March but have stabilized in June. No new hikes despite duty and cost signals.",
    deltaRange: "₹1.9",
    priceRange: "₹61,250",
    drivers:
      "Safeguard duty priced in, CRC–HRC spread narrowed, export and demand remain weak.",
    action:
      "Lock most volumes now with short-term flexibility. Monitor for any reversal or rebound signs in July.",
  },
  {
    scenario: "Downside",
    summary:
      "Prices may fall if export slump continues and imports remain strong. US steel tariffs cause increased trade diversion into India.",
    deltaRange: "₹1.40 – ₹1.75",
    priceRange: "₹60,750 – ₹61,100",
    drivers:
      "CRC imports remain elevated, end-user demand (appliances, infra) still soft, cost relief holds.",
    action:
      "Hold volumes unless urgent. Lock only 50% with renegotiation window. Watch for spot opportunities.",
  },
  {
    scenario: "Upside",
    summary:
      "Prices may rise if safeguard duty is hiked or mills regain pricing power via supply tightening.",
    deltaRange: "₹2.10 – ₹2.50",
    priceRange: "₹61,450 – ₹61,850",
    drivers:
      "Speculative duty hike, import drop, or improved demand from infra/auto.",
    action:
      "Lock all pending volumes quickly. Use volume-linked or escalation-capped contracts to avoid overpaying.",
  },
];
