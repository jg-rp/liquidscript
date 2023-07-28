import { AssignTag, EchoTag, OutputStatement } from "../../builtin/tags";
import { Node } from "../../ast";
import { TokenStream } from "../../token";
import {
  parse as parseConditionalExpression,
  parseWithParens as parseConditionalExpressionWithParens,
} from "../../expressions/conditional/parse";
import { Expression } from "../../expression";

/**
 * A drop-in replacement for the standard output statement that supports
 * inline `if` expressions.
 */
export class ConditionalOutputStatement extends OutputStatement {
  public parse(stream: TokenStream): Node {
    return new this.nodeClass(
      stream.current,
      parseConditionalExpression(stream.current.value, stream.current.index),
    );
  }
}

/**
 * A drop-in replacement for the standard assign tag that supports
 * inline `if` expressions.
 */
export class ConditionalAssignTag extends AssignTag {
  protected parseExpression(value: string, startIndex: number): Expression {
    return parseConditionalExpression(value, startIndex);
  }
}

/**
 * A drop-in replacement for the standard echo tag that supports
 * inline `if` expressions.
 */
export class ConditionalEchoTag extends EchoTag {
  protected parseExpression(value: string, startIndex: number): Expression {
    return parseConditionalExpression(value, startIndex);
  }
}

/**
 * A drop-in replacement for the standard output statement that supports
 * inline `if` expressions with a logical `not` operator and grouping
 * terms with parentheses.
 */
export class ConditionalOutputStatementWithParens extends OutputStatement {
  public parse(stream: TokenStream): Node {
    return new this.nodeClass(
      stream.current,
      parseConditionalExpressionWithParens(
        stream.current.value,
        stream.current.index,
      ),
    );
  }
}

/**
 * A drop-in replacement for the standard assign tag that supports
 * inline `if` expressions with a logical `not` operator and grouping
 * terms with parentheses.
 */
export class ConditionalAssignTagWithParens extends AssignTag {
  protected parseExpression(value: string, startIndex: number): Expression {
    return parseConditionalExpressionWithParens(value, startIndex);
  }
}

/**
 * A drop-in replacement for the standard echo tag that supports
 * inline `if` expressions with a logical `not` operator and grouping
 * terms with parentheses.
 */
export class ConditionalEchoTagWithParens extends EchoTag {
  protected parseExpression(value: string, startIndex: number): Expression {
    return parseConditionalExpressionWithParens(value, startIndex);
  }
}
