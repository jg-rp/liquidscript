import { DefaultEnvironment } from "../../src/environment";

// TODO: Finish tests

describe("built-in unless tag", () => {
  const env = new DefaultEnvironment({});

  test("unless true", async () => {
    const template = env.fromString("{% unless true %}hello{% endunless %}");
    const result = await template.render();
    expect(result).toBe("");
  });
  test("unless false", async () => {
    const template = env.fromString("{% unless false %}hello{% endunless %}");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("true alternative branch", async () => {
    const template = env.fromString(
      "{% unless true %}hello{% else %}goodbye{% endunless %}"
    );
    const result = await template.render();
    expect(result).toBe("goodbye");
  });
  test("false alternative branch", async () => {
    const template = env.fromString(
      "{% unless false %}hello{% else %}goodbye{% endunless %}"
    );
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("true conditional alternative branch", async () => {
    const template = env.fromString(
      "{% unless true %}hello{% elsif true %}g'day{% endunless %}"
    );
    const result = await template.render();
    expect(result).toBe("g'day");
  });
  test("false conditional alternative branch", async () => {
    const template = env.fromString(
      "{% unless true %}hello{% elsif false %}g'day{% endunless %}"
    );
    const result = await template.render();
    expect(result).toBe("");
  });
  test("true conditional alternative branch with alternative branch", async () => {
    const template = env.fromString(
      "{% unless true %}hello{% elsif true %}g'day{% else %}goodbye{% endunless %}"
    );
    const result = await template.render();
    expect(result).toBe("g'day");
  });
  test("false conditional alternative branch with alternative branch", async () => {
    const template = env.fromString(
      "{% unless true %}hello{% elsif false %}g'day{% else %}goodbye{% endunless %}"
    );
    const result = await template.render();
    expect(result).toBe("goodbye");
  });
  test("nested conditional block", async () => {
    const template = env.fromString(
      "{% unless false %}{% unless false %}hello{% endunless %}{% endunless %}"
    );
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("conditionally evaluate a block from a truthy context variable", async () => {
    const template = env.fromString("{% unless a %}hello{% endunless %}");
    const result = await template.render({ a: true });
    expect(result).toBe("");
  });
  test("conditionally evaluate a block from a falsy context variable", async () => {
    const template = env.fromString("{% unless a %}hello{% endunless %}");
    const result = await template.render({ a: false });
    expect(result).toBe("hello");
  });
  test("conditionally evaluate a block with equality test", async () => {
    const template = env.fromString(
      "{% unless a == true %}hello{% endunless %}"
    );
    const result = await template.render({ a: false });
    expect(result).toBe("hello");
  });
  test("conditionally evaluate a block with truthy less than operator", async () => {
    const template = env.fromString("{% unless a < 5 %}hello{% endunless %}");
    const result = await template.render({ a: 3 });
    expect(result).toBe("");
  });
  test("conditionally evaluate a block with falsy less than operator", async () => {
    const template = env.fromString("{% unless a < 5 %}hello{% endunless %}");
    const result = await template.render({ a: 6 });
    expect(result).toBe("hello");
  });
});
