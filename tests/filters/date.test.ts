import { DateTime } from "luxon";
import { date } from "../../src/builtin/filters/misc";
import { RenderContext } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("date filter", () => {
  const env = new Environment({});
  const ctx = new RenderContext(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("month from sql-style string", () => {
    expect(date.apply(filterContext, ["2006-05-05 10:00:00", "%B"])).toBe(
      "May"
    );
    expect(date.apply(filterContext, ["2006-06-05 10:00:00", "%B"])).toBe(
      "June"
    );
  });

  test("literal percent", () => {
    expect(date.apply(filterContext, ["2006-05-05 10:00:00", "%%%B"])).toBe(
      "%May"
    );
  });

  test("month from date object", () => {
    expect(
      date.apply(filterContext, [new Date("2006-05-05 10:00:00"), "%B"])
    ).toBe("May");
    expect(
      date.apply(filterContext, [new Date("2006-06-05 10:00:00"), "%B"])
    ).toBe("June");
  });

  test("month day year from sql-style string", () => {
    expect(date.apply(filterContext, ["2006-07-05 10:00:00", "%m/%d/%Y"])).toBe(
      "07/05/2006"
    );
  });

  test("now", () => {
    expect(date.apply(filterContext, ["now", "%Y"])).toBe(
      DateTime.now().year.toString()
    );
  });

  test("today", () => {
    expect(date.apply(filterContext, ["today", "%Y"])).toBe(
      DateTime.now().year.toString()
    );
  });

  test("other formatted date string", () => {
    expect(
      date.apply(filterContext, ["Fri Jul 16 01:00:00 2004", "%m/%d/%Y"])
    ).toBe("07/16/2004");
  });

  test("unix time string", () => {
    expect(date.apply(filterContext, ["1152098955", "%m/%d/%Y"])).toBe(
      "07/05/2006"
    );
  });

  test("unix time number", () => {
    expect(date.apply(filterContext, [1152098955, "%m/%d/%Y"])).toBe(
      "07/05/2006"
    );
  });
});
