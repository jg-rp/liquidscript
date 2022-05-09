"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[6626],{9494:function(e,t,a){a.d(t,{Zo:function(){return s},kt:function(){return m}});var r=a(6687);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),d=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=d(a),m=n,k=u["".concat(p,".").concat(m)]||u[m]||c[m]||i;return a?r.createElement(k,l(l({ref:t},s),{},{components:a})):r.createElement(k,l({ref:t},s))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,l=new Array(i);l[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var d=2;d<i;d++)l[d]=a[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},2431:function(e,t,a){a.r(t),a.d(t,{assets:function(){return s},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return o},metadata:function(){return d},toc:function(){return c}});var r=a(5177),n=a(4416),i=(a(6687),a(9494)),l=["components"],o={id:"ChoiceLoader",title:"Class: ChoiceLoader",sidebar_label:"ChoiceLoader",sidebar_position:0,custom_edit_url:null},p=void 0,d={unversionedId:"api/classes/ChoiceLoader",id:"api/classes/ChoiceLoader",title:"Class: ChoiceLoader",description:"A template loader that will try each of an array of loaders until",source:"@site/docs/api/classes/ChoiceLoader.md",sourceDirName:"api/classes",slug:"/api/classes/ChoiceLoader",permalink:"/liquidscript/api/classes/ChoiceLoader",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"ChoiceLoader",title:"Class: ChoiceLoader",sidebar_label:"ChoiceLoader",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"CachingNodeFileSystemLoader",permalink:"/liquidscript/api/classes/CachingNodeFileSystemLoader"},next:{title:"ContextDepthError",permalink:"/liquidscript/api/classes/ContextDepthError"}},s={},c=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"loaders",id:"loaders",level:3},{value:"Methods",id:"methods",level:2},{value:"getSource",id:"getsource",level:3},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"getSourceSync",id:"getsourcesync",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Overrides",id:"overrides-2",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"load",id:"load",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Overrides",id:"overrides-3",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"loadSync",id:"loadsync",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Overrides",id:"overrides-4",level:4},{value:"Defined in",id:"defined-in-4",level:4}],u={toc:c};function m(e){var t=e.components,a=(0,n.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A template loader that will try each of an array of loaders until\na template is found, or throw a ",(0,i.kt)("inlineCode",{parentName:"p"},"TemplateNotFoundError")," if none of\nthe loaders could find the template."),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},(0,i.kt)("inlineCode",{parentName:"a"},"Loader"))),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"ChoiceLoader"))))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new ChoiceLoader"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"loaders"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"loaders")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Loader"},(0,i.kt)("inlineCode",{parentName:"a"},"Loader")),"[]")))),(0,i.kt)("h4",{id:"overrides"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#constructor"},"constructor")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/builtin/loaders/choice_loader.ts#L18"},"src/builtin/loaders/choice_loader.ts:18")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"loaders"},"loaders"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"loaders"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},(0,i.kt)("inlineCode",{parentName:"a"},"Loader")),"[]"),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"getsource"},"getSource"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getSource"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,i.kt)("inlineCode",{parentName:"a"},"TemplateSource")),">"),(0,i.kt)("p",null,"Override ",(0,i.kt)("inlineCode",{parentName:"p"},"getSource")," to implement a custom loader."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,i.kt)("inlineCode",{parentName:"a"},"TemplateSource")),">"),(0,i.kt)("p",null,"The source, with any meta data, for the template identified by\nthe given name"),(0,i.kt)("h4",{id:"overrides-1"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#getsource"},"getSource")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/builtin/loaders/choice_loader.ts#L22"},"src/builtin/loaders/choice_loader.ts:22")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getsourcesync"},"getSourceSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getSourceSync"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,i.kt)("inlineCode",{parentName:"a"},"TemplateSource"))),(0,i.kt)("p",null,"A synchronous version of ",(0,i.kt)("inlineCode",{parentName:"p"},"getSource"),"."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/TemplateSource"},(0,i.kt)("inlineCode",{parentName:"a"},"TemplateSource"))),(0,i.kt)("h4",{id:"overrides-2"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#getsourcesync"},"getSourceSync")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/builtin/loaders/choice_loader.ts#L27"},"src/builtin/loaders/choice_loader.ts:27")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"load"},"load"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"load"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"environment"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"context?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"globals?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"loaderContext?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template")),">"),(0,i.kt)("p",null,"Used internally by ",(0,i.kt)("inlineCode",{parentName:"p"},"Environment.getTemplate()"),". Delegates to ",(0,i.kt)("inlineCode",{parentName:"p"},"getSource"),"."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"environment")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Environment"},(0,i.kt)("inlineCode",{parentName:"a"},"Environment")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"globals?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextScope")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"loaderContext?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Object"))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template")),">"),(0,i.kt)("h4",{id:"overrides-3"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#load"},"load")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/builtin/loaders/choice_loader.ts#L33"},"src/builtin/loaders/choice_loader.ts:33")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"loadsync"},"loadSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"loadSync"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"name"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"environment"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"context?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"globals?"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"loaderContext?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template"))),(0,i.kt)("p",null,"A synchronous version of ",(0,i.kt)("inlineCode",{parentName:"p"},"load"),"."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"name")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"environment")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/Environment"},(0,i.kt)("inlineCode",{parentName:"a"},"Environment")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"globals?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#contextscope"},(0,i.kt)("inlineCode",{parentName:"a"},"ContextScope")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"loaderContext?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Object"))))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,i.kt)("inlineCode",{parentName:"a"},"Template"))),(0,i.kt)("h4",{id:"overrides-4"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader"},"Loader"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Loader#loadsync"},"loadSync")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/builtin/loaders/choice_loader.ts#L58"},"src/builtin/loaders/choice_loader.ts:58")))}m.isMDXComponent=!0}}]);