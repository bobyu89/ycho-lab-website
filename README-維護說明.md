# 實驗室網站維護說明

這份文件寫給實驗室老師與同學：**日常更新內容不需要碰程式碼**，只要編輯 Google 試算表、上傳照片到雲端資料夾即可。

## 一、更新「最新消息」與「重要活動」

雲端硬碟「實驗室網站」資料夾裡有**兩份試算表**，網站會自動讀取（兩份都要設「知道連結的使用者：檢視者」）：

**📊 網站後台-消息與活動**（最新消息）：

| date | category | content | link |
|---|---|---|---|
| 2026-07-01 | 發表 | 論文刊登於 JMIR Research Protocols | https://doi.org/... |

- `date`：日期，建議 YYYY-MM-DD
- `category`：填「榮譽」「發表」「活動」「公告」其中之一
- `content`：消息內容（一句話）
- `link`：選填，相關連結

**📊 網站後台-重要活動**（首頁大卡片）：

| date | title | description | image | pinned |
|---|---|---|---|---|
| 2026-08-01 | 國科會計畫啟動 | 一段說明文字 | （選填圖片網址） | TRUE |

- `pinned` 填 `TRUE` 的活動才會出現在首頁「重要活動」區（最多顯示 3 則）

新增一列、儲存，網站重新整理後就會更新。

## 二、更新「活動花絮」照片

1. 把照片上傳到指定的 Google 雲端資料夾（首次啟用見下方設定）
2. **檔名就是照片說明**，建議格式：`2026-06-15 EAFONS 研討會合影.jpg`
3. 網站自動顯示最新照片：首頁取前 8 張，活動花絮頁顯示全部

## 三、首次串接設定（一次性，找會操作的人做）

尚未完成串接前，網站會顯示內建的預設內容，版面不會壞。

### 1. 試算表
1. 建立 Google 試算表，照上面的格式建 `news`、`events` 兩個工作表
2. 「檔案 → 共用 → 發布到網路」，發布整份試算表
3. 複製網址中 `/d/` 與 `/edit` 之間的一長串 ID
4. 填入 `js/data.js` 的 `CONFIG.SHEET_ID`

### 2. 照片雲端資料夾
1. 建立雲端資料夾，權限設「知道連結的使用者：檢視者」
2. 複製資料夾網址最後一段 ID，填入 `CONFIG.DRIVE_FOLDER_ID`
3. 到 [Google Cloud Console](https://console.cloud.google.com/) 建立專案 → 啟用「Google Drive API」→ 建立「API 金鑰」
4. 金鑰建議設定「網站限制」，只允許 `ycho-smart-health-lab.web.app`
5. 填入 `CONFIG.DRIVE_API_KEY`

### 3. 部署
```
firebase deploy
```
（需先安裝 Firebase CLI 並以專案帳號登入；每次改完程式碼或 CONFIG 後執行一次）

## 四、國科會著作／計畫自動同步

- 成果發表、研究計畫、首頁統計（論文數/計畫數）的資料來源是 `data/nstc.json`，
  由 GitHub Actions **每週一早上 8 點（台北時間）自動**從國科會研究人才網同步，有變動才更新上線。
  計畫通過或論文通過後，等國科會頁面更新，網站最慢一週內自動跟上。
- 想立刻同步：到 GitHub repo → Actions → 「Sync NSTC data」→ Run workflow。
  或本機執行 `powershell tools/sync-nstc.ps1` 後 push。
- 幫論文加徽章（排名／作者角色／計畫編號）、幫計畫加中文描述、
  新增國科會以外的計畫（醫院、部會、校內計畫）：編輯 `js/enrich.js`（檔內有格式說明），改完 push 即上線。
- 若國科會改版導致同步失敗：Actions 會顯示紅色失敗，網站維持原狀不受影響，
  屆時需調整 `tools/sync-nstc.ps1` 的解析規則。

## 五、其他常見修改

| 想改什麼 | 改哪裡 |
|---|---|
| 首頁統計數字（成員數） | `index.html` 統計卡的 `data-count` 屬性（論文數/計畫數已自動計算） |
| 論文徽章／非國科會計畫 | `js/enrich.js`（論文與計畫清單本身自動同步，見上一節） |
| 成員 | `members.html` |
| 老師簡介 | `pi.html`（重點用 `<strong>` 粗體） |
| 聯絡信箱／頁尾 | `js/components.js` |
| 配色 | `css/main.css` 最上方的 `:root` 變數 |

## 六、老師的照片

`pi.html` 與首頁「關於老師」區目前是縮寫佔位（YC）。要放真實照片：
1. 把照片存到 `assets/pi-photo.jpg`（建議直式、至少 800px 寬）
2. 把兩處 `<div class="glass sheen pi-photo">…</div>` 內容換成
   `<img src="assets/pi-photo.jpg" alt="賀彥中 助理教授" style="width:100%;height:100%;object-fit:cover">`
