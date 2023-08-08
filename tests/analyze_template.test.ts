import { ChildNode, Node } from "../src/ast";
import { Environment } from "../src/environment";
import { Expression } from "../src/expression";
import { IfNotTag } from "../src/extra/tags/ifnot";
import { ObjectLoader } from "../src/builtin/loaders";
import { RenderContext } from "../src/context";
import { RenderStream } from "../src/io/output_stream";
import { Tag } from "../src/tag";
import {
  TemplateInheritanceError,
  TemplateTraversalError,
} from "../src/errors";
import { Token, TokenStream } from "../src/token";
import { VariableRefs, Template, TemplateAnalysis } from "../src/template";
import { CallTag, MacroTag } from "../src/extra/tags";
import { addInheritanceTags } from "../src/extra/register";

class MockExpression implements Expression {
  async evaluate(): Promise<unknown> {
    return "mock expression";
  }
  evaluateSync(): unknown {
    return "mock expression";
  }
  equals(): boolean {
    return false;
  }
  toString(): string {
    return "mock expression";
  }
}

class MockNode implements Node {
  constructor(readonly token: Token) {}

  async render(context: RenderContext, out: RenderStream): Promise<void> {
    out.write("mock node");
  }
  renderSync(context: RenderContext, out: RenderStream): void {
    out.write("mock node");
  }
}

class MockTag implements Tag {
  parse(stream: TokenStream): Node {
    return new MockNode(stream.current);
  }
}

class MockChildNode extends MockNode {
  children(): ChildNode[] {
    return [{ token: this.token, expression: new MockExpression() }];
  }
}

class MockChildTag extends MockTag {
  parse(stream: TokenStream): Node {
    return new MockChildNode(stream.current);
  }
}

describe("static template analysis", () => {
  const env = new Environment();

  async function _test(
    template: Template,
    variables: VariableRefs,
    locals: VariableRefs,
    globals: VariableRefs,
    failedVisits?: VariableRefs,
    unloadablePartials?: VariableRefs,
    raiseForFailures: boolean = true,
    filters?: VariableRefs,
    tags?: VariableRefs,
  ) {
    failedVisits = failedVisits ?? {};
    unloadablePartials = unloadablePartials ?? {};
    filters = filters ?? {};
    tags = tags ?? {};

    const expectRefs = (refs: TemplateAnalysis) => {
      expect(refs.failedVisits).toStrictEqual(failedVisits);
      expect(refs.unloadablePartials).toStrictEqual(unloadablePartials);
      expect(refs.localVariables).toStrictEqual(locals);
      expect(refs.globalVariables).toStrictEqual(globals);
      expect(refs.variables).toStrictEqual(variables);
      expect(refs.filters).toStrictEqual(filters);
      expect(refs.tags).toStrictEqual(tags);
    };

    expectRefs(await template.analyze({ raiseForFailures }));
    expectRefs(template.analyzeSync({ raiseForFailures }));
  }

  test("analyze output statement", async () => {
    const template = env.fromString("{{ x | default: y, allow_false: z }}");

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      default: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
    );
  });

  test("analyze identifier with bracketed string literal", async () => {
    const template = env.fromString("{{ x['y'].title }}");

    const expectedGlobals: VariableRefs = {
      "x.y.title": [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      "x.y.title": [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze identifier with bracketed string literal containing a dot", async () => {
    const template = env.fromString("{{ x['y.z'].title }}");

    const expectedGlobals: VariableRefs = {
      'x["y.z"].title': [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      'x["y.z"].title': [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze identifier with nested identifier", async () => {
    const template = env.fromString("{{ x[y.z].title }}");

    const expectedGlobals: VariableRefs = {
      "x[y.z].title": [{ templateName: "<string>", lineNumber: 1 }],
      "y.z": [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      "x[y.z].title": [{ templateName: "<string>", lineNumber: 1 }],
      "y.z": [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze assign tag", async () => {
    const template = env.fromString("{% assign x = y | append: z %}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      assign: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze capture tag", async () => {
    const template = env.fromString(
      "{% capture x %}{% if y %}z{% endif %}{% endcapture %}",
    );

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      capture: [{ templateName: "<string>", lineNumber: 1 }],
      if: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      {},
      expectedTags,
    );
  });

  test("analyze case tag", async () => {
    const template = env.fromString(
      [
        "{% case x %}",
        "{% when y %}",
        "  {{ a }}",
        "{% when z %}",
        "  {{ b }}",
        "{% endcase %}",
      ].join("\n"),
    );

    const expectedGlobals: VariableRefs = {
      x: [
        { templateName: "<string>", lineNumber: 2 },
        { templateName: "<string>", lineNumber: 4 },
      ],
      y: [{ templateName: "<string>", lineNumber: 2 }],
      a: [{ templateName: "<string>", lineNumber: 3 }],
      z: [{ templateName: "<string>", lineNumber: 4 }],
      b: [{ templateName: "<string>", lineNumber: 5 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [
        { templateName: "<string>", lineNumber: 2 },
        { templateName: "<string>", lineNumber: 4 },
      ],
      y: [{ templateName: "<string>", lineNumber: 2 }],
      a: [{ templateName: "<string>", lineNumber: 3 }],
      z: [{ templateName: "<string>", lineNumber: 4 }],
      b: [{ templateName: "<string>", lineNumber: 5 }],
    };
    const expectedTags: VariableRefs = {
      case: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      {},
      expectedTags,
    );
  });

  test("analyze cycle tag", async () => {
    const template = env.fromString("{% cycle x: a, b %}");

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 1 }],
      b: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 1 }],
      b: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      cycle: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      {},
      expectedTags,
    );
  });

  test("analyze decrement tag", async () => {
    const template = env.fromString("{% decrement x %}");

    const expectedGlobals: VariableRefs = {};
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {};
    const expectedTags: VariableRefs = {
      decrement: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      {},
      expectedTags,
    );
  });

  test("analyze echo tag", async () => {
    const template = env.fromString(
      "{% echo x | default: y, allow_false: z %}",
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      default: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      echo: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze for tag", async () => {
    const template = env.fromString(
      [
        "{% for x in (1..y) %}",
        "  {{ x }}",
        "  {% break %}",
        "{% else %}",
        "  {{ z }}",
        "  {% continue %}",
        "{% endfor %}",
      ].join("\n"),
    );

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 5 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 5 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      break: [{ templateName: "<string>", lineNumber: 3 }],
      continue: [{ templateName: "<string>", lineNumber: 6 }],
      for: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze if tag", async () => {
    const template = env.fromString(
      [
        "{% if x %}",
        "  {{ a }}",
        "{% elsif y %}",
        "  {{ b }}",
        "{% endif %}",
      ].join("\n"),
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 3 }],
      b: [{ templateName: "<string>", lineNumber: 4 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 3 }],
      b: [{ templateName: "<string>", lineNumber: 4 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      if: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze if (not) tag", async () => {
    const _env = new Environment();
    _env.addTag("if", new IfNotTag());

    const template = _env.fromString(
      [
        "{% if not x %}",
        "  {{ a }}",
        "{% elsif y %}",
        "  {{ b }}",
        "{% endif %}",
      ].join("\n"),
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 3 }],
      b: [{ templateName: "<string>", lineNumber: 4 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 3 }],
      b: [{ templateName: "<string>", lineNumber: 4 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      if: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze ifchanged tag", async () => {
    const template = env.fromString("{% ifchanged %}{{ x }}{% endifchanged %}");

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      ifchanged: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze increment tag", async () => {
    const template = env.fromString("{% increment x %}");

    const expectedGlobals: VariableRefs = {};
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {};
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      increment: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze liquid tag", async () => {
    const template = env.fromString(
      [
        "{% liquid",
        "if product.title",
        "   echo foo | upcase",
        "else",
        "   echo 'product-1' | upcase ",
        "endif",
        "",
        "for i in (0..5)",
        "   echo i",
        "endfor %}",
      ].join("\n"),
    );

    const expectedGlobals: VariableRefs = {
      "product.title": [{ templateName: "<string>", lineNumber: 2 }],
      foo: [{ templateName: "<string>", lineNumber: 3 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      "product.title": [{ templateName: "<string>", lineNumber: 2 }],
      foo: [{ templateName: "<string>", lineNumber: 3 }],
      i: [{ templateName: "<string>", lineNumber: 9 }],
    };
    const expectedFilters: VariableRefs = {
      upcase: [
        { templateName: "<string>", lineNumber: 3 },
        { templateName: "<string>", lineNumber: 5 },
      ],
    };
    const expectedTags: VariableRefs = {
      echo: [
        { templateName: "<string>", lineNumber: 3 },
        { templateName: "<string>", lineNumber: 5 },
        { templateName: "<string>", lineNumber: 9 },
      ],
      for: [{ templateName: "<string>", lineNumber: 8 }],
      if: [{ templateName: "<string>", lineNumber: 2 }],
      liquid: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze tablerow tag", async () => {
    const template = env.fromString(
      "{% tablerow x in y.z %}{{ x | append: a }}{% endtablerow %}",
    );

    const expectedGlobals: VariableRefs = {
      "y.z": [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      "y.z": [{ templateName: "<string>", lineNumber: 1 }],
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      tablerow: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze unless tag", async () => {
    const template = env.fromString(
      [
        "{% unless x %}",
        "  {{ a }}",
        "{% elsif y %}",
        "  {{ b }}",
        "{% endunless %}",
      ].join("\n"),
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 3 }],
      b: [{ templateName: "<string>", lineNumber: 4 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
      a: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 3 }],
      b: [{ templateName: "<string>", lineNumber: 4 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      unless: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze include tag", async () => {
    const loader = new ObjectLoader({ some_name: "{{ y }}" });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% include 'some_name' %}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      include: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze include tag with assign", async () => {
    const loader = new ObjectLoader({ some_name: "{{ y }}{% assign z = 4 %}" });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% include 'some_name' %}{{ z }}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {
      z: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      assign: [{ templateName: "some_name", lineNumber: 1 }],
      include: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze include tag once", async () => {
    const loader = new ObjectLoader({ some_name: "{{ y }}" });
    const _env = new Environment({ loader });
    const template = _env.fromString(
      "{% include 'some_name' %}{% include 'some_name' %}",
    );

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      include: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 1 },
      ],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze recursive include tag", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y }}{% include 'some_name' %}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% include 'some_name' %}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      include: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "some_name", lineNumber: 1 },
      ],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze include tag with bound variable", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}{{ some_name }}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% include 'some_name' with foo %}");

    const expectedGlobals: VariableRefs = {
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "some_name", lineNumber: 1 }],
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      x: [{ templateName: "some_name", lineNumber: 1 }],
      some_name: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      include: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze include tag with alias", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% include 'some_name' with foo as x %}");

    const expectedGlobals: VariableRefs = {
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      include: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze include tag with arguments", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString(
      "{% include 'some_name', x:y, z:'4' %}\n{{ x }}",
    );

    const expectedGlobals: VariableRefs = {
      y: [
        { templateName: "some_name", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 1 },
      ],
      x: [{ templateName: "<string>", lineNumber: 2 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [
        { templateName: "some_name", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 2 },
      ],
      y: [
        { templateName: "some_name", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 1 },
      ],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      include: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze include with variable name", async () => {
    const _env = new Environment();
    const template = _env.fromString("{% include somevar %}{{ y }}");

    const expectedGlobals: VariableRefs = {
      somevar: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      somevar: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedUnloadablePartials = {
      somevar: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      include: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      expectedUnloadablePartials,
      false,
      expectedFilters,
      expectedTags,
    );

    expect(async () =>
      _test(
        template,
        expectedVariables,
        expectedLocals,
        expectedGlobals,
        undefined,
        expectedUnloadablePartials,
        true,
      ),
    ).rejects.toThrow(TemplateTraversalError);
  });

  test("analyze include template not found", async () => {
    const _env = new Environment();
    const template = _env.fromString("{% include 'nosuchtemplate' %}{{ y }}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedUnloadablePartials: VariableRefs = {
      nosuchtemplate: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      include: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      expectedUnloadablePartials,
      false,
      expectedFilters,
      expectedTags,
    );

    expect(async () =>
      _test(
        template,
        expectedVariables,
        expectedLocals,
        expectedGlobals,
        undefined,
        expectedUnloadablePartials,
        true,
      ),
    ).rejects.toThrow(TemplateTraversalError);
  });

  test("analyze render tag", async () => {
    const loader = new ObjectLoader({ some_name: "{{ x }}{% assign y = z %}" });
    const _env = new Environment({ loader });
    const template = _env.fromString(
      "{% assign z = 1 %}{% render 'some_name' %}",
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
      z: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
      z: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      assign: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "some_name", lineNumber: 1 },
      ],
      render: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze render tag once", async () => {
    const loader = new ObjectLoader({ some_name: "{{ x }}" });
    const _env = new Environment({ loader });
    const template = _env.fromString(
      "{% render 'some_name' %}{% render 'some_name' %}",
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      render: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 1 },
      ],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze recursive render tag", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y }}{% render 'some_name' %}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% render 'some_name' %}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      render: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "some_name", lineNumber: 1 },
      ],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze render tag with bound variable", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}{{ some_name }}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% render 'some_name' with foo %}");

    const expectedGlobals: VariableRefs = {
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "some_name", lineNumber: 1 }],
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      x: [{ templateName: "some_name", lineNumber: 1 }],
      some_name: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      render: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze render tag with alias", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString("{% render 'some_name' with foo as x %}");

    const expectedGlobals: VariableRefs = {
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
      foo: [{ templateName: "<string>", lineNumber: 1 }],
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      render: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze render tag with arguments", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader });
    const template = _env.fromString(
      "{% render 'some_name', x:y, z:'4' %}\n{{ x }}",
    );

    const expectedGlobals: VariableRefs = {
      y: [
        { templateName: "some_name", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 1 },
      ],
      x: [{ templateName: "<string>", lineNumber: 2 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [
        { templateName: "some_name", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 2 },
      ],
      y: [
        { templateName: "some_name", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 1 },
      ],
    };
    const expectedFilters: VariableRefs = {
      append: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      render: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze render tag scope", async () => {
    const loader = new ObjectLoader({ some_name: "{{ x }}{% assign y = z %}" });
    const _env = new Environment({ loader });
    const template = _env.fromString(
      "{% assign z = 1 %}{% render 'some_name' %}{{ y }}",
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
      z: [{ templateName: "some_name", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {
      z: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
      z: [{ templateName: "some_name", lineNumber: 1 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      assign: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "some_name", lineNumber: 1 },
      ],
      render: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze render tag template not found", async () => {
    const _env = new Environment();
    const template = _env.fromString("{% render 'nosuchtemplate' %}{{ y }}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedUnloadablePartials: VariableRefs = {
      nosuchtemplate: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {};
    const expectedTags: VariableRefs = {
      render: [{ templateName: "<string>", lineNumber: 1 }],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      expectedUnloadablePartials,
      false,
      expectedFilters,
      expectedTags,
    );

    expect(async () =>
      _test(
        template,
        expectedVariables,
        expectedLocals,
        expectedGlobals,
        undefined,
        expectedUnloadablePartials,
        true,
      ),
    ).rejects.toThrow(TemplateTraversalError);
  });

  test("node missing children", async () => {
    const _env = new Environment();
    _env.addTag("mock", new MockTag());
    const template = _env.fromString("{% mock %}\n{% mock %}");

    const expectedFailedVisits = {
      MockNode: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 2 },
      ],
    };
    const expectedTags = {
      mock: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 2 },
      ],
    };

    await _test(
      template,
      {},
      {},
      {},
      expectedFailedVisits,
      {},
      false,
      {},
      expectedTags,
    );

    expect(async () =>
      _test(template, {}, {}, {}, expectedFailedVisits, {}, true),
    ).rejects.toThrow(TemplateTraversalError);
  });

  test("expression missing children", async () => {
    const _env = new Environment();
    _env.addTag("mock", new MockChildTag());
    const template = _env.fromString("{% mock %}\n{% mock %}");

    const expectedFailedVisits = {
      MockExpression: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 2 },
      ],
    };
    const expectedTags = {
      mock: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 2 },
      ],
    };

    await _test(
      template,
      {},
      {},
      {},
      expectedFailedVisits,
      {},
      false,
      {},
      expectedTags,
    );

    expect(async () =>
      _test(template, {}, {}, {}, expectedFailedVisits, {}, true),
    ).rejects.toThrow(TemplateTraversalError);
  });

  test("macro and call", async () => {
    const _env = new Environment();
    _env.addTag("call", new CallTag());
    _env.addTag("macro", new MacroTag());

    const template = _env.fromString(
      "{% macro 'foo', you: 'World', arg: n %}" +
        "Hello, {{ you }}!" +
        "{% endmacro %}" +
        "{% call 'foo' %}" +
        "{% assign x = 'you' %}" +
        "{% call 'foo', you: x %}",
    );

    const expectedGlobals: VariableRefs = {
      n: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {
      n: [{ templateName: "<string>", lineNumber: 1 }],
      you: [{ templateName: "<string>", lineNumber: 1 }],
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      assign: [{ templateName: "<string>", lineNumber: 1 }],
      macro: [{ templateName: "<string>", lineNumber: 1 }],
      call: [
        { templateName: "<string>", lineNumber: 1 },
        { templateName: "<string>", lineNumber: 1 },
      ],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      {},
      expectedTags,
    );
  });

  test("analyze inheritance chain", async () => {
    const loader = new ObjectLoader({
      base:
        "Hello, " +
        "{% assign x = 'foo' %}" +
        "{% block content %}{{ x | upcase }}{% endblock %}!" +
        "{% block foo %}{% endblock %}!",
      other:
        "{% extends 'base' %}" +
        "{% block content %}{{ x | downcase }}{% endblock %}" +
        "{% block foo %}{% assign z = 7 %}{% endblock %}",
      some:
        "{% extends 'other' %}{{ y | append: x }}" +
        "{% block foo %}{% endblock %}",
    });

    const _env = new Environment({ loader });
    addInheritanceTags(_env);
    const template = _env.getTemplateSync("some");

    const expectedGlobals: VariableRefs = {};
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "base", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "other", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      downcase: [{ templateName: "other", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      assign: [{ templateName: "base", lineNumber: 1 }],
      extends: [
        { templateName: "some", lineNumber: 1 },
        { templateName: "other", lineNumber: 1 },
      ],
      block: [
        { templateName: "some", lineNumber: 1 },
        { templateName: "other", lineNumber: 1 },
        { templateName: "other", lineNumber: 1 },
        { templateName: "base", lineNumber: 1 },
        { templateName: "base", lineNumber: 1 },
      ],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });

  test("analyze recursive extends", async () => {
    const loader = new ObjectLoader({
      other: "{% extends 'some' %}",
      some: "{% extends 'other' %}",
    });

    const _env = new Environment({ loader });
    addInheritanceTags(_env);
    const template = _env.getTemplateSync("some");
    expect(() => template.analyzeSync()).toThrow(TemplateInheritanceError);
    expect(async () => await template.analyze()).rejects.toThrow(
      TemplateInheritanceError,
    );
  });

  test("analyze super block", async () => {
    const loader = new ObjectLoader({
      base: "Hello, {% block content %}{{ foo | upcase }}{% endblock %}!",
      some:
        "{% extends 'base' %}" +
        "{% block content %}{{ block.super }}!{% endblock %}",
    });

    const _env = new Environment({ loader });
    addInheritanceTags(_env);
    const template = _env.getTemplateSync("some");

    const expectedGlobals: VariableRefs = {
      foo: [{ templateName: "base", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      foo: [{ templateName: "base", lineNumber: 1 }],
      "block.super": [{ templateName: "some", lineNumber: 1 }],
    };
    const expectedFilters: VariableRefs = {
      upcase: [{ templateName: "base", lineNumber: 1 }],
    };
    const expectedTags: VariableRefs = {
      extends: [{ templateName: "some", lineNumber: 1 }],
      block: [
        { templateName: "some", lineNumber: 1 },
        { templateName: "base", lineNumber: 1 },
      ],
    };

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      undefined,
      undefined,
      expectedFilters,
      expectedTags,
    );
  });
});
