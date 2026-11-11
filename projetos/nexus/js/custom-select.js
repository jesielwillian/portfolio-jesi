/**
 * Arquivo: projetos/nexus/js/custom-select.js
 * Organizado e comentado automaticamente.
 */

/* ================================================================
   NEXUS LOG — CUSTOM SELECT
   Substitui visualmente o <select> nativo mantendo o campo original.
   ================================================================ */
document.querySelectorAll("[data-select]").forEach(function (selectBox) {
  const nativeSelect = selectBox.querySelector(".custom-select-native");
  const trigger = selectBox.querySelector(".custom-select-trigger");
  const triggerText = trigger.querySelector("span");
  const menu = selectBox.querySelector(".custom-select-menu");
  const options = selectBox.querySelectorAll(".custom-select-option");
  // Função: closeSelect — close select
  function closeSelect() {
    selectBox.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  }
  // Função: openSelect — open select
  function openSelect() {
    document
      .querySelectorAll("[data-select].is-open")
      .forEach(function (other) {
        if (other !== selectBox) {
          other.classList.remove("is-open");
          const otherTrigger = other.querySelector(".custom-select-trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        }
      });
    selectBox.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  }
  // Evento "click" em trigger
  trigger.addEventListener("click", function () {
    selectBox.classList.contains("is-open") ? closeSelect() : openSelect();
  });
  options.forEach(function (option) {
    // Evento "click" em option
    option.addEventListener("click", function () {
      const value = option.dataset.value;
      nativeSelect.value = value;
      nativeSelect.dispatchEvent(
        new Event("change", {
          bubbles: true,
        }),
      );
      triggerText.textContent = option.textContent.trim();
      trigger.classList.toggle("is-placeholder", value === "");
      options.forEach(function (item) {
        item.classList.remove("is-selected");
        item.setAttribute("aria-selected", "false");
      });
      option.classList.add("is-selected");
      option.setAttribute("aria-selected", "true");
      closeSelect();
    });
  });
  // Evento "click" em document
  document.addEventListener("click", function (event) {
    if (!selectBox.contains(event.target)) closeSelect();
  });
  // Evento "keydown" em trigger
  trigger.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSelect();
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openSelect();
    }
  });
  // Evento "keydown" em menu
  menu.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSelect();
      trigger.focus();
    }
  });
});
