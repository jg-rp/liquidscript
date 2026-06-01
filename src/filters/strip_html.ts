import type { FilterContext } from "../filter";

const RE_HTML_BLOCKS = new RegExp(
  "<script.*?</script>|<!--.*?-->|<style.*?</style>",
  "gs",
);

const RE_HTML_TAGS = new RegExp("<.*?>", "gs");

export function stripHTML(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  return this.toString(left, "")
    .replace(RE_HTML_BLOCKS, "")
    .replace(RE_HTML_TAGS, "");
}
