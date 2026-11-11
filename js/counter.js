/**
 * Arquivo: js/counter.js
 * Organizado e comentado automaticamente.
 */

/* =========================================================================
   PORTFÓLIO JESI — CONTADOR DE ANOS DE EXPERIÊNCIA
   -------------------------------------------------------------------------
   Anima o número exibido no card "Sobre mim" de 0 até o valor final,
   usando requestAnimationFrame para uma contagem suave.
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Elemento(s) do DOM: counter
  const counter = document.getElementById("experience-counter");
  if (!counter) return;
  const duration = 1500; // Duração total da animação (ms).
  const target = 5; // Valor final exibido.
  const startTime = performance.now(); /**
   * Atualiza o número a cada quadro até chegar ao valor final.
   * @param {number} currentTime Timestamp fornecido pelo requestAnimationFrame.
   */
  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    counter.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(update);
      return;
    }
    counter.textContent = target;
  }
  requestAnimationFrame(update);
});
