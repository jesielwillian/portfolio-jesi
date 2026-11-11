/**
 * Arquivo: projetos/passo/assets/js/checkout.js
 * Organizado e comentado automaticamente.
 */

(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  // Função: money — money
  const money = (value) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  const catalog = [
    {
      id: 1,
      name: "Move Air",
      category: "Caminhada",
      price: 279.9,
      image: "assets/images/produtos/tenis-01.webp",
    },
    {
      id: 2,
      name: "Cloud Walk",
      category: "Caminhada",
      price: 319.9,
      image: "assets/images/produtos/tenis-02.webp",
    },
    {
      id: 3,
      name: "Urban Flow",
      category: "Dia a dia",
      price: 249.9,
      image: "assets/images/produtos/tenis-03.webp",
    },
    {
      id: 4,
      name: "Trail Flex",
      category: "Performance",
      price: 359.9,
      image: "assets/images/produtos/tenis-04.webp",
    },
    {
      id: 5,
      name: "Breeze Knit",
      category: "Dia a dia",
      price: 229.9,
      image: "assets/images/produtos/tenis-05.webp",
    },
    {
      id: 6,
      name: "Pace Pro",
      category: "Performance",
      price: 389.9,
      image: "assets/images/produtos/tenis-06.webp",
    },
    {
      id: 7,
      name: "Daily Ease",
      category: "Caminhada",
      price: 269.9,
      image: "assets/images/produtos/tenis-07.webp",
    },
    {
      id: 8,
      name: "Terra Move",
      category: "Performance",
      price: 339.9,
      image: "assets/images/produtos/tenis-08.webp",
    },
  ];
  const notice = $("#checkoutNotice");
  const submit = $(".checkout-submit");
  const statusText = $("#checkoutShipping");
  let cart = [];
  try {
    const saved = JSON.parse(localStorage.getItem("passo:cart") || "[]");
    if (Array.isArray(saved))
      cart = saved.reduce((result, item) => {
        const product = catalog.find((p) => p.id === Number(item.id));
        const qty = Number(item.qty);
        if (product && Number.isInteger(qty) && qty > 0 && qty <= 99)
          result.push({
            ...product,
            qty,
          });
        return result;
      }, []);
  } catch {}
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 299 ? 0 : subtotal > 0 ? 19.9 : 0;
  const empty = count === 0;
  $("#checkoutYear").textContent = new Date().getFullYear();
  $("#checkoutEmpty").hidden = !empty;
  $("#checkoutLayout").hidden = empty;
  if (!empty) {
    $("#checkoutItemCount").textContent = `(${count})`;
    $("#checkoutProducts").innerHTML = cart
      .map(
        (item) => `
  <article class="checkout-product">
   <img src="${item.image}" alt="${item.name}" loading="lazy">
   <div><div class="checkout-product-name">${item.name}</div><div class="checkout-product-meta">${item.category} · Qtd. ${item.qty}</div></div>
   <strong class="checkout-product-price">${money(item.price * item.qty)}</strong>
  </article>`,
      )
      .join("");
    $("#checkoutSubtotal").textContent = money(subtotal);
    $("#checkoutShipping").textContent =
      shipping === 0 ? "Grátis" : money(shipping);
    $("#checkoutTotal").textContent = money(subtotal + shipping);
  }
  // Função: showNotice — show notice
  const showNotice = (message) => {
    notice.textContent = message;
    notice.classList.add("is-visible");
    notice.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
    });
  };
  $("#checkoutForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || empty) return;
    if (submit.disabled) return;
    const data = new FormData(form);
    // Função: digits — digits
    const digits = (value) => String(value || "").replace(/\D/g, "");
    // Função: makeRequestId — make request id
    const makeRequestId = () => {
      if (crypto.randomUUID) return crypto.randomUUID();
      const bytes = crypto.getRandomValues(new Uint8Array(16));
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = [...bytes]
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("");
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    };
    const requestId = makeRequestId();
    const payload = {
      requestId,
      customer: {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: digits(data.get("phone")),
        cep: digits(data.get("cep")),
        state: String(data.get("state") || ""),
        address: String(data.get("address") || "").trim(),
        number: String(data.get("number") || "").trim(),
        complement: String(data.get("complement") || "").trim(),
        neighborhood: String(data.get("neighborhood") || "").trim(),
        city: String(data.get("city") || "").trim(),
      },
      items: cart.map(({ id, qty }) => ({
        id,
        qty,
      })),
      paymentMethod: String(data.get("payment") || "pix"),
    };
    submit.disabled = true;
    submit.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Preparando pedido...';
    showNotice(
      "Validando seu pedido e preparando o checkout seguro do Mercado Pago.",
    );
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Idempotency-Key": requestId,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          result.error || "Não foi possível criar o pedido. Tente novamente.",
        );
      if (!result.checkoutUrl)
        throw new Error("O Mercado Pago não retornou o endereço de pagamento.");
      const paymentUrl = new URL(result.checkoutUrl);
      if (
        paymentUrl.protocol !== "https:" ||
        !/(^|\.)mercadopago\./i.test(paymentUrl.hostname)
      )
        throw new Error(
          "O provedor retornou um endereço de pagamento inválido.",
        );
      sessionStorage.setItem("passo:last-order", result.orderId);
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      showNotice(
        error.message ||
          "Falha de conexão. Verifique sua conexão e tente novamente.",
      );
      submit.disabled = false;
      submit.innerHTML =
        'Finalizar compra <i class="fa-solid fa-arrow-right"></i>';
    }
  });
  const cep = $("#customerCep");
  // Evento "input" em cep
  cep.addEventListener("input", () => {
    const digits = cep.value.replace(/\D/g, "").slice(0, 8);
    cep.value =
      digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  });
  const phone = $("#customerPhone");
  // Evento "input" em phone
  phone.addEventListener("input", () => {
    const digits = phone.value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) phone.value = digits.length ? `(${digits}` : "";
    else if (digits.length <= 7)
      phone.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    else
      phone.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  });
})();
