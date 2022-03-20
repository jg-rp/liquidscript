import { chainObjects, Missing } from "../src/chain_object";

describe("read only chain map", () => {
  test("empty chain", () => {
    const chain = chainObjects();
    expect(chain["foo"]).toBe(Missing);
  });

  test("chain with one argument", () => {
    const obj: { [index: string]: unknown } = Object.fromEntries([
      ["a", 1],
      ["b", 2],
    ]);
    const chain = chainObjects(obj);
    expect(chain["a"]).toBe(1);
    expect(chain["foo"]).toBe(Missing);
    obj["foo"] = "bar";
    expect(chain["foo"]).toBe("bar");
  });

  test("follow the chain", () => {
    const someObj: { [index: string]: unknown } = Object.fromEntries([
      ["a", 1],
      ["b", 2],
    ]);
    const otherObj: { [index: string]: unknown } = Object.fromEntries([
      ["c", 3],
      ["d", 4],
      ["a", 99],
    ]);
    const chain = chainObjects(someObj, otherObj);
    expect(chain["a"]).toBe(1);
    expect(chain["c"]).toBe(3);
    expect(chain["foo"]).toBe(Missing);
    someObj["foo"] = "bar";
    otherObj["foo"] = "baz";
    expect(chain["foo"]).toBe("bar");
    delete someObj["foo"];
    expect(chain["foo"]).toBe("baz");
  });

  test("push and pop", () => {
    const someObj: { [index: string]: unknown } = Object.fromEntries([
      ["a", 1],
      ["b", 2],
    ]);
    const otherObj: { [index: string]: unknown } = Object.fromEntries([
      ["c", 3],
      ["d", 4],
      ["a", 99],
    ]);
    const chain = chainObjects(someObj, otherObj);
    expect(chain["a"]).toBe(1);
    expect(chain["c"]).toBe(3);

    chain.push(
      Object.fromEntries([
        ["x", 10],
        ["y", 9],
        ["a", 42],
      ])
    );

    expect(chain["x"]).toBe(10);
    expect(chain["a"]).toBe(42);
    chain.pop();
    expect(chain["a"]).toBe(1);
  });

  test("in operator", () => {
    const chain = chainObjects({ a: 1 }, { b: 2, a: 99 });
    expect("a" in chain).toBe(true);
    expect("b" in chain).toBe(true);
  });

  test("nested objects", () => {
    const chain = chainObjects({ a: 1, b: { c: 99 } });
    const b = chain.b;
    expect(Reflect.get(b as object, "c")).toBe(99);
  });

  test("nested chains", () => {
    const chain = chainObjects({ a: 1, b: chainObjects({ c: 3, d: 4 }) });
    const some = chain["b"];
    expect(Reflect.get(some as object, "c")).toBe(3);
  });
});
