(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{20:function(t,e,n){var c=n(21);t.exports="string"===typeof c?c:c.toString()},21:function(t,e,n){(t.exports=n(5)(!1)).push([t.i,":host {\n  display: block;\n  min-height: 27px;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.light {\n  color: #828282;\n}\n\n.light a:hover {\n  text-decoration: underline;\n}\n\n.subtext {\n  font-size: 7pt;\n}",""])},29:function(t,e,n){"use strict";n.r(e);var c=n(3),o=n(4),r=n(6),s=n(8),a=n(20),i=n.n(a);const d=Object(c.f)("<style></style>"),l=Object(c.f)("<a></a>"),u=Object(c.f)('<small class="light">(<a></a>)</small>'),b=Object(c.f)('<a is="route-link" name="user"></a>'),j=Object(c.f)('<a is="route-link" name="story"></a>'),h=Object(c.f)('<div class="subtext light"></div>');Object(r.a)("story-item",{story:{}},t=>{let{story:e}=t;return[(()=>{const t=d.cloneNode(!0);return Object(c.e)(t,i.a),t})(),Object(c.c)(c.b,{when:()=>e.url,fallback:()=>(function(){const t=j.cloneNode(!0);return Object(c.e)(t,()=>e.title),Object(o.d)(()=>t.params={storyId:e.id}),t})(),children:()=>[(()=>{const t=l.cloneNode(!0);return Object(c.e)(t,()=>e.title),Object(o.d)(()=>t.setAttribute("href",e.url)),t})(),(()=>{const t=u.cloneNode(!0),n=t.firstChild.nextSibling;return Object(c.e)(n,()=>Object(s.b)(e.url)),Object(o.d)(()=>n.setAttribute("href",e.url)),t})()]},["when","fallback","children"]),(()=>{const t=h.cloneNode(!0);return Object(c.e)(t,Object(c.c)(c.b,{when:()=>"job"!==e.type,fallback:()=>(function(){const t=j.cloneNode(!0);return Object(c.e)(t,()=>Object(s.a)(1e3*e.time)),Object(o.d)(()=>t.params={storyId:e.id}),t})(),children:()=>[()=>e.score&&"".concat(e.score," points by "),(()=>{const t=b.cloneNode(!0);return Object(c.e)(t,()=>e.by),Object(o.d)(()=>t.params={userId:e.by}),t})(),(()=>{const t=j.cloneNode(!0);return Object(c.e)(t,()=>Object(s.a)(1e3*e.time)),Object(o.d)(()=>t.params={storyId:e.id}),t})()," | ",(()=>{const t=j.cloneNode(!0);return Object(c.e)(t,()=>e.descendants?"".concat(e.descendants," comments"):"discuss"),Object(o.d)(()=>t.params={storyId:e.id}),t})()]},["when","fallback","children"])),t})()]})},8:function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return a}));const c=6e4,o=60*c,r=24*o;function s(t){const e=Date.now()-t;return e<c?Math.round(e/1e3)+" seconds ago":e<o?Math.round(e/c)+" minutes ago":e<r?Math.round(e/o)+" hours ago":Math.round(e/r)+" days ago"}function a(t){return new URL(t).host}}}]);