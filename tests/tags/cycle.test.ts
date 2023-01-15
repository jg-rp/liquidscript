import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in cycle tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "strings",
      source:
        "{% cycle 'a', 'b', 'c' %} " +
        "{% cycle 'a', 'b', 'c' %} " +
        "{% cycle 'a', 'b', 'c' %} " +
        "{% cycle 'a', 'b', 'c' %}",
      globals: {},
      want: "a b c a",
    },
    {
      description: "integers",
      source:
        "{% cycle 1, 2, 3 %} " +
        "{% cycle 1, 2, 3 %} " +
        "{% cycle 1, 2, 3 %} " +
        "{% cycle 1, 2, 3 %}",
      globals: {},
      want: "1 2 3 1",
    },
    {
      description: "booleans",
      source:
        "{% cycle true, true, false %} " +
        "{% cycle true, true, false %} " +
        "{% cycle true, true, false %} " +
        "{% cycle true, true, false %}",
      globals: {},
      want: "true true false true",
    },
    {
      description: "string named group",
      source:
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %}",
      globals: {},
      want: "a b c a",
    },
    {
      description: "multiple string named groups",
      source:
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'y': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %} " +
        "{% cycle 'x': 'a', 'b', 'c' %}",
      globals: {},
      want: "a b a c a",
    },
    {
      description: "variable named groups",
      source:
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle y: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %}",
      globals: { x: "x", y: "y" },
      want: "a b a c a",
    },
    {
      description: "variable named groups with the same value",
      source:
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle y: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %} " +
        "{% cycle x: 'a', 'b', 'c' %}",
      globals: { x: "x", y: "x" },
      want: "a b c a b",
    },
    {
      description: "variables",
      source:
        "{% cycle a, b, c %} " +
        "{% cycle a, b, c %} " +
        "{% cycle a, b, c %} " +
        "{% cycle a, b, c %}",
      globals: { a: "x", b: "y", c: "z" },
      want: "x y z x",
    },
    {
      description: "named group with shrinking number of arguments",
      source:
        "{% cycle 'a': '1', '2', '3' %}" +
        "{% cycle 'a': '1', '2' %}" +
        "{% cycle 'a': '1' %}",
      globals: {},
      want: "121",
    },
    {
      description: "named group with growing number of arguments",
      source:
        "{% cycle 'a': '1' %}" +
        "{% cycle 'a': '1', '2' %}" +
        "{% cycle 'a': '1', '2', '3' %}",
      globals: {},
      want: "112",
    },
    {
      description: "undefined group names",
      source:
        "{% cycle a: 1, 2, 3 %}{% cycle b: 1, 2, 3 %}{% cycle a: 1, 2, 3 %}",
      globals: {},
      want: "123",
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
