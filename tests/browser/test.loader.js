const url =
  "https://raw.githubusercontent.com/jg-rp/liquidscript/main/tests/fixtures/templates";

suite("Fetch Loader", () => {
  const loader = new liquidscript.FetchLoader(url);
  const env = new liquidscript.Environment({ loader });

  test("get source", async () => {
    const template = await env.getTemplate("some.liquid");
    const result = await template.render({ you: "everyone" });
    expect(result).to.equal("Hello, everyone!\n");
  });

  test("template not found", async () => {
    let error = null;

    try {
      await env.getTemplate("nosuchthing.liquid");
    } catch (err) {
      error = err;
    }

    expect(error).to.an.instanceof(liquidscript.TemplateNotFoundError);
  });
});

suite("XMLHttpRequest Loader", () => {
  const loader = new liquidscript.XMLHttpRequestLoader(url);
  const env = new liquidscript.Environment({ loader });

  test("get source", async () => {
    const template = await env.getTemplate("some.liquid");
    const result = await template.render({ you: "everyone" });
    expect(result).to.equal("Hello, everyone!\n");
  });

  test("get source sync", () => {
    const template = env.getTemplateSync("some.liquid");
    const result = template.renderSync({ you: "everyone" });
    expect(result).to.equal("Hello, everyone!\n");
  });

  test("template not found", async () => {
    let error = null;

    try {
      await env.getTemplate("nosuchthing.liquid");
    } catch (err) {
      error = err;
    }

    expect(error).to.an.instanceof(liquidscript.TemplateNotFoundError);
  });
});
