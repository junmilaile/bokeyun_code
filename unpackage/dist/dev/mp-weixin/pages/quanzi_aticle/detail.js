"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_quanzi_aticle = require("../../js_sdk/validator/quanzi_aticle.js");
const db = common_vendor.Ds.database();
const _sfc_main = {
  data() {
    return {
      queryWhere: "",
      collectionList: [db.collection("quanzi_aticle").field("user_id,category_id,title,description,province,content,article_status,last_comment_user_id,picurls,publish_date,last_modify_date").getTemp(), db.collection("opendb-news-categories").field("name as text, _id").getTemp()],
      loadMore: {
        contentdown: "",
        contentrefresh: "",
        contentnomore: ""
      },
      options: {
        // 将scheme enum 属性静态数据中的value转成text
        ...js_sdk_validator_quanzi_aticle.enumConverter
      }
    };
  },
  onLoad(e) {
    this._id = e.id;
  },
  onReady() {
    if (this._id) {
      this.collectionList = [db.collection("quanzi_aticle").where('_id=="' + this._id + '"').field("user_id,category_id,title,description,province,content,article_status,last_comment_user_id,picurls,publish_date,last_modify_date").getTemp(), db.collection("opendb-news-categories").field("name as text, _id").getTemp()];
    }
  },
  methods: {
    handleUpdate() {
      common_vendor.index.navigateTo({
        url: "./edit?id=" + this._id,
        events: {
          // 监听修改页面成功修改数据后, 刷新当前页面数据
          refreshData: () => {
            this.$refs.udb.loadData({
              clear: true
            });
          }
        }
      });
    },
    handleDelete() {
      this.$refs.udb.remove(this._id, {
        success: (res) => {
          common_vendor.index.navigateTo({
            url: "./list"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_uni_dateformat2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_dateformat + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: error
      }, error ? {
        b: common_vendor.t(error.message)
      } : loading ? {
        d: "140900bb-1-" + i0 + ",140900bb-0",
        e: common_vendor.p({
          contentText: $data.loadMore,
          status: "loading"
        })
      } : data ? {
        g: common_vendor.t(data.user_id),
        h: common_vendor.t(data.category_id && data.category_id[0] && data.category_id[0].text),
        i: common_vendor.t(data.title),
        j: common_vendor.t(data.description),
        k: common_vendor.t(data.province),
        l: common_vendor.t(data.content),
        m: common_vendor.t(options.article_status_valuetotext[data.article_status]),
        n: common_vendor.t(data.last_comment_user_id),
        o: common_vendor.t(data.picurls),
        p: "140900bb-2-" + i0 + ",140900bb-0",
        q: common_vendor.p({
          threshold: [0, 0],
          date: data.publish_date
        }),
        r: "140900bb-3-" + i0 + ",140900bb-0",
        s: common_vendor.p({
          threshold: [0, 0],
          date: data.last_modify_date
        })
      } : {}, {
        c: loading,
        f: data,
        t: i0,
        v: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "140900bb-0"
    }),
    b: common_vendor.sr("udb", "140900bb-0"),
    c: common_vendor.p({
      options: $data.options,
      collection: $data.collectionList,
      getone: true,
      manual: true
    }),
    d: common_vendor.o((...args) => $options.handleUpdate && $options.handleUpdate(...args)),
    e: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Hbuilderx/quanzi_ketang/pages/quanzi_aticle/detail.vue"]]);
wx.createPage(MiniProgramPage);
