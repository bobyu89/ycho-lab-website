const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!motionOK || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const group = el.closest("[data-stagger]");
        if (group) {
          const siblings = [...group.querySelectorAll(".reveal")];
          el.style.transitionDelay = `${(siblings.indexOf(el) % 8) * 0.1}s`;
        }
        el.classList.add("in");
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const setFinal = (el) => (el.textContent = el.dataset.count);
  if (!motionOK || !("IntersectionObserver" in window)) {
    els.forEach(setFinal);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const target = parseInt(el.dataset.count, 10);
      const t0 = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });
  els.forEach((el) => io.observe(el));
}

function initEcg(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * ratio);
    canvas.height = Math.floor(h * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  const PERIOD = 220;

  function ecgY(x) {
    const t = ((x % PERIOD) + PERIOD) % PERIOD;
    const base = h * 0.62;
    if (t < 90) return base;
    if (t < 104) return base - (t - 90) * (h * 0.012);
    if (t < 116) return base - h * 0.17 + (t - 104) * (h * 0.014);
    if (t < 124) return base + (t - 116) * (h * 0.055);
    if (t < 140) return base + h * 0.44 - (t - 124) * (h * 0.052);
    if (t < 150) return base - h * 0.39 + (t - 140) * (h * 0.039);
    if (t < 170) return base;
    if (t < 190) return base - Math.sin(((t - 170) / 20) * Math.PI) * h * 0.1;
    return base;
  }

  function drawFrame(offset) {
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const y = ecgY(x + offset);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#e85d8a";
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  resize();
  window.addEventListener("resize", () => {
    resize();
    if (!motionOK) drawFrame(0);
  });

  if (!motionOK) {
    drawFrame(0);
    return;
  }
  let offset = 0;
  (function loop() {
    offset += 0.7;
    drawFrame(offset);
    requestAnimationFrame(loop);
  })();
}
