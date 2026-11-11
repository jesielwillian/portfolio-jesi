/**
 * Arquivo: js/script.js
 * Organizado e comentado automaticamente.
 */

/* =========================================================================
   PORTFÓLIO JESI — SCRIPT PRINCIPAL
   -------------------------------------------------------------------------
   1. Atalhos & seleção de elementos
   2. Menu mobile (toggle)
   3. Tema claro / escuro
   4. Animações de entrada (reveal)
   5. Contadores das estatísticas
   6. Filtro de projetos
   7. Modal de projeto
   8. FAQ (accordion)
   9. Formulário de contato
  10. Scroll: header, botão voltar ao topo, link ativo e scroll down
  11. Brilho que acompanha o cursor
   ========================================================================= */
/* -------------------------------------------------------------------------
   1. ATALHOS & SELEÇÃO DE ELEMENTOS
   ------------------------------------------------------------------------- */
/** Atalho para document.querySelector. */
const $ = (selector, scope = document) => scope.querySelector(selector);
/** Atalho para document.querySelectorAll (já convertido em array). */
const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];
const backTop = $("#backTop");
const contactForm = $("#contactForm");
const cursorGlow = $(".cursor-glow");
const header = $("#header");
const menuToggle = $("#menuToggle");
const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const navMenu = $("#navMenu");
const themeToggle = $("#themeToggle");
const toast = $("#toast");
// Scroll para explorar
const scrollDown = $(".scroll-down");
const aboutSection = $("#sobre");
/* -------------------------------------------------------------------------
   2. MENU MOBILE (TOGGLE)
   Abre/fecha o painel de navegação, anima o ícone (hambúrguer -> X),
   bloqueia o scroll do body e fecha ao clicar fora, no link ou com Esc.
   ------------------------------------------------------------------------- */
/**
 * Define o estado do menu mobile.
 * @param {boolean} open true para abrir, false para fechar.
 */
function setMenu(open) {
  if (!navMenu || !menuToggle) return;
  navMenu.classList.toggle("open", open);
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", open);
}
/** Verifica se o menu está aberto. */
const isMenuOpen = () => Boolean(navMenu?.classList.contains("open"));
// Evento "click" em menuToggle?
menuToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  setMenu(!isMenuOpen());
});
// Fecha o menu ao clicar em qualquer link de navegação.
$$(".nav-link").forEach((link) =>
  link.addEventListener("click", () => setMenu(false)),
);
// Fecha o menu ao clicar fora do painel.
document.addEventListener("click", (event) => {
  if (
    isMenuOpen() &&
    !navMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    setMenu(false);
  }
});
// Fecha o menu ao voltar para a largura de desktop.
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) setMenu(false);
});
/* -------------------------------------------------------------------------
   3. TEMA CLARO / ESCURO
   O tema escolhido fica salvo no localStorage.
   ------------------------------------------------------------------------- */
/**
 * Aplica o tema na página e atualiza o ícone do botão.
 * @param {"light"|"dark"} theme
 */
function applyTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light", light);
  if (themeToggle) {
    themeToggle.innerHTML = light
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
}
applyTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");
// Evento "click" em themeToggle?
themeToggle?.addEventListener("click", () => {
  const theme = document.body.classList.contains("light") ? "dark" : "light";
  applyTheme(theme);
  localStorage.setItem("theme", theme);
});
/* -------------------------------------------------------------------------
   4. ANIMAÇÕES DE ENTRADA (REVEAL)
   Adiciona a classe .show quando o elemento entra na viewport.
   ------------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);
$$(".reveal").forEach((element) => revealObserver.observe(element));
/* -------------------------------------------------------------------------
   5. CONTADORES DAS ESTATÍSTICAS
   Anima os números de 0 até o valor de data-count (uma única vez).
   ------------------------------------------------------------------------- */
const counters = $$(".stat strong");
let countersStarted = false;
/**
 * Anima um contador até o valor final.
 * @param {HTMLElement} counter
 */
function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  const step = Math.ceil(target / 60);
  let value = 0;
  // Função: update — update
  const update = () => {
    value += step;
    if (value >= target) {
      counter.textContent = `${target}+`;
      return;
    }
    counter.textContent = value;
    requestAnimationFrame(update);
  };
  update();
}
const counterObserver = new IntersectionObserver(
  (entries) => {
    if (countersStarted || !entries.some((entry) => entry.isIntersecting))
      return;
    countersStarted = true;
    counters.forEach(animateCounter);
  },
  {
    threshold: 0.5,
  },
);
counters.forEach((counter) => counterObserver.observe(counter));
/* -------------------------------------------------------------------------
   6. FILTRO DE PROJETOS
   ------------------------------------------------------------------------- */
const filterButtons = $$(".filters button");
// Elemento(s) do DOM: projectSearch
const projectSearch = document.querySelector("#projectSearch");
const projects = $$(".project");
let activeProjectFilter = "all";
// Função: filterProjects — filter projects
const filterProjects = () => {
  const query = projectSearch?.value.trim().toLowerCase() || "";
  projects.forEach((project) => {
    const matchesCategory =
      activeProjectFilter === "all" ||
      project.dataset.category === activeProjectFilter;
    const matchesSearch =
      !query || project.textContent.toLowerCase().includes(query);
    project.style.display = matchesCategory && matchesSearch ? "block" : "none";
  });
};
filterButtons.forEach((button) => {
  // Evento "click" em button
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeProjectFilter = button.dataset.filter;
    filterProjects();
  });
});
// Evento "input" em projectSearch?
projectSearch?.addEventListener("input", filterProjects);
/* -------------------------------------------------------------------------
   7. MODAL DE PROJETO
   O conteúdo do modal é preenchido em js/modal.js.
   ------------------------------------------------------------------------- */
/** Fecha o modal de projeto. */
const closeModal = () => modal?.classList.remove("active");
$$(".view-project").forEach((button) => {
  // Evento "click" em button
  button.addEventListener("click", () => {
    if (modalTitle) modalTitle.textContent = button.dataset.title;
    modal?.classList.add("active");
  });
});
$(".modal-close")?.addEventListener("click", closeModal);
// Evento "click" em modal?
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
/* -------------------------------------------------------------------------
   8. FAQ (ACCORDION)
   ------------------------------------------------------------------------- */
$$(".faq-item button").forEach((button) => {
  // Evento "click" em button
  button.addEventListener("click", () => {
    const item = button.parentElement;
    $$(".faq-item").forEach((faq) => {
      if (faq !== item) faq.classList.remove("open");
    });
    item.classList.toggle("open");
  });
});
/* -------------------------------------------------------------------------
   9. FORMULÁRIO DE CONTATO
   Envio simulado com feedback visual (loading + toast).
   ------------------------------------------------------------------------- */
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button");
  button.disabled = true;
  button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
  setTimeout(() => {
    contactForm.reset();
    button.disabled = false;
    button.innerHTML =
      'Enviar mensagem <i class="fa-solid fa-paper-plane"></i>';
    toast?.classList.add("active");
    setTimeout(() => toast?.classList.remove("active"), 3000);
  }, 1000);
});
/* -------------------------------------------------------------------------
   10. SCROLL: HEADER, BOTÃO VOLTAR AO TOPO, LINK ATIVO E SCROLL DOWN
   ------------------------------------------------------------------------- */
const sections = $$("section[id]");
// Evento "scroll" em window
window.addEventListener("scroll", () => {
  const position = window.scrollY; // Botão "voltar ao topo".
  backTop?.classList.toggle("show", position > 500); // Borda do header aparece após o início da rolagem.
  if (header) {
    header.style.borderBottomColor =
      position > 20 ? "var(--border)" : "transparent";
  }
  // Destaca o link da seção visível.
  let current = "";
  sections.forEach((section) => {
    if (position >= section.offsetTop - 150) {
      current = section.id;
    }
  });
  $$(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
});
// Scroll suave até a seção "Sobre mim", compensando o header fixo.
scrollDown?.addEventListener("click", (event) => {
  if (!aboutSection) return;
  event.preventDefault();
  const headerHeight = header?.offsetHeight ?? 0;
  const targetPosition =
    aboutSection.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    20;
  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: "smooth",
  });
});
// Botão "voltar ao topo".
backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
/* -------------------------------------------------------------------------
   11. BRILHO QUE ACOMPANHA O CURSOR
   ------------------------------------------------------------------------- */
window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});
/* -------------------------------------------------------------------------
   ATALHO GLOBAL: ESC FECHA MENU E MODAL
   ------------------------------------------------------------------------- */
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeModal();
  setMenu(false);
});
