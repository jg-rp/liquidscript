import { Environment } from "../../src/environment";

describe("output statements", () => {
  const env = new Environment({});

  test("string literal single quotes", async () => {
    const template = env.fromString("{{ 'hello' }}");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("string literal double quotes", async () => {
    const template = env.fromString('{{ "hello" }}');
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("integer literal", async () => {
    const template = env.fromString("{{ 1 }}");
    const result = await template.render();
    expect(result).toBe("1");
  });
  test("float literal", async () => {
    const template = env.fromString("{{ 1.1 }}");
    const result = await template.render();
    expect(result).toBe("1.1");
  });
  test("true literal", async () => {
    const template = env.fromString("{{ true }}");
    const result = await template.render();
    expect(result).toBe("true");
  });
  test("false literal", async () => {
    const template = env.fromString("{{ false }}");
    const result = await template.render();
    expect(result).toBe("false");
  });
  test("range literal", async () => {
    const template = env.fromString("{{ (1..3) }}");
    const result = await template.render();
    expect(result).toBe("1..3");
  });
  test("simple filter", async () => {
    const template = env.fromString('{{ "hello " | append: "world!" }}');
    const result = await template.render();
    expect(result).toBe("hello world!");
  });
  test("simple identifier", async () => {
    const template = env.fromString("{{ greeting }}");
    const result = await template.render({ greeting: "good evening" });
    expect(result).toBe("good evening");
  });
  test("identifier indexed array access", async () => {
    const template = env.fromString("{{ greetings[0] }}");
    const result = await template.render({
      greetings: ["good morning", "good evening"],
    });
    expect(result).toBe("good morning");
  });
  test("identifier property access", async () => {
    const template = env.fromString("{{ greetings.pm }}");
    const result = await template.render({
      greetings: { am: "good morning", pm: "good evening" },
    });
    expect(result).toBe("good evening");
  });
  test("identifier bracketed property access", async () => {
    const template = env.fromString("{{ greetings['pm'] }}");
    const result = await template.render({
      greetings: { am: "good morning", pm: "good evening" },
    });
    expect(result).toBe("good evening");
  });
  test("identifier chained property access", async () => {
    const template = env.fromString("{{ greetings.english['pm'] }}");
    const result = await template.render({
      greetings: { english: { am: "good morning", pm: "good evening" } },
    });
    expect(result).toBe("good evening");
  });
});
