import{l as X,u as Z,m as M,p as ee,q as se,v as te,x as ae,j as x,y as C,k as t,z as le,w as O,A as re,R as $,B as ie,C as ue,D as ne,E as oe,G as ce,H as T,I,J as ve,K as me,L as he,M as pe,N as ye,O as de,P as Ee,Q as P,S as ge,T as H}from"./app-D6nd_WU5.js";const Ae=["/","/intro.html","/demo/","/demo/disable.html","/demo/layout.html","/demo/markdown.html","/demo/page.html","/posts/cherry.html","/posts/dragonfruit.html","/posts/strawberry.html","/posts/tomato.html","/posts/apple/1.html","/posts/apple/2.html","/posts/apple/3.html","/posts/apple/4.html","/posts/banana/1.html","/posts/banana/2.html","/posts/banana/3.html","/posts/banana/4.html","/404.html","/posts/","/posts/apple/","/posts/banana/","/category/","/category/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","/category/%E6%8C%87%E5%8D%97/","/category/%E6%A8%B1%E6%A1%83/","/category/%E7%81%AB%E9%BE%99%E6%9E%9C/","/category/%E6%B0%B4%E6%9E%9C/","/category/%E8%8D%89%E8%8E%93/","/category/%E8%94%AC%E8%8F%9C/","/category/%E8%82%A1%E7%A5%A8/","/category/%E6%96%B0%E8%82%A1/","/category/%E8%B6%85%E7%A0%94%E8%82%A1%E4%BB%BD/","/category/%E6%93%8D%E4%BD%9C/","/category/%E7%BA%A2/","/category/%E8%8B%B9%E6%9E%9C/","/category/%E9%A6%99%E8%95%89/","/tag/","/tag/%E7%A6%81%E7%94%A8/","/tag/%E5%8A%A0%E5%AF%86/","/tag/%E5%B8%83%E5%B1%80/","/tag/markdown/","/tag/%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE/","/tag/%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/","/tag/%E7%BA%A2/","/tag/%E5%B0%8F/","/tag/%E5%9C%86/","/tag/%E5%A4%A7/","/tag/%E9%BB%84/","/tag/%E5%BC%AF%E6%9B%B2%E7%9A%84/","/tag/%E9%95%BF/","/article/","/star/","/timeline/"],Be="SLIMSEARCH_QUERY_HISTORY",d=P(Be,[]),fe=()=>{const{queryHistoryCount:l}=H;return{enabled:l>0,queryHistories:d,addQueryHistory:u=>{d.value=Array.from(new Set([u,...d.value.slice(0,l-1)]))},removeQueryHistory:u=>{d.value=[...d.value.slice(0,u),...d.value.slice(u+1)]}}},S=l=>Ae[l.id]+("anchor"in l?`#${l.anchor}`:""),Ce="SLIMSEARCH_RESULT_HISTORY",{resultHistoryCount:j}=H,E=P(Ce,[]),He=()=>({enabled:j>0,resultHistories:E,addResultHistory:i=>{{const u={link:S(i),display:i.display};"header"in i&&(u.header=i.header),E.value=[u,...E.value.slice(0,j-1)]}},removeResultHistory:i=>{E.value=[...E.value.slice(0,i),...E.value.slice(i+1)]}}),De=l=>{const i=ve(),u=M(),D=me(),n=x(0),g=C(()=>n.value>0),v=he([]);return pe(()=>{const{search:k,terminate:h}=ye(),A=de(p=>{const{resultsFilter:w=a=>a,querySplitter:y,suggestionsFilter:b,...r}=i.value;p?(n.value+=1,k(p,u.value,r).then(a=>w(a,p,u.value,D.value)).then(a=>{n.value-=1,v.value=a}).catch(a=>{console.warn(a),n.value-=1,n.value||(v.value=[])})):v.value=[]},H.searchDelay-H.suggestDelay,{maxWait:5e3});O([l,u],([p])=>{A(p.join(" "))},{immediate:!0}),Ee(()=>{h()})}),{isSearching:g,results:v}};var we=X({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(l,{emit:i}){const u=Z(),D=M(),n=ee(se),{addQueryHistory:g,queryHistories:v,removeQueryHistory:k}=fe(),{resultHistories:h,addResultHistory:A,removeResultHistory:p}=He(),w=te(l,"queries"),{results:y,isSearching:b}=De(w),r=ae({isQuery:!0,index:0}),a=x(0),m=x(0),F=C(()=>v.value.length>0||h.value.length>0),R=C(()=>y.value.length>0),Q=C(()=>y.value[a.value]||null),U=()=>{const{isQuery:e,index:s}=r;s===0?(r.isQuery=!e,r.index=e?h.value.length-1:v.value.length-1):r.index=s-1},Y=()=>{const{isQuery:e,index:s}=r;s===(e?v.value.length-1:h.value.length-1)?(r.isQuery=!e,r.index=0):r.index=s+1},_=()=>{a.value=a.value>0?a.value-1:y.value.length-1,m.value=Q.value.contents.length-1},z=()=>{a.value=a.value<y.value.length-1?a.value+1:0,m.value=0},G=()=>{m.value<Q.value.contents.length-1?m.value+=1:z()},J=()=>{m.value>0?m.value-=1:_()},q=e=>e.map(s=>ge(s)?s:t(s[0],s[1])),K=e=>{if(e.type==="customField"){const s=oe[e.index]||"$content",[o,f=""]=ce(s)?s[D.value].split("$content"):s.split("$content");return e.display.map(c=>t("div",q([o,...c,f])))}return e.display.map(s=>t("div",q(s)))},B=()=>{a.value=0,m.value=0,i("updateQuery",""),i("close")},N=()=>t("ul",{class:"slimsearch-result-list"},t("li",{class:"slimsearch-result-list-item"},[t("div",{class:"slimsearch-result-title"},n.value.queryHistory),v.value.map((e,s)=>t("div",{class:["slimsearch-result-item",{active:r.isQuery&&r.index===s}],onClick:()=>{i("updateQuery",e)}},[t(T,{class:"slimsearch-result-type"}),t("div",{class:"slimsearch-result-content"},e),t("button",{class:"slimsearch-remove-icon",innerHTML:I,onClick:o=>{o.preventDefault(),o.stopPropagation(),k(s)}})]))])),V=()=>t("ul",{class:"slimsearch-result-list"},t("li",{class:"slimsearch-result-list-item"},[t("div",{class:"slimsearch-result-title"},n.value.resultHistory),h.value.map((e,s)=>t($,{to:e.link,class:["slimsearch-result-item",{active:!r.isQuery&&r.index===s}],onClick:()=>{B()}},()=>[t(T,{class:"slimsearch-result-type"}),t("div",{class:"slimsearch-result-content"},[e.header?t("div",{class:"content-header"},e.header):null,t("div",e.display.map(o=>q(o)).flat())]),t("button",{class:"slimsearch-remove-icon",innerHTML:I,onClick:o=>{o.preventDefault(),o.stopPropagation(),p(s)}})]))]));return le("keydown",e=>{if(l.isFocusing){if(R.value){if(e.key==="ArrowUp")J();else if(e.key==="ArrowDown")G();else if(e.key==="Enter"){const s=Q.value.contents[m.value];g(l.queries.join(" ")),A(s),u.push(S(s)),B()}}else if(e.key==="ArrowUp")U();else if(e.key==="ArrowDown")Y();else if(e.key==="Enter"){const{index:s}=r;r.isQuery?(i("updateQuery",v.value[s]),e.preventDefault()):(u.push(h.value[s].link),B())}}}),O([a,m],()=>{var e;(e=document.querySelector(".slimsearch-result-list-item.active .slimsearch-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>t("div",{class:["slimsearch-result-wrapper",{empty:l.queries.length?!R.value:!F.value}],id:"slimsearch-results"},l.queries.length?b.value?t(re,{hint:n.value.searching}):R.value?t("ul",{class:"slimsearch-result-list"},y.value.map(({title:e,contents:s},o)=>{const f=a.value===o;return t("li",{class:["slimsearch-result-list-item",{active:f}]},[t("div",{class:"slimsearch-result-title"},e||n.value.defaultTitle),s.map((c,W)=>{const L=f&&m.value===W;return t($,{to:S(c),class:["slimsearch-result-item",{active:L,"aria-selected":L}],onClick:()=>{g(l.queries.join(" ")),A(c),B()}},()=>[c.type==="text"?null:t(c.type==="title"?ie:c.type==="heading"?ue:ne,{class:"slimsearch-result-type"}),t("div",{class:"slimsearch-result-content"},[c.type==="text"&&c.header?t("div",{class:"content-header"},c.header):null,t("div",K(c))])])})])})):n.value.emptyResult:F.value?[N(),V()]:n.value.emptyHistory)}});export{we as default};
