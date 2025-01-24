import AstroPWA from "@vite-pwa/astro";
import { defineConfig, envField } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";
import devtoolBreakpoints from "astro-devtool-breakpoints";

import solidJs from "@astrojs/solid-js";
import solidSvg from "vite-plugin-solid-svg";

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
  integrations: [
    devtoolBreakpoints(),
    solidJs({ devtools: true }),
    AstroPWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: { navigateFallback: "/404" },
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [
      visualizer(),
      tailwindcss(),
      solidSvg({ defaultAsComponent: false }),
    ],
  },
});
