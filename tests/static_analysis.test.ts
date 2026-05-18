import { parse, type Template } from "../src";
import {
  Location,
  StaticVariable,
  type Segments,
  type TemplateAnalysis,
} from "../src/static_analysis";

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

describe("static analysis", () => {
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

  test("output", () => {
    const source = "{{ x | default: y, allow_false: z }}";
    const analysis = parse(source).analyzeSync();

    const variables = {
      x: [[["x"], "x"]],
      y: [[["y"], "y"]],
      z: [[["z"], "z"]],
    };

    for (const [k, v] of Object.entries(variables)) {
      const want = analysis.variables[k] ?? [];
      v.forEach((w, i) => {
        const [segments, value] = w;
        expect(want[i]?.value).toEqual(value);
        expect(want[i]?.segments).toEqual(segments);
      });
    }
  });
});
