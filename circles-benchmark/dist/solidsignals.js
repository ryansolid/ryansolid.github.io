!function(){"use strict";var e=function(e,t){var n=new l(e,t);return function(){return n.current()}};Object.defineProperty(e,"default",{value:e}),e.root=function(e){var t=p,n=0===e.length?g:new l(null,null),o=void 0,r=0===e.length?null:function(){null!==d?f.disposes.add(n):N(n)};return p=n,null===d?o=function(e,t,n){try{return null===t?e():e(t)}finally{p=n}}(e,r,t):(o=null===r?e():e(r),p=t),o},e.on=function(t,n,o,l){var r;return Array.isArray(t)&&(r=t,t=function(){for(var e=0;e<r.length;e++)r[e]()}),l=!!l,e(i,o);function i(e){var o=h;return t(),l?l=!1:(h=null,e=n(e),h=o),e}},e.effect=function(e,t){new l(e,t)},e.data=function(e){var t=new o(e);return function(e){return 0===arguments.length?t.current():t.next(e)}},e.value=function(t,n){var o=e.data(t),l=-1;return function(e){if(0===arguments.length)return o();if(!(n?n(t,e):t===e)){var r=f.time;if(l===r)throw new Error("conflicting values: "+e+" is not the same as "+t);l=r,t=e,o(e)}return e}},e.freeze=function(e){var t=void 0;if(null!==d)t=e();else{(d=f).changes.reset();try{t=e(),m()}finally{d=null}}return t},e.sample=function(e){var t,n=h;return null!==n?(h=null,t=e(),h=n):t=e(),t},e.cleanup=function(e){null!==p?null===p.cleanups?p.cleanups=[e]:p.cleanups.push(e):console.warn("cleanups created without a root or parent will never be run")},e.makeDataNode=function(e){return new o(e)},e.makeComputationNode=function(e,t){return new l(e,t)},e.isFrozen=function(){return null!==d},e.isListening=function(){return null!==h};var t=function(){return function(){this.time=0,this.changes=new i,this.updates=new i,this.disposes=new i}}(),n={time:function(){return f.time}},o=function(){function e(e){this.value=e,this.pending=s,this.log=null}return e.prototype.current=function(){return null!==h&&function(e,t){null===e.log&&(e.log=new r);v(e.log,t)}(this,h),this.value},e.prototype.next=function(e){if(null!==d)if(this.pending!==s){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,f.changes.add(this);else null!==this.log?(this.pending=e,f.changes.add(this),m()):this.value=e;return e},e.prototype.clock=function(){return n},e}(),l=function(){function e(e,t){if(this.state=u,this.source1=null,this.source1slot=0,this.sources=null,this.sourceslots=null,this.log=null,this.owned=null,this.cleanups=null,this.fn=e,this.value=t,this.age=f.time,null!==e){var n=p,o=h;null===n&&console.warn("computations created without a root or parent will never be disposed"),p=h=this,null===d?function(e){d=f,f.changes.reset(),f.updates.reset();try{e.value=e.fn(e.value),(f.changes.count>0||f.updates.count>0)&&(f.time++,y(f))}finally{d=p=h=null}}(this):this.value=this.fn(this.value),n&&n!==g&&(null===n.owned?n.owned=[this]:n.owned.push(this)),p=n,h=o}}return e.prototype.current=function(){if(null!==h){if(this.age===f.time){if(this.state===c)throw new Error("circular dependency");S(this)}!function(e,t){null===e.log&&(e.log=new r);v(e.log,t)}(this,h)}return this.value},e.prototype.clock=function(){return n},e}(),r=function(){return function(){this.node1=null,this.node1slot=0,this.nodes=null,this.nodeslots=null}}(),i=function(){function e(){this.items=[],this.count=0}return e.prototype.reset=function(){this.count=0},e.prototype.add=function(e){this.items[this.count++]=e},e.prototype.run=function(e){for(var t=this.items,n=0;n<this.count;n++)e(t[n]),t[n]=null;this.count=0},e}(),s={},u=0,a=1,c=2,f=new t,d=null,h=null,p=null,g=new l(null,null);function v(e,t){var n,o=null===t.source1?-1:null===t.sources?0:t.sources.length;null===e.node1?(e.node1=t,e.node1slot=o,n=-1):null===e.nodes?(e.nodes=[t],e.nodeslots=[o],n=0):(n=e.nodes.length,e.nodes.push(t),e.nodeslots.push(o)),null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}function m(){var e=p;f.updates.reset(),f.time++;try{y(f)}finally{d=h=null,p=e}}function y(e){var t=d,n=0;for(d=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(n>0&&e.time++,e.changes.run(b),e.updates.run(S),e.disposes.run(N),n++>1e5)throw new Error("Runaway clock detected");d=t}function b(e){e.value=e.pending,e.pending=s,e.log&&w(e.log)}function w(e){var t=e.node1,n=e.nodes;if(null!==t&&C(t),null!==n)for(var o=0,l=n.length;o<l;o++)C(n[o])}function C(e){var t=f.time;e.age<t&&(e.age=t,e.state=a,f.updates.add(e),null!==e.owned&&function e(t){for(var n=0;n<t.length;n++){var o=t[n];o.age=f.time,o.state=u,null!==o.owned&&e(o.owned)}}(e.owned),null!==e.log&&w(e.log))}function S(e){if(e.state===a){var t=p,n=h;p=h=e,e.state=c,x(e,!1),e.value=e.fn(e.value),e.state=u,p=t,h=n}}function x(e,t){var n,o,l=e.source1,r=e.sources,i=e.sourceslots,s=e.cleanups,u=e.owned;if(null!==s){for(n=0;n<s.length;n++)s[n](t);e.cleanups=null}if(null!==u){for(n=0;n<u.length;n++)N(u[n]);e.owned=null}if(null!==l&&(k(l,e.source1slot),e.source1=null),null!==r)for(n=0,o=r.length;n<o;n++)k(r.pop(),i.pop())}function k(e,t){var n,o,l=e.nodes,r=e.nodeslots;-1===t?e.node1=null:(n=l.pop(),o=r.pop(),t!==l.length&&(l[t]=n,r[t]=o,-1===o?n.source1slot=t:n.sourceslots[o]=t))}function N(e){e.fn=null,e.log=null,x(e,!0)}function A(t,n){const o=e.makeDataNode(t);let l;if(n){let e=-1;l=(l=>{if(!n(t,l)){const n=o.clock().time();if(n===e)throw new Error(`Conflicting value update: ${l} is not the same as ${t}`);e=n,t=l,o.next(l)}})}else l=o.next.bind(o);return[o.current.bind(o),l]}const{root:E,cleanup:B,sample:L,freeze:T}=e,P="__rGroup",j="nextSibling",F="previousSibling";let O=0;function M(e,t){for(var n=0,o=t.length;n<o;n++){var l=t[n];l instanceof Node?11===l.nodeType?M(e,l.childNodes):e.push(l):null==l||!0===l||!1===l||(Array.isArray(l)?M(e,l):"string"==typeof l?e.push(document.createTextNode(l)):e.push(document.createTextNode(l.toString())))}return e}function $(e,t,n,o){if(Array.isArray(e)){if(!e.length)return;let l=(e=M([],e))[0];1!==e.length&&(l[P]=e[e.length-1][P]=o);for(let o=0;o<e.length;o++)n?t.insertBefore(e[o],n):t.appendChild(e[o]);return l}let l,r=typeof e;return"string"===r||"number"===r?e=document.createTextNode(e):11===e.nodeType&&(l=e.firstChild)&&l!==e.lastChild&&(l[P]=e.lastChild[P]=o),n?t.insertBefore(e,n):t.appendChild(e),l||e}function z(e,t,n){const o=e[P];if(o)for(e=e[t];e&&e[P]!==o;)e=e[t];return n?e:e[t]}function D(e,t,n){let o;for(;t!==n;)o=t.nextSibling,e.removeChild(t),t=o}function _(e,t,n,o){let l;for(;t!==n;)l=t.nextSibling,e.insertBefore(t,o),t=l}function R(e,t){e.get(t)(),e.delete(t)}function H(e,t,n,o,l,r,i){const{wrap:s,cleanup:u,root:a,sample:c}=l,{afterRender:f,fallback:d}=o;let h=new Map,p=!1;function g(t,o,l){return a(r=>{const i=$(n(t,o),e,l,++O);return h.set(i,r),i})}function v(){f&&f(r?r.nextSibling:e.firstChild,i)}u(function(){for(let e of h.keys())h.get(e)();h.clear()}),s((n=[])=>{const o=t()||[];return c(()=>{e=i&&i.parentNode||e;const t=o.length;if(p){if(void 0!==r||void 0!==i){let t=null!=r?r.nextSibling:e.firstChild;D(e,t,void 0===i?null:i)}else e.textContent="";for(let e of h.keys())h.get(e)();h.clear(),p=!1}if(0===t){if(void 0!==r||void 0!==i){let t=null!=r?r.nextSibling:e.firstChild;D(e,t,void 0===i?null:i)}else e.textContent="";for(let e of h.keys())h.get(e)();return h.clear(),v(),d&&(p=!0,a(t=>{const n=$(d(),e,i,++O);h.set(n,t)})),[]}if(0===n.length){let e=new Array(t);for(let n=0;n<t;n++)g(e[n]=o[n],n,i);return v(),e}let l,s,u=0,c=0,f=!0,m=n.length-1,y=t-1,b=r?r.nextSibling:e.firstChild,w=b,C=i?i.previousSibling:e.lastChild,S=i;e:for(;f;){let t;for(f=!1,l=n[u],s=o[c];l===s;){if(u++,c++,w=b=z(b,j),m<u||y<c)break e;l=n[u],s=o[c]}for(l=n[m],s=o[y];l===s;){if(m--,y--,C=(S=z(C,F,!0)).previousSibling,m<u||y<c)break e;l=n[m],s=o[y]}for(l=n[m],s=o[c];l===s;){f=!0;let r=(t=z(C,F)).nextSibling;if(w!==r&&(_(e,r,C.nextSibling,w),C=t),c++,--m<u||y<c)break e;l=n[m],s=o[c]}for(l=n[u],s=o[y];l===s;){if(f=!0,t=z(b,j),b!==S){let n=t.previousSibling;_(e,b,t,S),S=n,b=t}if(y--,m<++u||y<c)break e;l=n[u],s=o[y]}}if(y<c){if(u<=m){let t,n;for(;u<=m;)t=(n=z(C,F,!0)).previousSibling,D(e,n,C.nextSibling),R(h,n),C=t,m--}return v(),o.slice(0)}if(m<u){if(c<=y)for(;c<=y;)g(o[c],c,S),c++;return v(),o.slice(0)}const x=new Array(y+1-c);for(let e=c;e<=y;e++)x[e]=-1;const k=new Map;for(let e=c;e<=y;e++)k.set(o[e],e);let N=0,A=[];for(let e=u;e<=m;e++)k.has(n[e])?(x[k.get(n[e])]=e,N++):A.push(e);if(0===N){const t=b!==e.firstChild||C!==e.lastChild;let n,l=b;for(S=C.nextSibling;l!==S;)n=z(l,j),R(h,l),t&&D(e,l,n),l=n,u++;!t&&(e.textContent="");for(let e=c;e<=y;e++)g(o[e],e,S);return v(),o.slice(0)}const E=function(e,t){for(var n=[],o=[],l=-1,r=new Array(e.length),i=t,s=e.length;i<s;i++){var u=e[i];if(!(u<0)){var a=G(n,u);-1!==a&&(r[i]=o[a]),a===l?(n[++l]=u,o[l]=i):u<n[a+1]&&(n[a+1]=u,o[a+1]=i)}}for(i=o[l];l>=0;i=r[i],l--)n[l]=i;return n}(x,c),B=[];let L,T=b,P=E.length-1;for(let e=u;e<=m;e++)B[e]=T,T=z(T,j);for(let t=0;t<A.length;t++){let n=B[A[t]];D(e,n,z(n,j)),R(h,n)}for(let t=y;t>=c;t--)E[P]===t?(S=B[x[E[P]]],P--):(-1===x[t]?L=g(o[t],t,S):(L=B[x[t]],_(e,L,z(L,j),S)),S=L);return v(),o.slice(0)})})}function G(e,t){var n=-1,o=e.length;if(o>0&&e[o-1]<=t)return o-1;for(;o-n>1;){var l=Math.floor((n+o)/2);e[l]>t?o=l:n=l}return n}const I="property";var q={href:{type:"attribute"},style:{type:I,alias:"style.cssText"},for:{type:I,alias:"htmlFor"},class:{type:I,alias:"className"},spellCheck:{type:I,alias:"spellcheck"},allowFullScreen:{type:I,alias:"allowFullscreen"},autoCapitalize:{type:I,alias:"autocapitalize"},autoFocus:{type:I,alias:"autofocus"},autoPlay:{type:I,alias:"autoplay"}};function J(e,t,n,o){if(!n)return e.textContent="";if(Array.isArray(t))for(let n=0;n<t.length;n++)e.removeChild(t[n]);else if(null!=t&&""!=t)if(void 0!==o){let t,l=n.previousSibling;for(;l!==o;)t=l.previousSibling,e.removeChild(l),l=t}else e.removeChild(n.previousSibling);return""}function K(e,t){const n=e[t];Object.defineProperty(e,t,{get:()=>n(),enumerable:!0})}const Q=new Set;function U(e){const t=e.composedPath&&e.composedPath()[0]||e.target,[n,o]=function e(t,n){let o,l,r=t[n],i=t.model;return(void 0===r||r.length>1&&void 0===i)&&(l=t.host||t.parentNode)&&(o=e(l,n)),[void 0!==r?r:o&&o[0],i||o&&o[1]]}(t,`__${e.type}`);return e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),n&&n(e,o)}const V=function(e){const{wrap:t,cleanup:n,root:o,sample:l}=e;function r(e,n,o,l){if(n===o)return o;e=l&&l.parentNode||e;const i=typeof n;if("string"===i||"number"===i)if("number"===i&&(n=n.toString()),l){if(""===n)J(e,o,l);else if(""!==o&&"string"==typeof o)l.previousSibling.data=n;else{const t=document.createTextNode(n);""!==o&&null!=o?e.replaceChild(t,l.previousSibling):e.insertBefore(t,l)}o=n}else o=""!==o&&"string"==typeof o?e.firstChild.data=n:e.textContent=n;else if(null==n||"boolean"===i)o=J(e,o,l);else if("function"===i)t(function(){o=r(e,n(),o,l)});else if(n instanceof Node)Array.isArray(o)?0===o.length?e.insertBefore(n,l):1===o.length?e.replaceChild(n,o[0]):(J(e,o,l),e.appendChild(n)):null==o||""===o?e.insertBefore(n,l):e.replaceChild(n,l&&l.previousSibling||e.firstChild),o=n;else{if(!Array.isArray(n))throw new Error("content must be Node, stringable, or array of same");{let t=M([],n);if(J(e,o,l),0!==t.length)for(let n=0,o=t.length;n<o;n++)e.insertBefore(t[n],l);o=t}}return o}function i(e,t){let n;for(const o in t){const l=t[o];if("style"===o)Object.assign(e.style,l);else if("classList"===o)for(const t in l)e.classList.toggle(t,l[t]);else if("events"===o)for(const t in l)e.addEventListener(t,l[t]);else(n=q[o])?"attribute"===n.type?e.setAttribute(o,l):e[n.alias]=l:e[o]=l}}return Object.assign({insert(e,n,o,l){if("function"!=typeof n)return r(e,n,o,l);t((t=o)=>r(e,n(),t,l))},createComponent(e,t,n){if(n)for(let e=0;e<n.length;e++)K(t,n[e]);return e(t)},delegateEvents(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];Q.has(n)||(Q.add(n),document.addEventListener(n,U))}},clearDelegatedEvents(){for(let e of Q.keys())document.removeEventListener(e,U);Q.clear()},spread(e,n){if("function"!=typeof n)return i(e,n);t(()=>i(e,n()))},flow(i,s,u,a,c,f){let d;if(f&&(d=f.previousSibling),"each"===s)H(i,u,a,c,e,d,f);else if("when"===s){let e,s;const{afterRender:h,fallback:p}=c;n(function(){s&&s()}),t(t=>{const n=u();return n===t?t:l(()=>(i=f&&f.parentNode||i,s&&s(),null==n||!1===n?(J(i,e,f,d),e=null,h&&h(e,f),p&&o(t=>{s=t,e=r(i,p(),e,f)}),n):(o(t=>{s=t,e=r(i,a(n),e,f)}),h&&h(e,f),n)))})}else if("suspend"===s){const{fallback:e}=c,s=document.implementation.createHTMLDocument(),h=l(a);let p,g,v=!0;for(let e of Q.keys())s.addEventListener(e,U);Object.defineProperty(s.body,"host",{get:()=>f&&f.parentNode||i}),n(function(){p&&p()}),t(t=>{const n=!!u();let a;if(n===t)return t;if(i=f&&f.parentNode||i,n){if(v)r(s.body,h),v=!1;else for(a=d?d.nextSibling:i.firstChild;a&&a!==f;){const e=a.nextSibling;s.body.appendChild(a),a=e}return e&&l(()=>o(t=>{p=t,g=r(i,e(),null,f)})),n}if(v)r(i,h,null,f),v=!1;else for(p&&(J(i,g,f,d),p());a=s.body.firstChild;)i.insertBefore(a,f);return n})}else if("portal"===s){const{useShadow:e}=c,t=document.createElement("div"),o=u&&l(u)||document.body,s=e&&t.attachShadow?t.attachShadow({mode:"open"}):t;Object.defineProperty(t,"host",{get:()=>f&&f.parentNode||i});const d=l(()=>a(t));r(t,d),t!==s&&Promise.resolve().then(()=>{for(;t.firstChild;)s.appendChild(t.firstChild)}),o.appendChild(t),n(()=>o.removeChild(t))}}},e)}({wrap:e.makeComputationNode,root:e.root,cleanup:e.cleanup,sample:e.sample}),W=document.createElement("template");function X(e){const t=++e.count;e.setTop(10*Math.sin(t/10)),e.setLeft(10*Math.cos(t/10)),e.setColor(t%255),e.setContent(t%100)}W.innerHTML="<div class='box-view'><div class='box'></div></div>";const Y=()=>{const e=function(e){const t=[];for(let n=0;n<e;n++){const[e,n]=A(0),[o,l]=A(0),[r,i]=A(null),[s,u]=A(0);t.push({top:e,left:o,color:r,content:s,setTop:n,setLeft:l,setColor:i,setContent:u,count:0})}return t}(Benchmark.number);return Benchmark.Framework.SolidSignals.loop=(()=>Promise.resolve().then(()=>T(()=>e.forEach(X)))),function(){const t=document.createDocumentFragment();return V.insert(t,e.map((e,t)=>(function(){const n=W.content.firstChild.cloneNode(!0),o=n.firstChild;return o.id=t,V.wrap(()=>Object.assign(o.style,{top:`${e.top()}px`,left:`${e.left()}px`,background:`rgb(0,0,${e.color()})`})),V.insert(o,e.content),n})())),t}()};let Z;Benchmark.Framework.SolidSignals={start(){E(e=>{Z=e,document.getElementById("grid").appendChild(Y())})},cleanup(){Z&&Z()}}}();
