import{H as u,d as E,r as k,a as O,n as F,g as i,I as H,o as f,c as R,b as l,w as s,q as v,z as C,x as P,h as d,m as T,D as x,j as q,F as h,J as D}from"./index-BAhf9uGB.js";const I=()=>u.get("/admin/acl/permission"),J=r=>r.id?u.put("/admin/acl/permission/update",r):u.post("/admin/acl/permission/save",r),G=r=>u.delete("/admin/acl/permission/remove/"+r),K={class:"dialog-footer"},Q=E({__name:"index",setup(r){let b=k([]),n=k(!1),t=O({code:"",level:0,name:"",pid:0});F(()=>{p()});const p=async()=>{let a=await I();a.code==200&&(b.value=a.data)},M=a=>{Object.assign(t,{id:0,code:"",level:0,name:"",pid:0}),n.value=!0,t.level=a.level+1,t.pid=a.id},z=a=>{n.value=!0,Object.assign(t,a)},B=async()=>{(await J(t)).code==200&&(n.value=!1,D({type:"success",message:t.id?"更新成功":"添加成功"}),p())},N=async a=>{(await G(a)).code==200&&(D({type:"success",message:"删除成功"}),p())};return(a,o)=>{const c=i("el-table-column"),m=i("el-button"),U=i("el-popconfirm"),$=i("el-table"),g=i("el-input"),y=i("el-form-item"),j=i("el-form"),A=i("el-dialog"),_=H("btn");return f(),R(h,null,[l($,{data:d(b),style:{width:"100%","margin-bottom":"20px"},"row-key":"id",border:""},{default:s(()=>[l(c,{label:"名称",prop:"name",align:"center"}),l(c,{label:"权限值",prop:"code",align:"center"}),l(c,{label:"修改时间",prop:"updateTime",align:"center"}),l(c,{label:"操作",align:"center"},{default:s(({row:e})=>[v(l(m,{type:"primary",onClick:V=>M(e),size:"small",disabled:e.level==4,title:e.level===3?"添加功能":"添加菜单",icon:"Plus"},null,8,["onClick","disabled","title"]),[[_,"btn.Permission.add"]]),e.level!=1?v((f(),C(m,{key:0,type:"primary",onClick:V=>z(e),size:"small",disabled:e.level==1,title:"编辑",icon:"Edit"},null,8,["onClick","disabled"])),[[_,"btn.Permission.update"]]):P("",!0),l(U,{title:`你确定要删除${e.name}?`,width:"260px",onConfirm:V=>N(e.id)},{reference:s(()=>[e.level!=1?v((f(),C(m,{key:0,type:"primary",size:"small",disabled:e.level==1,icon:"Delete",title:"删除"},null,8,["disabled"])),[[_,"btn.Permission.remove"]]):P("",!0)]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),l(A,{modelValue:d(n),"onUpdate:modelValue":o[3]||(o[3]=e=>x(n)?n.value=e:n=e),title:d(t).id?"更新菜单":"添加菜单"},{footer:s(()=>[T("span",K,[l(m,{onClick:o[2]||(o[2]=e=>x(n)?n.value=!1:n=!1)},{default:s(()=>[q("取消")]),_:1}),l(m,{type:"primary",onClick:B},{default:s(()=>[q(" 确定 ")]),_:1})])]),default:s(()=>[l(j,null,{default:s(()=>[l(y,{label:"名称"},{default:s(()=>[l(g,{placeholder:"请你输入菜单名称",modelValue:d(t).name,"onUpdate:modelValue":o[0]||(o[0]=e=>d(t).name=e)},null,8,["modelValue"])]),_:1}),l(y,{label:"权限"},{default:s(()=>[l(g,{placeholder:"请你输入权限数值",modelValue:d(t).code,"onUpdate:modelValue":o[1]||(o[1]=e=>d(t).code=e)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])],64)}}});export{Q as default};
