import { parse } from "../src";

const SOURCE = `\
Hello, {{ you }}!
{% assign x = 'foo' | upcase %}
{% for ch in x %}
    - {{ ch }}
{% endfor %}
Goodbye, {{ you.first_name | capitalize }} {{ you.last_name }}
Goodbye, {{ you.first_name }} {{ you.last_name }}
`;

const TEMPLATE = parse(SOURCE);

describe("static analysis helpers", () => {
  test("variables", async () => {
    expect(await TEMPLATE.variables()).toStrictEqual(["you", "x", "ch"]);
  });

  test("variables sync", () => {
    expect(TEMPLATE.variablesSync()).toStrictEqual(["you", "x", "ch"]);
  });

  test("paths", async () => {
    expect((await TEMPLATE.variablePaths()).toSorted()).toStrictEqual(
      ["you", "x", "ch", "you.first_name", "you.last_name"].toSorted(),
    );
  });

  test("paths sync", () => {
    expect(TEMPLATE.variablePathsSync().toSorted()).toStrictEqual(
      ["you", "x", "ch", "you.first_name", "you.last_name"].toSorted(),
    );
  });

  // TODO:
});
