"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[6515],{63828:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var i=t(74848),r=t(28453);const o={},s="Resource Limits",c={id:"guides/resource-limits",title:"Resource Limits",description:"_New in version 1.4.0_",source:"@site/docs/guides/resource-limits.md",sourceDirName:"guides",slug:"/guides/resource-limits",permalink:"/liquidscript/guides/resource-limits",draft:!1,unlisted:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/guides/resource-limits.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Template Static Analysis",permalink:"/liquidscript/guides/static-analysis"}},a={},l=[{value:"Context Depth Limit",id:"context-depth-limit",level:2},{value:"Local Namespace Limit",id:"local-namespace-limit",level:2},{value:"Loop Iteration Limit",id:"loop-iteration-limit",level:2},{value:"Output Stream Limit",id:"output-stream-limit",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"resource-limits",children:"Resource Limits"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.em,{children:"New in version 1.4.0"})})}),"\n",(0,i.jsx)(n.p,{children:"For deployments where template authors are untrusted, you can set limits on some resources to avoid malicious templates from consuming too much memory or too many CPU cycles."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { Environment } from "liquidscript";\n\nconst env = new Environment({\n  maxContextDepth: 30,\n  localNamespaceLimit: 3000,\n  loopIterationLimit: 1000,\n  outputStreamLimit: 15000,\n});\n\nconst template = env.fromString(`\n{% for x in (1..1000000) %}\n{% for y in (1..1000000) %}\n  {{ x }},{{ y }}\n{% endfor %}\n{% endfor %}\n`);\n\ntemplate.renderSync();\n// LoopIterationLimitError: loop iteration limit reached (<string>:2)\n'})}),"\n",(0,i.jsx)(n.h2,{id:"context-depth-limit",children:"Context Depth Limit"}),"\n",(0,i.jsxs)(n.p,{children:["The maximum number of times a render context can be copied or extended before a ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/ContextDepthError",children:(0,i.jsx)(n.code,{children:"ContextDepthError"})})," is thrown. This helps us guard against recursive use of the ",(0,i.jsx)(n.code,{children:"include"})," or ",(0,i.jsx)(n.code,{children:"render"})," tags."]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/Environment#maxcontextdepth",children:(0,i.jsx)(n.code,{children:"maxContextDepth"})})," option defaults to ",(0,i.jsx)(n.code,{children:"30"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { Environment, ObjectLoader } from "liquidscript";\n\nconst templates = {\n  foo: "{% render \'bar\' %}",\n  bar: "{% render \'foo\' %}",\n};\n\nconst env = new Environment({\n  loader: new ObjectLoader(templates),\n  maxContextDepth: 30,\n});\n\nconst template = env.fromString("{% render \'foo\' %}");\ntemplate.renderSync();\n// ContextDepthError: maximum context depth reached, possible recursive render (bar:1)\n'})}),"\n",(0,i.jsx)(n.h2,{id:"local-namespace-limit",children:"Local Namespace Limit"}),"\n",(0,i.jsxs)(n.p,{children:['The maximum "size" of a render context local namespace. Rather than the number of bytes in memory a local namespace occupies, "size" is a non-specific indication of how much a template uses the local namespace when it is rendered, typically using the ',(0,i.jsx)(n.code,{children:"assign"})," and ",(0,i.jsx)(n.code,{children:"capture"})," tags."]}),"\n",(0,i.jsxs)(n.p,{children:["If the ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/Environment#localnamespacelimit",children:(0,i.jsx)(n.code,{children:"localNamespaceLimit"})})," option is ",(0,i.jsx)(n.code,{children:"undefined"})," or less than ",(0,i.jsx)(n.code,{children:"0"}),", there is no limit. Otherwise a ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/LocalNamespaceLimitError",children:(0,i.jsx)(n.code,{children:"LocalNamespaceLimitError"})})," is thrown when the namespace's size exceeds the limit."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { Environment } from "liquidscript";\n\nconst env = new Environment({\n  localNamespaceLimit: 50, // Very low, for demonstration purposes.\n});\n\nconst template = env.fromString(\n  \'{% assign x = "Nunc est nulla, pellentesque ac dui id erat curae." %}\'\n);\n\ntemplate.renderSync();\n// LocalNamespaceLimitError: local namespace limit reached (<string>:1)\n'})}),"\n",(0,i.jsx)(n.h2,{id:"loop-iteration-limit",children:"Loop Iteration Limit"}),"\n",(0,i.jsxs)(n.p,{children:["The maximum number of loop iteration allowed before a ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/LoopIterationLimitError",children:(0,i.jsx)(n.code,{children:"LoopIterationLimitError"})})," is thrown."]}),"\n",(0,i.jsxs)(n.p,{children:["If the ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/Environment#loopiterationlimit",children:(0,i.jsx)(n.code,{children:"loopIterationLimit"})})," option is ",(0,i.jsx)(n.code,{children:"undefined"})," or less than ",(0,i.jsx)(n.code,{children:"0"}),", there is no soft limit."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { Environment } from "liquidscript";\n\nconst env = new Environment({\n  loopIterationLimit: 999,\n});\n\nconst template = env.fromString(`\n{% for x in (1..100) %}\n{% for y in (1..100) %}\n  {{ x }},{{ y }}\n{% endfor %}\n{% endfor %}\n`);\n\ntemplate.renderSync();\n// LoopIterationLimitError: loop iteration limit reached (<string>:2)\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Other built in tags that contribute to the loop iteration counter are ",(0,i.jsx)(n.code,{children:"render"}),", ",(0,i.jsx)(n.code,{children:"include"})," (when using their ",(0,i.jsx)(n.code,{children:"{% render 'thing' for some.thing %}"})," syntax) and ",(0,i.jsx)(n.code,{children:"tablerow"}),". If a partial template is rendered within a ",(0,i.jsx)(n.code,{children:"for"})," loop, the loop counter is carried over to the render context of the partial template."]}),"\n",(0,i.jsx)(n.h2,{id:"output-stream-limit",children:"Output Stream Limit"}),"\n",(0,i.jsxs)(n.p,{children:["The maximum number of bytes that can be written to a template's output stream, per render, before an ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/OutputStreamLimitError",children:(0,i.jsx)(n.code,{children:"OutputStreamLimitError"})})," is thrown."]}),"\n",(0,i.jsxs)(n.p,{children:["If the ",(0,i.jsx)(n.a,{href:"/liquidscript/api/classes/Environment#outputstreamlimit",children:(0,i.jsx)(n.code,{children:"outputStreamLimit"})})," option is ",(0,i.jsx)(n.code,{children:"undefined"})," or less than ",(0,i.jsx)(n.code,{children:"0"}),", there is no soft limit."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'import { Environment } from "liquidscript";\n\nconst env = new Environment({\n  outputStreamLimit: 20, // Very low, for demonstration purposes.\n});\n\nconst template = env.fromString(`\n{% if false %}\nthis is never rendered, so will not contribute the the output byte counter\n{% endif %}\nHello, {{ you }}! \n`);\n\ntemplate.renderSync({ you: "World" });\n// "\\nHello, World!\\n"\n\ntemplate.renderSync({ you: "something longer that exceeds our limit" });\n// OutputStreamLimitError: output stream limit reached (<string>:5)\n'})})]})}function m(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>c});var i=t(96540);const r={},o=i.createContext(r);function s(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);