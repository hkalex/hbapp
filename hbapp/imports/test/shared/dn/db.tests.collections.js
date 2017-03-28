import SchemaBase from '/imports/db/SchemaBase';
import CollectionBase from '/imports/db/CollectionBase';
import DN from '/imports/dn';

export const Parent = {
  string1: { type: String },
  string2: { type: String, optional: true },
  tags: { type: [String] }
}

export const ParentSimpleSchema = new SchemaBase(Parent);
export const parents = new CollectionBase('parents');
parents.attachSchema(ParentSimpleSchema);
parents.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function() {
    return true;
  }
});

export const Child = {
  code: { type: String },
  parentId: { type: String, optional: true },
  DN: {
    type: Object,
    optional: true,
    blackbox: true
  }
}
export const ChildSimpleSchema = new SchemaBase(Child);
export const childs = new CollectionBase('childs');
childs.attachSchema(ChildSimpleSchema);
childs.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function() {
    return true;
  }
});

ChildSimpleSchema.attachRelationship({
  parentId: { // this is ChildSimpleSchema.parentId
    parent: {
      collection: "parents",
      field: "_id", // default is "_id"
      autoform: {
        label: "title",
        filter: null, // NULL = no filter
        mapper: null
      }
    },
    dn: {
      parent: {
        parentId: new DN.Expression("ref._id"), // "ref" is the parent document
        string1: true,
        string2Value: "string2",
        firstTag: new DN.Expression("ref.tags && ref.tags[0]"),
        tags: true
      }
    }
  }
})
