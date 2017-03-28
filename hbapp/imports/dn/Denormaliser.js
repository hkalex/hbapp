import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import SchemaBase from '/imports/db/SchemaBase';
import resolveObjectID from '/imports/utils/resolveObjectID';
import DN from '/imports/dn/';

function internalDenormalise(relationships, doc, resolve, reject) {
  if (!doc.DN) {
    doc.DN = {};
  }

  Promise.all(Object.keys(relationships).map(function (key, index) {
    let relationship = relationships[key];
    return internalDenormaliseOne(key, relationship, doc);
  })).done(function () {
    resolve && resolve(doc);
  }, function (err) {
    reject && reject(err);
  });
}

function internalDenormaliseOne(key, relationship, doc) {
  return new Promise((resolve, reject) => {
    let childFieldName = key;
    let parentCollectionName = relationship.parent.collection;
    let parentFieldName = relationship.parent.field || "_id";

    let childFieldValue = doc[childFieldName];

    let collection = Meteor.allCollections[parentCollectionName];

    // construct the filterObject
    let filterObject = {};
    filterObject[parentFieldName] = resolveObjectID(childFieldValue);

    findOne(collection, filterObject)
    .then(function(parent) {
      fillDN(relationship, doc, parent);
      resolve();
    });
  });
}





function resolveExpression(expr) {
  if (expr instanceof DN.Expression) {
    return new Function('doc', 'ref', 'def', 'ObjectID', 'return ' + expr.getExpression());
  } else {
    return new Function('doc', 'ref', 'def', 'ObjectID', 'return ' + expr);
  }
}

function findOne(collection, filter) {
  return new Promise((resolve, reject) => {
    let result = collection.findOne(filter);
    resolve(result);
  });
}


function fillDN(relationship, doc, parent) {
  if (!parent) return;
  if (!relationship.dn) return;

  for (let key in relationship.dn) {
    let childDN = {};
    for(let field in relationship.dn[key]) {
      let fieldDef = relationship.dn[key][field];
      if (fieldDef instanceof DN.Expression) {
        let resolver = resolveExpression(fieldDef.getExpression());
        childDN[field] = resolver(doc, parent, relationship, resolveObjectID);
      } else if (typeof fieldDef === 'string') {
        childDN[field] = parent[fieldDef];
      } else if (typeof fieldDef === 'boolean' || typeof fieldDef === 'number') {
        if (fieldDef) {
          childDN[field] = parent[field];
        }
      }
    }
    doc.DN[key] = childDN;
  }
}




export default class Denormaliser {
  constructor(schemaBase) {
    check(schemaBase, SchemaBase);
    this._schemaBase = schemaBase
  }

  denormalise(doc) {
    if (!doc) {
      throw new Meteor.Error("Denormaliser: doc cannot be null");
    }

    let relationships = this._schemaBase.getRelationships();
    if (!relationships) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      internalDenormalise(relationships, doc, resolve, reject);
    });
  }
}
