(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{10:function(e,t,n){var o=n(11);e.exports="string"===typeof o?o:o.toString()},11:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,":host {\n  display: block;\n  width: 85%;\n  margin: auto;\n  color: black;\n  background-color: rgb(246, 246, 239);\n  font: 10pt Verdana, Geneva, sans-serif;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.light {\n  color: #828282;\n}\n\n.light a:hover {\n  text-decoration: underline;\n}\n\n.subtext {\n  font-size: 7pt;\n}\n\n@media all and (max-width: 750px) {\n  :host {\n    width: 100%\n  }\n}\n",""])},24:function(e,t,n){"use strict";n.r(t);var o=n(3),r=n(4),s=n(6),a=n(0),c=n(7),i=n(10),u=n.n(i);const l=Object(o.f)("<style></style>",2),d=Object(o.f)("<app-nav></app-nav>",2),h=Object(o.f)("<slot></slot>",2),p=["children"];Object(s.a)("hacker-news",(e,t)=>{let{element:s}=t;const i=new a.a(s,{location:"hash",root:"solid-hackernews-app/"});return(e=>{e.map(e=>{e.notFound(()=>["index"]),e.index({tag:"stories-page",attributes:{type:"top"},onEnter:()=>n.e(6).then(n.bind(null,26))}),e.route("new",{tag:"stories-page",attributes:{type:"new"},onEnter:()=>n.e(6).then(n.bind(null,26))}),e.route("show",{tag:"stories-page",attributes:{type:"show"},onEnter:()=>n.e(6).then(n.bind(null,26))}),e.route("ask",{tag:"stories-page",attributes:{type:"ask"},onEnter:()=>n.e(6).then(n.bind(null,26))}),e.route("job",{tag:"stories-page",attributes:{type:"job"},onEnter:()=>n.e(6).then(n.bind(null,26))}),e.route("user",{path:"/users/:userId",tag:"user-page",onEnter:()=>n.e(9).then(n.bind(null,27))}),e.route("story",{path:"/stories/:storyId",tag:"story-page",onEnter:()=>n.e(8).then(n.bind(null,28))})})})(i),i.start(),[(()=>{const e=l.cloneNode(!0);return Object(o.e)(e,u.a),e})(),(()=>{const e=d.cloneNode(!0);return e._context=Object(r.k)(),e})(),Object(o.c)(c.a,{children:()=>{const e=h.cloneNode(!0);return e._context=Object(r.k)(),e}},p)]})},7:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return l}));var o=n(3),r=n(4),s=n(9),a=n.n(s);const c=["children","value"],i=Object(r.d)();function u(e){return Object(o.c)(i.Provider,{value:()=>function(){const e=new a.a("https://hacker-news.firebaseio.com/v0"),[t,n]=Object(r.h)({cache:new Map,idsByType:new Map});function o(n){const{cache:o}=t();return o.has(n)?Promise.resolve(o.get(n)):new Promise((t,r)=>{e.child(n).once("value",e=>{const r=e.val();o.set(n,r),t(r)},r)})}return document.addEventListener("visibilitychange",()=>{document.hidden||setTimeout(()=>n(t()),100)}),["top","new","ask","show","job"].forEach(o=>e.child("".concat(o,"stories")).on("value",e=>{t().idsByType.set(o,e.val()),document.hidden||n(t())})),(e,n)=>{switch(e.name){case"story":Object(r.e)(()=>o("item/".concat(e.id)).then(n));break;case"user":Object(r.e)(()=>o("user/".concat(e.id)).then(n));break;case"stories":Object(r.e)(async()=>{const r=await function(e,n){const{idsByType:r}=t();if(r.has(e)){const t=r.get(e);return Promise.resolve(t.slice(30*n,30*(n+1)))}return o("".concat(e,"stories")).then(e=>e.slice(30*n,30*(n+1)))}(e.type,e.page)||[],s=await Promise.all(r.map(e=>o("item/".concat(e))));n(s.filter(e=>e))})}}}(),children:()=>e.children},c)}function l(){return Object(r.q)(i)}}},0,[6]]);