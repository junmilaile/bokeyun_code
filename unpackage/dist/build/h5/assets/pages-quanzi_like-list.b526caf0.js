import{D as e,aj as a,v as t,o as l,c as o,w as i,l as s,g as r,b as n,t as d,j as u,k as c,F as f,f as m,r as _,i as p}from"./index-6f7f74a6.js";import{_ as h,a as b}from"./uni-list.845fc667.js";import{r as k}from"./uni-app.es.6c04d0ca.js";import{_ as g}from"./uni-load-more.fbd5f83d.js";import{_ as j}from"./unicloud-db.b431eb50.js";import{_ as w}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.bcdec7e2.js";const C=e.database();const y=w({data:()=>({collectionList:[C.collection("quanzi_like").where("user_id == $cloudEnv_uid").getTemp(),C.collection("quanzi_aticle").field("_id,title").getTemp()],loadMore:{contentdown:"",contentrefresh:"",contentnomore:""}}),onPullDownRefresh(){this.$refs.udb.loadData({clear:!0},(()=>{a()}))},onReachBottom(){this.$refs.udb.loadMore()},methods:{handleItemClick(e){t({url:"/pages/detail/detail?id="+e})},fabClick(){t({url:"./add",events:{refreshData:()=>{this.$refs.udb.loadData({clear:!0})}}})}}},[["render",function(e,a,t,w,C,y){const D=s,v=p,M=k(_("uni-list-item"),h),$=k(_("uni-list"),b),x=k(_("uni-load-more"),g),T=k(_("unicloud-db"),j);return l(),o(D,{class:"container"},{default:i((()=>[r(T,{ref:"udb",orderby:"publish_date desc",collection:C.collectionList,field:"article_id,publish_date"},{default:i((({data:e,pagination:a,loading:t,hasMore:s,error:_})=>[_?(l(),o(D,{key:0},{default:i((()=>[n(d(_.message),1)])),_:2},1024)):e?(l(),o(D,{key:1},{default:i((()=>[r($,null,{default:i((()=>[(l(!0),u(f,null,c(e,((e,a)=>(l(),o(M,{key:a,showArrow:"",clickable:!0,onClick:a=>y.handleItemClick(e.article_id[0]._id)},{body:i((()=>[r(v,null,{default:i((()=>[n(d(e.article_id[0].title),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:2},1024)])),_:2},1024)):m("",!0),r(x,{status:t?"loading":s?"more":"noMore"},null,8,["status"])])),_:1},8,["collection"])])),_:1})}]]);export{y as default};