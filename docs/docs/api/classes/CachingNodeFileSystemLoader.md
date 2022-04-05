---
id: "CachingNodeFileSystemLoader"
title: "Class: CachingNodeFileSystemLoader"
sidebar_label: "CachingNodeFileSystemLoader"
sidebar_position: 0
custom_edit_url: null
---

A template loader that caches templates read from a file system.

## Hierarchy

- [`Loader`](Loader.md)

  ↳ **`CachingNodeFileSystemLoader`**

## Constructors

### constructor

• **new CachingNodeFileSystemLoader**(`searchPath`, `options?`)

The `CachingNodeFileSystemLoader` constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchPath` | `string` \| `string`[] | A path, or array of paths, to search for templates. |
| `options` | [`CachingNodeFileSystemLoaderOptions`](../modules.md#cachingnodefilesystemloaderoptions) | Loader options. |

#### Overrides

[Loader](Loader.md).[constructor](Loader.md#constructor)

#### Defined in

[src/builtin/loaders/file_system_loader.ts:163](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L163)

## Properties

### #cache

• `Private` **#cache**: `LRUCache`<`string`, [`Template`](Template.md)\>

#### Defined in

[src/builtin/loaders/file_system_loader.ts:155](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L155)

___

### autoReload

• `Readonly` **autoReload**: `boolean`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:150](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L150)

___

### cacheSize

• `Readonly` **cacheSize**: `number`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:151](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L151)

___

### encoding

• `Readonly` **encoding**: `BufferEncoding`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:152](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L152)

___

### fileExtension

• `Readonly` **fileExtension**: `string`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:153](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L153)

___

### searchPath

• `Readonly` **searchPath**: `string`[]

#### Defined in

[src/builtin/loaders/file_system_loader.ts:154](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L154)

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

[src/builtin/loaders/file_system_loader.ts:210](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L210)

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

[src/builtin/loaders/file_system_loader.ts:225](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L225)

___

### load

▸ **load**(`name`, `environment`, `context?`, `globals?`): `Promise`<[`Template`](Template.md)\>

Used internally by `Environment.getTemplate()`. Delegates to `getSource`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `environment` | [`Environment`](Environment.md) |
| `context?` | [`RenderContext`](RenderContext.md) |
| `globals?` | [`ContextScope`](../modules.md#contextscope) |

#### Returns

`Promise`<[`Template`](Template.md)\>

#### Overrides

[Loader](Loader.md).[load](Loader.md#load)

#### Defined in

[src/builtin/loaders/file_system_loader.ts:246](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L246)

___

### loadSync

▸ **loadSync**(`name`, `environment`, `context?`, `globals?`): [`Template`](Template.md)

A synchronous version of `load`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `environment` | [`Environment`](Environment.md) |
| `context?` | [`RenderContext`](RenderContext.md) |
| `globals?` | [`ContextScope`](../modules.md#contextscope) |

#### Returns

[`Template`](Template.md)

#### Overrides

[Loader](Loader.md).[loadSync](Loader.md#loadsync)

#### Defined in

[src/builtin/loaders/file_system_loader.ts:269](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L269)

___

### resolve

▸ `Protected` **resolve**(`name`): `Promise`<[`string`, `number`]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<[`string`, `number`]\>

#### Defined in

[src/builtin/loaders/file_system_loader.ts:308](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L308)

___

### resolveSync

▸ `Protected` **resolveSync**(`name`): [`string`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`string`, `number`]

#### Defined in

[src/builtin/loaders/file_system_loader.ts:328](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L328)

___

### withFileExtension

▸ `Protected` **withFileExtension**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:297](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L297)

___

### upToDate

▸ `Static` **upToDate**(`templatePath`, `mtime`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `templatePath` | `string` |
| `mtime` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/builtin/loaders/file_system_loader.ts:187](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L187)

___

### upToDateSync

▸ `Static` **upToDateSync**(`templatePath`, `mtime`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `templatePath` | `string` |
| `mtime` | `number` |

#### Returns

`boolean`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:202](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L202)
