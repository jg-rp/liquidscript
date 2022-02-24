import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  want: string;
};

describe("built-in capture tag", () => {
  const env = new Environment({
    globals: { customer: { first_name: "Sally" } },
  });

  const cases: Case[] = [
    {
      description: "capture template literals and global variable",
      source:
        "{% capture greeting %}" +
        "Hello, {{ customer.first_name }}" +
        "{% endcapture %}" +
        "{{ greeting }}",
      want: "Hello, Sally",
    },
    {
      description: "capture into a variable with a hyphen",
      source:
        "{% capture some-greeting %}" +
        "Hello, {{ customer.first_name }}" +
        "{% endcapture %}" +
        "{{ some-greeting }}",
      want: "Hello, Sally",
    },
    {
      description: "assign the value of a captured variable",
      source:
        "{% capture greeting %}" +
        "Hello" +
        "{% endcapture %}" +
        "{% assign x = greeting %}" +
        "{{ greeting }}-{{ x }}",
      want: "Hello-Hello",
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
