import{ao as e,o as t,j as l,h as n,b as o,t as a,n as i,e as s,c as r,w as d,i as u,v as f,l as c,g as h,k as p,F as _,f as m,r as y,J as k}from"./index-6f7f74a6.js";import{_ as w}from"./uni-load-more.fbd5f83d.js";import{r as b}from"./uni-app.es.6c04d0ca.js";import{e as g,_ as S}from"./opendb-feedback.291b68d6.js";import{_ as x}from"./_plugin-vue_export-helper.1b428a4d.js";import{_ as U}from"./unicloud-db.b431eb50.js";const L=x({name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},download:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},computed:{isShowA(){return this._isH5=!0,!(!this.isMail()&&!this.isTel()||!0!==this._isH5)}},created(){this._isH5=null},methods:{isMail(){return this.href.startsWith("mailto:")},isTel(){return this.href.startsWith("tel:")},openURL(){window.open(this.href)},makePhoneCall(t){e({phoneNumber:t})}}},[["render",function(e,f,c,h,p,_){const m=u;return _.isShowA?(t(),l("a",{key:0,class:i(["uni-link",{"uni-link--withline":!0===c.showUnderLine||"true"===c.showUnderLine}]),href:c.href,style:s({color:c.color,fontSize:c.fontSize+"px"}),download:c.download},[n(e.$slots,"default",{},(()=>[o(a(c.text),1)]),!0)],14,["href","download"])):(t(),r(m,{key:1,class:i(["uni-link",{"uni-link--withline":!0===c.showUnderLine||"true"===c.showUnderLine}]),style:s({color:c.color,fontSize:c.fontSize+"px"}),onClick:_.openURL},{default:d((()=>[n(e.$slots,"default",{},(()=>[o(a(c.text),1)]),!0)])),_:3},8,["class","style","onClick"]))}],["__scopeId","data-v-44511933"]]);const j=x({data:()=>({queryWhere:"",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},options:{...g}}),onLoad(e){this._id=e.id},onReady(){this._id&&(this.queryWhere='_id=="'+this._id+'"')},methods:{handleUpdate(){f({url:"./edit?id="+this._id,events:{refreshData:()=>{this.$refs.udb.loadData({clear:!0})}}})},handleDelete(){this.$refs.udb.remove(this._id,{success:e=>{f({url:"./list"})}})}}},[["render",function(e,n,i,s,f,g){const x=c,j=b(y("uni-load-more"),w),v=u,T=b(y("uni-file-picker"),S),C=b(y("uni-link"),L),z=b(y("unicloud-db"),U),W=k;return t(),r(x,{class:"container"},{default:d((()=>[h(z,{ref:"udb",options:f.options,collection:"opendb-feedback",field:"content,imgs,contact,mobile",where:f.queryWhere,getone:!0,manual:!0},{default:d((({data:e,loading:n,error:i,options:s})=>[i?(t(),r(x,{key:0},{default:d((()=>[o(a(i.message),1)])),_:2},1024)):n?(t(),r(x,{key:1},{default:d((()=>[h(j,{contentText:f.loadMore,status:"loading"},null,8,["contentText"])])),_:1})):e?(t(),r(x,{key:2},{default:d((()=>[h(x,null,{default:d((()=>[h(v,null,{default:d((()=>[o("留言内容/回复内容")])),_:1}),h(v,null,{default:d((()=>[o(a(e.content),1)])),_:2},1024)])),_:2},1024),h(x,null,{default:d((()=>[h(v,null,{default:d((()=>[o("图片列表")])),_:1}),(t(!0),l(_,null,p(e.imgs,((e,n)=>(t(),l(_,null,["image"==e.fileType?(t(),r(T,{key:0,value:e,"file-mediatype":e.fileType,"return-type":"object",readonly:""},null,8,["value","file-mediatype"])):(t(),r(C,{key:1,href:e.url,text:e.url},null,8,["href","text"]))],64)))),256))])),_:2},1024),h(x,null,{default:d((()=>[h(v,null,{default:d((()=>[o("联系人")])),_:1}),h(v,null,{default:d((()=>[o(a(e.contact),1)])),_:2},1024)])),_:2},1024),h(x,null,{default:d((()=>[h(v,null,{default:d((()=>[o("联系电话")])),_:1}),h(v,null,{default:d((()=>[o(a(e.mobile),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)):m("",!0)])),_:1},8,["options","where"]),h(x,{class:"btns"},{default:d((()=>[h(W,{type:"primary",onClick:g.handleUpdate},{default:d((()=>[o("修改")])),_:1},8,["onClick"]),h(W,{type:"warn",class:"btn-delete",onClick:g.handleDelete},{default:d((()=>[o("删除")])),_:1},8,["onClick"])])),_:1})])),_:1})}],["__scopeId","data-v-9c13e96e"]]);export{j as default};
