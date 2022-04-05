---
id: "ChoiceLoader"
title: "Class: ChoiceLoader"
sidebar_label: "ChoiceLoader"
sidebar_position: 0
custom_edit_url: null
---

A template loader that will try each of an array of loaders until
a template is found, or throw a `TemplateNotFoundError` if none of
the loaders could find the template.

## Hierarchy

- [`Loader`](Loader.md)

  ↳ **`ChoiceLoader`**

## Constructors

### constructor

• **new ChoiceLoader**(`loaders`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `loaders` | [`Loader`](Loader.md)[] |

#### Overrides

[Loader](Loader.md).[constructor](Loader.md#constructor)

#### Defined in

[src/builtin/loaders/choice_loader.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/choice_loader.ts#L17)

## Properties

### loaders

• `Readonly` **loaders**: [`Loader`](Loader.md)[]

## Methods

### getSource

▸ **getSource**(): `Promise`<[`TemplateSource`](TemplateSource.md)\>

Override `getSource` to implement a custom loader.

#### Returns

`Promise`<[`TemplateSource`](TemplateSource.md)\>

The source, with any meta data, for the template identified by
the given name

#### Overrides

[Loader](Loader.md).[getSource](Loader.md#getsource)

#### Defined in

[src/builtin/loaders/choice_loader.ts:21](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/choice_loader.ts#L21)

___

### getSourceSync

▸ **getSourceSync**(): [`TemplateSource`](TemplateSource.md)

A synchronous version of `getSource`.

#### Returns

[`TemplateSource`](TemplateSource.md)

#### Overrides

[Loader](Loader.md).[getSourceSync](Loader.md#getsourcesync)

#### Defined in

[src/builtin/loaders/choice_loader.ts:26](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/choice_loader.ts#L26)

___

### load

▸ **load**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): `Promise`<[`Template`](Template.md)\>

Used internally by `Environment.getTemplate()`. Delegates to `getSource`.

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

#### Overrides

[Loader](Loader.md).[load](Loader.md#load)

#### Defined in

[src/builtin/loaders/choice_loader.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/choice_loader.ts#L32)

___

### loadSync

▸ **loadSync**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): [`Template`](Template.md)

A synchronous version of `load`.

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

#### Overrides

[Loader](Loader.md).[loadSync](Loader.md#loadsync)

#### Defined in

[src/builtin/loaders/choice_loader.ts:57](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/choice_loader.ts#L57)
