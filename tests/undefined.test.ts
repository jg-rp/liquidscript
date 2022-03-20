import {
  Environment,
  LaxUndefined,
  LiquidUndefinedError,
  StrictUndefined,
} from "../src/liquidscript";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("lax undefined", () => {
  const env = new Environment({ undefinedFactory: LaxUndefined.from });
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

describe("strict undefined", () => {
  const env = new Environment({ undefinedFactory: StrictUndefined.from });
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
  ];

  describe("async", () => {
    test.each<Case>(cases)("$description", ({ source, globals }: Case) => {
      const template = env.fromString(source);
      expect(async () => await template.render(globals)).rejects.toThrow(
        LiquidUndefinedError
      );
    });
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals }: Case) => {
        const template = env.fromString(source);
        expect(() => template.renderSync(globals)).toThrow(
          LiquidUndefinedError
        );
      }
    );
  });
});
