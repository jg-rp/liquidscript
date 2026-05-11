import { readFileSync } from "fs";
import { Environment } from "../src";
import { TemplateError } from "../src/errors";
import { ObjectLoader } from "../src/loaders";

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
  "tags, comment, malformed tags are not parsed", // TODO: rename me
  "tags, comment, incomplete tags are not parsed", // TODO: rename me
  "filters, date, well formed string",
  "filters, date, literal percent",
  "filters, date, negative timestamp string",
  "filters, date, seconds since epoch format directive",
]);

const golden: { tests: Case[] } = JSON.parse(
  readFileSync("tests/golden_liquid/golden_liquid.json", {
    encoding: "utf8",
  }),
);

const active = golden.tests.filter((t) => !SKIP.has(t.name));
const skipped = golden.tests.filter((t) => SKIP.has(t.name));

describe("golden liquid sync", () => {
  test.each<Case>(active)(
    "$name",
    ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({ loader: new ObjectLoader(templates) });

      if (invalid) {
        expect(() => env.renderSync(template, data)).toThrow(TemplateError);
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

describe("golden liquid async", () => {
  test.each<Case>(active)(
    "$name",
    async ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({ loader: new ObjectLoader(templates) });

      if (invalid) {
        expect(() => env.render(template, data)).toThrow(TemplateError);
      } else if (result) {
        await expect(env.render(template, data)).resolves.toStrictEqual(result);
      } else if (results) {
        expect(results).toContainEqual(await env.render(template, data));
      }
    },
  );
});
