"use strict";
const common_vendor = require("../common/vendor.js");
function getImgSrc(richtext, num = 3) {
  let imgList = [];
  richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
    imgList.push(capture);
  });
  imgList = imgList.slice(0, num);
  return imgList;
}
function getProvince() {
  return new Promise((resolve, reject) => {
    let history = common_vendor.index.getStorageSync("historyProvince");
    if (history) {
      if (Date.now() - history.time > 1e3 * 60 * 60) {
        getIp().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      } else {
        resolve(history.province);
      }
    } else {
      getIp().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    }
  });
}
function getIp() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: "https://restapi.amap.com/v3/ip?key=3fc3193fc156b99f7555db9a084db294"
    }).then((res) => {
      let str = "";
      if (typeof res.data.province === "string") {
        str = res.data.province;
      } else {
        str = "火星";
      }
      resolve(str);
      let obj = {
        province: str,
        time: Date.now()
      };
      common_vendor.index.setStorageSync("history", obj);
    }).catch((err) => {
      reject(err);
    });
  });
}
function giveName(item) {
  return item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile || "请设置昵称";
}
function giveAvatar(item) {
  var _a, _b;
  return ((_b = (_a = item.user_id[0]) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url) ?? "../../static/images/user-default.jpg";
}
exports.getImgSrc = getImgSrc;
exports.getProvince = getProvince;
exports.giveAvatar = giveAvatar;
exports.giveName = giveName;
