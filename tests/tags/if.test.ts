import { DefaultEnvironment } from "../../src/environment";

// TODO: Finish tests

describe("built-in if tag", () => {
  const env = new DefaultEnvironment({});

  test("if true", async () => {
    const template = env.fromString("{% if true %}hello{% endif %}");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("if false", async () => {
    const template = env.fromString("{% if false %}hello{% endif %}");
    const result = await template.render();
    expect(result).toBe("");
  });
  test("true alternative branch", async () => {
    const template = env.fromString(
      "{% if true %}hello{% else %}goodbye{% endif %}"
    );
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("false alternative branch", async () => {
    const template = env.fromString(
      "{% if false %}hello{% else %}goodbye{% endif %}"
    );
    const result = await template.render();
    expect(result).toBe("goodbye");
  });
  test("true conditional alternative branch", async () => {
    const template = env.fromString(
      "{% if false %}hello{% elsif true %}g'day{% endif %}"
    );
    const result = await template.render();
    expect(result).toBe("g'day");
  });
  test("false conditional alternative branch", async () => {
    const template = env.fromString(
      "{% if false %}hello{% elsif false %}g'day{% endif %}"
    );
    const result = await template.render();
    expect(result).toBe("");
  });
  test("true conditional alternative branch with alternative branch", async () => {
    const template = env.fromString(
      "{% if false %}hello{% elsif true %}g'day{% else %}goodbye{% endif %}"
    );
    const result = await template.render();
    expect(result).toBe("g'day");
  });
  test("false conditional alternative branch with alternative branch", async () => {
    const template = env.fromString(
      "{% if false %}hello{% elsif false %}g'day{% else %}goodbye{% endif %}"
    );
    const result = await template.render();
    expect(result).toBe("goodbye");
  });
  test("nested conditional block", async () => {
    const template = env.fromString(
      "{% if true %}{% if true %}hello{% endif %}{% endif %}"
    );
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("conditionally evaluate a block from a truthy context variable", async () => {
    const template = env.fromString("{% if a %}hello{% endif %}");
    const result = await template.render({ a: true });
    expect(result).toBe("hello");
  });
  test("conditionally evaluate a block from a falsy context variable", async () => {
    const template = env.fromString("{% if a %}hello{% endif %}");
    const result = await template.render({ a: false });
    expect(result).toBe("");
  });
  test("conditionally evaluate a block with equality test", async () => {
    const template = env.fromString("{% if a == false %}hello{% endif %}");
    const result = await template.render({ a: false });
    expect(result).toBe("hello");
  });
  test("conditionally evaluate a block with truthy less than operator", async () => {
    const template = env.fromString("{% if a < 5 %}hello{% endif %}");
    const result = await template.render({ a: 3 });
    expect(result).toBe("hello");
  });
  test("conditionally evaluate a block with falsy less than operator", async () => {
    const template = env.fromString("{% if a < 5 %}hello{% endif %}");
    const result = await template.render({ a: 6 });
    expect(result).toBe("");
  });
});
