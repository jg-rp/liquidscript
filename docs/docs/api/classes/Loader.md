---
id: "Loader"
title: "Class: Loader"
sidebar_label: "Loader"
sidebar_position: 0
custom_edit_url: null
---

The base class for all template loaders.

## Hierarchy

- **`Loader`**

  ↳ [`ChoiceLoader`](ChoiceLoader.md)

  ↳ [`NodeFileSystemLoader`](NodeFileSystemLoader.md)

  ↳ [`CachingNodeFileSystemLoader`](CachingNodeFileSystemLoader.md)

  ↳ [`MapLoader`](MapLoader.md)

  ↳ [`ObjectLoader`](ObjectLoader.md)

  ↳ [`FetchLoader`](FetchLoader.md)

  ↳ [`XMLHttpRequestLoader`](XMLHttpRequestLoader.md)

## Constructors

### constructor

• **new Loader**()

## Methods

### getSource

▸ `Abstract` **getSource**(`name`, `renderContext?`, `loaderContext?`): `Promise`<[`TemplateSource`](TemplateSource.md)\>

Override `getSource` to implement a custom loader.

**`throws`** [TemplateNotFoundError](TemplateNotFoundError.md)
Thrown if the template can not be found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name or identifier of a template. |
| `renderContext?` | [`RenderContext`](RenderContext.md) | The active render context, if there is one. |
| `loaderContext?` | `Object` | Additional context. By convention, tags that load templates should add a `tag` property to the loader context containing the tag's name. |

#### Returns

`Promise`<[`TemplateSource`](TemplateSource.md)\>

The source, with any meta data, for the template identified by
the given name

#### Defined in

[src/loader.ts:55](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/loader.ts#L55)

___

### getSourceSync

▸ `Abstract` **getSourceSync**(`name`, `renderContext?`, `loaderContext?`): [`TemplateSource`](TemplateSource.md)

A synchronous version of `getSource`.

**`see`** [getSource](Loader.md#getsource)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `renderContext?` | [`RenderContext`](RenderContext.md) |
| `loaderContext?` | `Object` |

#### Returns

[`TemplateSource`](TemplateSource.md)

#### Defined in

[src/loader.ts:65](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/loader.ts#L65)

___

### load

▸ **load**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): `Promise`<[`Template`](Template.md)\>

Used internally by `Environment.getTemplate()`. Delegates to `getSource`.

**`see`** [getSource](Loader.md#getsource). Override `load` to implement a caching loader.

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

#### Defined in

[src/loader.ts:75](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/loader.ts#L75)

___

### loadSync

▸ **loadSync**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): [`Template`](Template.md)

A synchronous version of `load`.

**`see`** [load](Loader.md#load)

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

#### Defined in

[src/loader.ts:90](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/loader.ts#L90)
