import SchemaBase from '../SchemaBase';

export const Offplan = {
  title: {
    type: String,
    label: "名称",
  },
  address: {
    type: String,
    label: "地址",
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  room: {
    type: Number
  },
  parlour: {
    type: Number
  },
  parking: {
    type: Number
  },
  currency: {
    type: String,
  },
  amount: {
    type: Number
  },
  area: {
    type: String
  },
  expectedSettleAt: {
    type: String,
  },
  photos: {
    type: [String]
  },
  shortDesc: {
    type: String,
  },
  creatBy: {
    type: String
  },
  isApproval: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  publishedAt: {
    type: Date,
    optional: true
  },
  publishedBy: {
    type: String,
    optional: true
  }
}

export const OffplanSimpleSchema = new SchemaBase(Offplan);