import { parse } from "../src/liquidscript";

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

  test("segments", async () => {
    expect((await TEMPLATE.variableSegments()).toSorted()).toStrictEqual(
      [
        ["you"],
        ["x"],
        ["ch"],
        ["you", "first_name"],
        ["you", "last_name"],
      ].toSorted(),
    );
  });

  test("segments sync", () => {
    expect(TEMPLATE.variableSegmentsSync().toSorted()).toStrictEqual(
      [
        ["you"],
        ["x"],
        ["ch"],
        ["you", "first_name"],
        ["you", "last_name"],
      ].toSorted(),
    );
  });

  test("global variables", async () => {
    expect(await TEMPLATE.globalVariables()).toStrictEqual(["you"]);
  });

  test("global variables sync", () => {
    expect(TEMPLATE.globalVariablesSync()).toStrictEqual(["you"]);
  });

  test("global paths", async () => {
    expect((await TEMPLATE.globalVariablePaths()).toSorted()).toStrictEqual(
      ["you", "you.first_name", "you.last_name"].toSorted(),
    );
  });

  test("global paths sync", () => {
    expect(TEMPLATE.globalVariablePathsSync().toSorted()).toStrictEqual(
      ["you", "you.first_name", "you.last_name"].toSorted(),
    );
  });

  test("global segments", async () => {
    expect((await TEMPLATE.globalVariableSegments()).toSorted()).toStrictEqual(
      [["you"], ["you", "first_name"], ["you", "last_name"]].toSorted(),
    );
  });

  test("global segments sync", () => {
    expect(TEMPLATE.globalVariableSegmentsSync().toSorted()).toStrictEqual(
      [["you"], ["you", "first_name"], ["you", "last_name"]].toSorted(),
    );
  });

  test("filter names", async () => {
    expect((await TEMPLATE.filterNames()).toSorted()).toStrictEqual(
      ["upcase", "capitalize"].toSorted(),
    );
  });

  test("filter names sync", () => {
    expect(TEMPLATE.filterNamesSync().toSorted()).toStrictEqual(
      ["upcase", "capitalize"].toSorted(),
    );
  });

  test("tag names", async () => {
    expect((await TEMPLATE.tagNames()).toSorted()).toStrictEqual(
      ["assign", "for"].toSorted(),
    );
  });

  test("tag names sync", () => {
    expect(TEMPLATE.tagNamesSync().toSorted()).toStrictEqual(
      ["assign", "for"].toSorted(),
    );
  });

  test("comment nodes", () => {
    const source = `\
A template with comments.
{% comment %}a{% endcomment %}
{% comment %}b{% endcomment %}
{% # c %}
{% if false %}
    {% comment %}d{% endcomment %}
    {% # e %}
{% endif %}
`;

    const template = parse(source);
    const nodes = template.comments();
    const comments = nodes.map((n) => n.text);
    expect(comments).toStrictEqual(["a", "b", " c ", "d", " e "]);
  });

  test("doc nodes", () => {
    const source = `\
{% doc %}
    Some docs
{% enddoc %}

{% doc %}More docs{% enddoc %}
`;

    const template = parse(source);
    const nodes = template.docs();
    const comments = nodes.map((n) => n.text);
    expect(comments).toStrictEqual(["\n    Some docs\n", "More docs"]);
  });
});
