import { parse } from "../src/liquidscript";

describe("object (aka hash) rendering", () => {
  test("empty hash", async () => {
    const source = "{{ obj }}";
    const data = { obj: {} };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("{}");
  });

  test("strings", async () => {
    const source = "{{ obj }}";
    const data = { obj: { key1: "value1", key2: "value2" } };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe('{"key1"=>"value1", "key2"=>"value2"}');
  });

  test("nested", async () => {
    const source = "{{ obj }}";
    const data = { obj: { outer: { inner: "value" } } };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe('{"outer"=>{"inner"=>"value"}}');
  });

  test("nested, array", async () => {
    const source = "{{ obj }}";
    const data = { obj: { numbers: [1, 2, 3] } };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe('{"numbers"=>[1, 2, 3]}');
  });

  test("circular reference", async () => {
    const source = "{{ obj }}";
    const obj: Record<string, unknown> = {};
    const circular = { self: obj };
    circular.self.self = circular;
    const data = { obj: circular };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe('{"self"=>{"self"=>{...}}}');
  });
});
