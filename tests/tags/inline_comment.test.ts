import { Environment } from "../../src/environment";
import { LiquidSyntaxError } from "../../src/errors";

type Case = {
  description: string;
  source: string;
  want: string;
};

describe("built-in inline comment tag", () => {
  const env = new Environment({});
  const cases: Case[] = [
    {
      description: "with whitespace control and padding",
      source: "{%- # some comment -%}",
      want: "",
    },
    {
      description: "with whitespace control no padding",
      source: "\n{%-# some comment -%}\t \r",
      want: "",
    },
    {
      description: "no whitespace control with padding",
      source: "{% # some comment %}",
      want: "",
    },
    {
      description: "no whitespace control no padding",
      source: "{%# some comment %}",
      want: "",
    },
    {
      description: "no padding after the hash",
      source: "{%#some comment %}",
      want: "",
    },
    {
      description: "empty",
      source: "{%#%}",
      want: "",
    },
    {
      description: "liquid tag",
      source: [
        "{% liquid ",
        "  # first comment line",
        "  # second comment line",
        "",
        "  # another comment line",
        "  echo 'Hello '",
        "",
        "  # more comments",
        "  echo 'goodbye'",
        "-%}",
      ].join("\n"),
      want: "Hello goodbye",
    },
    {
      description: "multiple lines",
      source: [
        "{%-",
        "  # spread inline comments",
        "  # over multiple lines",
        "-%}",
      ].join("\n"),
      want: "",
    },
    {
      description: "lots of hashes in a liquid tag",
      source: [
        "{% liquid",
        "  ##########################",
        "  # spread inline comments #",
        "  ##########################",
        "-%}",
      ].join("\n"),
      want: "",
    },

    {
      description: "can't comment tags",
      source: "{%- # {% echo 'hello world' %} -%}",
      want: " -%}",
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

  describe("enforce leading hash", () => {
    expect(() => {
      env.fromString(
        [
          "{%-",
          "  # spread inline comments",
          "  over multiple lines",
          "-%}",
        ].join("\n")
      );
    }).toThrow(LiquidSyntaxError);
  });
});
