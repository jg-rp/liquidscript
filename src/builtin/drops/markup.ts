import {
  LiquidHTMLable,
  LiquidStringable,
  toLiquidHtml,
  toLiquidString,
} from "../../drop";
import { escape } from "../../html";
import { liquidStringify } from "../../types";

// TODO: comment

export class Markup implements LiquidHTMLable, LiquidStringable {
  #s: string;

  constructor(s: string) {
    this.#s = s;
  }

  static from(s: string | Markup): Markup {
    return s instanceof Markup ? s : new Markup(s);
  }

  static escape(value: unknown): Markup {
    if (value instanceof Markup) return value;
    return new Markup(escape(liquidStringify(value)));
  }

  get [Symbol.toStringTag]() {
    return "Markup";
  }

  [Symbol.toPrimitive](hint: string): string | null {
    if (hint === "number") {
      return null;
    }
    return this.#s;
  }

  [toLiquidHtml](): string {
    return this.#s;
  }

  [toLiquidString](): string {
    return this.#s;
  }

  toString(): string {
    return `Markup(${this.#s})`;
  }
}
