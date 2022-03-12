import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const name = "liquidscript";

export default {
  input: "./src/liquidscript.ts",
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
