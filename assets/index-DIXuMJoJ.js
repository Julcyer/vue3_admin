import{H as z,d as Z,r as m,Q as de,g as o,o as f,z as x,w as t,b as e,h as a,c as E,F as j,y as G,D as J,m as X,j as F,t as ie,J as P,a as pe,P as ce,L as me,B as _e,M as fe,I as ge,q as H,v as Y}from"./index-DDpbq2o8.js";const Se=(S,b,V)=>z.get(`/admin/product/${S}/${b}?category3Id=${V}`),ee=()=>z.get("/admin/product/baseTrademark/getTrademarkList"),te=S=>z.get("/admin/product/spuImageList/"+S),ae=S=>z.get("/admin/product/spuSaleAttrList/"+S),le=()=>z.get("/admin/product/baseSaleAttrList"),ve=S=>S.id?z.post("/admin/product/updateSpuInfo",S):z.post("/admin/product/saveSpuInfo",S),ye=S=>z.post("/admin/product/saveSkuInfo",S),be=S=>z.get("/admin/product/findBySpuId/"+S),Ve=S=>z.delete("/admin/product/deleteSpu/"+S),ke=["src"],Ie=Z({__name:"spuForm",emits:["changeScene"],setup(S,{expose:b,emit:V}){let y=V;const C=()=>{y("changeScene",{flag:0,params:"update"})};let U=m([]),k=m([]),r=m([]),D=m([]),w=m(!1),N=m(""),d=m({category3Id:"",spuName:"",description:"",tmId:"",spuImageList:[],spuSaleAttrList:[]}),h=m("");const L=async l=>{d.value=l;let n=await ee(),s=await te(l.id),A=await ae(l.id),R=await le();U.value=n.data,k.value=s.data.map($=>({name:$.imgName,url:$.imgUrl})),r.value=A.data,D.value=R.data},i=l=>{N.value=l.url,w.value=!0},p=()=>{},_=l=>l.type=="image/png"||l.type=="image/jpeg"||l.type=="image/gif"?l.size/1024/1024<3?!0:(P({type:"error",message:"上传文件务必小于3M"}),!1):(P({type:"error",message:"上传文件务必PNG|JPG|GIF"}),!1);let I=de(()=>D.value.filter(n=>r.value.every(s=>n.name!=s.saleAttrName)));const K=()=>{const[l,n]=h.value.split(":");let s={baseSaleAttrId:l,saleAttrName:n,spuSaleAttrValueList:[]};r.value.push(s),h.value=""},g=l=>{l.flag=!0,l.saleAttrValue=""},c=l=>{const{baseSaleAttrId:n,saleAttrValue:s}=l;let A={baseSaleAttrId:n,saleAttrValueName:s};if(s.trim()==""){P({type:"error",message:"属性值不能为空的"});return}if(l.spuSaleAttrValueList.find($=>$.saleAttrValueName==s)){P({type:"error",message:"属性值重复"});return}l.spuSaleAttrValueList.push(A),l.flag=!1},M=async()=>{d.value.spuImageList=k.value.map(n=>({imgName:n.name,imgUrl:n.response&&n.response.data||n.url})),d.value.spuSaleAttrList=r.value,(await ve(d.value)).code==200?(P({type:"success",message:d.value.id?"更新成功":"添加成功"}),y("changeScene",{flag:0,params:d.value.id?"update":"add"})):P({type:"success",message:d.value.id?"更新成功":"添加成功"})};return b({initHasSpuData:L,initAddSpu:async l=>{Object.assign(d.value,{category3Id:"",spuName:"",description:"",tmId:"",spuImageList:[],spuSaleAttrList:[]}),k.value=[],r.value=[],h.value="",d.value.category3Id=l;let n=await ee(),s=await le();U.value=n.data,D.value=s.data}}),(l,n)=>{const s=o("el-input"),A=o("el-form-item"),R=o("el-option"),$=o("el-select"),T=o("Plus"),v=o("el-icon"),O=o("el-upload"),ue=o("el-dialog"),Q=o("el-button"),W=o("el-table-column"),ne=o("el-tag"),se=o("el-table"),oe=o("el-form");return f(),x(oe,{"label-width":"100px"},{default:t(()=>[e(A,{label:"SPU名称"},{default:t(()=>[e(s,{placeholder:"请你输入SPU名称",modelValue:a(d).spuName,"onUpdate:modelValue":n[0]||(n[0]=u=>a(d).spuName=u)},null,8,["modelValue"])]),_:1}),e(A,{label:"SPU品牌"},{default:t(()=>[e($,{modelValue:a(d).tmId,"onUpdate:modelValue":n[1]||(n[1]=u=>a(d).tmId=u)},{default:t(()=>[(f(!0),E(j,null,G(a(U),(u,B)=>(f(),x(R,{key:u.id,label:u.tmName,value:u.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(A,{label:"SPU描述"},{default:t(()=>[e(s,{type:"textarea",placeholder:"请你输入SPU描述",modelValue:a(d).description,"onUpdate:modelValue":n[2]||(n[2]=u=>a(d).description=u)},null,8,["modelValue"])]),_:1}),e(A,{label:"SPU图片"},{default:t(()=>[e(O,{"file-list":a(k),"onUpdate:fileList":n[3]||(n[3]=u=>J(k)?k.value=u:k=u),action:"/api/admin/product/fileUpload","list-type":"picture-card","on-preview":i,"on-remove":p,"before-upload":_},{default:t(()=>[e(v,null,{default:t(()=>[e(T)]),_:1})]),_:1},8,["file-list"]),e(ue,{modelValue:a(w),"onUpdate:modelValue":n[4]||(n[4]=u=>J(w)?w.value=u:w=u)},{default:t(()=>[X("img",{"w-full":"",src:a(N),alt:"Preview Image",style:{width:"100%",height:"100%"}},null,8,ke)]),_:1},8,["modelValue"])]),_:1}),e(A,{label:"SPU销售属性"},{default:t(()=>[e($,{modelValue:a(h),"onUpdate:modelValue":n[5]||(n[5]=u=>J(h)?h.value=u:h=u),placeholder:a(I).length?`还未选择${a(I).length}个`:"无"},{default:t(()=>[(f(!0),E(j,null,G(a(I),(u,B)=>(f(),x(R,{value:`${u.id}:${u.name}`,key:u.id,label:u.name},null,8,["value","label"]))),128))]),_:1},8,["modelValue","placeholder"]),e(Q,{onClick:K,disabled:!a(h),style:{"margin-left":"10px"},type:"primary",size:"default",icon:"Plus"},{default:t(()=>[F("添加属性")]),_:1},8,["disabled"]),e(se,{border:"",style:{margin:"10px 0px"},data:a(r)},{default:t(()=>[e(W,{label:"序号",type:"index",align:"center",width:"80px"}),e(W,{label:"销售属性名字",width:"120px",prop:"saleAttrName"}),e(W,{label:"销售属性值"},{default:t(({row:u})=>[(f(!0),E(j,null,G(u.spuSaleAttrValueList,(B,re)=>(f(),x(ne,{style:{margin:"0px 5px"},onClose:xe=>u.spuSaleAttrValueList.splice(re,1),key:u.id,class:"mx-1",closable:""},{default:t(()=>[F(ie(B.saleAttrValueName),1)]),_:2},1032,["onClose"]))),128)),u.flag==!0?(f(),x(s,{key:0,onBlur:B=>c(u),modelValue:u.saleAttrValue,"onUpdate:modelValue":B=>u.saleAttrValue=B,placeholder:"请你输入属性值",size:"small",style:{width:"100px"}},null,8,["onBlur","modelValue","onUpdate:modelValue"])):(f(),x(Q,{key:1,onClick:B=>g(u),type:"primary",size:"small",icon:"Plus"},null,8,["onClick"]))]),_:1}),e(W,{label:"操作",width:"120px"},{default:t(({$index:u})=>[e(Q,{type:"primary",size:"small",icon:"Delete",onClick:B=>a(r).splice(u,1)},null,8,["onClick"])]),_:1})]),_:1},8,["data"])]),_:1}),e(A,null,{default:t(()=>[e(Q,{disabled:!(a(r).length>0),type:"primary",size:"default",onClick:M},{default:t(()=>[F("保存")]),_:1},8,["disabled"]),e(Q,{type:"primary",size:"default",onClick:C},{default:t(()=>[F("取消")]),_:1})]),_:1})]),_:1})}}}),Ae=["src"],Ue=Z({__name:"skuForm",emits:["changeScene"],setup(S,{expose:b,emit:V}){let y=m([]),C=m([]),U=m([]),k=m(),r=pe({category3Id:"",spuId:"",tmId:"",skuName:"",price:"",weight:"",skuDesc:"",skuAttrValueList:[],skuSaleAttrValueList:[],skuDefaultImg:""});const D=async(L,i,p)=>{r.category3Id=p.category3Id,r.spuId=p.id,r.tmId=p.tmId;let _=await ce(L,i,p.category3Id),I=await ae(p.id),K=await te(p.id);y.value=_.data,C.value=I.data,U.value=K.data},w=()=>{d("changeScene",{flag:0,params:""})},N=L=>{U.value.forEach(i=>{k.value.toggleRowSelection(i,!1)}),k.value.toggleRowSelection(L,!0),r.skuDefaultImg=L.imgUrl};let d=V;const h=async()=>{r.skuAttrValueList=y.value.reduce((i,p)=>{if(p.attrIdAndValueId){let[_,I]=p.attrIdAndValueId.split(":");i.push({attrId:_,valueId:I})}return i},[]),r.skuSaleAttrValueList=C.value.reduce((i,p)=>{if(p.saleIdAndValueId){let[_,I]=p.saleIdAndValueId.split(":");i.push({saleAttrId:_,saleAttrValueId:I})}return i},[]),(await ye(r)).code==200?(P({type:"success",message:"添加SKU成功"}),d("changeScene",{flag:0,params:""})):P({type:"error",message:"添加SKU失败"})};return b({initSkuData:D}),(L,i)=>{const p=o("el-input"),_=o("el-form-item"),I=o("el-option"),K=o("el-select"),g=o("el-form"),c=o("el-table-column"),M=o("el-button"),q=o("el-table");return f(),x(g,{"label-width":"100px"},{default:t(()=>[e(_,{label:"SKU名称"},{default:t(()=>[e(p,{placeholder:"SKU名称",modelValue:a(r).skuName,"onUpdate:modelValue":i[0]||(i[0]=l=>a(r).skuName=l)},null,8,["modelValue"])]),_:1}),e(_,{label:"价格(元)"},{default:t(()=>[e(p,{placeholder:"价格(元)",type:"number",modelValue:a(r).price,"onUpdate:modelValue":i[1]||(i[1]=l=>a(r).price=l)},null,8,["modelValue"])]),_:1}),e(_,{label:"重量(g)"},{default:t(()=>[e(p,{placeholder:"重量(g)",type:"number",modelValue:a(r).weight,"onUpdate:modelValue":i[2]||(i[2]=l=>a(r).weight=l)},null,8,["modelValue"])]),_:1}),e(_,{label:"SKU描述"},{default:t(()=>[e(p,{placeholder:"SKU描述",type:"textarea",modelValue:a(r).skuDesc,"onUpdate:modelValue":i[3]||(i[3]=l=>a(r).skuDesc=l)},null,8,["modelValue"])]),_:1}),e(_,{label:"平台属性"},{default:t(()=>[e(g,{inline:!0},{default:t(()=>[(f(!0),E(j,null,G(a(y),(l,n)=>(f(),x(_,{key:l.id,label:l.attrName},{default:t(()=>[e(K,{modelValue:l.attrIdAndValueId,"onUpdate:modelValue":s=>l.attrIdAndValueId=s},{default:t(()=>[(f(!0),E(j,null,G(l.attrValueList,(s,A)=>(f(),x(I,{value:`${l.id}:${s.id}`,key:s.id,label:s.valueName},null,8,["value","label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1}),e(_,{label:"销售属性"},{default:t(()=>[e(g,{inline:!0},{default:t(()=>[(f(!0),E(j,null,G(a(C),(l,n)=>(f(),x(_,{label:l.saleAttrName,key:l.id},{default:t(()=>[e(K,{modelValue:l.saleIdAndValueId,"onUpdate:modelValue":s=>l.saleIdAndValueId=s},{default:t(()=>[(f(!0),E(j,null,G(l.spuSaleAttrValueList,(s,A)=>(f(),x(I,{value:`${l.id}:${s.id}`,key:s.id,label:s.saleAttrValueName},null,8,["value","label"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1}),e(_,{label:"图片名称"},{default:t(()=>[e(q,{border:"",data:a(U),ref_key:"table",ref:k},{default:t(()=>[e(c,{type:"selection",width:"80px",align:"center"}),e(c,{label:"图片"},{default:t(({row:l})=>[X("img",{src:l.imgUrl,alt:"",style:{width:"100px",height:"100px"}},null,8,Ae)]),_:1}),e(c,{label:"名称",prop:"imgName"}),e(c,{label:"操作"},{default:t(({row:l})=>[e(M,{type:"primary",size:"small",onClick:n=>N(l)},{default:t(()=>[F("设置默认")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),_:1}),e(_,null,{default:t(()=>[e(M,{type:"primary",size:"default",onClick:h},{default:t(()=>[F("保存")]),_:1}),e(M,{type:"primary",size:"default",onClick:w},{default:t(()=>[F("取消")]),_:1})]),_:1})]),_:1})}}}),he=["src"],we=Z({__name:"index",setup(S){let b=me(),V=m(0),y=m(1),C=m(3),U=m([]),k=m(0),r=m(),D=m(),w=m([]),N=m(!1);_e(()=>b.c3Id,()=>{U.value=[],b.c3Id&&d()});const d=async(g=1)=>{y.value=g;let c=await Se(y.value,C.value,b.c3Id);c.code==200&&(U.value=c.data.records,k.value=c.data.total)},h=()=>{d()},L=()=>{V.value=1,r.value.initAddSpu(b.c3Id)},i=g=>{V.value=1,r.value.initHasSpuData(g)},p=g=>{V.value=g.flag,g.params=="update"?d(y.value):d()},_=g=>{V.value=2,D.value.initSkuData(b.c1Id,b.c2Id,g)},I=async g=>{let c=await be(g.id);c.code==200&&(w.value=c.data,N.value=!0)},K=async g=>{(await Ve(g.id)).code==200?(P({type:"success",message:"删除成功"}),d(U.value.length>1?y.value:y.value-1)):P({type:"error",message:"删除失败"})};return fe(()=>{b.$reset()}),(g,c)=>{const M=o("Category"),q=o("el-button"),l=o("el-table-column"),n=o("el-popconfirm"),s=o("el-table"),A=o("el-pagination"),R=o("el-dialog"),$=o("el-card"),T=ge("btn");return f(),E("div",null,[e(M,{scene:a(V)},null,8,["scene"]),e($,{style:{margin:"10px 0px"}},{default:t(()=>[H(X("div",null,[H((f(),x(q,{onClick:L,type:"primary",size:"default",icon:"Plus",disabled:!a(b).c3Id},{default:t(()=>[F("添加SPU")]),_:1},8,["disabled"])),[[T,"btn.Spu.add"]]),e(s,{style:{margin:"10px 0px"},border:"",data:a(U)},{default:t(()=>[e(l,{label:"序号",type:"index",align:"center",width:"80px"}),e(l,{label:"SPU名称",prop:"spuName"}),e(l,{label:"SPU描述",prop:"description","show-overflow-tooltip":""}),e(l,{label:"SPU操作"},{default:t(({row:v})=>[H(e(q,{type:"primary",size:"small",icon:"Plus",title:"添加SKU",onClick:O=>_(v)},null,8,["onClick"]),[[T,"btn.Spu.addsku"]]),H(e(q,{type:"primary",size:"small",icon:"Edit",title:"修改SPU",onClick:O=>i(v)},null,8,["onClick"]),[[T,"btn.Spu.update"]]),H(e(q,{type:"primary",size:"small",icon:"View",title:"查看SKU列表",onClick:O=>I(v)},null,8,["onClick"]),[[T,"btn.Spu.skus"]]),e(n,{title:`你确定删除${v.spuName}?`,width:"200px",onConfirm:O=>K(v)},{reference:t(()=>[H(e(q,{type:"primary",size:"small",icon:"Delete",title:"删除SPU"},null,512),[[T,"btn.Spu.delete"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(A,{"current-page":a(y),"onUpdate:currentPage":c[0]||(c[0]=v=>J(y)?y.value=v:y=v),"page-size":a(C),"onUpdate:pageSize":c[1]||(c[1]=v=>J(C)?C.value=v:C=v),"page-sizes":[3,5,7,9],background:!0,layout:"prev, pager, next, jumper,->,sizes,total",total:a(k),onCurrentChange:d,onSizeChange:h},null,8,["current-page","page-size","total"])],512),[[Y,a(V)==0]]),H(e(Ie,{ref_key:"spu",ref:r,onChangeScene:p},null,512),[[Y,a(V)==1]]),H(e(Ue,{ref_key:"sku",ref:D,onChangeScene:p},null,512),[[Y,a(V)==2]]),e(R,{modelValue:a(N),"onUpdate:modelValue":c[2]||(c[2]=v=>J(N)?N.value=v:N=v),title:"SKU列表"},{default:t(()=>[e(s,{border:"",data:a(w)},{default:t(()=>[e(l,{label:"SKU名字",prop:"skuName"}),e(l,{label:"SKU价格",prop:"price"}),e(l,{label:"SKU重量",prop:"weight"}),e(l,{label:"SKU图片"},{default:t(({row:v})=>[X("img",{src:v.skuDefaultImg,style:{width:"100px",height:"100px"}},null,8,he)]),_:1})]),_:1},8,["data"])]),_:1},8,["modelValue"])]),_:1})])}}});export{we as default};
