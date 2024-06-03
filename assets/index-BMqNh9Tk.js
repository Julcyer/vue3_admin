import{H as y,d as W,r as p,a as X,n as Y,g as n,I as Z,o as b,c as h,b as e,w as r,q as U,z,j as T,h as d,m as ee,D as N,C as w,J as _,_ as ae}from"./index-4yXJxA7R.js";const te=(u,s)=>y.get(`/admin/product/baseTrademark/${u}/${s}`),le=u=>u.id?y.put("/admin/product/baseTrademark/update",u):y.post("/admin/product/baseTrademark/save",u),oe=u=>y.delete("/admin/product/baseTrademark/remove/"+u),re=["src"],ne=["src"],se=W({__name:"index",setup(u){let s=p(1),f=p(3),C=p(0),k=p([]),m=p(!1),o=X({tmName:"",logoUrl:""}),c=p();const g=async(t=1)=>{s.value=t;let a=await te(s.value,f.value);a.code==200&&(C.value=a.data.total,k.value=a.data.records)};Y(()=>{g()});const O=()=>{g()},q=()=>{m.value=!0,o.id=0,o.tmName="",o.logoUrl="",w(()=>{c.value.clearValidate("tmName"),c.value.clearValidate("logoUrl")})},P=t=>{w(()=>{c.value.clearValidate("tmName"),c.value.clearValidate("logoUrl")}),m.value=!0,Object.assign(o,t)},D=()=>{m.value=!1},G=async()=>{await c.value.validate(),(await le(o)).code==200?(m.value=!1,_({type:"success",message:o.id?"修改品牌成功":"添加品牌成功"}),g(o.id?s.value:1)):(_({type:"error",message:o.id?"修改品牌失败":"添加品牌失败"}),m.value=!1)},E=t=>t.type=="image/png"||t.type=="image/jpeg"||t.type=="image/gif"?t.size/1024/1024<1?!0:(_({type:"error",message:"上传文件大小需小于1M"}),!1):(_({type:"error",message:"上传文件格式务必PNG|JPG|GIF"}),!1),L=(t,a)=>{o.logoUrl=t.data,c.value.clearValidate("logoUrl")},j={tmName:[{required:!0,trigger:"blur",validator:(t,a,i)=>{a.trim().length>=2?i():i(new Error("品牌名称位数大于等于两位"))}}],logoUrl:[{required:!0,validator:(t,a,i)=>{a?i():i(new Error("LOGO图片务必上传"))}}]},A=async t=>{(await oe(t)).code==200?(_({type:"success",message:"删除品牌成功"}),g(k.value.length>1?s.value:s.value-1)):_({type:"error",message:"删除品牌失败"})};return(t,a)=>{const i=n("el-button"),v=n("el-table-column"),M=n("el-popconfirm"),H=n("el-table"),I=n("el-pagination"),R=n("el-card"),S=n("el-input"),V=n("el-form-item"),B=n("Plus"),J=n("el-icon"),$=n("el-upload"),F=n("el-form"),K=n("el-dialog"),x=Z("btn");return b(),h("div",null,[e(R,{class:"box-card"},{default:r(()=>[U((b(),z(i,{type:"primary",size:"default",icon:"Plus",onClick:q},{default:r(()=>[T("添加品牌")]),_:1})),[[x,"btn.Trademark.add"]]),e(H,{style:{margin:"10px 0px"},border:"",data:d(k)},{default:r(()=>[e(v,{label:"序号",width:"80px",align:"center",type:"index"}),e(v,{align:"center",label:"名称",prop:"tmName"}),e(v,{align:"center",label:"LOGO"},{default:r(({row:l})=>[ee("img",{src:l.logoUrl,style:{"max-width":"128px","max-height":"128px"},alt:"图片加载失败"},null,8,re)]),_:1}),e(v,{align:"center",label:"操作"},{default:r(({row:l})=>[U(e(i,{type:"primary",size:"small",icon:"Edit",onClick:Q=>P(l)},null,8,["onClick"]),[[x,"btn.Trademark.update"]]),e(M,{title:`您确定要删除${l.tmName}?`,width:"250px",icon:"Delete",onConfirm:Q=>A(l.id)},{reference:r(()=>[U(e(i,{type:"primary",size:"small",icon:"Delete"},null,512),[[x,"btn.Trademark.remove"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(I,{onSizeChange:O,onCurrentChange:g,"pager-count":9,"current-page":d(s),"onUpdate:currentPage":a[0]||(a[0]=l=>N(s)?s.value=l:s=l),"page-size":d(f),"onUpdate:pageSize":a[1]||(a[1]=l=>N(f)?f.value=l:f=l),"page-sizes":[3,5,7,9],background:!0,layout:"prev, pager, next, jumper,->,sizes,total",total:d(C)},null,8,["current-page","page-size","total"])]),_:1}),e(K,{modelValue:d(m),"onUpdate:modelValue":a[3]||(a[3]=l=>N(m)?m.value=l:m=l),title:d(o).id?"修改品牌":"添加品牌",draggable:""},{footer:r(()=>[e(i,{type:"primary",size:"default",onClick:D},{default:r(()=>[T("取消")]),_:1}),e(i,{type:"primary",size:"default",onClick:G},{default:r(()=>[T("确定")]),_:1})]),default:r(()=>[e(F,{style:{width:"80%"},model:d(o),rules:j,ref_key:"formRef",ref:c},{default:r(()=>[e(V,{label:"品牌名称","label-width":"100px",prop:"tmName"},{default:r(()=>[e(S,{placeholder:"请您输入品牌名称",modelValue:d(o).tmName,"onUpdate:modelValue":a[2]||(a[2]=l=>d(o).tmName=l)},null,8,["modelValue"])]),_:1}),e(V,{label:"品牌LOGO","label-width":"100px",prop:"logoUrl"},{default:r(()=>[e($,{class:"avatar-uploader",action:"/api/admin/product/fileUpload","show-file-list":!1,"on-success":L,"before-upload":E},{default:r(()=>[d(o).logoUrl?(b(),h("img",{key:0,src:d(o).logoUrl,class:"avatar"},null,8,ne)):(b(),z(J,{key:1,class:"avatar-uploader-icon"},{default:r(()=>[e(B)]),_:1}))]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"])])}}}),ue=ae(se,[["__scopeId","data-v-8f2bce9f"]]);export{ue as default};
