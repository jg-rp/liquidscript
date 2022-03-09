import { Environment } from "../../src/environment";

// TODO: Finish tests
// TODO: if null, undefined,

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in if tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "if true",
      source: "{% if true %}hello{% endif %}",
      globals: {},
      want: "hello",
    },
    {
      description: "if false",
      source: "{% if false %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "true alternative branch",
      source: "{% if true %}hello{% else %}goodbye{% endif %}",
      globals: {},
      want: "hello",
    },
    {
      description: "false alternative branch",
      source: "{% if false %}hello{% else %}goodbye{% endif %}",
      globals: {},
      want: "goodbye",
    },
    {
      description: "true conditional alternative branch",
      source: "{% if false %}hello{% elsif true %}g'day{% endif %}",
      globals: {},
      want: "g'day",
    },
    {
      description: "false conditional alternative branch",
      source: "{% if false %}hello{% elsif false %}g'day{% endif %}",
      globals: {},
      want: "",
    },
    {
      description:
        "true conditional alternative branch with alternative branch",
      source:
        "{% if false %}hello{% elsif true %}g'day{% else %}goodbye{% endif %}",
      globals: {},
      want: "g'day",
    },
    {
      description:
        "false conditional alternative branch with alternative branch",
      source:
        "{% if false %}hello{% elsif false %}g'day{% else %}goodbye{% endif %}",
      globals: {},
      want: "goodbye",
    },
    {
      description: "nested conditional block",
      source: "{% if true %}{% if true %}hello{% endif %}{% endif %}",
      globals: {},
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block from a truthy context variable",
      source: "{% if a %}hello{% endif %}",
      globals: { a: true },
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block from a falsy context variable",
      source: "{% if a %}hello{% endif %}",
      globals: { a: false },
      want: "",
    },
    {
      description: "conditionally evaluate a block with equality test",
      source: "{% if a == false %}hello{% endif %}",
      globals: { a: false },
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block with truthy less than operator",
      source: "{% if a < 5 %}hello{% endif %}",
      globals: { a: 3 },
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block with falsy less than operator",
      source: "{% if a < 5 %}hello{% endif %}",
      globals: { a: 6 },
      want: "",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      }
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      }
    );
  });
});
