import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  want: string;
};

describe("built-in assign tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "assign a literal",
      source: "{% assign x = 'hello' %}{{ x }}",
      want: "hello",
    },
    {
      description: "assign a filtered literal",
      source: "{% assign x = 'hello ' | append: 'world' %}{{ x }}",
      want: "hello world",
    },
    {
      description: "assign a range literal",
      source: "{% assign x = (1..3) %}{{ x | join: '#' }}",
      want: "1#2#3",
    },
    {
      description: "multi-line assign",
      source: `{% assign x 
        = 'hello '
        | append: 'world' %}{{ x }}`,
      want: "hello world",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)("$description", async ({ source, want }: Case) => {
      const template = env.fromString(source);
      const result = await template.render();
      expect(result).toBe(want);
    });
  });

  describe("sync", () => {
    test.each<Case>(cases)("$description", async ({ source, want }: Case) => {
      const template = env.fromString(source);
      expect(template.renderSync()).toBe(want);
    });
  });
});
