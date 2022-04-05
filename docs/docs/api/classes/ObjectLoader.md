---
id: "ObjectLoader"
title: "Class: ObjectLoader"
sidebar_label: "ObjectLoader"
sidebar_position: 0
custom_edit_url: null
---

A loader that uses an Object of strings to store template template source Text.

## Hierarchy

- [`Loader`](Loader.md)

  ↳ **`ObjectLoader`**

## Constructors

### constructor

• **new ObjectLoader**(`obj?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj?` | `Object` |

#### Overrides

[Loader](Loader.md).[constructor](Loader.md#constructor)

#### Defined in

[src/builtin/loaders/object_loader.ts:10](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/object_loader.ts#L10)

## Properties

### \_obj

• `Private` **\_obj**: `Object`

#### Index signature

▪ [index: `string`]: `string`

#### Defined in

[src/builtin/loaders/object_loader.ts:8](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/object_loader.ts#L8)

## Methods

### getSource

▸ **getSource**(`name`): `Promise`<[`TemplateSource`](TemplateSource.md)\>

Override `getSource` to implement a custom loader.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`TemplateSource`](TemplateSource.md)\>

The source, with any meta data, for the template identified by
the given name

#### Overrides

[Loader](Loader.md).[getSource](Loader.md#getsource)

#### Defined in

[src/builtin/loaders/object_loader.ts:15](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/object_loader.ts#L15)

___

### getSourceSync

▸ **getSourceSync**(`name`): [`TemplateSource`](TemplateSource.md)

A synchronous version of `getSource`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`TemplateSource`](TemplateSource.md)

#### Overrides

[Loader](Loader.md).[getSourceSync](Loader.md#getsourcesync)

#### Defined in

[src/builtin/loaders/object_loader.ts:19](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/object_loader.ts#L19)

___

### load

▸ **load**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): `Promise`<[`Template`](Template.md)\>

Used internally by `Environment.getTemplate()`. Delegates to `getSource`.

**`see`** [getSource](ObjectLoader.md#getsource). Override `load` to implement a caching loader.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `environment` | [`Environment`](Environment.md) |
| `context?` | [`RenderContext`](RenderContext.md) |
| `globals?` | [`ContextScope`](../modules.md#contextscope) |
| `loaderContext?` | `Object` |

#### Returns

`Promise`<[`Template`](Template.md)\>

#### Inherited from

[Loader](Loader.md).[load](Loader.md#load)

#### Defined in

[src/loader.ts:75](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/loader.ts#L75)

___

### loadSync

▸ **loadSync**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): [`Template`](Template.md)

A synchronous version of `load`.

**`see`** [load](ObjectLoader.md#load)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `environment` | [`Environment`](Environment.md) |
| `context?` | [`RenderContext`](RenderContext.md) |
| `globals?` | [`ContextScope`](../modules.md#contextscope) |
| `loaderContext?` | `Object` |

#### Returns

[`Template`](Template.md)

#### Inherited from

[Loader](Loader.md).[loadSync](Loader.md#loadsync)

#### Defined in

[src/loader.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/loader.ts#L90)
