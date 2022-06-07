# Template Static Analysis

**_New in version 1.3.0_**

Use the [`analyze()`](../api/classes/Template.md#analyze) or [`analyzeSync()`](../api/classes/Template.md#analyzesync) methods of a Liquid [`Template`](../api/classes/Template.md) to traverse its abstract syntax tree and report template variable usage.

## All Template Variables

The [`TemplateAnalysis`](../api/modules.md#templateanalysis) object returned from [`Template.analyze()`](../api/classes/Template.md#analyze) includes a `variables` property, mapping template variable names to arrays of locations where those names occur. Each location is an object with a `templateName` and `lineNumber` property.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString(`\
{% assign people = "Sally, John, Brian, Sue" | split: ", " %}
{{ people }}
{% for name in people %}
    {{ forloop.index }} - {{ greeting }}, {{ name }}!
{% endfor %}`);

const analysis = template.analyzeSync();
console.log(Object.keys(analysis.variables));

for (const [name, locations] of Object.entries(analysis.variables)) {
  for (const { templateName, lineNumber } of locations) {
    console.log(`'${name}' found in '${templateName}' on line ${lineNumber}`);
  }
}
```

```plain title="output"
['people', 'forloop.index', 'greeting', 'name']
'people' found in '<string>' on line 2
'people' found in '<string>' on line 3
'forloop.index' found in '<string>' on line 4
'greeting' found in '<string>' on line 4
'name' found in '<string>' on line 4
```

## Global Template Variables

The `globalVariables` property of a [`TemplateAnalysis`](../api/modules.md#templateanalysis) object is similar to `variables`, but only includes those variables that are not in scope from previous `assign`, `capture`, `increment` or `decrement` tags, or added to a block's scope by a block tag.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString(`\
{% assign people = "Sally, John, Brian, Sue" | split: ", " %}
{{ people }}
{% for name in people %}
    {{ forloop.index }} - {{ greeting }}, {{ name }}!
{% endfor %}`);

const analysis = template.analyzeSync();
console.log("all variables:", Object.keys(analysis.variables));
console.log("global variables:", Object.keys(analysis.globalVariables));
```

```plain title="output"
all variables:  ['people', 'forloop.index', 'greeting', 'name']
global variables:  ['greeting']
```

While `greeting` is assumed to be global (that is, provided by application developers rather than a template author), LiquidScript knows that `forloop` is in scope for the duration of the `for` block. If `people` were referenced before being assigned, we'd see an entry in the `people` array for each location where it is out of scope.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString(`\
{{ people }}
{% assign people = "Sally, John, Brian, Sue" | split: ", " %}
{{ people }}`);

const analysis = template.analyzeSync();

for (const [name, locations] of Object.entries(a.globalVariables)) {
  for (const { templateName, lineNumber } of locations) {
    console.log(
      `'${name}' is out of scope in '${templateName}' on line ${lineNumber}`
    );
  }
}
```

```plain title="output"
'people' is out of scope in '<string>' on line 1
```

## Local Template Variables

The `localVariables` property of a [`TemplateAnalysis`](../api/modules.md#templateanalysis) object is, again, a mapping of template variable names to their locations. Each entry is the location of an `assign`, `capture`, `increment`, or `decrement` tag (or any custom tag that introduces names into the template local namespace) that initializes or updates the variable.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString(`\
{% assign people = "Sally, John, Brian, Sue" | split: ", " %}
{% assign people = "Bob, Frank" | split: ", " %}`);

const analysis = template.analyzeSync();

for (const [name, locations] of Object.entries(a.localVariables)) {
  for (const { templateName, lineNumber } of locations) {
    console.log(
      `'${name}' assigned in '${templateName}' on line ${lineNumber}`
    );
  }
}
```

```plain title="output"
'people' assigned in '<string>' on line 1
'people' assigned in '<string>' on line 2
```

## Analyzing Partial Templates

When the `followPartials` option to [`Template.analyze()`](../api/classes/Template.md#analyze) is `true` (the default), LiquidScript will attempt to load and analyze templates from `include` and `render` tags. In the case of `include`, this is only possible when the template name is a string literal.

```javascript
import { Environment, ObjectLoader } from "liquidscript";

const templates = {
  layout: `"\
        {% include 'nav', title: page_name %}
        {% render 'foot' with website as site_name %}
    `,
  nav: "{{ title }} nav bar",
  foot: "a footer for {{ site_name }}",
};

const env = new Environment({ loader: new ObjectLoader(templates) });
const layout = env.getTemplateSync("layout");

const analysis = layout.analyzeSync({ followPartials: true });
console.log(analysis.variables);
```

```plain title="output"
{
  title: [ { templateName: 'nav', lineNumber: 1 } ],
  page_name: [ { templateName: 'layout', lineNumber: 1 } ],
  site_name: [ { templateName: 'foot', lineNumber: 1 } ],
  website: [ { templateName: 'layout', lineNumber: 2 } ]
}
```

When the `raiseForFailures` option is `true` (the default), we should expect a [`TemplateTraversalError`](../api/classes/TemplateTraversalError.md) to be thrown if a partial template can not be loaded. If `raiseForFailures` is `false`, a mapping of unloadable `include`/`render` tags is available as `TemplateAnalysis.unloadablePartials`.

```javascript
import { Environment, ObjectLoader } from "liquidscript";

const templates = {
  layout: `"\
        {% include 'nav', title: page_name %}
        {% render 'foot' with website as site_name %}
    `,
};

const env = new Environment({ loader: new ObjectLoader(templates) });
const layout = env.getTemplateSync("layout");

const analysis = layout.analyzeSync({
  followPartials: true,
  raiseForFailures: false,
});
console.log(analysis.unloadablePartials);
```

```plain title="output"
{
  nav: [ { templateName: 'layout', lineNumber: 1 } ],
  foot: [ { templateName: 'layout', lineNumber: 2 } ]
}
```

## Analyzing Custom Tags

All built-in tags (the tag's `Node` and `Expression` objects) implement a `children()` method. When analyzing a custom tag that does not implement `children()`, and with the `raiseForFailures` argument set to `true` (the default), LiquidSCript will raise a [`TemplateTraversalError`](../api/classes/TemplateTraversalError.md). When `raiseForFailures` is `false`, a mapping of unvisitable AST nodes and expressions is available as `TemplateAnalysis.failedVisits`.

```typescript
import {
  Environment,
  Node,
  ObjectLoader,
  RenderContext,
  RenderStream,
  Tag,
  tokens,
} from "liquidscript";

class ExampleNode implements Node {
  constructor(readonly token: tokens.Token) {}

  async render(context: RenderContext, out: RenderStream): Promise<void> {
    out.write("example node");
  }

  renderSync(context: RenderContext, out: RenderStream): void {
    out.write("example node");
  }

  // This node does not implement `children()`
}

class ExampleTag implements Tag {
  parse(stream: tokens.TokenStream): Node {
    return new ExampleNode(stream.current);
  }

  // This tag does not implement `children()`
}

const templates = {
  layout: "{% example %}",
};

const env = new Environment({ loader: new ObjectLoader(templates) });
env.addTag("example", new ExampleTag());

const layout = env.getTemplateSync("layout");
const analysis = layout.analyzeSync({
  followPartials: true,
  raiseForFailures: false,
});
console.log(analysis.failedVisits);
```

```plain title="output"
{ ExampleNode: [ { templateName: 'layout', lineNumber: 1 } ] }
```

[`Node.children()`](../api/interfaces/Node.md#children) should return an array of [`ChildNode`](../api/modules.md#childnode) objects. Each `ChildNode` includes a child [`Expression`](../api/interfaces/Expression.md) and/or [`Node`](../api/interfaces/Node.md), plus any names the tag adds to the template local scope or subsequent block scope. Please see [src/builtin/tags](https://github.com/jg-rp/liquidscript/tree/main/src/builtin/tags) for examples.

[`Expression.children()`](../api/interfaces/Expression.md#children) is expected to return an array of child `Expression`s. For example, [`RangeLiteral.children()`](../api/classes/RangeLiteral.md#children) returns an array containing expressions for its `start` and `stop` properties. Please see [src/expression.ts](https://github.com/jg-rp/liquidscript/blob/main/src/expression.ts) for examples.
