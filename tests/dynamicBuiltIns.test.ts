import { builtIn } from "../src/context";

describe("built-in scope", () => {
  test("has now and today", () => {
    expect(Object.prototype.hasOwnProperty.call(builtIn, "now")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(builtIn, "today")).toBe(true);
  });
});
