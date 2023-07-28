import { Environment } from "../src/environment";
import { NoSuchFilterError } from "../src/errors";
import { FilterContext } from "../src/filter";

function JSONFilter(this: FilterContext, left: unknown): string {
  return JSON.stringify(left);
}

describe("add a filter", () => {
  test("JSON filter", () => {
    const env = new Environment({ strictFilters: true });
    const template = env.fromString("{{ obj | json }}");

    // Before adding the filter
    expect(() => template.renderSync({ obj: { a: 1 } })).toThrow(
      NoSuchFilterError,
    );

    // Add the filter
    env.addFilter("json", JSONFilter);
    expect(template.renderSync({ obj: { a: 1 } })).toBe('{"a":1}');
  });
});
