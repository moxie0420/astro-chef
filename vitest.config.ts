/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import solid from "vite-plugin-solid";

export default getViteConfig({
  plugins: [solid()],
  resolve: {
    conditions: ["development", "browser"],
  },
  test: {
    exclude: [".*", "node_modules"],
    deps: {
      inline: [/solid-testing-library/, /solid-js/],
    },
    // Vitest configuration options
    coverage: {
      include: ["**/src/**"],
    },
  },
});
