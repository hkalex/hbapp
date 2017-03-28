import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';

import { ParentSimpleSchema, ChildSimpleSchema, parents, childs } from '/imports/test/shared/dn/db.tests.collections';
import readAsDom from '/imports/utils/readAsDom';


describe('readAsDom', function() {
  before(function() {
    Meteor.subscribe('Activities')
  });

});