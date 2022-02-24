import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  want: string;
};

describe("built-in increment tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "named counter",
      source: "{% increment foo %}{{ foo }} {% increment foo %}{{ foo }}",
      want: "01 12",
    },
    {
      description: "increment and decrement named counter",
      source:
        "{% increment foo %} {% increment foo %} {% decrement foo %} {{ foo }}",
      want: "0 1 1 1",
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
