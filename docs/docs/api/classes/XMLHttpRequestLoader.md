---
id: "XMLHttpRequestLoader"
title: "Class: XMLHttpRequestLoader"
sidebar_label: "XMLHttpRequestLoader"
sidebar_position: 0
custom_edit_url: null
---

A template loader that uses XMLHttpRequest to fetch templates.

## Hierarchy

- [`Loader`](Loader.md)

  ↳ **`XMLHttpRequestLoader`**

## Constructors

### constructor

• **new XMLHttpRequestLoader**(`baseURL`, `options?`)

The `XMLHttpRequestLoader` constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseURL` | `string` | The base URL from which to fetch templates from. |
| `options` | [`XMLHttpRequestLoaderOptions`](../modules.md#xmlhttprequestloaderoptions) | Loader options. |

#### Overrides

[Loader](Loader.md).[constructor](Loader.md#constructor)

#### Defined in

[src/builtin/loaders/xml_http_request_loader.ts:26](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L26)

## Properties

### baseURL

• `Readonly` **baseURL**: `string`

#### Defined in

[src/builtin/loaders/xml_http_request_loader.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L17)

___

### bustBrowserCache

• `Readonly` **bustBrowserCache**: `boolean`

#### Defined in

[src/builtin/loaders/xml_http_request_loader.ts:18](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L18)

## Methods

### fetch

▸ `Protected` **fetch**(`url`): `Promise`<`XMLHttpRequest`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Promise`<`XMLHttpRequest`\>

#### Defined in

[src/builtin/loaders/xml_http_request_loader.ts:69](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L69)

___

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

[src/builtin/loaders/xml_http_request_loader.ts:32](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L32)

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

[src/builtin/loaders/xml_http_request_loader.ts:43](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L43)

___

### load

▸ **load**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): `Promise`<[`Template`](Template.md)\>

Used internally by `Environment.getTemplate()`. Delegates to `getSource`.

**`see`** [getSource](XMLHttpRequestLoader.md#getsource). Override `load` to implement a caching loader.

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

**`see`** [load](XMLHttpRequestLoader.md#load)

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

___

### url

▸ `Protected` **url**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/builtin/loaders/xml_http_request_loader.ts:56](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/xml_http_request_loader.ts#L56)
