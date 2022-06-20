---
title: Compatibility
description: Known incompatibilities between LiquidScript and Ruby Liquid
hide_table_of_contents: false
---

# Known Issues

This page documents known compatibility issues between LiquidScript and the [reference implementation](https://shopify.github.io/liquid/) of Liquid, written in Ruby. We strive to be 100% compatible with the reference implementation. That is, given an equivalent render context, a template rendered with LiquidScript should produce the same output as when rendered with Ruby Liquid.

## Coercing Strings to Integers Inside Filters

Many filters built in to Liquid will automatically convert a string representation of a number to an integer or float as needed. When converting integers, Ruby Liquid uses [Ruby's String.to_i method](https://ruby-doc.org/core-3.1.1/String.html#method-i-to_i), which will disregard trailing non-digit characters. In the following example, `'7,42'` is converted to `7`

**template:**

```liquid
{{ 3.14 | plus: '7,42' }}
{{ '123abcdef45' | plus: '1,,,,..!@qwerty' }}
```

**output**

```plain
10.14
124
```

LiquidScript (and Python Liquid) currently falls back to `0` for any string that can't be converted to an integer in its entirety. As is the case in Ruby Liquid for strings without leading digits.

This does not apply to parsing of integer literals, only converting strings to integers (not floats) inside filters.

## Comment Parsing

LiquidScript will throw a `LiquidSyntaxError` if it finds the string `{% endcomment %}` inside a comment block. Ruby Liquid, on the other hand, will successfully parse fully-formed nested comment blocks, but will fail to parse a comment block containing either a `{% comment %}` or `{% endcomment %}` on its own.

## Counters

In Ruby Liquid, the built-in [`increment`](/language/tags#increment) and [`decrement`](/language/tags#decrement) tags can, in some cases, mutate "global" context and keep named counters alive between renders. Although not difficult to implement, I can't quite bring myself to do it.

## Cycle Arguments

LiquidScript will accept [`cycle`](/language/tags#cycle) arguments of any type, including identifiers to be resolved, this behavior is considered "unintended" or "undefined" in Ruby Liquid (see [issue #1519](https://github.com/Shopify/liquid/issues/1519)). If you need interoperability between LiquidScript and Ruby Liquid, only use strings or numbers as arguments to `cycle`.

## Cycle Groups

When the [`cycle`](/language/tags#cycle) tag is given a name, LiquidScript will use that name and all other arguments to distinguish one cycle from another. Ruby Liquid will disregard all other arguments when given a name. For example.

```liquid
{% cycle a: 1, 2, 3 %}
{% cycle a: "x", "y", "z" %}
{% cycle a: 1, 2, 3 %}
```

**Ruby Liquid Output:**

```plain
1
y
3
```

**LiquidScript Output:**

```plain
1
x
2
```

## The Date Filter

The built-in [`date`](/language/filters#date) filter does not perform fuzzy date/time string parsing. Using [luxon](https://github.com/moment/luxon/) internally, it can parse well formed ISO 8601, SQL, Unix timestamp, HTTP and RFC2822 formatted date/time strings.

## Error Handling

LiquidScript does not have a "lax" parser or a "lax" mode. LiquidScript might not handle syntax or type errors in the same way as the reference implementation. We might fail earlier or later, and will almost certainly produce a different error message.

## Floats in Ranges

If a range literal uses a float literal as its start or stop value, the float literal must have something after the decimal point. This is OK `(1.0..3)`. This is not `(1...3)`. Ruby Liquid will accept either, resulting in a sequence of `[1,2,3]`.
