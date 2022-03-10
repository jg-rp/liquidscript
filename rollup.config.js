import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const name = "liquidscript";

export default {
  input: "./src/liquidscript.ts",

  // external: ["decimal.js", "he", "luxon"],
  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
  ],

  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: pkg.browser,
      format: "iife",
      name,

      // https://rollupjs.org/guide/en/#outputglobals
      globals: {},
    },
    {
      file: pkg["browser-min"],
      format: "iife",
      name,
      plugins: [uglify()],
      sourcemap: true,

      // https://rollupjs.org/guide/en/#outputglobals
      globals: {},
    },
  ],
};
