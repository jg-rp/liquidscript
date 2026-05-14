import { readFileSync } from "fs";
import { Environment } from "../src";
import { LiquidError } from "../src/errors";
import { ObjectLoader } from "../src/loaders";
import { DateTime, Settings } from "luxon";

type Case = {
  name: string;
  template: string;
  templates?: { [index: string]: string };
  data?: { [index: string]: unknown };
  result?: string;
  results?: string[];
  invalid?: boolean;
};

const SKIP: Set<string> = new Set([
  "basics__date_filters__date_format_C_century",
  "basics__date_filters__date_format_P_am_pm_lowercase",
  "basics__date_filters__date_format_U_week_sunday_start",
  "basics__date_filters__date_format_W_week_monday_start",
  "basics__date_filters__date_format_caret_uppercase",
  "basics__date_filters__date_format_colon_z_timezone_offset_colon",
  "basics__error_handling__division_by_zero_with_float_lax",
  "basics__error_handling__empty_filter_chain_lax",
  "basics__error_handling__malformed_syntax_invalid_filter_separator",
  "basics__error_handling__parse_error_shows_line_number_precise",
]);

const spec: { tests: Case[] } = JSON.parse(
  readFileSync("tests/spec.json", {
    encoding: "utf8",
  }),
);

const active = spec.tests.filter((t) => !SKIP.has(t.name));
const skipped = spec.tests.filter((t) => SKIP.has(t.name));

let originalNow: (typeof Settings)["now"];
const now = DateTime.utc(2024, 1, 1, 0, 0, 0, 0).toMillis();

describe("liquid spec sync", () => {
  beforeAll(() => {
    originalNow = Settings.now;
    Settings.now = () => now;
  });

  afterAll(() => {
    Settings.now = originalNow;
  });

  test.each<Case>(active)(
    "$name",
    ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({
        loader: new ObjectLoader(templates),
        strictFilters: false,
      });

      if (invalid) {
        expect(() => env.renderSync(template, data)).toThrow(LiquidError);
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

describe("liquid spec async", () => {
  test.each<Case>(active)(
    "$name",
    async ({ template, templates, data, result, results, invalid }: Case) => {
      const env = new Environment({ loader: new ObjectLoader(templates) });

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
