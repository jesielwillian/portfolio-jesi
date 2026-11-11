/**
 * Arquivo: projetos/petlove/petlove/js/app.js
 * Organizado e comentado automaticamente.
 */

(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  // Função: money — money
  const money = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  // Função: imagePath — image path
  const imagePath = (file) => `assets/images/produtos/${file}`;
  const products = [
    {
      id: "brinquedo-corda",
      name: "Corda Mordedora Duo",
      category: "brinquedos",
      categoryLabel: "Brinquedos",
      price: 39.9,
      oldPrice: 49.9,
      tag: "MAIS VENDIDO",
      emoji: "🪢",
      color: "#f9e1d4",
      rating: "4.9",
      reviews: 128,
      description:
        "Diversão para puxar, morder e brincar junto. Uma corda resistente para transformar qualquer momento em brincadeira.",
      image: "corda-mordedora-duo.webp",
    },
    {
      id: "cama-nuvem",
      name: "Caminha Nuvem Cozy",
      category: "caes",
      categoryLabel: "Cães",
      price: 149.9,
      oldPrice: 179.9,
      tag: "CONFORTO",
      emoji: "🛏️",
      color: "#e8def7",
      rating: "5.0",
      reviews: 86,
      description:
        "Um cantinho macio para recarregar as energias depois de um dia cheio de aventuras. Design aconchegante para combinar com seu lar.",
      image: "caminha-nuvem.webp",
    },
    {
      id: "comedouro-duplo",
      name: "Comedouro Duo Natural",
      category: "alimentacao",
      categoryLabel: "Alimentação",
      price: 69.9,
      oldPrice: 0,
      tag: "DESIGN",
      emoji: "🥣",
      color: "#dff1e6",
      rating: "4.8",
      reviews: 74,
      description:
        "Praticidade e estilo na hora das refeições. Um conjunto funcional para deixar a rotina de alimentação mais organizada.",
      image: "comedouro-duo-natural.webp",
    },
    {
      id: "kit-higiene",
      name: "Kit Banho Cheirinho Bom",
      category: "cuidados",
      categoryLabel: "Cuidados",
      price: 54.9,
      oldPrice: 64.9,
      tag: "KIT ESPECIAL",
      emoji: "🧴",
      color: "#ffedc3",
      rating: "4.9",
      reviews: 92,
      description:
        "Um kit para tornar o momento do banho mais gostoso. Escolha produtos adequados ao tipo de pelagem e às necessidades do seu pet.",
      image: "kit-banho-cheirinho-bom.webp",
    },
    {
      id: "arranhador",
      name: "Arranhador Gatitude",
      category: "gatos",
      categoryLabel: "Gatos",
      price: 89.9,
      oldPrice: 109.9,
      tag: "FAVORITO",
      emoji: "🐈",
      color: "#e6def7",
      rating: "4.9",
      reviews: 63,
      description:
        "Um espaço para afiar as unhas, alongar o corpo e gastar energia. Enriquecimento ambiental para gatos curiosos.",
      image: "arranhador-gatitude.webp",
    },
    {
      id: "bolinha",
      name: "Bolinha Vai e Volta",
      category: "brinquedos",
      categoryLabel: "Brinquedos",
      price: 24.9,
      oldPrice: 0,
      tag: "DIVERSÃO",
      emoji: "🎾",
      color: "#d9efe5",
      rating: "4.7",
      reviews: 114,
      description:
        "Leve, divertida e pronta para acompanhar as brincadeiras. Perfeita para momentos de interação e atividade.",
      image: "bolinha-vai-e-volta.webp",
    },
    {
      id: "petiscos",
      name: "Petiscos Croc Croc",
      category: "alimentacao",
      categoryLabel: "Alimentação",
      price: 32.9,
      oldPrice: 0,
      tag: "MIMO",
      emoji: "🦴",
      color: "#f8dfd1",
      rating: "4.8",
      reviews: 157,
      description:
        "Um mimo para usar com responsabilidade na rotina do seu pet. Confira sempre os ingredientes e as orientações do fabricante.",
      image: "petiscos-croc-croc.webp",
    },
    {
      id: "coleira",
      name: "Coleira Passeio Feliz",
      category: "caes",
      categoryLabel: "Cães",
      price: 59.9,
      oldPrice: 74.9,
      tag: "NOVO",
      emoji: "🐕",
      color: "#e1e9fa",
      rating: "4.9",
      reviews: 48,
      description:
        "Um acessório para deixar os passeios ainda mais especiais. Escolha o tamanho correto para garantir conforto e segurança.",
      image: "coleira-passeio-feliz.webp",
    },
    {
      id: "varinha-gato",
      name: "Varinha Caça-Penas",
      category: "gatos",
      categoryLabel: "Gatos",
      price: 29.9,
      oldPrice: 0,
      tag: "INTERATIVO",
      emoji: "🪶",
      color: "#f9e6c4",
      rating: "4.8",
      reviews: 81,
      description:
        "Estimule o instinto de caça com brincadeiras supervisionadas que aproximam você do seu gatinho.",
      image: "varinha-caca-penas.webp",
    },
    {
      id: "escova",
      name: "Escova Pelo Leve",
      category: "cuidados",
      categoryLabel: "Cuidados",
      price: 44.9,
      oldPrice: 0,
      tag: "CUIDADO",
      emoji: "🪮",
      color: "#dff1e6",
      rating: "4.7",
      reviews: 55,
      description:
        "Ajuda a manter a pelagem cuidada com escovação regular. Use com delicadeza e de acordo com o tipo de pelo.",
      image: "escova-pelo-leve.webp",
    },
    {
      id: "bolsa-transporte",
      name: "Bolsa Passeio Leve",
      category: "gatos",
      categoryLabel: "Gatos",
      price: 169.9,
      oldPrice: 199.9,
      tag: "PREMIUM",
      emoji: "👜",
      color: "#eadff5",
      rating: "4.9",
      reviews: 37,
      description:
        "Uma opção prática para deslocamentos planejados. Verifique dimensões, ventilação e conforto antes de usar.",
      image: "bolsa-passeio.webp",
    },
    {
      id: "tapete-higienico",
      name: "Tapete Rotina Limpa",
      category: "cuidados",
      categoryLabel: "Cuidados",
      price: 79.9,
      oldPrice: 89.9,
      tag: "PRÁTICO",
      emoji: "🧼",
      color: "#d8efe7",
      rating: "4.8",
      reviews: 102,
      description:
        "Ajuda a organizar a rotina de higiene em casa. Troque conforme a necessidade e mantenha o ambiente sempre limpo.",
      image: "tapete-rotina-limpa.webp",
    },
  ];
  const STORAGE_KEYS = { cart: "petlove-cart", favorites: "petlove-favorites" };
  // Função: readStorageArray — read storage array
  const readStorageArray = (key) => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  };
  // Função: getCart — get cart
  const getCart = () => readStorageArray(STORAGE_KEYS.cart);
  // Função: getFavorites — get favorites
  const getFavorites = () => [
    ...new Set(
      readStorageArray(STORAGE_KEYS.favorites).filter(
        (id) =>
          typeof id === "string" &&
          products.some((product) => product.id === id),
      ),
    ),
  ];
  // Função: saveFavorites — save favorites
  const saveFavorites = (favorites) => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.favorites,
        JSON.stringify([...new Set(favorites)]),
      );
    } catch {
      toast("Não foi possível salvar os favoritos neste navegador.");
    }
    syncWishlistButtons();
    updateFavoritesFilter();
  };
  // Função: saveCart — save cart
  const saveCart = (cart) => {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      toast("Não foi possível salvar o carrinho neste navegador.");
    }
    updateCartCount();
  };
  // Função: getProduct — get product
  const getProduct = (id) => products.find((p) => p.id === id);
  // Função: productImage — product image
  const productImage = (p) =>
    p.image
      ? `<img src="${imagePath(p.image)}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="product-emoji" aria-hidden="true" style="display:none">${p.emoji}</span>`
      : `<span class="product-emoji" aria-hidden="true">${p.emoji}</span>`;
  // Função: toast — toast
  const toast = (message) => {
    const el = $(".toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2700);
  };
  // Função: updateCartCount — update cart count
  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    $$(".cart-count").forEach((el) => {
      el.textContent = count;
      el.setAttribute("aria-label", `${count} itens no carrinho`);
    });
  }
  // Função: productCard — product card
  function productCard(p) {
    const liked = getFavorites().includes(p.id);
    return `<article class="product-card" data-product-id="${p.id}">
      <div class="product-art" style="background:${p.color}"><a href="produto.html?id=${encodeURIComponent(p.id)}" aria-label="Ver ${p.name}">${productImage(p)}</a><span class="product-tag">${p.tag}</span><button class="product-wishlist${liked ? " is-liked" : ""}" type="button" aria-label="${liked ? "Remover " + p.name + " dos favoritos" : "Favoritar " + p.name}" aria-pressed="${liked}"><i class="fa-${liked ? "solid" : "regular"} fa-heart" aria-hidden="true"></i></button></div>
      <div class="product-info"><div class="product-category">${p.categoryLabel}</div><h3><a href="produto.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3><div class="product-rating"><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i> <span>${p.rating} (${p.reviews})</span></div><div class="product-bottom"><div class="product-price">${money(p.price)}${p.oldPrice ? ` <del>${money(p.oldPrice)}</del>` : ""}</div><button class="add-cart" type="button" data-add="${p.id}" aria-label="Adicionar ${p.name} ao carrinho"><i class="fa-solid fa-cart-plus" aria-hidden="true"></i></button></div></div></article>`;
  }
  // Função: renderFeatured — render featured
  function renderFeatured() {
    const el = $("#featured-products");
    if (el) el.innerHTML = products.slice(0, 4).map(productCard).join("");
  }
  let showFavoritesOnly =
    new URLSearchParams(location.search).get("favoritos") === "1";
  // Função: updateFavoritesFilter — update favorites filter
  function updateFavoritesFilter() {
    const button = $("#favorites-filter");
    if (!button) return;
    const count = getFavorites().length;
    button.classList.toggle("is-active", showFavoritesOnly);
    button.setAttribute("aria-pressed", String(showFavoritesOnly));
    button.innerHTML = `<i class="fa-${showFavoritesOnly ? "solid" : "regular"} fa-heart" aria-hidden="true"></i> Favoritos <span class="favorites-count">${count}</span>`;
  }
  // Função: syncWishlistButtons — sync wishlist buttons
  function syncWishlistButtons() {
    const favorites = new Set(getFavorites());
    $$(".product-wishlist").forEach((button) => {
      const card = button.closest("[data-product-id]");
      if (!card) return;
      const product = getProduct(card.dataset.productId);
      if (!product) return;
      const liked = favorites.has(product.id);
      button.classList.toggle("is-liked", liked);
      button.setAttribute("aria-pressed", String(liked));
      button.setAttribute(
        "aria-label",
        `${liked ? "Remover" : "Favoritar"} ${product.name} ${liked ? "dos" : "nos"} favoritos`,
      );
      button.innerHTML = `<i class="fa-${liked ? "solid" : "regular"} fa-heart" aria-hidden="true"></i>`;
    });
  }
  // Função: renderShop — render shop
  function renderShop() {
    const grid = $("#shop-products");
    if (!grid) return;
    const params = new URLSearchParams(location.search);
    const initialCategory = params.get("categoria");
    if (
      initialCategory &&
      $(`input[name="category"][value="${initialCategory}"]`)
    )
      $(`input[name="category"][value="${initialCategory}"]`).checked = true;
    const search = ($("#product-search")?.value || "")
      .trim()
      .toLocaleLowerCase("pt-BR");
    const category = $('input[name="category"]:checked')?.value || "todos";
    const price = $('input[name="price"]:checked')?.value || "all";
    const sort = $("#product-sort")?.value || "featured";
    const favorites = new Set(getFavorites());
    let filtered = products.filter(
      (p) =>
        (!showFavoritesOnly || favorites.has(p.id)) &&
        (category === "todos" || p.category === category) &&
        `${p.name} ${p.categoryLabel} ${p.description}`
          .toLocaleLowerCase("pt-BR")
          .includes(search),
    );
    if (price !== "all") {
      const [min, max] = price.split("-").map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }
    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (sort === "name")
      filtered.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    grid.innerHTML = filtered.map(productCard).join("");
    $("#product-count").textContent =
      `${filtered.length} ${filtered.length === 1 ? "produto" : "produtos"}`;
    const empty = $("#empty-products");
    if (empty) {
      empty.hidden = filtered.length > 0;
      const heading = $("h3", empty);
      const description = $("p", empty);
      if (heading)
        heading.textContent = showFavoritesOnly
          ? "Sua lista de favoritos está vazia"
          : "Nenhuma patinha por aqui...";
      if (description)
        description.textContent = showFavoritesOnly
          ? "Toque no coração de um produto para guardá-lo aqui."
          : "Tente mudar os filtros para encontrar o que procura.";
    }
    updateFavoritesFilter();
    syncWishlistButtons();
  }
  // Função: addToCart — add to cart
  function addToCart(id, qty = 1) {
    const product = getProduct(id);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty });
    saveCart(cart);
    toast(`${product.name} adicionado ao carrinho!`);
  }
  // Função: renderDetail — render detail
  function renderDetail() {
    const host = $("#product-detail");
    if (!host) return;
    const id = new URLSearchParams(location.search).get("id") || products[0].id;
    const p = getProduct(id);
    if (!p) {
      host.innerHTML = `<div class="empty-state"><span><i class="fa-solid fa-paw" aria-hidden="true"></i></span><h3>Produto não encontrado</h3><a class="button button-primary" href="produtos.html">Voltar para a loja ↗</a></div>`;
      return;
    }
    $("#detail-breadcrumb").textContent = p.name;
    host.innerHTML = `<div class="detail-grid"><div class="detail-art" style="background:${p.color}">${productImage(p)}<span class="product-tag">${p.tag}</span></div><div class="detail-copy"><div class="eyebrow">${p.categoryLabel.toUpperCase()} / PETLOVE</div><h1>${p.name}</h1><div class="product-rating"><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i><i class="fa-solid fa-star" aria-hidden="true"></i> <span>${p.rating} · ${p.reviews} avaliações</span></div><div class="detail-price">${money(p.price)} ${p.oldPrice ? `<del>${money(p.oldPrice)}</del>` : ""}</div><p>${p.description}</p><div class="detail-stock"><i class="fa-solid fa-check" aria-hidden="true"></i> Em estoque — pronto para levar felicidade</div><div class="detail-actions"><div class="quantity-control"><button type="button" id="qty-minus" aria-label="Diminuir quantidade"><i class="fa-solid fa-minus" aria-hidden="true"></i></button><span id="detail-qty">1</span><button type="button" id="qty-plus" aria-label="Aumentar quantidade"><i class="fa-solid fa-plus" aria-hidden="true"></i></button></div><button class="button button-primary" id="detail-add" type="button">Adicionar ao carrinho <i class="fa-solid fa-cart-plus"></i></button></div><div class="detail-perks"><span>♡ Produto selecionado com carinho</span><span>↗ Frete grátis acima de R$ 149 (campanha demonstrativa)</span><span><i class="fa-solid fa-lock" aria-hidden="true"></i> Checkout de demonstração, sem pagamento real</span></div></div></div>`;
    let qty = 1;
    $("#qty-minus").addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      $("#detail-qty").textContent = qty;
    });
    $("#qty-plus").addEventListener("click", () => {
      qty = Math.min(99, qty + 1);
      $("#detail-qty").textContent = qty;
    });
    $("#detail-add").addEventListener("click", () => addToCart(p.id, qty));
    const related = $("#related-products");
    if (related)
      related.innerHTML = products
        .filter((item) => item.id !== p.id)
        .slice(0, 4)
        .map(productCard)
        .join("");
  }
  // Função: renderCart — render cart
  function renderCart() {
    const host = $("#cart-items");
    const summary = $("#cart-summary");
    if (!host || !summary) return;
    const cart = getCart().filter((item) => getProduct(item.id));
    const subtotal = cart.reduce(
      (sum, item) => sum + getProduct(item.id).price * item.qty,
      0,
    );
    const shipping = subtotal === 0 || subtotal >= 149 ? 0 : 14.9;
    if (!cart.length) {
      host.innerHTML = `<div class="cart-empty">
    <span class="cart-empty-icon">
        <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>
    </span>
    <h2>Sua sacolinha está esperando!</h2>
    <p>Escolha alguns mimos para deixar seu pet ainda mais feliz.</p>
    <a class="button button-primary" href="produtos.html">
        Explorar a loja <i class="fa-solid fa-arrow-right"></i>
    </a>
</div>`;
      summary.innerHTML = "";
      return;
    }
    host.innerHTML = cart
      .map((item) => {
        const p = getProduct(item.id);
        return `<article class="cart-item"><div class="cart-item-art" style="background:${p.color}">${productImage(p)}</div><div><h3><a href="produto.html?id=${p.id}">${p.name}</a></h3><small>${p.categoryLabel}</small><div class="cart-item-actions"><button type="button" data-qty="${p.id}" data-change="-1" aria-label="Diminuir"><i class="fa-solid fa-minus" aria-hidden="true"></i></button><span>${item.qty}</span><button type="button" data-qty="${p.id}" data-change="1" aria-label="Aumentar"><i class="fa-solid fa-plus" aria-hidden="true"></i></button><button type="button" class="remove-item" data-remove="${p.id}">Remover</button></div></div><div class="cart-item-price">${money(p.price * item.qty)}</div></article>`;
      })
      .join("");
    summary.innerHTML = `<h2>Resumo do pedido</h2><div class="summary-line"><span>Subtotal (${cart.reduce((s, i) => s + i.qty, 0)} itens)</span><strong>${money(subtotal)}</strong></div><div class="summary-line"><span>Frete</span><strong>${shipping === 0 ? "Grátis" : money(shipping)}</strong></div><div class="shipping-hint">${subtotal >= 149 ? "🎉 Você ganhou frete grátis!" : `Faltam ${money(149 - subtotal)} para ganhar frete grátis.`}</div><div class="summary-line summary-total"><span>Total</span><strong>${money(subtotal + shipping)}</strong></div><a class="button button-primary summary-checkout" href="checkout.html">Continuar para checkout <i class="fa-solid fa-arrow-right"></i></a><a class="summary-continue" href="produtos.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Continuar comprando</a><p class="demo-notice">Checkout demonstrativo. Nenhuma cobrança será feita.</p>`;
  }
  // Função: renderCheckout — render checkout
  function renderCheckout() {
    const host = $("#checkout-order");
    if (!host) return;
    const cart = getCart().filter((item) => getProduct(item.id));
    if (!cart.length) {
      host.innerHTML = `<h2>Seu pedido</h2><p class="empty-copy">Seu carrinho está vazio.</p><a class="button button-primary" href="produtos.html">Explorar a loja ↗</a>`;
      return;
    }
    const subtotal = cart.reduce(
      (sum, item) => sum + getProduct(item.id).price * item.qty,
      0,
    );
    const shipping = subtotal >= 149 ? 0 : 14.9;
    host.innerHTML = `<h2>Seu pedido</h2>${cart
      .map((item) => {
        const p = getProduct(item.id);
        return `<div class="order-line"><div class="order-line-art" style="background:${p.color}">${productImage(p)}</div><div class="order-line-info"><b>${p.name}</b><small>Qtd. ${item.qty}</small></div><span class="order-line-price">${money(p.price * item.qty)}</span></div>`;
      })
      .join(
        "",
      )}<div class="order-totals"><div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-line"><span>Frete</span><strong>${shipping === 0 ? "Grátis" : money(shipping)}</strong></div><div class="summary-line summary-total"><span>Total</span><strong>${money(subtotal + shipping)}</strong></div></div><div class="shipping-hint"><i class="fa-solid fa-lock" aria-hidden="true"></i> Protótipo seguro para testar a interface. Não insira dados reais de pagamento.</div>`;
  }
  // Função: normalizeSearch — normalize search
  function normalizeSearch(value) {
    return String(value || "")
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // Função: headerSearchCard — header search card
  function headerSearchCard(p) {
    return `<a class="header-search-result" href="produto.html?id=${encodeURIComponent(p.id)}">
      <span class="header-search-result-art" style="background:${p.color}">${productImage(p)}</span>
      <span class="header-search-result-info"><strong>${p.name}</strong><small>${p.categoryLabel}</small></span>
      <span class="header-search-result-price">${money(p.price)}</span>
    </a>`;
  }

  // Função: initHeaderSearch — init header search
  function initHeaderSearch() {
    const header = $(".site-header");
    if (!header || $(".header-search-panel")) return;

    const trigger = $$(".header-actions a").find((link) =>
      $(".fa-magnifying-glass", link),
    );
    if (!trigger) return;

    trigger.classList.add("search-trigger");
    trigger.setAttribute("href", "#header-search");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "header-search-panel");

    const panel = document.createElement("div");
    panel.className = "header-search-panel";
    panel.id = "header-search-panel";
    panel.innerHTML = `<div class="container header-search-inner">
      <div class="header-search-field">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <input id="header-search-input" type="search" autocomplete="off" placeholder="O que seu pet está procurando?" aria-label="Pesquisar produtos">
        <button class="header-search-close" type="button" aria-label="Fechar busca"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      </div>
      <div class="header-search-content">
        <div class="header-search-heading"><span id="header-search-label">Digite para encontrar um produto</span><span id="header-search-count"></span></div>
        <div class="header-search-results" id="header-search-results"></div>
      </div>
    </div>`;
    header.insertAdjacentElement("afterend", panel);

    const input = $("#header-search-input");
    const results = $("#header-search-results");
    const label = $("#header-search-label");
    const count = $("#header-search-count");
    const close = $(".header-search-close", panel);

    // Função: closePanel — close panel
    const closePanel = () => {
      panel.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("header-search-open");
    };

    // Função: renderResults — render results
    const renderResults = () => {
      const query = normalizeSearch(input.value.trim());
      if (!query) {
        label.textContent = "Digite para encontrar um produto";
        count.textContent = "";
        results.innerHTML =
          '<div class="header-search-empty"><i class="fa-solid fa-paw" aria-hidden="true"></i><span>Comece digitando o nome do produto, categoria ou tipo de cuidado.</span></div>';
        return;
      }

      const terms = query.split(/\s+/).filter(Boolean);
      const filtered = products
        .filter((p) => {
          const haystack = normalizeSearch(
            `${p.name} ${p.categoryLabel} ${p.category} ${p.description} ${p.tag}`,
          );
          return terms.every((term) => haystack.includes(term));
        })
        .slice(0, 6);

      label.textContent = filtered.length
        ? `Produtos encontrados para “${input.value.trim()}”`
        : `Nenhum produto encontrado para “${input.value.trim()}”`;
      count.textContent = filtered.length
        ? `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}`
        : "";
      results.innerHTML = filtered.length
        ? filtered.map(headerSearchCard).join("")
        : `<div class="header-search-empty"><i class="fa-solid fa-face-sad-tear" aria-hidden="true"></i><span>Não encontramos esse produto. Tente “cama”, “brinquedo”, “gatos” ou “cuidados”.</span></div>`;
    };

    // Função: openPanel — open panel
    const openPanel = () => {
      panel.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      document.body.classList.add("header-search-open");
      renderResults();
      requestAnimationFrame(() => input.focus());
    };

    // Evento "click" em trigger
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (panel.classList.contains("is-open")) {
        input.focus();
        return;
      }
      openPanel();
    });
    // Evento "click" em close
    close.addEventListener("click", closePanel);
    // Evento "input" em input
    input.addEventListener("input", renderResults);
    // Evento "keydown" em input
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
        trigger.focus();
      }
    });
    // Evento "click" em document
    document.addEventListener("click", (event) => {
      if (!panel.contains(event.target) && !trigger.contains(event.target))
        closePanel();
    });
  }

  // Função: initMenu — init menu
  function initMenu() {
    const toggle = $(".mobile-toggle");
    const nav = $(".main-nav");
    if (!toggle || !nav) return;
    // Evento "click" em toggle
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
    // Evento "click" em nav
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  }
  // Função: initReveal — init reveal
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
  }
  // Função: initCounters — init counters
  function initCounters() {
    const counters = $$("[data-count]");
    if (!counters.length) return;
    // Função: run — run
    const run = (el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const duration = 1400;
      // Função: tick — tick
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased).toLocaleString("pt-BR")}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.5 },
    );
    counters.forEach((el) => observer.observe(el));
  }
  // Função: initTestimonials — init testimonials
  function initTestimonials() {
    const text = $("#testimonial-text");
    if (!text) return;
    const items = [
      {
        text: "Amei a experiência! Os produtos chegaram super bem embalados e meu Bento já adotou o brinquedo favorito.",
        name: "Marina & Bento",
        meta: "Cliente desde 2024 · São Paulo",
        avatar: "👩🏻",
      },
      {
        text: "Atendimento muito atencioso. Foi fácil encontrar uma caminha confortável para a Luna, e ela aprovou na primeira soneca!",
        name: "Rafa & Luna",
        meta: "Cliente desde 2025 · Campinas",
        avatar: "🧑🏽",
      },
      {
        text: "A variedade é ótima e a navegação é simples. Virei cliente e já estou de olho nos próximos mimos para o Mingau.",
        name: "Carol & Mingau",
        meta: "Cliente desde 2025 · Santos",
        avatar: "👩🏼",
      },
    ];
    let index = 0;
    // Função: show — show
    const show = () => {
      const item = items[index];
      text.textContent = item.text;
      $("#testimonial-name").textContent = item.name;
      $("#testimonial-meta").textContent = item.meta;
      $("#testimonial-avatar").textContent = item.avatar;
      $("#testimonial-progress").style.width =
        `${((index + 1) / items.length) * 100}%`;
    };
    $("#testimonial-prev")?.addEventListener("click", () => {
      index = (index + items.length - 1) % items.length;
      show();
    });
    $("#testimonial-next")?.addEventListener("click", () => {
      index = (index + 1) % items.length;
      show();
    });
  }
  // Função: initForms — init forms
  function initForms() {
    $("#newsletter-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      $("#newsletter-message").innerHTML =
        'Que bom ter você na matilha! Cadastro demonstrativo recebido <i class="fa-solid fa-heart" aria-hidden="true"></i>';
      event.target.reset();
    });
    $("#contact-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = $("#contact-message");
      message.textContent =
        "Mensagem validada! Esta demonstração não envia dados para um servidor.";
      event.target.reset();
      toast("Mensagem validada com sucesso!");
    });
    const service = new URLSearchParams(location.search).get("servico");
    if (service && $("#contact-subject")) {
      const option = [...$("#contact-subject").options].find((o) =>
        o.textContent
          .toLocaleLowerCase("pt-BR")
          .includes(service.replace("-", " ").toLocaleLowerCase("pt-BR")),
      );
      if (option) $("#contact-subject").value = option.value;
    }
    $$('input[name="payment"]').forEach((input) =>
      input.addEventListener("change", () => {
        const fields = $("#credit-fields");
        if (fields) {
          fields.hidden = input.value !== "credit";
          $$("input", fields).forEach(
            (el) => (el.required = input.value === "credit"),
          );
        }
      }),
    );
    $("#checkout-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!getCart().length) {
        toast("Adicione um produto antes de finalizar.");
        return;
      }
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const selected = $('input[name="payment"]:checked')?.value;
      if (
        selected === "credit" &&
        !$("#credit-fields").hidden &&
        !$("#credit-fields").reportValidity()
      )
        return;
      const order = `PL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      $(".checkout-layout").innerHTML =
        `<div class="success-panel"><span><i class="fa-solid fa-paw" aria-hidden="true"></i></span><h2>Pedido de demonstração criado!</h2><p>Seu número de referência é <b>${order}</b>. Nenhum pagamento foi processado e nenhum pedido foi enviado a uma loja real.</p><a class="button button-primary" href="produtos.html">Voltar para a loja ↗</a></div><aside class="checkout-order"><h2>Próximos passos</h2><p style="font-size:12px;color:var(--muted);line-height:1.8">Para transformar este protótipo em e-commerce real, conecte o backend, estoque, cálculo de frete e um gateway de pagamento.</p></aside>`;
      localStorage.removeItem("petlove-cart");
      updateCartCount();
    });
  }
  // Evento "click" em document
  document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-add]");
    if (add) {
      addToCart(add.dataset.add);
      return;
    }
    const wish = event.target.closest(".product-wishlist");
    if (wish) {
      event.preventDefault();
      const card = wish.closest("[data-product-id]");
      const product = card && getProduct(card.dataset.productId);
      if (!product) return;
      const favorites = getFavorites();
      const liked = favorites.includes(product.id);
      saveFavorites(
        liked
          ? favorites.filter((id) => id !== product.id)
          : [...favorites, product.id],
      );
      if (showFavoritesOnly) renderShop();
      toast(
        liked
          ? `${product.name} removido dos favoritos.`
          : `${product.name} adicionado aos favoritos.`,
      );
      return;
    }
    const favoritesFilter = event.target.closest("#favorites-filter");
    if (favoritesFilter) {
      showFavoritesOnly = !showFavoritesOnly;
      updateFavoritesFilter();
      renderShop();
      return;
    }
    const qty = event.target.closest("[data-qty]");
    if (qty) {
      const id = qty.dataset.qty;
      const change = Number(qty.dataset.change);
      const cart = getCart();
      const item = cart.find((i) => i.id === id);
      if (item) {
        item.qty += change;
        const next = cart.filter((i) => i.qty > 0);
        saveCart(next);
        renderCart();
      }
      return;
    }
    const remove = event.target.closest("[data-remove]");
    if (remove) {
      saveCart(getCart().filter((i) => i.id !== remove.dataset.remove));
      renderCart();
      toast("Produto removido do carrinho");
    }
  });
  const sortDropdown = $("#sort-dropdown");
  if (sortDropdown) {
    const sortSelect = $("#product-sort"),
      trigger = $(".sort-trigger", sortDropdown),
      menu = $(".sort-options", sortDropdown),
      current = $(".sort-current", sortDropdown),
      options = $$("[role=option]", sortDropdown);
    // Função: closeSortMenu — close sort menu
    const closeSortMenu = () => {
      sortDropdown.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    };
    // Função: syncSortMenu — sync sort menu
    const syncSortMenu = () => {
      current.textContent =
        sortSelect.options[sortSelect.selectedIndex].textContent;
      options.forEach((option) =>
        option.setAttribute(
          "aria-selected",
          String(option.dataset.value === sortSelect.value),
        ),
      );
    };
    // Evento "click" em trigger
    trigger.addEventListener("click", () => {
      const opening = menu.hidden;
      menu.hidden = !opening;
      sortDropdown.classList.toggle("is-open", opening);
      trigger.setAttribute("aria-expanded", String(opening));
    });
    options.forEach((option) =>
      option.addEventListener("click", () => {
        sortSelect.value = option.dataset.value;
        syncSortMenu();
        closeSortMenu();
        sortSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }),
    );
    // Evento "click" em document
    document.addEventListener("click", (event) => {
      if (!sortDropdown.contains(event.target)) closeSortMenu();
    });
    // Evento "change" em sortSelect
    sortSelect.addEventListener("change", syncSortMenu);
    syncSortMenu();
  }
  ["product-search", "product-sort"].forEach((id) =>
    $("#" + id)?.addEventListener(
      id === "product-search" ? "input" : "change",
      renderShop,
    ),
  );
  $$('input[name="category"],input[name="price"]').forEach((el) =>
    // Evento "change" em el
    el.addEventListener("change", renderShop),
  );
  // Refinamentos de navegação e acessibilidade.
  const header = $(".site-header");
  // Função: syncHeader — sync header
  const syncHeader = () =>
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  syncHeader();
  // Evento "scroll" em window
  window.addEventListener("scroll", syncHeader, { passive: true });
  const currentFile = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  $$(".main-nav a").forEach((link) => {
    const target = (link.getAttribute("href") || "")
      .split("?")[0]
      .toLowerCase();
    const active =
      target === currentFile ||
      (currentFile === "produto.html" && target === "produtos.html");
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  // Fecha o menu móvel com Escape e devolve o foco ao controle.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const nav = $(".main-nav"),
        toggle = $(".mobile-toggle");
      if (nav?.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
        toggle?.focus();
      }
    }
  });
  // Acordeão FAQ: mantém apenas uma resposta aberta por vez.
  $$(".faq-list details").forEach((item) => {
    // Evento "toggle" em item
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      $$(".faq-list details").forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  // Selects personalizados: mantém o <select> original para formulários e backend.
  $$('select[name="state"], select[name="subject"]').forEach(
    (select, index) => {
      if (select.dataset.petSelectReady) return;
      select.dataset.petSelectReady = "true";
      const wrapper = document.createElement("div");
      wrapper.className = "pet-select";
      const id = select.id || `pet-select-${index + 1}`;
      select.id = id;
      select.classList.add("pet-select-native");
      select.tabIndex = -1;
      select.setAttribute("aria-hidden", "true");
      select.required = false;
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "pet-select-trigger";
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", `${id}-options`);
      if (select.hasAttribute("required"))
        trigger.setAttribute("aria-required", "true");

      const label = document.createElement("span");
      label.className = "pet-select-value";
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-chevron-down";
      icon.setAttribute("aria-hidden", "true");
      trigger.append(label, icon);

      const menu = document.createElement("div");
      menu.className = "pet-select-menu";
      menu.id = `${id}-options`;
      menu.setAttribute("role", "listbox");
      menu.setAttribute(
        "aria-label",
        select.name === "state" ? "Estado" : "Assunto",
      );

      const optionButtons = [...select.options].map((option, optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "pet-select-option";
        button.setAttribute("role", "option");
        button.dataset.index = String(optionIndex);
        button.textContent = option.textContent.trim();
        button.addEventListener("click", () => {
          select.selectedIndex = optionIndex;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          sync();
          close();
          trigger.focus();
        });
        menu.appendChild(button);
        return button;
      });

      wrapper.append(trigger, menu);

      // Função: sync — sync
      function sync() {
        const selected = select.options[select.selectedIndex];
        label.textContent = selected?.textContent.trim() || "Selecione";
        label.classList.toggle("select-placeholder", !select.value);
        optionButtons.forEach((button, i) => {
          button.setAttribute(
            "aria-selected",
            String(i === select.selectedIndex),
          );
        });
      }
      // Função: close — close
      function close() {
        wrapper.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }
      // Função: open — open
      function open() {
        $$(".pet-select.is-open").forEach((item) => {
          if (item !== wrapper) {
            item.classList.remove("is-open");
            item
              .querySelector(".pet-select-trigger")
              ?.setAttribute("aria-expanded", "false");
          }
        });
        wrapper.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        optionButtons[select.selectedIndex]?.focus();
      }

      // Evento "click" em trigger
      trigger.addEventListener("click", () =>
        wrapper.classList.contains("is-open") ? close() : open(),
      );
      // Evento "keydown" em trigger
      trigger.addEventListener("keydown", (event) => {
        if (["Enter", " ", "ArrowDown"].includes(event.key)) {
          event.preventDefault();
          open();
        }
      });
      // Evento "keydown" em menu
      menu.addEventListener("keydown", (event) => {
        const current = optionButtons.indexOf(document.activeElement);
        if (event.key === "Escape") {
          event.preventDefault();
          close();
          trigger.focus();
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          optionButtons[
            Math.min(current + 1, optionButtons.length - 1)
          ]?.focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          optionButtons[Math.max(current - 1, 0)]?.focus();
        } else if (event.key === "Home") {
          event.preventDefault();
          optionButtons[0]?.focus();
        } else if (event.key === "End") {
          event.preventDefault();
          optionButtons[optionButtons.length - 1]?.focus();
        } else if (event.key === "Tab") close();
      });
      // Evento "change" em select
      select.addEventListener("change", sync);
      // Evento "reset" em select.form?
      select.form?.addEventListener("reset", () => requestAnimationFrame(sync));
      // Evento "submit" em select.form?
      select.form?.addEventListener("submit", (event) => {
        if (select.hasAttribute("data-required") && !select.value) {
          event.preventDefault();
          open();
          trigger.focus();
        }
      });
      if (select.hasAttribute("required"))
        select.setAttribute("data-required", "true");
      // Evento "click" em document
      document.addEventListener("click", (event) => {
        if (!wrapper.contains(event.target)) close();
      });
      sync();
    },
  );

  initMenu();
  initHeaderSearch();
  updateCartCount();
  renderFeatured();
  renderShop();
  syncWishlistButtons();
  updateFavoritesFilter();
  renderDetail();
  renderCart();
  renderCheckout();
  initReveal();
  initCounters();
  initTestimonials();
  initForms();
})();
