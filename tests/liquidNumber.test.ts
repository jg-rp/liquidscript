import { NAN } from "../src/number";

describe("internal number representation", () => {
  test("trunc NaN", () => {
    expect(NAN.trunc().valueOf()).toBe(NaN);
  });
});
