import { defineConfig } from "astro/config";

// O Vercel informa o domínio de produção durante o build; localmente usa localhost.
const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: dominio ? `https://${dominio}` : "http://localhost:4321",
  // Nada de scripts/estilos embutidos no HTML: permite a CSP rígida do vercel.json
  build: { inlineStylesheets: "never" },
  vite: { build: { assetsInlineLimit: 0 } },
});
