import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  want: string;
};

describe("built-in decrement tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "named counter",
      source: "{% decrement foo %}{{ foo }} {% decrement foo %}{{ foo }}",
      want: "-1-1 -2-2",
    },
    {
      description: "increment and decrement named counter",
      source:
        "{% decrement foo %} {% decrement foo %} {% increment foo %} {{ foo }}",
      want: "-1 -2 -2 -1",
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
