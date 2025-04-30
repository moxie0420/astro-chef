import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  source: {
    entry: {
      index: "./src/main.ts",
    },
    tsconfigPath: "./tsconfig.json",
  },
  plugins: [],
});
