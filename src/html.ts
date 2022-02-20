import he from "he";

/**
 *
 * @param s
 * @returns
 */
export function escape(s: string): string {
  return he.escape(s);
}

/**
 *
 * @param s
 * @returns
 */
export function unescape(s: string): string {
  return he.unescape(s);
}
