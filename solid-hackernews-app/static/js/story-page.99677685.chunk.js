(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{17:function(t,e,n){var c=n(18);t.exports="string"===typeof c?c:c.toString()},18:function(t,e,n){(t.exports=n(5)(!1)).push([t.i,":host {\n  display: block;\n  padding: 10px;\n}\n\n.body {\n  display: block;\n  margin: 20px 0;\n}\n\nli {\n  list-style-type: none;\n}",""])},27:function(t,e,n){"use strict";n.r(e);var c=n(3),o=n(4),s=n(6),r=n(7),i=n(17),b=n.n(i);const l=Object(c.e)("<style></style>",2),d=Object(c.e)("<story-item></story-item>",2),y=Object(c.e)('<div class="body"></div>',2),a=Object(c.e)("<ul></ul>",2),j=Object(c.e)("<li><comment-item></comment-item></li>",4),O=["each"],p=["children","when"];n.e(7).then(n.bind(null,28)),n.e(2).then(n.bind(null,29));Object(s.a)("story-page",{storyId:0},t=>{const[e,n]=Object(o.h)(),{getItem:s}=Object(r.b)();return Object(o.e)(async()=>{const e=await s(t.storyId);n({story:e})}),[(()=>{const t=l.cloneNode(!0);return Object(c.b)(t,b.a),t})(),Object(o.c)(o.b,{when:()=>e.story,children:()=>[(()=>{const t=d.cloneNode(!0);return t._context=Object(o.i)(),Object(o.e)(()=>t.story=e.story),t})(),(()=>{const t=y.cloneNode(!0);return Object(o.e)(()=>t.innerHTML=e.story.text||""),t})(),(()=>{const t=a.cloneNode(!0);return Object(c.b)(t,Object(o.c)(o.a,{each:()=>e.story.kids,children:t=>(()=>{const e=j.cloneNode(!0),n=e.firstChild;return n.commentId=t,n._context=Object(o.i)(),e})()},O)),t})()]},p)]})}}]);