import { Range } from "../src/range";

// TODO: finish tests

describe("lazy ranges", () => {
  test("positive integer range", () => {
    const seq = Array.from(new Range(1, 3));
    expect(seq).toStrictEqual([1, 2, 3]);
  });
});
