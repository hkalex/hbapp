import { Meteor } from 'meteor/meteor';

// query DB
export function queryCollection(collectionName, query) {
  return new Promise((resolve, reject) => {
    let collection = Meteor.allCollections[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Collection ${collectionName} is not found`);
    }
    let result = collection.find(query).fetch();
    resolve(result);
  });
}
// insert DB
export function insertCollection(collectionName, query) {
  return new Promise((resolve, reject) => {
    let collection = Meteor.allCollections[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Collection ${collectionName} is not found`);
    }
    let result = collection.insert(query);
    resolve(result);
  });
}
// delete DB
export function removeCollection(collectionName, query) {
  return new Promise((resolve, reject) => {
    let collection = Meteor.allCollections[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Collection ${collectionName} is not found`);
    }
    let result = collection.remove(query);
    resolve(result);
  });
}
// update DB
export function updateCollection(collectionName, query) {
  return new Promise((resolve, reject) => {
    let collection = Meteor.allCollections[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Collection ${collectionName} is not found`);
    }
    let result = collection.update(query);
    resolve(result);
  });
}