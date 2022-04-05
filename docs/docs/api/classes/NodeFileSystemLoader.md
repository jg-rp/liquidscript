---
id: "NodeFileSystemLoader"
title: "Class: NodeFileSystemLoader"
sidebar_label: "NodeFileSystemLoader"
sidebar_position: 0
custom_edit_url: null
---

A template loader that reads templates from a file system when deployed
to the NodeJS runtime.

## Hierarchy

- [`Loader`](Loader.md)

  ↳ **`NodeFileSystemLoader`**

## Constructors

### constructor

• **new NodeFileSystemLoader**(`searchPath`, `options?`)

The `NodeFileSystemLoader` constructor. Create a new `NodeFileSystemLoader`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchPath` | `string` \| `string`[] | A path, or array of paths, to search for templates. |
| `options` | [`NodeFileSystemLoaderOptions`](../modules.md#nodefilesystemloaderoptions) | Loader options. |

#### Overrides

[Loader](Loader.md).[constructor](Loader.md#constructor)

#### Defined in

[src/builtin/loaders/file_system_loader.ts:65](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L65)

## Properties

### encoding

• `Readonly` **encoding**: `BufferEncoding`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:55](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L55)

___

### fileExtension

• `Readonly` **fileExtension**: `string`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:56](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L56)

___

### searchPath

• `Readonly` **searchPath**: `string`[]

#### Defined in

[src/builtin/loaders/file_system_loader.ts:57](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L57)

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

[src/builtin/loaders/file_system_loader.ts:75](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L75)

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

[src/builtin/loaders/file_system_loader.ts:81](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L81)

___

### load

▸ **load**(`name`, `environment`, `context?`, `globals?`, `loaderContext?`): `Promise`<[`Template`](Template.md)\>

Used internally by `Environment.getTemplate()`. Delegates to `getSource`.

**`see`** [getSource](NodeFileSystemLoader.md#getsource). Override `load` to implement a caching loader.

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

**`see`** [load](NodeFileSystemLoader.md#load)

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

### resolve

▸ `Protected` **resolve**(`name`): `Promise`<`string`\>

Find the path to the template file with the given name.

**`throws`** [TemplateNotFoundError](TemplateNotFoundError.md)
If a file with the given name can not be found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | A template file name relative to one of the paths in the current search path. |

#### Returns

`Promise`<`string`\>

The template file name joined with the first path in the
configured search path that is a file.

#### Defined in

[src/builtin/loaders/file_system_loader.ts:112](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L112)

___

### resolveSync

▸ `Protected` **resolveSync**(`name`): `string`

A synchronous version of [resolve](NodeFileSystemLoader.md#resolve).

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/builtin/loaders/file_system_loader.ts:130](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L130)

___

### withFileExtension

▸ `Protected` **withFileExtension**(`name`): `string`

Append the default file extension if the given template name does
not have one.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | A template file name relative to one of the paths in the current search path. |

#### Returns

`string`

The argument name with the default file extension, if it did
not already have one.

#### Defined in

[src/builtin/loaders/file_system_loader.ts:97](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/builtin/loaders/file_system_loader.ts#L97)
