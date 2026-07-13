/* 手工補充資料（人工維護，改完 push 即上線）：
   - PUB_EXTRAS：論文補充。match 填「該論文標題的一小段獨特文字」（不分大小寫）。
     可補 badges（徽章：rank=排名、role=作者角色、grant=計畫編號）、
     venue（會議／期刊名稱，國科會沒填時顯示）、authors（作者字串覆寫，國科會資料髒掉時用）。
   - PROJECT_EXTRAS：幫國科會計畫補英文名稱、執行期間與狀態。match 比對計畫名稱；
     若兩個計畫名稱很像，加 year（民國年度）區分。status 填「執行中」會顯示狀態晶片。
   - EXTRA_PROJECTS：國科會以外的計畫（部會、醫院、校內計畫…），手工全欄位維護；
     *_en 為英文頁顯示用，沒填則顯示中文。
   詳見 README-維護說明.md */

const PUB_EXTRAS = [
  { match: "AI-Guided Psychodrama", badges: [
    { type: "role", text: "第一作者" }
  ]},
  { match: "Advancing Elderly", badges: [
    { type: "role", text: "第一作者" }
  ]},
  { match: "Cross-Device Platform", badges: [
    { type: "rank", text: "Scopus 235/668 General Medicine" },
    { type: "role", text: "第一作者・通訊作者" },
    { type: "grant", text: "NSTC 114-2314-B-468-006" }
  ]},
  { match: "AI Virtual Human", badges: [
    { type: "rank", text: "Scopus 235/668 General Medicine" },
    { type: "grant", text: "教育部 PEH1140261" }
  ]},
  { match: "Prevalence and Correlates", badges: [
    { type: "rank", text: "SCIE 157/322 Oncology" },
    { type: "grant", text: "NSTC 108-2314-B-038-123" }
  ]},
  { match: "cut-off values", badges: [
    { type: "rank", text: "SSCI 35/144 Psychiatry" },
    { type: "role", text: "第一作者" }
  ]},
  { match: "seclusion and restraint", badges: [
    { type: "rank", text: "SSCI 2/123 Nursing" }
  ]},
  { match: "Identifying differential trajectories", badges: [
    { type: "rank", text: "SSCI 17/77 Psychology, Developmental" },
    { type: "role", text: "第一作者" }
  ]},
  { match: "Correlations among life stress", badges: [
    { type: "rank", text: "SSCI 22/123 Nursing" },
    { type: "role", text: "第一作者" }
  ]},
  { match: "External Counterpulsation",
    venue: "EAFONS 2025",
    badges: [{ type: "role", text: "通訊作者" }] },
  { match: "Anesthetic Care Experience",
    venue: "EAFONS 2024, Hong Kong",
    badges: [{ type: "role", text: "通訊作者" }] },
  { match: "Correlations between Anhedonia",
    venue: "25th East Asian Forum of Nursing Scholars, Taipei, Taiwan",
    badges: [{ type: "role", text: "第一作者・通訊作者" }] },
  { match: "Chinese version",
    venue: "25th East Asian Forum of Nursing Scholars, Taipei, Taiwan",
    authors: "Ho YC, Gau SF, Wu YS, Chen CH, Wang JK, Lee HC, Chung KH, Chiu YH, Goh KK, Lu ML, Lin YC, Chang PC, Chang HJ",
    badges: [{ type: "role", text: "第一作者・通訊作者" }] },
  { match: "Differential trajectory and determinants",
    venue: "23rd East Asian Forum of Nursing Scholars, Chiang Mai, Thailand",
    badges: [{ type: "role", text: "第一作者・通訊作者" }] },
  { match: "Relationship Among Life Stress", badges: [
    { type: "role", text: "第一作者" }
  ]}
];

const PROJECT_EXTRAS = [
  { match: "失樂感個人化動態監測", year: "114",
    period: "114/08/01–115/07/31", status: "執行中",
    title_en: "Development and application of a personalized dynamic anhedonia-monitoring system based on moving-average theory and ecological momentary assessment" },
  { match: "失樂感個人化動態監測", year: "115",
    period: "", status: "執行中",
    title_en: "Development and application of a personalized dynamic anhedonia-monitoring system based on moving-average theory and ecological momentary assessment (Years 2–3 extension)" },
  { match: "穿戴式AR與VR", year: "114",
    period: "114/01/01–114/12/31",
    title_en: "Wearable AR/VR for adolescent tobacco-prevention education: material design and effectiveness evaluation" },
  { match: "谷口麻希",
    title_en: "Short-term visit: Prof. Maki Taniguchi (Institute of Science Tokyo)" },
  { match: "東亞護理學者論壇",
    title_en: "East Asian Forum of Nursing Scholars" }
];

const EXTRA_PROJECTS = [
  { year: "115", sponsor: "經濟部產業發展署／資策會", category: "產業研究案",
    title: "照護產業科技化指數與指引研究案", role: "共同主持人", budget: "",
    period: "115/01/01–115/12/31", status: "執行中",
    title_en: "Care Industry Technology Index and Guidelines research project",
    sponsor_en: "Industrial Development Administration, MOEA / III",
    category_en: "Industry research project" },
  { year: "114", sponsor: "三軍總醫院", category: "擬真教育資料",
    title: "氣管內管置放處置擬真教育成效與學習反應異質性分析", role: "研究組委員", budget: "",
    period: "112–114",
    title_en: "Effectiveness and learning-response heterogeneity of simulation-based endotracheal intubation training",
    sponsor_en: "Tri-Service General Hospital", category_en: "simulation-education data",
    role_en: "Research Committee Member", period_en: "2023–2025" },
  { year: "114", sponsor: "亞洲大學", category: "教育部教學實踐研究計畫",
    title: "AI 虛擬人增強遊戲式教學與護理學生情緒智能", role: "教學實踐研究", budget: "",
    period: "",
    title_en: "AI virtual-human-augmented game-based teaching and nursing students' emotional intelligence",
    sponsor_en: "Asia University", category_en: "MOE Teaching Practice Research Program",
    role_en: "Teaching Practice Research" }
];
