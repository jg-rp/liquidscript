import {
  Drop,
  Environment,
  toHTMLSafeStringSync,
  toLiquidSync,
} from "./src/liquidscript";

const liquid = new Environment({ autoEscape: true });
const template = liquid.parse("<p>Hello, {{ you }}</p>");

class SomeObject extends Drop {
  [toLiquidSync]() {
    return "<em>World!</em>";
  }
}

class SomeSafeObject extends Drop {
  [toLiquidSync]() {
    return "<em>World!</em>";
  }

  [toHTMLSafeStringSync]() {
    return "<em>World!</em>";
  }
}

// Without toHTMLSafeStringSync
template.render({ you: new SomeObject() }).then(console.log);

// With toHTMLSafeStringSync
template.render({ you: new SomeSafeObject() }).then(console.log);
