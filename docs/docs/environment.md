# Liquid environments

Template parsing an rendering behavior is configured using an instance of [`Environment`](./api/classes/Environment.md). Once configured, you parse templates with [`Environment.parse()`](./api/classes/Environment.md#parse), [`Environment.getTemplate()`](./api/classes/Environment.md#gettemplate) or [`Environment.getTemplateSync()`](./api/classes/Environment.md#gettemplatesync), all of which return an instance of [`Template`](./api/classes/Template.md).

## The default environment

The [default Liquid environment](./api/variables/DEFAULT_ENVIRONMENT.md) and a new instance of `Environment` constructed without any arguments is equivalent to passing the following [options](./api/type-aliases/EnvironmentOptions.md) object to the `Environment` constructor.

```js
const env = new Environment({
  autoEscape: false,
  globals: {},
  loader: new MapLoader(),
  maxAssignScore: undefined,
  maxAssignScoreCumulative: undefined,
  maxContextDepth: 30,
  maxRenderScore: undefined,
  maxRenderScoreCumulative: undefined,
  maxRenderSize: undefined,
  strictFilters: true,
  undefinedType: Undefined
})
```

## Managing tags and filters

New instances of [`Environment`](./api/classes/Environment.md) and the [default Liquid environment](./api/variables/DEFAULT_ENVIRONMENT.md) have all standard tags and filters enabled by default. It's OK to manipulate [`Environment.tags`](./api/classes/Environment.md#tags) and [`Environment.filters`](./api/classes/Environment.md#filters) after environment construction, they are regular objects mapping strings to [`Tag`](./api/interfaces/Tag.md) and [`Filter`](./api/interfaces/Filter.md).

```js
import { Environment } from "liquidscript";

const env = new Environment();
delete env.tags["include"];
```

Alternatively, you can extend `Environment` and override [`setupTags()`](./api/classes/Environment.md#setuptags) and/or [`setupFilters()`](./api/classes/Environment.md#setupfilters).

```js
import { Environment } from "liquidscript";

class MyEnv extends Environment {
  setupFilters() {
    super.setupFilters();
    delete this.filters["base64_decode"];
    delete this.filters["base64_encode"];
    delete this.filters["base64_url_safe_decode"];
    delete this.filters["base64_url_safe_encode"];
  }
}
const env = new MyEnv()
```

## Extra tags and filters

TODO:

## Managing global variables

TODO:

## HTML auto escape

TODO:

## Resource limits

TODO: