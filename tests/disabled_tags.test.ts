import { ObjectLoader } from "../src/builtin/loaders";
import { Environment } from "../src/environment";
import { DisabledTagError } from "../src/errors";

describe("disabled tags", () => {
  test("include is disabled inside render", () => {
    const env = new Environment({
      loader: new ObjectLoader({ "some.liquid": "{% include 'foo' %}" }),
    });
    const template = env.fromString("{% render 'some.liquid' %}");
    expect(() => template.renderSync()).toThrow(DisabledTagError);
    expect(async () => template.render()).rejects.toThrow(DisabledTagError);
  });
  test("include is disabled inside render from block", () => {
    const env = new Environment({
      loader: new ObjectLoader({
        "some.liquid": "{% if true %}{% include 'foo' %}{% endif %}",
      }),
    });
    const template = env.fromString("{% render 'some.liquid' %}");
    expect(() => template.renderSync()).toThrow(DisabledTagError);
    expect(async () => template.render()).rejects.toThrow(DisabledTagError);
  });
});
