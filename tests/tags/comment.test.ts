import { DefaultEnvironment } from "../../src/environment";

describe("built-in comment tag", () => {
  const env = new DefaultEnvironment({});

  test("only comment", async () => {
    const template = env.fromString("{% comment %}hello{% endcomment %}");
    const result = await template.render();
    expect(result).toBe("");
  });
  test("whitespace control", async () => {
    const template = env.fromString(
      "\n{%- comment %}hello{% endcomment -%}\t \r"
    );
    const result = await template.render();
    expect(result).toBe("");
  });
  test("don't render commented out tags", async () => {
    const template = env.fromString(
      "{% comment %}" +
        "{% if true %}" +
        "{{ title }}" +
        "{% endif %}" +
        "{% endcomment %}"
    );
    const result = await template.render();
    expect(result).toBe("");
  });
});
