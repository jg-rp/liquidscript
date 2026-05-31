import { parse } from "./src/liquidscript";

const template = parse(`\
Hello, {{ you }}!
{% assign x = 'foo' | upcase %}

{% for ch in x %}
    - {{ ch }}
{% endfor %}

Goodbye, {{ you.first_name | capitalize }} {{ you.last_name }}
Goodbye, {{ you.first_name }} {{ you.last_name }}`);

console.log(template.variableSegmentsSync());
