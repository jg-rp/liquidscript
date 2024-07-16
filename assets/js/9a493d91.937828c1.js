"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[10475],{49685:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>n,metadata:()=>c,toc:()=>a});var r=i(74848),d=i(28453);const n={},l="Class: ChoiceLoader",c={id:"api/classes/ChoiceLoader",title:"Class: ChoiceLoader",description:"A template loader that will try each of an array of loaders until",source:"@site/docs/api/classes/ChoiceLoader.md",sourceDirName:"api/classes",slug:"/api/classes/ChoiceLoader",permalink:"/liquidscript/api/classes/ChoiceLoader",draft:!1,unlisted:!1,editUrl:"https://github.com/jg-rp/liquidscript/tree/docs/docs/api/classes/ChoiceLoader.md",tags:[],version:"current",frontMatter:{},sidebar:"API",previous:{title:"Class: CachingNodeFileSystemLoader",permalink:"/liquidscript/api/classes/CachingNodeFileSystemLoader"},next:{title:"Class: ConditionalExpression",permalink:"/liquidscript/api/classes/ConditionalExpression"}},o={},a=[{value:"Extends",id:"extends",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new ChoiceLoader()",id:"new-choiceloader",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"loaders",id:"loaders",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Methods",id:"methods",level:2},{value:"getSource()",id:"getsource",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Throws",id:"throws",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"getSourceSync()",id:"getsourcesync",level:3},{value:"Returns",id:"returns-2",level:4},{value:"See",id:"see",level:4},{value:"Overrides",id:"overrides-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"load()",id:"load",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-3",level:4},{value:"See",id:"see-1",level:4},{value:"Overrides",id:"overrides-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"loadSync()",id:"loadsync",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-4",level:4},{value:"See",id:"see-2",level:4},{value:"Overrides",id:"overrides-4",level:4},{value:"Defined in",id:"defined-in-5",level:4}];function t(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"class-choiceloader",children:"Class: ChoiceLoader"}),"\n",(0,r.jsxs)(s.p,{children:["A template loader that will try each of an array of loaders until\na template is found, or throw a ",(0,r.jsx)(s.code,{children:"TemplateNotFoundError"})," if none of\nthe loaders could find the template."]}),"\n",(0,r.jsx)(s.h2,{id:"extends",children:"Extends"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})})}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,r.jsx)(s.h3,{id:"new-choiceloader",children:"new ChoiceLoader()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"new ChoiceLoader"}),"(",(0,r.jsx)(s.code,{children:"loaders"}),"): ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/ChoiceLoader",children:(0,r.jsx)(s.code,{children:"ChoiceLoader"})})]}),"\n"]}),"\n",(0,r.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"loaders"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})}),"[]"]}),"\n",(0,r.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/ChoiceLoader",children:(0,r.jsx)(s.code,{children:"ChoiceLoader"})})}),"\n",(0,r.jsx)(s.h4,{id:"overrides",children:"Overrides"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})}),".",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#constructors",children:(0,r.jsx)(s.code,{children:"constructor"})})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/builtin/loaders/choice_loader.ts#L18",children:"src/builtin/loaders/choice_loader.ts:18"})}),"\n",(0,r.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,r.jsx)(s.h3,{id:"loaders",children:"loaders"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"readonly"})," ",(0,r.jsx)(s.strong,{children:"loaders"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})}),"[]"]}),"\n"]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/builtin/loaders/choice_loader.ts#L18",children:"src/builtin/loaders/choice_loader.ts:18"})}),"\n",(0,r.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,r.jsx)(s.h3,{id:"getsource",children:"getSource()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"getSource"}),"(): ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/TemplateSource",children:(0,r.jsx)(s.code,{children:"TemplateSource"})}),">"]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Override ",(0,r.jsx)(s.code,{children:"getSource"})," to implement a custom loader."]}),"\n",(0,r.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/TemplateSource",children:(0,r.jsx)(s.code,{children:"TemplateSource"})}),">"]}),"\n",(0,r.jsx)(s.p,{children:"The source, with any meta data, for the template identified by\nthe given name"}),"\n",(0,r.jsx)(s.h4,{id:"throws",children:"Throws"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/TemplateNotFoundError",children:"TemplateNotFoundError"}),"\nThrown if the template can not be found."]}),"\n",(0,r.jsx)(s.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})}),".",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#getsource",children:(0,r.jsx)(s.code,{children:"getSource"})})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/builtin/loaders/choice_loader.ts#L22",children:"src/builtin/loaders/choice_loader.ts:22"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"getsourcesync",children:"getSourceSync()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"getSourceSync"}),"(): ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/TemplateSource",children:(0,r.jsx)(s.code,{children:"TemplateSource"})})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["A synchronous version of ",(0,r.jsx)(s.code,{children:"getSource"}),"."]}),"\n",(0,r.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/TemplateSource",children:(0,r.jsx)(s.code,{children:"TemplateSource"})})}),"\n",(0,r.jsx)(s.h4,{id:"see",children:"See"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#getsource",children:"getSource"})}),"\n",(0,r.jsx)(s.h4,{id:"overrides-2",children:"Overrides"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})}),".",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#getsourcesync",children:(0,r.jsx)(s.code,{children:"getSourceSync"})})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/builtin/loaders/choice_loader.ts#L27",children:"src/builtin/loaders/choice_loader.ts:27"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"load",children:"load()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"load"}),"(",(0,r.jsx)(s.code,{children:"name"}),", ",(0,r.jsx)(s.code,{children:"environment"}),", ",(0,r.jsx)(s.code,{children:"context"}),"?, ",(0,r.jsx)(s.code,{children:"globals"}),"?, ",(0,r.jsx)(s.code,{children:"loaderContext"}),"?): ",(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Template",children:(0,r.jsx)(s.code,{children:"Template"})}),">"]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Used internally by ",(0,r.jsx)(s.code,{children:"Environment.getTemplate()"}),". Delegates to ",(0,r.jsx)(s.code,{children:"getSource"}),"."]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"name"}),": ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"environment"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Environment",children:(0,r.jsx)(s.code,{children:"Environment"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"context?"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/RenderContext",children:(0,r.jsx)(s.code,{children:"RenderContext"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"globals?"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/type-aliases/ContextScope",children:(0,r.jsx)(s.code,{children:"ContextScope"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"loaderContext?"})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.code,{children:"Promise"}),"<",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Template",children:(0,r.jsx)(s.code,{children:"Template"})}),">"]}),"\n",(0,r.jsx)(s.h4,{id:"see-1",children:"See"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#getsource",children:"getSource"}),". Override ",(0,r.jsx)(s.code,{children:"load"})," to implement a caching loader."]}),"\n",(0,r.jsx)(s.h4,{id:"overrides-3",children:"Overrides"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})}),".",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#load",children:(0,r.jsx)(s.code,{children:"load"})})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/builtin/loaders/choice_loader.ts#L33",children:"src/builtin/loaders/choice_loader.ts:33"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.h3,{id:"loadsync",children:"loadSync()"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"loadSync"}),"(",(0,r.jsx)(s.code,{children:"name"}),", ",(0,r.jsx)(s.code,{children:"environment"}),", ",(0,r.jsx)(s.code,{children:"context"}),"?, ",(0,r.jsx)(s.code,{children:"globals"}),"?, ",(0,r.jsx)(s.code,{children:"loaderContext"}),"?): ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Template",children:(0,r.jsx)(s.code,{children:"Template"})})]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["A synchronous version of ",(0,r.jsx)(s.code,{children:"load"}),"."]}),"\n",(0,r.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"name"}),": ",(0,r.jsx)(s.code,{children:"string"})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"environment"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Environment",children:(0,r.jsx)(s.code,{children:"Environment"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"context?"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/RenderContext",children:(0,r.jsx)(s.code,{children:"RenderContext"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"globals?"}),": ",(0,r.jsx)(s.a,{href:"/liquidscript/api/type-aliases/ContextScope",children:(0,r.jsx)(s.code,{children:"ContextScope"})})]}),"\n",(0,r.jsxs)(s.p,{children:["\u2022 ",(0,r.jsx)(s.strong,{children:"loaderContext?"})]}),"\n",(0,r.jsx)(s.h4,{id:"returns-4",children:"Returns"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Template",children:(0,r.jsx)(s.code,{children:"Template"})})}),"\n",(0,r.jsx)(s.h4,{id:"see-2",children:"See"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#load",children:"load"})}),"\n",(0,r.jsx)(s.h4,{id:"overrides-4",children:"Overrides"}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader",children:(0,r.jsx)(s.code,{children:"Loader"})}),".",(0,r.jsx)(s.a,{href:"/liquidscript/api/classes/Loader#loadsync",children:(0,r.jsx)(s.code,{children:"loadSync"})})]}),"\n",(0,r.jsx)(s.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"https://github.com/jg-rp/liquidscript/blob/a95b26bf6f4636a0a0876e92052e494be9b9708e/src/builtin/loaders/choice_loader.ts#L58",children:"src/builtin/loaders/choice_loader.ts:58"})})]})}function h(e={}){const{wrapper:s}={...(0,d.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(t,{...e})}):t(e)}},28453:(e,s,i)=>{i.d(s,{R:()=>l,x:()=>c});var r=i(96540);const d={},n=r.createContext(d);function l(e){const s=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:l(e.components),r.createElement(n.Provider,{value:s},e.children)}}}]);