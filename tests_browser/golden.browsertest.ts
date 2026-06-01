import { describe, test, expect } from "vitest";
import { Environment } from "../dist/liquidscript.browser.esm.min.js";
import { DetailedLiquidError } from "../dist/liquidscript.browser.esm.min.js";
import { ObjectLoader } from "../dist/liquidscript.browser.esm.min.js";

type Case = {
  name: string;
  template: string;
  templates?: { [index: string]: string };
  data?: { [index: string]: unknown };
  result?: string;
  results?: string[];
  invalid?: boolean;
};

const SKIP = new Set([
  "tags, comment, incomplete nested output markup is a syntax error",
  "tags, comment, incomplete nested tags are a syntax error",
  "filters, date, well formed string",
  "filters, date, literal percent",
  "filters, date, negative timestamp string",
  "filters, date, seconds since epoch format directive",
  "identifiers, capture only digits",
  "identifiers, allowed symbols",
  "identifiers, allowed symbols, parens",
  "identifiers, only digits",
  "identifiers, repeated parens",
]);

import goldenData from "../tests/golden_liquid/golden_liquid.json";

const golden: { tests: Case[] } = goldenData as { tests: Case[] };
const active = golden.tests.filter((t) => !SKIP.has(t.name));
const skipped = golden.tests.filter((t) => SKIP.has(t.name));

describe("browser golden liquid sync", () => {
  test.each<Case>(active)(
    "$name",
    ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({ loader: new ObjectLoader(templates) });

      if (invalid) {
        expect(() => env.renderSync(template, data)).toThrow(
          DetailedLiquidError,
        );
      } else if (result) {
        expect(env.renderSync(template, data)).toStrictEqual(result);
      } else if (results) {
        expect(results).toContainEqual(env.renderSync(template, data));
      }
    },
  );

  // Report skipped test cases.
  test.skip.each(skipped)("$name", () => {});
});

describe("browser golden liquid async", () => {
  test.each<Case>(active)(
    "$name",
    async ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({ loader: new ObjectLoader(templates) });

      if (invalid) {
        expect(() => env.render(template, data)).rejects.toThrow(
          DetailedLiquidError,
        );
      } else if (result) {
        await expect(env.render(template, data)).resolves.toStrictEqual(result);
      } else if (results) {
        expect(results).toContainEqual(await env.render(template, data));
      }
    },
  );
});
