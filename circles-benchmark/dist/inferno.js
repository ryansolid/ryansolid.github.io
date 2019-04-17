!function(){"use strict";var e=Array.isArray;function n(e){var n=typeof e;return"string"===n||"number"===n}function t(e){return i(e)||a(e)}function r(e){return a(e)||!1===e||function(e){return!0===e}(e)||i(e)}function o(e){return"function"==typeof e}function l(e){return"string"==typeof e}function a(e){return null===e}function i(e){return void 0===e}function u(e){return"object"==typeof e}function c(e,n){var t={};if(e)for(var r in e)t[r]=e[r];if(n)for(var o in n)t[o]=n[o];return t}var s={};function f(e){return e.substr(2).toLowerCase()}function d(e,n){e.appendChild(n)}function p(e,n,t){a(t)?d(e,n):e.insertBefore(n,t)}function v(e,n){e.removeChild(n)}function h(e){for(var n;void 0!==(n=e.shift());)n()}function g(e,n){for(var t,r;e;){if(2033&(t=e.flags))return e.dom;r=e.children,e=8192&t?2===e.childFlags?r:r[n?0:r.length-1]:4&t?r.$LI:r}return null}function m(e,n){var t=e.flags;if(2033&t)v(n,e.dom);else{var r=e.children;if(4&t)m(r.$LI,n);else if(8&t)m(r,n);else if(8192&t)if(2===e.childFlags)m(r,n);else for(var o=0,l=r.length;o<l;++o)m(r[o],n)}}function y(e,n,t){var r=e.flags;if(2033&r)p(n,e.dom,t);else{var o=e.children;if(4&r)y(o.$LI,n,t);else if(8&r)y(o,n,t);else if(8192&r)if(2===e.childFlags)y(o,n,t);else for(var l=0,a=o.length;l<a;++l)y(o[l],n,t)}}function b(e,n,t){return e.constructor.getDerivedStateFromProps?c(t,e.constructor.getDerivedStateFromProps(n,t)):t}var $={v:!1},k={componentComparator:null,createVNode:null,renderComplete:null};function C(e,n){e.textContent=n}function w(e,n){return e&&n&&u(e)&&u(n)&&e.event===n.event&&e.data===n.data}var x="$";function F(e,n,t,r,o,l,a,i){this.childFlags=e,this.children=n,this.className=t,this.dom=null,this.flags=r,this.key=void 0===o?null:o,this.props=void 0===l?null:l,this.ref=void 0===a?null:a,this.type=i}function P(t,i,u,c,s,f,d,p){var v=void 0===s?1:s,h=new F(v,c,u,t,d,f,p,i),g=k.createVNode;return o(g)&&g(h),0===v&&function(t,o){var i,u=1;if(r(o))i=o;else if(n(o))u=16,i=o;else if(e(o)){for(var c=o.length,s=0;s<c;++s){var f=o[s];if(r(f)||e(f)){i=i||o.slice(0,s),L(o,i,s,"");break}if(n(f))(i=i||o.slice(0,s)).push(S(f,x+s));else{var d=f.key,p=(81920&f.flags)>0,v=a(d),h=l(d)&&d[0]===x;p||v||h?(i=i||o.slice(0,s),(p||h)&&(f=N(f)),(v||h)&&(f.key=x+s),i.push(f)):i&&i.push(f),f.flags|=65536}}u=0===(i=i||o).length?1:8}else(i=o).flags|=65536,81920&o.flags&&(i=N(o)),u=2;t.children=i,t.childFlags=u}(h,h.children),h}function S(e,n){return new F(1,t(e)?"":e,null,16,n,null,null,null)}function U(e,n,t){var r=P(8192,8192,null,e,n,null,t,null);switch(r.childFlags){case 1:r.children=V(),r.childFlags=2;break;case 16:r.children=[S(e)],r.childFlags=4}return r}function N(e){var n=-16385&e.flags,t=e.props;if(14&n&&!a(t)){var r=t;for(var o in t={},r)t[o]=r[o]}return 0==(8192&n)?new F(e.childFlags,e.children,e.className,n,e.key,t,e.ref,e.type):function(e){var n,t=e.children,r=e.childFlags;if(2===r)n=N(t);else if(12&r){n=[];for(var o=0,l=t.length;o<l;++o)n.push(N(t[o]))}return U(n,r,e.key)}(e)}function V(){return S("",null)}function L(t,o,i,u){for(var c=t.length;i<c;i++){var s=t[i];if(!r(s)){var f=u+x+i;if(e(s))L(s,o,0,f);else{if(n(s))s=S(s,f);else{var d=s.key,p=l(d)&&d[0]===x;(81920&s.flags||p)&&(s=N(s)),s.flags|=65536,p?d.substring(0,u.length)!==u&&(s.key=u+d):a(d)?s.key=f:s.key=u+d}o.push(s)}}}}var I="http://www.w3.org/1999/xlink",B="http://www.w3.org/XML/1998/namespace",M={"xlink:actuate":I,"xlink:arcrole":I,"xlink:href":I,"xlink:role":I,"xlink:show":I,"xlink:title":I,"xlink:type":I,"xml:base":B,"xml:lang":B,"xml:space":B};function A(e){return{onClick:e,onDblClick:e,onFocusIn:e,onFocusOut:e,onKeyDown:e,onKeyPress:e,onKeyUp:e,onMouseDown:e,onMouseMove:e,onMouseUp:e,onSubmit:e,onTouchEnd:e,onTouchMove:e,onTouchStart:e}}var D=A(0),E=A(null),W=A(!0);function T(e,n,t){var r=t.$EV;n?(0===D[e]&&(E[e]=function(e){var n=function(n){var t="onClick"===e||"onDblClick"===e;if(t&&0!==n.button)n.stopPropagation();else{n.isDefaultPrevented=R,n.isPropagationStopped=j,n.stopPropagation=O;var r={dom:document};Object.defineProperty(n,"currentTarget",{configurable:!0,get:function(){return r.dom}}),function(e,n,t,r,o){var l=n;for(;!a(l);){if(t&&l.disabled)return;var i=l.$EV;if(i){var u=i[r];if(u&&(o.dom=l,u.event?u.event(u.data,e):u(e),e.cancelBubble))return}l=l.parentNode}}(n,n.target,t,e,r)}};return document.addEventListener(f(e),n),n}(e)),r||(r=t.$EV=A(null)),r[e]||++D[e],r[e]=n):r&&r[e]&&(0==--D[e]&&(document.removeEventListener(f(e),E[e]),E[e]=null),r[e]=null)}function O(){this.cancelBubble=!0,this.immediatePropagationStopped||this.stopImmediatePropagation()}function R(){return this.defaultPrevented}function j(){return this.cancelBubble}function H(e,n,t){if(e[n]){var r=e[n];r.event?r.event(r.data,t):r(t)}else{var o=n.toLowerCase();e[o]&&e[o](t)}}function Q(e,n){var t=function(t){var r=this.$V;if(r){var a=r.props||s,i=r.dom;if(l(e))H(a,e,t);else for(var u=0;u<e.length;++u)H(a,e[u],t);if(o(n)){var c=this.$V,f=c.props||s;n(f,i,!1,c)}}};return Object.defineProperty(t,"wrapped",{configurable:!1,enumerable:!1,value:!0,writable:!1}),t}function X(e,n,t){var r="$"+n,l=e[r];l&&l[1].wrapped||(l&&(e.removeEventListener.apply(e,l),e[r]=null),o(t)&&(e.addEventListener(n,t),e[r]=[n,t]))}function _(e){return"checkbox"===e||"radio"===e}var G=Q("onInput",z),K=Q(["onClick","onChange"],z);function q(e){e.stopPropagation()}function z(e,n){var r=e.type,o=e.value,l=e.checked,a=e.multiple,i=e.defaultValue,u=!t(o);r&&r!==n.type&&n.setAttribute("type",r),t(a)||a===n.multiple||(n.multiple=a),t(i)||u||(n.defaultValue=i+""),_(r)?(u&&(n.value=o),t(l)||(n.checked=l)):u&&n.value!==o?(n.defaultValue=o,n.value=o):t(l)||(n.checked=l)}function J(n,r){if("option"===n.type)!function(n,r){var o=n.props||s,l=n.dom;l.value=o.value,o.value===r||e(r)&&-1!==r.indexOf(o.value)?l.selected=!0:t(r)&&t(o.selected)||(l.selected=o.selected||!1)}(n,r);else{var o=n.children,l=n.flags;if(4&l)J(o.$LI,r);else if(8&l)J(o,r);else if(2===n.childFlags)J(o,r);else if(12&n.childFlags)for(var a=0,i=o.length;a<i;++a)J(o[a],r)}}q.wrapped=!0;var Y=Q("onChange",Z);function Z(e,n,r,o){var l=Boolean(e.multiple);t(e.multiple)||l===n.multiple||(n.multiple=l);var a=e.selectedIndex;if(-1===a&&(n.selectedIndex=-1),1!==o.childFlags){var i=e.value;"number"==typeof a&&a>-1&&n.options[a]&&(i=n.options[a].value),r&&t(i)&&(i=e.defaultValue),J(o,i)}}var ee,ne,te=Q("onInput",oe),re=Q("onChange");function oe(e,n,r){var o=e.value,l=n.value;if(t(o)){if(r){var a=e.defaultValue;t(a)||a===l||(n.defaultValue=a,n.value=a)}}else l!==o&&(n.defaultValue=o,n.value=o)}function le(e,n,t,r,o,l){64&e?z(r,t):256&e?Z(r,t,o,n):128&e&&oe(r,t,o),l&&(t.$V=n)}function ae(e,n,t){64&e?function(e,n){_(n.type)?(X(e,"change",K),X(e,"click",q)):X(e,"input",G)}(n,t):256&e?function(e){X(e,"change",Y)}(n):128&e&&function(e,n){X(e,"input",te),n.onChange&&X(e,"change",re)}(n,t)}function ie(e){return e.type&&_(e.type)?!t(e.checked):!t(e.value)}function ue(e){e&&(o(e)?e(null):e.current&&(e.current=null))}function ce(e,n,t){e&&(o(e)?function(e,n,t){t.push(function(){n(e)})}(n,e,t):void 0!==e.current&&(e.current=n))}function se(e,n){fe(e),n&&m(e,n)}function fe(e){var n,r=e.flags,l=e.children;if(481&r){n=e.ref;var i=e.props;ue(n);var u=e.childFlags;if(!a(i))for(var c=Object.keys(i),f=0,d=c.length;f<d;f++){var p=c[f];W[p]&&T(p,null,e.dom)}12&u?de(l):2===u&&fe(l)}else l&&(4&r?(o(l.componentWillUnmount)&&l.componentWillUnmount(),ue(e.ref),l.$UN=!0,fe(l.$LI)):8&r?(!t(n=e.ref)&&o(n.onComponentWillUnmount)&&n.onComponentWillUnmount(g(e,!0),e.props||s),fe(l)):1024&r?se(l,e.ref):8192&r&&12&e.childFlags&&de(l))}function de(e){for(var n=0,t=e.length;n<t;++n)fe(e[n])}function pe(e){e.textContent=""}function ve(e,n,t){de(t),8192&n.flags?m(n,e):pe(e)}function he(e,n,r,o,i,c,s){switch(e){case"children":case"childrenType":case"className":case"defaultValue":case"key":case"multiple":case"ref":break;case"autoFocus":o.autofocus=!!r;break;case"allowfullscreen":case"autoplay":case"capture":case"checked":case"controls":case"default":case"disabled":case"hidden":case"indeterminate":case"loop":case"muted":case"novalidate":case"open":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"selected":o[e]=!!r;break;case"defaultChecked":case"value":case"volume":if(c&&"value"===e)break;var d=t(r)?"":r;o[e]!==d&&(o[e]=d);break;case"style":!function(e,n,r){if(t(n))r.removeAttribute("style");else{var o,a,i=r.style;if(l(n))i.cssText=n;else if(t(e)||l(e))for(o in n)a=n[o],i.setProperty(o,a);else{for(o in n)(a=n[o])!==e[o]&&i.setProperty(o,a);for(o in e)t(n[o])&&i.removeProperty(o)}}}(n,r,o);break;case"dangerouslySetInnerHTML":var p=n&&n.__html||"",v=r&&r.__html||"";p!==v&&(t(v)||function(e,n){var t=document.createElement("i");return t.innerHTML=n,t.innerHTML===e.innerHTML}(o,v)||(a(s)||(12&s.childFlags?de(s.children):2===s.childFlags&&fe(s.children),s.children=null,s.childFlags=1),o.innerHTML=v));break;default:W[e]?w(n,r)||T(e,r,o):111===e.charCodeAt(0)&&110===e.charCodeAt(1)?function(e,n,t,r){var o=f(e);if(u(t)&&!a(t)){var l=t.event;w(n,t)||X(r,o,function(e,n){return function(t){e(n.data,t)}}(l,t))}else X(r,o,t)}(e,n,r,o):t(r)?o.removeAttribute(e):i&&M[e]?o.setAttributeNS(M[e],e,r):o.setAttribute(e,r)}}function ge(e,n,t){var r=me(e.render(n,e.state,t)),l=t;return o(e.getChildContext)&&(l=c(t,e.getChildContext())),e.$CX=l,r}function me(t){return r(t)?t=V():n(t)?t=S(t,null):e(t)?t=U(t,0,null):16384&t.flags&&(t=N(t)),t}function ye(e,n,r,l,i,u){var c=e.flags|=16384;481&c?function(e,n,r,o,l,i){var u=e.flags,c=e.props,s=e.className,f=e.ref,d=e.children,v=e.childFlags;o=o||(32&u)>0;var h=function(e,n){return n?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e)}(e.type,o);e.dom=h,t(s)||""===s||(o?h.setAttribute("class",s):h.className=s);if(16===v)C(h,d);else if(1!==v){var g=o&&"foreignObject"!==e.type;2===v?(16384&d.flags&&(e.children=d=N(d)),ye(d,h,r,g,null,i)):8!==v&&4!==v||$e(d,h,r,g,null,i)}a(n)||p(n,h,l);a(c)||function(e,n,t,r,o){var l=!1,a=(448&n)>0;for(var i in a&&(l=ie(t))&&ae(n,r,t),t)he(i,null,t[i],r,o,l,null);a&&le(n,e,r,t,!0,l)}(e,u,c,h,o);ce(f,h,i)}(e,n,r,l,i,u):4&c?function(e,n,t,r,l,i){var u=function(e,n,t,r,l,i){var u=new n(t,r),c=u.$N=Boolean(n.getDerivedStateFromProps||u.getSnapshotBeforeUpdate);if(u.$SVG=l,u.$L=i,e.children=u,u.$BS=!1,u.context=r,u.props===s&&(u.props=t),c)u.state=b(u,t,u.state);else if(o(u.componentWillMount)){u.$BR=!0,u.componentWillMount();var f=u.$PS;if(!a(f)){var d=u.state;if(a(d))u.state=f;else for(var p in f)d[p]=f[p];u.$PS=null}u.$BR=!1}return u.$LI=ge(u,t,r),u}(e,e.type,e.props||s,t,r,i);ye(u.$LI,n,u.$CX,r,l,i),function(e,n,t){ce(e,n,t),o(n.componentDidMount)&&t.push(function(e){return function(){e.componentDidMount()}}(n))}(e.ref,u,i)}(e,n,r,l,i,u):8&c?function(e,n,r,l,a,i){var u=e.type,c=e.props||s,f=e.ref,d=me(32768&e.flags?u(c,f,r):u(c,r));e.children=d,ye(d,n,r,l,a,i),function(e,n,r,l){t(n)||(o(n.onComponentWillMount)&&n.onComponentWillMount(e),o(n.onComponentDidMount)&&l.push(function(e,n,t){return function(){e.onComponentDidMount(g(n,!0),t)}}(n,r,e)))}(c,f,e,i)}(e,n,r,l,i,u):512&c||16&c?be(e,n,i):8192&c?function(e,n,t,r,o,l){var a=e.children,i=e.childFlags;12&i&&0===a.length&&(i=e.childFlags=2,a=e.children=V());2===i?ye(a,n,o,r,o,l):$e(a,n,t,r,o,l)}(e,n,r,l,i,u):1024&c&&function(e,n,t,r,o){ye(e.children,e.ref,n,!1,null,o);var l=V();be(l,t,r),e.dom=l.dom}(e,r,n,i,u)}function be(e,n,t){var r=e.dom=document.createTextNode(e.children);a(n)||p(n,r,t)}function $e(e,n,t,r,o,l){for(var a=0,i=e.length;a<i;++a){var u=e[a];16384&u.flags&&(e[a]=u=N(u)),ye(u,n,t,r,o,l)}}function ke(e,n,l,i,u,f,p){var h=n.flags|=16384;e.flags!==h||e.type!==n.type||e.key!==n.key||0!=(2048&h)?16384&e.flags?function(e,n,t,r,o,l){fe(e),0!=(n.flags&e.flags&2033)?(ye(n,null,r,o,null,l),function(e,n,t){e.replaceChild(n,t)}(t,n.dom,e.dom)):(ye(n,t,r,o,g(e,!0),l),m(e,t))}(e,n,l,i,u,p):ye(n,l,i,u,f,p):481&h?function(e,n,r,o,l,a){var i,u=e.dom,c=e.props,f=n.props,d=!1,p=!1;if(n.dom=u,o=o||(32&l)>0,c!==f){var v=c||s;if((i=f||s)!==s)for(var h in(d=(448&l)>0)&&(p=ie(i)),i){var g=v[h],m=i[h];g!==m&&he(h,g,m,u,o,p,e)}if(v!==s)for(var y in v)t(i[y])&&!t(v[y])&&he(y,v[y],null,u,o,p,e)}var b=n.children,$=n.className;e.className!==$&&(t($)?u.removeAttribute("class"):o?u.setAttribute("class",$):u.className=$);4096&l?function(e,n){e.textContent!==n&&(e.textContent=n)}(u,b):Ce(e.childFlags,n.childFlags,e.children,b,u,r,o&&"foreignObject"!==n.type,null,e,a);d&&le(l,n,u,i,!1,p);var k=n.ref,C=e.ref;C!==k&&(ue(C),ce(k,u,a))}(e,n,i,u,h,p):4&h?function(e,n,t,r,l,i,u){var f=n.children=e.children;if(a(f))return;f.$L=u;var d=n.props||s,p=n.ref,v=e.ref,h=f.state;if(!f.$N){if(o(f.componentWillReceiveProps)){if(f.$BR=!0,f.componentWillReceiveProps(d,r),f.$UN)return;f.$BR=!1}a(f.$PS)||(h=c(h,f.$PS),f.$PS=null)}we(f,h,d,t,r,l,!1,i,u),v!==p&&(ue(v),ce(p,f,u))}(e,n,l,i,u,f,p):8&h?function(e,n,r,l,a,i,u){var c=!0,f=n.props||s,d=n.ref,p=e.props,v=!t(d),h=e.children;v&&o(d.onComponentShouldUpdate)&&(c=d.onComponentShouldUpdate(p,f));if(!1!==c){v&&o(d.onComponentWillUpdate)&&d.onComponentWillUpdate(p,f);var g=n.type,m=me(32768&n.flags?g(f,d,l):g(f,l));ke(h,m,r,l,a,i,u),n.children=m,v&&o(d.onComponentDidUpdate)&&d.onComponentDidUpdate(p,f)}else n.children=h}(e,n,l,i,u,f,p):16&h?function(e,n){var t=n.children,r=e.dom;t!==e.children&&(r.nodeValue=t);n.dom=r}(e,n):512&h?n.dom=e.dom:8192&h?function(e,n,t,r,o,l){var a=e.children,i=n.children,u=e.childFlags,c=n.childFlags,s=null;12&c&&0===i.length&&(c=n.childFlags=2,i=n.children=V());var f=0!=(2&c);if(12&u){var d=a.length;(8&u&&8&c||f||!f&&i.length>d)&&(s=g(a[d-1],!1).nextSibling)}Ce(u,c,a,i,t,r,o,s,e,l)}(e,n,l,i,u,p):function(e,n,t,o){var l=e.ref,a=n.ref,i=n.children;if(Ce(e.childFlags,n.childFlags,e.children,i,l,t,!1,null,e,o),n.dom=e.dom,l!==a&&!r(i)){var u=i.dom;v(l,u),d(a,u)}}(e,n,i,p)}function Ce(e,n,t,r,o,l,a,i,u,c){switch(e){case 2:switch(n){case 2:ke(t,r,o,l,a,i,c);break;case 1:se(t,o);break;case 16:fe(t),C(o,r);break;default:!function(e,n,t,r,o,l){fe(e),$e(n,t,r,o,g(e,!0),l),m(e,t)}(t,r,o,l,a,c)}break;case 1:switch(n){case 2:ye(r,o,l,a,i,c);break;case 1:break;case 16:C(o,r);break;default:$e(r,o,l,a,i,c)}break;case 16:switch(n){case 16:!function(e,n,t){e!==n&&(""!==e?t.firstChild.nodeValue=n:C(t,n))}(t,r,o);break;case 2:pe(o),ye(r,o,l,a,i,c);break;case 1:pe(o);break;default:pe(o),$e(r,o,l,a,i,c)}break;default:switch(n){case 16:de(t),C(o,r);break;case 2:ve(o,u,t),ye(r,o,l,a,i,c);break;case 1:ve(o,u,t);break;default:var s=0|t.length,f=0|r.length;0===s?f>0&&$e(r,o,l,a,i,c):0===f?ve(o,u,t):8===n&&8===e?function(e,n,t,r,o,l,a,i,u,c){var s,f,d=l-1,p=a-1,v=0,h=0,m=e[h],b=n[h];e:{for(;m.key===b.key;){if(16384&b.flags&&(n[h]=b=N(b)),ke(m,b,t,r,o,i,c),e[h]=b,++h>d||h>p)break e;m=e[h],b=n[h]}for(m=e[d],b=n[p];m.key===b.key;){if(16384&b.flags&&(n[p]=b=N(b)),ke(m,b,t,r,o,i,c),e[d]=b,p--,h>--d||h>p)break e;m=e[d],b=n[p]}}if(h>d){if(h<=p)for(f=(s=p+1)<a?g(n[s],!0):i;h<=p;)16384&(b=n[h]).flags&&(n[h]=b=N(b)),++h,ye(b,t,r,o,f,c)}else if(h>p)for(;h<=d;)se(e[h++],t);else{var $=h,k=h,C=d-h+1,w=p-h+1,x=new Int32Array(w-v+1);v=w+2;var F=C===l,P=!1,S=0,U=0;if(a<4||(C|w)<32)for(v=$;v<=d;++v)if(m=e[v],U<w){for(h=k;h<=p;h++)if(b=n[h],m.key===b.key){if(x[h-k]=v+1,F)for(F=!1;$<v;)se(e[$++],t);S>h?P=!0:S=h,16384&b.flags&&(n[h]=b=N(b)),ke(m,b,t,r,o,i,c),++U;break}!F&&h>p&&se(m,t)}else F||se(m,t);else{var V={};for(v=k;v<=p;++v)V[n[v].key]=v;for(v=$;v<=d;++v)if(m=e[v],U<w)if(void 0!==(h=V[m.key])){if(F)for(F=!1;v>$;)se(e[$++],t);b=n[h],x[h-k]=v+1,S>h?P=!0:S=h,16384&b.flags&&(n[h]=b=N(b)),ke(m,b,t,r,o,i,c),++U}else F||se(m,t);else F||se(m,t)}if(F)ve(t,u,e),$e(n,t,r,o,i,c);else if(P){var L=function(e){var n=0,t=0,r=0,o=0,l=0,a=0,i=0,u=e.length;u>xe&&(xe=u,ee=new Int32Array(u),ne=new Int32Array(u));for(;t<u;++t)if(0!==(n=e[t])){if(r=ee[o],e[r]<n){ne[t]=r,ee[++o]=t;continue}for(l=0,a=o;l<a;)e[ee[i=l+a>>1]]<n?l=i+1:a=i;n<e[ee[l]]&&(l>0&&(ne[t]=ee[l-1]),ee[l]=t)}l=t=o+1;var c=new Int32Array(l);a=ee[l-1];for(;l-- >0;)c[l]=a,a=ne[a];for(;t-- >0;)ee[t]=0;return c}(x);for(h=L.length-1,v=w-1;v>=0;v--)0===x[v]?(16384&(b=n[S=v+k]).flags&&(n[S]=b=N(b)),ye(b,t,r,o,(s=S+1)<a?g(n[s],!0):i,c)):h<0||v!==L[h]?y(b=n[S=v+k],t,(s=S+1)<a?g(n[s],!0):i):h--}else if(U!==w)for(v=w-1;v>=0;v--)0===x[v]&&(16384&(b=n[S=v+k]).flags&&(n[S]=b=N(b)),ye(b,t,r,o,(s=S+1)<a?g(n[s],!0):i,c))}}(t,r,o,l,a,s,f,i,u,c):function(e,n,t,r,o,l,a,i,u){for(var c,s,f=l>a?a:l,d=0;d<f;++d)c=n[d],s=e[d],16384&c.flags&&(c=n[d]=N(c)),ke(s,c,t,r,o,i,u),e[d]=c;if(l<a)for(d=f;d<a;++d)16384&(c=n[d]).flags&&(c=n[d]=N(c)),ye(c,t,r,o,i,u);else if(l>a)for(d=f;d<l;++d)se(e[d],t)}(t,r,o,l,a,s,f,i,c)}}}function we(e,n,t,r,l,a,i,u,s){var f=e.state,d=e.props,p=Boolean(e.$N),v=o(e.shouldComponentUpdate);if(p&&(n=b(e,t,n!==f?c(f,n):n)),i||!v||v&&e.shouldComponentUpdate(t,n,l)){!p&&o(e.componentWillUpdate)&&e.componentWillUpdate(t,n,l),e.props=t,e.state=n,e.context=l;var h=null,g=ge(e,t,l);p&&o(e.getSnapshotBeforeUpdate)&&(h=e.getSnapshotBeforeUpdate(d,f)),ke(e.$LI,g,r,e.$CX,a,u,s),e.$LI=g,o(e.componentDidUpdate)&&function(e,n,t,r,o){o.push(function(){e.componentDidUpdate(n,t,r)})}(e,d,f,h,s)}else e.props=t,e.state=n,e.context=l}var xe=0;function Fe(e,n,r,l){void 0===r&&(r=null),void 0===l&&(l=s),function(e,n,r,l){var a=[],i=n.$V;$.v=!0,t(i)?t(e)||(16384&e.flags&&(e=N(e)),ye(e,n,l,!1,null,a),n.$V=e,i=e):t(e)?(se(i,n),n.$V=null):(16384&e.flags&&(e=N(e)),ke(i,e,n,l,!1,null,a),i=n.$V=e),a.length>0&&h(a),$.v=!1,o(r)&&r(),o(k.renderComplete)&&k.renderComplete(i,n)}(e,n,r,l)}"undefined"!=typeof document&&(document.body,Node.prototype.$EV=null,Node.prototype.$V=null);var Pe=[],Se="undefined"!=typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout.bind(window),Ue=!1;function Ne(e,n,r,l){var a=e.$PS;if(o(n)&&(n=n(a?c(e.state,a):e.state,e.props,e.context)),t(a))e.$PS=n;else for(var i in n)a[i]=n[i];if(e.$BR)o(r)&&e.$L.push(r.bind(e));else{if(!$.v&&0===Pe.length)return void Ie(e,l,r);if(-1===Pe.indexOf(e)&&Pe.push(e),Ue||(Ue=!0,Se(Le)),o(r)){var u=e.$QU;u||(u=e.$QU=[]),u.push(r)}}}function Ve(e){for(var n=e.$QU,t=0,r=n.length;t<r;++t)n[t].call(e);e.$QU=null}function Le(){var e;for(Ue=!1;e=Pe.pop();){Ie(e,!1,e.$QU?Ve.bind(null,e):null)}}function Ie(e,n,t){if(!e.$UN){if(n||!e.$BR){var r=e.$PS;e.$PS=null;var l=[];$.v=!0,we(e,c(e.state,r),e.props,g(e.$LI,!0).parentNode,e.context,e.$SVG,n,null,l),l.length>0&&h(l),$.v=!1}else e.state=e.$PS,e.$PS=null;o(t)&&t.call(e)}}var Be=function(e,n){this.state=null,this.$BR=!1,this.$BS=!0,this.$PS=null,this.$LI=null,this.$UN=!1,this.$CX=null,this.$QU=null,this.$N=!1,this.$L=null,this.$SVG=!1,this.props=e||s,this.context=n||s};function Me(e){const n=[];for(let t=0;t<e;t++)n.push({top:0,left:0,color:null,content:0,count:0});return n}function Ae(e){const n=e.count+1;return{top:10*Math.sin(n/10),left:10*Math.cos(n/10),color:n%255,content:n%100,count:n}}Be.prototype.forceUpdate=function(e){this.$UN||Ne(this,{},e,!0)},Be.prototype.setState=function(e,n){this.$UN||this.$BS||Ne(this,e,n,!1)},Be.prototype.render=function(e,n,t){return null};class De extends Be{constructor(){super(...arguments),this.state={boxes:Me(Benchmark.number)},Benchmark.Framework.Inferno.loop=(()=>Promise.resolve().then(()=>this.setState({boxes:this.state.boxes.map(Ae)})))}render(){return this.state.boxes.map((e,n)=>P(1,"div","box-view",P(1,"div","box",e.content,16,{id:n,style:{top:`${e.top}px`,left:`${e.left}px`,background:`rgb(0,0,${e.color})`}}),2,null,n))}}Benchmark.Framework.Inferno={start(){Fe(function(e,n,r,l,a){0!=(2&e)&&(n.prototype&&n.prototype.render?e=4:n.render?(e=32776,n=n.render):e=8);var u=n.defaultProps;if(!t(u))for(var c in r||(r={}),u)i(r[c])&&(r[c]=u[c]);if((8&e)>0&&0==(32768&e)){var s=n.defaultHooks;if(!t(s))if(a)for(var f in s)i(a[f])&&(a[f]=s[f]);else a=s}var d=new F(1,null,null,e,l,r,a,n),p=k.createVNode;return o(p)&&p(d),d}(2,De),document.getElementById("grid"))},cleanup(){Fe(null,document.getElementById("grid"))}}}();
