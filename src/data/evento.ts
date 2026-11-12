/**
 * Todos os dados do convite ficam aqui.
 * Campos vazios ("") aparecem no site como "A confirmar".
 */
export const evento = {
  formanda: "Yane Lopes de Freitas",
  primeiroNome: "Yane",
  curso: "Direito",
  titulo: "Bacharela em Direito",
  instituicao: "",

  convite:
    "Com imensa alegria, convido você para celebrar comigo a conquista de um sonho: a minha formatura em Direito.",

  /** Data e hora no formato ISO, com fuso. Ex.: "2027-01-23T19:30:00-03:00". Vazio = sem contagem regressiva. */
  dataIso: "",
  dataExtenso: "", // ex.: "Sábado, 23 de janeiro de 2027"
  horario: "", // ex.: "19h30"
  local: "",
  endereco: "",
  mapsUrl: "",
  traje: "",
  /** Prazo para confirmar presença. Ex.: "10 de janeiro". Vazio = não exibe. */
  confirmarAte: "",

  /** WhatsApp da formanda: só números, com 55 + DDD. */
  whatsapp: "555399004037",
};

export function mensagemWhatsApp(nome?: string) {
  const quem = nome?.trim() ? `Aqui é ${nome.trim()}. ` : "";
  return `Olá, ${evento.primeiroNome}! ${quem}Confirmo minha presença na sua formatura! 🎓✨`;
}

export function linkWhatsApp(nome?: string) {
  return `https://wa.me/${evento.whatsapp}?text=${encodeURIComponent(mensagemWhatsApp(nome))}`;
}
