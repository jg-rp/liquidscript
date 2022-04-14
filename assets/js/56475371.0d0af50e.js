"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[2838],{9494:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var i=n(6687);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),d=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=d(n),m=a,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||r;return n?i.createElement(h,o(o({ref:t},p),{},{components:n})):i.createElement(h,o({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var d=2;d<r;d++)o[d]=n[d];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},7528:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return u}});var i=n(9149),a=n(8332),r=(n(6687),n(9494)),o=["components"],l={},s="Objects and Drops",d={unversionedId:"introduction/objects-and-drops",id:"introduction/objects-and-drops",title:"Objects and Drops",description:"When passed as globals to the fromString() and getTemplate() methods of Template and Environment, an object's properties will be available to template authors as global variables. LiquidScript will not call methods on render context objects unless explicitly whitelisted, instead treating them as undefined variables.",source:"@site/docs/introduction/objects-and-drops.md",sourceDirName:"introduction",slug:"/introduction/objects-and-drops",permalink:"/liquidscript/introduction/objects-and-drops",editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/introduction/objects-and-drops.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Render Context",permalink:"/liquidscript/introduction/render-context"},next:{title:"Undefined",permalink:"/liquidscript/introduction/undefined"}},p={},u=[{value:"Drop Protocol",id:"drop-protocol",level:2},{value:"toLiquid",id:"toliquid",level:3},{value:"liquidDispatch",id:"liquiddispatch",level:3},{value:"isLiquidCallable",id:"isliquidcallable",level:3}],c={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"objects-and-drops"},"Objects and Drops"),(0,r.kt)("p",null,"When passed as ",(0,r.kt)("inlineCode",{parentName:"p"},"globals")," to the ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template#fromstring"},(0,r.kt)("inlineCode",{parentName:"a"},"fromString()"))," and ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment#gettemplate"},(0,r.kt)("inlineCode",{parentName:"a"},"getTemplate()"))," methods of ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Template"},(0,r.kt)("inlineCode",{parentName:"a"},"Template"))," and ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/classes/Environment"},(0,r.kt)("inlineCode",{parentName:"a"},"Environment")),", an object's properties will be available to template authors as ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/introduction/render-context"},"global variables"),". LiquidScript will ",(0,r.kt)("strong",{parentName:"p"},"not")," call methods on render context objects unless explicitly whitelisted, instead treating them as ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/introduction/undefined"},"undefined")," variables."),(0,r.kt)("p",null,"Consider this example where we pass an array of product objects to ",(0,r.kt)("inlineCode",{parentName:"p"},"renderSync()"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'import { Template } from "liquidscript";\n\nclass Product {\n  constructor(title, colors) {\n    this.title = title;\n    this.colors = colors;\n  }\n\n  save() {\n    console.log(`saved ${this.title}`);\n  }\n}\n\nconst data = {\n  products: [\n    new Product("A Shoe", ["blue", "red"]),\n    new Product("A Hat", ["grey", "brown"]),\n  ],\n};\n\nconst source = `\n{% for product in products %}\n  {{ product.title }} is available in {{ product.colors | join: \' and \' }}.\n  {{ product.save }}\n{% endfor %}\n{{ someFunction }}\n`;\n\nconsole.log(Template.fromString(source).renderSync(data));\n')),(0,r.kt)("p",null,"Notice that ",(0,r.kt)("inlineCode",{parentName:"p"},"{{ product.save }}")," has produced no output and, if we were using an environment configured with ",(0,r.kt)("inlineCode",{parentName:"p"},"StrictUndefined"),", we would get a ",(0,r.kt)("inlineCode",{parentName:"p"},"LiquidUndefinedError")," with a message like ",(0,r.kt)("inlineCode",{parentName:"p"},"LiquidUndefinedError: 'save' is undefined (<string>:4)"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="output"',title:'"output"'},"A Shoe is available in blue and red.\n\nA Hat is available in grey and brown.\n\n")),(0,r.kt)("h2",{id:"drop-protocol"},"Drop Protocol"),(0,r.kt)("p",null,'In LiquidScript, a "drop" is an object that implements some or all of the "drop protocol". When included in a Liquid render context, a drop can, for example, behave like a Liquid primitive, dynamically produce properties via a dispatching method or expose its methods as if they were simple properties.'),(0,r.kt)("p",null,"The drop protocol is nothing more than a set of conventions using well defined ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol"},"Symbols"),". Those symbols are:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#toliquid"},(0,r.kt)("inlineCode",{parentName:"a"},"[toLiquid]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A function valued property that is called to convert an object to its corresponding Liquid value. ",(0,r.kt)("inlineCode",{parentName:"td"},"[toLiquid]")," is passed the active render context as its only argument.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#toliquidsync"},(0,r.kt)("inlineCode",{parentName:"a"},"[toLiquidSync]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A synchronous version of ",(0,r.kt)("inlineCode",{parentName:"td"},"[toLiquid]"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#toliquidprimitive"},(0,r.kt)("inlineCode",{parentName:"a"},"[toLiquidPrimitive]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A function valued property that is called to convert an object to its corresponding Liquid primitive value. The return value of this function will be used in Liquid comparison expressions.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#toliquidstring"},(0,r.kt)("inlineCode",{parentName:"a"},"[toLiquidString]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A function valued property that is called to convert an object to its Liquid specific string representation. This function will take priority over ",(0,r.kt)("inlineCode",{parentName:"td"},"toString()")," when an object is output or passed to a string filter.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#toliquidhtml"},(0,r.kt)("inlineCode",{parentName:"a"},"[toLiquidHtml]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A function valued property that is called to convert an object to an HTML-safe string representation. When HTML auto-escaping is enabled, the return value of this function will take priority over ",(0,r.kt)("inlineCode",{parentName:"td"},"[toLiquidString]")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"toString()"),", and it will not be escaped.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#isliquidcallable"},(0,r.kt)("inlineCode",{parentName:"a"},"[isLiquidCallable]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A function valued property that is called to test a method name against a set of whitelisted methods that Liquid can call. A method name is passed as the only argument, and a boolean return value is expected. Liquid callable methods are not passed any arguments.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"#liquiddispatch"},(0,r.kt)("inlineCode",{parentName:"a"},"[liquidDispatch]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A function valued property that is called in the event that a property is missing from an object. The name of the missing property is passed as the only argument. This function is expected to return a Promise and should throw an ",(0,r.kt)("inlineCode",{parentName:"td"},"InternalKeyError")," if the named property is unavailable.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"/liquidscript/api/modules#liquiddispatchsync"},(0,r.kt)("inlineCode",{parentName:"a"},"[liquidDispatchSync]"))),(0,r.kt)("td",{parentName:"tr",align:null},"A synchronous version of ",(0,r.kt)("inlineCode",{parentName:"td"},"[liquidDispatch]"),".")))),(0,r.kt)("h3",{id:"toliquid"},"toLiquid"),(0,r.kt)("p",null,"This example demonstrates how one might use ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#toliquid"},(0,r.kt)("inlineCode",{parentName:"a"},"toLiquid"))," to implement a lazy loading user object."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Liquidable, toLiquid } from "liquidscript";\n\ntype User = { firstName: string; lastName: string };\n\nclass LazyUserDrop implements Liquidable {\n  private obj?: User;\n  constructor(private userId: string) {}\n\n  async queryDatabase(): Promise<User> {\n    // Do database IO here.\n    return { firstName: "John", lastName: "Smith" };\n  }\n\n  async [toLiquid](): Promise<User> {\n    if (this.obj === undefined) this.obj = await this.queryDatabase();\n    return this.obj;\n  }\n}\n')),(0,r.kt)("h3",{id:"liquiddispatch"},"liquidDispatch"),(0,r.kt)("p",null,"Here we define a class implementing a ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#liquiddispatchsync"},(0,r.kt)("inlineCode",{parentName:"a"},"liquidDispatchSync"))," method, which will catch all attempts to access undefined properties on instances of that class."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import {\n  LiquidDispatchableSync,\n  liquidDispatchSync,\n  InternalKeyError,\n} from "liquidscript";\n\nclass User implements LiquidDispatchableSync {\n  #data: Map<string, string | number>;\n  constructor(data: Map<string, string | number>) {\n    this.#data = data;\n  }\n\n  [liquidDispatchSync](name: string): string | number {\n    if (this.#data.has(name)) return this.#data.get(name);\n    throw new InternalKeyError(`User.${name}`);\n  }\n}\n')),(0,r.kt)("p",null,"When in an async context, if ",(0,r.kt)("inlineCode",{parentName:"p"},"liquidDispatch")," is not defined, LiquidScript will fall back to ",(0,r.kt)("inlineCode",{parentName:"p"},"liquidDispatchSync")," if it is available."),(0,r.kt)("h3",{id:"isliquidcallable"},"isLiquidCallable"),(0,r.kt)("p",null,"We can tell LiquidScript to call an object's methods by implementing an ",(0,r.kt)("a",{parentName:"p",href:"/liquidscript/api/modules#isliquidcallable"},(0,r.kt)("inlineCode",{parentName:"a"},"isLiquidCallable"))," method. If this method returns ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),", LiquidScript can call the named method without any arguments."),(0,r.kt)("p",null,"This example user class would allow LiquidScript to call ",(0,r.kt)("inlineCode",{parentName:"p"},"fullName()"),", but not ",(0,r.kt)("inlineCode",{parentName:"p"},"save()"),". Note that a ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get"},"getter")," method/property would work equally as well."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Template, LiquidCallable, isLiquidCallable } from "liquidscript";\n\nclass User implements LiquidCallable {\n  constructor(public firstName: string, public lastName: string) {}\n\n  fullName(): string {\n    return `${this.firstName} ${this.lastName}`;\n  }\n\n  save() {\n    console.log(`saved user ${this.fullName()}`);\n  }\n\n  [isLiquidCallable](name: string): boolean {\n    return name === "fullName";\n  }\n}\n')))}m.isMDXComponent=!0}}]);