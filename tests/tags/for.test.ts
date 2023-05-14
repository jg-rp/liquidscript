import { Environment } from "../../src/environment";
import { LaxUndefined } from "../../src/undefined";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in for tag", () => {
  const env = new Environment({ undefinedFactory: (n) => new LaxUndefined(n) });
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
    {
      description: "parentloop is normally undefined",
      source: "{% for i in (1..2)%}{{ forloop.parentloop.index }}{% endfor %}",
      want: "",
      globals: {},
    },
    {
      description: "access parentloop",
      source:
        "{% for i in (1..2)%}" +
        "{% for j in (1..2) %}" +
        "{{ i }} {{j}} {{ forloop.parentloop.index }} {{ forloop.index }} " +
        "{% endfor %}" +
        "{% endfor %}",
      want: "1 1 1 1 1 2 1 2 2 1 2 1 2 2 2 2 ",
      globals: {},
    },
    {
      description: "parentloop goes out of scope",
      source:
        "{% for i in (1..2)%}" +
        "{% for j in (1..2) %}" +
        "{{ i }} {{ j }} " +
        "{% endfor %}" +
        "{{ forloop.parentloop.index }}" +
        "{% endfor %}",
      want: "1 1 1 2 2 1 2 2 ",
      globals: {},
    },
    {
      description: "parent's parentloop",
      source:
        "{% for i in (1..2) %}" +
        "{% for j in (1..2) %}" +
        "{% for k in (1..2) %}" +
        "i={{ forloop.parentloop.parentloop.index }} " +
        "j={{ forloop.parentloop.index }} " +
        "k={{ forloop.index }} " +
        "{% endfor %}" +
        "{% endfor %}" +
        "{% endfor %}",
      want:
        "i=1 j=1 k=1 i=1 j=1 k=2 " +
        "i=1 j=2 k=1 i=1 j=2 k=2 " +
        "i=2 j=1 k=1 i=2 j=1 k=2 " +
        "i=2 j=2 k=1 i=2 j=2 k=2 ",
      globals: {},
    },
    {
      description: "loop over an array in reverse",
      source: "{% for tag in product.tags reversed %}{{ tag }} {% endfor %}",
      want: "garden sports ",
      globals: { product: { tags: ["sports", "garden"] } },
    },
    {
      description: "continue a loop",
      source:
        "{% for item in array limit: 3 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in array offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}",
      want: "a1 a2 a3 b4 b5 b6 ",
      globals: { array: [1, 2, 3, 4, 5, 6] },
    },
    {
      description: "continue a loop over an assigned range",
      source:
        "{% assign nums = (1..5) %}" +
        "{% for item in nums limit: 3 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in nums offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}",
      globals: {},
      want: "a1 a2 a3 b4 b5 ",
    },
    {
      description: "continue a loop over a changing array",
      source:
        "{% assign foo = '1,2,3,4,5,6' | split: ',' %}" +
        "{% for item in foo limit: 3 %}" +
        "{{ item }} " +
        "{% endfor %}" +
        "{% assign foo = 'u,v,w,x,y,z' | split: ',' %}" +
        "{% for item in foo offset: continue %}" +
        "{{ item }} " +
        "{% endfor %}",
      want: "1 2 3 x y z ",
      globals: {},
    },
    {
      description: "continue with changing loop var",
      source:
        "{% for foo in array limit: 3 %}" +
        "{{ foo }} " +
        "{% endfor %}" +
        "{% for bar in array offset: continue %}" +
        "{{ bar }} " +
        "{% endfor %}",
      want: "1 2 3 1 2 3 4 5 6 ",
      globals: { array: [1, 2, 3, 4, 5, 6] },
    },
    {
      description: "nothing to continue from",
      source:
        "{% for item in array %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in array offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}",
      want: "a1 a2 a3 a4 a5 a6 ",
      globals: { array: [1, 2, 3, 4, 5, 6] },
    },
    {
      description: "offset continue without preceding loop",
      source: "{% for item in array offset: continue %}{{ item }} {% endfor %}",
      want: "1 2 3 4 5 6 ",
      globals: { array: [1, 2, 3, 4, 5, 6] },
    },
    {
      description: "limit that is greater than length",
      source: "{% for item in array limit: 99 %}a{{ item }} {% endfor %}",
      want: "a1 a2 a3 a4 a5 a6 ",
      globals: { array: [1, 2, 3, 4, 5, 6] },
    },
    {
      description: "continue from a limit that is greater than length",
      source:
        "{% for item in array limit: 99 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in array offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}",
      want: "a1 a2 a3 a4 a5 a6 ",
      globals: { array: [1, 2, 3, 4, 5, 6] },
    },
    {
      description: "continue from a range expression",
      source:
        "{% for item in (1..6) limit: 3 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}",
      want: "a1 a2 a3 b4 b5 b6 ",
      globals: { array: [1, 2, 3, 4, 5, 6] },
    },
    {
      description: "offset continue twice with limit",
      source:
        "{% for item in (1..6) limit: 2 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) limit: 2 offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "c{{ item }} " +
        "{% endfor %}",
      globals: {},
      want: "a1 a2 b3 b4 c5 c6 ",
    },
    {
      description: "offset continue twice with changing limit",
      source:
        "{% for item in (1..6) limit: 2 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) limit: 3 offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "c{{ item }} " +
        "{% endfor %}",
      globals: {},
      want: "a1 a2 b3 b4 b5 c6 ",
    },
    {
      description: "offset continue twice with no second limit",
      source:
        "{% for item in (1..6) limit: 2 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "c{{ item }} " +
        "{% endfor %}",
      globals: {},
      want: "a1 a2 b3 b4 b5 b6 ",
    },
    {
      description: "offset continue from a broken loop",
      source:
        "{% for item in (1..6) limit: 4 %}" +
        "{% if item == 3 %}{% break %}{% endif %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "b{{ item }} " +
        "{% endfor %}",
      globals: {},
      want: "a1 a2 b5 b6 ",
    },
    {
      description: "offset continue from a broken loop with preceding limit",
      source:
        "{% for item in (1..6) limit: 3 %}" +
        "a{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) %}" +
        "{% if item == 3 %}{% break %}{% endif %}" +
        "b{{ item }} " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "c{{ item }} " +
        "{% endfor %}",
      globals: {},
      want: "a1 a2 a3 b1 b2 ",
    },
    {
      description: "offset continue forloop length",
      source:
        "{% for item in (1..6) limit: 2 %}" +
        "a{{ item }} - {{ forloop.length }}, " +
        "{% endfor %}" +
        "{% for item in (1..6) offset: continue %}" +
        "b{{ item }} - {{ forloop.length }}, " +
        "{% endfor %}",
      globals: {},
      want: "a1 - 2, a2 - 2, b3 - 4, b4 - 4, b5 - 4, b6 - 4, ",
    },
    {
      description: "first and last with offset continue",
      source:
        "{% for tag in product.tags limit: 1 %}" +
        "{% endfor %}" +
        "{% for tag in product.tags offset: continue %}" +
        "{{ forloop.first }} {{ forloop.last }} " +
        "{% endfor %}",
      want: "true false false false false false false false false true ",
      globals: {
        product: {
          tags: ["sports", "garden", "home", "diy", "motoring", "fashion"],
        },
      },
    },
    {
      description: "suppress empty blocks",
      source:
        "!{% for i in (1..3) %}" +
        "\n\n\n    {% assign x = 7 %}\n" +
        "{% endfor %}!",
      want: "!!",
      globals: {},
    },
    {
      description: "don't suppress blocks with output statements",
      source: "!{% for i in (1..3) %}\n\n\n    {{ '' }}\n{% endfor %}!",
      want: "!\n\n\n    \n\n\n\n    \n\n\n\n    \n!",
      globals: {},
    },
    {
      description: "range with same start and stop",
      source: "{% for i in (1..1) %}{{ i }}{% endfor %}",
      globals: {},
      want: "1",
    },
    {
      description: "comma separated arguments",
      source: "{% for i in (1..6) limit: 4, offset: 2, %}{{ i }} {% endfor %}",
      globals: {},
      want: "3 4 5 6 ",
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
