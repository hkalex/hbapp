import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ListItem = {
  title: {
    type: String,
    optional: true
  },
  code: {
    type: String,
    optional: true
  },
  seq: {
    type: Number,
    optional: true
  },
  allowSearch: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  desc: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'RichTextEditor'
      }
    }
  }
};

let level1Item = new SimpleSchema(Object.assign({}, ListItem));


ListItem.items = {
  type: [level1Item],
  optional: true
}

export const ListItemSimpleSchema = new SimpleSchema(ListItem);
