"use strict";(self.webpackChunkliquidscript_docs=self.webpackChunkliquidscript_docs||[]).push([[7918],{2958:(e,t,a)=>{a.r(t),a.d(t,{default:()=>be});var n=a(6687),l=a(2995),r=a(7822);const o=n.createContext(null);function s(e){let{children:t,content:a}=e;const l=function(e){return(0,n.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(a);return n.createElement(o.Provider,{value:l},t)}function c(){const e=(0,n.useContext)(o);if(null===e)throw new r.i6("DocProvider");return e}function i(){const{metadata:e,frontMatter:t,assets:a}=c();return n.createElement(l.d,{title:e.title,description:e.description,keywords:t.keywords,image:a.image??t.image})}var d=a(4923),m=a(2613),u=a(1943),p=a(6963),b=a(1415);function E(e){const{permalink:t,title:a,subLabel:l,isNext:r}=e;return n.createElement(b.Z,{className:(0,d.Z)("pagination-nav__link",r?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},l&&n.createElement("div",{className:"pagination-nav__sublabel"},l),n.createElement("div",{className:"pagination-nav__label"},a))}function h(e){const{previous:t,next:a}=e;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,p.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"})},t&&n.createElement(E,(0,u.Z)({},t,{subLabel:n.createElement(p.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),a&&n.createElement(E,(0,u.Z)({},a,{subLabel:n.createElement(p.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}function v(){const{metadata:e}=c();return n.createElement(h,{previous:e.previous,next:e.next})}var g=a(5633),f=a(5490),_=a(4517),N=a(9068),C=a(912);const L={unreleased:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(p.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){let{siteTitle:t,versionMetadata:a}=e;return n.createElement(p.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function Z(e){const t=L[e.versionMetadata.banner];return n.createElement(t,e)}function k(e){let{versionLabel:t,to:a,onClick:l}=e;return n.createElement(p.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(b.Z,{to:a,onClick:l},n.createElement(p.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function T(e){let{className:t,versionMetadata:a}=e;const{siteConfig:{title:l}}=(0,g.Z)(),{pluginId:r}=(0,f.gA)({failfast:!0}),{savePreferredVersionName:o}=(0,N.J)(r),{latestDocSuggestion:s,latestVersionSuggestion:c}=(0,f.Jo)(r),i=s??(m=c).docs.find((e=>e.id===m.mainDocId));var m;return n.createElement("div",{className:(0,d.Z)(t,_.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(Z,{siteTitle:l,versionMetadata:a})),n.createElement("div",{className:"margin-top--md"},n.createElement(k,{versionLabel:c.label,to:i.path,onClick:()=>o(c.name)})))}function U(e){let{className:t}=e;const a=(0,C.E)();return a.banner?n.createElement(T,{className:t,versionMetadata:a}):null}function w(e){let{className:t}=e;const a=(0,C.E)();return a.badge?n.createElement("span",{className:(0,d.Z)(t,_.k.docs.docVersionBadge,"badge badge--secondary")},n.createElement(p.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:a.label}},"Version: {versionLabel}")):null}function x(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:a}=e;return n.createElement(p.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:n.createElement("b",null,n.createElement("time",{dateTime:new Date(1e3*t).toISOString()},a))}}," on {date}")}function y(e){let{lastUpdatedBy:t}=e;return n.createElement(p.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:n.createElement("b",null,t)}}," by {user}")}function M(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:a,lastUpdatedBy:l}=e;return n.createElement("span",{className:_.k.common.lastUpdated},n.createElement(p.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&a?n.createElement(x,{lastUpdatedAt:t,formattedLastUpdatedAt:a}):"",byUser:l?n.createElement(y,{lastUpdatedBy:l}):""}},"Last updated{atDate}{byUser}"),!1)}const A={iconEdit:"iconEdit_VX8B"};function B(e){let{className:t,...a}=e;return n.createElement("svg",(0,u.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,d.Z)(A.iconEdit,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function I(e){let{editUrl:t}=e;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:_.k.common.editThisPage},n.createElement(B,null),n.createElement(p.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}const H={tag:"tag_oHOL",tagRegular:"tagRegular_nnTH",tagWithCount:"tagWithCount_Yegy"};function V(e){let{permalink:t,label:a,count:l}=e;return n.createElement(b.Z,{href:t,className:(0,d.Z)(H.tag,l?H.tagWithCount:H.tagRegular)},a,l&&n.createElement("span",null,l))}const P={tags:"tags_zVCf",tag:"tag_v3ln"};function D(e){let{tags:t}=e;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(p.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,d.Z)(P.tags,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:a}=e;return n.createElement("li",{key:a,className:P.tag},n.createElement(V,{label:t,permalink:a}))}))))}const R={lastUpdated:"lastUpdated_oKp1"};function S(e){return n.createElement("div",{className:(0,d.Z)(_.k.docs.docFooterTagsRow,"row margin-bottom--sm")},n.createElement("div",{className:"col"},n.createElement(D,e)))}function z(e){let{editUrl:t,lastUpdatedAt:a,lastUpdatedBy:l,formattedLastUpdatedAt:r}=e;return n.createElement("div",{className:(0,d.Z)(_.k.docs.docFooterEditMetaRow,"row")},n.createElement("div",{className:"col"},t&&n.createElement(I,{editUrl:t})),n.createElement("div",{className:(0,d.Z)("col",R.lastUpdated)},(a||l)&&n.createElement(M,{lastUpdatedAt:a,formattedLastUpdatedAt:r,lastUpdatedBy:l})))}function F(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:a,formattedLastUpdatedAt:l,lastUpdatedBy:r,tags:o}=e,s=o.length>0,i=!!(t||a||r);return s||i?n.createElement("footer",{className:(0,d.Z)(_.k.docs.docFooter,"docusaurus-mt-lg")},s&&n.createElement(S,{tags:o}),i&&n.createElement(z,{editUrl:t,lastUpdatedAt:a,lastUpdatedBy:r,formattedLastUpdatedAt:l})):null}var O=a(3150),q=a(6314);const J={tocCollapsibleButton:"tocCollapsibleButton_BlMV",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_v5rK"};function W(e){let{collapsed:t,...a}=e;return n.createElement("button",(0,u.Z)({type:"button"},a,{className:(0,d.Z)("clean-btn",J.tocCollapsibleButton,!t&&J.tocCollapsibleButtonExpanded,a.className)}),n.createElement(p.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page"))}const j={tocCollapsible:"tocCollapsible_XHpu",tocCollapsibleContent:"tocCollapsibleContent_n_bu",tocCollapsibleExpanded:"tocCollapsibleExpanded_J3jM"};function G(e){let{toc:t,className:a,minHeadingLevel:l,maxHeadingLevel:r}=e;const{collapsed:o,toggleCollapsed:s}=(0,O.u)({initialState:!0});return n.createElement("div",{className:(0,d.Z)(j.tocCollapsible,!o&&j.tocCollapsibleExpanded,a)},n.createElement(W,{collapsed:o,onClick:s}),n.createElement(O.z,{lazy:!0,className:j.tocCollapsibleContent,collapsed:o},n.createElement(q.Z,{toc:t,minHeadingLevel:l,maxHeadingLevel:r})))}const K={tocMobile:"tocMobile_sz05"};function X(){const{toc:e,frontMatter:t}=c();return n.createElement(G,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,d.Z)(_.k.docs.docTocMobile,K.tocMobile)})}var Y=a(7851);function $(){const{toc:e,frontMatter:t}=c();return n.createElement(Y.Z,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:_.k.docs.docTocDesktop})}var Q=a(358),ee=a(2577);function te(e){let{children:t}=e;const a=function(){const{metadata:e,frontMatter:t,contentTitle:a}=c();return t.hide_title||void 0!==a?null:e.title}();return n.createElement("div",{className:(0,d.Z)(_.k.docs.docMarkdown,"markdown")},a&&n.createElement("header",null,n.createElement(Q.Z,{as:"h1"},a)),n.createElement(ee.Z,null,t))}var ae=a(9707),ne=a(8927),le=a(8813);function re(e){return n.createElement("svg",(0,u.Z)({viewBox:"0 0 24 24"},e),n.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const oe={breadcrumbHomeIcon:"breadcrumbHomeIcon_GHfR"};function se(){const e=(0,le.Z)("/");return n.createElement("li",{className:"breadcrumbs__item"},n.createElement(b.Z,{"aria-label":(0,p.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},n.createElement(re,{className:oe.breadcrumbHomeIcon})))}const ce={breadcrumbsContainer:"breadcrumbsContainer_jUAE"};function ie(e){let{children:t,href:a,isLast:l}=e;const r="breadcrumbs__link";return l?n.createElement("span",{className:r,itemProp:"name"},t):a?n.createElement(b.Z,{className:r,href:a,itemProp:"item"},n.createElement("span",{itemProp:"name"},t)):n.createElement("span",{className:r},t)}function de(e){let{children:t,active:a,index:l,addMicrodata:r}=e;return n.createElement("li",(0,u.Z)({},r&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,d.Z)("breadcrumbs__item",{"breadcrumbs__item--active":a})}),t,n.createElement("meta",{itemProp:"position",content:String(l+1)}))}function me(){const e=(0,ae.s1)(),t=(0,ne.Ns)();return e?n.createElement("nav",{className:(0,d.Z)(_.k.docs.docBreadcrumbs,ce.breadcrumbsContainer),"aria-label":(0,p.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},n.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&n.createElement(se,null),e.map(((t,a)=>{const l=a===e.length-1;return n.createElement(de,{key:a,active:l,index:a,addMicrodata:!!t.href},n.createElement(ie,{href:t.href,isLast:l},t.label))})))):null}const ue={docItemContainer:"docItemContainer_P2Om",docItemCol:"docItemCol_iMgY"};function pe(e){let{children:t}=e;const a=function(){const{frontMatter:e,toc:t}=c(),a=(0,m.i)(),l=e.hide_table_of_contents,r=!l&&t.length>0;return{hidden:l,mobile:r?n.createElement(X,null):void 0,desktop:!r||"desktop"!==a&&"ssr"!==a?void 0:n.createElement($,null)}}();return n.createElement("div",{className:"row"},n.createElement("div",{className:(0,d.Z)("col",!a.hidden&&ue.docItemCol)},n.createElement(U,null),n.createElement("div",{className:ue.docItemContainer},n.createElement("article",null,n.createElement(me,null),n.createElement(w,null),a.mobile,n.createElement(te,null,t),n.createElement(F,null)),n.createElement(v,null))),a.desktop&&n.createElement("div",{className:"col col--3"},a.desktop))}function be(e){const t=`docs-doc-id-${e.content.metadata.unversionedId}`,a=e.content;return n.createElement(s,{content:e.content},n.createElement(l.FG,{className:t},n.createElement(i,null),n.createElement(pe,null,n.createElement(a,null))))}},912:(e,t,a)=>{a.d(t,{E:()=>s,q:()=>o});var n=a(6687),l=a(7822);const r=n.createContext(null);function o(e){let{children:t,version:a}=e;return n.createElement(r.Provider,{value:a},t)}function s(){const e=(0,n.useContext)(r);if(null===e)throw new l.i6("DocsVersionProvider");return e}}}]);