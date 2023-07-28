import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("output statements", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "string literal single quotes",
      source: "{{ 'hello' }}",
      globals: {},
      want: "hello",
    },
    {
      description: "string literal double quotes",
      source: '{{ "hello" }}',
      globals: {},
      want: "hello",
    },
    {
      description: "integer literal",
      source: "{{ 1 }}",
      globals: {},
      want: "1",
    },
    {
      description: "float literal",
      source: "{{ 1.1 }}",
      globals: {},
      want: "1.1",
    },
    {
      description: "true literal",
      source: "{{ true }}",
      globals: {},
      want: "true",
    },
    {
      description: "false literal",
      source: "{{ false }}",
      globals: {},
      want: "false",
    },
    {
      description: "range literal",
      source: "{{ (1..3) }}",
      globals: {},
      want: "1..3",
    },
    {
      description: "simple filter",
      source: '{{ "hello " | append: "world!" }}',
      globals: {},
      want: "hello world!",
    },
    {
      description: "simple identifier",
      source: "{{ greeting }}",
      globals: { greeting: "good evening" },
      want: "good evening",
    },
    {
      description: "identifier indexed array access",
      source: "{{ greetings[0] }}",
      globals: {
        greetings: ["good morning", "good evening"],
      },
      want: "good morning",
    },
    {
      description: "identifier property access",
      source: "{{ greetings.pm }}",
      globals: {
        greetings: { am: "good morning", pm: "good evening" },
      },
      want: "good evening",
    },
    {
      description: "identifier bracketed property access",
      source: "{{ greetings['pm'] }}",
      globals: {
        greetings: { am: "good morning", pm: "good evening" },
      },
      want: "good evening",
    },
    {
      description: "identifier chained property access",
      source: "{{ greetings.english['pm'] }}",
      globals: {
        greetings: { english: { am: "good morning", pm: "good evening" } },
      },
      want: "good evening",
    },
    {
      description: "bracketed variable resolves to a string",
      source: "{{ foo[something] }}",
      globals: { foo: { hello: "goodbye" }, something: "hello" },
      want: "goodbye",
    },
    {
      description:
        "bracketed variable resolves to a string without leading identifier",
      source: "{{ [something] }}",
      globals: { something: "hello", hello: "goodbye" },
      want: "goodbye",
    },
    {
      description: "nested bracketed variable resolving to a string",
      source: "{{ [list[settings.zero]] }}",
      globals: { list: ["foo"], settings: { zero: 0 }, foo: "bar" },
      want: "bar",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      },
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      },
    );
  });
});
