import { Integer, NAN } from "../src/number";

// See https://github.com/microsoft/TypeScript/issues/2361

describe("internal number representation", () => {
  test("trunc NaN", () => {
    expect(NAN.trunc().valueOf()).toBe(NaN);
  });

  test("number plus integer", () => {
    const i = new Integer(2) as unknown as number;
    expect(5 + i).toBe(7);
  });

  test("integer plus number", () => {
    const i = new Integer(2) as unknown as number;
    expect(i + 5).toBe(7);
  });

  test("integer is finite", () => {
    const i = new Integer(2);
    expect(i.isFinite()).toBe(true);
  });
});
