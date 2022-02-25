import { Environment } from "../environment";
import {
  compact,
  concat,
  first,
  join,
  last,
  map,
  reverse,
  sort,
  sortNatural,
  uniq,
  where,
} from "./filters/array";
import {
  abs,
  atLeast,
  atMost,
  ceil,
  dividedBy,
  floor,
  minus,
  modulo,
  plus,
  round,
  times,
} from "./filters/math";
import { date, default_, size, slice } from "./filters/misc";
import {
  append,
  base64Decode,
  base64Encode,
  base64UrlSafeDecode,
  base64UrlSafeEncode,
  capitalize,
  downcase,
  escape,
  escapeOnce,
  lstrip,
  newlineToBr,
  prepend,
  remove,
  removeFirst,
  replace,
  replaceFirst,
  rstrip,
  split,
  strip,
  stripHtml,
  stripNewlines,
  truncate,
  truncateWords,
  upcase,
  urlDecode,
  urlEncode,
} from "./filters/string";

import { AssignTag } from "./tags/assign";
import { CaptureTag } from "./tags/capture";
import { CaseTag } from "./tags/case";
import { CommentTag } from "./tags/comment";
import { CycleTag } from "./tags/cycle";
import { DecrementTag } from "./tags/decrement";
import { EchoTag } from "./tags/echo";
import { ForTag } from "./tags/for";
import { ContinueTag } from "./tags/for";
import { BreakTag } from "./tags/for";
import { IfTag } from "./tags/if";
import { IncrementTag } from "./tags/increment";
import { IncludeTag } from "./tags/include";
import { LiquidTag } from "./tags/liquid";
import { TemplateLiteral } from "./tags/literal";
import { RenderTag } from "./tags/render";
import { OutputStatement } from "./tags/statement";
import { TableRowTag } from "./tags/tablerow";
import { UnlessTag } from "./tags/unless";

/**
 *
 * @param env
 */
export function registerBuiltin(env: Environment): void {
  env.tags["assign"] = new AssignTag();
  env.tags["capture"] = new CaptureTag();
  env.tags["case"] = new CaseTag();
  env.tags["comment"] = new CommentTag();
  env.tags["cycle"] = new CycleTag();
  env.tags["decrement"] = new DecrementTag();
  env.tags["echo"] = new EchoTag();
  env.tags["for"] = new ForTag();
  env.tags["continue"] = new ContinueTag();
  env.tags["break"] = new BreakTag();
  env.tags["if"] = new IfTag();
  env.tags["include"] = new IncludeTag();
  env.tags["increment"] = new IncrementTag();
  env.tags["literal"] = new TemplateLiteral();
  env.tags["liquid"] = new LiquidTag();
  env.tags["render"] = new RenderTag();
  env.tags["statement"] = new OutputStatement();
  env.tags["tablerow"] = new TableRowTag();
  env.tags["unless"] = new UnlessTag();

  env.filters["abs"] = abs;
  env.filters["at_most"] = atMost;
  env.filters["at_least"] = atLeast;
  env.filters["ceil"] = ceil;
  env.filters["divided_by"] = dividedBy;
  env.filters["floor"] = floor;
  env.filters["minus"] = minus;
  env.filters["plus"] = plus;
  env.filters["round"] = round;
  env.filters["times"] = times;
  env.filters["modulo"] = modulo;
  env.filters["capitalize"] = capitalize;
  env.filters["append"] = append;
  env.filters["downcase"] = downcase;
  env.filters["escape"] = escape;
  env.filters["escape_once"] = escapeOnce;
  env.filters["lstrip"] = lstrip;
  env.filters["newline_to_br"] = newlineToBr;
  env.filters["prepend"] = prepend;
  env.filters["remove"] = remove;
  env.filters["remove_first"] = removeFirst;
  env.filters["replace"] = replace;
  env.filters["replace_first"] = replaceFirst;
  env.filters["slice"] = slice;
  env.filters["split"] = split;
  env.filters["upcase"] = upcase;
  env.filters["strip"] = strip;
  env.filters["rstrip"] = rstrip;
  env.filters["strip_html"] = stripHtml;
  env.filters["strip_newlines"] = stripNewlines;
  env.filters["truncate"] = truncate;
  env.filters["truncatewords"] = truncateWords;
  env.filters["url_encode"] = urlEncode;
  env.filters["url_decode"] = urlDecode;
  env.filters["base64_encode"] = base64Encode;
  env.filters["base64_decode"] = base64Decode;
  env.filters["base64_url_safe_encode"] = base64UrlSafeEncode;
  env.filters["base64_url_safe_decode"] = base64UrlSafeDecode;
  env.filters["join"] = join;
  env.filters["first"] = first;
  env.filters["last"] = last;
  env.filters["concat"] = concat;
  env.filters["map"] = map;
  env.filters["reverse"] = reverse;
  env.filters["sort"] = sort;
  env.filters["sort_natural"] = sortNatural;
  env.filters["where"] = where;
  env.filters["uniq"] = uniq;
  env.filters["compact"] = compact;
  env.filters["size"] = size;
  env.filters["default"] = default_;
  env.filters["date"] = date;
}
