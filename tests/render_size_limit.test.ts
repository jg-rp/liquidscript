import { Environment, ObjectLoader } from "../src";
import { RenderContext } from "../src/context";
import { ResourceLimitError } from "../src/errors";

describe("render size", () => {
  test("render size limit", async () => {
    const loader = new ObjectLoader({
      foo: "World",
    });
    const env = new Environment({ loader, maxRenderSize: 24 });
    const template = env.parse("Hello, {% render 'foo' %}");
    const ctx = new RenderContext(template, {});
    const buf = env.bufferFactory();

    await template.renderWithContext(ctx, buf);
    expect(buf.length).toBe(24);

    env.maxRenderSize = 23;
    expect(async () => await template.render()).toThrow(ResourceLimitError);
  });

  test("render size limit sync", () => {
    const loader = new ObjectLoader({
      foo: "World",
    });
    const env = new Environment({ loader, maxRenderSize: 24 });
    const template = env.parse("Hello, {% render 'foo' %}");
    const ctx = new RenderContext(template, {});
    const buf = env.bufferFactory();

    template.renderWithContextSync(ctx, buf);
    expect(buf.length).toBe(24);

    env.maxRenderSize = 23;
    expect(() => template.renderSync()).toThrow(ResourceLimitError);
  });
});
