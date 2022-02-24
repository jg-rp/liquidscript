import { Environment } from "../../src/environment";

// TODO: Finish tests

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in unless tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "unless true",
      source: "{% unless true %}hello{% endunless %}",
      globals: {},
      want: "",
    },
    {
      description: "unless false",
      source: "{% unless false %}hello{% endunless %}",
      globals: {},
      want: "hello",
    },
    {
      description: "true alternative branch",
      source: "{% unless true %}hello{% else %}goodbye{% endunless %}",
      globals: {},
      want: "goodbye",
    },
    {
      description: "false alternative branch",
      source: "{% unless false %}hello{% else %}goodbye{% endunless %}",
      globals: {},
      want: "hello",
    },
    {
      description: "true conditional alternative branch",
      source: "{% unless true %}hello{% elsif true %}g'day{% endunless %}",
      globals: {},
      want: "g'day",
    },
    {
      description: "false conditional alternative branch",
      source: "{% unless true %}hello{% elsif false %}g'day{% endunless %}",
      globals: {},
      want: "",
    },
    {
      description:
        "true conditional alternative branch with alternative branch",
      source:
        "{% unless true %}hello{% elsif true %}g'day{% else %}goodbye{% endunless %}",
      globals: {},
      want: "g'day",
    },
    {
      description:
        "false conditional alternative branch with alternative branch",
      source:
        "{% unless true %}hello{% elsif false %}g'day{% else %}goodbye{% endunless %}",
      globals: {},
      want: "goodbye",
    },
    {
      description: "nested conditional block",
      source:
        "{% unless false %}{% unless false %}hello{% endunless %}{% endunless %}",
      globals: {},
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block from a truthy context variable",
      source: "{% unless a %}hello{% endunless %}",
      globals: { a: true },
      want: "",
    },
    {
      description:
        "conditionally evaluate a block from a falsy context variable",
      source: "{% unless a %}hello{% endunless %}",
      globals: { a: false },
      want: "hello",
    },
    {
      description: "conditionally evaluate a block with equality test",
      source: "{% unless a == true %}hello{% endunless %}",

      globals: { a: false },
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block with truthy less than operator",
      source: "{% unless a < 5 %}hello{% endunless %}",
      globals: { a: 3 },
      want: "",
    },
    {
      description:
        "conditionally evaluate a block with falsy less than operator",
      source: "{% unless a < 5 %}hello{% endunless %}",
      globals: { a: 6 },
      want: "hello",
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
