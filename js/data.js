/* 內容後台設定：填入後即自動串接，留空則顯示內建備用資料。
   設定步驟見 README-維護說明.md */
const CONFIG = {
  SHEET_ID: "1061JGstTRdL_tsDVdKwjhnx8H2rvTc5DaLfXpU6WbK8", // 雲端「網站後台-消息與活動」試算表
  DRIVE_FOLDER_ID: "1Vi93_Xw7oruDRUguRs4q-mFFfYGNtbAD",      // 雲端「實驗室網站/活動照片」資料夾
  DRIVE_API_KEY: "AIzaSyD6XJELxWdiiCTPNgHiJrT-09n-X6clCYc" // 限制 referrer：bobyu89.github.io、localhost:8788
};

const FALLBACK_NEWS = [
  { date: "2026-01-01", category: "公告", content: "「照護產業科技化指數與指引研究案」（經濟部產業發展署／資策會）正式啟動。", link: "" },
  { date: "2025-08-01", category: "公告", content: "國科會計畫「基於移動平均理論與生態瞬時評估法之失樂感個人化動態監測系統發展與應用」開始執行。", link: "" },
  { date: "2025-06-15", category: "發表", content: "跨裝置失樂感趨勢視覺化平台研究計畫書（Part I）刊登於 JMIR Research Protocols。", link: "" },
  { date: "2025-05-20", category: "發表", content: "AI 虛擬人增強遊戲式教學提升護理學生情緒智能之研究計畫書刊登於 JMIR Research Protocols。", link: "" },
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

function makePlaceholder(n) {
  const hues = [
    ["#00e3e3", "#6a6aff"], ["#6a6aff", "#00e3e3"], ["#8e8e8e", "#00e3e3"],
    ["#00e3e3", "#8e8e8e"], ["#6a6aff", "#8e8e8e"], ["#8e8e8e", "#6a6aff"],
    ["#00b8b8", "#5050e0"], ["#5050e0", "#00b8b8"]
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

async function fetchSheet(selector) {
  if (!CONFIG.SHEET_ID) throw new Error("no sheet configured");
  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&${selector}`;
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
      rows = await fetchSheet("sheet=news");
      if (!rows.some((r) => r.content)) throw new Error("empty news sheet");
    } catch {
      rows = await fetchSheet("gid=0");
    }
    const items = rows
      .filter((r) => r.content)
      .map((r) => ({
        date: normalizeDate(r.date),
        category: String(r.category || "公告").trim(),
        content: String(r.content),
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
    const rows = await fetchSheet("sheet=events");
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
    if (limit) photos = photos.slice(0, limit);
    return photos;
  } catch {
    return limit ? FALLBACK_PHOTOS.slice(0, limit) : FALLBACK_PHOTOS;
  }
}
