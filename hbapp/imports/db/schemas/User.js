import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const ProfileSimpleSchema = new SimpleSchema({
  avatar: {
    type: String,
    label: 'avatar',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'images',
        accept: 'image/*',
        label: 'Choose image',
      }
    }
  }
});

export const User = {
  phoneNum: {
    type: String,
    regEx: /^1[3|4|5|7|8]\d{9}$/
  },
  username: {
    type: String,
    optional: true
  },
  profile: {
    type: ProfileSimpleSchema,
    optional: true
  },
  services: {
    type: Object,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    defaultValue: new Date()
  },
  roles: {
    type: [String],
    optional: true
  }
};

export const UserSimpleSchema = new SimpleSchema(User);