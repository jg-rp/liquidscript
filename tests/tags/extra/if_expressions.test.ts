import { Environment } from "../../../src/environment";
import {
  ConditionalAssignTag,
  ConditionalAssignTagWithParens,
  ConditionalEchoTag,
  ConditionalEchoTagWithParens,
  ConditionalOutputStatement,
  ConditionalOutputStatementWithParens,
} from "../../../src/extra/tags/if_expressions";

type Case = {
  description: string;
  text: string;
  want: unknown;
  globals: { [index: string]: unknown };
};

const conditionalOutputStatementTestCases: Case[] = [
  {
    description: "string literal with true condition",
    text: "{{ 'hello' if true }}",
    want: "hello",
    globals: {},
  },
  {
    description: "default to undefined",
    text: "{{ 'hello' if false }}",
    want: "",
    globals: {},
  },
  {
    description: "early filter",
    text: "{{ 'hello' | upcase if true }}",
    want: "HELLO",
    globals: {},
  },
  {
    description: "string literal with false condition and alternative",
    text: "{{ 'hello' if false else 'goodbye' }}",
    want: "goodbye",
    globals: {},
  },
  {
    description: "object and condition from context with tail filter",
    text: "{{ greeting if settings.foo else 'bar' || upcase }}",
    want: "HELLO",
    globals: {
      settings: {
        foo: true,
      },
      greeting: "hello",
    },
  },
];

const conditionalAssignTagTestCases: Case[] = [
  {
    description: "string literal",
    text: "{% assign foo = 'hello' %}{{ foo }}",
    want: "hello",
    globals: {},
  },
  {
    description: "string literal with true condition",
    text: "{% assign foo = 'hello' if true %}{{ foo }}",
    want: "hello",
    globals: {},
  },
  {
    description: "default to undefined",
    text: "{% assign foo = 'hello' if false %}{{ foo }}",
    want: "",
    globals: {},
  },
  {
    description: "early filter",
    text: "{% assign foo = 'hello' | upcase if true %}{{ foo }}",
    want: "HELLO",
    globals: {},
  },
  {
    description: "string literal with false condition and alternative",
    text: "{% assign foo = 'hello' if false else 'goodbye' %}{{ foo }}",
    want: "goodbye",
    globals: {},
  },
  {
    description: "object and condition from context with tail filter",
    text: "{% assign foo = greeting if settings.foo else 'bar' || upcase %}{{ foo }}",
    want: "HELLO",
    globals: {
      settings: {
        foo: true,
      },
      greeting: "hello",
    },
  },
];

const conditionalEchoTagTestCases: Case[] = [
  {
    description: "string literal",
    text: "{% echo 'hello' %}",
    want: "hello",
    globals: {},
  },
  {
    description: "string literal with true condition",
    text: "{% echo 'hello' if true %}",
    want: "hello",
    globals: {},
  },
  {
    description: "default to undefined",
    text: "{% echo 'hello' if false %}",
    want: "",
    globals: {},
  },
  {
    description: "early  filter",
    text: "{% echo 'hello' | upcase if true %}",
    want: "HELLO",
    globals: {},
  },
  {
    description: "string literal with false condition and alternative",
    text: "{% echo 'hello' if false else 'goodbye' %}",
    want: "goodbye",
    globals: {},
  },
  {
    description: "object and condition from context with tail filter",
    text: "{% echo greeting if settings.foo else 'bar' || upcase %}",
    want: "HELLO",
    globals: {
      settings: {
        foo: true,
      },
      greeting: "hello",
    },
  },
];

const notConditionalOutputStatementTestCases: Case[] = [
  {
    description: "negate condition",
    text: "{{ 'hello' if not false else 'goodbye' }}",
    want: "hello",
    globals: {},
  },
  {
    description: "group condition terms",
    text: "{{ 'hello' if (false and true) or true }}",
    want: "hello",
    globals: {},
  },
];

const notConditionalAssignTagTestCases: Case[] = [
  {
    description: "negate condition",
    text: "{% assign foo = 'hello' if not false else 'goodbye' %}{{ foo }}",
    want: "hello",
    globals: {},
  },
  {
    description: "group condition terms",
    text: "{% assign foo = 'hello' if (false and true) or true %}{{ foo }}",
    want: "hello",
    globals: {},
  },
];

const notConditionalEchoTagTestCases: Case[] = [
  {
    description: "negate condition",
    text: "{% echo 'hello' if not false else 'goodbye' %}",
    want: "hello",
    globals: {},
  },
  {
    description: "group condition terms",
    text: "{% echo 'hello' if (false and true) or true %}",
    want: "hello",
    globals: {},
  },
];

describe("render conditional output statement", () => {
  const env = new Environment();
  env.addTag("statement", new ConditionalOutputStatement());

  test.each<Case>(conditionalOutputStatementTestCases)(
    "$description",
    async ({ globals, text, want }: Case) => {
      const template = env.fromString(text);
      expect(template.renderSync(globals)).toStrictEqual(want);
      expect(template.render(globals)).resolves.toStrictEqual(want);
    },
  );
});

describe("render conditional assign tag", () => {
  const env = new Environment();
  env.addTag("assign", new ConditionalAssignTag());

  test.each<Case>(conditionalAssignTagTestCases)(
    "$description",
    async ({ globals, text, want }: Case) => {
      const template = env.fromString(text);
      expect(template.renderSync(globals)).toStrictEqual(want);
      expect(template.render(globals)).resolves.toStrictEqual(want);
    },
  );
});

describe("render conditional echo tag", () => {
  const env = new Environment();
  env.addTag("echo", new ConditionalEchoTag());

  test.each<Case>(conditionalEchoTagTestCases)(
    "$description",
    async ({ globals, text, want }: Case) => {
      const template = env.fromString(text);
      expect(template.renderSync(globals)).toStrictEqual(want);
      expect(template.render(globals)).resolves.toStrictEqual(want);
    },
  );
});

describe("render extended conditional output statement", () => {
  const env = new Environment();
  env.addTag("statement", new ConditionalOutputStatementWithParens());

  test.each<Case>([
    ...conditionalOutputStatementTestCases,
    ...notConditionalOutputStatementTestCases,
  ])("$description", async ({ globals, text, want }: Case) => {
    const template = env.fromString(text);
    expect(template.renderSync(globals)).toStrictEqual(want);
    expect(template.render(globals)).resolves.toStrictEqual(want);
  });
});

describe("render extended conditional assign tag", () => {
  const env = new Environment();
  env.addTag("assign", new ConditionalAssignTagWithParens());

  test.each<Case>([
    ...conditionalAssignTagTestCases,
    ...notConditionalAssignTagTestCases,
  ])("$description", async ({ globals, text, want }: Case) => {
    const template = env.fromString(text);
    expect(template.renderSync(globals)).toStrictEqual(want);
    expect(template.render(globals)).resolves.toStrictEqual(want);
  });
});

describe("render extended conditional echo tag", () => {
  const env = new Environment();
  env.addTag("echo", new ConditionalEchoTagWithParens());

  test.each<Case>([
    ...conditionalEchoTagTestCases,
    ...notConditionalEchoTagTestCases,
  ])("$description", async ({ globals, text, want }: Case) => {
    const template = env.fromString(text);
    expect(template.renderSync(globals)).toStrictEqual(want);
    expect(template.render(globals)).resolves.toStrictEqual(want);
  });
});
