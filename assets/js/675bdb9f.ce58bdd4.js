"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[6506],{9494:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(6687);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(p,".").concat(m)]||d[m]||c[m]||i;return n?r.createElement(f,l(l({ref:t},s),{},{components:n})):r.createElement(f,l({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var u=2;u<i;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6075:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(6687),a=n(6355),i="tabItem_yA_V";function l(e){var t=e.children,n=e.hidden,l=e.className;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(i,l),hidden:n},t)}},4469:function(e,t,n){n.d(t,{Z:function(){return m}});var r=n(5177),a=n(6687),i=n(4373),l=n(8473),o=n(3159),p=n(6632),u=n(6355),s="tabList_TJyD",c="tabItem_t4qK";function d(e){var t,n,i,d=e.lazy,m=e.block,f=e.defaultValue,g=e.values,v=e.groupId,b=e.className,k=a.Children.map(e.children,(function(e){if((0,a.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),h=null!=g?g:k.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),y=(0,l.l)(h,(function(e,t){return e.value===t.value}));if(y.length>0)throw new Error('Docusaurus error: Duplicate values "'+y.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var N=null===f?f:null!=(t=null!=f?f:null==(n=k.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(i=k[0])?void 0:i.props.value;if(null!==N&&!h.some((function(e){return e.value===N})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+N+'" but none of its children has the corresponding value. Available values are: '+h.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var T=(0,o.U)(),q=T.tabGroupChoices,w=T.setTabGroupChoices,S=(0,a.useState)(N),j=S[0],E=S[1],O=[],x=(0,p.o5)().blockElementScrollPositionUntilNextRender;if(null!=v){var C=q[v];null!=C&&C!==j&&h.some((function(e){return e.value===C}))&&E(C)}var I=function(e){var t=e.currentTarget,n=O.indexOf(t),r=h[n].value;r!==j&&(x(t),E(r),null!=v&&w(v,r))},Z=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=O.indexOf(e.currentTarget)+1;n=O[r]||O[0];break;case"ArrowLeft":var a=O.indexOf(e.currentTarget)-1;n=O[a]||O[O.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,u.Z)("tabs-container",s)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.Z)("tabs",{"tabs--block":m},b)},h.map((function(e){var t=e.value,n=e.label,i=e.attributes;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:j===t?0:-1,"aria-selected":j===t,key:t,ref:function(e){return O.push(e)},onKeyDown:Z,onFocus:I,onClick:I},i,{className:(0,u.Z)("tabs__item",c,null==i?void 0:i.className,{"tabs__item--active":j===t})}),null!=n?n:t)}))),d?(0,a.cloneElement)(k.filter((function(e){return e.props.value===j}))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},k.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==j})}))))}function m(e){var t=(0,i.Z)();return a.createElement(d,(0,r.Z)({key:String(t)},e))}},6873:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return u},metadata:function(){return c},toc:function(){return m}});var r=n(5177),a=n(4416),i=(n(6687),n(9494)),l=n(4469),o=n(6075),p=["components"],u={slug:"/"},s="Getting Started",c={unversionedId:"introduction/getting-started",id:"introduction/getting-started",title:"Getting Started",description:"LiquidScript is a JavaScript and TypeScript engine for Liquid, the safe, customer-facing template language for flexible web apps.",source:"@site/docs/introduction/getting-started.mdx",sourceDirName:"introduction",slug:"/",permalink:"/liquidscript/",draft:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/introduction/getting-started.mdx",tags:[],version:"current",frontMatter:{slug:"/"},sidebar:"docsSidebar",next:{title:"Loading Templates",permalink:"/liquidscript/introduction/loading-templates"}},d={},m=[{value:"Install",id:"install",level:2},{value:"Node.js",id:"nodejs",level:3},{value:"Browser",id:"browser",level:3},{value:"Render",id:"render",level:2},{value:"Configure",id:"configure",level:2},{value:"Environment",id:"environment",level:3}],f={toc:m};function g(e){var t=e.components,n=(0,a.Z)(e,p);return(0,i.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"getting-started"},"Getting Started"),(0,i.kt)("p",null,"LiquidScript is a JavaScript and TypeScript engine for ",(0,i.kt)("a",{parentName:"p",href:"https://shopify.github.io/liquid/"},"Liquid"),", the safe, customer-facing template language for flexible web apps."),(0,i.kt)("p",null,"This page gets you started using Liquid with JavaScript. See ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/language/introduction"},"Introduction to Liquid"),", the ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/language/filters"},"filter reference")," and the ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/language/tags"},"tag reference")," to learn about writing Liquid templates."),(0,i.kt)("h2",{id:"install"},"Install"),(0,i.kt)("h3",{id:"nodejs"},"Node.js"),(0,i.kt)("p",null,"Install LiquidScript using your preferred project manager:"),(0,i.kt)(l.Z,{groupId:"js-package",mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"npm",label:"npm",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save liquidscript\n"))),(0,i.kt)(o.Z,{value:"yarn",label:"yarn",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add liquidscript\n"))),(0,i.kt)(o.Z,{value:"pnpm",label:"pnpm",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add liquidscript\n")))),(0,i.kt)("p",null,"And import the module:"),(0,i.kt)(l.Z,{groupId:"js-modules",mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"esm",label:"ESM",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import * as liquid from "liquidscript";\nconst template = liquid.Template.from("Hello, {{ you }}!");\n'))),(0,i.kt)(o.Z,{value:"cjs",label:"CJS",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const liquid = require("liquidscript");\nconst template = liquid.Template.from("Hello, {{ you }}!");\n')))),(0,i.kt)("p",null,"Or, without the ",(0,i.kt)("inlineCode",{parentName:"p"},"liquid")," namespace:"),(0,i.kt)(l.Z,{groupId:"js-modules",mdxType:"Tabs"},(0,i.kt)(o.Z,{value:"esm",label:"ESM",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { Template } as liquid from "liquidscript";\nconst template = Template.from("Hello, {{ you }}!");\n'))),(0,i.kt)(o.Z,{value:"cjs",label:"CJS",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'const { Template } = require("liquidscript");\nconst template = Template.from("Hello, {{ you }}!");\n')))),(0,i.kt)("h3",{id:"browser"},"Browser"),(0,i.kt)("p",null,"Download and include LiquidScript in a script tag:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<script src="path/to/liquidscript.iife.bundle.min.js"><\/script>\n<script>\n  const template = liquidscript.Template.from("Hello, {{ you }}!");\n  template.render({ you: "World" }).then(console.log);\n<\/script>\n')),(0,i.kt)("p",null,"Or, using a ",(0,i.kt)("a",{parentName:"p",href:"https://www.jsdelivr.com/package/npm/liquidscript"},"CDN"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<script\n  src="https://cdn.jsdelivr.net/npm/liquidscript@1.1.0-beta.1/dist/liquidscript.iife.bundle.min.js"\n  integrity="sha256-h6usl/cwPBy0oDrQstXoiVXDcKH+JLTRm15vH/OOJnQ="\n  crossorigin="anonymous"\n><\/script>\n<script>\n  const template = liquidscript.Template.from("Hello, {{ you }}!");\n  template.render({ you: "World" }).then(console.log);\n<\/script>\n')),(0,i.kt)("h2",{id:"render"},"Render"),(0,i.kt)("p",null,"Render a template string by creating a ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template"))," and calling its ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template#render"},(0,i.kt)("inlineCode",{parentName:"a"},"render()"))," or ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template#rendersync"},(0,i.kt)("inlineCode",{parentName:"a"},"renderSync()"))," methods."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { Template } from "liquidscript";\n\nconst template = Template.fromString("Hello, {{ you }}!");\nconsole.log(template.renderSync({ you: "World" })); // Hello, World!\ntemplate.render({ you: "Liquid" }).then(console.log); // Hello, Liquid!\n')),(0,i.kt)("p",null,"Properties from the object passed to ",(0,i.kt)("inlineCode",{parentName:"p"},"render()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"renderSync()")," are available for templates to use in Liquid expressions."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Template } from "liquidscript";\n\nconst template = Template.fromString(`\n{%- for person in people -%}\n  Hello, {{ person.name }}!\n{% endfor -%}\n`);\n\nconst data = {\n  people: [{ name: "John" }, { name: "Sally" }],\n};\n\nconsole.log(template.renderSync(data));\n// Hello, John\n// Hello, Sally\n')),(0,i.kt)("p",null,"The optional second argument to ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template#fromstring"},(0,i.kt)("inlineCode",{parentName:"a"},"Template.fromString()"))," is an object containing ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/introduction/render-context#template-globals"},"global render context variables"),". These will be pinned to the resulting template and included automatically every time you call ",(0,i.kt)("inlineCode",{parentName:"p"},"render()")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"renderSync()"),"."),(0,i.kt)("h2",{id:"configure"},"Configure"),(0,i.kt)("p",null,"You can pass configuration options as the third argument to ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template#fromstring"},(0,i.kt)("inlineCode",{parentName:"a"},"Template.fromString()")),". This example enables automatic HTML escaping and will throw an error at render time if a template attempts to use an undefined variable. See ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#environmentoptions"},(0,i.kt)("inlineCode",{parentName:"a"},"EnvironmentOptions"))," for all available options."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Template, StrictUndefined } from "liquidscript";\n\nconst template = Template.fromString(\n  "Hello, {{ you }}!",\n  {},\n  {\n    autoEscape: true,\n    undefinedFactory: StrictUndefined.from,\n  }\n);\n')),(0,i.kt)("h3",{id:"environment"},"Environment"),(0,i.kt)("p",null,"While ",(0,i.kt)("inlineCode",{parentName:"p"},"Template.fromString()")," can be convenient, most applications will want to configure a single ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},(0,i.kt)("inlineCode",{parentName:"a"},"Environment")),", then load and render templates from it. This is usually more efficient than using ",(0,i.kt)("inlineCode",{parentName:"p"},"Template")," directly."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},'import {\n  Environment,\n  NodeFileSystemLoader,\n  StrictUndefined,\n} from "liquidscript";\n\nconst env = new Environment({\n  autoEscape: true,\n  loader: new NodeFileSystemLoader("./templates/"),\n  undefinedFactory: StrictUndefined.from,\n});\n\nconst template = env.fromString("Hello, {{ you }}!");\n')),(0,i.kt)("p",null,"Notice that ",(0,i.kt)("inlineCode",{parentName:"p"},"Environment")," accepts a ",(0,i.kt)("inlineCode",{parentName:"p"},"loader")," option, whereas ",(0,i.kt)("inlineCode",{parentName:"p"},"Template.fromString()")," does not."))}g.isMDXComponent=!0}}]);