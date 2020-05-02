!function(){"use strict";const e=(e,t)=>e===t,t=Symbol("error"),n={},o={owned:null,cleanups:null,context:null,owner:null};let r=null,s=null,l=null,i=null,u=[],c=0;function f(e,t){const o={value:e,observers:null,observerSlots:null,pending:n,comparator:t};return[h.bind(o),d.bind(o)]}function a(e,t,o){const r=v(e,t);return r.pending=n,r.observers=null,r.observerSlots=null,r.comparator=o,p(r),h.bind(r)}function h(){if(this.state&&this.sources){const e=i;i=null,1===this.state?p(this):function e(t){t.state=0;for(let n=0;n<t.sources.length;n+=1){const o=t.sources[n];o.sources&&(1===o.state?g(o):2===o.state&&e(o))}}(this),i=e}if(s){const e=this.observers?this.observers.length:0;s.sources?(s.sources.push(this),s.sourceSlots.push(e)):(s.sources=[this],s.sourceSlots=[e]),this.observers?(this.observers.push(s),this.observerSlots.push(s.sources.length-1)):(this.observers=[s],this.observerSlots=[s.sources.length-1])}return this.value}function d(e){if(!this.comparator||!this.comparator(this.value,e)){if(l)return this.pending===n&&l.push(this),void(this.pending=e);this.value=e,!this.observers||i&&!this.observers.length||b(()=>{for(let e=0;e<this.observers.length;e+=1){const t=this.observers[e];if(t.observers&&2!==t.state&&m(t),t.state=1,i.length>1e6)throw new Error("Potential Infinite Loop Detected.");i.push(t)}})}}function p(e){if(!e.fn)return;y(e);const t=r,n=s,o=c;s=r=e;const l=e.fn(e.value);(!e.updatedAt||e.updatedAt<=o)&&(e.observers&&e.observers.length?d.call(e,l):e.value=l,e.updatedAt=o),s=n,r=t}function v(e,t){const n={fn:e,state:0,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:r,context:null};return null===r?console.warn("computations created outside a `createRoot` or `render` will never be disposed"):r!==o&&(r.owned?r.owned.push(n):r.owned=[n]),n}function g(e){let t=1===e.state&&e;for(;e.fn&&(e=e.owner);)1===e.state&&(t=e);t&&p(t)}function b(e){if(i)return e();i=[],c++;try{e();for(let e=0;e<i.length;e+=1)try{g(i[e])}catch(e){const n=w(r,t);if(!n)throw e;n.forEach(t=>t(e))}}finally{for(i=null;u.length;)u.shift()()}}function m(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&m(n))}}function y(e){let t;if(e.sources){for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),o=t.observers;if(o&&o.length){const e=o.pop(),r=t.observerSlots.pop();n<o.length&&(e.sourceSlots[r]=n,o[n]=e,t.observerSlots[n]=r)}}e.state=0}if(e.owned){for(t=0;t<e.owned.length;t++)y(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}}function w(e,t){return e&&(e.context&&e.context[t]||e.owner&&w(e.owner,t))}const[C,x,S]=function(){let e=0;const[t,n]=f(!1);return[t,()=>0==e++&&n(!0),()=>--e<=0&&n(!1)]}();function $(e,t,n){for(let o=0,r=t.length;o<r;o++)e.insertBefore(t[o],n)}function A(e,t,n,o){if(void 0===n)return e.textContent="";const r=o||document.createTextNode("");if(t.length){r!==t[0]&&e.replaceChild(r,t[0]);for(let n=t.length-1;n>0;n--)e.removeChild(t[n])}else e.insertBefore(r,n);return[r]}function _(e,t,n){let o=n.length,r=t.length,s=o,l=0,i=0,u=t[r-1].nextSibling,c=null;for(;l<r||i<s;)if(r===l){const t=s<o?i?n[i-1].nextSibling:n[s-i]:u;for(;i<s;)e.insertBefore(n[i++],t)}else if(s===i)for(;l<r;)c&&c.has(t[l])||e.removeChild(t[l]),l++;else if(t[l]===n[i])l++,i++;else if(t[r-1]===n[s-1])r--,s--;else{if(r-l==1&&s-i==1){c&&c.has(t[l])?e.insertBefore(n[i],s<o?n[s]:u):e.replaceChild(n[i],t[l]);break}if(t[l]===n[s-1]&&n[i]===t[r-1]){const o=t[--r].nextSibling;e.insertBefore(n[i++],t[l++].nextSibling),e.insertBefore(n[--s],o),t[r]=n[s]}else{if(!c){c=new Map;let e=i;for(;e<s;)c.set(n[e],e++)}if(c.has(t[l])){const o=c.get(t[l]);if(i<o&&o<s){let u=l,f=1;for(;++u<r&&u<s&&c.has(t[u])&&c.get(t[u])===o+f;)f++;if(f>o-i){const r=t[l];for(;i<o;)e.insertBefore(n[i++],r)}else e.replaceChild(n[i++],t[l++])}else l++}else e.removeChild(t[l++])}}}var B={config:{},currentContext:function(){return r},root:function(e,n){n&&(r=n);const l=s,i=r,c=0===e.length?o:{owned:null,cleanups:null,context:null,owner:i};let f;r=c,s=null;try{f=e(()=>y(c))}catch(e){const n=w(r,t);if(!n)throw e;n.forEach(t=>t(e))}finally{for(;u.length;)u.shift()();s=l,r=i}return f},ignore:function(e){let t,n=s;return s=null,t=e(),s=n,t},effect:function(e,t){p(v(e,t))},memo:(t,n)=>n?a(t,void 0,e):a(t)};const{config:T={},root:N,effect:k,memo:E,ignore:L,currentContext:M,createComponent:P}=B;function H(e,t){let n;return N(o=>{n=o,function(e,t,n,o){void 0===n||o||(o=[]);if("function"!=typeof t)return F(e,t,o,n);k(o=>F(e,t(),o,n),o)}(t,e())}),n}function F(e,t,n,o,r){for(;"function"==typeof n;)n=n();if(t===n)return n;const s=typeof t,l=void 0!==o;if(e=l&&n[0]&&n[0].parentNode||e,"string"===s||"number"===s)if("number"===s&&(t=t.toString()),l){let r=n[0];r&&3===r.nodeType?r.data=t:r=document.createTextNode(t),n=A(e,n,o,r)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===s){if(T.hydrate&&T.hydrate.registry)return n;n=A(e,n,o)}else{if("function"===s)return k(()=>n=F(e,t(),n,o)),()=>n;if(Array.isArray(t)){const s=[];if(function e(t,n,o){let r=!1;for(let s=0,l=n.length;s<l;s++){let l,i=n[s];if(i instanceof Node)t.push(i);else if(null==i||!0===i||!1===i);else if(Array.isArray(i))r=e(t,i)||r;else if("string"==(l=typeof i))t.push(document.createTextNode(i));else if("function"===l)if(o){const n=i();r=e(t,Array.isArray(n)?n:[n])||r}else t.push(i),r=!0;else t.push(document.createTextNode(i.toString()))}return r}(s,t,r))return k(()=>n=F(e,s,n,o,!0)),()=>n;if(T.hydrate&&T.hydrate.registry)return n;if(0===s.length){if(n=A(e,n,o),l)return n}else Array.isArray(n)?0===n.length?$(e,s,o):_(e,n,s):null==n||""===n?$(e,s):_(e,l&&n||[e.firstChild],s);n=s}else if(t instanceof Node){if(Array.isArray(n)){if(l)return n=A(e,n,o,t);A(e,n,null,t)}else null==n||""===n?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}const I=function(e,t,n){const o=document.createElement("template");o.innerHTML=e,t&&o.innerHTML.split("<").length-1!==t&&console.warn(`Template html does not match input:\n${o.innerHTML}\n\n${e}`);let r=o.content.firstChild;return n&&(r=r.firstChild),r}('<div class="box-view"><div class="box"></div></div>',4);function D(e){const t=++e.count;e.setTop(10*Math.sin(t/10)),e.setLeft(10*Math.cos(t/10)),e.setColor(t%255),e.setContent(t%100)}const R=()=>{const e=function(e){const t=[];for(let n=0;n<e;n++){const[e,n]=f(0),[o,r]=f(0),[s,l]=f(null),[i,u]=f(0);t.push({top:e,left:o,color:s,content:i,setTop:n,setLeft:r,setColor:l,setContent:u,count:0})}return t}(Benchmark.number);return Benchmark.Framework.Solid.loop=()=>Promise.resolve().then(()=>function(e){let t=l,o=l=[];const r=e();return l=t,b(()=>{for(let e=0;e<o.length;e+=1){const t=o[e];if(t.pending!==n){const e=t.pending;t.pending=n,d.call(t,e)}}}),r}(()=>e.forEach(D))),e.map((e,t)=>(()=>{const n=I.cloneNode(!0),o=n.firstChild;o.id=t,o.textContent=e.content();const r=o.firstChild;return k(t=>{const n=`${e.top()}px`,s=`${e.left()}px`,l=`rgb(0,0,${e.color()})`,i=e.content();return n!==t._v$&&o.style.setProperty("top",t._v$=n),s!==t._v$2&&o.style.setProperty("left",t._v$2=s),l!==t._v$3&&o.style.setProperty("background",t._v$3=l),i!==t._v$4&&(r.data=t._v$4=i),t},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),n})())};let j;Benchmark.Framework.Solid={start(){j=H(R,document.getElementById("grid"))},cleanup(){j&&j()}}}();
