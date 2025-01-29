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
      ENVIRONMENT: envField.enum({
        context: "server",
        access: "public",
        values: ["prod", "dev"],
        default: "dev",
      }),

      S3_ENDPOINT: envField.string({
        context: "server",
        access: "secret",
      }),
      S3_ACCESS_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      S3_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  integrations: [
    devtoolBreakpoints(),
    solidJs({ devtools: true }),
    AstroPWA({
      registerType: "autoUpdate",
      workbox: { navigateFallback: "/404" },
      manifest: {
        name: "Astro Chef",
        short_name: "AstroChef",
        description: "Your All in One stop for your recipe needs",
        theme_color: "#191724",
        icons: [
          {
            src: "favicon.ico",
            sizes: "48x48",
          },
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
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
      visualizer({ emitFile: true, filename: "stats.html" }),
      tailwindcss(),
      solidSvg({ defaultAsComponent: false }),
    ],
  },
});
