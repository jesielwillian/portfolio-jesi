/**
 * Arquivo: projetos/passo/assets/js/order-status.js
 * Organizado e comentado automaticamente.
 */

(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  const orderId =
    params.get("order") || sessionStorage.getItem("passo:last-order") || "";
  // Função: money — money
  const money = (value) =>
    Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  let timer = null;
  let attempts = 0;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("#checkoutYear").textContent = new Date().getFullYear();
  $("#statusOrderId").textContent = orderId
    ? `Pedido ${orderId.slice(0, 8).toUpperCase()}`
    : "";
  // Função: render — render
  const render = (order) => {
    const map = {
      approved: {
        icon: "fa-circle-check",
        title: "Pedido confirmado",
        description: "Pagamento aprovado. Obrigado por escolher a Passo.",
        notice: "Seu pagamento foi confirmado pelo Mercado Pago.",
        className: "is-approved",
      },
      pending: {
        icon: "fa-clock",
        title: "Pagamento pendente",
        description:
          "Seu pedido foi criado e o pagamento ainda está sendo processado.",
        notice:
          "O status será atualizado assim que o Mercado Pago confirmar o pagamento.",
        className: "is-pending",
      },
      rejected: {
        icon: "fa-circle-xmark",
        title: "Pagamento não aprovado",
        description:
          "O Mercado Pago não aprovou o pagamento. Você pode voltar à loja e tentar novamente.",
        notice: "Nenhuma confirmação de pagamento foi registrada.",
        className: "is-error",
      },
      cancelled: {
        icon: "fa-circle-xmark",
        title: "Pedido cancelado",
        description:
          "Este pedido foi cancelado ou expirou. Você pode criar um novo pedido.",
        notice: "Volte à loja para tentar novamente.",
        className: "is-error",
      },
      error: {
        icon: "fa-triangle-exclamation",
        title: "Não foi possível consultar",
        description: "Não conseguimos confirmar o status agora.",
        notice: "Tente consultar novamente em instantes.",
        className: "is-error",
      },
    };
    const state = map[order.status] || map.pending;
    $("#statusIcon").innerHTML = `<i class="fa-solid ${state.icon}"></i>`;
    $("#statusIcon").className = `checkout-status-icon ${state.className}`;
    $("#statusTitle").innerHTML =
      `${state.title}<span style="color:var(--lime)">.</span>`;
    $("#statusDescription").textContent = state.description;
    $("#statusNotice").textContent = state.notice;
    $("#statusTotal").textContent =
      order.total != null ? `Total do pedido: ${money(order.total)}` : "";
    if (order.status === "approved") {
      localStorage.removeItem("passo:cart");
      sessionStorage.removeItem("passo:last-order");
      clearInterval(timer);
      $("#statusNotice").classList.remove("is-visible");
    } else if (["rejected", "cancelled"].includes(order.status)) {
      clearInterval(timer);
    }
  };
  // Função: check — check
  async function check() {
    if (!orderId) {
      render({
        status: "error",
      });
      $("#statusDescription").textContent =
        "Não encontramos um identificador de pedido nesta página. Consulte a sacola e tente novamente.";
      $("#statusOrderId").textContent = "";
      return;
    }
    try {
      const response = await fetch(
        `/api/order-status/${encodeURIComponent(orderId)}`,
        {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        },
      );
      const order = await response.json();
      if (!response.ok)
        throw new Error(order.error || "Falha ao consultar pedido.");
      render(order);
      attempts++;
      if (
        ["pending", "creating"].includes(order.status) &&
        attempts < 30 &&
        !timer
      ) {
        timer = setInterval(async () => {
          if (attempts >= 30) {
            clearInterval(timer);
            timer = null;
            return;
          }
          attempts++;
          await check();
        }, 5000);
      }
    } catch {
      render({
        status: "error",
      });
    }
  }
  $("#checkStatus").addEventListener("click", check);
  check();
})();
