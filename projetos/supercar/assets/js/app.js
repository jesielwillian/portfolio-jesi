// Main application — Supercar Gallery
const FALLBACK = ""; // No default image: add your files to assets/images/.
let selectedCarImage = null;
function optimizeImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/"))
      return reject(new Error("Selecione um arquivo de imagem válido."));
    if (file.size > 12 * 1024 * 1024)
      return reject(new Error("A imagem não pode ter mais de 12 MB."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Não foi possível ler a imagem."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () =>
        reject(new Error("Formato de imagem não compatível."));
      image.onload = () => {
        const maxSide = 1400;
        const scale = Math.min(
          1,
          maxSide / Math.max(image.width, image.height),
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/webp", 0.78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
function imgFallback(el) {
  el.onerror = null;
  el.removeAttribute("src");
  el.classList.add("is-empty");
  el.setAttribute("aria-label", "Imagem não adicionada");
}
const AVAILABLE_IMAGE_PATHS = new Set([
  "assets/images/banners/ferrari-499p.webp",
  "assets/images/vehicles/aston-martin-valkyrie.webp",
  "assets/images/vehicles/bugatti-chiron-super-sport.webp",
  "assets/images/vehicles/ferrari-sf90-stradale.webp",
  "assets/images/vehicles/koenigsegg-jesko-absolut.webp",
  "assets/images/vehicles/lamborghini-revuelto.webp",
  "assets/images/vehicles/mclaren-750s.webp",
  "assets/images/vehicles/pagani-huayra-r.webp",
  "assets/images/vehicles/porsche-911-turbo-s.webp",
  "assets/images/vehicles/rimac-nevera.webp",
]);
const HERO_FERRARI = {
  id: 10,
  name: "499P",
  brand: "Ferrari",
  year: 2023,
  price: 0,
  engine: "3.0L Twin-Turbo V6 Hybrid",
  horsepower: 680,
  top_speed: 211,
  zero_sixty: null,
  torque: "N/D",
  transmission: "7-Speed Sequential",
  drivetrain: "AWD",
  category: "Le Mans Hypercar",
  description:
    "Ferrari 499P, protótipo híbrido de competição desenvolvido para provas de endurance e para a categoria Hypercar do Campeonato Mundial de Endurance (WEC).",
  image_url: "assets/images/banners/ferrari-499p.webp",
};
const DEFAULT_CARS = [
  {
    id: 1,
    name: "SF90 Stradale",
    brand: "Ferrari",
    year: 2024,
    price: 625000,
    engine: "4.0L Twin-Turbo V8 Hybrid",
    horsepower: 986,
    top_speed: 211,
    zero_sixty: 2.5,
    torque: "590 lb-ft",
    transmission: "8-Speed DCT",
    drivetrain: "AWD",
    category: "Hipercarro híbrido",
    description:
      "O primeiro hipercarro híbrido plug-in da Ferrari. Três motores elétricos combinados a um V8 biturbo proporcionam uma condução silenciosa no modo elétrico e uma explosão brutal de 986 HP, com dirigibilidade extremamente precisa.",
    image_url: "assets/images/vehicles/ferrari-sf90-stradale.webp",
  },

  {
    id: 2,
    name: "Revuelto",
    brand: "Lamborghini",
    year: 2024,
    price: 608000,
    engine: "6.5L V12 Hybrid",
    horsepower: 1001,
    top_speed: 217,
    zero_sixty: 2.5,
    torque: "535 lb-ft",
    transmission: "8-Speed DCT",
    drivetrain: "AWD",
    category: "V12 Hybrid",
    description:
      "O sucessor do Aventador. Um V12 que chega a 9.500 rpm, combinado com três motores elétricos, monofuselagem de carbono e uma experiência digna de uma nave espacial, entregando 1.001 HP.",
    image_url: "assets/images/vehicles/lamborghini-revuelto.webp",
  },

  {
    id: 3,
    name: "750S",
    brand: "McLaren",
    year: 2024,
    price: 329000,
    engine: "4.0L Twin-Turbo V8",
    horsepower: 740,
    top_speed: 206,
    zero_sixty: 2.7,
    torque: "590 lb-ft",
    transmission: "7-Speed SSG",
    drivetrain: "RWD",
    category: "Supercar",
    description:
      "O modelo de produção mais leve e focado no motorista da McLaren. Direção hidráulica, Controle de Chassi Proativo e resposta brutal do motor V8 biturbo.",
    image_url: "assets/images/vehicles/mclaren-750s.webp",
  },

  {
    id: 6,
    name: "Jesko Absolut",
    brand: "Koenigsegg",
    year: 2024,
    price: 3000000,
    engine: "5.0L Twin-Turbo V8",
    horsepower: 1600,
    top_speed: 330,
    zero_sixty: 2.5,
    torque: "1106 lb-ft",
    transmission: "9-Speed LST",
    drivetrain: "RWD",
    category: "Megacar",
    description:
      "Desenvolvido para alcançar a maior velocidade possível. Coeficiente de arrasto de 0,278, 1.600 HP com E85 e uma revolucionária transmissão de 9 marchas Light Speed Transmission.",
    image_url: "assets/images/vehicles/koenigsegg-jesko-absolut.webp",
  },

  {
    id: 7,
    name: "Valkyrie",
    brand: "Aston Martin",
    year: 2024,
    price: 3200000,
    engine: "6.5L V12 Hybrid",
    horsepower: 1140,
    top_speed: 217,
    zero_sixty: 2.5,
    torque: "546 lb-ft",
    transmission: "7-Speed Sequential",
    drivetrain: "RWD",
    category: "Hipercarro de pista",
    description:
      "O carro de F1 de Adrian Newey para as ruas. V12 Cosworth capaz de atingir 11.000 rpm, aerodinâmica de efeito solo e 1.140 HP de pura intensidade.",
    image_url: "assets/images/vehicles/aston-martin-valkyrie.webp",
  },

  {
    id: 8,
    name: "Huayra R",
    brand: "Pagani",
    year: 2023,
    price: 3100000,
    engine: "6.0L NA V12",
    horsepower: 838,
    top_speed: 238,
    zero_sixty: 2.8,
    torque: "553 lb-ft",
    transmission: "6-Speed Sequential",
    drivetrain: "RWD",
    category: "Arte de pista",
    description:
      "Uma obra-prima com motor aspirado que chega a 9.000 rpm. Uma escultura artesanal em carbono e titânio que também entrega desempenho extremo.",
    image_url: "assets/images/vehicles/pagani-huayra-r.webp",
  },

  {
    id: 9,
    name: "Nevera",
    brand: "Rimac",
    year: 2024,
    price: 2400000,
    engine: "Quad-Motor Electric",
    horsepower: 1914,
    top_speed: 258,
    zero_sixty: 1.74,
    torque: "1696 lb-ft",
    transmission: "Single-Speed x4",
    drivetrain: "AWD",
    category: "Hipercarro elétrico",
    description:
      "O carro elétrico mais rápido do mundo. 1.914 HP, controle vetorial de torque 100 vezes por segundo e uma aceleração de 0 a 60 mph em apenas 1,74 segundo, capaz de deixar qualquer um sem fôlego.",
    image_url: "assets/images/vehicles/rimac-nevera.webp",
  },
];
let cars = [],
  favorites = [],
  isAdmin = false,
  editId = null,
  delId = null,
  compareTray = [],
  currentFile = "app.py";
let filters = {
  q: "",
  brand: "All",
  sort: "featured",
  maxPrice: 4000000,
  minHp: 0,
};
const $ = (id) => document.getElementById(id);
function fmt(n) {
  return Number(n) > 0 ? "$" + Number(n).toLocaleString() : "Sob consulta";
}
function load() {
  try {
    cars = JSON.parse(localStorage.getItem("sg_cars_v2")) || null;
  } catch (e) {
    cars = null;
  }
  if (!cars || !cars.length) {
    cars = [...DEFAULT_CARS];
  }
  cars = cars.filter(
    (car) =>
      car &&
      car.image_url &&
      (/^https?:\/\//i.test(car.image_url) ||
        /^data:image\//i.test(car.image_url) ||
        AVAILABLE_IMAGE_PATHS.has(car.image_url.split("?")[0])),
  );
  cars = cars.filter((car) => car.id !== HERO_FERRARI.id);
  cars.push({ ...HERO_FERRARI });
  const seenModels = new Set();
  cars = cars.filter((car) => {
    const key = `${String(car.brand).trim().toLowerCase()}|${String(car.name).trim().toLowerCase()}`;
    if (seenModels.has(key)) return false;
    seenModels.add(key);
    return true;
  });
  saveCars();
  try {
    favorites = JSON.parse(localStorage.getItem("sg_favs")) || [];
  } catch (e) {
    favorites = [];
  }
  favorites = favorites.filter((id) => cars.some((car) => car.id === id));
  isAdmin = sessionStorage.getItem("sg_admin") === "1";
}
function saveCars() {
  try {
    localStorage.setItem("sg_cars_v2", JSON.stringify(cars));
    return true;
  } catch (error) {
    console.error("Não foi possível salvar os veículos:", error);
    toast(
      "O armazenamento está cheio. Use imagens menores ou remova imagens antigas.",
      "error",
    );
    return false;
  }
}
function saveFavs() {
  localStorage.setItem("sg_favs", JSON.stringify(favorites));
}
function isFav(id) {
  return favorites.includes(id);
}
function toast(msg, type = "info") {
  const t = document.createElement("div");
  t.className =
    "toast " +
    (type === "success" ? "success" : type === "error" ? "error" : "");
  t.innerHTML = `<div class="text-lg">${type === "success" ? '<i class="fa-solid fa-check" aria-hidden="true"></i>' : type === "error" ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' : '<i class="fa-solid fa-circle-info" aria-hidden="true"></i>'}</div><div class="text-sm"><div class="font-semibold">${msg}</div><div class="text-[11px] font-mono text-gray-500 mt-0.5">${new Date().toLocaleTimeString()}</div></div>`;
  $("toasts").appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateX(30px)";
    setTimeout(() => t.remove(), 400);
  }, 3200);
}
function copyText(txt) {
  navigator.clipboard
    .writeText(txt)
    .then(() => toast("Copiado para a área de transferência!", "success"))
    .catch(() => toast("Falha ao copiar", "error"));
}
function openModal(id) {
  $(id).classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal(id) {
  $(id).classList.remove("active");
  document.body.style.overflow = "";
}
function goCar(id) {
  location.hash = "#/car/" + id;
}
function showView(name) {
  ["home", "cars", "details", "favorites", "login", "admin", "backend"].forEach(
    (v) => $("view-" + v).classList.add("hidden"),
  );
  $("view-" + name).classList.remove("hidden");
  document
    .querySelectorAll("[data-nav]")
    .forEach((a) => a.classList.toggle("active", a.dataset.nav === name));
  $("mobileMenu").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (window.gsap)
    gsap.fromTo(
      "#view-" + name,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("visible"));
}
function handleRoute() {
  const h = location.hash || "#/";
  if (h.startsWith("#/car/")) {
    const id = parseInt(h.split("/")[2]);
    renderDetails(id);
    showView("details");
  } else if (h === "#/cars") showView("cars");
  else if (h === "#/favorites") {
    renderFavs();
    showView("favorites");
  } else if (h === "#/login") showView("login");
  else if (h === "#/admin") {
    renderAdmin();
    showView("admin");
  } else if (h === "#/backend") showView("backend");
  else showView("home");
}
function brands() {
  return [...new Set(cars.map((c) => c.brand))].sort();
}
function filtered() {
  let r = [...cars];
  if (filters.q) {
    const q = filters.q.toLowerCase();
    r = r.filter((c) =>
      (c.name + " " + c.brand + " " + c.engine + " " + c.category)
        .toLowerCase()
        .includes(q),
    );
  }
  if (filters.brand !== "All") r = r.filter((c) => c.brand === filters.brand);
  r = r.filter(
    (c) => c.price <= filters.maxPrice && c.horsepower >= filters.minHp,
  );
  if (filters.sort === "price-asc") r.sort((a, b) => a.price - b.price);
  else if (filters.sort === "price-desc") r.sort((a, b) => b.price - a.price);
  else if (filters.sort === "hp-desc")
    r.sort((a, b) => a.horsepower - b.horsepower);
  else if (filters.sort === "speed-desc")
    r.sort((a, b) => a.top_speed - b.top_speed);
  else if (filters.sort === "year-desc") r.sort((a, b) => b.year - a.year);
  return r;
}
function cardHTML(c) {
  const fav = isFav(c.id) ? "active" : "";
  return `<article class="card rounded-3xl overflow-hidden">
<div class="relative h-52 overflow-hidden"><img src="${c.image_url}" onerror="imgFallback(this)" loading="lazy" class="image-zoom w-full h-full object-cover" alt="">
<div class="absolute top-3 left-3 flex gap-2"><span class="text-[10px] font-mono bg-black/70 backdrop-blur px-2.5 py-1 rounded-full border border-white/20">${c.brand.toUpperCase()}</span><span class="text-[10px] font-mono bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">${c.year}</span></div>
<button onclick="toggleFav(${c.id},this)" class="fav-heart ${fav} absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur border border-white/20 flex items-center justify-center hover:scale-110"><i class="${isFav(c.id) ? "fa-solid" : "fa-regular"} fa-heart text-xl" aria-hidden="true"></i></button>
<div class="absolute bottom-3 left-3 text-[10px] font-mono bg-amber-500 text-black font-bold px-2.5 py-1 rounded-full">${c.category || "Supercar"}</div></div>
<div class="p-5"><h3 class="font-display font-bold leading-tight">${c.brand} ${c.name}</h3>
<div class="flex gap-3 mt-2 text-[11px] font-mono text-gray-400"><span><i class="fa-solid fa-bolt" aria-hidden="true"></i> ${c.horsepower} HP</span><span><i class="fa-solid fa-rocket" aria-hidden="true"></i> ${c.top_speed} mph</span><span><i class="fa-solid fa-stopwatch" aria-hidden="true"></i> ${c.zero_sixty || "-"}s</span></div>
<div class="text-[11px] text-gray-500 mt-1 truncate">${c.engine}</div>
<div class="flex items-center justify-between mt-4"><div class="font-display font-bold text-amber-400">${fmt(c.price)}</div><div class="flex gap-2"><button onclick="quickView(${c.id})" class="btn-ghost rounded-lg px-3 py-2 text-xs"><i class="fa-solid fa-eye" aria-hidden="true"></i></button><button onclick="goCar(${c.id})" class="btn-gold rounded-lg px-4 py-2 text-xs">Detalhes</button></div></div>
<button onclick="addCompare(${c.id})" class="w-full mt-2 text-[11px] font-mono text-gray-500 hover:text-amber-400 border border-white/10 hover:border-amber-500/50 rounded-lg py-1.5 transition">+ COMPARE</button></div></article>`;
}
function renderDestaques() {
  const feat = [...cars].sort((a, b) => b.price - a.price).slice(0, 6);
  $("featuredGrid").innerHTML = feat.map(cardHTML).join("");
}
function renderCars() {
  const r = filtered();
  $("carsGrid").innerHTML = r.map(cardHTML).join("");
  $("noResults").classList.toggle("hidden", r.length > 0);
  $("resultCount").textContent = r.length;
  $("activeRoute").textContent =
    "/cars" +
    (filters.q ? "?q=" + encodeURIComponent(filters.q) : "") +
    (filters.brand !== "All"
      ? "&brand=" + encodeURIComponent(filters.brand)
      : "");
  renderTray();
}
function renderPills() {
  const b = ["All", ...brands()];
  $("brandPills").innerHTML = b
    .map(
      (x) =>
        `<button class="pill ${filters.brand === x ? "active" : ""}" onclick="setBrand('${x}')">${x}</button>`,
    )
    .join("");
  $("brandPillsInício").innerHTML = b
    .map(
      (x) =>
        `<button class="pill ${filters.brand === x ? "active" : ""}" onclick="setBrandHome('${x}')">${x}</button>`,
    )
    .join("");
}
function setBrand(b) {
  filters.brand = b;
  renderPills();
  renderCars();
}
function setBrandHome(b) {
  filters.brand = b;
  location.hash = "#/cars";
  renderPills();
  renderCars();
}
function resetFilters() {
  filters = {
    q: "",
    brand: "All",
    sort: "featured",
    maxPrice: 4000000,
    minHp: 0,
  };
  $("searchInput").value = "";
  $("sortSelect").value = "featured";
  syncCustomSelect($("sortSelect"));
  $("priceRange").value = 4000000;
  $("hpRange").value = 0;
  $("priceLabel").textContent = "$4,000,000";
  $("hpLabel").textContent = "0 HP";
  renderPills();
  renderCars();
  toast("Filtros redefinidos", "success");
}
function heroGo() {
  filters.q = $("heroSearch").value.trim();
  $("searchInput").value = filters.q;
  location.hash = "#/cars";
  renderCars();
}
function toggleFav(id, btn) {
  if (isFav(id)) {
    favorites = favorites.filter((f) => f !== id);
    toast("Removido dos favoritos");
  } else {
    favorites.push(id);
    toast(
      'Adicionado aos favoritos! <i class="fa-solid fa-heart" aria-hidden="true"></i>',
      "success",
    );
  }
  saveFavs();
  updateBadges();
  document.querySelectorAll(".fav-heart").forEach(() => {});
  if (btn) {
    btn.classList.add("pop");
    setTimeout(() => btn.classList.remove("pop"), 400);
  }
  renderCars();
  renderDestaques();
  if (!$("view-favorites").classList.contains("hidden")) renderFavs();
  syncHearts();
}
function syncHearts() {}
function updateBadges() {
  $("favBadge").textContent = favorites.length;
  $("favBadgeM").textContent = favorites.length;
  $("authLabel").textContent = isAdmin
    ? 'admin <i class="fa-solid fa-circle" aria-hidden="true"></i>'
    : "visitante";
  $("loginBtn").textContent = isAdmin ? "Dashboard →" : "Acesso administrativo";
}
function quickView(id) {
  const c = cars.find((x) => x.id === id);
  if (!c) return;
  $("quickBody").innerHTML =
    `<img src="${c.image_url}" onerror="imgFallback(this)" class="image-zoom w-full h-44 object-contain bg-black/30"><div class="p-6"><div class="flex items-start justify-between gap-3"><div><div class="text-[11px] font-mono text-amber-400">${c.brand.toUpperCase()} • ${c.year}</div><h3 class="font-display font-bold text-xl mt-1">${c.name}</h3></div><button onclick="closeModal('quickModal')" class="text-gray-400 hover:text-white text-xl"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div><p class="text-sm text-gray-400 mt-3 leading-relaxed">${c.description}</p><div class="grid grid-cols-3 gap-2 mt-4 text-center"><div class="bg-white/5 rounded-xl p-3"><div class="font-display font-bold text-amber-400">${c.horsepower}</div><div class="text-[10px] font-mono text-gray-500">HP</div></div><div class="bg-white/5 rounded-xl p-3"><div class="font-display font-bold text-amber-400">${c.top_speed}</div><div class="text-[10px] font-mono text-gray-500">MPH</div></div><div class="bg-white/5 rounded-xl p-3"><div class="font-display font-bold text-green-400">${fmt(c.price)}</div><div class="text-[10px] font-mono text-gray-500">PRICE</div></div></div><div class="flex gap-2 mt-5"><button onclick="closeModal('quickModal');goCar(${c.id})" class="btn-gold rounded-xl flex-1 py-2.5 text-sm">Full Details</button><button onclick="toggleFav(${c.id},this)" class="btn-ghost rounded-xl px-5 py-2.5 text-sm"><i class="fa-solid fa-heart" aria-hidden="true"></i></button></div></div>`;
  openModal("quickModal");
}
function renderDetails(id) {
  const c =
    id === HERO_FERRARI.id ? HERO_FERRARI : cars.find((x) => x.id === id);
  if (!c) {
    $("detailsWrap").innerHTML =
      `<div class="text-center py-20"><h3 class="font-display text-2xl font-bold">Carro não encontrado</h3><a href="#/cars" class="btn-gold rounded-xl px-6 py-2.5 text-sm mt-5 inline-block">Voltar à garagem</a></div>`;
    return;
  }
  const hpPct = Math.min(100, Math.round(((c.horsepower || 0) / 1914) * 100));
  const spPct = Math.min(100, Math.round(((c.top_speed || 0) / 330) * 100));
  const sameModel = (a, b) =>
    String(a.brand).trim().toLowerCase() ===
      String(b.brand).trim().toLowerCase() &&
    String(a.name).trim().toLowerCase() === String(b.name).trim().toLowerCase();
  const uniqueCars = (list) =>
    list.filter(
      (car, index, all) =>
        all.findIndex((item) => sameModel(item, car)) === index,
    );
  const availableCars = uniqueCars(
    cars.filter((x) => x.id !== c.id && !sameModel(x, c)),
  );
  const rel = availableCars.filter((x) => x.brand === c.brand).slice(0, 3);
  const more = rel.length ? rel : availableCars.slice(0, 3);
  $("detailsWrap").innerHTML =
    `<a href="#/cars" class="text-sm text-gray-400 hover:text-amber-400"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Voltar à garagem</a> <span class="font-mono text-xs text-gray-600">/ GET /car/${c.id} • SELECT * FROM cars WHERE id = ${c.id}</span>
<div class="grid lg:grid-cols-2 gap-8 mt-5">
<div><div class="card details-visual rounded-3xl overflow-hidden"><img src="${c.image_url}" onerror="imgFallback(this)" class="image-zoom details-image w-full aspect-[1.46] object-cover bg-black/25"></div>
<div class="grid grid-cols-3 gap-3 mt-4"><div class="card rounded-2xl p-4 text-center"><div class="text-[10px] font-mono text-gray-500">ENGINE</div><div class="text-xs font-semibold mt-1">${c.engine}</div></div><div class="card rounded-2xl p-4 text-center"><div class="text-[10px] font-mono text-gray-500">TRANSMISSION</div><div class="text-xs font-semibold mt-1">${c.transmission || "DCT"}</div></div><div class="card rounded-2xl p-4 text-center"><div class="text-[10px] font-mono text-gray-500">DRIVETRAIN</div><div class="text-xs font-semibold mt-1">${c.drivetrain || "AWD"}</div></div></div></div>
<div><div class="flex items-center gap-2"><span class="text-[11px] font-mono bg-amber-500 text-black font-bold px-3 py-1 rounded-full">${(c.category || "SUPERCAR").toUpperCase()}</span><span class="text-[11px] font-mono border border-white/20 px-3 py-1 rounded-full">${c.year}</span><span class="text-[11px] font-mono border border-white/20 px-3 py-1 rounded-full">${c.brand.toUpperCase()}</span></div>
<h1 class="font-display text-3xl md:text-5xl font-black mt-3">${c.brand} <span class="text-grad">${c.name}</span></h1>
<p class="text-gray-400 text-sm mt-4 leading-relaxed">${c.description}</p>
<div class="font-display text-3xl font-bold text-amber-400 mt-5">${c.price ? fmt(c.price) : "Preço sob consulta"}</div>
<div class="mt-5 space-y-4">
<div><div class="flex justify-between text-xs font-mono mb-1.5"><span class="text-gray-400">HORSEPOWER</span><span class="text-amber-400 font-bold">${c.horsepower} HP</span></div><div class="spec-bar"><div data-w="${hpPct}"></div></div></div>
<div><div class="flex justify-between text-xs font-mono mb-1.5"><span class="text-gray-400">VELOCIDADE MÁXIMA</span><span class="text-amber-400 font-bold">${c.top_speed ? c.top_speed + " MPH" : "N/D"}</span></div><div class="spec-bar"><div data-w="${spPct}"></div></div></div>
<div class="grid grid-cols-3 gap-3 text-center">
<div class="bg-white/5 rounded-2xl p-4"><div class="font-display font-bold text-lg">${c.zero_sixty ? c.zero_sixty + "s" : "N/D"}</div><div class="text-[10px] font-mono text-gray-500">0-60</div></div>
<div class="bg-white/5 rounded-2xl p-4"><div class="font-display font-bold text-lg">${c.torque || "N/D"}</div><div class="text-[10px] font-mono text-gray-500">TORQUE</div></div>
<div class="bg-white/5 rounded-2xl p-4"><div class="font-display font-bold text-lg">${c.year}</div><div class="text-[10px] font-mono text-gray-500">MODEL</div></div></div></div>
<div class="flex flex-wrap gap-3 mt-6"><button onclick="toggleFav(${c.id},this)" class="fav-heart ${isFav(c.id) ? "active" : ""} btn-ghost rounded-xl px-6 py-3 text-sm font-semibold">${isFav(c.id) ? '<i class="fa-solid fa-heart" aria-hidden="true"></i> Saved' : '<i class="fa-regular fa-heart" aria-hidden="true"></i> Save Favorite'}</button><button onclick="acesseDrive(${c.id})" class="btn-gold rounded-xl px-6 py-3 text-sm">Agendar Test drive</button><button onclick="addCompare(${c.id});openModal('compareModal');initCompare()" class="btn-ghost rounded-xl px-6 py-3 text-sm"><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> Compare</button></div>
<div class="mt-4 text-[11px] font-mono text-gray-600">POST /favorites/add/${c.id} • Flask session + SQLite INSERT</div></div></div>
<div class="mt-12"><h3 class="font-display font-bold text-xl">Related <span class="text-grad">Máquinas</span></h3><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">${more.map(cardHTML).join("")}</div></div>`;
  setTimeout(
    () =>
      document
        .querySelectorAll("#detailsWrap .spec-bar > div")
        .forEach((d) => (d.style.width = d.dataset.w + "%")),
    80,
  );
}
function acesseDrive(id) {
  const c = cars.find((x) => x.id === id);
  $("driveCarName").textContent = c
    ? c.brand + " " + c.name + " • " + fmt(c.price)
    : "";
  $("driveForm").dataset.car = id;
  openModal("driveModal");
}
function renderFavs() {
  const list = cars.filter((c) => favorites.includes(c.id));
  $("favGrid").innerHTML = list
    .map(
      (c) =>
        `<article class="card rounded-3xl overflow-hidden"><div class="relative h-48 overflow-hidden"><img src="${c.image_url}" onerror="imgFallback(this)" class="image-zoom w-full h-full object-cover"><button onclick="toggleFav(${c.id},this)" class="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold rounded-full px-3 py-1.5 hover:bg-red-500">Remove <i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div><div class="p-5"><h3 class="font-display font-bold">${c.brand} ${c.name}</h3><div class="text-[11px] font-mono text-gray-400 mt-1">${c.horsepower} HP • ${c.top_speed} mph</div><div class="flex items-center justify-between mt-3"><span class="font-display text-amber-400 font-bold">${fmt(c.price)}</span><button onclick="goCar(${c.id})" class="btn-gold rounded-lg px-4 py-2 text-xs">Details</button></div></div></article>`,
    )
    .join("");
  $("favEmpty").style.display = list.length ? "none" : "";
  const val = list.reduce((s, c) => s + c.price, 0),
    hp = list.reduce((s, c) => s + c.horsepower, 0);
  $("favCountStat").textContent = list.length;
  $("favValueStat").textContent = fmt(val);
  $("favHpStat").textContent = hp.toLocaleString() + " HP";
}
function clearFavs() {
  if (!favorites.length) {
    toast("Não há favoritos para limpar");
    return;
  }
  favorites = [];
  saveFavs();
  updateBadges();
  renderFavs();
  renderCars();
  renderDestaques();
  toast("Favoritos removidos", "success");
}
function exportFavs() {
  const list = cars.filter((c) => favorites.includes(c.id));
  const blob = new Blob([JSON.stringify(list, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "supercar-favorites.json";
  a.click();
  toast("Favoritos exported!", "success");
}
function fillDemo() {
  $("loginUser").value = "admin";
  $("loginPass").value = "admin123";
}
function togglePass() {
  const i = $("loginPass");
  i.type = i.type === "password" ? "text" : "password";
}
function renderAdmin() {
  const w = $("adminWrap");
  if (!isAdmin) {
    w.innerHTML = `<div class="max-w-md mx-auto card rounded-3xl p-10 text-center"><div class="text-5xl"><i class="fa-solid fa-lock" aria-hidden="true"></i></div><h2 class="font-display text-2xl font-bold mt-4">Acesso administrativo bloqueado</h2><p class="text-sm text-gray-400 mt-2">Flask <span class="font-mono text-amber-300">@login_required</span> bloqueou esta rota. Faça login para continuar.</p><a href="#/login" class="btn-gold rounded-xl px-6 py-3 text-sm mt-6 inline-block">Go to Login</a><div class="text-[11px] font-mono text-gray-600 mt-4">demo: admin / admin123</div></div>`;
    return;
  }
  const total = cars.reduce((s, c) => s + c.price, 0),
    avg = Math.round(
      cars.reduce((s, c) => s + c.horsepower, 0) / Math.max(1, cars.length),
    );
  w.innerHTML = `<div class="flex flex-wrap items-end justify-between gap-4"><div><div class="font-mono text-xs text-amber-400">/// FLASK ROUTE: GET /admin • session['admin']=${"admin"}</div><h2 class="font-display text-3xl md:text-4xl font-black mt-2">Admin <span class="text-grad">Dashboard</span></h2></div><div class="flex gap-2"><button onclick="acesseCarForm('add')" class="btn-gold rounded-xl px-5 py-2.5 text-sm">+ Adicionar carro</button><button onclick="logout()" class="btn-ghost rounded-xl px-5 py-2.5 text-sm">Logout</button></div></div>
<div class="grid sm:grid-cols-4 gap-4 mt-6">
<div class="card rounded-2xl p-5"><div class="text-xs font-mono text-gray-400">TOTAL CARS</div><div class="font-display text-3xl font-bold text-amber-400">${cars.length}</div><div class="text-[11px] font-mono text-gray-500">SELECT COUNT(*)</div></div>
<div class="card rounded-2xl p-5"><div class="text-xs font-mono text-gray-400">VALOR DA FROTA</div><div class="font-display text-2xl font-bold text-green-400">${fmt(total)}</div><div class="text-[11px] font-mono text-gray-500">SUM(price)</div></div>
<div class="card rounded-2xl p-5"><div class="text-xs font-mono text-gray-400">AVG POWER</div><div class="font-display text-3xl font-bold">${avg} <span class="text-sm">HP</span></div><div class="text-[11px] font-mono text-gray-500">AVG(horsepower)</div></div>
<div class="card rounded-2xl p-5"><div class="text-xs font-mono text-gray-400">FAVORITES</div><div class="font-display text-3xl font-bold text-pink-500">${favorites.length}</div><div class="text-[11px] font-mono text-gray-500">JOIN favorites</div></div></div>
<div class="card rounded-3xl mt-6 overflow-hidden"><div class="p-4 border-b border-white/10 flex flex-wrap gap-3 items-center justify-between"><div class="font-display text-sm font-bold tracking-widest">INVENTORY • cars TABLE</div><input id="adminSearch" placeholder="Filter inventory..." class="!w-56 !py-2 text-sm" oninput="renderAdminRows(this.value)"></div><div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>ID</th><th>Car</th><th>Year</th><th>Price</th><th>HP</th><th>Top</th><th>Actions</th></tr></thead><tbody id="adminRows"></tbody></table></div></div>
<div class="grid md:grid-cols-2 gap-4 mt-5"><div class="card rounded-2xl p-5"><div class="font-display text-xs font-bold tracking-widest text-gray-400">DATABASE SCHEMA (SQLite)</div><pre class="font-mono text-[11px] text-gray-400 mt-3 leading-6">cars(id, name, brand, year, price,
     engine, horsepower, top_speed,
     description, image_url)
favorites(id, car_id, created_at)
admin(id, username, password#hash)</pre></div>
<div class="card rounded-2xl p-5"><div class="font-display text-xs font-bold tracking-widest text-gray-400">CRUD = PARAMETERIZED QUERIES</div><pre class="font-mono text-[11px] text-green-400 mt-3 leading-6">INSERT INTO cars(...) VALUES(?,?,?,?,?)
UPDATE cars SET price=? WHERE id=?
DELETE FROM cars WHERE id=?</pre><div class="text-[11px] text-gray-500 mt-2">Werkzeug: generate_password_hash / check_password_hash</div></div></div>`;
  renderAdminRows("");
}
function renderAdminRows(q) {
  const rows = cars.filter(
    (c) => !q || (c.name + c.brand).toLowerCase().includes(q.toLowerCase()),
  );
  $("adminRows").innerHTML =
    rows
      .map(
        (c) =>
          `<tr><td class="font-mono text-gray-500">#${c.id}</td><td><div class="flex items-center gap-3"><span class="admin-image-frame"><img src="${c.image_url}" onerror="imgFallback(this)" class="image-zoom w-14 h-10 object-cover rounded-lg border border-white/10"></span><div><div class="font-semibold text-white">${c.brand} ${c.name}</div><div class="text-[11px] text-gray-500 truncate max-w-[220px]">${c.engine}</div></div></div></td><td class="font-mono">${c.year}</td><td class="font-semibold text-amber-400">${fmt(c.price)}</td><td>${c.horsepower}</td><td>${c.top_speed}</td><td><div class="flex gap-2"><button onclick="acesseCarForm('edit',${c.id})" class="text-xs bg-sky-600/20 border border-sky-500/40 text-sky-300 rounded-lg px-3 py-1.5 hover:bg-sky-600/40">Edit</button><button onclick="askExcluir(${c.id})" class="text-xs bg-red-600/20 border border-red-500/40 text-red-300 rounded-lg px-3 py-1.5 hover:bg-red-600/40">Excluir</button></div></td></tr>`,
      )
      .join("") ||
    `<tr><td colspan="7" class="text-center py-8 text-gray-500">Nenhum carro corresponde aos filtros.</td></tr>`;
}
function logout() {
  isAdmin = false;
  sessionStorage.removeItem("sg_admin");
  updateBadges();
  location.hash = "#/";
  toast("Sessão encerrada", "success");
}
function acesseCarForm(mode, id) {
  selectedCarImage = null;
  $("fImageFile").value = "";
  editId = mode === "edit" ? id : null;
  const c = mode === "edit" ? cars.find((x) => x.id === id) : null;
  $("carFormTitle").textContent =
    mode === "edit" ? "Editar veículo #" + id : "Adicionar novo carro";
  $("carSubmit").textContent =
    mode === "edit" ? "Atualizar veículo" : "Adicionar carro";
  $("fName").value = c?.name || "";
  $("fBrand").value = c?.brand || "";
  $("fYear").value = c?.year || "";
  $("fPrice").value = c?.price || "";
  $("fEngine").value = c?.engine || "";
  $("fHp").value = c?.horsepower || "";
  $("fSpeed").value = c?.top_speed || "";
  $("fZero").value = c?.zero_sixty || "";
  $("fCat").value = c?.category || "";
  $("fImg").value = c?.image_url || "";
  $("fDesc").value = c?.description || "";
  if (c?.image_url) {
    $("fPreview").src = c.image_url;
    $("fPreview").classList.remove("is-empty");
  } else {
    $("fPreview").removeAttribute("src");
    $("fPreview").classList.add("is-empty");
  }
  $("carErr").classList.add("hidden");
  $("brandList").innerHTML = brands()
    .map((b) => `<option value="${b}">`)
    .join("");
  openModal("carModal");
}
function askExcluir(id) {
  const c = cars.find((x) => x.id === id);
  delId = id;
  $("delName").textContent = c ? c.brand + " " + c.name : "";
  openModal("delModal");
}
function addCompare(id) {
  if (compareTray.includes(id)) {
    toast("Este carro já está na lista de comparação");
    return;
  }
  if (compareTray.length >= 2) compareTray.shift();
  compareTray.push(id);
  renderTray();
  toast("Adicionado à comparação (" + compareTray.length + "/2)", "success");
}
function renderTray() {
  const t = $("compareTray");
  if (!compareTray.length) {
    t.classList.add("hidden");
    return;
  }
  t.classList.remove("hidden");
  t.innerHTML =
    `<span class="text-xs font-mono text-gray-400"><i class="fa-solid fa-scale-balanced" aria-hidden="true"></i> COMPARAR (${compareTray.length}/2):</span>` +
    compareTray
      .map((id) => {
        const c = cars.find((x) => x.id === id);
        return c
          ? `<span class="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1.5">${c.brand} ${c.name} <button onclick="compareTray=compareTray.filter(x=>x!==${id});renderTray()" class="text-red-400 ml-1"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></span>`
          : "";
      })
      .join("") +
    `<button onclick="openModal('compareModal');initCompare()" class="btn-gold rounded-lg px-4 py-1.5 text-xs ml-auto">Comparar agora →</button>`;
}

function closeCustomSelect(wrapper) {
  if (!wrapper) return;
  wrapper.classList.remove("is-open");
  const trigger = wrapper.querySelector(".custom-select__trigger");
  if (trigger) trigger.setAttribute("aria-expanded", "false");
}
function syncCustomSelect(select) {
  const wrapper = select?.closest(".custom-select");
  if (!wrapper) return;
  const trigger = wrapper.querySelector(".custom-select__trigger");
  const value = wrapper.querySelector(".custom-select__value");
  const menu = wrapper.querySelector(".custom-select__menu");
  const selected = select.options[select.selectedIndex];
  value.textContent = selected
    ? selected.textContent.trim()
    : "Selecione uma opção";
  menu.innerHTML = Array.from(select.options)
    .map(
      (option, index) =>
        `<button type="button" class="custom-select__option" role="option" data-index="${index}" aria-selected="${option.selected}" ${option.disabled ? "disabled" : ""}>${option.textContent.trim()}</button>`,
    )
    .join("");
  menu.querySelectorAll(".custom-select__option").forEach((optionButton) => {
    optionButton.addEventListener("click", () => {
      const option = select.options[Number(optionButton.dataset.index)];
      if (!option || option.disabled) return;
      select.selectedIndex = Number(optionButton.dataset.index);
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncCustomSelect(select);
      closeCustomSelect(wrapper);
      trigger.focus();
    });
  });
  trigger.disabled = select.disabled;
}
function enhanceSelect(select) {
  if (!select || select.dataset.customized === "true") return;
  const wrapper = document.createElement("div");
  wrapper.className = "custom-select";
  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  select.classList.add("custom-select__native");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");
  select.dataset.customized = "true";
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "custom-select__trigger";
  trigger.setAttribute("role", "combobox");
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.innerHTML =
    '<span class="custom-select__value"></span><span class="custom-select__chevron" aria-hidden="true"></span>';
  const menu = document.createElement("div");
  menu.className = "custom-select__menu";
  menu.setAttribute("role", "listbox");
  wrapper.append(trigger, menu);
  trigger.addEventListener("click", () => {
    const willOpen = !wrapper.classList.contains("is-open");
    document
      .querySelectorAll(".custom-select.is-open")
      .forEach(closeCustomSelect);
    if (willOpen) {
      wrapper.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
  trigger.addEventListener("keydown", (event) => {
    if (["ArrowDown", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      wrapper.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      const current =
        menu.querySelector('[aria-selected="true"]:not(:disabled)') ||
        menu.querySelector(".custom-select__option:not(:disabled)");
      current?.focus();
    }
  });
  menu.addEventListener("keydown", (event) => {
    const options = [
      ...menu.querySelectorAll(".custom-select__option:not(:disabled)"),
    ];
    const currentIndex = options.indexOf(document.activeElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      options[
        Math.max(
          0,
          Math.min(
            options.length - 1,
            currentIndex + (event.key === "ArrowDown" ? 1 : -1),
          ),
        )
      ]?.focus();
    } else if (event.key === "Escape") {
      closeCustomSelect(wrapper);
      trigger.focus();
    } else if (event.key === "Tab") {
      closeCustomSelect(wrapper);
    }
  });
  select.addEventListener("change", () => syncCustomSelect(select));
  const observer = new MutationObserver(() => syncCustomSelect(select));
  observer.observe(select, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  syncCustomSelect(select);
}
function initCustomSelects() {
  document.querySelectorAll("select").forEach(enhanceSelect);
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".custom-select"))
      document
        .querySelectorAll(".custom-select.is-open")
        .forEach(closeCustomSelect);
  });
}

function initCompare() {
  const opts = cars
    .map(
      (c) =>
        `<option value="${c.id}">${c.brand} ${c.name} — ${c.horsepower}HP</option>`,
    )
    .join("");
  $("cmpA").innerHTML = opts;
  $("cmpB").innerHTML = opts;
  if (compareTray[0]) $("cmpA").value = compareTray[0];
  if (compareTray[1]) $("cmpB").value = compareTray[1];
  else if (cars[4]) $("cmpB").value = cars[4].id;
}
function runCompare() {
  const a = cars.find((x) => x.id == $("cmpA").value),
    b = cars.find((x) => x.id == $("cmpB").value);
  if (!a || !b) return;
  const row = (l, av, bv, fmt2) => {
    const aw = av >= bv,
      bw = bv > av;
    return `<tr><td class="p-3 text-gray-400 text-xs font-mono">${l}</td><td class="p-3 text-center font-bold ${aw ? "compare-win rounded-lg text-green-300" : "text-white"}">${fmt2(av)}</td><td class="p-3 text-center font-bold ${bw ? "compare-win rounded-lg text-green-300" : "text-white"}">${fmt2(bv)}</td></tr>`;
  };
  $("cmpResult").innerHTML =
    `<div class="grid grid-cols-[1fr_1fr_1fr] gap-2 items-stretch mb-3"><div></div><div class="rounded-2xl overflow-hidden border border-white/10"><img src="${a.image_url}" onerror="imgFallback(this)" class="image-zoom h-28 w-full object-cover"><div class="p-2 text-xs font-bold text-center">${a.brand} ${a.name}</div></div><div class="rounded-2xl overflow-hidden border border-white/10"><img src="${b.image_url}" onerror="imgFallback(this)" class="image-zoom h-28 w-full object-cover"><div class="p-2 text-xs font-bold text-center">${b.brand} ${b.name}</div></div></div><table class="w-full text-sm border border-white/10 rounded-2xl overflow-hidden">${row("PRICE", a.price, b.price, (v) => fmt(v)) + row("POWER", a.horsepower, b.horsepower, (v) => v + " HP") + row("VELOCIDADE MÁXIMA", a.top_speed, b.top_speed, (v) => v + " mph") + row("0-60", a.zero_sixty || 9, b.zero_sixty || 9, (v) => v + "s").replaceAll("compare-win", "") + row("YEAR", a.year, b.year, (v) => v)}</table><div class="mt-3 text-center text-sm"><i class="fa-solid fa-trophy" aria-hidden="true"></i> Overall: <b class="text-amber-400">${a.horsepower + a.top_speed > b.horsepower + b.top_speed ? a.brand + " " + a.name : b.brand + " " + b.name}</b> wins on combined performance</div>`;
}
/* backend viewer */
const FILE_ORDER = [
  "app.py",
  "requirements.txt",
  "README.md",
  "templates/base.html",
  "templates/index.html",
  "templates/cars.html",
  "templates/car_details.html",
  "templates/favorites.html",
  "templates/login.html",
  "templates/admin.html",
  "static/css/style.css",
  "static/js/script.js",
];
const SRC_MAP = {
  "app.py": "src-app-py",
  "requirements.txt": "src-requirements",
  "README.md": "src-readme",
  "templates/base.html": "src-base",
  "templates/index.html": "src-index",
  "templates/cars.html": "src-cars",
  "templates/car_details.html": "src-details",
  "templates/favorites.html": "src-favorites",
  "templates/login.html": "src-login",
  "templates/admin.html": "src-admin",
  "static/css/style.css": "src-css",
  "static/js/script.js": "src-js",
};
function fileContent(f) {
  const el = document.getElementById(SRC_MAP[f]);
  if (!el) return "";
  return el.textContent
    .replaceAll("<\\/script>", "</scr" + "ipt>")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}
function loadFile(f) {
  currentFile = f;
  document
    .querySelectorAll(".filebtn")
    .forEach((b) => b.classList.toggle("active", b.dataset.f === f));
  $("fileTitle").textContent = f;
  $("codePre").textContent = fileContent(f);
  $("fileMeta").textContent =
    fileContent(f).split("\n").length +
    " lines • " +
    new Blob([fileContent(f)]).size +
    " bytes";
}
function downloadCurrent() {
  const blob = new Blob([fileContent(currentFile)], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = currentFile.split("/").pop();
  a.click();
  toast("Baixado " + currentFile, "success");
}
async function downloadZip() {
  try {
    toast("Building projeto zip...");
    const zip = new JSZip();
    FILE_ORDER.forEach((f) => zip.file(f, fileContent(f)));
    zip.file(
      "supercar-gallery-download-note.txt",
      "Execute: pip install -r requirements.txt && python app.py",
    );
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "supercar-gallery.zip";
    a.click();
    toast("Projeto .zip downloaded!", "success");
  } catch (e) {
    toast("Falha ao gerar o ZIP — use os botões de cópia", "error");
  }
}
/* init */
document.addEventListener("DOMContentLoaded", () => {
  let p = 0;
  const li = setInterval(() => {
    p = Math.min(100, p + 14);
    $("loadbar").style.width = p + "%";
    if (p >= 100) {
      clearInterval(li);
      setTimeout(() => {
        $("loader").style.opacity = "0";
        setTimeout(() => $("loader").remove(), 500);
      }, 250);
    }
  }, 120);
  load();
  updateBadges();
  renderPills();
  renderDestaques();
  renderCars();
  renderFavs();
  $("brandMarquee").innerHTML = [...brands(), ...brands()]
    .map(
      (b) =>
        `<span><i class="fa-solid fa-diamond" aria-hidden="true"></i> ${b.toUpperCase()}</span>`,
    )
    .join("");
  $("fileTree").innerHTML = FILE_ORDER.map(
    (f, i) =>
      `<button class="filebtn ${i === 0 ? "active" : ""}" data-f="${f}" onclick="loadFile('${f}')"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> ${f}</button>`,
  ).join("");
  loadFile("app.py");
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
  initCustomSelects();
  $("searchInput").addEventListener("input", (e) => {
    filters.q = e.target.value.trim();
    renderCars();
  });
  $("sortSelect").addEventListener("change", (e) => {
    filters.sort = e.target.value;
    renderCars();
  });
  $("priceRange").addEventListener("input", (e) => {
    filters.maxPrice = +e.target.value;
    $("priceLabel").textContent = fmt(filters.maxPrice);
    renderCars();
  });
  $("hpRange").addEventListener("input", (e) => {
    filters.minHp = +e.target.value;
    $("hpLabel").textContent = filters.minHp + " HP";
    renderCars();
  });
  $("heroSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") heroGo();
  });
  $("fImageFile").addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      selectedCarImage = await optimizeImage(file);
      $("fPreview").src = selectedCarImage;
      $("fPreview").classList.remove("is-empty");
      toast("Imagem enviada e otimizada.", "success");
    } catch (error) {
      selectedCarImage = null;
      e.target.value = "";
      toast(error.message || "Falha ao enviar a imagem.", "error");
    }
  });
  $("burger").addEventListener("click", () =>
    $("mobileMenu").classList.toggle("hidden"),
  );
  document
    .querySelectorAll("#mobileMenu a")
    .forEach((a) =>
      a.addEventListener("click", () =>
        $("mobileMenu").classList.add("hidden"),
      ),
    );
  $("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = $("loginUser").value.trim(),
      pw = $("loginPass").value;
    $("e-user").classList.toggle("hidden", !!u);
    $("e-pass").classList.toggle("hidden", pw.length >= 6);
    $("loginUser").classList.toggle("err", !u);
    $("loginPass").classList.toggle("err", pw.length < 6);
    if (!u || pw.length < 6) return;
    if (u === "admin" && pw === "admin123") {
      isAdmin = true;
      sessionStorage.setItem("sg_admin", "1");
      updateBadges();
      location.hash = "#/admin";
      toast("Bem-vindo de volta, administrador!", "success");
    } else {
      $("loginError").classList.remove("hidden");
      $("loginForm").classList.add("shake");
      setTimeout(() => $("loginForm").classList.remove("shake"), 450);
      toast("Credenciais inválidas", "error");
    }
  });
  $("driveForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("dName").value.trim(),
      em = $("dEmail").value.trim(),
      ph = $("dPhone").value.trim();
    const errs = [];
    if (n.length < 2) errs.push("Digite seu nome completo.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))
      errs.push("Digite um e-mail válido.");
    if (ph.replace(/\D/g, "").length < 7)
      errs.push("Digite um telefone válido.");
    if (!$("dDate").value) errs.push("Selecione uma data.");
    if (errs.length) {
      $("driveErr").innerHTML = errs.join("<br>");
      $("driveErr").classList.remove("hidden");
      return;
    }
    $("driveErr").classList.add("hidden");
    closeModal("driveModal");
    e.target.reset();
    toast(
      "Test drive agendado! A concessionária entrará em contato.",
      "success",
    );
  });
  $("carForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const currentCar = editId ? cars.find((x) => x.id === editId) : null;
    const v = {
      name: $("fName").value.trim(),
      brand: $("fBrand").value.trim(),
      year: parseInt($("fYear").value),
      price: parseFloat($("fPrice").value),
      engine: $("fEngine").value.trim(),
      hp: parseInt($("fHp").value),
      sp: parseInt($("fSpeed").value) || 200,
      zero: parseFloat($("fZero").value) || null,
      cat: $("fCat").value.trim() || "Supercar",
      img: selectedCarImage || currentCar?.image_url || "",
      desc: $("fDesc").value.trim(),
    };
    const errs = [];
    if (!v.name) errs.push("O nome é obrigatório.");
    if (!v.brand) errs.push("A marca é obrigatória.");
    if (!(v.year >= 1950 && v.year <= 2026))
      errs.push("O ano deve estar entre 1950 e 2026.");
    if (!(v.price > 0)) errs.push("O preço deve ser maior que zero.");
    if (!v.engine) errs.push("O campo motor é obrigatório.");
    if (!(v.hp > 0)) errs.push("A potência deve ser maior que zero.");
    if (!v.desc) errs.push("A descrição é obrigatória.");
    if (errs.length) {
      $("carErr").innerHTML = errs.join("<br>");
      $("carErr").classList.remove("hidden");
      return;
    }
    $("carErr").classList.add("hidden");
    if (editId) {
      const c = cars.find((x) => x.id === editId);
      Object.assign(c, {
        name: v.name,
        brand: v.brand,
        year: v.year,
        price: v.price,
        engine: v.engine,
        horsepower: v.hp,
        top_speed: v.sp,
        zero_sixty: v.zero,
        category: v.cat,
        image_url: v.img,
        description: v.desc,
      });
      toast("Car #" + editId + " atualizado!", "success");
    } else {
      const nid = Math.max(...cars.map((c) => c.id), 0) + 1;
      cars.unshift({
        id: nid,
        name: v.name,
        brand: v.brand,
        year: v.year,
        price: v.price,
        engine: v.engine,
        horsepower: v.hp,
        top_speed: v.sp,
        zero_sixty: v.zero,
        torque: "—",
        transmission: "DCT",
        drivetrain: "RWD",
        category: v.cat,
        image_url: v.img,
        description: v.desc,
      });
      toast("Carro adicionado ao banco de dados!", "success");
    }
    saveCars();
    closeModal("carModal");
    renderPills();
    renderCars();
    renderDestaques();
    renderAdmin();
  });
  $("delConfirm").addEventListener("click", () => {
    cars = cars.filter((c) => c.id !== delId);
    favorites = favorites.filter((f) => f !== delId);
    saveCars();
    saveFavs();
    updateBadges();
    closeModal("delModal");
    renderPills();
    renderCars();
    renderDestaques();
    renderAdmin();
    renderFavs();
    toast("Carro excluído (favoritos removidos em cascata).", "success");
  });
  $("newsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const em = $("newsEmail").value.trim();
    const m = $("newsMsg");
    m.classList.remove("hidden");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      m.textContent =
        '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Digite um endereço de e-mail válido.';
      m.className = "text-xs mt-2 text-red-400";
      return;
    }
    m.textContent =
      '<i class="fa-solid fa-check" aria-hidden="true"></i> Você está na lista. Boas-vindas à pista!';
    m.className = "text-xs mt-2 text-green-400";
    e.target.reset();
    toast("Subscribed!", "success");
  });
  const termLines = [
    "$ pip install -r requirements.txt",
    '<i class="fa-solid fa-check" aria-hidden="true"></i> Flask 3.0.0 + Werkzeug installed',
    "$ python app.py",
    " * Serving Flask app • sqlite: database.db",
    " * 12 cars seeded • admin created",
    " * Running on http://127.0.0.1:5000",
    " * Press CTRL+C to quit",
  ];
  let ti = 0;
  $("terminal").innerHTML = "";
  const tInt = setInterval(() => {
    if (ti >= termLines.length) {
      clearInterval(tInt);
      return;
    }
    $("terminal").innerHTML +=
      `<div><span class="text-gray-600">${String(ti + 1).padStart(2, "0")}</span> <span class="${termLines[ti].startsWith("$") ? "text-white" : termLines[ti].startsWith(" * Running") ? "text-green-400" : "text-gray-400"}">${termLines[ti]}</span></div>`;
    ti++;
  }, 700);
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("visible");
          if (x.target.querySelector(".counter"))
            x.target.querySelectorAll(".counter").forEach(runCounter);
        }
      }),
    { threshold: 0.2 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const t = +el.dataset.target;
    let c = 0;
    const step = t / 60;
    const iv = setInterval(() => {
      c += step;
      if (c >= t) {
        c = t;
        clearInterval(iv);
      }
      el.textContent = Math.round(c).toLocaleString();
    }, 25);
  }
  document.querySelectorAll(".counter").forEach(runCounter);
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
  }
  const hc = $("heroCard");
  if (hc) {
    document.addEventListener("mousemove", (e) => {
      const r = hc.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width,
        y = (e.clientY - r.top - r.height / 2) / r.height;
      if (window.gsap)
        gsap.to(hc, { rotateY: x * 8, rotateX: -y * 8, duration: 0.5 });
    });
  }
});
