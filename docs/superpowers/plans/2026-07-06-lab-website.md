# 實驗室網站改版 Implementation Plan

> **2026-07-06 更新：** 視覺與頁面架構改依《2026-07-06-pink-nursing-redesign-design.md》（粉色護理風・五層架構・8 頁）執行；本計畫中的霧灰/液態玻璃視覺描述作廢，技術骨架（資料層、元件化、動畫模組、驗收流程）不變。頁面清單改為：index / research（含計畫）/ publications / education / members（含主持人）/ collaboration（含照片牆）/ resources；動畫將 EMA 波形改為心電圖線。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 依 2026-07-06 設計文件建置多頁式實驗室網站（霧灰 + 液態玻璃 + 微動畫），含 Google 試算表/雲端資料串接與降級。

**Architecture:** 純靜態 HTML/CSS/JS，無框架。共用 header/footer 由 `js/components.js` 注入；動態資料（消息/活動/照片）由 `js/data.js` 讀取 Google 端點、失敗時用內建備用資料；動畫集中在 `js/animations.js`。

**Tech Stack:** HTML5、CSS（custom properties + backdrop-filter）、原生 JS（IntersectionObserver、Canvas）、Google Fonts（Noto Sans TC / Inter / Space Mono）、Firebase Hosting。

## Global Constraints

- 配色：底 `#F4F5F7`、表面 `#FFFFFF`、主文字 `#1E2427`、中灰 `#8E8E8E`、螢光青 `#00E3E3`（僅裝飾發光體）、深青 `#009E9E`（可讀青）、靛紫 `#6A6AFF`（主按鈕）
- `#00E3E3` 不得用於文字或按鈕底色（對比不足）
- 所有動畫必須包在 `@media (prefers-reduced-motion: no-preference)` 或等效 JS 檢查內
- `backdrop-filter` 需 `@supports` 降級（半透明白實色底）
- 內容一律沿用現網站備份文案（scratchpad/site.html），不得自創研究內容
- 老師姓名（Ho YC／賀彥中）在論文列表粗體；老師介紹重點粗體
- 每個 Task 結束 commit；訊息用英文 conventional commits

---

### Task 1: 設計系統與專案骨架

**Files:**
- Create: `css/main.css`、`assets/`（資料夾）、`firebase.json`、`.gitignore`

**Interfaces:**
- Produces: CSS custom properties `--bg --surface --ink --gray --cyan --cyan-deep --violet --glass-bg --glass-border`；類別 `.glass .btn .btn-primary .btn-ghost .mono-label .container .section .reveal .card`

- [ ] Step 1: 建立 `css/main.css`：`:root` 變數、reset、字體、`.glass`（含 `@supports` 降級與 hover 加深）、按鈕、`.mono-label`（Space Mono 大寫小標）、`.container`（max-width 1200px）、`.reveal`（進場動畫初始態，`prefers-reduced-motion` 時直接顯示）、光暈 blob 類別 `.blob .blob-cyan .blob-violet`（大模糊、drift 動畫）
- [ ] Step 2: 建立 `firebase.json`（public: "."、ignore docs/.git）與 `.gitignore`（`.firebase/`、`*.log`）
- [ ] Step 3: 建立煙霧測試頁暫用 index.html（僅引 main.css，放一顆 .glass 卡在 blob 上）
- [ ] Step 4: Preview 驗證：玻璃模糊可見、blob 漂移、reduced-motion 模擬時停止
- [ ] Step 5: `git add -A && git commit -m "feat: design system foundation"`

### Task 2: 共用元件（導覽列／頁尾／燈箱）

**Files:**
- Create: `js/components.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `initLayout(activePage)`（注入膠囊玻璃 header + footer；activePage 高亮）、`openLightbox(src, caption)`；header 含漢堡選單（<900px），捲動>12px 時 header 加 `data-elevated`
- 導覽項：首頁 index.html｜研究主軸 research.html｜研究計畫 projects.html｜團隊成員 members.html｜成果發表 publications.html｜活動花絮 gallery.html｜主持人 pi.html

- [ ] Step 1: 寫 `components.js`：模板字串注入 header（膠囊玻璃、logo「SH」方塊 + 中文名）、footer（深灰帶、聯絡資訊：賀彥中 助理教授／國防醫學大學護理學系／nokia3350g@gmail.com、快速連結）、燈箱 DOM 與鍵盤 Esc 關閉
- [ ] Step 2: index.html 引用並以 `initLayout('index')` 驗證高亮與漢堡選單
- [ ] Step 3: Preview 驗證桌機/手機兩尺寸
- [ ] Step 4: Commit `feat: shared layout components`

### Task 3: 首頁 Hero + 統計卡 + 研究主軸

**Files:**
- Create: `js/animations.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `initReveal()`（IntersectionObserver 對 `.reveal` 加 `.in`，群組錯開 0.1s）、`initCounters()`（`[data-count]` 數字滾動）、`initWave(canvasEl)`（EMA 主曲線 + 移動平均虛線橫向流動，reduced-motion 時畫靜態一幀）
- Hero 文案沿用現網站；mono 標籤 `[SMART.HEALTH.LAB]`；統計：期刊論文 7、研討會論文 5、進行中計畫 4、成員 3
- 四主軸卡：hover 頂部青→紫漸層線 scaleX 展開、`進行中` 玻璃籤

- [ ] Step 1: index.html 完成 Hero（左文右玻璃監測卡 + sheen 光澤動畫）、統計卡 ×4、四主軸卡（文案取自備份）
- [ ] Step 2: animations.js 實作三個 init 並接上
- [ ] Step 3: Preview 驗證：波形流動、數字滾動一次性、卡片錯開進場、hover 細節
- [ ] Step 4: Commit `feat: homepage hero, stats, research focus`

### Task 4: 資料層（試算表 + Drive + 降級）

**Files:**
- Create: `js/data.js`

**Interfaces:**
- Produces: `CONFIG`（SHEET_ID、DRIVE_FOLDER_ID、DRIVE_API_KEY，可為空）、`fetchNews() -> [{date,category,content,link}]`、`fetchEvents() -> [{date,title,description,image,pinned}]`、`fetchPhotos(limit) -> [{src,thumb,caption}]`；全部 async、失敗回傳 `FALLBACK_NEWS / FALLBACK_EVENTS / FALLBACK_PHOTOS`
- gviz 解析：剝除 `google.visualization.Query.setResponse(...)` 包裝後 JSON.parse
- Drive 縮圖 `https://drive.google.com/thumbnail?id={id}&sz=w800`；未設 API key 時直接回傳 FALLBACK_PHOTOS（assets 佔位圖 8 張，SVG 漸層 data-URI 或本地檔）

- [ ] Step 1: 寫 data.js（含 5 筆合理的備用消息、2 筆備用活動——內容取自現網站真實事實：JMIR 論文發表、國科會計畫開始等）
- [ ] Step 2: 主控台手動呼叫三個 fetch 驗證 fallback 路徑
- [ ] Step 3: Commit `feat: data layer with google sheets/drive + fallbacks`

### Task 5: 首頁消息時間軸 + 重要活動 + 照片牆 + 關於老師

**Files:**
- Modify: `index.html`、`js/animations.js`（加 `initTimeline()` 豎線畫出）

**Interfaces:**
- Consumes: `fetchNews/fetchEvents/fetchPhotos`、`openLightbox`
- 消息：預設 5 則 +「顯示更多」；分類籤色：榮譽=靛紫、發表=深青、活動=灰、公告=中灰描邊
- 照片牆：masonry（CSS columns）、`Fig.{n}` 玻璃籤、hover 玻璃說明條、點擊燈箱
- 關於老師：頭銜/學歷/專長粗體、mono 籤 `PI: HO YEN-CHUNG`、連 pi.html

- [ ] Step 1: 實作四區 + 渲染函式
- [ ] Step 2: Preview 驗證含 fallback 資料呈現、時間軸動畫、燈箱
- [ ] Step 3: Commit `feat: homepage news, events, gallery, PI sections`

### Task 6: 六個子頁

**Files:**
- Create: `pi.html research.html members.html publications.html projects.html gallery.html`

**Interfaces:**
- Consumes: `initLayout(page)`、`initReveal()`、gallery 用 `fetchPhotos(0)` 全量
- 內容對照備份：research=四主軸+轉譯模型四原則+關鍵字雲；projects=4 研究案（含 tag 經費/日期）；members=2 研究生完整題目與摘要；publications=期刊 7+研討會 5（姓名粗體、預留 DOI `<a>`）；pi=老師介紹（重點粗體）+聯絡；gallery=完整照片牆+燈箱
- 各頁共用 hero-lite（小型頁首橫幅：mono 籤 + 頁名 + 一句描述）

- [ ] Step 1: 建六頁（共用結構，內容如上）
- [ ] Step 2: Preview 逐頁驗證與導覽高亮
- [ ] Step 3: Commit `feat: subpages`

### Task 7: 驗收與交付文件

**Files:**
- Create: `README-維護說明.md`
- Modify: 修正驗收發現的問題

- [ ] Step 1: 三尺寸（1280/768/375）逐頁檢查、reduced-motion、backdrop-filter 降級（DevTools 模擬）
- [ ] Step 2: 內容比對備份（四主軸、4 計畫、2 研究生、12 論文、聯絡資訊）
- [ ] Step 3: 寫維護說明（試算表欄位、照片命名、API key 申請與填入 CONFIG 的步驟、部署指令 `firebase deploy`）
- [ ] Step 4: Commit `docs: maintenance guide` + 最終修正
