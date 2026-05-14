import { DateTime } from "luxon";
import { DefaultMap } from "../default_map";
import type { FilterContext } from "../filter";
import { isLiquidNumber, isPrimitiveNumber } from "../number";
import { isString } from "../type_guards";
import { ArgumentError } from "../errors";

const FORMAT_TOKENS = new DefaultMap<string, string>(
  () => "",
  [
    ["%%", "%"],
    ["%a", "ccc"],
    ["%A", "cccc"],
    ["%b", "LLL"],
    ["%B", "LLLL"],
    ["%c", "ccc LLL d TT y"],
    ["%d", "dd"],
    ["%D", "LL/dd/yy"],
    ["%F", "yyyy-LL-dd"],
    ["%G", "kkkk"],
    ["%H", "HH"],
    ["%I", "hh"],
    ["%j", "ooo"],
    ["%m", "LL"],
    ["%M", "mm"],
    ["%p", "a"],
    ["%R", "HH:mm"],
    ["%s", "X"],
    ["%S", "ss"],
    ["%T", "HH:mm:ss"],
    ["%V", "WW"],
    ["%W", "WW"],
    ["%w", "c"],
    ["%x", "DDD"],
    ["%X", "TT"],
    ["%y", "yy"],
    ["%Y", "yyyy"],
    ["%Z", "ZZZZ"],
    ["%:z", "ZZ"],
  ],
);

const RE_DATE_FORMAT = new RegExp(
  ["%%", ...FORMAT_TOKENS.keys()].join("|"),
  "g",
);

function replaceDateFormat(format: string): string {
  return format.replace(RE_DATE_FORMAT, (match) => FORMAT_TOKENS.get(match));
}

/**
 * Parse a string as DateTime by trying each of the common date formats
 * in turn. This does not do fuzzy or natural language parsing.
 */
function parseDateString(s: string): DateTime {
  let date_ = DateTime.fromSQL(s);
  if (date_.isValid) return date_;

  date_ = DateTime.fromISO(s);
  if (date_.isValid) return date_;

  date_ = DateTime.fromHTTP(s);
  if (date_.isValid) return date_;

  if (s.match(/\d+/)) {
    date_ = DateTime.fromSeconds(Number(s));
    if (date_.isValid) return date_;
  }

  return date_;
}

/**
 * Format a date according to the given format string. If the input is not a
 * date it will be converted to a string and parsed using one of the common
 * date representation standards.
 */
export function date(
  this: FilterContext,
  left: unknown,
  format: unknown,
): string {
  this.assertArgs(arguments.length, 2);
  if (this.isNil(left)) return "";
  if (this.isNil(format)) return this.toString(left, "");

  let _date: DateTime;

  // Numbers could be a unix timestamp or an ISO date/time without separators.
  if (isPrimitiveNumber(left) || isLiquidNumber(left)) left = left.toString();

  if (isString(left)) {
    if (left.length === 0) return left;
    const left_ = left.toLowerCase();
    if (left_ === "now" || left_ === "today") {
      _date = DateTime.now();
    } else {
      _date = parseDateString(left_);
    }
  } else if (left instanceof Date) {
    _date = DateTime.fromJSDate(left);
  } else if (left instanceof DateTime) {
    _date = left;
  } else {
    throw new ArgumentError(
      `expected a date, found ${left}`,
      this.span,
      this.context.template.source,
    );
  }

  if (format === "") {
    format = "%Y-%m-%d %H:%M:%S";
  }

  return _date.toFormat(replaceDateFormat(this.toString(format, "")));
}
