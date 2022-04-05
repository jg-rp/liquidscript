---
id: "TemplateSource"
title: "Class: TemplateSource"
sidebar_label: "TemplateSource"
sidebar_position: 0
custom_edit_url: null
---

Represents a Liquid template's source code and additional meta data.

## Constructors

### constructor

• **new TemplateSource**(`source`, `name`, `matter?`, `uptoDate?`, `uptoDateSync?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |
| `name` | `string` |
| `matter?` | [`ContextScope`](../modules.md#contextscope) |
| `uptoDate?` | () => `Promise`<`boolean`\> |
| `uptoDateSync?` | () => `boolean` |

#### Defined in

[src/loader.ts:9](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/loader.ts#L9)

## Properties

### matter

• `Optional` `Readonly` **matter**: [`ContextScope`](../modules.md#contextscope)

___

### name

• `Readonly` **name**: `string`

___

### source

• `Readonly` **source**: `string`

___

### uptoDate

• `Optional` `Readonly` **uptoDate**: () => `Promise`<`boolean`\>

#### Type declaration

▸ (): `Promise`<`boolean`\>

A function that returns `true` if the template is up to date, or
`false` if it needs to be loaded again.

##### Returns

`Promise`<`boolean`\>

___

### uptoDateSync

• `Optional` `Readonly` **uptoDateSync**: () => `boolean`

#### Type declaration

▸ (): `boolean`

A function that returns `true` if the template is up to date, or
`false` if it needs to be loaded again.

##### Returns

`boolean`
