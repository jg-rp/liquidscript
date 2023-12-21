import { FilterArgumentError } from "../../errors";
import { checkArguments, FilterContext } from "../../filter";
import { isUndefined, liquidStringify } from "../../types";
import { escape as escapeHTML, unescape } from "../../html";
import { Markup } from "../drops/markup";
import { toLiquidString } from "../../drop";

/**
 * Return the input value concatenated with the argument value.
 *
 * If either the input value or argument are not a string, they will be
 * coerced to a string before concatenation.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param other - Any value. Will be coerced to a string if it's not one already.
 * @returns The input value concatenated with the argument value.
 */
export function append(
  this: FilterContext,
  left: unknown,
  other: unknown,
): string | Markup {
  checkArguments(arguments.length, 1, 1);

  if (left instanceof Markup)
    return new Markup(
      left[toLiquidString]() + Markup.escape(other)[toLiquidString](),
    );

  if (other instanceof Markup) {
    return new Markup(
      Markup.escape(left)[toLiquidString]() + other[toLiquidString](),
    );
  }

  return liquidStringify(left) + liquidStringify(other);
}

/**
 * Return the input string with the first character in upper case and the rest
 * lowercase.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with the first character in upper case and the rest
 * lowercase.
 */
export function capitalize(
  this: FilterContext,
  left: unknown,
): string | Markup {
  checkArguments(arguments.length, 0);
  if (left instanceof Markup) {
    const s = left[toLiquidString]();
    return new Markup(
      s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase(),
    );
  }
  const s = liquidStringify(left);
  return s.charAt(0).toLocaleUpperCase() + s.slice(1).toLocaleLowerCase();
}

/**
 * Return the input string with all characters in lowercase.
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with all characters in lowercase.
 */
export function downcase(this: FilterContext, left: unknown): string | Markup {
  checkArguments(arguments.length, 0);
  if (left instanceof Markup)
    return new Markup(left[toLiquidString]().toLocaleLowerCase());
  return liquidStringify(left).toLocaleLowerCase();
}

/**
 * Return the input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced with
 * HTML escape codes.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced
 * with HTML escape codes.
 */
export function escape(this: FilterContext, left: unknown): string | Markup {
  checkArguments(arguments.length, 0);
  if (this.context.environment.autoEscape)
    return Markup.escape(liquidStringify(left));
  return escapeHTML(liquidStringify(left));
}

/**
 * Return the input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced with
 * HTML escape codes while preserving existing escape sequences.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with `&`, `<`, `>`, `"`, `'`, and "\`" replaced
 * with HTML escape codes while preserving existing escape sequences.
 */
export function escapeOnce(
  this: FilterContext,
  left: unknown,
): string | Markup {
  checkArguments(arguments.length, 0);
  if (this.context.environment.autoEscape)
    return Markup.escape(unescape(liquidStringify(left)));
  return escapeHTML(unescape(liquidStringify(left)));
}

/**
 * Return the input string with all leading whitespace removed. If the input is
 * not a string, it will be converted to a string before stripping whitespace.

 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with all leading whitespace removed
 */
export function lstrip(this: FilterContext, left: unknown): string | Markup {
  checkArguments(arguments.length, 0);
  if (left instanceof Markup)
    return new Markup(left[toLiquidString]().trimStart());
  return liquidStringify(left).trimStart();
}

/**
 * Return the input string with `\n` and `\r\n` replaced with `<br />\n`.
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with `\n` and `\r\n` replaced with `<br />\n`.
 */
export function newlineToBr(
  this: FilterContext,
  left: unknown,
): string | Markup {
  checkArguments(arguments.length, 0);
  if (this.context.environment.autoEscape)
    return new Markup(
      Markup.escape(left)[toLiquidString]().replace(/\r?\n/g, "<br />\n"),
    );
  return liquidStringify(left).replace(/\r?\n/g, "<br />\n");
}

/**
 * Return the argument value concatenated with the input value.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param other - Any value. Will be coerced to a string if it's not one already.
 * @returns The argument value concatenated with the input value.
 */
export function prepend(
  this: FilterContext,
  left: unknown,
  other: unknown,
): string | Markup {
  checkArguments(arguments.length, 1, 1);

  if (left instanceof Markup)
    return new Markup(
      Markup.escape(other)[toLiquidString]() + left[toLiquidString](),
    );

  if (other instanceof Markup) {
    return new Markup(
      other[toLiquidString]() + Markup.escape(left)[toLiquidString](),
    );
  }

  return liquidStringify(other) + liquidStringify(left);
}

/**
 * Return the input value with all occurrences of the argument substring
 * removed.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param subString - Any value. Will be coerced to a string if it's not one
 * already.
 * @returns The input value with all occurrences of the argument substring
 * removed.
 */
export function remove(
  this: FilterContext,
  left: unknown,
  subString: unknown,
): string | Markup {
  checkArguments(arguments.length, 1, 1);

  if (left instanceof Markup)
    return new Markup(
      left[toLiquidString]().replace(
        new RegExp(Markup.escape(subString)[toLiquidString](), "g"),
        "",
      ),
    );

  return liquidStringify(left).replace(
    new RegExp(liquidStringify(subString), "g"),
    "",
  );
}

/**
 * Return the input value with the first occurrence of the argument string
 * removed.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param subString - Any value. Will be coerced to a string if it's not one
 * already.
 * @returns The input value with the first occurrence of the argument string
 * removed.
 */
export function removeFirst(
  this: FilterContext,
  left: unknown,
  subString: unknown,
): string | Markup {
  checkArguments(arguments.length, 1, 1);

  if (left instanceof Markup)
    return new Markup(
      left[toLiquidString]().replace(
        Markup.escape(subString)[toLiquidString](),
        "",
      ),
    );

  return liquidStringify(left).replace(liquidStringify(subString), "");
}

/**
 * Return the input value with the last occurrence of the argument string
 * removed.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param arg - Any value. Will be coerced to a string if it's not one already.
 * @returns The input value with the last occurrence of the argument string
 * removed.
 */
export function removeLast(
  this: FilterContext,
  left: unknown,
  arg: unknown,
): string | Markup {
  checkArguments(arguments.length, 1, 1);

  if (left instanceof Markup) {
    const _left = left[toLiquidString]();
    const _arg = Markup.escape(arg)[toLiquidString]();
    const startIndex = _left.lastIndexOf(_arg);
    // substring not found
    if (startIndex === -1) return left;
    return new Markup(
      _left.substring(0, startIndex) +
        _left.substring(startIndex + _arg.length + 1),
    );
  }

  const _left = liquidStringify(left);
  const _arg = liquidStringify(arg);
  const startIndex = _left.lastIndexOf(_arg);
  // substring not found
  if (startIndex === -1) return _left;
  return (
    _left.substring(0, startIndex) +
    _left.substring(startIndex + _arg.length + 1)
  );
}

/**
 * Return the input string with all occurrences of the first argument replaced
 * with the second argument.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param subString - Any value. Will be coerced to a string if it's not one
 * already.
 * @param newSubString - Any value. Will be coerced to a string if it's not one
 * already.
 * @returns The input string with all occurrences of the first argument
 * replaced with the second argument.
 */
export function replace(
  this: FilterContext,
  left: unknown,
  subString: unknown,
  newSubString?: unknown,
): string | Markup {
  checkArguments(arguments.length, 2, 1);
  if (left instanceof Markup)
    return new Markup(
      left[toLiquidString]().replace(
        new RegExp(Markup.escape(subString)[toLiquidString](), "g"),
        Markup.escape(newSubString)[toLiquidString](),
      ),
    );
  return liquidStringify(left).replace(
    new RegExp(liquidStringify(subString), "g"),
    liquidStringify(newSubString),
  );
}

/**
 * Return the input string with the first occurrence of the first argument
 * replaced with the second argument.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param subString - Any value. Will be coerced to a string if it's not one
 * already.
 * @param newSubString - Any value. Will be coerced to a string if it's not one
 * already.
 * @returns The input string with the first occurrence of the first argument
 * replaced with the second argument.
 */
export function replaceFirst(
  this: FilterContext,
  left: unknown,
  subString: unknown,
  newSubString?: unknown,
): string | Markup {
  checkArguments(arguments.length, 2, 1);
  if (left instanceof Markup)
    return new Markup(
      left[toLiquidString]().replace(
        Markup.escape(subString)[toLiquidString](),
        Markup.escape(newSubString)[toLiquidString](),
      ),
    );
  return liquidStringify(left).replace(
    liquidStringify(subString),
    liquidStringify(newSubString),
  );
}

/**
 * Return the input string with the last occurrence of the first argument
 * replaced with the second argument.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param subString - Any value. Will be coerced to a string if it's not one
 * already.
 * @param newSubString - Any value. Will be coerced to a string if it's not one
 * already.
 * @returns The input string with the last occurrence of the first argument
 * replaced with the second argument.
 */
export function replaceLast(
  this: FilterContext,
  left: unknown,
  subString: unknown,
  newSubString: unknown,
): string | Markup {
  checkArguments(arguments.length, 2, 2);

  if (left instanceof Markup) {
    const _left = left[toLiquidString]();
    const _sub = Markup.escape(subString)[toLiquidString]();
    const startIndex = _left.lastIndexOf(_sub);

    // substring not found
    if (startIndex === -1) return left;

    const _newSub = Markup.escape(newSubString);
    return new Markup(
      _left.substring(0, startIndex) +
        _newSub +
        _left.substring(startIndex + _sub.length),
    );
  }

  const _left = liquidStringify(left);
  const _sub = liquidStringify(subString);
  const startIndex = _left.lastIndexOf(_sub);

  // substring not found
  if (startIndex === -1) return _left;

  const _newSub = liquidStringify(newSubString);
  return (
    _left.substring(0, startIndex) +
    _newSub +
    _left.substring(startIndex + _sub.length)
  );
}

/**
 * Return the input string with all characters in uppercase.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with all characters in uppercase.
 */
export function upcase(this: FilterContext, left: unknown): string | Markup {
  checkArguments(arguments.length, 0);
  if (left instanceof Markup)
    return new Markup(left[toLiquidString]().toLocaleUpperCase());
  return liquidStringify(left).toLocaleUpperCase();
}

/**
 * Return an array of strings that are the input string split on the filter's
 * argument string.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param subString - Any value. Will be coerced to a string if it's not one
 * already.
 * @returns An array of strings that are the input string split on the filter's
 * argument string.
 */
export function split(
  this: FilterContext,
  left: unknown,
  subString: unknown,
): string[] | Markup[] {
  checkArguments(arguments.length, 1, 1);
  const val = liquidStringify(left);
  const sep = liquidStringify(subString);
  if (!val || val === sep) return [];
  return val.split(sep);
}

/**
 * Return the input string with all leading and trailing whitespace removed.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with all leading and trailing whitespace removed.
 */
export function strip(this: FilterContext, left: unknown): string | Markup {
  checkArguments(arguments.length, 0);
  if (left instanceof Markup) return new Markup(left[toLiquidString]().trim());
  return liquidStringify(left).trim();
}

/**
 * Return the input string with all trailing whitespace removed.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with all trailing whitespace removed.
 */
export function rstrip(this: FilterContext, left: unknown): string | Markup {
  checkArguments(arguments.length, 0);
  if (left instanceof Markup)
    return new Markup(left[toLiquidString]().trimEnd());
  return liquidStringify(left).trimEnd();
}

// We're aiming for consistency with the reference implementation here,
// rather than correctness.
const STRIP_HTML_BLOCKS = new RegExp(
  "<script.*?</script>|<!--.*?-->|<style.*?</style>",
  "gs",
);

const STRIP_HTML_TAGS = new RegExp("<.*?>", "gs");

/**
 * Return the input string with all HTML tags removed.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with all HTML tags removed.
 */
export function stripHtml(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return liquidStringify(left)
    .replace(STRIP_HTML_BLOCKS, "")
    .replace(STRIP_HTML_TAGS, "");
}

/**
 * Return the input string with `\n` and `\r\n` removed.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with `\n` and `\r\n` removed.
 */
export function stripNewlines(
  this: FilterContext,
  left: unknown,
): string | Markup {
  checkArguments(arguments.length, 0);
  if (left instanceof Markup)
    return new Markup(left[toLiquidString]().replace(/\r?\n/g, ""));
  return liquidStringify(left).replace(/\r?\n/g, "");
}

/**
 * Return a truncated version of the input string. The first argument, length,
 * defaults to `50`. The second argument defaults to an ellipsis (`...`).
 *
 * If the length of the input string is less than the given length (first
 * argument), the input string will be truncated to `length` minus the length
 * of the second argument, with the second argument appended.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param length - Any value. If it can't be converted to a number, zero will
 * be used instead. Defaults to `50`.
 * @param end - Any value. Will be coerced to a string if it's not one already.
 * Defaults to `...`.
 * @returns A truncated version of the input string.
 */
export function truncate(
  this: FilterContext,
  left: unknown,
  length: unknown = 50,
  end: unknown = "...",
): string {
  checkArguments(arguments.length, 2);
  const _left = liquidStringify(left);
  const _length = Number(length);
  if (isUndefined(length) || !Number.isInteger(_length))
    throw new FilterArgumentError(
      `expected an integer length, found ${length}`,
    );

  if (_left.length <= _length) return _left;

  const _end = liquidStringify(end);
  const stop = _length - _end.length < 0 ? 0 : _length - _end.length;
  return `${_left.slice(0, stop)}${_end}`;
}

const MAX_TRUNC_WORDS = 2147483647;

/**
 * Return the input string truncated to the specified number of words, with
 * the second argument appended. The number of words (first argument) defaults
 * to `15`. The second argument defaults to an ellipsis (`...`).
 *
 * If the input string already has fewer than the given number of words, it is
 * returned unchanged.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @param wordCount - Any value. If it can't be converted to a number, zero
 * will be used instead. Defaults to `15`.
 * @param end - Any value. Will be coerced to a string if it's not one already.
 * Defaults to `...`.
 * @returns The input string truncated to the specified number of words.
 */
export function truncateWords(
  this: FilterContext,
  left: unknown,
  wordCount: unknown = 15,
  end: unknown = "...",
): string {
  checkArguments(arguments.length, 2);
  const _left = liquidStringify(left);
  let _wordCount = Number(wordCount);
  if (isUndefined(wordCount) || !Number.isInteger(_wordCount))
    throw new FilterArgumentError(
      `expected an integer length, found ${wordCount}`,
    );

  if (_wordCount <= 0) _wordCount = 1;
  if (_wordCount >= MAX_TRUNC_WORDS) return _left;

  const _end = liquidStringify(end);
  const words = _left.trim().split(/\s+/g);

  if (words.length <= _wordCount) return _left;
  return words.slice(0, _wordCount).join(" ") + _end;
}

function fixedEncodeURIComponent(s: string): string {
  return encodeURIComponent(s).replace(/[!'()*]/g, function (c) {
    return `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
  });
}

/**
 * Return the input string with URL reserved characters percent-escaped. Also
 * replaces `' '` with `'+'`.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with URL reserved characters percent-escaped.
 */
export function urlEncode(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return fixedEncodeURIComponent(liquidStringify(left)).replace(/%20/g, "+");
}

/**
 * Return the input string with `%xx` escapes replaced with their single-
 * character equivalents. Also replaces `'+'` with `' '`.
 *
 * @param this - An object containing a reference to the active render context
 * and any keyword/named arguments.
 * @param left - Any value. Will be coerced to a string if it's not one already.
 * @returns The input string with `%xx` escapes replaced with their single-
 * character equivalents.
 */
export function urlDecode(this: FilterContext, left: unknown): string {
  checkArguments(arguments.length, 0);
  return decodeURIComponent(liquidStringify(left).replace(/\+/g, " "));
}
