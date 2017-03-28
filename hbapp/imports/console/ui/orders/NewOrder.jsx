import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import QF from '/imports/ui/common/QF';
import Orders from '/imports/db/orders';
import Projects from '/imports/db/projects';
import logger from '/imports/loggers/logger';

export class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      onSuccess: function (formType, result) {
        // resutl is ObjectId 
        Meteor.call('orderSetupAfterCreate', result, (err, val) => {
          if (err) logger.log(err);
          if (val) logger.log(val);
        });
        browserHistory.push('/orders/list');
      },
      onError: function (err, msg) {
        logger.log(err, msg);
      }
    }
  }

  render() {
    return (
      <div>
        <h3>新增订单</h3>
        <QF
          collection={Orders}
          type="insert"
          id="insertOrder"
          hooksObject={this.hooksObject}
          omitFields="statusHistory, paymentHistory, DN"
        />
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('projects');
  Meteor.subscribe('allusers');
  return {
    projects: Projects.find({}, { sort: { "title": 1 } }).fetch(),
    users: Meteor.users.find({}, { sort: { "phoneNum": 1, "username": 1 } }).fetch()
  };
}, NewOrder);