import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { AreaSimpleSchema } from './Area';
import { PriceSimpleSchema } from './Price';
import { PhotoSimpleSchema } from './Photo';
import { TagSimpleSchema } from './Tag';
import { FloorPlanSimpleSchema } from './FloorPlan';

export const Project = {
  title: {
    type: String,
    label: "Title",
  },
  status: {
    type: String,
    autoform: {
      options: [
        {
          label: '预售',
          value:'P'
        },
        {
          label: '热售中',
          value:'A'
        },
        {
          label: '全部售罄',
          value:'S'
        },
        {
          label: '下架',
          value:'I'
        }
      ]
    }
  },
  classes: {
    type: [String],
    autoform: {
      options: [
        {
          label: '投资房',
          value: 'I'
        },
        {
          label: '学区房',
          value: 'S'
        },
        {
          label: '移民房',
          value: 'M'
        }
      ]
    }
  },
  fromPrice: {
    type: PriceSimpleSchema,
  },
  toPrice: {
    type: PriceSimpleSchema
  },
  fromArea: {
    type: AreaSimpleSchema
  },
  toArea: {
    type: AreaSimpleSchema
  },
  fromNumRoom: {
    type: Number
  },
  toNumRoom: {
    type: Number
  },
  photos: {
    type: [PhotoSimpleSchema]
  },
  shortDesc: {
    type: String,
  },
  desc: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'RichTextEditor'
      }
    }
  },
  geoLocation: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  propertyType: {
    type: [String],
    autoform: {
      options: [
        {
          label: '别墅',
          value: 'H'
        },
        {
          label: '公寓',
          value: 'A'
        },
        {
          label: '连排别墅',
          value: 'V'
        },
        {
          label: '土地',
          value: 'L'
        },
        {
          label: '商用',
          value: 'B'
        }
      ]
    }
  },
  builder: {
    type: String
  },
  numLots: {
    type: String
  },
  expectedSettleAt: {
    type: Date,
    defaultValue: new Date()
  },
  landArea: {
    type: AreaSimpleSchema
  },
  usageYear: {
    type: Number
  },
  mortgageRate: {
    type: Number,
    decimal: true,
  },
  returnRate: {
    type: Number,
    decimal: true,
  },

  topTags: {
    type: [TagSimpleSchema]
  },
  tags: {
    type: [String],
    autoform: {
      options: [{
          label: '允许贷款',
          value: 'MA'
        },
        {
          label: '房屋托管',
          value: 'HM'
        },
        {
          label: '包租协议',
          value: 'RE'
        },
        {
          label: '移民身份',
          value: 'CI'
        },
        {
          label: '绝佳位置',
          value: 'EL'
        },
        {
          label: '精装修',
          value: 'BD'
        }
      ],
    }
  },

  floorPlans: {
    type: [FloorPlanSimpleSchema]
  },

  isPublished: {
    type: Boolean,
    defaultValue: false
  },
  publishedAt: {
    type: Date,
    optional: true
  },
  publishedBy: {
    type: String,
    optional: true
  }
};

export const ProjectSimpleSchema = new SimpleSchema(Project);
