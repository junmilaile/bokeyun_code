import{D as e,o as i,c as t,w as s,e as a,f as o,E as n,l,U as r,x as u,y as c,v as d,L as h,r as p,n as m,J as f,V as g,g as y,b,i as w,z as _,j as k,F as v}from"./index-6f7f74a6.js";import{_ as I}from"./_plugin-vue_export-helper.1b428a4d.js";import{r as C}from"./uni-app.es.6c04d0ca.js";import{_ as x}from"./uni-icons.bcdec7e2.js";import{s as S,m as M}from"./store.a70c5c24.js";import{_ as P,a as B}from"./uni-list.845fc667.js";import{_ as L}from"./uni-popup-dialog.f9be20a5.js";import{_ as j}from"./uni-popup.c460a42c.js";const T=I({name:"cloud-image",emits:["click"],props:{mode:{type:String,default:()=>"widthFix"},src:{default:()=>""},width:{type:String,default:()=>"100rpx"},height:{type:String,default:()=>"100rpx"}},watch:{src:{handler(i){i&&"cloud://"==i.substring(0,8)?e.getTempFileURL({fileList:[i]}).then((e=>{this.cSrc=e.fileList[0].tempFileURL})):this.cSrc=i},immediate:!0}},methods:{onClick(){this.$emit("click")}},data:()=>({cSrc:!1})},[["render",function(e,r,u,c,d,h){const p=n,m=l;return i(),t(m,{onClick:h.onClick,style:a([{width:u.width,height:u.height},{"justify-content":"center"}])},{default:s((()=>[d.cSrc?(i(),t(p,{key:0,style:a({width:u.width,height:u.height}),src:d.cSrc,mode:u.mode},null,8,["style","src","mode"])):o("",!0)])),_:1},8,["onClick","style"])}]]);const A=I({data:()=>({isPC:!1}),props:{width:{type:String,default:()=>"50px"},height:{type:String,default:()=>"50px"},border:{type:Boolean,default:()=>!1}},async mounted(){this.isPC=!["ios","android"].includes(r().platform)},computed:{hasLogin:()=>S.hasLogin,userInfo:()=>S.userInfo,avatar_file:()=>S.userInfo.avatar_file},methods:{setAvatarFile(e){M.updateUserInfo({avatar_file:e})},async bindchooseavatar(i){let t=i.detail.avatarUrl,s={extname:t.split(".")[t.split(".").length-1],name:"",url:""},a=this.userInfo._id+""+Date.now();s.name=a;try{u({title:"更新中",mask:!0});let{fileID:i}=await e.uploadFile({filePath:t,cloudPath:a,fileType:"image"});s.url=i,c()}catch(o){console.error(o)}console.log("avatar_file",s),this.setAvatarFile(s)},uploadAvatarImg(i){if(!this.hasLogin)return d({url:"/uni_modules/uni-id-pages/pages/login/login-withoutpwd"});const t={quality:100,width:600,height:600,resize:!0};h({count:1,crop:t,success:async i=>{let s=i.tempFiles[0],a={extname:s.name.split(".")[s.name.split(".").length-1]},o=i.tempFilePaths[0];o=await new Promise((e=>{this.isPC||d({url:"/uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage?path="+o+`&options=${JSON.stringify(t)}`,animationType:"fade-in",events:{success:i=>{e(i)}},complete(e){}})}));let n=this.userInfo._id+""+Date.now();a.name=n,u({title:"更新中",mask:!0});let{fileID:l}=await e.uploadFile({filePath:o,cloudPath:n,fileType:"image"});a.url=l,c(),this.setAvatarFile(a)}})}}},[["render",function(e,o,n,l,r,u){const c=C(p("cloud-image"),T),d=C(p("uni-icons"),x),h=f;return i(),t(h,{"open-type":"chooseAvatar",onChooseavatar:u.bindchooseavatar,onClick:u.uploadAvatarImg,class:m(["box",{showBorder:n.border}]),style:a({width:n.width,height:n.height,lineHeight:n.height})},{default:s((()=>[u.avatar_file?(i(),t(c,{key:0,src:u.avatar_file.url,width:n.width,height:n.height},null,8,["src","width","height"])):(i(),t(d,{key:1,style:a({width:n.width,height:n.height,lineHeight:n.height}),class:"chooseAvatar",type:"plusempty",size:"30",color:"#dddddd"},null,8,["style"]))])),_:1},8,["onChooseavatar","onClick","class","style"])}],["__scopeId","data-v-4cd0367b"]]);e.database().collection("uni-id-users");const N=e.importObject("uni-id-co");const U=I({emits:["success"],computed:{},data:()=>({}),methods:{beforeGetphonenumber:async()=>await new Promise(((i,t)=>{u({mask:!0}),wx.checkSession({success(){i(),c()},fail(){g({success({code:s}){e.importObject("uni-id-co",{customUI:!0}).loginByWeixin({code:s}).then((e=>{i()})).catch((e=>{console.log(e),t()})).finally((e=>{c()}))},fail:e=>{console.error(e),t()}})}})})),async bindMobileByMpWeixin(e){"getPhoneNumber:ok"==e.detail.errMsg?(await this.beforeGetphonenumber(),N.bindMobileByMpWeixin(e.detail).then((e=>{this.$emit("success")})).finally((e=>{this.closeMe()}))):this.closeMe()},async open(){this.$refs.popup.open()},closeMe(e){this.$refs.popup.close()}}},[["render",function(e,a,o,n,r,u){const c=w,d=f,h=l,m=C(p("uni-popup"),j);return i(),t(m,{ref:"popup",type:"bottom"},{default:s((()=>[y(h,{class:"box"},{default:s((()=>[y(c,{class:"headBox"},{default:s((()=>[b("绑定资料")])),_:1}),y(c,{class:"tip"},{default:s((()=>[b("将一键获取你的手机号码绑定你的个人资料")])),_:1}),y(h,{class:"btnBox"},{default:s((()=>[y(c,{onClick:u.closeMe,class:"close"},{default:s((()=>[b("关闭")])),_:1},8,["onClick"]),y(d,{class:"agree uni-btn",type:"primary","open-type":"getPhoneNumber",onGetphonenumber:u.bindMobileByMpWeixin},{default:s((()=>[b("获取")])),_:1},8,["onGetphonenumber"])])),_:1})])),_:1})])),_:1},512)}],["__scopeId","data-v-1edc5089"]]),F=e.importObject("uni-id-co");const $=I({computed:{userInfo:()=>S.userInfo,realNameStatus(){return this.userInfo.realNameAuth?this.userInfo.realNameAuth.authStatus:0}},data:()=>({univerifyStyle:{authButton:{title:"本机号码一键绑定"},otherLoginButton:{title:"其他号码绑定"}},hasPwd:!1,showLoginManage:!1,setNicknameIng:!1}),async onShow(){this.univerifyStyle.authButton.title="本机号码一键绑定",this.univerifyStyle.otherLoginButton.title="其他号码绑定"},async onLoad(e){e.showLoginManage&&(this.showLoginManage=!0);let i=await F.getAccountInfo();this.hasPwd=i.isPasswordSet},methods:{login(){d({url:"/uni_modules/uni-id-pages/pages/login/login-withoutpwd",complete:e=>{}})},logout(){M.logout()},bindMobileSuccess(){M.updateUserInfo()},changePassword(){d({url:"/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",complete:e=>{}})},bindMobile(){this.bindMobileBySmsCode()},univerify(){g({provider:"univerify",univerifyStyle:this.univerifyStyle,success:async e=>{F.bindMobileByUniverify(e.authResult).then((e=>{M.updateUserInfo()})).catch((e=>{console.log(e)})).finally((e=>{uni.closeAuthView()}))},fail:e=>{console.log(e),"30002"!=e.code&&"30001"!=e.code||this.bindMobileBySmsCode()}})},bindMobileBySmsCode(){d({url:"./bind-mobile/bind-mobile"})},setNickname(e){e?(M.updateUserInfo({nickname:e}),this.setNicknameIng=!1,this.$refs.dialog.close()):this.$refs.dialog.open()},deactivate(){d({url:"/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"})},async bindThirdAccount(i){const t=e.importObject("uni-id-co"),s={weixin:"wx_openid",alipay:"ali_openid",apple:"apple_openid",qq:"qq_openid"}[i.toLowerCase()];this.userInfo[s]?(await t["unbind"+i](),await M.updateUserInfo()):g({provider:i.toLowerCase(),onlyAuthorize:!0,success:async e=>{const s=await t["bind"+i]({code:e.code});s.errCode&&_({title:s.errMsg||"绑定失败",duration:3e3}),await M.updateUserInfo()},fail:async e=>{console.log(e),c()}})},realNameVerify(){d({url:"/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"})}}},[["render",function(e,a,n,r,u,c){const d=C(p("uni-id-pages-avatar"),A),h=l,m=C(p("uni-list-item"),P),g=C(p("uni-list"),B),w=C(p("uni-popup-dialog"),L),_=C(p("uni-popup"),j),I=C(p("uni-id-pages-bind-mobile"),U),x=f;return i(),t(h,{class:"uni-content"},{default:s((()=>[y(h,{class:"avatar"},{default:s((()=>[y(d,{width:"260rpx",height:"260rpx"})])),_:1}),y(g,null,{default:s((()=>[y(m,{class:"item",onClick:a[0]||(a[0]=e=>c.setNickname("")),title:"昵称",rightText:c.userInfo.nickname||"未设置",link:""},null,8,["rightText"]),y(m,{class:"item",onClick:c.bindMobile,title:"手机号",rightText:c.userInfo.mobile||"未绑定",link:""},null,8,["onClick","rightText"]),c.userInfo.email?(i(),t(m,{key:0,class:"item",title:"电子邮箱",rightText:c.userInfo.email},null,8,["rightText"])):o("",!0),u.hasPwd?(i(),t(m,{key:1,class:"item",onClick:c.changePassword,title:"修改密码",link:""},null,8,["onClick"])):o("",!0)])),_:1}),y(g,{class:"mt10"},{default:s((()=>[y(m,{onClick:c.deactivate,title:"注销账号",link:"navigateTo"},null,8,["onClick"])])),_:1}),y(_,{ref:"dialog",type:"dialog"},{default:s((()=>[y(w,{mode:"input",value:c.userInfo.nickname,onConfirm:c.setNickname,inputType:u.setNicknameIng?"nickname":"text",title:"设置昵称",placeholder:"请输入要设置的昵称"},null,8,["value","onConfirm","inputType"])])),_:1},512),y(I,{ref:"bind-mobile-by-sms",onSuccess:c.bindMobileSuccess},null,8,["onSuccess"]),u.showLoginManage?(i(),k(v,{key:0},[c.userInfo._id?(i(),t(x,{key:0,onClick:c.logout},{default:s((()=>[b("退出登录")])),_:1},8,["onClick"])):(i(),t(x,{key:1,onClick:c.login},{default:s((()=>[b("去登录")])),_:1},8,["onClick"]))],64)):o("",!0)])),_:1})}],["__scopeId","data-v-a98497c8"]]);export{$ as default};
