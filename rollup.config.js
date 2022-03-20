import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const name = "liquidscript";

// TODO: include version number in bundles

const nodeBundles = {
  input: "./src/liquidscript.ts",
  external: ["decimal.js", "luxon", "fs/promises"],
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
  ],
};

const browserBundles = {
  input: "./src/liquidscript.ts",
  external: ["decimal.js", "luxon"],
  plugins: [
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/filters/index.ts",
      preventAssignment: true,
      "./nodeBase64": "./browserBase64",
    }),
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/loaders/index.ts",
      preventAssignment: true,
      'export * from "./file_system";': "",
    }),
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
      file: pkg.browser,
      format: "iife",
      name,
      globals: { "decimal.js": "Decimal", luxon: "luxon" },
    },
    {
      file: pkg["browser-min"],
      format: "iife",
      name,
      plugins: [uglify()],
      sourcemap: true,
      globals: { "decimal.js": "Decimal", luxon: "luxon" },
    },
  ],
};

const browserBundlesWithDependencies = {
  input: "./src/liquidscript.ts",
  external: [],
  plugins: [
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/filters/index.ts",
      preventAssignment: true,
      "./nodeBase64": "./browserBase64",
    }),
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/loaders/index.ts",
      preventAssignment: true,
      'export * from "./file_system";': "",
    }),
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
      file: pkg["browser-bundle"],
      format: "iife",
      name,
      globals: {},
    },
    {
      file: pkg["browser-bundle-min"],
      format: "iife",
      name,
      plugins: [uglify()],
      sourcemap: true,
      globals: {},
    },
  ],
};

export default [nodeBundles, browserBundles, browserBundlesWithDependencies];
