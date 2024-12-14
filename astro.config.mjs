import { defineConfig, envField, sharpImageService } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";

import node from "@astrojs/node";

import devtoolBreakpoints from "astro-devtool-breakpoints";

// https://astro.build/config
export default defineConfig({
  experimental: {
    responsiveImages: true,
  },
  env: {
    schema: {
      IMAGE_DIRECTORY: envField.string({
        context: "server",
        access: "public",
        default: `${process.env.PWD}/Images`,
      }),
    },
  },
  image: {
    service: sharpImageService(),
  },
  integrations: [db(), tailwind(), devtoolBreakpoints()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [
      visualizer({
        emitFile: true,
        filename: "stats.html",
      }),
    ],
  },
});
