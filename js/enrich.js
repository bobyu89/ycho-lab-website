/* 手工補充資料（人工維護，改完 push 即上線）：
   - PUB_BADGES：論文徽章。match 填「該論文標題的一小段獨特文字」（不分大小寫）。
     type 可用 rank（排名）、role（作者角色）、grant（計畫編號）。
   - PROJECT_EXTRAS：幫國科會計畫補中文描述與執行期間。match 比對計畫名稱；
     若兩個計畫名稱很像，加 year（民國年度）區分。
   - EXTRA_PROJECTS：國科會以外的計畫（經濟部、醫院、校內計畫…），手工全欄位維護。
   詳見 README-維護說明.md */

const PUB_BADGES = [
  { match: "Cross-Device Platform", badges: [
    { type: "rank", text: "Scopus 235/668 General Medicine" },
    { type: "role", text: "第一作者・通訊作者" },
    { type: "grant", text: "NSTC 114-2314-B-468-006" }
  ]},
  { match: "AI Virtual Human", badges: [
    { type: "rank", text: "Scopus 235/668 General Medicine" },
    { type: "role", text: "第一作者" },
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
  { match: "External Counterpulsation", badges: [
    { type: "role", text: "通訊作者" }
  ]},
  { match: "Anesthetic Care Experience", badges: [
    { type: "role", text: "通訊作者" }
  ]},
  { match: "Correlations between Anhedonia", badges: [
    { type: "role", text: "第一作者・通訊作者" }
  ]},
  { match: "Chinese version", badges: [
    { type: "role", text: "第一作者・通訊作者" }
  ]},
  { match: "Differential trajectory and determinants", badges: [
    { type: "role", text: "第一作者・通訊作者" }
  ]}
];

const PROJECT_EXTRAS = [
  { match: "失樂感個人化動態監測", year: "114",
    period: "114/08/01–115/07/31",
    desc: "以精準及預防精神醫學為方向，結合移動平均理論與生態瞬時評估，發展跨裝置失樂感趨勢視覺化與個人化監測方法。" },
  { match: "失樂感個人化動態監測", year: "115",
    period: "",
    desc: "第二、三年延續計畫：持續發展跨裝置失樂感趨勢視覺化與個人化動態監測系統。" },
  { match: "穿戴式AR與VR", year: "114",
    period: "114/01/01–114/12/31",
    desc: "結合沉浸式科技與健康教育，評估青少年菸害防制介入教材之學習成效。" }
];

const EXTRA_PROJECTS = [
  { year: "115", sponsor: "經濟部產業發展署／資策會", category: "產業研究案",
    title: "照護產業科技化指數與指引研究案", role: "共同主持人", budget: "",
    period: "115/01/01–115/12/31",
    desc: "建立照護產業科技化評估指標與推動指引，支援長照與照護服務數位轉型。" },
  { year: "114", sponsor: "三軍總醫院", category: "擬真教育研究",
    title: "氣管內管置放處置擬真教育成效與學習反應異質性分析", role: "研究督導", budget: "",
    period: "112–114",
    desc: "以 responder analysis 與 mixed-methods 評估擬真訓練中誰最受益，並提出分層教學設計。" },
  { year: "114", sponsor: "亞洲大學", category: "教學實踐研究",
    title: "AI 虛擬人增強遊戲式教學與護理學生情緒智能", role: "", budget: "",
    period: "",
    desc: "依據 JMIR Research Protocols 發表之研究設計，評估 AI 虛擬人結合遊戲式教學對護理學生情緒智能之教學成效。" }
];
