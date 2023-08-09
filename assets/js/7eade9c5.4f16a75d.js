"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[4936],{9494:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>h});var n=a(6687);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),d=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},s=function(e){var t=d(e.components);return n.createElement(p.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=d(a),u=r,h=m["".concat(p,".").concat(u)]||m[u]||c[u]||l;return a?n.createElement(h,i(i({ref:t},s),{},{components:a})):n.createElement(h,i({ref:t},s))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[m]="string"==typeof e?e:r,i[1]=o;for(var d=2;d<l;d++)i[d]=a[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},4400:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var n=a(1943),r=(a(6687),a(9494));const l={},i="Loading Templates",o={unversionedId:"introduction/loading-templates",id:"introduction/loading-templates",title:"Loading Templates",description:"You can load templates from a file system or database, for example, by creating an Environment and configuring a template loader. You'd also need a loader if you want to use the built-in include or render tags.",source:"@site/docs/introduction/loading-templates.md",sourceDirName:"introduction",slug:"/introduction/loading-templates",permalink:"/liquidscript/introduction/loading-templates",draft:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/introduction/loading-templates.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Getting Started",permalink:"/liquidscript/introduction/getting-started"},next:{title:"Render Context",permalink:"/liquidscript/introduction/render-context"}},p={},d=[{value:"Built-In Template Loaders",id:"built-in-template-loaders",level:2},{value:"Generic",id:"generic",level:3},{value:"Node.js",id:"nodejs",level:3},{value:"Browser",id:"browser",level:3}],s={toc:d},m="wrapper";function c(e){let{components:t,...a}=e;return(0,r.kt)(m,(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"loading-templates"},"Loading Templates"),(0,r.kt)("p",null,"You can load templates from a file system or database, for example, by creating an ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},"Environment")," and configuring a template ",(0,r.kt)("em",{parentName:"p"},"loader"),". You'd also need a loader if you want to use the built-in ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/language/tags#include"},"include")," or ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/language/tags#render"},"render")," tags."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment#gettemplate"},(0,r.kt)("inlineCode",{parentName:"a"},"Environment.getTemplate()"))," and ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment#gettemplatesync"},(0,r.kt)("inlineCode",{parentName:"a"},"Environment.getTemplateSync()"))," accept a template name and return a ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,r.kt)("inlineCode",{parentName:"a"},"Template"))," that is bound to the environment, ready to be rendered. The configured loader is responsible for interpreting template names. In the case of a ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/NodeFileSystemLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"NodeFileSystemLoader")),", the name would be a file name, relative to the loader's search path."),(0,r.kt)("p",null,"This example assumes a folder called ",(0,r.kt)("inlineCode",{parentName:"p"},"templates")," exists in the current working directory, and that template files ",(0,r.kt)("inlineCode",{parentName:"p"},"index.html")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"some-list.html")," exist within it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="templates/index.html"',title:'"templates/index.html"'},"<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <title>{{ page_title }}</title>\n  </head>\n  <body>\n    <h1>{{ heading }}</h1>\n    {% render 'some-list.html' with people %}\n  </body>\n</html>\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="templates/some-list.html"',title:'"templates/some-list.html"'},"<ul>\n  {% for person in people %}\n  <li>{{ person.name }}</li>\n  {% endfor %}\n</ul>\n")),(0,r.kt)("p",null,"By default, every ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},"Environment")," is created with an empty ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/MapLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"MapLoader")),". Specify an alternative template loader using the ",(0,r.kt)("inlineCode",{parentName:"p"},"loader")," option."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'import { Environment, NodeFileSystemLoader } from "liquidscript";\n\nconst env = new Environment({\n  loader: new NodeFileSystemLoader("./templates/", {\n    fileExtension: ".liquid",\n  }),\n});\n\nconst template = env.getTemplateSync("index.html");\nconst result = template.renderSync({\n  heading: "Some List",\n  page_title: "Awesome Title",\n  people: [{ name: "John" }, { name: "Sally" }],\n});\n\nconsole.log(result);\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="Output"',title:'"Output"'},'<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>Awesome Title</title>\n  </head>\n  <body>\n    <h1>Some List</h1>\n    <ul>\n      <li>John</li>\n      <li>Sally</li>\n    </ul>\n  </body>\n</html>\n')),(0,r.kt)("h2",{id:"built-in-template-loaders"},"Built-In Template Loaders"),(0,r.kt)("p",null,"LiquidScript includes some generic templates loaders, and some that are specific to Node.js or the web browser."),(0,r.kt)("h3",{id:"generic"},"Generic"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Loader"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/MapLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"MapLoader"))),(0,r.kt)("td",{parentName:"tr",align:null},"A template loader that uses a Map of string names to template source code strings.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/ObjectLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"ObjectLoader"))),(0,r.kt)("td",{parentName:"tr",align:null},"A template loader that uses a plain object to map string names to template source code string.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/ChoiceLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"ChoiceLoader"))),(0,r.kt)("td",{parentName:"tr",align:null},"A template loader that will try each of an array of loaders until a matching template is found.")))),(0,r.kt)("h3",{id:"nodejs"},"Node.js"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Loader"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/NodeFileSystemLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"NodeFileSystemLoader"))),(0,r.kt)("td",{parentName:"tr",align:null},"A template loader that reads templates from a file system using Node's ",(0,r.kt)("inlineCode",{parentName:"td"},"fs")," module.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/CachingNodeFileSystemLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"CachingNodeFileSystemLoader"))),(0,r.kt)("td",{parentName:"tr",align:null},"A template loader that caches templates read from a file system.")))),(0,r.kt)("h3",{id:"browser"},"Browser"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Loader"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/FetchLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"FetchLoader"))),(0,r.kt)("td",{parentName:"tr",align:null},"A template loader that fetches templates using the ",(0,r.kt)("a",{parentName:"td",href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"},"Fetch API"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/classes/XMLHttpRequestLoader"},(0,r.kt)("inlineCode",{parentName:"a"},"XMLHttpRequestLoader"))),(0,r.kt)("td",{parentName:"tr",align:null},"A template loader that uses ",(0,r.kt)("a",{parentName:"td",href:"https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest"},"XMLHttpRequest")," to fetch templates.")))))}c.isMDXComponent=!0}}]);