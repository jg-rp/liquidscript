---
id: "LiquidKeyError"
title: "Class: LiquidKeyError"
sidebar_label: "LiquidKeyError"
sidebar_position: 0
custom_edit_url: null
---

An error thrown by a Liquid {@link Drop} dispatch method if a name does not exist.

## Hierarchy

- [`InternalKeyError`](InternalKeyError.md)

  ↳ **`LiquidKeyError`**

## Constructors

### constructor

• **new LiquidKeyError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[InternalKeyError](InternalKeyError.md).[constructor](InternalKeyError.md#constructor)

#### Defined in

[src/errors.ts:261](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L261)

## Properties

### message

• **message**: `string`

#### Inherited from

[InternalKeyError](InternalKeyError.md).[message](InternalKeyError.md#message)

___

### name

• **name**: `string`

#### Inherited from

[InternalKeyError](InternalKeyError.md).[name](InternalKeyError.md#name)

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[InternalKeyError](InternalKeyError.md).[stack](InternalKeyError.md#stack)

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

[InternalKeyError](InternalKeyError.md).[prepareStackTrace](InternalKeyError.md#preparestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[InternalKeyError](InternalKeyError.md).[stackTraceLimit](InternalKeyError.md#stacktracelimit)

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

#### Inherited from

[InternalKeyError](InternalKeyError.md).[withToken](InternalKeyError.md#withtoken)

#### Defined in

[src/errors.ts:252](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L252)

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

[InternalKeyError](InternalKeyError.md).[captureStackTrace](InternalKeyError.md#capturestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:4
