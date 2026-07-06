const NAV_ITEMS = [
  { id: "index", href: "index.html", label: "首頁" },
  { id: "research", href: "research.html", label: "研究主題" },
  { id: "publications", href: "publications.html", label: "成果發表" },
  { id: "education", href: "education.html", label: "教學資源" },
  { id: "members", href: "members.html", label: "團隊成員" },
  { id: "collaboration", href: "collaboration.html", label: "合作交流" },
  { id: "resources", href: "resources.html", label: "開放資源" },
  { id: "contact", href: "index.html#contact", label: "聯絡我們" }
];

const LOGO_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M12 21c-4.6-3.7-8-6.6-8-10.2C4 7.6 6.2 5.5 8.9 5.5c1.2 0 2.4.5 3.1 1.4.7-.9 1.9-1.4 3.1-1.4 2.7 0 4.9 2.1 4.9 5.3 0 3.6-3.4 6.5-8 10.2z" fill="currentColor" opacity=".9"/>
  <path d="M11 9.5h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z" fill="#fff"/>
</svg>`;

function initLayout(activePage) {
  const navLinks = NAV_ITEMS.map(
    (item) =>
      `<a href="${item.href}" ${item.id === activePage ? "data-active" : ""}>${item.label}</a>`
  ).join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="回到首頁">
        <span class="brand-mark">${LOGO_SVG}</span>
        <span class="brand-text">
          <strong>智慧醫療轉譯及創新實驗室</strong>
          <small>Smart Health Translation and Innovation Lab</small>
        </span>
      </a>
      <nav class="nav" aria-label="主要導覽">${navLinks}</nav>
      <a class="btn btn-cta header-cta" href="index.html#contact">加入我們</a>
      <button class="menu-toggle" type="button" aria-label="開啟選單" aria-expanded="false"><span></span></button>
    </div>
    <nav class="mobile-nav" aria-label="行動版導覽">${navLinks}</nav>
  `;
  document.body.prepend(header);

  const mobileNav = header.querySelector(".mobile-nav");
  const toggle = header.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  window.addEventListener("scroll", () => {
    header.dataset.elevated = String(window.scrollY > 12);
  }, { passive: true });

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <span class="brand-mark">${LOGO_SVG}</span>
            <span class="brand-text">
              <strong>智慧醫療轉譯及創新實驗室</strong>
              <small>Smart Health Translation and Innovation Lab</small>
            </span>
          </a>
          <p>從精準評估到臨床轉譯，發展可解釋、可落地、可擴散的智慧醫療與心理健康創新。</p>
        </div>
        <div>
          <h3>快速連結</h3>
          <div class="footer-links">${NAV_ITEMS.slice(0, 7).map((i) => `<a href="${i.href}">${i.label}</a>`).join("")}</div>
        </div>
        <div class="footer-contact">
          <h3>聯絡資訊</h3>
          <p><strong>主持人：</strong>賀彥中 助理教授</p>
          <p><strong>單位：</strong>國防醫學大學護理學系</p>
          <p><strong>Email：</strong><a href="mailto:nokia3350g@gmail.com">nokia3350g@gmail.com</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="footer-year"></span> 智慧醫療轉譯及創新實驗室</span>
        <span>Smart Health Translation and Innovation Lab</span>
      </div>
    </div>
  `;
  document.body.append(footer);
  footer.querySelector("#footer-year").textContent = new Date().getFullYear();

  const toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "回到頂部");
  toTop.textContent = "↑";
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.append(toTop);
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  initLightboxDom();
}

let lightboxEl = null;

function initLightboxDom() {
  lightboxEl = document.createElement("div");
  lightboxEl.className = "lightbox";
  lightboxEl.setAttribute("role", "dialog");
  lightboxEl.setAttribute("aria-label", "照片檢視");
  lightboxEl.innerHTML = `
    <button class="lightbox-close" aria-label="關閉">✕</button>
    <img alt="" />
    <p class="lightbox-caption"></p>
  `;
  document.body.append(lightboxEl);
  const close = () => lightboxEl.classList.remove("open");
  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl || e.target.classList.contains("lightbox-close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function openLightbox(src, caption) {
  if (!lightboxEl) return;
  const img = lightboxEl.querySelector("img");
  img.src = src;
  img.alt = caption || "活動照片";
  lightboxEl.querySelector(".lightbox-caption").textContent = caption || "";
  lightboxEl.classList.add("open");
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
