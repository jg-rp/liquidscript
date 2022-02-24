import { Environment } from "../../src/environment";

// TODO: Finish tests, reversed

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in for tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "range",
      source: "{% for i in (1..3) %}{{ i }}{% endfor %}",
      globals: {},
      want: "123",
    },
    {
      description: "range with variable stop",
      source: "{% for i in (1..b) %}{{ i }}{% endfor %}",
      globals: { b: 3 },
      want: "123",
    },
    {
      description: "range with limit",
      source: "{% for i in (1..3) limit:2 %}{{ i }}{% endfor %}",
      globals: {},
      want: "12",
    },
    {
      description: "range with offset",
      source: "{% for i in (1..3) offset:1 %}{{ i }}{% endfor %}",
      globals: {},
      want: "23",
    },
    {
      description: "range with offset and limit",
      source: "{% for i in (1..4) offset:1 limit:2 %}{{ i }}{% endfor %}",
      globals: {},
      want: "23",
    },
    {
      description: "iterate an array",
      source: "{% for tag in product.tags %}{{ tag }} {% endfor %}",
      globals: {
        product: { tags: ["sports", "garden"] },
      },
      want: "sports garden ",
    },
    {
      description: "iterate a Set",
      source: "{% for tag in product.tags %}{{ tag }} {% endfor %}",
      globals: {
        product: { tags: new Set(["sports", "garden"]) },
      },
      want: "sports garden ",
    },
    {
      description: "iterate a hash/types",
      source:
        "{% for field in collection %}{{ field[0] }}: {{ field[1] }}, {% endfor %}",
      globals: {
        collection: { title: "Garden", description: "Things for the garden" },
      },
      want: "title: Garden, description: Things for the garden, ",
    },
    {
      description: "iterate a Map",
      source:
        "{% for field in collection %}{{ field[0] }}: {{ field[1] }}, {% endfor %}",
      globals: {
        collection: new Map([
          ["title", "Garden"],
          ["description", "Things for the garden"],
        ]),
      },
      want: "title: Garden, description: Things for the garden, ",
    },
    {
      description: "empty iterable with default",
      source: "{% for tag in tags %}{{ tag }} {% else %}nothing{% endfor %}",
      globals: { tags: [] },
      want: "nothing",
    },
    {
      description: "break",
      source:
        "{% for tag in tags %}" +
        "{% if tag == 'garden' %}{% break %}{% endif %}" +
        "{{ tag }} " +
        "{% endfor %}",
      globals: {
        tags: ["sports", "garden", "household"],
      },
      want: "sports ",
    },
    {
      description: "continue",
      source:
        "{% for tag in tags %}" +
        "{% if tag == 'garden' %}{% continue %}{% endif %}" +
        "{{ tag }} " +
        "{% endfor %}",
      globals: {
        tags: ["sports", "garden", "household"],
      },
      want: "sports household ",
    },
    {
      description: "forloop length",
      source: "{% for tag in tags %}{{ forloop.length }} {% endfor %}",
      globals: {
        tags: ["sports", "garden", "household"],
      },
      want: "3 3 3 ",
    },
    {
      description: "forloop length with limit",
      source: "{% for tag in tags limit:2 %}{{ forloop.length }} {% endfor %}",
      globals: {
        tags: ["sports", "garden", "household"],
      },
      want: "2 2 ",
    },
    {
      description: "forloop length with offset",
      source: "{% for tag in tags offset:1 %}{{ forloop.length }} {% endfor %}",
      globals: {
        tags: ["sports", "garden", "household"],
      },
      want: "2 2 ",
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
