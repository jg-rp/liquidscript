---
id: "modules"
title: "liquidscript"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [drops](namespaces/drops.md)
- [expressions](namespaces/expressions.md)
- [filters](namespaces/filters.md)
- [object](namespaces/object.md)
- [tags](namespaces/tags.md)
- [tokens](namespaces/tokens.md)

## Classes

- [Blank](classes/Blank.md)
- [BlockNode](classes/BlockNode.md)
- [BooleanExpression](classes/BooleanExpression.md)
- [BooleanLiteral](classes/BooleanLiteral.md)
- [BreakIteration](classes/BreakIteration.md)
- [BufferedRenderStream](classes/BufferedRenderStream.md)
- [CachingNodeFileSystemLoader](classes/CachingNodeFileSystemLoader.md)
- [ChoiceLoader](classes/ChoiceLoader.md)
- [ContextDepthError](classes/ContextDepthError.md)
- [Continue](classes/Continue.md)
- [ContinueIteration](classes/ContinueIteration.md)
- [DisabledTagError](classes/DisabledTagError.md)
- [Empty](classes/Empty.md)
- [Environment](classes/Environment.md)
- [ExpressionFilter](classes/ExpressionFilter.md)
- [FetchLoader](classes/FetchLoader.md)
- [FilterArgumentError](classes/FilterArgumentError.md)
- [FilterNotFoundError](classes/FilterNotFoundError.md)
- [FilterValueError](classes/FilterValueError.md)
- [FilteredExpression](classes/FilteredExpression.md)
- [Float](classes/Float.md)
- [FloatLiteral](classes/FloatLiteral.md)
- [Identifier](classes/Identifier.md)
- [IdentifierPathElement](classes/IdentifierPathElement.md)
- [InfixExpression](classes/InfixExpression.md)
- [Integer](classes/Integer.md)
- [IntegerLiteral](classes/IntegerLiteral.md)
- [InternalKeyError](classes/InternalKeyError.md)
- [InternalLiquidError](classes/InternalLiquidError.md)
- [InternalTypeError](classes/InternalTypeError.md)
- [InternalUndefinedError](classes/InternalUndefinedError.md)
- [LaxUndefined](classes/LaxUndefined.md)
- [LiquidError](classes/LiquidError.md)
- [LiquidFilterArgumentError](classes/LiquidFilterArgumentError.md)
- [LiquidFilterValueError](classes/LiquidFilterValueError.md)
- [LiquidInterrupt](classes/LiquidInterrupt.md)
- [LiquidKeyError](classes/LiquidKeyError.md)
- [LiquidNumber](classes/LiquidNumber.md)
- [LiquidSyntaxError](classes/LiquidSyntaxError.md)
- [LiquidTypeError](classes/LiquidTypeError.md)
- [LiquidUndefinedError](classes/LiquidUndefinedError.md)
- [Literal](classes/Literal.md)
- [Loader](classes/Loader.md)
- [LoopExpression](classes/LoopExpression.md)
- [MapLoader](classes/MapLoader.md)
- [Markup](classes/Markup.md)
- [MaxContextDepthError](classes/MaxContextDepthError.md)
- [Nil](classes/Nil.md)
- [NoSuchFilterError](classes/NoSuchFilterError.md)
- [NoSuchTagError](classes/NoSuchTagError.md)
- [NoSuchTemplateError](classes/NoSuchTemplateError.md)
- [NodeFileSystemLoader](classes/NodeFileSystemLoader.md)
- [ObjectLoader](classes/ObjectLoader.md)
- [OrphanedBreakTagError](classes/OrphanedBreakTagError.md)
- [OrphanedContinueTagError](classes/OrphanedContinueTagError.md)
- [PushedTooFarError](classes/PushedTooFarError.md)
- [Range](classes/Range.md)
- [RangeLiteral](classes/RangeLiteral.md)
- [ReadOnlyObjectChainError](classes/ReadOnlyObjectChainError.md)
- [RenderContext](classes/RenderContext.md)
- [Root](classes/Root.md)
- [StrictUndefined](classes/StrictUndefined.md)
- [StringLiteral](classes/StringLiteral.md)
- [Template](classes/Template.md)
- [TemplateNotFoundError](classes/TemplateNotFoundError.md)
- [TemplateParser](classes/TemplateParser.md)
- [TemplateSource](classes/TemplateSource.md)
- [Undefined](classes/Undefined.md)
- [XMLHttpRequestLoader](classes/XMLHttpRequestLoader.md)

## Interfaces

- [Expression](interfaces/Expression.md)
- [LiquidCallable](interfaces/LiquidCallable.md)
- [LiquidDispatchable](interfaces/LiquidDispatchable.md)
- [LiquidDispatchableSync](interfaces/LiquidDispatchableSync.md)
- [LiquidHTMLable](interfaces/LiquidHTMLable.md)
- [LiquidPrimitive](interfaces/LiquidPrimitive.md)
- [LiquidStringable](interfaces/LiquidStringable.md)
- [Liquidable](interfaces/Liquidable.md)
- [LiquidableSync](interfaces/LiquidableSync.md)
- [Node](interfaces/Node.md)
- [Parser](interfaces/Parser.md)
- [RenderStream](interfaces/RenderStream.md)
- [Tag](interfaces/Tag.md)

## Type aliases

### CachingNodeFileSystemLoaderOptions

Ƭ **CachingNodeFileSystemLoaderOptions**: [`NodeFileSystemLoaderOptions`](modules.md#nodefilesystemloaderoptions) & { `autoReload?`: `boolean` ; `cacheSize?`: `number`  }

Options for a caching file system template loader in the NodeJS runtime.

#### Defined in

[src/builtin/loaders/file_system_loader.ts:36](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L36)

___

### ContextPath

Ƭ **ContextPath**: (`number` \| `string` \| [`LiquidPrimitive`](interfaces/LiquidPrimitive.md))[]

#### Defined in

[src/context.ts:34](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L34)

___

### ContextScope

Ƭ **ContextScope**: `Object`

#### Index signature

▪ [index: `string`]: `unknown`

#### Defined in

[src/context.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L33)

___

### EnvironmentOptions

Ƭ **EnvironmentOptions**: `Object`

Liquid environment options.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoEscape?` | `boolean` | When `true`, render context variables will be HTML escaped before output.  **`defaultvalue`** `false` |
| `globals?` | [`ContextScope`](modules.md#contextscope) | An optional object who's properties will be added to the render context of every template rendered from this environment.  `globals` is not copied, so updates to it after environment construction will be visible to templates.  **`defaultvalue`** An empty `Object`. |
| `loader?` | [`Loader`](classes/Loader.md) | A template loader. Used to load templates from a file system or database, for example.  **`defaultvalue`** An empty `MapLoader`. |
| `maxContextDepth?` | `number` | The maximum number of times a render context can be copied or extended. This helps us guard against recursive use of the `include` or `render` tags.  **`defaultvalue`** 30 |
| `statementEndString?` | `string` | The sequence of characters indicating the end of a liquid output statement.  **`defaultvalue`** `}}` |
| `statementStartString?` | `string` | The sequence of characters indicating the start of a liquid output statement.  **`defaultvalue`** `{{` |
| `strictFilters?` | `boolean` | When `true`, a `NoSuchFilterError` will be raised if a template attempts to use an undefined filter. When `false`, undefined filters are silently ignored.  **`defaultvalue`** `true` |
| `tagEndString?` | `string` | The sequence of characters indicating the end of a liquid tag.  **`defaultvalue`** `}}` |
| `tagStartString?` | `string` | The sequence of characters indicating the start of a liquid tag.  **`defaultvalue`** `{%` |
| `undefinedFactory?` | (`name`: `string`) => [`Undefined`](classes/Undefined.md) | A function that accepts the name of a template variable name and returns a subclass of `Undefined`.  **`defaultvalue`** A `LaxUndefined` factory function. |

#### Defined in

[src/environment.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L22)

___

### FetchLoaderOptions

Ƭ **FetchLoaderOptions**: `Object`

Options for the `FetchLoader` template loader.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | `RequestCache` | A string indicating requests will interact with the browser's HTTP cache. Defaults to `"default"`. |
| `credentials?` | `RequestCredentials` | Include or exclude credentials when requesting template sources. Defaults to `"same-origin"`. |
| `headers?` | `Headers` | Headers to include in each request. |
| `mode?` | `RequestMode` | Request mode. Defaults to `"cors"`. |

#### Defined in

[src/builtin/loaders/fetch_loader.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/fetch_loader.ts#L15)

___

### Filter

Ƭ **Filter**: (`this`: [`FilterContext`](modules.md#filtercontext), `left`: `unknown`, ...`args`: `unknown`[]) => `unknown`

#### Type declaration

▸ (`this`, `left`, ...`args`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`FilterContext`](modules.md#filtercontext) |
| `left` | `unknown` |
| `...args` | `unknown`[] |

##### Returns

`unknown`

#### Defined in

[src/filter.ts:16](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/filter.ts#L16)

___

### FilterContext

Ƭ **FilterContext**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | [`RenderContext`](classes/RenderContext.md) | The active render context. |
| `options` | { `[index: string]`: `unknown`;  } | Keyword/named filter arguments. As used by the `default` filter. |

#### Defined in

[src/filter.ts:4](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/filter.ts#L4)

___

### IdentifierPath

Ƭ **IdentifierPath**: ([`IdentifierPathElement`](classes/IdentifierPathElement.md) \| [`Identifier`](classes/Identifier.md))[]

#### Defined in

[src/expression.ts:247](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L247)

___

### LoopArgument

Ƭ **LoopArgument**: [`IntegerLiteral`](classes/IntegerLiteral.md) \| [`FloatLiteral`](classes/FloatLiteral.md) \| [`Identifier`](classes/Identifier.md) \| [`Continue`](classes/Continue.md)

#### Defined in

[src/expression.ts:502](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L502)

___

### N

Ƭ **N**: `string` \| `number` \| `Number` \| [`LiquidNumber`](classes/LiquidNumber.md)

#### Defined in

[src/number.ts:8](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L8)

___

### NodeFileSystemLoaderOptions

Ƭ **NodeFileSystemLoaderOptions**: `Object`

Options for a file system template loader in the NodeJS runtime.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding?` | `BufferEncoding` | The encoding to use when reading from a template file. All template files in the search path are assumed to have the same encoding. Defaults to utf8. |
| `fileExtension?` | `string` | A default file extension to apply if none is given. For example, to allow template authors to write `{% include 'page' %}` instead of `{% include 'page.liquid' %}`, set `fileExtension` to `'.liquid'`. Defaults to the empty string. |

#### Defined in

[src/builtin/loaders/file_system_loader.ts:16](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L16)

___

### NumberT

Ƭ **NumberT**: [`Integer`](classes/Integer.md) \| [`Float`](classes/Float.md)

#### Defined in

[src/number.ts:138](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L138)

___

### RenderContextOptions

Ƭ **RenderContextOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `copyDepth?` | `number` |
| `disabledTags?` | `Set`<`string`\> |
| `templateName?` | `string` |

#### Defined in

[src/context.ts:36](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L36)

___

### XMLHttpRequestLoaderOptions

Ƭ **XMLHttpRequestLoaderOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bustBrowserCache?` | `boolean` | Indicates if the loader should bust the browser's cache by appending the current timestamp to each URL as a query string parameter. |

#### Defined in

[src/builtin/loaders/xml_http_request_loader.ts:4](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L4)

## Variables

### BLANK

• `Const` **BLANK**: [`Blank`](classes/Blank.md)

#### Defined in

[src/expression.ts:108](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L108)

___

### CONTINUE

• `Const` **CONTINUE**: [`Continue`](classes/Continue.md)

#### Defined in

[src/expression.ts:128](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L128)

___

### EMPTY

• `Const` **EMPTY**: [`Empty`](classes/Empty.md)

#### Defined in

[src/expression.ts:79](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L79)

___

### FALSE

• `Const` **FALSE**: [`BooleanLiteral`](classes/BooleanLiteral.md)

#### Defined in

[src/expression.ts:159](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L159)

___

### For

• `Const` **For**: typeof [`For`](modules.md#for)

#### Defined in

[src/expression.ts:507](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L507)

___

### NAN

• `Const` **NAN**: [`Integer`](classes/Integer.md)

#### Defined in

[src/number.ts:170](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L170)

___

### NIL

• `Const` **NIL**: [`Nil`](classes/Nil.md)

#### Defined in

[src/expression.ts:51](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L51)

___

### TRUE

• `Const` **TRUE**: [`BooleanLiteral`](classes/BooleanLiteral.md)

#### Defined in

[src/expression.ts:158](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L158)

___

### ZERO

• `Const` **ZERO**: [`Integer`](classes/Integer.md)

#### Defined in

[src/number.ts:169](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L169)

___

### isLiquidCallable

• `Const` **isLiquidCallable**: typeof [`isLiquidCallable`](modules.md#isliquidcallable)

A symbol that specifies a function valued property that is called to
test a method name against a set of whitelisted methods that Liquid
can call.

#### Defined in

[src/drop.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L131)

___

### liquidDispatch

• `Const` **liquidDispatch**: typeof [`liquidDispatch`](modules.md#liquiddispatch)

A symbol that specifies a function valued property that is called in
the event that a property is missing from an object.

#### Defined in

[src/drop.ts:151](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L151)

___

### liquidDispatchSync

• `Const` **liquidDispatchSync**: typeof [`liquidDispatchSync`](modules.md#liquiddispatchsync)

#### Defined in

[src/drop.ts:169](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L169)

___

### toLiquid

• `Const` **toLiquid**: typeof [`toLiquid`](modules.md#toliquid)

A symbol that specifies a function valued property that is called to
convert an object to its corresponding Liquid value.

#### Defined in

[src/drop.ts:9](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L9)

___

### toLiquidHtml

• `Const` **toLiquidHtml**: typeof [`toLiquidHtml`](modules.md#toliquidhtml)

A symbol that specifies a function valued property that is called to
convert an object to an HTML-safe string representation.

#### Defined in

[src/drop.ts:106](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L106)

___

### toLiquidPrimitive

• `Const` **toLiquidPrimitive**: typeof [`toLiquidPrimitive`](modules.md#toliquidprimitive)

A symbol that specifies a function valued property that is called to
convert an object to its corresponding Liquid primitive value.

#### Defined in

[src/drop.ts:58](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L58)

___

### toLiquidString

• `Const` **toLiquidString**: typeof [`toLiquidString`](modules.md#toliquidstring)

A symbol that specifies a function valued property that is called to
convert an object to its Liquid specific string representation.

#### Defined in

[src/drop.ts:82](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L82)

___

### toLiquidSync

• `Const` **toLiquidSync**: typeof [`toLiquidSync`](modules.md#toliquidsync)

A symbol that specifies a function valued property that is called to
convert an object to its corresponding Liquid value.

#### Defined in

[src/drop.ts:33](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L33)

___

### version

• `Const` **version**: ``"__VERSION__"``

#### Defined in

[src/liquidscript.ts:1](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/liquidscript.ts#L1)

## Functions

### checkArguments

▸ **checkArguments**(`n`, `max`, `min?`): `void`

A utility function that checks throws an error if the given number of
arguments are between the expected minimum and maximum.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `max` | `number` |
| `min?` | `number` |

#### Returns

`void`

#### Defined in

[src/filter.ts:24](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/filter.ts#L24)

___

### forcedOutput

▸ **forcedOutput**(`root`): `boolean`

Return `true` if the syntax tree rooted at `root` contains
output statements (or equivalent nodes). `false` otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Node`](interfaces/Node.md) |

#### Returns

`boolean`

#### Defined in

[src/ast.ts:117](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L117)

___

### hasLiquidCallable

▸ **hasLiquidCallable**(`value`): value is LiquidCallable

A type predicate for the `LiquidCallable` interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | A value that may or may not implement the `LiquidCallable` interface. |

#### Returns

value is LiquidCallable

`true` if the argument value implements the `LiquidCallable` interface,
`false` otherwise.

#### Defined in

[src/drop.ts:143](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L143)

___

### isFloat

▸ **isFloat**(`val`): val is Float

A type predicate for Liquid's `Float` type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |

#### Returns

val is Float

#### Defined in

[src/number.ts:157](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L157)

___

### isInteger

▸ **isInteger**(`val`): val is Integer

A type predicate for Liquid's `Integer` type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |

#### Returns

val is Integer

#### Defined in

[src/number.ts:150](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L150)

___

### isLiquidDispatchable

▸ **isLiquidDispatchable**(`value`): value is LiquidDispatchable

A type predicate for the `LiquidDispatchable` interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | A value that may or may not implement the `LiquidDispatchable` interface. |

#### Returns

value is LiquidDispatchable

`true` if the argument value implements the `LiquidDispatchable` interface,
`false` otherwise.

#### Defined in

[src/drop.ts:163](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L163)

___

### isLiquidDispatchableSync

▸ **isLiquidDispatchableSync**(`value`): value is LiquidDispatchableSync

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is LiquidDispatchableSync

#### Defined in

[src/drop.ts:175](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L175)

___

### isLiquidHTMLable

▸ **isLiquidHTMLable**(`value`): value is LiquidHTMLable

A type predicate for the `LiquidHTMLable` interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | A value that may or may not implement the `LiquidHTMLable` interface. |

#### Returns

value is LiquidHTMLable

`true` if the argument value implements the `LiquidHTMLable`
interface, `false` otherwise.

#### Defined in

[src/drop.ts:118](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L118)

___

### isLiquidPrimitive

▸ **isLiquidPrimitive**(`value`): value is LiquidPrimitive

A type predicate for the `LiquidPrimitive` interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | A value that may or may not implement the `LiquidPrimitive` interface. |

#### Returns

value is LiquidPrimitive

`true` if the argument value implements the `LiquidPrimitive`
interface, `false` otherwise.

#### Defined in

[src/drop.ts:70](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L70)

___

### isLiquidStringable

▸ **isLiquidStringable**(`value`): value is LiquidStringable

A type predicate for the `LiquidStringable` interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | A value that may or may not implement the `LiquidStringable` interface. |

#### Returns

value is LiquidStringable

`true` if the argument value implements the `LiquidStringable`
interface, `false` otherwise.

#### Defined in

[src/drop.ts:94](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L94)

___

### isLiquidTruthy

▸ **isLiquidTruthy**(`value`): `boolean`

Check a value for Liquid truthiness.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | Any value |

#### Returns

`boolean`

`true` if the value is Liquid truthy, `false` otherwise.

#### Defined in

[src/expression.ts:735](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L735)

___

### isLiquidable

▸ **isLiquidable**(`value`): value is Liquidable

A type predicate for the `Liquidable` interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | A value that may or may not implement the `Liquidable` interface. |

#### Returns

value is Liquidable

`true` if the argument value implements the `Liquidable`
interface, `false` otherwise.

#### Defined in

[src/drop.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L21)

___

### isLiquidableSync

▸ **isLiquidableSync**(`value`): value is LiquidableSync

A type predicate for the `LiquidableSync` interface.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | A value that may or may not implement the `LiquidableSync` interface. |

#### Returns

value is LiquidableSync

`true` if the argument value implements the `LiquidableSync`
interface, `false` otherwise.

#### Defined in

[src/drop.ts:46](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/drop.ts#L46)

___

### isN

▸ **isN**(`val`): val is N

A type predicate for valid inputs to the `parseNumberT` function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `unknown` | Any value. |

#### Returns

val is N

`true` if the input value can be passed to `parseNumberT`.

#### Defined in

[src/number.ts:182](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L182)

___

### isNumberT

▸ **isNumberT**(`val`): val is NumberT

A type predicate for Liquid's number wrapper types.

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `unknown` |

#### Returns

val is NumberT

#### Defined in

[src/number.ts:143](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L143)

___

### parseNumberT

▸ **parseNumberT**(`n`): [`NumberT`](modules.md#numbert)

Parse a string, primitive number or Number object to a Liquid
integer or float.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | [`N`](modules.md#n) | A number or string representation of a number. |

#### Returns

[`NumberT`](modules.md#numbert)

A wrapped number representing a Liquid integer or float.

#### Defined in

[src/number.ts:193](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/number.ts#L193)

___

### range

▸ **range**(`stop`): [`Range`](classes/Range.md)

Construct a new `Range` object, a lazy sequence of integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stop` | `number` |

#### Returns

[`Range`](classes/Range.md)

#### Defined in

[src/range.ts:4](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/range.ts#L4)

▸ **range**(`start`, `stop`): [`Range`](classes/Range.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `stop` | `number` |

#### Returns

[`Range`](classes/Range.md)

#### Defined in

[src/range.ts:5](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/range.ts#L5)

___

### throwForDisabledTag

▸ **throwForDisabledTag**(`node`, `context`, `templateName?`): `void`

Throw an error if the given tag is disallowed in the given context.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](interfaces/Node.md) |
| `context` | [`RenderContext`](classes/RenderContext.md) |
| `templateName?` | `string` |

#### Returns

`void`

#### Defined in

[src/ast.ts:128](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L128)

___

### throwIfOptions

▸ **throwIfOptions**(`context`): `void`

Throw an error if the given filter context contains options.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`FilterContext`](modules.md#filtercontext) |

#### Returns

`void`

#### Defined in

[src/filter.ts:46](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/filter.ts#L46)

___

### walk

▸ **walk**(`root`): `Generator`<[`Node`](interfaces/Node.md)\>

Traverse the syntax tree rooted at `root` in depth-first pre-order.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`Node`](interfaces/Node.md) | The syntax tree node to start from. |

#### Returns

`Generator`<[`Node`](interfaces/Node.md)\>

A generator producing nodes that are decedents of the `root` node.

#### Defined in

[src/ast.ts:104](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/ast.ts#L104)
