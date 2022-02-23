/* eslint-disable @typescript-eslint/no-var-requires */
const { TOKEN_EXPRESSION } = require("../../../lib/token");
const {
  TOKEN_BY,
  TOKEN_DOT,
  TOKEN_INTEGER,
  TOKEN_ILLEGAL,
  TOKEN_SKIP,
} = require("../../../lib/expressions/tokens");
const { Token } = require("../../../lib/token");
const {
  ExpressionTokenStream,
  TOKEN_IDENT,
  TOKEN_EOF,
} = require("../../../lib/expressions/tokens");
const { RE } = require("../../../lib/expressions/filtered/lex");
const { LiquidSyntaxError } = require("../../../lib/errors");
const {
  parseIdentifier,
  parseIntegerLiteral,
} = require("../../../lib/expressions/common");
const { isUndefined } = require("../../../lib/object");

const END_PAGINATE_BLOCK = new Set(["endpaginate"]);

function* tokenize(source, startIndex) {
  for (const match of source.matchAll(RE)) {
    const groups = match.groups;
    if (groups[TOKEN_IDENT] !== undefined) {
      if (groups[TOKEN_IDENT] === TOKEN_BY) {
        yield new Token(match[0], match[0], match.index + startIndex, source);
      } else {
        yield new Token(
          TOKEN_IDENT,
          groups[TOKEN_IDENT],
          match.index + startIndex,
          source
        );
      }
    } else if (groups[TOKEN_DOT] !== undefined) {
      yield new Token(
        TOKEN_DOT,
        groups[TOKEN_DOT],
        match.index + startIndex,
        source
      );
    } else if (groups[TOKEN_INTEGER] !== undefined) {
      yield new Token(
        TOKEN_INTEGER,
        groups[TOKEN_INTEGER],
        match.index + startIndex,
        source
      );
    } else if (groups[TOKEN_SKIP] !== undefined) {
      continue;
    } else {
      throw new LiquidSyntaxError(
        `unexpected token '${JSON.stringify(groups)}'`,
        new Token(
          TOKEN_ILLEGAL,
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
    const parser = env.getParser();
    const token = stream.next();

    stream.expect(TOKEN_EXPRESSION);
    const exprStream = new ExpressionTokenStream(
      tokenize(stream.current.value)
    );

    exprStream.expect(TOKEN_IDENT);
    const ident = parseIdentifier(exprStream);
    exprStream.next();

    // Eat TOKEN_BY
    exprStream.expect(TOKEN_BY);
    exprStream.next();

    // Read page size
    exprStream.expect(TOKEN_INTEGER);
    const pageSize = parseIntegerLiteral(exprStream);
    exprStream.next();
    exprStream.expect(TOKEN_EOF);

    stream.next();
    return paginateNode(
      token,
      ident,
      pageSize.value,
      parser.parseBlock(stream, END_PAGINATE_BLOCK)
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
      const currentPage = isUndefined(contextPage) ? 1 : contextPage;

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
          if (currentPage == i) {
            pagination.parts.push(noLink(i));
          } else {
            pagination.parts.push(link(i, i));
          }
        }
      }

      context.push(new Map([["paginate", pagination]]));
      try {
        await block.render(context, out);
      } finally {
        context.pop();
      }
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
