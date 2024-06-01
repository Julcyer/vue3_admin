import{u as pe}from"./setting-DRRv7okC.js";import{H as x,d as ce,r as i,a as fe,n as ve,g as p,I as ge,o as _,c as M,b as l,w as t,h as r,D as U,j as m,q as R,z as k,m as N,t as $,x as _e,F as B,y as be,C as J,J as q,p as ye,k as we,_ as Ve}from"./index-HtYYoKz9.js";const he=(n,d,y)=>x.get(`/admin/acl/user/${n}/${d}/?username=${y}`),Ce=n=>n.id?x.put("/admin/acl/user/update",n):x.post("/admin/acl/user/save",n),Ue=n=>x.get("/admin/acl/user/toAssign/"+n),ke=n=>x.post("/admin/acl/user/doAssignRole",n),xe=n=>x.delete("/admin/acl/user/remove/"+n),ze=n=>x.delete("/admin/acl/user/batchRemove",{data:n}),Se=n=>(ye("data-v-a1453c89"),n=n(),we(),n),Re={style:{flex:"auto"}},qe=Se(()=>N("h4",null,"分配角色(职位)",-1)),Ie={style:{flex:"auto"}},Ae=ce({__name:"index",setup(n){let d=i(1),y=i(5),O=i(0),I=i([]),f=i(!1),v=i(!1),z=i([]),b=i([]),s=fe({username:"",name:"",password:""}),D=i([]),w=i(),V=i(""),P=pe();ve(()=>{h()});const h=async(o=1)=>{d.value=o;let e=await he(d.value,y.value,V.value);e.code==200&&(O.value=e.data.total,I.value=e.data.records)},G=()=>{h()},K=()=>{f.value=!0,Object.assign(s,{id:0,username:"",name:"",password:""}),J(()=>{w.value.clearValidate("username"),w.value.clearValidate("name"),w.value.clearValidate("password")})},Q=o=>{f.value=!0,Object.assign(s,o),J(()=>{w.value.clearValidate("username"),w.value.clearValidate("name")})},W=async()=>{await w.value.validate(),(await Ce(s)).code==200?(f.value=!1,q({type:"success",message:s.id?"更新成功":"添加成功"}),window.location.reload()):(f.value=!1,q({type:"error",message:s.id?"更新失败":"添加失败"}))},X=()=>{f.value=!1},Y={username:[{required:!0,trigger:"blur",validator:(o,e,u)=>{e.trim().length>=5?u():u(new Error("用户名字至少五位"))}}],name:[{required:!0,trigger:"blur",validator:(o,e,u)=>{e.trim().length>=5?u():u(new Error("用户昵称至少五位"))}}],password:[{required:!0,trigger:"blur",validator:(o,e,u)=>{e.trim().length>=6?u():u(new Error("用户密码至少六位"))}}]},Z=async o=>{Object.assign(s,o);let e=await Ue(s.id);e.code==200&&(z.value=e.data.allRolesList,b.value=e.data.assignRoles,console.log(e),console.log(z.value),console.log(b.value),v.value=!0)},E=i(!1),j=i(!0),ee=o=>{b.value=o?z.value:[],j.value=!1},le=o=>{E.value=o.length===z.value.length,j.value=o.length>0&&o.length<z.value.length},ae=async()=>{let o={userId:s.id,roleIdList:b.value.map(u=>u.id)};(await ke(o)).code==200&&(q({type:"success",message:"分配职务成功"}),v.value=!1,h(d.value))},te=async o=>{(await xe(o)).code==200&&(q({type:"success",message:"删除成功"}),h(I.value.length>1?d.value:d.value-1))},oe=o=>{D.value=o},re=async()=>{let o=D.value.map(u=>u.id);(await ze(o)).code==200&&(q({type:"success",message:"删除成功"}),h(I.value.length>1?d.value:d.value-1))},se=()=>{h(),V.value=""},ne=()=>{P.refsh=!P.refsh};return(o,e)=>{const u=p("el-input"),C=p("el-form-item"),c=p("el-button"),L=p("el-form"),T=p("el-card"),g=p("el-table-column"),ue=p("el-popconfirm"),de=p("el-table"),ie=p("el-pagination"),F=p("el-drawer"),H=p("el-checkbox"),me=p("el-checkbox-group"),S=ge("btn");return _(),M(B,null,[l(T,{style:{height:"80px"}},{default:t(()=>[l(L,{inline:!0,class:"form"},{default:t(()=>[l(C,{label:"用户名:"},{default:t(()=>[l(u,{placeholder:"请你输入搜索用户名",modelValue:r(V),"onUpdate:modelValue":e[0]||(e[0]=a=>U(V)?V.value=a:V=a)},null,8,["modelValue"])]),_:1}),l(C,null,{default:t(()=>[l(c,{type:"primary",size:"default",disabled:!r(V),onClick:se},{default:t(()=>[m("搜索")]),_:1},8,["disabled"]),l(c,{type:"primary",size:"default",onClick:ne},{default:t(()=>[m("重置")]),_:1})]),_:1})]),_:1})]),_:1}),l(T,{style:{margin:"10px 0px"}},{default:t(()=>[R((_(),k(c,{type:"primary",size:"default",onClick:K},{default:t(()=>[m("添加用户")]),_:1})),[[S,"btn.User.add"]]),R((_(),k(c,{type:"primary",size:"default",disabled:!r(D).length,onClick:re},{default:t(()=>[m("批量删除")]),_:1},8,["disabled"])),[[S,"btn.User.remove"]]),l(de,{onSelectionChange:oe,style:{margin:"10px 0px"},border:"",data:r(I)},{default:t(()=>[l(g,{type:"selection",align:"center"}),l(g,{label:"#",align:"center",type:"index"}),l(g,{label:"ID",align:"center",prop:"id"}),l(g,{label:"用户名字",align:"center",prop:"username","show-overflow-tooltip":""}),l(g,{label:"用户名称",align:"center",prop:"name","show-overflow-tooltip":""}),l(g,{label:"用户角色",align:"center",prop:"roleName","show-overflow-tooltip":""}),l(g,{label:"创建时间",align:"center",prop:"createTime","show-overflow-tooltip":""}),l(g,{label:"更新时间",align:"center",prop:"updateTime","show-overflow-tooltip":""}),l(g,{label:"操作",width:"300px",align:"center"},{default:t(({row:a})=>[R((_(),k(c,{type:"primary",size:"small",icon:"User",onClick:A=>Z(a)},{default:t(()=>[m("分配角色")]),_:2},1032,["onClick"])),[[S,"btn.User.assgin"]]),R((_(),k(c,{type:"primary",size:"small",icon:"Edit",onClick:A=>Q(a)},{default:t(()=>[m("编辑")]),_:2},1032,["onClick"])),[[S,"btn.User.update"]]),l(ue,{title:`你确定要删除${a.username}?`,width:"260px",onConfirm:A=>te(a.id)},{reference:t(()=>[R((_(),k(c,{type:"primary",size:"small",icon:"Delete"},{default:t(()=>[m("删除")]),_:1})),[[S,"btn.User.remove"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),l(ie,{"current-page":r(d),"onUpdate:currentPage":e[1]||(e[1]=a=>U(d)?d.value=a:d=a),"page-size":r(y),"onUpdate:pageSize":e[2]||(e[2]=a=>U(y)?y.value=a:y=a),"page-sizes":[5,7,9,11],background:!0,layout:"prev, pager, next, jumper,->,sizes,total",total:r(O),onCurrentChange:h,onSizeChange:G},null,8,["current-page","page-size","total"])]),_:1}),l(F,{modelValue:r(f),"onUpdate:modelValue":e[6]||(e[6]=a=>U(f)?f.value=a:f=a)},{header:t(()=>[N("h4",null,$(r(s).id?"更新用户":"添加用户"),1)]),default:t(()=>[l(L,{model:r(s),rules:Y,ref_key:"formRef",ref:w},{default:t(()=>[l(C,{label:"用户姓名",prop:"username"},{default:t(()=>[l(u,{placeholder:"请您输入用户姓名",modelValue:r(s).username,"onUpdate:modelValue":e[3]||(e[3]=a=>r(s).username=a)},null,8,["modelValue"])]),_:1}),l(C,{label:"用户昵称",prop:"name"},{default:t(()=>[l(u,{placeholder:"请您输入用户昵称",modelValue:r(s).name,"onUpdate:modelValue":e[4]||(e[4]=a=>r(s).name=a)},null,8,["modelValue"])]),_:1}),r(s).id?_e("",!0):(_(),k(C,{key:0,label:"用户密码",prop:"password"},{default:t(()=>[l(u,{placeholder:"请您输入用户密码",modelValue:r(s).password,"onUpdate:modelValue":e[5]||(e[5]=a=>r(s).password=a)},null,8,["modelValue"])]),_:1}))]),_:1},8,["model"])]),footer:t(()=>[N("div",Re,[l(c,{onClick:X},{default:t(()=>[m("取消")]),_:1}),l(c,{type:"primary",onClick:W},{default:t(()=>[m("确定")]),_:1})])]),_:1},8,["modelValue"]),l(F,{modelValue:r(v),"onUpdate:modelValue":e[11]||(e[11]=a=>U(v)?v.value=a:v=a)},{header:t(()=>[qe]),default:t(()=>[l(L,null,{default:t(()=>[l(C,{label:"用户姓名"},{default:t(()=>[l(u,{modelValue:r(s).username,"onUpdate:modelValue":e[7]||(e[7]=a=>r(s).username=a),disabled:!0},null,8,["modelValue"])]),_:1}),l(C,{label:"职位列表"},{default:t(()=>[l(H,{modelValue:E.value,"onUpdate:modelValue":e[8]||(e[8]=a=>E.value=a),onChange:ee,indeterminate:j.value},{default:t(()=>[m("全选")]),_:1},8,["modelValue","indeterminate"]),l(me,{modelValue:r(b),"onUpdate:modelValue":e[9]||(e[9]=a=>U(b)?b.value=a:b=a),onChange:le},{default:t(()=>[(_(!0),M(B,null,be(r(z),(a,A)=>(_(),k(H,{key:A,label:a},{default:t(()=>[m($(a.roleName),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),footer:t(()=>[N("div",Ie,[l(c,{onClick:e[10]||(e[10]=a=>U(v)?v.value=!1:v=!1)},{default:t(()=>[m("取消")]),_:1}),l(c,{type:"primary",onClick:ae},{default:t(()=>[m("确定")]),_:1})])]),_:1},8,["modelValue"])],64)}}}),Oe=Ve(Ae,[["__scopeId","data-v-a1453c89"]]);export{Oe as default};
