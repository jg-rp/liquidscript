---
id: "FetchLoader"
title: "Class: FetchLoader"
sidebar_label: "FetchLoader"
sidebar_position: 0
custom_edit_url: null
---

A template loader that fetches templates using the Fetch API.

This is an async only loader. Expect an error when using this
loader with `getSourceSync()` and `Environment.getTemplateSync()`.

This loader treats the response body as text that is the template
source code. You might need to write a custom loader to handle
JSON responses, for example.

## Hierarchy

- [`Loader`](Loader.md)

  ↳ **`FetchLoader`**

## Constructors

### constructor

• **new FetchLoader**(`baseURL`, `options?`)

The `FetchLoader` constructor. Creates a new `FetchLoader`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL` | `string` | The base URL from which to fetch templates from. |
| `options` | [`FetchLoaderOptions`](../modules.md#fetchloaderoptions) | Loader options. Most of which are passed through to the Fetch API's `Request` constructor. |

#### Overrides

[Loader](Loader.md).[constructor](Loader.md#constructor)

#### Defined in

[src/builtin/loaders/fetch_loader.ts:61](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/fetch_loader.ts#L61)

## Properties

### #init

• `Private` **#init**: `init`

#### Defined in

[src/builtin/loaders/fetch_loader.ts:51](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/fetch_loader.ts#L51)

___

### baseURL

• `Readonly` **baseURL**: `string`

#### Defined in

[src/builtin/loaders/fetch_loader.ts:50](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/fetch_loader.ts#L50)

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

[src/builtin/loaders/fetch_loader.ts:73](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/fetch_loader.ts#L73)

___

### getSourceSync

▸ **getSourceSync**(): [`TemplateSource`](TemplateSource.md)

A synchronous version of `getSource`.

#### Returns

[`TemplateSource`](TemplateSource.md)

#### Overrides

[Loader](Loader.md).[getSourceSync](Loader.md#getsourcesync)

#### Defined in

[src/builtin/loaders/fetch_loader.ts:82](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/fetch_loader.ts#L82)

___

### load

▸ **load**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): `Promise`<[`Template`](Template.md)\>

Used internally by `Environment.getTemplate()`. Delegates to `getSource`.

**`see`** [getSource](FetchLoader.md#getsource). Override `load` to implement a caching loader.

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

**`see`** [load](FetchLoader.md#load)

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
