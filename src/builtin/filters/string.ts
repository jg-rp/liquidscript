import { FilterArgumentError } from "../../errors";
import { checkArguments, FilterContext } from "../../filter";
import { isUndefined, liquidStringify } from "../../types";
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
  checkArguments(arguments.length, 1, 1);
  return liquidStringify(left) + liquidStringify(other);
}

// TODO: base64 filters

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
  checkArguments(arguments.length, 0);
  // TODO: read locale from context.
  const s = liquidStringify(left);
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function downcase(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  // TODO: read locale from context.
  return liquidStringify(left).toLocaleLowerCase();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function escape(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return escapeHTML(liquidStringify(left));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function escapeOnce(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return escapeHTML(unescape(liquidStringify(left)));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function lstrip(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return liquidStringify(left).trimStart();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function newlineToBr(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return liquidStringify(left).replace(/\r?\n/g, "<br />\n");
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
  checkArguments(arguments.length, 1, 1);
  return liquidStringify(arg) + liquidStringify(left);
}

/**
 *
 * @param this
 * @param left
 * @param arg
 * @returns
 */
export function remove(
  this: FilterContext,
  left: unknown,
  arg: unknown
): string {
  checkArguments(arguments.length, 1, 1);
  return liquidStringify(left).replace(
    new RegExp(liquidStringify(arg), "g"),
    ""
  );
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
  checkArguments(arguments.length, 1, 1);
  return liquidStringify(left).replace(liquidStringify(arg), "");
}

/**
 *
 * @param this
 * @param left
 * @param subString
 * @param newSubString
 * @returns
 */
export function replace(
  this: FilterContext,
  left: unknown,
  subString: unknown,
  newSubString?: unknown
): string {
  checkArguments(arguments.length, 2, 1);
  return liquidStringify(left).replace(
    new RegExp(liquidStringify(subString), "g"),
    liquidStringify(newSubString)
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
  checkArguments(arguments.length, 2, 1);
  return liquidStringify(left).replace(
    liquidStringify(subString),
    liquidStringify(newSubString)
  );
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function upcase(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  // TODO: read locale from context.
  return liquidStringify(left).toLocaleUpperCase();
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
  checkArguments(arguments.length, 1, 1);
  return liquidStringify(left).split(liquidStringify(subString));
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function strip(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return liquidStringify(left).trim();
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function rstrip(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return liquidStringify(left).trimEnd();
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
  checkArguments(arguments.length, 0);
  return liquidStringify(left)
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
  checkArguments(arguments.length, 0);
  return liquidStringify(left).replace(/\r?\n/g, "");
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
  checkArguments(arguments.length, 2);
  const _left = liquidStringify(left);
  const _length = Number(length);
  if (isUndefined(length) || !Number.isInteger(_length))
    throw new FilterArgumentError(
      `expected an integer length, found ${length}`
    );

  if (_left.length <= _length) return _left;

  const _end = liquidStringify(end);
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
  checkArguments(arguments.length, 2);
  const _left = liquidStringify(left);
  let _wordCount = Number(wordCount);
  if (isUndefined(wordCount) || !Number.isInteger(_wordCount))
    throw new FilterArgumentError(
      `expected an integer length, found ${wordCount}`
    );

  if (_wordCount <= 0) _wordCount = 1;
  if (_wordCount > MAX_TRUNC_WORDS)
    throw new FilterArgumentError(
      `integer ${wordCount} too big for truncatewords`
    );

  const _end = liquidStringify(end);
  const words = _left.split(/\s+/g);

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
  checkArguments(arguments.length, 0);
  return fixedEncodeURIComponent(liquidStringify(left)).replace(/%20/g, "+");
}

/**
 *
 * @param this
 * @param left
 * @returns
 */
export function urlDecode(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return decodeURIComponent(liquidStringify(left).replace(/\+/g, " "));
}
