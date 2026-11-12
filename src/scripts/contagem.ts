const el = document.querySelector<HTMLElement>("[data-contagem]");
if (el) {
  const alvo = new Date(el.dataset.contagem!).getTime();
  const campo = (u: string) => el.querySelector<HTMLElement>(`[data-u="${u}"]`)!;
  const [dias, horas, min, seg] = ["dias", "horas", "min", "seg"].map(campo);
  const pad = (n: number) => String(n).padStart(2, "0");

  const tick = () => {
    const s = Math.max(0, Math.floor((alvo - Date.now()) / 1000));
    dias.textContent = String(Math.floor(s / 86400));
    horas.textContent = pad(Math.floor((s % 86400) / 3600));
    min.textContent = pad(Math.floor((s % 3600) / 60));
    seg.textContent = pad(s % 60);
  };
  tick();
  setInterval(tick, 1000);
}
