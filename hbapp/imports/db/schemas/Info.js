import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PhotoSimpleSchema } from './Photo';

export const Info = {
  title: {
    type: String
  },
  date: {
    type: Date
  },
  shortDesc: {
    type: String
  },
  image: {
    type: [PhotoSimpleSchema]
  },
  detail: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'RichTextEditor'
      }
    }
  },
  country: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    autoform: {
      options: [{
        label: '移民',
        value: 'I'
      }, {
        label: '投资',
        value: 'P'
      }, {
        label: '留学',
        value: 'S'
      }, {
        label: '知识',
        value: 'K'
      }, {
        label: '基金',
        value: 'F'
      }, {
        label: '案例',
        value: 'E'
      }]
    }
  },

  DN: {
    type: Object,
    optional: true,
    blackbox: true
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

export const InfoSimpleSchema = new SimpleSchema(Info);
