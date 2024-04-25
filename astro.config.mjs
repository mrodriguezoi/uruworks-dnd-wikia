import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercelServerless from "@astrojs/vercel/serverless";

export default defineConfig({
  site: "http://localhost:4321",
  base: "/",
  integrations: [tailwind()],
  output: "server",
  adapter: vercelServerless({ maxDuration: 8 }),
});
