import { defineConfig, envField, sharpImageService } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import devtoolBreakpoints from "astro-devtool-breakpoints";
import react from "@astrojs/react";

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
        default: `/data/Images`,
      }),
    },
  },
  image: {
    service: sharpImageService(),
  },
  integrations: [tailwind(), devtoolBreakpoints(), react()],
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
