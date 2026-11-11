/**
 * Arquivo: projetos/passo/server/server.js
 * Organizado e comentado automaticamente.
 */

import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import Database from "better-sqlite3";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT || 3000);
const BASE_URL = String(
  process.env.BASE_URL || `http://localhost:${PORT}`,
).replace(/\/+$/, "");
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || "";
const WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET || "";
const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.join(__dirname, "data", "orders.sqlite");
const PRODUCTS = new Map([
  [
    1,
    {
      id: 1,
      name: "Move Air",
      category: "Caminhada",
      price: 27990,
      image: "assets/images/produtos/tenis-01.webp",
    },
  ],
  [
    2,
    {
      id: 2,
      name: "Cloud Walk",
      category: "Caminhada",
      price: 31990,
      image: "assets/images/produtos/tenis-02.webp",
    },
  ],
  [
    3,
    {
      id: 3,
      name: "Urban Flow",
      category: "Dia a dia",
      price: 24990,
      image: "assets/images/produtos/tenis-03.webp",
    },
  ],
  [
    4,
    {
      id: 4,
      name: "Trail Flex",
      category: "Performance",
      price: 35990,
      image: "assets/images/produtos/tenis-04.webp",
    },
  ],
  [
    5,
    {
      id: 5,
      name: "Breeze Knit",
      category: "Dia a dia",
      price: 22990,
      image: "assets/images/produtos/tenis-05.webp",
    },
  ],
  [
    6,
    {
      id: 6,
      name: "Pace Pro",
      category: "Performance",
      price: 38990,
      image: "assets/images/produtos/tenis-06.webp",
    },
  ],
  [
    7,
    {
      id: 7,
      name: "Daily Ease",
      category: "Caminhada",
      price: 26990,
      image: "assets/images/produtos/tenis-07.webp",
    },
  ],
  [
    8,
    {
      id: 8,
      name: "Terra Move",
      category: "Performance",
      price: 33990,
      image: "assets/images/produtos/tenis-08.webp",
    },
  ],
]);
const SHIPPING_FREE_FROM = 29900;
const SHIPPING_FEE = 1990;
const STATES = new Set(
  "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(
    " ",
  ),
);
fs.mkdirSync(path.dirname(DB_PATH), {
  recursive: true,
});
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  client_request_id TEXT NOT NULL UNIQUE,
  mp_order_id TEXT,
  checkout_url TEXT,
  status TEXT NOT NULL,
  status_detail TEXT,
  payment_method TEXT NOT NULL,
  subtotal_cents INTEGER NOT NULL,
  shipping_cents INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  customer_json TEXT NOT NULL,
  items_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_orders_mp_order_id ON orders(mp_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
`);
const insertOrder = db.prepare(`INSERT INTO orders
(id,client_request_id,status,status_detail,payment_method,subtotal_cents,shipping_cents,total_cents,customer_json,items_json,created_at,updated_at)
VALUES (@id,@client_request_id,'creating',NULL,@payment_method,@subtotal_cents,@shipping_cents,@total_cents,@customer_json,@items_json,@created_at,@updated_at)`);
const findByRequest = db.prepare(
  "SELECT * FROM orders WHERE client_request_id = ?",
);
const findById = db.prepare("SELECT * FROM orders WHERE id = ?");
const updateMpOrder = db.prepare(
  `UPDATE orders SET mp_order_id=@mp_order_id,checkout_url=@checkout_url,status=@status,status_detail=@status_detail,updated_at=@updated_at WHERE id=@id`,
);
const updateStatus = db.prepare(
  "UPDATE orders SET status=?,status_detail=?,updated_at=? WHERE id=?",
);
const findByMpId = db.prepare("SELECT * FROM orders WHERE mp_order_id = ?");
const findByExternalRef = db.prepare("SELECT * FROM orders WHERE id = ?");
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", process.env.TRUST_PROXY === "1" ? 1 : false);
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
    contentSecurityPolicy: false,
  }),
);
app.use(
  express.json({
    limit: "32kb",
    type: "application/json",
  }),
);
app.use(
  "/api/orders",
  rateLimit({
    windowMs: 60_000,
    limit: 12,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(
  "/api/order-status",
  rateLimit({
    windowMs: 60_000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
// Função: money — money
const money = (cents) => (cents / 100).toFixed(2);
// Função: now — now
const now = () => new Date().toISOString();
// Função: publicOrder — public order
const publicOrder = (row) => ({
  orderId: row.id,
  status: row.status,
  statusDetail: row.status_detail,
  subtotal: Number(row.subtotal_cents) / 100,
  shipping: Number(row.shipping_cents) / 100,
  total: Number(row.total_cents) / 100,
  createdAt: row.created_at,
});
// Função: isUuid — is uuid
const isUuid = (value) =>
  typeof value === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
// Função: safeString — safe string
const safeString = (value, max = 160) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
// Função: validateCustomer — validate customer
const validateCustomer = (input) => {
  const c = input && typeof input === "object" ? input : {};
  const customer = {
    name: safeString(c.name, 120),
    email: safeString(c.email, 180).toLowerCase(),
    phone: String(c.phone || "")
      .replace(/\D/g, "")
      .slice(0, 11),
    cep: String(c.cep || "")
      .replace(/\D/g, "")
      .slice(0, 8),
    state: safeString(c.state, 2).toUpperCase(),
    address: safeString(c.address, 180),
    number: safeString(c.number, 30),
    complement: safeString(c.complement, 100),
    neighborhood: safeString(c.neighborhood, 100),
    city: safeString(c.city, 100),
  };
  const errors = [];
  if (customer.name.length < 3 || customer.name.split(/\s+/).length < 2)
    errors.push("Informe nome e sobrenome.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
    errors.push("Informe um e-mail válido.");
  if (customer.phone.length < 10 || customer.phone.length > 11)
    errors.push("Informe um celular com DDD.");
  if (customer.cep.length !== 8) errors.push("Informe um CEP válido.");
  if (!STATES.has(customer.state)) errors.push("Selecione um estado válido.");
  if (
    !customer.address ||
    !customer.number ||
    !customer.neighborhood ||
    !customer.city
  )
    errors.push("Preencha os dados obrigatórios de entrega.");
  return {
    customer,
    errors,
  };
};
// Função: buildItems — build items
const buildItems = (input) => {
  if (!Array.isArray(input) || input.length < 1 || input.length > 20)
    throw new Error("Sua sacola está vazia ou contém itens inválidos.");
  const seen = new Set();
  const items = input.map((line) => {
    const id = Number(line?.id);
    const qty = Number(line?.qty);
    const product = PRODUCTS.get(id);
    if (
      !product ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > 10 ||
      seen.has(id)
    )
      throw new Error(
        "Um dos produtos ou quantidades é inválido. Atualize a sacola e tente novamente.",
      );
    seen.add(id);
    return {
      ...product,
      qty,
      lineTotal: product.price * qty,
    };
  });
  return items;
};
const paymentTypes = {
  pix: ["credit_card", "debit_card", "ticket"],
  card: ["bank_transfer", "ticket"],
  boleto: ["credit_card", "debit_card", "bank_transfer"],
};
// Função: verifyWebhook — verify webhook
const verifyWebhook = (signature, requestId, dataId) => {
  if (!WEBHOOK_SECRET || !signature || !requestId || !dataId) return false;
  const fields = Object.fromEntries(
    signature.split(",").map((part) =>
      part
        .trim()
        .split("=")
        .map((v) => v.trim()),
    ),
  );
  if (!fields.ts || !fields.v1) return false;
  const manifest = `id:${String(dataId)};request-id:${requestId};ts:${fields.ts};`;
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(manifest)
    .digest("hex");
  const supplied = fields.v1;
  if (!/^[a-f0-9]{64}$/i.test(supplied)) return false;
  return crypto.timingSafeEqual(
    Buffer.from(expected, "hex"),
    Buffer.from(supplied, "hex"),
  );
};
// Função: fetchMpOrder — fetch mp order
const fetchMpOrder = async (mpOrderId) => {
  const response = await fetch(
    `https://api.mercadopago.com/v1/orders/${encodeURIComponent(mpOrderId)}`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    },
  );
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      payload.message || "Não foi possível consultar o status no Mercado Pago.",
    );
    error.status = response.status;
    throw error;
  }
  return payload;
};
// Função: normalizeStatus — normalize status
const normalizeStatus = (order) => {
  const payments = order?.transactions?.payments || [];
  if (
    order?.status === "processed" ||
    payments.some((p) => p.status === "approved")
  )
    return "approved";
  if (
    payments.some((p) =>
      ["rejected", "cancelled", "canceled"].includes(
        String(p.status).toLowerCase(),
      ),
    )
  )
    return "rejected";
  if (
    ["cancelled", "canceled", "expired"].includes(
      String(order?.status || "").toLowerCase(),
    )
  )
    return "cancelled";
  if (order?.status === "action_required") return "pending";
  return "pending";
};
// Função: syncLocalOrder — sync local order
const syncLocalOrder = (row, remote) => {
  const status = normalizeStatus(remote);
  const detail = safeString(
    remote.status_detail ||
      remote.transactions?.payments?.[0]?.status_detail ||
      "",
    120,
  );
  updateStatus.run(status, detail, now(), row.id);
  return findById.get(row.id);
};
// Função: requireConfigured — require configured
const requireConfigured = (res) => {
  if (!ACCESS_TOKEN) {
    res.status(503).json({
      error:
        "O checkout ainda não está ativado. Configure MP_ACCESS_TOKEN no servidor.",
    });
    return false;
  }
  return true;
};
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    paymentConfigured: Boolean(ACCESS_TOKEN),
    webhookConfigured: Boolean(WEBHOOK_SECRET),
    environment: process.env.NODE_ENV || "development",
  });
});
app.post("/api/orders", async (req, res) => {
  if (!requireConfigured(res)) return;
  try {
    const { customer, errors } = validateCustomer(req.body?.customer);
    if (errors.length)
      return res.status(400).json({
        error: errors.join(" "),
      });
    const paymentMethod = String(req.body?.paymentMethod || "pix");
    if (!Object.hasOwn(paymentTypes, paymentMethod))
      return res.status(400).json({
        error: "Selecione uma forma de pagamento válida.",
      });
    const items = buildItems(req.body?.items);
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_FEE;
    const total = subtotal + shipping;
    const requestId = req.get("Idempotency-Key") || req.body?.requestId;
    if (!isUuid(requestId))
      return res.status(400).json({
        error:
          "Chave de tentativa inválida. Atualize a página e tente novamente.",
      });
    const existing = findByRequest.get(requestId);
    if (existing) {
      if (existing.checkout_url && existing.status !== "error")
        return res.json({
          orderId: existing.id,
          checkoutUrl: existing.checkout_url,
        });
      if (existing.status === "creating")
        return res.status(409).json({
          error:
            "Este pedido já está sendo preparado. Aguarde alguns segundos.",
        });
    }
    const id = crypto.randomUUID();
    const timestamp = now();
    const itemsSnapshot = items.map(
      ({ id, name, category, price, qty, lineTotal, image }) => ({
        id,
        name,
        category,
        unitPriceCents: price,
        qty,
        lineTotalCents: lineTotal,
        image,
      }),
    );
    const order = {
      id,
      client_request_id: requestId,
      status: "creating",
      payment_method: paymentMethod,
      subtotal_cents: subtotal,
      shipping_cents: shipping,
      total_cents: total,
      customer_json: JSON.stringify(customer),
      items_json: JSON.stringify(itemsSnapshot),
      created_at: timestamp,
      updated_at: timestamp,
    };
    insertOrder.run({
      id: order.id,
      client_request_id: order.client_request_id,
      payment_method: order.payment_method,
      subtotal_cents: order.subtotal_cents,
      shipping_cents: order.shipping_cents,
      total_cents: order.total_cents,
      customer_json: order.customer_json,
      items_json: order.items_json,
      created_at: order.created_at,
      updated_at: order.updated_at,
    });
    const nameParts = customer.name.split(/\s+/);
    const firstName = nameParts.shift();
    const lastName = nameParts.join(" ") || firstName;
    const phoneDigits = customer.phone;
    const base = BASE_URL;
    const payloadItems = items.map((item) => ({
      external_code: `PASSO-${item.id}`,
      title: item.name,
      description: `Tênis Passo — ${item.category}`,
      picture_url: base.startsWith("https://")
        ? new URL(item.image, `${base}/`).href
        : undefined,
      quantity: item.qty,
      unit_price: money(item.price),
    }));
    if (shipping > 0)
      payloadItems.push({
        external_code: "PASSO-FRETE",
        title: "Frete",
        description: "Entrega do pedido Passo",
        quantity: 1,
        unit_price: money(shipping),
      });
    const payload = {
      type: "online",
      total_amount: money(total),
      external_reference: id,
      processing_mode: "manual",
      capture_mode: "automatic_async",
      expiration_time: "P1D",
      payer: {
        email: customer.email,
        first_name: firstName,
        last_name: lastName,
        phone: {
          area_code: phoneDigits.slice(0, 2),
          number: phoneDigits.slice(2),
        },
        address: {
          zip_code: customer.cep,
          street_name: customer.address,
          street_number: customer.number,
          neighborhood: customer.neighborhood,
          city: customer.city,
          state: customer.state,
        },
      },
      config: {
        online: {
          success_url: `${base}/pedido-status.html?order=${encodeURIComponent(id)}&result=success`,
          failure_url: `${base}/pedido-status.html?order=${encodeURIComponent(id)}&result=failure`,
          pending_url: `${base}/pedido-status.html?order=${encodeURIComponent(id)}&result=pending`,
          callback_url: `${base}/api/webhooks/mercadopago`,
          auto_return: "approved",
        },
        payment_method: {
          not_allowed_types: paymentTypes[paymentMethod],
        },
      },
      items: payloadItems,
    };
    const mpResponse = await fetch("https://api.mercadopago.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Idempotency-Key": id,
      },
      body: JSON.stringify(payload),
    });
    const mpData = await mpResponse.json().catch(() => ({}));
    if (!mpResponse.ok || !mpData.checkout_url || !mpData.id) {
      updateStatus.run(
        "error",
        safeString(
          mpData.message ||
            mpData.cause?.[0]?.description ||
            "Falha ao criar checkout no Mercado Pago",
          200,
        ),
        now(),
        id,
      );
      console.error(
        "Mercado Pago order creation failed:",
        mpResponse.status,
        JSON.stringify(mpData).slice(0, 1000),
      );
      return res.status(502).json({
        error:
          "Não foi possível iniciar o pagamento. Confira as credenciais do Mercado Pago e tente novamente.",
      });
    }
    updateMpOrder.run({
      id,
      mp_order_id: String(mpData.id),
      checkout_url: String(mpData.checkout_url),
      status: normalizeStatus(mpData),
      status_detail: safeString(mpData.status_detail || "", 120),
      updated_at: now(),
    });
    return res.status(201).json({
      orderId: id,
      checkoutUrl: mpData.checkout_url,
    });
  } catch (error) {
    console.error("Order creation error:", error.message);
    if (
      error.message?.includes(
        "UNIQUE constraint failed: orders.client_request_id",
      )
    ) {
      const row = findByRequest.get(
        req.get("Idempotency-Key") || req.body?.requestId,
      );
      if (row?.checkout_url)
        return res.json({
          orderId: row.id,
          checkoutUrl: row.checkout_url,
        });
      return res.status(409).json({
        error: "O pedido já está sendo processado. Aguarde e tente novamente.",
      });
    }
    return res.status(error.status || 400).json({
      error: error.status
        ? "O serviço de pagamento está indisponível no momento."
        : error.message || "Não foi possível criar o pedido.",
    });
  }
});
app.get("/api/order-status/:id", async (req, res) => {
  if (!isUuid(req.params.id))
    return res.status(400).json({
      error: "Identificador de pedido inválido.",
    });
  let row = findById.get(req.params.id);
  if (!row)
    return res.status(404).json({
      error: "Pedido não encontrado.",
    });
  if (
    row.mp_order_id &&
    ACCESS_TOKEN &&
    ["pending", "creating"].includes(row.status)
  ) {
    try {
      row = syncLocalOrder(row, await fetchMpOrder(row.mp_order_id));
    } catch (error) {
      console.warn("Order status refresh:", error.message);
    }
  }
  return res.json(publicOrder(row));
});
app.post("/api/webhooks/mercadopago", async (req, res) => {
  const dataId = String(
    req.query["data.id"] || req.query.id || req.body?.data?.id || "",
  );
  if (!WEBHOOK_SECRET)
    return res.status(503).send("Webhook secret is not configured");
  if (!verifyWebhook(req.get("x-signature"), req.get("x-request-id"), dataId))
    return res.status(401).send("Invalid signature");
  try {
    const remote = await fetchMpOrder(dataId);
    const externalReference = String(remote.external_reference || "");
    const row =
      findByExternalRef.get(externalReference) ||
      findByMpId.get(String(remote.id));
    if (row) {
      const status = normalizeStatus(remote);
      const detail = safeString(
        remote.status_detail ||
          remote.transactions?.payments?.[0]?.status_detail ||
          "",
        120,
      );
      if (row.mp_order_id && row.mp_order_id !== String(remote.id))
        return res.status(409).send("Order mismatch");
      updateMpOrder.run({
        id: row.id,
        mp_order_id: String(remote.id),
        checkout_url: row.checkout_url || "",
        status,
        status_detail: detail,
        updated_at: now(),
      });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error("Mercado Pago webhook error:", error.message);
    return res.sendStatus(500);
  }
});
app.use(
  express.static(SITE_ROOT, {
    extensions: ["html"],
    maxAge: process.env.NODE_ENV === "production" ? "1h" : 0,
  }),
);
app.use((req, res) => {
  if (req.path.startsWith("/api/"))
    return res.status(404).json({
      error: "Endpoint não encontrado.",
    });
  res.status(404).sendFile(path.join(SITE_ROOT, "404.html"), (error) => {
    if (error) res.status(404).send("Página não encontrada.");
  });
});
app.listen(PORT, () => {
  console.log(`Passo checkout running at ${BASE_URL}`);
  console.log(
    `Mercado Pago access token: ${ACCESS_TOKEN ? "configured" : "MISSING (set MP_ACCESS_TOKEN)"}`,
  );
  console.log(
    `Webhook signature secret: ${WEBHOOK_SECRET ? "configured" : "MISSING (set MP_WEBHOOK_SECRET)"}`,
  );
});
