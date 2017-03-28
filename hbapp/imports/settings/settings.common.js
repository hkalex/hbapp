var settings = {
  public: {
    APP_VERSION: "0.1.17047",
    APP_NAME: "SENSITY",

    ENV_CODE: "DEV",
    ENV_ID: "",

    CDN_URL: "//SENSITY",
    CFS_URL: "",
    LOG_DUMMY: false,

    FREE_PHONE_NUMBER: "SENSITY",
    PIN_CHECK_NUMBER: "^\\d{8,15}$", // this is the PIN check

    KEFU_TENANT_ID: 00000,

    WECHAT_SHARE_DESC: "SENSITY",
    WECHAT_SHARE_THUMB: "http://SENSITY/assets/logo_64.png",

    GOOGLE_MAP_REGION: "cn",
    GOOGLE_MAP_KEY: "SENSITY",
    BING_MAP_KEY: "SENSITY-SENSITY"
  },

  private: {
    CDN_ACCESS_KEY_SECRET: "SENSITY",
    CFS_PATH: "",

    SMS_DUMMY: false,
    SMS_APP_ID: "SENSITY-SENSITY",
    SMS_APP_KEY: "SENSITY",
    SMS_TIMEOUT: 60,
    SMS_MSG_APPNAME: "SENSITY",
    SMS_MSG_ACTION: "手机验证",

    CDN_REGION: "SENSITY",
    CDN_ACCESS_KEY_ID: "SENSITY",
    CDN_BUCKET: "SENSITY",

    WECHAT_ID: "SENSITY",
    WECHAT_SECRET: "SENSITY",

    HK_API_URL: "http://SENSITY"
  }
}

module.exports = settings;