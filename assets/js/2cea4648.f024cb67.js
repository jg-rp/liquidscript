"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[8927],{9494:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return f}});var i=t(6687);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function d(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=i.createContext({}),s=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=s(e.components);return i.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},c=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,p=d(e,["components","mdxType","originalType","parentName"]),c=s(t),f=r,m=c["".concat(l,".").concat(f)]||c[f]||u[f]||a;return t?i.createElement(m,o(o({ref:n},p),{},{components:t})):i.createElement(m,o({ref:n},p))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,o=new Array(a);o[0]=c;var d={};for(var l in n)hasOwnProperty.call(n,l)&&(d[l]=n[l]);d.originalType=e,d.mdxType="string"==typeof e?e:r,o[1]=d;for(var s=2;s<a;s++)o[s]=t[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}c.displayName="MDXCreateElement"},4398:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return d},metadata:function(){return s},toc:function(){return u}});var i=t(5177),r=t(4416),a=(t(6687),t(9494)),o=["components"],d={},l="Undefined",s={unversionedId:"introduction/undefined",id:"introduction/undefined",title:"Undefined",description:'LiquidScript does not have a "lax" mode like some Liquid engines, but we can control what happens if a template author attempts to use an undefined variable or filter.',source:"@site/docs/introduction/undefined.md",sourceDirName:"introduction",slug:"/introduction/undefined",permalink:"/liquidscript/introduction/undefined",draft:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/introduction/undefined.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Objects and Drops",permalink:"/liquidscript/introduction/objects-and-drops"},next:{title:"HTML Auto-Escape",permalink:"/liquidscript/introduction/auto-escape"}},p={},u=[{value:"Undefined Variables",id:"undefined-variables",level:2},{value:"Default Undefined",id:"default-undefined",level:3},{value:"Strict Undefined",id:"strict-undefined",level:3},{value:"Falsy Undefined",id:"falsy-undefined",level:3},{value:"Undefined Filters",id:"undefined-filters",level:2}],c={toc:u};function f(e){var n=e.components,t=(0,r.Z)(e,o);return(0,a.kt)("wrapper",(0,i.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"undefined"},"Undefined"),(0,a.kt)("p",null,'LiquidScript does not have a "lax" mode like some Liquid engines, but we can control what happens if a template author attempts to use an undefined variable or filter.'),(0,a.kt)("h2",{id:"undefined-variables"},"Undefined Variables"),(0,a.kt)("p",null,"When rendering a Liquid template, if a variable name can not be resolved, an instance of ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Undefined"},(0,a.kt)("inlineCode",{parentName:"a"},"Undefined"))," is used instead. We can customize template rendering behavior supplying an ",(0,a.kt)("inlineCode",{parentName:"p"},"Undefined")," factory function to the ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},(0,a.kt)("inlineCode",{parentName:"a"},"Environment"))," constructor or ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template#fromstring"},(0,a.kt)("inlineCode",{parentName:"a"},"Template.fromString()")),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Environment, StrictUndefined } from "liquidsscript";\n\nconst env = new Environment({ undefinedFactory: StrictUndefined.from });\nenv.fromString("{{ nosuchthing }}").renderSync();\n// LiquidUndefinedError: \'nosuchthing\' is undefined (<string>:1)\n')),(0,a.kt)("p",null,"Built-in ",(0,a.kt)("inlineCode",{parentName:"p"},"Undefined")," types are ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/LaxUndefined"},(0,a.kt)("inlineCode",{parentName:"a"},"LaxUndefined"))," (the default), ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/StrictUndefined"},(0,a.kt)("inlineCode",{parentName:"a"},"StrictUndefined"))," and ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/FalsyStrictUndefined"},(0,a.kt)("inlineCode",{parentName:"a"},"FalsyStrictUndefined")),"."),(0,a.kt)("h3",{id:"default-undefined"},"Default Undefined"),(0,a.kt)("p",null,"All operations on the default ",(0,a.kt)("inlineCode",{parentName:"p"},"Undefined")," type are silently ignored and, when rendered, it produces an empty string. For example, you can access properties and iterate an undefined variable without error."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-liquid",metastring:'title="template"',title:'"template"'},"Hello {{ nosuchthing }}\n{% for thing in nosuchthing %}\n    {{ thing }}\n{% endfor %}\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="output"',title:'"output"'},"Hello\n\n\n\n")),(0,a.kt)("h3",{id:"strict-undefined"},"Strict Undefined"),(0,a.kt)("p",null,"Given ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/StrictUndefined#from"},(0,a.kt)("inlineCode",{parentName:"a"},"StrictUndefined.from"))," as the ",(0,a.kt)("inlineCode",{parentName:"p"},"undefinedFactory")," option to an environment or ",(0,a.kt)("inlineCode",{parentName:"p"},"Template.fromString()"),", any operation on an undefined variable will raise a ",(0,a.kt)("inlineCode",{parentName:"p"},"LiquidUndefinedError"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Environment, StrictUndefined } from "liquidscript";\n\nconst env = new Environment({ undefinedFactory: StrictUndefined.from });\nenv.fromString("{{ nosuchthing }}").renderSync();\n// LiquidUndefinedError: \'nosuchthing\' is undefined (<string>:1)\n')),(0,a.kt)("p",null,'Note that the "standard" ',(0,a.kt)("inlineCode",{parentName:"p"},"default")," filter does not handle undefined values the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Shopify/liquid/issues/1404"},"way you might expect"),". The following example will raise a ",(0,a.kt)("inlineCode",{parentName:"p"},"LiquidUndefinedError")," if username is undefined."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-liquid"},'Hello {{ username | default: "user" }}\n')),(0,a.kt)("p",null,"Similarly, standard ",(0,a.kt)("inlineCode",{parentName:"p"},"{% if %}")," expressions do not allow you to detect undefined values. See ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Shopify/liquid/issues/1034"},"Shopify Liquid issue #1034"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Environment, StrictUndefined } from "liquidscript";\n\nconst env = new Environment({ undefinedFactory: StrictUndefined.from });\nenv\n  .fromString("{% if nosuchthing %}true{% else %}false{% endif %}")\n  .renderSync();\n// LiquidUndefinedError: \'nosuchthing\' is undefined (<string>:1)\n')),(0,a.kt)("h3",{id:"falsy-undefined"},"Falsy Undefined"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/FalsyStrictUndefined"},(0,a.kt)("inlineCode",{parentName:"a"},"FalsyStrictUndefined"))," addresses the issues with ",(0,a.kt)("inlineCode",{parentName:"p"},"StrictUndefined")," described above. Given ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/FalsyStrictUndefined#from"},(0,a.kt)("inlineCode",{parentName:"a"},"FalsyStrictUndefined.from"))," as the ",(0,a.kt)("inlineCode",{parentName:"p"},"undefinedFactory")," option to an environment or ",(0,a.kt)("inlineCode",{parentName:"p"},"Template.fromString()"),", undefined values can be tested for truthiness and compared to other values in an ",(0,a.kt)("inlineCode",{parentName:"p"},"if"),"/",(0,a.kt)("inlineCode",{parentName:"p"},"unless")," expression without throwing an error. An ",(0,a.kt)("inlineCode",{parentName:"p"},"UndefinedError")," will be thrown when an undefined value is iterated, output or when accessing its properties."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Environment, FalsyStrictUndefined } from "liquidscript";\n\nconst env = new Environment({ undefinedFactory: FalsyStrictUndefined.from });\n\nenv\n  .fromString("{% if nosuchthing %}true{% else %}false{% endif %}")\n  .renderSync();\n// false\n\nenv.fromString("{{ nosuchthing | default: \'hello\' }}").renderSync();\n// hello\n\nenv.fromString("{{ nosuchthing }}").renderSync();\n// LiquidUndefinedError: \'nosuchthing\' is undefined (<string>:1)\n')),(0,a.kt)("h2",{id:"undefined-filters"},"Undefined Filters"),(0,a.kt)("p",null,"By default, attempts to use an undefined filter will raise a ",(0,a.kt)("inlineCode",{parentName:"p"},"NoSuchFilterError"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Environment } from "liquidscript";\n\nconst env = new Environment();\nenv.fromString("{{ \'hello\' | camel_case }}").renderSync();\n// NoSuchFilterError: unknown filter camel_case (<string>:1)\n')),(0,a.kt)("p",null,"Set the ",(0,a.kt)("inlineCode",{parentName:"p"},"strictFilters")," option on the ",(0,a.kt)("inlineCode",{parentName:"p"},"Environment")," constructor or ",(0,a.kt)("inlineCode",{parentName:"p"},"Template.fromString")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"false"),", and undefined filters will be silently ignored."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'import { Environment } from "liquidscript";\n\nconst env = new Environment({ strictFilters: false });\nconsole.log(env.fromString("{{ \'hello\' | camel_case }}").renderSync());\n// hello\n')))}f.isMDXComponent=!0}}]);