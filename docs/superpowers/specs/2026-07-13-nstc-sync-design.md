# 國科會著作／計畫自動同步 — 設計文件

日期：2026-07-13
狀態：待實作

## 目標

國科會研究人才網公開了賀彥中老師的著作目錄與計畫清單。本功能讓「計畫通過、論文通過」後，
網站的成果發表頁、研究計畫頁、首頁統計數字**自動更新**，不需手動改 HTML。

資料來源（兩個公開頁面，純 GET 可抓、UTF-8、HTML 表格）：

- 著作目錄：`https://arspb.nstc.gov.tw/NSCWebFront/modules/talentSearch/talentSearch.do?action=initRsm05&rsNo=d224e67d09bd45b9b822380b65c26085&LANG=chi`
- 計畫清單：`https://arspb.nstc.gov.tw/NSCWebFront/modules/talentSearch/talentSearch.do?action=initRsm17new&rsNo=d224e67d09bd45b9b822380b65c26085&LANG=chi`

## 已確認的決策

1. **更新機制**：GitHub Actions 排程自動同步（每週一次＋可手動觸發）。
2. **資料合併**：國科會資料為基礎清單；手工補充檔負責徽章與非國科會項目。
3. **計畫範圍**：國科會清單全部顯示（含出席國際會議補助、國際人士短訪等小額補助）。
4. **輸出格式一律統一**：所有來源（國科會自動／手工補充）都經同一渲染模板輸出，
   頁面上看不出來源差異。不保留手寫 HTML 的個別格式。

## 整體資料流

```
國科會研究人才網（兩頁）
   │  GitHub Actions：每週一 08:00 台北時間＋手動觸發
   ▼
tools/sync-nstc.ps1（PowerShell，本機與雲端皆可跑）
   │  解析 HTML 表格 → data/nstc.json
   │  有變動才 commit + push（無變動或解析失敗則跳過）
   ▼
GitHub Pages 自動重新部署
   │
   ▼
前端 JS 讀 data/nstc.json ＋ js/enrich.js（手工補充）
   → 渲染 publications.html / projects.html / 首頁統計
```

## 元件

### 1. `tools/sync-nstc.ps1`（同步腳本）

- PowerShell 腳本（選 PowerShell 因本機無 Node/Python，而 pwsh 本機、GitHub runner 皆有，
  同一支腳本兩邊可跑，方便本機除錯）。
- 抓兩個 URL（UTF-8），以 regex 解析 `<table>` 內的 `<tr>/<td>`。
- 輸出 `data/nstc.json`，結構：

```json
{
  "lastSync": "2026-07-13",
  "publications": [
    { "date": "2025-12", "type": "期刊論文",
      "title": "...", "authors": "Yen-Chung Ho, ...", "venue": "JMIR Research Protocols" }
  ],
  "projects": [
    { "year": "115", "category": "專題研究計畫(新進人員研究計畫)",
      "field": "護理", "title": "...", "role": "計畫主持人", "budget": "1,092,000" }
  ]
}
```

- 防呆：任一清單解析結果為 0 筆 → 以非零碼結束、不寫檔（視為國科會改版或網站異常）。
- `lastSync` 只在內容有實質變動時更新，避免每週產生無意義 commit。
  （實作方式：比較新舊 JSON 中 publications/projects 兩段序列化結果，相同則不寫檔。）

### 2. `.github/workflows/sync-nstc.yml`（排程）

- 觸發：`schedule`（每週一 00:00 UTC＝台北 08:00）＋ `workflow_dispatch`（手動）。
- 步驟：checkout → 跑 `pwsh tools/sync-nstc.ps1` → `git diff --quiet data/nstc.json` 有變動才
  commit（訊息如 `chore: sync NSTC data 2026-07-13`）並 push。
- 需要 `permissions: contents: write`。
- 腳本失敗（exit 非 0）→ workflow 標紅但不影響網站現狀。

### 3. `js/enrich.js`（手工補充檔）

集中所有需要人工維護的內容，附註解教學（比照 data.js 風格）：

- `PUB_BADGES`：陣列，每筆 `{ match: "標題關鍵字", badges: [{type: "rank"|"role"|"grant", text: "..."}] }`。
  以標題子字串（不分大小寫）比對國科會資料。現有 12 筆論文的徽章原樣搬入。
- `EXTRA_PROJECTS`：非國科會計畫（經濟部產發署、三總擬真教育、亞大教學實踐研究），
  欄位與 nstc.json 的 projects 相同，另加 `desc`（中文描述）與 `period`（期間文字）。
- `PROJECT_EXTRAS`：陣列 `{ match: "計畫標題關鍵字", desc: "中文描述", period: "114/08/01–115/07/31" }`，
  幫國科會計畫補描述與執行期間（國科會頁面只有年度沒有起迄日）。

### 4. 前端渲染（統一模板）

`js/data.js` 新增 `fetchNstc()`：fetch `data/nstc.json`，失敗時回傳內建 `FALLBACK_NSTC`
（以本次同步到的真實資料為快照，含全部 16 筆著作與 7 筆計畫）。與現有 news/events 容錯模式一致。

**publications.html**：改為容器＋JS 渲染。

- 分「期刊論文」「研討會論文」兩區塊（沿用 `.pub-block` / `.pub-list` 樣式），依年月新→舊排序。
- 每筆統一模板：`作者（年）．標題．《期刊》`＋徽章列。
  - 作者字串中，老師姓名的各種寫法（`Yen-Chung Ho`、`Ho YC`、`Ho Y-C` 等）自動加粗。
  - venue 為空（多數研討會論文）則省略期刊段。
  - 徽章：從 `PUB_BADGES` 依標題比對取得；比對不到就素面顯示。
- 頁面既有的手寫 `<ol>` 全數移除，內容改由 nstc.json 驅動（原徽章資訊已搬入 enrich.js，
  原引用文字被統一模板取代——這是「格式一律統一」決策的直接結果）。

**projects.html**：改為容器＋JS 渲染。

- 國科會計畫（全部類型）＋ `EXTRA_PROJECTS` 混排，依年度新→舊排序。
- 每張卡片統一模板（沿用 `.glass.project-card` 樣式）：
  - 標籤列：`角色｜補助單位｜年度（或期間）`；有經費則附 `NT$ 金額`。
  - 標題＝計畫名稱；有 `desc` 則顯示中文描述段落。
  - 國科會項目的補助單位固定顯示「國科會」，補助類別（專題研究計畫／出席國際會議…）併入標籤。

**index.html 統計**：`data-count` 改由 JS 依資料計算後寫入——
期刊論文數、研討會論文數、計畫數（國科會＋EXTRA_PROJECTS）。Lab Members 維持手動。
資料載入前顯示現值作為 fallback。

## 錯誤處理總覽

| 情境 | 行為 |
|------|------|
| 國科會網站掛掉／改版導致解析 0 筆 | 腳本以非零碼結束，不寫檔不 commit，網站維持原狀 |
| 資料無變動 | 不 commit，不觸發部署 |
| 前端 fetch nstc.json 失敗 | 顯示 FALLBACK_NSTC 快照 |
| 徽章比對不到 | 素面顯示該筆，不報錯 |

## 測試／驗證

1. 本機：`pwsh tools/sync-nstc.ps1` 產出 nstc.json，人工核對筆數與欄位（16 著作、7 計畫）。
2. 本機：`tools/serve.ps1` 起預覽，用瀏覽器確認三頁渲染、排序、徽章、加粗、統計數字。
3. 故障演練：暫時把 fetch 網址改壞，確認 fallback 生效。
4. 雲端：push 後手動觸發 workflow 一次，確認可以 commit 或正確判斷「無變動」。

## 不做的事（YAGNI）

- 不自動發「最新消息」（消息稿仍由人撰寫）。
- 不串 Google Scholar／PubMed 等其他資料庫。
- 不做英文版頁面。
