"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[3724],{9494:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(6687);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=p(n),m=i,g=u["".concat(s,".").concat(m)]||u[m]||c[m]||r;return n?a.createElement(g,l(l({ref:t},d),{},{components:n})):a.createElement(g,l({ref:t},d))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},76:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var a=n(1943),i=(n(6687),n(9494));const r={sidebar_position:1},l="Introduction to Liquid",o={unversionedId:"language/introduction",id:"language/introduction",title:"Introduction to Liquid",description:"Liquid is a template language, where source text (the template) contains placeholders for variables, conditional expressions for including or excluding blocks of text, and loops for repeating blocks of text. Any block can contain more variables, conditions and loops.",source:"@site/docs/language/introduction.md",sourceDirName:"language",slug:"/language/introduction",permalink:"/liquidscript/language/introduction",draft:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/language/introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"languageSidebar",next:{title:"Liquid Filters",permalink:"/liquidscript/language/filters"}},s={},p=[{value:"Output",id:"output",level:2},{value:"Tags",id:"tags",level:2},{value:"Template Literals",id:"template-literals",level:2},{value:"Filters",id:"filters",level:2},{value:"Types",id:"types",level:2},{value:"Literals",id:"literals",level:3},{value:"Arrays and Hashes",id:"arrays-and-hashes",level:3},{value:"Ranges",id:"ranges",level:3},{value:"nil",id:"nil",level:3},{value:"Whitespace Control",id:"whitespace-control",level:2}],d={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"introduction-to-liquid"},"Introduction to Liquid"),(0,i.kt)("p",null,"Liquid is a template language, where source text (the template) contains placeholders for variables, conditional expressions for including or excluding blocks of text, and loops for repeating blocks of text. Any block can contain more variables, conditions and loops."),(0,i.kt)("p",null,"Output text is the result of ",(0,i.kt)("em",{parentName:"p"},"rendering")," a template given some data model. It is that data model that provides the variables and objects referenced in a template's expressions."),(0,i.kt)("p",null,"Liquid is distinct from most other template languages in that it is designed for ",(0,i.kt)("em",{parentName:"p"},"users"),", who may or may not be developers, and are untrusted. As such, when compared to other template engines, Liquid has a deliberately simple and restrictive syntax and feature set."),(0,i.kt)("p",null,"Liquid is most commonly used with HTML, but can be used with any text-based content. Consider this template."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid"},'{% assign greeting = "Hello" %}\n{% for person in people %}\n  {{ greeting }}, {{ person.name | capitalize }}!\n{% endfor %}\n')),(0,i.kt)("h2",{id:"output"},"Output"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"{{ person.name | capitalize }}")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"{{ greeting }}")," are output statements. Expressions inside double curly braces are evaluated and the result is inserted into the output text at that location. These expressions can be simple variables, elements from Liquid arrays or objects with properties."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"capitalize")," is a ",(0,i.kt)("a",{parentName:"p",href:"#filters"},"filter"),", which is applied to the value at ",(0,i.kt)("inlineCode",{parentName:"p"},"person.name")," prior to output."),(0,i.kt)("h2",{id:"tags"},"Tags"),(0,i.kt)("p",null,"Tags allow us to include logic, like loops and conditions, in our Liquid templates. A tag can be an ",(0,i.kt)("em",{parentName:"p"},"inline")," tag or a ",(0,i.kt)("em",{parentName:"p"},"block")," tag, and can add to rendered output text or not."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"{% for person in people %}")," is the start of a block tag. Enclosed by ",(0,i.kt)("inlineCode",{parentName:"p"},"{%")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"%}")," by default. Where ",(0,i.kt)("inlineCode",{parentName:"p"},"for")," is the name of the tag and ",(0,i.kt)("inlineCode",{parentName:"p"},"person in people")," is the tag's expression. The ",(0,i.kt)("inlineCode",{parentName:"p"},"for")," tag behaves like a for-each loop, rendering its block once for each item in an iterable object. Every block tag must have a matching ",(0,i.kt)("em",{parentName:"p"},"end tag"),", which, by convention, follows the pattern ",(0,i.kt)("inlineCode",{parentName:"p"},"{% end<tag name> %}"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},'{% assign greeting = "Hello" %}')," is an inline tag. Inline tags don't have a block or an associated end tag. See the ",(0,i.kt)("a",{parentName:"p",href:"tags"},"tag reference")," for details of all tags built-in to Liquid."),(0,i.kt)("h2",{id:"template-literals"},"Template Literals"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},", ")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"!\\n")," are template literals. That's anything not inside ",(0,i.kt)("inlineCode",{parentName:"p"},"{%")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"%}")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"{{")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"}}"),". With the exception of ",(0,i.kt)("a",{parentName:"p",href:"#whitespace-control"},"whitespace control"),", template literals are output unchanged."),(0,i.kt)("h2",{id:"filters"},"Filters"),(0,i.kt)("p",null,"Variables can be modified prior to output or assignment using ",(0,i.kt)("em",{parentName:"p"},"filters"),". Filters are applied to a variable using the pipe symbol (",(0,i.kt)("inlineCode",{parentName:"p"},"|"),"), followed by the filter's name and, possibly, some filter arguments. Filter arguments appear after a colon (",(0,i.kt)("inlineCode",{parentName:"p"},":"),") and are separated by commas (",(0,i.kt)("inlineCode",{parentName:"p"},","),")."),(0,i.kt)("p",null,"Multiple filters can be chained, effectively piping the output of one filter into the input of another. Here we use the ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/language/filters#sort"},"sort")," and ",(0,i.kt)("a",{parentName:"p",href:"/liquidscript/language/filters#first"},"first")," filters to get the cheapest item in a collection of products."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid"},'{% assign cheapest = collection.products | sort: "price" | first %}\n')),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"filters"},"filter reference")," for details of all filters built-in to Liquid."),(0,i.kt)("h2",{id:"types"},"Types"),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},'Being a Ruby project, the reference implementation of Liquid borrows terms and types found in Ruby. Like "hash". JavaScript equivalents would be a ',(0,i.kt)("inlineCode",{parentName:"p"},"Map")," or object.")),(0,i.kt)("p",null,"Liquid is dynamically typed. New variables are declared, initialized and reassigned with the ",(0,i.kt)("a",{parentName:"p",href:"tags#assign"},"{% assign %}")," and ",(0,i.kt)("a",{parentName:"p",href:"tags#capture"},"{% capture %}")," tags. Assignment expressions can reference existing variables and include literal strings, integers, floats and Booleans."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid"},'{% assign title = collection.products.first.title %}\n{% assign user = session.user %}\n\n{% assign greeting = "Hello, user" %}\n{% if user %}\n    {% assign greeting = "Hello," | append: user.name %}\n{% endif %}\n')),(0,i.kt)("p",null,"Most ",(0,i.kt)("a",{parentName:"p",href:"filters"},"built-in filters")," will coerce string representations of numbers to an integer or float as needed. And filters expecting a string value or argument will usually stringify them automatically. Although this behavior is not always consistent."),(0,i.kt)("h3",{id:"literals"},"Literals"),(0,i.kt)("p",null,"Liquid supports literal strings (",(0,i.kt)("inlineCode",{parentName:"p"},'"hello"')," or ",(0,i.kt)("inlineCode",{parentName:"p"},"'hello'"),"), integers (",(0,i.kt)("inlineCode",{parentName:"p"},"1"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"-35"),"), floats (",(0,i.kt)("inlineCode",{parentName:"p"},"0.42"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"-99"),") and booleans (",(0,i.kt)("inlineCode",{parentName:"p"},"true")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),")."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid"},"{% assign first_name = \"Sally\" %}\n{% assign last_name = 'Smith' %}\n{% assign items_in_basket = 5 %}\n{% assign average_item_price = 3.99 %}\n{% assign discount = -0.47 %}\n{% assign special_offer = false %}\n{% assign more_available = true %}\n")),(0,i.kt)("h3",{id:"arrays-and-hashes"},"Arrays and Hashes"),(0,i.kt)("p",null,"There is no literal syntax for creating arrays or hashes, although these types can be added to a template's render context, and many tags and filters are designed to work with them."),(0,i.kt)("p",null,"One common idiom in Liquid is to create an array of strings using the ",(0,i.kt)("a",{parentName:"p",href:"filters#split"},"split")," filter."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid"},'{% assign my_array = "apple, banana, cabbage" | split: ", " %}\n')),(0,i.kt)("h3",{id:"ranges"},"Ranges"),(0,i.kt)("p",null,"A ",(0,i.kt)("em",{parentName:"p"},"range")," literal is a start and stop integer, separated by two periods (",(0,i.kt)("inlineCode",{parentName:"p"},".."),"), and enclosed in parentheses. The resulting range is inclusive of its stop value. Ranges can be iterated and many of the built-in filters that accept an array will also work with a range."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid"},"{% assign foo = (1..5) %}\n{{ foo | join: ',' }}\n\n{% for i in (3..6) %}\n    {{ i | plus: forloop.index }}\n{% endfor %}\n")),(0,i.kt)("h3",{id:"nil"},"nil"),(0,i.kt)("p",null,"The reserved word ",(0,i.kt)("inlineCode",{parentName:"p"},"nil")," is used to represent the absence of a value. In LiquidScript, ",(0,i.kt)("inlineCode",{parentName:"p"},"nil")," is equal to ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),"."),(0,i.kt)("h2",{id:"whitespace-control"},"Whitespace Control"),(0,i.kt)("p",null,"Optionally include a leading and/or trailing hyphen inside any ",(0,i.kt)("a",{parentName:"p",href:"#output"},"output statement")," or ",(0,i.kt)("a",{parentName:"p",href:"#tags"},"tag"),". When present, Liquid will strip all whitespace from the preceding and/or trailing ",(0,i.kt)("a",{parentName:"p",href:"#template-literals"},"template literal"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid",metastring:'title="without whitespace control"',title:'"without',whitespace:!0,'control"':!0},"{% assign some_variable = false %}\n{% if some_variable != true %}\nLets go!\n{% endif %}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="output"',title:'"output"'},"\n\nLets go!\n\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-liquid",metastring:'title="with whitespace control"',title:'"with',whitespace:!0,'control"':!0},"{% assign some_variable = false %}\n{%- if some_variable != true -%}\nLets go!\n{%- endif -%}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-plain",metastring:'title="output"',title:'"output"'},"Lets go!\n")))}c.isMDXComponent=!0}}]);