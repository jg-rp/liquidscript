import { Range } from "../src/range";

describe("lazy ranges", () => {
  test("positive integer range", () => {
    const range = new Range(1, 3);
    expect(range.length).toBe(3);
    const seq = Array.from(new Range(1, 3));
    expect(seq).toStrictEqual([1, 2, 3]);
  });

  test("stop is less than start", () => {
    const seq = Array.from(new Range(5, 1));
    expect(seq).toStrictEqual([]);
  });

  test("start is negative", () => {
    const seq = Array.from(new Range(-5, 1));
    expect(seq).toStrictEqual([-5, -4, -3, -2, -1, 0, 1]);
  });

  test("start and stop are negative", () => {
    const seq = Array.from(new Range(-5, -2));
    expect(seq).toStrictEqual([-5, -4, -3, -2]);
  });
  test("start and stop are the same", () => {
    const range = new Range(1, 1);
    expect(range.length).toBe(1);
    const seq = Array.from(new Range(1, 1));
    expect(seq).toStrictEqual([1]);
  });
  test("start and stop are zero", () => {
    const range = new Range(0, 0);
    expect(range.length).toBe(1);
    const seq = Array.from(new Range(0, 0));
    expect(seq).toStrictEqual([0]);
  });
});
