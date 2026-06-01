# LiquidScript

Liquid templates for JavaScript.

[![npm version](https://img.shields.io/npm/v/liquidscript?style=flat-square)](https://www.npmjs.com/package/liquidscript)
[![tests status](https://img.shields.io/github/actions/workflow/status/jg-rp/liquidscript/tests.yaml?branch=main&label=tests&style=flat-square)](https://github.com/jg-rp/liquidscript/actions/workflows/tests.yaml)

```javascript
import { parse } from "liquidscript";

const template = parse("Hello, {{ you }}!");

// Sync
console.log(template.renderSync({ you: "World" })); // Hello, World!
console.log(template.renderSync({ you: "Liquid" })); // Hello, Liquid!

// Async
template.render({ you: "World" }).then(console.log); // Hello, World!
template.render({ you: "Liquid" }).then(console.log); // Hello, Liquid!

// Or, using await
(async () => {
  console.log(await template.render({ you: "World" })); // Hello, World!
  console.log(await template.render({ you: "Liquid" })); // Hello, Liquid!
})();
```

## Links

- Documentation: https://jg-rp.github.io/liquidscript/
- API documentation: https://jg-rp.github.io/liquidscript/api
- Filter reference: https://jg-rp.github.io/liquidscript/reference/filters
- Tag reference: https://jg-rp.github.io/liquidscript/reference/tags
- Change log: https://github.com/jg-rp/liquidscript/blob/main/CHANGELOG.md
- NPM: https://www.npmjs.com/package/liquidscript
- Issue tracker: https://github.com/jg-rp/liquidscript/issues

## Benchmark

### Node

```bash
james@Jamess-Mac-mini liquidscript % node performance/bench_golden.mjs
Golden benchmark 002
┌─────────┬──────────────────────────┬────────────────────────┬─────────┐
│ (index) │ Task name                │ Throughput avg (ops/s) │ Samples │
├─────────┼──────────────────────────┼────────────────────────┼─────────┤
│ 0       │ 'parse'                  │ '25752 ± 0.03%'        │ 127797  │
│ 1       │ 'render'                 │ '60106 ± 0.01%'        │ 299022  │
│ 2       │ 'parse and render'       │ '16810 ± 0.03%'        │ 83737   │
│ 3       │ 'render async'           │ '22482 ± 0.03%'        │ 111569  │
│ 4       │ 'parse and render async' │ '11279 ± 0.04%'        │ 56117   │
└─────────┴──────────────────────────┴────────────────────────┴─────────┘
```

### Bun

```bash
james@Jamess-Mac-mini liquidscript % bun run performance/bench_golden.mjs
Golden benchmark 002
┌───┬────────────────────────┬────────────────────────┬─────────┐
│   │ Task name              │ Throughput avg (ops/s) │ Samples │
├───┼────────────────────────┼────────────────────────┼─────────┤
│ 0 │ parse                  │ 21124 ± 0.04%          │ 102847  │
│ 1 │ render                 │ 32355 ± 0.02%          │ 159549  │
│ 2 │ parse and render       │ 11835 ± 0.06%          │ 57959   │
│ 3 │ render async           │ 16012 ± 0.05%          │ 78041   │
│ 4 │ parse and render async │ 8423 ± 0.08%           │ 41069   │
└───┴────────────────────────┴────────────────────────┴─────────┘
```

## Contributing

TODO:

## License

TODO:
