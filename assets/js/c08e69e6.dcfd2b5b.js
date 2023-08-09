"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[6114],{9494:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>k});var r=a(6687);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function p(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=r.createContext({}),d=function(e){var t=r.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=d(e.components);return r.createElement(o.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=d(a),u=n,k=m["".concat(o,".").concat(u)]||m[u]||c[u]||i;return a?r.createElement(k,l(l({ref:t},s),{},{components:a})):r.createElement(k,l({ref:t},s))}));function k(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,l=new Array(i);l[0]=u;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[m]="string"==typeof e?e:n,l[1]=p;for(var d=2;d<i;d++)l[d]=a[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},9841:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>p,toc:()=>d});var r=a(1943),n=(a(6687),a(9494));const i={id:"FetchLoader",title:"Class: FetchLoader",sidebar_label:"FetchLoader",sidebar_position:0,custom_edit_url:null},l=void 0,p={unversionedId:"api/classes/FetchLoader",id:"api/classes/FetchLoader",title:"Class: FetchLoader",description:"A template loader that fetches templates using the Fetch API.",source:"@site/docs/api/classes/FetchLoader.md",sourceDirName:"api/classes",slug:"/api/classes/FetchLoader",permalink:"/liquidscript/api/classes/FetchLoader",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"FetchLoader",title:"Class: FetchLoader",sidebar_label:"FetchLoader",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"FalsyStrictUndefined",permalink:"/liquidscript/api/classes/FalsyStrictUndefined"},next:{title:"FilterArgumentError",permalink:"/liquidscript/api/classes/FilterArgumentError"}},o={},d=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"#init",id:"init",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"baseURL",id:"baseurl",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"Methods",id:"methods",level:2},{value:"getSource",id:"getsource",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"getSourceSync",id:"getsourcesync",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Overrides",id:"overrides-2",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"load",id:"load",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"loadSync",id:"loadsync",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-6",level:4}],s={toc:d},m="wrapper";function c(e){let{components:t,...a}=e;return(0,n.kt)(m,(0,r.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"A template loader that fetches templates using the Fetch API."),(0,n.kt)("p",null,"This is an async only loader. Expect an error when using this\nloader with ",(0,n.kt)("inlineCode",{parentName:"p"},"getSourceSync()")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"Environment.getTemplateSync()"),"."),(0,n.kt)("p",null,"This loader treats the response body as text that is the template\nsource code. You might need to write a custom loader to handle\nJSON responses, for example."),(0,n.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},(0,n.kt)("inlineCode",{parentName:"a"},"Loader"))),(0,n.kt)("p",{parentName:"li"},"\u21b3 ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"FetchLoader"))))),(0,n.kt)("h2",{id:"constructors"},"Constructors"),(0,n.kt)("h3",{id:"constructor"},"constructor"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"new FetchLoader"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"baseURL"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"options?"),")"),(0,n.kt)("p",null,"The ",(0,n.kt)("inlineCode",{parentName:"p"},"FetchLoader")," constructor. Creates a new ",(0,n.kt)("inlineCode",{parentName:"p"},"FetchLoader"),"."),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"baseURL")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:"left"},"The base URL from which to fetch templates from.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"options")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#fetchloaderoptions"},(0,n.kt)("inlineCode",{parentName:"a"},"FetchLoaderOptions"))),(0,n.kt)("td",{parentName:"tr",align:"left"},"Loader options. Most of which are passed through to the Fetch API's ",(0,n.kt)("inlineCode",{parentName:"td"},"Request")," constructor.")))),(0,n.kt)("h4",{id:"overrides"},"Overrides"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#constructor"},"constructor")),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/loaders/fetch_loader.ts#L80"},"src/builtin/loaders/fetch_loader.ts:80")),(0,n.kt)("h2",{id:"properties"},"Properties"),(0,n.kt)("h3",{id:"init"},"#init"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,n.kt)("strong",{parentName:"p"},"#init"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"init")),(0,n.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/loaders/fetch_loader.ts#L70"},"src/builtin/loaders/fetch_loader.ts:70")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"baseurl"},"baseURL"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"baseURL"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/loaders/fetch_loader.ts#L69"},"src/builtin/loaders/fetch_loader.ts:69")),(0,n.kt)("h2",{id:"methods"},"Methods"),(0,n.kt)("h3",{id:"getsource"},"getSource"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"getSource"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"name"),"): ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,n.kt)("inlineCode",{parentName:"a"},"TemplateSource")),">"),(0,n.kt)("p",null,"Override ",(0,n.kt)("inlineCode",{parentName:"p"},"getSource")," to implement a custom loader."),(0,n.kt)("h4",{id:"parameters-1"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"name")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string")),(0,n.kt)("td",{parentName:"tr",align:"left"},"The name or identifier of a template.")))),(0,n.kt)("h4",{id:"returns"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,n.kt)("inlineCode",{parentName:"a"},"TemplateSource")),">"),(0,n.kt)("p",null,"The source, with any meta data, for the template identified by\nthe given name"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"Throws"))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateNotFoundError"},"TemplateNotFoundError"),"\nThrown if the template can not be found."),(0,n.kt)("h4",{id:"overrides-1"},"Overrides"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#getsource"},"getSource")),(0,n.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/loaders/fetch_loader.ts#L92"},"src/builtin/loaders/fetch_loader.ts:92")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"getsourcesync"},"getSourceSync"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"getSourceSync"),"(): ",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,n.kt)("inlineCode",{parentName:"a"},"TemplateSource"))),(0,n.kt)("p",null,"A synchronous version of ",(0,n.kt)("inlineCode",{parentName:"p"},"getSource"),"."),(0,n.kt)("h4",{id:"returns-1"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,n.kt)("inlineCode",{parentName:"a"},"TemplateSource"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"See"))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#getsource"},"getSource")),(0,n.kt)("h4",{id:"overrides-2"},"Overrides"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#getsourcesync"},"getSourceSync")),(0,n.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/builtin/loaders/fetch_loader.ts#L101"},"src/builtin/loaders/fetch_loader.ts:101")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"load"},"load"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"load"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"environment"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"context?"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"globals?"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"loaderContext?"),"): ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,n.kt)("inlineCode",{parentName:"a"},"Template")),">"),(0,n.kt)("p",null,"Used internally by ",(0,n.kt)("inlineCode",{parentName:"p"},"Environment.getTemplate()"),". Delegates to ",(0,n.kt)("inlineCode",{parentName:"p"},"getSource"),"."),(0,n.kt)("h4",{id:"parameters-2"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"name")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"environment")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Environment"},(0,n.kt)("inlineCode",{parentName:"a"},"Environment")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"context?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,n.kt)("inlineCode",{parentName:"a"},"RenderContext")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"globals?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,n.kt)("inlineCode",{parentName:"a"},"ContextScope")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"loaderContext?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"Object"))))),(0,n.kt)("h4",{id:"returns-2"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,n.kt)("inlineCode",{parentName:"a"},"Template")),">"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"See"))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#getsource"},"getSource"),". Override ",(0,n.kt)("inlineCode",{parentName:"p"},"load")," to implement a caching loader."),(0,n.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#load"},"load")),(0,n.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/loader.ts#L76"},"src/loader.ts:76")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"loadsync"},"loadSync"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"loadSync"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"environment"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"context?"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"globals?"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"loaderContext?"),"): ",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,n.kt)("inlineCode",{parentName:"a"},"Template"))),(0,n.kt)("p",null,"A synchronous version of ",(0,n.kt)("inlineCode",{parentName:"p"},"load"),"."),(0,n.kt)("h4",{id:"parameters-3"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"name")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"string"))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"environment")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Environment"},(0,n.kt)("inlineCode",{parentName:"a"},"Environment")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"context?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,n.kt)("inlineCode",{parentName:"a"},"RenderContext")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"globals?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,n.kt)("inlineCode",{parentName:"a"},"ContextScope")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"loaderContext?")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"Object"))))),(0,n.kt)("h4",{id:"returns-3"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,n.kt)("inlineCode",{parentName:"a"},"Template"))),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"See"))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#load"},"load")),(0,n.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,n.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#loadsync"},"loadSync")),(0,n.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/622a8c1/src/loader.ts#L97"},"src/loader.ts:97")))}c.isMDXComponent=!0}}]);