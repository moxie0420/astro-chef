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
  site: "https://astrochef.xyz",
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
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Astro Chef",
        short_name: "AstroChef",
        description: "Your All in One stop for your recipe needs",
        theme_color: "#191724",
        icons: [
          {
            src: "favicon.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "favicon.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
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
