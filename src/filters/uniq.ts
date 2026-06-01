import type { FilterContext } from "../filter";

export function uniq(
  this: FilterContext,
  left: unknown,
  prop?: unknown,
): unknown[] {
  this.assertArgs(arguments.length, 1, 2);
  const _map = new Map<string, unknown>();
  let key: string;

  if (prop === undefined) {
    for (const obj of this.inputArray(left)) {
      key = JSON.stringify(obj);
      if (!_map.has(key)) {
        _map.set(key, obj);
      }
    }
  } else {
    for (const obj of this.inputArray(left)) {
      key = JSON.stringify(this.getItem(obj, prop));
      if (!_map.has(key)) {
        _map.set(key, obj);
      }
    }
  }

  return Array.from(_map.values());
}
