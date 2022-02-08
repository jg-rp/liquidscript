import { STRING_PATTERN } from "../src/expressions/common";

describe("string regexp pattern", () => {
  const re = new RegExp(STRING_PATTERN, "gs");
  test("match single quoted string", () => {
    const matches = Array.from(`'hello'`.matchAll(re));
    expect(matches.length).toBe(1);
    if (matches.length && matches[0].groups !== undefined) {
      expect(matches[0].groups.quote).toBe(`'`);
      expect(matches[0].groups.quoted).toBe(`hello`);
    }
  });
  test("match double quoted string", () => {
    const matches = Array.from(`"hello"`.matchAll(re));
    expect(matches.length).toBe(1);

    if (matches.length && matches[0].groups !== undefined) {
      expect(matches[0].groups.quote).toBe(`"`);
      expect(matches[0].groups.quoted).toBe(`hello`);
    }
  });
});
