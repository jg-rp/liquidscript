import { DefaultMap } from "../src/collections";

describe("default map", () => {
  test("map of strings to numbers", () => {
    const m: DefaultMap<string, number> = new DefaultMap(0);
    m.set("foo", 99);

    expect(m.get("foo")).toBe(99);
    expect(m.get("bar")).toBe(0);

    m.set("bar", 42);
    expect(m.get("bar")).toBe(42);
  });

  test("map of strings to numbers with initializing iterable", () => {
    const m: DefaultMap<string, number> = new DefaultMap(0, [["foo", 99]]);
    expect(m.get("foo")).toBe(99);
    expect(m.get("bar")).toBe(0);

    m.set("bar", 42);
    expect(m.get("bar")).toBe(42);
  });

  test("default factory function", () => {
    const factory = () => new DefaultMap<string, number>(5);
    const m: DefaultMap<string, DefaultMap<string, number>> = new DefaultMap(
      factory
    );
    expect(m.get("foo").get("bar")).toBe(5);
  });
});
