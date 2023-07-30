import{ab as e,o as t,c as o,w as l,g as i,n as p,b as a,t as u,h as n,i as s,l as c,N as d}from"./index-6f7f74a6.js";import{_ as r}from"./_plugin-vue_export-helper.1b428a4d.js";const h={data:()=>({}),created(){this.popup=this.getParent()},methods:{getParent(e="uniPopup"){let t=this.$parent,o=t.$options.name;for(;o!==e;){if(t=t.$parent,!t)return!1;o=t.$options.name}return t}}},f={en:{"uni-popup.cancel":"cancel","uni-popup.ok":"ok","uni-popup.placeholder":"pleace enter","uni-popup.title":"Hint","uni-popup.shareTitle":"Share to"},"zh-Hans":{"uni-popup.cancel":"取消","uni-popup.ok":"确定","uni-popup.placeholder":"请输入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"},"zh-Hant":{"uni-popup.cancel":"取消","uni-popup.ok":"確定","uni-popup.placeholder":"請輸入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}},{t:g}=e(f);const m=r({name:"uniPopupDialog",mixins:[h],emits:["confirm","close"],props:{inputType:{type:String,default:"text"},value:{type:[String,Number],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""}},data:()=>({dialogType:"error",focus:!1,val:""}),computed:{okText(){return this.confirmText||g("uni-popup.ok")},closeText(){return this.cancelText||g("uni-popup.cancel")},placeholderText(){return this.placeholder||g("uni-popup.placeholder")},titleText(){return this.title||g("uni-popup.title")}},watch:{type(e){this.dialogType=e},mode(e){"input"===e&&(this.dialogType="info")},value(e){this.val=e}},created(){this.popup.disableMask(),"input"===this.mode?(this.dialogType="info",this.val=this.value):this.dialogType=this.type},mounted(){this.focus=!0},methods:{onOk(){"input"===this.mode?this.$emit("confirm",this.val):this.$emit("confirm"),this.beforeClose||this.popup.close()},closeDialog(){this.$emit("close"),this.beforeClose||this.popup.close()},close(){this.popup.close()}}},[["render",function(e,r,h,f,g,m){const y=s,T=c,x=d;return t(),o(T,{class:"uni-popup-dialog"},{default:l((()=>[i(T,{class:"uni-dialog-title"},{default:l((()=>[i(y,{class:p(["uni-dialog-title-text",["uni-popup__"+g.dialogType]])},{default:l((()=>[a(u(m.titleText),1)])),_:1},8,["class"])])),_:1}),"base"===h.mode?(t(),o(T,{key:0,class:"uni-dialog-content"},{default:l((()=>[n(e.$slots,"default",{},(()=>[i(y,{class:"uni-dialog-content-text"},{default:l((()=>[a(u(h.content),1)])),_:1})]),!0)])),_:3})):(t(),o(T,{key:1,class:"uni-dialog-content"},{default:l((()=>[n(e.$slots,"default",{},(()=>[i(x,{class:"uni-dialog-input",modelValue:g.val,"onUpdate:modelValue":r[0]||(r[0]=e=>g.val=e),type:h.inputType,placeholder:m.placeholderText,focus:g.focus},null,8,["modelValue","type","placeholder","focus"])]),!0)])),_:3})),i(T,{class:"uni-dialog-button-group"},{default:l((()=>[i(T,{class:"uni-dialog-button",onClick:m.closeDialog},{default:l((()=>[i(y,{class:"uni-dialog-button-text"},{default:l((()=>[a(u(m.closeText),1)])),_:1})])),_:1},8,["onClick"]),i(T,{class:"uni-dialog-button uni-border-left",onClick:m.onOk},{default:l((()=>[i(y,{class:"uni-dialog-button-text uni-button-color"},{default:l((()=>[a(u(m.okText),1)])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:3})}],["__scopeId","data-v-b888b3dc"]]);export{m as _};
