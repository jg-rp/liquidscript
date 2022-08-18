# Resource Limits

**_New in version 1.4.0_**

For deployments where template authors are untrusted, you can set limits on some resources to avoid malicious templates from consuming too much memory or too many CPU cycles.

```js
import { Environment } from "liquidscript";

const env = new Environment({
  maxContextDepth: 30,
  localNamespaceLimit: 3000,
  loopIterationLimit: 1000,
  outputStreamLimit: 15000,
});

const template = env.fromString(`
{% for x in (1..1000000) %}
{% for y in (1..1000000) %}
  {{ x }},{{ y }}
{% endfor %}
{% endfor %}
`);

template.renderSync();
// LoopIterationLimitError: loop iteration limit reached (<string>:2)
```

## Context Depth Limit

The maximum number of times a render context can be copied or extended before a [`ContextDepthError`](../api/classes/ContextDepthError.md) is thrown. This helps us guard against recursive use of the `include` or `render` tags.

The [`maxContextDepth`](../api/classes/Environment.md#maxcontextdepth) option defaults to `30`.

```js
import { Environment, ObjectLoader } from "liquidscript";

const templates = {
  foo: "{% render 'bar' %}",
  bar: "{% render 'foo' %}",
};

const env = new Environment({
  loader: new ObjectLoader(templates),
  maxContextDepth: 30,
});

const template = env.fromString("{% render 'foo' %}");
template.renderSync();
// ContextDepthError: maximum context depth reached, possible recursive render (bar:1)
```

## Local Namespace Limit

The maximum "size" of a render context local namespace. Rather than the number of bytes in memory a local namespace occupies, "size" is a non-specific indication of how much a template uses the local namespace when it is rendered, typically using the `assign` and `capture` tags.

If the [`localNamespaceLimit`](../api/classes/Environment.md#localnamespacelimit) option is `undefined` or less than `0`, there is no limit. Otherwise a [`LocalNamespaceLimitError`](../api/classes/LocalNamespaceLimitError.md) is thrown when the namespace's size exceeds the limit.

```js
import { Environment } from "liquidscript";

const env = new Environment({
  localNamespaceLimit: 50, // Very low, for demonstration purposes.
});

const template = env.fromString(
  '{% assign x = "Nunc est nulla, pellentesque ac dui id erat curae." %}'
);

template.renderSync();
// LocalNamespaceLimitError: local namespace limit reached (<string>:1)
```

## Loop Iteration Limit

The maximum number of loop iteration allowed before a [`LoopIterationLimitError`](../api/classes/LoopIterationLimitError.md) is thrown.

If the [`loopIterationLimit`](../api/classes/Environment.md#loopiterationlimit) option is `undefined` or less than `0`, there is no soft limit.

```js
import { Environment } from "liquidscript";

const env = new Environment({
  loopIterationLimit: 999,
});

const template = env.fromString(`
{% for x in (1..100) %}
{% for y in (1..100) %}
  {{ x }},{{ y }}
{% endfor %}
{% endfor %}
`);

template.renderSync();
// LoopIterationLimitError: loop iteration limit reached (<string>:2)
```

Other built in tags that contribute to the loop iteration counter are `render`, `include` (when using their `{% render 'thing' for some.thing %}` syntax) and `tablerow`. If a partial template is rendered within a `for` loop, the loop counter is carried over to the render context of the partial template.

## Output Stream Limit

The maximum number of bytes that can be written to a template's output stream, per render, before an [`OutputStreamLimitError`](../api/classes/OutputStreamLimitError.md) is thrown.

If the [`outputStreamLimit`](../api/classes/Environment.md#outputstreamlimit) option is `undefined` or less than `0`, there is no soft limit.

```js
import { Environment } from "liquidscript";

const env = new Environment({
  outputStreamLimit: 20, // Very low, for demonstration purposes.
});

const template = env.fromString(`
{% if false %}
this is never rendered, so will not contribute the the output byte counter
{% endif %}
Hello, {{ you }}! 
`);

template.renderSync({ you: "World" });
// "\nHello, World!\n"

template.renderSync({ you: "something longer that exceeds our limit" });
// OutputStreamLimitError: output stream limit reached (<string>:5)
```
