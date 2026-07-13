/* ==========================================================================
   YCHO Lab Website — Site Data
   智慧醫療轉譯及創新實驗室 (Smart Health Translation & Innovation Lab)
   結構與 sung-lab-website/js/data.js 保持一致；保留原有 Google Sheets /
   Google Drive 串接設定與解析邏輯。
   ========================================================================== */

const SITE = {
  nameZh: "智慧醫療轉譯及創新實驗室",
  nameEn: "Smart Health Translation & Innovation Lab",
  tagline: "以護理科學為根、以數位量測為方法，發展可解釋、可落地、可擴散的智慧醫療與心理健康創新",
  taglineEn: "Rooted in nursing science, powered by digital measurement — building explainable, deployable, and scalable smart-health innovation",
  pi: "賀彥中 助理教授",
  piEn: "Yen-Chung Ho, PhD, Assistant Professor",
  dept: "國防醫學大學護理學系",
  deptEn: "Department of Nursing, National Defense Medical University",
  email: "nokia3350g@gmail.com",
  scholar: "https://scholar.google.com/citations?user=sa65IacAAAAJ&hl=zh-TW",
  stats: { journal: 7, conference: 5, projects: 5, members: 4 }
};

/* ==========================================================================
   CONFIG — Google Sheets (gviz) + Google Drive source settings
   填入後即自動串接，留空則顯示內建備用資料。設定步驟見 README-維護說明.md
   ========================================================================== */
const CONFIG = {
  SHEET_ID: "1vrl5wBdmVocqPfwQlQ3bMlydVw2HgkhKBo7sFgqp8Uw",        // 雲端「網站後台-消息與活動（含英文欄）v3」試算表（最新消息；v2 已停用）
  EVENTS_SHEET_ID: "1f8JzHwbDItOId105OcyBv4WGbWBAO5NlDOVn8FQk4VQ", // 雲端「網站後台-重要活動」試算表
  DRIVE_FOLDER_ID: "1Vi93_Xw7oruDRUguRs4q-mFFfYGNtbAD",            // 雲端「實驗室網站/活動照片」資料夾
  DRIVE_API_KEY: "AIzaSyD6XJELxWdiiCTPNgHiJrT-09n-X6clCYc"         // 限制 referrer：bobyu89.github.io、localhost:8788
};

/* ==========================================================================
   FALLBACK data — shown whenever CONFIG is empty or a fetch/parse fails.
   ========================================================================== */
const FALLBACK_NEWS = [
  { date: "2026-07-16", category: "榮譽", content: "獲國科會補助赴加拿大多倫多參加 37th International Nursing Research Congress 進行口頭報告。", content_en: "Awarded an NSTC grant to deliver an oral presentation at the 37th International Nursing Research Congress in Toronto, Canada.", link: "" },
  { date: "2026-07-11", category: "榮譽", content: "獲國科會「邀請國際科技人士短期訪問」計畫補助，邀請東京科學大學谷口麻希（Taniguchi Maki）教授來台短期訪問。", content_en: "Awarded an NSTC \"Short-Term Visit by International S&T Experts\" grant to host Prof. Maki Taniguchi (Institute of Science Tokyo) for a short-term visit to Taiwan.", link: "" },
  { date: "2026-07-10", category: "榮譽", content: "本實驗室國科會計畫研究成果通過國防醫學大學第 81 次智審會，獲同意補助申請中華民國發明專利。", content_en: "Our NSTC-funded research results passed NDMU's 81st Intellectual Property Review Committee, with approved funding support for filing an R.O.C. (Taiwan) invention patent.", link: "" },
  { date: "2026-08-11", category: "公告", content: "研究生李妍鋅論文計畫口試將於 8 月 11 日（二）11:00–13:00 舉行。", content_en: "Graduate student Yen-Hsin Lee's thesis proposal defense: Tuesday, Aug 11, 11:00–13:00.", link: "" },
  { date: "2026-08-07", category: "公告", content: "研究生游明勳論文計畫口試將於 8 月 7 日（五）11:00–13:00 舉行。", content_en: "Graduate student Ming-Hsun Yu's thesis proposal defense: Friday, Aug 7, 11:00–13:00.", link: "" },
  { date: "2026-07-01", category: "公告", content: "跨裝置失樂感趨勢視覺化平台研究計畫，延續計劃通過。", content_en: "The follow-up grant for the cross-device anhedonia trend visualization platform has been approved.", link: "" },
  { date: "2026-01-01", category: "公告", content: "「照護產業科技化指數與指引研究案」（經濟部產業發展署／資策會）正式啟動。", content_en: "The Care Industry Technology Index and Guidelines project (Industrial Development Administration, MOEA / III) has officially launched.", link: "" },
  { date: "2025-08-01", category: "公告", content: "國科會計畫「基於移動平均理論與生態瞬時評估法之失樂感個人化動態監測系統發展與應用」開始執行。", link: "" },
  { date: "2025-06-15", category: "發表", content: "跨裝置失樂感趨勢視覺化平台研究計畫書（Part I）刊登於 JMIR Research Protocols。", link: "" },
  { date: "2025-05-20", category: "發表", content: "AI 虛擬人增強遊戲式教學提升護理學生情緒智能之研究計畫書刊登於 JMIR Research Protocols。", link: "" },
  { date: "2025-04-01", category: "榮譽", content: "本實驗室國科會計畫延伸研究成果之美國發明專利臨時案通過。", content_en: "A U.S. provisional patent application derived from our NSTC-funded research was successfully filed.", link: "" },
  { date: "2025-02-10", category: "活動", content: "實驗室成員於 EAFONS 2025 發表體外反搏（EECP）應用於壓力管理之先驅研究。", link: "" },
  { date: "2024-10-01", category: "發表", content: "癌症病人憂鬱症狀盛行率與相關因素研究刊登於 Current Oncology。", link: "" },
  { date: "2024-05-01", category: "發表", content: "SHAPS 切分值與預測因子研究（臨床與校園場域比較）刊登於 BJPsych Open。", link: "" }
];

const FALLBACK_EVENTS = [
  {
    date: "2026-01-01",
    title: "照護產業科技化指數與指引研究案啟動",
    description: "與經濟部產業發展署／資策會合作，建立照護產業科技化評估指標與推動指引，支援長照與照護服務數位轉型。",
    image: "",
    pinned: true
  },
  {
    date: "2026-07-01",
    title: "國科會失樂感個人化動態監測延續計劃",
    description: "以精準及預防精神醫學為方向，結合移動平均理論與生態瞬時評估（EMA），發展跨裝置失樂感趨勢視覺化與個人化監測方法。",
    image: "",
    pinned: true
  }
];

/* 佔位照片 — 尚未串接 Drive 或雲端相簿為空時顯示 */
function makePlaceholder(n) {
  const hues = [
    ["#4568C8", "#7668D8"], ["#7668D8", "#4568C8"], ["#2AAE9B", "#4568C8"],
    ["#4568C8", "#2AAE9B"], ["#7668D8", "#2AAE9B"], ["#2AAE9B", "#7668D8"],
    ["#263B80", "#7668D8"], ["#7668D8", "#263B80"]
  ];
  const [c1, c2] = hues[n % hues.length];
  const heights = [300, 380, 260, 340, 300, 420, 280, 360];
  const hgt = heights[n % heights.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="${hgt}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}" stop-opacity=".25"/>
      <stop offset="1" stop-color="${c2}" stop-opacity=".35"/>
    </linearGradient></defs>
    <rect width="400" height="${hgt}" fill="#eef0f3"/>
    <rect width="400" height="${hgt}" fill="url(#g)"/>
    <text x="50%" y="50%" text-anchor="middle" fill="rgba(30,36,39,.35)"
      font-family="monospace" font-size="15">PHOTO ${String(n + 1).padStart(2, "0")}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

const FALLBACK_PHOTOS = Array.from({ length: 8 }, (_, i) => ({
  src: makePlaceholder(i),
  thumb: makePlaceholder(i),
  caption: "實驗室活動照片（雲端串接後自動更新）"
}));

/* ==========================================================================
   Fetchers — Google Sheets (gviz) + Google Drive
   ========================================================================== */
async function fetchSheet(sheetId, selector) {
  if (!sheetId) throw new Error("no sheet configured");
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&${selector}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`sheet http ${res.status}`);
  const text = await res.text();
  const json = JSON.parse(text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1));
  const cols = json.table.cols.map((c) => (c.label || "").trim().toLowerCase());
  return json.table.rows.map((row) => {
    const obj = {};
    cols.forEach((label, i) => {
      const cell = row.c[i];
      obj[label] = cell ? (cell.f ?? cell.v ?? "") : "";
    });
    return obj;
  });
}

function normalizeDate(value) {
  if (value == null) return "";
  const str = String(value).trim();
  const gviz = str.match(/^Date\((\d+),(\d+),(\d+)/);
  if (gviz) {
    return `${gviz[1]}-${String(+gviz[2] + 1).padStart(2, "0")}-${String(+gviz[3]).padStart(2, "0")}`;
  }
  const slash = str.match(/^(\d{4})[\/.](\d{1,2})[\/.](\d{1,2})/);
  if (slash) {
    return `${slash[1]}-${slash[2].padStart(2, "0")}-${slash[3].padStart(2, "0")}`;
  }
  return str;
}

async function fetchNews() {
  try {
    /* 優先讀名為 news 的工作表；還沒改名時退回第一個分頁 */
    let rows;
    try {
      rows = await fetchSheet(CONFIG.SHEET_ID, "sheet=news");
      if (!rows.some((r) => r.content)) throw new Error("empty news sheet");
    } catch {
      rows = await fetchSheet(CONFIG.SHEET_ID, "gid=0");
    }
    const items = rows
      .filter((r) => r.content)
      .map((r) => ({
        date: normalizeDate(r.date),
        category: String(r.category || "公告").trim(),
        content: String(r.content),
        content_en: String(r.content_en || ""),
        link: String(r.link || "")
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
    return items.length ? items : FALLBACK_NEWS;
  } catch {
    return FALLBACK_NEWS;
  }
}

async function fetchEvents() {
  try {
    const rows = await fetchSheet(CONFIG.EVENTS_SHEET_ID, "gid=0");
    const items = rows
      .filter((r) => r.title)
      .map((r) => ({
        date: normalizeDate(r.date),
        title: String(r.title),
        description: String(r.description || ""),
        image: String(r.image || ""),
        pinned: /^(true|1|yes|y|是|v)$/i.test(String(r.pinned || ""))
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
    return items.length ? items : FALLBACK_EVENTS;
  } catch {
    return FALLBACK_EVENTS;
  }
}

function sortPhotosByCaptionDate(photos) {
  /* 檔名（＝說明文字）開頭含 YYYY-MM-DD 時依活動日期新到舊排序；
     沒有日期的照片維持原相對順序、排在有日期者之後。 */
  const dateOf = (p) => {
    const m = String(p.caption || "").match(/(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/);
    return m ? new Date(+m[1], +m[2] - 1, +m[3]).getTime() : null;
  };
  return photos.slice().sort((a, b) => {
    const da = dateOf(a);
    const db = dateOf(b);
    if (da === null && db === null) return 0;
    if (da === null) return 1;
    if (db === null) return -1;
    return db - da;
  });
}

async function fetchPhotos(limit) {
  try {
    if (!CONFIG.DRIVE_FOLDER_ID || !CONFIG.DRIVE_API_KEY) throw new Error("no drive configured");
    const q = encodeURIComponent(`'${CONFIG.DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`);
    const url = `https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=createdTime desc&pageSize=100&fields=files(id,name)&key=${CONFIG.DRIVE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`drive http ${res.status}`);
    const data = await res.json();
    let photos = (data.files || []).map((f) => ({
      src: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1600`,
      thumb: `https://drive.google.com/thumbnail?id=${f.id}&sz=w800`,
      caption: f.name.replace(/\.[^.]+$/, "")
    }));
    if (!photos.length) throw new Error("empty folder");
    photos = sortPhotosByCaptionDate(photos);
    if (limit) photos = photos.slice(0, limit);
    return photos;
  } catch {
    return limit ? FALLBACK_PHOTOS.slice(0, limit) : FALLBACK_PHOTOS;
  }
}

/* 國科會研究人才網同步資料（data/nstc.json 由 tools/sync-nstc.ps1 每週自動更新）。
   讀取失敗時顯示以下內建快照。 */
const FALLBACK_NSTC = {
    "lastSync":  "2026-07-13",
    "publications":  [
                         {
                             "date":  "2026-07",
                             "type":  "研討會論文",
                             "title":  "AI-Guided Psychodrama Materials for Psychiatric Nursing: Feasibility of AI-Validated Synthetic Cases",
                             "authors":  "Yen-Chung Ho, Chien Mei Sung",
                             "venue":  ""
                         },
                         {
                             "date":  "2026-02",
                             "type":  "期刊論文",
                             "title":  "Advancing Elderly and Dementia Friendly Care through Innovative Nursing Education: Integrating Flipped Learning and Service-Learning Strategies",
                             "authors":  "Yen-Chung Ho, Hui-Jung Hung, Luke Molloy, Yung-Chieh Ching",
                             "venue":  "International Journal of Gerontology"
                         },
                         {
                             "date":  "2025-12",
                             "type":  "期刊論文",
                             "title":  "Development and Validation of a Cross-Device Platform for Anhedonia Trend Visualization by Using Ecological Momentary Assessment and Moving Averages (Part I): Protocol for a Methodological Pilot Study",
                             "authors":  "Ho YC, Fang CL, Ching YC, Chang HJ, Wang JY, Wang CC",
                             "venue":  "JMIR RESEARCH PROTOCOLS"
                         },
                         {
                             "date":  "2025-10",
                             "type":  "期刊論文",
                             "title":  "AI Virtual Human–Augmented Game-Based Teaching to Enhance Emotional Intelligence in Nursing Students: Protocol for a Single-Group Pretest-Posttest Action Research Study",
                             "authors":  "Ching YC, Ho YC",
                             "venue":  "JMIR RESEARCH PROTOCOLS"
                         },
                         {
                             "date":  "2025-02",
                             "type":  "研討會論文",
                             "title":  "Establishing a Standard Protocol for Using Enhanced External Counterpulsation in Stress Management Cases: A Pilot Study",
                             "authors":  "CHIA-LING FANG、PAN-JOU YAO、CHING-YAO CHANG、YEN-CHUNG HO",
                             "venue":  ""
                         },
                         {
                             "date":  "2024-09",
                             "type":  "期刊論文",
                             "title":  "Prevalence and Correlates of Depressive Symptoms among Patients with Cancer: A Cross-Sectional Study",
                             "authors":  "Yu WZ, Wang HF, Huda N, Yen Y, Liu YL, Li CS, Ho YC, Chang HJ.",
                             "venue":  "Current Oncology"
                         },
                         {
                             "date":  "2024-05",
                             "type":  "期刊論文",
                             "title":  "Determining cut-off values and predictors for the Snaith–Hamilton Pleasure Scale: comparison between clinical and school settings",
                             "authors":  "Ho Y-C, Gau SS-F, Wu Y-S, et al.",
                             "venue":  "BJPsych Open"
                         },
                         {
                             "date":  "2024-03",
                             "type":  "研討會論文",
                             "title":  "Anesthetic Care Experience for Low Anterior Resection Surgery",
                             "authors":  "Fang C.L., Cheng Y.C., Liao, J.Y., Ho, Y. C",
                             "venue":  ""
                         },
                         {
                             "date":  "2023-11",
                             "type":  "期刊論文",
                             "title":  "Exploring the impact of a multilevel intervention focused on reducing the practices of seclusion and restraint in acute mental health units in an Australian mental health service",
                             "authors":  "Havilla, S., Alanazi, F.K., Boon, B., Patton, D., Ho, Y.-C. \u0026 Molloy, L.",
                             "venue":  "International Journal of Mental Health Nursing"
                         },
                         {
                             "date":  "2023-07",
                             "type":  "期刊論文",
                             "title":  "Identifying differential trajectories and predictors for depressive symptoms in adolescents using latent class growth analysis: A population-based cohort study",
                             "authors":  "Ho YC, Chiou HY, Molloy L, Lin KC, Chang PC, Chang HJ.",
                             "venue":  "Journal of Adolescence"
                         },
                         {
                             "date":  "2022-04",
                             "type":  "研討會論文",
                             "title":  "Correlations between Anhedonia and Depressive Symptoms in both Clinical and Non-clinical samples",
                             "authors":  "Ho YC, Gau SF, WU YS, Chen CH, Wang Jk, Lee HC, Chung KH, Chiu YH, Goh KK, Lu ML, Lin YC, Chang PC, Chang HJ",
                             "venue":  ""
                         },
                         {
                             "date":  "2022-04",
                             "type":  "研討會論文",
                             "title":  "The psychometric properties of the Chinese version Snaith-Hamilton Pleasure Scale in Taiwan",
                             "authors":  "Ho YC, Gau SF, WU YS, Chen CH, Wang Jk, Lee HC, Chung KH, Chiu YH, Goh KK, Lu ML, Lin YC, Chang PC, Chang HJ. (2022, April).. Oral presentation at the , Taipei, Taiwan.",
                             "venue":  ""
                         },
                         {
                             "date":  "2020-06",
                             "type":  "期刊論文",
                             "title":  "Correlations among life stress, smoking behavior, and depressive symptoms in adolescents: A descriptive study with a mediating model",
                             "authors":  "Ho,YC, Lee,HC, Lin,MF, Chang,HJ",
                             "venue":  "Nursing \u0026 Health Sciences"
                         },
                         {
                             "date":  "2020-01",
                             "type":  "研討會論文",
                             "title":  "Differential trajectory and determinants of depression for adolescents by using latent class growth analysis: a population-based analysis over a 4-year period",
                             "authors":  "Ho, Y. C., Chang, H. J.",
                             "venue":  ""
                         },
                         {
                             "date":  "2018-07",
                             "type":  "研討會論文",
                             "title":  "The Relationship Among Life Stress, Smoking Behavior, and Depressive Symptoms in Teenagers",
                             "authors":  "Ho, Y. C., Chang, H. J.",
                             "venue":  ""
                         },
                         {
                             "date":  "2010-11",
                             "type":  "期刊論文",
                             "title":  "Concept analysis of personality traits",
                             "authors":  "Lin, S.J., Ho, Y. C., Hsiao, J.K.",
                             "venue":  "經國學報 Journal of Ching Kuo Institute of Management and Health"
                         }
                     ],
    "projects":  [
                     {
                         "year":  "115",
                         "category":  "短訪計畫 (邀請國際科技人士短期訪問)",
                         "field":  "護理",
                         "title":  "谷口麻希 Taniguchi Maki",
                         "role":  "計畫主持人",
                         "budget":  "29,090"
                     },
                     {
                         "year":  "115",
                         "category":  "補助國內專家學者出席國際學術會議",
                         "field":  "精神醫學、老人醫學及家庭醫學",
                         "title":  "37th International Nursing Research Congress",
                         "role":  "計畫主持人",
                         "budget":  "50,000"
                     },
                     {
                         "year":  "115",
                         "category":  "專題研究計畫 (新進人員研究計畫)",
                         "field":  "精神醫學、老人醫學及家庭醫學",
                         "title":  "基於移動平均理論與生態瞬時評估法之失樂感個人化動態監測系統發展與應用：精準及預防精神醫學的新方向(第二、三年延續計畫)",
                         "role":  "計畫主持人",
                         "budget":  "1,092,000"
                     },
                     {
                         "year":  "114",
                         "category":  "專題研究計畫 (新進人員研究計畫)",
                         "field":  "精神醫學、老人醫學及家庭醫學",
                         "title":  "基於移動平均理論與生態瞬時評估法之失樂感個人化動態監測系統發展與應用：精準及預防精神醫學的新方向",
                         "role":  "計畫主持人",
                         "budget":  "765,000"
                     },
                     {
                         "year":  "114",
                         "category":  "專題研究計畫 (一般研究計畫)",
                         "field":  "資訊教育",
                         "title":  "穿戴式AR與VR應用於青少年菸害防制教育教材設計與成效評估",
                         "role":  "共同主持人",
                         "budget":  "790,000"
                     },
                     {
                         "year":  "109",
                         "category":  "研究生出席國際會議",
                         "field":  "精神醫學、老人醫學及家庭醫學",
                         "title":  "東亞護理學者論壇",
                         "role":  "計畫主持人",
                         "budget":  "17,200"
                     }
                 ]
};

async function fetchNstc() {
  try {
    const base = /\/en\//.test(location.pathname) ? "../" : "";
    const res = await fetch(base + "data/nstc.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`nstc http ${res.status}`);
    const data = await res.json();
    if (!data.publications || !data.publications.length) throw new Error("empty nstc data");
    return data;
  } catch {
    return FALLBACK_NSTC;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
