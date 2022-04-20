"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[8388],{9494:function(e,t,n){n.d(t,{Zo:function(){return o},kt:function(){return u}});var r=n(6687);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},o=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),m=d(n),u=a,c=m["".concat(s,".").concat(u)]||m[u]||k[u]||i;return n?r.createElement(c,l(l({ref:t},o),{},{components:n})):r.createElement(c,l({ref:t},o))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,l[1]=p;for(var d=2;d<i;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9282:function(e,t,n){n.r(t),n.d(t,{assets:function(){return o},contentTitle:function(){return s},default:function(){return u},frontMatter:function(){return p},metadata:function(){return d},toc:function(){return k}});var r=n(9149),a=n(8332),i=(n(6687),n(9494)),l=["components"],p={id:"expressions.filtered",title:"Namespace: filtered",sidebar_label:"filtered",custom_edit_url:null},s=void 0,d={unversionedId:"api/namespaces/expressions.filtered",id:"api/namespaces/expressions.filtered",title:"Namespace: filtered",description:"expressions.filtered",source:"@site/docs/api/namespaces/expressions.filtered.md",sourceDirName:"api/namespaces",slug:"/api/namespaces/expressions.filtered",permalink:"/liquidscript/api/namespaces/expressions.filtered",editUrl:null,tags:[],version:"current",frontMatter:{id:"expressions.filtered",title:"Namespace: filtered",sidebar_label:"filtered",custom_edit_url:null},sidebar:"API",previous:{title:"boolean_not",permalink:"/liquidscript/api/namespaces/expressions.boolean_not"},next:{title:"include",permalink:"/liquidscript/api/namespaces/expressions.include"}},o={},k=[{value:"Variables",id:"variables",level:2},{value:"RE",id:"re",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"RULES",id:"rules",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"TOKEN_MAP",id:"token_map",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"Functions",id:"functions",level:2},{value:"makeTokenizer",id:"maketokenizer",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"parse",id:"parse",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"parseObject",id:"parseobject",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"tokenize",id:"tokenize",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-6",level:4}],m={toc:k};function u(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions"},"expressions"),".filtered"),(0,i.kt)("h2",{id:"variables"},"Variables"),(0,i.kt)("h3",{id:"re"},"RE"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"RE"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"RegExp")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/9157808/src/expressions/filtered/lex.ts#L69"},"src/expressions/filtered/lex.ts:69")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"rules"},"RULES"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"RULES"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[][]"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/9157808/src/expressions/filtered/lex.ts#L39"},"src/expressions/filtered/lex.ts:39")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"token_map"},"TOKEN","_","MAP"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"TOKEN","_","MAP"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Map"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"parseFunc"),">"),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/9157808/src/expressions/filtered/parse.ts#L41"},"src/expressions/filtered/parse.ts:41")),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("h3",{id:"maketokenizer"},"makeTokenizer"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"makeTokenizer"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"re"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"keywords"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions#tokenizer"},(0,i.kt)("inlineCode",{parentName:"a"},"Tokenizer"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"re")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"RegExp"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"keywords")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Set"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"string"),">")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/namespaces/expressions#tokenizer"},(0,i.kt)("inlineCode",{parentName:"a"},"Tokenizer"))),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/9157808/src/expressions/filtered/lex.ts#L244"},"src/expressions/filtered/lex.ts:244")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"parse"},"parse"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"parse"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"expr"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"lineNumber?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/FilteredExpression"},(0,i.kt)("inlineCode",{parentName:"a"},"FilteredExpression"))),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Default value"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"expr")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"lineNumber")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"1"))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/FilteredExpression"},(0,i.kt)("inlineCode",{parentName:"a"},"FilteredExpression"))),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/9157808/src/expressions/filtered/parse.ts#L138"},"src/expressions/filtered/parse.ts:138")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"parseobject"},"parseObject"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"parseObject"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"stream"),"): ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression"))),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"stream")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/expressions.ExpressionTokenStream"},(0,i.kt)("inlineCode",{parentName:"a"},"ExpressionTokenStream")))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/interfaces/Expression"},(0,i.kt)("inlineCode",{parentName:"a"},"Expression"))),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/9157808/src/expressions/filtered/parse.ts#L54"},"src/expressions/filtered/parse.ts:54")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tokenize"},"tokenize"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"tokenize"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"expression"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"startIndex?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token")),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"expression")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"startIndex?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Generator"),"<",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/tokens.Token"},(0,i.kt)("inlineCode",{parentName:"a"},"Token")),", ",(0,i.kt)("inlineCode",{parentName:"p"},"any"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown"),">"),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/jg-rp/liquidscript/blob/9157808/src/expressions/filtered/lex.ts#L379"},"src/expressions/filtered/lex.ts:379")))}u.isMDXComponent=!0}}]);