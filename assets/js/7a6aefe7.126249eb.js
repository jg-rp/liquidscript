"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[1618],{9494:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(6687);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=u(n),m=i,f=c["".concat(s,".").concat(m)]||c[m]||d[m]||a;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4296:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(6687);function i(e){var t=e.children,n=e.hidden,i=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:i},t)}},9747:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(9149),i=n(6687),a=n(4428),l=n(6749),o=n(6355),s="tabItem_xFFf";function u(e){var t,n,a,u=e.lazy,p=e.block,d=e.defaultValue,c=e.values,m=e.groupId,f=e.className,h=i.Children.map(e.children,(function(e){if((0,i.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),v=null!=c?c:h.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),g=(0,l.lx)(v,(function(e,t){return e.value===t.value}));if(g.length>0)throw new Error('Docusaurus error: Duplicate values "'+g.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var k=null===d?d:null!=(t=null!=d?d:null==(n=h.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(a=h[0])?void 0:a.props.value;if(null!==k&&!v.some((function(e){return e.value===k})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+k+'" but none of its children has the corresponding value. Available values are: '+v.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var b=(0,l.UB)(),N=b.tabGroupChoices,y=b.setTabGroupChoices,w=(0,i.useState)(k),x=w[0],q=w[1],T=[],C=(0,l.o5)().blockElementScrollPositionUntilNextRender;if(null!=m){var E=N[m];null!=E&&E!==x&&v.some((function(e){return e.value===E}))&&q(E)}var S=function(e){var t=e.currentTarget,n=T.indexOf(t),r=v[n].value;r!==x&&(C(t),q(r),null!=m&&y(m,r))},j=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=T.indexOf(e.currentTarget)+1;n=T[r]||T[0];break;case"ArrowLeft":var i=T.indexOf(e.currentTarget)-1;n=T[i]||T[T.length-1]}null==(t=n)||t.focus()};return i.createElement("div",{className:"tabs-container"},i.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":p},f)},v.map((function(e){var t=e.value,n=e.label,a=e.attributes;return i.createElement("li",(0,r.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:function(e){return T.push(e)},onKeyDown:j,onFocus:S,onClick:S},a,{className:(0,o.Z)("tabs__item",s,null==a?void 0:a.className,{"tabs__item--active":x===t})}),null!=n?n:t)}))),u?(0,i.cloneElement)(h.filter((function(e){return e.props.value===x}))[0],{className:"margin-vert--md"}):i.createElement("div",{className:"margin-vert--md"},h.map((function(e,t){return(0,i.cloneElement)(e,{key:t,hidden:e.props.value!==x})}))))}function p(e){var t=(0,a.Z)();return i.createElement(u,(0,r.Z)({key:String(t)},e))}},8024:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return h},frontMatter:function(){return u},metadata:function(){return d},toc:function(){return m}});var r=n(9149),i=n(8332),a=(n(6687),n(9494)),l=n(9747),o=n(4296),s=["components"],u={},p="Custom Filters",d={unversionedId:"guides/custom-filters",id:"guides/custom-filters",title:"Custom Filters",description:"Liquid filters are JavaScript functions. A filter function is any callable that accepts at least one argument, the result of the left hand side of a filtered expression. The function's return value will be output, assigned or piped to more filters.",source:"@site/docs/guides/custom-filters.mdx",sourceDirName:"guides",slug:"/guides/custom-filters",permalink:"/liquidscript/guides/custom-filters",editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/guides/custom-filters.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"HTML Auto-Escape",permalink:"/liquidscript/introduction/auto-escape"},next:{title:"Custom Tags",permalink:"/liquidscript/guides/custom-tags"}},c={},m=[{value:"Add a Filter",id:"add-a-filter",level:2},{value:"Replace a Filter",id:"replace-a-filter",level:2},{value:"Remove a Filter",id:"remove-a-filter",level:2},{value:"Filter Context",id:"filter-context",level:2},{value:"Keyword Arguments and Options",id:"keyword-arguments-and-options",level:3},{value:"Liquid Numbers and Arithmetic",id:"liquid-numbers-and-arithmetic",level:2},{value:"Auto-Escape and Markup",id:"auto-escape-and-markup",level:2},{value:"Missing and Excess Arguments",id:"missing-and-excess-arguments",level:2},{value:"Undefined vs undefined",id:"undefined-vs-undefined",level:2}],f={toc:m};function h(e){var t=e.components,n=(0,i.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"custom-filters"},"Custom Filters"),(0,a.kt)("p",null,"Liquid ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/language/introduction#filters"},"filters")," are JavaScript functions. A filter function is any callable that accepts at least one argument, the result of the left hand side of a filtered expression. The function's return value will be output, assigned or piped to more filters."),(0,a.kt)("p",null,"You can add to, remove or modify Liquid's ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/language/filters"},"built-in filters")," to suit your needs by registering filter functions with an ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},"Environment"),", then rendering your templates from that environment."),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"All built-in filters are implemented in this way, so have a look in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/tree/main/src/builtin/filters"},"src/builtin/filters/")," for more examples."))),(0,a.kt)("h2",{id:"add-a-filter"},"Add a Filter"),(0,a.kt)("p",null,"Add a custom template filter to an ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},"Environment")," by calling its ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment#addfilter"},(0,a.kt)("inlineCode",{parentName:"a"},"addFilter()"))," method. Here's a simple example of adding JavaScript's ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith"},(0,a.kt)("inlineCode",{parentName:"a"},"String.prototype.endsWith"))," as a filter function."),(0,a.kt)(l.Z,{groupId:"js-ts",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { Environment } from "liquidscript";\n\nconst env = new Environment();\nenv.addFilter("ends_with", (val, arg) => val.endsWith(arg));\n'))),(0,a.kt)(o.Z,{value:"ts",label:"TypeScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Environment } from "liquidscript";\n\nconst env = new Environment();\nenv.addFilter("ends_with", (val: string, arg: string) => val.endsWith(arg));\n')))),(0,a.kt)("p",null,"In a template you'd use it like this."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-liquid"},'{% assign foo = "foobar" | ends_with: "bar" %}\n{% if foo %}\n    \x3c!-- do something --\x3e\n{% endif %}\n')),(0,a.kt)("h2",{id:"replace-a-filter"},"Replace a Filter"),(0,a.kt)("p",null,"If given the name of an existing filter function, ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment#addfilter"},(0,a.kt)("inlineCode",{parentName:"a"},"Environment.add_filter()"))," will replace it without warning. For example, suppose you wish to replace the ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/language/filters#slice"},"slice")," filter for one which uses start and end values instead of start and length, and is a bit more forgiving in terms of allowed inputs."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { Environment, Markup, filters, object } from "liquidscript";\n\nfunction mySlice(value, start, end) {\n  // Make sure the input value is an array or string.\n  value = object.isArray(value) ? value : object.liquidStringify(value);\n  // Make sure `start` is a number.\n  start = filters.parseNumberOrZero(start);\n  // End is optional\n  if (end === undefined) return value.slice(start);\n  // Make sure `end` is a number.\n  end = filters.parseNumberOrZero(end);\n  return value.slice(start, end);\n}\n\nconst env = new Environment();\nenv.addFilter("slice", mySlice);\n')),(0,a.kt)("h2",{id:"remove-a-filter"},"Remove a Filter"),(0,a.kt)("p",null,"Remove a filter by deleting it from ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment#filters"},(0,a.kt)("inlineCode",{parentName:"a"},"Environment.filters")),". It's a plain object mapping filter names to filter functions."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { Environment } from "liquidscript";\n\nconst env = new Environment();\ndelete env.filters.base64_decode;\n')),(0,a.kt)("h2",{id:"filter-context"},"Filter Context"),(0,a.kt)("p",null,"Filter functions are applied with their ",(0,a.kt)("inlineCode",{parentName:"p"},"this")," value set to a ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#filtercontext"},(0,a.kt)("inlineCode",{parentName:"a"},"FilterContext")),", giving filters access to the current environment and render context."),(0,a.kt)("p",null,"This example resolves the name ",(0,a.kt)("inlineCode",{parentName:"p"},'"handle"')," in the scope of the current render context, then uses the result as part of the filter's return value. We also reference the ",(0,a.kt)("inlineCode",{parentName:"p"},"autoEscape")," option set on the active environment."),(0,a.kt)(l.Z,{groupId:"js-ts",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { Environment, Markup } from "liquidscript";\n\nfunction LinkToTag(label, tag) {\n  const handle = this.context.resolveSync("handle");\n  const result = `<a title="Show tag ${tag}" href="/collections/${handle}/${tag}">${label}</a>`;\n  return this.context.environment.autoEscape ? new Markup(result) : result;\n}\n\nconst env = new Environment();\nenv.addFilter("link_to_tag", LinkToTag);\n'))),(0,a.kt)(o.Z,{value:"ts",label:"TypeScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Environment, Markup, FilterContext } from "liquidscript";\n\nfunction LinkToTag(this: FilterContext, label: string, tag: string): string {\n  const handle = this.context.resolveSync("handle");\n  const result = `<a title="Show tag ${tag}" href="/collections/${handle}/${tag}">${label}</a>`;\n  return this.context.environment.autoEscape ? new Markup(result) : result;\n}\n\nconst env = new Environment();\nenv.addFilter("link_to_tag", LinkToTag);\n')))),(0,a.kt)("h3",{id:"keyword-arguments-and-options"},"Keyword Arguments and Options"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#filtercontext"},(0,a.kt)("inlineCode",{parentName:"a"},"FilterContext"))," also includes any keyword arguments passed to the filter. These are available as ",(0,a.kt)("inlineCode",{parentName:"p"},"this.options"),". The ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/language/filters#default"},(0,a.kt)("inlineCode",{parentName:"a"},"default"))," filter is the only built-in filter to use a keyword argument. For example, ",(0,a.kt)("inlineCode",{parentName:"p"},"{{ user.name | default: 'anonymous', allow_false: false }}")),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"In Liquid, keyword arguments can appear in any order, even before and inbetween positional arguments. It is because of this, and the desire to allow filters with ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters"},"rest parameters"),", that LiquidScript puts options in the filter context object instead of the last argument of the filter function."))),(0,a.kt)("h2",{id:"liquid-numbers-and-arithmetic"},"Liquid Numbers and Arithmetic"),(0,a.kt)("p",null,"Unlike JavaScript, Liquid has distinct integer and float number types. To maintain compatibility with the reference implementation of Liquid, LiquidScript defines an ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Integer"},(0,a.kt)("inlineCode",{parentName:"a"},"Integer"))," type, a ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Float"},(0,a.kt)("inlineCode",{parentName:"a"},"Float"))," type and ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#parsenumbert"},"utility functions")," for converting to these types."),(0,a.kt)("p",null,"Both ",(0,a.kt)("inlineCode",{parentName:"p"},"Integer")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Float")," export methods for performing decimal arithmetic, as opposed to JavaScript's usual floating point arithmetic."),(0,a.kt)("p",null,"When writing custom filters that expect numbers as inputs, you should be prepared to handle JavaScript primitive numbers ",(0,a.kt)("strong",{parentName:"p"},"and")," Liquid numbers. All built-in math filters convert their arguments to Liquid's ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#numbert"},(0,a.kt)("inlineCode",{parentName:"a"},"NumberT"))," type on input, exclusively use methods of those types for arithmetic, and return a ",(0,a.kt)("inlineCode",{parentName:"p"},"NumberT")," too."),(0,a.kt)("p",null,"To illustrate, here's the implementation of the ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/language/filters#plus"},(0,a.kt)("inlineCode",{parentName:"a"},"plus"))," filter. It makes no assumptions about the type of its arguments and both arguments default to zero if they can't be converted to a number."),(0,a.kt)(l.Z,{groupId:"js-ts",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { FilterContext, NumberT, checkArguments, filters } from "liquidscript";\n\nfunction plus(left, right) {\n  // Throw an error if there are too many or too few arguments.\n  checkArguments(arguments.length, 1, 1);\n  return filters.parseNumberOrZero(left).plus(filters.parseNumberOrZero(right));\n}\n'))),(0,a.kt)(o.Z,{value:"ts",label:"TypeScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { FilterContext, NumberT, checkArguments, filters } from "liquidscript";\n\nfunction plus(this: FilterContext, left: unknown, right: unknown): NumberT {\n  // Throw an error if there are too many or too few arguments.\n  checkArguments(arguments.length, 1, 1);\n  return filters.parseNumberOrZero(left).plus(filters.parseNumberOrZero(right));\n}\n')))),(0,a.kt)("h2",{id:"auto-escape-and-markup"},"Auto-Escape and Markup"),(0,a.kt)("p",null,"LiquidScript exports a ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,a.kt)("inlineCode",{parentName:"a"},"Markup"))," object that wraps a string, indicating it is safe to output without ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/introduction/auto-escape"},"HTML escaping"),". Most filter functions that expect strings as inputs should be prepared to handle ",(0,a.kt)("inlineCode",{parentName:"p"},"Markup")," objects too."),(0,a.kt)("p",null,"Here's an implementation of the ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/language/filters#append"},(0,a.kt)("inlineCode",{parentName:"a"},"append"))," filter that demonstrates handling of ",(0,a.kt)("inlineCode",{parentName:"p"},"Markup")," objects."),(0,a.kt)(l.Z,{groupId:"js-ts",mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"js",label:"JavaScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import {\n  FilterContext,\n  checkArguments,\n  Markup,\n  toLiquidScript,\n  object,\n} from "liquidscript";\n\nfunction append(left, other) {\n  // Throw an error if there are too many or too few arguments.\n  checkArguments(arguments.length, 1, 1);\n\n  if (left instanceof Markup)\n    return new Markup(\n      left[toLiquidString]() + Markup.escape(other)[toLiquidString]()\n    );\n\n  if (other instanceof Markup) {\n    return new Markup(\n      Markup.escape(left)[toLiquidString]() + other[toLiquidString]()\n    );\n  }\n\n  return object.liquidStringify(left) + object.liquidStringify(other);\n}\n'))),(0,a.kt)(o.Z,{value:"ts",label:"TypeScript",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import {\n  FilterContext,\n  checkArguments,\n  Markup,\n  toLiquidScript,\n  object,\n} from "liquidscript";\n\nfunction append(\n  this: FilterContext,\n  left: unknown,\n  other: unknown\n): string | Markup {\n  // Throw an error if there are too many or too few arguments.\n  checkArguments(arguments.length, 1, 1);\n\n  if (left instanceof Markup)\n    return new Markup(\n      left[toLiquidString]() + Markup.escape(other)[toLiquidString]()\n    );\n\n  if (other instanceof Markup) {\n    return new Markup(\n      Markup.escape(left)[toLiquidString]() + other[toLiquidString]()\n    );\n  }\n\n  return object.liquidStringify(left) + object.liquidStringify(other);\n}\n')))),(0,a.kt)("h2",{id:"missing-and-excess-arguments"},"Missing and Excess Arguments"),(0,a.kt)("p",null,"All filters built in to Liquid throw a ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/LiquidFilterArgumentError"},(0,a.kt)("inlineCode",{parentName:"a"},"LiquidFilterArgumentError"))," if a required argument is missing or too many arguments are provided."),(0,a.kt)("p",null,"When writing custom filters, if you want to be consistent with those built-in filters, you can use ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#checkarguments"},(0,a.kt)("inlineCode",{parentName:"a"},"checkArguments"))," to throw an error with a suitable message."),(0,a.kt)("h2",{id:"undefined-vs-undefined"},"Undefined vs undefined"),(0,a.kt)("p",null,"LiquidScript defines an ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/introduction/undefined"},(0,a.kt)("inlineCode",{parentName:"a"},"Undefined"))," type, which is distinct from JavaScript's primitive ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," value. With ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/LaxUndefined"},(0,a.kt)("inlineCode",{parentName:"a"},"LaxUndefined")),", ",(0,a.kt)("inlineCode",{parentName:"p"},"Undefined"),' objects will be passed to filter functions if they are "called" with arguments that can not be resolved by the active render context.'),(0,a.kt)("p",null,"If a filter function needs to detect ",(0,a.kt)("inlineCode",{parentName:"p"},"Undefined")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," arguments, it can use ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/object#isundefined"},(0,a.kt)("inlineCode",{parentName:"a"},"object.isUndefined()")),"."))}h.isMDXComponent=!0}}]);