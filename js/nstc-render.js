/* 統一渲染模板：國科會同步資料（data/nstc.json）＋手工補充（js/enrich.js）
   都走這裡，輸出格式一律一致。中英文頁共用：publications / projects / index 統計。 */

const NSTC_I18N = {
  zh: {
    ongoing: "執行中",
    nstc: "國科會",
    yearOnly: (y) => `${y} 年度`,
    source: (d) => `資料同步自國科會研究人才網${d ? `（最後同步 ${d}）` : ""}`,
    role: {},
    category: {}
  },
  en: {
    ongoing: "Ongoing",
    nstc: "NSTC",
    yearOnly: (y) => `ROC ${y}`,
    source: (d) => `Synced from the NSTC Researcher Database${d ? ` (last synced ${d})` : ""}`,
    role: {
      "計畫主持人": "Principal Investigator",
      "共同主持人": "Co-Principal Investigator",
      "第一作者": "First author",
      "通訊作者": "Corresponding author",
      "第一作者・通訊作者": "First & corresponding author"
    },
    category: {
      "專題研究計畫 (新進人員研究計畫)": "Research project (new PI)",
      "專題研究計畫 (一般研究計畫)": "Research project (general)",
      "短訪計畫 (邀請國際科技人士短期訪問)": "Short-term visit by international S&T experts",
      "補助國內專家學者出席國際學術會議": "Conference travel grant",
      "研究生出席國際會議": "Graduate student conference travel"
    }
  }
};

function nstcT(lang) {
  return NSTC_I18N[lang] || NSTC_I18N.zh;
}

function boldPI(escapedAuthors) {
  // 老師姓名各種寫法一律加粗：Yen-Chung Ho / Ho YC / Ho Y-C / Ho, Y.-C.
  return escapedAuthors.replace(
    /(Yen[-\s]?Chung\s+Ho|Ho\s*,?\s*Y\.?\s*-?\s*C(?:hung)?\.?(?=[,;\s)]|$)|Ho\s+YC\b)/gi,
    "<strong>$1</strong>"
  );
}

function pubExtrasFor(title) {
  const t = String(title).toLowerCase();
  return (typeof PUB_EXTRAS !== "undefined" ? PUB_EXTRAS : [])
    .find((e) => t.includes(e.match.toLowerCase())) || {};
}

const NSTC_CHIP_CLASS = { rank: "chip--honor", role: "chip--event", grant: "chip--announce" };

function pubItemHtml(p, index, lang) {
  const t = nstcT(lang);
  const extra = pubExtrasFor(p.title);
  const year = String(p.date || "").slice(0, 4);
  const authors = extra.authors || p.authors || "";
  const rawVenue = p.venue || extra.venue || "";
  const venue = !rawVenue
    ? ""
    : p.type === "期刊論文"
      ? ` <em>${escapeHtml(rawVenue)}</em>.`
      : ` ${escapeHtml(rawVenue)}.`;
  const badges = extra.badges || [];
  const badgeHtml = badges.length
    ? `<span class="pub-item__badges">${badges
        .map((b) => `<span class="chip ${NSTC_CHIP_CLASS[b.type] || ""}">${escapeHtml(t.role[b.text] || b.text)}</span>`)
        .join("")}</span>`
    : "";
  return `<li class="pub-item">
    <span class="pub-item__index">${index}.</span>
    <p class="pub-item__text">${boldPI(escapeHtml(authors))} (${escapeHtml(year)}). ${escapeHtml(p.title)}.${venue}
      ${badgeHtml}
    </p>
  </li>`;
}

function renderPublications(journalOl, confOl, data, lang) {
  const pubs = [...data.publications].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const journal = pubs.filter((p) => p.type === "期刊論文");
  const conf = pubs.filter((p) => p.type !== "期刊論文");
  if (journalOl) journalOl.innerHTML = journal.map((p, i) => pubItemHtml(p, i + 1, lang)).join("");
  if (confOl) confOl.innerHTML = conf.map((p, i) => pubItemHtml(p, i + 1, lang)).join("");
}

function projectExtrasFor(proj) {
  const extras = typeof PROJECT_EXTRAS !== "undefined" ? PROJECT_EXTRAS : [];
  return extras.find((e) =>
    String(proj.title).includes(e.match) && (!e.year || e.year === proj.year)
  ) || {};
}

function projectRowHtml(p, lang) {
  const t = nstcT(lang);
  const en = lang === "en";
  const extra = p.sponsor ? p : projectExtrasFor(p); // 手工計畫自帶欄位；國科會計畫查補充檔
  const title = (en && extra.title_en) || p.title;
  const role = (en && (extra.role_en || t.role[p.role])) || p.role || "";
  const sponsor = en
    ? (p.sponsor ? (extra.sponsor_en || p.sponsor) : t.nstc)
    : (p.sponsor || t.nstc);
  const rawCategory = en ? (extra.category_en || t.category[p.category] || p.category) : p.category;
  // 國科會類別如「專題研究計畫 (新進人員研究計畫)」壓成單層，避免括號巢狀
  const category = String(rawCategory || "").replace(/\s*\(([^)]*)\)/, "・$1");
  const funder = !category ? sponsor : en ? `${sponsor} (${category})` : `${sponsor}（${category}）`;
  const period = (en && extra.period_en) || p.period || extra.period || (p.year ? t.yearOnly(p.year) : "—");
  const budget = p.budget ? `NT$ ${p.budget}` : "—";
  const status = extra.status
    ? `<span class="chip">${escapeHtml(en ? t.ongoing : extra.status)}</span>`
    : "";
  const nameCell = status
    ? `<div class="projects-table__name"><span>${escapeHtml(title)}</span>${status}</div>`
    : escapeHtml(title);
  return `<tr>
    <td>${nameCell}</td>
    <td>${escapeHtml(role)}</td>
    <td>${escapeHtml(funder)}</td>
    <td>${escapeHtml(period)}</td>
    <td>${escapeHtml(budget)}</td>
  </tr>`;
}

function renderProjects(tbody, data, lang) {
  if (!tbody) return;
  const extras = typeof EXTRA_PROJECTS !== "undefined" ? EXTRA_PROJECTS : [];
  const all = [...data.projects, ...extras].sort(
    (a, b) => (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0)
  );
  tbody.innerHTML = all.map((p) => projectRowHtml(p, lang)).join("");
}

function renderSyncNote(el, data, lang) {
  if (!el) return;
  el.textContent = nstcT(lang).source(data.lastSync || "");
}

function nstcStats(data) {
  const extras = typeof EXTRA_PROJECTS !== "undefined" ? EXTRA_PROJECTS : [];
  return {
    journal: data.publications.filter((p) => p.type === "期刊論文").length,
    conference: data.publications.filter((p) => p.type !== "期刊論文").length,
    projects: data.projects.length + extras.length
  };
}
