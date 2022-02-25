import { Environment } from "../src/environment";

type Case = {
  description: string;
  source: string;
  want: string;
  globals: { [index: string]: unknown };
};

describe("length of filter arguments", () => {
  const env = new Environment();
  const cases: Case[] = [
    {
      description: "too many join arguments",
      source: "{{ 'a,b,c' | split: ',' | join: '#', 'foo' }}",
      want: "join: too many arguments, expected at most 1, but got 2",
      globals: {},
    },
    {
      description: "too many first arguments",
      source: "{{ 'a,b,c' | split: ',' | first: 'foo' }}",
      want: "first: too many arguments, expected 0, but got 1",
      globals: {},
    },
    {
      description: "too many last arguments",
      source: "{{ 'a,b,c' | split: ',' | last: 'foo' }}",
      want: "last: too many arguments, expected 0, but got 1",
      globals: {},
    },
    {
      description: "too many compact arguments",
      source: "{{ 'a,b,c' | split: ',' | compact: 'foo', 'bar' }}",
      want: "compact: too many arguments, expected at most 1, but got 2",
      globals: {},
    },
    {
      description: "too many concat arguments",
      source: "{{ 'a,b,c' | split: ',' | concat: foo, 'bar' }}",
      want: "concat: too many arguments, expected at most 1, but got 2",
      globals: { foo: [1, 2, 3] },
    },
    {
      description: "too few concat arguments",
      source: "{{ 'a,b,c' | split: ',' | concat }}",
      want: "concat: missing argument, expected at least 1, but got 0",
      globals: {},
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)("$description", async ({ source, want }: Case) => {
      expect(async () => {
        const template = env.fromString(source);
        await template.render();
      }).rejects.toThrow(new RegExp(`^${want}`));
    });
  });

  describe("sync", () => {
    test.each<Case>(cases)("$description", async ({ source, want }: Case) => {
      expect(() => {
        const template = env.fromString(source);
        template.renderSync();
      }).toThrow(new RegExp(`^${want}`));
    });
  });
});
