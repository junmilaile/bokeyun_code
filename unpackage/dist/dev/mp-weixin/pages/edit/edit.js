"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const db = common_vendor.Ds.database();
    common_vendor.onLoad(() => {
      utils_tools.getProvince().then((res) => {
        console.log(res);
        artObj.value.province = res;
      });
    });
    common_vendor.onShow(() => {
      instance.value = this;
    });
    const toolShow = common_vendor.ref(false);
    const editoorCtx = common_vendor.ref(null);
    const headShow = common_vendor.ref(false);
    const boldShow = common_vendor.ref(false);
    const italicShow = common_vendor.ref(false);
    const insertImageShow = common_vendor.ref(false);
    const DividerShow = common_vendor.ref(false);
    const instance = common_vendor.ref(null);
    const artObj = common_vendor.ref({
      title: "",
      content: "",
      description: "",
      picurls: "",
      province: ""
    });
    const onEditReady = async () => {
      const query = await common_vendor.index.createSelectorQuery().in(instance.value);
      await query.select(".myEdita").fields({
        context: true,
        size: true
      }, (res) => {
        console.log(res);
        editoorCtx.value = res.context;
      });
      await query.exec();
    };
    const checkStatus = (name, detail, obj) => {
      if (detail.hasOwnProperty(name)) {
        obj.value = true;
      } else {
        obj.value = false;
      }
    };
    const onStatuschange = (e) => {
      let detail = e.detail;
      checkStatus("header", detail, headShow);
      checkStatus("bold", detail, boldShow);
      checkStatus("italic", detail, italicShow);
    };
    const onFocus = () => {
      toolShow.value = true;
    };
    const clickDivider = () => {
      DividerShow.value = !DividerShow.value;
      console.log(editoorCtx.value);
      editoorCtx.value.insertDivider();
    };
    const clickHead = () => {
      headShow.value = !headShow.value;
      editoorCtx.value.format("header", headShow.value ? "H2" : false);
    };
    const clickBold = () => {
      boldShow.value = !boldShow.value;
      editoorCtx.value.format("bold");
    };
    const clickitalic = () => {
      italicShow.value = !italicShow.value;
      editoorCtx.value.format("italic");
    };
    const editOk = () => {
      toolShow.value = false;
    };
    const clickInsertImage = () => {
      insertImageShow.value = !insertImageShow.value;
      common_vendor.index.chooseImage({
        success: async (res) => {
          console.log(res.tempFiles);
          common_vendor.index.showLoading({
            title: "上传中,请稍后",
            mask: true
          });
          for (let item of res.tempFiles) {
            let res2 = await common_vendor.Ds.uploadFile({
              filePath: item.path,
              cloudPath: item.name
            });
            editoorCtx.value.insertImage({
              src: res2.fileID
            });
          }
          common_vendor.index.hideLoading();
        }
      });
    };
    const onSubmit = () => {
      editoorCtx.value.getContents({
        success: (res) => {
          console.log(res);
          artObj.value.description = res.text.slice(0, 50);
          artObj.value.content = res.html;
          artObj.value.picurls = utils_tools.getImgSrc(res.html);
          console.log(artObj.value);
          common_vendor.index.showLoading({
            title: "发布中..."
          });
          addData();
        }
      });
    };
    const addData = () => {
      db.collection("quanzi_aticle").add({
        ...artObj.value
      }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布成功"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }, 800);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: artObj.value.title,
        b: common_vendor.o(($event) => artObj.value.title = $event.detail.value),
        c: common_vendor.o(onEditReady),
        d: common_vendor.o(onFocus),
        e: common_vendor.o(onStatuschange),
        f: common_vendor.o(onSubmit),
        g: common_vendor.p({
          type: "primary",
          text: "确认发表",
          disabled: !artObj.value.title.length
        }),
        h: toolShow.value
      }, toolShow.value ? {
        i: common_vendor.n(headShow.value ? "active" : ""),
        j: common_vendor.o(clickHead),
        k: common_vendor.n(boldShow.value ? "active" : ""),
        l: common_vendor.o(clickBold),
        m: common_vendor.n(italicShow.value ? "active" : ""),
        n: common_vendor.o(clickitalic),
        o: common_vendor.n(DividerShow.value ? "active" : ""),
        p: common_vendor.o(clickDivider),
        q: common_vendor.n(insertImageShow.value ? "active" : ""),
        r: common_vendor.o(clickInsertImage),
        s: common_vendor.o(editOk)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Hbuilderx/quanzi_ketang/pages/edit/edit.vue"]]);
wx.createPage(MiniProgramPage);
