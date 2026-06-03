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

## Contributing

Please see [Contributing to LiquidScript](https://github.com/jg-rp/liquidscript/blob/main/CONTRIBUTING.md)

## License

LiquidScript is distributed under the terms of the [MIT](https://spdx.org/licenses/MIT.html) license.

LiquidSCript is an implementation of [Shopify/liquid](https://github.com/Shopify/liquid). During development we reference Shopify/liquid and make use of [Shopify/liquid-spec](https://github.com/Shopify/liquid-spec). See [LICENSE.liquid](https://github.com/jg-rp/liquidscript/blob/main/LICENSE.liquid) and [LICENSE.liquid-spec](https://github.com/jg-rp/liquidscript/blob/main/LICENSE.liquid-spec), both MIT licensed.
