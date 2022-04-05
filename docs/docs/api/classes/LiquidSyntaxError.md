---
id: "LiquidSyntaxError"
title: "Class: LiquidSyntaxError"
sidebar_label: "LiquidSyntaxError"
sidebar_position: 0
custom_edit_url: null
---

An error thrown when a template syntax error is found.

## Hierarchy

- [`LiquidError`](LiquidError.md)

  ↳ **`LiquidSyntaxError`**

## Constructors

### constructor

• **new LiquidSyntaxError**(`message`, `token`, `templateName?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `token` | [`Token`](tokens.Token.md) |
| `templateName?` | `string` |

#### Overrides

[LiquidError](LiquidError.md).[constructor](LiquidError.md#constructor)

#### Defined in

[src/errors.ts:28](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L28)

## Properties

### message

• **message**: `string`

#### Inherited from

[LiquidError](LiquidError.md).[message](LiquidError.md#message)

___

### name

• **name**: `string`

#### Inherited from

[LiquidError](LiquidError.md).[name](LiquidError.md#name)

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1022

___

### originalMessage

• **originalMessage**: `string`

#### Defined in

[src/errors.ts:25](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L25)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[LiquidError](LiquidError.md).[stack](LiquidError.md#stack)

#### Defined in

docs/.yarn/cache/typescript-patch-30b732d1e2-6bf45caf84.zip/node_modules/typescript/lib/lib.es5.d.ts:1024

___

### token

• **token**: [`Token`](tokens.Token.md)

#### Defined in

[src/errors.ts:26](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L26)

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

[LiquidError](LiquidError.md).[prepareStackTrace](LiquidError.md#preparestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[LiquidError](LiquidError.md).[stackTraceLimit](LiquidError.md#stacktracelimit)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:13

## Methods

### withTemplateName

▸ **withTemplateName**(`templateName?`): [`LiquidSyntaxError`](LiquidSyntaxError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `templateName?` | `string` |

#### Returns

[`LiquidSyntaxError`](LiquidSyntaxError.md)

#### Defined in

[src/errors.ts:41](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/errors.ts#L41)

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

[LiquidError](LiquidError.md).[captureStackTrace](LiquidError.md#capturestacktrace)

#### Defined in

.yarn/cache/@types-node-npm-17.0.21-7d68eb6a13-89dcd2fe82.zip/node_modules/@types/node/globals.d.ts:4
