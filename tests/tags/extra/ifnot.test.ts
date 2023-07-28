import { Environment } from "../../../src/environment";
import { IfNotTag } from "../../../src/extra/tags/ifnot";
import { LaxUndefined } from "../../../src/undefined";

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
      "{% if true and false and false or true %}true{% else %}false{% endif %}",
    );
    expect(template.renderSync()).toBe("false");
    expect(template.render()).resolves.toBe("false");
  });

  test("with parens", async () => {
    const template = env.fromString(
      "{% if (true and false and false) or true %}true{% else %}false{% endif %}",
    );
    expect(template.renderSync()).toBe("true");
    expect(template.render()).resolves.toBe("true");
  });

  test("nested parens", async () => {
    const template = env.fromString(
      "{% if ((true or false) or (false)) and true %}true{% else %}false{% endif %}",
    );
    expect(template.renderSync()).toBe("true");
    expect(template.render()).resolves.toBe("true");
  });

  test("range equals range", async () => {
    const template = env.fromString(
      "{% if (1..3) == (1..3) %}true{% else %}false{% endif %}",
    );
    expect(template.renderSync()).toBe("true");
    expect(template.render()).resolves.toBe("true");
  });

  test("too many right parens", async () => {
    expect(() =>
      env.fromString(
        "{% if (true or false)) and true %}true{% else %}false{% endif %}",
      ),
    ).toThrow("unmatched ')'");
  });

  test("too many left parens", async () => {
    expect(() =>
      env.fromString(
        "{% if (((true or false)) and true %}true{% else %}false{% endif %}",
      ),
    ).toThrow("unbalanced parentheses");
  });

  test("don't count parens in string literals", async () => {
    const template = env.fromString(
      "{% if (x == ')') %}true{% else %}false{% endif %}",
    );
    expect(template.renderSync({ x: ")" })).toBe("true");
  });
});

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("built-in if tag", () => {
  const env = new Environment({});
  env.addTag("if", new IfNotTag());
  const cases: Case[] = [
    {
      description: "if true",
      source: "{% if true %}hello{% endif %}",
      globals: {},
      want: "hello",
    },
    {
      description: "if false",
      source: "{% if false %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "true alternative branch",
      source: "{% if true %}hello{% else %}goodbye{% endif %}",
      globals: {},
      want: "hello",
    },
    {
      description: "false alternative branch",
      source: "{% if false %}hello{% else %}goodbye{% endif %}",
      globals: {},
      want: "goodbye",
    },
    {
      description: "true conditional alternative branch",
      source: "{% if false %}hello{% elsif true %}g'day{% endif %}",
      globals: {},
      want: "g'day",
    },
    {
      description: "false conditional alternative branch",
      source: "{% if false %}hello{% elsif false %}g'day{% endif %}",
      globals: {},
      want: "",
    },
    {
      description:
        "true conditional alternative branch with alternative branch",
      source:
        "{% if false %}hello{% elsif true %}g'day{% else %}goodbye{% endif %}",
      globals: {},
      want: "g'day",
    },
    {
      description:
        "false conditional alternative branch with alternative branch",
      source:
        "{% if false %}hello{% elsif false %}g'day{% else %}goodbye{% endif %}",
      globals: {},
      want: "goodbye",
    },
    {
      description: "nested conditional block",
      source: "{% if true %}{% if true %}hello{% endif %}{% endif %}",
      globals: {},
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block from a truthy context variable",
      source: "{% if a %}hello{% endif %}",
      globals: { a: true },
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block from a falsy context variable",
      source: "{% if a %}hello{% endif %}",
      globals: { a: false },
      want: "",
    },
    {
      description:
        "conditionally evaluate a block from a null context variable",
      source: "{% if a %}true{% else %}false{% endif %}",
      globals: { a: null },
      want: "false",
    },
    {
      description:
        "conditionally evaluate a block from an undefined context variable",
      source: "{% if a %}true{% else %}false{% endif %}",
      globals: { a: undefined },
      want: "false",
    },
    {
      description: "conditionally evaluate a block with equality test",
      source: "{% if a == false %}hello{% endif %}",
      globals: { a: false },
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block with truthy less than operator",
      source: "{% if a < 5 %}hello{% endif %}",
      globals: { a: 3 },
      want: "hello",
    },
    {
      description:
        "conditionally evaluate a block with falsy less than operator",
      source: "{% if a < 5 %}hello{% endif %}",
      globals: { a: 6 },
      want: "",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      },
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      },
    );
  });
});
