import { assignScoreOf } from "../src/context";
import { Range } from "../src/drops/range";
import { Float, Integer } from "../src/number";

describe("assign score of", () => {
  test("number", () => {
    expect(assignScoreOf(1)).toBe(1);
  });

  test("integer", () => {
    expect(assignScoreOf(new Integer(1))).toBeGreaterThan(1);
  });

  test("float", () => {
    expect(assignScoreOf(new Float(1.1))).toBeGreaterThan(1);
  });

  test("string", () => {
    expect(assignScoreOf("hello")).toBe(10);
  });

  test("array of strings", () => {
    expect(assignScoreOf(["a", "abc"])).toBe(8);
  });

  test("set of strings", () => {
    expect(assignScoreOf(new Set(["a", "abc"]))).toBe(8);
  });

  test("map of strings to numbers", () => {
    const obj = new Map<string, number>([
      ["a", 1],
      ["b", 2],
    ]);
    expect(assignScoreOf(obj)).toBe(6);
  });

  test("iterable", () => {
    const obj = new Range(0, 3);
    expect(assignScoreOf(obj)).toBe(4);
  });
});
