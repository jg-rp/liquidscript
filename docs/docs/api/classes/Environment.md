---
id: "Environment"
title: "Class: Environment"
sidebar_label: "Environment"
sidebar_position: 0
custom_edit_url: null
---

Shared configuration from which templates can be loaded and parsed.

**`see`** [EnvironmentOptions](../modules.md#environmentoptions)

## Constructors

### constructor

• **new Environment**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`EnvironmentOptions`](../modules.md#environmentoptions) |

#### Defined in

[src/environment.ts:125](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L125)

## Properties

### #parser

• `Private` **#parser**: [`Parser`](../interfaces/Parser.md)

#### Defined in

[src/environment.ts:123](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L123)

___

### #tokenRules

• `Private` **#tokenRules**: `RegExp`

#### Defined in

[src/environment.ts:121](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L121)

___

### #tokenize

• `Private` **#tokenize**: (`source`: `string`) => `Generator`<[`Token`](tokens.Token.md), `any`, `unknown`\>

#### Type declaration

▸ (`source`): `Generator`<[`Token`](tokens.Token.md), `any`, `unknown`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

##### Returns

`Generator`<[`Token`](tokens.Token.md), `any`, `unknown`\>

#### Defined in

[src/environment.ts:122](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L122)

___

### autoEscape

• **autoEscape**: `boolean`

#### Defined in

[src/environment.ts:99](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L99)

___

### filters

• `Readonly` **filters**: `Object` = `{}`

An object mapping filter names to filter functions.

#### Index signature

▪ [keys: `string`]: [`Filter`](../modules.md#filter)

#### Defined in

[src/environment.ts:114](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L114)

___

### globals

• **globals**: [`ContextScope`](../modules.md#contextscope)

#### Defined in

[src/environment.ts:100](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L100)

___

### loader

• **loader**: [`Loader`](Loader.md)

#### Defined in

[src/environment.ts:101](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L101)

___

### maxContextDepth

• **maxContextDepth**: `number`

#### Defined in

[src/environment.ts:102](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L102)

___

### statementEndString

• `Readonly` **statementEndString**: `string`

#### Defined in

[src/environment.ts:104](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L104)

___

### statementStartString

• `Readonly` **statementStartString**: `string`

#### Defined in

[src/environment.ts:103](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L103)

___

### strictFilters

• **strictFilters**: `boolean`

#### Defined in

[src/environment.ts:105](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L105)

___

### tagEndString

• `Readonly` **tagEndString**: `string`

#### Defined in

[src/environment.ts:107](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L107)

___

### tagStartString

• `Readonly` **tagStartString**: `string`

#### Defined in

[src/environment.ts:106](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L106)

___

### tags

• `Readonly` **tags**: `Object` = `{}`

An object mapping tag names to tag implementations.

#### Index signature

▪ [keys: `string`]: [`Tag`](../interfaces/Tag.md)

#### Defined in

[src/environment.ts:119](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L119)

___

### templateClass

• `Protected` **templateClass**: typeof [`Template`](Template.md) = `Template`

#### Defined in

[src/environment.ts:108](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L108)

___

### undefinedFactory

• `Readonly` **undefinedFactory**: (`name`: `string`) => [`Undefined`](Undefined.md)

#### Type declaration

▸ (`name`): [`Undefined`](Undefined.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

[`Undefined`](Undefined.md)

#### Defined in

[src/environment.ts:109](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L109)

## Accessors

### parser

• `get` **parser**(): [`Parser`](../interfaces/Parser.md)

#### Returns

[`Parser`](../interfaces/Parser.md)

#### Defined in

[src/environment.ts:263](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L263)

## Methods

### addFilter

▸ **addFilter**(`name`, `filter`): `void`

Add a filter to this environment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The filter's name, as used by template authors to apply the filter. |
| `filter` | [`Filter`](../modules.md#filter) | A function implementing the filter. |

#### Returns

`void`

#### Defined in

[src/environment.ts:250](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L250)

___

### error

▸ **error**(`err`): `void`

Re-throw an error.

Override this method if you want to implement a "lax mode".

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |

#### Returns

`void`

#### Defined in

[src/environment.ts:259](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L259)

___

### fromString

▸ **fromString**(`source`, `name?`, `globals?`, `matter?`, `upToDate?`, `upToDateSync?`): [`Template`](Template.md)

Parse the given string as a Liquid template.

**`throws`** `NoSuchTemplateError` if a template with the given name can not
be found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | The Liquid template source code. |
| `name?` | `string` | An optional name identifying the template. |
| `globals?` | [`ContextScope`](../modules.md#contextscope) | An optional object who's properties will be added to the render context every time the resulting template is rendered. |
| `matter?` | [`ContextScope`](../modules.md#contextscope) | Extra globals, usually added by a template loader. |
| `upToDate?` | () => `Promise`<`boolean`\> | - |
| `upToDateSync?` | () => `boolean` | - |

#### Returns

[`Template`](Template.md)

A `Template` bound to this environment, ready to be rendered.

#### Defined in

[src/environment.ts:224](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L224)

___

### getTemplate

▸ **getTemplate**(`name`, `globals?`, `context?`, `loaderContext?`): `Promise`<[`Template`](Template.md)\>

Load a template using the configured template loader.

**`throws`** `NoSuchTemplateError` if a template with the given name can not
be found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name or identifier of the template to load. |
| `globals?` | [`ContextScope`](../modules.md#contextscope) | An optional object who's properties will be added to the render context every time the resulting template is rendered. |
| `context?` | [`RenderContext`](RenderContext.md) | A reference to the active render context, if one is active. |
| `loaderContext?` | `Object` | Additional, arbitrary data that a loader can use to scope or otherwise narrow its search space. |

#### Returns

`Promise`<[`Template`](Template.md)\>

A `Template` bound to this environment, ready to be rendered.

#### Defined in

[src/environment.ts:191](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L191)

___

### getTemplateSync

▸ **getTemplateSync**(`name`, `globals?`, `context?`, `loaderContext?`): [`Template`](Template.md)

A synchronous version of `Environment.getTemplate()`.

**`see`** [getTemplate](Environment.md#gettemplate)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `globals?` | [`ContextScope`](../modules.md#contextscope) |
| `context?` | [`RenderContext`](RenderContext.md) |
| `loaderContext?` | `Object` |

#### Returns

[`Template`](Template.md)

#### Defined in

[src/environment.ts:204](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L204)

___

### makeGlobals

▸ `Protected` **makeGlobals**(`templateGlobals?`): [`ContextScope`](../modules.md#contextscope)

#### Parameters

| Name | Type |
| :------ | :------ |
| `templateGlobals?` | [`ContextScope`](../modules.md#contextscope) |

#### Returns

[`ContextScope`](../modules.md#contextscope)

#### Defined in

[src/environment.ts:278](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L278)

___

### parse

▸ `Protected` **parse**(`source`, `name?`): [`Root`](Root.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |
| `name?` | `string` |

#### Returns

[`Root`](Root.md)

#### Defined in

[src/environment.ts:267](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L267)

___

### getImplicitEnvironment

▸ `Static` **getImplicitEnvironment**(`options?`): [`Environment`](Environment.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`EnvironmentOptions`](../modules.md#environmentoptions) |

#### Returns

[`Environment`](Environment.md)

#### Defined in

[src/environment.ts:168](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/environment.ts#L168)
