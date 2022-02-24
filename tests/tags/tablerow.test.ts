import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in tablerow tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "one row",
      source: "{% tablerow tag in collection.tags %}{{ tag }}{% endtablerow %}",
      globals: {
        collection: {
          tags: ["tag1", "tag2", "tag3", "tag4"],
        },
      },
      want:
        '<tr class="row1">\n' +
        '<td class="col1">tag1</td>' +
        '<td class="col2">tag2</td>' +
        '<td class="col3">tag3</td>' +
        '<td class="col4">tag4</td>' +
        "</tr>\n",
    },
    {
      description: "one row with limit",
      source:
        "{% tablerow tag in collection.tags limit: 2 %}" +
        "{{ tag }}" +
        "{% endtablerow %}",
      globals: {
        collection: {
          tags: ["tag1", "tag2", "tag3", "tag4"],
        },
      },
      want:
        '<tr class="row1">\n' +
        '<td class="col1">tag1</td>' +
        '<td class="col2">tag2</td>' +
        "</tr>\n",
    },
    {
      description: "one row with offset",
      source:
        "{% tablerow tag in collection.tags offset: 2 %}" +
        "{{ tag }}" +
        "{% endtablerow %}",
      globals: {
        collection: {
          tags: ["tag1", "tag2", "tag3", "tag4"],
        },
      },
      want:
        '<tr class="row1">\n' +
        '<td class="col1">tag3</td>' +
        '<td class="col2">tag4</td>' +
        "</tr>\n",
    },
    {
      description: "two columns",
      source:
        "{% tablerow tag in collection.tags cols: 2 %}" +
        "{{ tag }}" +
        "{% endtablerow %}",
      globals: {
        collection: {
          tags: ["tag1", "tag2", "tag3", "tag4"],
        },
      },
      want:
        '<tr class="row1">\n' +
        '<td class="col1">tag1</td>' +
        '<td class="col2">tag2</td>' +
        "</tr>\n" +
        '<tr class="row2">' +
        '<td class="col1">tag3</td>' +
        '<td class="col2">tag4</td>' +
        "</tr>\n",
    },
    {
      description: "two column odd range",
      source:
        "{% tablerow i in (1..5) cols:2 %}" +
        "{{ i }} {{ tablerowloop.col_first }}" +
        "{% endtablerow %}",
      globals: {},
      want:
        '<tr class="row1">\n' +
        '<td class="col1">1 true</td>' +
        '<td class="col2">2 false</td>' +
        "</tr>\n" +
        '<tr class="row2">' +
        '<td class="col1">3 true</td>' +
        '<td class="col2">4 false</td>' +
        "</tr>\n" +
        '<tr class="row3">' +
        '<td class="col1">5 true</td>' +
        "</tr>\n",
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
