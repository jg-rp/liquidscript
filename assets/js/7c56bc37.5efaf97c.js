"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[7335],{9494:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return m}});var n=r(6687);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},o={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),k=u(r),m=i,c=k["".concat(s,".").concat(m)]||k[m]||o[m]||a;return r?n.createElement(c,l(l({ref:t},d),{},{components:r})):n.createElement(c,l({ref:t},d))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=k;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:i,l[1]=p;for(var u=2;u<a;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}k.displayName="MDXCreateElement"},62:function(e,t,r){r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return p},metadata:function(){return u},toc:function(){return o}});var n=r(9853),i=r(5309),a=(r(6687),r(9494)),l=["components"],p={id:"Markup",title:"Class: Markup",sidebar_label:"Markup",sidebar_position:0,custom_edit_url:null},s=void 0,u={unversionedId:"api/classes/Markup",id:"api/classes/Markup",title:"Class: Markup",description:"A string wrapper that is safe to output as HTML, either because it",source:"@site/docs/api/classes/Markup.md",sourceDirName:"api/classes",slug:"/api/classes/Markup",permalink:"/liquidscript/api/classes/Markup",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"Markup",title:"Class: Markup",sidebar_label:"Markup",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"MapLoader",permalink:"/liquidscript/api/classes/MapLoader"},next:{title:"MaxContextDepthError",permalink:"/liquidscript/api/classes/MaxContextDepthError"}},d={},o=[{value:"Implements",id:"implements",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"#s",id:"s",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Accessors",id:"accessors",level:2},{value:"toStringTag",id:"tostringtag",level:3},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"toLiquidHtml",id:"toliquidhtml",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"toLiquidString",id:"toliquidstring",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"toPrimitive",id:"toprimitive",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"toString",id:"tostring",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"escape",id:"escape",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"from",id:"from",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-8",level:4}],k={toc:o};function m(e){var t=e.components,r=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},k,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A string wrapper that is safe to output as HTML, either because it\nhas already been escaped or is considered safe without escaping."),(0,a.kt)("h2",{id:"implements"},"Implements"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/liquidscript/api/interfaces/LiquidHTMLable"},(0,a.kt)("inlineCode",{parentName:"a"},"LiquidHTMLable"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/liquidscript/api/interfaces/LiquidStringable"},(0,a.kt)("inlineCode",{parentName:"a"},"LiquidStringable")))),(0,a.kt)("h2",{id:"constructors"},"Constructors"),(0,a.kt)("h3",{id:"constructor"},"constructor"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"new Markup"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"s"),")"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Markup")," constructor."),(0,a.kt)("h4",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"s")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"string")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Escaped or safe markup text.")))),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L21"},"src/builtin/drops/markup.ts:21")),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"s"},"#s"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,a.kt)("strong",{parentName:"p"},"#s"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L15"},"src/builtin/drops/markup.ts:15")),(0,a.kt)("h2",{id:"accessors"},"Accessors"),(0,a.kt)("h3",{id:"tostringtag"},"[toStringTag]"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"get")," ",(0,a.kt)("strong",{parentName:"p"},"[toStringTag]"),"(): ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L48"},"src/builtin/drops/markup.ts:48")),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"toliquidhtml"},"[toLiquidHtml]"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"[toLiquidHtml]"),"(): ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"returns-1"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"implementation-of"},"Implementation of"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidHTMLable"},"LiquidHTMLable"),".",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidHTMLable#%5Btoliquidhtml%5D"},"[toLiquidHtml]")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L56"},"src/builtin/drops/markup.ts:56")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"toliquidstring"},"[toLiquidString]"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"[toLiquidString]"),"(): ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"returns-2"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"implementation-of-1"},"Implementation of"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidStringable"},"LiquidStringable"),".",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidStringable#%5Btoliquidstring%5D"},"[toLiquidString]")),(0,a.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L60"},"src/builtin/drops/markup.ts:60")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"toprimitive"},"[toPrimitive]"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"[toPrimitive]"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"hint"),"): ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"parameters-1"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"hint")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"string"))))),(0,a.kt)("h4",{id:"returns-3"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L52"},"src/builtin/drops/markup.ts:52")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"tostring"},"toString"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"returns-4"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L64"},"src/builtin/drops/markup.ts:64")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"escape"},"escape"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,a.kt)("strong",{parentName:"p"},"escape"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"value"),"): ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,a.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,a.kt)("p",null,"A ",(0,a.kt)("inlineCode",{parentName:"p"},"Markup")," factory function that will escape the input value if it is\nnot already ",(0,a.kt)("inlineCode",{parentName:"p"},"Markup"),"."),(0,a.kt)("h4",{id:"parameters-2"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"value")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"unknown")),(0,a.kt)("td",{parentName:"tr",align:"left"},"Any value. If it's already ",(0,a.kt)("inlineCode",{parentName:"td"},"Markup"),", it will be returned unchanged. Otherwise it will be converted to a string and escaped.")))),(0,a.kt)("h4",{id:"returns-5"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,a.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,a.kt)("p",null,"A string representation of the input value after HTML-escaping."),(0,a.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L43"},"src/builtin/drops/markup.ts:43")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"from"},"from"),(0,a.kt)("p",null,"\u25b8 ",(0,a.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,a.kt)("strong",{parentName:"p"},"from"),"(",(0,a.kt)("inlineCode",{parentName:"p"},"s"),"): ",(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,a.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,a.kt)("p",null,"A ",(0,a.kt)("inlineCode",{parentName:"p"},"Markup")," factory function."),(0,a.kt)("h4",{id:"parameters-3"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"s")),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,a.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Markup"},(0,a.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,a.kt)("td",{parentName:"tr",align:"left"},"Escaped or safe markup text.")))),(0,a.kt)("h4",{id:"returns-6"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,a.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,a.kt)("p",null,"The input string inside a ",(0,a.kt)("inlineCode",{parentName:"p"},"Markup")," wrapper."),(0,a.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/90c4df6/src/builtin/drops/markup.ts#L31"},"src/builtin/drops/markup.ts:31")))}m.isMDXComponent=!0}}]);