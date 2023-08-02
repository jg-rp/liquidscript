import { ObjectLoader } from "../../../src/builtin/loaders";
import { Environment } from "../../../src/environment";
import { ContextScope } from "../../../src/types";
import { BlockTag, ExtendsTag } from "../../../src/extra/tags";
import {
  LiquidSyntaxError,
  LiquidUndefinedError,
  TemplateInheritanceError,
} from "../../../src/errors";
import { registerInheritanceTags } from "../../../src/extra/register";
import { StrictUndefined } from "../../../src/undefined";

type Case = {
  description: string;
  source: string;
  want: string;
  globals: ContextScope;
  partials?: { [index: string]: string };
};

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

describe("template inheritance", () => {
  describe("async", () => {
    test.each<Case>(cases)(
      "$description",
      async ({ source, want, globals, partials }: Case) => {
        const env = new Environment({
          globals,
          loader: new ObjectLoader(partials),
        });
        registerInheritanceTags(env);
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

  test("missing required block", () => {
    const source = "{% extends 'foo' %}{% block baz %}{% endblock %}";
    const partials = { foo: "{% block bar required %}{% endblock %}" };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("'bar' must be overridden");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow(
      "'bar' must be overridden",
    );
  });

  test("missing required block long stack", () => {
    const source = "{% extends 'bar' %}";
    const partials = {
      foo: "{% block baz required %}{% endblock %}",
      bar: "{% extends 'foo' %}{% block some %}hello{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("'baz' must be overridden");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow(
      "'baz' must be overridden",
    );
  });

  test("immediate required override", () => {
    const source = "{% extends 'foo' %}{% block bar %}hello{% endblock %}";
    const partials = {
      foo: "{% block bar required %}{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    const want = "hello";
    expect(template.renderSync()).toBe(want);
    expect(template.render()).resolves.toBe(want);
  });

  test("override required block in leaf", () => {
    const source = "{% extends 'foo' %}{% block baz %}hello{% endblock %}";
    const partials = {
      foo: "{% block baz required %}{% endblock %}",
      bar: "{% extends 'foo' %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    const want = "hello";
    expect(template.renderSync()).toBe(want);
    expect(template.render()).resolves.toBe(want);
  });

  test("override required block in stack", () => {
    const source = "{% extends 'bar' %}";
    const partials = {
      foo: "{% block baz required %}{% endblock %}",
      bar: "{% extends 'foo' %}{% block baz %}hello{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    const want = "hello";
    expect(template.renderSync()).toBe(want);
    expect(template.render()).resolves.toBe(want);
  });

  test("override required block not in base", () => {
    const source = "{% extends 'bar' %}{% block content %}hello{% endblock %}";
    const partials = {
      foo: "{% block content %}{% endblock %}",
      bar: "{% extends 'foo' %}{% block content required %}{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    const want = "hello";
    expect(template.renderSync()).toBe(want);
    expect(template.render()).resolves.toBe(want);
  });

  test("missing required block not in base", () => {
    const source = "{% extends 'bar' %}";
    const partials = {
      foo: "{% block content %}{% endblock %}",
      bar: "{% extends 'foo' %}{% block content required %}{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("'content' must be overridden");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow(
      "'content' must be overridden",
    );
  });

  test("render required block directly", () => {
    const source = "{% block foo required %}{% endblock %}";
    const env = new Environment();
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("'foo' must be overridden");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow(
      "'foo' must be overridden",
    );
  });

  test("too many extends", () => {
    const source = "{% extends 'foo' %}{% extends 'bar' %}";
    const env = new Environment();
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("too many 'extends' tags");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow(
      "too many 'extends' tags",
    );
  });

  test("invalid block name", () => {
    const source = "{% extends 'foo' %}";
    const partials = {
      foo: "{% block 47 %}{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(LiquidSyntaxError);
    expect(async () => template.render()).rejects.toThrow(LiquidSyntaxError);
  });

  test("undefined block drop properties", () => {
    const source =
      "{% extends 'foo' %}" +
      "{% block bar %}{{ block.nosuchthing }} and sue{% endblock %}";
    const partials = {
      foo: "hello, {% block bar %}{{ you }}{% endblock %}",
    };
    const env = new Environment({
      loader: new ObjectLoader(partials),
      undefinedFactory: StrictUndefined.from,
    });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(LiquidUndefinedError);
    expect(async () => template.render()).rejects.toThrow(LiquidUndefinedError);
  });

  test("block drop no super block", () => {
    const source =
      "hello, {% block bar %}{{ block.super }}{{ you }}{% endblock %}";
    const env = new Environment({
      undefinedFactory: StrictUndefined.from,
    });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(LiquidUndefinedError);
    expect(async () => template.render()).rejects.toThrow(LiquidUndefinedError);
  });

  test("duplicate block names", () => {
    const source =
      "{% extends 'foo' %}" +
      "{% block bar %}{% endblock %}{% block bar %}{% endblock %}";
    const partials = {
      foo: "{% block bar %}{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("duplicate block 'bar'");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow(
      "duplicate block 'bar'",
    );
  });

  test("end block name", () => {
    const source = "{% extends 'foo' %}";
    const partials = {
      foo: "{% block baz %}hello{% endblock baz %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    const want = "hello";
    expect(template.renderSync()).toBe(want);
    expect(template.render()).resolves.toBe(want);
  });

  test("mismatched end block name", () => {
    const source = "{% extends 'foo' %}";
    const partials = {
      foo: "{% block baz %}hello{% endblock something %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("expected endblock for 'baz'");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow(
      "expected endblock for 'baz'",
    );
    expect(() => env.fromString(partials["foo"]).renderSync()).toThrow(
      TemplateInheritanceError,
    );
  });

  test("override nested block and outer block", () => {
    const source =
      '{% extends "foo" %}' +
      "{% block title %}Home{% endblock %}" +
      "{% block head %}{{ block.super }}Hello{% endblock %}";
    const partials = {
      foo:
        "{% block head %}" +
        "<title>{% block title %}{% endblock %} - Welcome</title>" +
        "{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.fromString(source);
    const want = "<title>Home - Welcome</title>Hello";
    expect(template.renderSync()).toBe(want);
    expect(template.render()).resolves.toBe(want);
  });

  test("recursive extends", () => {
    const partials = {
      some: "{% extends 'other' %}",
      other: "{% extends 'some' %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.getTemplateSync("some");
    expect(() => template.renderSync()).toThrow(TemplateInheritanceError);
    expect(() => template.renderSync()).toThrow("circular extends");
    expect(async () => template.render()).rejects.toThrow(
      TemplateInheritanceError,
    );
    expect(async () => template.render()).rejects.toThrow("circular extends");
  });

  test("override block to many blocks", () => {
    const partials = {
      base: "{% block head %}Hello - Welcome{% endblock %}",
      other:
        "{% extends 'base' %}" +
        "{% block head %}" +
        "{{ block.super }}:" +
        "{% block foo %}!{% endblock %} - " +
        "{% block bar %}{% endblock %}" +
        "{% endblock %}",
      some:
        "{% extends 'other' %}" +
        "{% block foo %}foo{{ block.super }}{% endblock %}" +
        "{% block bar %}bar{% endblock %}",
    };
    const env = new Environment({ loader: new ObjectLoader(partials) });
    env.addTag("extends", new ExtendsTag());
    env.addTag("block", new BlockTag());
    const template = env.getTemplateSync("some");
    const want = "Hello - Welcome:foo! - bar";
    expect(template.renderSync()).toBe(want);
    expect(template.render()).resolves.toBe(want);
  });
});
