import { check } from 'meteor/check';
import StateMachine from 'javascript-state-machine';
import _ from 'lodash';
import when from 'when';

import SchemaBase from '/imports/db/SchemaBase';

export default class WorkflowFactory {
  constructor(schema, definition) {
    check(schema, SchemaBase);
    check(definition, Object);

    this._schema = schema;
    this._def = definition;

  }

  buildWorkflowEngine(doc) {
    let currentState = doc && doc.WF && doc.WF.state ? doc.WF.state :
      typeof this._def.initial === 'string' ? this._def.initial :
        this._def.initial ? this.def.initial.state : 'none';

    let mergedDef = Object.assign(this._def, { initial: currentState });

    let stateMachine = StateMachine.create(mergedDef);

    return new WorkflowEngine(doc, this._schema, this._def, stateMachine);
  }
}

class WorkflowEngine {
  constructor(doc, schema, definition, stateMachine) {
    check(schema, SchemaBase);
    check(definition, Object);
    check(definition.events, Array);

    this._schema = schema;
    this._doc = doc;
    this._def = definition;
    this._stateMachine = stateMachine;

    this._handlers = {
      beforeEvent: [],
      leaveState: [],
      enterState: [],
      afterEvent: []
    };

    Object.assign(this._stateMachine, this);
    Object.assign(this._stateMachine, WorkflowEngine.prototype);

    this._stateMachine.onbeforeevent = this._onbeforeevent;
    this._stateMachine.onenterstate = this._onenterstate;
    this._stateMachine.onleavestate = this._onleavestate;
    this._stateMachine.onafterevent = this._onafterevent;
    //this._stateMachine._callEnterStateOrLeaveState = this._callEnterStateOrLeaveState;
    //this._stateMachine._handlers = this._handlers;
  }

  _getDeferredFromArgs(args) {
    if (!args || !args.length) return null;
    for(var i=0, l=args.length; i<l; i++) {
      if (args[i] && when.isPromiseLike(args[i].promise)) {
        return args[i];
      }
    }
  }

  _onbeforeevent(...args) {
    let events = this._handlers.beforeEvent;
    for(let i=0; i<events.length; i++) {
      let result = events[i].apply(this, args);
      if (result === false) {
        var deferred = this._getDeferredFromArgs(args);
        if (deferred) {
          deferred.reject("false returned in BeforeEvent");
        }
        return false;
      }
    }
  }

  _callEnterStateOrLeaveState(handlers, ...args) {
    var sm = this._stateMachine;
    if (handlers && handlers.length) {
      Promise.all(handlers.map(function (handler, index) {
        let handlerResult = handler.apply(this, args);
        if (handlerResult && when.isPromiseLike(handlerResult)) { // check if isPromise
          return handlerResult;
        } else {
          return Promise.resolve();
        }
      })).then(function (result) {
        // this = windows, so we are using var sm = this._stateMachine.
        return sm.transition();
      }, function(err) {
        sm._error = err;
        sm.transition.cancel();
      }).catch(function(err) {
        sm._error = err;
        sm.transition.cancel();
      })
      return StateMachine.ASYNC;
    } else {
      return true;
    }
  }


  _onleavestate(...args) {
    var handlers = this._handlers.leaveState;
    args.unshift(handlers);
    return this._callEnterStateOrLeaveState.apply(this, args);
  }

  _onenterstate(...args) {
    var handlers = this._handlers.enterState;
    args.unshift(handlers);
    return this._callEnterStateOrLeaveState.apply(this, args);
  }

  _onafterevent(...args) {
    var events = this._handlers.afterEvent;
    for(var i=0; i<events.length; i++) {
      events[i].apply(this, args);
    }

    // resolve the deferred object
    var deferred = this._getDeferredFromArgs(args);

    if (deferred) {
      if (this._stateMachine._error) {
        deferred.reject(this._stateMachine._error);
      } else {
        deferred.resolve();
      }
    }
  }

  attachBeforeEvent(handler) {
    this._handlers.beforeEvent.push(handler);
  }
  attachLeaveState(handler) {
    this._handlers.leaveState.push(handler);
  }
  attachEnterState(handler) {
    this._handlers.enterState.push(handler);
  }
  attachAfterEvent(handler) {
    this._handlers.afterEvent.push(handler);
  }

  performAction(name, ...args) {
    var deferred = when.defer(); // create a new defer every time

    args.push(deferred);
    this._stateMachine[name].apply(this._stateMachine, args);

    return deferred.promise; 
  }


  getCurrentState() {
    return this._stateMachine.current;
  }

  getPossibleActions() {
    let current = this._stateMachine.current;
    let result = [];
    for(let i=0; i<this._def.events.length; i++) {
      let event = this._def.events[i];
      if ((typeof event.from === 'string' && event.from === current) ||
          _.isArray(event.from) && event.from.includes(current)) {
        result.push(event.name);
        break;
      }
    }
    return result;
  }

}

