import{o as G,n as L,w as P,g as H,u as q,a as B,b as K,r as M,d as $,s as Q}from"./@vue-9926d340.js";function U(e){return B()?(K(e),!0):!1}function E(e){return typeof e=="function"?e():q(e)}const I=typeof window!="undefined"&&typeof document!="undefined";typeof WorkerGlobalScope!="undefined"&&globalThis instanceof WorkerGlobalScope;const X=Object.prototype.toString,Y=e=>X.call(e)==="[object Object]",v=()=>{},Z=ee();function ee(){var e,r;return I&&((e=window==null?void 0:window.navigator)==null?void 0:e.userAgent)&&(/iP(ad|hone|od)/.test(window.navigator.userAgent)||((r=window==null?void 0:window.navigator)==null?void 0:r.maxTouchPoints)>2&&/iPad|Macintosh/.test(window==null?void 0:window.navigator.userAgent))}function x(e,r){function t(...n){return new Promise((s,a)=>{Promise.resolve(e(()=>r.apply(this,n),{fn:r,thisArg:this,args:n})).then(s).catch(a)})}return t}const J=e=>e();function te(e,r={}){let t,n,s=v;const a=l=>{clearTimeout(l),s(),s=v};return l=>{const w=E(e),p=E(r.maxWait);return t&&a(t),w<=0||p!==void 0&&p<=0?(n&&(a(n),n=null),Promise.resolve(l())):new Promise((c,f)=>{s=r.rejectOnCancel?f:c,p&&!n&&(n=setTimeout(()=>{t&&a(t),n=null,c(l())},p)),t=setTimeout(()=>{n&&a(n),n=null,c(l())},w)})}}function ne(e=J){const r=M(!0);function t(){r.value=!1}function n(){r.value=!0}const s=(...a)=>{r.value&&e(...a)};return{isActive:$(r),pause:t,resume:n,eventFilter:s}}function re(e){return e||H()}function me(e,r=200,t={}){return x(te(r,t),e)}function oe(e,r,t={}){const{eventFilter:n=J,...s}=t;return P(e,x(n,r),s)}function ie(e,r,t={}){const{eventFilter:n,...s}=t,{eventFilter:a,pause:g,resume:l,isActive:w}=ne(n);return{stop:oe(e,r,{...s,eventFilter:a}),pause:g,resume:l,isActive:w}}function se(e,r=!0,t){re()?G(e,t):r?e():L(e)}function we(e,r,t){return P(e,(n,s,a)=>{n&&r(n,s,a)},t)}function A(e){var r;const t=E(e);return(r=t==null?void 0:t.$el)!=null?r:t}const _=I?window:void 0;function O(...e){let r,t,n,s;if(typeof e[0]=="string"||Array.isArray(e[0])?([t,n,s]=e,r=_):[r,t,n,s]=e,!r)return v;Array.isArray(t)||(t=[t]),Array.isArray(n)||(n=[n]);const a=[],g=()=>{a.forEach(c=>c()),a.length=0},l=(c,f,o,u)=>(c.addEventListener(f,o,u),()=>c.removeEventListener(f,o,u)),w=P(()=>[A(r),E(s)],([c,f])=>{if(g(),!c)return;const o=Y(f)?{...f}:f;a.push(...t.flatMap(u=>n.map(d=>l(c,u,d,o))))},{immediate:!0,flush:"post"}),p=()=>{w(),g()};return U(p),p}let W=!1;function ge(e,r,t={}){const{window:n=_,ignore:s=[],capture:a=!0,detectIframe:g=!1}=t;if(!n)return v;Z&&!W&&(W=!0,Array.from(n.document.body.children).forEach(o=>o.addEventListener("click",v)),n.document.documentElement.addEventListener("click",v));let l=!0;const w=o=>s.some(u=>{if(typeof u=="string")return Array.from(n.document.querySelectorAll(u)).some(d=>d===o.target||o.composedPath().includes(d));{const d=A(u);return d&&(o.target===d||o.composedPath().includes(d))}}),c=[O(n,"click",o=>{const u=A(e);if(!(!u||u===o.target||o.composedPath().includes(u))){if(o.detail===0&&(l=!w(o)),!l){l=!0;return}r(o)}},{passive:!0,capture:a}),O(n,"pointerdown",o=>{const u=A(e);l=!w(o)&&!!(u&&!o.composedPath().includes(u))},{passive:!0}),g&&O(n,"blur",o=>{setTimeout(()=>{var u;const d=A(e);((u=n.document.activeElement)==null?void 0:u.tagName)==="IFRAME"&&!(d!=null&&d.contains(n.document.activeElement))&&r(o)},0)})].filter(Boolean);return()=>c.forEach(o=>o())}const T=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},N="__vueuse_ssr_handlers__",ue=ae();function ae(){return N in T||(T[N]=T[N]||{}),T[N]}function le(e,r){return ue[e]||r}function ce(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const fe={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},D="vueuse-storage";function de(e,r,t,n={}){var s;const{flush:a="pre",deep:g=!0,listenToStorageChanges:l=!0,writeDefaults:w=!0,mergeDefaults:p=!1,shallow:c,window:f=_,eventFilter:o,onError:u=i=>{console.error(i)},initOnMounted:d}=n,y=(c?Q:M)(typeof r=="function"?r():r);if(!t)try{t=le("getDefaultStorage",()=>{var i;return(i=_)==null?void 0:i.localStorage})()}catch(i){u(i)}if(!t)return y;const h=E(r),j=ce(h),b=(s=n.serializer)!=null?s:fe[j],{pause:V,resume:C}=ie(y,()=>z(y.value),{flush:a,deep:g,eventFilter:o});return f&&l&&se(()=>{O(f,"storage",F),O(f,D,k),d&&F()}),d||F(),y;function z(i){try{if(i==null)t.removeItem(e);else{const m=b.write(i),S=t.getItem(e);S!==m&&(t.setItem(e,m),f&&f.dispatchEvent(new CustomEvent(D,{detail:{key:e,oldValue:S,newValue:m,storageArea:t}})))}}catch(m){u(m)}}function R(i){const m=i?i.newValue:t.getItem(e);if(m==null)return w&&h!=null&&t.setItem(e,b.write(h)),h;if(!i&&p){const S=b.read(m);return typeof p=="function"?p(S,h):j==="object"&&!Array.isArray(S)?{...h,...S}:S}else return typeof m!="string"?m:b.read(m)}function k(i){F(i.detail)}function F(i){if(!(i&&i.storageArea!==t)){if(i&&i.key==null){y.value=h;return}if(!(i&&i.key!==e)){V();try{(i==null?void 0:i.newValue)!==b.write(y.value)&&(y.value=R(i))}catch(m){u(m)}finally{i?L(C):C()}}}}}function ye(e,r,t={}){const{window:n=_}=t;return de(e,r,n==null?void 0:n.localStorage,t)}export{ye as a,ge as o,se as t,me as u,we as w};