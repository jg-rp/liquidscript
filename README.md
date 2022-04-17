# LiquidScript

A JavaScript and TypeScript engine for the Liquid template language.

[![npm version](https://img.shields.io/npm/v/liquidscript?style=flat-square)](https://www.npmjs.com/package/liquidscript)
[![tests status](https://img.shields.io/github/workflow/status/jg-rp/liquidscript/Tests?label=tests&style=flat-square)](https://github.com/jg-rp/liquidscript/actions/workflows/tests.yaml)

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

## Table of Contents

- [Getting Started](#getting-started)
- [Drop Protocol](#drop-protocol)
- [Project Status](#project-status)
- [Dependencies](#dependencies)
- [Why?](#why)
- [Benchmark](#benchmark)

## Getting Started

### Node.js

Install LiquidScript using [Yarn](https://yarnpkg.com/):

```bash
yarn add liquidscript
```

Or [npm](https://docs.npmjs.com/downloading-and-installing-packages-locally):

```bash
npm install --save liquidscript
```

And import as an [ES module](https://nodejs.org/api/esm.html):

```javascript
import * as liquid from "liquidscript";
```

Or a [CommonJS module:](https://nodejs.org/api/modules.html)

```javascript
const liquid = require("liquidscript");
```

### Browser

Download and include LiquidScript in a script tag.

```html
<script src="path/to/liquidscript.iife.bundle.min.js"></script>
```

Or using a [CDN](https://www.jsdelivr.com/package/npm/liquidscript).

```html
<script
  src="https://cdn.jsdelivr.net/npm/liquidscript@0.2.0-alpha.1/dist/liquidscript.iife.bundle.min.js"
  integrity="sha256-TaQsba5z1EkaP45OUgojVA4o1/XtPjPD0oLBLLFHWCU="
  crossorigin="anonymous"
></script>
```

### Render

Render a template string by creating a `Template` and calling its `render()` or `renderSync()` methods.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString("Hello, {{ you }}!");
console.log(template.renderSync({ you: "World" })); // Hello, World!
console.log(template.renderSync({ you: "Liquid" })); // Hello, Liquid!
```

Properties from the object passed to `render()` and `renderSync()` are available for templates to use in Liquid expressions.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString(`
{% for person in people %}
  Hello, {{ person.name }}!
{% endfor %}
`);

const data = {
  people: [{ name: "John" }, { name: "Sally" }],
};

console.log(template.renderSync(data));
// Hello, John
// Hello, Sally
```

### Configure

You can pass configuration options as the second argument to `Template.fromString()`. This example enables automatic HTML escaping and will throw an error at render time if a template attempts to use an undefined variable.

```javascript
import { Template, StrictUndefined } from "liquidscript";

const template = Template.fromString("Hello, {{ you }}!", {
  autoEscape: true,
  undefinedFactory: StrictUndefined.from,
});
```

While `Template.fromString()` can be convenient, most applications will want to configure a single `Environment`, then load and render templates from it. This is usually more efficient than using `Template` directly.

```javascript
import {
  Environment,
  NodeFileSystemLoader,
  StrictUndefined,
} from "liquidscript";

const env = new Environment({
  autoEscape: true,
  loader: new NodeFileSystemLoader("./templates/"),
  undefinedFactory: StrictUndefined.from,
});

const template = env.fromString("Hello, {{ you }}!");
```

Notice that `Environment` accepts a `loader` option, whereas `Template.fromString()` does not.

## Drop Protocol

In LiquidScript, a "drop" is an object that implements some or all of the "drop protocol". When included in a Liquid render context, a drop can, for example, behave like a Liquid primitive, dynamically produce properties via a dispatching method or expose its methods as if they were simple properties.

The drop protocol is nothing more than a set of conventions using well defined [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Those symbols are:

| Property               | Description                                                                                                                                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[toLiquid]`           | A function valued property that is called to convert an object to its corresponding Liquid value. `[toLiquid]` is passed the active render context as its only argument.                                                                                                                      |
| `[toLiquidSync]`       | A synchronous version of `[toLiquid]`                                                                                                                                                                                                                                                         |
| `[toLiquidPrimitive]`  | A function valued property that is called to convert an object to its corresponding Liquid primitive value. The return value of this function will be used in Liquid comparison expressions.                                                                                                  |
| `[toLiquidString]`     | A function valued property that is called to convert an object to its Liquid specific string representation. This function will take priority over `toString()` when an object is output or passed to a string filter.                                                                        |
| `[toLiquidHtml]`       | A function valued property that is called to convert an object to an HTML-safe string representation. When HTML auto-escaping is enabled, the return value of this function will take priority over `[toLiquidString]` and `toString()`, and it will not be escaped.                          |
| `[isLiquidCallable]`   | A function valued property that is called to test a method name against a set of whitelisted methods that Liquid can call. A method name is passed as the only argument, and a boolean return value is expected. Liquid callable methods are not passed any arguments.                        |
| `[liquidDispatch]`     | A function valued property that is called in the event that a property is missing from an object. The name of the missing property is passed as the only argument. This function is expected to return a Promise and should throw an `InternalKeyError` if the named property is unavailable. |
| `[liquidDispatchSync]` | A synchronous version of `[liquidDispatch]`.                                                                                                                                                                                                                                                  |

This example demonstrates how one might use `[toLiquid]` to implement a lazy loading user object.

```typescript
import { Template, Liquidable, toLiquid } from "liquidscript";

type User = { firstName: string; lastName: string };

class LazyUserDrop implements Liquidable {
  private obj?: User;
  constructor(private userId: string) {}

  async queryDatabase(): Promise<User> {
    // Do database IO here.
    return { firstName: "John", lastName: "Smith" };
  }

  async [toLiquid](): Promise<User> {
    if (this.obj === undefined) this.obj = await this.queryDatabase();
    return this.obj;
  }
}
```

## Project Status

LiquidScript is currently available as a beta release. This means that:

- The API is stable.
- Documentation is mostly complete, although there is room for improvement.
- Test coverage is currently above 80%, although in-browser testing has been limited to recent versions of Chrome and Firefox thus far.

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
  -

- It should be possible to extend LiquidScript (without forking) to include features commonly found in other template languages. Like template inheritance, expressions that use logical `not` and inline conditional statements, for example.

- Construct and expose a syntax tree for every parsed template, facilitating template static analysis and performance optimizations.

- Offer fine-grained control of template context globals. Pin globals to an environment, template or loader.

- Offer an asynchronous API, including handling of render context promises and asynchronous drops.

- Offer HTML and XML auto-escaping, with facilities to mark text as "safe". See [Auto Escape](#auto-escape).

- Drops (arbitrary objects added to a render context) must not expose their methods unless explicitly whitelisted. See [drop protocol](#drop-protocol).

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
