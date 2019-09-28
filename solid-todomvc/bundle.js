!function(){"use strict";function e(e,t){m(e,t,!1)}function t(e,t,n){var{node:o,value:l}=m(e,t,!1,n);return null===o?()=>l:()=>{if(null!==c){const e=o.state;if(0!=(7&e)&&b(o),o.age===s.time&&8===e)throw new Error("Circular dependency.");0==(16&e)&&(null===o.log&&(o.log={node1:null,node1slot:0,nodes:null,nodeslots:null}),w(o.log))}return o.value}}function n(e,t){let n,o=0===e.length?null:function(){null===l||(null!==u?s.disposes.add(l):I(l))},l=null===o?p:y(),r=c,i=t||d;l!==i&&(l.owner=i),d=l;try{c=null,n=null===o?e():e(o)}finally{c=r,d=l.owner}return null!==o&&v(l,null,void 0,!0)&&(l=null),n}function o(e){let t,n=c;return c=null,t=e(),c=n,t}function l(e){null===d?console.warn("cleanups created without a root or parent will never be run"):null===d.cleanups?d.cleanups=[e]:d.cleanups.push(e)}class r{constructor(e){this.value=e,this.pending=h,this.log=null}current(){return null!==c&&(null===this.log&&(this.log={node1:null,node1slot:0,nodes:null,nodeslots:null}),w(this.log)),this.value}next(e){if(null!==u)if(this.pending!==h){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,s.changes.add(this);else null!==this.log?(this.pending=e,s.changes.add(this),C()):this.value=e;return e}}class i{constructor(){this.items=[],this.count=0}reset(){this.count=0}add(e){this.items[this.count++]=e}run(e){let t=this.items;for(let n=0;n<this.count;n++)e(t[n]),t[n]=null;this.count=0}}let s={time:0,changes:new i,updates:new i,disposes:new i},u=null,c=null,d=null,a=null,f=null,h={},p={fn:null,age:-1,state:0,source1:null,source1slot:0,sources:null,sourceslots:null,dependents:null,dependentslot:0,dependentcount:0,owner:null,owned:null,log:null,value:void 0,comparator:void 0,context:void 0,cleanups:null};var g={node:null,value:void 0};function m(e,t,n,o){const l=y(),r=c,i=null===u;l.owner=d,l.comparator=o,d=l,c=n?null:l,t=i?function(e,t){u=s,s.changes.reset(),s.updates.reset();try{return e(t)}finally{d=c=u=null}}(e,t):e(t),d=l.owner,c=r;var a=v(l,e,t,!1);return i&&function(e,t){if(0!==s.changes.count||0!==s.updates.count||0!==s.disposes.count)try{A(s)}finally{u=null,d=e,c=t}}(d,r),g.node=a?null:l,g.value=t,g}function y(){let e=f;return null===e?e={fn:null,age:-1,state:0,source1:null,source1slot:0,sources:null,sourceslots:null,dependents:null,dependentslot:0,dependentcount:0,owner:null,owned:null,log:null,value:void 0,comparator:void 0,context:void 0,cleanups:null}:f=null,e}function v(e,t,n,o){let l,r=o||null===d||d===p?null:d,i=!e.noRecycle&&null===e.source1&&(null===e.owned&&null===e.cleanups||null!==r);if(i){if(f=e,e.owner=null,P(e,31),null!==r){if(null!==e.owned){if(null===r.owned)r.owned=e.owned;else for(l=0;l<e.owned.length;l++)r.owned.push(e.owned[l]);e.owned=null}if(null!==e.cleanups){if(null===r.cleanups)r.cleanups=e.cleanups;else for(l=0;l<e.cleanups.length;l++)r.cleanups.push(e.cleanups[l]);e.cleanups=null}}}else e.fn=t,e.value=n,e.age=s.time,null!==r&&(null===r.owned?r.owned=[e]:r.owned.push(e));return i}function w(e){let t,n=c,o=null===n.source1?-1:null===n.sources?0:n.sources.length;if(null===e.node1)e.node1=n,e.node1slot=o,t=-1;else if(null===e.nodes){if(e.node1===n)return;e.nodes=[n],e.nodeslots=[o],t=0}else{if(t=e.nodes.length,e.nodes[t-1]===n)return;e.nodes.push(n),e.nodeslots.push(o)}null===n.source1?(n.source1=e,n.source1slot=t):null===n.sources?(n.sources=[e],n.sourceslots=[t]):(n.sources.push(e),n.sourceslots.push(t))}function b(e){0!=(6&e.state)&&function(e){if(0!=(4&e.state)){const t=e.owner;0!=(7&t.state)&&b(t),e.state&=-5}if(0!=(2&e.state)){const t=e.dependents;for(let n=e.dependentslot,o=e.dependentcount;n<o;n++){const e=t[n];null!=e&&b(e),t[n]=null}e.state&=-3}}(e),0!=(1&e.state)&&x(e),P(e,31)}function C(){let e=d;s.updates.reset();try{A(s)}finally{u=c=null,d=e}}function A(e){let t=u,n=0;for(u=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(e.time++,e.changes.run(k),e.updates.run(x),e.disposes.run(I),n++>1e5)throw new Error("Runaway clock detected");u=t}function k(e){e.value=e.pending,e.pending=h,e.log&&M(e.log,T)}function x(e){const t=e.state;if(0==(16&t))if(0!=(2&t))e.dependents[e.dependentslot++]=null,e.dependentslot===e.dependentcount&&P(e,14);else if(0!=(1&t))if(0!=(4&t))b(e);else if(e.comparator){const t=_(e);(0,e.comparator)(t,e.value)||j(e,!1,!0)}else _(e)}function _(e){const t=e.value,n=d,o=c;return d=c=e,e.state=8,E(e,!1),e.value=e.fn(e.value),P(e,31),d=n,c=o,t}function T(e){const t=s.time;e.age<t&&(e.state|=1,e.age=t,N(e,!!e.comparator))}function S(e){const t=s.time;if(e.age<t){e.state|=2,(e.dependents||(e.dependents=[]))[e.dependentcount++]=a,N(e,!0)}}function N(e,t){if(s.updates.add(e),e.comparator){const t=a;a=e,j(e,!0,!1),a=t}else j(e,t,!1)}function O(e){if(0!=(2&e.state)){e.state=1;const t=s.time;e.age<t&&(e.age=t,e.comparator||j(e,!1,!0))}}function j(e,t,n){const o=e.owned;if(null!==o){!function e(t,n,o){for(let l=0,r=t.length;l<r;l++){const r=t[l];if(null!==r){n?0==(16&r.state)&&(r.state|=4):(r.age=o,r.state=16);const t=r.owned;null!==t&&e(t,n,o)}}}(o,t&&!n,s.time)}const l=e.log;null!==l&&M(l,n?O:t?S:T)}function M(e,t){const n=e.node1,o=e.nodes;if(null!==n&&t(n),null!==o)for(let e=0,n=o.length;e<n;e++)t(o[e])}function E(e,t){let n,o,l=e.source1,r=e.sources,i=e.sourceslots,s=e.cleanups,u=e.owned;if(null!==s){for(n=0;n<s.length;n++)s[n](t);e.cleanups=null}if(null!==u){for(n=0;n<u.length;n++)I(u[n]);e.owned=null}if(null!==l&&(B(l,e.source1slot),e.source1=null),null!==r)for(n=0,o=r.length;n<o;n++)B(r.pop(),i.pop())}function B(e,t){let n,o,l=e.nodes,r=e.nodeslots;-1===t?e.node1=null:(n=l.pop(),o=r.pop(),t!==l.length&&(l[t]=n,r[t]=o,-1===o?n.source1slot=t:n.sourceslots[o]=t))}function P(e,t){e.state&=~t,e.dependentslot=0,e.dependentcount=0}function I(e){e.fn=null,e.log=null,e.dependents=null,E(e,!0),P(e,31)}const L=Symbol("solid-node"),H=Symbol("solid-proxy");function $(e){return e[H]||(e[H]=new Proxy(e,R))}function z(e){return null!==e&&"object"==typeof e&&(e.__proto__===Object.prototype||Array.isArray(e))}function F(e){let t,n,o;if(t=null!=e&&e._state)return t;if(!z(e))return e;if(Array.isArray(e)){Object.isFrozen(e)&&(e=e.slice(0));for(let t=0,l=e.length;t<l;t++)(n=F(o=e[t]))!==o&&(e[t]=n)}else{Object.isFrozen(e)&&(e=Object.assign({},e));let t=Object.keys(e);for(let l=0,r=t.length;l<r;l++)(n=F(o=e[t[l]]))!==o&&(e[t[l]]=n)}return e}function J(e){let t=e[L];return t||(e[L]=t={}),t}const R={get(e,t){if("_state"===t)return e;if(t===H||t===L)return;const n=e[t],o=z(n);if(null!==c&&("function"!=typeof n||e.hasOwnProperty(t))){let l,i;o&&(l=J(n))&&(i=l._||(l._=new r)).current(),(i=(l=J(e))[t]||(l[t]=new r)).current()}return o?$(n):n},set:()=>!0,deleteProperty:()=>!0};function V(e,t,n,o){if(n=F(n),!o&&e[t]===n)return;const l=Array.isArray(e)||!(t in e);void 0===n?delete e[t]:e[t]=n;let r,i=J(e);(r=i[t])&&r.next(),l&&(r=i._)&&r.next()}function W(e,t,n){const o=Object.keys(t);for(let l=0;l<o.length;l+=1){const r=o[l];V(e,r,t[r],n)}}function q(e,t,n=[],o){if(1===t.length){let l=t[0];if("function"==typeof l&&void 0===(l=l($(e),n)))return;return void W(e,l,o)}const l=t.shift(),r=typeof l,i=Array.isArray(e);if(Array.isArray(l))for(let r=0;r<l.length;r++)q(e,[l[r]].concat(t),n.concat([l[r]]),o);else if(i&&"function"===r)for(let r=0;r<e.length;r++)l(e[r],r)&&q(e,[r].concat(t),n.concat([r]),o);else if(i&&"object"===r){const{from:r=0,to:i=e.length-1,by:s=1}=l;for(let l=r;l<=i;l+=s)q(e,[l].concat(t),n.concat([l]),o)}else if(1===t.length){let r=t[0];if("function"==typeof r){const t=e[l];r=r(z(t)?$(t):t,n.concat([l]))}z(e[l])&&z(r)&&!Array.isArray(r)?W(e[l],r,o):V(e,l,r,o)}else q(e[l],t,n.concat([l]),o)}function D(e){return[$(e=F(e||{})),function(...t){!function(e){let t=void 0;if(null!==u)t=e();else{(u=s).changes.reset();try{t=e(),C()}finally{u=null}}}(()=>{if(Array.isArray(t[0]))for(let n=0;n<t.length;n+=1)q(e,t[n]);else q(e,t)})}]}const G=Symbol("fallback");const K=new Set;function Q(e){const t=document.createElement("template");if(t.innerHTML=e,t.innerHTML!==e)throw new Error(`Template html does not match input:\n${t.innerHTML}\n${e}`);return t}function U(e,t,n){if(n)for(let e=0;e<n.length;e++)Z(t,n[e]);return e(t)}function X(e,t){const n=Object.keys(t);for(let o=0;o<n.length;o++){const l=n[o],r=l.split(/\s+/);for(let n=0;n<r.length;n++)e.classList.toggle(r[n],t[l])}}function Y(t,n,o,l){if(void 0===o||l||(l=[]),"function"==typeof n)e((e=l)=>le(t,n(),e,o));else{if(!Array.isArray(n)||!function e(t){for(let n=0,o=t.length;n<o;n++){const o=t[n];if(Array.isArray(o)&&e(o)||"function"==typeof o)return!0}return!1}(n))return le(t,n,l,o);e((e=l)=>le(t,n,e,o))}}function Z(e,t){const n=e[t];Object.defineProperty(e,t,{get:()=>n(),enumerable:!0})}function ee(e){return e&&(e.model||ee(e.host||e.parentNode))}function te(e){const t=`__${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const o=n[t];if(o){if(o(e,o.length>1?ee(n):void 0),e.cancelBubble)return}n=n.host&&n.host instanceof Node?n.host:n.parentNode}}function ne(e,t,n){for(let o=0,l=t.length;o<l;o++)e.insertBefore(t[o],n)}function oe(e,t,n,o){if(void 0===n)return e.textContent="";const l=o||document.createTextNode("");if(t.length){l!==t[0]&&e.replaceChild(l,t[0]);for(let n=t.length-1;n>0;n--)e.removeChild(t[n])}else e.insertBefore(l,n);return[l]}function le(t,n,o,l){if(n===o)return o;const r=typeof n,i=void 0!==l;if(t=i&&o[0]&&o[0].parentNode||t,"string"===r||"number"===r)if("number"===r&&(n=n.toString()),i){let e=o[0];e&&3===e.nodeType?e.data=n:e=document.createTextNode(n),o=oe(t,o,l,e)}else o=""!==o&&"string"==typeof o?t.firstChild.data=n:t.textContent=n;else if(null==n||"boolean"===r)o=oe(t,o,l);else if("function"===r)e(()=>o=le(t,n(),o,l));else if(Array.isArray(n)){const e=function e(t,n){for(let o=0,l=n.length;o<l;o++){let l,r=n[o];if(r instanceof Node)t.push(r);else if(null==r||!0===r||!1===r);else if(Array.isArray(r))e(t,r);else if("string"==(l=typeof r))t.push(document.createTextNode(r));else if("function"===l){const n=r();e(t,Array.isArray(n)?n:[n])}else t.push(document.createTextNode(r.toString()))}return t}([],n);if(0===e.length){if(o=oe(t,o,l),i)return o}else Array.isArray(o)?0===o.length?ne(t,e,l):ie(t,o,e):null==o||""===o?ne(t,e):ie(t,i&&o||[t.firstChild],e);o=e}else if(n instanceof Node){if(Array.isArray(o)){if(i)return o=oe(t,o,l,n);oe(t,o,null,n)}else null==o||""===o?t.appendChild(n):t.replaceChild(n,t.firstChild);o=n}return o}var re=-1;function ie(e,t,n){var o,l=n.length,r=0,i=t.length-1,s=0,u=l-1,c=t[r],d=n[s],a=t[i],f=n[u],h=a.nextSibling,p=!0;e:for(;p;){for(p=!1;d===c;){if(r++,++s>u||r>i)break e;d=n[s],c=t[r]}for(;f===a;){if(h=a,i--,s>--u||r>i)break e;f=n[u],a=t[i]}for(;d===a;){if(p=!0,e.insertBefore(a,c),i--,++s>u||r>i)break e;d=n[s],a=t[i]}for(;f===c;){if(p=!0,null===h?e.appendChild(c):e.insertBefore(c,h),h=c,r++,s>--u||r>i)break e;f=n[u],c=t[r]}}if(s>u){for(;r<=i;)e.removeChild(t[i]),i--;return}if(r>i){for(;s<=u;)e.insertBefore(n[s],h),s++;return}const g=new Array(u-s+1),m=new Map;for(let e=s;e<=u;e++)g[e]=re,m.set(n[e],e);let y=s+n.length-1-u,v=[];for(let e=r;e<=i;e++)m.has(t[e])?(g[m.get(t[e])]=e,y++):v.push(e);if(0!==y){var w,b=function(e,t){let n=[],o=[],l=-1,r=new Array(e.length);for(let i=t,s=e.length;i<s;i++){let t=e[i];if(t<0)continue;let s=se(n,t);-1!==s&&(r[i]=o[s]),s===l?(n[++l]=t,o[l]=i):t<n[s+1]&&(n[s+1]=t,o[s+1]=i)}for(let e=o[l];l>=0;e=r[e],l--)n[l]=e;return n}(g,s),C=[],A=t[r],k=b.length-1;for(let e=r;e<=i;e++)C[e]=A,A=A.nextSibling;for(let t=0;t<v.length;t++)e.removeChild(C[v[t]]);for(let t=u;t>=s;t--)b[k]===t?(h=C[g[b[k]]],k--):(w=g[t]===re?n[t]:C[g[t]],e.insertBefore(w,h),h=w)}else{if(c!==e.firstChild||a!==e.lastChild){for(o=r;o<=i;o++)e.removeChild(t[o]);for(;s<=u;)e.insertBefore(n[s],h),s++;return}for(e.textContent="";s<=u;)e.appendChild(n[s]),s++}}function se(e,t){var n=-1,o=e.length;if(o>0&&e[o-1]<=t)return o-1;for(;o-n>1;){var l=Math.floor((n+o)/2);e[l]>t?o=l:n=l}return n}const ue=(e,t)=>e===t;function ce(e){const r=t((i=e.children,s="fallback"in e?()=>e.fallback:void 0,e=>{let t=[],r=[],u=[],c=0;return l(()=>{for(let e=0,t=u.length;e<t;e++)u[e]()}),()=>{let l,d,a=e()||[];return o(()=>{let e,o,i,h,p,g,m,y,v=a.length;if(0===v){if(0!==c){for(l=0;l<c;l++)u[l]();u=[],t=[],r=[],c=0}s&&(t=[G],r[0]=n(e=>(u[0]=e,s())),c=1)}else if(0===c){for(d=0;d<v;d++)t[d]=a[d],r[d]=n(f);c=v}else{for(i=new Array(v),h=new Array(v),p=0,g=Math.min(c,v);p<g&&t[p]===a[p];p++);for(g=c-1,m=v-1;g>=p&&m>=p&&t[g]===a[m];g--,m--)i[m]=r[g],h[m]=u[g];if(p>m){for(d=g;p<=d;d--)u[d]();const e=g-p+1;return e>0&&(r.splice(p,e),u.splice(p,e)),t=a.slice(0),c=v,r}if(p>g){for(d=p;d<=m;d++)r[d]=n(f);for(;d<v;d++)r[d]=i[d],u[d]=h[d];return t=a.slice(0),c=v,r}for(e=new Map,o=new Array(m+1),d=m;d>=p;d--)y=a[d],l=e.get(y),o[d]=void 0===l?-1:l,e.set(y,d);for(l=p;l<=g;l++)y=t[l],void 0!==(d=e.get(y))&&-1!==d?(i[d]=r[l],h[d]=u[l],d=o[d],e.set(y,d)):u[l]();for(d=p;d<v;d++)d in i?(r[d]=i[d],u[d]=h[d]):r[d]=n(f);c=r.length=v,t=a.slice(0)}return r});function f(e){return u[d]=e,i(a[d],d)}}})(()=>e.each));var i,s;return e.transform?e.transform(r,()=>e.each):r}function de(e){const n="fallback"in e,l=t(()=>e.when,void 0,ue),r=t(()=>l()?o(()=>e.children):n?o(()=>e.fallback):void 0);return e.transform?e.transform(r,l):r}const ae="todos-solid";function fe(){const[t,n]=function(t){const n=localStorage.getItem(ae),[o,l]=D(n?JSON.parse(n):t);return e(()=>localStorage.setItem(ae,JSON.stringify(o))),[o,l]}({counter:1,todos:[],showMode:"all"});return e(()=>{const e=t.todos.filter(e=>e.completed).length;n({completedCount:e,remainingCount:t.todos.length-e})}),[t,{addTodo:({title:e})=>n(["todos",n=>[{title:e,id:t.counter,completed:!1},...n]],["counter",e=>e+1]),removeTodo:e=>n("todos",t=>t.filter(t=>t.id!==e)),editTodo:e=>n("todos",t.todos.findIndex(t=>t.id===e.id),e),clearCompleted:()=>n("todos",e=>e.filter(e=>!e.completed)),toggleAll:e=>n("todos",t=>t.completed!==e,{completed:e}),setVisibility:e=>n("showMode",e)}]}const he=Q('<section class="todoapp"></section>'),pe=Q('<header class="header"><h1>todos</h1><input class="new-todo" placeholder="What needs to be done?"></header>'),ge=Q('<section class="main"><input id="toggle-all" class="toggle-all" type="checkbox"><label for="toggle-all"></label><ul class="todo-list"></ul></section>'),me=Q('<input class="edit">'),ye=Q('<li class="todo"><div class="view"><input class="toggle" type="checkbox"><label></label><button class="destroy"></button></div></li>'),ve=Q('<button class="clear-completed">Clear completed</button>'),we=Q('<footer class="footer"><span class="todo-count"><strong></strong> left</span><ul class="filters"><li><a href="#/">All</a></li><li><a href="#/active">Active</a></li><li><a href="#/completed">Completed</a></li></ul></footer>'),be=e=>Promise.resolve().then(()=>e.focus()),Ce=({addTodo:e})=>(function(){const t=pe.content.firstChild.cloneNode(!0);return t.firstChild.nextSibling.__keyup=({target:t,keyCode:n})=>{let o;13===n&&(o=t.value.trim())&&(e({title:o}),t.value="")},t})(),Ae=({store:t,editTodo:n,removeTodo:l,toggleAll:r})=>{const[i,s]=D(),u=e=>i.editingTodoId===e,c=e=>s("editingTodoId",e),d=({target:{value:e}},t)=>{let o;i.editingTodoId===t&&(o=e.trim())&&(n({id:t,title:o}),c())},a=({target:{checked:e}},t)=>n({id:t,completed:e}),f=(e,t)=>c(t),h=(e,t)=>l(t),p=(e,t)=>{13===e.keyCode?d(e,t):27===e.keyCode&&c()};return function(){const n=ge.content.firstChild.cloneNode(!0),l=n.firstChild,s=l.nextSibling.nextSibling;var c,g,m;return l.__input=({target:{checked:e}})=>r(e),e(()=>l.checked=!t.remainingCount),Y(s,U(ce,{each:()=>(e=>"active"===t.showMode?e.filter(e=>!e.completed):"completed"===t.showMode?e.filter(e=>e.completed):e)(t.todos),transform:(c=()=>i.editingTodoId,g="editing","string"==typeof g&&(m=g,g=(e,t)=>e.classList.toggle(m,t)),t=>(e(e=>{const n=c();return e&&g(e,!1),(e=n&&o(t).find(e=>e.model===n))&&g(e,!0),e}),t)),children:e=>ke(Object.assign({todo:e,isEditing:u,toggle:a,edit:f,remove:h,doneEditing:p,save:d},{}))},["each"])),n}()},ke=({todo:t,isEditing:n,toggle:o,edit:l,remove:r,save:i,doneEditing:s})=>(function(){const u=ye.content.firstChild.cloneNode(!0),c=u.firstChild.firstChild,d=c.nextSibling,a=d.nextSibling;return u.model=t.id,e(()=>X(u,{completed:t.completed})),c.__input=o,e(()=>c.checked=t.completed),d.__dblclick=l,Y(d,()=>t.title),a.__click=r,Y(u,U(de,{when:()=>n(t.id),children:()=>{const e=me.content.firstChild.cloneNode(!0);return be&&be(e),e.__keyup=s,e.__focusout=i,e.value=t.title,e}},["when","children"]),null),u})(),xe=({store:t,clearCompleted:n})=>(function(){const o=we.content.firstChild.cloneNode(!0),l=o.firstChild,r=l.firstChild,i=r.nextSibling,s=l.nextSibling.firstChild,u=s.firstChild,c=s.nextSibling,d=c.firstChild,a=c.nextSibling.firstChild;return Y(r,()=>t.remainingCount),Y(l,()=>1===t.remainingCount?" item":" items",i),e(()=>X(u,{selected:"all"===t.showMode})),e(()=>X(d,{selected:"active"===t.showMode})),e(()=>X(a,{selected:"completed"===t.showMode})),Y(o,U(de,{when:()=>t.completedCount>0,children:()=>{const e=ve.content.firstChild.cloneNode(!0);return e.__click=n,e}},["when","children"]),null),o})();!function(e,t){let o;n(n=>{o=n,Y(t,e())})}(()=>{const[e,{addTodo:t,toggleAll:n,editTodo:o,removeTodo:r,clearCompleted:i,setVisibility:s}]=fe(),u=()=>s(location.hash.slice(2)||"all");return window.addEventListener("hashchange",u),l(()=>window.removeEventListener("hashchange",u)),function(){const l=he.content.firstChild.cloneNode(!0);return Y(l,Ce({addTodo:t}),null),Y(l,U(de,{when:()=>e.todos.length>0,children:()=>[Ae(Object.assign({store:e,toggleAll:n,editTodo:o,removeTodo:r},{})),xe({store:e,clearCompleted:i})]},["when","children"]),null),l}()},document.getElementById("main")),function(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];K.has(n)||(K.add(n),document.addEventListener(n,te))}}(["keyup","input","dblclick","click","focusout"])}();
