import { defineConfig, envField } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";
import devtoolBreakpoints from "astro-devtool-breakpoints";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "http://cookbook.local",
  experimental: {
    responsiveImages: true,
    svg: true,
  },
  env: {
    schema: {
      IMAGE_DIRECTORY: envField.string({
        context: "server",
        access: "public",
        default: `/data/Images`,
      }),
    },
  },
  integrations: [devtoolBreakpoints(), solidJs({ devtools: true })],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [
      visualizer({
        emitFile: process.env.ANALYZE === "true",
        filename: "stats.html",
      }),
      tailwindcss(),
      VitePWA({ registerType: "autoUpdate" }),
    ],
  },
});
