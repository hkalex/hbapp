import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const LocationSchema = new SimpleSchema({
  lat: {
    type: Number,
    decimal: true,
    optional: true
  },
  lng: {
    type: Number,
    decimal: true,
    optional: true
  }
});

const AddressDetailSchema = new SimpleSchema({
  location: {
    type: LocationSchema,
    optional: true
  },
  postcode: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true
  },
  state: {
    type: String,
    optional: true
  },
  suburb: {
    type: String,
    optional: true
  },
  street: {
    type: String,
    optional: true
  }
});

// 类型对应金额模板Schema
const TypeValueSchema = new SimpleSchema({
  // 类型
  type: {
    type: String,
    optional: true
  },
  // 金额
  amount: {
    type: Number,
    optional: true
  }
});


// 卧室房间
const RoomSchema = new SimpleSchema({

  // 标题
  title: {
    type: String,
    optional: true
  },
  // 房客人数
  peopleNum: {
    type: Number,
    optional: true
  },
  // 房间面积
  area: {
    type: Number,
    optional: true
  },
  // 洗手间数量
  bathroom: {
    type: Number,
    optional: true
  },
  // 租金
  rental: {
    type: Number,
    optional: true
  },
  // 押金
  bond: {
    type: String,
    optional: true
  },
  // 要求
  requirement: {
    type: String,
    optional: true
  },
  // 家具和配置
  bedNum: {
    type: [String],
    optional: true
  },
  config: {
    type: [String],
    optional: true
  },
  // 租约
  minStay: {
    type: String,
    optional: true
  },
  // 租约起始日期
  fromDate: {
    type: Date,
    optional: true
  },
  // 卧室房间图片
  images: {
    type: [String],
    optional: true
  }
});

export const ApprovedSublet = {
  parentId: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    optional: true
  },
  // 地址
  address: {
    type: String,
    optional: true
  },
  addressDetail: {
    type: AddressDetailSchema,
    optional: true
  },
  staticMap: {
    type: String,
    optional: true
  },
  // 卧室数量
  bedroom: {
    type: Number,
    optional: true
  },
  // 洗手间数量
  bathroom: {
    type: Number,
    optional: true
  },
  // 停车位数量
  parking: {
    type: Number,
    optional: true
  },
  // 房子类型
  class: {
    type: String,
    optional: true
  },
  // 特色
  features: {
    type: [String],
    optional: true
  },
  // 描述
  desc: {
    type: String,
    optional: true
  },
  // 公共区域配置
  publicArea: {
    type: [String],
    optional: true
  },
  // 厨房配置
  kitchen: {
    type: [String],
    optional: true
  },
  // 房源图片
  images: {
    type: [String],
    optional: true
  },
  // 账单
  bill: {
    type: TypeValueSchema,
    optional: true
  },
  // 卧室房间
  room: {
    type: RoomSchema,
    optional: true
  },
  publishedAt: {
    type: Date,
    optional: true
  },
  publishedBy: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  createdBy: {
    type: String,
    optional: true
  },
  status: {
    type: String,
    optional: true,
    allowedValues: ["draft", "pending", "rejected", "approved", "off"],
    defaultValue: "draft"
  },
  step: {
    type: Number,
    optional: true
  }
};

export const ApprovedSubletSchema = new SimpleSchema(ApprovedSublet);