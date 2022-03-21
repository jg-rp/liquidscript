# LiquidScript

A JavaScript and TypeScript engine for the Liquid template language.

## Why?

At the the time of writing, excellent JavaScript implementations of Liquid already exist. To meet some rather specific requirements, LiquidScript has been developed with the following goals.

### Project Goals

- Maintain a very strict policy of compatibility with Ruby Liquid (and, by extension, Python Liquid). Given an equivalent render context, a template rendered with LiquidScript should produce the same output as when rendered with Ruby Liquid, and vice versa. See [golden-liquid](https://github.com/jg-rp/golden-liquid). Most notably:

  - Built-in math filters must do decimal arithmetic. See [Decimal.js dependency](#Decimal.js).
  - Built-in filters must reject excess or otherwise invalid arguments with an error.
  -

- Construct and expose a syntax tree for every parsed template, facilitating template static analysis and performance optimizations.

- Expose an asynchronous API, including handling of render context promises and asynchronous drops.

- Offer HTML and XML auto-escaping, with facilities to mark text as "safe". See [Auto Escape](#auto-escape).

- Drops (arbitrary objects added to a render context) must not expose properties or methods unless explicitly whitelisted. See [drop protocol](#drop-protocol).
