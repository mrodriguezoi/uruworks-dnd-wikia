import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercelServerless from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercelServerless({ maxDuration: 8 }),
});
