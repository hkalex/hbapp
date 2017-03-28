import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ExternalContact = {
  name: {
    type: String
  },
  id: {
    type: String
  },
  type: {
    type: String
  },
  token: {
    type: String
  },

}

export const ExternalContactSimpleSchema = new SimpleSchema(ExternalContact);