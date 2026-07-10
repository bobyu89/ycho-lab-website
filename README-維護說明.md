# 實驗室網站維護說明

這份文件寫給實驗室老師與同學：**日常更新內容不需要碰程式碼**，只要編輯 Google 試算表、上傳照片到雲端資料夾即可。

> 2026-07 起網站版面改版，與「護理創新及專科訓練研究室」（sung-lab-website）採用同一套版型與元件結構，僅配色不同（本站為青／紫）。兩站的 HTML/CSS/JS 結構一致，維護方式相同。

## 一、更新「最新消息」

雲端硬碟「實驗室網站」資料夾裡的試算表，網站會自動讀取（要設「知道連結的使用者：檢視者」）：

**📊 網站後台-消息與活動**（最新消息）：

| date | category | content | content_en | link |
|---|---|---|---|---|
| 2026-07-01 | 發表 | 論文刊登於 JMIR Research Protocols | Paper published in JMIR Research Protocols | https://doi.org/... |

- `date`：日期，建議 YYYY-MM-DD
- `category`：填「榮譽」「發表」「活動」「公告」其中之一
- `content`：消息內容（一句話）
- `content_en`：選填，英文版消息；英文頁面優先顯示這欄，沒填就顯示中文
- `link`：選填，相關連結

新增一列、儲存，網站重新整理後就會更新。首頁預設顯示最新 3 則，點「查看全部」展開。

> 舊版首頁的「重要活動」大卡片區已隨改版移除；「網站後台-重要活動」試算表與程式中的 `fetchEvents()` 仍保留，未來要恢復該區塊時可直接使用。

## 二、更新「活動花絮」照片

1. 把照片上傳到指定的 Google 雲端資料夾（首次啟用見下方設定）
2. **檔名就是照片說明**，建議格式：`2026-06-15 EAFONS 研討會合影.jpg`
3. 網站自動顯示最新照片於「活動花絮」頁

## 三、首頁插圖

首頁右側大圖讀取 `assets/hero-illustration.jpg`（建議 4:3、至少 1200px 寬）。
檔案不存在時會自動顯示漸層佔位圖，版面不會壞——插圖做好後放進 `assets/` 即可。

## 四、首次串接設定（一次性，找會操作的人做）

尚未完成串接前，網站會顯示內建的預設內容，版面不會壞。

### 1. 試算表
1. 建立 Google 試算表，照上面的格式建 `news` 工作表
2. 「檔案 → 共用 → 發布到網路」，發布整份試算表
3. 複製網址中 `/d/` 與 `/edit` 之間的一長串 ID
4. 填入 `js/data.js` 的 `CONFIG.SHEET_ID`

### 2. 照片雲端資料夾
1. 建立雲端資料夾，權限設「知道連結的使用者：檢視者」
2. 複製資料夾網址最後一段 ID，填入 `CONFIG.DRIVE_FOLDER_ID`
3. 到 [Google Cloud Console](https://console.cloud.google.com/) 建立專案 → 啟用「Google Drive API」→ 建立「API 金鑰」
4. 金鑰建議設定「網站限制」，只允許網站網域
5. 填入 `CONFIG.DRIVE_API_KEY`

### 3. 部署
```
firebase deploy
```
（需先安裝 Firebase CLI 並以專案帳號登入；每次改完程式碼或 CONFIG 後執行一次。GitHub Pages 版本則直接 push 到 GitHub 即可。）

## 五、英文版頁面

全站有對應的英文版（`en/` 資料夾），header 右側「EN／中文」按鈕互切。
改中文頁內容時，記得同步修改 `en/` 下的對應頁面；最新消息的英文則由試算表 `content_en` 欄維護。

## 六、其他常見修改

| 想改什麼 | 改哪裡 |
|---|---|
| 首頁統計數字（論文數/計畫數/成員數） | `js/data.js` 的 `SITE.stats` |
| 實驗室名稱／信箱／頁尾聯絡資訊 | `js/data.js` 的 `SITE` |
| 導覽列項目 | `js/components.js` 的 `NAV_ITEMS` |
| 論文列表 | `publications.html`（老師姓名用 `<strong>` 包起來） |
| 研究計畫表格 | `projects.html` |
| 成員 | `members.html` |
| 老師簡介 | `pi.html` |
| 配色 | `css/main.css` 最上方的 `:root` 變數 |
| 微動畫（ECG 描線／標題逐字／圖示彈跳） | `js/micro.js`（動畫引擎為 `js/vendor/anime.umd.min.js`，anime.js v4） |
| 老師照片 | 更換 `assets/pi-photo.jpg` |
