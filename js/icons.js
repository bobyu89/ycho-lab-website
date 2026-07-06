/* 品牌圖示庫：24x24 線條圖示，漸層 #00E3E3 → #6A6AFF（gradient defs 由 components.js 注入） */
const ICON_PATHS = {
  "clinical-care": `
    <circle cx="8.5" cy="7" r="3.2"/>
    <path d="M3 20c0-3 2.5-5.4 5.5-5.4 1.4 0 2.7.5 3.7 1.4"/>
    <path d="M17 11.5v6M14 14.5h6"/>`,
  "ai": `
    <rect x="8" y="8" width="8" height="8" rx="2"/>
    <rect x="10.6" y="10.6" width="2.8" height="2.8" rx="0.8"/>
    <path d="M12 8V4.5M12 19.5V16M8 12H4.5M19.5 12H16M9.5 8V5.5M14.5 8V5.5M9.5 18.5V16M14.5 18.5V16"/>`,
  "education": `
    <path d="M12 4 2.5 8.8 12 13.6l9.5-4.8L12 4z"/>
    <path d="M6.5 11.2v4.6c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.6"/>
    <path d="M21.5 9v5"/>`,
  "evidence": `
    <path d="M7 3.5h6.5L18 8v12.5H7V3.5z"/>
    <path d="M13.5 3.5V8H18"/>
    <path d="M9.8 13.5l2 2 3.4-4.2"/>`,
  "publications": `
    <path d="M6 3.5h12v17H6v-17z"/>
    <path d="M12.5 3.5v4.8l1.8-1.3 1.8 1.3V3.5"/>
    <path d="M9.2 17v-3M12 17v-5M14.8 17v-2"/>`,
  "projects": `
    <path d="M3.5 7.5V6.4c0-1 .8-1.9 1.9-1.9h3.4l2 2h7.8c1 0 1.9.8 1.9 1.9v9.2c0 1-.8 1.9-1.9 1.9H5.4c-1 0-1.9-.8-1.9-1.9V7.5z"/>
    <circle cx="14.8" cy="13" r="3"/>
    <path d="M14.8 10v3h3"/>`,
  "students": `
    <circle cx="12" cy="4.6" r="1.9"/>
    <path d="M4.5 19.5c2-1.4 5-1.4 7.5 0 2.5-1.4 5.5-1.4 7.5 0V9.3c-2-1.4-5-1.4-7.5 0-2.5-1.4-5.5-1.4-7.5 0v10.2z"/>
    <path d="M12 9.3v10.2"/>`,
  "collaboration": `
    <circle cx="9" cy="12" r="4.6"/>
    <circle cx="15" cy="12" r="4.6"/>`,
  "contact": `
    <path d="M3.5 6.5h14v10h-14v-10z"/>
    <path d="M3.5 7.5l7 5 7-5"/>
    <path d="M17.5 13.5h3v4.5l-2.5-1.5h-3"/>`,
  "ecg": `
    <path d="M2.5 12.5h3.5l1.8-4.5 2.8 8.5 2.3-6.5 1.4 2.5h2.2"/>
    <path d="M18.5 12.5c0-1 .8-1.8 1.5-1.8s1.5.8 1.5 1.8c0 1.2-1.5 2.3-1.5 2.3s-1.5-1.1-1.5-2.3z"/>`,
  "analytics": `
    <path d="M4 20.5v-6M8.5 20.5v-10M13 20.5v-4"/>
    <path d="M4 9.5l4.5-3.5 4 2.5 5-4.5"/>
    <circle cx="18.5" cy="17" r="3.2"/>
    <path d="M18.5 13.8V17h3.2"/>`,
  "innovation": `
    <path d="M12 3.2a5.8 5.8 0 0 1 3.4 10.5c-.6.5-1 1.2-1 1.9v1.2h-4.8v-1.2c0-.7-.4-1.4-1-1.9A5.8 5.8 0 0 1 12 3.2z"/>
    <path d="M10 20h4"/>
    <path d="M12 7v4M10 9h4"/>`
};

function icon(name) {
  const body = ICON_PATHS[name];
  if (!body) return "";
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="url(#grad-ci)"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function initIcons() {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });
}
