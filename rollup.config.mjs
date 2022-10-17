import { readFileSync } from "fs";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json" assert { type: "json" };

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const name = "liquidscript";
const licence = readFileSync("./LICENCE", { encoding: "utf8" });
const banner = `/*
 * liquidscript version ${pkg.version}
 * https://github.com/jg-rp/liquidscript
 * 
 * ${licence.split("\n").join("\n * ")}
 */`;

const replaceVersionNumber = {
  delimiters: ["", ""],
  include: "./src/liquidscript.ts",
  preventAssignment: true,
  __VERSION__: pkg.version,
};

const nodeBundles = {
  input: "./src/liquidscript.ts",
  external: ["decimal.js", "luxon", "fs/promises"],
  plugins: [
    replace(replaceVersionNumber),
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
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      banner,
    },
  ],
};

const browserBundles = {
  input: "./src/liquidscript.ts",
  external: ["decimal.js", "luxon"],
  plugins: [
    replace(replaceVersionNumber),
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/filters/index.ts",
      preventAssignment: true,
      "./node_base64": "./browser_base64",
    }),
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/loaders/index.ts",
      preventAssignment: true,
      'export * from "./file_system_loader";': "",
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
      banner,
    },
    {
      file: pkg["browser-min"],
      format: "iife",
      name,
      plugins: [uglify()],
      sourcemap: true,
      globals: { "decimal.js": "Decimal", luxon: "luxon" },
      banner,
    },
  ],
};

const browserBundlesWithDependencies = {
  input: "./src/liquidscript.ts",
  external: [],
  plugins: [
    replace(replaceVersionNumber),
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/filters/index.ts",
      preventAssignment: true,
      "./node_base64": "./browser_base64",
    }),
    replace({
      delimiters: ["", ""],
      include: "./src/builtin/loaders/index.ts",
      preventAssignment: true,
      'export * from "./file_system_loader";': "",
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
      banner,
    },
    {
      file: pkg["browser-bundle-min"],
      format: "iife",
      name,
      plugins: [uglify()],
      sourcemap: true,
      globals: {},
      banner,
    },
  ],
};

export default [nodeBundles, browserBundles, browserBundlesWithDependencies];
