import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  want: string;
};

describe("built-in comment tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "only comment",
      source: "{% comment %}hello{% endcomment %}",
      want: "",
    },
    {
      description: "whitespace control",
      source: "\n{%- comment %}hello{% endcomment -%}\t \r",
      want: "",
    },
    {
      description: "don't render commented out tags",
      source:
        "{% comment %}" +
        "{% if true %}" +
        "{{ title }}" +
        "{% endif %}" +
        "{% endcomment %}",
      want: "",
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
