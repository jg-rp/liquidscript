import fs from "node:fs";

import { Environment } from "../../src/environment";
import { LiquidError } from "../../src/errors";
import { MapLoader } from "../../src/builtin/loaders";
import { LaxUndefined } from "../../src/undefined";

type Case = {
  name: string;
  template: string;
  want: string;
  context: Record<string, unknown>;
  partials: Record<string, string>;
  error: boolean;
  strict: boolean;
};

type TestGroup = {
  name: string;
  tests: Case[];
};

const golden = JSON.parse(
  fs.readFileSync("tests/golden/golden_liquid.json", "utf-8"),
);

describe.each<TestGroup>(golden.test_groups)(
  "$name",
  ({ tests }: TestGroup) => {
    test.each<Case>(tests)(
      "$name",
      ({ template, want, context, partials, error }: Case) => {
        const loader = new MapLoader(new Map(Object.entries(partials)));
        const env = new Environment({
          loader,
          undefinedFactory: (n) => new LaxUndefined(n),
        });

        if (error) {
          expect(() => env.fromString(template).renderSync(context)).toThrow(
            LiquidError,
          );
        } else {
          const result = env.fromString(template).renderSync(context);
          expect(result).toBe(want);
        }
      },
    );
  },
);
