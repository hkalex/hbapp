import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const LanguageContentSimpleSchema = new SimpleSchema({
  discoverTitle: {
    type: String
  },
  language: {
    type: String
  }
});

export const Language = {
  langName: {
    type: String
  },
  langTag: {
    type: String
  },
  content: {
    type: LanguageContentSimpleSchema
  }
};

export const LanguageSimpleSchema = new SimpleSchema(Language);
