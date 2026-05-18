import { parse } from "../src";
import {
  type Locations,
  type Segments,
  type Vars,
} from "../src/static_analysis";

type Vars_ = Record<string, Array<[Segments, string]>>;
type Locations_ = Record<string, string[]>;

function expectVars(got: Vars, want: Vars_): void {
  for (const [k, v] of Object.entries(want)) {
    const got_ = got[k] ?? [];
    v.forEach((w, i) => {
      const [segments, value] = w;
      expect(got_[i]?.value).toEqual(value);
      expect(got_[i]?.segments).toEqual(segments);
    });
    expect(got_.length).toStrictEqual(v.length);
  }

  expect(Object.entries(got).length).toStrictEqual(Object.entries(want).length);
}

function expectLocations(got: Locations, want: Locations_): void {
  for (const [k, v] of Object.entries(want)) {
    const got_ = got[k] ?? [];
    v.forEach((w, i) => {
      expect(got_[i]?.value).toEqual(w);
    });
    expect(got_.length).toStrictEqual(v.length);
  }

  expect(Object.entries(got).length).toStrictEqual(Object.entries(want).length);
}

describe("static analysis", () => {
  test("output", () => {
    const source = "{{ x | default: y, allow_false: z }}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      x: [[["x"], "x"]],
      y: [[["y"], "y"]],
      z: [[["z"], "z"]],
    };
    const variables = globals;
    const filters: Locations_ = {
      default: ["default: y, allow_false: z"],
    };
    const tags: Locations_ = {};

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("bracketed notation", () => {
    const source = "{{ x['y'].title }}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      x: [[["x", "y", "title"], "x['y'].title"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {};

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("quoted name notation", () => {
    const source = "{{ some['foo.bar'] }}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      some: [[["some", "foo.bar"], "some['foo.bar']"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {};

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("nested queries", () => {
    const source = "{{ x[y.z].title }}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      x: [[["x", ["y", "z"], "title"], "x[y.z].title"]],
      y: [[["y", "z"], "y.z"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {};

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("dynamic root query", () => {
    const source = "{{ [a.b] }}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      "a.b": [[[["a", "b"]], "a.b"]],
      a: [[["a", "b"], "a.b"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {};

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("assign", () => {
    const source = "{% assign x = y | append: z %}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {
      x: [[["x"], "x"]],
    };
    const globals: Vars_ = {
      y: [[["y"], "y"]],
      z: [[["z"], "z"]],
    };
    const variables = globals;
    const filters: Locations_ = {
      append: ["append: z"],
    };
    const tags: Locations_ = {
      assign: ["assign"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("capture", () => {
    const source = "{% capture x %}{% if y %}z{% endif %}{% endcapture %}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {
      x: [[["x"], "x"]],
    };
    const globals: Vars_ = {
      y: [[["y"], "y"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {
      capture: ["capture"],
      if: ["if"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("case", () => {
    const source = [
      "{% case x %}",
      "{% when y %}",
      "  {{ a }}",
      "{% when z %}",
      "  {{ b }}",
      "{% else %}",
      "  {{ c }}",
      "{% endcase %}",
    ].join("\n");

    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      x: [[["x"], "x"]],
      y: [[["y"], "y"]],
      a: [[["a"], "a"]],
      z: [[["z"], "z"]],
      b: [[["b"], "b"]],
      c: [[["c"], "c"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {
      case: ["case"],
      when: ["when", "when"],
      else: ["else"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("cycle", () => {
    const source = "{% cycle x: a, b %}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      a: [[["a"], "a"]],
      b: [[["b"], "b"]],
      x: [[["x"], "x"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {
      cycle: ["cycle"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("decrement", () => {
    const source = "{% decrement x %}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {
      x: [[["x"], "x"]],
    };
    const globals: Vars_ = {};
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {
      decrement: ["decrement"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("echo", () => {
    const source = "{% echo x | default: y, allow_false: z %}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      x: [[["x"], "x"]],
      y: [[["y"], "y"]],
      z: [[["z"], "z"]],
    };
    const variables = globals;
    const filters: Locations_ = {
      default: ["default: y, allow_false: z"],
    };
    const tags: Locations_ = {
      echo: ["echo"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("for", () => {
    const source = [
      "{% for x in (1..y) %}",
      "  {{ x }}",
      "{% break %}",
      "{% else %}",
      "  {{ z }}",
      "{% continue %}",
      "{% endfor %}",
    ].join("\n");

    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      y: [[["y"], "y"]],
      z: [[["z"], "z"]],
    };
    const variables: Vars_ = {
      y: [[["y"], "y"]],
      x: [[["x"], "x"]],
      z: [[["z"], "z"]],
    };
    const filters: Locations_ = {};
    const tags: Locations_ = {
      for: ["for"],
      break: ["break"],
      continue: ["continue"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("if", () => {
    const source = [
      "{% if x %}",
      "  {{ a }}",
      "{% elsif y %}",
      "  {{ b }}",
      "{% else %}",
      "  {{ c }}",
      "{% endif %}",
    ].join("\n");

    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      x: [[["x"], "x"]],
      a: [[["a"], "a"]],
      y: [[["y"], "y"]],
      b: [[["b"], "b"]],
      c: [[["c"], "c"]],
    };
    const variables: Vars_ = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {
      if: ["if"],
      elsif: ["elsif"],
      else: ["else"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("increment", () => {
    const source = "{% increment x %}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {
      x: [[["x"], "x"]],
    };
    const globals: Vars_ = {};
    const variables: Vars_ = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {
      increment: ["increment"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("liquid", () => {
    const source = `\
{% liquid
if product.title
    echo foo | upcase
else
    echo 'product-1' | upcase
endif

for i in (0..5)
    echo i
endfor %}`;

    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      product: [[["product", "title"], "product.title"]],
      foo: [[["foo"], "foo"]],
    };
    const variables: Vars_ = {
      product: [[["product", "title"], "product.title"]],
      foo: [[["foo"], "foo"]],
      i: [[["i"], "i"]],
    };
    const filters: Locations_ = {
      upcase: ["upcase", "upcase"],
    };
    const tags: Locations_ = {
      liquid: ["liquid"],
      echo: ["echo", "echo", "echo"],
      for: ["for"],
      if: ["if"],
      else: ["else"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  test("unless", () => {
    const source = `\
{% unless x %}
  {{ a }}
{% elsif y %}
  {{ b }}
{% else %}
  {{ c }}
{% endunless %}`;

    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      x: [[["x"], "x"]],
      a: [[["a"], "a"]],
      y: [[["y"], "y"]],
      b: [[["b"], "b"]],
      c: [[["c"], "c"]],
    };
    const variables: Vars_ = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {
      unless: ["unless"],
      elsif: ["elsif"],
      else: ["else"],
    };

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.tags, tags);
  });

  // TODO: partials
  // TODO: comment
  // TODO: inline comment
  // TODO: doc
  // TODO: raw
  // TODO: ifchanged?
  // TODO: tablerow?
});
