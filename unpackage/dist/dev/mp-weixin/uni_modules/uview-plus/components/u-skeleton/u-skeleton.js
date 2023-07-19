"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uSkeleton_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
require("../../libs/config/props.js");
require("../../libs/config/config.js");
require("../../libs/config/props/actionSheet.js");
require("../../libs/config/props/album.js");
require("../../libs/config/props/alert.js");
require("../../libs/config/props/avatar.js");
require("../../libs/config/props/avatarGroup.js");
require("../../libs/config/props/backtop.js");
require("../../libs/config/props/badge.js");
require("../../libs/config/props/button.js");
require("../../libs/config/props/calendar.js");
require("../../libs/config/props/carKeyboard.js");
require("../../libs/config/props/cell.js");
require("../../libs/config/props/cellGroup.js");
require("../../libs/config/props/checkbox.js");
require("../../libs/config/props/checkboxGroup.js");
require("../../libs/config/props/circleProgress.js");
require("../../libs/config/props/code.js");
require("../../libs/config/props/codeInput.js");
require("../../libs/config/props/col.js");
require("../../libs/config/props/collapse.js");
require("../../libs/config/props/collapseItem.js");
require("../../libs/config/props/columnNotice.js");
require("../../libs/config/props/countDown.js");
require("../../libs/config/props/countTo.js");
require("../../libs/config/props/datetimePicker.js");
require("../../libs/config/props/divider.js");
require("../../libs/config/props/empty.js");
require("../../libs/config/props/form.js");
require("../../libs/config/props/formItem.js");
require("../../libs/config/props/gap.js");
require("../../libs/config/props/grid.js");
require("../../libs/config/props/gridItem.js");
require("../../libs/config/props/icon.js");
require("../../libs/config/props/image.js");
require("../../libs/config/props/indexAnchor.js");
require("../../libs/config/props/indexList.js");
require("../../libs/config/props/input.js");
require("../../libs/config/props/keyboard.js");
require("../../libs/config/props/line.js");
require("../../libs/config/props/lineProgress.js");
require("../../libs/config/props/link.js");
require("../../libs/config/props/list.js");
require("../../libs/config/props/listItem.js");
require("../../libs/config/props/loadingIcon.js");
require("../../libs/config/props/loadingPage.js");
require("../../libs/config/props/loadmore.js");
require("../../libs/config/props/modal.js");
require("../../libs/config/props/navbar.js");
require("../../libs/config/color.js");
require("../../libs/config/props/noNetwork.js");
require("../../libs/config/props/noticeBar.js");
require("../../libs/config/props/notify.js");
require("../../libs/config/props/numberBox.js");
require("../../libs/config/props/numberKeyboard.js");
require("../../libs/config/props/overlay.js");
require("../../libs/config/props/parse.js");
require("../../libs/config/props/picker.js");
require("../../libs/config/props/popup.js");
require("../../libs/config/props/radio.js");
require("../../libs/config/props/radioGroup.js");
require("../../libs/config/props/rate.js");
require("../../libs/config/props/readMore.js");
require("../../libs/config/props/row.js");
require("../../libs/config/props/rowNotice.js");
require("../../libs/config/props/scrollList.js");
require("../../libs/config/props/search.js");
require("../../libs/config/props/section.js");
require("../../libs/config/props/skeleton.js");
require("../../libs/config/props/slider.js");
require("../../libs/config/props/statusBar.js");
require("../../libs/config/props/steps.js");
require("../../libs/config/props/stepsItem.js");
require("../../libs/config/props/sticky.js");
require("../../libs/config/props/subsection.js");
require("../../libs/config/props/swipeAction.js");
require("../../libs/config/props/swipeActionItem.js");
require("../../libs/config/props/swiper.js");
require("../../libs/config/props/swipterIndicator.js");
require("../../libs/config/props/switch.js");
require("../../libs/config/props/tabbar.js");
require("../../libs/config/props/tabbarItem.js");
require("../../libs/config/props/tabs.js");
require("../../libs/config/props/tag.js");
require("../../libs/config/props/text.js");
require("../../libs/config/props/textarea.js");
require("../../libs/config/props/toast.js");
require("../../libs/config/props/toolbar.js");
require("../../libs/config/props/tooltip.js");
require("../../libs/config/props/transition.js");
require("../../libs/config/props/upload.js");
require("../../libs/config/props/drawer.js");
const _sfc_main = {
  name: "u-skeleton",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uSkeleton_props.props],
  data() {
    return {
      width: 0
    };
  },
  watch: {
    loading() {
      this.getComponentWidth();
    }
  },
  computed: {
    rowsArray() {
      if (/%$/.test(this.rowsHeight)) {
        common_vendor.index.$u.error("rowsHeight参数不支持百分比单位");
      }
      const rows = [];
      for (let i = 0; i < this.rows; i++) {
        let item = {}, rowWidth = common_vendor.index.$u.test.array(this.rowsWidth) ? this.rowsWidth[i] || (i === this.rows - 1 ? "70%" : "100%") : i === this.rows - 1 ? "70%" : this.rowsWidth, rowHeight = common_vendor.index.$u.test.array(this.rowsHeight) ? this.rowsHeight[i] || "18px" : this.rowsHeight;
        item.marginTop = !this.title && i === 0 ? 0 : this.title && i === 0 ? "20px" : "12px";
        if (/%$/.test(rowWidth)) {
          item.width = common_vendor.index.$u.addUnit(this.width * parseInt(rowWidth) / 100);
        } else {
          item.width = common_vendor.index.$u.addUnit(rowWidth);
        }
        item.height = common_vendor.index.$u.addUnit(rowHeight);
        rows.push(item);
      }
      return rows;
    },
    uTitleWidth() {
      let tWidth = 0;
      if (/%$/.test(this.titleWidth)) {
        tWidth = common_vendor.index.$u.addUnit(this.width * parseInt(this.titleWidth) / 100);
      } else {
        tWidth = common_vendor.index.$u.addUnit(this.titleWidth);
      }
      return common_vendor.index.$u.addUnit(tWidth);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getComponentWidth();
    },
    async setNvueAnimation() {
    },
    // 获取组件的宽度
    async getComponentWidth() {
      await common_vendor.index.$u.sleep(20);
      this.$uGetRect(".u-skeleton__wrapper__content").then((size) => {
        this.width = size.width;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.loading
  }, _ctx.loading ? common_vendor.e({
    b: _ctx.avatar
  }, _ctx.avatar ? {
    c: common_vendor.n(`u-skeleton__wrapper__avatar--${_ctx.avatarShape}`),
    d: common_vendor.n(_ctx.animate && "animate"),
    e: _ctx.$u.addUnit(_ctx.avatarSize),
    f: _ctx.$u.addUnit(_ctx.avatarSize)
  } : {}, {
    g: _ctx.title
  }, _ctx.title ? {
    h: $options.uTitleWidth,
    i: _ctx.$u.addUnit(_ctx.titleHeight),
    j: common_vendor.n(_ctx.animate && "animate")
  } : {}, {
    k: common_vendor.f($options.rowsArray, (item, index, i0) => {
      return {
        a: index,
        b: item.width,
        c: item.height,
        d: item.marginTop
      };
    }),
    l: common_vendor.n(_ctx.animate && "animate")
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b376446f"], ["__file", "D:/Hbuilderx/quanzi_ketang/uni_modules/uview-plus/components/u-skeleton/u-skeleton.vue"]]);
wx.createComponent(Component);
