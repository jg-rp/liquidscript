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

// const golden = JSON.parse(
//   readFileSync("tests/golden_liquid/golden_liquid.json", {
//     encoding: "utf8",
//   }),
// );

const golden = JSON.parse(
  readFileSync("tests/golden_liquid/tests/tags/assign.json", {
    encoding: "utf8",
  }),
);

describe("golden liquid sync", () => {
  test.each<Case>(golden.tests)(
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
});

describe("golden liquid async", () => {
  test.each<Case>(golden.tests)(
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
