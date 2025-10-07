import React from "react";
import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { formatCompactNumber } from "../../../Config/formatCompactNumber";

const News = [
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
    description: "Laminated Steel Market Size & Share | Industry Report, 2030",
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
      "Vietnam steel body seeks tariffs on Chinese, Korean galvanized steel - ì½”ë¦¬ì•„íƒ€ìž„ìŠ¤",
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
    description: "Hyundai Steel sales to global car firms tops 1 million tons",
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
    title: "Global steelmakers start off 2025 at slower pace - Recycling Today",
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
];

const macroIndicator = [
  { name: "WPI CRC", value: 0.96 },
  { name: "WPI HRC", value: 0.95 },
  { name: "CRC", value: 0.83 },
  { name: "CPI", value: 0.79 },
  { name: "GDP", value: 0.76 },
  { name: "Consumption", value: 0.6 },
  { name: "Production", value: 0.46 },
  { name: "Export", value: 0.35 },
  { name: "Import", value: -0.52 },
];

const accuracy = [98.84, 95.29, 94.52, 88.42];

const macroChartOptions = {
  chart: { type: "bar" },
  xaxis: { categories: macroIndicator.map((item) => item.name) },
  plotOptions: { bar: { horizontal: true } },
  dataLabels: { enabled: true },
  colors: ["var(--color-main-light)"],
};

const macroChartSeries = [
  { name: "Correlation", data: macroIndicator.map((item) => item.value) },
];

const accuracyChartOptions = {
  chart: { type: "bar" },
  xaxis: { categories: ["Sarimax", "Holt's", "Xgboost", "Prophet"] },
  plotOptions: { bar: { horizontal: false } },
  dataLabels: { enabled: true },
  colors: ["var(--color-main)"],
};

const accuracyChartSeries = [{ name: "Accuracy", data: accuracy }];

const cardStyle = {
  background: "white",
  borderRadius: "5px",
  boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
  height: "280px",
  padding: "10px",
};

// Generate date range from Oct 1, 2023, to Sep 1, 2025
const data = [
  { date: "2023-10-01", actualPrice: 58925, predictedPrice: 56479.05 },
  { date: "2023-11-01", actualPrice: 57925, predictedPrice: 56929.73 },
  { date: "2023-12-01", actualPrice: 57175, predictedPrice: 55509.93 },
  { date: "2024-01-01", actualPrice: 56425, predictedPrice: 55073.81 },
  { date: "2024-02-01", actualPrice: 56175, predictedPrice: 56302.52 },
  { date: "2024-03-01", actualPrice: 54550, predictedPrice: 54560.44 },
  { date: "2024-04-01", actualPrice: 54850, predictedPrice: 54762.99 },
  { date: "2024-05-01", actualPrice: 55750, predictedPrice: 54094.08 },
  { date: "2024-06-01", actualPrice: 55050, predictedPrice: 55346.4 },
  { date: "2024-07-01", actualPrice: 53650, predictedPrice: 54777.66 },
  { date: "2024-08-01", actualPrice: 52650, predictedPrice: 53576.77 },
  { date: "2024-09-01", actualPrice: 49950, predictedPrice: 51652.54 },
  { date: "2024-10-01", actualPrice: 51179.86, predictedPrice: 51179.86 },
  { date: "2024-11-01", actualPrice: null, predictedPrice: 51731.6 },
  { date: "2024-12-01", actualPrice: null, predictedPrice: 50816.18 },
  { date: "2025-01-01", actualPrice: null, predictedPrice: 51198.06 },
  { date: "2025-02-01", actualPrice: null, predictedPrice: 52273.89 },
  { date: "2025-03-01", actualPrice: null, predictedPrice: 51102.61 },
  { date: "2025-04-01", actualPrice: null, predictedPrice: 53129.77 },
  { date: "2025-05-01", actualPrice: null, predictedPrice: 52446.02 },
  { date: "2025-06-01", actualPrice: null, predictedPrice: 52158.56 },
  { date: "2025-07-01", actualPrice: null, predictedPrice: 51575.18 },
  { date: "2025-08-01", actualPrice: null, predictedPrice: 51455.63 },
  { date: "2025-09-01", actualPrice: null, predictedPrice: 51855.18 },
];

// Prepare series data
const actualPrices = data.map((item) =>
  item.actualPrice !== null ? item.actualPrice : null
);
const predictedPricesSolid = data.map((item, index) =>
  index <= 12 ? item.predictedPrice : null
);
const predictedPricesDashed = data.map((item, index) =>
  index > 12 ? item.predictedPrice : null
);

const chartOptions = {
  chart: { type: "line", height: 300 },
  xaxis: {
    categories: data.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    }),
    tickAmount: Math.ceil(data.length / 5), // Show fewer X-axis labels
  },
  stroke: {
    width: [3, 3, 3],
    dashArray: [0, 0, 5],
    curve: "smooth",
  },
  colors: ["var(--color-main-light)", "var(--color-main)", "#FFA500"], // Updated colors
  markers: { size: 3 },
  dataLabels: { enabled: false },
  legend: { position: "top" },
};

const series = [
  { name: "Actual Price", data: actualPrices },
  { name: "Predicted Price (Solid)", data: predictedPricesSolid },
  { name: "Predicted Price (Dashed)", data: predictedPricesDashed },
];

const chartOptions2 = {
  chart: {
    type: "line",
  },
  xaxis: {
    categories: [
      "geo-political factor",
      "climate and sustainability",
      "trade and tariff",
      "global market impact",
      "macro-economic events",
      "output and capacity",
      "supply chain disruptions",
    ],
  },
  yaxis: [
    {
      labels: { formatter: (val) => `$${val.toFixed(2)}` },
    },
    {
      opposite: true,
    },
  ],
  stroke: { width: [4, 0], curve: "smooth" },
  plotOptions: {
    bar: { columnWidth: "30%" },
  },
  dataLabels: {
    enabled: true,
    style: { fontSize: "12px" },
  },
  legend: {
    position: "bottom",
  },
  colors: ["var(--color-main)", "var(--color-main-light)"], // Line Blue, Bar Dark Blue
};

const chartSeries2 = [
  {
    name: "Event Occurrence",
    type: "line",
    data: [13, 21, 59, 127, 94, 58, 60],
  },
  {
    name: "Price Impact",
    type: "column",
    data: [21, 9, 0.86, 3.3, 5.33, 5.59, 12.04],
  },
];

const data2 = [
  {
    CPI: 0.13538294,
    CRC: 0,
    GDP: 0,
    HRC: 0.147437852,
    Date: "4/1/2015",
    WPI_CRC: 0.165745856,
    WPI_HRC: 0.157581764,
  },
  {
    CPI: 0.01294964,
    CRC: 0.157316409,
    GDP: 0,
    HRC: 0.149556258,
    Date: "5/1/2015",
    WPI_CRC: 0.144751381,
    WPI_HRC: 0.139742319,
  },
  {
    CPI: 0.033093525,
    CRC: 0.102160397,
    GDP: 0,
    HRC: 0.100399608,
    Date: "6/1/2015",
    WPI_CRC: 0.128176796,
    WPI_HRC: 0.114965312,
  },
  {
    CPI: 0.041726619,
    CRC: 0.076459127,
    GDP: 0.024503983,
    HRC: 0.070212322,
    Date: "7/1/2015",
    WPI_CRC: 0.098342541,
    WPI_HRC: 0.086223984,
  },
  {
    CPI: 0.058992806,
    CRC: 0.057663104,
    GDP: 0.024503983,
    HRC: 0.049846737,
    Date: "8/1/2015",
    WPI_CRC: 0.070718232,
    WPI_HRC: 0.066402379,
  },
  {
    CPI: 0.067625899,
    CRC: 0.070198562,
    GDP: 0.024503983,
    HRC: 0.089871772,
    Date: "9/1/2015",
    WPI_CRC: 0.06961326,
    WPI_HRC: 0.083250743,
  },
  {
    CPI: 0.077697842,
    CRC: 0.066430761,
    GDP: 0.050841707,
    HRC: 0.080740158,
    Date: "10/1/2015",
    WPI_CRC: 0.050828729,
    WPI_HRC: 0.065411298,
  },
  {
    CPI: 0.084892086,
    CRC: 0.046374029,
    GDP: 0.050841707,
    HRC: 0.030187286,
    Date: "11/1/2015",
    WPI_CRC: 0.036464088,
    WPI_HRC: 0.042616452,
  },
  {
    CPI: 0.077697842,
    CRC: 0.014412194,
    GDP: 0.050841707,
    HRC: 0.03440805,
    Date: "12/1/2015",
    WPI_CRC: 0,
    WPI_HRC: 0.003964321,
  },
  {
    CPI: 0.08057554,
    CRC: 0,
    GDP: 0.098649794,
    HRC: 0,
    Date: "1/1/2016",
    WPI_CRC: 0.002209945,
    WPI_HRC: 0,
  },
  {
    CPI: 0.076258993,
    CRC: 0.038852755,
    GDP: 0.098649794,
    HRC: 0.051259007,
    Date: "2/1/2016",
    WPI_CRC: 0,
    WPI_HRC: 0.014866204,
  },
  {
    CPI: 0.076258993,
    CRC: 0.065184379,
    GDP: 0.098649794,
    HRC: 0.065301472,
    Date: "3/1/2016",
    WPI_CRC: 0.04198895,
    WPI_HRC: 0.059464817,
  },
  {
    CPI: 0.094964029,
    CRC: 0.068937853,
    GDP: 0.086426488,
    HRC: 0.085651009,
    Date: "4/1/2016",
    WPI_CRC: 0.04640884,
    WPI_HRC: 0.064420218,
  },
  {
    CPI: 0.113669065,
    CRC: 0.083980402,
    GDP: 0.086426488,
    HRC: 0.088459502,
    Date: "5/1/2016",
    WPI_CRC: 0.075138122,
    WPI_HRC: 0.085232904,
  },
  {
    CPI: 0.135251799,
    CRC: 0.066430761,
    GDP: 0.086426488,
    HRC: 0.065991558,
    Date: "6/1/2016",
    WPI_CRC: 0.06519337,
    WPI_HRC: 0.064420218,
  },
  {
    CPI: 0.149640288,
    CRC: 0.071444944,
    GDP: 0.11136701,
    HRC: 0.069859254,
    Date: "7/1/2016",
    WPI_CRC: 0.037569061,
    WPI_HRC: 0.039643211,
  },
  {
    CPI: 0.149640288,
    CRC: 0.070900547,
    GDP: 0.11136701,
    HRC: 0.077081093,
    Date: "8/1/2016",
    WPI_CRC: 0.030939227,
    WPI_HRC: 0.028741328,
  },
  {
    CPI: 0.14676259,
    CRC: 0.083980402,
    GDP: 0.11136701,
    HRC: 0.113350773,
    Date: "9/1/2016",
    WPI_CRC: 0.048618785,
    WPI_HRC: 0.048562934,
  },
  {
    CPI: 0.153956835,
    CRC: 0.106544225,
    GDP: 0.137735627,
    HRC: 0.115854344,
    Date: "10/1/2016",
    WPI_CRC: 0.087292818,
    WPI_HRC: 0.085232904,
  },
  {
    CPI: 0.151079137,
    CRC: 0.12993897,
    GDP: 0.137735627,
    HRC: 0.127601868,
    Date: "11/1/2016",
    WPI_CRC: 0.096132597,
    WPI_HRC: 0.091179386,
  },
  {
    CPI: 0.139568345,
    CRC: 0.19432108,
    GDP: 0.137735627,
    HRC: 0.215371283,
    Date: "12/1/2016",
    WPI_CRC: 0.112707182,
    WPI_HRC: 0.099108028,
  },
  {
    CPI: 0.138129496,
    CRC: 0.204607318,
    GDP: 0.191778237,
    HRC: 0.223796761,
    Date: "1/1/2017",
    WPI_CRC: 0.121546961,
    WPI_HRC: 0.110009911,
  },
  {
    CPI: 0.142446043,
    CRC: 0.183447466,
    GDP: 0.191778237,
    HRC: 0.192710757,
    Date: "2/1/2017",
    WPI_CRC: 0.128176796,
    WPI_HRC: 0.092170466,
  },
  {
    CPI: 0.14676259,
    CRC: 0.199034412,
    GDP: 0.191778237,
    HRC: 0.183980357,
    Date: "3/1/2017",
    WPI_CRC: 0.164640884,
    WPI_HRC: 0.161546085,
  },
  {
    CPI: 0.149640288,
    CRC: 0.18651328,
    GDP: 0.166944093,
    HRC: 0.199098073,
    Date: "4/1/2017",
    WPI_CRC: 0.172375691,
    WPI_HRC: 0.184340932,
  },
  {
    CPI: 0.153956835,
    CRC: 0.165883499,
    GDP: 0.166944093,
    HRC: 0.171205726,
    Date: "5/1/2017",
    WPI_CRC: 0.155801105,
    WPI_HRC: 0.162537166,
  },
  {
    CPI: 0.162589928,
    CRC: 0.172287327,
    GDP: 0.166944093,
    HRC: 0.173532763,
    Date: "6/1/2017",
    WPI_CRC: 0.156906077,
    WPI_HRC: 0.157581764,
  },
  {
    CPI: 0.194244604,
    CRC: 0.178361652,
    GDP: 0.199298115,
    HRC: 0.188217169,
    Date: "7/1/2017",
    WPI_CRC: 0.170165746,
    WPI_HRC: 0.166501487,
  },
  {
    CPI: 0.211510791,
    CRC: 0.21141228,
    GDP: 0.199298115,
    HRC: 0.223893053,
    Date: "8/1/2017",
    WPI_CRC: 0.175690608,
    WPI_HRC: 0.183349851,
  },
  {
    CPI: 0.208633094,
    CRC: 0.248574539,
    GDP: 0.199298115,
    HRC: 0.223363451,
    Date: "9/1/2017",
    WPI_CRC: 0.225414365,
    WPI_HRC: 0.229930624,
  },
  {
    CPI: 0.221582734,
    CRC: 0.188561932,
    GDP: 0.238984676,
    HRC: 0.216446534,
    Date: "10/1/2017",
    WPI_CRC: 0.237569061,
    WPI_HRC: 0.230921705,
  },
  {
    CPI: 0.243165468,
    CRC: 0.215323343,
    GDP: 0.238984676,
    HRC: 0.218276067,
    Date: "11/1/2017",
    WPI_CRC: 0.249723757,
    WPI_HRC: 0.234886026,
  },
  {
    CPI: 0.237410072,
    CRC: 0.205466892,
    GDP: 0.238984676,
    HRC: 0.216478631,
    Date: "12/1/2017",
    WPI_CRC: 0.229834254,
    WPI_HRC: 0.25074331,
  },
  {
    CPI: 0.233093525,
    CRC: 0.257585743,
    GDP: 0.292531824,
    HRC: 0.261205887,
    Date: "1/1/2018",
    WPI_CRC: 0.282872928,
    WPI_HRC: 0.311199207,
  },
  {
    CPI: 0.225899281,
    CRC: 0.312627145,
    GDP: 0.292531824,
    HRC: 0.344385422,
    Date: "2/1/2018",
    WPI_CRC: 0.318232044,
    WPI_HRC: 0.346878097,
  },
  {
    CPI: 0.227338129,
    CRC: 0.404945417,
    GDP: 0.292531824,
    HRC: 0.434257194,
    Date: "3/1/2018",
    WPI_CRC: 0.350276243,
    WPI_HRC: 0.372646184,
  },
  {
    CPI: 0.235971223,
    CRC: 0.391421449,
    GDP: 0.289190883,
    HRC: 0.422413378,
    Date: "4/1/2018",
    WPI_CRC: 0.348066298,
    WPI_HRC: 0.386521308,
  },
  {
    CPI: 0.246043165,
    CRC: 0.39762471,
    GDP: 0.289190883,
    HRC: 0.392498917,
    Date: "5/1/2018",
    WPI_CRC: 0.37679558,
    WPI_HRC: 0.396432111,
  },
  {
    CPI: 0.256115108,
    CRC: 0.43086158,
    GDP: 0.289190883,
    HRC: 0.385678291,
    Date: "6/1/2018",
    WPI_CRC: 0.390055249,
    WPI_HRC: 0.395441031,
  },
  {
    CPI: 0.274820144,
    CRC: 0.416778889,
    GDP: 0.308090639,
    HRC: 0.391873024,
    Date: "7/1/2018",
    WPI_CRC: 0.384530387,
    WPI_HRC: 0.399405352,
  },
  {
    CPI: 0.283453237,
    CRC: 0.442136328,
    GDP: 0.308090639,
    HRC: 0.404984674,
    Date: "8/1/2018",
    WPI_CRC: 0.401104972,
    WPI_HRC: 0.385530228,
  },
  {
    CPI: 0.28057554,
    CRC: 0.433683849,
    GDP: 0.308090639,
    HRC: 0.437322463,
    Date: "9/1/2018",
    WPI_CRC: 0.41878453,
    WPI_HRC: 0.411298315,
  },
  {
    CPI: 0.287769784,
    CRC: 0.433970373,
    GDP: 0.355418895,
    HRC: 0.414870569,
    Date: "10/1/2018",
    WPI_CRC: 0.432044199,
    WPI_HRC: 0.420218038,
  },
  {
    CPI: 0.289208633,
    CRC: 0.425231369,
    GDP: 0.355418895,
    HRC: 0.417951887,
    Date: "11/1/2018",
    WPI_CRC: 0.42320442,
    WPI_HRC: 0.412289395,
  },
  {
    CPI: 0.279136691,
    CRC: 0.391421449,
    GDP: 0.355418895,
    HRC: 0.383078429,
    Date: "12/1/2018",
    WPI_CRC: 0.417679558,
    WPI_HRC: 0.384539148,
  },
  {
    CPI: 0.271942446,
    CRC: 0.335549125,
    GDP: 0.339776466,
    HRC: 0.321115052,
    Date: "1/1/2019",
    WPI_CRC: 0.379005525,
    WPI_HRC: 0.341922696,
  },
  {
    CPI: 0.276258993,
    CRC: 0.32380161,
    GDP: 0.339776466,
    HRC: 0.331321917,
    Date: "2/1/2019",
    WPI_CRC: 0.364640884,
    WPI_HRC: 0.336967294,
  },
  {
    CPI: 0.283453237,
    CRC: 0.289991691,
    GDP: 0.339776466,
    HRC: 0.33719568,
    Date: "3/1/2019",
    WPI_CRC: 0.372375691,
    WPI_HRC: 0.362735382,
  },
  {
    CPI: 0.294964029,
    CRC: 0.345864015,
    GDP: 0.372515249,
    HRC: 0.344818732,
    Date: "4/1/2019",
    WPI_CRC: 0.364640884,
    WPI_HRC: 0.345887017,
  },
  {
    CPI: 0.30647482,
    CRC: 0.310678777,
    GDP: 0.372515249,
    HRC: 0.312047632,
    Date: "5/1/2019",
    WPI_CRC: 0.365745856,
    WPI_HRC: 0.338949455,
  },
  {
    CPI: 0.31942446,
    CRC: 0.31534913,
    GDP: 0.372515249,
    HRC: 0.283160277,
    Date: "6/1/2019",
    WPI_CRC: 0.344751381,
    WPI_HRC: 0.32210109,
  },
  {
    CPI: 0.338129496,
    CRC: 0.285736798,
    GDP: 0.354358543,
    HRC: 0.278955562,
    Date: "7/1/2019",
    WPI_CRC: 0.313812155,
    WPI_HRC: 0.296333003,
  },
  {
    CPI: 0.349640288,
    CRC: 0.256611558,
    GDP: 0.354358543,
    HRC: 0.242621688,
    Date: "8/1/2019",
    WPI_CRC: 0.287292818,
    WPI_HRC: 0.260654113,
  },
  {
    CPI: 0.361151079,
    CRC: 0.235838515,
    GDP: 0.354358543,
    HRC: 0.214424419,
    Date: "9/1/2019",
    WPI_CRC: 0.268508287,
    WPI_HRC: 0.243805748,
  },
  {
    CPI: 0.381294964,
    CRC: 0.236411564,
    GDP: 0.412642222,
    HRC: 0.211214713,
    Date: "10/1/2019",
    WPI_CRC: 0.247513812,
    WPI_HRC: 0.21308226,
  },
  {
    CPI: 0.401438849,
    CRC: 0.20775909,
    GDP: 0.412642222,
    HRC: 0.190191138,
    Date: "11/1/2019",
    WPI_CRC: 0.230939227,
    WPI_HRC: 0.201189296,
  },
  {
    CPI: 0.427338129,
    CRC: 0.241282485,
    GDP: 0.412642222,
    HRC: 0.220201891,
    Date: "12/1/2019",
    WPI_CRC: 0.236464088,
    WPI_HRC: 0.21407334,
  },
  {
    CPI: 0.424460432,
    CRC: 0.286983181,
    GDP: 0.415562469,
    HRC: 0.269631365,
    Date: "1/1/2020",
    WPI_CRC: 0.264088398,
    WPI_HRC: 0.252725471,
  },
  {
    CPI: 0.408633094,
    CRC: 0.309618636,
    GDP: 0.415562469,
    HRC: 0.280223396,
    Date: "2/1/2020",
    WPI_CRC: 0.282872928,
    WPI_HRC: 0.278493558,
  },
  {
    CPI: 0.401438849,
    CRC: 0.305320764,
    GDP: 0.415562469,
    HRC: 0.27460641,
    Date: "3/1/2020",
    WPI_CRC: 0.28839779,
    WPI_HRC: 0.266600595,
  },
  {
    CPI: 0.441726619,
    CRC: 0.286410132,
    GDP: 0.141865947,
    HRC: 0.253582834,
    Date: "4/1/2020",
    WPI_CRC: 0.191160221,
    WPI_HRC: 0.261645193,
  },
  {
    CPI: 0.434532374,
    CRC: 0.272857511,
    GDP: 0.141865947,
    HRC: 0.238047857,
    Date: "5/1/2020",
    WPI_CRC: 0.262983425,
    WPI_HRC: 0.253716551,
  },
  {
    CPI: 0.447482014,
    CRC: 0.149237704,
    GDP: 0.141865947,
    HRC: 0.454598288,
    Date: "6/1/2020",
    WPI_CRC: 0.266298343,
    WPI_HRC: 0.24975223,
  },
  {
    CPI: 0.477697842,
    CRC: 0.128602981,
    GDP: 0.323853018,
    HRC: 0.415163111,
    Date: "7/1/2020",
    WPI_CRC: 0.257458564,
    WPI_HRC: 0.235877106,
  },
  {
    CPI: 0.489208633,
    CRC: 0.169767775,
    GDP: 0.323853018,
    HRC: 0.500197053,
    Date: "8/1/2020",
    WPI_CRC: 0.287292818,
    WPI_HRC: 0.272547076,
  },
  {
    CPI: 0.513669065,
    CRC: 0.196655608,
    GDP: 0.323853018,
    HRC: 0.547068744,
    Date: "9/1/2020",
    WPI_CRC: 0.325966851,
    WPI_HRC: 0.297324083,
  },
  {
    CPI: 0.542446043,
    CRC: 0.244556053,
    GDP: 0.48654756,
    HRC: 0.599784596,
    Date: "10/1/2020",
    WPI_CRC: 0.373480663,
    WPI_HRC: 0.340931615,
  },
  {
    CPI: 0.549640288,
    CRC: 0.251585101,
    GDP: 0.48654756,
    HRC: 0.613364096,
    Date: "11/1/2020",
    WPI_CRC: 0.386740331,
    WPI_HRC: 0.369672944,
  },
  {
    CPI: 0.526618705,
    CRC: 0.305104742,
    GDP: 0.48654756,
    HRC: 0.709718796,
    Date: "12/1/2020",
    WPI_CRC: 0.427624309,
    WPI_HRC: 0.424182359,
  },
  {
    CPI: 0.512230216,
    CRC: 0.319056987,
    GDP: 0.548391372,
    HRC: 0.736276527,
    Date: "1/1/2021",
    WPI_CRC: 0.587845304,
    WPI_HRC: 0.561942517,
  },
  {
    CPI: 0.516546763,
    CRC: 0.29525953,
    GDP: 0.548391372,
    HRC: 0.703748666,
    Date: "2/1/2021",
    WPI_CRC: 0.583425414,
    WPI_HRC: 0.53617443,
  },
  {
    CPI: 0.51942446,
    CRC: 0.299330589,
    GDP: 0.548391372,
    HRC: 0.713152226,
    Date: "3/1/2021",
    WPI_CRC: 0.577900552,
    WPI_HRC: 0.525272547,
  },
  {
    CPI: 0.53381295,
    CRC: 0.372990705,
    GDP: 0.42198336,
    HRC: 0.813329483,
    Date: "4/1/2021",
    WPI_CRC: 0.654143646,
    WPI_HRC: 0.621407334,
  },
  {
    CPI: 0.571223022,
    CRC: 0.401821715,
    GDP: 0.42198336,
    HRC: 0.860516031,
    Date: "5/1/2021",
    WPI_CRC: 0.765745856,
    WPI_HRC: 0.71258672,
  },
  {
    CPI: 0.584172662,
    CRC: 0.39853072,
    GDP: 0.42198336,
    HRC: 0.851355809,
    Date: "6/1/2021",
    WPI_CRC: 0.803314917,
    WPI_HRC: 0.733399405,
  },
  {
    CPI: 0.601438849,
    CRC: 0.374604206,
    GDP: 0.51995135,
    HRC: 0.832624772,
    Date: "7/1/2021",
    WPI_CRC: 0.830939227,
    WPI_HRC: 0.75024777,
  },
  {
    CPI: 0.607194245,
    CRC: 0.358221633,
    GDP: 0.51995135,
    HRC: 0.859536455,
    Date: "8/1/2021",
    WPI_CRC: 0.82320442,
    WPI_HRC: 0.75123885,
  },
  {
    CPI: 0.611510791,
    CRC: 0.337413524,
    GDP: 0.51995135,
    HRC: 0.872324518,
    Date: "9/1/2021",
    WPI_CRC: 0.836464088,
    WPI_HRC: 0.74826561,
  },
  {
    CPI: 0.644604317,
    CRC: 0.843169163,
    GDP: 0.659769011,
    HRC: 0.899230737,
    Date: "10/1/2021",
    WPI_CRC: 0.838674033,
    WPI_HRC: 0.789890981,
  },
  {
    CPI: 0.661870504,
    CRC: 0.8045758,
    GDP: 0.659769011,
    HRC: 0.875672032,
    Date: "11/1/2021",
    WPI_CRC: 0.86519337,
    WPI_HRC: 0.832507433,
  },
  {
    CPI: 0.654676259,
    CRC: 0.724363199,
    GDP: 0.659769011,
    HRC: 0.804849866,
    Date: "12/1/2021",
    WPI_CRC: 0.861878453,
    WPI_HRC: 0.796828543,
  },
  {
    CPI: 0.647482014,
    CRC: 0.704163204,
    GDP: 0.715448319,
    HRC: 0.797467542,
    Date: "1/1/2022",
    WPI_CRC: 0.803314917,
    WPI_HRC: 0.767096135,
  },
  {
    CPI: 0.65323741,
    CRC: 0.780235523,
    GDP: 0.715448319,
    HRC: 0.797467542,
    Date: "2/1/2022",
    WPI_CRC: 0.812154696,
    WPI_HRC: 0.803766105,
  },
  {
    CPI: 0.676258993,
    CRC: 1,
    GDP: 0.715448319,
    HRC: 1,
    Date: "3/1/2022",
    WPI_CRC: 0.900552486,
    WPI_HRC: 0.907829534,
  },
  {
    CPI: 0.710791367,
    CRC: 0.97464256,
    GDP: 0.710207137,
    HRC: 0.930028406,
    Date: "4/1/2022",
    WPI_CRC: 1,
    WPI_HRC: 1,
  },
  {
    CPI: 0.73381295,
    CRC: 0.841122031,
    GDP: 0.710207137,
    HRC: 0.875142431,
    Date: "5/1/2022",
    WPI_CRC: 0.961325967,
    WPI_HRC: 0.942517344,
  },
  {
    CPI: 0.74676259,
    CRC: 0.670353285,
    GDP: 0.710207137,
    HRC: 0.715941006,
    Date: "6/1/2022",
    WPI_CRC: 0.862983425,
    WPI_HRC: 0.823587711,
  },
  {
    CPI: 0.758273381,
    CRC: 0.661900805,
    GDP: 0.703498232,
    HRC: 0.678066473,
    Date: "7/1/2022",
    WPI_CRC: 0.759116022,
    WPI_HRC: 0.769078295,
  },
  {
    CPI: 0.771223022,
    CRC: 0.657316409,
    GDP: 0.703498232,
    HRC: 0.64019194,
    Date: "8/1/2022",
    WPI_CRC: 0.744751381,
    WPI_HRC: 0.731417245,
  },
  {
    CPI: 0.785611511,
    CRC: 0.617202945,
    GDP: 0.703498232,
    HRC: 0.638266117,
    Date: "9/1/2022",
    WPI_CRC: 0.719337017,
    WPI_HRC: 0.691774034,
  },
  {
    CPI: 0.805755396,
    CRC: 0.61784648,
    GDP: 0.788415129,
    HRC: 0.618754955,
    Date: "10/1/2022",
    WPI_CRC: 0.722651934,
    WPI_HRC: 0.67789891,
  },
  {
    CPI: 0.802877698,
    CRC: 0.577376006,
    GDP: 0.788415129,
    HRC: 0.592848775,
    Date: "11/1/2022",
    WPI_CRC: 0.703867403,
    WPI_HRC: 0.653121903,
  },
  {
    CPI: 0.791366906,
    CRC: 0.545285235,
    GDP: 0.788415129,
    HRC: 0.569096949,
    Date: "12/1/2022",
    WPI_CRC: 0.670718232,
    WPI_HRC: 0.633300297,
  },
  {
    CPI: 0.802877698,
    CRC: 0.610326352,
    GDP: 0.846228207,
    HRC: 0.658808236,
    Date: "1/1/2023",
    WPI_CRC: 0.659668508,
    WPI_HRC: 0.637264618,
  },
  {
    CPI: 0.807194245,
    CRC: 0.61748947,
    GDP: 0.846228207,
    HRC: 0.676943076,
    Date: "2/1/2023",
    WPI_CRC: 0.700552486,
    WPI_HRC: 0.699702676,
  },
  {
    CPI: 0.81294964,
    CRC: 0.619638406,
    GDP: 0.846228207,
    HRC: 0.66859784,
    Date: "3/1/2023",
    WPI_CRC: 0.722651934,
    WPI_HRC: 0.705649158,
  },
  {
    CPI: 0.825899281,
    CRC: 0.604782098,
    GDP: 0.830180842,
    HRC: 0.644717626,
    Date: "4/1/2023",
    WPI_CRC: 0.697237569,
    WPI_HRC: 0.701684836,
  },
  {
    CPI: 0.84028777,
    CRC: 0.560471047,
    GDP: 0.830180842,
    HRC: 0.602317408,
    Date: "5/1/2023",
    WPI_CRC: 0.678453039,
    WPI_HRC: 0.669970268,
  },
  {
    CPI: 0.867625899,
    CRC: 0.544139136,
    GDP: 0.830180842,
    HRC: 0.555134727,
    Date: "6/1/2023",
    WPI_CRC: 0.643093923,
    WPI_HRC: 0.639246779,
  },
  {
    CPI: 0.943884892,
    CRC: 0.546717859,
    GDP: 0.839042379,
    HRC: 0.592688289,
    Date: "7/1/2023",
    WPI_CRC: 0.633149171,
    WPI_HRC: 0.623389495,
  },
  {
    CPI: 0.942446043,
    CRC: 0.560471047,
    GDP: 0.839042379,
    HRC: 0.605206143,
    Date: "8/1/2023",
    WPI_CRC: 0.619889503,
    WPI_HRC: 0.611496531,
  },
  {
    CPI: 0.912230216,
    CRC: 0.582533452,
    GDP: 0.839042379,
    HRC: 0.610983614,
    Date: "9/1/2023",
    WPI_CRC: 0.64198895,
    WPI_HRC: 0.64122894,
  },
  {
    CPI: 0.929496403,
    CRC: 0.594280966,
    GDP: 0.943191834,
    HRC: 0.602317408,
    Date: "10/1/2023",
    WPI_CRC: 0.667403315,
    WPI_HRC: 0.64420218,
  },
  {
    CPI: 0.943884892,
    CRC: 0.591702243,
    GDP: 0.943191834,
    HRC: 0.572467141,
    Date: "11/1/2023",
    WPI_CRC: 0.64640884,
    WPI_HRC: 0.619425173,
  },
  {
    CPI: 0.935251799,
    CRC: 0.577376006,
    GDP: 0.943191834,
    HRC: 0.571022773,
    Date: "12/1/2023",
    WPI_CRC: 0.638674033,
    WPI_HRC: 0.60852329,
  },
  {
    CPI: 0.932374101,
    CRC: 0.572648348,
    GDP: 1,
    HRC: 0.563640449,
    Date: "1/1/2024",
    WPI_CRC: 0.632044199,
    WPI_HRC: 0.591674926,
  },
  {
    CPI: 0.936690647,
    CRC: 0.563049769,
    GDP: 1,
    HRC: 0.55128308,
    Date: "2/1/2024",
    WPI_CRC: 0.61878453,
    WPI_HRC: 0.588701685,
  },
  {
    CPI: 0.936690647,
    CRC: 0.560327784,
    GDP: 1,
    HRC: 0.529136108,
    Date: "3/1/2024",
    WPI_CRC: 0.608839779,
    WPI_HRC: 0.57086224,
  },
  {
    CPI: 0.949640288,
    CRC: 0.551732042,
    GDP: 0.978810034,
    HRC: 0.554974242,
    Date: "4/1/2024",
    WPI_CRC: 0.588950276,
    WPI_HRC: 0.5728444,
  },
  {
    CPI: 0.964028777,
    CRC: 0.556173176,
    GDP: 0.978810034,
    HRC: 0.550320168,
    Date: "5/1/2024",
    WPI_CRC: 0.606629834,
    WPI_HRC: 0.592666006,
  },
  {
    CPI: 1,
    CRC: 0.548437008,
    GDP: 0.978810034,
    HRC: 0.536036976,
    Date: "6/1/2024",
    WPI_CRC: 0.615469613,
    WPI_HRC: 0.590683845,
  },
];

const lineOptions = {
  chart: {
    type: "line",
    zoom: { enabled: false },
  },
  xaxis: {
    categories: data2.map((item) => {
      const date = new Date(item.Date);
      return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    }),
    tickAmount: Math.ceil(data2.length / 10), // Show fewer X-axis labels
  },
  yaxis: {
    show: false,
  },
  stroke: {
    curve: "smooth",
    width: 1.5, // Reduce line width
  },
};

const lienData = [
  { name: "CPI", data: data2.map((item) => item.CPI) },
  { name: "CRC", data: data2.map((item) => item.CRC) },
  { name: "GDP", data: data2.map((item) => item.GDP) },
  { name: "HRC", data: data2.map((item) => item.HRC) },
  { name: "WPI_CRC", data: data2.map((item) => item.WPI_CRC) },
  { name: "WPI_HRC", data: data2.map((item) => item.WPI_HRC) },
];

const coalData = [
  {
    Date: "1/1/2015",
    HRC_Price: "₹ 33820.00",
    Other_Quality_Coal: "₹ 6090.41",
    High_Quality_Coal: "₹ 7224.39",
  },
  {
    Date: "2/1/2015",
    HRC_Price: "₹ 33152.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2015",
    HRC_Price: "₹ 32262.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2015",
    HRC_Price: "₹ 31778.00",
    Other_Quality_Coal: "₹ 5690.53",
    High_Quality_Coal: "₹ 6334.00",
  },
  {
    Date: "5/1/2015",
    HRC_Price: "₹ 31111.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2015",
    HRC_Price: "₹ 30667.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2015",
    HRC_Price: "₹ 29778.00",
    Other_Quality_Coal: "₹ 5401.14",
    High_Quality_Coal: "₹ 6366.39",
  },
  {
    Date: "8/1/2015",
    HRC_Price: "₹ 28889.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2015",
    HRC_Price: "₹ 29333.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2015",
    HRC_Price: "₹ 29333.00",
    Other_Quality_Coal: "₹ 5104.89",
    High_Quality_Coal: "₹ 5784.49",
  },
  {
    Date: "11/1/2015",
    HRC_Price: "₹ 28444.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2015",
    HRC_Price: "₹ 28889.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2016",
    HRC_Price: "₹ 28889.00",
    Other_Quality_Coal: "₹ 4976.95",
    High_Quality_Coal: "₹ 5648.47",
  },
  {
    Date: "2/1/2016",
    HRC_Price: "₹ 30222.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2016",
    HRC_Price: "₹ 31111.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2016",
    HRC_Price: "₹ 32000.00",
    Other_Quality_Coal: "₹ 5014.97",
    High_Quality_Coal: "₹ 6065.32",
  },
  {
    Date: "5/1/2016",
    HRC_Price: "₹ 32889.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2016",
    HRC_Price: "₹ 32000.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2016",
    HRC_Price: "₹ 31111.00",
    Other_Quality_Coal: "₹ 5360.14",
    High_Quality_Coal: "₹ 6928.81",
  },
  {
    Date: "8/1/2016",
    HRC_Price: "₹ 32000.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2016",
    HRC_Price: "₹ 33778.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2016",
    HRC_Price: "₹ 35111.00",
    Other_Quality_Coal: "₹ 8948.41",
    High_Quality_Coal: "₹ 14193.56",
  },
  {
    Date: "11/1/2016",
    HRC_Price: "₹ 35111.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2016",
    HRC_Price: "₹ 37778.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2017",
    HRC_Price: "₹ 40444.00",
    Other_Quality_Coal: "₹ 9852.29",
    High_Quality_Coal: "₹ 13871.19",
  },
  {
    Date: "2/1/2017",
    HRC_Price: "₹ 38667.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2017",
    HRC_Price: "₹ 36889.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2017",
    HRC_Price: "₹ 37778.00",
    Other_Quality_Coal: "₹ 9781.11",
    High_Quality_Coal: "₹ 13289.43",
  },
  {
    Date: "5/1/2017",
    HRC_Price: "₹ 36000.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2017",
    HRC_Price: "₹ 36000.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2017",
    HRC_Price: "₹ 37000.00",
    Other_Quality_Coal: "₹ 8039.71",
    High_Quality_Coal: "₹ 11074.32",
  },
  {
    Date: "8/1/2017",
    HRC_Price: "₹ 38500.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2017",
    HRC_Price: "₹ 39500.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2017",
    HRC_Price: "₹ 38000.00",
    Other_Quality_Coal: "₹ 8524.41",
    High_Quality_Coal: "₹ 12307.65",
  },
  {
    Date: "11/1/2017",
    HRC_Price: "₹ 38000.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2017",
    HRC_Price: "₹ 39500.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2018",
    HRC_Price: "₹ 42300.00",
    Other_Quality_Coal: "₹ 9294.61",
    High_Quality_Coal: "₹ 13964.18",
  },
  {
    Date: "2/1/2018",
    HRC_Price: "₹ 43800.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2018",
    HRC_Price: "₹ 43800.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2018",
    HRC_Price: "₹ 44700.00",
    Other_Quality_Coal: "₹ 10100.76",
    High_Quality_Coal: "₹ 13176.13",
  },
  {
    Date: "5/1/2018",
    HRC_Price: "₹ 45200.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2018",
    HRC_Price: "₹ 45200.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2018",
    HRC_Price: "₹ 44000.00",
    Other_Quality_Coal: "₹ 10106.41",
    High_Quality_Coal: "₹ 13077.81",
  },
  {
    Date: "8/1/2018",
    HRC_Price: "₹ 44500.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2018",
    HRC_Price: "₹ 45500.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2018",
    HRC_Price: "₹ 46700.00",
    Other_Quality_Coal: "₹ 10008.35",
    High_Quality_Coal: "₹ 14555.05",
  },
  {
    Date: "11/1/2018",
    HRC_Price: "₹ 45900.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2018",
    HRC_Price: "₹ 43800.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2019",
    HRC_Price: "₹ 41800.00",
    Other_Quality_Coal: "₹ 9980.19",
    High_Quality_Coal: "₹ 14554.15",
  },
  {
    Date: "2/1/2019",
    HRC_Price: "₹ 43300.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2019",
    HRC_Price: "₹ 44050.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2019",
    HRC_Price: "₹ 43550.00",
    Other_Quality_Coal: "₹ 9835.89",
    High_Quality_Coal: "₹ 14812.79",
  },
  {
    Date: "5/1/2019",
    HRC_Price: "₹ 42550.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2019",
    HRC_Price: "₹ 42050.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2019",
    HRC_Price: "₹ 39550.00",
    Other_Quality_Coal: "₹ 9284.89",
    High_Quality_Coal: "₹ 13438.34",
  },
  {
    Date: "8/1/2019",
    HRC_Price: "₹ 38050.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2019",
    HRC_Price: "₹ 36850.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2019",
    HRC_Price: "₹ 35150.00",
    Other_Quality_Coal: "₹ 8114.75",
    High_Quality_Coal: "₹ 10923.71",
  },
  {
    Date: "11/1/2019",
    HRC_Price: "₹ 36150.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2019",
    HRC_Price: "₹ 37150.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2020",
    HRC_Price: "₹ 38900.00",
    Other_Quality_Coal: "₹ 8052.98",
    High_Quality_Coal: "₹ 11191.47",
  },
  {
    Date: "2/1/2020",
    HRC_Price: "₹ 39800.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2020",
    HRC_Price: "₹ 39200.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2020",
    HRC_Price: "₹ 39200.00",
    Other_Quality_Coal: "₹ 7197.01",
    High_Quality_Coal: "₹ 10093.16",
  },
  {
    Date: "5/1/2020",
    HRC_Price: "₹ 38450.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2020",
    HRC_Price: "₹ 37250.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2020",
    HRC_Price: "₹ 37250.00",
    Other_Quality_Coal: "₹ 5936.45",
    High_Quality_Coal: "₹ 7658.30",
  },
  {
    Date: "8/1/2020",
    HRC_Price: "₹ 40250.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2020",
    HRC_Price: "₹ 42050.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2020",
    HRC_Price: "₹ 43550.00",
    Other_Quality_Coal: "₹ 5878.53",
    High_Quality_Coal: "₹ 7618.89",
  },
  {
    Date: "11/1/2020",
    HRC_Price: "₹ 45550.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2020",
    HRC_Price: "₹ 51050.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2021",
    HRC_Price: "₹ 54050.00",
    Other_Quality_Coal: "₹ 6176.44",
    High_Quality_Coal: "₹ 7925.82",
  },
  {
    Date: "2/1/2021",
    HRC_Price: "₹ 51550.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2021",
    HRC_Price: "₹ 52550.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2021",
    HRC_Price: "₹ 58550.00",
    Other_Quality_Coal: "₹ 7041.11",
    High_Quality_Coal: "₹ 7930.12",
  },
  {
    Date: "5/1/2021",
    HRC_Price: "₹ 66050.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2021",
    HRC_Price: "₹ 69550.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2021",
    HRC_Price: "₹ 67550.00",
    Other_Quality_Coal: "₹ 10121.23",
    High_Quality_Coal: "₹ 13651.29",
  },
  {
    Date: "8/1/2021",
    HRC_Price: "₹ 68050.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2021",
    HRC_Price: "₹ 66350.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2021",
    HRC_Price: "₹ 68350.00",
    Other_Quality_Coal: "₹ 15789.26",
    High_Quality_Coal: "₹ 22886.34",
  },
  {
    Date: "11/1/2021",
    HRC_Price: "₹ 70350.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2021",
    HRC_Price: "₹ 66350.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2022",
    HRC_Price: "₹ 65350.00",
    Other_Quality_Coal: "₹ 19614.56",
    High_Quality_Coal: "₹ 27763.39",
  },
  {
    Date: "2/1/2022",
    HRC_Price: "₹ 66850.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2022",
    HRC_Price: "₹ 74850.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2022",
    HRC_Price: "₹ 76850.00",
    Other_Quality_Coal: "₹ 28209.05",
    High_Quality_Coal: "₹ 33576.68",
  },
  {
    Date: "5/1/2022",
    HRC_Price: "₹ 72350.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2022",
    HRC_Price: "₹ 62350.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2022",
    HRC_Price: "₹ 58850.00",
    Other_Quality_Coal: "₹ 22624.82",
    High_Quality_Coal: "₹ 21691.19",
  },
  {
    Date: "8/1/2022",
    HRC_Price: "₹ 56950.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2022",
    HRC_Price: "₹ 57450.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2022",
    HRC_Price: "₹ 57900.00",
    Other_Quality_Coal: "₹ 20954.73",
    High_Quality_Coal: "₹ 21128.17",
  },
  {
    Date: "11/1/2022",
    HRC_Price: "₹ 56500.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2022",
    HRC_Price: "₹ 54400.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2023",
    HRC_Price: "₹ 57725.00",
    Other_Quality_Coal: "₹ 16255.53",
    High_Quality_Coal: "₹ 23160.36",
  },
  {
    Date: "2/1/2023",
    HRC_Price: "₹ 59425.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "3/1/2023",
    HRC_Price: "₹ 60750.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "4/1/2023",
    HRC_Price: "₹ 61250.00",
    Other_Quality_Coal: "₹ 14968.50",
    High_Quality_Coal: "₹ 19305.02",
  },
  {
    Date: "5/1/2023",
    HRC_Price: "₹ 59250.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "6/1/2023",
    HRC_Price: "₹ 56950.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "7/1/2023",
    HRC_Price: "₹ 56750.00",
    Other_Quality_Coal: "₹ 16707.26",
    High_Quality_Coal: "₹ 18596.39",
  },
  {
    Date: "8/1/2023",
    HRC_Price: "₹ 57400.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "9/1/2023",
    HRC_Price: "₹ 58925.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "10/1/2023",
    HRC_Price: "₹ 58925.00",
    Other_Quality_Coal: "₹ 16893.79",
    High_Quality_Coal: "₹ 22824.46",
  },
  {
    Date: "11/1/2023",
    HRC_Price: "₹ 57925.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "12/1/2023",
    HRC_Price: "₹ 57175.00",
    Other_Quality_Coal: "",
    High_Quality_Coal: "",
  },
  {
    Date: "1/1/2024",
    HRC_Price: "₹ 56425.00",
    Other_Quality_Coal: "₹ 16872.52",
    High_Quality_Coal: "₹ 21872.42",
  },
];

const historyChart = {
  chart: {
    type: "line",
    zoom: { enabled: false },
  },
  colors: ["var(--color-main-light)", "var(--color-main)", "#a0efff"],
  xaxis: {
    categories: coalData.map((item) => {
      const date = new Date(item.Date);
      return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    }),
    tickAmount: Math.ceil(coalData.length / 10), // Show fewer X-axis labels
  },
  yaxis: {
    show: false,
  },
  stroke: {
    curve: "smooth",
    width: 2, // Reduce line width
  },
};

const cleanPrice = (price) => {
  if (!price || price.trim() === "") return 0; // Replace null with 0
  return parseFloat(price.replace("₹", "").trim()); // Remove ₹ and convert to number
};

const historyData = [
  {
    name: "HRC Price",
    data: coalData.map((item) => cleanPrice(item.HRC_Price)),
  },
  {
    name: "Other Quality Coal",
    data: coalData.map((item) => cleanPrice(item.Other_Quality_Coal)),
  },
  {
    name: "High Quality Coal",
    data: coalData.map((item) => cleanPrice(item.High_Quality_Coal)),
  },
];

//last
const CommodityLanding = () => {
  return (
    <div style={{ padding: "5px" }}>
      {/* KPI */}
      <div className="global-kpi-container mt-1 ps-2 pe-2">
        <div className="global-kpi-com">
          <p className="global-kpi-num">
            ₹ 44.94K
            <span className="global-kpi-name">HRC Price</span>
          </p>
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "3px",
                textAlign: "center",
              }}
            >
              <span
                style={{ color: "#f97061", fontWeight: 550, fontSize: "12px" }}
              >
                -5.15% | -2.70K
              </span>{" "}
              <br />
              MOM
            </p>
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              <span
                style={{ color: "#f97061", fontWeight: 550, fontSize: "12px" }}
              >
                -7.45% | -4.38K
              </span>{" "}
              <br />
              YOY
            </p>
          </div>
        </div>

        <div className="global-kpi-com">
          <p className="global-kpi-num">
            ₹ 50.63K
            <span className="global-kpi-name">CRC Price</span>
          </p>
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "3px",
                textAlign: "center",
              }}
            >
              <span
                style={{ color: "#f97061", fontWeight: 550, fontSize: "12px" }}
              >
                -2.98% | -1.80K
              </span>{" "}
              <br />
              MOM
            </p>
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              <span
                style={{ color: "#f97061", fontWeight: 550, fontSize: "12px" }}
              >
                -5.13% | -3.36K
              </span>{" "}
              <br />
              YOY
            </p>
          </div>
        </div>

        <div className="global-kpi-com">
          <p className="global-kpi-num">
            1.23K (MT)
            <span className="global-kpi-name">Steel Production</span>
          </p>
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "3px",
                textAlign: "center",
              }}
            >
              <span
                style={{ color: "#f97061", fontWeight: 550, fontSize: "12px" }}
              >
                -1.72% | -0.21 MT
              </span>{" "}
              <br />
              MOM
            </p>
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "var(--color-main)",
                  fontWeight: 550,
                  fontSize: "12px",
                }}
              >
                8.57% | 8.49 MT
              </span>{" "}
              <br />
              YOY
            </p>
          </div>
        </div>

        <div className="global-kpi-com">
          <p className="global-kpi-num">
            1.12K (MT)
            <span className="global-kpi-name">Steel Consumption</span>
          </p>
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "3px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "var(--color-main)",
                  fontWeight: 550,
                  fontSize: "12px",
                }}
              >
                0.40% | 0.05 MT
              </span>{" "}
              <br />
              MOM
            </p>
            <p
              style={{
                fontSize: "10px",
                margin: 0,
                marginLeft: "10px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "var(--color-main)",
                  fontWeight: 550,
                  fontSize: "12px",
                }}
              >
                12.70% | 12.29 MT
              </span>{" "}
              <br />
              YOY
            </p>
          </div>
        </div>

        <div className="global-kpi-com">
          <p className="global-kpi-num">
            ₹ 76.85K
            <span className="global-kpi-name">Max Price</span>
          </p>
          <p style={{ margin: 0, fontSize: "12px", marginTop: "10px" }}>
            Sep 2024
          </p>
        </div>

        <div className="global-kpi-com">
          <p className="global-kpi-num">
            ₹ 28.44K
            <span className="global-kpi-name">Min Price</span>
          </p>
          <p style={{ margin: 0, fontSize: "12px", marginTop: "10px" }}>
            Apr 2013
          </p>
        </div>
      </div>

      <Row>
        <Col md={5} style={{ padding: "5px 10px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "5px",
              boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
              height: "280px",
              padding: "10px",
            }}
          >
            <p className="head-theme">Historical Price (HRC Trend)</p>
            <Chart
              options={historyChart}
              series={historyData}
              type="line"
              height="240px"
            />
          </div>
        </Col>

        {/* HRC Correlation Chart */}
        <Col style={{ padding: "5px 10px" }} md={3}>
          <div style={cardStyle}>
            <p className="head-theme">
              HRC Correlation with Macroeconomic Indicators
            </p>
            <Chart
              options={macroChartOptions}
              series={macroChartSeries}
              type="bar"
              height={"240px"}
            />
          </div>
        </Col>

        <Col md={4} style={{ padding: "5px 10px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "5px",
              boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
              height: "280px",
              padding: "10px",
            }}
          >
            <p className="head-theme">Macroeconomic Indicators Price Trend</p>
            <Chart
              options={lineOptions}
              series={lienData}
              type="line"
              height="240px"
            />
          </div>
        </Col>

        {/* Placeholder for additional content */}
        {/* <Col md={5} style={{ padding: "5px 10px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "5px",
              boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
              height: "280px",
              padding: "10px",
            }}
          >
            <p className="head-theme">Actual Vs Predicted & Forecasted</p>
            <Chart
              options={chartOptions}
              series={series}
              type="line"
              height="240px"
            />
          </div>
        </Col> */}

        <Col md={5} style={{ padding: "5px 10px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "5px",
              boxShadow: "0px 0px 2px rgba(0,0,0,0.2)",
              height: "280px",
              padding: "10px",
            }}
          >
            <p className="head-theme">Event Price Impact Over Time</p>
            <Chart
              options={chartOptions2}
              series={chartSeries2}
              type="line"
              height="240px"
            />
          </div>
        </Col>
        {/* Accuracy Chart */}
        <Col style={{ padding: "5px 10px" }} md={3}>
          <div style={cardStyle}>
            <p className="head-theme">Model Accuracy</p>
            <Chart
              options={accuracyChartOptions}
              series={accuracyChartSeries}
              type="bar"
              height={"240px"}
            />
          </div>
        </Col>

        <Col style={{ padding: "5px 10px" }} md={4}>
          <div style={cardStyle}>
            <p className="head-theme">Commodity News</p>
            <div style={{ height: "240px", overflow: "auto" }}>
              {News.map((x) => {
                return (
                  <div
                    style={{
                      textAlign: "left",
                      margin: "5px",
                      background: "rgba(81, 166, 176, 0.2)",
                      padding: "2px 10px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => {
                      window.open(x.url, "_blank");
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 550,
                        fontSize: "14px",
                        marginBottom: "2px",
                      }}
                    >
                      {x.title}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--color-main)",
                        margin: "0px",
                        fontWeight: 550,
                      }}
                    >
                      {x.classification}
                    </p>
                    <p style={{ fontSize: "11px", margin: "0px" }}>
                      {x.published.slice(0, 10)}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        margin: "0px",
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        color: "white",
                        background:
                          x.sentiment_score === 0
                            ? "grey"
                            : x.sentiment_score === 1
                            ? "var(--color-main)"
                            : "#f97061",
                        padding: "2px 10px",
                        width: "130px",
                        textAlign: "center",
                      }}
                    >
                      {x.sentiment_score === 0
                        ? "Neutral"
                        : x.sentiment_score === 1
                        ? "Positive"
                        : "Negative"}{" "}
                      Sentiment
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CommodityLanding;
