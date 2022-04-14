"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[2041],{9494:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return u}});var a=n(6687);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),o=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=o(e.components);return a.createElement(d.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,d=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),k=o(n),u=r,c=k["".concat(d,".").concat(u)]||k[u]||m[u]||i;return n?a.createElement(c,l(l({ref:t},s),{},{components:n})):a.createElement(c,l({ref:t},s))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=k;var p={};for(var d in t)hasOwnProperty.call(t,d)&&(p[d]=t[d]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var o=2;o<i;o++)l[o]=n[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},7526:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return d},default:function(){return u},frontMatter:function(){return p},metadata:function(){return o},toc:function(){return m}});var a=n(9149),r=n(8332),i=(n(6687),n(9494)),l=["components"],p={id:"RenderContext",title:"Class: RenderContext",sidebar_label:"RenderContext",sidebar_position:0,custom_edit_url:null},d=void 0,o={unversionedId:"api/classes/RenderContext",id:"api/classes/RenderContext",title:"Class: RenderContext",description:"A RenderContext manages template scopes, internal registers and",source:"@site/docs/api/classes/RenderContext.md",sourceDirName:"api/classes",slug:"/api/classes/RenderContext",permalink:"/liquidscript/api/classes/RenderContext",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"RenderContext",title:"Class: RenderContext",sidebar_label:"RenderContext",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"ReadOnlyObjectChainError",permalink:"/liquidscript/api/classes/ReadOnlyObjectChainError"},next:{title:"Root",permalink:"/liquidscript/api/classes/Root"}},s={},m=[{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"copyDepth",id:"copydepth",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"counters",id:"counters",level:3},{value:"Index signature",id:"index-signature",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"disabledTags",id:"disabledtags",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"environment",id:"environment",level:3},{value:"forLoops",id:"forloops",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"locals",id:"locals",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"registers",id:"registers",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"scope",id:"scope",level:3},{value:"Defined in",id:"defined-in-7",level:4},{value:"templateName",id:"templatename",level:3},{value:"Defined in",id:"defined-in-8",level:4},{value:"Methods",id:"methods",level:2},{value:"assign",id:"assign",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"copy",id:"copy",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"extend",id:"extend",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"extendSync",id:"extendsync",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"get",id:"get",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"getRegister",id:"getregister",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-14",level:4},{value:"getSync",id:"getsync",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-15",level:4},{value:"getTemplate",id:"gettemplate",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-7",level:4},{value:"Defined in",id:"defined-in-16",level:4},{value:"getTemplateSync",id:"gettemplatesync",level:3},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-8",level:4},{value:"Defined in",id:"defined-in-17",level:4},{value:"resolve",id:"resolve",level:3},{value:"Parameters",id:"parameters-10",level:4},{value:"Returns",id:"returns-9",level:4},{value:"Defined in",id:"defined-in-18",level:4},{value:"resolveSync",id:"resolvesync",level:3},{value:"Parameters",id:"parameters-11",level:4},{value:"Returns",id:"returns-10",level:4},{value:"Defined in",id:"defined-in-19",level:4}],k={toc:m};function u(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A RenderContext manages template scopes, internal registers and\naccess to the bound environment during the rendering of a template."),(0,i.kt)("p",null,"A new RenderContext is created automatically every time ",(0,i.kt)("inlineCode",{parentName:"p"},"render()"),"\nis called on a ",(0,i.kt)("inlineCode",{parentName:"p"},"Template"),", so you probably don't want to instantiate\nit directly."),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new RenderContext"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"environment"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"globals?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"options?"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"environment")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Environment"},(0,i.kt)("inlineCode",{parentName:"a"},"Environment"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The environment from which this context was created.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"globals")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextScope"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"Global template variables, passed down from the Environment, Template, Loader and arguments to ",(0,i.kt)("inlineCode",{parentName:"td"},".render()"),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"options")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#rendercontextoptions"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContextOptions"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"Extra render context options.")))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L112"},"src/context.ts:112")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"copydepth"},"copyDepth"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"copyDepth"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"The number of times this render context has been copied or\nextended. This helps us guard against recursive use of ",(0,i.kt)("inlineCode",{parentName:"p"},"include"),"\nor ",(0,i.kt)("inlineCode",{parentName:"p"},"render")," tags."),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L103"},"src/context.ts:103")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"counters"},"counters"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"counters"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Object")," = ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")),(0,i.kt)("p",null,"A distinct scope for counters set using the ",(0,i.kt)("inlineCode",{parentName:"p"},"increment")," and\n",(0,i.kt)("inlineCode",{parentName:"p"},"decrement")," tags."),(0,i.kt)("h4",{id:"index-signature"},"Index signature"),(0,i.kt)("p",null,"\u25aa ","[index: ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"]",": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L55"},"src/context.ts:55")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"disabledtags"},"disabledTags"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"disabledTags"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Set"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,i.kt)("p",null,"A set of tag names that are disallowed in this render context. For\nexample, the ",(0,i.kt)("inlineCode",{parentName:"p"},"include")," tag is not allowed in templates rendered\nwith the ",(0,i.kt)("inlineCode",{parentName:"p"},"render")," tag."),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L90"},"src/context.ts:90")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"environment"},"environment"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"environment"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},(0,i.kt)("inlineCode",{parentName:"a"},"Environment"))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"forloops"},"forLoops"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"forLoops"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/drops.ForLoopDrop"},(0,i.kt)("inlineCode",{parentName:"a"},"ForLoopDrop")),"[] = ",(0,i.kt)("inlineCode",{parentName:"p"},"[]")),(0,i.kt)("p",null,"A stack of ",(0,i.kt)("inlineCode",{parentName:"p"},"ForLoopDrop")," objects. Used to populate the ",(0,i.kt)("inlineCode",{parentName:"p"},"parentloop"),"\nproperty of a ",(0,i.kt)("inlineCode",{parentName:"p"},"ForLoopDrop"),"."),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L61"},"src/context.ts:61")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"locals"},"locals"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"locals"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#contextscope"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextScope"))," = ",(0,i.kt)("inlineCode",{parentName:"p"},"{}")),(0,i.kt)("p",null,"A namespace for variables set using the ",(0,i.kt)("inlineCode",{parentName:"p"},"assign")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"capture")," tags."),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L76"},"src/context.ts:76")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"registers"},"registers"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"registers"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Map"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"symbol"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Map"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"symbol"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">",">"),(0,i.kt)("p",null,"A register is a Map used by tags and/or filters to store arbitrary\nvalues that are not available to template authors. Use ",(0,i.kt)("inlineCode",{parentName:"p"},"getRegister()"),"\nto obtain a named register."),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L68"},"src/context.ts:68")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"scope"},"scope"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"scope"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ObjectChain")),(0,i.kt)("p",null,"A chain of scopes. When resolving names, each scope in the chain is\nsearched in order. If a new scope if pushed on to a RenderContext,\nit is pushed to the front if this chain."),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L83"},"src/context.ts:83")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"templatename"},"templateName"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"templateName"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"The name of the template being rendered. Will be ",(0,i.kt)("inlineCode",{parentName:"p"},"<string>")," for\ntemplates parsed using ",(0,i.kt)("inlineCode",{parentName:"p"},"Environment.fromString()")," without being\ngiven a name."),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L96"},"src/context.ts:96")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"assign"},"assign"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"assign"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"key"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"value"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Assign or re-assign a template local variable, probably from either the\n",(0,i.kt)("inlineCode",{parentName:"p"},"assign")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"capture")," tags."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"key")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the template local variable.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"value")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The value of the template local variable.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L135"},"src/context.ts:135")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"copy"},"copy"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"copy"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"disabledTags"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext"))),(0,i.kt)("p",null,"Create a new context by copying this one, without any local variables and\nregisters, and extending the copy with the given scope."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"scope")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextScope"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"A scope with which to extend the current context.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"disabledTags")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Iterable"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The names of any tags that should be disallowed in the new context.")))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext"))),(0,i.kt)("p",null,"An extended copy of this context."),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L279"},"src/context.ts:279")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"extend"},"extend"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"extend"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),">","(",(0,i.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"callback"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),">"),(0,i.kt)("p",null,"Extend the current scope for the duration of the given callback function."),(0,i.kt)("h4",{id:"type-parameters"},"Type parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"T"))))),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"scope")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextScope"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"Variables with which to extend the")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"callback")),(0,i.kt)("td",{parentName:"tr",align:"left"},"() => ",(0,i.kt)("inlineCode",{parentName:"td"},"T")),(0,i.kt)("td",{parentName:"tr",align:"left"},"A function to call with the extended scope.")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),">"),(0,i.kt)("p",null,"The callback functions return value."),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L306"},"src/context.ts:306")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"extendsync"},"extendSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"extendSync"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),">","(",(0,i.kt)("inlineCode",{parentName:"p"},"scope"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"callback"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"T")),(0,i.kt)("p",null,"A synchronous version of ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/RenderContext#extend"},"extend"),"."),(0,i.kt)("h4",{id:"type-parameters-1"},"Type parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"T"))))),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"scope")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextScope")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"callback")),(0,i.kt)("td",{parentName:"tr",align:"left"},"() => ",(0,i.kt)("inlineCode",{parentName:"td"},"T"))))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"T")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L318"},"src/context.ts:318")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"get"},"get"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"get"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"path?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"missing?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("p",null,"Search the current scope for a template variable and, if found, follow\nthe given path. This is a bit like resolving a JSONPath expression."),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the template variable to resolve.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"path?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextpath"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextPath"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined")),(0,i.kt)("td",{parentName:"tr",align:"left"},"An optional array of path elements to follow.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"missing")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Missing")),(0,i.kt)("td",{parentName:"tr",align:"left"},"A default value used if the name and path fail to find a value.")))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("p",null,"The value at ",(0,i.kt)("inlineCode",{parentName:"p"},"path"),", starting from the given name, or ",(0,i.kt)("inlineCode",{parentName:"p"},"missing"),"\notherwise. If ",(0,i.kt)("inlineCode",{parentName:"p"},"missing")," is not given, an instance of the ",(0,i.kt)("inlineCode",{parentName:"p"},"Undefined"),"\nclass defined on the attached environment will be used."),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L170"},"src/context.ts:170")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getregister"},"getRegister"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getRegister"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"key"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Map"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"symbol"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("p",null,"Fetch a render context register, creating one if it does not exist."),(0,i.kt)("p",null,"A register is a place for tags and/or filters to store arbitrary data,\nwithout leaking said data into the template scope."),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"key")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},"symbol")),(0,i.kt)("td",{parentName:"tr",align:"left"},"An identifier for the register.")))),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Map"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"symbol"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("p",null,"A register."),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L262"},"src/context.ts:262")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getsync"},"getSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getSync"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"path?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"missing?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown")),(0,i.kt)("p",null,"A synchronous version of ",(0,i.kt)("inlineCode",{parentName:"p"},"RenderContext.get()"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"see"))," ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/RenderContext#get"},"get")),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"path?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextpath"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextPath"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"missing")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"unknown")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Missing"))))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"unknown")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L198"},"src/context.ts:198")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"gettemplate"},"getTemplate"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getTemplate"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"loaderContext"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template")),">"),(0,i.kt)("p",null,"A convenience method for loading a template from the attached environment."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"throws"))," ",(0,i.kt)("inlineCode",{parentName:"p"},"NoSuchTemplateError")," if a template with the given name can not\nbe found."),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name or identifier of the template to load.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"loaderContext")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Object")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Additional, arbitrary data that a loader can use to scope or otherwise narrow its search space.")))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template")),">"),(0,i.kt)("p",null,"A ",(0,i.kt)("inlineCode",{parentName:"p"},"Template"),", ready to be rendered."),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L231"},"src/context.ts:231")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"gettemplatesync"},"getTemplateSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getTemplateSync"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"loaderContext?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template"))),(0,i.kt)("p",null,"A synchronous version of ",(0,i.kt)("inlineCode",{parentName:"p"},"RenderContext.getTemplate()"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"see"))," ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/RenderContext#gettemplate"},"getTemplate")),(0,i.kt)("h4",{id:"parameters-9"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"loaderContext")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Object"))))),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template"))),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L242"},"src/context.ts:242")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"resolve"},"resolve"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"resolve"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("p",null,"Resolve a template variable by searching the scope chain. Unlike ",(0,i.kt)("inlineCode",{parentName:"p"},"get"),",\n",(0,i.kt)("inlineCode",{parentName:"p"},"resolve")," performs a single, top level search of the scope chain. It\ndoes not expect a dotted or bracketed identifier."),(0,i.kt)("h4",{id:"parameters-10"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the template variable to resolve.")))),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("p",null,"The value stored against the given name, or an instance of\nthe ",(0,i.kt)("inlineCode",{parentName:"p"},"Undefined")," class defined on the attached environment."),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L147"},"src/context.ts:147")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"resolvesync"},"resolveSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"resolveSync"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown")),(0,i.kt)("h4",{id:"parameters-11"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"unknown")),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/f159c85/src/context.ts#L153"},"src/context.ts:153")))}u.isMDXComponent=!0}}]);