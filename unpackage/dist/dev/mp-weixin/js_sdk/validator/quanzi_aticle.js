"use strict";
const validator = {
  "user_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "defaultValue": {
      "$env": "uid"
    }
  },
  "category_id": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "分类",
    "label": "分类"
  },
  "title": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "标题",
    "title": "标题"
  },
  "description": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "文章摘要",
    "title": "文章摘要"
  },
  "province": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "发布省份",
    "title": "发布省份"
  },
  "content": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "文章内容",
    "title": "文章内容"
  },
  "article_status": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "value": 0,
            "text": "草稿箱"
          },
          {
            "value": 1,
            "text": "已发布"
          }
        ]
      }
    ],
    "title": "文章状态",
    "defaultValue": 0,
    "label": "文章状态"
  },
  "last_comment_user_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "picurls": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "label": "封面大图",
    "title": "封面大图"
  },
  "publish_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "发表时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "发表时间"
  },
  "last_modify_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "最后修改时间",
    "defaultValue": {
      "$env": "now"
    },
    "label": "最后修改时间"
  }
};
const enumConverter = {
  "article_status_valuetotext": {
    "0": "草稿箱",
    "1": "已发布"
  }
};
exports.enumConverter = enumConverter;
exports.validator = validator;
