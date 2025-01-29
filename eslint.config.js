import pluginJs from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxAlly from "eslint-plugin-jsx-a11y";
import solid from "eslint-plugin-solid/configs/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  jsxAlly.flatConfigs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "jsx-a11y/label-has-associated-control": false,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
];
