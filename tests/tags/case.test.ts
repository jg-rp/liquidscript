import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in case/when tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "switch on variable with literal 'whens'",
      source:
        "{% case greeting %}" +
        "{% when 'hello' %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}",

      globals: { greeting: "hello" },
      want: "HELLO WORLD",
    },
    {
      description: "switch on variable with variable 'when'",
      source:
        "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}",

      globals: { greeting: "hello", a: "hello" },
      want: "HELLO WORLD",
    },
    {
      description: "nested tag inside 'when' block",
      source:
        "{% case greeting %}" +
        "{% when a %}" +
        "{% if true %}HELLO WORLD{% endif %}" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}",

      globals: { greeting: "hello", a: "hello" },
      want: "HELLO WORLD",
    },
    {
      description: "no match and no default",
      source:
        "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}",

      globals: { greeting: "something", a: "hello" },
      want: "",
    },
    {
      description: "no match with default",
      source:
        "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% else %}G'DAY" +
        "{% endcase %}",

      globals: { greeting: "something", a: "hello" },
      want: "G'DAY",
    },
    {
      description: "no blocks",
      source: "{% case greeting %}{% endcase %}",
      globals: {},
      want: "",
    },
    {
      description: "just default block",
      source: "{% case greeting %}{% else %}hello{% endcase %}",
      globals: {},
      want: "hello",
    },
    {
      description: "comma separated when expression",
      source:
        "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye', 'something' %}GOODBYE WORLD" +
        "{% endcase %}",
      globals: { greeting: "something", a: "hello" },
      want: "GOODBYE WORLD",
    },
    {
      description: "multiple matching blocks",
      source:
        "{% case greeting %}" +
        "{% when a %}HELLO WORLD " +
        "{% when 'hello', a %}GOODBYE WORLD " +
        "{% endcase %}",
      globals: { greeting: "hello", a: "hello" },
      want: "HELLO WORLD GOODBYE WORLD GOODBYE WORLD ",
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
