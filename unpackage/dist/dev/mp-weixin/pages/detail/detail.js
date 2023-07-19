"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
require("../../uni_modules/uni-id-pages/config.js");
if (!Array) {
  const _easycom_u_skeleton2 = common_vendor.resolveComponent("u-skeleton");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_u_parse2 = common_vendor.resolveComponent("u-parse");
  (_easycom_u_skeleton2 + _easycom_uni_dateformat2 + _easycom_u_parse2)();
}
const _easycom_u_skeleton = () => "../../uni_modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_u_parse = () => "../../uni_modules/uview-plus/components/u-parse/u-parse.js";
if (!Math) {
  (_easycom_u_skeleton + _easycom_uni_dateformat + _easycom_u_parse)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const utilsObj = common_vendor.Ds.importObject("utilsObj", {
      customUI: true
    });
    const db = common_vendor.Ds.database();
    common_vendor.ref(true);
    const artid = common_vendor.ref("");
    const loadState = common_vendor.ref(true);
    const data = common_vendor.ref(null);
    common_vendor.ref(true);
    let likeTime = common_vendor.ref(null);
    common_vendor.onLoad(async (e) => {
      if (!e.id) {
        errFun();
        return;
      }
      artid.value = e.id;
      await getData();
      await update();
    });
    const update = () => {
      utilsObj.operation("quanzi_aticle", "view_count", artid.value, 1).then((res) => {
        console.log(res);
      });
    };
    const errFun = () => {
      common_vendor.index.showToast({
        title: "参数错误",
        icon: "none"
      });
      setTimeout(() => {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }, 1e3);
    };
    const getData = () => {
      console.log();
      common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      let artTemp = db.collection("quanzi_aticle").where(`_id == '${artid.value}'`).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
      let likeTemp = db.collection("quanzi_like").where(`article_id == '${artid.value}' && user_id == $cloudEnv_uid`).getTemp();
      let tempArr = [artTemp, userTemp];
      if (uni_modules_uniIdPages_common_store.store.hasLogin)
        tempArr.push(likeTemp);
      console.log(tempArr);
      db.collection(...tempArr).get({
        getOne: true
      }).then((res) => {
        var _a, _b;
        console.log(res);
        if (!res.result.data) {
          errFun();
          return;
        }
        data.value = res.result.data;
        loadState.value = false;
        let isLike = false;
        if (uni_modules_uniIdPages_common_store.store.hasLogin)
          isLike = ((_b = (_a = res.result.data._id) == null ? void 0 : _a.quanzi_like) == null ? void 0 : _b.length) ? true : false;
        res.result.data.isLike = isLike;
        common_vendor.index.setNavigationBarTitle({
          title: data.value.title
        });
      }).catch((err) => {
        errFun();
      });
    };
    const tagStyle = common_vendor.ref({
      p: "line-height: 1.7em; font-size: 16px;  padding-bottom: 10rpx",
      img: "margin: 10rpx 0 "
    });
    const clickLike = async () => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        common_vendor.index.showModal({
          title: "先登录,才能操作",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/" + common_vendor.pageJson.uniIdRouter.loginPage
              });
            }
          }
        });
        return;
      }
      let time = Date.now();
      if (time - likeTime.value < 2e3) {
        common_vendor.index.showToast({
          title: "操作频繁",
          icon: "none"
        });
        return;
      }
      data.value.isLike ? data.value.like_count-- : data.value.like_count++;
      data.value.isLike = !data.value.isLike;
      likeTime.value = time;
      likeFun();
    };
    const likeFun = async () => {
      const userid = common_vendor.index.getStorageSync("uni-id-pages-userInfo");
      let count = await db.collection("quanzi_like").where(`article_id == '${artid.value}' && user_id == '${userid._id}'`).count();
      if (count.result.total) {
        db.collection("quanzi_like").where(`article_id == '${artid.value}' && user_id == '${userid._id}'`).remove();
        utilsObj.operation("quanzi_aticle", "like_count", artid.value, -1);
      } else {
        db.collection("quanzi_like").add({
          article_id: artid.value
        }).then((res) => {
          console.log(res);
        });
        utilsObj.operation("quanzi_aticle", "like_count", artid.value, 1);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loadState.value
      }, loadState.value ? {
        b: common_vendor.p({
          loading: true,
          animate: true,
          rows: "5"
        })
      } : common_vendor.e({
        c: common_vendor.t(data.value.title),
        d: common_vendor.unref(utils_tools.giveAvatar)(data.value),
        e: common_vendor.t(common_vendor.unref(utils_tools.giveName)(data.value)),
        f: common_vendor.p({
          date: data.value.publish_date,
          format: "yyyy年MM月dd hh:mm:ss"
        }),
        g: common_vendor.t(data.value.province),
        h: common_vendor.p({
          content: data.value.content,
          tagStyle: tagStyle.value
        }),
        i: data.value.like_count
      }, data.value.like_count ? {
        j: common_vendor.t(data.value.like_count)
      } : {}, {
        k: common_vendor.n(data.value.isLike ? "active" : ""),
        l: common_vendor.o(clickLike),
        m: common_vendor.t(data.value.view_count)
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Hbuilderx/quanzi_ketang/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
