import {
  ChainKeys,
  ChainPop,
  ChainPush,
  ChainSize,
  ReadOnlyChainMap,
} from "../src/chain_map";
import { Nothing } from "../src/runtime";

describe("read only chain map", () => {
  test("empty chain", () => {
    const chain = new ReadOnlyChainMap();
    expect(chain["foo"]).toBe(Nothing);
  });

  test("chain with one argument", () => {
    const obj: Record<string, unknown> = { a: 1, b: 2 };
    const chain = new ReadOnlyChainMap(obj);
    expect(chain["a"]).toBe(1);
    expect(chain["foo"]).toBe(Nothing);
    obj["foo"] = "bar";
    expect(chain["foo"]).toBe("bar");
  });

  test("follow the chain", () => {
    const obj: Record<string, unknown> = { a: 1, b: 2 };
    const other: Record<string, unknown> = { c: 3, d: 4, a: 99 };
    const chain = new ReadOnlyChainMap(obj, other);
    expect(chain["a"]).toBe(1);
    expect(chain["c"]).toBe(3);
    expect(chain["foo"]).toBe(Nothing);
    obj["foo"] = "bar";
    other["foo"] = "baz";
    expect(chain["foo"]).toBe("bar");
    delete obj["foo"];
    expect(chain["foo"]).toBe("baz");
  });

  test("push and pop", () => {
    const obj: Record<string, unknown> = { a: 1, b: 2 };
    const other: Record<string, unknown> = { c: 3, d: 4, a: 99 };
    const chain = new ReadOnlyChainMap(obj, other);
    expect(chain["a"]).toBe(1);
    expect(chain["c"]).toBe(3);

    chain[ChainPush](
      Object.fromEntries([
        ["x", 10],
        ["y", 9],
        ["a", 42],
      ]),
    );

    expect(chain["x"]).toBe(10);
    expect(chain["a"]).toBe(42);
    chain[ChainPop]();
    expect(chain["a"]).toBe(1);
  });

  test("in operator", () => {
    const chain = new ReadOnlyChainMap({ a: 1 }, { b: 2, a: 99 });
    expect("a" in chain).toBe(true);
    expect("b" in chain).toBe(true);
    expect("x" in chain).toBe(false);
  });

  test("nested chains", () => {
    const chain = new ReadOnlyChainMap(
      { a: 1 },
      new ReadOnlyChainMap({ c: 3, d: 4 }),
      new ReadOnlyChainMap({ x: 99 }),
    );
    expect(chain.a).toBe(1);
    expect(chain.d).toBe(4);
    expect(chain.x).toBe(99);
  });

  test("size of chain", () => {
    const chain = new ReadOnlyChainMap({ a: 1 }, { b: 2, a: 99 });
    expect(chain[ChainSize]()).toBe(2);
  });

  test("allow push, pop and size properties", () => {
    const chain = new ReadOnlyChainMap({ push: 1 }, { pop: 2, size: 99 });
    expect(chain.push).toBe(1);
    expect(chain.pop).toBe(2);
    expect(chain.size).toBe(99);
  });

  test("push, pop and size not in chain", () => {
    const chain = new ReadOnlyChainMap({ a: 1 }, { b: 2, a: 99 });
    expect("push" in chain).toBe(false);
    expect("pop" in chain).toBe(false);
    expect("size" in chain).toBe(false);
  });

  test("issue", () => {
    const globals = { environment: "production", region: "us-east" };
    const coreChain = new ReadOnlyChainMap(globals);

    const requestContext = { requestId: "12345" };
    const finalScope = new ReadOnlyChainMap(requestContext, coreChain);

    expect(finalScope.region).toStrictEqual("us-east");
    expect(finalScope[ChainKeys]()).toStrictEqual([
      "requestId",
      "environment",
      "region",
    ]);
  });

  test("read only", () => {
    const chain = new ReadOnlyChainMap({});
    expect(() => {
      chain.foo = "bar";
    }).toThrow(TypeError);
  });
});
