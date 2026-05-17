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
    expect(analysis.variables.size).toStrictEqual(3);

    const xs = analysis.variables.get("x") as StaticVariable[];
    expect(xs).toBeDefined();
    expect(xs.length).toStrictEqual(1);

    const x = xs[0] as StaticVariable;
    expect(x).toBeDefined();

    expect(x.segments).toStrictEqual(["x"]);

    const loc = xs[0]?.location as Location;
    expect(loc.value(source)).toStrictEqual("x");
    const [line, col] = loc.lineCol(source, loc.token.start);
    expect(line).toStrictEqual(1);
    expect(col).toStrictEqual(3);
  });
});
