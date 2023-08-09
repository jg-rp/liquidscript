"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[7335],{9494:(e,t,i)=>{i.d(t,{Zo:()=>u,kt:()=>c});var r=i(6687);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function a(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function l(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function p(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var s=r.createContext({}),d=function(e){var t=r.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):l(l({},t),e)),i},u=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},o="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var i=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),o=d(i),m=n,c=o["".concat(s,".").concat(m)]||o[m]||k[m]||a;return i?r.createElement(c,l(l({ref:t},u),{},{components:i})):r.createElement(c,l({ref:t},u))}));function c(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=i.length,l=new Array(a);l[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[o]="string"==typeof e?e:n,l[1]=p;for(var d=2;d<a;d++)l[d]=i[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,i)}m.displayName="MDXCreateElement"},9104:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>k,frontMatter:()=>a,metadata:()=>p,toc:()=>d});var r=i(1943),n=(i(6687),i(9494));const a={id:"Markup",title:"Class: Markup",sidebar_label:"Markup",sidebar_position:0,custom_edit_url:null},l=void 0,p={unversionedId:"api/classes/Markup",id:"api/classes/Markup",title:"Class: Markup",description:"A string wrapper that is safe to output as HTML, either because it",source:"@site/docs/api/classes/Markup.md",sourceDirName:"api/classes",slug:"/api/classes/Markup",permalink:"/liquidscript/api/classes/Markup",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"Markup",title:"Class: Markup",sidebar_label:"Markup",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"MapLoader",permalink:"/liquidscript/api/classes/MapLoader"},next:{title:"MaxContextDepthError",permalink:"/liquidscript/api/classes/MaxContextDepthError"}},s={},d=[{value:"Implements",id:"implements",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"#s",id:"s",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Accessors",id:"accessors",level:2},{value:"toStringTag",id:"tostringtag",level:3},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"toLiquidHtml",id:"toliquidhtml",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"toLiquidString",id:"toliquidstring",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"toPrimitive",id:"toprimitive",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"toString",id:"tostring",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"escape",id:"escape",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"from",id:"from",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-8",level:4}],u={toc:d},o="wrapper";function k(e){let{components:t,...i}=e;return(0,n.kt)(o,(0,r.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"A string wrapper that is safe to output as HTML, either because it\nhas already been escaped or is considered safe without escaping."),(0,n.kt)("h2",{id:"implements"},"Implements"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/liquidscript/api/interfaces/LiquidHTMLable"},(0,n.kt)("inlineCode",{parentName:"a"},"LiquidHTMLable"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/liquidscript/api/interfaces/LiquidStringable"},(0,n.kt)("inlineCode",{parentName:"a"},"LiquidStringable")))),(0,n.kt)("h2",{id:"constructors"},"Constructors"),(0,n.kt)("h3",{id:"constructor"},"constructor"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"new Markup"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"s"),")"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Markup")," constructor."),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"s")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:"left"},"Escaped or safe markup text.")))),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L21"},"src/builtin/drops/markup.ts:21")),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("h3",{id:"s"},"#s"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,n.kt)("strong",{parentName:"p"},"#s"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L15"},"src/builtin/drops/markup.ts:15")),(0,n.kt)("h2",{id:"accessors"},"Accessors"),(0,n.kt)("h3",{id:"tostringtag"},"[toStringTag]"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"get")," ",(0,n.kt)("strong",{parentName:"p"},"[toStringTag]"),"(): ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"returns"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L48"},"src/builtin/drops/markup.ts:48")),(0,n.kt)("h2",{id:"methods"},"Methods"),(0,n.kt)("h3",{id:"toliquidhtml"},"[toLiquidHtml]"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"[toLiquidHtml]"),"(): ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"returns-1"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"implementation-of"},"Implementation of"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidHTMLable"},"LiquidHTMLable"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidHTMLable#%5Btoliquidhtml%5D"},"[toLiquidHtml]")),(0,n.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L56"},"src/builtin/drops/markup.ts:56")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"toliquidstring"},"[toLiquidString]"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"[toLiquidString]"),"(): ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"returns-2"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"implementation-of-1"},"Implementation of"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidStringable"},"LiquidStringable"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/LiquidStringable#%5Btoliquidstring%5D"},"[toLiquidString]")),(0,n.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L60"},"src/builtin/drops/markup.ts:60")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"toprimitive"},"[toPrimitive]"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"[toPrimitive]"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"hint"),"): ",(0,n.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"hint")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string"))))),(0,n.kt)("h4",{id:"returns-3"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L52"},"src/builtin/drops/markup.ts:52")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"tostring"},"toString"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"returns-4"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L64"},"src/builtin/drops/markup.ts:64")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"escape"},"escape"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,n.kt)("strong",{parentName:"p"},"escape"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"value"),"): ",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,n.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,n.kt)("p",null,"A ",(0,n.kt)("inlineCode",{parentName:"p"},"Markup")," factory function that will escape the input value if it is\nnot already ",(0,n.kt)("inlineCode",{parentName:"p"},"Markup"),"."),(0,n.kt)("h4",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"value")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"unknown")),(0,n.kt)("td",{parentName:"tr",align:"left"},"Any value. If it's already ",(0,n.kt)("inlineCode",{parentName:"td"},"Markup"),", it will be returned unchanged. Otherwise it will be converted to a string and escaped.")))),(0,n.kt)("h4",{id:"returns-5"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,n.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,n.kt)("p",null,"A string representation of the input value after HTML-escaping."),(0,n.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L43"},"src/builtin/drops/markup.ts:43")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"from"},"from"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,n.kt)("strong",{parentName:"p"},"from"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"s"),"): ",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,n.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,n.kt)("p",null,"A ",(0,n.kt)("inlineCode",{parentName:"p"},"Markup")," factory function."),(0,n.kt)("h4",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"s")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Markup"},(0,n.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,n.kt)("td",{parentName:"tr",align:"left"},"Escaped or safe markup text.")))),(0,n.kt)("h4",{id:"returns-6"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Markup"},(0,n.kt)("inlineCode",{parentName:"a"},"Markup"))),(0,n.kt)("p",null,"The input string inside a ",(0,n.kt)("inlineCode",{parentName:"p"},"Markup")," wrapper."),(0,n.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/drops/markup.ts#L31"},"src/builtin/drops/markup.ts:31")))}k.isMDXComponent=!0}}]);