!function(){"use strict";var e=function(e,t){var n=new o(e,t);return function(){return n.current()}};Object.defineProperty(e,"default",{value:e}),e.root=function(e){var t=p,n=0===e.length?g:new o(null,null),r=void 0,l=0===e.length?null:function(){null!==d?f.disposes.add(n):N(n)};return p=n,null===d?r=function(e,t,n){try{return null===t?e():e(t)}finally{p=n}}(e,l,t):(r=null===l?e():e(l),p=t),r},e.on=function(t,n,r,o){var l;return Array.isArray(t)&&(l=t,t=function(){for(var e=0;e<l.length;e++)l[e]()}),o=!!o,e(i,r);function i(e){var r=h;return t(),o?o=!1:(h=null,e=n(e),h=r),e}},e.effect=function(e,t){new o(e,t)},e.data=function(e){var t=new r(e);return function(e){return 0===arguments.length?t.current():t.next(e)}},e.value=function(t,n){var r=e.data(t),o=-1;return function(e){if(0===arguments.length)return r();if(!(n?n(t,e):t===e)){var l=f.time;if(o===l)throw new Error("conflicting values: "+e+" is not the same as "+t);o=l,t=e,r(e)}return e}},e.freeze=function(e){var t=void 0;if(null!==d)t=e();else{(d=f).changes.reset();try{t=e(),v()}finally{d=null}}return t},e.sample=function(e){var t,n=h;return null!==n?(h=null,t=e(),h=n):t=e(),t},e.cleanup=function(e){null!==p?null===p.cleanups?p.cleanups=[e]:p.cleanups.push(e):console.warn("cleanups created without a root or parent will never be run")},e.makeDataNode=function(e){return new r(e)},e.makeComputationNode=function(e,t){return new o(e,t)},e.isFrozen=function(){return null!==d},e.isListening=function(){return null!==h};var t=function(){return function(){this.time=0,this.changes=new i,this.updates=new i,this.disposes=new i}}(),n={time:function(){return f.time}},r=function(){function e(e){this.value=e,this.pending=s,this.log=null}return e.prototype.current=function(){return null!==h&&function(e,t){null===e.log&&(e.log=new l);y(e.log,t)}(this,h),this.value},e.prototype.next=function(e){if(null!==d)if(this.pending!==s){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,f.changes.add(this);else null!==this.log?(this.pending=e,f.changes.add(this),v()):this.value=e;return e},e.prototype.clock=function(){return n},e}(),o=function(){function e(e,t){if(this.state=u,this.source1=null,this.source1slot=0,this.sources=null,this.sourceslots=null,this.log=null,this.owned=null,this.cleanups=null,this.fn=e,this.value=t,this.age=f.time,null!==e){var n=p,r=h;null===n&&console.warn("computations created without a root or parent will never be disposed"),p=h=this,null===d?function(e){d=f,f.changes.reset(),f.updates.reset();try{e.value=e.fn(e.value),(f.changes.count>0||f.updates.count>0)&&(f.time++,m(f))}finally{d=p=h=null}}(this):this.value=this.fn(this.value),n&&n!==g&&(null===n.owned?n.owned=[this]:n.owned.push(this)),p=n,h=r}}return e.prototype.current=function(){if(null!==h){if(this.age===f.time){if(this.state===c)throw new Error("circular dependency");S(this)}!function(e,t){null===e.log&&(e.log=new l);y(e.log,t)}(this,h)}return this.value},e.prototype.clock=function(){return n},e}(),l=function(){return function(){this.node1=null,this.node1slot=0,this.nodes=null,this.nodeslots=null}}(),i=function(){function e(){this.items=[],this.count=0}return e.prototype.reset=function(){this.count=0},e.prototype.add=function(e){this.items[this.count++]=e},e.prototype.run=function(e){for(var t=this.items,n=0;n<this.count;n++)e(t[n]),t[n]=null;this.count=0},e}(),s={},u=0,a=1,c=2,f=new t,d=null,h=null,p=null,g=new o(null,null);function y(e,t){var n,r=null===t.source1?-1:null===t.sources?0:t.sources.length;null===e.node1?(e.node1=t,e.node1slot=r,n=-1):null===e.nodes?(e.nodes=[t],e.nodeslots=[r],n=0):(n=e.nodes.length,e.nodes.push(t),e.nodeslots.push(r)),null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}function v(){var e=p;f.updates.reset(),f.time++;try{m(f)}finally{d=h=null,p=e}}function m(e){var t=d,n=0;for(d=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(n>0&&e.time++,e.changes.run(b),e.updates.run(S),e.disposes.run(N),n++>1e5)throw new Error("Runaway clock detected");d=t}function b(e){e.value=e.pending,e.pending=s,e.log&&w(e.log)}function w(e){var t=e.node1,n=e.nodes;if(null!==t&&C(t),null!==n)for(var r=0,o=n.length;r<o;r++)C(n[r])}function C(e){var t=f.time;e.age<t&&(e.age=t,e.state=a,f.updates.add(e),null!==e.owned&&function e(t){for(var n=0;n<t.length;n++){var r=t[n];r.age=f.time,r.state=u,null!==r.owned&&e(r.owned)}}(e.owned),null!==e.log&&w(e.log))}function S(e){if(e.state===a){var t=p,n=h;p=h=e,e.state=c,A(e,!1),e.value=e.fn(e.value),e.state=u,p=t,h=n}}function A(e,t){var n,r,o=e.source1,l=e.sources,i=e.sourceslots,s=e.cleanups,u=e.owned;if(null!==s){for(n=0;n<s.length;n++)s[n](t);e.cleanups=null}if(null!==u){for(n=0;n<u.length;n++)N(u[n]);e.owned=null}if(null!==o&&(x(o,e.source1slot),e.source1=null),null!==l)for(n=0,r=l.length;n<r;n++)x(l.pop(),i.pop())}function x(e,t){var n,r,o=e.nodes,l=e.nodeslots;-1===t?e.node1=null:(n=o.pop(),r=l.pop(),t!==o.length&&(o[t]=n,l[t]=r,-1===r?n.source1slot=t:n.sourceslots[r]=t))}function N(e){e.fn=null,e.log=null,A(e,!0)}const k=Symbol("solid-node"),E=Symbol("solid-proxy");function j(e){return e[E]||(e[E]=new Proxy(e,_))}function O(e){return null!==e&&"object"==typeof e&&(e.__proto__===Object.prototype||Array.isArray(e))}function P(e){let t,n,r;if(t=null!=e&&e._state)return t;if(!O(e))return e;if(Array.isArray(e)){Object.isFrozen(e)&&(e=e.slice(0));for(let t=0,o=e.length;t<o;t++)(n=P(r=e[t]))!==r&&(e[t]=n)}else{Object.isFrozen(e)&&(e=Object.assign({},e));let t=Object.keys(e);for(let o=0,l=t.length;o<l;o++)(n=P(r=e[t[o]]))!==r&&(e[t[o]]=n)}return e}function T(e){let t=e[k];return t||(e[k]=t={}),t}const _={get(t,n){if("_state"===n)return t;if(n===E||n===k)return;const r=t[n],o=O(r);if(e.isListening()&&"function"!=typeof r){let l,i;o&&(l=T(r))&&(i=l._self||(l._self=e.makeDataNode())).current(),(i=(l=T(t))[n]||(l[n]=e.makeDataNode())).current()}return o?j(r):r},set:()=>!0,deleteProperty:()=>!0};function L(e,t,n){if(n=P(n),e[t]===n)return;const r=Array.isArray(e)||!(t in e);void 0===n?delete e[t]:e[t]=n;let o,l=T(e);(o=l[t])&&o.next(),r&&(o=l._self)&&o.next()}function M(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const o=n[r];L(e,o,t[o])}}function B(e,t,n=[]){if(1===t.length){let r=t[0];if("function"==typeof r&&void 0===(r=r(j(e),n)))return;return void M(e,r)}const r=t.shift(),o=typeof r,l=Array.isArray(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)B(e,[r[o]].concat(t),n.concat([r[o]]));else if(l&&"function"===o)for(let o=0;o<e.length;o++)r(e[o],o)&&B(e,[o].concat(t),n.concat([o]));else if(l&&"object"===o){const{from:o=0,to:l=e.length-1,by:i=1}=r;for(let r=o;r<=l;r+=i)B(e,[r].concat(t),n.concat([r]))}else if(l&&"*"===r)for(let r=0;r<e.length;r++)B(e,[r].concat(t),n.concat([r]));else if(1===t.length){let o=t[0];if("function"==typeof o){const t=e[r];o=o(O(t)?j(t):t,n.concat([r]))}O(e[r])&&O(o)&&!Array.isArray(o)?M(e[r],o):L(e,r,o)}else B(e[r],t,n.concat([r]))}function z(e,t,n,r,o){let l=t[n];if(e===l)return;if(!O(e)||null==l)return void(e!==l&&L(t,n,e));if(Array.isArray(e)){if(e.length&&l.length&&(!r||o&&null!=e[0][o])){let t,n,i,s,u,a,c,f,d=new Array(e.length),h=new Map;for(i=0,s=Math.min(l.length,e.length);i<s&&(l[i]===e[i]||o&&l[i][o]===e[i][o]);i++)z(e[i],l,i,r,o);for(s=l.length-1,u=e.length-1;s>=0&&u>=0&&(l[s]===e[u]||o&&l[s][o]===e[u][o]);s--,u--)d[u]=l[s];for(c=new Array(u+1),n=u;n>=i;n--)a=e[n],f=o?a[o]:a,t=h.get(f),c[n]=void 0===t?-1:t,h.set(f,n);for(t=i;t<=s;t++)a=l[t],f=o?a[o]:a,void 0!==(n=h.get(f))&&-1!==n&&(d[n]=l[t],n=c[n],h.set(f,n));for(n=i;n<e.length;n++)d.hasOwnProperty(n)?(L(l,n,d[n]),z(e[n],l,n,r,o)):L(l,n,e[n])}else for(let t=0,n=e.length;t<n;t++)z(e[t],l,t,r,o);return void(l.length>e.length&&L(l,"length",e.length))}const i=Object.keys(e);for(let t=0,n=i.length;t<n;t++)z(e[i[t]],l,i[t],r,o);const s=Object.keys(l);for(let t=0,n=s.length;t<n;t++)void 0===e[s[t]]&&L(l,s[t],void 0)}const{root:F,cleanup:D,sample:H,freeze:R}=e,q="__rGroup",Q="nextSibling",V="previousSibling";let G=0;function I(e,t){for(var n=0,r=t.length;n<r;n++){var o=t[n];o instanceof Node?11===o.nodeType?I(e,o.childNodes):e.push(o):null==o||!0===o||!1===o||(Array.isArray(o)?I(e,o):"string"==typeof o?e.push(document.createTextNode(o)):e.push(document.createTextNode(o.toString())))}return e}function $(e,t,n,r){if(Array.isArray(e)){if(!e.length)return;let o=(e=I([],e))[0];1!==e.length&&(o[q]=e[e.length-1][q]=r);for(let r=0;r<e.length;r++)n?t.insertBefore(e[r],n):t.appendChild(e[r]);return o}let o,l=typeof e;return"string"===l||"number"===l?e=document.createTextNode(e):11===e.nodeType&&(o=e.firstChild)&&o!==e.lastChild&&(o[q]=e.lastChild[q]=r),n?t.insertBefore(e,n):t.appendChild(e),o||e}function J(e,t,n){const r=e[q];if(r)for(e=e[t];e&&e[q]!==r;)e=e[t];return n?e:e[t]}function K(e,t,n){let r;for(;t!==n;)r=t.nextSibling,e.removeChild(t),t=r}function U(e,t,n,r){let o;for(;t!==n;)o=t.nextSibling,e.insertBefore(t,r),t=o}function W(e,t){e.get(t)(),e.delete(t)}function X(e,t,n,r,o,l,i){const{wrap:s,cleanup:u,root:a,sample:c}=o,{afterRender:f,fallback:d}=r;let h=new Map,p=!1;function g(t,r,o){return a(l=>{const i=$(n(t,r),e,o,++G);return h.set(i,l),i})}function y(){f&&f(l?l.nextSibling:e.firstChild,i)}u(function(){for(let e of h.keys())h.get(e)();h.clear()}),s((n=[])=>{const r=t()||[];return c(()=>{e=i&&i.parentNode||e;const t=r.length;if(p){if(void 0!==l||void 0!==i){let t=null!=l?l.nextSibling:e.firstChild;K(e,t,void 0===i?null:i)}else e.textContent="";for(let e of h.keys())h.get(e)();h.clear(),p=!1}if(0===t){if(void 0!==l||void 0!==i){let t=null!=l?l.nextSibling:e.firstChild;K(e,t,void 0===i?null:i)}else e.textContent="";for(let e of h.keys())h.get(e)();return h.clear(),y(),d&&(p=!0,a(t=>{const n=$(d(),e,i,++G);h.set(n,t)})),[]}if(0===n.length){let e=new Array(t);for(let n=0;n<t;n++)g(e[n]=r[n],n,i);return y(),e}let o,s,u=0,c=0,f=!0,v=n.length-1,m=t-1,b=l?l.nextSibling:e.firstChild,w=b,C=i?i.previousSibling:e.lastChild,S=i;e:for(;f;){let t;for(f=!1,o=n[u],s=r[c];o===s;){if(u++,c++,w=b=J(b,Q),v<u||m<c)break e;o=n[u],s=r[c]}for(o=n[v],s=r[m];o===s;){if(v--,m--,C=(S=J(C,V,!0)).previousSibling,v<u||m<c)break e;o=n[v],s=r[m]}for(o=n[v],s=r[c];o===s;){f=!0;let l=(t=J(C,V)).nextSibling;if(w!==l&&(U(e,l,C.nextSibling,w),C=t),c++,--v<u||m<c)break e;o=n[v],s=r[c]}for(o=n[u],s=r[m];o===s;){if(f=!0,t=J(b,Q),b!==S){let n=t.previousSibling;U(e,b,t,S),S=n,b=t}if(m--,v<++u||m<c)break e;o=n[u],s=r[m]}}if(m<c){if(u<=v){let t,n;for(;u<=v;)t=(n=J(C,V,!0)).previousSibling,K(e,n,C.nextSibling),W(h,n),C=t,v--}return y(),r.slice(0)}if(v<u){if(c<=m)for(;c<=m;)g(r[c],c,S),c++;return y(),r.slice(0)}const A=new Array(m+1-c);for(let e=c;e<=m;e++)A[e]=-1;const x=new Map;for(let e=c;e<=m;e++)x.set(r[e],e);let N=0,k=[];for(let e=u;e<=v;e++)x.has(n[e])?(A[x.get(n[e])]=e,N++):k.push(e);if(0===N){const t=b!==e.firstChild||C!==e.lastChild;let n,o=b;for(S=C.nextSibling;o!==S;)n=J(o,Q),W(h,o),t&&K(e,o,n),o=n,u++;!t&&(e.textContent="");for(let e=c;e<=m;e++)g(r[e],e,S);return y(),r.slice(0)}const E=function(e,t){for(var n=[],r=[],o=-1,l=new Array(e.length),i=t,s=e.length;i<s;i++){var u=e[i];if(!(u<0)){var a=Y(n,u);-1!==a&&(l[i]=r[a]),a===o?(n[++o]=u,r[o]=i):u<n[a+1]&&(n[a+1]=u,r[a+1]=i)}}for(i=r[o];o>=0;i=l[i],o--)n[o]=i;return n}(A,c),j=[];let O,P=b,T=E.length-1;for(let e=u;e<=v;e++)j[e]=P,P=J(P,Q);for(let t=0;t<k.length;t++){let n=j[k[t]];K(e,n,J(n,Q)),W(h,n)}for(let t=m;t>=c;t--)E[T]===t?(S=j[A[E[T]]],T--):(-1===A[t]?O=g(r[t],t,S):(O=j[A[t]],U(e,O,J(O,Q),S)),S=O);return y(),r.slice(0)})})}function Y(e,t){var n=-1,r=e.length;if(r>0&&e[r-1]<=t)return r-1;for(;r-n>1;){var o=Math.floor((n+r)/2);e[o]>t?r=o:n=o}return n}const Z="property";var ee={href:{type:"attribute"},style:{type:Z,alias:"style.cssText"},for:{type:Z,alias:"htmlFor"},class:{type:Z,alias:"className"},spellCheck:{type:Z,alias:"spellcheck"},allowFullScreen:{type:Z,alias:"allowFullscreen"},autoCapitalize:{type:Z,alias:"autocapitalize"},autoFocus:{type:Z,alias:"autofocus"},autoPlay:{type:Z,alias:"autoplay"}};function te(e,t,n,r){if(!n)return e.textContent="";if(Array.isArray(t))for(let n=0;n<t.length;n++)e.removeChild(t[n]);else if(null!=t&&""!=t)if(void 0!==r){let t,o=n.previousSibling;for(;o!==r;)t=o.previousSibling,e.removeChild(o),o=t}else e.removeChild(n.previousSibling);return""}function ne(e,t){const n=e[t];Object.defineProperty(e,t,{get:()=>n(),enumerable:!0})}const re=new Set;function oe(e){const t=e.composedPath&&e.composedPath()[0]||e.target,[n,r]=function e(t,n){let r,o,l=t[n],i=t.model;return(void 0===l||l.length>1&&void 0===i)&&(o=t.host||t.parentNode)&&(r=e(o,n)),[void 0!==l?l:r&&r[0],i||r&&r[1]]}(t,`__${e.type}`);return e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),n&&n(e,r)}const le=function(e){const{wrap:t,cleanup:n,root:r,sample:o}=e;function l(e,n,r,o){if(n===r)return r;e=o&&o.parentNode||e;const i=typeof n;if("string"===i||"number"===i)if("number"===i&&(n=n.toString()),o){if(""===n)te(e,r,o);else if(""!==r&&"string"==typeof r)o.previousSibling.data=n;else{const t=document.createTextNode(n);""!==r&&null!=r?e.replaceChild(t,o.previousSibling):e.insertBefore(t,o)}r=n}else r=""!==r&&"string"==typeof r?e.firstChild.data=n:e.textContent=n;else if(null==n||"boolean"===i)r=te(e,r,o);else if("function"===i)t(function(){r=l(e,n(),r,o)});else if(n instanceof Node)Array.isArray(r)?0===r.length?e.insertBefore(n,o):1===r.length?e.replaceChild(n,r[0]):(te(e,r,o),e.appendChild(n)):null==r||""===r?e.insertBefore(n,o):e.replaceChild(n,o&&o.previousSibling||e.firstChild),r=n;else{if(!Array.isArray(n))throw new Error("content must be Node, stringable, or array of same");{let t=I([],n);if(te(e,r,o),0!==t.length)for(let n=0,r=t.length;n<r;n++)e.insertBefore(t[n],o);r=t}}return r}function i(e,t){let n;for(const r in t){const o=t[r];if("style"===r)Object.assign(e.style,o);else if("classList"===r)for(const t in o)e.classList.toggle(t,o[t]);else if("events"===r)for(const t in o)e.addEventListener(t,o[t]);else(n=ee[r])?"attribute"===n.type?e.setAttribute(r,o):e[n.alias]=o:e[r]=o}}return Object.assign({insert(e,n,r,o){if("function"!=typeof n)return l(e,n,r,o);t((t=r)=>l(e,n(),t,o))},createComponent(e,t,n){if(n)for(let e=0;e<n.length;e++)ne(t,n[e]);return e(t)},delegateEvents(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];re.has(n)||(re.add(n),document.addEventListener(n,oe))}},clearDelegatedEvents(){for(let e of re.keys())document.removeEventListener(e,oe);re.clear()},spread(e,n){if("function"!=typeof n)return i(e,n);t(()=>i(e,n()))},flow(i,s,u,a,c,f){let d;if(f&&(d=f.previousSibling),"each"===s)X(i,u,a,c,e,d,f);else if("when"===s){let e,s;const{afterRender:h,fallback:p}=c;n(function(){s&&s()}),t(t=>{const n=u();return n===t?t:o(()=>(i=f&&f.parentNode||i,s&&s(),null==n||!1===n?(te(i,e,f,d),e=null,h&&h(e,f),p&&r(t=>{s=t,e=l(i,p(),e,f)}),n):(r(t=>{s=t,e=l(i,a(n),e,f)}),h&&h(e,f),n)))})}else if("suspend"===s){const{fallback:e}=c,s=document.implementation.createHTMLDocument(),h=o(a);let p,g,y=!0;for(let e of re.keys())s.addEventListener(e,oe);Object.defineProperty(s.body,"host",{get:()=>f&&f.parentNode||i}),n(function(){p&&p()}),t(t=>{const n=!!u();let a;if(n===t)return t;if(i=f&&f.parentNode||i,n){if(y)l(s.body,h),y=!1;else for(a=d?d.nextSibling:i.firstChild;a&&a!==f;){const e=a.nextSibling;s.body.appendChild(a),a=e}return e&&o(()=>r(t=>{p=t,g=l(i,e(),null,f)})),n}if(y)l(i,h,null,f),y=!1;else for(p&&(te(i,g,f,d),p());a=s.body.firstChild;)i.insertBefore(a,f);return n})}else if("portal"===s){const{useShadow:e}=c,t=document.createElement("div"),r=u&&o(u)||document.body,s=e&&t.attachShadow?t.attachShadow({mode:"open"}):t;Object.defineProperty(t,"host",{get:()=>f&&f.parentNode||i});const d=o(()=>a(t));l(t,d),t!==s&&Promise.resolve().then(()=>{for(;t.firstChild;)s.appendChild(t.firstChild)}),r.appendChild(t),n(()=>r.removeChild(t))}}},e)}({wrap:e.makeComputationNode,root:e.root,cleanup:e.cleanup,sample:e.sample}),ie=document.createElement("template");ie.innerHTML="<td>\x3c!--9--\x3e<div class='popover left'><div class='popover-content'></div><div class='arrow'></div></div></td>";const se=document.createElement("template");se.innerHTML="<tr><td class='dbname'></td><td class='query-count'><span></span></td>\x3c!--7--\x3e</tr>";const ue=document.createElement("template");ue.innerHTML="<table class='table table-striped latest-data'><tbody></tbody></table>";const ae=()=>{const[t,n]=function(t={}){return[j(t=P(t)),function(){const n=arguments;e.freeze(()=>{if(Array.isArray(n[0]))for(let e=0;e<n.length;e+=1)B(t,n[e]);else B(t,Array.prototype.slice.call(n))})}]}({databases:[]}),r=()=>{Monitoring.renderRate.ping();const e=ENV.generateData().toArray();Promise.resolve(e).then(e=>n(function(e,t={}){let n;Array.isArray(e)?n=e.pop():"object"==typeof e?(n=e,e=void 0):(e=Array.prototype.slice.call(arguments,0,-1),n=arguments[arguments.length-1],t={});const{merge:r,key:o="id"}=t;return t=>{if(t=P(t),e){for(let n=0;n<e.length-1;n+=1)t=t[e[n]];z(n,t,e[e.length-1],r,o)}else z(n,{state:t},"state",r,o)}}(["databases",e],{merge:!0,key:null}))),setTimeout(r,ENV.timeout)};return setTimeout(r,0),function(){const e=ue.content.firstChild.cloneNode(!0),n=e.firstChild;return le.flow(n,"each",()=>t.databases,e=>(function(){const t=se.content.firstChild.cloneNode(!0),n=t.firstChild,r=n.nextSibling,o=r.firstChild,l=r.nextSibling;return n.textContent=e.dbname,le.wrap(()=>o.className=e.lastSample.countClassName),le.insert(o,()=>e.lastSample.nbQueries),le.flow(t,"each",()=>e.lastSample.topFiveQueries,e=>(function(){const t=ie.content.firstChild.cloneNode(!0),n=t.firstChild,r=n.nextSibling.firstChild;return le.wrap(()=>t.className=e.elapsedClassName),le.insert(t,()=>e.formatElapsed,null,n),le.insert(r,()=>e.query),t})(),{},l),t})(),{}),e}()};F(()=>document.getElementById("dbmon").appendChild(ae()))}();
