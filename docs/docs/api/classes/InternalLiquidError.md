---
id: "InternalLiquidError"
title: "Class: InternalLiquidError"
sidebar_label: "InternalLiquidError"
sidebar_position: 0
custom_edit_url: null
---

The base class for all internal Liquid errors.

## Hierarchy

- `Error`

  ↳ **`InternalLiquidError`**

  ↳↳ [`ReadOnlyObjectChainError`](ReadOnlyObjectChainError.md)

  ↳↳ [`InternalKeyError`](InternalKeyError.md)

  ↳↳ [`InternalUndefinedError`](InternalUndefinedError.md)

  ↳↳ [`MaxContextDepthError`](MaxContextDepthError.md)

  ↳↳ [`TemplateNotFoundError`](TemplateNotFoundError.md)

  ↳↳ [`PushedTooFarError`](PushedTooFarError.md)

  ↳↳ [`FilterNotFoundError`](FilterNotFoundError.md)

  ↳↳ [`FilterValueError`](FilterValueError.md)

  ↳↳ [`FilterArgumentError`](FilterArgumentError.md)

  ↳↳ [`InternalTypeError`](InternalTypeError.md)

## Constructors

### constructor

• **new InternalLiquidError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/errors.ts:221](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L221)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1024

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:13

## Methods

### withToken

▸ `Abstract` **withToken**(`token`, `templateName?`): [`LiquidError`](LiquidError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `templateName?` | `string` |

#### Returns

[`LiquidError`](LiquidError.md)

#### Defined in

[src/errors.ts:226](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L226)

___

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:4
