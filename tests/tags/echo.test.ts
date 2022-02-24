import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in echo tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "string literal single quotes",
      source: "{% echo 'hello' %}",
      globals: {},
      want: "hello",
    },
    {
      description: "string literal double quotes",
      source: '{% echo "hello" %}',
      globals: {},
      want: "hello",
    },
    {
      description: "integer literal",
      source: "{% echo 1 %}",
      globals: {},
      want: "1",
    },
    {
      description: "float literal",
      source: "{% echo 1.1 %}",
      globals: {},
      want: "1.1",
    },
    {
      description: "true literal",
      source: "{% echo true %}",
      globals: {},
      want: "true",
    },
    {
      description: "false literal",
      source: "{% echo false %}",
      globals: {},
      want: "false",
    },
    {
      description: "range literal",
      source: "{% echo (1..3) %}",
      globals: {},
      want: "1..3",
    },
    {
      description: "simple filter",
      source: '{% echo "hello " | append: "world!" %}',
      globals: {},
      want: "hello world!",
    },
    {
      description: "simple identifier",
      source: "{% echo greeting %}",
      globals: { greeting: "good evening" },
      want: "good evening",
    },
    {
      description: "identifier indexed array access",
      source: "{% echo greetings[0] %}",
      globals: {
        greetings: ["good morning", "good evening"],
      },
      want: "good morning",
    },
    {
      description: "identifier property access",
      source: "{% echo greetings.pm %}",
      globals: {
        greetings: { am: "good morning", pm: "good evening" },
      },
      want: "good evening",
    },
    {
      description: "identifier bracketed property access",
      source: "{% echo greetings['pm'] %}",
      globals: {
        greetings: { am: "good morning", pm: "good evening" },
      },
      want: "good evening",
    },
    {
      description: "identifier chained property access",
      source: "{% echo greetings.english['pm'] %}",
      globals: {
        greetings: { english: { am: "good morning", pm: "good evening" } },
      },
      want: "good evening",
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
