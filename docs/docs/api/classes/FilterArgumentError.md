---
id: "FilterArgumentError"
title: "Class: FilterArgumentError"
sidebar_label: "FilterArgumentError"
sidebar_position: 0
custom_edit_url: null
---

An error thrown when there's a problem with one or more filter arguments.

## Hierarchy

- [`InternalLiquidError`](InternalLiquidError.md)

  ↳ **`FilterArgumentError`**

## Constructors

### constructor

• **new FilterArgumentError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[InternalLiquidError](InternalLiquidError.md).[constructor](InternalLiquidError.md#constructor)

#### Defined in

[src/errors.ts:356](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L356)

## Properties

### message

• **message**: `string`

#### Inherited from

[InternalLiquidError](InternalLiquidError.md).[message](InternalLiquidError.md#message)

___

### name

• **name**: `string`

#### Inherited from

[InternalLiquidError](InternalLiquidError.md).[name](InternalLiquidError.md#name)

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[InternalLiquidError](InternalLiquidError.md).[stack](InternalLiquidError.md#stack)

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

[InternalLiquidError](InternalLiquidError.md).[prepareStackTrace](InternalLiquidError.md#preparestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[InternalLiquidError](InternalLiquidError.md).[stackTraceLimit](InternalLiquidError.md#stacktracelimit)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:13

## Methods

### withToken

▸ **withToken**(`token`, `templateName?`): [`LiquidError`](LiquidError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | [`Token`](tokens.Token.md) |
| `templateName?` | `string` |

#### Returns

[`LiquidError`](LiquidError.md)

#### Overrides

[InternalLiquidError](InternalLiquidError.md).[withToken](InternalLiquidError.md#withtoken)

#### Defined in

[src/errors.ts:361](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L361)

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

[InternalLiquidError](InternalLiquidError.md).[captureStackTrace](InternalLiquidError.md#capturestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:4
