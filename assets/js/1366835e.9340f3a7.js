"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[5675],{9494:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>N});var a=n(6687);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=a.createContext({}),o=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=o(e.components);return a.createElement(d.Provider,{value:t},e.children)},m="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,d=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=o(n),u=i,N=m["".concat(d,".").concat(u)]||m[u]||k[u]||r;return n?a.createElement(N,l(l({ref:t},s),{},{components:n})):a.createElement(N,l({ref:t},s))}));function N(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=u;var p={};for(var d in t)hasOwnProperty.call(t,d)&&(p[d]=t[d]);p.originalType=e,p[m]="string"==typeof e?e:i,l[1]=p;for(var o=2;o<r;o++)l[o]=n[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7089:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>k,frontMatter:()=>r,metadata:()=>p,toc:()=>o});var a=n(1943),i=(n(6687),n(9494));const r={id:"LoopExpression",title:"Class: LoopExpression",sidebar_label:"LoopExpression",sidebar_position:0,custom_edit_url:null},l=void 0,p={unversionedId:"api/classes/LoopExpression",id:"api/classes/LoopExpression",title:"Class: LoopExpression",description:"Implements",source:"@site/docs/api/classes/LoopExpression.md",sourceDirName:"api/classes",slug:"/api/classes/LoopExpression",permalink:"/liquidscript/api/classes/LoopExpression",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"LoopExpression",title:"Class: LoopExpression",sidebar_label:"LoopExpression",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"LocalNamespaceLimitError",permalink:"/liquidscript/api/classes/LocalNamespaceLimitError"},next:{title:"LoopIterationLimitError",permalink:"/liquidscript/api/classes/LoopIterationLimitError"}},d={},o=[{value:"Implements",id:"implements",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"cols",id:"cols",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"iterable",id:"iterable",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"limit",id:"limit",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"name",id:"name",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"offset",id:"offset",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"reversed",id:"reversed",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"Methods",id:"methods",level:2},{value:"children",id:"children",level:3},{value:"Returns",id:"returns",level:4},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"drop",id:"drop",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"equals",id:"equals",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"evaluate",id:"evaluate",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Implementation of",id:"implementation-of-2",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"evaluateSync",id:"evaluatesync",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Implementation of",id:"implementation-of-3",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"limitAndOffset",id:"limitandoffset",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"take",id:"take",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"toIter",id:"toiter",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-7",level:4},{value:"Defined in",id:"defined-in-14",level:4},{value:"toString",id:"tostring",level:3},{value:"Returns",id:"returns-8",level:4},{value:"Implementation of",id:"implementation-of-4",level:4},{value:"Defined in",id:"defined-in-15",level:4}],s={toc:o},m="wrapper";function k(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"implements"},"Implements"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression")))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new LoopExpression"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"iterable"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"limit?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"offset?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"cols?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"reversed?"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"iterable")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/StringLiteral"},(0,i.kt)("inlineCode",{parentName:"a"},"StringLiteral"))," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RangeLiteral"},(0,i.kt)("inlineCode",{parentName:"a"},"RangeLiteral"))," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Identifier"},(0,i.kt)("inlineCode",{parentName:"a"},"Identifier"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"limit?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#loopargument"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopArgument"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"offset?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#loopargument"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopArgument"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"cols?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#loopargument"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopArgument"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"reversed")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"boolean")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"false"))))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L739"},"src/expression.ts:739")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"cols"},"cols"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"cols"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#loopargument"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopArgument"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L744"},"src/expression.ts:744")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"iterable"},"iterable"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"iterable"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/StringLiteral"},(0,i.kt)("inlineCode",{parentName:"a"},"StringLiteral"))," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/RangeLiteral"},(0,i.kt)("inlineCode",{parentName:"a"},"RangeLiteral"))," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Identifier"},(0,i.kt)("inlineCode",{parentName:"a"},"Identifier"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L741"},"src/expression.ts:741")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"limit"},"limit"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"limit"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#loopargument"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopArgument"))),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L742"},"src/expression.ts:742")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"name"},"name"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"name"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L740"},"src/expression.ts:740")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"offset"},"offset"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"offset"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#loopargument"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopArgument"))),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L743"},"src/expression.ts:743")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"reversed"},"reversed"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"reversed"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"false")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L745"},"src/expression.ts:745")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"children"},"children"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"children"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression")),"[]"),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression")),"[]"),(0,i.kt)("h4",{id:"implementation-of"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#children"},"children")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L871"},"src/expression.ts:871")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"drop"},"drop"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"drop"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"it"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"it")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"undefined"),">")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"n")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L785"},"src/expression.ts:785")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"equals"},"equals"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"equals"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"other"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"other")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown"))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"implementation-of-1"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#equals"},"equals")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L748"},"src/expression.ts:748")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"evaluate"},"evaluate"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"evaluate"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"context"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<","[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]",">"),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<","[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]",">"),(0,i.kt)("h4",{id:"implementation-of-2"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#evaluate"},"evaluate")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L847"},"src/expression.ts:847")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"evaluatesync"},"evaluateSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"evaluateSync"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"context"),"): ","[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]"),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,"[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]"),(0,i.kt)("h4",{id:"implementation-of-3"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#evaluatesync"},"evaluateSync")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L860"},"src/expression.ts:860")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"limitandoffset"},"limitAndOffset"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"limitAndOffset"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"context"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"it"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"length"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"limit"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"offset"),"): ","[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]"),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"it")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Iterable"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"unknown"),">")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"length")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"limit")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"offset")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown"))))),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,"[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]"),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L798"},"src/expression.ts:798")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"take"},"take"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"take"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"it"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"it")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Iterator"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"undefined"),">")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"n")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L794"},"src/expression.ts:794")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"toiter"},"toIter"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"toIter"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"obj"),"): ","[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]"),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"obj")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown"))))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,"[",(0,i.kt)("inlineCode",{parentName:"p"},"Iterable"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">",", ",(0,i.kt)("inlineCode",{parentName:"p"},"number"),"]"),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L769"},"src/expression.ts:769")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tostring"},"toString"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"toString"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"implementation-of-4"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},"Expression"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression#tostring"},"toString")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/expression.ts#L760"},"src/expression.ts:760")))}k.isMDXComponent=!0}}]);