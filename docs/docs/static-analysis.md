# Static template analysis

Instances of [`Template`](./api/classes/Template.md) - as returned by [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate), [`Environment.getTemplateSync()`](./api/classes/Environment.md#gettemplatesync), [`Environment.parse()`](./api/classes/Environment.md#parse) and [`parse()`](./api/functions/parse.md) - include methods for inspecting a template's variable, tag a filter usage, without rendering the template.

By default, all of the following methods will try to load and analyze partial templates via `{% include %}`, `{% render %}` or `{% extends %}`. Set the `includePartials` option to `false` when calling these methods to ignore partial templates.

## All variables

[`Template.variables()`](./api/classes/Template.md#variables) and [`Template.variablesSync()`](./api/classes/Template.md#variablessync) return an array of distinct, top-level variable names, without path segments. The resulting array will include variables that are local to the template, like those created with `{% assign %}`, or are in scope from `{% for %}` tags.

```js
import { parse } from "liquidscript";

const template = parse(`\
Hello, {{ you }}!
{% assign x = 'foo' | upcase %}

{% for ch in x %}
    - {{ ch }}
{% endfor %}

Goodbye, {{ you.first_name | capitalize }} {{ you.last_name }}
Goodbye, {{ you.first_name }} {{ you.last_name }}`);

console.log(template.variablesSync());
```

```json title="output"
["you", "x", "ch"]
```

## All variable paths

[`Template.variablePaths()`](./api/classes/Template.md#variablePaths) and [`Template.variablePathsSync()`](./api/classes/Template.md#variablepathssync) return an array of variables, including all path segments. The resulting array will include variables that are local to the template, like those created with `{% assign %}`, or are in scope from `{% for %}` tags.

```js
// ... continued from above
console.log(template.variablePathsSync());
```

```json title="output"
["you", "you.first_name", "you.last_name", "x", "ch"]
```

## All variable segments

[`Template.variableSegments()`](./api/classes/Template.md#variableSegments) and [`Template.variableSegmentsSync()`](./api/classes/Template.md#variablesegmentssync) return an array of variables as a nested array of segments. The resulting array will include variables that are local to the template, like those created with `{% assign %}`, or are in scope from `{% for %}` tags.

```js
// ... continued from above
console.log(template.variableSegmentsSync());
```

```json title="output"
[["you"], ["you", "first_name"], ["you", "last_name"], ["x"], ["ch"]]
```

## Global variables

TODO:

## Global variable paths

TODO:

## Global variable segments

TODO:

## Filter names

TODO:

## Tag names

TODO:

## Variable, tag and filter locations

TODO:

## Comment and doc nodes

TODO:
