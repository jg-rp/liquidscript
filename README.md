# LiquidScript

Liquid templates for JavaScript.

[![npm version](https://img.shields.io/npm/v/liquidscript?style=flat-square)](https://www.npmjs.com/package/liquidscript)
[![tests status](https://img.shields.io/github/actions/workflow/status/jg-rp/liquidscript/tests.yaml?branch=main&label=tests&style=flat-square)](https://github.com/jg-rp/liquidscript/actions/workflows/tests.yaml)

```javascript
import { Template } from "liquidscript";

const template = Template.fromString("Hello, {{ you }}!");

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
- Filter reference: https://jg-rp.github.io/liquidscript/language/filters
- Tag reference: https://jg-rp.github.io/liquidscript/language/tags
- Change log: https://github.com/jg-rp/liquidscript/blob/main/CHANGELOG.md
- NPM: https://www.npmjs.com/package/liquidscript
- Issue tracker: https://github.com/jg-rp/liquidscript/issues

## Dependencies

LiquidScript currently depends on [Decimal.js](https://mikemcl.github.io/decimal.js/) for decimal arithmetic, and [luxon](https://github.com/moment/luxon/) for timezone aware date/times and some limited parsing of date and time strings.

Both of these dependencies are considered an implementation detail and might be replace with lighter-weight alternatives later.

## Supported Browsers and Environments

LiquidScript is written in TypeScript, compiled to JavaScript using [Babel](https://babeljs.io/) and bundled using [Rollup](https://rollupjs.org/guide/en/). The following included bundles target `defaults, not IE 11, maintained node versions, not node 12`. See [Browserslist](https://github.com/browserslist/browserslist#browserslist-).

| Bundle                            | Description                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `liquidscript.cjs.js`             | A CommonJS formatted bundle                                                                        |
| `liquidscript.esm.js`             | An ECMAScript module formatted bundle                                                              |
| `liquidscript.iife.bundle.js`     | A bundle formatted as an Immediately Invoked Function Expression, including dependencies.          |
| `liquidscript.iife.bundle.min.js` | A minified bundle formatted as an Immediately Invoked Function Expression, including dependencies. |
| `liquidscript.iife.js`            | A bundle formatted as an Immediately Invoked Function Expression, excluding dependencies.          |
| `liquidscript.iife.min.js`        | A minified bundle formatted as an Immediately Invoked Function Expression, excluding dependencies. |

## Why?

Some excellent JavaScript implementations of Liquid already exist. To meet some rather specific requirements, LiquidScript has been developed with the following goals.

### Project Goals

- Maintain a very strict policy of compatibility with Ruby Liquid and, by extension, [Python Liquid](https://github.com/jg-rp/liquid). Given an equivalent render context, a template rendered with LiquidScript should produce the same output as when rendered with Ruby Liquid, and vice versa. See [golden-liquid](https://github.com/jg-rp/golden-liquid). Most notably:

  - Floats with a single trailing zero must retain that zero upon output.
  - Built-in math filters must handle integers and floats appropriately. For example, the `divided_by` filter should perform integer division if both arguments are integers, and regular division otherwise.
  - Built-in math filters must do decimal arithmetic. See [Decimal.js dependency](#dependencies).
  - Built-in filters must reject excess or otherwise invalid arguments with an error.

- It should be possible to extend LiquidScript (without forking) to include features commonly found in other template languages. Like template inheritance, expressions that use logical `not` and inline conditional statements, for example.

- Expose a syntax tree for every parsed template, facilitating template static analysis and performance optimizations.

- Offer fine-grained control of template context globals. Pin globals to an environment, template or loader.

- Offer an asynchronous API, including handling of render context promises and asynchronous drops.

- Offer HTML and XML auto-escaping, with facilities to mark text as "safe". See [Auto Escape](https://jg-rp.github.io/liquidscript/introduction/auto-escape).

- Drops (arbitrary objects added to a render context) must not expose their methods unless explicitly whitelisted. See [drop protocol](https://jg-rp.github.io/liquidscript/introduction/objects-and-drops#drop-protocol).

## Benchmark

You can run the benchmark using `yarn benchmark` from the root of the source tree. On my development machine we get the following results.

```plain
templates per iteration: 60
rounds (best of):        3
simulated IO time:       50ms

parse ...
renderSync ...
parse & renderSync ...
render ...
render + parse with IO ...

                 parse:	63.15   i/s - 300  in 4.75s
            renderSync:	213.65  i/s - 1000 in 4.68s
    parse & renderSync:	44.36   i/s - 250  in 5.64s
                render:	109.45  i/s - 500  in 4.57s
render + parse with IO:	14.91   i/s - 50   in 3.35s
```

The benchmark workload has been carefully matched to that of the [reference implementation](https://github.com/Shopify/liquid/tree/master/performance), although it's not clear what, if any, overhead their benchmark includes.

When the same benchmark is run using [LiquidJS](https://github.com/harttle/liquidjs), it shows that, for parsing templates, LiquidJS is faster than LiquidScript, but LiquidScript is faster at rendering templates.

Compared to [Python Liquid](https://github.com/jg-rp/liquid#benchmark), which includes a comparable benchmark, LiquidScript is as much as two or three times faster for synchronous operations. Python Liquid's benchmark does not currently include figures for asynchronously rendering templates.
