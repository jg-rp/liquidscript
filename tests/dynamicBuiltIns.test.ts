import { BuiltIn } from "../src/context";

describe("built-in scope", () => {
  test("has now and today", () => {
    expect(Object.prototype.hasOwnProperty.call(BuiltIn, "now")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(BuiltIn, "today")).toBe(true);
  });
});
