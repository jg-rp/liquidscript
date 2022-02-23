import { FilterArgumentError } from "../../errors";
import { FilterContext } from "../../filter";
import { toLiquidString } from "../../types";
import { escape as escapeHTML, unescape } from "../../html";

// TODO: Implement Markup string wrapper
// TODO: tests

/**
 *
 * @param this
 * @param left
 * @param other
 * @returns
 */
export function append(
  this: FilterContext,
  left: unknown,
  other: unknown
): string {
  if (arguments.length < 2)
    throw new FilterArgumentError("append: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `append: too many arguments, expected 1, found ${arguments.length - 1}`
    );
  return toLiquidString(left) + toLiquidString(other);
}

export function base64Encode(this: FilterContext, left: unknown): string {
  throw new Error("not implemented");
}

export function base64Decode(this: FilterContext, left: unknown): string {
  throw new Error("not implemented");
}

export function base64UrlSafeEncode(
  this: FilterContext,
  left: unknown
): string {
  throw new Error("not implemented");
}

export function base64UrlSafeDecode(
  this: FilterContext,
  left: unknown
): string {
  throw new Error("not implemented");
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function capitalize(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `capitalize: too many arguments, expected 0, found ${
        arguments.length - 1
      }`
    );
  // TODO: read locale from context.
  const s = toLiquidString(left);
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function downcase(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `downcase: too many arguments, expected 0, found ${arguments.length - 1}`
    );
  // TODO: read locale from context.
  return toLiquidString(left).toLocaleLowerCase();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function escape(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `escape: too many arguments, expected 0, found ${arguments.length - 1}`
    );
  return escapeHTML(toLiquidString(left));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function escapeOnce(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `escape_once: too many arguments, expected 0, found ${
        arguments.length - 1
      }`
    );
  return escapeHTML(unescape(toLiquidString(left)));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function lstrip(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );
  return toLiquidString(left).trimStart();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function newlineToBr(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `newline_to_br: too many arguments, expected 0, found ${
        arguments.length - 1
      }`
    );
  return toLiquidString(left).replace(/\r?\n/g, "<br />\n");
}

/**
 *
 * @param this
 * @param left
 * @param arg
 * @returns
 */
export function prepend(
  this: FilterContext,
  left: unknown,
  arg: unknown
): string {
  if (arguments.length < 2)
    throw new FilterArgumentError("prepend: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `prepend: too many arguments, expected 1, found ${arguments.length - 1}`
    );
  return toLiquidString(arg) + toLiquidString(left);
}

/**
 *
 * @param this
 * @param left
 * @param arg
 */
export function remove(
  this: FilterContext,
  left: unknown,
  arg: unknown
): string {
  if (arguments.length < 2)
    throw new FilterArgumentError("remove: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `remove: too many arguments, expected 1, found ${arguments.length - 1}`
    );
  return toLiquidString(left).replace(new RegExp(toLiquidString(arg), "g"), "");
}

/**
 *
 * @param this
 * @param left
 * @param arg
 * @returns
 */
export function removeFirst(
  this: FilterContext,
  left: unknown,
  arg: unknown
): string {
  if (arguments.length < 2)
    throw new FilterArgumentError("remove: missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `remove: too many arguments, expected 1, found ${arguments.length - 1}`
    );
  return toLiquidString(left).replace(toLiquidString(arg), "");
}

/**
 *
 * @param this
 * @param left
 * @param subString
 * @param newSubString
 */
export function replace(
  this: FilterContext,
  left: unknown,
  subString: unknown,
  newSubString?: unknown
): string {
  if (arguments.length < 2)
    throw new FilterArgumentError("replace: missing argument");
  if (arguments.length > 3)
    throw new FilterArgumentError(
      `replace: too many arguments, expected 1 or 2, found ${
        arguments.length - 1
      }`
    );

  return toLiquidString(left).replace(
    new RegExp(toLiquidString(subString), "g"),
    toLiquidString(newSubString)
  );
}

/**
 *
 * @param this
 * @param left
 * @param subString
 * @param newSubString
 * @returns
 */
export function replaceFirst(
  this: FilterContext,
  left: unknown,
  subString: unknown,
  newSubString?: unknown
): string {
  if (arguments.length < 2)
    throw new FilterArgumentError("replace_first: missing argument");
  if (arguments.length > 3)
    throw new FilterArgumentError(
      `replace_first: too many arguments, expected 1 or 2, found ${
        arguments.length - 1
      }`
    );

  return toLiquidString(left).replace(
    toLiquidString(subString),
    toLiquidString(newSubString)
  );
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function upcase(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );
  // TODO: read locale from context.
  return toLiquidString(left).toLocaleUpperCase();
}

/**
 *
 * @param this
 * @param left
 * @param subString
 * @returns
 */
export function split(
  this: FilterContext,
  left: unknown,
  subString: unknown
): string[] {
  if (arguments.length < 2) throw new FilterArgumentError("missing argument");
  if (arguments.length > 2)
    throw new FilterArgumentError(
      `too many arguments, expected 1, found ${arguments.length - 1}`
    );

  return toLiquidString(left).split(toLiquidString(subString));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function strip(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );

  return toLiquidString(left).trim();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function rstrip(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );

  return toLiquidString(left).trimEnd();
}

// We're aiming for consistency with the reference implementation here,
// rather than correctness.
const STRIP_HTML_BLOCKS = new RegExp(
  "<script.*?</script>|<!--.*?-->|<style.*?</style>",
  "gs"
);

const STRIP_HTML_TAGS = new RegExp("<.*?>", "gs");

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function stripHtml(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );

  return toLiquidString(left)
    .replace(STRIP_HTML_BLOCKS, "")
    .replace(STRIP_HTML_TAGS, "");
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function stripNewlines(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );
  return toLiquidString(left).replace(/\r?\n/, "");
}

/**
 *
 * @param this
 * @param left
 * @param length
 * @param end
 * @returns
 */
export function truncate(
  this: FilterContext,
  left: unknown,
  length: unknown = 50,
  end: unknown = "..."
): string {
  const _left = toLiquidString(left);
  const _length = Number(length);
  if (!Number.isInteger(_length))
    throw new FilterArgumentError(
      `expected an integer length, found ${length}`
    );

  if (_left.length <= _length) return _left;

  const _end = toLiquidString(end);
  const stop = _length - _end.length < 0 ? 0 : _length - _end.length;
  return `${_left.slice(0, stop)}${_end}`;
}

const MAX_TRUNC_WORDS = 2147483647;

/**
 *
 * @param this
 * @param left
 * @param wordCount
 * @param end
 * @returns
 */
export function truncateWords(
  this: FilterContext,
  left: unknown,
  wordCount: unknown = 15,
  end: unknown = "..."
): string {
  const _left = toLiquidString(left);
  let _wordCount = Number(wordCount);
  if (!Number.isInteger(_wordCount))
    throw new FilterArgumentError(
      `expected an integer length, found ${wordCount}`
    );

  if (_wordCount <= 0) _wordCount = 1;
  if (_wordCount > MAX_TRUNC_WORDS)
    throw new FilterArgumentError(
      `integer ${wordCount} too big for truncatewords`
    );

  const _end = toLiquidString(end);
  const words = _left.split(" ");

  if (words.length <= _wordCount) return _left;
  return words.slice(0, _wordCount).join(" ") + _end;
}

/**
 *
 * @param s
 * @returns
 */
function fixedEncodeURIComponent(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function urlEncode(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );
  return fixedEncodeURIComponent(toLiquidString(left)).replace(/%20/g, "+");
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function urlDecode(this: FilterContext, left: unknown): string {
  if (arguments.length > 1)
    throw new FilterArgumentError(
      `too many arguments, expected 0, found ${arguments.length - 1}`
    );
  return decodeURIComponent(toLiquidString(left).replace(/\+/g, " "));
}
