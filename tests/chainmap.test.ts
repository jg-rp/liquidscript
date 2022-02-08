import { ReadOnlyChainMap } from "../src/context";

describe("read only chain map", () => {
  test("construct with no arguments", () => {
    const chainMap = new ReadOnlyChainMap();
    expect(chainMap.get("foo")).toBe(undefined);
  });

  test("construct with one argument", () => {
    const map: Map<string, unknown> = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const chainMap = new ReadOnlyChainMap(map);
    expect(chainMap.get("a")).toBe(1);
    expect(chainMap.get("foo")).toBe(undefined);
    map.set("foo", "bar");
    expect(chainMap.get("foo")).toBe("bar");
  });

  test("follow the chain", () => {
    const someMap: Map<string, unknown> = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const otherMap: Map<string, unknown> = new Map([
      ["c", 3],
      ["d", 4],
      ["a", 99],
    ]);
    const chainMap = new ReadOnlyChainMap(someMap, otherMap);
    expect(chainMap.get("a")).toBe(1);
    expect(chainMap.get("c")).toBe(3);
    expect(chainMap.get("foo")).toBe(undefined);
    someMap.set("foo", "bar");
    otherMap.set("foo", "baz");
    expect(chainMap.get("foo")).toBe("bar");
    someMap.delete("foo");
    expect(chainMap.get("foo")).toBe("baz");
  });

  test("push and pop", () => {
    const someMap: Map<string, unknown> = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const otherMap: Map<string, unknown> = new Map([
      ["c", 3],
      ["d", 4],
      ["a", 99],
    ]);
    const chainMap = new ReadOnlyChainMap(someMap, otherMap);
    expect(chainMap.get("a")).toBe(1);
    expect(chainMap.get("c")).toBe(3);

    chainMap.push(
      new Map([
        ["x", 10],
        ["y", 9],
        ["a", 42],
      ])
    );

    expect(chainMap.get("x")).toBe(10);
    expect(chainMap.get("a")).toBe(42);
    chainMap.pop();
    expect(chainMap.get("a")).toBe(1);
  });
});
