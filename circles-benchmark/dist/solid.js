!function(){"use strict";var e=function(e,t){var n=new r(e,t);return function(){return n.current()}};Object.defineProperty(e,"default",{value:e}),e.root=function(e){var t=p,n=0===e.length?g:new r(null,null),o=void 0,l=0===e.length?null:function(){null!==h?f.disposes.add(n):k(n)};return p=n,null===h?o=function(e,t,n){try{return null===t?e():e(t)}finally{p=n}}(e,l,t):(o=null===l?e():e(l),p=t),o},e.on=function(t,n,o,r){var l;return Array.isArray(t)&&(l=t,t=function(){for(var e=0;e<l.length;e++)l[e]()}),r=!!r,e(i,o);function i(e){var o=d;return t(),r?r=!1:(d=null,e=n(e),d=o),e}},e.effect=function(e,t){new r(e,t)},e.data=function(e){var t=new o(e);return function(e){return 0===arguments.length?t.current():t.next(e)}},e.value=function(t,n){var o=e.data(t),r=-1;return function(e){if(0===arguments.length)return o();if(!(n?n(t,e):t===e)){var l=f.time;if(r===l)throw new Error("conflicting values: "+e+" is not the same as "+t);r=l,t=e,o(e)}return e}},e.freeze=function(e){var t=void 0;if(null!==h)t=e();else{(h=f).changes.reset();try{t=e(),v()}finally{h=null}}return t},e.sample=function(e){var t,n=d;return null!==n?(d=null,t=e(),d=n):t=e(),t},e.cleanup=function(e){null!==p?null===p.cleanups?p.cleanups=[e]:p.cleanups.push(e):console.warn("cleanups created without a root or parent will never be run")},e.makeDataNode=function(e){return new o(e)},e.makeComputationNode=function(e,t){return new r(e,t)},e.isFrozen=function(){return null!==h},e.isListening=function(){return null!==d};var t=function(){return function(){this.time=0,this.changes=new i,this.updates=new i,this.disposes=new i}}(),n={time:function(){return f.time}},o=function(){function e(e){this.value=e,this.pending=s,this.log=null}return e.prototype.current=function(){return null!==d&&function(e,t){null===e.log&&(e.log=new l);y(e.log,t)}(this,d),this.value},e.prototype.next=function(e){if(null!==h)if(this.pending!==s){if(e!==this.pending)throw new Error("conflicting changes: "+e+" !== "+this.pending)}else this.pending=e,f.changes.add(this);else null!==this.log?(this.pending=e,f.changes.add(this),v()):this.value=e;return e},e.prototype.clock=function(){return n},e}(),r=function(){function e(e,t){if(this.state=u,this.source1=null,this.source1slot=0,this.sources=null,this.sourceslots=null,this.log=null,this.owned=null,this.cleanups=null,this.fn=e,this.value=t,this.age=f.time,null!==e){var n=p,o=d;null===n&&console.warn("computations created without a root or parent will never be disposed"),p=d=this,null===h?function(e){h=f,f.changes.reset(),f.updates.reset();try{e.value=e.fn(e.value),(f.changes.count>0||f.updates.count>0)&&(f.time++,m(f))}finally{h=p=d=null}}(this):this.value=this.fn(this.value),n&&n!==g&&(null===n.owned?n.owned=[this]:n.owned.push(this)),p=n,d=o}}return e.prototype.current=function(){if(null!==d){if(this.age===f.time){if(this.state===a)throw new Error("circular dependency");S(this)}!function(e,t){null===e.log&&(e.log=new l);y(e.log,t)}(this,d)}return this.value},e.prototype.clock=function(){return n},e}(),l=function(){return function(){this.node1=null,this.node1slot=0,this.nodes=null,this.nodeslots=null}}(),i=function(){function e(){this.items=[],this.count=0}return e.prototype.reset=function(){this.count=0},e.prototype.add=function(e){this.items[this.count++]=e},e.prototype.run=function(e){for(var t=this.items,n=0;n<this.count;n++)e(t[n]),t[n]=null;this.count=0},e}(),s={},u=0,c=1,a=2,f=new t,h=null,d=null,p=null,g=new r(null,null);function y(e,t){var n,o=null===t.source1?-1:null===t.sources?0:t.sources.length;null===e.node1?(e.node1=t,e.node1slot=o,n=-1):null===e.nodes?(e.nodes=[t],e.nodeslots=[o],n=0):(n=e.nodes.length,e.nodes.push(t),e.nodeslots.push(o)),null===t.source1?(t.source1=e,t.source1slot=n):null===t.sources?(t.sources=[e],t.sourceslots=[n]):(t.sources.push(e),t.sourceslots.push(n))}function v(){var e=p;f.updates.reset(),f.time++;try{m(f)}finally{h=d=null,p=e}}function m(e){var t=h,n=0;for(h=e,e.disposes.reset();0!==e.changes.count||0!==e.updates.count||0!==e.disposes.count;)if(n>0&&e.time++,e.changes.run(b),e.updates.run(S),e.disposes.run(k),n++>1e5)throw new Error("Runaway clock detected");h=t}function b(e){e.value=e.pending,e.pending=s,e.log&&w(e.log)}function w(e){var t=e.node1,n=e.nodes;if(null!==t&&C(t),null!==n)for(var o=0,r=n.length;o<r;o++)C(n[o])}function C(e){var t=f.time;e.age<t&&(e.age=t,e.state=c,f.updates.add(e),null!==e.owned&&function e(t){for(var n=0;n<t.length;n++){var o=t[n];o.age=f.time,o.state=u,null!==o.owned&&e(o.owned)}}(e.owned),null!==e.log&&w(e.log))}function S(e){if(e.state===c){var t=p,n=d;p=d=e,e.state=a,x(e,!1),e.value=e.fn(e.value),e.state=u,p=t,d=n}}function x(e,t){var n,o,r=e.source1,l=e.sources,i=e.sourceslots,s=e.cleanups,u=e.owned;if(null!==s){for(n=0;n<s.length;n++)s[n](t);e.cleanups=null}if(null!==u){for(n=0;n<u.length;n++)k(u[n]);e.owned=null}if(null!==r&&(A(r,e.source1slot),e.source1=null),null!==l)for(n=0,o=l.length;n<o;n++)A(l.pop(),i.pop())}function A(e,t){var n,o,r=e.nodes,l=e.nodeslots;-1===t?e.node1=null:(n=r.pop(),o=l.pop(),t!==r.length&&(r[t]=n,l[t]=o,-1===o?n.source1slot=t:n.sourceslots[o]=t))}function k(e){e.fn=null,e.log=null,x(e,!0)}const N=Symbol("solid-node"),j=Symbol("solid-proxy"),B={get(t,n){if("_state"===n)return t;const o=t[n],r=_(o);if(e.isListening()&&"function"!=typeof o){let l,i;r&&(l=O(o))&&(i=l._self||(l._self=e.makeDataNode())).current(),(i=(l=O(t))[n]||(l[n]=e.makeDataNode())).current()}return r?E(o):o},set:()=>!0,deleteProperty:()=>!0};function E(e){return e[j]||(e[j]=new Proxy(e,B))}function _(e){return null!==e&&"object"==typeof e&&!(e instanceof Element)}function F(e){let t,n,o;if(t=null!=e&&e._state)return t;if(!_(e))return e;if(Array.isArray(e)){Object.isFrozen(e)&&(e=e.slice(0));for(let t=0,r=e.length;t<r;t++)(n=F(o=e[t]))!==o&&(e[t]=n)}else{Object.isFrozen(e)&&(e=Object.assign({},e));let t=Object.keys(e);for(let r=0,l=t.length;r<l;r++)(n=F(o=e[t[r]]))!==o&&(e[t[r]]=n)}return e}function O(e){let t=e[N];return t||(e[N]=t={}),t}function z(e,t,n){if(n=F(n),e[t]===n)return;const o=Array.isArray(e)||!(t in e);void 0===n?delete e[t]:e[t]=n;let r,l=O(e);(r=l[t])&&r.next(),o&&(r=l._self)&&r.next()}function L(e,t){const n=Object.keys(t)||[];for(let o=0;o<n.length;o+=1){const r=n[o];z(e,r,t[r])}}function M(e,t,n=[]){if(1===t.length){let o=t[0];if("function"==typeof o&&void 0===(o=o(E(e),n)))return;return L(e,o)}const o=t.shift(),r=typeof o,l=Array.isArray(e);if(Array.isArray(o))for(let r=0;r<o.length;r++)M(e,[o[r]].concat(t),n.concat([o[r]]));else if(l&&"function"===r)for(let r=0;r<e.length;r++)o(e[r],r)&&M(e[r],t.slice(0),n.concat([r]));else if(l&&"object"===r){const{from:r=0,to:l=e.length-1,by:i=1}=o;for(let o=r;o<=l;o+=i)M(e[o],t.slice(0),n.concat([o]))}else if(l&&"*"===o)for(let o=0;o<e.length;o++)M(e,[o].concat(t),n.concat([o]));else{if(1===t.length){let r=t[0];if("function"==typeof r){const t=e[o];r=r(_(t)?E(t):t,n.concat([o]))}return _(e[o])&&_(r)&&!Array.isArray(r)?L(e[o],r):z(e,o,r)}M(e[o],t,n.concat([o]))}}const{root:P,cleanup:T,sample:$,freeze:D}=e,H="__rGroup",G="__rid",I="nextSibling",R="previousSibling";let q=0;function J(e,t){const n=e[H];if(e=e[t],n){for(;e&&e[H]!==n;)e=e[t];e=e[t]}return e}function K(e,t,n){let o;for(;t!==n;)o=t.nextSibling,e.removeChild(t),t=o}function Q(e,t,n,o){let r;for(;t!==n;)r=t.nextSibling,e.insertBefore(t,o),t=r}function U(e,t){const n=t[G];e.get(n)(),e.delete(n)}function V(e,t,n,o,r,l,i){const{wrap:s,cleanup:u,root:c,sample:a}=r;let f=new Map;function h(t,o,r){return c(l=>(f.set(++q,l),function(e,t,n,o){if(Array.isArray(t)){if(!t.length)return;let r=t[0];r[G]=e,1!==t.length&&(r[H]=e,t[t.length-1][H]=e,t[t.length-1][G]=e);for(let e=0;e<t.length;e++)o?n.insertBefore(t[e],o):n.appendChild(t[e]);return r}let r;return 11===t.nodeType?(r=t.firstChild)&&(r[G]=e,r!==t.lastChild&&(r[H]=e,t.lastChild[H]=e,t.lastChild[G]=e)):t[G]=e,o?n.insertBefore(t,o):n.appendChild(t),r||t}(q,n(t,o),e,r)))}function d(){o&&o(l?l.nextSibling:e.firstChild,i)}u(function(){for(let e of f.keys())f.get(e)();f.clear()}),s((n=[])=>{const o=t();return a(()=>{e=i&&i.parentNode||e;const t=o.length;if(0===t){if(void 0!==l||void 0!==i){let t=null!=l?l.nextSibling:e.firstChild;K(e,t,void 0===i?null:i)}else e.textContent="";for(let e of f.keys())f.get(e)();return f.clear(),d(),[]}if(0===n.length){let e=new Array(t);for(let n=0;n<t;n++)h(e[n]=o[n],n,i);return d(),e}let r,s,u=0,c=0,a=!0,p=n.length-1,g=t-1,y=l?l.nextSibling:e.firstChild,v=y,m=i?i.previousSibling:e.lastChild,b=i;e:for(;a;){let t;for(a=!1,r=n[u],s=o[c];r===s;){if(u++,c++,v=y=J(y,I),p<u||g<c)break e;r=n[u],s=o[c]}for(r=n[p],s=o[g];r===s;){if(p--,g--,b=m,m=J(m,R),p<u||g<c)break e;r=n[p],s=o[g]}for(r=n[p],s=o[c];r===s;){a=!0;let l=(t=J(m,R)).nextSibling;if(v!==l&&(Q(e,l,m.nextSibling,v),m=t),c++,--p<u||g<c)break e;r=n[p],s=o[c]}for(r=n[u],s=o[g];r===s;){if(a=!0,t=J(y,I),y!==b){let n=t.previousSibling;Q(e,y,t,b),b=n,y=t}if(g--,p<++u||g<c)break e;r=n[u],s=o[g]}}if(g<c){if(u<=p){let t,n,o;for(;u<=p;){if(n=(o=m)[H])for(o=o.previousSibling;o&&o[H]!==n;)o=o.previousSibling;t=o.previousSibling,K(e,o,m.nextSibling),U(f,m),m=t,p--}}return d(),o.slice(0)}if(p<u){if(c<=g)for(;c<=g;)h(o[c],c,b),c++;return d(),o.slice(0)}const w=new Array(g+1-c);for(let e=c;e<=g;e++)w[e]=-1;const C=new Map;for(let e=c;e<=g;e++)C.set(o[e],e);let S=0,x=[];for(let e=u;e<=p;e++)C.has(n[e])?(w[C.get(n[e])]=e,S++):x.push(e);if(0===S){const t=y!==e.firstChild||m!==e.lastChild;let n,r=y;for(b=m.nextSibling;r!==b;)n=J(r,I),U(f,r),t&&K(e,r,n),r=n,u++;!t&&(e.textContent="");for(let e=c;e<=g;e++)h(o[e],e,b);return d(),o.slice(0)}const A=function(e,t){for(var n=[],o=[],r=-1,l=new Array(e.length),i=t,s=e.length;i<s;i++){var u=e[i];if(!(u<0)){var c=W(n,u);-1!==c&&(l[i]=o[c]),c===r?(n[++r]=u,o[r]=i):u<n[c+1]&&(n[c+1]=u,o[c+1]=i)}}for(i=o[r];r>=0;i=l[i],r--)n[r]=i;return n}(w,c),k=[];let N,j=y,B=A.length-1;for(let e=u;e<=p;e++)k[e]=j,j=J(j,I);for(let t=0;t<x.length;t++){let n=k[x[t]];K(e,n,J(n,I)),U(f,n)}for(let t=g;t>=c;t--)A[B]===t?(b=k[w[A[B]]],B--):(-1===w[t]?N=h(o[t],t,b):(N=k[w[t]],Q(e,N,J(N,I),b)),b=N);return d(),o.slice(0)})})}function W(e,t){var n=-1,o=e.length;if(o>0&&e[o-1]<=t)return o-1;for(;o-n>1;){var r=Math.floor((n+o)/2);e[r]>t?o=r:n=r}return n}const X="property";var Y={href:{type:"attribute"},style:{type:X,alias:"style.cssText"},for:{type:X,alias:"htmlFor"},class:{type:X,alias:"className"},spellCheck:{type:X,alias:"spellcheck"},allowFullScreen:{type:X,alias:"allowFullscreen"},autoCapitalize:{type:X,alias:"autocapitalize"},autoFocus:{type:X,alias:"autofocus"},autoPlay:{type:X,alias:"autoplay"}};function Z(e,t,n,o){if(!n)return e.textContent="";if(Array.isArray(t))for(let n=0;n<t.length;n++)e.removeChild(t[n]);else if(null!=t&&""!=t)if(void 0!==o){let t,r=n.previousSibling;for(;r!==o;)t=r.previousSibling,e.removeChild(r),r=t}else e.removeChild(n.previousSibling);return""}const ee=new Set;function te(e){const t=e.composedPath&&e.composedPath()[0]||e.target,[n,o]=function e(t,n){let o,r,l=t.model,i=t[n];return void 0===l&&(r=t.host||t.parentNode)&&(o=e(r,n)),[void 0!==l?l:o&&o[0],i||o&&o[1]]}(t,`__${e.type}`);return o&&o(e,n)}const ne=function(e){const{wrap:t,cleanup:n,root:o}=e;function r(e,n,o,l){if(n===o)return o;e=l&&l.parentNode||e;const i=typeof n;if("string"===i||"number"===i)if("number"===i&&(n=n.toString()),l){if(""===n)Z(e,o,l);else if(""!==o&&"string"==typeof o)l.previousSibling.data=n;else{const t=document.createTextNode(n);""!==o&&null!=o?e.replaceChild(t,l.previousSibling):e.insertBefore(t,l)}o=n}else o=""!==o&&"string"==typeof o?e.firstChild.data=n:e.textContent=n;else if(null==n||"boolean"===i)o=Z(e,o,l);else if("function"===i)t(function(){o=r(e,n(),o,l)});else if(n instanceof Node)Array.isArray(o)?0===o.length?e.insertBefore(n,l):1===o.length?e.replaceChild(n,o[0]):(Z(e,o,l),e.appendChild(n)):null==o||""===o?e.insertBefore(n,l):e.replaceChild(n,l&&l.previousSibling||e.firstChild),o=n;else{if(!Array.isArray(n))throw new Error("content must be Node, stringable, or array of same");{let t=function e(t,n){for(var o=0,r=n.length;o<r;o++){var l=n[o];l instanceof Node?11===l.nodeType?e(t,l.childNodes):t.push(l):null==l||!0===l||!1===l||(Array.isArray(l)?e(t,l):"string"==typeof l?t.push(l):t.push(l.toString()))}return t}([],n);if(Z(e,o,l),0!==t.length)for(let n=0,o=t.length;n<o;n++){let o=t[n];o instanceof Node||(o=t[n]=document.createTextNode(o)),e.insertBefore(o,l)}o=t}}return o}return Object.assign({insert(e,n,o,l){if("function"!=typeof n)return r(e,n,o,l);t((t=o)=>r(e,n(),t,l))},delegateEvents(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];ee.has(n)||(ee.add(n),document.addEventListener(n,te,!0))}},spread(e,n){t(function(){const t=n();let o;for(const n in t){const r=t[n];if("style"===n)Object.assign(e.style,r);else if("classList"===n)for(const t in r)e.classList.toggle(t,r[t]);else(o=Y[n])?"attribute"===o.type?e.setAttribute(n,r):e[o.alias]=r:e[n]=r}})},flow(l,i,s,u,c,a){let f;if(a&&(f=a.previousSibling),"each"===i)V(l,s,u,c,e,f,a);else if("when"===i){let e,i;n(function(){i&&i()}),t(t=>{const n=s();return n===t?t:(i&&i(),l=a&&a.parentNode||l,null==n||!1===n?(Z(l,e,a,f),e=null,n):(o(t=>{i=t,e=r(l,u(n),e,a),c&&c(e,a)}),n))})}}},e)}({wrap:e.makeComputationNode,root:e.root,cleanup:e.cleanup,sample:e.sample}),oe=document.createElement("template");oe.innerHTML="<div class='box-view'><div class='box'></div></div>";const re=document.createElement("template");function le(e){const t=[];for(let n=0;n<e;n++)t.push({top:0,left:0,color:null,content:0,count:0});return t}function ie(e){const t=e.count+1;return{top:10*Math.sin(t/10),left:10*Math.cos(t/10),color:t%255,content:t%100,count:t}}re.innerHTML="";const se=()=>{const[t,n]=function(t={}){return[E(t=F(t)),function(){const n=arguments;e.freeze(()=>{if(Array.isArray(n[0]))for(let e=0;e<n.length;e+=1)M(t,n[e]);else M(t,Array.prototype.slice.call(n))})}]}({boxes:le(Benchmark.number)});return Benchmark.Framework.Solid.loop=(()=>Promise.resolve().then(()=>n("boxes","*",ie))),function(){const e=re.content.cloneNode(!0);return ne.insert(e,t.boxes.map((e,t)=>(function(){const n=oe.content.firstChild.cloneNode(!0),o=n.firstChild;return o.id=t,ne.wrap(()=>Object.assign(o.style,{top:`${e.top}px`,left:`${e.left}px`,background:`rgb(0,0,${e.color})`})),ne.insert(o,()=>e.content),n})())),e}()};let ue;Benchmark.Framework.Solid={start(){P(e=>{ue=e,document.getElementById("grid").appendChild(se())})},cleanup(){ue&&ue()}}}();
