"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[5611],{9494:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return m}});var n=a(6687);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),p=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(a),h=r,m=c["".concat(o,".").concat(h)]||c[h]||u[h]||i;return a?n.createElement(m,l(l({ref:t},d),{},{components:a})):n.createElement(m,l({ref:t},d))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=h;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[c]="string"==typeof e?e:r,l[1]=s;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},3806:function(e,t,a){a.r(t),a.d(t,{assets:function(){return o},contentTitle:function(){return l},default:function(){return u},frontMatter:function(){return i},metadata:function(){return s},toc:function(){return p}});var n=a(1943),r=(a(6687),a(9494));const i={id:"extra.tags.ConditionalEchoTagWithParens",title:"Class: ConditionalEchoTagWithParens",sidebar_label:"ConditionalEchoTagWithParens",custom_edit_url:null},l=void 0,s={unversionedId:"api/classes/extra.tags.ConditionalEchoTagWithParens",id:"api/classes/extra.tags.ConditionalEchoTagWithParens",title:"Class: ConditionalEchoTagWithParens",description:"extra.tags.ConditionalEchoTagWithParens",source:"@site/docs/api/classes/extra.tags.ConditionalEchoTagWithParens.md",sourceDirName:"api/classes",slug:"/api/classes/extra.tags.ConditionalEchoTagWithParens",permalink:"/liquidscript/api/classes/extra.tags.ConditionalEchoTagWithParens",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"extra.tags.ConditionalEchoTagWithParens",title:"Class: ConditionalEchoTagWithParens",sidebar_label:"ConditionalEchoTagWithParens",custom_edit_url:null},sidebar:"API",previous:{title:"ConditionalEchoTag",permalink:"/liquidscript/api/classes/extra.tags.ConditionalEchoTag"},next:{title:"ConditionalOutputStatement",permalink:"/liquidscript/api/classes/extra.tags.ConditionalOutputStatement"}},o={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Properties",id:"properties",level:2},{value:"block",id:"block",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"nodeClass",id:"nodeclass",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"parse",id:"parse",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"parseExpression",id:"parseexpression",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in-4",level:4}],d={toc:p},c="wrapper";function u(e){let{components:t,...a}=e;return(0,r.kt)(c,(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/extra"},"extra"),".",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/extra.tags"},"tags"),".ConditionalEchoTagWithParens"),(0,r.kt)("p",null,"A drop-in replacement for the standard echo tag that supports\ninline ",(0,r.kt)("inlineCode",{parentName:"p"},"if")," expressions with a logical ",(0,r.kt)("inlineCode",{parentName:"p"},"not")," operator and grouping\nterms with parentheses."),(0,r.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag"},(0,r.kt)("inlineCode",{parentName:"a"},"EchoTag"))),(0,r.kt)("p",{parentName:"li"},"\u21b3 ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"ConditionalEchoTagWithParens"))))),(0,r.kt)("h2",{id:"constructors"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new ConditionalEchoTagWithParens"),"()"),(0,r.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag"},"EchoTag"),".",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag#constructor"},"constructor")),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"block"},"block"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"block"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"false")),(0,r.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag"},"EchoTag"),".",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag#block"},"block")),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/builtin/tags/echo.ts#L9"},"src/builtin/tags/echo.ts:9")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"name"},"name"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"name"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")," = ",(0,r.kt)("inlineCode",{parentName:"p"},'"echo"')),(0,r.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag"},"EchoTag"),".",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag#name"},"name")),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/builtin/tags/echo.ts#L10"},"src/builtin/tags/echo.ts:10")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"nodeclass"},"nodeClass"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"nodeClass"),": typeof ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoNode"},(0,r.kt)("inlineCode",{parentName:"a"},"EchoNode"))," = ",(0,r.kt)("inlineCode",{parentName:"p"},"EchoNode")),(0,r.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag"},"EchoTag"),".",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag#nodeclass"},"nodeClass")),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/builtin/tags/echo.ts#L11"},"src/builtin/tags/echo.ts:11")),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"parse"},"parse"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"parse"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"stream"),"): ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node"},(0,r.kt)("inlineCode",{parentName:"a"},"Node"))),(0,r.kt)("p",null,"Create a syntax tree node by parsing tokens from the token\nstream."),(0,r.kt)("p",null,"If implementing a block tag (one with a start and end tag),\nthe stream should be left with the end tag as its current\ntoken."),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"stream")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/interfaces/tokens.TokenStream"},(0,r.kt)("inlineCode",{parentName:"a"},"TokenStream"))),(0,r.kt)("td",{parentName:"tr",align:"left"},"A stream of template tokens.")))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node"},(0,r.kt)("inlineCode",{parentName:"a"},"Node"))),(0,r.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag"},"EchoTag"),".",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag#parse"},"parse")),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/builtin/tags/echo.ts#L17"},"src/builtin/tags/echo.ts:17")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"parseexpression"},"parseExpression"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,r.kt)("strong",{parentName:"p"},"parseExpression"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"value"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"startIndex"),"): ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,r.kt)("inlineCode",{parentName:"a"},"Expression"))),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"value")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"startIndex")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"number"))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,r.kt)("inlineCode",{parentName:"a"},"Expression"))),(0,r.kt)("h4",{id:"overrides"},"Overrides"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag"},"EchoTag"),".",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tags.EchoTag#parseexpression"},"parseExpression")),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/extra/tags/if_expressions.ts#L77"},"src/extra/tags/if_expressions.ts:77")))}u.isMDXComponent=!0}}]);