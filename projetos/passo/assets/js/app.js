/**
 * Arquivo: projetos/passo/assets/js/app.js
 * Organizado e comentado automaticamente.
 */

(() => {
  "use strict";
  const products = [
    {
      id: 1,
      name: "Move Air",
      category: "caminhada",
      label: "Mais vendido",
      price: 279.9,
      oldPrice: 329.9,
      rating: "4.9",
      reviews: 128,
      image: "assets/images/produtos/tenis-01.webp",
      desc: "Leveza para ir além",
      bg: "#e9e6dd",
      colors: ["#d94738", "#252b27", "#e6e2d6"],
    },
    {
      id: 2,
      name: "Cloud Walk",
      category: "caminhada",
      label: "Conforto extra",
      price: 319.9,
      oldPrice: null,
      rating: "4.8",
      reviews: 96,
      image: "assets/images/produtos/tenis-02.webp",
      desc: "Amortecimento macio",
      bg: "#dfe6df",
      colors: ["#e5e6df", "#303b32", "#b5c7d0"],
    },
    {
      id: 3,
      name: "Urban Flow",
      category: "dia-a-dia",
      label: "Novo",
      price: 249.9,
      oldPrice: null,
      rating: "4.9",
      reviews: 74,
      image: "assets/images/produtos/tenis-03.webp",
      desc: "Do parque à cidade",
      bg: "#e6e0d9",
      colors: ["#dedbd2", "#262a27", "#b4b8a7"],
    },
    {
      id: 4,
      name: "Trail Flex",
      category: "performance",
      label: "Versátil",
      price: 359.9,
      oldPrice: 399.9,
      rating: "4.7",
      reviews: 61,
      image: "assets/images/produtos/tenis-04.webp",
      desc: "Aderência e estabilidade",
      bg: "#dce5d9",
      colors: ["#586b50", "#272e29", "#d5d2c8"],
    },
    {
      id: 5,
      name: "Breeze Knit",
      category: "dia-a-dia",
      label: "Leve",
      price: 229.9,
      oldPrice: null,
      rating: "4.8",
      reviews: 52,
      image: "assets/images/produtos/tenis-05.webp",
      desc: "Respirabilidade o dia todo",
      bg: "#e8e8df",
      colors: ["#e6e5dc", "#87958b", "#303631"],
    },
    {
      id: 6,
      name: "Pace Pro",
      category: "performance",
      label: "Performance",
      price: 389.9,
      oldPrice: null,
      rating: "5.0",
      reviews: 43,
      image: "assets/images/produtos/tenis-06.webp",
      desc: "Energia para cada meta",
      bg: "#e8dfd8",
      colors: ["#df684a", "#282d29", "#dedbd3"],
    },
    {
      id: 7,
      name: "Daily Ease",
      category: "caminhada",
      label: "Favorito",
      price: 269.9,
      oldPrice: 299.9,
      rating: "4.8",
      reviews: 89,
      image: "assets/images/produtos/tenis-07.webp",
      desc: "Seu companheiro diário",
      bg: "#e1e7dd",
      colors: ["#e4e5dc", "#71806c", "#343b35"],
    },
    {
      id: 8,
      name: "Terra Move",
      category: "performance",
      label: "Edição especial",
      price: 339.9,
      oldPrice: null,
      rating: "4.9",
      reviews: 37,
      image: "assets/images/produtos/tenis-08.webp",
      desc: "Feito para novos caminhos",
      bg: "#e6e0d5",
      colors: ["#aa8061", "#343a32", "#d4d4c7"],
    },
  ];
  // Função: money — money
  const money = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  // Função: readCart — read cart
  const readCart = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("passo:cart") || "[]");
      return Array.isArray(saved)
        ? saved
            .filter(
              (item) =>
                products.some((p) => p.id === Number(item.id)) &&
                Number.isInteger(Number(item.qty)) &&
                Number(item.qty) > 0,
            )
            .map((item) => ({
              ...products.find((p) => p.id === Number(item.id)),
              qty: Math.min(99, Number(item.qty)),
            }))
        : [];
    } catch {
      return [];
    }
  };
  let cart = readCart();
  let favorites = new Set(
    (() => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("passo:favorites") || "[]",
        );
        return Array.isArray(saved)
          ? saved.map(Number).filter((id) => products.some((p) => p.id === id))
          : [];
      } catch {
        return [];
      }
    })(),
  );
  let favoritesOnly = false;
  let activeFilter = "todos";
  let showAllProducts = false;
  let toastTimer;
  const categoryNames = {
    caminhada: "Caminhada",
    "dia-a-dia": "Dia a dia",
    performance: "Performance",
  };
  // Função: productCard — product card
  function productCard(p) {
    return `<article class="product-card" data-id="${p.id}" style="--card-bg:${p.bg}">
  <div class="product-image"><img src="${p.image}" alt="${p.name} — tênis esportivo" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')"><span class="product-tag">${p.label}</span><button class="favorite-btn ${favorites.has(p.id) ? "active" : ""}" data-favorite="${p.id}" aria-label="${favorites.has(p.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}"><i class="${favorites.has(p.id) ? "fa-solid" : "fa-regular"} fa-heart"></i></button><button class="quick-add" data-add="${p.id}"><i class="fa-solid fa-plus"></i> ADICIONAR À SACOLA</button></div>
  <div class="product-info"><span class="product-category">${categoryNames[p.category]}</span><div class="product-name-row"><h3 class="product-name">${p.name}</h3><span class="rating"><i class="fa-solid fa-star"></i> ${p.rating} <span style="color:#92998f">(${p.reviews})</span></span></div><p class="product-desc">${p.desc}</p><div class="price-row"><span class="price">${money(p.price)}</span>${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}</div><div class="color-dots">${p.colors.map((c) => `<span class="color-dot" style="background:${c}" title="Variação de cor"></span>`).join("")}</div></div>
 </article>`;
  }
  // Função: updateFavorites — update favorites
  function updateFavorites() {
    const count = favorites.size;
    const badge = $("#favoritesCount");
    const button = $("#favoritesJump");
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.hidden = count === 0;
    button.classList.toggle("has-favorites", count > 0);
    button.setAttribute(
      "aria-label",
      count ? `Ver ${count} produto(s) favorito(s)` : "Ver favoritos",
    );
    const icon = button.querySelector("i");
    icon.classList.toggle("fa-solid", count > 0);
    icon.classList.toggle("fa-regular", count === 0);
    try {
      localStorage.setItem("passo:favorites", JSON.stringify([...favorites]));
    } catch {}
  }
  // Função: renderProducts — render products
  function renderProducts() {
    let list = products.filter(
      (p) =>
        (activeFilter === "todos" || p.category === activeFilter) &&
        (!favoritesOnly || favorites.has(p.id)),
    );
    if (!showAllProducts && activeFilter === "todos" && !favoritesOnly)
      list = list.slice(0, 4);
    $("#productGrid").innerHTML = list.length
      ? list.map(productCard).join("")
      : '<div class="no-results">Nenhum modelo encontrado nessa categoria.</div>';
    $("#productGrid").classList.toggle("show-all", showAllProducts);
  }
  // Função: notify — notify
  function notify(message) {
    $("#toastText").textContent = message;
    $("#toast").classList.add("active");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $("#toast").classList.remove("active"), 2600);
  }
  // Função: addToCart — add to cart
  function addToCart(id) {
    const p = products.find((x) => x.id === Number(id));
    if (!p) return;
    const item = cart.find((x) => x.id === p.id);
    if (item) item.qty++;
    else cart.push({ ...p, qty: 1 });
    updateCart();
    notify(`${p.name} adicionado à sacola`);
  }
  // Função: updateCart — update cart
  function updateCart() {
    try {
      localStorage.setItem(
        "passo:cart",
        JSON.stringify(cart.map(({ id, qty }) => ({ id, qty }))),
      );
    } catch {}
    const count = cart.reduce((n, p) => n + p.qty, 0),
      subtotal = cart.reduce((n, p) => n + p.price * p.qty, 0);
    $("#cartCount").textContent = count;
    $("#drawerCount").textContent = `(${count})`;
    $("#cartSubtotal").textContent = money(subtotal);
    $("#shippingNote").textContent =
      subtotal >= 299
        ? "Você ganhou frete grátis!"
        : "Faltam " + money(299 - subtotal) + " para ganhar frete grátis.";
    $("#cartBody").innerHTML = count
      ? cart
          .map(
            (p) =>
              `<article class="cart-item"><img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'"><div><h4>${p.name}</h4><small>${categoryNames[p.category]}</small><span class="price">${money(p.price)}</span><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Diminuir quantidade">−</button><span>${p.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Aumentar quantidade">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remover ${p.name}"><i class="fa-solid fa-trash-can"></i></button></article>`,
          )
          .join("")
      : '<div class="empty-cart"><i class="fa-solid fa-bag-shopping"></i><h4>Sua sacola está leve.</h4><p>Encontre o par que vai acompanhar seus próximos passos.</p></div>';
    $("#cartFoot").style.display = count ? "block" : "none";
  }
  // Função: openCart — open cart
  function openCart() {
    $("#cartDrawer").classList.add("active");
    $("#overlay").classList.add("active");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
    $("#cartClose").focus();
  }
  // Função: closeCart — close cart
  function closeCart() {
    $("#cartDrawer").classList.remove("active");
    $("#overlay").classList.remove("active");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
  }
  // Função: openSearch — open search
  function openSearch() {
    $("#searchModal").classList.add("active");
    document.body.classList.add("locked");
    setTimeout(() => $("#searchInput").focus(), 50);
    renderSearch("");
  }
  // Função: closeSearch — close search
  function closeSearch() {
    $("#searchModal").classList.remove("active");
    document.body.classList.remove("locked");
  }
  // Função: renderSearch — render search
  function renderSearch(q) {
    const term = q.trim().toLocaleLowerCase("pt-BR");
    if (!term) {
      $("#searchResults").innerHTML = "";
      return;
    }
    const results = products.filter((p) =>
      `${p.name} ${p.desc} ${p.category}`
        .toLocaleLowerCase("pt-BR")
        .includes(term),
    );
    $("#searchResults").innerHTML = results.length
      ? results
          .slice(0, 5)
          .map(
            (p) =>
              `<button class="search-result" data-search-product="${p.id}"><img src="${p.image}" alt="" onerror="this.style.display='none'"><span><strong>${p.name}</strong><small>${categoryNames[p.category]}</small></span><span class="price">${money(p.price)}</span></button>`,
          )
          .join("")
      : '<p class="no-results">Não encontramos esse modelo. Tente outra busca.</p>';
  }
  // Função: filterTo — filter to
  function filterTo(filter) {
    activeFilter = filter;
    showAllProducts = true;
    $$(".filter-btn").forEach((b) =>
      b.classList.toggle("active", b.dataset.filter === filter),
    );
    renderProducts();
    $("#colecao").scrollIntoView({ behavior: "smooth" });
  }
  $("#productGrid").addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]"),
      fav = e.target.closest("[data-favorite]");
    if (add) addToCart(add.dataset.add);
    if (fav) {
      const id = Number(fav.dataset.favorite);
      favorites.has(id) ? favorites.delete(id) : favorites.add(id);
      updateFavorites();
      renderProducts();
      notify(
        favorites.has(id)
          ? "Adicionado aos favoritos"
          : "Removido dos favoritos",
      );
    }
  });
  $(".filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    activeFilter = b.dataset.filter;
    showAllProducts = activeFilter !== "todos";
    $$(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
    renderProducts();
  });
  $("#showAll").addEventListener("click", () => {
    showAllProducts = !showAllProducts;
    activeFilter = "todos";
    $$(".filter-btn").forEach((b) =>
      b.classList.toggle("active", b.dataset.filter === "todos"),
    );
    renderProducts();
    $("#showAll").innerHTML = showAllProducts
      ? 'Mostrar menos <i class="fa-solid fa-arrow-up"></i>'
      : 'Explorar coleção completa <i class="fa-solid fa-arrow-right"></i>';
    if (!showAllProducts) $("#colecao").scrollIntoView({ behavior: "smooth" });
  });
  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  $("#cartBody").addEventListener("click", (e) => {
    const qty = e.target.closest("[data-qty]"),
      remove = e.target.closest("[data-remove]");
    if (qty) {
      const item = cart.find((p) => p.id === Number(qty.dataset.qty));
      if (item) {
        item.qty += Number(qty.dataset.delta);
        if (item.qty <= 0) cart = cart.filter((p) => p.id !== item.id);
        updateCart();
      }
    }
    if (remove) {
      cart = cart.filter((p) => p.id !== Number(remove.dataset.remove));
      updateCart();
    }
  });
  $("#checkoutBtn").addEventListener("click", () => {
    if (!cart.length) return;
    window.location.href = "checkout.html";
  });
  $("#searchOpen").addEventListener("click", openSearch);
  $("#searchClose").addEventListener("click", closeSearch);
  $("#searchInput").addEventListener("input", (e) =>
    renderSearch(e.target.value),
  );
  $("#searchResults").addEventListener("click", (e) => {
    const result = e.target.closest("[data-search-product]");
    if (!result) return;
    const p = products.find(
      (x) => x.id === Number(result.dataset.searchProduct),
    );
    closeSearch();
    activeFilter = "todos";
    showAllProducts = true;
    renderProducts();
    $("#colecao").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const card = $(`.product-card[data-id="${p.id}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
      card?.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.025)" },
          { transform: "scale(1)" },
        ],
        { duration: 450 },
      );
    }, 350);
  });
  $("#favoritesJump").addEventListener("click", () => {
    if (!favorites.size) {
      notify("Toque no coração de um produto para favoritar");
      return;
    }
    favoritesOnly = !favoritesOnly;
    activeFilter = "todos";
    showAllProducts = true;
    renderProducts();
    $("#colecao").scrollIntoView({ behavior: "smooth" });
    notify(
      favoritesOnly
        ? `${favorites.size} produto(s) nos favoritos`
        : "Exibindo todos os produtos",
    );
  });
  $("#menuToggle").addEventListener("click", () => {
    const open = $("#navLinks").classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(open));
    $("#menuToggle").innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
  $("#navLinks").addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      $("#navLinks").classList.remove("open");
      $("#menuToggle").setAttribute("aria-expanded", "false");
      $("#menuToggle").innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
  $$("[data-footer-filter]").forEach((a) =>
    // Evento "click" em a
    a.addEventListener("click", () => filterTo(a.dataset.footerFilter)),
  );
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#emailInput").value.trim();
    if (!email) return;
    notify("Cadastro demonstrativo recebido. Conecte sua API para salvar.");
    e.target.reset();
  });
  // Evento "keydown" em document
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeSearch();
      $("#navLinks").classList.remove("open");
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearch();
    }
  });
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el) => observer.observe(el));
  $("#year").textContent = new Date().getFullYear();

  const scrollDiscover = $("#scrollDiscover");
  const backToTop = $("#backToTop");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // Evento "click" em scrollDiscover?
  scrollDiscover?.addEventListener("click", () => {
    const target = $(".ticker");
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  });
  // Função: updateBackToTop — update back to top
  const updateBackToTop = () => {
    backToTop?.classList.toggle("is-visible", window.scrollY > 320);
  };
  // Evento "scroll" em window
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  // Evento "click" em backToTop?
  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  });
  updateBackToTop();

  renderProducts();
  updateCart();
  updateFavorites();
})();
