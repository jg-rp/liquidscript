import { Environment, ObjectLoader } from "../src";
import { RenderContext } from "../src/context";
import { ResourceLimitError } from "../src/errors";

describe("render score", () => {
  test("render score limit", async () => {
    const env = new Environment({ maxRenderScore: 3 });
    const template = env.parse("Hello, {{ you }}!");
    const ctx = new RenderContext(template, {});

    await template.renderWithContext(ctx, env.bufferFactory());
    expect(ctx.renderScore).toBe(3);

    env.maxRenderScore = 2;
    expect(async () => await template.render()).toThrow(ResourceLimitError);
  });

  test("render score limit sync", () => {
    const env = new Environment({ maxRenderScore: 3 });
    const template = env.parse("Hello, {{ you }}!");
    const ctx = new RenderContext(template, {});

    template.renderWithContextSync(ctx, env.bufferFactory());
    expect(ctx.renderScore).toBe(3);

    env.maxRenderScore = 2;
    expect(() => template.renderSync()).toThrow(ResourceLimitError);
  });

  test("cumulative render score limit", async () => {
    const loader = new ObjectLoader({
      foo: "{{ you }}!",
    });
    const env = new Environment({ loader, maxRenderScoreCumulative: 4 });
    const template = env.parse("Hello, {% render 'foo' %}");
    const ctx = new RenderContext(template, {});

    await template.renderWithContext(ctx, env.bufferFactory());
    expect(ctx.renderScoreCumulative).toBe(4);

    env.maxRenderScoreCumulative = 3;
    expect(async () => await template.render()).toThrow(ResourceLimitError);
  });

  test("cumulative render score limit sync", () => {
    const loader = new ObjectLoader({
      foo: "{{ you }}!",
    });
    const env = new Environment({ loader, maxRenderScoreCumulative: 4 });
    const template = env.parse("Hello, {% render 'foo' %}");
    const ctx = new RenderContext(template, {});

    template.renderWithContextSync(ctx, env.bufferFactory());
    expect(ctx.renderScoreCumulative).toBe(4);

    env.maxRenderScoreCumulative = 3;
    expect(() => template.renderSync()).toThrow(ResourceLimitError);
  });
});
