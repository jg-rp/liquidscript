const { expressions, tokens } = require("../../../");

const END_FORM_BLOCK = new Set(["endform"]);

const CommentFormTag = {
  block: true,
  name: "comment",
  parse: function (stream, env) {
    const token = stream.next();

    stream.expect(tokens.TOKEN_EXPRESSION);
    const article = expressions.parseIdentifier(
      new expressions.ExpressionTokenStream(
        expressions.filtered.tokenize(stream.current.value)
      )
    );

    stream.next();
    return commentFormNode(
      token,
      article,
      env.parser.parseBlock(stream, END_FORM_BLOCK)
    );
  },
};

function commentFormNode(token, article, block) {
  return {
    token,
    render: async function (context, out) {
      const _article = await article.evaluate(context);

      const form = Object.fromEntries([
        [
          "posted_successfully?",
          await context.get("posted_successfully?", [], true),
        ],
        ["errors", await context.get("comment", ["errors"], [])],
        ["author", await context.get("comment", ["author"])],
        ["email", await context.get("comment", ["email"])],
        ["body", await context.get("comment", ["body"])],
      ]);

      out.write(
        `<form id="article-${_article.id}-comment-form" ` +
          `class="comment-form" method="post" action="">\n`
      );

      context.scope.push({ form: form });
      try {
        await block.render(context, out);
      } finally {
        context.scope.pop();
      }

      out.write("\n</form>");
    },
    renderSync: function (context, out) {
      const _article = article.evaluateSync(context);

      const form = Object.fromEntries([
        [
          "posted_successfully?",
          context.getSync("posted_successfully?", [], true),
        ],
        ["errors", context.getSync("comment", ["errors"], [])],
        ["author", context.getSync("comment", ["author"])],
        ["email", context.getSync("comment", ["email"])],
        ["body", context.getSync("comment", ["body"])],
      ]);

      out.write(
        `<form id="article-${_article.id}-comment-form" ` +
          `class="comment-form" method="post" action="">\n`
      );

      context.scope.push({ form: form });
      try {
        block.renderSync(context, out);
      } finally {
        context.scope.pop();
      }

      out.write("\n</form>");
    },
  };
}

module.exports = {
  CommentFormTag: CommentFormTag,
};
