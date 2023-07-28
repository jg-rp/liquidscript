import { Environment } from "../../src/environment";
import { CachingNodeFileSystemLoader } from "../../src/builtin/loaders/file_system_loader";
import { Template } from "../../src/template";
import { TemplateNotFoundError } from "../../src/errors";
import { mkdtempSync, rmSync, statSync, utimesSync, writeFileSync } from "fs";
import path from "path";
import os from "os";

describe("caching node file system loader", () => {
  test("synchronously load a template", () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates/");
    const env = new Environment({ loader });
    const template = env.getTemplateSync("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");
  });
  test("asynchronously load a template", async () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates/");
    const env = new Environment({ loader });
    const template = await env.getTemplate("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");
  });
  test("synchronously load a template from a path without a trailing slash", () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    const template = env.getTemplateSync("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");
  });
  test("asynchronously load a template from a path without a trailing slash", async () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    const template = await env.getTemplate("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");
  });
  test("synchronously load from one of an array of paths", () => {
    const loader = new CachingNodeFileSystemLoader([
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
    const loader = new CachingNodeFileSystemLoader([
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
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(() => env.getTemplateSync("nosuchthing.liquid")).toThrow(
      TemplateNotFoundError,
    );
  });
  test("async template not found", async () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(
      async () => await env.getTemplate("nosuchthing.liquid"),
    ).rejects.toThrow(TemplateNotFoundError);
  });
  test("synchronously load a template with default file extension", () => {
    const loader = new CachingNodeFileSystemLoader(
      "tests/fixtures/templates/",
      {
        fileExtension: ".liquid",
      },
    );
    const env = new Environment({ loader });
    const template = env.getTemplateSync("some");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");
  });
  test("asynchronously load a template with default file extension", async () => {
    const loader = new CachingNodeFileSystemLoader(
      "tests/fixtures/templates/",
      {
        fileExtension: ".liquid",
      },
    );
    const env = new Environment({ loader });
    const template = await env.getTemplate("some");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");
  });
  test("sync don't escape template search path", () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(() => env.getTemplateSync("../private.liquid")).toThrow(
      TemplateNotFoundError,
    );
  });
  test("async don't escape template search path", async () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    expect(
      async () => await env.getTemplate("../private.liquid"),
    ).rejects.toThrow(TemplateNotFoundError);
  });
  test("cached template", () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    const template = env.getTemplateSync("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!\n");
    expect(template.isUpToDateSync()).toBe(true);

    const sameTemplate = env.getTemplateSync("some.liquid");
    expect(sameTemplate).toBeInstanceOf(Template);
    expect(sameTemplate.isUpToDateSync()).toBe(true);

    expect(Object.is(template.tree, sameTemplate.tree)).toBe(true);
  });
  test("cached template async", async () => {
    const loader = new CachingNodeFileSystemLoader("tests/fixtures/templates");
    const env = new Environment({ loader });
    const template = await env.getTemplate("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!\n");
    expect(await template.isUpToDate()).toBe(true);

    const sameTemplate = await env.getTemplate("some.liquid");
    expect(sameTemplate).toBeInstanceOf(Template);
    expect(await sameTemplate.render()).toBe("Hello, World!\n");
    expect(await sameTemplate.isUpToDate()).toBe(true);

    expect(Object.is(template.tree, sameTemplate.tree)).toBe(true);
  });
  test("auto reload sync", () => {
    // Create a temporary template file in a temporary directory.
    const tmpDir = mkdtempSync(path.join(os.tmpdir(), "templates-"));
    const templatePath = path.join(tmpDir, "some.liquid");
    writeFileSync(templatePath, "Hello, {{ you | default: 'World' }}!", {
      encoding: "utf8",
    });

    const loader = new CachingNodeFileSystemLoader(tmpDir);
    const env = new Environment({ loader });

    // Load the template
    const template = env.getTemplateSync("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(template.renderSync()).toBe("Hello, World!");
    expect(template.isUpToDateSync()).toBe(true);

    // Touch the temporary template file
    const stat = statSync(templatePath);
    const mtime = new Date(stat.mtime.getTime() + 60000); // + 1 min
    utimesSync(templatePath, stat.atime, mtime);
    expect(statSync(templatePath).mtimeMs).toBeGreaterThan(stat.mtimeMs);

    // Auto reload the template
    expect(template.isUpToDateSync()).toBe(false);
    const updatedTemplate = env.getTemplateSync("some.liquid");
    expect(updatedTemplate).toBeInstanceOf(Template);
    expect(updatedTemplate.renderSync()).toBe("Hello, World!");
    expect(updatedTemplate.isUpToDateSync()).toBe(true);
    expect(Object.is(template.tree, updatedTemplate.tree)).toBe(false);

    rmSync(tmpDir, { recursive: true, force: true });
  });
  test("auto reload async", async () => {
    // Create a temporary template file in a temporary directory.
    const tmpDir = mkdtempSync(path.join(os.tmpdir(), "templates-"));
    const templatePath = path.join(tmpDir, "some.liquid");
    writeFileSync(templatePath, "Hello, {{ you | default: 'World' }}!", {
      encoding: "utf8",
    });

    const loader = new CachingNodeFileSystemLoader(tmpDir);
    const env = new Environment({ loader });

    // Load the template
    const template = await env.getTemplate("some.liquid");
    expect(template).toBeInstanceOf(Template);
    expect(await template.render()).toBe("Hello, World!");
    expect(await template.isUpToDate()).toBe(true);

    // Touch the temporary template file
    const stat = statSync(templatePath);
    const mtime = new Date(stat.mtime.getTime() + 60000); // + 1 min
    utimesSync(templatePath, stat.atime, mtime);
    expect(statSync(templatePath).mtimeMs).toBeGreaterThan(stat.mtimeMs);

    // Auto reload the template
    expect(await template.isUpToDate()).toBe(false);
    const updatedTemplate = await env.getTemplate("some.liquid");
    expect(updatedTemplate).toBeInstanceOf(Template);
    expect(await updatedTemplate.render()).toBe("Hello, World!");
    expect(await updatedTemplate.isUpToDate()).toBe(true);
    expect(Object.is(template.tree, updatedTemplate.tree)).toBe(false);

    rmSync(tmpDir, { recursive: true, force: true });
  });
});
