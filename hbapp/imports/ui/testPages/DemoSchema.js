const schema = {
  postId: {
    type: String
  },
  author: {
    type: String,
  },
  text: {
    type: String,
    materialForm: {
      switcher: 'RichText'
    }
  },
  createdAt: {
    type: Date,
    defaultValue: new Date('2014-10-18T00:00:00.000Z')
  }
};

export default schema;
