import { Environment } from "../src/liquidscript";
import {
  FalsyStrictUndefined,
  StrictUndefined,
  Undefined,
} from "../src/drops/undefined";
import { UndefinedVariableError } from "../src/errors";

type Case = {
  description: string;
  source: string;
  globals: Record<string, unknown>;
  want: string;
};

describe("lax undefined", () => {
  const env = new Environment({ undefinedType: Undefined });
  const cases: Case[] = [
    {
      description: "output undefined",
      source: "{{ nosuchthing }}",
      globals: {},
      want: "",
    },
    {
      description: "loop over undefined",
      source: "{% for tag in nosuchthing %}{tag}{% endfor %}",
      globals: {},
      want: "",
    },
    {
      description: "index undefined",
      source: "{{ nosuchthing[0] }}",
      globals: {},
      want: "",
    },
    {
      description: "truthiness of undefined",
      source: "{% if nosuchthing %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "compare undefined",
      source: "{% if nosuchthing == 'hello' %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "undefined equals undefined",
      source: "{% if nosuchthing == noway %}hello{% endif %}",
      globals: {},
      want: "hello",
    },
    {
      description: "undefined contains string",
      source: "{% if nosuchthing contains 'hello' %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "first of undefined",
      source: "{{ nosuchthing.first }}",
      globals: {},
      want: "",
    },
    {
      description: "last of undefined",
      source: "{{ nosuchthing.last }}",
      globals: {},
      want: "",
    },
    {
      description: "size of undefined",
      source: "{{ nosuchthing.size }}",
      globals: {},
      want: "",
    },
    {
      description: "filtered undefined",
      source: "hello {{ nosuchthing | last }} there",
      globals: {},
      want: "hello  there",
    },
    {
      description: "first filter undefined",
      source: "hello {{ nosuchthing | first }} there",
      globals: {},
      want: "hello  there",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.parse(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      },
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want }: Case) => {
        const template = env.parse(source);
        expect(template.renderSync(globals)).toBe(want);
      },
    );
  });
});

describe("strict undefined", () => {
  const env = new Environment({ undefinedType: StrictUndefined });
  const cases: Case[] = [
    {
      description: "output undefined",
      source: "{{ nosuchthing }}",
      globals: {},
      want: "",
    },
    {
      description: "loop over undefined",
      source: "{% for tag in nosuchthing %}{tag}{% endfor %}",
      globals: {},
      want: "",
    },
    {
      description: "index undefined",
      source: "{{ nosuchthing[0] }}",
      globals: {},
      want: "",
    },
    {
      description: "truthiness of undefined",
      source: "{% if nosuchthing %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "compare undefined",
      source: "{% if nosuchthing == 'hello' %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "undefined equals undefined",
      source: "{% if nosuchthing == noway %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "undefined contains string",
      source: "{% if nosuchthing contains 'hello' %}hello{% endif %}",
      globals: {},
      want: "",
    },
    {
      description: "first of undefined",
      source: "{{ nosuchthing.first }}",
      globals: {},
      want: "",
    },
    {
      description: "last of undefined",
      source: "{{ nosuchthing.last }}",
      globals: {},
      want: "",
    },
    {
      description: "size of undefined",
      source: "{{ nosuchthing.size }}",
      globals: {},
      want: "",
    },
    {
      description: "filtered undefined",
      source: "hello {{ nosuchthing | last }} there",
      globals: {},
      want: "",
    },
    {
      description: "first filter undefined",
      source: "hello {{ nosuchthing | first }} there",
      globals: {},
      want: "",
    },
    {
      description: "default filter undefined",
      source: "hello {{ nosuchthing | default: 'foo' }} there",
      globals: {},
      want: "",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)("$description", ({ source, globals }: Case) => {
      const template = env.parse(source);
      expect(async () => await template.render(globals)).toThrow(
        UndefinedVariableError,
      );
    });
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals }: Case) => {
        const template = env.parse(source);
        expect(() => template.renderSync(globals)).toThrow(
          UndefinedVariableError,
        );
      },
    );
  });
});

describe("strict falsy undefined", () => {
  const env = new Environment({ undefinedType: FalsyStrictUndefined });
  const cases: Case[] = [
    {
      description: "output undefined",
      source: "{{ nosuchthing }}",
      globals: {},
      want: "",
    },
    {
      description: "loop over undefined",
      source: "{% for tag in nosuchthing %}{tag}{% endfor %}",
      globals: {},
      want: "",
    },
    {
      description: "index undefined",
      source: "{{ nosuchthing[0] }}",
      globals: {},
      want: "",
    },
    {
      description: "first of undefined",
      source: "{{ nosuchthing.first }}",
      globals: {},
      want: "",
    },
    {
      description: "last of undefined",
      source: "{{ nosuchthing.last }}",
      globals: {},
      want: "",
    },
    {
      description: "size of undefined",
      source: "{{ nosuchthing.size }}",
      globals: {},
      want: "",
    },
    {
      description: "filtered undefined",
      source: "hello {{ nosuchthing | last }} there",
      globals: {},
      want: "",
    },
    {
      description: "first filter undefined",
      source: "hello {{ nosuchthing | first }} there",
      globals: {},
      want: "",
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)("$description", ({ source, globals }: Case) => {
      const template = env.parse(source);
      expect(async () => await template.render(globals)).toThrow(
        UndefinedVariableError,
      );
    });
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals }: Case) => {
        const template = env.parse(source);
        expect(() => template.renderSync(globals)).toThrow(
          UndefinedVariableError,
        );
      },
    );
  });

  test("falsy boolean expression", async () => {
    const template = env.parse(
      "{% if nosuchthing %}true{% else %}false{% endif %}",
    );
    const result = await template.render();
    expect(result).toBe("false");
    expect(template.renderSync()).toBe("false");
  });

  test("boolean comparison", async () => {
    const template = env.parse(
      "{% if nosuchthing == 'hello' %}true{% else %}false{% endif %}",
    );
    const result = await template.render();
    expect(result).toBe("false");
    expect(template.renderSync()).toBe("false");
  });

  test("boolean contains", async () => {
    const template = env.parse(
      "{% if nosuchthing contains 'hello' %}true{% else %}false{% endif %}",
    );
    const result = await template.render();
    expect(result).toBe("false");
    expect(template.renderSync()).toBe("false");
  });

  test("undefined equals undefined", async () => {
    const template = env.parse(
      "{% if nosuchthing == noway %}true{% else %}false{% endif %}",
    );
    const result = await template.render();
    expect(result).toBe("true");
    expect(template.renderSync()).toBe("true");
  });

  test("undefined default", async () => {
    const template = env.parse("{{ nosuchthing | default: 'hello' }}");
    const result = await template.render();
    expect(result).toBe("hello");
    expect(template.renderSync()).toBe("hello");
  });

  test("undefined default is not false", async () => {
    const template = env.parse(
      "{{ nosuchthing | default: 'hello', allow_false: true }}",
    );
    const result = await template.render();
    expect(result).toBe("hello");
    expect(template.renderSync()).toBe("hello");
  });
});
