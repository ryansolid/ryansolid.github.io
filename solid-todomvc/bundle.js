!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=function(e,t){var n=new c(e,t);return function(){return n.current()}};Object.defineProperty(o,"default",{value:o});var l=o;o.root=function(e){var t=v,n=0===e.length?b:new c(null,null),o=void 0,l=0===e.length?null:function(){null!==m?g.disposes.add(n):E(n)};return v=n,null===m?o=function(e,t,n){try{return null===t?e():e(t)}finally{v=n}}(e,l,t):(o=null===l?e():e(l),v=t),o},o.on=function(e,t,n,l){var i;return Array.isArray(e)&&(i=e,e=function(){for(var e=0;e<i.length;e++)i[e]()}),l=!!l,o(r,n);function r(n){var o=y;return e(),l?l=!1:(y=null,n=t(n),y=o),n}},o.effect=function(e,t){new c(e,t)},o.data=function(e){var t=new s(e);return function(e){return 0===arguments.length?t.current():t.next(e)}},o.value=function(e,t){var n=o.data(e),l=-1;return function(o){if(0===arguments.length)return n();if(!(t?t(e,o):e===o)){var i=g.time;if(l===i)throw new Error("conflicting values: "+o+" is not the same as "+e);l=i,e=o,n(o)}return o}},o.freeze=function(e){var t=void 0;if(null!==m)t=e();else{(m=g).changes.reset();try{t=e(),C()}finally{m=null}}return t},o.sample=function(e){var t,n=y;return null!==n?(y=null,t=e(),y=n):t=e(),t},o.cleanup=function(e){null!==v?null===v.cleanups?v.cleanups=[e]:v.cleanups.push(e):console.warn("cleanups created without a root or parent will never be run")},o.makeDataNode=function(e){return new s(e)},o.makeComputationNode=function(e,t){return new c(e,t)},o.isFrozen=function(){return null!==m},o.isListening=function(){return null!==y};var i=function(){return function(){this.time=0,this.changes=new a,this.updates=new a,this.disposes=new a}}(),r={time:function(){return g.time}},s=function(){function e(e){this.value=e,this.pending=f,this.log=null}return e.prototype.current=function(){return null!==y&&function(e,t){null===e.log&&(e.log=new u);w(e.log,t)}(this,y),this.value},e.prototype.next=function(e){if(null!==m)if(this.pending!==f){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,g.changes.add(this);else null!==this.log?(this.pending=e,g.changes.add(this),C()):this.value=e;return e},e.prototype.clock=function(){return r},e}(),c=function(){function e(e,t){if(this.state=d,this.source1=null,this.source1slot=0,this.sources=null,this.sourceslots=null,this.log=null,this.owned=null,this.cleanups=null,this.fn=e,this.value=t,this.age=g.time,null!==e){var n=v,o=y;null===n&&console.warn("computations created without a root or parent will never be disposed"),v=y=this,null===m?function(e){m=g,g.changes.reset(),g.updates.reset();try{e.value=e.fn(e.value),(g.changes.count>0||g.updates.count>0)&&(g.time++,x(g))}finally{m=v=y=null}}(this):this.value=this.fn(this.value),n&&n!==b&&(null===n.owned?n.owned=[this]:n.owned.push(this)),v=n,y=o}}return e.prototype.current=function(){if(null!==y){if(this.age===g.time){if(this.state===h)throw new Error("circular dependency");T(this)}!function(e,t){null===e.log&&(e.log=new u);w(e.log,t)}(this,y)}return this.value},e.prototype.clock=function(){return r},e}(),u=function(){return function(){this.node1=null,this.node1slot=0,this.nodes=null,this.nodeslots=null}}(),a=function(){function e(){this.items=[],this.count=0}return e.prototype.reset=function(){this.count=0},e.prototype.add=function(e){this.items[this.count++]=e},e.prototype.run=function(e){for(var t=this.items,n=0;n<this.count;n++)e(t[n]),t[n]=null;this.count=0},e}(),f={},d=0,p=1,h=2,g=new i,m=null,y=null,v=null,b=new c(null,null);function w(e,t){var n,o=null===t.source1?-1:null===t.sources?0:t.sources.length;null===e.node1?(e.node1=t,e.node1slot=o,n=-1):null===e.nodes?(e.nodes=[t],e.nodeslots=[o],n=0):(n=e.nodes.length,e.nodes.push(t),e.nodeslots.push(o)),null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}function C(){var e=v;g.updates.reset(),g.time++;try{x(g)}finally{m=y=null,v=e}}function x(e){var t=m,n=0;for(m=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(n>0&&e.time++,e.changes.run(S),e.updates.run(T),e.disposes.run(E),n++>1e5)throw new Error("Runaway clock detected");m=t}function S(e){e.value=e.pending,e.pending=f,e.log&&k(e.log)}function k(e){var t=e.node1,n=e.nodes;if(null!==t&&A(t),null!==n)for(var o=0,l=n.length;o<l;o++)A(n[o])}function A(e){var t=g.time;e.age<t&&(e.age=t,e.state=p,g.updates.add(e),null!==e.owned&&function e(t){for(var n=0;n<t.length;n++){var o=t[n];o.age=g.time,o.state=d,null!==o.owned&&e(o.owned)}}(e.owned),null!==e.log&&k(e.log))}function T(e){if(e.state===p){var t=v,n=y;v=y=e,e.state=h,N(e,!1),e.value=e.fn(e.value),e.state=d,v=t,y=n}}function N(e,t){var n,o,l=e.source1,i=e.sources,r=e.sourceslots,s=e.cleanups,c=e.owned;if(null!==s){for(n=0;n<s.length;n++)s[n](t);e.cleanups=null}if(null!==c){for(n=0;n<c.length;n++)E(c[n]);e.owned=null}if(null!==l&&(_(l,e.source1slot),e.source1=null),null!==i)for(n=0,o=i.length;n<o;n++)_(i.pop(),r.pop())}function _(e,t){var n,o,l=e.nodes,i=e.nodeslots;-1===t?e.node1=null:(n=l.pop(),o=i.pop(),t!==l.length&&(l[t]=n,i[t]=o,-1===o?n.source1slot=t:n.sourceslots[o]=t))}function E(e){e.fn=null,e.log=null,N(e,!0)}const L=Symbol("solid-node"),j=Symbol("solid-proxy");function O(e){return e[j]||(e[j]=new Proxy(e,H))}function M(e){return null!==e&&"object"==typeof e&&(e.__proto__===Object.prototype||Array.isArray(e))}function P(e){let t,n,o;if(t=null!=e&&e._state)return t;if(!M(e))return e;if(Array.isArray(e)){Object.isFrozen(e)&&(e=e.slice(0));for(let t=0,l=e.length;t<l;t++)(n=P(o=e[t]))!==o&&(e[t]=n)}else{Object.isFrozen(e)&&(e=Object.assign({},e));let t=Object.keys(e);for(let l=0,i=t.length;l<i;l++)(n=P(o=e[t[l]]))!==o&&(e[t[l]]=n)}return e}function B(e){let t=e[L];return t||(e[L]=t={}),t}const H={get(e,t){if("_state"===t)return e;if(t===j||t===L)return;const n=e[t],o=M(n);if(l.isListening()&&"function"!=typeof n){let i,r;o&&(i=B(n))&&(r=i._self||(i._self=l.makeDataNode())).current(),(r=(i=B(e))[t]||(i[t]=l.makeDataNode())).current()}return o?O(n):n},set:()=>!0,deleteProperty:()=>!0};function z(e,t,n){if(n=P(n),e[t]===n)return;const o=Array.isArray(e)||!(t in e);void 0===n?delete e[t]:e[t]=n;let l,i=B(e);(l=i[t])&&l.next(),o&&(l=i._self)&&l.next()}function F(e,t){const n=Object.keys(t);for(let o=0;o<n.length;o+=1){const l=n[o];z(e,l,t[l])}}function D(e,t,n=[]){if(1===t.length){let o=t[0];if("function"==typeof o&&void 0===(o=o(O(e),n)))return;return void F(e,o)}const o=t.shift(),l=typeof o,i=Array.isArray(e);if(Array.isArray(o))for(let l=0;l<o.length;l++)D(e,[o[l]].concat(t),n.concat([o[l]]));else if(i&&"function"===l)for(let l=0;l<e.length;l++)o(e[l],l)&&D(e,[l].concat(t),n.concat([l]));else if(i&&"object"===l){const{from:l=0,to:i=e.length-1,by:r=1}=o;for(let o=l;o<=i;o+=r)D(e,[o].concat(t),n.concat([o]))}else if(i&&"*"===o)for(let o=0;o<e.length;o++)D(e,[o].concat(t),n.concat([o]));else if(1===t.length){let l=t[0];if("function"==typeof l){const t=e[o];l=l(M(t)?O(t):t,n.concat([o]))}M(e[o])&&M(l)&&!Array.isArray(l)?F(e[o],l):z(e,o,l)}else D(e[o],t,n.concat([o]))}function I(e={}){return[O(e=P(e)),function(){const t=arguments;l.freeze(()=>{if(Array.isArray(t[0]))for(let n=0;n<t.length;n+=1)D(e,t[n]);else D(e,Array.prototype.slice.call(t))})}]}function R(e,t,n){t?l.on(t,e,void 0,n):l.makeComputationNode(e)}const{root:$,cleanup:J,sample:V,freeze:G}=l,W="__rGroup",q="nextSibling",K="previousSibling";let Q=0;function U(e,t){for(var n=0,o=t.length;n<o;n++){var l=t[n];l instanceof Node?11===l.nodeType?U(e,l.childNodes):e.push(l):null==l||!0===l||!1===l||(Array.isArray(l)?U(e,l):"string"==typeof l?e.push(document.createTextNode(l)):e.push(document.createTextNode(l.toString())))}return e}function X(e,t,n,o){if(Array.isArray(e)){if(!e.length)return;let l=(e=U([],e))[0];1!==e.length&&(l[W]=e[e.length-1][W]=o);for(let o=0;o<e.length;o++)n?t.insertBefore(e[o],n):t.appendChild(e[o]);return l}let l,i=typeof e;return"string"===i||"number"===i?e=document.createTextNode(e):11===e.nodeType&&(l=e.firstChild)&&l!==e.lastChild&&(l[W]=e.lastChild[W]=o),n?t.insertBefore(e,n):t.appendChild(e),l||e}function Y(e,t,n){const o=e[W];if(o)for(e=e[t];e&&e[W]!==o;)e=e[t];return n?e:e[t]}function Z(e,t,n){let o;for(;t!==n;)o=t.nextSibling,e.removeChild(t),t=o}function ee(e,t,n,o){let l;for(;t!==n;)l=t.nextSibling,e.insertBefore(t,o),t=l}function te(e,t){e.get(t)(),e.delete(t)}function ne(e,t,n,o,l,i,r){const{wrap:s,cleanup:c,root:u,sample:a}=l,{afterRender:f,fallback:d}=o;let p=new Map,h=!1;function g(t,o,l){return u(i=>{const r=X(n(t,o),e,l,++Q);return p.set(r,i),r})}function m(){f&&f(i?i.nextSibling:e.firstChild,r)}c(function(){for(let e of p.keys())p.get(e)();p.clear()}),s((n=[])=>{const o=t()||[];return a(()=>{e=r&&r.parentNode||e;const t=o.length;if(h){if(void 0!==i||void 0!==r){let t=null!=i?i.nextSibling:e.firstChild;Z(e,t,void 0===r?null:r)}else e.textContent="";for(let e of p.keys())p.get(e)();p.clear(),h=!1}if(0===t){if(void 0!==i||void 0!==r){let t=null!=i?i.nextSibling:e.firstChild;Z(e,t,void 0===r?null:r)}else e.textContent="";for(let e of p.keys())p.get(e)();return p.clear(),m(),d&&(h=!0,u(t=>{const n=X(d(),e,r,++Q);p.set(n,t)})),[]}if(0===n.length){let e=new Array(t);for(let n=0;n<t;n++)g(e[n]=o[n],n,r);return m(),e}let l,s,c=0,a=0,f=!0,y=n.length-1,v=t-1,b=i?i.nextSibling:e.firstChild,w=b,C=r?r.previousSibling:e.lastChild,x=r;e:for(;f;){let t;for(f=!1,l=n[c],s=o[a];l===s;){if(c++,a++,w=b=Y(b,q),y<c||v<a)break e;l=n[c],s=o[a]}for(l=n[y],s=o[v];l===s;){if(y--,v--,C=(x=Y(C,K,!0)).previousSibling,y<c||v<a)break e;l=n[y],s=o[v]}for(l=n[y],s=o[a];l===s;){f=!0;let i=(t=Y(C,K)).nextSibling;if(w!==i&&(ee(e,i,C.nextSibling,w),C=t),a++,--y<c||v<a)break e;l=n[y],s=o[a]}for(l=n[c],s=o[v];l===s;){if(f=!0,t=Y(b,q),b!==x){let n=t.previousSibling;ee(e,b,t,x),x=n,b=t}if(v--,y<++c||v<a)break e;l=n[c],s=o[v]}}if(v<a){if(c<=y){let t,n;for(;c<=y;)t=(n=Y(C,K,!0)).previousSibling,Z(e,n,C.nextSibling),te(p,n),C=t,y--}return m(),o.slice(0)}if(y<c){if(a<=v)for(;a<=v;)g(o[a],a,x),a++;return m(),o.slice(0)}const S=new Array(v+1-a);for(let e=a;e<=v;e++)S[e]=-1;const k=new Map;for(let e=a;e<=v;e++)k.set(o[e],e);let A=0,T=[];for(let e=c;e<=y;e++)k.has(n[e])?(S[k.get(n[e])]=e,A++):T.push(e);if(0===A){const t=b!==e.firstChild||C!==e.lastChild;let n,l=b;for(x=C.nextSibling;l!==x;)n=Y(l,q),te(p,l),t&&Z(e,l,n),l=n,c++;!t&&(e.textContent="");for(let e=a;e<=v;e++)g(o[e],e,x);return m(),o.slice(0)}const N=function(e,t){for(var n=[],o=[],l=-1,i=new Array(e.length),r=t,s=e.length;r<s;r++){var c=e[r];if(!(c<0)){var u=oe(n,c);-1!==u&&(i[r]=o[u]),u===l?(n[++l]=c,o[l]=r):c<n[u+1]&&(n[u+1]=c,o[u+1]=r)}}for(r=o[l];l>=0;r=i[r],l--)n[l]=r;return n}(S,a),_=[];let E,L=b,j=N.length-1;for(let e=c;e<=y;e++)_[e]=L,L=Y(L,q);for(let t=0;t<T.length;t++){let n=_[T[t]];Z(e,n,Y(n,q)),te(p,n)}for(let t=v;t>=a;t--)N[j]===t?(x=_[S[N[j]]],j--):(-1===S[t]?E=g(o[t],t,x):(E=_[S[t]],ee(e,E,Y(E,q),x)),x=E);return m(),o.slice(0)})})}function oe(e,t){var n=-1,o=e.length;if(o>0&&e[o-1]<=t)return o-1;for(;o-n>1;){var l=Math.floor((n+o)/2);e[l]>t?o=l:n=l}return n}const le="property";var ie={href:{type:"attribute"},style:{type:le,alias:"style.cssText"},for:{type:le,alias:"htmlFor"},class:{type:le,alias:"className"},spellCheck:{type:le,alias:"spellcheck"},allowFullScreen:{type:le,alias:"allowFullscreen"},autoCapitalize:{type:le,alias:"autocapitalize"},autoFocus:{type:le,alias:"autofocus"},autoPlay:{type:le,alias:"autoplay"}};function re(e,t,n,o){if(!n)return e.textContent="";if(Array.isArray(t))for(let n=0;n<t.length;n++)e.removeChild(t[n]);else if(null!=t&&""!=t)if(void 0!==o){let t,l=n.previousSibling;for(;l!==o;)t=l.previousSibling,e.removeChild(l),l=t}else e.removeChild(n.previousSibling);return""}function se(e,t){const n=e[t];Object.defineProperty(e,t,{get:()=>n(),enumerable:!0})}const ce=new Set;function ue(e){const t=e.composedPath&&e.composedPath()[0]||e.target,[n,o]=function e(t,n){let o,l,i=t[n],r=t.model;return(void 0===i||i.length>1&&void 0===r)&&(l=t.host||t.parentNode)&&(o=e(l,n)),[void 0!==i?i:o&&o[0],r||o&&o[1]]}(t,`__${e.type}`);return e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),n&&n(e,o)}var ae=new Set(["abort","animationstart","animationend","animationiteration","blur","change","copy","cut","error","focus","load","loadend","loadstart","mouseenter","mouseleave","paste","progress","reset","select","submit","transitionstart","transitioncancel","transitionend","transitionrun"]);const fe=["each","when","suspend","portal"];function de(e){return(t,n)=>t.classList.toggle(e,n)}const pe=function(e){const{wrap:t,cleanup:n,root:o,sample:l}=e;function i(e,n,o,l){if(n===o)return o;e=l&&l.parentNode||e;const r=typeof n;if("string"===r||"number"===r)if("number"===r&&(n=n.toString()),l){if(""===n)re(e,o,l);else if(""!==o&&"string"==typeof o)l.previousSibling.data=n;else{const t=document.createTextNode(n);""!==o&&null!=o?e.replaceChild(t,l.previousSibling):e.insertBefore(t,l)}o=n}else o=""!==o&&"string"==typeof o?e.firstChild.data=n:e.textContent=n;else if(null==n||"boolean"===r)o=re(e,o,l);else if("function"===r)t(function(){o=i(e,n(),o,l)});else if(n instanceof Node)Array.isArray(o)?0===o.length?e.insertBefore(n,l):1===o.length?e.replaceChild(n,o[0]):(re(e,o,l),e.appendChild(n)):null==o||""===o?e.insertBefore(n,l):e.replaceChild(n,l&&l.previousSibling||e.firstChild),o=n;else{if(!Array.isArray(n))throw new Error("content must be Node, stringable, or array of same");{let t=U([],n);if(re(e,o,l),0!==t.length)for(let n=0,o=t.length;n<o;n++)e.insertBefore(t[n],l);o=t}}return o}function r(e,t){let n;for(const o in t){const l=t[o];if("style"===o)Object.assign(e.style,l);else if("classList"===o)for(const t in l)e.classList.toggle(t,l[t]);else if("events"===o)for(const t in l)e.addEventListener(t,l[t]);else(n=ie[o])?"attribute"===n.type?e.setAttribute(o,l):e[n.alias]=l:e[o]=l}}return Object.assign({insert(e,n,o,l){if("function"!=typeof n)return i(e,n,o,l);t((t=o)=>i(e,n(),t,l))},createComponent(e,t,n){if(n)for(let e=0;e<n.length;e++)se(t,n[e]);return e(t)},delegateEvents(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];ce.has(n)||(ce.add(n),document.addEventListener(n,ue))}},clearDelegatedEvents(){for(let e of ce.keys())document.removeEventListener(e,ue);ce.clear()},spread(e,n){if("function"!=typeof n)return r(e,n);t(()=>r(e,n()))},flow(r,s,c,u,a,f){let d;if(f&&(d=f.previousSibling),"each"===s)ne(r,c,u,a,e,d,f);else if("when"===s){let e,s;const{afterRender:p,fallback:h}=a;n(function(){s&&s()}),t(t=>{const n=c();return n===t?t:l(()=>(r=f&&f.parentNode||r,s&&s(),null==n||!1===n?(re(r,e,f,d),e=null,p&&p(e,f),h&&o(t=>{s=t,e=i(r,h(),e,f)}),n):(o(t=>{s=t,e=i(r,u(n),e,f)}),p&&p(e,f),n)))})}else if("suspend"===s){const{fallback:e}=a,s=document.implementation.createHTMLDocument(),p=l(u);let h,g,m=!0;for(let e of ce.keys())s.addEventListener(e,ue);Object.defineProperty(s.body,"host",{get:()=>f&&f.parentNode||r}),n(function(){h&&h()}),t(t=>{const n=!!c();let u;if(n===t)return t;if(r=f&&f.parentNode||r,n){if(m)i(s.body,p),m=!1;else for(u=d?d.nextSibling:r.firstChild;u&&u!==f;){const e=u.nextSibling;s.body.appendChild(u),u=e}return e&&l(()=>o(t=>{h=t,g=i(r,e(),null,f)})),n}if(m)i(r,p,null,f),m=!1;else for(h&&(re(r,g,f,d),h());u=s.body.firstChild;)r.insertBefore(u,f);return n})}else if("portal"===s){const{useShadow:e}=a,t=document.createElement("div"),o=l(c)||document.body,s=e&&t.attachShadow?t.attachShadow({mode:"open"}):t;Object.defineProperty(t,"host",{get:()=>f&&f.parentNode||r});const d=l(()=>u(t));i(t,d),t!==s&&Promise.resolve().then(()=>{for(;t.firstChild;)s.appendChild(t.firstChild)}),o.appendChild(t),n(()=>o.removeChild(t))}}},e)}({wrap:l.makeComputationNode,root:l.root,cleanup:l.cleanup,sample:l.sample});function he(e,t){let n,o;return"string"==typeof t&&(t=de(t)),l.makeComputationNode(l=>{const i=e();l&&t(l,!1);let r=n;for(;r&&r!==o;){if(r.model===i)return t(r,!0),r;r=r.nextSibling}}),(e,t)=>(n=e,o=t)}!function(e,{delegateEvents:t=!0}={}){const n={};function o(){let o=[].slice.call(arguments),l=null,i=!1,r=new Set;function s(o){const u=typeof o;if(null==o);else if("string"===u)l?l.appendChild(document.createTextNode(o)):function(e){const t=e.split(/([\.#]?[^\s#.]+)/);/^\.|#/.test(t[1])&&(l=document.createElement("div"));for(let e=0;e<t.length;e++){const n=t[e],o=n.substring(1,n.length);n&&(l?"."===n[0]?l.classList.add(o):"#"===n[0]&&l.setAttribute("id",o):l=document.createElement(n))}}(o);else if("number"===u||"boolean"===u||o instanceof Date||o instanceof RegExp)l.appendChild(document.createTextNode(o.toString()));else if(Array.isArray(o))if(l||(l=document.createDocumentFragment()),i)for(let e=0;e<o.length;e++)s(o[e]);else e.insert(l,o);else if(o instanceof Node)if(i){const t=l.appendChild(document.createTextNode(""));e.insert(l,o,void 0,t)}else l.appendChild(o);else if("object"===u)for(const i in o)if("function"==typeof o[i])if(/^on\w+/.test(i)){const e=i.toLowerCase();if(t&&e!==i&&!ae.has(e.slice(2))){const t=e.slice(2);r.add(t),l[`__${t}`]=o[i]}else l[e]=o[i]}else"ref"===i?o[i](l):"$"===i[0]?n[i.slice(1)](l,o[i]):function(t,n){e.wrap(()=>c(t,n[t]()))}(i,o);else c(i,o[i]);else if("function"==typeof o){let t=i?l.appendChild(document.createTextNode("")):void 0;o.flow?o(l,t):e.insert(l,o,void 0,t)}}for(function e(t){for(let n=0;n<t.length;n++){if("function"==typeof t[n])return void(i=!0);Array.isArray(t[n])&&e(t[n])}}(o);o.length;)s(o.shift());return e.delegateEvents(Array.from(r)),l;function c(e,t){if("style"===e)if("string"==typeof t)l.style.cssText=t;else for(const e in t)l.style.setProperty(e,t[e]);else if("classList"===e)for(const e in t)l.classList.toggle(e,t[e]);else if("events"===e)for(const e in t)l.addEventListener(e,t[e]);else if("attrs"===e)for(const e in t)l.setAttribute(e,t[e]);else l[e]=t}}o.registerBinding=((e,t)=>{n[e]=t}),fe.forEach(t=>o[t]=((n,o,l={})=>{const i=(i,r)=>e.flow(i,t,n,o,l,r);return i.flow=!0,i}))}(pe);const ge="todos-solid";function me(){const[e,t]=function(e){const t=localStorage.getItem(ge),[n,o]=I(t?JSON.parse(t):e);return R(()=>localStorage.setItem(ge,JSON.stringify(n))),[n,o]}({counter:1,todos:[],showMode:"all"});return R(()=>{const n=e.todos.filter(e=>e.completed).length;t({completedCount:n,remainingCount:e.todos.length-n})}),[e,{addTodo:({title:n})=>t(["todos",t=>[{title:n,id:e.counter,completed:!1},...t]],["counter",e=>e+1]),removeTodo:e=>t("todos",t=>t.filter(t=>t.id!==e)),editTodo:n=>t("todos",e.todos.findIndex(e=>e.id===n.id),n),clearCompleted:()=>t("todos",e=>e.filter(e=>!e.completed)),toggleAll:e=>t("todos",t=>t.completed!==e,{completed:e}),setVisibility:e=>t("showMode",e)}]}const ye=document.createElement("template");ye.innerHTML="<button class='clear-completed'>Clear completed</button>";const ve=document.createElement("template");ve.innerHTML="<footer class='footer'><span class='todo-count'><strong></strong>\x3c!--24--\x3e left</span><ul class='filters'><li><a href='#/'>All</a></li><li><a href='#/active'>Active</a></li><li><a href='#/completed'>Completed</a></li></ul>\x3c!--32--\x3e</footer>";const be=document.createElement("template");be.innerHTML="<input class='edit'/>";const we=document.createElement("template");we.innerHTML="<li class='todo'><div class='view'><input class='toggle' type='checkbox'/><label></label><button class='destroy'></button></div>\x3c!--19--\x3e</li>";const Ce=document.createElement("template");Ce.innerHTML="<section class='main'><input id='toggle-all' class='toggle-all' type='checkbox'/><label for='toggle-all'></label><ul class='todo-list'></ul></section>";const xe=document.createElement("template");xe.innerHTML="<header class='header'><h1>todos</h1><input class='new-todo' placeholder='What needs to be done?'/></header>";const Se=document.createElement("template");Se.innerHTML="\x3c!--5--\x3e\x3c!--6--\x3e";const ke=document.createElement("template");ke.innerHTML="<section class='todoapp'>\x3c!--2--\x3e\x3c!--3--\x3e</section>";const Ae=({addTodo:e})=>(function(){const t=xe.content.firstChild.cloneNode(!0);return t.firstChild.nextSibling.__keyup=(({target:t,keyCode:n})=>{let o;13===n&&(o=t.value.trim())&&(e({title:o}),t.value="")}),t})(),Te=({store:e,editTodo:t,removeTodo:n,toggleAll:o})=>{const[l,i]=I(),r=e=>l.editingTodoId===e,s=e=>i("editingTodoId",e),c=({target:{value:e}},n)=>{let o;l.editingTodoId===n&&(o=e.trim())&&(t({id:n,title:o}),s())},u=({target:{checked:e}},n)=>t({id:n,completed:e}),a=(e,t)=>s(t),f=(e,t)=>n(t),d=(e,t)=>{13===e.keyCode?c(e,t):27===e.keyCode&&s()};return function(){const t=Ce.content.firstChild.cloneNode(!0),n=t.firstChild,i=n.nextSibling.nextSibling;return n.__input=(({target:{checked:e}})=>o(e)),pe.wrap(()=>n.checked=!e.remainingCount),pe.flow(i,"each",()=>(t=>"active"===e.showMode?t.filter(e=>!e.completed):"completed"===e.showMode?t.filter(e=>e.completed):t)(e.todos),e=>Ne({todo:e,isEditing:r,toggle:u,edit:a,remove:f,doneEditing:d,save:c}),{afterRender:he(()=>l.editingTodoId,"editing")}),t}()},Ne=({todo:e,isEditing:t,toggle:n,edit:o,remove:l,save:i,doneEditing:r})=>(function(){const s=we.content.firstChild.cloneNode(!0),c=s.firstChild,u=c.firstChild,a=u.nextSibling,f=a.nextSibling,d=c.nextSibling;return s.model=e.id,pe.wrap(()=>{let t={completed:e.completed},n=Object.keys(t);for(let e=0;e<n.length;e++)s.classList.toggle(n[e],t[n[e]])}),u.__input=n,pe.wrap(()=>u.checked=e.completed),a.__dblclick=o,pe.insert(a,()=>e.title),f.__click=l,pe.flow(s,"when",()=>t(e.id),()=>(function(){const t=be.content.firstChild.cloneNode(!0);return t.__keyup=r,t.__focusout=i,t.value=e.title,t})(),{afterRender:e=>e&&e.focus()},d),s})(),_e=({store:e,clearCompleted:t})=>(function(){const n=ve.content.firstChild.cloneNode(!0),o=n.firstChild,l=o.firstChild,i=l.nextSibling,r=o.nextSibling,s=r.firstChild,c=s.firstChild,u=s.nextSibling,a=u.firstChild,f=u.nextSibling.firstChild,d=r.nextSibling;return pe.insert(l,()=>e.remainingCount),pe.insert(o,()=>1===e.remainingCount?" item":" items",null,i),pe.wrap(()=>{let t={selected:"all"===e.showMode},n=Object.keys(t);for(let e=0;e<n.length;e++)c.classList.toggle(n[e],t[n[e]])}),pe.wrap(()=>{let t={selected:"active"===e.showMode},n=Object.keys(t);for(let e=0;e<n.length;e++)a.classList.toggle(n[e],t[n[e]])}),pe.wrap(()=>{let t={selected:"completed"===e.showMode},n=Object.keys(t);for(let e=0;e<n.length;e++)f.classList.toggle(n[e],t[n[e]])}),pe.flow(n,"when",()=>e.completedCount>0,()=>(function(){const e=ye.content.firstChild.cloneNode(!0);return e.__click=t,e})(),{},d),n})();$(()=>document.body.insertBefore((()=>{const[e,{addTodo:t,toggleAll:n,editTodo:o,removeTodo:l,clearCompleted:i,setVisibility:r}]=me(),s=()=>r(location.hash.slice(2)||"all");return window.addEventListener("hashchange",s),J(()=>window.removeEventListener("hashchange",s)),function(){const r=ke.content.firstChild.cloneNode(!0),s=r.firstChild,c=s.nextSibling;return pe.insert(r,Ae({addTodo:t}),null,s),pe.flow(r,"when",()=>e.todos.length>0,()=>(function(){const t=Se.content.cloneNode(!0),r=t.firstChild,s=r.nextSibling;return pe.insert(t,Te({store:e,toggleAll:n,editTodo:o,removeTodo:l}),null,r),pe.insert(t,_e({store:e,clearCompleted:i}),null,s),t})(),{},c),r}()})(),document.body.firstChild)),pe.delegateEvents(["keyup","input","dblclick","click","focusout"])}]);