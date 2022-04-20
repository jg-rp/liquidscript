import { Environment } from "../../../src/environment";
import { IfNotTag } from "../../../src/extra/tags/ifnot";
import { LaxUndefined } from "../../../src/undefined";

// TODO: Finish tests

describe("render an 'if not' tag", () => {
  const env = new Environment({ undefinedFactory: LaxUndefined.from });
  env.addTag("if", new IfNotTag());

  test("not false", async () => {
    const template = env.fromString("{% if not false %}foo{% endif %}");
    expect(template.renderSync()).toBe("foo");
    expect(template.render()).resolves.toBe("foo");
  });

  test("not true", async () => {
    const template = env.fromString("{% if not true %}foo{% endif %}");
    expect(template.renderSync()).toBe("");
    expect(template.render()).resolves.toBe("");
  });

  test("without parens", async () => {
    const template = env.fromString(
      "{% if true and false and false or true %}true{% else %}false{% endif %}"
    );
    expect(template.renderSync()).toBe("false");
    expect(template.render()).resolves.toBe("false");
  });

  test("with parens", async () => {
    const template = env.fromString(
      "{% if (true and false and false) or true %}true{% else %}false{% endif %}"
    );
    expect(template.renderSync()).toBe("true");
    expect(template.render()).resolves.toBe("true");
  });

  test("nested parens", async () => {
    const template = env.fromString(
      "{% if ((true or false) or (false)) and true %}true{% else %}false{% endif %}"
    );
    expect(template.renderSync()).toBe("true");
    expect(template.render()).resolves.toBe("true");
  });

  test("range equals range", async () => {
    const template = env.fromString(
      "{% if (1..3) == (1..3) %}true{% else %}false{% endif %}"
    );
    expect(template.renderSync()).toBe("true");
    expect(template.render()).resolves.toBe("true");
  });

  test("too many right parens", async () => {
    expect(() =>
      env.fromString(
        "{% if (true or false)) and true %}true{% else %}false{% endif %}"
      )
    ).toThrow("unbalanced parentheses");
  });

  test("too many left parens", async () => {
    expect(() =>
      env.fromString(
        "{% if (((true or false)) and true %}true{% else %}false{% endif %}"
      )
    ).toThrow("unbalanced parentheses");
  });

  test("don't count parens in string literals", async () => {
    const template = env.fromString(
      "{% if (x == ')') %}true{% else %}false{% endif %}"
    );
    expect(template.renderSync({ x: ")" })).toBe("true");
  });
});
