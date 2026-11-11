/**
 * Arquivo: js/stars.js
 * Organizado e comentado automaticamente.
 */

(function () {
  // Elemento(s) do DOM: canvas
  const canvas = document.getElementById("starsCanvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;
  const ctx = canvas.getContext("2d");
  let w = 0,
    h = 0,
    dpr = 1,
    stars = [],
    raf;
  // Função: resize — resize
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(75, Math.max(28, Math.floor((w * h) / 20000)));
    stars = Array.from(
      {
        length: count,
      },
      () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.7 + 0.18,
        a: Math.random() * 0.35 + 0.08,
        speed: Math.random() * 0.008 + 0.002,
        phase: Math.random() * Math.PI * 2,
      }),
    );
  };
  // Função: draw — draw
  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((s) => {
      const alpha = s.a + (Math.sin(t * s.speed + s.phase) * 0.5 + 0.5) * 0.16;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255," + alpha.toFixed(3) + ")";
      ctx.fill();
      if (s.r > 0.98) {
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 2.1, s.y);
        ctx.lineTo(s.x + s.r * 2.1, s.y);
        ctx.moveTo(s.x, s.y - s.r * 2.1);
        ctx.lineTo(s.x, s.y + s.r * 2.1);
        ctx.strokeStyle = "rgba(255,255,255," + (alpha * 0.1).toFixed(3) + ")";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
    raf = requestAnimationFrame(draw);
  };
  resize();
  // Evento "resize" em window
  window.addEventListener("resize", resize, {
    passive: true,
  });
  raf = requestAnimationFrame(draw);
})();
