import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { ChildSimpleSchema, parents } from '/imports/test/shared/dn/db.tests.collections';

describe('Denormal', function() {
  before(function() {
    Factory.define('parentA', parents, {
      string1: "string1ValueA",
      string2: "string2ValueA",
      tags: [
        "tagValue1A", "tagValue2A"
      ]
    });
    Factory.define('parentB', parents, {
      string1: "string1ValueB",
      string2: "string2ValueB",
      tags: [
        "tagValue1B", "tagValue2B"
      ]
    });
  });

  it('should be imported correctly', function(done) {
    Factory.create('parentA');
    //Factory.create('parentB');
    var dn = require('/imports/dn').default.Denormaliser;
    chai.should().exist(dn);
    done();
  });

  it('new Denormaliser() has no problem', function(done) {
    var Denormaliser = require('/imports/dn').default.Denormaliser;
    var dn = new Denormaliser(ChildSimpleSchema);
    chai.should().exist(dn);
    done();
  });

  it('should be run on server side', function(done) {
    done();
  })
})
