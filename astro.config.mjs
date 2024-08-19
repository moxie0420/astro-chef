import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import bun from "@nurodev/astro-bun";

import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  vite: {},
  image: {
    service: {
      entrypoint: "src/lib/bun-image.ts",
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    compressor({
      gzip: true,
      brotli: true,
    }),
  ],
  output: "server",
  adapter: bun(),
});
