/* 統一渲染模板：國科會同步資料與手工補充（enrich.js）都走這裡，
   輸出格式一律一致。publications.html 與 projects.html 共用。 */

function boldPI(escapedAuthors) {
  // 老師姓名各種寫法一律加粗：Yen-Chung Ho / Ho YC / Ho Y-C / Ho, Y.-C.
  return escapedAuthors.replace(
    /(Yen[-\s]?Chung\s+Ho|Ho\s*,?\s*Y\.?\s*-?\s*C(?:hung)?\.?(?=[,;\s)]|$)|Ho\s+YC\b)/gi,
    "<strong>$1</strong>"
  );
}

function badgesFor(title) {
  const t = String(title).toLowerCase();
  const hit = (typeof PUB_BADGES !== "undefined" ? PUB_BADGES : [])
    .find((e) => t.includes(e.match.toLowerCase()));
  return hit ? hit.badges : [];
}

function pubItemHtml(p) {
  const year = String(p.date || "").slice(0, 4);
  const venue = p.venue ? ` <em>${escapeHtml(p.venue)}</em>.` : "";
  const badges = badgesFor(p.title);
  const badgeHtml = badges.length
    ? `<div class="pub-badges">${badges
        .map((b) => `<span class="pub-badge ${escapeHtml(b.type)}">${escapeHtml(b.text)}</span>`)
        .join("")}</div>`
    : "";
  return `<li>${boldPI(escapeHtml(p.authors))} (${escapeHtml(year)}). ${escapeHtml(p.title)}.${venue}${badgeHtml}</li>`;
}

function renderPublications(container, data) {
  const pubs = [...data.publications].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  // 依類別分組：期刊論文、研討會論文固定順序在前，其他類別（若未來出現）依序附後
  const order = ["期刊論文", "研討會論文"];
  const groups = new Map(order.map((k) => [k, []]));
  pubs.forEach((p) => {
    const key = order.includes(p.type) ? p.type : p.type || "其他發表";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  });
  container.innerHTML = "";
  groups.forEach((items, label) => {
    if (!items.length) return;
    const block = document.createElement("div");
    block.className = "pub-block reveal";
    block.innerHTML = `<h3>${escapeHtml(label)}</h3><ol class="pub-list">${items.map(pubItemHtml).join("")}</ol>`;
    container.append(block);
  });
}

function projectExtrasFor(proj) {
  const extras = typeof PROJECT_EXTRAS !== "undefined" ? PROJECT_EXTRAS : [];
  return extras.find((e) =>
    String(proj.title).includes(e.match) && (!e.year || e.year === proj.year)
  ) || {};
}

function projectCardHtml(p) {
  const extra = p.sponsor ? {} : projectExtrasFor(p); // 手工計畫（有 sponsor）自帶 desc/period
  const sponsor = p.sponsor || "國科會";
  const period = p.period || extra.period || (p.year ? `${p.year} 年度` : "");
  const desc = p.desc || extra.desc || "";
  const budget = p.budget ? `NT$ ${p.budget}` : "";
  const tag = [p.role, sponsor, p.category, period, budget].filter(Boolean).map(escapeHtml).join("｜");
  return `<article class="glass project-card reveal">
    <span class="project-tag">${tag}</span>
    <h3>${escapeHtml(p.title)}</h3>
    ${desc ? `<p>${escapeHtml(desc)}</p>` : ""}
  </article>`;
}

function renderProjects(container, data) {
  const extras = typeof EXTRA_PROJECTS !== "undefined" ? EXTRA_PROJECTS : [];
  const all = [...data.projects, ...extras].sort(
    (a, b) => (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0)
  );
  container.innerHTML = all.map(projectCardHtml).join("");
}

function renderSyncNote(el, data) {
  if (!el) return;
  el.textContent = `資料來源：國科會研究人才網${data.lastSync ? `｜最後同步 ${data.lastSync}` : ""}`;
}
