import { HTMLSafeString } from "../drops/html_safe";
import type { FilterContext } from "../filter";

const ESCAPE_MAP: Record<string, string> = {
  "\\": "\\u005C",
  "'": "\\u0027",
  '"': "\\u0022",
  ">": "\\u003E",
  "<": "\\u003C",
  "&": "\\u0026",
  "=": "\\u003D",
  "-": "\\u002D",
  ";": "\\u003B",
  "`": "\\u0060",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
  "\x00": "\\u0000",
  "\x01": "\\u0001",
  "\x02": "\\u0002",
  "\x03": "\\u0003",
  "\x04": "\\u0004",
  "\x05": "\\u0005",
  "\x06": "\\u0006",
  "\x07": "\\u0007",
  "\x08": "\\u0008",
  "\t": "\\u0009",
  "\n": "\\u000A",
  "\x0b": "\\u000B",
  "\x0c": "\\u000C",
  "\r": "\\u000D",
  "\x0e": "\\u000E",
  "\x0f": "\\u000F",
  "\x10": "\\u0010",
  "\x11": "\\u0011",
  "\x12": "\\u0012",
  "\x13": "\\u0013",
  "\x14": "\\u0014",
  "\x15": "\\u0015",
  "\x16": "\\u0016",
  "\x17": "\\u0017",
  "\x18": "\\u0018",
  "\x19": "\\u0019",
  "\x1a": "\\u001A",
  "\x1b": "\\u001B",
  "\x1c": "\\u001C",
  "\x1d": "\\u001D",
  "\x1e": "\\u001E",
  "\x1f": "\\u001F",
};

const RE_ESCAPE = new RegExp(
  Object.keys(ESCAPE_MAP).map(escapeRegex).join("|"),
  "g",
);

export function escapeJS(
  this: FilterContext,
  left: unknown,
): string | HTMLSafeString {
  this.assertArgs(arguments.length, 1);

  const left_ = this.toStringSafe(left, "").valueOf();
  const escaped = left_.replace(RE_ESCAPE, (m) => ESCAPE_MAP[m] ?? "");

  if (this.context.env.autoEscape) {
    return new HTMLSafeString(escaped);
  }

  return escaped;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
