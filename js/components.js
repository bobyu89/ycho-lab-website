const NAV_ITEMS = [
  { id: "index", href: "index.html", label: "首頁" },
  { id: "research", href: "research.html", label: "研究主軸" },
  { id: "projects", href: "projects.html", label: "研究計畫" },
  { id: "members", href: "members.html", label: "團隊成員" },
  { id: "publications", href: "publications.html", label: "成果發表" },
  { id: "gallery", href: "gallery.html", label: "活動花絮" },
  { id: "pi", href: "pi.html", label: "主持人" }
];

function initLayout(activePage) {
  const navLinks = NAV_ITEMS.map(
    (item) =>
      `<a href="${item.href}" ${item.id === activePage ? "data-active" : ""}>${item.label}</a>`
  ).join("");

  const header = document.createElement("header");
  header.className = "site-header glass";
  header.innerHTML = `
    <a class="brand" href="index.html" aria-label="回到首頁">
      <span class="brand-mark">SH</span>
      <span class="brand-text">
        <strong>智慧醫療轉譯及創新實驗室</strong>
        <small>SMART HEALTH TRANSLATION &amp; INNOVATION LAB</small>
      </span>
    </a>
    <nav class="nav" aria-label="主要導覽">${navLinks}</nav>
    <button class="menu-toggle" type="button" aria-label="開啟選單" aria-expanded="false"><span></span></button>
  `;
  document.body.prepend(header);

  const mobileNav = document.createElement("nav");
  mobileNav.className = "mobile-nav glass";
  mobileNav.setAttribute("aria-label", "行動版導覽");
  mobileNav.innerHTML = navLinks;
  header.after(mobileNav);

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
    <div class="blob blob-violet" style="width:340px;height:340px;right:-120px;top:-140px;opacity:.25"></div>
    <div class="container">
      <div class="footer-inner">
        <div class="footer-contact">
          <h3>智慧醫療轉譯及創新實驗室</h3>
          <p class="mono-label" style="color:rgba(255,255,255,.4);margin:0 0 14px">SMART HEALTH TRANSLATION &amp; INNOVATION LAB</p>
          <p><strong>主持人：</strong>賀彥中 助理教授</p>
          <p><strong>單位：</strong>國防醫學大學護理學系</p>
          <p><strong>Email：</strong><a href="mailto:nokia3350g@gmail.com">nokia3350g@gmail.com</a></p>
        </div>
        <div>
          <h3>快速連結</h3>
          <div class="footer-links">${NAV_ITEMS.map((i) => `<a href="${i.href}">${i.label}</a>`).join("")}</div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="footer-year"></span> Smart Health Translation and Innovation Lab</span>
        <span>[MEASURE.MONITOR.TRANSLATE.IMPLEMENT]</span>
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
