/**
 * Arquivo: projetos/nexus/js/config.js
 * Organizado e comentado automaticamente.
 */

/* ================================================================
   NEXUS LOG — CONFIGURAÇÃO
   Preencha a API Key para ativar os mapas do Google Maps.
   ================================================================ */
window.NEXUS_CONFIG = Object.freeze({
  GOOGLE_MAPS_API_KEY: "COLOQUE_SUA_GOOGLE_MAPS_API_KEY_AQUI",
  GOOGLE_MAP_ID: "DEMO_MAP_ID",
});
/* ================================================================
   CARREGAMENTO CONDICIONAL DO GOOGLE MAPS
   ================================================================ */
(() => {
  const key = window.NEXUS_CONFIG?.GOOGLE_MAPS_API_KEY;
  if (!key || key === "COLOQUE_SUA_GOOGLE_MAPS_API_KEY_AQUI") {
    return;
  }
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&libraries=marker&callback=initGoogleMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
})();
