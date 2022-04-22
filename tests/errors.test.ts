import {
  Environment,
  LaxUndefined,
  LiquidSyntaxError,
} from "../src/liquidscript";

describe("syntax errors", () => {
  const env = new Environment({ undefinedFactory: LaxUndefined.from });

  test("missing tag expression", () => {
    expect(() =>
      env.fromString("{% if %}foo{% endif %}", undefined, {
        name: "some.liquid",
      })
    ).toThrowError(LiquidSyntaxError);
  });

  test("missing tag name", () => {
    expect(() =>
      env.fromString("{% %}foo{% end %}", undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
  });

  test("missing end tag at end of file", () => {
    expect(() =>
      env.fromString("{% if true %}foo{% assign bar = 'baz' %}", undefined, {
        name: "some.liquid",
      })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString("{% if true %}foo{% assign bar = 'baz' %}", undefined, {
        name: "some.liquid",
      })
    ).toThrowError(/missing end tag, expected endif, elsif, else/);
  });

  test("unexpected tag name", () => {
    expect(() =>
      env.fromString("{% foo true %}foo{% endfoo %}", undefined, {
        name: "some.liquid",
      })
    ).toThrowError(LiquidSyntaxError);
  });

  test("end tag mismatch", () => {
    expect(() =>
      env.fromString("{% if true %}foo{% endunless %}", undefined, {
        name: "some.liquid",
      })
    ).toThrowError(LiquidSyntaxError);
  });

  test("unknown prefix operator", () => {
    expect(() =>
      env.fromString("{{ -'foo' }}", undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
  });

  test("orphaned break", () => {
    expect(() =>
      env
        .fromString("{% break %}", undefined, { name: "some.liquid" })
        .renderSync()
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env
        .fromString("{% break %}", undefined, { name: "some.liquid" })
        .renderSync()
    ).toThrowError("unexpected 'break' (some.liquid:1)");
  });

  test("orphaned continue", () => {
    expect(() =>
      env
        .fromString("{% continue %}", undefined, { name: "some.liquid" })
        .renderSync()
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env
        .fromString("{% continue %}", undefined, { name: "some.liquid" })
        .renderSync()
    ).toThrowError("unexpected 'continue' (some.liquid:1)");
  });

  test("orphaned when", () => {
    expect(() =>
      env
        .fromString("{% when %}", undefined, { name: "some.liquid" })
        .renderSync()
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env
        .fromString("{% when %}", undefined, { name: "some.liquid" })
        .renderSync()
    ).toThrowError("unexpected tag 'when' (some.liquid:1)");
  });

  test("missing 'in' in for expression", () => {
    expect(() =>
      env.fromString("{% for x (0..3) %}{{ x }}{% endfor %}", undefined, {
        name: "some.liquid",
      })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString("{% for x (0..3) %}{{ x }}{% endfor %}", undefined, {
        name: "some.liquid",
      })
    ).toThrowError("expected 'in', found '(' (some.liquid:1)");
  });

  test("missing range or identifier in for expression", () => {
    const source = "{% for x in %}{{ x }}foo{% endfor %}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("invalid loop expression (some.liquid:1)");
  });

  test("float with trailing dot in range literal", () => {
    const source = "{% for x in (2...4) %}{{ x }}{% endfor %}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("unexpected '.' in range expression (some.liquid:1)");
  });

  test("chained identifier for loop variable", () => {
    const source = "{% for x.y in (2..4) %}{{ x }}{% endfor %}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("expected 'in', found '.' (some.liquid:1)");
  });

  test("missing equal in assignment tag", () => {
    const source = "{% assign x 5 %}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("invalid assignment expression 'x 5' (some.liquid:1)");
  });

  test("invalid subscript identifier", () => {
    const source = "{{ foo[1.2] }}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(
      "expected 'TOKEN_IDENT', found 'TOKEN_FLOAT' (some.liquid:1)"
    );
  });

  test("unknown infix operator", () => {
    const source = "{% if 1 =! 2 %}ok{% endif %}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("unknown operator '=!' (some.liquid:1)");
  });

  test("junk in liquid tag", () => {
    const source =
      "{{ 'hello' }}\n" +
      "{% liquid\n" +
      "echo 'foo'\n" +
      "aiu34bseu\n" +
      "%}\n";

    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("unexpected tag 'aiu34bseu' (some.liquid:4)");
  });

  test("unexpected tag name inside block with line numbers", () => {
    const source = "Hello\n\n{% if true %}\n{% foo %}{% endfoo %}\n{% endif %}";

    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("unexpected tag 'foo' (some.liquid:4)");
  });

  test("missing close bracket", () => {
    const source = "text {{method} oh nos!";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("expected '}}', found 'eof' (some.liquid:1)");
  });

  test("missing close tag", () => {
    const source = "text {%method} oh nos!";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError("expected '%}', found 'eof' (some.liquid:1)");
  });

  test("bad assignment identifier", () => {
    const source = "{% assign foo+bar = 'hello there'%}{{ foo+bar }}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(
      "invalid assignment expression 'foo+bar = 'hello there'' (some.liquid:1)"
    );
  });

  test("chained assignment identifier", () => {
    const source = "{% assign foo.bar = 'hello there'%}{{ foo.bar }}";
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(LiquidSyntaxError);
    expect(() =>
      env.fromString(source, undefined, { name: "some.liquid" })
    ).toThrowError(
      "invalid assignment expression 'foo.bar = 'hello there'' (some.liquid:1)"
    );
  });
});

describe("render context errors", () => {
  test("max context depth", () => {
    const env = new Environment({ maxContextDepth: 3 });
    const template = env.fromString(
      "{% for i in (1..3) %}" +
        "{% for j in (1..3) %}" +
        "{% for k in (1..3) %}" +
        "Hello, {{ you }}!" +
        "{% endfor %}" +
        "{% endfor %}" +
        "{% endfor %}"
    );
    expect(() => template.renderSync({ you: "World" })).toThrowError(
      "maximum context depth reached"
    );
  });
});
