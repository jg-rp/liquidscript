# LiquidScript Change Log

## Version 0.5.0-alpha.2

- Don't remove browser specific loaders in Node builds.

## Version 0.5.0-alpha.1

- New `RenderContext.extend()` and `RenderContext.extendSync()` helpers for extending the current scope for the duration of a callback function.
- New `Environment.addTag()` method for adding custom tags to an environment.
- New `makeTokenizer()` functions for reusing built-in expression tokenizers.
- New extra `with` tag. Extra tags are not not part of "standard" Liquid and are not registered automatically.

## Version 0.4.0-alpha.1

- Parse unix timestamps with the `date` filter.
- Renamed `expression.Filter` to `ExpressionFilter`. This avoids conflicts with The filter implementation type.

## Version 0.3.0-alpha.1

- Fixed line numbers in error messages involving tag expressions containing newlines.
- Improved `LiquidSyntaxError` messages.
  - Error messages now include any offending operators rather than the name of the token that represents the operator.
  - The template name and line number of the error is included. Previously this only happened for render-time errors.
- More efficient parsing of `liquid` tag expressions. The `TemplateParser` class now includes a `parseLiquid()` method that is similar to `parseBlock()`, but does not needlessly check an empty set for the name of an end tag.
- Added `toLiquidSync` to the drop protocol.

## Version 0.2.0-alpha.1

- New `FetchLoader`. A template loader for web browsers that uses the Fetch API to get templates.
- New `XMLHttpRequestLoader`. A template loader for web browsers that uses `XMLHttpRequest` to get templates.
- Move `src/builtin/loaders/choice.ts` to `src/builtin/loaders/choice_loader.ts`
- Move `src/builtin/loaders/file_system.ts` to `src/builtin/loaders/file_system_loader.ts`
- Change browser tests to use Mocha's "tdd" interface.
