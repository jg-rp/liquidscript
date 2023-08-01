import { ObjectLoader } from "../../../src/builtin/loaders";
import { Environment } from "../../../src/environment";
import { ContextScope } from "../../../src/types";
import { BlockTag, ExtendsTag } from "../../../src/extra/tags";

type Case = {
  description: string;
  source: string;
  want: string;
  globals: ContextScope;
  partials?: { [index: string]: string };
};

describe("template inheritance", () => {
  const cases: Case[] = [
    {
      description: "no blocks",
      source: "{% extends 'foo' %} this should not be rendered",
      want: "hello, world!",
      globals: { you: "world!" },
      partials: { foo: "hello, {{ you }}" },
    },
    {
      description: "no parent block",
      source:
        "{% extends 'foo' %}" +
        "{% block bar %}this should not be rendered{% endblock %}",
      want: "hello, world!",
      globals: { you: "world!" },
      partials: { foo: "hello, {{ you }}" },
    },
    {
      description: "no child block",
      source: "{% extends 'foo' %} this should not be rendered",
      want: "hello, world!",
      globals: { you: "world!" },
      partials: { foo: "hello, {% block bar %}{{ you }}{% endblock %}" },
    },
    {
      description: "override parent block",
      source: "{% extends 'foo' %}{% block bar %}sue{% endblock %}",
      want: "hello, sue",
      globals: { you: "world!" },
      partials: { foo: "hello, {% block bar %}{{ you }}{% endblock %}" },
    },
    {
      description: "render base template directly",
      source: "hello, {% block bar %}{{ you }}{% endblock %}",
      want: "hello, world!",
      globals: { you: "world!" },
      partials: {},
    },
    {
      description: "output super block",
      source:
        "{% extends 'foo' %}" +
        "{% block bar %}{{ block.super }} and sue{% endblock %}",
      want: "hello, world! and sue",
      globals: { you: "world!" },
      partials: { foo: "hello, {% block bar %}{{ you }}{% endblock %}" },
    },
    {
      description: "parent variables are in scope",
      source:
        "{% extends 'foo' %}" +
        "{% block bar %}goodbye, {{ you }}{{ something }}{% endblock %}",
      want: "goodbye, world",
      globals: {},
      partials: {
        foo:
          "{% assign you = 'world' %}" +
          "{% block bar %}hello, {{ you }}!{% endblock %}" +
          "{% assign something = 'other' %}",
      },
    },
    {
      description: "block scoped parent variables are in scope",
      source:
        "{% extends 'foo' %}" +
        "{% block bar %}" +
        "goodbye, {{ you }} #{{ i }}{{ something }} " +
        "{% endblock %}",
      want: "goodbye, world #1 goodbye, world #2 ",
      globals: {},
      partials: {
        foo:
          "{% assign you = 'world' %}" +
          "{% for i in (1..2) %}" +
          "{% block bar %}hello, {{ you }}!{% endblock %}" +
          "{% endfor %}" +
          "{% assign something = 'other' %}",
      },
    },
    {
      description: "nested block scoped parent variables are in scope",
      source:
        "{% extends 'some' %}" +
        "{% block baz %}" +
        "Hello, {{ you }} {{ other }} {{ i }}:{{ x }} " +
        "{% endblock %}",
      want:
        "Hello, world banana 1:1 Hello, world banana 1:2 " +
        "Hello, world banana 2:1 Hello, world banana 2:2 ",
      globals: {},
      partials: {
        base:
          "{% assign you = 'world' %}" +
          "{% for i in (1..2) %}" +
          "{% block bar %}hello, {{ you }}!{% endblock %}" +
          "{% endfor %}",
        some:
          "{% extends 'base' %}" +
          "{% block bar %}" +
          "{% assign other = 'banana' %}" +
          "{% for x in (1..2) %}" +
          "{% block baz %}" +
          "{% endblock baz %}" +
          "{% endfor %}" +
          "{% endblock bar %}",
      },
    },
    {
      description: "child variables are out of scope",
      source:
        "{% extends 'foo' %}" +
        "{% block bar %}" +
        "{% assign something = '/other' %}" +
        "goodbye, {{ you }}" +
        "{% assign you = 'sue' %}" +
        "{% endblock %}",
      want: "goodbye, world",
      globals: {},
      partials: {
        foo:
          "{% assign you = 'world' %}" +
          "{% block bar %}{% endblock %}" +
          "{{ something }}",
      },
    },
    {
      description: "nested outer block",
      source: "{% extends 'foo' %}{% block bar %}Goodbye{% endblock %}",
      want: "Goodbye!",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}" +
          "!",
      },
    },
    {
      description: "override nested block",
      source: "{% extends 'foo' %}{% block greeting %}Goodbye{% endblock %}",
      want: "Goodbye, world!",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}",
      },
    },
    {
      description: "super nested blocks",
      source:
        "{% extends 'foo' %}" +
        "{% block bar %}{{ block.super }}!!{% endblock %}",
      want: "Hello, world!!!",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}",
      },
    },
    {
      description: "override a parent's parent block",
      source: "{% extends 'bar' %}{% block greeting %}Goodbye,{% endblock %}",
      want: "Goodbye, world",
      globals: { you: "world" },
      partials: {
        foo: "{% block greeting %}Hello{% endblock %} {{ you }}",
        bar: "{% extends 'foo' %}",
      },
    },
    {
      description: "multi-level super",
      source:
        "{% extends 'baz' %}" +
        "{% block bar %}{{ block.super }}!!{% endblock %}",
      want: "Hello, world!**!!",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}",
        baz:
          "{% extends 'foo' %}" +
          "{% block bar %}{{ block.super }}**{% endblock %}",
      },
    },
    {
      description: "include an extended template",
      source: "{% include 'bar' %}",
      want: "foo bar",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}",
        bar: "{% extends 'foo' %}{% block bar %}foo bar{% endblock %}",
      },
    },
    {
      description: "include in an overridden block",
      source:
        "{% extends 'foo' %}" +
        "{% block greeting %}{% include 'bar' %}{% endblock %}",
      want: "I am included, world!",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}",
        bar: "I am included",
      },
    },
    {
      description: "render an extended template",
      source: "{% render 'bar' %}",
      want: "foo bar",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}",
        bar: "{% extends 'foo' %}{% block bar %}foo bar{% endblock %}",
      },
    },
    {
      description: "render in an overridden block",
      source:
        "{% extends 'foo' %}" +
        "{% block greeting %}{% render 'bar' %}{% endblock %}",
      want: "I am rendered, world!",
      globals: { you: "world" },
      partials: {
        foo:
          "{% block bar %}" +
          "{% block greeting %}Hello{% endblock %}" +
          ", {{ you }}!" +
          "{% endblock %}",
        bar: "I am rendered",
      },
    },
  ];

  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, want, globals, partials }: Case) => {
        const env = new Environment({
          globals,
          loader: new ObjectLoader(partials),
        });
        env.addTag("extends", new ExtendsTag());
        env.addTag("block", new BlockTag());
        const template = env.fromString(source);
        const result = await template.render();
        expect(result).toBe(want);
      },
    );
  });

  describe("sync", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, want, globals, partials }: Case) => {
        const env = new Environment({
          globals,
          loader: new ObjectLoader(partials),
        });
        env.addTag("extends", new ExtendsTag());
        env.addTag("block", new BlockTag());
        const template = env.fromString(source);
        const result = template.renderSync();
        expect(result).toBe(want);
      },
    );
  });
});
