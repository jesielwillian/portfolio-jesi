/**
 * Arquivo: projetos/nexus/js/counter.js
 * Organizado e comentado automaticamente.
 */

/* ================================================================
   NEXUS LOG — CONTADORES
   Anima todos os elementos com [data-counter] quando entram na tela.
   Suporta sufixos (+, %, etc.) e formato abreviado em milhares (K).
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Elemento(s) do DOM: counters
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) {
    return;
  }
  const DURATION = 1800;
  // Função: getDecimalPlaces — get decimal places
  const getDecimalPlaces = (counter) => {
    if (counter.dataset.decimal !== undefined) {
      return Number(counter.dataset.decimal);
    }
    const target = counter.dataset.counter || "0";
    return target.includes(".") ? target.split(".")[1].length : 0;
  };
  // Função: formatValue — format value
  const formatValue = (counter, value) => {
    const suffix = counter.dataset.suffix || "";
    const format = counter.dataset.format || "";
    const decimals = getDecimalPlaces(counter);
    if (format === "k") {
      return `${(value / 1000).toFixed(1)}K${suffix}`;
    }
    return `${value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  };
  // Função: animateCounter — animate counter
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.counter);
    const startTime = performance.now();
    // Função: update — update
    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / DURATION, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = target * ease;
      counter.textContent = formatValue(counter, value);
      if (progress < 1) {
        requestAnimationFrame(update);
        return;
      }
      counter.textContent = formatValue(counter, target);
    };
    requestAnimationFrame(update);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.5,
    },
  );
  counters.forEach((counter) => observer.observe(counter));
});
