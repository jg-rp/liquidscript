import { Undefined } from "../drops/undefined";
import { ArgumentError, TemplateTypeError } from "../errors";
import { assertArgs, inputArray, type FilterContext } from "../filter";
import { Nothing } from "../runtime";
import { isComparable, isObject } from "../type_guards";

export function sort(
  this: FilterContext,
  left: unknown,
  key?: unknown,
): unknown[] {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;

  // TODO: move these and use apply(this) or call(this)?
  function compare(a: unknown, b: unknown): -1 | 0 | 1 {
    if (a === undefined && b === undefined) return 0;
    if (a === undefined && b !== undefined) return 1;
    if (a !== undefined && b === undefined) return -1;

    if (typeof a !== typeof b)
      throw new TemplateTypeError(
        `comparison with ${typeof a} and ${typeof b} failed`,
        self.span,
        self.context.template.source,
      );

    if (isComparable(a) && isComparable(b)) return a < b ? -1 : a > b ? 1 : 0;

    throw new TemplateTypeError(
      `comparison with ${typeof a} and ${typeof b} failed`,
      self.span,
      self.context.template.source,
    );
  }

  function getItem(obj: unknown, key: unknown): unknown {
    if (!isObject(obj))
      throw new ArgumentError(
        `can't read property ${obj}[${key}]`,
        self.span,
        self.context.template.source,
      );

    if (obj instanceof Map) {
      return obj.get(key);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [val, _] = self.context.resolvePathSync(obj, [key]);
    if (val === Nothing) {
      return undefined;
    }

    return val;
  }

  assertArgs(this, arguments.length, 1, 2);

  if (key === undefined || key instanceof Undefined) {
    return Array.from(inputArray(left)).sort(compare);
  }

  return Array.from(inputArray(left)).sort((a, b) =>
    compare(getItem(a, key), getItem(b, key)),
  );
}
