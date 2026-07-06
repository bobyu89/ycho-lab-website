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

function initTimeline() {
  const timelines = document.querySelectorAll(".timeline");
  if (!timelines.length) return;
  if (!motionOK || !("IntersectionObserver" in window)) {
    timelines.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  timelines.forEach((el) => io.observe(el));
}

function initWave(canvas) {
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

  const ema = (x, phase) =>
    h * 0.52 +
    Math.sin(x * 0.045 + phase) * h * 0.2 +
    Math.sin(x * 0.013 + phase * 0.6) * h * 0.14 +
    Math.sin(x * 0.11 + phase * 1.7) * h * 0.05;

  const avg = (x, phase) =>
    h * 0.55 + Math.sin(x * 0.012 + phase * 0.5) * h * 0.12;

  function drawFrame(phase) {
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const y = ema(x, phase);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#00e3e3";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(0,227,227,.55)";
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.setLineDash([5, 6]);
    for (let x = 0; x <= w; x += 4) {
      const y = avg(x, phase);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#6a6aff";
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.setLineDash([]);

    const px = w * 0.78;
    ctx.beginPath();
    ctx.arc(px, ema(px, phase), 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#00e3e3";
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
  }

  resize();
  window.addEventListener("resize", () => {
    resize();
    if (!motionOK) drawFrame(1.4);
  });

  if (!motionOK) {
    drawFrame(1.4);
    return;
  }
  let phase = 0;
  (function loop() {
    phase += 0.016;
    drawFrame(phase);
    requestAnimationFrame(loop);
  })();
}
