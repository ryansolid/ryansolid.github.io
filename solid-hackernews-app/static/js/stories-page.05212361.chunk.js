(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{14:function(t,e,n){var o=n(15);t.exports="string"===typeof o?o:o.toString()},15:function(t,e,n){(t.exports=n(5)(!1)).push([t.i,":host {\n  display: block;\n  position: relative;\n  padding: 10px;\n  padding-bottom: 30px;\n  min-height: 1000px;\n}\n\nstory-item {\n  margin-bottom: 8px;\n  display: block;\n  min-height: 27px;\n}\n\n.paginator {\n  position: absolute;\n  padding: 10px 0;\n  bottom: 0;\n}",""])},26:function(t,e,n){"use strict";n.r(e);var o=n(3),i=n(4),s=n(6),c=n(7),p=n(14),r=n.n(p);const a=Object(o.f)("<style></style>"),b=Object(o.f)('<a is="route-link" class="paginator">More</a>'),d=Object(o.f)("<story-item></story-item>");n.e(7).then(n.bind(null,29));Object(s.a)("stories-page",{type:"top",page:0},t=>{const[e,n]=Object(i.h)(),s=Object(c.b)();return Object(i.d)(()=>s({name:"stories",type:t.type,page:t.page},t=>n(Object(i.l)("stories",t)))),[(()=>{const t=a.cloneNode(!0);return Object(o.e)(t,r.a),t})(),Object(o.c)(o.a,{each:()=>e.stories,children:t=>(function(){const e=d.cloneNode(!0);return e.story=t,e._context=Object(i.i)(),e})()},["each"]),(()=>{const e=b.cloneNode(!0);return Object(i.d)(()=>e.query={page:t.page+1}),e})()]})}}]);