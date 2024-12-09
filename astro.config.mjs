import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import playformInline from "@playform/inline";
import playformCompress from "@playform/compress";
import db from "@astrojs/db";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  experimental: {
    responsiveImages: true,
  },
  integrations: [
    db(),
    tailwind(),
    playformInline(),
    playformCompress(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
