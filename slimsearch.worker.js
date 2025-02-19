const{entries:$}=Object,{fromEntries:st}=Object,nt="ENTRIES",D="KEYS",W="VALUES",_="";class S{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=b(this._path);if(b(s)===_)return{done:!1,value:this.result()};const n=t.get(b(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=b(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>b(t)).filter(t=>t!==_).join("")}value(){return b(this._path).node.get(_)}result(){switch(this._type){case W:return this.value();case D:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const b=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(typeof t!="string")return n;const o=t.length+1,r=o+s,i=new Uint8Array(r*o).fill(s+1);for(let c=0;c<o;++c)i[c]=c;for(let c=1;c<r;++c)i[c*o]=c;return q(e,t,s,n,i,1,o,""),n},q=(e,t,s,n,o,r,i,c)=>{const l=r*i;t:for(const u of e.keys())if(u===_){const h=o[l-1];h<=s&&n.set(c,[e.get(u),h])}else{let h=r;for(let f=0;f<u.length;++f,++h){const m=u[f],g=i*h,y=g-i;let d=o[g];const a=Math.max(0,h-s-1),x=Math.min(i-1,h+s);for(let p=a;p<x;++p){const O=m!==t[p],C=o[y+p]+ +O,k=o[y+p+1]+1,z=o[g+p]+1,v=o[g+p+1]=Math.min(C,k,z);v<d&&(d=v)}if(d>s)continue t}q(e.get(u),t,s,n,o,h,i,c+u)}};class w{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=I(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,r]=L(n);for(const i of o.keys())if(i!==_&&i.startsWith(r)){const c=new Map;return c.set(i.slice(r.length),o.get(i)),new w(c,t)}}return new w(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,rt(this._tree,t)}entries(){return new S(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=F(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){return F(this._tree,t)?.has(_)??!1}keys(){return new S(this,D)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,E(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=E(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=E(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new S(this,W)}[Symbol.iterator](){return this.entries()}static from(t){const s=new w;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return w.from(Object.entries(t))}}const I=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),I(e.get(n),t.slice(n.length),s);return s.push([e,t]),I(void 0,"",s)},F=(e,t)=>{if(t.length===0||!e)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return F(e.get(s),t.slice(s.length))},E=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const r of e.keys())if(r!==_&&t[n]===r[0]){const i=Math.min(s-n,r.length);let c=1;for(;c<i&&t[n+c]===r[c];)++c;const l=e.get(r);if(c===r.length)e=l;else{const u=new Map;u.set(r.slice(c),l),e.set(t.slice(n,n+c),u),e.delete(r),e=u}n+=c;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},rt=(e,t)=>{const[s,n]=I(e,t);if(s!==void 0){if(s.delete(_),s.size===0)R(n);else if(s.size===1){const[o,r]=s.entries().next().value;A(n,o,r)}}},R=e=>{if(e.length===0)return;const[t,s]=L(e);if(t.delete(s),t.size===0)R(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&A(e.slice(0,-1),n,o)}},A=(e,t,s)=>{if(e.length===0)return;const[n,o]=L(e);n.set(o+t,s),n.delete(o)},L=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},ct=/[\n\r\p{Z}\p{P}]+/u,j="or",N="and",ut="and_not",ht=(e,t)=>{e.includes(t)||e.push(t)},B=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},P=({score:e},{score:t})=>t-e,lt=()=>new Map,M=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,H={[j]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:r,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),B(n.terms,r)}}return e},[N]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:r,terms:i,match:c}=t.get(n);B(o.terms,i),s.set(n,{score:o.score+r,terms:o.terms,match:Object.assign(o.match,c)})}return s},[ut]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},dt=(e,t,s,n,o,r)=>{const{k:i,b:c,d:l}=r;return Math.log(1+(s-t+.5)/(t+.5))*(l+e*(i+1)/(e+i*(1-c+c*n/o)))},at=e=>(t,s,n)=>({term:t,fuzzy:typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy??!1,prefix:typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0,termBoost:typeof e.boostTerm=="function"?e.boostTerm(t,s,n):1}),J=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},ft=(e,t,s,n)=>{if(!e._index.has(n)){J(e,s,t,n);return}const o=e._index.fetch(n,lt),r=o.get(t),i=r?.get(s);!r||typeof i>"u"?J(e,s,t,n):i<=1?r.size<=1?o.delete(t):r.delete(s):r.set(s,i-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},gt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(ct),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{console?.[e]?.(t)},autoVacuum:!0},Y={combineWith:j,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},pt={combineWith:N,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},K={minDirtFactor:.1,minDirtCount:20},yt={..._t,...K},U=Symbol("*"),xt=(e,t)=>{const s=new Map,n={...e._options.searchOptions,...t};for(const[o,r]of e._documentIds){const i=n.boostDocument?n.boostDocument(r,"",e._storedFields.get(o)):1;s.set(o,{score:i,terms:[],match:{}})}return s},Q=(e,t=j)=>{if(e.length===0)return new Map;const s=t.toLowerCase();if(!(s in H))throw new Error(`Invalid combination operator: ${t}`);return e.reduce(H[s])},T=(e,t,s,n,o,r,i,c,l,u=new Map)=>{if(r==null)return u;for(const h of Object.keys(i)){const f=i[h],m=e._fieldIds[h],g=r.get(m);if(g==null)continue;let y=g.size;const d=e._avgFieldLength[m];for(const a of g.keys()){if(!e._documentIds.has(a)){ft(e,m,a,s),y-=1;continue}const x=c?c(e._documentIds.get(a),s,e._storedFields.get(a)):1;if(!x)continue;const p=g.get(a),O=e._fieldLength.get(a)[m],C=dt(p,y,e._documentCount,O,d,l),k=n*o*f*x*C,z=u.get(a);if(z){z.score+=k,ht(z.terms,t);const v=G(z.match,s);v?v.push(h):z.match[s]=[h]}else u.set(a,{score:k,terms:[t],match:{[s]:[h]}})}}return u},zt=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields??e._options.fields).reduce((d,a)=>({...d,[a]:G(n.boost,a)||1}),{}),{boostDocument:r,weights:i,maxFuzzy:c,bm25:l}=n,{fuzzy:u,prefix:h}={...Y.weights,...i},f=e._index.get(t.term),m=T(e,t.term,t.term,1,t.termBoost,f,o,r,l);let g,y;if(t.prefix&&(g=e._index.atPrefix(t.term)),t.fuzzy){const d=t.fuzzy===!0?.2:t.fuzzy,a=d<1?Math.min(c,Math.round(t.term.length*d)):d;a&&(y=e._index.fuzzyGet(t.term,a))}if(g)for(const[d,a]of g){const x=d.length-t.term.length;if(!x)continue;y?.delete(d);const p=h*d.length/(d.length+.3*x);T(e,t.term,d,p,t.termBoost,a,o,r,l,m)}if(y)for(const d of y.keys()){const[a,x]=y.get(d);if(!x)continue;const p=u*d.length/(d.length+x);T(e,t.term,d,p,t.termBoost,a,o,r,l,m)}return m},X=(e,t,s={})=>{if(t===U)return xt(e,s);if(typeof t!="string"){const h={...s,...t,queries:void 0},f=t.queries.map(m=>X(e,m,h));return Q(f,h.combineWith)}const{tokenize:n,processTerm:o,searchOptions:r}=e._options,i={tokenize:n,processTerm:o,...r,...s},{tokenize:c,processTerm:l}=i,u=c(t).flatMap(h=>l(h)).filter(h=>!!h).map(at(i)).map(h=>zt(e,h,i));return Q(u,i.combineWith)},Z=(e,t,s={})=>{const{searchOptions:n}=e._options,o={...n,...s},r=X(e,t,s),i=[];for(const[c,{score:l,terms:u,match:h}]of r){const f=u.length||1,m={id:e._documentIds.get(c),score:l*f,terms:Object.keys(h),queryTerms:u,match:h};Object.assign(m,e._storedFields.get(c)),(o.filter==null||o.filter(m))&&i.push(m)}return t===U&&o.boostDocument==null||i.sort(P),i},wt=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:r,terms:i}of Z(e,t,s)){const c=i.join(" "),l=n.get(c);l!=null?(l.score+=r,l.count+=1):n.set(c,{score:r,terms:i,count:1})}const o=[];for(const[r,{score:i,terms:c,count:l}]of n)o.push({suggestion:r,terms:c,score:i/l});return o.sort(P),o};class bt{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(!t?.fields)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...gt,...t,autoVacuum:s,searchOptions:{...Y,...t.searchOptions},autoSuggestOptions:{...pt,...t.autoSuggestOptions}},this._index=new w,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=K,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[r,i]of n)o[r]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,version:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const vt=e=>new bt(e),kt=({documentCount:e,nextId:t,fieldIds:s,averageFieldLength:n,dirtCount:o,version:r},i)=>{if(r!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const c=vt(i);return c._documentCount=e,c._nextId=t,c._idToShortId=new Map,c._fieldIds=s,c._avgFieldLength=n,c._dirtCount=o??0,c._index=new w,c},It=(e,t)=>{const{index:s,documentIds:n,fieldLength:o,storedFields:r}=e,i=kt(e,t);i._documentIds=M(n),i._fieldLength=M(o),i._storedFields=M(r);for(const[c,l]of i._documentIds)i._idToShortId.set(l,c);for(const[c,l]of s){const u=new Map;for(const h of Object.keys(l))u.set(parseInt(h,10),M(l[h]));i._index.set(c,u)}return i},V=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let r=0,i=0;const c=(u,h=!1)=>{let f;i===0?f=u.length>20?`… ${u.slice(-20)}`:u:h?f=u.length+i>100?`${u.slice(0,100-i)}… `:u:f=u.length>20?`${u.slice(0,20)} … ${u.slice(-20)}`:u,f&&o.push(f),i+=f.length,h||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let l=s.indexOf(n,r);if(l===-1)return null;for(;l>=0;){const u=l+n.length;if(c(e.slice(r,l)),r=u,i>100)break;l=s.indexOf(n,r)}return i<100&&c(e.slice(r),!0),o},Mt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),Ot=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),tt=(e,t,s={})=>{const n={};return Z(t,e,{boost:{h:2,t:1,c:4},prefix:!0,...s}).forEach(o=>{const{id:r,terms:i,score:c}=o,l=r.includes("@"),u=r.includes("#"),[h,f]=r.split(/[#@]/),m=Number(h),g=i.sort((d,a)=>d.length-a.length).filter((d,a)=>i.slice(a+1).every(x=>!x.includes(d))),{contents:y}=n[m]??={title:"",contents:[]};if(l)y.push([{type:"customField",id:m,index:f,display:g.map(d=>o.c.map(a=>V(a,d))).flat().filter(d=>d!==null)},c]);else{const d=g.map(a=>V(o.h,a)).filter(a=>a!==null);if(d.length&&y.push([{type:u?"heading":"title",id:m,...u&&{anchor:f},display:d},c]),"t"in o&&o.t)for(const a of o.t){const x=g.map(p=>V(a,p)).filter(p=>p!==null);x.length&&y.push([{type:"text",id:m,...u&&{anchor:f},display:x},c])}}}),$(n).sort(([,o],[,r])=>"max"==="total"?Mt(o,r):Ot(o,r)).map(([o,{title:r,contents:i}])=>{if(!r){const c=it(t,o);c&&(r=c.h)}return{title:r,contents:i.map(([c])=>c)}})},et=(e,t,s={})=>{const n=wt(t,e,{fuzzy:.2,maxFuzzy:3,...s}).map(({suggestion:o})=>o);return e.includes(" ")?n:n.filter(o=>!o.includes(" "))},Ct=st($(JSON.parse("{\"/\":{\"documentCount\":95,\"nextId\":95,\"documentIds\":{\"0\":\"1\",\"1\":\"2\",\"2\":\"2@0\",\"3\":\"3\",\"4\":\"3@0\",\"5\":\"3@1\",\"6\":\"4\",\"7\":\"4@0\",\"8\":\"4@1\",\"9\":\"5\",\"10\":\"5#markdown-介绍\",\"11\":\"5#markdown-配置\",\"12\":\"5#markdown-扩展\",\"13\":\"5#vuepress-扩展\",\"14\":\"5#主题扩展\",\"15\":\"5#选项卡\",\"16\":\"5#脚注\",\"17\":\"5#导入文件\",\"18\":\"5#tex-语法\",\"19\":\"5#任务列表\",\"20\":\"5#图片增强\",\"21\":\"5#上下角标\",\"22\":\"5#组件\",\"23\":\"5@0\",\"24\":\"5@1\",\"25\":\"6\",\"26\":\"6#页面标题\",\"27\":\"6#页面信息\",\"28\":\"6#页面内容\",\"29\":\"6#组件\",\"30\":\"6@0\",\"31\":\"6@1\",\"32\":\"7\",\"33\":\"7#标题-2\",\"34\":\"7#标题-3\",\"35\":\"7@0\",\"36\":\"7@1\",\"37\":\"8\",\"38\":\"8#标题-2\",\"39\":\"8#标题-3\",\"40\":\"8@0\",\"41\":\"8@1\",\"42\":\"9\",\"43\":\"9#标题-2\",\"44\":\"9#标题-3\",\"45\":\"9@0\",\"46\":\"9@1\",\"47\":\"10\",\"48\":\"10#标题-2\",\"49\":\"10#标题-3\",\"50\":\"10@0\",\"51\":\"10@1\",\"52\":\"11\",\"53\":\"11#设计类就是设计类型\",\"54\":\"11@0\",\"55\":\"11@1\",\"56\":\"12\",\"57\":\"12#命令行历史\",\"58\":\"12#比较合适的ps1标识\",\"59\":\"12@0\",\"60\":\"12@1\",\"61\":\"13\",\"62\":\"13#标题-2\",\"63\":\"13#标题-3\",\"64\":\"13@0\",\"65\":\"13@1\",\"66\":\"14\",\"67\":\"14#标题-2\",\"68\":\"14#标题-3\",\"69\":\"14@0\",\"70\":\"14@1\",\"71\":\"15\",\"72\":\"15#标题-2\",\"73\":\"15#标题-3\",\"74\":\"15@0\",\"75\":\"15@1\",\"76\":\"16\",\"77\":\"16#标题-2\",\"78\":\"16#标题-3\",\"79\":\"16@0\",\"80\":\"16@1\",\"81\":\"17\",\"82\":\"17#标题-2\",\"83\":\"17#标题-3\",\"84\":\"17@0\",\"85\":\"17@1\",\"86\":\"18\",\"87\":\"18#标题-2\",\"88\":\"18#标题-3\",\"89\":\"18@0\",\"90\":\"18@1\",\"91\":\"19\",\"92\":\"20\",\"93\":\"21\",\"94\":\"22\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[2,11],\"1\":[3],\"2\":[null,null,1],\"3\":[4,43],\"4\":[null,null,1],\"5\":[null,null,1],\"6\":[1,50],\"7\":[null,null,1],\"8\":[null,null,1],\"9\":[3,34],\"10\":[3,18],\"11\":[3,25],\"12\":[3,20],\"13\":[3,21],\"14\":[2,19],\"15\":[1,2],\"16\":[1,11],\"17\":[2,2],\"18\":[3,27],\"19\":[2,7],\"20\":[2,12],\"21\":[2,7],\"22\":[1],\"23\":[null,null,1],\"24\":[null,null,1],\"25\":[2,11],\"26\":[2,30],\"27\":[2,32],\"28\":[2,32],\"29\":[1,35],\"30\":[null,null,1],\"31\":[null,null,4],\"32\":[1],\"33\":[3,4],\"34\":[3,4],\"35\":[null,null,1],\"36\":[null,null,4],\"37\":[1],\"38\":[3,4],\"39\":[3,4],\"40\":[null,null,3],\"41\":[null,null,3],\"42\":[1],\"43\":[3,4],\"44\":[3,4],\"45\":[null,null,3],\"46\":[null,null,3],\"47\":[1],\"48\":[3,4],\"49\":[3,4],\"50\":[null,null,1],\"51\":[null,null,3],\"52\":[4],\"53\":[4,30],\"54\":[null,null,3],\"55\":[null,null,1],\"56\":[5,16],\"57\":[2,89],\"58\":[5,63],\"59\":[null,null,1],\"60\":[null,null,1],\"61\":[3],\"62\":[3,4],\"63\":[3,4],\"64\":[null,null,3],\"65\":[null,null,4],\"66\":[3],\"67\":[3,4],\"68\":[3,4],\"69\":[null,null,3],\"70\":[null,null,4],\"71\":[3],\"72\":[3,4],\"73\":[3,4],\"74\":[null,null,3],\"75\":[null,null,5],\"76\":[3,11],\"77\":[3,4],\"78\":[3,4],\"79\":[null,null,3],\"80\":[null,null,5],\"81\":[3],\"82\":[3,4],\"83\":[3,4],\"84\":[null,null,1],\"85\":[null,null,5],\"86\":[3],\"87\":[3,4],\"88\":[3,4],\"89\":[null,null,1],\"90\":[null,null,5],\"91\":[0,4],\"92\":[1],\"93\":[1],\"94\":[1]},\"averageFieldLength\":[2.4816400219988326,17.105641267780936,1.481305965183393],\"storedFields\":{\"0\":{\"h\":\"介绍页\",\"t\":[\"将你的个人介绍和档案放置在此处。\"]},\"1\":{\"h\":\"功能配置演示\"},\"2\":{\"c\":[\"使用指南\"]},\"3\":{\"h\":\"布局与功能禁用\",\"t\":[\"你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。\",\"本页面就是一个示例，禁用了如下功能:\",\"导航栏\",\"侧边栏\",\"路径导航\",\"页面信息\",\"贡献者\",\"编辑此页链接\",\"更新时间\",\"上一篇/下一篇 链接\",\"评论\",\"页脚\",\"返回顶部按钮\"]},\"4\":{\"c\":[\"使用指南\"]},\"5\":{\"c\":[\"禁用\"]},\"6\":{\"h\":\"布局\",\"t\":[\"布局包括:\",\"导航栏\",\"侧边栏\",\"页脚\",\"同时每个页面包含:\",\"路径导航\",\"标题和页面信息\",\"TOC (文章标题列表)\",\"贡献者、更新时间等页面元信息\",\"评论\",\"主题也带有以下元素:\",\"夜间模式按钮\",\"返回顶部按钮\",\"打印按钮\",\"你可以在主题选项和页面的 frontmatter 中自定义它们。\"]},\"7\":{\"c\":[\"指南\"]},\"8\":{\"c\":[\"布局\"]},\"9\":{\"h\":\"Markdown 展示\",\"t\":[\"VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。\",\"你需要创建并编写 Markdown，以便 VuePress 可以根据文件结构将它们转换为不同的页面。\"]},\"10\":{\"h\":\"Markdown 介绍\",\"t\":[\"如果你是一个新手，还不会编写 Markdown，请先阅读 Markdown 介绍 和 Markdown 演示。\"]},\"11\":{\"h\":\"Markdown 配置\",\"t\":[\"VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。\",\"Frontmatter\",\"Frontmatter 是 VuePress 中很重要的一个概念，请阅读 Frontmatter 介绍 了解详情。\"]},\"12\":{\"h\":\"Markdown 扩展\",\"t\":[\"VuePress 会使用 markdown-it 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 语法扩展 。\"]},\"13\":{\"h\":\"VuePress 扩展\",\"t\":[\"为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。\",\"关于这些扩展，请阅读 VuePress 中的 Markdown 扩展。\"]},\"14\":{\"h\":\"主题扩展\",\"t\":[\"通过 VuePress 插件，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。\"]},\"15\":{\"h\":\"选项卡\",\"t\":[\"查看详情\"]},\"16\":{\"h\":\"脚注\",\"t\":[\"此文字有脚注[1].\",\"查看详情\"]},\"17\":{\"h\":\"导入文件\",\"t\":[\"查看详情\"]},\"18\":{\"h\":\"TeX 语法\",\"t\":[\"$$ \\\\frac {\\\\partial^r} {\\\\partial \\\\omega^r} \\\\left(\\\\frac {y^{\\\\omega}} {\\\\omega}\\\\right) = \\\\left(\\\\frac {y^{\\\\omega}} {\\\\omega}\\\\right) \\\\left{(\\\\log y)^r + \\\\sum_{i=1}^r \\\\frac {(-1)^i r \\\\cdots (r-i+1) (\\\\log y)^{r-i}} {\\\\omega^i} \\\\right} $$\",\"查看详情\"]},\"19\":{\"h\":\"任务列表\",\"t\":[\" 计划 1\",\" 计划 2\",\"查看详情\"]},\"20\":{\"h\":\"图片增强\",\"t\":[\"支持为图片设置颜色模式和大小。\",\"查看详情\"]},\"21\":{\"h\":\"上下角标\",\"t\":[\"19th H2O\",\"查看详情\"]},\"22\":{\"h\":\"组件\"},\"23\":{\"c\":[\"使用指南\"]},\"24\":{\"c\":[\"Markdown\"]},\"25\":{\"h\":\"页面配置\",\"t\":[\"more 注释之前的内容被视为文章摘要。\"]},\"26\":{\"h\":\"页面标题\",\"t\":[\"The first H1 title in Markdown will be regarded as page title.\",\"Markdown 中的第一个 H1 标题会被视为页面标题。\",\"你可以在 Markdown 的 Frontmatter 中设置页面标题。\",\"--- title: 页面标题 ---\"]},\"27\":{\"h\":\"页面信息\",\"t\":[\"你可以在 Markdown 的 Frontmatter 中设置页面信息。\",\"作者设置为 Ms.Hope。\",\"写作日期为 2020 年 1 月 1 日\",\"分类为 “使用指南”\",\"标签为 “页面配置” 和 “使用指南”\"]},\"28\":{\"h\":\"页面内容\",\"t\":[\"你可以自由在这里书写你的 Markdown。\",\"图片引入\",\"你可以将图片和 Markdown 文件放置在一起使用相对路径进行引用。\",\"对于 .vuepress/public 文件夹的图片，请使用绝对链接 / 进行引用。\"]},\"29\":{\"h\":\"组件\",\"t\":[\"每个 Markdown 页面都会被转换为一个 Vue 组件，这意味着你可以在 Markdown 中使用 Vue 语法：\",\"{{ 1 + 1 }}\",\"{{ i }}\",\"你也可以创建并引入你自己的组件。\"]},\"30\":{\"c\":[\"使用指南\"]},\"31\":{\"c\":[\"页面配置\",\"使用指南\"]},\"32\":{\"h\":\"樱桃\"},\"33\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"34\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"35\":{\"c\":[\"樱桃\"]},\"36\":{\"c\":[\"红\",\"小\",\"圆\"]},\"37\":{\"h\":\"火龙果\"},\"38\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"39\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"40\":{\"c\":[\"火龙果\",\"水果\"]},\"41\":{\"c\":[\"红\",\"大\"]},\"42\":{\"h\":\"草莓\"},\"43\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"44\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"45\":{\"c\":[\"水果\",\"草莓\"]},\"46\":{\"c\":[\"红\",\"小\"]},\"47\":{\"h\":\"番茄\"},\"48\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"49\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"50\":{\"c\":[\"蔬菜\"]},\"51\":{\"c\":[\"红\",\"圆\"]},\"52\":{\"h\":\"如何设计类？\"},\"53\":{\"h\":\"设计类就是设计类型\",\"t\":[\"此类型的合法值是什么？ 此类型应该支持什么操作？ 此类型如何被创建、销毁？ 如何进行对象的初始化、赋值？ 对象作为函数的参数，如何以值进行传递？ 此类型如何转换为其他类型？\"]},\"54\":{\"c\":[\"编程\",\"基础\"]},\"55\":{\"c\":[\"圆\"]},\"56\":{\"h\":\"Linux bash常用配置\",\"t\":[\"Linux环境的命令历史记录，以及时间、用户、IP地址、当前所在路径提示\"]},\"57\":{\"h\":\"命令行历史\",\"t\":[\"HISTDIR=自己设置日志路径 if [ ! -d $HISTDIR ] #如果目录为空 then mkdir -p $HISTDIR #给目录/var/history赋予所有人的写权限 ——>- chmod a+w $HISTDIR # 给目录/var/history赋予特殊属性——> chattr +a $HISTDIR fi readonly DT=$(date +%F) readonly HISTORY_FILE=$HISTDIR/$USER-$UID-$DT.log #设置保存命令历史记录的路径及文件名称 readonly PROMPT_COMMAND='{ date \\\"+%Y-%m-%d %T ##### $(who am i 2>/dev/null |awk \\\"{print \\\\$1\\\\\\\" \\\\\\\"\\\\$2\\\\\\\" \\\\\\\"\\\\$5}\\\"| sed -e \\\"s/[()]//g\\\") #### $(history 1 | { read x cmd; echo \\\"$cmd\\\"; })\\\"; } >> $HISTORY_FILE'\"]},\"58\":{\"h\":\"比较合适的PS1标识\",\"t\":[\"export host_ip=`hostname -I|cut -d ' ' -f 1` function tell_tm { date +'%F %H:%M:%S' } function tell_ip { echo $host_ip } export PS1=' \\\\e[1;33m$(tell_tm)\\\\e[m \\\\e[1;32m\\\\u\\\\e[m@\\\\e[1;34m$(tell_ip)\\\\e[m:\\\\e[1;35m\\\\w\\\\e[m$(if git rev-parse --is-inside-work-tree &>/dev/null; then echo \\\"$(__git_ps1)\\\"; fi) \\\\$ '\"]},\"59\":{\"c\":[\"Linux\"]},\"60\":{\"c\":[\"绿\"]},\"61\":{\"h\":\"苹果 3\"},\"62\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"63\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"64\":{\"c\":[\"苹果\",\"水果\"]},\"65\":{\"c\":[\"红\",\"大\",\"圆\"]},\"66\":{\"h\":\"苹果 4\"},\"67\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"68\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"69\":{\"c\":[\"苹果\",\"水果\"]},\"70\":{\"c\":[\"红\",\"大\",\"圆\"]},\"71\":{\"h\":\"香蕉 1\"},\"72\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"73\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"74\":{\"c\":[\"香蕉\",\"水果\"]},\"75\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"76\":{\"h\":\"香蕉 2\",\"t\":[\"一个被数字 10 星标了的香蕉文章。\"]},\"77\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"78\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"79\":{\"c\":[\"香蕉\",\"水果\"]},\"80\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"81\":{\"h\":\"香蕉 3\"},\"82\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"83\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"84\":{\"c\":[\"香蕉\"]},\"85\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"86\":{\"h\":\"香蕉 4\"},\"87\":{\"h\":\"标题 2\",\"t\":[\"这里是内容。\"]},\"88\":{\"h\":\"标题 3\",\"t\":[\"这里是内容。\"]},\"89\":{\"c\":[\"香蕉\"]},\"90\":{\"c\":[\"黄\",\"弯曲的\",\"长\"]},\"91\":{\"h\":\"\",\"t\":[\"404 Not Found\"]},\"92\":{\"h\":\"Posts\"},\"93\":{\"h\":\"Apple\"},\"94\":{\"h\":\"Banana\"}},\"dirtCount\":0,\"index\":[[\"not\",{\"1\":{\"91\":1}}],[\"null\",{\"1\":{\"57\":1,\"58\":1}}],[\"星标\",{\"1\":{\"76\":1}}],[\"数字\",{\"1\":{\"76\":1}}],[\"长\",{\"2\":{\"75\":1,\"80\":1,\"85\":1,\"90\":1}}],[\"弯曲\",{\"2\":{\"75\":1,\"80\":1,\"85\":1,\"90\":1}}],[\"黄\",{\"2\":{\"75\":1,\"80\":1,\"85\":1,\"90\":1}}],[\"香蕉\",{\"0\":{\"71\":1,\"76\":1,\"81\":1,\"86\":1},\"1\":{\"76\":1},\"2\":{\"74\":1,\"79\":1,\"84\":1,\"89\":1}}],[\"404\",{\"1\":{\"91\":1}}],[\"4\",{\"0\":{\"66\":1,\"86\":1}}],[\"苹果\",{\"0\":{\"61\":1,\"66\":1},\"2\":{\"64\":1,\"69\":1}}],[\"绿\",{\"2\":{\"60\":1}}],[\"&\",{\"1\":{\"58\":1}}],[\"@\",{\"1\":{\"58\":1}}],[\"`\",{\"1\":{\"58\":2}}],[\"合适\",{\"0\":{\"58\":1}}],[\"合法\",{\"1\":{\"53\":1}}],[\"比较\",{\"0\":{\"58\":1}}],[\";\",{\"1\":{\"57\":3,\"58\":6}}],[\"x\",{\"1\":{\"57\":1}}],[\"git\",{\"1\":{\"58\":2}}],[\"g\",{\"1\":{\"57\":1}}],[\"export\",{\"1\":{\"58\":2}}],[\"echo\",{\"1\":{\"57\":1,\"58\":2}}],[\"e\",{\"1\":{\"57\":1,\"58\":8}}],[\"s\",{\"1\":{\"57\":1,\"58\":1}}],[\"sed\",{\"1\":{\"57\":1}}],[\"sum\",{\"1\":{\"18\":1}}],[\"5\",{\"1\":{\"57\":1}}],[\"|\",{\"1\":{\"57\":3,\"58\":1}}],[\"\\\"\",{\"1\":{\"57\":12,\"58\":2}}],[\"'\",{\"1\":{\"57\":2,\"58\":6}}],[\"及\",{\"1\":{\"57\":1}}],[\"保存\",{\"1\":{\"57\":1}}],[\"u\",{\"1\":{\"58\":1}}],[\"uid\",{\"1\":{\"57\":1}}],[\"user\",{\"1\":{\"57\":1}}],[\"%\",{\"1\":{\"57\":5,\"58\":4}}],[\"属性\",{\"1\":{\"57\":1}}],[\"特殊\",{\"1\":{\"57\":1}}],[\"work\",{\"1\":{\"58\":1}}],[\"who\",{\"1\":{\"57\":1}}],[\"w\",{\"1\":{\"57\":1,\"58\":1}}],[\"will\",{\"1\":{\"26\":1}}],[\"apple\",{\"0\":{\"93\":1}}],[\"awk\",{\"1\":{\"57\":1}}],[\"am\",{\"1\":{\"57\":1}}],[\"a\",{\"1\":{\"57\":2}}],[\"as\",{\"1\":{\"26\":1}}],[\"cut\",{\"1\":{\"58\":1}}],[\"cmd\",{\"1\":{\"57\":2}}],[\"command\",{\"1\":{\"57\":1}}],[\"chattr\",{\"1\":{\"57\":1}}],[\"chmod\",{\"1\":{\"57\":1}}],[\"cdots\",{\"1\":{\"18\":1}}],[\">\",{\"1\":{\"57\":5,\"58\":1}}],[\"—\",{\"1\":{\"57\":4}}],[\"权限\",{\"1\":{\"57\":1}}],[\"写\",{\"1\":{\"57\":1}}],[\"写作\",{\"1\":{\"13\":1,\"14\":1,\"27\":1}}],[\"所有人\",{\"1\":{\"57\":1}}],[\"所在\",{\"1\":{\"56\":1}}],[\"赋予\",{\"1\":{\"57\":2}}],[\"赋值\",{\"1\":{\"53\":1}}],[\"var\",{\"1\":{\"57\":2}}],[\"vue\",{\"1\":{\"29\":2}}],[\"vuepress\",{\"0\":{\"13\":1},\"1\":{\"9\":2,\"11\":2,\"12\":1,\"13\":2,\"14\":1,\"28\":1}}],[\"给\",{\"1\":{\"57\":2}}],[\"目录\",{\"1\":{\"57\":3}}],[\"#\",{\"1\":{\"57\":13}}],[\"dev\",{\"1\":{\"57\":1,\"58\":1}}],[\"date\",{\"1\":{\"57\":2,\"58\":1}}],[\"dt\",{\"1\":{\"57\":2}}],[\"d\",{\"1\":{\"57\":2,\"58\":1}}],[\"!\",{\"1\":{\"57\":1}}],[\"历史\",{\"0\":{\"57\":1}}],[\"历史记录\",{\"1\":{\"56\":1,\"57\":1}}],[\"提示\",{\"1\":{\"56\":1}}],[\"提供\",{\"1\":{\"14\":1}}],[\"当前\",{\"1\":{\"56\":1}}],[\"地址\",{\"1\":{\"56\":1}}],[\"用户\",{\"1\":{\"56\":1}}],[\"命令行\",{\"0\":{\"57\":1}}],[\"命令\",{\"1\":{\"56\":1,\"57\":1}}],[\"环境\",{\"1\":{\"56\":1}}],[\"常用\",{\"0\":{\"56\":1}}],[\"banana\",{\"0\":{\"94\":1}}],[\"bash\",{\"0\":{\"56\":1}}],[\"be\",{\"1\":{\"26\":1}}],[\"基础\",{\"2\":{\"54\":1}}],[\"其他\",{\"1\":{\"53\":1}}],[\"传递\",{\"1\":{\"53\":1}}],[\"参数\",{\"1\":{\"53\":1}}],[\"函数\",{\"1\":{\"53\":1}}],[\"作为\",{\"1\":{\"53\":1}}],[\"作者\",{\"1\":{\"27\":1}}],[\"初始化\",{\"1\":{\"53\":1}}],[\"销毁\",{\"1\":{\"53\":1}}],[\"操作\",{\"1\":{\"53\":1}}],[\"应该\",{\"1\":{\"53\":1}}],[\"什么\",{\"1\":{\"53\":2}}],[\"值\",{\"1\":{\"53\":1}}],[\"？\",{\"0\":{\"52\":1},\"1\":{\"53\":6}}],[\"类型\",{\"0\":{\"53\":1},\"1\":{\"53\":5}}],[\"类\",{\"0\":{\"52\":1,\"53\":1}}],[\"设计\",{\"0\":{\"52\":1,\"53\":2}}],[\"设置\",{\"1\":{\"3\":1,\"20\":1,\"26\":1,\"27\":2,\"57\":2}}],[\"蔬菜\",{\"2\":{\"50\":1}}],[\"番茄\",{\"0\":{\"47\":1}}],[\"草莓\",{\"0\":{\"42\":1},\"2\":{\"45\":1}}],[\"大\",{\"2\":{\"41\":1,\"65\":1,\"70\":1}}],[\"大小\",{\"1\":{\"20\":1}}],[\"水果\",{\"2\":{\"40\":1,\"45\":1,\"64\":1,\"69\":1,\"74\":1,\"79\":1}}],[\"火龙果\",{\"0\":{\"37\":1},\"2\":{\"40\":1}}],[\"圆\",{\"2\":{\"36\":1,\"51\":1,\"55\":1,\"65\":1,\"70\":1}}],[\"小\",{\"2\":{\"36\":1,\"46\":1}}],[\"红\",{\"2\":{\"36\":1,\"41\":1,\"46\":1,\"51\":1,\"65\":1,\"70\":1}}],[\"35\",{\"1\":{\"58\":1}}],[\"34\",{\"1\":{\"58\":1}}],[\"32\",{\"1\":{\"58\":1}}],[\"33\",{\"1\":{\"58\":1}}],[\"3\",{\"0\":{\"34\":1,\"39\":1,\"44\":1,\"49\":1,\"61\":1,\"63\":1,\"68\":1,\"73\":1,\"78\":1,\"81\":1,\"83\":1,\"88\":1}}],[\"樱桃\",{\"0\":{\"32\":1},\"2\":{\"35\":1}}],[\"：\",{\"1\":{\"29\":1}}],[\"意味着\",{\"1\":{\"29\":1}}],[\"都\",{\"1\":{\"29\":1}}],[\"绝对\",{\"1\":{\"28\":1}}],[\"posts\",{\"0\":{\"92\":1}}],[\"ps1\",{\"0\":{\"58\":1},\"1\":{\"58\":2}}],[\"print\",{\"1\":{\"57\":1}}],[\"prompt\",{\"1\":{\"57\":1}}],[\"p\",{\"1\":{\"57\":1}}],[\"public\",{\"1\":{\"28\":1}}],[\"parse\",{\"1\":{\"58\":1}}],[\"partial\",{\"1\":{\"18\":2}}],[\"page\",{\"1\":{\"26\":1}}],[\"引用\",{\"1\":{\"28\":2}}],[\"引入\",{\"1\":{\"11\":1,\"28\":1,\"29\":1}}],[\"相对路径\",{\"1\":{\"28\":1}}],[\"书写\",{\"1\":{\"28\":1}}],[\"这\",{\"1\":{\"29\":1}}],[\"这里\",{\"1\":{\"28\":1,\"33\":1,\"34\":1,\"38\":1,\"39\":1,\"43\":1,\"44\":1,\"48\":1,\"49\":1,\"62\":1,\"63\":1,\"67\":1,\"68\":1,\"72\":1,\"73\":1,\"77\":1,\"78\":1,\"82\":1,\"83\":1,\"87\":1,\"88\":1}}],[\"这些\",{\"1\":{\"13\":1}}],[\"自己\",{\"1\":{\"29\":1,\"57\":1}}],[\"自由\",{\"1\":{\"28\":1}}],[\"自定义\",{\"1\":{\"6\":1}}],[\"标识\",{\"0\":{\"58\":1}}],[\"标签\",{\"1\":{\"27\":1}}],[\"标题\",{\"0\":{\"26\":1,\"33\":1,\"34\":1,\"38\":1,\"39\":1,\"43\":1,\"44\":1,\"48\":1,\"49\":1,\"62\":1,\"63\":1,\"67\":1,\"68\":1,\"72\":1,\"73\":1,\"77\":1,\"78\":1,\"82\":1,\"83\":1,\"87\":1,\"88\":1},\"1\":{\"6\":2,\"26\":4}}],[\"”\",{\"1\":{\"27\":3}}],[\"“\",{\"1\":{\"27\":3}}],[\"分类\",{\"1\":{\"27\":1}}],[\"日志\",{\"1\":{\"57\":1}}],[\"日\",{\"1\":{\"27\":1}}],[\"日期\",{\"1\":{\"27\":1}}],[\"月\",{\"1\":{\"27\":1}}],[\"年\",{\"1\":{\"27\":1}}],[\"第一个\",{\"1\":{\"26\":1}}],[\"h\",{\"1\":{\"58\":1}}],[\"hostname\",{\"1\":{\"58\":1}}],[\"host\",{\"1\":{\"58\":2}}],[\"hope\",{\"1\":{\"27\":1}}],[\"history\",{\"1\":{\"57\":5}}],[\"histdir\",{\"1\":{\"57\":6}}],[\"h1\",{\"1\":{\"26\":2}}],[\"h2o\",{\"1\":{\"21\":1}}],[\"found\",{\"1\":{\"91\":1}}],[\"function\",{\"1\":{\"58\":2}}],[\"f\",{\"1\":{\"57\":1,\"58\":2}}],[\"file\",{\"1\":{\"57\":2}}],[\"fi\",{\"1\":{\"57\":1,\"58\":1}}],[\"first\",{\"1\":{\"26\":1}}],[\"frac\",{\"1\":{\"18\":4}}],[\"frontmatter\",{\"1\":{\"3\":1,\"6\":1,\"11\":4,\"26\":1,\"27\":1}}],[\"摘要\",{\"1\":{\"25\":1}}],[\"视为\",{\"1\":{\"25\":1,\"26\":1}}],[\"被\",{\"1\":{\"25\":1,\"26\":1,\"29\":1,\"53\":1,\"76\":1}}],[\"之前\",{\"1\":{\"25\":1}}],[\"注释\",{\"1\":{\"25\":1}}],[\"m\",{\"1\":{\"57\":1,\"58\":9}}],[\"mkdir\",{\"1\":{\"57\":1}}],[\"ms\",{\"1\":{\"27\":1}}],[\"more\",{\"1\":{\"25\":1}}],[\"markdown\",{\"0\":{\"9\":1,\"10\":1,\"11\":1,\"12\":1},\"1\":{\"9\":2,\"10\":3,\"11\":1,\"12\":3,\"13\":2,\"14\":1,\"26\":3,\"27\":1,\"28\":2,\"29\":2},\"2\":{\"24\":1}}],[\"组件\",{\"0\":{\"22\":1,\"29\":1},\"1\":{\"29\":2}}],[\"角标\",{\"0\":{\"21\":1}}],[\"颜色\",{\"1\":{\"20\":1}}],[\"支持\",{\"1\":{\"20\":1,\"53\":1}}],[\"增强\",{\"0\":{\"20\":1}}],[\"图片\",{\"0\":{\"20\":1},\"1\":{\"20\":1,\"28\":3}}],[\"2020\",{\"1\":{\"27\":1}}],[\"2\",{\"0\":{\"33\":1,\"38\":1,\"43\":1,\"48\":1,\"62\":1,\"67\":1,\"72\":1,\"76\":1,\"77\":1,\"82\":1,\"87\":1},\"1\":{\"19\":1,\"57\":2}}],[\"计划\",{\"1\":{\"19\":2}}],[\"任务\",{\"0\":{\"19\":1}}],[\"is\",{\"1\":{\"58\":1}}],[\"if\",{\"1\":{\"57\":1,\"58\":1}}],[\"ip\",{\"1\":{\"56\":1,\"58\":4}}],[\"inside\",{\"1\":{\"58\":1}}],[\"in\",{\"1\":{\"26\":1}}],[\"i\",{\"1\":{\"18\":5,\"29\":1,\"57\":1,\"58\":1}}],[\"it\",{\"1\":{\"12\":2}}],[\"_\",{\"1\":{\"18\":1,\"57\":3,\"58\":9}}],[\"+\",{\"1\":{\"18\":2,\"29\":1,\"57\":4,\"58\":1}}],[\"linux\",{\"0\":{\"56\":1},\"1\":{\"56\":1},\"2\":{\"59\":1}}],[\"log\",{\"1\":{\"18\":2,\"57\":1}}],[\"left\",{\"1\":{\"18\":3}}],[\"=\",{\"1\":{\"18\":2,\"57\":4,\"58\":2}}],[\"y\",{\"1\":{\"18\":4,\"57\":1}}],[\"omega\",{\"1\":{\"18\":6}}],[\"}\",{\"1\":{\"18\":13,\"29\":4,\"57\":3,\"58\":2}}],[\"rev\",{\"1\":{\"58\":1}}],[\"read\",{\"1\":{\"57\":1}}],[\"readonly\",{\"1\":{\"57\":3}}],[\"regarded\",{\"1\":{\"26\":1}}],[\"right\",{\"1\":{\"18\":3}}],[\"r\",{\"1\":{\"18\":7}}],[\"^\",{\"1\":{\"18\":9}}],[\"{\",{\"1\":{\"18\":13,\"29\":4,\"57\":3,\"58\":2}}],[\"\\\\\",{\"1\":{\"18\":22,\"57\":7,\"58\":11}}],[\"$\",{\"1\":{\"18\":4,\"57\":16,\"58\":6}}],[\"tree\",{\"1\":{\"58\":1}}],[\"tm\",{\"1\":{\"58\":2}}],[\"tell\",{\"1\":{\"58\":4}}],[\"tex\",{\"0\":{\"18\":1}}],[\"t\",{\"1\":{\"57\":1}}],[\"title\",{\"1\":{\"26\":3}}],[\"then\",{\"1\":{\"57\":1,\"58\":1}}],[\"the\",{\"1\":{\"26\":1}}],[\"th\",{\"1\":{\"21\":1}}],[\"toc\",{\"1\":{\"6\":1}}],[\"导入\",{\"0\":{\"17\":1}}],[\"导航\",{\"1\":{\"3\":2,\"6\":2}}],[\".\",{\"1\":{\"16\":1,\"26\":1,\"27\":1,\"28\":1,\"57\":1}}],[\"]\",{\"1\":{\"16\":1,\"57\":2}}],[\"10\",{\"1\":{\"76\":1}}],[\"19\",{\"1\":{\"21\":1}}],[\"1\",{\"0\":{\"71\":1},\"1\":{\"16\":1,\"18\":3,\"19\":1,\"27\":2,\"29\":2,\"57\":2,\"58\":5}}],[\"[\",{\"1\":{\"16\":1,\"57\":2,\"58\":8}}],[\"有\",{\"1\":{\"16\":1}}],[\"脚注\",{\"0\":{\"16\":1},\"1\":{\"16\":1}}],[\"查看\",{\"1\":{\"15\":1,\"16\":1,\"17\":1,\"18\":1,\"19\":1,\"20\":1,\"21\":1}}],[\"多\",{\"1\":{\"14\":1}}],[\"更加\",{\"1\":{\"14\":1}}],[\"更\",{\"1\":{\"14\":1}}],[\"更新\",{\"1\":{\"3\":1,\"6\":1}}],[\"关于\",{\"1\":{\"13\":1}}],[\"进行\",{\"1\":{\"13\":1,\"28\":2,\"53\":2}}],[\"对象\",{\"1\":{\"53\":2}}],[\"对于\",{\"1\":{\"28\":1}}],[\"对\",{\"1\":{\"13\":1}}],[\"丰富\",{\"1\":{\"13\":1,\"14\":1}}],[\"语法\",{\"0\":{\"18\":1},\"1\":{\"12\":1,\"13\":1,\"14\":1,\"29\":1}}],[\"实现\",{\"1\":{\"12\":1}}],[\"插件\",{\"1\":{\"12\":1,\"14\":1}}],[\"借助于\",{\"1\":{\"12\":1}}],[\"内容\",{\"0\":{\"28\":1},\"1\":{\"12\":1,\"25\":1,\"33\":1,\"34\":1,\"38\":1,\"39\":1,\"43\":1,\"44\":1,\"48\":1,\"49\":1,\"62\":1,\"63\":1,\"67\":1,\"68\":1,\"72\":1,\"73\":1,\"77\":1,\"78\":1,\"82\":1,\"83\":1,\"87\":1,\"88\":1}}],[\"解析\",{\"1\":{\"12\":1}}],[\"来\",{\"1\":{\"12\":2}}],[\"-\",{\"1\":{\"12\":2,\"18\":3,\"26\":6,\"57\":8,\"58\":9}}],[\"会\",{\"1\":{\"12\":1,\"26\":1,\"29\":1}}],[\"扩展\",{\"0\":{\"12\":1,\"13\":1,\"14\":1},\"1\":{\"12\":1,\"13\":3,\"14\":1}}],[\"详情\",{\"1\":{\"11\":1,\"15\":1,\"16\":1,\"17\":1,\"18\":1,\"19\":1,\"20\":1,\"21\":1}}],[\"概念\",{\"1\":{\"11\":1}}],[\"重要\",{\"1\":{\"11\":1}}],[\"很\",{\"1\":{\"11\":1}}],[\"阅读\",{\"1\":{\"10\":1,\"11\":1,\"13\":1}}],[\"先\",{\"1\":{\"10\":1}}],[\"请\",{\"1\":{\"10\":1,\"11\":1,\"13\":1,\"28\":1}}],[\"不会\",{\"1\":{\"10\":1}}],[\"不同\",{\"1\":{\"9\":1}}],[\"还\",{\"1\":{\"10\":1}}],[\"新手\",{\"1\":{\"10\":1}}],[\"是\",{\"1\":{\"10\":1,\"11\":1,\"33\":1,\"34\":1,\"38\":1,\"39\":1,\"43\":1,\"44\":1,\"48\":1,\"49\":1,\"53\":1,\"62\":1,\"63\":1,\"67\":1,\"68\":1,\"72\":1,\"73\":1,\"77\":1,\"78\":1,\"82\":1,\"83\":1,\"87\":1,\"88\":1}}],[\"如何\",{\"0\":{\"52\":1},\"1\":{\"53\":4}}],[\"如果\",{\"1\":{\"10\":1,\"57\":1}}],[\"如下\",{\"1\":{\"3\":1}}],[\"为空\",{\"1\":{\"57\":1}}],[\"为了\",{\"1\":{\"13\":1}}],[\"为\",{\"1\":{\"9\":1,\"11\":1,\"20\":1,\"27\":4,\"29\":1,\"53\":1}}],[\"转换\",{\"1\":{\"9\":1,\"29\":1,\"53\":1}}],[\"结构\",{\"1\":{\"9\":1}}],[\"根据\",{\"1\":{\"9\":1}}],[\"以及\",{\"1\":{\"56\":1}}],[\"以值\",{\"1\":{\"53\":1}}],[\"以便\",{\"1\":{\"9\":1}}],[\"以下\",{\"1\":{\"6\":1}}],[\"编程\",{\"2\":{\"54\":1}}],[\"编写\",{\"1\":{\"9\":1,\"10\":1}}],[\"编辑\",{\"1\":{\"3\":1}}],[\"并\",{\"1\":{\"9\":1,\"29\":1}}],[\"创建\",{\"1\":{\"9\":1,\"29\":1,\"53\":1}}],[\"需要\",{\"1\":{\"9\":1}}],[\"站点\",{\"1\":{\"9\":1}}],[\"博客\",{\"1\":{\"9\":1}}],[\"或\",{\"1\":{\"9\":1}}],[\"轻松\",{\"1\":{\"9\":1}}],[\"它\",{\"1\":{\"9\":1}}],[\"它们\",{\"1\":{\"6\":1,\"9\":1}}],[\"使用\",{\"1\":{\"9\":1,\"12\":1,\"28\":2,\"29\":1}}],[\"使用指南\",{\"1\":{\"27\":2},\"2\":{\"2\":1,\"4\":1,\"23\":1,\"30\":1,\"31\":1}}],[\"因此\",{\"1\":{\"9\":1,\"12\":1}}],[\"生成\",{\"1\":{\"9\":2}}],[\"文字\",{\"1\":{\"16\":1}}],[\"文档\",{\"1\":{\"9\":1,\"13\":1}}],[\"文件名称\",{\"1\":{\"57\":1}}],[\"文件夹\",{\"1\":{\"28\":1}}],[\"文件\",{\"0\":{\"17\":1},\"1\":{\"9\":2,\"28\":1}}],[\"文章\",{\"1\":{\"6\":1,\"25\":1,\"76\":1}}],[\"从\",{\"1\":{\"9\":1}}],[\"主要\",{\"1\":{\"9\":1}}],[\"主题\",{\"0\":{\"14\":1},\"1\":{\"6\":2,\"14\":1}}],[\"展示\",{\"0\":{\"9\":1}}],[\"指南\",{\"2\":{\"7\":1}}],[\"中\",{\"1\":{\"6\":1,\"11\":1,\"13\":1,\"26\":2,\"27\":1,\"29\":1}}],[\"选项卡\",{\"0\":{\"15\":1}}],[\"选项\",{\"1\":{\"6\":1}}],[\"打印\",{\"1\":{\"6\":1}}],[\"模式\",{\"1\":{\"6\":1,\"20\":1}}],[\"夜间\",{\"1\":{\"6\":1}}],[\"带有\",{\"1\":{\"6\":1}}],[\"也\",{\"1\":{\"6\":1,\"29\":1}}],[\"元素\",{\"1\":{\"6\":1}}],[\"元\",{\"1\":{\"6\":1}}],[\"等\",{\"1\":{\"6\":1}}],[\"、\",{\"1\":{\"6\":1,\"53\":2,\"56\":3}}],[\")\",{\"1\":{\"6\":1,\"18\":6,\"57\":4,\"58\":4}}],[\"列表\",{\"0\":{\"19\":1},\"1\":{\"6\":1}}],[\"(\",{\"1\":{\"6\":1,\"18\":6,\"57\":4,\"58\":4}}],[\"包含\",{\"1\":{\"6\":1}}],[\"包括\",{\"1\":{\"6\":1}}],[\"每个\",{\"1\":{\"6\":1,\"11\":1,\"29\":1}}],[\"同时\",{\"1\":{\"6\":1}}],[\"按钮\",{\"1\":{\"3\":1,\"6\":3}}],[\"顶部\",{\"1\":{\"3\":1,\"6\":1}}],[\"返回\",{\"1\":{\"3\":1,\"6\":1}}],[\"评论\",{\"1\":{\"3\":1,\"6\":1}}],[\"下\",{\"1\":{\"3\":1}}],[\"/\",{\"1\":{\"3\":1,\"28\":2,\"57\":10,\"58\":2}}],[\"一起\",{\"1\":{\"28\":1}}],[\"一篇\",{\"1\":{\"3\":2}}],[\"一个\",{\"1\":{\"3\":1,\"10\":1,\"11\":1,\"29\":1,\"76\":1}}],[\"上下\",{\"0\":{\"21\":1}}],[\"上\",{\"1\":{\"3\":1}}],[\"时间\",{\"1\":{\"3\":1,\"6\":1,\"56\":1}}],[\"链接\",{\"1\":{\"3\":2,\"28\":1}}],[\"此\",{\"1\":{\"16\":1,\"53\":4}}],[\"此页\",{\"1\":{\"3\":1}}],[\"此处\",{\"1\":{\"0\":1}}],[\"贡献者\",{\"1\":{\"3\":1,\"6\":1}}],[\"信息\",{\"0\":{\"27\":1},\"1\":{\"3\":1,\"6\":2,\"27\":1}}],[\"路径\",{\"1\":{\"3\":1,\"6\":1,\"56\":1,\"57\":2}}],[\"侧边\",{\"1\":{\"3\":1,\"6\":1}}],[\"栏\",{\"1\":{\"3\":2,\"6\":2}}],[\":\",{\"1\":{\"3\":1,\"6\":3,\"26\":1,\"58\":3}}],[\"了解\",{\"1\":{\"11\":1}}],[\"了\",{\"1\":{\"3\":1,\"13\":1,\"14\":1,\"76\":1}}],[\"示例\",{\"1\":{\"3\":1}}],[\"就是\",{\"0\":{\"53\":1},\"1\":{\"3\":1}}],[\"本\",{\"1\":{\"3\":1}}],[\",\",{\"1\":{\"3\":12,\"6\":14,\"9\":1,\"11\":2,\"13\":1,\"16\":1,\"18\":1,\"19\":2,\"20\":1,\"21\":1,\"26\":3,\"27\":4,\"28\":3,\"29\":3},\"2\":{\"31\":1,\"36\":2,\"40\":1,\"41\":1,\"45\":1,\"46\":1,\"51\":1,\"54\":1,\"64\":1,\"65\":2,\"69\":1,\"70\":2,\"74\":1,\"75\":2,\"79\":1,\"80\":2,\"85\":2,\"90\":2}}],[\"，\",{\"1\":{\"3\":2,\"9\":2,\"10\":2,\"11\":1,\"12\":1,\"13\":2,\"14\":2,\"28\":1,\"29\":1,\"53\":1,\"56\":1}}],[\" \",{\"0\":{\"9\":1,\"10\":1,\"11\":1,\"12\":1,\"13\":1,\"18\":1,\"33\":1,\"34\":1,\"38\":1,\"39\":1,\"43\":1,\"44\":1,\"48\":1,\"49\":1,\"56\":1,\"61\":1,\"62\":1,\"63\":1,\"66\":1,\"67\":1,\"68\":1,\"71\":1,\"72\":1,\"73\":1,\"76\":1,\"77\":1,\"78\":1,\"81\":1,\"82\":1,\"83\":1,\"86\":1,\"87\":1,\"88\":1},\"1\":{\"3\":2,\"6\":3,\"9\":6,\"10\":6,\"11\":11,\"12\":9,\"13\":7,\"14\":4,\"18\":25,\"19\":4,\"21\":1,\"25\":1,\"26\":21,\"27\":15,\"28\":7,\"29\":14,\"53\":5,\"57\":60,\"58\":34,\"76\":2,\"91\":2}}],[\"通过\",{\"1\":{\"3\":1,\"11\":1,\"14\":1}}],[\"可以\",{\"1\":{\"3\":1,\"6\":1,\"9\":2,\"12\":1,\"26\":1,\"27\":1,\"28\":2,\"29\":2}}],[\"禁用\",{\"0\":{\"3\":1},\"1\":{\"3\":2},\"2\":{\"5\":1}}],[\"与\",{\"0\":{\"3\":1},\"1\":{\"3\":1}}],[\"布局\",{\"0\":{\"3\":1,\"6\":1},\"1\":{\"3\":1,\"6\":1},\"2\":{\"8\":1}}],[\"演示\",{\"0\":{\"1\":1},\"1\":{\"10\":1}}],[\"配置\",{\"0\":{\"1\":1,\"11\":1,\"25\":1,\"56\":1},\"1\":{\"11\":1,\"27\":1},\"2\":{\"31\":1}}],[\"功能\",{\"0\":{\"1\":1,\"3\":1},\"1\":{\"3\":2,\"14\":1}}],[\"。\",{\"1\":{\"0\":1,\"3\":1,\"6\":1,\"9\":3,\"10\":1,\"11\":2,\"12\":1,\"13\":2,\"14\":1,\"20\":1,\"25\":1,\"26\":2,\"27\":2,\"28\":3,\"29\":1,\"33\":1,\"34\":1,\"38\":1,\"39\":1,\"43\":1,\"44\":1,\"48\":1,\"49\":1,\"62\":1,\"63\":1,\"67\":1,\"68\":1,\"72\":1,\"73\":1,\"76\":1,\"77\":1,\"78\":1,\"82\":1,\"83\":1,\"87\":1,\"88\":1}}],[\"在\",{\"1\":{\"0\":1,\"3\":1,\"6\":1,\"26\":1,\"27\":1,\"28\":2,\"29\":1}}],[\"放置\",{\"1\":{\"0\":1,\"28\":1}}],[\"档案\",{\"1\":{\"0\":1}}],[\"和\",{\"1\":{\"0\":1,\"6\":2,\"10\":1,\"20\":1,\"27\":1,\"28\":1}}],[\"个人\",{\"1\":{\"0\":1}}],[\"的\",{\"0\":{\"58\":1},\"1\":{\"0\":1,\"3\":1,\"6\":1,\"9\":1,\"11\":1,\"13\":1,\"14\":1,\"25\":1,\"26\":2,\"27\":1,\"28\":2,\"29\":1,\"53\":3,\"56\":1,\"57\":2,\"76\":1},\"2\":{\"75\":1,\"80\":1,\"85\":1,\"90\":1}}],[\"你\",{\"1\":{\"0\":1,\"3\":1,\"6\":1,\"9\":2,\"10\":1,\"26\":1,\"27\":1,\"28\":3,\"29\":3}}],[\"将\",{\"1\":{\"0\":1,\"9\":1,\"28\":1}}],[\"页脚\",{\"1\":{\"3\":1,\"6\":1}}],[\"页面\",{\"0\":{\"25\":1,\"26\":1,\"27\":1,\"28\":1},\"1\":{\"3\":4,\"6\":4,\"9\":2,\"11\":1,\"26\":3,\"27\":2,\"29\":1},\"2\":{\"31\":1}}],[\"页\",{\"0\":{\"0\":1}}],[\"介绍\",{\"0\":{\"0\":1,\"10\":1},\"1\":{\"0\":1,\"10\":1,\"11\":1}}]],\"version\":2}}")).map(([e,t])=>[e,It(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n,id:o}})=>{const r=Ct[s];e==="suggest"?self.postMessage([e,o,et(t,r,n)]):e==="search"?self.postMessage([e,o,tt(t,r,n)]):self.postMessage({suggestions:[e,o,et(t,r,n)],results:[e,o,tt(t,r,n)]})};
//# sourceMappingURL=index.js.map
