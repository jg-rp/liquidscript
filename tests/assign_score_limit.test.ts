import { Environment, ObjectLoader } from "../src";
import { RenderContext } from "../src/context";
import { ResourceLimitError } from "../src/errors";

describe("assign score", () => {
  test("assign score limit", () => {
    const env = new Environment({ maxAssignScore: 10 });
    const template = env.parse("{% assign greeting = 'hello' %}");
    const ctx = new RenderContext(template, {});

    template.renderWithContextSync(ctx, env.bufferFactory());
    expect(ctx.assignScore).toBe(10);

    env.maxAssignScore = 9;
    expect(() => template.renderSync()).toThrow(ResourceLimitError);
  });

  test("cumulative assign score limit", () => {
    const loader = new ObjectLoader({
      foo: "{% assign bar = 'goodbye' %}",
    });
    const env = new Environment({ loader, maxAssignScoreCumulative: 24 });
    const template = env.parse(
      "{% assign greeting = 'hello' %}{% render 'foo' %}",
    );
    const ctx = new RenderContext(template, {});

    template.renderWithContextSync(ctx, env.bufferFactory());
    expect(ctx.assignScoreCumulative).toBe(10); // the copy would be 24

    env.maxAssignScoreCumulative = 23;
    expect(() => template.renderSync()).toThrow(ResourceLimitError);
  });
});

// TODO: cover async
