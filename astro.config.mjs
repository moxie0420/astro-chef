import { defineConfig, envField, sharpImageService } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";
import devtoolBreakpoints from "astro-devtool-breakpoints";

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
  image: {
    service: sharpImageService(),
  },
  integrations: [devtoolBreakpoints()],
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
    ],
  },
});
