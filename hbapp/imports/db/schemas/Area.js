import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Area = {
  unit: {
    type: String,
    allowedValues: ["M","F","Y"],
    defaultValue: "M",
    autoform: {
      options: {
        M: "Meters",
        F: "Feet",
        Y: "Yard",
      }
    }
  },
  area: {
    type: Number,
    min: 0
  }
}

export const AreaSimpleSchema = new SimpleSchema(Area);