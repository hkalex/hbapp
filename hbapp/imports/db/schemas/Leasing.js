import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Leasing = {
  title: {
    type: String,
    optional: true
  },
  publishedAt: {
    type: Date,
    optional: true
  },
  publishedBy: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  },
  createdBy: {
    type: String,
    optional: true
  },
  status: {
    type: String,
    optional: true,
    allowedValues: ["draft", "pending", "rejected", "approved", "off"],
    defaultValue: "draft"
  },
  step: {
    type: Number,
    optional: true
  }
};

export const LeasingSchema = new SimpleSchema(Leasing);