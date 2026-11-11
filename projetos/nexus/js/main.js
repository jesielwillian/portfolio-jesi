/**
 * Arquivo: projetos/nexus/js/main.js
 * Organizado e comentado automaticamente.
 */

/* ================================================================
   NEXUS LOG — JAVASCRIPT PRINCIPAL
   Responsável por interações, animações, rastreamento, mapas e formulário.
   ================================================================ */
/* ================================================================
   01. HELPERS / PERFORMANCE
   ================================================================ */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
/* ================================================================
   02. VÍDEO LAZY-LOAD
   ================================================================ */
// Carrega vídeos somente quando estiverem próximos da área visível.
const lazyVideos = document.querySelectorAll("video.lazy-video");
if (lazyVideos.length) {
  // Função: loadVideo — load video
  const loadVideo = (video) => {
    if (video.dataset.loaded) return;
    const src = video.dataset.videoSrc;
    if (!src) return;
    video.src = src;
    video.dataset.loaded = "true";
    video.load();
    const play = video.play();
    if (play?.catch) play.catch(() => {});
  };
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadVideo(entry.target);
            videoObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "300px 0px",
      },
    );
    lazyVideos.forEach((video) => videoObserver.observe(video));
  } else {
    lazyVideos.forEach(loadVideo);
  }
}
/* ================================================================
   03. LOADER / SCROLL / MENU
   ================================================================ */
window.addEventListener("load", () =>
  setTimeout(() => $(".page-loader")?.classList.add("done"), 500),
);
const header = $("#header"),
  backTop = $("#backTop"),
  progress = $(".scroll-progress");
// Função: onScroll — on scroll
function onScroll() {
  const y = scrollY;
  header.classList.toggle("scrolled", y > 25);
  backTop.classList.toggle("show", y > 600);
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
}
addEventListener("scroll", onScroll, {
  passive: true,
});
onScroll();
const toggle = $("#menuToggle"),
  nav = $("#nav");
// Evento "click" em toggle?
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.classList.toggle("active", open);
  toggle.setAttribute("aria-expanded", open);
});
$$(".nav a").forEach((a) =>
  // Evento "click" em a
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.classList.remove("active");
    toggle?.setAttribute("aria-expanded", "false");
  }),
);
/* ================================================================
   04. REVEAL / MICROINTERAÇÕES
   ================================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);
$$("[data-reveal]").forEach((el, i) => {
  el.style.animationDelay = Math.min(i % 5, 4) * 70 + "ms";
  revealObserver.observe(el);
});
/* ================================================================
   05. EFEITOS MAGNÉTICOS / TILT
   ================================================================ */
$$(".tilt").forEach((card) => {
  // Evento "pointermove" em card
  card.addEventListener("pointermove", (e) => {
    if (innerWidth < 900) return;
    const r = card.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-8px)`;
  });
  // Evento "pointerleave" em card
  card.addEventListener("pointerleave", () => (card.style.transform = ""));
});
$$(".magnetic").forEach((btn) => {
  // Evento "pointermove" em btn
  btn.addEventListener("pointermove", (e) => {
    if (innerWidth < 900) return;
    const r = btn.getBoundingClientRect(),
      x = e.clientX - r.left - r.width / 2,
      y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.12}px,${y * 0.12}px)`;
  });
  // Evento "pointerleave" em btn
  btn.addEventListener("pointerleave", () => (btn.style.transform = ""));
});
/* ================================================================
   06. RASTREAMENTO / TELEMETRIA — DEMO PRONTA PARA API REAL
   ================================================================ */
const trackingResult = $("#trackingResult"),
  trackBtn = $("#trackBtn"),
  trackingInput = $("#trackingCode"),
  trackingHistory = $("#trackingHistory");
const trackingDatabase = {
  "NX-2026-45821": {
    vehicle: "NX-021",
    driver: "Carlos Mendes",
    origin: "São Paulo, SP",
    destination: "Curitiba, PR",
    status: "Em trânsito",
    progress: 68,
    eta: "18:40",
    speed: 74,
    events: [
      "Saiu do centro de distribuição de São Paulo",
      "Passou pelo posto de controle de Registro, SP",
      "Telemetria GPS sincronizada",
    ],
  },
  "NX-2026-45822": {
    vehicle: "NX-034",
    driver: "Rafael Souza",
    origin: "Campinas, SP",
    destination: "Joinville, SC",
    status: "Em trânsito",
    progress: 42,
    eta: "22:15",
    speed: 68,
    events: [
      "Carga conferida e liberada",
      "Veículo em rota pela BR-116",
      "Próxima parada programada: Curitiba",
    ],
  },
  "NX-2026-45823": {
    vehicle: "NX-018",
    driver: "Marcos Lima",
    origin: "Belo Horizonte, MG",
    destination: "São Paulo, SP",
    status: "Em trânsito",
    progress: 81,
    eta: "17:25",
    speed: 77,
    events: [
      "Última atualização via GPS",
      "Aproximando-se do destino",
      "Motorista recebeu rota atualizada",
    ],
  },
};
// Evento "click" em trackBtn?
trackBtn?.addEventListener("click", () => {
  const code = trackingInput.value.trim().toUpperCase(),
    data = trackingDatabase[code];
  if (!code) {
    trackingResult.innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i> Informe um código de rastreio.';
    trackingResult.style.color = "#ff8795";
    trackingInput.focus();
    return;
  }
  if (!data) {
    trackingResult.innerHTML =
      '<i class="fa-solid fa-circle-xmark"></i> Código não localizado. Verifique a remessa e tente novamente.';
    trackingResult.style.color = "#ff8795";
    trackingHistory.innerHTML = "";
    return;
  }
  trackingResult.style.color = "var(--green)";
  trackingResult.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.status} · ${data.vehicle} · ${data.progress}% da rota · ETA ${data.eta}`;
  trackingHistory.innerHTML = data.events
    .map(
      (event, i) =>
        `<div class="history-row"><small>${
          i === 0
            ? "AGORA"
            : `$ {
        i * 18
    }
    min atrás `
        }</small><b>${event}</b></div>`,
    )
    .join("");
});
// Evento "keydown" em trackingInput?
trackingInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    trackBtn.click();
  }
});
/* ================================================================
   07. GOOGLE MAPS / FROTA
   A posição da frota abaixo é simulada. Substitua `fleet` por sua API/WebSocket.
   ================================================================ */
const fleet = [
  {
    id: "NX-021",
    driver: "Carlos Mendes",
    from: [-23.5505, -46.6333],
    to: [-25.4284, -49.2733],
    progress: 0.68,
    speed: 74,
    status: "Em trânsito",
    destination: "Curitiba, PR",
  },
  {
    id: "NX-034",
    driver: "Rafael Souza",
    from: [-22.9056, -47.0608],
    to: [-26.3044, -48.8487],
    progress: 0.42,
    speed: 68,
    status: "Em trânsito",
    destination: "Joinville, SC",
  },
  {
    id: "NX-018",
    driver: "Marcos Lima",
    from: [-19.9167, -43.9345],
    to: [-23.5505, -46.6333],
    progress: 0.81,
    speed: 77,
    status: "Em trânsito",
    destination: "São Paulo, SP",
  },
];
let fleetMap = null;
let fleetMarkers = new Map();
let fleetInfoWindow = null;
let fleetRoutes = new Map();
let fleetInitialized = false;
// Função: interpolate — interpolate
function interpolate(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
// Função: toLatLng — to lat lng
function toLatLng(pos) {
  return {
    lat: pos[0],
    lng: pos[1],
  };
}
// Função: renderFleetList — render fleet list
function renderFleetList() {
  const list = $("#vehicleList");
  if (!list) return;
  list.innerHTML = fleet
    .map(
      (v, i) =>
        `<button class="vehicle-item ${i === 0 ? "active" : ""}" data-vehicle="${v.id}"><span class="vehicle-main"><span class="vehicle-icon"><i class="fa-solid fa-truck-fast"></i></span><span class="vehicle-name"><b>${v.id}</b><small>${v.driver}</small></span><span class="vehicle-online">● ONLINE</span></span><span class="vehicle-meta"><span><i class="fa-solid fa-gauge-high"></i>${v.speed} km/h</span><span><i class="fa-solid fa-route"></i>${Math.round(v.progress * 100)}%</span></span></button>`,
    )
    .join("");
  $$(".vehicle-item", list).forEach((btn) =>
    // Evento "click" em btn
    btn.addEventListener("click", () => {
      const v = fleet.find((x) => x.id === btn.dataset.vehicle);
      $$(".vehicle-item", list).forEach((x) =>
        x.classList.toggle("active", x === btn),
      );
      if (!v || !fleetMap) return;
      const pos = interpolate(v.from, v.to, v.progress);
      fleetMap.panTo(toLatLng(pos));
      fleetMap.setZoom(Math.max(fleetMap.getZoom(), 7));
      fleetInfoWindow?.setContent(buildFleetPopup(v));
      fleetInfoWindow?.open({
        map: fleetMap,
        anchor: fleetMarkers.get(v.id),
      });
    }),
  );
}
// Função: buildFleetPopup — build fleet popup
function buildFleetPopup(v) {
  return `<div class="gm-fleet-popup"><div class="popup-title">${v.id} · ${v.status}</div><div class="popup-meta"><b>${v.driver}</b><br>${v.speed} km/h · ${Math.round(v.progress * 100)}% da rota<br>Destino: ${v.destination}</div></div>`;
}
// Função: createFleetMarker — create fleet marker
function createFleetMarker(v) {
  const pos = interpolate(v.from, v.to, v.progress);
  const content = document.createElement("div");
  content.className = "fleet-marker online";
  content.innerHTML = '<i class="fa-solid fa-truck"></i>';
  content.setAttribute("aria-label", `${v.id} — ${v.driver}`);
  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: fleetMap,
    position: toLatLng(pos),
    title: `${v.id} — ${v.driver}`,
    content,
  });
  marker.addListener("click", () => {
    fleetInfoWindow.setContent(buildFleetPopup(v));
    fleetInfoWindow.open({
      map: fleetMap,
      anchor: marker,
    });
  });
  return marker;
}
let coverageMap = null;
let coverageInitialized = false;
// Função: coverageMessage — coverage message
function coverageMessage(title, text) {
  const el = $("#coverageMap");
  if (!el) return;
  el.innerHTML = `<div class="coverage-api-message"><strong>${title}</strong><span>${text}</span></div>`;
}
// Função: initCoverageMap — init coverage map
function initCoverageMap() {
  const el = $("#coverageMap");
  if (!el || coverageInitialized) return;
  if (!window.google?.maps) {
    coverageMessage(
      "Google Maps não carregado",
      "Adicione uma chave válida do Google Maps JavaScript API em js/config.js.",
    );
    return;
  }
  coverageMap = new google.maps.Map(el, {
    center: {
      lat: -14.235,
      lng: -51.9253,
    },
    zoom: 4.5,
    mapTypeId: "roadmap",
    gestureHandling: "greedy",
    fullscreenControl: true,
    streetViewControl: false,
    zoomControl: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT,
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
    },
    clickableIcons: false,
    backgroundColor: "#07121b",
  });
  coverageInitialized = true;
}
// Função: initGoogleMap — init google map
function initGoogleMap() {
  initCoverageMap();
  const el = $("#fleetMap");
  if (!el) return;
  if (!window.google?.maps) {
    renderMapFallback(
      "Google Maps não foi carregado.",
      "Confira a conexão e a configuração da API Key.",
    );
    return;
  }
  if (fleetInitialized) return;
  fleetMap = new google.maps.Map(el, {
    center: {
      lat: -23.5,
      lng: -47.8,
    },
    zoom: 6,
    mapId: window.NEXUS_CONFIG?.GOOGLE_MAP_ID || "DEMO_MAP_ID",
    mapTypeId: "roadmap",
    gestureHandling: "greedy",
    fullscreenControl: true,
    streetViewControl: true,
    zoomControl: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT,
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
    },
    clickableIcons: false,
    backgroundColor: "#0c101a",
  });
  fleetInfoWindow = new google.maps.InfoWindow({
    maxWidth: 260,
  });
  fleet.forEach((v) => {
    const marker = createFleetMarker(v);
    fleetMarkers.set(v.id, marker);
    const route = new google.maps.Polyline({
      map: fleetMap,
      path: [toLatLng(v.from), toLatLng(v.to)],
      geodesic: true,
      strokeColor: "#6366f1",
      strokeOpacity: 0.45,
      strokeWeight: 3,
    });
    fleetRoutes.set(v.id, route);
  });
  const bounds = new google.maps.LatLngBounds();
  fleet.forEach((v) => {
    bounds.extend(toLatLng(v.from));
    bounds.extend(toLatLng(v.to));
  });
  fleetMap.fitBounds(bounds, {
    top: 55,
    right: 55,
    bottom: 55,
    left: 55,
  });
  google.maps.event.addListenerOnce(fleetMap, "idle", () =>
    fleetMap.setZoom(Math.min(fleetMap.getZoom(), 7)),
  );
  fleetInitialized = true;
}
window.initGoogleMap = initGoogleMap;
// Função: renderMapFallback — render map fallback
function renderMapFallback(
  title = "Mapa indisponível",
  message = "Configure uma Google Maps API Key para ativar o rastreamento.",
) {
  const el = $("#fleetMap");
  if (!el) return;
  el.innerHTML = `<div class="map-fallback"><i class="fa-solid fa-map-location-dot"></i><b>${title}</b><span>${message}</span><small>js/config.js → GOOGLE_MAPS_API_KEY</small></div>`;
}
// Função: updateFleet — update fleet
function updateFleet() {
  fleet.forEach((v) => {
    v.progress = Math.min(0.99, v.progress + 0.0012);
    v.speed = Math.max(55, Math.round(v.speed + (Math.random() * 6 - 3)));
    const marker = fleetMarkers.get(v.id);
    if (marker) {
      const pos = interpolate(v.from, v.to, v.progress);
      marker.position = toLatLng(pos);
      marker.title = `${v.id} — ${v.driver} · ${v.speed} km/h`;
    }
  });
  const avg = Math.round(fleet.reduce((a, v) => a + v.speed, 0) / fleet.length),
    km = Math.round(1284 + fleet.reduce((a, v) => a + v.speed, 0) * 0.02);
  $("#metricSpeed") && ($("#metricSpeed").textContent = `${avg} km/h`);
  $("#metricKm") &&
    ($("#metricKm").textContent = `${km.toLocaleString("pt-BR")} km`);
  $("#lastSync") &&
    ($("#lastSync").textContent =
      `sincronizado às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`);
  renderFleetList();
  renderEvents();
}
// Função: renderEvents — render events
function renderEvents() {
  const box = $("#trackingEvents");
  if (!box) return;
  const events = [
    {
      icon: "location-dot",
      text: `NX-021 atualizou posição · ${Math.round(fleet[0].progress * 100)}% da rota`,
    },
    {
      icon: "gauge-high",
      text: `NX-034 em deslocamento · ${fleet[1].speed} km/h`,
    },
    {
      icon: "satellite-dish",
      text: `NX-018 telemetria GPS sincronizada`,
    },
  ];
  box.innerHTML = events
    .map(
      (e, i) =>
        `<div class="tracking-event"><span class="event-icon"><i class="fa-solid fa-${e.icon}"></i></span><div><b>${e.text}</b><small>Evento automático da central</small></div><time>${i + 1} min</time></div>`,
    )
    .join("");
}
renderFleetList();
renderEvents();
if ($("#coverageMap")) {
  const key = window.NEXUS_CONFIG?.GOOGLE_MAPS_API_KEY;
  if (key && key !== "COLOQUE_SUA_GOOGLE_MAPS_API_KEY_AQUI") {
    if (window.google?.maps) initCoverageMap();
  } else {
    coverageMessage(
      "Google Maps pronto para conexão",
      "Adicione sua API Key em js/config.js para ativar o mapa de cobertura.",
    );
  }
}
window.gm_authFailure = () =>
  coverageMessage(
    "Google Maps não autorizado",
    "A API Key é inválida, está sem faturamento ou não permite este domínio.",
  );
if ($("#fleetMap")) {
  const key = window.NEXUS_CONFIG?.GOOGLE_MAPS_API_KEY;
  if (key && key !== "COLOQUE_SUA_GOOGLE_MAPS_API_KEY_AQUI") {
    if (window.google?.maps) initGoogleMap();
    else
      window.addEventListener(
        "load",
        () => {
          if (!fleetInitialized && !window.google?.maps)
            renderMapFallback(
              "Google Maps não carregou.",
              "Verifique a API Key, faturamento e as APIs habilitadas no Google Cloud.",
            );
        },
        {
          once: true,
        },
      );
  } else {
    renderMapFallback(
      "Google Maps pronto para conexão",
      "Adicione sua API Key em js/config.js para ativar o mapa, satélite e rastreamento.",
    );
  }
  setInterval(() => {
    if (fleetInitialized) updateFleet();
  }, 5000);
}
/* ================================================================
   08. FORMULÁRIO / NAVEGAÇÃO / INTERAÇÕES
   ================================================================ */
$("#quoteForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = $("#formMessage");
  msg.textContent =
    "Solicitação registrada. Nossa equipe entrará em contato em breve.";
  e.target.reset();
});
$$("a[href^='#']").forEach((a) =>
  // Evento "click" em a
  a.addEventListener("click", (e) => {
    const target = $(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }),
);
const sections = $$("main section[id]"),
  navLinks = $$(".nav a");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + e.target.id,
          ),
        );
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
  },
);
sections.forEach((s) => sectionObserver.observe(s));
// Evento "click" em backTop?
backTop?.addEventListener("click", () =>
  scrollTo({
    top: 0,
    behavior: "smooth",
  }),
);
const glow = $(".cursor-glow");
addEventListener("pointermove", (e) => {
  if (innerWidth > 1000) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});
