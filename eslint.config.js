import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, perfectionist, "@stylistic": stylistic },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "perfectionist/sort-classes": [
        "error",
        {
          alphabetical: "unsorted",
          groups: [
            "property", // instance properties
            "constructor", // constructor
            "static-method", // static methods
            "method", // instance methods
          ],
        },
      ],
      "@stylistic/lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true,
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "no-public",
        },
      ],
    },
  },
  tseslint.configs.recommended,
]);
