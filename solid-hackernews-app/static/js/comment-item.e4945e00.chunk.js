(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{21:function(n,e,t){var o=t(22);n.exports="string"===typeof o?o:o.toString()},22:function(n,e,t){(n.exports=t(5)(!1)).push([n.i,":host {\n  margin: 20px 0;\n  font-size: 9pt;\n}\n\n.header {\n  margin-bottom: 5px;\n}\n\n.body a {\n  text-decoration: underline;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nli {\n  list-style-type: none;\n}\n\n.light {\n  color: #828282;\n}\n\n.light a:hover {\n  text-decoration: underline;\n}\n\n.subtext {\n  font-size: 7pt;\n}",""])},29:function(n,e,t){"use strict";t.r(e);var o=t(3),c=t(4),i=t(6),r=t(7),d=t(8),s=t(21),m=t.n(s);const a=Object(o.f)("<style></style>",2),u=Object(o.f)('<div class="header light"><a is="route-link" name="user"></a> <a is="route-link" name="story"></a><a></a></div>',8),l=Object(o.f)('<div><div class="body"></div><ul></ul></div>',6),b=Object(o.f)("<li><comment-item></comment-item></li>",4),h=["each"],v=["children","when"];Object(i.a)("comment-item",{commentId:0},n=>{let{commentId:e}=n;const[t,i]=Object(c.i)({hidden:!1}),{getItem:s}=Object(r.b)();return s(e).then(n=>i({comment:n})),[(()=>{const n=a.cloneNode(!0);return Object(o.e)(n,m.a),n})(),Object(o.c)(o.b,{when:()=>t.comment&&!t.comment.deleted&&!t.comment.dead&&t.comment.text,children:()=>[(()=>{const n=u.cloneNode(!0),e=n.firstChild,r=e.nextSibling.nextSibling,s=r.nextSibling;return Object(o.e)(e,()=>t.comment.by),Object(o.e)(r,()=>Object(d.a)(1e3*t.comment.time)),s.__click=()=>i("hidden",n=>!n),Object(o.e)(s,()=>t.hidden?"[+]":"[-]"),Object(c.e)(n=>{const o={userId:t.comment.by},c={storyId:t.comment.id};return o!==n._v$&&(e.params=n._v$=o),c!==n._v$2&&(r.params=n._v$2=c),n},{_v$:void 0,_v$2:void 0}),n})(),(()=>{const n=l.cloneNode(!0),e=n.firstChild,i=e.nextSibling;return Object(o.e)(i,Object(o.c)(o.a,{each:()=>t.comment.kids,children:n=>function(){const e=b.cloneNode(!0),t=e.firstChild;return t.commentId=n,t._context=Object(c.k)(),e}()},h)),Object(c.e)(o=>{const c=t.hidden,i=t.comment.text||"";return c!==o._v$3&&(n.hidden=o._v$3=c),i!==o._v$4&&(e.innerHTML=o._v$4=i),o},{_v$3:void 0,_v$4:void 0}),n})()]},v)]});Object(o.d)(["click"])},8:function(n,e,t){"use strict";t.d(e,"a",(function(){return o})),t.d(e,"b",(function(){return c}));function o(n){const e=Date.now()-n;return e<6e4?Math.round(e/1e3)+" seconds ago":e<36e5?Math.round(e/6e4)+" minutes ago":e<864e5?Math.round(e/36e5)+" hours ago":Math.round(e/864e5)+" days ago"}function c(n){return new URL(n).host}}}]);