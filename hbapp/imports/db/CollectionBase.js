import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

Meteor.allCollections = {};

export default class CollectionBase extends Mongo.Collection {
  constructor(name) {
    super(name, {idGeneration : 'MONGO'}); // call the parent constructor

    // save the collection for the future
    Meteor.allCollections[name] = this;
  }

  attachSchema(...args) {
    this._rawSchema = args[0];
    super.attachSchema(...args);
  }

  rawSchema() {
    return this._rawSchema;
  }

  ObjectID(id) {
    return new Mongo.ObjectID(id);
  }
}
