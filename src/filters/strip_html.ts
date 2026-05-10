import type { FilterContext } from "../filter";

const STRIP_HTML_BLOCKS = new RegExp(
  "<script.*?</script>|<!--.*?-->|<style.*?</style>",
  "gs",
);

const STRIP_HTML_TAGS = new RegExp("<.*?>", "gs");

export function stripHTML(this: FilterContext, left: unknown): string {
  this.assertArgs(arguments.length, 1);
  return this.toString(left, "")
    .replace(STRIP_HTML_BLOCKS, "")
    .replace(STRIP_HTML_TAGS, "");
}
