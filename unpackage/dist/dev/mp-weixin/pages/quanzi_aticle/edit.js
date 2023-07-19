"use strict";
const common_vendor = require("../../common/vendor.js");
const js_sdk_validator_quanzi_aticle = require("../../js_sdk/validator/quanzi_aticle.js");
const db = common_vendor.Ds.database();
const dbCollectionName = "quanzi_aticle";
function getValidator(fields) {
  let result = {};
  for (let key in js_sdk_validator_quanzi_aticle.validator) {
    if (fields.indexOf(key) > -1) {
      result[key] = js_sdk_validator_quanzi_aticle.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "user_id": "",
      "category_id": "",
      "title": "",
      "description": "",
      "province": "",
      "content": "",
      "article_status": 0,
      "last_comment_user_id": "",
      "picurls": [],
      "publish_date": null,
      "last_modify_date": null
    };
    return {
      formData,
      formOptions: {
        "article_status_localdata": [
          {
            "value": 0,
            "text": "草稿箱"
          },
          {
            "value": 1,
            "text": "已发布"
          }
        ]
      },
      rules: {
        ...getValidator(Object.keys(formData))
      }
    };
  },
  onLoad(e) {
    if (e.id) {
      const id = e.id;
      this.formDataId = id;
      this.getDetail(id);
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    /**
     * 验证表单并提交
     */
    submit() {
      common_vendor.index.showLoading({
        mask: true
      });
      this.$refs.form.validate().then((res) => {
        return this.submitForm(res);
      }).catch(() => {
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    /**
     * 提交表单
     */
    submitForm(value) {
      return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          title: "修改成功"
        });
        this.getOpenerEventChannel().emit("refreshData");
        setTimeout(() => common_vendor.index.navigateBack(), 500);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    },
    /**
     * 获取表单数据
     * @param {Object} id
     */
    getDetail(id) {
      common_vendor.index.showLoading({
        mask: true
      });
      db.collection(dbCollectionName).doc(id).field("user_id,category_id,title,description,province,content,article_status,last_comment_user_id,picurls,publish_date,last_modify_date").get().then((res) => {
        const data = res.result.data[0];
        if (data) {
          this.formData = data;
        }
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_picker + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.user_id = $event),
    b: common_vendor.p({
      placeholder: "文章作者ID， 参考`uni-id-users` 表",
      modelValue: $data.formData.user_id
    }),
    c: common_vendor.p({
      name: "user_id",
      label: "",
      required: true
    }),
    d: common_vendor.o(($event) => $data.formData.category_id = $event),
    e: common_vendor.p({
      collection: "opendb-news-categories",
      field: "name as text, _id as value",
      modelValue: $data.formData.category_id
    }),
    f: common_vendor.p({
      name: "category_id",
      label: "分类"
    }),
    g: common_vendor.o(($event) => $data.formData.title = $event),
    h: common_vendor.p({
      placeholder: "标题",
      trim: "both",
      modelValue: $data.formData.title
    }),
    i: common_vendor.p({
      name: "title",
      label: "标题",
      required: true
    }),
    j: common_vendor.o(($event) => $data.formData.description = $event),
    k: common_vendor.p({
      placeholder: "文章摘要",
      trim: "both",
      modelValue: $data.formData.description
    }),
    l: common_vendor.p({
      name: "description",
      label: "文章摘要"
    }),
    m: common_vendor.o(($event) => $data.formData.province = $event),
    n: common_vendor.p({
      placeholder: "发布省份",
      trim: "both",
      modelValue: $data.formData.province
    }),
    o: common_vendor.p({
      name: "province",
      label: "发布省份"
    }),
    p: common_vendor.o(($event) => $data.formData.content = $event),
    q: common_vendor.p({
      placeholder: "文章内容",
      trim: "right",
      modelValue: $data.formData.content
    }),
    r: common_vendor.p({
      name: "content",
      label: "文章内容"
    }),
    s: common_vendor.o(($event) => $data.formData.article_status = $event),
    t: common_vendor.p({
      localdata: $data.formOptions.article_status_localdata,
      modelValue: $data.formData.article_status
    }),
    v: common_vendor.p({
      name: "article_status",
      label: "文章状态"
    }),
    w: common_vendor.o(($event) => $data.formData.last_comment_user_id = $event),
    x: common_vendor.p({
      placeholder: "最后回复用户 id，参考`uni-id-users` 表",
      modelValue: $data.formData.last_comment_user_id
    }),
    y: common_vendor.p({
      name: "last_comment_user_id",
      label: ""
    }),
    z: common_vendor.o(($event) => $data.formData.picurls = $event),
    A: common_vendor.p({
      multiple: true,
      modelValue: $data.formData.picurls
    }),
    B: common_vendor.p({
      name: "picurls",
      label: "封面大图"
    }),
    C: common_vendor.o(($event) => $data.formData.publish_date = $event),
    D: common_vendor.p({
      ["return-type"]: "timestamp",
      modelValue: $data.formData.publish_date
    }),
    E: common_vendor.p({
      name: "publish_date",
      label: "发表时间"
    }),
    F: common_vendor.o(($event) => $data.formData.last_modify_date = $event),
    G: common_vendor.p({
      ["return-type"]: "timestamp",
      modelValue: $data.formData.last_modify_date
    }),
    H: common_vendor.p({
      name: "last_modify_date",
      label: "最后修改时间"
    }),
    I: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    J: common_vendor.sr("form", "788c3e74-0"),
    K: common_vendor.p({
      model: $data.formData,
      ["validate-trigger"]: "submit",
      ["err-show-type"]: "toast"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Hbuilderx/quanzi_ketang/pages/quanzi_aticle/edit.vue"]]);
wx.createPage(MiniProgramPage);
