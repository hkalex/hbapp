import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import _ from 'lodash';

import SchemaBase from '/imports/db/SchemaBase';

export default class RelationshipSubscriber {
  constructor(schemaBase) {
    check(schemaBase, SchemaBase);
    this._schameBase = schemaBase;
    this._relationships = schemaBase.getRelationships();

    this._subscriptions = [];
    this._resultSet = {};
  }

  autoSubscribe() {
    for (let childField in this._relationships) {
      let relationship = this._relationships[childField];

      if (!relationship) continue;
      if (!relationship.parent) continue;

      let autoForm = relationship.parent.autoform;
      let subscription = autoForm && autoForm.subscription ? autoForm.subscription : relationship.parent.collection;
      let labelField = autoForm && autoForm.label ? autoForm.label : relationship.parent.field;
      let valueField = relationship.parent.field;

      let filter = autoForm && autoForm.filter ? autoForm.filter : {}; // must be empty object, NULL will returns nothing
      if (_.isFunction(filter)) {
        filter = filter();
      }
      if (!filter) {
        filter = {};
      }

      let sorter = autoForm && autoForm.sorter ? autoForm.sorter : {}; // must be empty object
      if (_.isFunction(sorter)) {
        sorter = sorter();
      }

      
      if (!sorter) {
        sorter = {};
        sorter[labelField] = 1;
      }

      let fields = {}
      fields[labelField] = 1;
      if (valueField !== labelField) {
        fields[valueField] = 1;
      }

      let findOptions = {
        fields,
        sort: sorter
      }

      // subscribe
      this._subscriptions.push(Meteor.subscribe(subscription, filter, findOptions));

      // collections
      if (relationship.parent.collection === 'users'
        || relationship.parent.collection === 'roles') {
        this._resultSet[childField] = Meteor[relationship.parent.collection].find(filter, findOptions);
      } else { 
        this._resultSet[childField] = Meteor.allCollections[relationship.parent.collection].find(filter, findOptions);
      }
    }

    return this._resultSet;
  }

  ready() {
    var result = true;
    this._subscriptions.forEach(function (ele, i) {
      result = result && ele.ready();
      if (!result) return false;
      return true;
    });
    return result;
  }

  stop() {
    this._subscriptions.forEach(function (ele, i) {
      ele.stop();
    });
  }

}