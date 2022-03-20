import { MapLoader } from "../../src/builtin/loaders";
import { NodeFileSystemLoader } from "../../src/builtin/loaders/file_system";
import { ChoiceLoader } from "../../src/builtin/loaders/choice";
import { Environment } from "../../src/environment";

describe("choice template loader", () => {
  test("chose from one of multiple template loaders synchronously", () => {
    const mapLoader = new MapLoader(
      new Map([["layout", "Page Title\n{% include 'some.liquid' %}"]])
    );
    const fsLoader = new NodeFileSystemLoader("tests/fixtures/templates/");
    const loader = new ChoiceLoader([mapLoader, fsLoader]);
    const env = new Environment({ loader });
    const template = env.getTemplateSync("layout");
    expect(template.renderSync()).toBe("Page Title\nHello, World!\n");
  });
  test("chose from one of multiple template loaders asynchronously", async () => {
    const mapLoader = new MapLoader(
      new Map([["layout", "Page Title\n{% include 'some.liquid' %}"]])
    );
    const fsLoader = new NodeFileSystemLoader("tests/fixtures/templates/");
    const loader = new ChoiceLoader([mapLoader, fsLoader]);
    const env = new Environment({ loader });
    const template = await env.getTemplate("layout");
    const result = await template.render();
    expect(result).toBe("Page Title\nHello, World!\n");
  });
});
