import { IfTag } from "../../builtin/tags";
import { BooleanExpression } from "../../expression";
import { TokenStream, TOKEN_EXPRESSION } from "../../token";
import { parse } from "../../expressions/boolean_not/parse";

export class IfNotTag extends IfTag {
  protected parseExpression(stream: TokenStream): BooleanExpression {
    stream.expect(TOKEN_EXPRESSION);
    return parse(stream.current.value);
  }
}
