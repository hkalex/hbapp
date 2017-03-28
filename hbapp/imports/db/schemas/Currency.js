import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Currency = {
  name: {
    type: String
  },
  code: {
    type: String
  },
  format: {
    type: String,
  },
  symbol: {
    type: String,
    defaultValue: '$'
  },
  separator: {
    type: String,
    defaultValue: ','
  },
  rate: {
    type: Number,
  }
}

export const CurrencySimpleSchema = new SimpleSchema(Currency);