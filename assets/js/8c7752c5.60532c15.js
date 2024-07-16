"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[5007],{48471:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>d,toc:()=>l});var s=t(74848),i=t(28453);const r={},c="Function: truncate()",d={id:"api/namespaces/filters/functions/truncate",title:"Function: truncate()",description:"truncate(this, left, length, end): string",source:"@site/docs/api/namespaces/filters/functions/truncate.md",sourceDirName:"api/namespaces/filters/functions",slug:"/api/namespaces/filters/functions/truncate",permalink:"/liquidscript/api/namespaces/filters/functions/truncate",draft:!1,unlisted:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/api/namespaces/filters/functions/truncate.md",tags:[],version:"current",frontMatter:{},sidebar:"API",previous:{title:"Function: times()",permalink:"/liquidscript/api/namespaces/filters/functions/times"},next:{title:"Function: truncateWords()",permalink:"/liquidscript/api/namespaces/filters/functions/truncateWords"}},o={},l=[{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"function-truncate",children:"Function: truncate()"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"truncate"}),"(",(0,s.jsx)(n.code,{children:"this"}),", ",(0,s.jsx)(n.code,{children:"left"}),", ",(0,s.jsx)(n.code,{children:"length"}),", ",(0,s.jsx)(n.code,{children:"end"}),"): ",(0,s.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Return a truncated version of the input string. The first argument, length,\ndefaults to ",(0,s.jsx)(n.code,{children:"50"}),". The second argument defaults to an ellipsis (",(0,s.jsx)(n.code,{children:"..."}),")."]}),"\n",(0,s.jsxs)(n.p,{children:["If the length of the input string is less than the given length (first\nargument), the input string will be truncated to ",(0,s.jsx)(n.code,{children:"length"})," minus the length\nof the second argument, with the second argument appended."]}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"this"}),": ",(0,s.jsx)(n.a,{href:"/liquidscript/api/type-aliases/FilterContext",children:(0,s.jsx)(n.code,{children:"FilterContext"})})]}),"\n",(0,s.jsx)(n.p,{children:"An object containing a reference to the active render context\nand any keyword/named arguments."}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"left"}),": ",(0,s.jsx)(n.code,{children:"unknown"})]}),"\n",(0,s.jsx)(n.p,{children:"Any value. Will be coerced to a string if it's not one already."}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"length"}),": ",(0,s.jsx)(n.code,{children:"unknown"})," = ",(0,s.jsx)(n.code,{children:"50"})]}),"\n",(0,s.jsxs)(n.p,{children:["Any value. If it can't be converted to a number, zero will\nbe used instead. Defaults to ",(0,s.jsx)(n.code,{children:"50"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["\u2022 ",(0,s.jsx)(n.strong,{children:"end"}),": ",(0,s.jsx)(n.code,{children:"unknown"})," = ",(0,s.jsx)(n.code,{children:'"..."'})]}),"\n",(0,s.jsxs)(n.p,{children:["Any value. Will be coerced to a string if it's not one already.\nDefaults to ",(0,s.jsx)(n.code,{children:"..."}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"string"})}),"\n",(0,s.jsx)(n.p,{children:"A truncated version of the input string."}),"\n",(0,s.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/builtin/filters/string.ts#L534",children:"src/builtin/filters/string.ts:534"})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>c,x:()=>d});var s=t(96540);const i={},r=s.createContext(i);function c(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);