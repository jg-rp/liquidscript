import { BuiltIn } from "../src/context";

describe("built-in scope", () => {
  test("has now and today", () => {
    const builtIn = new BuiltIn();
    expect(builtIn.has("now")).toBe(true);
    expect(builtIn.has("today")).toBe(true);
  });
});
