import { Environment, parse } from "../src/liquidscript";

describe("liquid-spec issues", () => {
  test("blank_string_not_iterable", async () => {
    const source =
      "{% for char in characters %}I WILL NOT BE OUTPUT{% endfor %}";

    const data = { characters: "" };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("");
  });

  test("slice_with_negative_length", async () => {
    const source = "{{ text | slice: 0, -1 }}";
    const data = { text: "hello" };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("");
  });

  test("array_to_string_output_nested", async () => {
    const source = "{{ array }}";
    const data = { array: ["a", ["b", "c"]] };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("abc");
  });

  test("test_dec_6cc14214", async () => {
    const source = "{% decrement port %} {{ port }}";
    const data = { port: 10 };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("-1 -1");
  });

  test("test_times_73a401d6", async () => {
    const source = "{{ '2.1' | times:3 | replace: '.','-' | plus:0}}";
    const data = {};
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("6");
  });

  test("test_hash_notation_only_for_hash_access_a8607fa3", async () => {
    const source = '{% if array["first"] == nil %}pass{% endif %}';
    const data = { array: [1, 2, 3, 4, 5] };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("pass");
  });

  test("test_trim_blank_2ed3e831", async () => {
    const source = "foo {{-}} bar";
    const data = {};
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("foobar");
  });

  test("range_in_bracket", async () => {
    const source = "{{ numbers[(1..3)] }}";
    const data = { numbers: { "1..3": "range" } };
    const template = parse(source);
    const result = await template.render(data);
    expect(result).toBe("");
  });

  test("cannot_access_private_methods_206e696a", async () => {
    const source = "{{ 'a' | to_number }}";
    const data = {};
    const template = new Environment({ strictFilters: false }).parse(source);
    const result = await template.render(data);
    expect(result).toBe("a");
  });
});
