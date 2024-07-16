"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[4500],{46679:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>a,frontMatter:()=>d,metadata:()=>c,toc:()=>o});var r=i(74848),s=i(28453);const d={},t="Interface: Node",c={id:"api/interfaces/Node",title:"Interface: Node",description:"Properties",source:"@site/docs/api/interfaces/Node.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Node",permalink:"/liquidscript/api/interfaces/Node",draft:!1,unlisted:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/api/interfaces/Node.md",tags:[],version:"current",frontMatter:{},sidebar:"API",previous:{title:"Interface: LiquidableSync",permalink:"/liquidscript/api/interfaces/LiquidableSync"},next:{title:"Interface: Parser",permalink:"/liquidscript/api/interfaces/Parser"}},l={},o=[{value:"Properties",id:"properties",level:2},{value:"captureOutput?",id:"captureoutput",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"children()?",id:"children",level:3},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"forceOutput?",id:"forceoutput",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"token",id:"token",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"Methods",id:"methods",level:2},{value:"render()",id:"render",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"renderSync()",id:"rendersync",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"See",id:"see",level:4},{value:"Defined in",id:"defined-in-5",level:4}];function h(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"interface-node",children:"Interface: Node"}),"\n",(0,r.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,r.jsx)(n.h3,{id:"captureoutput",children:"captureOutput?"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.code,{children:"optional"})," ",(0,r.jsx)(n.strong,{children:"captureOutput"}),": ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Indicates that a node will never produce an output, even if it\nhas output statement child nodes."}),"\n",(0,r.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/ast.ts#L26",children:"src/ast.ts:26"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"children",children:"children()?"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"optional"})," ",(0,r.jsx)(n.strong,{children:"children"}),": () => ",(0,r.jsx)(n.a,{href:"/liquidscript/api/type-aliases/ChildNode",children:(0,r.jsx)(n.code,{children:"ChildNode"})}),"[]"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Return an array of child nodes."}),"\n",(0,r.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/liquidscript/api/type-aliases/ChildNode",children:(0,r.jsx)(n.code,{children:"ChildNode"})}),"[]"]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/ast.ts#L44",children:"src/ast.ts:44"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"forceoutput",children:"forceOutput?"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.code,{children:"optional"})," ",(0,r.jsx)(n.strong,{children:"forceOutput"}),": ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Indicates that nodes that do automatic whitespace suppression\nshould output this node regardless of its contents."}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/ast.ts#L20",children:"src/ast.ts:20"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"token",children:"token"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"readonly"})," ",(0,r.jsx)(n.strong,{children:"token"}),": ",(0,r.jsx)(n.a,{href:"/liquidscript/api/namespaces/tokens/classes/Token",children:(0,r.jsx)(n.code,{children:"Token"})})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"The token that started this node. Used to add line and column numbers\nto error messages."}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/ast.ts#L14",children:"src/ast.ts:14"})}),"\n",(0,r.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,r.jsx)(n.h3,{id:"render",children:"render()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"render"}),"(",(0,r.jsx)(n.code,{children:"context"}),", ",(0,r.jsx)(n.code,{children:"out"}),"): ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Render this node to the given output stream."}),"\n",(0,r.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.strong,{children:"context"}),": ",(0,r.jsx)(n.a,{href:"/liquidscript/api/classes/RenderContext",children:(0,r.jsx)(n.code,{children:"RenderContext"})})]}),"\n",(0,r.jsx)(n.p,{children:"The active render context."}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.strong,{children:"out"}),": ",(0,r.jsx)(n.a,{href:"/liquidscript/api/interfaces/RenderStream",children:(0,r.jsx)(n.code,{children:"RenderStream"})})]}),"\n",(0,r.jsx)(n.p,{children:"The stream to output to."}),"\n",(0,r.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/ast.ts#L33",children:"src/ast.ts:33"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"rendersync",children:"renderSync()"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"renderSync"}),"(",(0,r.jsx)(n.code,{children:"context"}),", ",(0,r.jsx)(n.code,{children:"out"}),"): ",(0,r.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["A synchronous version of ",(0,r.jsx)(n.a,{href:"/liquidscript/api/interfaces/Node#render",children:"render"}),"."]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.strong,{children:"context"}),": ",(0,r.jsx)(n.a,{href:"/liquidscript/api/classes/RenderContext",children:(0,r.jsx)(n.code,{children:"RenderContext"})})]}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.strong,{children:"out"}),": ",(0,r.jsx)(n.a,{href:"/liquidscript/api/interfaces/RenderStream",children:(0,r.jsx)(n.code,{children:"RenderStream"})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"void"})}),"\n",(0,r.jsx)(n.h4,{id:"see",children:"See"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/liquidscript/api/interfaces/Node#render",children:"render"})}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/ast.ts#L39",children:"src/ast.ts:39"})})]})}function a(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>c});var r=i(96540);const s={},d=r.createContext(s);function t(e){const n=r.useContext(d);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),r.createElement(d.Provider,{value:n},e.children)}}}]);