import { parse } from "./src/liquidscript";

const template = parse(`\
{% doc %}
    some doc comment
{% enddoc %}

Hello!

{% comment %}
    some comment
{% endcomment %}

{% if false %}
    {% # an inline comment %}
{% endif %}`);

console.log(template.comments().map((node) => node.text));
console.log(template.docs().map((node) => node.text));
