import { Environment } from "../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("special object properties", () => {
  const env = new Environment();
  const cases: Case[] = [
    {
      description: "first of an array",
      source: "{{ a.first }}",
      want: "3",
      globals: { a: [3, 2, 1] },
    },
    {
      description: "last of an array",
      source: "{{ a.last }}",
      want: "1",
      globals: { a: [3, 2, 1] },
    },
    {
      description: "size of an array",
      source: "{{ a.size }}",
      want: "3",
      globals: { a: [3, 2, 1] },
    },
    {
      description: "size of a string",
      source: "{{ s.size }}",
      want: "5",
      globals: { s: "hello" },
    },
    {
      description: "first of a string",
      source: "{{ s.first }}",
      want: "",
      globals: { s: "hello" },
    },
    {
      description: "first of an object",
      source: "{{ obj.first | join: '#' }}",
      want: "a#1",
      globals: { obj: { a: 1, b: 2 } },
    },
    {
      description: "first of an empty object",
      source: "{{ obj.first | join: '#' }}",
      want: "",
      globals: { obj: {} },
    },
    {
      description: "last of a string",
      source: "{{ s.last }}",
      want: "",
      globals: { s: "hello" },
    },
    {
      description: "size of an integer",
      source: "{{ i.size }}",
      want: "8",
      globals: { i: 99 },
    },
    {
      description: "size of an object with a size property",
      source: "{{ obj.size }}",
      want: "99",
      globals: { obj: { size: 99 } },
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
