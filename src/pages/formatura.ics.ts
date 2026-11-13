import { evento } from "../data/evento";

const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");

// Gera o arquivo de calendário (Apple Agenda, Outlook, Android) no build.
export function GET() {
  const linhas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Formatura Yane//PT-BR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:formatura-yane-${utc(evento.dataIso)}`,
    `DTSTAMP:${utc(evento.dataIso)}`,
    `DTSTART:${utc(evento.dataIso)}`,
    `DTEND:${utc(evento.fimIso)}`,
    `SUMMARY:Formatura da ${evento.primeiroNome}`,
    `LOCATION:${evento.local.busca.replace(/,/g, "\\,")}`,
    `DESCRIPTION:Festa de formatura de ${evento.formanda} em ${evento.curso}.`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Amanhã é a formatura da Yane!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return new Response(linhas.join("\r\n") + "\r\n", {
    headers: { "Content-Type": "text/calendar; charset=utf-8" },
  });
}
