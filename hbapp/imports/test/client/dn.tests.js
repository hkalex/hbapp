import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';

import { ChildSimpleSchema, parents, childs } from '/imports/test/shared/dn/db.tests.collections';

describe('Denormal', function() {
  before(function() {
    Meteor.subscribe('parents');
    Meteor.subscribe('childs');

    Factory.define('parentA', parents, {
      string1: "string1ValueA",
      string2: "string2ValueA",
      tags: [
        "tagValue1A", "tagValue2A"
      ]
    });
    Factory.define('parentB', parents, {
      string1: "string1ValueB",
      string2: null,
      tags: [
        "tagValue1B", "tagValue2B"
      ]
    });
    Factory.define('childA', childs, {
      code: 'childACode'
    });
  });

  it('should be run in client side', function(done) {
    done();
  })

  it('should be imported correctly', function(done) {
    var dn = require('/imports/dn').default.Denormaliser;
    chai.should().exist(dn);
    done();
  });

  it('creates a new Denormaliser()', function(done) {
    var Denormaliser = require('/imports/dn').default.Denormaliser;
    var dn = new Denormaliser(ChildSimpleSchema);
    chai.should().exist(dn);
    done();
  });

  it('denormalises the parentA', function(done) {
    var parentA = Factory.create('parentA');
    var parentB = Factory.create('parentB');
    var childA = Factory.create('childA', { parentId: parentA._id });
    var Denormaliser = require('/imports/dn').default.Denormaliser;
    var dn = new Denormaliser(ChildSimpleSchema);
    dn.denormalise(childA).then(function() {

      let should = chai.should();

      should.exist(childA.DN);
      should.exist(childA.DN.parent);
      should.exist(childA.DN.parent.string1);
      should.exist(childA.DN.parent.string2Value);
      should.exist(childA.DN.parent.firstTag);
      should.exist(childA.DN.parent.tags);

      should.equal(childA.DN.parent.parentId, parentA._id);
      should.equal(childA.DN.parent.firstTag, parentA.tags[0]);
      assert.sameMembers(childA.DN.parent.tags, parentA.tags);
      should.equal(childA.DN.parent.string1, parentA.string1);
      should.equal(childA.DN.parent.string2Value, parentA.string2);

      done();
    }, function(err) {
      done(err);
    }).catch(function(err) {
      done(err);
    })
  });


  it('denormlises from parentA to parentB', function(done) {
    var parentA = Factory.create('parentA');
    var parentB = Factory.create('parentB');
    var childA = Factory.create('childA', { parentId: parentA._id });

    var Denormaliser = require('/imports/dn').default.Denormaliser;
    var dn = new Denormaliser(ChildSimpleSchema);
    dn.denormalise(childA).then(function() {
      childA.parentId = parentB._id;

      dn.denormalise(childA).then(function() {
        let should = chai.should();
        
        should.exist(childA.DN);
        should.exist(childA.DN.parent);
        should.exist(childA.DN.parent.string1);
        should.not.exist(childA.DN.parent.string2Value);
        should.exist(childA.DN.parent.firstTag);
        should.exist(childA.DN.parent.tags);

        should.equal(childA.DN.parent.parentId, parentB._id);
        should.equal(childA.DN.parent.firstTag, parentB.tags[0]);
        assert.sameMembers(childA.DN.parent.tags, parentB.tags);
        should.equal(childA.DN.parent.string1, parentB.string1);
        //should.equal(childA.DN.parent.string2Value, parentB.string2);
        done();
      }, function(err) {
        done(err);
      }).catch(function(err) {
        done(err);
      });
    }, function(err) {
      done(err);
    }).catch(function(err) {
      done(err);
    });
  });

})
