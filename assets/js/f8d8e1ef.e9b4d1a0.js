"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[6455],{9494:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return u}});var r=n(6687);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),d=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),c=d(n),u=a,k=c["".concat(p,".").concat(u)]||c[u]||m[u]||i;return n?r.createElement(k,l(l({ref:t},s),{},{components:n})):r.createElement(k,l({ref:t},s))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var d=2;d<i;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8998:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return p},default:function(){return u},frontMatter:function(){return o},metadata:function(){return d},toc:function(){return m}});var r=n(5177),a=n(4416),i=(n(6687),n(9494)),l=["components"],o={id:"BlockNode",title:"Class: BlockNode",sidebar_label:"BlockNode",sidebar_position:0,custom_edit_url:null},p=void 0,d={unversionedId:"api/classes/BlockNode",id:"api/classes/BlockNode",title:"Class: BlockNode",description:"A block of abstract syntax tree nodes.",source:"@site/docs/api/classes/BlockNode.md",sourceDirName:"api/classes",slug:"/api/classes/BlockNode",permalink:"/liquidscript/api/classes/BlockNode",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"BlockNode",title:"Class: BlockNode",sidebar_label:"BlockNode",sidebar_position:0,custom_edit_url:null},sidebar:"API",previous:{title:"Blank",permalink:"/liquidscript/api/classes/Blank"},next:{title:"BooleanExpression",permalink:"/liquidscript/api/classes/BooleanExpression"}},s={},m=[{value:"Implements",id:"implements",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"nodes",id:"nodes",level:3},{value:"token",id:"token",level:3},{value:"Implementation of",id:"implementation-of",level:4},{value:"Methods",id:"methods",level:2},{value:"children",id:"children",level:3},{value:"Returns",id:"returns",level:4},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"render",id:"render",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Implementation of",id:"implementation-of-2",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"renderSync",id:"rendersync",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Implementation of",id:"implementation-of-3",level:4},{value:"Defined in",id:"defined-in-3",level:4}],c={toc:m};function u(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A block of abstract syntax tree nodes."),(0,i.kt)("h2",{id:"implements"},"Implements"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/liquidscript/api/interfaces/Node"},(0,i.kt)("inlineCode",{parentName:"a"},"Node")))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new BlockNode"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"token"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"nodes?"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"token")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token"))),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"nodes")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/interfaces/Node"},(0,i.kt)("inlineCode",{parentName:"a"},"Node")),"[]"),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"[]"))))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/ast.ts#L57"},"src/ast.ts:57")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"nodes"},"nodes"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"nodes"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node"},(0,i.kt)("inlineCode",{parentName:"a"},"Node")),"[] = ",(0,i.kt)("inlineCode",{parentName:"p"},"[]")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"token"},"token"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"token"),": ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token"))),(0,i.kt)("p",null,"The token that started this node. Used to add line and column numbers\nto error messages."),(0,i.kt)("h4",{id:"implementation-of"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node"},"Node"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node#token"},"token")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"children"},"children"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"children"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#childnode"},(0,i.kt)("inlineCode",{parentName:"a"},"ChildNode")),"[]"),(0,i.kt)("p",null,"Return an array of child nodes."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#childnode"},(0,i.kt)("inlineCode",{parentName:"a"},"ChildNode")),"[]"),(0,i.kt)("h4",{id:"implementation-of-1"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node"},"Node"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node#children"},"children")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/ast.ts#L94"},"src/ast.ts:94")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"render"},"render"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"render"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"context"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"out"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("p",null,"Render this node to the given output stream."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"out")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/interfaces/RenderStream"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderStream")))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("h4",{id:"implementation-of-2"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node"},"Node"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node#render"},"render")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/ast.ts#L59"},"src/ast.ts:59")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"rendersync"},"renderSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"renderSync"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"context"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"out"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"A synchronous version of ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/BlockNode#render"},"render"),"."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"context")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/RenderContext"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderContext")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"out")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/interfaces/RenderStream"},(0,i.kt)("inlineCode",{parentName:"a"},"RenderStream")))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"implementation-of-3"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node"},"Node"),".",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Node#rendersync"},"renderSync")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/ast.ts#L80"},"src/ast.ts:80")))}u.isMDXComponent=!0}}]);