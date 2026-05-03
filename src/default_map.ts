export class DefaultMap<K, V> extends Map<K, V> {
  constructor(
    readonly defaultFactory: () => V,
    entries?: Iterable<[K, V]>,
  ) {
    super(entries);
  }

  override get(key: K): V {
    if (!this.has(key)) {
      const obj = this.defaultFactory();
      this.set(key, obj);
      return obj;
    }

    return super.get(key) as V;
  }
}
