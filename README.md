# Convite de Formatura · Yane

Site-convite em [Astro](https://astro.build), estático (sem servidor), publicado no Vercel.
A confirmação de presença é feita pelo WhatsApp da formanda.

## Rodando localmente

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Acesse http://localhost:4321

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, data, local, traje, WhatsApp, texto do convite | `src/data/evento.ts` |
| Paleta de cores e fontes | `src/styles/tema.css` |
| Fotos | `src/assets/fotos/` (otimizadas automaticamente no build) |
| Fotos e legendas da trajetória | `src/components/Trajetoria.astro` |
| Animações de rolagem (GSAP + Lenis) | `src/scripts/rolagem.ts` |
| Imagem de prévia do link (WhatsApp) | `public/og.jpg` (1200×630) |

Campos vazios em `evento.ts` aparecem como "A confirmar". Sem `dataIso`, a contagem
regressiva mostra "A data será anunciada em breve".

## Link personalizado

`https://<site>/?c=Maria` já preenche o nome do convidado na mensagem do WhatsApp.

## Deploy (Vercel)

1. Em vercel.com, entre com o GitHub e clique em **Add New → Project**.
2. Importe o repositório `formatura` (o Vercel detecta o Astro sozinho).
3. Cada push na `main` atualiza o site; outras branches geram links de prévia.

## Estrutura

```
src/
  data/evento.ts         dados do convite
  assets/fotos/          fotos originais
  styles/                tema (paleta) e estilos globais
  components/            Hero, Convite, Trajetoria, Contagem, Detalhes, Confirmacao, Rodape
  layouts/Base.astro     <head>, metadados de compartilhamento, fontes
  pages/index.astro      monta a página
  scripts/               rolagem interativa e contagem regressiva
public/                  og.jpg, favicon
```
