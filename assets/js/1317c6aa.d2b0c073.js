"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[5090],{9494:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var r=n(6687);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),o=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=o(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=o(n),c=i,k=u["".concat(s,".").concat(c)]||u[c]||m[c]||a;return n?r.createElement(k,l(l({ref:t},d),{},{components:n})):r.createElement(k,l({ref:t},d))}));function k(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=c;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[u]="string"==typeof e?e:i,l[1]=p;for(var o=2;o<a;o++)l[o]=n[o];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},6609:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>a,metadata:()=>p,toc:()=>o});var r=n(1943),i=(n(6687),n(9494));const a={id:"PrefixExpression",title:"Class: PrefixExpression",sidebar_label:"PrefixExpression",sidebar_position:0,custom_edit_url:null},l=void 0,p={unversionedId:"api/classes/PrefixExpression",id:"api/classes/PrefixExpression",title:"Class: PrefixExpression",description:"Implements",source:"@site/docs/api/classes/PrefixExpression.md",sourceDirName:"api/classes",slug:"/api/classes/PrefixExpression",permalink:"/liquidscript/api/classes/PrefixExpression",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"PrefixExpression",title:"Class: PrefixExpression",sidebar_label:"PrefixExpression",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"OutputStreamLimitError",permalink:"/liquidscript/api/classes/OutputStreamLimitError"},next:{title:"PushedTooFarError",permalink:"/liquidscript/api/classes/PushedTooFarError"}},s={},o=[{value:"Implements",id:"implements",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"operator",id:"operator",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"right",id:"right",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"children",id:"children",level:3},{value:"Returns",id:"returns",level:4},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"equals",id:"equals",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"evaluate",id:"evaluate",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Implementation of",id:"implementation-of-2",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"evaluateSync",id:"evaluatesync",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Implementation of",id:"implementation-of-3",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"toString",id:"tostring",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Implementation of",id:"implementation-of-4",level:4},{value:"Defined in",id:"defined-in-7",level:4}],d={toc:o},u="wrapper";function m(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"implements"},"Implements"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression")))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new PrefixExpression"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"operator"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"right"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"operator")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"right")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression")))))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L621"},"src/expression.ts:621")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"operator"},"operator"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"operator"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L622"},"src/expression.ts:622")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"right"},"right"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"right"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L623"},"src/expression.ts:623")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"children"},"children"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"children"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression")),"[]"),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression")),"[]"),(0,i.kt)("h4",{id:"implementation-of"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#children"},"children")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L654"},"src/expression.ts:654")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"equals"},"equals"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"equals"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"other"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"other")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown"))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"implementation-of-1"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#equals"},"equals")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L626"},"src/expression.ts:626")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"evaluate"},"evaluate"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"evaluate"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"context"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"boolean"),">"),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"boolean"),">"),(0,i.kt)("h4",{id:"implementation-of-2"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#evaluate"},"evaluate")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L638"},"src/expression.ts:638")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"evaluatesync"},"evaluateSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"evaluateSync"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"context"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"implementation-of-3"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#evaluatesync"},"evaluateSync")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L646"},"src/expression.ts:646")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tostring"},"toString"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"implementation-of-4"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#tostring"},"toString")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L634"},"src/expression.ts:634")))}m.isMDXComponent=!0}}]);