"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[6275],{9494:function(e,t,r){r.d(t,{Zo:function(){return o},kt:function(){return m}});var a=r(6687);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=a.createContext({}),s=function(e){var t=a.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},o=function(e){var t=s(e.components);return a.createElement(d.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,d=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),c=s(r),k=n,m=c["".concat(d,".").concat(k)]||c[k]||u[k]||i;return r?a.createElement(m,l(l({ref:t},o),{},{components:r})):a.createElement(m,l({ref:t},o))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=k;var p={};for(var d in t)hasOwnProperty.call(t,d)&&(p[d]=t[d]);p.originalType=e,p[c]="string"==typeof e?e:n,l[1]=p;for(var s=2;s<i;s++)l[s]=r[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}k.displayName="MDXCreateElement"},215:function(e,t,r){r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return l},default:function(){return u},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return s}});var a=r(1943),n=(r(6687),r(9494));const i={id:"ReadOnlyObjectChainError",title:"Class: ReadOnlyObjectChainError",sidebar_label:"ReadOnlyObjectChainError",sidebar_position:0,custom_edit_url:null},l=void 0,p={unversionedId:"api/classes/ReadOnlyObjectChainError",id:"api/classes/ReadOnlyObjectChainError",title:"Class: ReadOnlyObjectChainError",description:"An error thrown when someone tries to set a property on an ObjectChain.",source:"@site/docs/api/classes/ReadOnlyObjectChainError.md",sourceDirName:"api/classes",slug:"/api/classes/ReadOnlyObjectChainError",permalink:"/liquidscript/api/classes/ReadOnlyObjectChainError",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"ReadOnlyObjectChainError",title:"Class: ReadOnlyObjectChainError",sidebar_label:"ReadOnlyObjectChainError",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"RangeLiteral",permalink:"/liquidscript/api/classes/RangeLiteral"},next:{title:"RenderContext",permalink:"/liquidscript/api/classes/RenderContext"}},d={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"message",id:"message",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"stack",id:"stack",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"prepareStackTrace",id:"preparestacktrace",level:3},{value:"Type declaration",id:"type-declaration",level:4},{value:"Parameters",id:"parameters-1",level:5},{value:"Returns",id:"returns",level:5},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"stackTraceLimit",id:"stacktracelimit",level:3},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"Methods",id:"methods",level:2},{value:"withToken",id:"withtoken",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"captureStackTrace",id:"capturestacktrace",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-7",level:4}],o={toc:s},c="wrapper";function u(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},o,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"An error thrown when someone tries to set a property on an ",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#objectchain"},"ObjectChain"),"."),(0,n.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},(0,n.kt)("inlineCode",{parentName:"a"},"InternalLiquidError"))),(0,n.kt)("p",{parentName:"li"},"\u21b3 ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"ReadOnlyObjectChainError"))))),(0,n.kt)("h2",{id:"constructors"},"Constructors"),(0,n.kt)("h3",{id:"constructor"},"constructor"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"new ReadOnlyObjectChainError"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"message"),")"),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"message")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string"))))),(0,n.kt)("h4",{id:"overrides"},"Overrides"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#constructor"},"constructor")),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/errors.ts#L278"},"src/errors.ts:278")),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("h3",{id:"message"},"message"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"message"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#message"},"message")),(0,n.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/errors.ts#L278"},"src/errors.ts:278")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"name"},"name"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"name"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#name"},"name")),(0,n.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,n.kt)("p",null,"docs/.yarn/cache/typescript-patch-2f73799a60-8f6260acc8.zip/node_modules/typescript/lib/lib.es5.d.ts:1053"),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"stack"},"stack"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("strong",{parentName:"p"},"stack"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#stack"},"stack")),(0,n.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,n.kt)("p",null,"docs/.yarn/cache/typescript-patch-2f73799a60-8f6260acc8.zip/node_modules/typescript/lib/lib.es5.d.ts:1055"),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"preparestacktrace"},"prepareStackTrace"),(0,n.kt)("p",null,"\u25aa ",(0,n.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("strong",{parentName:"p"},"prepareStackTrace"),": (",(0,n.kt)("inlineCode",{parentName:"p"},"err"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"Error"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"stackTraces"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"CallSite"),"[]) => ",(0,n.kt)("inlineCode",{parentName:"p"},"any")),(0,n.kt)("h4",{id:"type-declaration"},"Type declaration"),(0,n.kt)("p",null,"\u25b8 (",(0,n.kt)("inlineCode",{parentName:"p"},"err"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"stackTraces"),"): ",(0,n.kt)("inlineCode",{parentName:"p"},"any")),(0,n.kt)("p",null,"Optional override for formatting stack traces"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"See"))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://v8.dev/docs/stack-trace-api#customizing-stack-traces"},"https://v8.dev/docs/stack-trace-api#customizing-stack-traces")),(0,n.kt)("h5",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"err")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"Error"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"stackTraces")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"CallSite"),"[]")))),(0,n.kt)("h5",{id:"returns"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"any")),(0,n.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#preparestacktrace"},"prepareStackTrace")),(0,n.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,n.kt)("p",null,".yarn/cache/@types-node-npm-18.11.18-d61e8a4a20-03f17f9480.zip/node_modules/@types/node/globals.d.ts:11"),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"stacktracelimit"},"stackTraceLimit"),(0,n.kt)("p",null,"\u25aa ",(0,n.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,n.kt)("strong",{parentName:"p"},"stackTraceLimit"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"number")),(0,n.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#stacktracelimit"},"stackTraceLimit")),(0,n.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,n.kt)("p",null,".yarn/cache/@types-node-npm-18.11.18-d61e8a4a20-03f17f9480.zip/node_modules/@types/node/globals.d.ts:13"),(0,n.kt)("h2",{id:"methods"},"Methods"),(0,n.kt)("h3",{id:"withtoken"},"withToken"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"withToken"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"token"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"templateName?"),"): ",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/LiquidError"},(0,n.kt)("inlineCode",{parentName:"a"},"LiquidError"))),(0,n.kt)("h4",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"token")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/tokens.Token"},(0,n.kt)("inlineCode",{parentName:"a"},"Token")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"templateName?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string"))))),(0,n.kt)("h4",{id:"returns-1"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/LiquidError"},(0,n.kt)("inlineCode",{parentName:"a"},"LiquidError"))),(0,n.kt)("h4",{id:"overrides-1"},"Overrides"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#withtoken"},"withToken")),(0,n.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/errors.ts#L283"},"src/errors.ts:283")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"capturestacktrace"},"captureStackTrace"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,n.kt)("strong",{parentName:"p"},"captureStackTrace"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"targetObject"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"constructorOpt?"),"): ",(0,n.kt)("inlineCode",{parentName:"p"},"void")),(0,n.kt)("p",null,"Create .stack property on a target object"),(0,n.kt)("h4",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"targetObject")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"object"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"constructorOpt?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"Function"))))),(0,n.kt)("h4",{id:"returns-2"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"void")),(0,n.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError"},"InternalLiquidError"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/InternalLiquidError#capturestacktrace"},"captureStackTrace")),(0,n.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,n.kt)("p",null,".yarn/cache/@types-node-npm-18.11.18-d61e8a4a20-03f17f9480.zip/node_modules/@types/node/globals.d.ts:4"))}u.isMDXComponent=!0}}]);