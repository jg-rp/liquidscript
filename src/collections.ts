type DefaultFactory<V> = () => V;

/**
 *
 */
export class DefaultMap<K, V> extends Map<K, V> {
  readonly default: DefaultFactory<V>;

  constructor(
    defaultFactory: V | DefaultFactory<V>,
    entries?: Iterable<[K, V]>
  ) {
    if (entries !== undefined) {
      super(entries);
    } else {
      super();
    }

    this.default =
      typeof defaultFactory === "function"
        ? (defaultFactory as DefaultFactory<V>)
        : () => defaultFactory;
  }

  get(key: K): V {
    return this.has(key) ? <V>super.get(key) : this.default();
  }
}
