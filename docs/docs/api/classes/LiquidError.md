---
id: "LiquidError"
title: "Class: LiquidError"
sidebar_label: "LiquidError"
sidebar_position: 0
custom_edit_url: null
---

The base class for all user-facing Liquid errors.

## Hierarchy

- `Error`

  ↳ **`LiquidError`**

  ↳↳ [`LiquidSyntaxError`](LiquidSyntaxError.md)

  ↳↳ [`LiquidTypeError`](LiquidTypeError.md)

  ↳↳ [`LiquidFilterValueError`](LiquidFilterValueError.md)

  ↳↳ [`LiquidFilterArgumentError`](LiquidFilterArgumentError.md)

  ↳↳ [`NoSuchTagError`](NoSuchTagError.md)

  ↳↳ [`NoSuchFilterError`](NoSuchFilterError.md)

  ↳↳ [`ContextDepthError`](ContextDepthError.md)

  ↳↳ [`LiquidUndefinedError`](LiquidUndefinedError.md)

  ↳↳ [`NoSuchTemplateError`](NoSuchTemplateError.md)

  ↳↳ [`OrphanedBreakTagError`](OrphanedBreakTagError.md)

  ↳↳ [`OrphanedContinueTagError`](OrphanedContinueTagError.md)

  ↳↳ [`DisabledTagError`](DisabledTagError.md)

## Constructors

### constructor

• **new LiquidError**(`message`, `token`, `templateName?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `token` | [`Token`](tokens.Token.md) |
| `templateName?` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/errors.ts:10](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L10)

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
