"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tools = require("../../utils/tools.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  _easycom_uni_dateformat2();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  _easycom_uni_dateformat();
}
const _sfc_main = {
  __name: "blog-item",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(__props) {
    const props = __props;
    const clickPic = (index) => {
      common_vendor.index.previewImage({
        urls: props.item.picurls,
        current: index
      });
    };
    const goDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?id=" + props.item._id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(utils_tools.giveAvatar)(props.item),
        b: common_vendor.t(common_vendor.unref(utils_tools.giveName)(props.item)),
        c: common_vendor.p({
          date: __props.item.publish_date,
          format: "MM月dd hh:mm",
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        d: common_vendor.t(props.item.title),
        e: common_vendor.o(goDetail),
        f: props.item.description
      }, props.item.description ? {
        g: common_vendor.t(props.item.description),
        h: common_vendor.o(goDetail)
      } : {}, {
        i: props.item.picurls.length
      }, props.item.picurls.length ? {
        j: common_vendor.f(props.item.picurls, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => clickPic(index), item),
            b: item,
            c: item
          };
        }),
        k: common_vendor.n(props.item.picurls.length == 1 ? "only" : "")
      } : {}, {
        l: common_vendor.t(props.item.view_count),
        m: common_vendor.t(props.item.comment_count === 0 ? "评论" : props.item.comment_count),
        n: common_vendor.o(goDetail),
        o: common_vendor.t(props.item.like_count === 0 ? "点赞" : props.item.like_count)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Hbuilderx/quanzi_ketang/components/blog-item/blog-item.vue"]]);
wx.createComponent(Component);
