import { RenderContext } from "../src/context";
import { Environment } from "../src/environment";
import { parse as parseFilteredExpression } from "../src/expressions/filtered/parse";
import {
  parse as parseConditionalExpression,
  parseWithParens as parseConditionalExpressionWithParens,
} from "../src/expressions/conditional/parse";
import { Float, Integer } from "../src/number";
import { Undefined } from "../src/undefined";

type Case = {
  description: string;
  globals: { [index: string]: unknown };
  expression: string;
  want: unknown;
};

const filteredExpressionTestCases: Case[] = [
  {
    description: "string literal",
    globals: {},
    expression: "'foobar'",
    want: "foobar",
  },
  {
    description: "integer literal",
    globals: {},
    expression: "7",
    want: new Integer(7),
  },
  {
    description: "float literal",
    globals: {},
    expression: "7.5",
    want: new Float(7.5),
  },
  {
    description: "negative integer literal",
    globals: {},
    expression: "-7",
    want: new Integer(-7),
  },
  {
    description: "negative float literal",
    globals: {},
    expression: "-7.5",
    want: new Float(-7.5),
  },
  {
    description: "single global object identifier",
    globals: {
      collection: "foo",
    },
    expression: "collection",
    want: "foo",
  },
  {
    description: "string literal with no arg filter",
    globals: {},
    expression: "'foo' | upcase",
    want: "FOO",
  },
  {
    description: "object identifier with no arg filter",
    globals: {
      collection: {
        title: "foo",
      },
    },
    expression: "collection.title | upcase",
    want: "FOO",
  },
  {
    description: "string literal with two arg filter",
    globals: {},
    expression: '"Liquid" | slice: 2, 5',
    want: "quid",
  },
  {
    description: "string literal with two filters",
    globals: {},
    expression: '"Liquid" | slice: 2, 5 | upcase',
    want: "QUID",
  },
  {
    description: "resolve identifier chain",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.c",
    want: "hello",
  },
  {
    description: "resolve identifier chain containing whitespace.",
    globals: {
      a: {
        "b x": {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a['b x'].c",
    want: "hello",
  },
  {
    description: "resolve identifier chain ending in an array",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.array",
    want: [1, 2, 3],
  },
  {
    description:
      "resolve identifier chain ending in an array index using subscript",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.array[1]",
    want: 2,
  },
  {
    description: "array `first` special method",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.array.first",
    want: 1,
  },
  {
    description: "array `last` special method",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.array.last",
    want: 3,
  },
  {
    description: "array `size` special method",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.array.size",
    want: 3,
  },
  {
    description: "size of an empty array",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [],
        },
      },
    },
    expression: "a.b.array.size",
    want: 0,
  },
  {
    description: "size of an object",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [],
        },
      },
    },
    expression: "a.b.size",
    want: 2,
  },
  {
    description: "nested and chained",
    globals: {
      linklists: {
        main: "main menu",
      },
      section: {
        settings: {
          menu: "main",
        },
      },
    },
    expression: "linklists[section.settings.menu]",
    want: "main menu",
  },
  {
    description: "array index using negative subscript",
    globals: {
      a: [1, 2, 3],
    },
    expression: "a[-1]",
    want: 3,
  },
  {
    description: "resolve identifier chain not in context",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.x",
    want: null,
  },
  {
    description: "try to read past an array",
    globals: {
      a: {
        b: {
          c: "hello",
          array: [1, 2, 3],
        },
      },
    },
    expression: "a.b.array.foo",
    want: null,
  },
];

const conditionalExpressionTestCases: Case[] = [
  {
    description: "string literal with true condition",
    globals: {},
    expression: "'foo' if true",
    want: "foo",
  },
  {
    description: "string literal with false condition",
    globals: {},
    expression: "'foo' if false",
    want: null,
  },
  {
    description: "string literal with false condition and alternative",
    globals: {},
    expression: "'foo' if false else 'bar'",
    want: "bar",
  },
  {
    description: "object and condition from context",
    globals: {
      settings: {
        foo: true,
      },
      greeting: "hello",
    },
    expression: "greeting if settings.foo else 'bar'",
    want: "hello",
  },
  {
    description: "object and condition from context with tail filter",
    globals: {
      settings: {
        foo: true,
      },
      greeting: "hello",
    },
    expression: "greeting if settings.foo else 'bar' || upcase",
    want: "HELLO",
  },
  {
    description: "object filter with true condition",
    globals: {},
    expression: "'foo' | upcase if true else 'bar'",
    want: "FOO",
  },
  {
    description: "object filter with false condition",
    globals: {},
    expression: "'foo' | upcase if false else 'bar'",
    want: "bar",
  },
  {
    description: "missing condition",
    globals: {},
    expression: "'foo' if",
    want: null,
  },
  {
    description: "missing alternative",
    globals: {},
    expression: "'foo' if false else",
    want: null,
  },
  {
    description: "missing condition followed by else",
    globals: {},
    expression: "'foo' if else 'bar'",
    want: "bar",
  },
];

const notConditionalExpressionTestCases: Case[] = [
  {
    description: "string literal with true condition",
    globals: {},
    expression: "'foo' if not true",
    want: null,
  },
  {
    description: "string literal with false condition",
    globals: {},
    expression: "'foo' if not false",
    want: "foo",
  },
  {
    description: "string literal with false condition and alternative",
    globals: {},
    expression: "'foo' if not false else 'bar'",
    want: "foo",
  },
  {
    description: "object and condition from context",
    globals: {
      settings: {
        foo: true,
      },
      greeting: "hello",
    },
    expression: "greeting if not settings.foo else 'bar'",
    want: "bar",
  },
  {
    description: "object and condition from context with tail filter",
    globals: {
      settings: {
        foo: true,
      },
      greeting: "hello",
    },
    expression: "greeting if not settings.foo else 'bar' || upcase",
    want: "BAR",
  },
  {
    description: "object filter with true condition",
    globals: {},
    expression: "'foo' | upcase if not true else 'bar'",
    want: "bar",
  },
  {
    description: "object filter with false condition",
    globals: {},
    expression: "'foo' | upcase if not false else 'bar'",
    want: "FOO",
  },
];

describe("eval standard filtered expression", () => {
  const env = new Environment();
  test.each<Case>(filteredExpressionTestCases)(
    "$description",
    async ({ globals, expression, want }: Case) => {
      const context = new RenderContext(env, globals);
      const expr = parseFilteredExpression(expression);
      if (want === null) {
        expect(expr.evaluateSync(context)).toBeInstanceOf(Undefined);
        expect(expr.evaluate(context)).resolves.toBeInstanceOf(Undefined);
      } else {
        expect(expr.evaluateSync(context)).toStrictEqual(want);
        expect(expr.evaluate(context)).resolves.toStrictEqual(want);
      }
    }
  );
});

describe("eval conditional filtered expression", () => {
  const testCases = [
    ...filteredExpressionTestCases,
    ...conditionalExpressionTestCases,
  ];
  const env = new Environment();
  test.each<Case>(testCases)(
    "$description",
    async ({ globals, expression, want }: Case) => {
      const context = new RenderContext(env, globals);
      const expr = parseConditionalExpression(expression);
      if (want === null) {
        expect(expr.evaluateSync(context)).toBeInstanceOf(Undefined);
        expect(expr.evaluate(context)).resolves.toBeInstanceOf(Undefined);
      } else {
        expect(expr.evaluateSync(context)).toStrictEqual(want);
        expect(expr.evaluate(context)).resolves.toStrictEqual(want);
      }
    }
  );
});

describe("eval extended conditional filtered expression", () => {
  const testCases = [
    ...filteredExpressionTestCases,
    ...conditionalExpressionTestCases,
    ...notConditionalExpressionTestCases,
  ];
  const env = new Environment();
  test.each<Case>(testCases)(
    "$description",
    async ({ globals, expression, want }: Case) => {
      const context = new RenderContext(env, globals);
      const expr = parseConditionalExpressionWithParens(expression);
      if (want === null) {
        expect(expr.evaluateSync(context)).toBeInstanceOf(Undefined);
        expect(expr.evaluate(context)).resolves.toBeInstanceOf(Undefined);
      } else {
        expect(expr.evaluateSync(context)).toStrictEqual(want);
        expect(expr.evaluate(context)).resolves.toStrictEqual(want);
      }
    }
  );
});
