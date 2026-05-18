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
  }

  expect(Object.entries(got).length).toStrictEqual(Object.entries(want).length);
}

function expectLocations(got: Locations, want: Locations_): void {
  for (const [k, v] of Object.entries(want)) {
    const got_ = got[k] ?? [];
    v.forEach((w, i) => {
      expect(got_[i]?.value).toEqual(w);
    });
  }
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
    expectLocations(analysis.filters, tags);
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
    expectLocations(analysis.filters, tags);
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
    expectLocations(analysis.filters, tags);
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
    expectLocations(analysis.filters, tags);
  });

  test("nested root query", () => {
    const source = "{{ [a.b] }}";
    const analysis = parse(source).analyzeSync();

    const locals: Vars_ = {};
    const globals: Vars_ = {
      a: [[["a", "b"], "a.b"]],
    };
    const variables = globals;
    const filters: Locations_ = {};
    const tags: Locations_ = {};

    expectVars(analysis.locals, locals);
    expectVars(analysis.globals, globals);
    expectVars(analysis.variables, variables);
    expectLocations(analysis.filters, filters);
    expectLocations(analysis.filters, tags);
  });
});
