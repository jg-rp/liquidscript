const { tokens, expressions, object, LiquidSyntaxError } = require("../../../");

const END_PAGINATE_BLOCK = new Set(["endpaginate"]);

function* tokenize(source, startIndex) {
  for (const match of source.matchAll(expressions.filtered.RE)) {
    const groups = match.groups;
    if (groups[expressions.TOKEN_IDENT] !== undefined) {
      if (groups[expressions.TOKEN_IDENT] === expressions.TOKEN_BY) {
        yield new tokens.Token(
          match[0],
          match[0],
          match.index + startIndex,
          source
        );
      } else {
        yield new tokens.Token(
          expressions.TOKEN_IDENT,
          groups[expressions.TOKEN_IDENT],
          match.index + startIndex,
          source
        );
      }
    } else if (groups[expressions.TOKEN_DOT] !== undefined) {
      yield new tokens.Token(
        expressions.TOKEN_DOT,
        groups[expressions.TOKEN_DOT],
        match.index + startIndex,
        source
      );
    } else if (groups[expressions.TOKEN_INTEGER] !== undefined) {
      yield new tokens.Token(
        expressions.TOKEN_INTEGER,
        groups[expressions.TOKEN_INTEGER],
        match.index + startIndex,
        source
      );
    } else if (groups[expressions.TOKEN_SKIP] !== undefined) {
      continue;
    } else {
      throw new LiquidSyntaxError(
        `unexpected token '${JSON.stringify(groups)}'`,
        new tokens.Token(
          expressions.TOKEN_ILLEGAL,
          groups.TOKEN_ILLEGAL,
          match.index + startIndex,
          source
        )
      );
    }
  }
}

const PaginateTag = {
  block: true,
  parse: function (stream, env) {
    const token = stream.next();

    stream.expect(tokens.TOKEN_EXPRESSION);
    const exprStream = new expressions.ExpressionTokenStream(
      tokenize(stream.current.value)
    );

    exprStream.expect(expressions.TOKEN_IDENT);
    const ident = expressions.parseIdentifier(exprStream);
    exprStream.next();

    // Eat TOKEN_BY
    exprStream.expect(expressions.TOKEN_BY);
    exprStream.next();

    // Read page size
    exprStream.expect(expressions.TOKEN_INTEGER);
    const pageSize = expressions.parseIntegerLiteral(exprStream);
    exprStream.next();
    exprStream.expect(expressions.TOKEN_EOF);

    stream.next();
    return paginateNode(
      token,
      ident,
      pageSize.value,
      env.parser.parseBlock(stream, END_PAGINATE_BLOCK)
    );
  },
};

function paginateNode(token, ident, pageSize, block) {
  return {
    token,
    render: async function (context, out) {
      const collection = await ident.evaluate(context);
      const collectionSize = collection.length;
      const pageCount = Math.ceil(collectionSize / pageSize);

      const contextPage = await context.get("current_page");
      const currentPage = object.isUndefined(contextPage) ? 1 : contextPage;

      const pagination = {
        page_size: pageSize,
        current_page: currentPage,
        current_offset: currentPage * pageSize,
        items: collectionSize,
        pages: pageCount,
        parts: [],
        previous: null,
        next: null,
      };

      if (currentPage > 1) {
        pagination.next = link("&laquo; Previous", currentPage - 1);
      }

      if (currentPage < pageCount) {
        pagination.next = link("Next &raquo;", currentPage + 1);
      }

      if (pageCount > 1) {
        for (let i = 1; i <= pageCount; i++) {
          if (currentPage === i) {
            pagination.parts.push(noLink(i));
          } else {
            pagination.parts.push(link(i, i));
          }
        }
      }

      await context.extend({ paginate: pagination }, async () => {
        await block.render(context, out);
      });
    },
    renderSync: function (context, out) {
      const collection = ident.evaluateSync(context);
      const collectionSize = collection.length;
      const pageCount = Math.ceil(collectionSize / pageSize);

      const contextPage = context.getSync("current_page");
      const currentPage = object.isUndefined(contextPage) ? 1 : contextPage;

      const pagination = {
        page_size: pageSize,
        current_page: currentPage,
        current_offset: currentPage * pageSize,
        items: collectionSize,
        pages: pageCount,
        parts: [],
        previous: null,
        next: null,
      };

      if (currentPage > 1) {
        pagination.next = link("&laquo; Previous", currentPage - 1);
      }

      if (currentPage < pageCount) {
        pagination.next = link("Next &raquo;", currentPage + 1);
      }

      if (pageCount > 1) {
        for (let i = 1; i <= pageCount; i++) {
          if (currentPage === i) {
            pagination.parts.push(noLink(i));
          } else {
            pagination.parts.push(link(i, i));
          }
        }
      }

      context.extendSync({ paginate: pagination }, () => {
        block.renderSync(context, out);
      });
    },
  };
}

function link(title, page) {
  return {
    title: title,
    url: `/collections/frontpage?page=${page}`,
    is_link: true,
  };
}

function noLink(title) {
  return { title: title, is_link: false };
}

module.exports = { PaginateTag };
