import { readFileSync } from "fs";
import { Environment } from "../src/environment";
import { BlockTag } from "../src/tags";
import { ExtendsTag } from "../src/tags";
import { ObjectLoader } from "../src/loaders";
import { LiquidError } from "../src/errors";

type Case = {
  name: string;
  template: string;
  templates?: { [index: string]: string };
  data?: { [index: string]: unknown };
  result?: string;
  results?: string[];
  invalid?: boolean;
};

const golden: { tests: Case[] } = JSON.parse(
  readFileSync("tests/extends.json", {
    encoding: "utf8",
  }),
);

describe("template inheritance sync", () => {
  test.each<Case>(golden.tests)(
    "$name",
    ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({ loader: new ObjectLoader(templates) });
      env.tags["block"] = BlockTag;
      env.tags["extends"] = ExtendsTag;

      if (invalid) {
        expect(() => env.renderSync(template, data)).toThrow(LiquidError);
      } else if (result) {
        expect(env.renderSync(template, data)).toStrictEqual(result);
      } else if (results) {
        expect(results).toContainEqual(env.renderSync(template, data));
      }
    },
  );
});

describe("template inheritance async", () => {
  test.each<Case>(golden.tests)(
    "$name",
    async ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({ loader: new ObjectLoader(templates) });
      env.tags["block"] = BlockTag;
      env.tags["extends"] = ExtendsTag;

      if (invalid) {
        expect(() => env.render(template, data)).toThrow(LiquidError);
      } else if (result) {
        await expect(env.render(template, data)).resolves.toStrictEqual(result);
      } else if (results) {
        expect(results).toContainEqual(await env.render(template, data));
      }
    },
  );
});
