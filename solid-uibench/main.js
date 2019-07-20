!function(){"use strict";function e(e,n){const t=y(),l=h,o=null===d;t.owner=g,g=t,h=t,n=o?function(e,n){d=a,a.changes.reset(),a.updates.reset();try{return e(n)}finally{g=h=d=null}}(e,n):e(n),g=t.owner,h=l,N(t),w(t,e,n,!1),o&&function(e,n){if(a.changes.count>0||a.updates.count>0){a.time++;try{m(a)}finally{d=null,g=e,h=n}}}(g,l)}function n(e,n){let t,l=0===e.length?null:function(){null===o||(null!==d?a.disposes.add(o):T(o))},o=null===l?f:y(),r=h,i=n||g;o!==i&&(o.owner=i),g=o;try{h=null,t=null===l?e():e(l)}finally{h=r,g=o.owner}return N(o),null!==l&&w(o,null,void 0,!0)&&(o=null),t}function t(e){let n,t=h;return h=null,n=e(),h=t,n}class l{constructor(e){this.value=e,this.pending=i,this.log=null}current(){return null!==h&&function(e){null===e.log&&(e.log={node1:null,node1slot:0,nodes:null,nodeslots:null});!function(e){let n,t=h,l=null===t.source1?-1:null===t.sources?0:t.sources.length;null===e.node1?(e.node1=t,e.node1slot=l,n=-1):null===e.nodes?(e.nodes=[t],e.nodeslots=[l],n=0):(n=e.nodes.length,e.nodes.push(t),e.nodeslots.push(l));null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}(e.log)}(this),this.value}next(e){if(null!==d)if(this.pending!==i){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,a.changes.add(this);else null!==this.log?(this.pending=e,a.changes.add(this),b()):this.value=e;return e}}function o(){return{fn:null,age:-1,state:s,source1:null,source1slot:0,sources:null,sourceslots:null,owner:null,owned:null,value:void 0,context:void 0,cleanups:null,afters:null}}class r{constructor(){this.items=[],this.count=0}reset(){this.count=0}add(e){this.items[this.count++]=e}run(e){let n=this.items;for(let t=0;t<this.count;t++)e(n[t]),n[t]=null;this.count=0}}let i={},s=0,u=1,c=2,f=o(),a={time:0,changes:new r,updates:new r,disposes:new r},d=null,h=null,g=null,p=null;function y(){let e=p;return null===e?e=o():p=null,e}function w(e,n,t,l){let o,r=l||null===g||g===f?null:g,i=!e.noRecycle&&null===e.source1&&(null===e.owned&&null===e.cleanups||null!==r);if(i){if(p=e,e.owner=null,null!==r){if(null!==e.owned){if(null===r.owned)r.owned=e.owned;else for(o=0;o<e.owned.length;o++)r.owned.push(e.owned[o]);e.owned=null}if(null!==e.cleanups){if(null===r.cleanups)r.cleanups=e.cleanups;else for(o=0;o<e.cleanups.length;o++)r.cleanups.push(e.cleanups[o]);e.cleanups=null}}}else e.fn=n,e.value=t,e.age=a.time,null!==r&&(null===r.owned?r.owned=[e]:r.owned.push(e));return i}function b(){let e=g;a.updates.reset(),a.time++;try{m(a)}finally{d=h=null,g=e}}function m(e){let n=d,t=0;for(d=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(t>0&&e.time++,e.changes.run(v),e.updates.run(C),e.disposes.run(T),t++>1e5)throw new Error("Runaway clock detected");d=n}function v(e){e.value=e.pending,e.pending=i,e.log&&function(e){let n=e.node1,t=e.nodes;null!==n&&A(n);if(null!==t)for(let e=0,n=t.length;e<n;e++)A(t[e])}(e.log)}function A(e){let n=a.time;e.age<n&&(e.age=n,e.state=u,a.updates.add(e),null!==e.owned&&function e(n){for(let t=0;t<n.length;t++){let l=n[t];l.age=a.time,l.state=s,null!==l.owned&&e(l.owned)}}(e.owned))}function C(e){if(e.state===u){let n=g,t=h;g=h=e,e.state=c,x(e,!1),e.value=e.fn(e.value),e.state=s,N(e),g=n,h=t}}function N(e){let n=e.afters;null!==n&&(Promise.resolve().then(()=>{for(let e=0;e<n.length;e++)n[e]()}),e.afters=null)}function x(e,n){let t,l,o=e.source1,r=e.sources,i=e.sourceslots,s=e.cleanups,u=e.owned;if(null!==s){for(t=0;t<s.length;t++)s[t](n);e.cleanups=null}if(null!==u){for(t=0;t<u.length;t++)T(u[t]);e.owned=null}if(null!==o&&(k(o,e.source1slot),e.source1=null),null!==r)for(t=0,l=r.length;t<l;t++)k(r.pop(),i.pop())}function k(e,n){let t,l,o=e.nodes,r=e.nodeslots;-1===n?e.node1=null:(t=o.pop(),l=r.pop(),n!==o.length&&(o[n]=t,r[n]=l,-1===l?t.source1slot=n:t.sourceslots[l]=n))}function T(e){e.fn=null,e.owner=null,e.afters=null,x(e,!0)}const O=Symbol("solid-node"),j=Symbol("solid-proxy");function S(e){return e[j]||(e[j]=new Proxy(e,_))}function M(e){return null!==e&&"object"==typeof e}function P(e){let n,t,l;if(n=null!=e&&e._state)return n;if(!M(e))return e;if(Array.isArray(e)){Object.isFrozen(e)&&(e=e.slice(0));for(let n=0,o=e.length;n<o;n++)(t=P(l=e[n]))!==l&&(e[n]=t)}else{Object.isFrozen(e)&&(e=Object.assign({},e));let n=Object.keys(e);for(let o=0,r=n.length;o<r;o++)(t=P(l=e[n[o]]))!==l&&(e[n[o]]=t)}return e}function B(e){let n=e[O];return n||(e[O]=n={}),n}const _={get(e,n){if("_state"===n)return e;if(n===j||n===O)return;const t=e[n],o=M(t);if(null!==h&&"function"!=typeof t){let r,i;o&&(r=B(t))&&(i=r._||(r._=new l)).current(),(i=(r=B(e))[n]||(r[n]=new l)).current()}return o?S(t):t},set:()=>!0,deleteProperty:()=>!0};function L(e,n,t){if(t=P(t),e[n]===t)return;const l=Array.isArray(e)||!(n in e);void 0===t?delete e[n]:e[n]=t;let o,r=B(e);(o=r[n])&&o.next(),l&&(o=r._)&&o.next()}function E(e,n){const t=Object.keys(n);for(let l=0;l<t.length;l+=1){const o=t[l];L(e,o,n[o])}}function R(e,n,t=[]){if(1===n.length){let l=n[0];if("function"==typeof l&&void 0===(l=l(S(e),t)))return;return void E(e,l)}const l=n.shift(),o=typeof l,r=Array.isArray(e);if(Array.isArray(l))for(let o=0;o<l.length;o++)R(e,[l[o]].concat(n),t.concat([l[o]]));else if(r&&"function"===o)for(let o=0;o<e.length;o++)l(e[o],o)&&R(e,[o].concat(n),t.concat([o]));else if(r&&"object"===o){const{from:o=0,to:r=e.length-1,by:i=1}=l;for(let l=o;l<=r;l+=i)R(e,[l].concat(n),t.concat([l]))}else if(1===n.length){let o=n[0];if("function"==typeof o){const n=e[l];o=o(M(n)?S(n):n,t.concat([l]))}M(e[l])&&M(o)&&!Array.isArray(o)?E(e[l],o):L(e,l,o)}else R(e[l],n,t.concat([l]))}function H(e,n,t,l,o){let r=n[t];if(e===r)return;if(!M(e)||null==r)return void(e!==r&&L(n,t,e));if(Array.isArray(e)){if(e.length&&r.length&&(!l||o&&null!=e[0][o])){let n,t,i,s,u,c,f,a,d=new Array(e.length),h=new Map;for(i=0,s=Math.min(r.length,e.length);i<s&&(r[i]===e[i]||o&&r[i][o]===e[i][o]);i++)H(e[i],r,i,l,o);for(s=r.length-1,u=e.length-1;s>=0&&u>=0&&(r[s]===e[u]||o&&r[s][o]===e[u][o]);s--,u--)d[u]=r[s];for(f=new Array(u+1),t=u;t>=i;t--)c=e[t],a=o?c[o]:c,n=h.get(a),f[t]=void 0===n?-1:n,h.set(a,t);for(n=i;n<=s;n++)c=r[n],a=o?c[o]:c,void 0!==(t=h.get(a))&&-1!==t&&(d[t]=r[n],t=f[t],h.set(a,t));for(t=i;t<e.length;t++)d.hasOwnProperty(t)?(L(r,t,d[t]),H(e[t],r,t,l,o)):L(r,t,e[t])}else for(let n=0,t=e.length;n<t;n++)H(e[n],r,n,l,o);return void(r.length>e.length&&L(r,"length",e.length))}const i=Object.keys(e);for(let n=0,t=i.length;n<t;n++)H(e[i[n]],r,i[n],l,o);const s=Object.keys(r);for(let n=0,t=s.length;n<t;n++)void 0===e[s[n]]&&L(r,s[n],void 0)}const $=Symbol("fallback");function z(e,l){return o=>{let r=[],i=[],s=[],u=0;return function(e){null===g?console.warn("cleanups created without a root or parent will never be run"):null===g.cleanups?g.cleanups=[e]:g.cleanups.push(e)}(()=>{for(let e=0,n=s.length;e<n;e++)s[e]()}),()=>{let c,f,a=o();return t(()=>{let e,t,o,h,g,p,y,w,b=a.length;if(0===b){if(0!==u){for(c=0;c<u;c++)s[c]();s=[],r=[],i=[],u=0}l&&(r=[$],i[0]=n(e=>(s[0]=e,l())),u=1)}else if(0===u){for(f=0;f<b;f++)r[f]=a[f],i[f]=n(d);u=b}else{for(e=new Map,o=new Array(b),h=new Array(b),g=0,p=Math.min(u,b);g<p&&r[g]===a[g];g++);for(p=u-1,y=b-1;p>=0&&y>=0&&r[p]===a[y];p--,y--)o[y]=i[p],h[y]=s[p];for(t=new Array(y+1),f=y;f>=g;f--)w=a[f],c=e.get(w),t[f]=void 0===c?-1:c,e.set(w,f);for(c=g;c<=p;c++)w=r[c],void 0!==(f=e.get(w))&&-1!==f?(o[f]=i[c],h[f]=s[c],f=t[f],e.set(w,f)):s[c]();for(f=g;f<b;f++)o.hasOwnProperty(f)?(i[f]=o[f],s[f]=h[f]):i[f]=n(d);u=i.length=b,r=a.slice(0)}return i});function d(n){return s[f]=n,e(a[f],f)}}}}const F=new Set;function q(e){const n=document.createElement("template");if(n.innerHTML=e,n.innerHTML!==e)throw new Error(`Template html does not match input:\n${n.innerHTML}\n${e}`);return n}function D(e,n,t){if(t)for(let e=0;e<t.length;e++)G(n,t[e]);return e(n)}function J(n,t,l,o){if(void 0===l||o||(o=[]),"function"==typeof t)e((e=o)=>V(n,t(),e,l));else{if(!Array.isArray(t)||!function e(n){for(let t=0,l=n.length;t<l;t++){const l=n[t];if(Array.isArray(l)&&e(l)||"function"==typeof l)return!0}return!1}(t))return V(n,t,o,l);e((e=o)=>V(n,t,e,l))}}function G(e,n){const t=e[n];Object.defineProperty(e,n,{get:()=>t(),enumerable:!0})}function I(e){return e&&(e.model||I(e.host||e.parentNode))}function K(e){const n=`__${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>t});null!==t;){const l=t[n];if(l){if(l(e,l.length>1?I(t):void 0),e.cancelBubble)return}t=t.host&&t.host instanceof Node?t.host:t.parentNode}}function Q(e,n,t){for(let l=0,o=n.length;l<o;l++)e.insertBefore(n[l],t)}function U(e,n,t,l){if(void 0===t)return e.textContent="";const o=l||document.createTextNode("");if(n.length){o!==n[0]&&e.replaceChild(o,n[0]);for(let t=n.length-1;t>0;t--)e.removeChild(n[t])}else e.insertBefore(o,t);return[o]}function V(n,t,l,o){if(t===l)return l;const r=typeof t,i=void 0!==o;if(n=i&&l[0]&&l[0].parentNode||n,"string"===r||"number"===r)if("number"===r&&(t=t.toString()),i){let e=l[0];e&&3===e.nodeType?e.data=t:e=document.createTextNode(t),l=U(n,l,o,e)}else l=""!==l&&"string"==typeof l?n.firstChild.data=t:n.textContent=t;else if(null==t||"boolean"===r)l=U(n,l,o);else if("function"===r)e(()=>l=V(n,t(),l,o));else if(Array.isArray(t)){const e=function e(n,t){for(let l=0,o=t.length;l<o;l++){let o,r=t[l];if(r instanceof Node)n.push(r);else if(null==r||!0===r||!1===r);else if(Array.isArray(r))e(n,r);else if("string"==(o=typeof r))n.push(document.createTextNode(r));else if("function"===o){const t=r();e(n,Array.isArray(t)?t:[t])}else n.push(document.createTextNode(r.toString()))}return n}([],t);if(0===e.length){if(l=U(n,l,o),i)return l}else Array.isArray(l)?0===l.length?Q(n,e,o):X(n,l,e):null==l||""===l?Q(n,e):X(n,i&&l||[n.firstChild],e);l=e}else if(t instanceof Node){if(Array.isArray(l)){if(i)return l=U(n,l,o,t);U(n,l,null,t)}else null==l||""===l?n.appendChild(t):n.replaceChild(t,n.firstChild);l=t}return l}var W=-1;function X(e,n,t){var l,o=t.length,r=0,i=n.length-1,s=0,u=o-1,c=n[r],f=t[s],a=n[i],d=t[u],h=a.nextSibling,g=!0;e:for(;g;){for(g=!1;f===c;){if(r++,++s>u||r>i)break e;f=t[s],c=n[r]}for(;d===a;){if(h=a,i--,s>--u||r>i)break e;d=t[u],a=n[i]}for(;f===a;){if(g=!0,e.insertBefore(a,c),i--,++s>u||r>i)break e;f=t[s],a=n[i]}for(;d===c;){if(g=!0,null===h?e.appendChild(c):e.insertBefore(c,h),h=c,r++,s>--u||r>i)break e;d=t[u],c=n[r]}}if(s>u){for(;r<=i;)e.removeChild(n[i]),i--;return}if(r>i){for(;s<=u;)e.insertBefore(t[s],h),s++;return}const p=new Array(u-s+1);for(let e=s;e<=u;e++)p[e]=W;const y=new Map;for(let e=s;e<=u;e++)y.set(t[e],e);let w=s+t.length-1-u,b=[];for(let e=r;e<=i;e++)y.has(n[e])?(p[y.get(n[e])]=e,w++):b.push(e);if(0!==w){var m,v=function(e,n){let t=[],l=[],o=-1,r=new Array(e.length);for(let i=n,s=e.length;i<s;i++){let n=e[i];if(n<0)continue;let s=Y(t,n);-1!==s&&(r[i]=l[s]),s===o?(t[++o]=n,l[o]=i):n<t[s+1]&&(t[s+1]=n,l[s+1]=i)}for(let e=l[o];o>=0;e=r[e],o--)t[o]=e;return t}(p,s),A=[],C=n[r],N=v.length-1;for(let e=r;e<=i;e++)A[e]=C,C=C.nextSibling;for(let n=0;n<b.length;n++)e.removeChild(A[b[n]]);for(let n=u;n>=s;n--)v[N]===n?(h=A[p[v[N]]],N--):(m=p[n]===W?t[n]:A[p[n]],e.insertBefore(m,h),h=m)}else{if(c!==e.firstChild||a!==e.lastChild){for(l=r;l<=i;l++)e.removeChild(n[l]);for(;s<=u;)e.insertBefore(t[s],h),s++;return}for(e.textContent="";s<=u;)e.appendChild(t[s]),s++}}function Y(e,n){var t=-1,l=e.length;if(l>0&&e[l-1]<=n)return l-1;for(;l-t>1;){var o=Math.floor((t+l)/2);e[o]>n?l=o:t=o}return t}function Z(e){const n=z(e.children,"fallback"in e?()=>e.fallback:void 0)(()=>e.each);return e.transform?e.transform(n):n}const ee=q('<td class="TableCell"></td>'),ne=q('<table class="Table"><tbody></tbody></table>'),te=q("<tr></tr>"),le=q('<div class="Anim"></div>'),oe=q('<div class="AnimBox"></div>'),re=q('<ul class="TreeNode"></ul>'),ie=q('<li class="TreeLeaf"></li>'),se=q('<div class="Tree"></div>'),ue=q('<div class="Main"></div>'),ce=q("<pre></pre>"),fe=({data:n})=>{const t=(e,n)=>{console.log("Clicked"+n),e.stopPropagation()};return function(){const l=ne.content.firstChild.cloneNode(!0);return J(l.firstChild,D(Z,{each:()=>n.items,children:n=>(function(){const l=te.content.firstChild.cloneNode(!0);return e(()=>l.className=n.active?"TableRow active":"TableRow"),l.setAttribute("data-id",n.id),J(l,(e=>{const n=new Array(e.props.length+1);n[0]=function(){const n=ee.content.firstChild.cloneNode(!0);return n.textContent="#"+e.id,n}();for(let l=1,o=n.length;l<o;l++){const o=e.props[l-1];n[l]=function(){const e=ee.content.firstChild.cloneNode(!0);return e.__click=t,e.model=o,e.textContent=o,e}()}return n})(n)),l})()},["each"])),l}()},ae=({data:e})=>(function(){const n=re.content.firstChild.cloneNode(!0);return J(n,D(Z,{each:()=>e.children,children:e=>e.container?ae({data:e}):function(){const n=ie.content.firstChild.cloneNode(!0);return n.textContent=e.id,n}()},["each"])),n})(),de=({data:n})=>{const l=()=>{const l=n.location;return t(()=>"table"===l?fe({data:n.table}):"anim"===l?(({data:n})=>(function(){const t=le.content.firstChild.cloneNode(!0);return J(t,D(Z,{each:()=>n.items,children:n=>(function(){const t=oe.content.firstChild.cloneNode(!0);return t.setAttribute("data-id",n.id),e(()=>Object.assign(t.style,{borderRadius:(n.time%10).toString()+"px",background:"rgba(0,0,0,"+(.5+n.time%10/10).toString()+")"})),t})()},["each"])),t})())({data:n.anim}):"tree"===l?(({data:e})=>(function(){const n=se.content.firstChild.cloneNode(!0);return J(n,ae({data:e.root})),n})())({data:n.tree}):void 0)};return function(){const e=ue.content.firstChild.cloneNode(!0);return J(e,l),e}()};uibench.init("Solid","0.9.0");const[he,ge]=function(e){return[S(e=P(e||{})),function(...n){!function(e){let n=void 0;if(null!==d)n=e();else{(d=a).changes.reset();try{n=e(),b()}finally{d=null}}}(()=>{if(Array.isArray(n[0]))for(let t=0;t<n.length;t+=1)R(e,n[t]);else R(e,n)})}]}();n(()=>document.querySelector("#App").appendChild(de({data:he}))),document.addEventListener("DOMContentLoaded",function(e){uibench.run(e=>ge(function(e,n={}){let t;Array.isArray(e)?t=e.pop():"object"==typeof e?(t=e,e=void 0):(e=Array.prototype.slice.call(arguments,0,-1),t=arguments[arguments.length-1],n={});const{merge:l,key:o="id"}=n;return n=>{if(n=P(n),e){for(let t=0;t<e.length-1;t+=1)n=n[e[t]];H(t,n,e[e.length-1],l,o)}else H(t,{state:n},"state",l,o)}}(e)),e=>{document.body.textContent="",document.body.appendChild(function(){const n=ce.content.firstChild.cloneNode(!0);return J(n,JSON.stringify(e,null," ")),n}())})}),function(e){for(let n=0,t=e.length;n<t;n++){const t=e[n];F.has(t)||(F.add(t),document.addEventListener(t,K))}}(["click"])}();
