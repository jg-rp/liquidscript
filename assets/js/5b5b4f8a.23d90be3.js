"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[1736],{9494:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return u}});var r=n(6687);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),s=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),k=s(n),u=a,c=k["".concat(o,".").concat(u)]||k[u]||m[u]||i;return n?r.createElement(c,p(p({ref:t},d),{},{components:n})):r.createElement(c,p({ref:t},d))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,p=new Array(i);p[0]=k;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,p[1]=l;for(var s=2;s<i;s++)p[s]=n[s];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},7237:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return o},default:function(){return u},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return m}});var r=n(5177),a=n(4416),i=(n(6687),n(9494)),p=["components"],l={id:"expressions.loop",title:"Namespace: loop",sidebar_label:"loop",custom_edit_url:null},o=void 0,s={unversionedId:"api/namespaces/expressions.loop",id:"api/namespaces/expressions.loop",title:"Namespace: loop",description:"expressions.loop",source:"@site/docs/api/namespaces/expressions.loop.md",sourceDirName:"api/namespaces",slug:"/api/namespaces/expressions.loop",permalink:"/liquidscript/api/namespaces/expressions.loop",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"expressions.loop",title:"Namespace: loop",sidebar_label:"loop",custom_edit_url:null},sidebar:"API",previous:{title:"include",permalink:"/liquidscript/api/namespaces/expressions.include"},next:{title:"tags",permalink:"/liquidscript/api/namespaces/extra.tags"}},d={},m=[{value:"Variables",id:"variables",level:2},{value:"TOKEN_MAP",id:"token_map",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"Functions",id:"functions",level:2},{value:"makeTokenizer",id:"maketokenizer",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"parse",id:"parse",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"tokenize",id:"tokenize",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-3",level:4}],k={toc:m};function u(e){var t=e.components,n=(0,a.Z)(e,p);return(0,i.kt)("wrapper",(0,r.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions"},"expressions"),".loop"),(0,i.kt)("h2",{id:"variables"},"Variables"),(0,i.kt)("h3",{id:"token_map"},"TOKEN","_","MAP"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"TOKEN","_","MAP"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Map"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"parseFunc"),">"),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/expressions/loop/parse.ts#L48"},"src/expressions/loop/parse.ts:48")),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("h3",{id:"maketokenizer"},"makeTokenizer"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"makeTokenizer"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"re"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"keywords"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions#tokenizer"},(0,i.kt)("inlineCode",{parentName:"a"},"Tokenizer"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"re")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RegExp"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"keywords")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Set"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),">")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions#tokenizer"},(0,i.kt)("inlineCode",{parentName:"a"},"Tokenizer"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/expressions/loop/lex.ts#L216"},"src/expressions/loop/lex.ts:216")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"parse"},"parse"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"parse"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"expr"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"lineNumber?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/LoopExpression"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopExpression"))),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"expr")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"lineNumber")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"0"))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/LoopExpression"},(0,i.kt)("inlineCode",{parentName:"a"},"LoopExpression"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/expressions/loop/parse.ts#L90"},"src/expressions/loop/parse.ts:90")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tokenize"},"tokenize"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"tokenize"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"expression"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"startIndex?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token")),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"expression")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"startIndex?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token")),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/3543a9e/src/expressions/loop/lex.ts#L337"},"src/expressions/loop/lex.ts:337")))}u.isMDXComponent=!0}}]);