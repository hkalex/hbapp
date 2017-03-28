import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PhotoSimpleSchema } from './Photo';

export const Activity = {
  title: {
    type: String
  },
  date: {
    type: Date
  },
  fromTime: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  toTime: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'time'
      }
    }
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
  city: {
    type: String
  },
  address: {
    type: String
  },
  maxPeople: {
    type: Number
  },
  type: {
    type: [String],
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

export const ActivitySimpleSchema = new SimpleSchema(Activity);
