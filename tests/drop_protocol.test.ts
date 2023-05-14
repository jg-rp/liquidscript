import {
  isLiquidCallable,
  Liquidable,
  liquidDispatch,
  liquidDispatchSync,
  toLiquid,
  toLiquidPrimitive,
  toLiquidString,
  toLiquidSync,
} from "../src/drop";
import { Environment } from "../src/environment";
import { LiquidKeyError } from "../src/errors";

class MockSuper {
  some = "thing";
}

class MockDrop extends MockSuper {
  private keys = new Set(["a", "b"]);
  private callable = new Set<PropertyKey>(["greeting"]);
  private a: string = "hello";
  private b: string = "goodbye";
  #c: string = "secret";

  [toLiquidPrimitive](): unknown {
    // This drop could be used as an array index.
    return 2;
  }

  [isLiquidCallable](name: PropertyKey): boolean {
    return this.callable.has(name);
  }

  async [liquidDispatch](name: string): Promise<unknown> {
    return this[liquidDispatchSync](name);
  }

  [liquidDispatchSync](name: string): unknown {
    if (this.keys.has(name)) return Reflect.get(this, name);
    throw new LiquidKeyError(name);
  }

  [toLiquidString](): string {
    return "a mock drop";
  }

  // A callable, whitelisted property.
  public greeting(): string {
    return `hello ${this.#c}`;
  }

  // A method that should not be called by liquid.
  public salutation(): string {
    return "g'day";
  }
}

type PlainObject = { [index: string]: string };

class MockLazyDrop implements Liquidable {
  private obj?: PlainObject;

  getData(): PlainObject {
    if (this.obj === undefined) this.obj = { a: "Hello", b: "Goodbye" };
    return this.obj;
  }

  async [toLiquid](): Promise<PlainObject> {
    return this.getData();
  }

  [toLiquidSync](): PlainObject {
    return this.getData();
  }
}

type Case = {
  description: string;
  source: string;
  want: string;
  globals: { [index: string]: unknown };
};

describe("drop protocol", () => {
  const env = new Environment({});
  const aDrop = new MockDrop();
  const lazyDrop = new MockLazyDrop();

  const cases: Case[] = [
    {
      description: "output a drop",
      source: "{{ d }}",
      want: "a mock drop",
      globals: { d: aDrop },
    },
    {
      description: "drop as an array index",
      source: "{% assign x = 'x,y,z' | split: ',' %}{{ x[2] }}{{ x[a] }}",
      want: "zz",
      globals: { a: aDrop },
    },
    {
      description: "call a whitelisted drop method",
      source: "{{ a.greeting }}",
      want: "hello secret",
      globals: { a: aDrop },
    },
    {
      description: "don't call method that is not whitelisted",
      source: "{{ a.salutation }}",
      want: "",
      globals: { a: aDrop },
    },
    {
      description: "fall back to a dispatch method",
      source: "{{ a.b }}",
      want: "goodbye",
      globals: { a: aDrop },
    },
    {
      description: "don't expose private fields",
      source: "{{ a.c }}{{ a['#c'] }}",
      want: "",
      globals: { a: aDrop },
    },
    {
      description: "don't expose non-enumerable properties",
      source: "{{ array.length }}",
      want: "",
      globals: { array: [1, 2, 3] },
    },
    {
      description: "expose inherited properties",
      source: "{{ a.some }}",
      want: "thing",
      globals: { a: aDrop },
    },
    {
      description: "length of a string",
      source: "{{ s.length }}",
      want: "",
      globals: { s: "hello" },
    },
    {
      description: "length of a string object",
      source: "{{ s.length }}",
      want: "5",
      globals: { s: new String("hello") },
    },
    {
      description: "length of a function",
      source: "{{ f.length }}",
      want: "",
      globals: {
        f() {
          return 0;
        },
      },
    },
    {
      description: "proto of an object",
      source: "{{ obj.__proto__ }}",
      want: "",
      globals: {
        obj: {},
      },
    },
    {
      description: "replace a drop with toLiquid",
      source: "{{ drop.a }}",
      want: "Hello",
      globals: {
        drop: lazyDrop,
      },
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, want, globals }: Case) => {
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      }
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, want, globals }: Case) => {
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      }
    );
  });
});
