# Objects and Drops

When passed as `globals` to the [`fromString()`](../api/classes/Template.md#fromstring) and [`getTemplate()`](../api/classes/Environment.md#gettemplate) methods of [`Template`](../api/classes/Template.md) and [`Environment`](../api/classes/Environment.md), an object's properties will be available to template authors as [global variables](./render-context.md). LiquidScript will **not** call methods on render context objects unless explicitly whitelisted, instead treating them as [undefined](./undefined.md) variables.

Consider this example where we pass an array of product objects to `renderSync()`.

```js
import { Template } from "liquidscript";

class Product {
  constructor(title, colors) {
    this.title = title;
    this.colors = colors;
  }

  save() {
    console.log(`saved ${this.title}`);
  }
}

const data = {
  products: [
    new Product("A Shoe", ["blue", "red"]),
    new Product("A Hat", ["grey", "brown"]),
  ],
};

const source = `
{% for product in products %}
  {{ product.title }} is available in {{ product.colors | join: ' and ' }}.
  {{ product.save }}
{% endfor %}
{{ someFunction }}
`;

console.log(Template.fromString(source).renderSync(data));
```

Notice that `{{ product.save }}` has produced no output and, if we were using an environment configured with `StrictUndefined`, we would get a `LiquidUndefinedError` with a message like `LiquidUndefinedError: 'save' is undefined (<string>:4)`.

```plain title="output"
A Shoe is available in blue and red.

A Hat is available in grey and brown.

```

## Drop Protocol

In LiquidScript, a "drop" is an object that implements some or all of the "drop protocol". When included in a Liquid render context, a drop can, for example, behave like a Liquid primitive, dynamically produce properties via a dispatching method or expose its methods as if they were simple properties.

The drop protocol is nothing more than a set of conventions using well defined [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Those symbols are:

| Property                                                       | Description                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`[toLiquid]`](#toliquid)                                      | A function valued property that is called to convert an object to its corresponding Liquid value. `[toLiquid]` is passed the active render context as its only argument.                                                                                                                      |
| [`[toLiquidSync]`](../api/variables/toLiquidSync.md)             | A synchronous version of `[toLiquid]`                                                                                                                                                                                                                                                         |
| [`[toLiquidPrimitive]`](../api/variables/toLiquidPrimitive.md)   | A function valued property that is called to convert an object to its corresponding Liquid primitive value. The return value of this function will be used in Liquid comparison expressions.                                                                                                  |
| [`[toLiquidString]`](../api/variables/toLiquidString.md)         | A function valued property that is called to convert an object to its Liquid specific string representation. This function will take priority over `toString()` when an object is output or passed to a string filter.                                                                        |
| [`[toLiquidHtml]`](../api/variables/toLiquidHtml.mdl)             | A function valued property that is called to convert an object to an HTML-safe string representation. When HTML auto-escaping is enabled, the return value of this function will take priority over `[toLiquidString]` and `toString()`, and it will not be escaped.                          |
| [`[isLiquidCallable]`](#isliquidcallable)                      | A function valued property that is called to test a method name against a set of whitelisted methods that Liquid can call. A method name is passed as the only argument, and a boolean return value is expected. Liquid callable methods are not passed any arguments.                        |
| [`[liquidDispatch]`](#liquiddispatch)                          | A function valued property that is called in the event that a property is missing from an object. The name of the missing property is passed as the only argument. This function is expected to return a Promise and should throw an `InternalKeyError` if the named property is unavailable. |
| [`[liquidDispatchSync]`](../api/variables/liquidDispatchSync.md) | A synchronous version of `[liquidDispatch]`.                                                                                                                                                                                                                                                  |

### toLiquid

This example demonstrates how one might use [`toLiquid`](../api/variables/toLiquid.md) to implement a lazy loading user object.

```typescript
import { Liquidable, toLiquid } from "liquidscript";

type User = { firstName: string; lastName: string };

class LazyUserDrop implements Liquidable {
  private obj?: User;
  constructor(private userId: string) {}

  async queryDatabase(): Promise<User> {
    // Do database IO here.
    return { firstName: "John", lastName: "Smith" };
  }

  async [toLiquid](): Promise<User> {
    if (this.obj === undefined) this.obj = await this.queryDatabase();
    return this.obj;
  }
}
```

### liquidDispatch

Here we define a class implementing a [`liquidDispatchSync`](../api/variables/liquidDispatchSync.md) method, which will catch all attempts to access undefined properties on instances of that class.

```typescript
import {
  LiquidDispatchableSync,
  liquidDispatchSync,
  InternalKeyError,
} from "liquidscript";

class User implements LiquidDispatchableSync {
  #data: Map<string, string | number>;
  constructor(data: Map<string, string | number>) {
    this.#data = data;
  }

  [liquidDispatchSync](name: string): string | number {
    if (this.#data.has(name)) return this.#data.get(name);
    throw new InternalKeyError(`User.${name}`);
  }
}
```

When in an async context, if `liquidDispatch` is not defined, LiquidScript will fall back to `liquidDispatchSync` if it is available.

### isLiquidCallable

We can tell LiquidScript to call an object's methods by implementing an [`isLiquidCallable`](../api/variables/isLiquidCallable.md) method. If this method returns `true`, LiquidScript can call the named method without any arguments.

This example user class would allow LiquidScript to call `fullName()`, but not `save()`. Note that a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) method/property would work equally as well.

```typescript
import { Template, LiquidCallable, isLiquidCallable } from "liquidscript";

class User implements LiquidCallable {
  constructor(public firstName: string, public lastName: string) {}

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  save() {
    console.log(`saved user ${this.fullName()}`);
  }

  [isLiquidCallable](name: string): boolean {
    return name === "fullName";
  }
}
```
