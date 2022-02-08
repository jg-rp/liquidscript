import { tokenize } from "./expressions/filtered/lex";

const tokens = Array.from(tokenize("foo.bar | upcase: true"));

console.log(tokens);
