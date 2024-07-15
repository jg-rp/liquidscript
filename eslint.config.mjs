import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import sonarjs from "eslint-plugin-sonarjs";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "lib/**",
      "dist/**",
      "jest.config.js",
      "benchmark/**",
      "tests/browser/**",
      "docs/**",
    ],
  },
  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/cognitive-complexity": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "_" }],
    },
  },
];
