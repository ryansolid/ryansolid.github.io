(window.webpackJsonp=window.webpackJsonp||[]).push([[10],[function(t,e,r){"use strict";var n=Object.create;function s(){var t=n(null);return t.__=void 0,delete t.__,t}var i=function(t,e,r){this.path=t,this.matcher=e,this.delegate=r};i.prototype.to=function(t,e){var r=this.delegate;if(r&&r.willAddRoute&&(t=r.willAddRoute(this.matcher.target,t)),this.matcher.add(this.path,t),e){if(0===e.length)throw new Error("You must have an argument in the function passed to `to`");this.matcher.addChild(this.path,t,e,this.delegate)}};var a=function(t){this.routes=s(),this.children=s(),this.target=t};function o(t,e,r){return function(n,s){var a=t+n;if(!s)return new i(a,e,r);s(o(a,e,r))}}function h(t,e,r){for(var n=0,s=0;s<t.length;s++)n+=t[s].path.length;var i={path:e=e.substr(n),handler:r};t.push(i)}a.prototype.add=function(t,e){this.routes[t]=e},a.prototype.addChild=function(t,e,r,n){var s=new a(e);this.children[t]=s;var i=o(t,s,n);n&&n.contextEntered&&n.contextEntered(e,i),r(i)};function l(t){return t.split("/").map(c).join("/")}var u=/%|\//g;function c(t){return t.length<3||-1===t.indexOf("%")?t:decodeURIComponent(t).replace(u,encodeURIComponent)}var d=/%(?:2(?:4|6|B|C)|3(?:B|D|A)|40)/g;function p(t){return encodeURIComponent(t).replace(d,decodeURIComponent)}var f=/(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g,g=Array.isArray,v=Object.prototype.hasOwnProperty;function m(t,e){if("object"!==typeof t||null===t)throw new Error("You must pass an object as the second argument to `generate`.");if(!v.call(t,e))throw new Error("You must provide param `"+e+"` to `generate`.");var r=t[e],n="string"===typeof r?r:""+r;if(0===n.length)throw new Error("You must provide a param `"+e+"`.");return n}var y=[];y[0]=function(t,e){for(var r=e,n=t.value,s=0;s<n.length;s++){var i=n.charCodeAt(s);r=r.put(i,!1,!1)}return r},y[1]=function(t,e){return e.put(47,!0,!0)},y[2]=function(t,e){return e.put(-1,!1,!0)},y[4]=function(t,e){return e};var b=[];b[0]=function(t){return t.value.replace(f,"\\$1")},b[1]=function(){return"([^/]+)"},b[2]=function(){return"(.+)"},b[4]=function(){return""};var w=[];w[0]=function(t){return t.value},w[1]=function(t,e){var r=m(e,t.value);return k.ENCODE_AND_DECODE_PATH_SEGMENTS?p(r):r},w[2]=function(t,e){return m(e,t.value)},w[4]=function(){return""};var _=Object.freeze({}),C=Object.freeze([]);function E(t,e,r){e.length>0&&47===e.charCodeAt(0)&&(e=e.substr(1));for(var n=e.split("/"),s=void 0,i=void 0,a=0;a<n.length;a++){var o,h=n[a],l=0;12&(o=2<<(l=""===h?4:58===h.charCodeAt(0)?1:42===h.charCodeAt(0)?2:0))&&(h=h.slice(1),(s=s||[]).push(h),(i=i||[]).push(0!==(4&o))),14&o&&r[l]++,t.push({type:l,value:c(h)})}return{names:s||C,shouldDecodes:i||C}}function A(t,e,r){return t.char===e&&t.negate===r}var S=function(t,e,r,n,s){this.states=t,this.id=e,this.char=r,this.negate=n,this.nextStates=s?e:null,this.pattern="",this._regex=void 0,this.handlers=void 0,this.types=void 0};function R(t,e){return t.negate?t.char!==e&&-1!==t.char:t.char===e||-1===t.char}function O(t,e){for(var r=[],n=0,s=t.length;n<s;n++){var i=t[n];r=r.concat(i.match(e))}return r}S.prototype.regex=function(){return this._regex||(this._regex=new RegExp(this.pattern)),this._regex},S.prototype.get=function(t,e){var r=this.nextStates;if(null!==r)if(g(r))for(var n=0;n<r.length;n++){var s=this.states[r[n]];if(A(s,t,e))return s}else{var i=this.states[r];if(A(i,t,e))return i}},S.prototype.put=function(t,e,r){var n;if(n=this.get(t,e))return n;var s=this.states;return n=new S(s,s.length,t,e,r),s[s.length]=n,null==this.nextStates?this.nextStates=n.id:g(this.nextStates)?this.nextStates.push(n.id):this.nextStates=[this.nextStates,n.id],n},S.prototype.match=function(t){var e=this.nextStates;if(!e)return[];var r=[];if(g(e))for(var n=0;n<e.length;n++){var s=this.states[e[n]];R(s,t)&&r.push(s)}else{var i=this.states[e];R(i,t)&&r.push(i)}return r};var x=function(t){this.length=0,this.queryParams=t||{}};function j(t){var e;t=t.replace(/\+/gm,"%20");try{e=decodeURIComponent(t)}catch(r){e=""}return e}x.prototype.splice=Array.prototype.splice,x.prototype.slice=Array.prototype.slice,x.prototype.push=Array.prototype.push;var k=function(){this.names=s();var t=[],e=new S(t,0,-1,!0,!1);t[0]=e,this.states=t,this.rootState=e};k.prototype.add=function(t,e){for(var r,n=this.rootState,s="^",i=[0,0,0],a=new Array(t.length),o=[],h=!0,l=0,u=0;u<t.length;u++){for(var c=t[u],d=E(o,c.path,i),p=d.names,f=d.shouldDecodes;l<o.length;l++){var g=o[l];4!==g.type&&(h=!1,n=n.put(47,!1,!1),s+="/",n=y[g.type](g,n),s+=b[g.type](g))}a[u]={handler:c.handler,names:p,shouldDecodes:f}}h&&(n=n.put(47,!1,!1),s+="/"),n.handlers=a,n.pattern=s+"$",n.types=i,"object"===typeof e&&null!==e&&e.as&&(r=e.as),r&&(this.names[r]={segments:o,handlers:a})},k.prototype.handlersFor=function(t){var e=this.names[t];if(!e)throw new Error("There is no route named "+t);for(var r=new Array(e.handlers.length),n=0;n<e.handlers.length;n++){var s=e.handlers[n];r[n]=s}return r},k.prototype.hasRoute=function(t){return!!this.names[t]},k.prototype.generate=function(t,e){var r=this.names[t],n="";if(!r)throw new Error("There is no route named "+t);for(var s=r.segments,i=0;i<s.length;i++){var a=s[i];4!==a.type&&(n+="/",n+=w[a.type](a,e))}return"/"!==n.charAt(0)&&(n="/"+n),e&&e.queryParams&&(n+=this.generateQueryString(e.queryParams)),n},k.prototype.generateQueryString=function(t){var e=[],r=Object.keys(t);r.sort();for(var n=0;n<r.length;n++){var s=r[n],i=t[s];if(null!=i){var a=encodeURIComponent(s);if(g(i))for(var o=0;o<i.length;o++){var h=s+"[]="+encodeURIComponent(i[o]);e.push(h)}else a+="="+encodeURIComponent(i),e.push(a)}}return 0===e.length?"":"?"+e.join("&")},k.prototype.parseQueryString=function(t){for(var e=t.split("&"),r={},n=0;n<e.length;n++){var s=e[n].split("="),i=j(s[0]),a=i.length,o=!1,h=void 0;1===s.length?h="true":(a>2&&"[]"===i.slice(a-2)&&(o=!0,r[i=i.slice(0,a-2)]||(r[i]=[])),h=s[1]?j(s[1]):""),o?r[i].push(h):r[i]=h}return r},k.prototype.recognize=function(t){var e,r=[this.rootState],n={},s=!1,i=t.indexOf("#");-1!==i&&(t=t.substr(0,i));var a=t.indexOf("?");if(-1!==a){var o=t.substr(a+1,t.length);t=t.substr(0,a),n=this.parseQueryString(o)}"/"!==t.charAt(0)&&(t="/"+t);var h=t;k.ENCODE_AND_DECODE_PATH_SEGMENTS?t=l(t):(t=decodeURI(t),h=decodeURI(h));var u=t.length;u>1&&"/"===t.charAt(u-1)&&(t=t.substr(0,u-1),h=h.substr(0,h.length-1),s=!0);for(var c=0;c<t.length&&(r=O(r,t.charCodeAt(c))).length;c++);for(var d=[],p=0;p<r.length;p++)r[p].handlers&&d.push(r[p]);r=function(t){return t.sort(function(t,e){var r=t.types||[0,0,0],n=r[0],s=r[1],i=r[2],a=e.types||[0,0,0],o=a[0],h=a[1],l=a[2];if(i!==l)return i-l;if(i){if(n!==o)return o-n;if(s!==h)return h-s}return s!==h?s-h:n!==o?o-n:0})}(d);var f=d[0];return f&&f.handlers&&(s&&f.pattern&&"(.+)$"===f.pattern.slice(-5)&&(h+="/"),e=function(t,e,r){var n=t.handlers,s=t.regex();if(!s||!n)throw new Error("state not initialized");var i=e.match(s),a=1,o=new x(r);o.length=n.length;for(var h=0;h<n.length;h++){var l=n[h],u=l.names,c=l.shouldDecodes,d=_,p=!1;if(u!==C&&c!==C)for(var f=0;f<u.length;f++){p=!0;var g=u[f],v=i&&i[a++];d===_&&(d={}),k.ENCODE_AND_DECODE_PATH_SEGMENTS&&c[f]?d[g]=v&&decodeURIComponent(v):d[g]=v}o[h]={handler:l.handler,params:d,isDynamic:p}}return o}(f,h,n)),e},k.VERSION="0.3.4",k.ENCODE_AND_DECODE_PATH_SEGMENTS=!0,k.Normalizer={normalizeSegment:c,normalizePath:l,encodePathSegment:p},k.prototype.map=function(t,e){var r=new a;t(o("",r,this.delegate)),function t(e,r,n,s){for(var i=r.routes,a=Object.keys(i),o=0;o<a.length;o++){var l=a[o],u=e.slice();h(u,l,i[l]);var c=r.children[l];c?t(u,c,n,s):n.call(s,u)}}([],r,function(t){e?e(this,t):this.add(t)},this)};var U=k;const q=/^\/+|\/+$/g,N=/#(.*)$/;class P{constructor(){this.replace=this.replace.bind(this),this.onUpdate=this.onUpdate.bind(this),this.type="hash",this.path=""}set(t){this.path=t,this.path!==this.get()&&(location.hash=this.path)}replace(t){this.path=t,this.path!==this.get()&&location.replace(this.formatURL(this.path))}get(){const t=location.href.match(N);return"/"+(t?t[1]:"").replace(q,"")}onUpdate(t){window.addEventListener("hashchange",()=>{var e;(e=this.get())!==this.path&&t(e)},!1)}back(){}formatURL(t){return"#"+t}}class D{constructor(t){var e;this.set=this.set.bind(this),this.replace=this.replace.bind(this),this.get=this.get.bind(this),this.onUpdate=this.onUpdate.bind(this),this.back=this.back.bind(this),this.formatURL=this.formatURL.bind(this),this.root=t,this.type="history",this.path=this.root,this.depth=(null!=(e=window.history.state)?e.depth:void 0)||0}set(t){this.path=t,this.path!==this.get()&&window.history.pushState({depth:++this.depth},null,this.formatURL(this.path))}replace(t){this.path=t,this.path===this.get()&&null!=this.depth||(this.depth||(this.depth=0),window.history.replaceState({depth:this.depth},null,this.formatURL(this.path)))}get(){let t=decodeURI(window.location.pathname+window.location.search).replace(q,"");return"/"+(t=t.replace(this.root.replace(q,""),"")).replace(q,"")}onUpdate(t,e){window.addEventListener("popstate",r=>{var n,s;if(n=this.get(),e(n),n!==this.path)return this.depth=(null!=(s=r.state)?s.depth:void 0)||0,t(n)},!1)}back(t){return window.history.go(-t)}formatURL(t){return this.root+t.replace(q,"")}}class L{constructor(){this.formatURL=this.formatURL.bind(this),this.trigger=this.trigger.bind(this),this.type="none",this.path="/",this.updateCallback=null,this.fakeHistory=[],this.depth=0}set(t){return this.path=t,this.fakeHistory.push(this.path),this.depth++}replace(t){return this.path=t,this.fakeHistory[this.depth-1]=this.path}get(){return this.path}onUpdate(t){return this.updateCallback=t}back(t){this.depth-=1+t,this.trigger(this.fakeHistory[this.depth])}formatURL(t){return t}trigger(t){t!==this.path&&this.updateCallback(t)}}var z={create:function(t){var e;switch(t){case"hash":return new P;case"history":return new D((e=arguments.length<=1?void 0:arguments[1])?"/"+e.replace(q,"")+"/":"/");case"none":return new L}}};function F(t){var e;return null!==t&&("object"===(e=typeof t)||"function"===e)}function I(t){return"[object Function]"===Object.prototype.toString.call(t)}function T(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];1===r.length&&Array.isArray(r[0])&&(r=r[0]);const s={};for(const i in t)r.indexOf(i)>=0&&(s[i]=t[i]);return s}function H(t,e){var r;if((void 0===t||null===t)&&(void 0===e||null===e))return!0;if(!F(t)||I(t)||!F(e)||I(e))return t===e;for(r in t)if(!H(t[r],e[r]))return!1;for(r in e)if(null==t[r])return!1;return!0}class Q{constructor(t){this.fullName=this.fullName.bind(this),this.route=this.route.bind(this),this.addRoute=this.addRoute.bind(this),this.generateFn=this.generateFn.bind(this),this.parent=t,this.matches=[],this.explicitIndex=!1}fullName(t){return this.parent?this.parent+"."+t:t}route(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0;var n;return r?(n=new Q(this.fullName(t)),r.call(n,n),this.addRoute(t,e,n.generateFn())):this.addRoute(t,e)}index(t,e){return I(t)?this.addRoute("index",{path:"/",redirect:t}):F(t)?this.route("index",Object.assign({},t,{path:"/"}),e):void 0}notFound(t){return I(t)?this.addRoute("not_found",{path:"/not-found",redirect:t}):F(t)?this.route("not_found",Object.assign({},t,{path:"/not-found"})):void 0}addRoute(t,e,r){var n,s,i;return delete(s=Object.assign({},e)).path,n=Object.assign({name:this.fullName(t)},s),"/"!==(i=e.path)&&""!==i&&"index"!==t.slice(-5)||(this.explicitIndex=!0),this.matches.push([e.path||"/".concat(t.replace(/_/g,"-")),n,r])}generateFn(){return this.explicitIndex||this.index({}),t=>{var e;for(let r=0,n=this.matches.length;r<n;r++)t((e=this.matches[r])[0]).to(e[1],e[2])}}static map(t){var e;return e=new Q,t.call(e,e),e}}class Y{static get KEYS(){return["name","params","query","url"]}constructor(t){this.on=this.on.bind(this),this.off=this.off.bind(this),this.debug=t,this.state={levels:[],params:{},query:{}},this.handlers={transition:[]}}on(t,e){return this.handlers[t]||(this.handlers[t]=[]),this.handlers[t].push(e),this}once(t,e){this.handlers[t]||(this.handlers[t]=[]);const r=n=>{e(n),this.off(t,r)};return this.handlers[t].push(r),this}off(t,e){var r;if(t in this.handlers)return e?(r=this.handlers[t].indexOf(e))>-1&&this.handlers[t].splice(r,1):this.handlers[t]=[],this}emit(t){if(!(t in this.handlers))return;const e=this.handlers[t].slice(0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];for(let i=0,a=e.length;i<a;i++)e[i](...n)}updateState(t){var e,r,n,s,i;e=-1;for(let a=0,o=t.levels.length;a<o;a++)if(s=t.levels[a],(null!=(i=this.state.levels[a])?i.name:void 0)!==s.name){e=a;break}r=[];for(let a=0,o=Y.KEYS.length;a<o;a++)H(t[n=Y.KEYS[a]],this.state[n])||r.push(n);if(!(e>-1||r.length))return!0;for(let a=0,o=this.handlers.transition.length;a<o;a++)if(!(0,this.handlers.transition[a])(t))return!1;this.state=t,this.emit("state",t,r);for(let a=0,o=r.length;a<o;a++){const e=r[a];this.emit(e,t[e])}return!0}}const $=["isActive","toURL","transitionTo","replaceWith"],M=["goBack","on","off","once"];function B(t){return t.replace(/\.?([A-Z]+)/g,(t,e)=>"-"+e.toLowerCase()).replace(/_/g,"-").replace(/^-/,"")}function G(t,e){let r={},n={},s={};function i(e,r,n){t.debug&&console.log("Update Props:",r);for(const t in r){let n=r[t],i=B(t);s=n,"[object String]"!==Object.prototype.toString.call(s)&&(n=JSON.stringify(n)),e.setAttribute(i,n)}var s;const i=(a=Object.keys(n),o=Object.keys(r),a.filter(t=>o.indexOf(t)<0));var a,o;for(let t=0,h=i.length;t<h;t++){const r=B(i[t]);e.setAttribute(r,null),e.removeAttribute(r)}return r}t.on("state",async(a,o)=>{let h=0;await async function t(e,r){await r(e),e.firstChild&&await t(e.firstChild,r)}(e,async e=>{const l=a.levels[h],u=l&&l.tag;if(!e.firstChild||u!==e.firstChild.nodeName.toLowerCase()){let o,c,d;if(e.firstChild&&((o=l.onExit)&&await o(e),t.debug&&console.log("Exit:",e.firstChild.localName),e.firstChild&&e.removeChild(e.firstChild)),u){(c=l.onEnter)&&await c(e),t.debug&&console.log("Enter:",u);const o=document.createElement(u);o.__router={id:t.id,level:h},r=i(o,a.params,r),n=i(o,a.query,n),l.attributes&&(s=i(o,l.attributes,s)),e.appendChild(o),(d=l.onEnterComplete)&&await d(e)}h++}else{if(e.firstChild){for(let t=0,s=o.length;t<s;t++){const s=o[t];"params"===s&&(r=i(e.firstChild,a[s],r)),"query"===s&&(n=i(e.firstChild,a[s],n))}l.attributes&&(s=i(e.firstChild,l.attributes,s))}h++}})})}let J=0;class K{static for(t){for(var e,r;!(r=t.__router)&&(t.parentNode||t.host);)t=t.parentNode||t.host;if(r&&(e=K.instances[r.id]))return null==r.level?e:function(t,e){const r={id:t.id,level:e,store:t.store};return $.forEach(n=>r[n]=function(r){return F(r)?t[n].apply(t,arguments):(arguments[0]=function(t,e,r){var n,s,i,a,o,h;if("."!==(a=e.charAt(0))&&"*"!==a&&"^"!==a)return e;let l=1;for(n=0,s=(o=e.slice(1)).length;n<s&&"."===o[n];n++)l+=1;return(h=e.slice(l))||(h="index"),"."===e.charAt(0)?((i=t.store.state.levels[r].name.split(".").slice(0,l>1?1-l:l)).push(h),i.join(".")):("^"===e.charAt(0)&&(e=t._resolveNameFallback(h,t.store.state.levels[r].name.split(".").slice(0,-1).join("."))),"*"===e.charAt(0)&&(e=t._resolveNameFallback(h,t.store.state.levels[r].name)),e)}(t,r,e),t[n].apply(t,arguments))}),r.childRoutes=function(){var r,n,s,i,a,o;const h=[];for(n in i=t.recognizer.names,o=t.store.state.levels[e].name,i)a=i[n],-1!==n.indexOf(o+".")&&-1===(s=n.replace(o+".","")).indexOf(".")&&((r=Object.assign({},a.handlers[e+1].handler)).name=s,h.push(r));return h},M.forEach(e=>r[e]=function(){return t[e](...arguments)}),r}(e,r.level)}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.debug&&(this.debug=e.debug),this.id="ro_".concat(++J),t.__router={id:this.id},K.instances[this.id]=this,this.recognizer=new U,e.location&&"history"!==e.location||"undefined"===typeof history||null===history||!history.pushState?"none"===e.location?this.location=z.create("none"):this.location=z.create("hash"):this.location=z.create("history",e.root),this.store=new Y(this.debug),G(this,t)}start(){const t=this._resolveRoute({url:this.location.get()}),e=t.name,r=t.params,n=t.query;this.location.replace(this.generate(e,r,n)),this.location.onUpdate(this.transitionTo.bind(this),t=>this.store.emit("history",t)),this.transitionTo(this.location.get())}on(){return this.store.on(...arguments)}off(){return this.store.off(...arguments)}once(){return this.store.once(...arguments)}hasRoute(t){return this.recognizer.hasRoute(t)}generate(t,e,r){try{return this.recognizer.generate(t,Object.assign({},e,{queryParams:r}))}catch(n){return""}}isActive(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};var r,n,s;if(!(null!=(r=s=this.store.state)?r.url:void 0))return!1;if(F(t)){for(const e in t)if(s.query[e]!==t[e])return!1;return!0}const i=this.generate(t,this._defaultParams(t,e));if(0===s.url.indexOf(i)&&(void 0===(n=s.url[i.length])||"?"===n||"/"===n))return!0;var a=this._resolveRoute({name:t,params:this._defaultParams(t,e)});return t=a.name,e=a.params,t===s.name&&H(e,s.params)}childRoutes(){const t=[],e=this.recognizer.names;for(const r in e)-1===r.indexOf(".")&&t.push(e[r].handlers[0].handler);return t}toURL(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};F(t)&&(r=t,t=this.store.state.name,r=this._cleanQuery(Object.assign({},this.store.state.query,r)));var n=this._resolveRoute({name:t,params:this._defaultParams(t,e),query:r});return t=n.name,e=n.params,r=n.query,this.location.formatURL(this.generate(t,e,r))}map(t){var e;return e=Q.map(t),this.recognizer.map(e.generateFn(),function(t,e){let r=!0;const n=e.slice(0).reverse();for(let s=0,i=n.length;s<i;s++){const i=n[s];r&&(t.add(e,{as:i.handler.name}),r="/"===i.path||""===i.path||".index"===i.handler.name.slice(-6))}})}goBack(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return this.location.depth-t>-1&&(this.location.back(t),!0)}transitionTo(t,e,r){return this._transition(t,e,r,"set")}replaceWith(t,e,r){return this._transition(t,e,r,"replace")}setState(t){return this.store.updateState(t)}_transition(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3?arguments[3]:void 0;var s,i,a;const o=this.store.state;F(t)&&(r=t,t=o.name,r=this._cleanQuery(Object.assign({},o.query,r)));const h="/"===t.charAt(0)?{url:t}:{name:t,params:this._defaultParams(t,e),query:r};if(!(null!=(i=this._resolveRoute(h))&&null!=(s=i.handlers)?s.length:void 0))return!1;const l=T(i,Y.KEYS);return l.levels=i.handlers.map(t=>t.handler),this.debug&&console.log("Resolved to:",l.url),(a=this.store.updateState(l))&&this.location[n](l.url),a}_resolveRoute(t){var e,r,n,s,i,a,o,h,l;if(!t.name){if(!(n=this.recognizer.recognize(t.url)||this._notFound(t.url)))return;t.params={};for(let e=0,r=n.length;e<r;e++)Object.assign(t.params,n[e].params);t.name=null!=n&&null!=(h=n[(null!=n?n.length:void 0)-1])?h.handler.name:void 0,t.params=this._cleanParams(t.params),t.query=this._cleanQuery(n.queryParams)}if(!(n=this.recognizer.handlersFor(t.name)))return{};if(n.length&&!(o=n[n.length-1].handler.redirect))return t.url||(t.url=this.generate(t.name,t.params,t.query)),Object.assign({handlers:n},t);if(!(s=o(t.params,t.query)))return{};e={};for(let u=0,c=n.length;u<c;u++)r=n[u],Object.assign(e,r.params||T(t.params,r.names));return i={name:(a=null!=(l=n[n.length-2])?l.handler.name:void 0)?"".concat(a,".").concat(s[0]):s[0],params:this._cleanParams(Object.assign(s[1]||{},e)),query:this._cleanQuery(Object.assign(s[2]||{},t.query||{},n.queryParams))},this._resolveRoute(i)}_resolveNameFallback(t,e){var r,n;for(r=e?"".concat(e,".").concat(t):t;!this.recognizer.hasRoute(r)&&(n=r.split(".").slice(0,-1)).length;)r=n.slice(0,-1).concat([t]).join(".");return r}_notFound(t){for(var e,r,n,s,i;!(e=this.recognizer.recognize(t))&&(i=t.split("/").slice(0,-1)).length;)t=i.join("/");if(e){".index"===(r=e[e.length-1].handler.name).slice(-6)&&(r=r.slice(0,-6)),r=this._resolveNameFallback("not_found",r),n=this.recognizer.handlersFor(r),s={queryParams:e.queryParams};for(const t in e){const r=e[t];if(n[t].handler.name!==r.handler.name){s[t]={handler:n[t].handler,params:{},isDynamic:!1},s.length=+t+1;break}s[t]=r}return s}}_defaultParams(t,e){const r=this.recognizer.handlersFor(t);let n=[];for(let s=0,i=r.length;s<i;s++)n=n.concat(r[s].names);return e=Object.assign(T(this.store.state.params,n),e),this._cleanParams(e),e}_cleanParams(t){for(const e in t){const r=t[e];/^[0-9]*$/.test(r)&&(t[e]=+r)}return t}_cleanQuery(t){const e={};for(const r in t){const n=t[r];!n||Array.isArray(n)&&!n.length||(Array.isArray(n)||F(n)?e[r]=n.slice(0):/^[0-9]*$/.test(n)?e[r]=+n:e[r]=n)}return e}}K.instances=[];e.a=K},function(t,e,r){"use strict";var n=r(0);function s(t){var e;if(t){try{e=JSON.parse(t)}catch(r){e=t}return"string"!==typeof e?e:/^[0-9]*$/.test(e)?+e:e}}function i(t,e,r){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!0,!0,r),t.dispatchEvent(n)}function a(t){if("isConnected"in t)return t.isConnected;if(document.body.contains(t))return!0;for(;(t=t.parentNode||t.host)&&t!==document.documentElement;);return t===document.documentElement}class o extends HTMLAnchorElement{static get observedAttributes(){return["name","params","query","clickbubble"]}constructor(){super(...arguments),this.onStateChange=this.onStateChange.bind(this)}connectedCallback(){a(this)&&(this.props||(this.props={}),o.observedAttributes.forEach(t=>{this.props[t]=this[t],Object.defineProperty(this,t,{get(){return this.props[t]},set(e){e!==this.props[t]&&(this.props[t]=e,this.onStateChange())},configurable:!0})}),this.router=n.a.for(this),this.name||(this.name=s(this.getAttribute("name"))),this.params||(this.params=s(this.getAttribute("params"))),this.query||(this.query=s(this.getAttribute("query"))),this.router.on("state",this.onStateChange),this.router.store.state&&this.onStateChange())}onStateChange(){if(!a(this))return;if(!this.name&&!this.query||!this.router)return;let t=[this.name,this.params||{},this.query||{}];this.name||(t=[this.query||{}]),this.href=this.router.toURL(...t),this.onclick=(e=>{e.preventDefault(),this.clickbubble||e.stopPropagation(),null!=this.router&&this.router.transitionTo(...t)}),this.router.isActive(...t)?(this.classList.add("active"),i(this,"active",!0)):(this.classList.remove("active"),this.classList.length||this.removeAttribute("class"),i(this,"active",!1))}disconnectedCallback(){this.router&&this.router.off("state",this.onStateChange)}attributeChangedCallback(t,e,r){e!==r&&(this[t]=s(r),this.onStateChange())}}o.prototype.clickbubble=!0,customElements.define("route-link",o,{extends:"a"})}]]);