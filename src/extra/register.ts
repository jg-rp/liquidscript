import { Environment } from "../environment";
import {
  BlockTag,
  CallTag,
  ConditionalOutputStatementWithParens,
  ConditionalAssignTagWithParens,
  ConditionalEchoTagWithParens,
  ExtendsTag,
  IfNotTag,
  MacroTag,
  WithTag,
} from "./tags";

export function addInheritanceTags(env: Environment): void {
  env.tags["block"] = new BlockTag();
  env.tags["extends"] = new ExtendsTag();
}

export function addAllExtras(env: Environment): void {
  addInheritanceTags(env);
  env.tags["call"] = new CallTag();
  env.tags["ConditionalOutputStatementWithParens"] =
    new ConditionalOutputStatementWithParens();
  env.tags["ConditionalAssignTagWithParens"] =
    new ConditionalAssignTagWithParens();
  env.tags["ConditionalEchoTagWithParens"] = new ConditionalEchoTagWithParens();
  env.tags["IfNotTag"] = new IfNotTag();
  env.tags["MacroTag"] = new MacroTag();
  env.tags["WithTag"] = new WithTag();
}
