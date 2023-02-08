import { Environment } from "../../../src/environment";
import { LiquidUndefinedError } from "../../../src/errors";
import { CallTag, MacroTag } from "../../../src/extra/tags";
import { LaxUndefined, StrictUndefined } from "../../../src/undefined";

describe("call a macro", () => {
  const env = new Environment({ undefinedFactory: LaxUndefined.from });
  env.addTag("call", new CallTag());
  env.addTag("macro", new MacroTag());

  test("basic macro", () => {
    const template = env.fromString(
      "{% macro 'func' %}Hello, World!{% endmacro %}"
    );
    expect(template.renderSync()).toBe("");
    expect(template.render()).resolves.toBe("");
  });

  test("call basic macro", () => {
    const template = env.fromString(
      "{% macro 'func' %}Hello, World!{% endmacro %}{% call 'func' %}"
    );
    expect(template.renderSync()).toBe("Hello, World!");
    expect(template.render()).resolves.toBe("Hello, World!");
  });

  test("call basic macro multiple times", () => {
    const template = env.fromString(
      "{% macro 'func' %}Hello, World!{% endmacro %}" +
        "{% call 'func' %}" +
        "{% call 'func' %}"
    );
    expect(template.renderSync()).toBe("Hello, World!Hello, World!");
    expect(template.render()).resolves.toBe("Hello, World!Hello, World!");
  });

  test("call basic macro with argument", () => {
    const template = env.fromString(
      "{% macro 'func' you %}Hello, {{ you }}!{% endmacro %}" +
        "{% call 'func' 'you' %} " +
        "{% call 'func' 'World' %}"
    );
    expect(template.renderSync()).toBe("Hello, you! Hello, World!");
    expect(template.render()).resolves.toBe("Hello, you! Hello, World!");
  });

  test("call basic macro with default argument", () => {
    const template = env.fromString(
      "{% macro 'func' you: 'brian' %}Hello, {{ you }}!{% endmacro %}" +
        "{% call 'func' %} " +
        "{% call 'func' 'World' %}"
    );
    expect(template.renderSync()).toBe("Hello, brian! Hello, World!");
    expect(template.render()).resolves.toBe("Hello, brian! Hello, World!");
  });

  test("boolean literal default argument", () => {
    const template = env.fromString(
      "{% macro 'func' foo: false %}" +
        "{% if foo %}Hello, World!{% endif %}" +
        "{% endmacro %}" +
        "{% call 'func' %}" +
        "{% call 'func' foo: true %}"
    );
    expect(template.renderSync()).toBe("Hello, World!");
    expect(template.render()).resolves.toBe("Hello, World!");
  });

  test("chained default argument from context", () => {
    const template = env.fromString(
      "{% macro 'func' greeting: foo.bar %}" +
        "{{ greeting }}, World!" +
        "{% endmacro %}" +
        "{% call 'func' %}" +
        "{% call 'func' greeting: 'Goodbye' %}"
    );
    const data = { foo: { bar: "Hello" } };
    expect(template.renderSync(data)).toBe("Hello, World!Goodbye, World!");
    expect(template.render(data)).resolves.toBe("Hello, World!Goodbye, World!");
  });

  test("excess arguments", () => {
    const template = env.fromString(
      "{% macro 'func' %}" +
        "{{ args | join: '-' }}" +
        "{% endmacro %}" +
        "{% call 'func' 1, 2 %}"
    );
    expect(template.renderSync()).toBe("1-2");
    expect(template.render()).resolves.toBe("1-2");
  });

  test("excess keyword arguments", () => {
    const template = env.fromString(
      "{% macro 'func' %}" +
        "{% for arg in kwargs %}" +
        "{{ arg[0] }} => {{ arg[1] }}, " +
        "{% endfor %}" +
        "{% endmacro %}" +
        "{% call 'func', a: 1, b: 2 %}"
    );
    expect(template.renderSync()).toBe("a => 1, b => 2, ");
    expect(template.render()).resolves.toBe("a => 1, b => 2, ");
  });

  test("missing argument", () => {
    const template = env.fromString(
      "{% macro 'func', foo %}" +
        "{{ foo }}" +
        "{% endmacro %}" +
        "{% call 'func' %}"
    );
    expect(template.renderSync()).toBe("");
    expect(template.render()).resolves.toBe("");
  });

  test("undefined macro", () => {
    const template = env.fromString("{% call 'func' %}");
    expect(template.renderSync()).toBe("");
    expect(template.render()).resolves.toBe("");
  });

  test("default before positional", () => {
    const template = env.fromString(
      "{% macro 'func' you: 'brian', greeting %}" +
        "{{ greeting }}, {{ you }}!" +
        "{% endmacro %}" +
        "{% call 'func' %} " +
        "{% call 'func' you: 'World', greeting: 'Goodbye' %}"
    );
    expect(template.renderSync()).toBe(", brian! Goodbye, World!");
    expect(template.render()).resolves.toBe(", brian! Goodbye, World!");
  });
});

describe("call a macro with strict variables", () => {
  const env = new Environment({ undefinedFactory: StrictUndefined.from });
  env.addTag("call", new CallTag());
  env.addTag("macro", new MacroTag());

  test("missing argument", () => {
    const template = env.fromString(
      "{% macro 'func', foo %}" +
        "{{ foo }}" +
        "{% endmacro %}" +
        "{% call 'func' %}"
    );
    expect(() => template.renderSync()).toThrow(LiquidUndefinedError);
  });

  test("undefined macro", () => {
    const template = env.fromString("{% call 'func' %}");
    expect(() => template.renderSync()).toThrow(LiquidUndefinedError);
  });
});
