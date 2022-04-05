---
id: "Undefined"
title: "Class: Undefined"
sidebar_label: "Undefined"
sidebar_position: 0
custom_edit_url: null
---

The base class for objects wrapping undefined variables found in
Liquid templates.

## Hierarchy

- **`Undefined`**

  ↳ [`LaxUndefined`](LaxUndefined.md)

  ↳ [`StrictUndefined`](StrictUndefined.md)

## Constructors

### constructor

• **new Undefined**(`name`, `object?`, `hint?`)

Create a new `Undefined` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the undefined variable. |
| `object?` | `unknown` | The target object which does not have a property with the given name. |
| `hint?` | `string` | Optionally override the default "undefined" message. |

#### Defined in

[src/undefined.ts:17](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L17)

## Properties

### hint

• `Optional` `Readonly` **hint**: `string`

___

### name

• `Readonly` **name**: `string`

___

### object

• `Optional` `Readonly` **object**: `unknown`

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/undefined.ts:23](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/undefined.ts#L23)
