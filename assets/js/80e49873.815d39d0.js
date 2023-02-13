"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[6396],{9494:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return k}});var r=n(6687);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),o=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=o(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=o(n),m=i,k=u["".concat(s,".").concat(m)]||u[m]||c[m]||a;return n?r.createElement(k,l(l({ref:t},d),{},{components:n})):r.createElement(k,l({ref:t},d))}));function k(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[u]="string"==typeof e?e:i,l[1]=p;for(var o=2;o<a;o++)l[o]=n[o];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2233:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return l},default:function(){return c},frontMatter:function(){return a},metadata:function(){return p},toc:function(){return o}});var r=n(1943),i=(n(6687),n(9494));const a={id:"expressions.include",title:"Namespace: include",sidebar_label:"include",custom_edit_url:null},l=void 0,p={unversionedId:"api/namespaces/expressions.include",id:"api/namespaces/expressions.include",title:"Namespace: include",description:"expressions.include",source:"@site/docs/api/namespaces/expressions.include.md",sourceDirName:"api/namespaces",slug:"/api/namespaces/expressions.include",permalink:"/liquidscript/api/namespaces/expressions.include",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"expressions.include",title:"Namespace: include",sidebar_label:"include",custom_edit_url:null},sidebar:"API",previous:{title:"filtered",permalink:"/liquidscript/api/namespaces/expressions.filtered"},next:{title:"loop",permalink:"/liquidscript/api/namespaces/expressions.loop"}},s={},o=[{value:"Variables",id:"variables",level:2},{value:"RE",id:"re",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"RULES",id:"rules",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Functions",id:"functions",level:2},{value:"makeTokenizer",id:"maketokenizer",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"tokenize",id:"tokenize",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-3",level:4}],d={toc:o},u="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions"},"expressions"),".include"),(0,i.kt)("h2",{id:"variables"},"Variables"),(0,i.kt)("h3",{id:"re"},"RE"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"RE"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"RegExp")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/expressions/include/lex.ts#L73"},"src/expressions/include/lex.ts:73")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"rules"},"RULES"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"RULES"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[][]"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/expressions/include/lex.ts#L41"},"src/expressions/include/lex.ts:41")),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("h3",{id:"maketokenizer"},"makeTokenizer"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"makeTokenizer"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"re"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"keywords"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions#tokenizer"},(0,i.kt)("inlineCode",{parentName:"a"},"Tokenizer"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"re")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RegExp"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"keywords")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Set"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),">")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions#tokenizer"},(0,i.kt)("inlineCode",{parentName:"a"},"Tokenizer"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/expressions/include/lex.ts#L239"},"src/expressions/include/lex.ts:239")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tokenize"},"tokenize"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"tokenize"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"expression"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"startIndex?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token")),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"expression")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"startIndex?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token")),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/364f972/src/expressions/common.ts#L48"},"src/expressions/common.ts:48")))}c.isMDXComponent=!0}}]);