import{u as B}from"./useFile-fbf1e74d.js";import{s as L}from"./pinia-b4aeb200.js";import{r as c,w as m,o as S,a7 as o,$ as i,a0 as p,c as n,a9 as s,a1 as _,F as d,a4 as $,u as U,a8 as V}from"./@vue-9926d340.js";const j={style:{"max-height":"500px",overflow:"auto"}},q=["src"],T={__name:"SelectFile",props:{fileName:{required:!0,type:String}},emits:["update:fileName"],setup(v,{emit:f}){const g=v,k=f,l=c("");m(l,t=>{k("update:fileName",t)}),m(()=>g.fileName,t=>{l.value=t},{immediate:!0});const r=c(!1),u=B(),{fileList:x}=L(u);S(()=>{u.getFileList()});const b=t=>{l.value=t,r.value=!1};return(t,a)=>{const w=o("a-input"),C=o("a-card-meta"),N=o("a-card"),h=o("a-col"),F=o("a-row"),y=o("a-modal");return i(),p(d,null,[n(w,{value:l.value,"onUpdate:value":a[0]||(a[0]=e=>l.value=e),onClick:a[1]||(a[1]=e=>r.value=!0),placeholder:"\u8BF7\u9009\u62E9\u6587\u4EF6"},null,8,["value"]),n(y,{visible:r.value,"onUpdate:visible":a[2]||(a[2]=e=>r.value=e),title:"\u9009\u62E9\u6587\u4EF6",footer:null},{default:s(()=>[_("div",j,[n(F,null,{default:s(()=>[(i(!0),p(d,null,$(U(x),e=>(i(),V(h,{span:12},{default:s(()=>[n(N,{hoverable:"",style:{margin:"10px","margin-left":"0"},onClick:E=>b(e.url)},{cover:s(()=>[_("img",{alt:"example",height:"180",style:{"object-fit":"cover"},src:e.url},null,8,q)]),default:s(()=>[n(C,{title:e.name},null,8,["title"])]),_:2},1032,["onClick"])]),_:2},1024))),256))]),_:1})])]),_:1},8,["visible"])],64)}}};export{T as _};