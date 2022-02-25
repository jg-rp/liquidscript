import { Environment } from "../../src/environment";
import { MapLoader } from "../../src/loader";
import { LaxUndefined } from "../../src/undefined";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
  partials: { [index: string]: string };
};

describe("built-in include tag", () => {
  const cases: Case[] = [
    {
      description: "string literal name",
      source: "{% include 'product-hero' %}",
      want: "foo\n- sports\n- garden\n",
      globals: { product: { title: "foo", tags: ["sports", "garden"] } },
      partials: {
        "product-hero":
          "{{ product.title }}" +
          "\n" +
          "{% for tag in product.tags %}" +
          "- {{ tag }}" +
          "\n" +
          "{% endfor %}",
      },
    },
    {
      description: "name from identifier",
      source: "{% include snippet %}",
      want: "foo\n- sports\n- garden\n",
      globals: {
        snippet: "product-hero",
        product: { title: "foo", tags: ["sports", "garden"] },
      },
      partials: {
        "product-hero":
          "{{ product.title }}" +
          "\n" +
          "{% for tag in product.tags %}" +
          "- {{ tag }}" +
          "\n" +
          "{% endfor %}",
      },
    },
    {
      description: "bound variable",
      source: "{% include 'product-title' with collection.products[1] %}",
      want: "car",
      globals: {
        collection: {
          products: [{ title: "bike" }, { title: "car" }],
        },
      },
      partials: {
        "product-title": "{{ product-title.title }}",
      },
    },
    {
      description: "bound variable does not exist",
      source: "{% include 'product-title' with no.such.thing %}",
      globals: {},
      want: "",
      partials: {
        "product-title": "{{ product-title.title }}",
      },
    },
    {
      description: "bound array variable",
      source: "{% include 'prod' for collection.products %}",
      want: "bikecar",
      globals: {
        collection: {
          products: [{ title: "bike" }, { title: "car" }],
        },
      },
      partials: { prod: "{{ prod.title }}" },
    },
    {
      description: "bound variable with alias",
      source:
        "{% include 'product-alias' with collection.products[1] as product %}",
      want: "car",
      globals: {
        collection: {
          products: [{ title: "bike" }, { title: "car" }],
        },
      },
      partials: { "product-alias": "{{ product.title }}" },
    },
    {
      description: "some keyword arguments",
      source: "{% include 'product-args', foo: 'hello', bar: 'there' %}",
      globals: {},
      want: "hello there",
      partials: { "product-args": "{{ foo }} {{ bar }}" },
    },
    {
      description: "some keyword arguments without leading comma",
      source: "{% include 'product-args' foo: 'hello', bar: 'there' %}",
      globals: {},
      want: "hello there",
      partials: { "product-args": "{{ foo }} {{ bar }}" },
    },
    {
      description: "some keyword arguments with float literals",
      source: "{% include 'product-args' foo: 1.1, bar: 'there' %}",
      globals: {},
      want: "1.1 there",
      partials: { "product-args": "{{ foo }} {{ bar }}" },
    },
    {
      description: "some keyword arguments with range literal",
      source: "{% include 'product-args' foo: (1..3), bar: 'there' %}",
      globals: {},
      want: "1#2#3 there",
      partials: { "product-args": "{{ foo | join: '#' }} {{ bar }}" },
    },
    {
      description: "use globals from outer scope",
      source: "{% include 'outer-scope' %}",
      want: "Hello, Holly",
      globals: { customer: { first_name: "Holly" } },
      partials: { "outer-scope": "Hello, {{ customer.first_name }}" },
    },
    {
      description: "assign persists in outer scope",
      source: "{% include 'assign-outer-scope' %} {{ last_name }}",
      want: "Hello, Holly Smith",
      globals: { customer: { first_name: "Holly" } },
      partials: {
        "assign-outer-scope":
          "Hello, {{ customer.first_name }}{% assign last_name = 'Smith' %}",
      },
    },
    {
      description: "counter from outer scope",
      source:
        "{% increment foo %} " +
        "{% include 'increment-outer-scope' %} " +
        "{% increment foo %}",
      globals: {},
      want: "0 1 2",
      partials: { "increment-outer-scope": "{% increment foo %}" },
    },
    {
      description: "break from include",
      source:
        "{% for tag in product.tags %}{% include 'tag-break' %}{% endfor %}",
      want: "SPORTS",
      globals: { product: { tags: ["sports", "garden"] } },
      partials: { "tag-break": "{{ tag | upcase }}{% break %}" },
    },
    {
      description: "break from nested include",
      source: "{% for tag in product.tags %}{% include 'tag' %}{% endfor %}",
      want: "SPORTS break!",
      globals: { product: { tags: ["sports", "garden"] } },
      partials: {
        tag: "{{ tag | upcase }}{% include 'break' %}",
        break: " break!{% break %}",
      },
    },
    {
      description: "keyword arguments go out of scope",
      source:
        "{% include 'product-args', foo: 'hello', bar: 'there' %}{{ foo }}",
      globals: {},
      want: "hello there",
      partials: { "product-args": "{{ foo }} {{ bar }}" },
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want, partials }: Case) => {
        const loader = new MapLoader(new Map(Object.entries(partials)));
        const env = new Environment({
          loader: loader,
          undefinedFactory: (n) => new LaxUndefined(n),
        });
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      }
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want, partials }: Case) => {
        const loader = new MapLoader(new Map(Object.entries(partials)));
        const env = new Environment({
          loader: loader,
          undefinedFactory: (n) => new LaxUndefined(n),
        });
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      }
    );
  });
});
