/**
 * Arquivo: projetos/passo/assets/js/custom-select.js
 * Organizado e comentado automaticamente.
 */

(() => {
  "use strict";
  document
    .querySelectorAll(".form-field select, .checkout-field select")
    .forEach((select, index) => {
      if (select.dataset.customized) return;
      select.dataset.customized = "true";
      const wrapper = document.createElement("div");
      wrapper.className = "custom-select";
      const id = select.id || `passo-select-${index + 1}`;
      select.id = id;
      select.classList.add("custom-select-native");
      select.tabIndex = -1;
      select.setAttribute("aria-hidden", "true");
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-select-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", `${id}-menu`);
      const value = document.createElement("span");
      value.className = "select-value";
      const chevron = document.createElement("i");
      chevron.className = "fa-solid fa-chevron-down select-chevron";
      chevron.setAttribute("aria-hidden", "true");
      trigger.append(value, chevron);
      const menu = document.createElement("div");
      menu.className = "custom-select-menu";
      menu.id = `${id}-menu`;
      menu.setAttribute("role", "listbox");
      menu.setAttribute(
        "aria-label",
        select.closest(".form-field")?.querySelector("label")?.textContent ||
          "Opções",
      );
      const options = [...select.options].map((option, i) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "custom-select-option";
        item.setAttribute("role", "option");
        item.dataset.index = i;
        item.textContent = option.textContent;
        item.setAttribute("aria-selected", String(i === select.selectedIndex));
        item.addEventListener("click", () => {
          select.selectedIndex = i;
          select.dispatchEvent(
            new Event("change", {
              bubbles: true,
            }),
          );
          sync();
          close();
          trigger.focus();
        });
        menu.appendChild(item);
        return item;
      });
      wrapper.append(trigger, menu);
      // Função: sync — sync
      function sync() {
        value.textContent =
          select.options[select.selectedIndex]?.textContent ||
          "Selecione uma opção";
        options.forEach((item, i) =>
          item.setAttribute(
            "aria-selected",
            String(i === select.selectedIndex),
          ),
        );
      }
      // Função: open — open
      function open() {
        document.querySelectorAll(".custom-select.open").forEach((el) => {
          if (el !== wrapper)
            el.querySelector(".custom-select-trigger")?.click();
        });
        wrapper.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        options[select.selectedIndex]?.focus();
      }
      // Função: close — close
      function close() {
        wrapper.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
      trigger.addEventListener("click", () =>
        wrapper.classList.contains("open") ? close() : open(),
      );
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
      menu.addEventListener("keydown", (e) => {
        const current = options.indexOf(document.activeElement);
        if (e.key === "Escape") {
          e.preventDefault();
          close();
          trigger.focus();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          options[Math.min(current + 1, options.length - 1)]?.focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          options[Math.max(current - 1, 0)]?.focus();
        } else if (e.key === "Home") {
          e.preventDefault();
          options[0]?.focus();
        } else if (e.key === "End") {
          e.preventDefault();
          options[options.length - 1]?.focus();
        } else if (e.key === "Tab") {
          close();
        }
      });
      document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) close();
      });
      select.addEventListener("change", sync);
      select.form?.addEventListener("reset", () => setTimeout(sync, 0));
      sync();
    });
})();
