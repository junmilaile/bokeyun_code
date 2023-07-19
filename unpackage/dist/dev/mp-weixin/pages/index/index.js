"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_skeleton2 = common_vendor.resolveComponent("u-skeleton");
  const _easycom_blog_item2 = common_vendor.resolveComponent("blog-item");
  (_easycom_u_tabs2 + _easycom_u_skeleton2 + _easycom_blog_item2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_skeleton = () => "../../uni_modules/uview-plus/components/u-skeleton/u-skeleton.js";
const _easycom_blog_item = () => "../../components/blog-item/blog-item.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_skeleton + _easycom_blog_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const db = common_vendor.Ds.database();
    common_vendor.onLoad(async () => {
      await getData();
    });
    const navlist = common_vendor.ref([
      {
        name: "最新",
        type: "publish_date"
      },
      {
        name: "热门",
        type: "view_count"
      }
    ]);
    const dataList = common_vendor.ref([]);
    const navAction = common_vendor.ref(0);
    const loadState = common_vendor.ref(true);
    const clickNav = (e) => {
      loadState.value = true;
      dataList.value = [];
      console.log(e);
      navAction.value = e.index;
      getData();
    };
    const getData = () => {
      let artTemp = db.collection("quanzi_aticle").field("title,user_id,description,picurls,view_count,like_count,comment_count,publish_date").getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
      db.collection(artTemp, userTemp).orderBy(navlist.value[navAction.value].type, "desc").get().then((res) => {
        console.log(res);
        dataList.value = res.result.data;
        loadState.value = false;
      });
    };
    const editadd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(clickNav),
        b: common_vendor.p({
          list: navlist.value,
          activeStyle: {
            color: "#333",
            fontWeight: "bold",
            transform: "scale(1.08)"
          },
          inactiveStyle: {
            color: "#888",
            transform: "scale(1)"
          }
        }),
        c: common_vendor.p({
          rows: "4",
          title: true,
          loading: true
        }),
        d: loadState.value,
        e: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: "1cf27b2a-2-" + i0,
            b: common_vendor.p({
              item
            })
          };
        }),
        f: common_vendor.o(editadd)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/Hbuilderx/quanzi_ketang/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
