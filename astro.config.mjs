import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import playformInline from "@playform/inline";
import compressor from "astro-compressor";
import playformCompress from "@playform/compress";
import purgecss from "astro-purgecss";
import db from "@astrojs/db";

import markdownIntegration from "@astropub/md";
import devtoolBreakpoints from "astro-devtool-breakpoints";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {},
  image: {
    service: {
      entrypoint: "src/lib/bun-image.ts",
    },
  },
  integrations: [
    markdownIntegration(),
    tailwind({
      applyBaseStyles: true,
    }),
    playformInline(),
    purgecss({
      fontFace: true,
      keyframes: true,
      rejected: true,
      variables: true,
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["astro", "html"],
        },
      ],
    }),
    playformCompress(),
    compressor({
      gzip: true,
      brotli: true,
    }),
    db(),
    devtoolBreakpoints(),
  ],
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
});