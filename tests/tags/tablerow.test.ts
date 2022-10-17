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
    {
      description: "no cols param",
      source:
        "{% tablerow i in (1..2) %}\n" +
        "col: {{ tablerowloop.col }}\n" +
        "col0: {{ tablerowloop.col0 }}\n" +
        "col_first: {{ tablerowloop.col_first }}\n" +
        "col_last: {{ tablerowloop.col_last }}\n" +
        "first: {{ tablerowloop.first }}\n" +
        "index: {{ tablerowloop.index }}\n" +
        "index0: {{ tablerowloop.index0 }}\n" +
        "last: {{ tablerowloop.last }}\n" +
        "length: {{ tablerowloop.length }}\n" +
        "rindex: {{ tablerowloop.rindex }}\n" +
        "rindex0: {{ tablerowloop.rindex0 }}\n" +
        "row: {{ tablerowloop.row }}\n" +
        "{% endtablerow %}",
      globals: {},
      want:
        '<tr class="row1">\n' +
        '<td class="col1">\n' +
        "col: 1\n" +
        "col0: 0\n" +
        "col_first: true\n" +
        "col_last: false\n" +
        "first: true\n" +
        "index: 1\n" +
        "index0: 0\n" +
        "last: false\n" +
        "length: 2\n" +
        "rindex: 2\n" +
        "rindex0: 1\n" +
        "row: 1\n" +
        '</td><td class="col2">\n' +
        "col: 2\n" +
        "col0: 1\n" +
        "col_first: false\n" +
        "col_last: true\n" +
        "first: false\n" +
        "index: 2\n" +
        "index0: 1\n" +
        "last: true\n" +
        "length: 2\n" +
        "rindex: 1\n" +
        "rindex0: 0\n" +
        "row: 1\n" +
        "</td></tr>\n",
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
