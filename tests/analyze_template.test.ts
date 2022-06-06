import { ChildNode, Node } from "../src/ast";
import { ObjectLoader } from "../src/builtin/loaders";
import { RenderContext } from "../src/context";
import { Environment } from "../src/environment";
import { TemplateTraversalError } from "../src/errors";
import { Expression } from "../src/expression";
import { RenderStream } from "../src/io/output_stream";
import { Tag } from "../src/tag";
import { VariableRefs, Template } from "../src/template";
import { Token, TokenStream } from "../src/token";

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
    raiseForFailures: boolean = true
  ) {
    failedVisits = failedVisits ?? {};
    unloadablePartials = unloadablePartials ?? {};

    let refs = await template.analyze({ raiseForFailures });
    expect(refs.variables).toStrictEqual(variables);
    expect(refs.localVariables).toStrictEqual(locals);
    expect(refs.globalVariables).toStrictEqual(globals);
    expect(refs.failedVisits).toStrictEqual(failedVisits);
    expect(refs.unloadablePartials).toStrictEqual(unloadablePartials);

    refs = template.analyzeSync({ raiseForFailures });
    expect(refs.variables).toStrictEqual(variables);
    expect(refs.localVariables).toStrictEqual(locals);
    expect(refs.globalVariables).toStrictEqual(globals);
    expect(refs.failedVisits).toStrictEqual(failedVisits);
    expect(refs.unloadablePartials).toStrictEqual(unloadablePartials);
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
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

  test("analyze identifier with nested identifier", async () => {
    const template = env.fromString("{{ x[y.z].title }}");

    const expectedGlobals: VariableRefs = {
      "x.[y.z].title": [{ templateName: "<string>", lineNumber: 1 }],
      "y.z": [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      "x.[y.z].title": [{ templateName: "<string>", lineNumber: 1 }],
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze capture tag", async () => {
    const template = env.fromString(
      "{% capture x %}{% if y %}z{% endif %}{% endcapture %}"
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
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
      ].join("\n")
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze decrement tag", async () => {
    const template = env.fromString("{% decrement x %}");

    const expectedGlobals: VariableRefs = {};
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {};

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze echo tag", async () => {
    const template = env.fromString(
      "{% echo x | default: y, allow_false: z %}"
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze for tag", async () => {
    const template = env.fromString(
      [
        "{% for x in (1..y) %}",
        "  {{ x }}",
        "{% else %}",
        "  {{ z }}",
        "{% endfor %}",
      ].join("\n")
    );

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 4 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 2 }],
      y: [{ templateName: "<string>", lineNumber: 1 }],
      z: [{ templateName: "<string>", lineNumber: 4 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze if tag", async () => {
    const template = env.fromString(
      [
        "{% if x %}",
        "  {{ a }}",
        "{% elsif y %}",
        "  {{ b }}",
        "{% endif %}",
      ].join("\n")
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze increment tag", async () => {
    const template = env.fromString("{% increment x %}");

    const expectedGlobals: VariableRefs = {};
    const expectedLocals: VariableRefs = {
      x: [{ templateName: "<string>", lineNumber: 1 }],
    };
    const expectedVariables: VariableRefs = {};

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
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
      ].join("\n")
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze tablerow tag", async () => {
    const template = env.fromString(
      "{% tablerow x in y.z %}{{ x | append: a }}{% endtablerow %}"
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze unless tag", async () => {
    const template = env.fromString(
      [
        "{% unless x %}",
        "  {{ a }}",
        "{% elsif y %}",
        "  {{ b }}",
        "{% endunless %}",
      ].join("\n")
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze include tag", async () => {
    const loader = new ObjectLoader({ some_name: "{{ y }}" });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString("{% include 'some_name' %}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze include tag with assign", async () => {
    const loader = new ObjectLoader({ some_name: "{{ y }}{% assign z = 4 %}" });
    const _env = new Environment({ loader: loader });
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze include tag once", async () => {
    const loader = new ObjectLoader({ some_name: "{{ y }}" });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString(
      "{% include 'some_name' %}{% include 'some_name' %}"
    );

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze recursive include tag", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y }}{% include 'some_name' %}",
    });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString("{% include 'some_name' %}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze include tag with bound variable", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}{{ some_name }}",
    });
    const _env = new Environment({ loader: loader });
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze include tag with alias", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader: loader });
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze include tag with arguments", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString(
      "{% include 'some_name', x:y, z:'4' %}\n{{ x }}"
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
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

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      expectedUnloadablePartials,
      false
    );

    expect(async () =>
      _test(
        template,
        expectedVariables,
        expectedLocals,
        expectedGlobals,
        undefined,
        expectedUnloadablePartials,
        true
      )
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

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      expectedUnloadablePartials,
      false
    );

    expect(async () =>
      _test(
        template,
        expectedVariables,
        expectedLocals,
        expectedGlobals,
        undefined,
        expectedUnloadablePartials,
        true
      )
    ).rejects.toThrow(TemplateTraversalError);
  });

  test("analyze render tag", async () => {
    const loader = new ObjectLoader({ some_name: "{{ x }}{% assign y = z %}" });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString(
      "{% assign z = 1 %}{% render 'some_name' %}"
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze render tag once", async () => {
    const loader = new ObjectLoader({ some_name: "{{ x }}" });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString(
      "{% render 'some_name' %}{% render 'some_name' %}"
    );

    const expectedGlobals: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      x: [{ templateName: "some_name", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze recursive render tag", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y }}{% render 'some_name' %}",
    });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString("{% render 'some_name' %}");

    const expectedGlobals: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };
    const expectedLocals: VariableRefs = {};
    const expectedVariables: VariableRefs = {
      y: [{ templateName: "some_name", lineNumber: 1 }],
    };

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze render tag with bound variable", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}{{ some_name }}",
    });
    const _env = new Environment({ loader: loader });
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze render tag with alias", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader: loader });
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze render tag with arguments", async () => {
    const loader = new ObjectLoader({
      some_name: "{{ y | append: x }}",
    });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString(
      "{% render 'some_name', x:y, z:'4' %}\n{{ x }}"
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
  });

  test("analyze render tag scope", async () => {
    const loader = new ObjectLoader({ some_name: "{{ x }}{% assign y = z %}" });
    const _env = new Environment({ loader: loader });
    const template = _env.fromString(
      "{% assign z = 1 %}{% render 'some_name' %}{{ y }}"
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

    await _test(template, expectedVariables, expectedLocals, expectedGlobals);
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

    await _test(
      template,
      expectedVariables,
      expectedLocals,
      expectedGlobals,
      undefined,
      expectedUnloadablePartials,
      false
    );

    expect(async () =>
      _test(
        template,
        expectedVariables,
        expectedLocals,
        expectedGlobals,
        undefined,
        expectedUnloadablePartials,
        true
      )
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

    await _test(template, {}, {}, {}, expectedFailedVisits, {}, false);

    expect(async () =>
      _test(template, {}, {}, {}, expectedFailedVisits, {}, true)
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

    await _test(template, {}, {}, {}, expectedFailedVisits, {}, false);

    expect(async () =>
      _test(template, {}, {}, {}, expectedFailedVisits, {}, true)
    ).rejects.toThrow(TemplateTraversalError);
  });
});
