import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import Icons from "unplugin-icons/rspack";
import { setupLoaders } from "@responsive-image/webpack";
import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  source: {
    entry: {
      index: "./src/index.tsx",
    },
    tsconfigPath: "./tsconfig.json",
  },
  server: {
    port: 4321,
  },
  output: {
    target: "web",
    distPath: {
      root: "dist",
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
  tools: {
    rspack: {
      module: {
        rules: [
          {
            resourceQuery: /responsive/,
            use: setupLoaders(),
          },
        ],
      },
      plugins: [
        TanStackRouterRspack({
          target: "solid",
          autoCodeSplitting: true,
        }),
        Icons({ compiler: "solid" }),
      ],
    },
  },
});
