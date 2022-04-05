---
id: "Template"
title: "Class: Template"
sidebar_label: "Template"
sidebar_position: 0
custom_edit_url: null
---

A Liquid template that has been parsed and is bound to an environment,
ready to be rendered. Rather than constructing a template directly, you
should use `Template.fromString()`, `Environment.fromString()` or
`Environment.getTemplate()`.

## Constructors

### constructor

• **new Template**(`environment`, `tree`, `name`, `globals?`, `matter?`, `upToDate?`, `upToDateSync?`)

Template constructor.Rather than constructing a template directly, you
should use `Template.fromString()`, `Environment.fromString()` or
`Environment.getTemplate()`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `environment` | [`Environment`](Environment.md) | The environment this template is bound to. |
| `tree` | [`Root`](Root.md) | The root of the abstract syntax tree representing this template. |
| `name` | `string` | A name or identifier for this template. |
| `globals?` | [`ContextScope`](../modules.md#contextscope) | An optional object who's properties will be added to the render context every time this template is rendered. |
| `matter?` | [`ContextScope`](../modules.md#contextscope) | Extra globals, usually added by a template loader. |
| `upToDate?` | () => `Promise`<`boolean`\> | A function that will return `true` if this template is up to date, or `false` if it needs to loaded again. |
| `upToDateSync?` | () => `boolean` | A synchronous version of `upToDate`. |

#### Defined in

[src/template.ts:85](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L85)

## Properties

### environment

• `Readonly` **environment**: [`Environment`](Environment.md)

#### Defined in

[src/template.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L21)

___

### globals

• `Readonly` **globals**: [`ContextScope`](../modules.md#contextscope)

#### Defined in

[src/template.ts:24](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L24)

___

### isUpToDate

• `Readonly` **isUpToDate**: () => `Promise`<`boolean`\>

#### Type declaration

▸ (): `Promise`<`boolean`\>

##### Returns

`Promise`<`boolean`\>

#### Defined in

[src/template.ts:26](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L26)

___

### isUpToDateSync

• `Readonly` **isUpToDateSync**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

[src/template.ts:27](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L27)

___

### matter

• `Readonly` **matter**: [`ContextScope`](../modules.md#contextscope)

#### Defined in

[src/template.ts:25](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L25)

___

### name

• `Readonly` **name**: `string`

#### Defined in

[src/template.ts:23](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L23)

___

### renderContextClass

• `Protected` **renderContextClass**: typeof [`RenderContext`](RenderContext.md) = `RenderContext`

#### Defined in

[src/template.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L28)

___

### tree

• `Readonly` **tree**: [`Root`](Root.md)

#### Defined in

[src/template.ts:22](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L22)

## Methods

### handleError

▸ `Protected` **handleError**(`error`, `node`, `blockScope`, `partial`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `unknown` |
| `node` | [`Node`](../interfaces/Node.md) |
| `blockScope` | `boolean` |
| `partial` | `boolean` |

#### Returns

`void`

#### Defined in

[src/template.ts:139](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L139)

___

### makeGlobals

▸ `Protected` **makeGlobals**(`templateGlobals`): [`ContextScope`](../modules.md#contextscope)

Override this to change global template scope priorities.

#### Parameters

| Name | Type |
| :------ | :------ |
| `templateGlobals` | [`ContextScope`](../modules.md#contextscope) |

#### Returns

[`ContextScope`](../modules.md#contextscope)

#### Defined in

[src/template.ts:231](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L231)

___

### render

▸ **render**(`globals?`): `Promise`<`string`\>

Render the template.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `globals` | [`ContextScope`](../modules.md#contextscope) | An optional object who's properties will be added to the render context, |

#### Returns

`Promise`<`string`\>

The rendered template.

#### Defined in

[src/template.ts:109](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L109)

___

### renderSync

▸ **renderSync**(`globals?`): `string`

A synchronous version of `render`.

**`see`** [render](Template.md#render)

#### Parameters

| Name | Type |
| :------ | :------ |
| `globals` | [`ContextScope`](../modules.md#contextscope) |

#### Returns

`string`

#### Defined in

[src/template.ts:125](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L125)

___

### renderWithContext

▸ **renderWithContext**(`context`, `outputStream`, `blockScope?`, `partial?`): `Promise`<`void`\>

Render a template given an existing render context and output stream.
This is used by the built-in `include` and `render` tags.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) | `undefined` |
| `outputStream` | [`RenderStream`](../interfaces/RenderStream.md) | `undefined` |
| `blockScope` | `boolean` | `false` |
| `partial` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/template.ts:170](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L170)

___

### renderWithContextSync

▸ **renderWithContextSync**(`context`, `outputStream`, `blockScope?`, `partial?`): `void`

A synchronous version of `renderWithContext`.

**`see`** [renderWithContext](Template.md#renderwithcontext)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) | `undefined` |
| `outputStream` | [`RenderStream`](../interfaces/RenderStream.md) | `undefined` |
| `blockScope` | `boolean` | `false` |
| `partial` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[src/template.ts:194](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L194)

___

### withGlobals

▸ **withGlobals**(`globals?`): [`Template`](Template.md)

Copy this template with new globals.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `globals?` | [`ContextScope`](../modules.md#contextscope) | An optional object who's properties will be added to the render context every time this template is rendered. |

#### Returns

[`Template`](Template.md)

A this template with new globals.

#### Defined in

[src/template.ts:216](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L216)

___

### from

▸ `Static` **from**(`source`, `options?`): [`Template`](Template.md)

Parse a Liquid template, automatically creating an environment to
bind it to.

Alias of [fromString](Template.md#fromstring)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The Liquid template source code. |
| `options` | [`EnvironmentOptions`](../modules.md#environmentoptions) | Options to set on the implicit environment. |

#### Returns

[`Template`](Template.md)

A new template, bound to an implicit environment.

#### Defined in

[src/template.ts:65](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L65)

___

### fromString

▸ `Static` **fromString**(`source`, `options?`): [`Template`](Template.md)

Parse a Liquid template, automatically creating an environment to
bind it to.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The Liquid template source code. |
| `options` | [`EnvironmentOptions`](../modules.md#environmentoptions) | Options to set on the implicit environment. |

#### Returns

[`Template`](Template.md)

A new template, bound to an implicit environment.

#### Defined in

[src/template.ts:40](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/template.ts#L40)
