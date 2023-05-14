// Adapted from https://github.com/mathiasbynens/he/blob/master/src/he.js
// Licence https://github.com/mathiasbynens/he/blob/master/LICENSE-MIT.txt

const reEscape = /["&'<>`]/g;

// This map has been updated to mimic the reference implementation's mapping
// of characters to escape codes.
const escapeMap: { [index: string]: string } = {
  '"': "&#34;",
  "&": "&amp;",
  "'": "&#39;",
  "<": "&lt;",
  // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
  // following is not strictly necessary unless it’s part of a tag or an
  // unquoted attribute value. We’re only escaping it to support those
  // situations, and for XML support.
  ">": "&gt;",
  // In Internet Explorer ≤ 8, the backtick character can be used
  // to break out of (un)quoted attribute values or HTML comments.
  // See http://html5sec.org/#102, http://html5sec.org/#108, and
  // http://html5sec.org/#133.
  "`": "&#96;",
};

const reUnescape = /&(#34|amp|#39|lt|gt|#96);/gi;
const unescapeMap: { [index: string]: string } = {
  "&#34;": '"',
  "&amp;": "&",
  "&#39;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&#96;": "`",
};

/**
 *
 * @param s -
 * @returns
 */
export function escape(s: string): string {
  return s.replace(reEscape, (c) => escapeMap[c]);
}

/**
 *
 * @param s -
 * @returns
 */
export function unescape(s: string): string {
  return s.replace(reUnescape, (m) => unescapeMap[m]);
}
