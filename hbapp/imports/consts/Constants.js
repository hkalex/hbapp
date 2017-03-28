export const APP_VERSION = '0.1.17047';
export let APP_CODE = 'M'; // M: Mobile, C: Console

export const STYLE = {
  BACKGROUND_COLOR_1: '#ffffff', //white
  BACKGROUND_COLOR_2: '#424242', //light-black
  BACKGROUND_COLOR_3: '#efefef', //light-grey
  COLOR_1: '#000000', //black
  COLOR_2: '#ffffff', //white
  COLOR_3: '#cecece', //grey
  FONT_SIZE_1: '22px',  //TopBar
  FONT_SIZE_2: '20px',
  FONT_SIZE_3: '20px',
}

// price range for search in project list
export const PRICE_RANGE = [
  { fromPrice: "-1", toPrice: "0", range: "不限" },
  { fromPrice: "0", toPrice: "1000000", range: "<100万" },
  { fromPrice: "1000000", toPrice: "2000000", range: "100万-200万" },
  { fromPrice: "2000000", toPrice: "3000000", range: "200万-300万" },
  { fromPrice: "3000000", toPrice: "4000000", range: "300万-400万" },
  { fromPrice: "4000000", toPrice: "5000000", range: "400万-500万" },
  { fromPrice: "5000000", toPrice: "6000000", range: "500万-600万" },
  { fromPrice: "6000000", toPrice: "7000000", range: "600万-700万" },
  { fromPrice: "7000000", toPrice: "8000000", range: "700万-800万" },
  { fromPrice: "8000000", toPrice: "9000000", range: "800万-900万" },
  { fromPrice: "9000000", toPrice: "10000000", range: "900万+" }
];

export const SUBLET_PRICE_RANGE = [
  { fromPrice: "-1", toPrice: "0", range: "不限" },
  { fromPrice: "0", toPrice: "60", range: "<60" },
  { fromPrice: "60", toPrice: "70", range: "60-70" },
  { fromPrice: "70", toPrice: "80", range: "70-80" },
  { fromPrice: "80", toPrice: "90", range: "80-90" },
  { fromPrice: "90", toPrice: "100", range: "90-100" },
  { fromPrice: "100", toPrice: "110", range: "100-110" },
  { fromPrice: "110", toPrice: "120", range: "110-120" },
  { fromPrice: "120", toPrice: "130", range: "120-130" },
  { fromPrice: "130", toPrice: "140", range: "130+" }
];

export const ORDER_STEPS = [
  { text: '已付订金', code: 'D' },
  { text: '大订金，律师签约', code: 'C' },
  { text: '等待交房', code: 'W' },
  { text: '贷款', code: 'L' },
  { text: '付尾数', code: 'P' },
  { text: '交房', code: 'DC' }
];

export const INFO_LOCATION = [
  { text: '不限', code: 'ALL' },
  { text: '美国', code: 'US' },
  { text: '澳大利亚', code: 'AU' },
  { text: '加拿大', code: 'CA' },
  { text: '意大利', code: 'IT' },
  { text: '葡萄牙', code: 'PT' },
  { text: '日本', code: 'JP' },
  { text: '马来西亚', code: 'MY' },
  { text: '韩国', code: 'KR' },
  { text: '泰国', code: 'TH' },
  { text: '德国', code: 'GE' },
  { text: '英国', code: 'UK' }
];

export const INFO_CLASSES = [
  { title: '不限', code: 'ALL' },
  { title: '移民', code: 'I' },
  { title: '投资', code: 'P' },
  { title: '留学', code: 'S' },
  { title: '知识', code: 'K' },
  { title: '基金', code: 'F' },
  { title: '案例', code: 'E' }
];

export const ACTIVITY_LOCATIONS = [
  { text: '地区', code: 'ALL' },
  { text: '上海', code: 'SH' },
  { text: '北京', code: 'BJ' },
  { text: '广州', code: 'GZ' },
  { text: '深圳', code: 'SZ' }
];

// data for MyBuilding 
export const OFF_PLAN_COUNTRY = [
  { country: "全部", code: "ALL" },
  { country: "中国", code: "ZH" },
  { country: "澳大利亚", code: "AU" },
  { country: "英国", code: "UK" },
  { country: "美国", code: "US" },
];
export const OFF_PLAN_CITY = [
  {
    country: "ZH",
    city: [
      { text: "全部", code: "ALL" },
      { text: "上海", code: "SH" },
      { text: '北京', code: 'BJ' },
      { text: '广州', code: 'GZ' },
      { text: '深圳', code: 'SZ' }
    ]
  },
];
export const OFF_PLAN_CURRENCY = [
  { text: "货币", code: "CURRENCY" },
  { text: "人民币", code: "CNY" },
  { text: "美元", code: "USD" },
  { text: "澳大利亚元", code: "AUD" },
];


export const CURRENCY = [
  { code: "CNY", icon: "￥" },
  { code: "USD", icon: "$" },
  { code: "AUD", icon: "$A." },
];
export const TITLE = [
  { text: "房子", code: "project" },
  { text: "朋友", code: "friends" },
  { text: "主页", code: "home" },
  { text: "发现", code: "discover" },
  { text: "朕", code: "me" },
  { text: "我的地点", code: "me/mylocations" },
  { text: "新增地点", code: "me/mylocations/new" },
  { text: "修改地点", code: "/me/mylocations/edit/" },

  { text: "留筑", code: "landing" },
  { text: "", code: "user_new" },
  { text: "", code: "user_login" },
  { text: "", code: "user_password_reset" }
];

// sublet form
export const CLASS_DATA = [
  { type: 'C', text: '类型' },
  { type: 'A', text: '公寓' },
  { type: 'H', text: '房子' },
  { type: 'V', text: '别墅' },
];
// bond 
export const PAYTYPE = [
  { type: 'M', text: '缴纳方式' },
  { type: 'A', text: '全包' },
  { type: 'H', text: '半包' },
  { type: 'E', text: '平摊' }
];
// 押金
export const BOND = [
  { type: 'null', text: '无押金' },
  { type: '1week', text: '一周房租' },
  { type: '2week', text: '两周房租' },
  { type: '3week', text: '三周房租' },
  { type: '4week', text: '四周房租' }
];
// 租客要求
export const REQUIREMENTS = [
  { type: 'null', text: '男女不限' },
  { type: 'M', text: '女士优先' },
  { type: 'F', text: '男士优先' },
  { type: 'C', text: 'couple优先' }
];
//min stay
export const MINSTAY = [
  { type: 'null', text: '不限' },
  { type: '1week', text: '一周起租' },
  { type: '2week', text: '两周起租' },
  { type: '3week', text: '三周起租' },
  { type: '4week', text: '四周起租' },
  { type: '3month', text: '三个月起租' },
  { type: '6month', text: '半年起租' },
  { type: '1year', text: '一年起租' },
];
// sublet-max-range
export const MAX_RANGE = [
  { code: 1, value: 1 },
  { code: 2, value: 2 },
  { code: 3, value: 3 },
  { code: 4, value: 4 },
  { code: 5, value: 5 },
  { code: 6, value: 6 },
  { code: 7, value: 7 },
  { code: 8, value: 8 },
  { code: 9, value: 9 },
];

export const MIN_RANGE = [
  { code: 1, value: 1 },
  { code: 2, value: 2 },
  { code: 3, value: 3 }
];

const C = {
  STYLE,
  PRICE_RANGE,
  SUBLET_PRICE_RANGE,
  ORDER_STEPS,
  APP_VERSION,
  APP_CODE,
  INFO_LOCATION,
  INFO_CLASSES,
  ACTIVITY_LOCATIONS,
  OFF_PLAN_COUNTRY,
  OFF_PLAN_CITY,
  OFF_PLAN_CURRENCY,
  CURRENCY,
  TITLE,
  CLASS_DATA,
  PAYTYPE,
  BOND,
  REQUIREMENTS,
  MINSTAY,
  MAX_RANGE,
  MIN_RANGE
}

export default C;