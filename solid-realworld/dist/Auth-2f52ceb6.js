import{f as e,u as s,c as r,N as t,i as o,a as i,t as n}from"./index-6480d5dd.js";import{L as l}from"./ListErrors-262bcbd8.js";const a=n('<div class="auth-page"><div class="container page"><div class="row"><div class="col-md-6 offset-md-3 col-xs-12"><h1 class="text-xs-center"></h1><p class="text-xs-center"></p><form><fieldset class="form-group"><input class="form-control form-control-lg" type="text" placeholder="Email"></fieldset><fieldset class="form-group"><input class="form-control form-control-lg" type="password" placeholder="Password"></fieldset><button class="btn btn-lg btn-primary pull-xs-right" type="submit"></button></form></div></div></div></div>'),c=n('<fieldset class="form-group"><input class="form-control form-control-lg" type="text" placeholder="Username"></fieldset>'),d=["children"],u=["errors"];export default()=>{const[n,f]=e({username:"",inProgress:!1}),[,{register:g,login:m}]=s(),p=location.hash.includes("login"),v=p?"Sign in":"Sign up",h=r(t,p?{route:"register",children:()=>"Need an account?"}:{route:"login",children:()=>"Have an account?"},d),x=e=>{e.preventDefault(),f({inProgress:!0}),(p?m(n.email,n.password):g(n.username,n.email,n.password)).then(()=>location.hash="/").catch(e=>f({errors:e})).finally(()=>f({inProgress:!1}))};return function(){const e=a.cloneNode(!0),s=e.firstChild.firstChild.firstChild,t=s.firstChild,d=t.nextSibling,g=d.nextSibling,m=g.firstChild,b=m.firstChild,C=m.nextSibling,$=C.firstChild,_=C.nextSibling;return t.textContent=v,o(d,h),o(s,r(l,{errors:()=>n.errors},u),g),g.onsubmit=x,o(g,!p&&function(){const e=c.cloneNode(!0),s=e.firstChild;return s.onchange=e=>f({username:e.target.value}),i(()=>s.value=n.username),e}(),m),b.onchange=e=>f({email:e.target.value}),$.onchange=e=>f({password:e.target.value}),_.textContent=v,i(e=>{const s=n.email,r=n.password,t=n.inProgress;return s!==e._v$&&(b.value=e._v$=s),r!==e._v$2&&($.value=e._v$2=r),t!==e._v$3&&(_.disabled=e._v$3=t),e},{_v$:void 0,_v$2:void 0,_v$3:void 0}),e}()};
