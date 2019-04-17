!function(){"use strict";var e=function(e,t){var n=new r(e,t);return function(){return n.current()}};Object.defineProperty(e,"default",{value:e}),e.root=function(e){var t=p,n=0===e.length?g:new r(null,null),o=void 0,l=0===e.length?null:function(){null!==d?f.disposes.add(n):N(n)};return p=n,null===d?o=function(e,t,n){try{return null===t?e():e(t)}finally{p=n}}(e,l,t):(o=null===l?e():e(l),p=t),o},e.on=function(t,n,o,r){var l;return Array.isArray(t)&&(l=t,t=function(){for(var e=0;e<l.length;e++)l[e]()}),r=!!r,e(i,o);function i(e){var o=h;return t(),r?r=!1:(h=null,e=n(e),h=o),e}},e.effect=function(e,t){new r(e,t)},e.data=function(e){var t=new o(e);return function(e){return 0===arguments.length?t.current():t.next(e)}},e.value=function(t,n){var o=e.data(t),r=-1;return function(e){if(0===arguments.length)return o();if(!(n?n(t,e):t===e)){var l=f.time;if(r===l)throw new Error("conflicting values: "+e+" is not the same as "+t);r=l,t=e,o(e)}return e}},e.freeze=function(e){var t=void 0;if(null!==d)t=e();else{(d=f).changes.reset();try{t=e(),m()}finally{d=null}}return t},e.sample=function(e){var t,n=h;return null!==n?(h=null,t=e(),h=n):t=e(),t},e.cleanup=function(e){null!==p?null===p.cleanups?p.cleanups=[e]:p.cleanups.push(e):console.warn("cleanups created without a root or parent will never be run")},e.makeDataNode=function(e){return new o(e)},e.makeComputationNode=function(e,t){return new r(e,t)},e.isFrozen=function(){return null!==d},e.isListening=function(){return null!==h};var t=function(){return function(){this.time=0,this.changes=new i,this.updates=new i,this.disposes=new i}}(),n={time:function(){return f.time}},o=function(){function e(e){this.value=e,this.pending=s,this.log=null}return e.prototype.current=function(){return null!==h&&function(e,t){null===e.log&&(e.log=new l);y(e.log,t)}(this,h),this.value},e.prototype.next=function(e){if(null!==d)if(this.pending!==s){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,f.changes.add(this);else null!==this.log?(this.pending=e,f.changes.add(this),m()):this.value=e;return e},e.prototype.clock=function(){return n},e}(),r=function(){function e(e,t){if(this.state=u,this.source1=null,this.source1slot=0,this.sources=null,this.sourceslots=null,this.log=null,this.owned=null,this.cleanups=null,this.fn=e,this.value=t,this.age=f.time,null!==e){var n=p,o=h;null===n&&console.warn("computations created without a root or parent will never be disposed"),p=h=this,null===d?function(e){d=f,f.changes.reset(),f.updates.reset();try{e.value=e.fn(e.value),(f.changes.count>0||f.updates.count>0)&&(f.time++,v(f))}finally{d=p=h=null}}(this):this.value=this.fn(this.value),n&&n!==g&&(null===n.owned?n.owned=[this]:n.owned.push(this)),p=n,h=o}}return e.prototype.current=function(){if(null!==h){if(this.age===f.time){if(this.state===a)throw new Error("circular dependency");A(this)}!function(e,t){null===e.log&&(e.log=new l);y(e.log,t)}(this,h)}return this.value},e.prototype.clock=function(){return n},e}(),l=function(){return function(){this.node1=null,this.node1slot=0,this.nodes=null,this.nodeslots=null}}(),i=function(){function e(){this.items=[],this.count=0}return e.prototype.reset=function(){this.count=0},e.prototype.add=function(e){this.items[this.count++]=e},e.prototype.run=function(e){for(var t=this.items,n=0;n<this.count;n++)e(t[n]),t[n]=null;this.count=0},e}(),s={},u=0,c=1,a=2,f=new t,d=null,h=null,p=null,g=new r(null,null);function y(e,t){var n,o=null===t.source1?-1:null===t.sources?0:t.sources.length;null===e.node1?(e.node1=t,e.node1slot=o,n=-1):null===e.nodes?(e.nodes=[t],e.nodeslots=[o],n=0):(n=e.nodes.length,e.nodes.push(t),e.nodeslots.push(o)),null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}function m(){var e=p;f.updates.reset(),f.time++;try{v(f)}finally{d=h=null,p=e}}function v(e){var t=d,n=0;for(d=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(n>0&&e.time++,e.changes.run(b),e.updates.run(A),e.disposes.run(N),n++>1e5)throw new Error("Runaway clock detected");d=t}function b(e){e.value=e.pending,e.pending=s,e.log&&w(e.log)}function w(e){var t=e.node1,n=e.nodes;if(null!==t&&C(t),null!==n)for(var o=0,r=n.length;o<r;o++)C(n[o])}function C(e){var t=f.time;e.age<t&&(e.age=t,e.state=c,f.updates.add(e),null!==e.owned&&function e(t){for(var n=0;n<t.length;n++){var o=t[n];o.age=f.time,o.state=u,null!==o.owned&&e(o.owned)}}(e.owned),null!==e.log&&w(e.log))}function A(e){if(e.state===c){var t=p,n=h;p=h=e,e.state=a,S(e,!1),e.value=e.fn(e.value),e.state=u,p=t,h=n}}function S(e,t){var n,o,r=e.source1,l=e.sources,i=e.sourceslots,s=e.cleanups,u=e.owned;if(null!==s){for(n=0;n<s.length;n++)s[n](t);e.cleanups=null}if(null!==u){for(n=0;n<u.length;n++)N(u[n]);e.owned=null}if(null!==r&&(x(r,e.source1slot),e.source1=null),null!==l)for(n=0,o=l.length;n<o;n++)x(l.pop(),i.pop())}function x(e,t){var n,o,r=e.nodes,l=e.nodeslots;-1===t?e.node1=null:(n=r.pop(),o=l.pop(),t!==r.length&&(r[t]=n,l[t]=o,-1===o?n.source1slot=t:n.sourceslots[o]=t))}function N(e){e.fn=null,e.log=null,S(e,!0)}const k=Symbol("solid-node"),T=Symbol("solid-proxy");function E(e){return e[T]||(e[T]=new Proxy(e,O))}function L(e){return null!==e&&"object"==typeof e&&(e.__proto__===Object.prototype||Array.isArray(e))}function j(e){let t,n,o;if(t=null!=e&&e._state)return t;if(!L(e))return e;if(Array.isArray(e)){Object.isFrozen(e)&&(e=e.slice(0));for(let t=0,r=e.length;t<r;t++)(n=j(o=e[t]))!==o&&(e[t]=n)}else{Object.isFrozen(e)&&(e=Object.assign({},e));let t=Object.keys(e);for(let r=0,l=t.length;r<l;r++)(n=j(o=e[t[r]]))!==o&&(e[t[r]]=n)}return e}function M(e){let t=e[k];return t||(e[k]=t={}),t}const O={get(t,n){if("_state"===n)return t;if(n===T||n===k)return;const o=t[n],r=L(o);if(e.isListening()&&"function"!=typeof o){let l,i;r&&(l=M(o))&&(i=l._self||(l._self=e.makeDataNode())).current(),(i=(l=M(t))[n]||(l[n]=e.makeDataNode())).current()}return r?E(o):o},set:()=>!0,deleteProperty:()=>!0};function _(e,t,n){if(n=j(n),e[t]===n)return;const o=Array.isArray(e)||!(t in e);void 0===n?delete e[t]:e[t]=n;let r,l=M(e);(r=l[t])&&r.next(),o&&(r=l._self)&&r.next()}function P(e,t){const n=Object.keys(t);for(let o=0;o<n.length;o+=1){const r=n[o];_(e,r,t[r])}}function H(e,t,n=[]){if(1===t.length){let o=t[0];if("function"==typeof o&&void 0===(o=o(E(e),n)))return;return void P(e,o)}const o=t.shift(),r=typeof o,l=Array.isArray(e);if(Array.isArray(o))for(let r=0;r<o.length;r++)H(e,[o[r]].concat(t),n.concat([o[r]]));else if(l&&"function"===r)for(let r=0;r<e.length;r++)o(e[r],r)&&H(e,[r].concat(t),n.concat([r]));else if(l&&"object"===r){const{from:r=0,to:l=e.length-1,by:i=1}=o;for(let o=r;o<=l;o+=i)H(e,[o].concat(t),n.concat([o]))}else if(l&&"*"===o)for(let o=0;o<e.length;o++)H(e,[o].concat(t),n.concat([o]));else if(1===t.length){let r=t[0];if("function"==typeof r){const t=e[o];r=r(L(t)?E(t):t,n.concat([o]))}L(e[o])&&L(r)&&!Array.isArray(r)?P(e[o],r):_(e,o,r)}else H(e[o],t,n.concat([o]))}function B(e,t,n,o,r){let l=t[n];if(e===l)return;if(!L(e)||null==l)return void(e!==l&&_(t,n,e));if(Array.isArray(e)){if(e.length&&l.length&&(!o||r&&null!=e[0][r])){let t,n,i,s,u,c,a,f,d=new Array(e.length),h=new Map;for(i=0,s=Math.min(l.length,e.length);i<s&&(l[i]===e[i]||r&&l[i][r]===e[i][r]);i++)B(e[i],l,i,o,r);for(s=l.length-1,u=e.length-1;s>=0&&u>=0&&(l[s]===e[u]||r&&l[s][r]===e[u][r]);s--,u--)d[u]=l[s];for(a=new Array(u+1),n=u;n>=i;n--)c=e[n],f=r?c[r]:c,t=h.get(f),a[n]=void 0===t?-1:t,h.set(f,n);for(t=i;t<=s;t++)c=l[t],f=r?c[r]:c,void 0!==(n=h.get(f))&&-1!==n&&(d[n]=l[t],n=a[n],h.set(f,n));for(n=i;n<e.length;n++)d.hasOwnProperty(n)?(_(l,n,d[n]),B(e[n],l,n,o,r)):_(l,n,e[n])}else for(let t=0,n=e.length;t<n;t++)B(e[t],l,t,o,r);return void(l.length>e.length&&_(l,"length",e.length))}const i=Object.keys(e);for(let t=0,n=i.length;t<n;t++)B(e[i[t]],l,i[t],o,r);const s=Object.keys(l);for(let t=0,n=s.length;t<n;t++)void 0===e[s[t]]&&_(l,s[t],void 0)}const{root:z,cleanup:F,sample:D,freeze:R}=e,q="__rGroup",G="nextSibling",J="previousSibling";let $=0;function I(e,t){for(var n=0,o=t.length;n<o;n++){var r=t[n];r instanceof Node?11===r.nodeType?I(e,r.childNodes):e.push(r):null==r||!0===r||!1===r||(Array.isArray(r)?I(e,r):"string"==typeof r?e.push(document.createTextNode(r)):e.push(document.createTextNode(r.toString())))}return e}function K(e,t,n,o){if(Array.isArray(e)){if(!e.length)return;let r=(e=I([],e))[0];1!==e.length&&(r[q]=e[e.length-1][q]=o);for(let o=0;o<e.length;o++)n?t.insertBefore(e[o],n):t.appendChild(e[o]);return r}let r,l=typeof e;return"string"===l||"number"===l?e=document.createTextNode(e):11===e.nodeType&&(r=e.firstChild)&&r!==e.lastChild&&(r[q]=e.lastChild[q]=o),n?t.insertBefore(e,n):t.appendChild(e),r||e}function Q(e,t,n){const o=e[q];if(o)for(e=e[t];e&&e[q]!==o;)e=e[t];return n?e:e[t]}function U(e,t,n){let o;for(;t!==n;)o=t.nextSibling,e.removeChild(t),t=o}function V(e,t,n,o){let r;for(;t!==n;)r=t.nextSibling,e.insertBefore(t,o),t=r}function W(e,t){e.get(t)(),e.delete(t)}function X(e,t,n,o,r,l,i){const{wrap:s,cleanup:u,root:c,sample:a}=r,{afterRender:f,fallback:d}=o;let h=new Map,p=!1;function g(t,o,r){return c(l=>{const i=K(n(t,o),e,r,++$);return h.set(i,l),i})}function y(){f&&f(l?l.nextSibling:e.firstChild,i)}u(function(){for(let e of h.keys())h.get(e)();h.clear()}),s((n=[])=>{const o=t()||[];return a(()=>{e=i&&i.parentNode||e;const t=o.length;if(p){if(void 0!==l||void 0!==i){let t=null!=l?l.nextSibling:e.firstChild;U(e,t,void 0===i?null:i)}else e.textContent="";for(let e of h.keys())h.get(e)();h.clear(),p=!1}if(0===t){if(void 0!==l||void 0!==i){let t=null!=l?l.nextSibling:e.firstChild;U(e,t,void 0===i?null:i)}else e.textContent="";for(let e of h.keys())h.get(e)();return h.clear(),y(),d&&(p=!0,c(t=>{const n=K(d(),e,i,++$);h.set(n,t)})),[]}if(0===n.length){let e=new Array(t);for(let n=0;n<t;n++)g(e[n]=o[n],n,i);return y(),e}let r,s,u=0,a=0,f=!0,m=n.length-1,v=t-1,b=l?l.nextSibling:e.firstChild,w=b,C=i?i.previousSibling:e.lastChild,A=i;e:for(;f;){let t;for(f=!1,r=n[u],s=o[a];r===s;){if(u++,a++,w=b=Q(b,G),m<u||v<a)break e;r=n[u],s=o[a]}for(r=n[m],s=o[v];r===s;){if(m--,v--,C=(A=Q(C,J,!0)).previousSibling,m<u||v<a)break e;r=n[m],s=o[v]}for(r=n[m],s=o[a];r===s;){f=!0;let l=(t=Q(C,J)).nextSibling;if(w!==l&&(V(e,l,C.nextSibling,w),C=t),a++,--m<u||v<a)break e;r=n[m],s=o[a]}for(r=n[u],s=o[v];r===s;){if(f=!0,t=Q(b,G),b!==A){let n=t.previousSibling;V(e,b,t,A),A=n,b=t}if(v--,m<++u||v<a)break e;r=n[u],s=o[v]}}if(v<a){if(u<=m){let t,n;for(;u<=m;)t=(n=Q(C,J,!0)).previousSibling,U(e,n,C.nextSibling),W(h,n),C=t,m--}return y(),o.slice(0)}if(m<u){if(a<=v)for(;a<=v;)g(o[a],a,A),a++;return y(),o.slice(0)}const S=new Array(v+1-a);for(let e=a;e<=v;e++)S[e]=-1;const x=new Map;for(let e=a;e<=v;e++)x.set(o[e],e);let N=0,k=[];for(let e=u;e<=m;e++)x.has(n[e])?(S[x.get(n[e])]=e,N++):k.push(e);if(0===N){const t=b!==e.firstChild||C!==e.lastChild;let n,r=b;for(A=C.nextSibling;r!==A;)n=Q(r,G),W(h,r),t&&U(e,r,n),r=n,u++;!t&&(e.textContent="");for(let e=a;e<=v;e++)g(o[e],e,A);return y(),o.slice(0)}const T=function(e,t){for(var n=[],o=[],r=-1,l=new Array(e.length),i=t,s=e.length;i<s;i++){var u=e[i];if(!(u<0)){var c=Y(n,u);-1!==c&&(l[i]=o[c]),c===r?(n[++r]=u,o[r]=i):u<n[c+1]&&(n[c+1]=u,o[c+1]=i)}}for(i=o[r];r>=0;i=l[i],r--)n[r]=i;return n}(S,a),E=[];let L,j=b,M=T.length-1;for(let e=u;e<=m;e++)E[e]=j,j=Q(j,G);for(let t=0;t<k.length;t++){let n=E[k[t]];U(e,n,Q(n,G)),W(h,n)}for(let t=v;t>=a;t--)T[M]===t?(A=E[S[T[M]]],M--):(-1===S[t]?L=g(o[t],t,A):(L=E[S[t]],V(e,L,Q(L,G),A)),A=L);return y(),o.slice(0)})})}function Y(e,t){var n=-1,o=e.length;if(o>0&&e[o-1]<=t)return o-1;for(;o-n>1;){var r=Math.floor((n+o)/2);e[r]>t?o=r:n=r}return n}const Z="property";var ee={href:{type:"attribute"},style:{type:Z,alias:"style.cssText"},for:{type:Z,alias:"htmlFor"},class:{type:Z,alias:"className"},spellCheck:{type:Z,alias:"spellcheck"},allowFullScreen:{type:Z,alias:"allowFullscreen"},autoCapitalize:{type:Z,alias:"autocapitalize"},autoFocus:{type:Z,alias:"autofocus"},autoPlay:{type:Z,alias:"autoplay"}};function te(e,t,n,o){if(!n)return e.textContent="";if(Array.isArray(t))for(let n=0;n<t.length;n++)e.removeChild(t[n]);else if(null!=t&&""!=t)if(void 0!==o){let t,r=n.previousSibling;for(;r!==o;)t=r.previousSibling,e.removeChild(r),r=t}else e.removeChild(n.previousSibling);return""}function ne(e,t){const n=e[t];Object.defineProperty(e,t,{get:()=>n(),enumerable:!0})}const oe=new Set;function re(e){const t=e.composedPath&&e.composedPath()[0]||e.target,[n,o]=function e(t,n){let o,r,l=t[n],i=t.model;return(void 0===l||l.length>1&&void 0===i)&&(r=t.host||t.parentNode)&&(o=e(r,n)),[void 0!==l?l:o&&o[0],i||o&&o[1]]}(t,`__${e.type}`);return e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),n&&n(e,o)}const le=function(e){const{wrap:t,cleanup:n,root:o,sample:r}=e;function l(e,n,o,r){if(n===o)return o;e=r&&r.parentNode||e;const i=typeof n;if("string"===i||"number"===i)if("number"===i&&(n=n.toString()),r){if(""===n)te(e,o,r);else if(""!==o&&"string"==typeof o)r.previousSibling.data=n;else{const t=document.createTextNode(n);""!==o&&null!=o?e.replaceChild(t,r.previousSibling):e.insertBefore(t,r)}o=n}else o=""!==o&&"string"==typeof o?e.firstChild.data=n:e.textContent=n;else if(null==n||"boolean"===i)o=te(e,o,r);else if("function"===i)t(function(){o=l(e,n(),o,r)});else if(n instanceof Node)Array.isArray(o)?0===o.length?e.insertBefore(n,r):1===o.length?e.replaceChild(n,o[0]):(te(e,o,r),e.appendChild(n)):null==o||""===o?e.insertBefore(n,r):e.replaceChild(n,r&&r.previousSibling||e.firstChild),o=n;else{if(!Array.isArray(n))throw new Error("content must be Node, stringable, or array of same");{let t=I([],n);if(te(e,o,r),0!==t.length)for(let n=0,o=t.length;n<o;n++)e.insertBefore(t[n],r);o=t}}return o}function i(e,t){let n;for(const o in t){const r=t[o];if("style"===o)Object.assign(e.style,r);else if("classList"===o)for(const t in r)e.classList.toggle(t,r[t]);else if("events"===o)for(const t in r)e.addEventListener(t,r[t]);else(n=ee[o])?"attribute"===n.type?e.setAttribute(o,r):e[n.alias]=r:e[o]=r}}return Object.assign({insert(e,n,o,r){if("function"!=typeof n)return l(e,n,o,r);t((t=o)=>l(e,n(),t,r))},createComponent(e,t,n){if(n)for(let e=0;e<n.length;e++)ne(t,n[e]);return e(t)},delegateEvents(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];oe.has(n)||(oe.add(n),document.addEventListener(n,re))}},clearDelegatedEvents(){for(let e of oe.keys())document.removeEventListener(e,re);oe.clear()},spread(e,n){if("function"!=typeof n)return i(e,n);t(()=>i(e,n()))},flow(i,s,u,c,a,f){let d;if(f&&(d=f.previousSibling),"each"===s)X(i,u,c,a,e,d,f);else if("when"===s){let e,s;const{afterRender:h,fallback:p}=a;n(function(){s&&s()}),t(t=>{const n=u();return n===t?t:r(()=>(i=f&&f.parentNode||i,s&&s(),null==n||!1===n?(te(i,e,f,d),e=null,h&&h(e,f),p&&o(t=>{s=t,e=l(i,p(),e,f)}),n):(o(t=>{s=t,e=l(i,c(n),e,f)}),h&&h(e,f),n)))})}else if("suspend"===s){const{fallback:e}=a,s=document.implementation.createHTMLDocument(),h=r(c);let p,g,y=!0;for(let e of oe.keys())s.addEventListener(e,re);Object.defineProperty(s.body,"host",{get:()=>f&&f.parentNode||i}),n(function(){p&&p()}),t(t=>{const n=!!u();let c;if(n===t)return t;if(i=f&&f.parentNode||i,n){if(y)l(s.body,h),y=!1;else for(c=d?d.nextSibling:i.firstChild;c&&c!==f;){const e=c.nextSibling;s.body.appendChild(c),c=e}return e&&r(()=>o(t=>{p=t,g=l(i,e(),null,f)})),n}if(y)l(i,h,null,f),y=!1;else for(p&&(te(i,g,f,d),p());c=s.body.firstChild;)i.insertBefore(c,f);return n})}else if("portal"===s){const{useShadow:e}=a,t=document.createElement("div"),o=u&&r(u)||document.body,s=e&&t.attachShadow?t.attachShadow({mode:"open"}):t;Object.defineProperty(t,"host",{get:()=>f&&f.parentNode||i});const d=r(()=>c(t));l(t,d),t!==s&&Promise.resolve().then(()=>{for(;t.firstChild;)s.appendChild(t.firstChild)}),o.appendChild(t),n(()=>o.removeChild(t))}}},e)}({wrap:e.makeComputationNode,root:e.root,cleanup:e.cleanup,sample:e.sample}),ie=document.createElement("template");ie.innerHTML="<pre></pre>";const se=document.createElement("template");se.innerHTML="<div class='Main'></div>";const ue=document.createElement("template");ue.innerHTML="<div class='Tree'></div>";const ce=document.createElement("template");ce.innerHTML="<li class='TreeLeaf'></li>";const ae=document.createElement("template");ae.innerHTML="<ul class='TreeNode'></ul>";const fe=document.createElement("template");fe.innerHTML="<div class='AnimBox'></div>";const de=document.createElement("template");de.innerHTML="<div class='Anim'></div>";const he=document.createElement("template");he.innerHTML="<tr></tr>";const pe=document.createElement("template");pe.innerHTML="<table class='Table'><tbody></tbody></table>";const ge=document.createElement("template");ge.innerHTML="<td class='TableCell'></td>";const ye=document.createElement("template");ye.innerHTML="<td class='TableCell'></td>";const me=({data:e})=>{const t=(e,t)=>{console.log("Clicked"+t),e.stopPropagation()};return function(){const n=pe.content.firstChild.cloneNode(!0),o=n.firstChild;return le.flow(o,"each",()=>e.items,e=>(function(){const n=he.content.firstChild.cloneNode(!0);return le.wrap(()=>n.className=e.active?"TableRow active":"TableRow"),n.setAttribute("data-id",e.id),le.insert(n,(e=>{const n=new Array(e.props.length+1);n[0]=function(){const t=ye.content.firstChild.cloneNode(!0);return t.textContent="#"+e.id,t}();for(let o=1,r=n.length;o<r;o++){const r=e.props[o-1];n[o]=function(){const e=ge.content.firstChild.cloneNode(!0);return e.__click=t,e.model=r,e.textContent=r,e}()}return n})(e)),n})(),{}),n}()},ve=({data:e})=>(function(){const t=ae.content.firstChild.cloneNode(!0);return le.flow(t,"each",()=>e.children,e=>e.container?ve({data:e}):function(){const t=ce.content.firstChild.cloneNode(!0);return t.textContent=e.id,t}(),{}),t})(),be=({data:e})=>{const t=()=>{const t=e.location;return D(()=>"table"===t?me({data:e.table}):"anim"===t?(({data:e})=>(function(){const t=de.content.firstChild.cloneNode(!0);return le.flow(t,"each",()=>e.items,e=>(function(){const t=fe.content.firstChild.cloneNode(!0);return t.setAttribute("data-id",e.id),le.wrap(()=>Object.assign(t.style,{borderRadius:(e.time%10).toString()+"px",background:"rgba(0,0,0,"+(.5+e.time%10/10).toString()+")"})),t})(),{}),t})())({data:e.anim}):"tree"===t?(({data:e})=>(function(){const t=ue.content.firstChild.cloneNode(!0);return le.insert(t,ve({data:e.root})),t})())({data:e.tree}):void 0)};return function(){const e=se.content.firstChild.cloneNode(!0);return le.insert(e,t),e}()};uibench.init("Solid","0.5.0");const[we,Ce]=function(t={}){return[E(t=j(t)),function(){const n=arguments;e.freeze(()=>{if(Array.isArray(n[0]))for(let e=0;e<n.length;e+=1)H(t,n[e]);else H(t,Array.prototype.slice.call(n))})}]}();z(()=>document.querySelector("#App").appendChild(be({data:we}))),document.addEventListener("DOMContentLoaded",function(e){uibench.run(e=>Ce(function(e,t={}){let n;Array.isArray(e)?n=e.pop():"object"==typeof e?(n=e,e=void 0):(e=Array.prototype.slice.call(arguments,0,-1),n=arguments[arguments.length-1],t={});const{merge:o,key:r="id"}=t;return t=>{if(t=j(t),e){for(let n=0;n<e.length-1;n+=1)t=t[e[n]];B(n,t,e[e.length-1],o,r)}else B(n,{state:t},"state",o,r)}}(e)),e=>{document.body.textContent="",document.body.appendChild(function(){const t=ie.content.firstChild.cloneNode(!0);return le.insert(t,JSON.stringify(e,null," ")),t}())})}),le.delegateEvents(["click"])}();
