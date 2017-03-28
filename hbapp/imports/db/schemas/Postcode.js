import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Postcode = {
  postcode: {
    type: Number
  },
  suburb: {
    type: String
  },
  state: {
    type: String
  },
  dc: {
    type: String
  },
  type: {
    type: String
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  }
};

export const PostcodeSchema = new SimpleSchema(Postcode);