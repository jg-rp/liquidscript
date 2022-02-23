import { Environment } from "../../src/environment";

// TODO: Finish tests

describe("built-in case/when tag", () => {
  const env = new Environment({});

  test("switch on variable with literal 'whens'", async () => {
    const template = env.fromString(
      "{% case greeting %}" +
        "{% when 'hello' %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}"
    );
    const result = await template.render({ greeting: "hello" });
    expect(result).toBe("HELLO WORLD");
  });
  test("switch on variable with variable 'when'", async () => {
    const template = env.fromString(
      "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}"
    );
    const result = await template.render({ greeting: "hello", a: "hello" });
    expect(result).toBe("HELLO WORLD");
  });
  test("nested tag inside 'when' block", async () => {
    const template = env.fromString(
      "{% case greeting %}" +
        "{% when a %}" +
        "{% if true %}HELLO WORLD{% endif %}" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}"
    );
    const result = await template.render({ greeting: "hello", a: "hello" });
    expect(result).toBe("HELLO WORLD");
  });
  test("no match and no default", async () => {
    const template = env.fromString(
      "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% endcase %}"
    );
    const result = await template.render({ greeting: "something", a: "hello" });
    expect(result).toBe("");
  });
  test("no match with default", async () => {
    const template = env.fromString(
      "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye' %}GOODBYE WORLD" +
        "{% else %}G'DAY" +
        "{% endcase %}"
    );
    const result = await template.render({ greeting: "something", a: "hello" });
    expect(result).toBe("G'DAY");
  });
  test("no blocks", async () => {
    const template = env.fromString("{% case greeting %}{% endcase %}");
    const result = await template.render();
    expect(result).toBe("");
  });
  test("just default block", async () => {
    const template = env.fromString(
      "{% case greeting %}{% else %}hello{% endcase %}"
    );
    const result = await template.render();
    expect(result).toBe("hello");
  });
  test("comma separated when expression", async () => {
    const template = env.fromString(
      "{% case greeting %}" +
        "{% when a %}HELLO WORLD" +
        "{% when 'goodbye', 'something' %}GOODBYE WORLD" +
        "{% endcase %}"
    );
    const result = await template.render({ greeting: "something", a: "hello" });
    expect(result).toBe("GOODBYE WORLD");
  });
  test("multiple matching blocks", async () => {
    const template = env.fromString(
      "{% case greeting %}" +
        "{% when a %}HELLO WORLD " +
        "{% when 'hello', a %}GOODBYE WORLD " +
        "{% endcase %}"
    );
    const result = await template.render({ greeting: "hello", a: "hello" });
    expect(result).toBe("HELLO WORLD GOODBYE WORLD GOODBYE WORLD ");
  });
});
