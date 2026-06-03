import { parse } from "../src/liquidscript";
import { TemplateSyntaxError } from "../src/errors";

describe("syntax errors", () => {
  test("missing if tag expression", () => {
    expect(() => parse("{% if %}foo{% endif %}")).toThrow(TemplateSyntaxError);
  });

  test("missing tag name", () => {
    expect(() => parse("{%  %}foo{% endif %}")).toThrow(TemplateSyntaxError);
  });

  test("missing end tag at end of file", () => {
    expect(() => parse("{% if true %}foo{% assign bar = 'baz' %}")).toThrow(
      TemplateSyntaxError,
    );

    expect(() => parse("{% if true %}foo{% assign bar = 'baz' %}")).toThrow(
      /expected tag endif/,
    );
  });

  test("unexpected tag name", () => {
    expect(() => parse("{% foo true %}foo{% endfoo %}")).toThrow(
      TemplateSyntaxError,
    );

    expect(() => parse("{% foo true %}foo{% endfoo %}")).toThrow(
      /unexpected tag "foo"/,
    );
  });

  test("end tag mismatch", () => {
    expect(() => parse("{% if true %}foo{% endunless %}")).toThrow(
      TemplateSyntaxError,
    );

    expect(() => parse("{% if true %}foo{% endunless %}")).toThrow(
      /unexpected tag "endunless"/,
    );
  });

  test("unknown prefix operator", () => {
    expect(() => parse("{{ -'foo' }}")).toThrow(TemplateSyntaxError);
  });

  test("missing 'in' in for expression", () => {
    expect(() => parse("{% for x (0..3) %}{{ x }}{% endfor %}")).toThrow(
      TemplateSyntaxError,
    );

    expect(() => parse("{% for x (0..3) %}{{ x }}{% endfor %}")).toThrow(
      /missing 'in'/,
    );
  });

  test("missing for tag expression", () => {
    expect(() => parse("{% for x in %}{{ x }}foo{% endfor %}")).toThrow(
      TemplateSyntaxError,
    );

    expect(() => parse("{% for x in %}{{ x }}foo{% endfor %}")).toThrow(
      /missing expression/,
    );
  });

  test("for tag variable with path segments", () => {
    expect(() => parse("{% for x.y in (2..4) %}{{ x }}{% endfor %}")).toThrow(
      TemplateSyntaxError,
    );

    expect(() => parse("{% for x.y in (2..4) %}{{ x }}{% endfor %}")).toThrow(
      /expected an identifier, found a path/,
    );
  });

  test("assign tag variable with path segments", () => {
    expect(() =>
      parse("{% assign foo.bar = 'hello there'%}{{ foo.bar }}"),
    ).toThrow(TemplateSyntaxError);

    expect(() =>
      parse("{% assign foo.bar = 'hello there'%}{{ foo.bar }}"),
    ).toThrow(/expected an identifier, found a path/);
  });

  test("missing assignment operator", () => {
    expect(() => parse("{% assign x 5 %}")).toThrow(TemplateSyntaxError);

    expect(() => parse("{% assign x 5 %}")).toThrow(
      /bad identifier or missing assignment operator/,
    );
  });

  test("invalid bracketed segment", () => {
    expect(() => parse("{{ foo[1.2] }}")).toThrow(TemplateSyntaxError);

    expect(() => parse("{{ foo[1.2] }}")).toThrow(
      /expected an integer, identifier or string/,
    );
  });

  test("unknown operator", () => {
    expect(() => parse("{% if 1 =! 2 %}ok{% endif %}")).toThrow(
      TemplateSyntaxError,
    );
  });

  test("junk in liquid tag", () => {
    const source =
      "{{ 'hello' }}\n" +
      "{% liquid\n" +
      "echo 'foo'\n" +
      "aiu34bseu\n" +
      "%}\n";

    expect(() => parse(source)).toThrow(TemplateSyntaxError);
    expect(() => parse(source)).toThrow(/unexpected tag "aiu34bseu"/);
  });
});
