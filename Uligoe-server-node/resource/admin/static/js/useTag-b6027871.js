import{d as o}from"./pinia-b4aeb200.js";import{r as e}from"./index-60949b5a.js";import{m as s}from"./ant-design-vue-01be3039.js";const d=()=>e.get("/tag"),l=t=>e.post("/tag/upload",t),r=t=>e.post("/tag/edit",t),g=t=>e.get(`/tag/delete/${t}`),u=o("tag",{state:()=>({tagList:[],loading:!1,status:"add",title:"",color:"rgb(32, 151, 243)",id:""}),actions:{async getTagList(){this.loading=!0;const t=await d();this.loading=!1,t.code===1&&(this.tagList=t.data)},async uploadTag(){const t=this.status==="add"?l:r,i={title:this.title,color:this.color};this.status!=="add"&&(i.id=this.id);const a=await t(i);a.code===1?(s.success(a.message),this.clear(),this.getTagList()):s.error(a.message)},async deleteTag(){const t=await g(this.id);t.code===1?(s.success(t.message),this.clear(),this.getTagList()):s.error(t.message)},clear(){this.status="add",this.title="",this.color="rgb(32, 151, 243)",this.id=""},onTagClick(t){this.status="edit",this.title=t.title,this.color=t.color,this.id=t.id},onFinish(t){this.uploadTag()},onFinishFailed(t){console.log("Failed:",t)}}});export{u};