import { ReadOnlyChainMap } from "../src/chain_map";
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
});
