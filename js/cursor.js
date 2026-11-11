/**
 * Arquivo: js/cursor.js
 * Organizado e comentado automaticamente.
 */

// Evento "DOMContentLoaded" em document
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.innerHTML = `
       <span class="custom-cursor-wave"></span>
        <span class="custom-cursor-wave"></span>
        <span class="custom-cursor-wave"></span>
    `;
  document.body.appendChild(cursor);
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  // Evento "mousemove" em document
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  // Função: animate — animate
  const animate = () => {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animate);
  };
  animate();
  document
    .querySelectorAll("a, button, input, textarea, select, [role='button']")
    .forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
      });
      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
      });
    });
});
