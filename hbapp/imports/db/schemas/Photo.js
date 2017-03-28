import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Photo = {
  name: {
    type: String
  },
  title: {
    type: String
  },
  url: {
    type: String,
    optional: true
  },
  cdnUrl: {
    type: String,
    optional: true,
    autoform: {
      readOnly: "readonly"
    }
  },
  image: {
    type: String,
    label: 'Choose file',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'images',
        accept: 'image/*',
        label: 'Choose image',
      }
    }
  }
};

export const PhotoSimpleSchema = new SimpleSchema(Photo);
