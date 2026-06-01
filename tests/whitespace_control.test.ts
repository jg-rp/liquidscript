import { Environment } from "../src/environment";

describe("whitespace control", () => {
  const env = new Environment({});

  test("strip whitespace preceding an output statement", async () => {
    const template = env.parse("\t\n {{- 'hello' }}");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("strip whitespace following an output statement", async () => {
    const template = env.parse("{{ 'hello' -}}\t\n ");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("strip whitespace preceding and following an output statement", async () => {
    const template = env.parse("\t\n {{- 'hello' -}}\t\n ");
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("strip whitespace preceding a tag", async () => {
    const template = env.parse("\t\n {%- increment a %}");
    const result = await template.render();
    expect(result).toBe("0");
  });
  test("strip whitespace following a tag", async () => {
    const template = env.parse("{% increment a -%}\t\n ");
    const result = await template.render();
    expect(result).toBe("0");
  });
  test("strip whitespace preceding and following a tag", async () => {
    const template = env.parse("\t\n {%- increment a -%}\t\n ");
    const result = await template.render();
    expect(result).toBe("0");
  });
  test("strip whitespace around raw tags", async () => {
    const template = env.parse(
      "! {% raw %}{{ hello }}{% endraw %} !\n" +
        "! {%- raw -%}{{ hello }}{%- endraw -%} !",
    );
    const result = await template.render();
    expect(result).toBe("! {{ hello }} !\n!{{ hello }}!");
  });
});
