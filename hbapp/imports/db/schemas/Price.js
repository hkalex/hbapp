import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Price = {
  currency : {
    type: String,
    allowedValues: ["CNY", "USD", "AUD"],
    autoform: {
      defaultValue: 'CNY',
      options: {
        CNY:"CNY",
        USD:"USD",
        AUD:"AUD",
      }
    }
  },
  amount: {
    type: Number,
    min: 0,
  },
};

export const PriceSimpleSchema = new SimpleSchema(Price);
