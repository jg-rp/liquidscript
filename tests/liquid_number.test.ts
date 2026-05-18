import { parse } from "../src";
import { Float, Integer, NAN } from "../src/number";

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

  test("integer div int number", () => {
    const i = new Integer(10);
    const result = i.div(2);
    expect(result).toBeInstanceOf(Integer);
    expect(result.valueOf()).toStrictEqual(5);
    expect(result.toString()).toStrictEqual("5");
  });

  test("integer div integer", () => {
    const i = new Integer(10);
    const result = i.div(new Integer(2));
    expect(result).toBeInstanceOf(Integer);
    expect(result.valueOf()).toStrictEqual(5);
    expect(result.toString()).toStrictEqual("5");
  });

  test("number equals integer", () => {
    const template = parse("{% if x == y %}yes{% endif %}");
    const result = template.renderSync({ x: 5, y: new Integer(5) });
    expect(result).toBe("yes");
  });

  test("integer equals number", () => {
    const template = parse("{% if x == y %}yes{% endif %}");
    const result = template.renderSync({ y: 5, x: new Integer(5) });
    expect(result).toBe("yes");
  });

  test("float equals integer", () => {
    const template = parse("{% if x == y %}yes{% endif %}");
    const result = template.renderSync({
      x: new Float(5.0),
      y: new Integer(5),
    });
    expect(result).toBe("yes");
  });

  test("array contains wrapped number", () => {
    const template = parse("{% if a contains i %}yes{% endif %}");
    const result = template.renderSync({ a: [1, 2, 3], i: new Integer(1) });
    expect(result).toBe("yes");
  });
});
