(function liquidPrism(Prism) {
  const liquid = {
    // Raw blocks must come first
    "raw-block": {
      pattern: /\{%-?\s*raw\s*-?%\}[\s\S]*?\{%-?\s*endraw\s*-?%\}/,
      greedy: true,
      alias: "string",
    },

    // Block comments
    "comment-block": {
      pattern: /\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/,
      greedy: true,
      alias: "comment",
    },

    // Alternative Liquid comments
    "comment-alt": {
      pattern: /\{#[\s\S]*?#\}/,
      greedy: true,
      alias: "comment",
    },

    // Inline liquid comments
    "inline-comment": {
      pattern: /(\{%-?\s*)#.*?(?=-?%\})/s,
      lookbehind: true,
      inside: {
        comment: /#.*/,
      },
    },

    // {% liquid %}
    "liquid-block": {
      pattern: /(\{%-?\s*liquid\b)[\s\S]*?(?=-?%\})/,
      lookbehind: true,
      greedy: true,

      inside: {
        comment: {
          pattern: /(^|\n)\s*#.*$/m,
          alias: "comment",
        },

        "tag-names": {
          pattern:
            /(^|\n)\s*(?:if|else|elsif|unless|case|when|for|break|continue|render|assign|capture|echo|increment|decrement|cycle|tablerow|paginate|form|layout|section|include)\b/m,
          lookbehind: true,
          alias: "keyword",
        },

        string: /"[^"]*"|'[^']*'/,

        filter: {
          pattern: /(\|\s*)\w+/,
          lookbehind: true,
          alias: "function",
        },

        operator: /!?=|<=?|>=?|<>|\.\./,

        keyword: /\b(?:and|or|contains|in|with|for|as|offset|limit|reversed)\b/,

        builtin: {
          pattern: /(\.)\b(?:first|last|size)\b/,
          lookbehind: true,
          alias: "function",
        },

        boolean: /\b(?:true|false|nil|blank|empty)\b/,

        number: /\b\d+(?:\.\d+)?\b/,

        "attr-name": /\b\w+(?=\s*:)/,

        variable: /\b[a-zA-Z_]\w*\b/,

        punctuation: /[[\](),.:]/,
      },
    },

    // {{ output }}
    output: {
      pattern: /\{\{-?[\s\S]*?-?\}\}/,
      greedy: false,
      inside: {
        delimiter: {
          pattern: /\{\{-?|-?\}\}/,
          alias: "punctuation",
        },

        string: /"[^"]*"|'[^']*'/,

        filter: {
          pattern: /(\|\s*)\w+/,
          lookbehind: true,
          alias: "function",
        },

        operator: /!?=|<=?|>=?|<>|\.\./,

        builtin: {
          pattern: /(\.)\b(?:first|last|size)\b/,
          lookbehind: true,
        },

        boolean: /\b(?:true|false|nil|blank|empty)\b/,

        number: /\b\d+(?:\.\d+)?\b/,

        variable: /\b[a-zA-Z_]\w*\b/,

        punctuation: /[[\](),.:]/,
      },
    },

    // {% tag %}
    "liquid-tag": {
      pattern: /\{%-?[\s\S]+?-?%\}/,
      greedy: false,
      inside: {
        "tag-name": {
          pattern: /(\{%-?\s*)[a-zA-Z_]+/,
          lookbehind: true,
          alias: "keyword",
        },

        delimiter: {
          pattern: /\{%-?|-?%\}/,
          alias: "punctuation",
        },

        string: /"[^"]*"|'[^']*'/,

        filter: {
          pattern: /(\|\s*)\w+/,
          lookbehind: true,
          alias: "function",
        },

        operator: /!?=|<=?|>=?|<>|\.\./,

        keyword: /\b(?:and|or|contains|in|with|for|as|offset|limit|reversed)\b/,

        builtin: {
          pattern: /(\.)\b(?:first|last|size)\b/,
          lookbehind: true,
        },

        boolean: /\b(?:true|false|nil|blank|empty)\b/,

        number: /\b\d+(?:\.\d+)?\b/,

        "attr-name": /\b\w+(?=\s*:)/,

        variable: /\b[a-zA-Z_]\w*\b/,

        punctuation: /[[\](),.:]/,
      },
    },
  };

  Prism.languages.liquid = liquid;

  Prism.languages["liquid-html"] = Prism.languages.extend("markup", {});

  Prism.languages.insertBefore("liquid-html", "cdata", {
    liquid: {
      pattern:
        /\{%-?\s*raw\s*-?%\}[\s\S]*?\{%-?\s*endraw\s*-?%\}|\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}|\{\{-?[\s\S]*?-?\}\}|\{%-?[\s\S]*?-?%\}/,
      greedy: false,
      inside: Prism.languages.liquid,
    },
  });
  // eslint-disable-next-line no-undef
})(Prism);
