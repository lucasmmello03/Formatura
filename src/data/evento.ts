/** Todos os dados do convite ficam aqui. */
export const evento = {
  formanda: "Yane Lopes de Freitas",
  primeiroNome: "Yane",
  assinatura: "Yane Freitas",
  curso: "Direito",
  titulo: "Bacharela em Direito",

  convite:
    "Depois de 5 anos, finalmente chegou a formatura! Quero muito celebrar esse momento com você.",

  /** Início da festa (horário de Brasília). Usado na contagem regressiva e na agenda. */
  dataIso: "2027-02-06T19:30:00-03:00",
  /** Fim estimado, só para o lembrete na agenda. */
  fimIso: "2027-02-07T03:00:00-03:00",
  diaSemana: "Sábado",
  dataExtenso: "06 de fevereiro de 2027",
  dataCurta: "06 · 02 · 2027",
  horario: "19h30",

  local: {
    nome: "Casa da Praia Lounge",
    bairro: "Praia do Cassino",
    cidade: "Rio Grande · RS",
    /** Texto usado para buscar no Google Maps / Waze. */
    busca: "Casa da Praia Lounge, Cassino, Rio Grande - RS",
  },

  confirmarAte: "20 de janeiro",

  /** Contatos para confirmação: só números, com 55 + DDD. O primeiro é o principal. */
  contatos: [
    { nome: "Yane", whatsapp: "5553999004037" },
    { nome: "Crê", whatsapp: "5553991803016" },
  ],
};

export function mensagemWhatsApp(nome = "") {
  const quem = nome.trim() ? `Aqui é ${nome.trim()}. ` : "";
  return `Olá! ${quem}Confirmo minha presença na formatura da ${evento.primeiroNome}, dia ${evento.dataCurta.replaceAll(" · ", "/")}! 🎓✨`;
}

export function linkWhatsApp(numero: string, nome = "") {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagemWhatsApp(nome))}`;
}

const q = encodeURIComponent(evento.local.busca);
export const mapas = {
  google: `https://www.google.com/maps/search/?api=1&query=${q}`,
  waze: `https://waze.com/ul?q=${q}&navigate=yes`,
  embed: `https://www.google.com/maps?q=${q}&output=embed`,
};

/** Link "adicionar ao Google Agenda". */
export function linkAgenda() {
  const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `Formatura da ${evento.primeiroNome} 🎓`,
    dates: `${utc(evento.dataIso)}/${utc(evento.fimIso)}`,
    location: evento.local.busca,
    details: `Festa de formatura de ${evento.formanda} em ${evento.curso}.`,
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}
