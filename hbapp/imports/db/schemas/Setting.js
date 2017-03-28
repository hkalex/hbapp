import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Setting = {
  code: {
    type: String
  },
  value: {
    type: String,
    optional: true
  },
  desc: {
    type: String,
    optional: true
  },
  toClient: {
    type: Boolean,
    // optional: true,
    defaultValue: true,
    autoform: {
      afFieldInput: {
        type: "boolean-select"
      }
    }
  },
  type: {
    type: String,
    allowedValues: ["String", "Array"],
    optional: true,
    autoform: {

    }
  },
};



export const SettingSimpleSchema = new SimpleSchema(Setting);