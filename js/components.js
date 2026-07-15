/* ==========================================================================
   YCHO Lab Website — Shared Components
   智慧醫療轉譯及創新實驗室 (Smart Health Translation & Innovation Lab)
   LOGO_SVG, initLayout(activePage), openLightbox(src, caption)
   結構與 sung-lab-website/js/components.js 保持一致。
   ========================================================================== */

/* --------------------------------------------------------------------------
   Logo — hexagon with medical cross
   Gradient: #263B80 -> #7668D8
   -------------------------------------------------------------------------- */
const LOGO_SVG = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="智慧醫療轉譯及創新實驗室 Logo">
  <defs>
    <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#263B80"/>
      <stop offset="100%" stop-color="#7668D8"/>
    </linearGradient>
  </defs>
  <path d="M12 1.8l8.4 4.85v9.7L12 21.2l-8.4-4.85v-9.7L12 1.8z" fill="none" stroke="url(#logo-grad)" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M12 7.6v7.2M8.4 11.2h7.2" fill="none" stroke="url(#logo-grad)" stroke-width="2" stroke-linecap="round"/>
</svg>`.trim();

/* --------------------------------------------------------------------------
   Nav items — order is significant
   -------------------------------------------------------------------------- */
const NAV_ITEMS = [
  { key: "index", label: "首頁", labelEn: "Home", href: "index.html" },
  { key: "pi", label: "主持人", labelEn: "PI", href: "pi.html" },
  { key: "research-group", label: "研究", labelEn: "Research", children: [
    { key: "research", label: "研究主軸", labelEn: "Research Focus", href: "research.html" },
    { key: "projects", label: "研究計畫", labelEn: "Projects", href: "projects.html" }
  ] },
  { key: "output-group", label: "研究成果", labelEn: "Output", children: [
    { key: "publications", label: "成果發表", labelEn: "Publications", href: "publications.html" },
    { key: "patents", label: "專利", labelEn: "Patents", href: "patents.html" }
  ] },
  { key: "team-group", label: "團隊", labelEn: "Team", children: [
    { key: "members", label: "團隊成員", labelEn: "Members", href: "members.html" },
    { key: "collaboration", label: "合作夥伴", labelEn: "Partners", href: "collaboration.html" }
  ] },
  { key: "gallery", label: "活動花絮", labelEn: "Gallery", href: "gallery.html" },
  { key: "contact", label: "聯絡我們", labelEn: "Contact", href: "index.html#contact" }
];

/* UI strings (zh / en). EN pages live under en/ and call initLayout(page, "en"). */
const UI_STRINGS = {
  zh: {
    cta: "加入我們",
    langLabel: "EN",
    langTitle: "Switch to English",
    contactHeading: "聯絡資訊",
    quickLinks: "快速連結",
    friendLinks: "友好連結",
    friendName: "護理創新及專科訓練研究室",
    friendSub: "宋建美 助理教授",
    friendHref: "https://bobyu89.github.io/sung-lab-website/",
    navAria: "開啟導覽選單",
    back: "返回"
  },
  en: {
    cta: "Join Us",
    langLabel: "中文",
    langTitle: "切換為中文",
    contactHeading: "Contact",
    quickLinks: "Quick Links",
    friendLinks: "Partner Labs",
    friendName: "Nursing Innovation & NP Training Lab",
    friendSub: "Dr. Chien-Mei Sung",
    friendHref: "https://bobyu89.github.io/sung-lab-website/en/",
    navAria: "Open navigation menu",
    back: "Back"
  }
};

let SITE_LANG = "zh";

/* --------------------------------------------------------------------------
   Templates
   -------------------------------------------------------------------------- */
function renderHeader(activePage) {
  const t = UI_STRINGS[SITE_LANG];
  const navLinks = NAV_ITEMS.map((item) => {
    const label = SITE_LANG === "en" ? item.labelEn : item.label;
    if (item.children) {
      const childActive = item.children.some((c) => c.key === activePage);
      const childLinks = item.children.map((c) => {
        const cLabel = SITE_LANG === "en" ? c.labelEn : c.label;
        const isActive = c.key === activePage;
        return `<li><a class="nav-dropdown__link${isActive ? " active" : ""}" href="${c.href}"${isActive ? ' aria-current="page"' : ""}>${cLabel}</a></li>`;
      }).join("");
      return `<li class="nav-item nav-item--dropdown">` +
        `<button type="button" class="nav-link nav-link--parent${childActive ? " active" : ""}" aria-haspopup="true" aria-expanded="false">${label}<span class="nav-caret" aria-hidden="true">▾</span></button>` +
        `<div class="nav-dropdown"><ul class="nav-dropdown__card">${childLinks}</ul></div></li>`;
    }
    const isActive = item.key === activePage;
    return `<li class="nav-item"><a class="nav-link${isActive ? " active" : ""}" href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${label}</a></li>`;
  }).join("");

  /* language switch: zh page -> en/<same>.html ; en page -> ../<same>.html */
  const pageFile = (activePage === "contact" ? "index" : activePage) + ".html";
  const langHref = SITE_LANG === "en" ? "../" + pageFile : "en/" + pageFile;
  const brandName = SITE_LANG === "en" ? SITE.nameEn : SITE.nameZh;
  const brandSub = SITE_LANG === "en" ? SITE.nameZh : SITE.nameEn;

  return `
<header class="site-header">
  <div class="container site-header__inner">
    <a class="site-header__brand" href="index.html">
      <span class="site-header__logo">${LOGO_SVG}</span>
      <span class="site-header__brandtext">
        <span class="site-header__name">${brandName}</span>
        <span class="site-header__name-en mono-en">${brandSub}</span>
      </span>
    </a>
    <button type="button" class="hamburger" id="hamburger-btn" aria-expanded="false" aria-label="${t.navAria}" aria-controls="site-nav">
      <span class="hamburger__line"></span>
      <span class="hamburger__line"></span>
      <span class="hamburger__line"></span>
    </button>
    <nav class="site-nav" id="site-nav">
      <button type="button" class="drawer-close" id="drawer-close" aria-label="${t.navAria}">&times;</button>
      <ul class="site-nav__list">
        ${navLinks}
      </ul>
      <a class="lang-switch" href="${langHref}" title="${t.langTitle}" lang="${SITE_LANG === "en" ? "zh-Hant" : "en"}">${t.langLabel}</a>
      <a class="btn btn-primary btn-cta" href="index.html#contact">${t.cta}</a>
    </nav>
  </div>
  <div class="nav-backdrop" id="nav-backdrop" aria-hidden="true"></div>
</header>`;
}

function renderFooter() {
  const t = UI_STRINGS[SITE_LANG];
  const flatNav = [];
  NAV_ITEMS.forEach((item) => {
    if (item.children) flatNav.push(...item.children);
    else if (item.key !== "contact") flatNav.push(item);
  });
  const quickLinks = flatNav
    .map((item) => `<li><a href="${item.href}">${SITE_LANG === "en" ? item.labelEn : item.label}</a></li>`)
    .join("");
  const footName = SITE_LANG === "en" ? SITE.nameEn : SITE.nameZh;
  const footTagline = SITE_LANG === "en" ? SITE.taglineEn : SITE.tagline;
  const footPi = SITE_LANG === "en" ? SITE.piEn : SITE.pi;
  const footDept = SITE_LANG === "en" ? SITE.deptEn : SITE.dept;

  return `
<footer class="site-footer section--tint">
  <div class="container site-footer__inner">
    <div class="site-footer__brand">
      <span class="site-footer__logo">${LOGO_SVG}</span>
      <p class="site-footer__name">${footName}</p>
      <p class="site-footer__tagline">${footTagline}</p>
    </div>
    <div class="site-footer__contact">
      <h3>${t.contactHeading}</h3>
      <p>${footPi}</p>
      <p>${footDept}</p>
      <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
    </div>
    <div class="site-footer__links">
      <h3>${t.quickLinks}</h3>
      <ul>
        ${quickLinks}
      </ul>
    </div>
    <div class="site-footer__links">
      <h3>${t.friendLinks}</h3>
      <ul>
        <li><a href="${t.friendHref}" target="_blank" rel="noopener">${t.friendName}<span class="friend-sub">${t.friendSub}</span></a></li>
      </ul>
    </div>
  </div>
  <div class="container">
    <p class="site-footer__copyright">© 2026 ${SITE.nameZh} Smart Health Translation and Innovation Lab</p>
  </div>
</footer>`;
}

function renderLightbox() {
  return `
<div class="lightbox" id="lightbox" hidden>
  <div class="lightbox__backdrop" data-lightbox-close></div>
  <figure class="lightbox__content">
    <img class="lightbox__img" id="lightbox-img" src="" alt="">
    <figcaption class="lightbox__caption" id="lightbox-caption"></figcaption>
  </figure>
  <button type="button" class="lightbox__close" aria-label="關閉燈箱" data-lightbox-close>&times;</button>
</div>`;
}

/* --------------------------------------------------------------------------
   initLayout — injects header, footer, and lightbox DOM; wires interactions
   -------------------------------------------------------------------------- */
function initLayout(activePage, lang) {
  SITE_LANG = lang === "en" ? "en" : "zh";
  document.body.insertAdjacentHTML("afterbegin", renderHeader(activePage));
  document.body.insertAdjacentHTML("beforeend", renderFooter());
  document.body.insertAdjacentHTML("beforeend", renderLightbox());

  /* 返回鍵 — 首頁以外的每一頁都注入，置於頁面 hero 內左上角、與內容切齊；
     回上一頁（無歷史則回首頁） */
  if (activePage !== "index" && activePage !== "contact") {
    const t = UI_STRINGS[SITE_LANG];
    const btn =
      `<button type="button" class="back-link" id="page-back">` +
      `<span class="back-link__arrow" aria-hidden="true">←</span>${t.back}</button>`;
    const heroInner = document.querySelector(".page-hero__inner");
    if (heroInner) {
      heroInner.insertAdjacentHTML("afterbegin", `<div class="page-back">${btn}</div>`);
    } else {
      const header = document.querySelector(".site-header");
      if (header) header.insertAdjacentHTML("afterend", `<div class="page-back page-back--bar"><div class="container">${btn}</div></div>`);
    }
    const backBtn = document.getElementById("page-back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.history.length > 1) window.history.back();
        else window.location.href = "index.html";
      });
    }
  }

  const hamburger = document.getElementById("hamburger-btn");
  const nav = document.getElementById("site-nav");
  const backdrop = document.getElementById("nav-backdrop");
  const drawerClose = document.getElementById("drawer-close");

  if (hamburger && nav) {
    const setOpen = (open) => {
      hamburger.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("site-nav--open", open);
      if (backdrop) backdrop.classList.toggle("nav-backdrop--show", open);
      document.body.classList.toggle("nav-open", open);
    };

    hamburger.addEventListener("click", () => {
      setOpen(hamburger.getAttribute("aria-expanded") !== "true");
    });
    if (backdrop) backdrop.addEventListener("click", () => setOpen(false));
    if (drawerClose) drawerClose.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("site-nav--open")) setOpen(false);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
      el.addEventListener("click", closeLightbox);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hasAttribute("hidden")) {
        closeLightbox();
      }
    });
  }

  initScrollProgress();
  initToTop();
}

/* --------------------------------------------------------------------------
   Scroll progress — 頂部品牌漸層細條，隨捲動比例伸展
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}

/* --------------------------------------------------------------------------
   To top — 捲動超過大約一屏後浮現的回頂按鈕
   -------------------------------------------------------------------------- */
function initToTop() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", SITE_LANG === "en" ? "Back to top" : "回到頂部");
  btn.textContent = "↑";
  document.body.append(btn);
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    btn.classList.toggle("to-top--show", window.scrollY > window.innerHeight * 0.8);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   News ticker - homepage slim marquee under the header; renders only when
   #news-ticker exists. Content duplicated x2 for the CSS translateX(-50%)
   seamless loop; hover pauses via CSS.
   -------------------------------------------------------------------------- */
function renderNewsTicker(items) {
  const ticker = document.getElementById("news-ticker");
  if (!ticker || !items || !items.length) return;
  const esc = (str) => String(str || "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const top = items.slice(0, 5);
  const seg = top.map((n) => {
    const text = (SITE_LANG === "en" && n.content_en) ? n.content_en : n.content;
    return `<span class="news-ticker__item"><span class="news-ticker__date mono-en">${esc(n.date)}</span>${esc(text)}</span>`;
  }).join("");
  ticker.innerHTML = `<a class="news-ticker__link" href="#news" aria-label="${SITE_LANG === "en" ? "Latest news" : "最新消息"}">` +
    `<div class="news-ticker__track">${seg}${seg}</div></a>`;
  const track = ticker.querySelector(".news-ticker__track");
  if (track) track.style.animationDuration = Math.max(24, top.length * 9) + "s";
}

/* --------------------------------------------------------------------------
   Lightbox — open/close
   -------------------------------------------------------------------------- */
function openLightbox(src, caption) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const captionEl = document.getElementById("lightbox-caption");
  if (!lightbox || !img || !captionEl) return;

  img.src = src;
  img.alt = caption || "";
  captionEl.textContent = caption || "";
  lightbox.removeAttribute("hidden");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (!lightbox) return;

  lightbox.setAttribute("hidden", "");
  document.body.classList.remove("lightbox-open");
  if (img) img.src = "";
}
