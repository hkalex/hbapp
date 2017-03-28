import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tag = {
  type: {
    type: String,
    autoform: {
      options: [
        {
          label: '首付比例',
          value: 'MR'
        },
        {
          label: '预期年收益',
          value: 'ER'
        }
      ]
    }
  },
  tag: {
    type: String,
  }
};

export const TagSimpleSchema = new SimpleSchema(Tag);
