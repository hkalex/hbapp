import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';

import WorkflowFactory from '/imports/wf/WorkflowFactory';

import { ChildSimpleSchema, parents, childs } from '/imports/test/shared/dn/db.tests.collections';

let should = chai.should();

let trafficLightsWorkflow = {
  initial: 'red',
  events: [
    {name: "startup", from: 'none', to: 'red'},
    {name: 'ready', from: 'red', to: 'yellow'},
    {name: 'go', from: 'yellow', to: 'green'},
    {name: 'stopping', from: 'green', to: 'yellow'},
    {name: 'stop', from: 'yellow', to: 'red'},
    {name: 'repair', from: '*', to: 'none'}
  ]
}

describe('Workflow', function() {
  before(function() {
    
  });

  it('should new instance', function(done) {
    new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    done();
  });

  it('should create a new WorkflowEngine', function(done) {
    let factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    let engine = factory.buildWorkflowEngine();
    
    should.equal(engine.getCurrentState(), 'red');

    done();
  });


  it('should move to next state', function(done) {
    let factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    let engine = factory.buildWorkflowEngine();
    should.equal(engine.getCurrentState(), 'red');
    var p = engine.performAction("ready")
    p.then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      done();
    });
  });

  it('should move to next state continously', function(done) {
    let factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    let engine = factory.buildWorkflowEngine();
    should.equal(engine.getCurrentState(), 'red');
    engine.performAction("ready").then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("go");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'green');
      return engine.performAction("stopping");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("stop");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'red');
      return engine.performAction("ready");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("go");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'green');
      done();
    });
  });

  it('should be repaired anytime and then resumed', function(done) {
    let factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    let engine = factory.buildWorkflowEngine();

    should.equal(engine.getCurrentState(), 'red');
    engine.performAction("ready").then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("go");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'green');

      // repair
      return engine.performAction("repair");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'none');

      // resume
      return engine.performAction("startup");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'red');
      return engine.performAction("ready");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("go");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'green');
      done();
    });
  });

  it('should attach beforeEvent', function(done) {
    var factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    var engine = factory.buildWorkflowEngine();

    var eventCounter = 0;
    engine.attachBeforeEvent(function() {
      eventCounter++;
    });

    engine.performAction("ready").then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("go");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'green');
      should.equal(eventCounter, 2);
      done();
    });
  });

  it('should attach afterEvent', function(done) {
    var factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    var engine = factory.buildWorkflowEngine();

    var eventCounter = 0;
    engine.attachAfterEvent(function() {
      eventCounter++;
    });

    engine.performAction("ready").then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("go");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'green');
      should.equal(eventCounter, 2);
      done();
    });
  });

  it('should attach leaveState', function(done) {
    var factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    var engine = factory.buildWorkflowEngine();

    var eventCounter = 0;
    engine.attachLeaveState(function() {
      eventCounter++;
    });

    engine.performAction("ready").then(function() {
      should.equal(engine.getCurrentState(), 'yellow');
      return engine.performAction("go");
    }).then(function() {
      should.equal(engine.getCurrentState(), 'green');
      should.equal(eventCounter, 2);
      done();
    });
  });

  it('should attach leaveState returning Promise', function(done) {
    var factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    var engine = factory.buildWorkflowEngine();

    var eventCounter = 0;

    should.equal(engine.getCurrentState(), 'red');

    engine.attachLeaveState(function() {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          eventCounter++;
          resolve();
        }, 100);
      });
    });

    engine.attachLeaveState(function() {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          eventCounter++;
          resolve();
        }, 500);
      })
    });

    engine.performAction("ready").then(function() {
      should.equal(eventCounter, 2);
      should.equal(engine.getCurrentState(), 'yellow');
      done();
    });

  });

  it('should attach leaveState returning rejected Promise', function(done) {
    var factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    var engine = factory.buildWorkflowEngine();

    var eventCounter = 0;

    should.equal(engine.getCurrentState(), 'red');

    engine.attachLeaveState(function() {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          eventCounter++;
          reject("TEST ERROR");
        }, 100);
      });
    });

    engine.attachLeaveState(function() {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          eventCounter++;
          resolve();
        }, 500);
      })
    });

    engine.performAction("ready").then(function() {
      throw "Should Not Reach Here!!";
    }, function(err) {
      should.equal(err, "TEST ERROR");
      done(); // done without error
    }).catch(function(err) {
      throw "Should Not Reach Here!!";
    });

  });


  it('should stop in BeforeEvent', function(done) {
    var factory = new WorkflowFactory(ChildSimpleSchema, trafficLightsWorkflow);
    var engine = factory.buildWorkflowEngine();

    should.equal(engine.getCurrentState(), 'red');

    engine.attachBeforeEvent(function() {
      return false; // inform the WorkflowEngine to stop the transition
    });

    engine.performAction("ready").then(function(result) {
      throw "Should Not Reach Here!!";
    }, function(err) {
      should.equal(engine.getCurrentState(), 'red');
      done();
    }).catch(function(err) {
      throw "Should Not Reach Here!!";
    });

  });


});
