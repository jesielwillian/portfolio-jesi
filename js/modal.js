/**
 * Arquivo: js/modal.js
 * Organizado e comentado automaticamente.
 */

/* =========================================================================
   PORTFÓLIO JESI — DESCRIÇÃO DO MODAL DE PROJETOS
   -------------------------------------------------------------------------
   Preenche o parágrafo do modal com o texto do atributo data-description
   do botão clicado. A abertura/fechamento do modal fica em js/script.js.
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Elemento(s) do DOM: modalDescription
  const modalDescription = document.getElementById("modalDescription");
  if (!modalDescription) return;
  document.querySelectorAll(".view-project").forEach((button) => {
    // Evento "click" em button
    button.addEventListener("click", () => {
      modalDescription.textContent = button.dataset.description ?? "";
    });
  });
});
