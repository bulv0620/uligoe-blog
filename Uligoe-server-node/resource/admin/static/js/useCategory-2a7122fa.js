import{d as a}from"./pinia-b4aeb200.js";import{r as i}from"./index-60949b5a.js";import{m as e}from"./ant-design-vue-01be3039.js";const r=()=>i.get("/category"),c=t=>i.post("/category/upload",t),d=t=>i.post("/category/edit",t),g=t=>i.get(`/category/delete/${t}`),m=a("category",{state:()=>({categoryList:[],loading:!1,title:"",coverImg:"",description:"",status:"add",id:""}),actions:{async getCategoryList(){this.loading=!0;const t=await r();this.loading=!1,t.code===1&&(this.categoryList=t.data)},async uploadCategory(){const t=this.status==="add"?c:d,s={title:this.title,coverImg:this.coverImg,description:this.description};this.status!=="add"&&(s.id=this.id);const o=await t(s);o.code===1?(e.success(o.message),this.clear(),this.getCategoryList()):e.error(o.message)},async deleteCategory(t){const s=await g(t);s.code===1?(e.success(s.message),this.clear(),this.getCategoryList()):e.error(s.message)},onCategoryEditClick(t){this.status="edit",this.title=t.title,this.coverImg=t.cover_img,this.description=t.description,this.id=t.id},clear(){this.status="add",this.title="",this.coverImg="",this.description="",this.id=""},onFinish(t){console.log("Success:",t),this.uploadCategory()},onFinishFailed(t){console.log("Failed:",t)}}});export{m as u};