import { Environment } from "../../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in liquid tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "newline terminated tags",
      source: [
        "{% liquid",
        "if product.title",
        "   echo product.title | upcase",
        "else",
        "   echo 'product-1' | upcase ",
        "endif",
        "",
        "for i in (0..5)",
        "   echo i",
        "endfor %}",
      ].join("\n"),
      want: "FOO012345",
      globals: { product: { title: "foo" } },
    },
    {
      description: "carriage return and newline terminated tags",
      source: [
        "{% liquid",
        "if product.title",
        "   echo product.title | upcase",
        "else",
        "   echo 'product-1' | upcase ",
        "endif",
        "",
        "for i in (0..5)",
        "   echo i",
        "endfor %}",
      ].join("\r\n"),
      want: "FOO012345",
      globals: { product: { title: "foo" } },
    },
    {
      description: "empty liquid tag",
      source: "{% liquid %}",
      globals: {},
      want: "",
    },
    {
      description: "only whitespace",
      source: "{% liquid\n   \n\n   \t \n\t\n  %}",
      globals: {},
      want: "",
    },
    {
      description: "single line comment tag",
      source: [
        "{% liquid",
        "comment this is a comment",
        "endcomment",
        "%}",
      ].join("\n"),
      globals: {},
      want: "",
    },
    {
      description: "multi-line comment tag",
      source: [
        "{% liquid",
        "comment this is a comment",
        "split over two lines",
        "endcomment",
        "%}",
      ].join("\n"),
      globals: {},
      want: "",
    },
    {
      description: "whitespace control",
      source: [
        "Hello,     ",
        "{%- liquid",
        "  echo ' World! '",
        "-%}",
        "   Goodbye.",
      ].join("\n"),
      globals: {},
      want: "Hello, World! Goodbye.",
    },
    {
      description: "reference test #2",
      source: [
        "{%- liquid",
        "  for value in array",
        "    echo value",
        "    unless forloop.last",
        "      echo '#'",
        "    endunless",
        "  endfor",
        "-%}",
      ].join("\n"),
      want: "1#2#3",
      globals: { array: [1, 2, 3] },
    },
    {
      description: "reference test #3",
      source: [
        "{%- liquid",
        "  for value in array",
        "    assign double_value = value | times: 2",
        "    echo double_value | times: 2",
        "    unless forloop.last",
        "      echo '#'",
        "    endunless",
        "  endfor",
        "",
        "  echo '#'",
        "  echo double_value",
        "-%}",
      ].join("\n"),
      want: "4#8#12#6",
      globals: { array: [1, 2, 3] },
    },
    {
      description: "reference test #4",
      source: ["{%- liquid echo 'a' -%}", "b", "{%- liquid echo 'c' -%}"].join(
        "\n"
      ),
      globals: {},
      want: "abc",
    },
    {
      description: "nested liquid",
      source: [
        "{%- if true %}",
        "  {%- liquid",
        '    echo "good"',
        "  %}",
        "{%- endif -%}",
      ].join("\n"),
      globals: {},
      want: "good",
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
