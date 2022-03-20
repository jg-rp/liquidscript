import { Environment } from "../../src/environment";
import { NodeFileSystemLoader } from "../../src/builtin/loaders/file_system";
import { Template } from "../../src/template";
import { TemplateNotFoundError } from "../../src/errors";

describe("node file system loader", () => {
  test("synchronously load a template", () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates/");
    const env = new Environment({ loader });
    const template = env.getTemplateSync("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");
  });
  test("asynchronously load a template", async () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates/");
    const env = new Environment({ loader });
    const template = await env.getTemplate("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");
  });
  test("synchronously load a template from a path without a trailing slash", () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    const template = env.getTemplateSync("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");
  });
  test("asynchronously load a template from a path without a trailing slash", async () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    const template = await env.getTemplate("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");
  });
  test("synchronously load from one of an array of paths", () => {
    const loader = new NodeFileSystemLoader([
      "tests/fixtures/templates",
      "tests/fixtures/more_templates",
    ]);
    const env = new Environment({ loader });

    let template = env.getTemplateSync("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");

    template = env.getTemplateSync("other.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Goodbye world.\n");
  });
  test("asynchronously load from one of an array of paths", async () => {
    const loader = new NodeFileSystemLoader([
      "tests/fixtures/templates",
      "tests/fixtures/more_templates",
    ]);
    const env = new Environment({ loader });

    let template = await env.getTemplate("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");

    template = await env.getTemplate("other.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Goodbye world.\n");
  });
  test("sync template not found", () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(() => env.getTemplateSync("nosuchthing.liquid")).toThrow(
      TemplateNotFoundError
    );
  });
  test("async template not found", async () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(
      async () => await env.getTemplate("nosuchthing.liquid")
    ).rejects.toThrow(TemplateNotFoundError);
  });
  test("synchronously load a template with default file extension", () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates/", {
      fileExtension: ".liquid",
    });
    const env = new Environment({ loader });
    const template = env.getTemplateSync("some");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");
  });
  test("asynchronously load a template with default file extension", async () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates/", {
      fileExtension: ".liquid",
    });
    const env = new Environment({ loader });
    const template = await env.getTemplate("some");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");
  });
  test("sync don't escape template search path", () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(() => env.getTemplateSync("../private.liquid")).toThrow(
      TemplateNotFoundError
    );
  });
  test("async don't escape template search path", async () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(
      async () => await env.getTemplate("../private.liquid")
    ).rejects.toThrow(TemplateNotFoundError);
  });
  test("sync don't search absolute paths", () => {
    const loader = new NodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(() => env.getTemplateSync("/tmp/private.liquid")).toThrow(
      TemplateNotFoundError
    );
  });
});
