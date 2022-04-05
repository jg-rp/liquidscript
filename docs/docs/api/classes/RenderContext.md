---
id: "RenderContext"
title: "Class: RenderContext"
sidebar_label: "RenderContext"
sidebar_position: 0
custom_edit_url: null
---

A RenderContext manages template scopes, internal registers and
access to the bound environment during the rendering of a template.

A new RenderContext is created automatically every time `render()`
is called on a `Template`, so you probably don't want to instantiate
it directly.

## Constructors

### constructor

• **new RenderContext**(`environment`, `globals?`, `options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `environment` | [`Environment`](Environment.md) | The environment from which this context was created. |
| `globals` | [`ContextScope`](../modules.md#contextscope) | Global template variables, passed down from the Environment, Template, Loader and arguments to `.render()`. |
| `options` | [`RenderContextOptions`](../modules.md#rendercontextoptions) | Extra render context options. |

#### Defined in

[src/context.ts:112](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L112)

## Properties

### copyDepth

• `Private` **copyDepth**: `number`

The number of times this render context has been copied or
extended. This helps us guard against recursive use of `include`
or `render` tags.

#### Defined in

[src/context.ts:103](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L103)

___

### counters

• `Readonly` **counters**: `Object` = `{}`

A distinct scope for counters set using the `increment` and
`decrement` tags.

#### Index signature

▪ [index: `string`]: `number`

#### Defined in

[src/context.ts:55](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L55)

___

### disabledTags

• `Readonly` **disabledTags**: `Set`<`string`\>

A set of tag names that are disallowed in this render context. For
example, the `include` tag is not allowed in templates rendered
with the `render` tag.

#### Defined in

[src/context.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L90)

___

### environment

• `Readonly` **environment**: [`Environment`](Environment.md)

___

### forLoops

• `Readonly` **forLoops**: [`ForLoopDrop`](drops.ForLoopDrop.md)[] = `[]`

A stack of `ForLoopDrop` objects. Used to populate the `parentloop`
property of a `ForLoopDrop`.

#### Defined in

[src/context.ts:61](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L61)

___

### locals

• `Private` **locals**: [`ContextScope`](../modules.md#contextscope) = `{}`

A namespace for variables set using the `assign` or `capture` tags.

#### Defined in

[src/context.ts:76](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L76)

___

### registers

• `Readonly` **registers**: `Map`<`string` \| `symbol`, `Map`<`string` \| `symbol`, `unknown`\>\>

A register is a Map used by tags and/or filters to store arbitrary
values that are not available to template authors. Use `getRegister()`
to obtain a named register.

#### Defined in

[src/context.ts:68](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L68)

___

### scope

• `Readonly` **scope**: `ObjectChain`

A chain of scopes. When resolving names, each scope in the chain is
searched in order. If a new scope if pushed on to a RenderContext,
it is pushed to the front if this chain.

#### Defined in

[src/context.ts:83](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L83)

___

### templateName

• `Readonly` **templateName**: `string`

The name of the template being rendered. Will be `<string>` for
templates parsed using `Environment.fromString()` without being
given a name.

#### Defined in

[src/context.ts:96](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L96)

## Methods

### assign

▸ **assign**(`key`, `value`): `void`

Assign or re-assign a template local variable, probably from either the
`assign` or `capture` tags.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The name of the template local variable. |
| `value` | `unknown` | The value of the template local variable. |

#### Returns

`void`

#### Defined in

[src/context.ts:135](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L135)

___

### copy

▸ **copy**(`scope`, `disabledTags`): [`RenderContext`](RenderContext.md)

Create a new context by copying this one, without any local variables and
registers, and extending the copy with the given scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | [`ContextScope`](../modules.md#contextscope) | A scope with which to extend the current context. |
| `disabledTags` | `Iterable`<`string`\> | The names of any tags that should be disallowed in the new context. |

#### Returns

[`RenderContext`](RenderContext.md)

An extended copy of this context.

#### Defined in

[src/context.ts:274](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L274)

___

### get

▸ **get**(`name`, `path?`, `missing?`): `Promise`<`unknown`\>

Search the current scope for a template variable and, if found, follow
the given path. This is a bit like resolving a JSONPath expression.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the template variable to resolve. |
| `path?` | [`ContextPath`](../modules.md#contextpath) | `undefined` | An optional array of path elements to follow. |
| `missing` | `unknown` | `Missing` | A default value used if the name and path fail to find a value. |

#### Returns

`Promise`<`unknown`\>

The value at `path`, starting from the given name, or `missing`
otherwise. If `missing` is not given, an instance of the `Undefined`
class defined on the attached environment will be used.

#### Defined in

[src/context.ts:170](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L170)

___

### getRegister

▸ **getRegister**(`key`): `Map`<`string` \| `symbol`, `unknown`\>

Fetch a render context register, creating one if it does not exist.

A register is a place for tags and/or filters to store arbitrary data,
without leaking said data into the template scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` \| `symbol` | An identifier for the register. |

#### Returns

`Map`<`string` \| `symbol`, `unknown`\>

A register.

#### Defined in

[src/context.ts:257](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L257)

___

### getSync

▸ **getSync**(`name`, `path?`, `missing?`): `unknown`

A synchronous version of `RenderContext.get()`.

**`see`** [get](RenderContext.md#get)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `path?` | [`ContextPath`](../modules.md#contextpath) | `undefined` |
| `missing` | `unknown` | `Missing` |

#### Returns

`unknown`

#### Defined in

[src/context.ts:198](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L198)

___

### getTemplate

▸ **getTemplate**(`name`, `loaderContext`): `Promise`<[`Template`](Template.md)\>

A convenience method for loading a template from the attached environment.

**`throws`** `NoSuchTemplateError` if a template with the given name can not
be found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name or identifier of the template to load. |
| `loaderContext` | `Object` | Additional, arbitrary data that a loader can use to scope or otherwise narrow its search space. |

#### Returns

`Promise`<[`Template`](Template.md)\>

A `Template`, ready to be rendered.

#### Defined in

[src/context.ts:231](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L231)

___

### getTemplateSync

▸ **getTemplateSync**(`name`, `loaderContext?`): [`Template`](Template.md)

A synchronous version of `RenderContext.getTemplate()`.

**`see`** [getTemplate](RenderContext.md#gettemplate)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `loaderContext` | `Object` |

#### Returns

[`Template`](Template.md)

#### Defined in

[src/context.ts:242](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L242)

___

### resolve

▸ **resolve**(`name`): `Promise`<`unknown`\>

Resolve a template variable by searching the scope chain. Unlike `get`,
`resolve` performs a single, top level search of the scope chain. It
does not expect a dotted or bracketed identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the template variable to resolve. |

#### Returns

`Promise`<`unknown`\>

The value stored against the given name, or an instance of
the `Undefined` class defined on the attached environment.

#### Defined in

[src/context.ts:147](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L147)

___

### resolveSync

▸ **resolveSync**(`name`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`unknown`

#### Defined in

[src/context.ts:153](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/context.ts#L153)
