# LiquidScript Change Log

## Version 1.5.1

**Fixes**

- Fixed static template analysis fails with `{% break %}` and `{% continue %}`.

## Version 1.5.0

**Fixes**

- Fixed `case`/`when` tag expression parsing. `when` expressions no longer fail when presented with a string containing a comma. Handling of comma and `or` separated "sub-expressions" is now consistent with the reference implementation.

**Compatibility**

- `for` tag arguments can now be separated by commas as well as whitespace. See [Shopify/liquid#1658](https://github.com/Shopify/liquid/pull/1658).

## Version 1.4.2

**Fixes**

- The `truncatewords` filter now trims leading and trailing whitespace from its output.
- The built-in `for` and `tablerow` tags now accept string arguments as well as integer literals and variables that resolve to integers.

## Version 1.4.1

**Fixes**

- The `tablerowloop` drop now exposes its `row` property, being the current row in the table.
- The `truncatewords` filter no longer throws a `FilterArgumentError` if its word count argument is greater than `2147483647`. If the word count argument is greater than `2147483647`, the input string is returned.
- The `slice` filter now clamps its arguments to between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`. A smaller range than the reference implementation, but close enough while avoiding `BigInt` and custom slicing.

## Version 1.4.0

**Features**

- Resource limits. Optionally set limits on memory usage per template render to mitigate the impact of malicious templates. ([docs](https://jg-rp.github.io/liquidscript/guides/resource-limits))

## Version 1.3.1

**Fixes**

- Fixed a range expression bug where the length of a range would be incorrectly calculated if both start and stop values were the same.

## Version 1.3.0

**Breaking Changes**

- Objects returned from `ast.Node.children` must now include a `token` property, being the token representing the start of the AST node.

**Features**

- Template static analysis. Report template variable usage using `Template.analyze()` and `Template.analyzeSync()`. ([docs](https://jg-rp.github.io/liquidscript/guides/static-analysis))

## Version 1.2.0-beta.1

**Features**

- New general purpose argument list parser. Parse Liquid expressions containing any number of named or keyword arguments, with a choice of key/value separator. See `src/expressions/arguments/parse.ts`.
- New inline comment tag `{% # .. %}`. See [Shopify Liquid PR #1498](https://github.com/Shopify/liquid/pull/1498).

**Fixes**

- Fixed a bug with the `assign` tag where it would incorrectly throw a `LiquidSyntaxError` when parts of its expression were split over multiple lines.
- Fixed a bug with the `where` filter. It is now consistent with the reference implementation when given `nil` or `Undefined` as its second argument.
- Fixed a bug with the `sort` filter. It now raises a `LiquidTypeError` at render time if the items to be sorted are incompatible. The reference implementation raises an equivalent `Liquid::ArgumentError` in this situation.

**Docs**

- New example Jekyll-style `include` tag.

## Version 1.1.0-beta.1

- New "if not" tag. A drop-in replacement for the standard `if` tag that supports logical `not` and grouping with parentheses.
- Moved some module-level constants to static class variables for easier subclassing of tags.
- Allow `ObjectChain` to contain `push`, `pop` and `size` properties. This is **potentially a breaking change** for early adopters writing custom tags using `context.scope.push` and `context.scope.pop`. The symbols `chainPush` and `chainPop` would be needed instead.
- Enforce `maxContextDepth` when extending a render context scope as well as copying a `RenderContext`.
- New `FalsyStrictUndefined` type. `FalsyStrictUndefined` is similar to `StrictUndefined`, but can be tested for truthiness and compared to other values in an `if`/`unless` expression without throwing an error.

## Version 1.0.0-beta.1

- **Breaking Change**: Both `Environment.fromString()` and `Template.fromString()` have been changed to accept a template source string (as before), render context globals as the second argument, and a `TemplateContext` object as an optional third argument.
- **Breaking Change**: The `children` method of the `Node` interface is now optional. If implemented it should return an array of `ChildNode`s, whereas before it would have been an array of `Nodes`.
- **Breaking Change**: `TemplateParser.parseBlock()` now accepts an optional `token` argument. If given, this token will be assigned to the resulting block. The current token in the stream will be used otherwise. All built-in block tags now pass their initial tag to `parseBlock()` instead of the tag for the first node in the block.

## Version 0.5.3-alpha.1

- Fixed a bug where the `loaderContext` object passed to `RenderContext.getTemplate` and `RenderContext.getTemplateSync` would not get passed on to template loaders.
- Fixed a bug where the abstract `Loader` class was not passing `matter`, `upToDate` and `upToDateSync` on to `Environment.fromString`.
- Renamed `TemplateSource.uptoDate` to `TemplateSource.upToDate` and `TemplateSource.uptoDateSync` to `TemplateSource.upToDateSync`.

## Version 0.5.2-alpha.1

- Fixed a bug with `NodeFileSystemLoader` and `CachingNodeFileSystemLoader` where template authors could escape the template search path.

## Version 0.5.1-alpha.1

- Declare DOM types for browser specific loaders.

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
