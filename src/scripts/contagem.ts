import { evento } from "../data/evento";

const alvo = new Date(evento.dataIso).getTime();
const grade = document.querySelector<HTMLElement>("[data-contagem]");
const hoje = document.querySelector<HTMLElement>("[data-contagem-hoje]");
const faltam = document.querySelector<HTMLElement>("[data-faltam]");

const campos = grade
  ? (["dias", "horas", "min", "seg"] as const).map((u) => grade.querySelector<HTMLElement>(`[data-u="${u}"]`)!)
  : [];
const pad = (n: number) => String(n).padStart(2, "0");

function escrever(el: HTMLElement, valor: string) {
  if (el.textContent === valor) return;
  el.textContent = valor;
  // reinicia a animação de "virada" do número
  el.classList.remove("tick");
  void el.offsetWidth;
  el.classList.add("tick");
}

function tick() {
  const s = Math.max(0, Math.floor((alvo - Date.now()) / 1000));
  const dias = Math.floor(s / 86400);

  if (grade) {
    const [d, h, m, sg] = campos;
    escrever(d, String(dias));
    escrever(h, pad(Math.floor((s % 86400) / 3600)));
    escrever(m, pad(Math.floor((s % 3600) / 60)));
    escrever(sg, pad(s % 60));
  }

  if (faltam) {
    faltam.hidden = false;
    faltam.textContent =
      s === 0 ? "É hoje! 🎉" : dias === 0 ? "Falta menos de 1 dia! ✨" : dias === 1 ? "Falta 1 dia" : `Faltam ${dias} dias`;
  }

  if (s === 0) {
    grade?.setAttribute("hidden", "");
    if (hoje) hoje.hidden = false;
    clearInterval(timer);
  }
}

const timer = setInterval(tick, 1000);
tick();
