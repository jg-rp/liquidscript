import { readFileSync } from "fs";
import { render, renderSync } from "../src";
import { TemplateError } from "../src/errors";

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
  "malformed tags are not parsed", // TODO: remove me
  "incomplete tags are not parsed", // TODO: remove me
  "tags, comment, malformed tags are not parsed", // TODO: rename me
  "tags, comment, incomplete tags are not parsed", // TODO: rename me
]);

// const golden: {"tests": Case[]} = JSON.parse(
//   readFileSync("tests/golden_liquid/golden_liquid.json", {
//     encoding: "utf8",
//   }),
// );

const golden: { tests: Case[] } = JSON.parse(
  readFileSync("tests/golden_liquid/tests/tags/for.json", {
    encoding: "utf8",
  }),
);

const active = golden.tests.filter((t) => !SKIP.has(t.name));
const skipped = golden.tests.filter((t) => SKIP.has(t.name));

describe("golden liquid sync", () => {
  test.each<Case>(active)(
    "$name",
    ({ template, templates, data, result, results, invalid }: Case) => {
      if (invalid) {
        expect(() => renderSync(template, data)).toThrow(TemplateError);
      } else if (result) {
        // TODO: loader with templates
        expect(renderSync(template, data)).toStrictEqual(result);
      } else if (results) {
        // TODO: loader with templates
        expect(results).toContainEqual(renderSync(template, data));
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
      if (invalid) {
        await expect(() => render(template, data)).toThrow(TemplateError);
      } else if (result) {
        // TODO: loader with templates
        await expect(render(template, data)).resolves.toStrictEqual(result);
      } else if (results) {
        // TODO: loader with templates
        expect(results).toContainEqual(await render(template, data));
      }
    },
  );
});
