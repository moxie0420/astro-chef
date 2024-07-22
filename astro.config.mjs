import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import playformInline from "@playform/inline";
import compressor from "astro-compressor";
import playformCompress from "@playform/compress";
import purgecss from "astro-purgecss";
import db from "@astrojs/db";
import node from "@astrojs/node";
import markdownIntegration from "@astropub/md";
import devtoolBreakpoints from "astro-devtool-breakpoints";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
    cacheDir: ".vite",
  },
  integrations: [
    markdownIntegration(),
    tailwind({
      applyBaseStyles: true,
    }),
    playformInline(),
    purgecss({
      fontFace: true,
      keyframes: false,
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
      gzip: false,
      brotli: true,
    }),
    db(),
    devtoolBreakpoints(),
    icon(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
