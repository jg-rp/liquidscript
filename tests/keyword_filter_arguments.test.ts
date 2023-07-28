import { Environment } from "../src/environment";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
};

describe("keyword filter arguments", () => {
  const env = new Environment();
  const cases: Case[] = [
    {
      description: "default allow false equals true",
      source: "{{ false | default: 'bar', allow_false:true }}",
      want: "false",
      globals: {},
    },
    {
      description: "default allow false equals true from context",
      source: "{{ false | default: 'bar', allow_false:foo }}",
      want: "false",
      globals: { foo: true },
    },
    {
      description: "default allow false equals false",
      source: "{{ false | default: 'bar', allow_false:false }}",
      want: "bar",
      globals: {},
    },
    {
      description: "default allow false equals false from context",
      source: "{{ false | default: 'bar', allow_false:foo }}",
      want: "bar",
      globals: { foo: false },
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
