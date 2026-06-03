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

### Paths

[`Template.variablePaths()`](./api/classes/Template.md#variablepaths) and [`Template.variablePathsSync()`](./api/classes/Template.md#variablepathssync) return an array of variables, including all path segments. The resulting array will include variables that are local to the template, like those created with `{% assign %}`, or are in scope from `{% for %}` tags.

```js
// ... continued from above
console.log(template.variablePathsSync());
```

```json title="output"
["you", "you.first_name", "you.last_name", "x", "ch"]
```

### Segments

[`Template.variableSegments()`](./api/classes/Template.md#variablesegments) and [`Template.variableSegmentsSync()`](./api/classes/Template.md#variablesegmentssync) return an array of variables as a nested array of segments. The resulting array will include variables that are local to the template, like those created with `{% assign %}`, or are in scope from `{% for %}` tags.

```js
// ... continued from above
console.log(template.variableSegmentsSync());
```

```json title="output"
[["you"], ["you", "first_name"], ["you", "last_name"], ["x"], ["ch"]]
```

## Global variables

[`Template.globalVariables()`](./api/classes/Template.md#globalvariables) and [`Template.globalVariablesSync()`](./api/classes/Template.md#globalvariablessync) return an array of top-level variable names excluding _local_ and block scoped names.

Notice that `x` and `ch` are excluded from this result compared to `variablesSync()` above.

```js
// ... continued from above
console.log(template.globalVariablesSync());
```

```json title="output"
["you"]
```

### Paths

[`Template.globalVariablePaths()`](./api/classes/Template.md#globalvariablepaths) and [`Template.globalVariablePathsSync()`](./api/classes/Template.md#globalvariablepathssync) return an array global variables including path segments.

```js
// ... continued from above
console.log(template.globalVariablePathsSync());
```

```json title="output"
["you", "you.first_name", "you.last_name"]
```

### Segments

[`Template.globalVariableSegments()`](./api/classes/Template.md#globalvariablesegments) and [`Template.globalVariableSegmentsSync()`](./api/classes/Template.md#globalvariablesegmentssync) return an array global variables as nested arrays of segments.

```js
// ... continued from above
console.log(template.globalVariableSegmentsSync());
```

```json title="output"
[["you"], ["you", "first_name"], ["you", "last_name"]]
```

## Filter names

[`Template.filterNames()`](./api/classes/Template.md#filternames) and [`Template.filterNamesSync()`](./api/classes/Template.md#filternamessync) return an array of filter names that appear in the template.

```js
// ... continued from above
console.log(template.filterNamesSync());
```

```json title="output"
["upcase", "capitalize"]
```

## Tag names

[`Template.tagNames()`](./api/classes/Template.md#tagnames) and [`Template.tagNamesSync()`](./api/classes/Template.md#tagnamessync) return an array of tag names that appear in the template.

```js
// ... continued from above
console.log(template.tagNamesSync());
```

```json title="output"
james@Jamess-Mac-mini liquidscript % bun run dev.ts
[ "assign", "for" ]
```

## Variable, tag and filter locations

[`Template.analyze()`](./api/classes/Template.md#analyze) and [`Template.analyzeSync()`](./api/classes/Template.md#analyzesync) return an instance of [`TemplateAnalysis`](./api/classes/TemplateAnalysis.md) containing all of the information provided by the other methods described on this page, plus the location (template name, span, line and column numbers) of every variable, tag and filter, each of which can appear many times across many templates.

## Comment and doc nodes

[`Template.comments()`](./api/classes/Template.md#comments) and [`Template.docs()`](./api/classes/Template.md#docs) return an array of `CommentTag | InlineCommentTag` and `DocTag`, respectively. All of which have `token` and `text` properties.

```js
import { parse } from "liquidscript";

const template = parse(`\
{% doc %}
    some doc comment
{% enddoc %}

Hello!

{% comment %}
    some comment
{% endcomment %}

{% if false %}
    {% # an inline comment %}
{% endif %}`);

console.log(template.comments().map((node) => node.text));
console.log(template.docs().map((node) => node.text));
```

```json title="output"
[ "\n    some comment\n", " an inline comment " ]
[ "\n    some doc comment\n" ]
```
