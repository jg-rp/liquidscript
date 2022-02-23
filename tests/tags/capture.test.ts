import { Environment } from "../../src/environment";

describe("built-in capture tag", () => {
  const env = new Environment({
    globals: { customer: { first_name: "Sally" } },
  });

  test("capture template literals and global variable", async () => {
    const template = env.fromString(
      "{% capture greeting %}" +
        "Hello, {{ customer.first_name }}" +
        "{% endcapture %}" +
        "{{ greeting }}"
    );
    const result = await template.render();
    expect(result).toBe("Hello, Sally");
  });
  test("capture into a variable with a hyphen", async () => {
    const template = env.fromString(
      "{% capture some-greeting %}" +
        "Hello, {{ customer.first_name }}" +
        "{% endcapture %}" +
        "{{ some-greeting }}"
    );
    const result = await template.render();
    expect(result).toBe("Hello, Sally");
  });
  test("assign the value of a captured variable", async () => {
    const template = env.fromString(
      "{% capture greeting %}" +
        "Hello" +
        "{% endcapture %}" +
        "{% assign x = greeting %}" +
        "{{ greeting }}-{{ x }}"
    );
    const result = await template.render();
    expect(result).toBe("Hello-Hello");
  });
});
