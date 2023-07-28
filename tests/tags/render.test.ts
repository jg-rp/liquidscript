import { Environment } from "../../src/environment";
import { MapLoader } from "../../src/builtin/loaders";
import { LaxUndefined } from "../../src/undefined";

type Case = {
  description: string;
  source: string;
  globals: { [index: string]: unknown };
  want: string;
  partials: { [index: string]: string };
};

describe("built-in render tag", () => {
  const cases: Case[] = [
    {
      description: "string literal name",
      source: "{% render 'product-hero', product: product %}",
      want: "foo\n- sports - garden ",
      globals: { product: { title: "foo", tags: ["sports", "garden"] } },
      partials: {
        "product-hero": [
          "{{ product.title }}",
          "{% for tag in product.tags %}- {{ tag }} {% endfor %}",
        ].join("\n"),
      },
    },
    {
      description: "bound variable",
      source: "{% render 'product-title' with collection.products[1] %}",
      want: "car",
      globals: {
        collection: { products: [{ title: "bike" }, { title: "car" }] },
      },
      partials: { "product-title": "{{ product-title.title }}" },
    },
    {
      description: "bound variable does not exist",
      source: "{% render 'product-title' with no.such.thing %}",
      want: "",
      globals: {},
      partials: { "product-title": "{{ product-title.title }}" },
    },
    {
      description: "bound array variable",
      source: "{% render 'prod' for collection.products %}",
      want: "bikecar",
      globals: {
        collection: { products: [{ title: "bike" }, { title: "car" }] },
      },
      partials: { prod: "{{ prod.title }}" },
    },
    {
      description: "bound variable with alias",
      source:
        "{% render 'product-alias' with collection.products[1] as product %}",
      want: "car",
      globals: {
        collection: { products: [{ title: "bike" }, { title: "car" }] },
      },
      partials: {
        "product-alias": "{{ product.title }}",
      },
    },
    {
      description: "some keyword arguments",
      source: "{% render 'product-args', foo: 'hello', bar: 'there' %}",
      want: "hello there",
      globals: {},
      partials: {
        "product-args": "{{ foo }} {{ bar }}",
      },
    },
    {
      description: "some keyword arguments including a range literal",
      source: "{% render 'product-args', foo: (1..3), bar: 'there' %}",
      want: "1#2#3 there",
      globals: {},
      partials: {
        "product-args": "{{ foo | join: '#' }} {{ bar }}",
      },
    },
    {
      description: "some keyword arguments no leading coma",
      source: "{% render 'product-args' foo: 'hello', bar: 'there' %}",
      want: "hello there",
      globals: {},
      partials: { "product-args": "{{ foo }} {{ bar }}" },
    },
    {
      description: "parent variables go out of scope",
      source:
        "{% assign greeting = 'good morning' %}" +
        "{{ greeting }} " +
        "{% render 'outer-scope' %}" +
        "{{ greeting }}",
      globals: {},
      want: "good morning good morning",
      partials: { "outer-scope": "{{ greeting }}" },
    },
    {
      description: "for loop variables go out of scope",
      source:
        "{% for i in (1..3) %}" +
        "{{ i }}" +
        "{% render 'loop-scope' %}" +
        "{{ i }}" +
        "{% endfor %}" +
        "{{ i }}",
      globals: {},
      want: "112233",
      partials: { "loop-scope": "{{ i }}" },
    },
    {
      description: "assigned variables do not leak into outer scope",
      source:
        "{% render 'assign-outer-scope', customer: customer %} {{ last_name }}",
      want: "Hello, Holly ",
      globals: { customer: { first_name: "Holly" } },
      partials: {
        "assign-outer-scope":
          "Hello, {{ customer.first_name }}{% assign last_name = 'Smith' %}",
      },
    },
    {
      description: "increment is isolated between renders",
      source:
        "{% increment foo %} {% render 'increment' %} {% increment foo %}",
      globals: {},
      want: "0 0 1",
      partials: { increment: "{% increment foo %}" },
    },
    {
      description: "decrement is isolated between renders",
      source:
        "{% decrement foo %} {% render 'decrement' %} {% decrement foo %}",
      globals: {},
      want: "-1 -1 -2",
      partials: { decrement: "{% decrement foo %}" },
    },
    {
      description: "forloop helper",
      source: "{% render 'product' for collection.products %}",
      want: "Product: bike first index:1 Product: car last index:2 ",
      globals: {
        collection: { products: [{ title: "bike" }, { title: "car" }] },
      },
      partials: {
        product:
          "Product: {{ product.title }} " +
          "{% if forloop.first %}first{% endif %}" +
          "{% if forloop.last %}last{% endif %}" +
          " index:{{ forloop.index }} ",
      },
    },
    {
      description: "render loops don't add parentloop",
      source: "{% render 'product' for collection.products %}",
      want: "bike-0 0 1 2 car-1 0 1 2 ",
      globals: {
        collection: { products: [{ title: "bike" }, { title: "car" }] },
      },
      partials: {
        product:
          "{{ product.title }}-{{ forloop.index0 }} " +
          "{% for x in (1..3) %}" +
          "{{ forloop.index0 }}{{ forloop.parentloop.index0 }} " +
          "{% endfor %}",
      },
    },
    {
      description: "render loops can't access parentloop",
      source:
        "{% for x in (1..3) %}" +
        "{% render 'product' for collection.products %}" +
        "{% endfor %}",
      want: "bike-0 car-1 bike-0 car-1 bike-0 car-1 ",
      globals: {
        collection: { products: [{ title: "bike" }, { title: "car" }] },
      },
      partials: {
        product:
          "{{ product.title }}-{{ forloop.index0 }} " +
          "{{ forloop.parentloop.index0 }}",
      },
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want, partials }: Case) => {
        const loader = new MapLoader(new Map(Object.entries(partials)));
        const env = new Environment({
          loader,
          undefinedFactory: (n) => new LaxUndefined(n),
        });
        const template = env.fromString(source);
        const result = await template.render(globals);
        expect(result).toBe(want);
      },
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, globals, want, partials }: Case) => {
        const loader = new MapLoader(new Map(Object.entries(partials)));
        const env = new Environment({
          loader,
          undefinedFactory: (n) => new LaxUndefined(n),
        });
        const template = env.fromString(source);
        expect(template.renderSync(globals)).toBe(want);
      },
    );
  });
});
