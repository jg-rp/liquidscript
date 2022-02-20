import { DateTime } from "luxon";
import { date } from "../../src/builtin/filters/misc";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("date filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

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
});
