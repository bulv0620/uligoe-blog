import{_ as I,u as R}from"./index-60949b5a.js";import{a as q,u as B}from"./vue-router-c96a8d72.js";import{r as C,o as N,f as U,L as V,a7 as m,$ as k,a0 as T,a1 as r,a2 as z,c as o,a9 as t,u as a,K as h,J as E,ab as J,ac as K}from"./@vue-9926d340.js";import{m as c}from"./ant-design-vue-01be3039.js";import"./@ant-design-2dc0aa31.js";import"./@ctrl-7f4e908e.js";import"./mitt-dab1f1cb.js";import"./pinia-b4aeb200.js";import"./vue-demi-5b9a0fa5.js";import"./axios-f45f83e3.js";import"./nprogress-7c12677d.js";import"./@babel-fff5462b.js";import"./vue3-colorpicker-2b62a1f5.js";import"./@vueuse-f8675665.js";import"./tinycolor2-8fe94c9b.js";import"./gradient-parser-8ea7f2ac.js";import"./@aesoper-129a60c8.js";import"./lodash-es-6d6f457b.js";import"./@popperjs-898015e8.js";import"./resize-observer-polyfill-c24c855f.js";import"./vue-types-932461d1.js";import"./dom-align-de4ed2f2.js";import"./dayjs-332804ad.js";import"./async-validator-efc2d198.js";import"./scroll-into-view-if-needed-90d8f7af.js";import"./compute-scroll-into-view-72df79c3.js";const M=i=>(J("data-v-5c354a00"),i=i(),K(),i),P={class:"bg"},$={class:"login-panel"},j={class:"left"},A={class:"right"},D=M(()=>r("h1",{class:"login-title"},"\u767B\u5F55",-1)),G={__name:"Login",setup(i){const _=q(),y=B(),b=R(),f=C(!1);N(()=>{setTimeout(()=>{f.value=!0},100)});const v=U({username:"",password:"",loading:!1}),{username:l,password:n,loading:s}=V(v);async function w(){try{s.value=!0,await b.login(l.value,n.value),s.value=!1,c.success("\u767B\u5F55\u6210\u529F");let e=y.query.redirect;e?_.push(e):_.push("/dashboard")}catch(e){s.value=!1,console.log(e),c.error(typeof e=="string"?e:e.message)}}function x(){w()}function F(e){c.error(e.errorFields[0].errors[0])}return(e,u)=>{const g=m("a-input"),p=m("a-form-item"),L=m("a-button"),S=m("a-form");return k(),T("div",P,[r("div",$,[r("div",j,[r("h1",{class:z(["logo",{show:f.value}])},"uligoe",2)]),r("div",A,[D,o(S,{class:"login-form",model:v,name:"login-form",onFinish:x,onFinishFailed:F},{default:t(()=>[o(p,{name:"username",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"}]},{default:t(()=>[o(g,{type:"text",class:"form-control",id:"username",placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",value:a(l),"onUpdate:value":u[0]||(u[0]=d=>h(l)?l.value=d:null),disabled:a(s)},null,8,["value","disabled"])]),_:1}),o(p,{name:"password",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801"}]},{default:t(()=>[o(g,{type:"password",class:"form-control",id:"password",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",value:a(n),"onUpdate:value":u[1]||(u[1]=d=>h(n)?n.value=d:null),disabled:a(s)},null,8,["value","disabled"])]),_:1}),o(p,null,{default:t(()=>[o(L,{type:"primary","html-type":"submit",loading:a(s)},{default:t(()=>[E("\u767B\u5F55")]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])])])])}}};var ye=I(G,[["__scopeId","data-v-5c354a00"]]);export{ye as default};
