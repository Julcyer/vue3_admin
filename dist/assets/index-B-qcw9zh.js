import{d as b,r as C,n as F,h as c,s as N,o as n,c as m,m as d,b as t,w as l,q as T,v as D,t as y,x as p,T as O,_ as L,e as q,g as a,y as U,F as v,z as i,A as S,B as ee,C as te,f as z,u as W,D as le,j as B,G as R}from"./index-BAhf9uGB.js";import{u as $}from"./setting-B9yab3Kk.js";const oe={key:0,class:"logo"},ne=["src"],ae=b({name:"Logo",__name:"index",setup(f){let s=$(),o=C(!0);const u=()=>{window.innerWidth>1400||window.innerWidth>1300?(s.fold=!1,o.value=!0):window.innerWidth>800?(s.fold=!1,o.value=!1):(s.fold=!0,o.value=!1)};return window.addEventListener("resize",u),F(u),(w,r)=>c(N).logoHidden?(n(),m("div",oe,[d("img",{src:c(N).logo,alt:"Logo"},null,8,ne),t(O,{name:"title"},{default:l(()=>[c(o)?T((n(),m("p",{key:0},y(c(N).title),513)),[[D,!c(s).fold]]):p("",!0)]),_:1})])):p("",!0)}}),se=L(ae,[["__scopeId","data-v-d577907c"]]),re=b({name:"Menu",__name:"index",props:["menuList"],setup(f){let s=q();const o=u=>{s.push(u.index)};return(u,w)=>{const r=a("el-icon"),_=a("el-menu-item"),h=a("Menu"),k=a("el-sub-menu");return n(!0),m(v,null,U(f.menuList,(e,I)=>(n(),m(v,{key:e.path},[e.children?p("",!0):(n(),m(v,{key:0},[e.meta.hidden?p("",!0):(n(),i(_,{key:0,index:e.path,onClick:o},{title:l(()=>[d("span",null,y(e.meta.title),1)]),default:l(()=>[t(r,null,{default:l(()=>[(n(),i(S(e.meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)),e.children&&e.children.length==1?(n(),m(v,{key:1},[e.children[0].meta.hidden?p("",!0):(n(),i(_,{key:0,index:e.children[0].path,onClick:o},{title:l(()=>[d("span",null,y(e.children[0].meta.title),1)]),default:l(()=>[t(r,null,{default:l(()=>[(n(),i(S(e.children[0].meta.icon)))]),_:2},1024)]),_:2},1032,["index"]))],64)):p("",!0),e.children&&e.children.length>1?(n(),i(k,{key:2,index:e.path},{title:l(()=>[t(r,null,{default:l(()=>[(n(),i(S(e.meta.icon)))]),_:2},1024),d("span",null,y(e.meta.title),1)]),default:l(()=>[t(h,{menuList:e.children},null,8,["menuList"])]),_:2},1032,["index"])):p("",!0)],64))),128)}}}),ce=b({name:"Main",__name:"index",setup(f){let s=$(),o=C(!0);return ee(()=>s.refsh,()=>{o.value=!1,te(()=>{o.value=!0})}),(u,w)=>{const r=a("router-view");return n(),i(r,null,{default:l(({Component:_})=>[t(O,{name:"fade"},{default:l(()=>[c(o)?(n(),i(S(_),{key:0})):p("",!0)]),_:2},1024)]),_:1})}}}),ue=L(ce,[["__scopeId","data-v-0bb42d62"]]),de=b({name:"Breadcrumb",__name:"index",setup(f){let s=$(),o=z();const u=()=>{s.fold=!s.fold};return(w,r)=>{const _=a("el-icon"),h=a("el-breadcrumb-item"),k=a("el-breadcrumb");return n(),m(v,null,[t(_,{style:{"margin-right":"10px"},onClick:u},{default:l(()=>[(n(),i(S(c(s).fold?"Fold":"Expand")))]),_:1}),t(k,{"separator-icon":"ArrowRight"},{default:l(()=>[(n(!0),m(v,null,U(c(o).matched,(e,I)=>T((n(),i(h,{key:I,to:e.path},{default:l(()=>[t(_,null,{default:l(()=>[(n(),i(S(e.meta.icon)))]),_:2},1024),d("span",null,y(e.meta.title),1)]),_:2},1032,["to"])),[[D,e.meta.title]])),128))]),_:1})],64)}}}),_e=["src"],ie={class:"el-dropdown-link"},me=b({name:"Setting",__name:"index",setup(f){let s=$(),o=W(),u=q(),w=z(),r=C();const _=()=>{s.refsh=!s.refsh},h=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()},k=async()=>{await o.userLogout(),u.push({path:"/login",query:{redirect:w.path}})},e=C(),I=C(["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]),A=()=>{localStorage.setItem("dark",r.value);let x=document.documentElement;r.value?x.className="dark":x.className=""},P=()=>{localStorage.setItem("color",e.value),document.documentElement.style.setProperty("--el-color-primary",e.value)};return F(()=>{if(e.value=localStorage.getItem("color"),(localStorage.getItem("color")==="null"||!localStorage.getItem("color"))&&(e.value="rgba(30, 144, 255, 1)",localStorage.setItem("color",e.value)),document.documentElement.style.setProperty("--el-color-primary",e.value),localStorage.getItem("dark")){r.value=localStorage.getItem("dark")==="true";let g=document.documentElement;r.value?g.className="dark":g.className=""}else r.value=!1}),(x,g)=>{const E=a("el-button"),j=a("el-color-picker"),M=a("el-form-item"),G=a("el-switch"),H=a("el-form"),J=a("el-popover"),K=a("arrow-down"),Q=a("el-icon"),X=a("el-dropdown-item"),Y=a("el-dropdown-menu"),Z=a("el-dropdown");return n(),m(v,null,[t(E,{size:"small",icon:"Refresh",circle:"",onClick:_}),t(E,{size:"small",icon:"FullScreen",circle:"",onClick:h}),t(J,{placement:"bottom",title:"主题设置",width:300,trigger:"hover"},{reference:l(()=>[t(E,{size:"small",icon:"Setting",circle:""})]),default:l(()=>[t(H,{inline:""},{default:l(()=>[t(M,{label:"主题颜色"},{default:l(()=>[t(j,{onChange:P,modelValue:e.value,"onUpdate:modelValue":g[0]||(g[0]=V=>e.value=V),size:"small","show-alpha":"",predefine:I.value,teleported:!1},null,8,["modelValue","predefine"])]),_:1}),t(M,{label:"暗黑模式"},{default:l(()=>[t(G,{onChange:A,modelValue:c(r),"onUpdate:modelValue":g[1]||(g[1]=V=>le(r)?r.value=V:r=V),"inline-prompt":"","active-icon":"MoonNight","inactive-icon":"Sunny"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),d("img",{src:c(o).avatar,style:{width:"30px",height:"30px",margin:"0px 10px","border-radius":"50%"}},null,8,_e),t(Z,{class:"dropdown"},{dropdown:l(()=>[t(Y,null,{default:l(()=>[t(X,{onClick:k},{default:l(()=>[B("退出登录")]),_:1})]),_:1})]),default:l(()=>[d("span",ie,[B(y(c(o).username)+" ",1),t(Q,{class:"el-icon--right"},{default:l(()=>[t(K)]),_:1})])]),_:1})],64)}}}),pe=L(me,[["__scopeId","data-v-cc0ce1d7"]]),fe={class:"tabbar"},he={class:"tabbar_left"},ge={class:"tabbar_right"},ve=b({name:"Tabbar",__name:"index",setup(f){return(s,o)=>(n(),m("div",fe,[d("div",he,[t(de)]),d("div",ge,[t(pe)])]))}}),be=L(ve,[["__scopeId","data-v-44eebb75"]]),we={class:"layout_container"},xe=b({name:"Layout",__name:"index",setup(f){let s=W(),o=$(),u=z();return(w,r)=>{const _=a("el-menu"),h=a("el-scrollbar");return n(),m("div",we,[d("div",{class:R(["layout_slider",{fold:!!c(o).fold}])},[t(se),t(h,{class:"scrollbar"},{default:l(()=>[t(_,{collapse:!!c(o).fold,"default-active":c(u).path,class:"el-menu","background-color":"#001529","text-color":"white"},{default:l(()=>[t(re,{menuList:c(s).menuRoutes},null,8,["menuList"])]),_:1},8,["collapse","default-active"])]),_:1})],2),d("div",{class:R(["layout_tabbar",{fold:!!c(o).fold}])},[t(be)],2),d("div",{class:R(["layout_main",{fold:!!c(o).fold}])},[t(ue)],2)])}}}),ke=L(xe,[["__scopeId","data-v-9d5f606a"]]);export{ke as default};
