(function () {
  const el = document.querySelector(".contagem");
  if (!el) return;
  const alvo = new Date(el.dataset.alvo).getTime();
  const campos = {};
  el.querySelectorAll("[data-u]").forEach((s) => (campos[s.dataset.u] = s));
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    let d = Math.max(0, alvo - Date.now()) / 1000;
    campos.dias.textContent = Math.floor(d / 86400);
    campos.horas.textContent = pad(Math.floor((d % 86400) / 3600));
    campos.min.textContent = pad(Math.floor((d % 3600) / 60));
    campos.seg.textContent = pad(Math.floor(d % 60));
  }
  tick();
  setInterval(tick, 1000);
})();
