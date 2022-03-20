import {
  LiquidHTMLable,
  LiquidStringable,
  toLiquidHtml,
  toLiquidString,
} from "../../drop";
import { escape } from "../../html";
import { liquidStringify } from "../../types";

/**
 * A string wrapper that is safe to output as HTML, either because it
 * has already been escaped or is considered safe without escaping.
 */
export class Markup implements LiquidHTMLable, LiquidStringable {
  #s: string;

  /**
   * `Markup` constructor.
   * @param s - Escaped or safe markup text.
   */
  constructor(s: string) {
    this.#s = s;
  }

  /**
   * A `Markup` factory function.
   *
   * @param s - Escaped or safe markup text.
   * @returns The input string inside a `Markup` wrapper.
   */
  static from(s: string | Markup): Markup {
    return s instanceof Markup ? s : new Markup(s);
  }

  /**
   * A `Markup` factory function that will escape the input value if it is
   * not already `Markup`.
   *
   * @param value - Any value. If it's already `Markup`, it will be returned
   * unchanged. Otherwise it will be converted to a string and escaped.
   * @returns A string representation of the input value after HTML-escaping.
   */
  static escape(value: unknown): Markup {
    if (value instanceof Markup) return value;
    return new Markup(escape(liquidStringify(value)));
  }

  get [Symbol.toStringTag]() {
    return "Markup";
  }

  public [Symbol.toPrimitive](hint: string): string | null {
    return hint === "number" ? null : this.#s;
  }

  public [toLiquidHtml](): string {
    return this.#s;
  }

  public [toLiquidString](): string {
    return this.#s;
  }

  public toString(): string {
    return `Markup(${this.#s})`;
  }
}
