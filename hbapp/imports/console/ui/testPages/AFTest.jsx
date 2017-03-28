import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import AF from '/imports/ui/common/AF';
import Orders from '/imports/db/orders';

import DN from '/imports/dn';
// import logger from '/imports/loggers/logger';

export class EditSettings extends Component {
  constructor(props) {
    super(props);
    
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/admin/settings');
      }
    }
  }

  render() {
    return (
      <div className="content">
        <AF
          collection={Orders}
          type="insert"
          id="insertOrder"
          hooksObject={this.hooksObject}
          omitFields="statusHistory, paymentHistory, DN"
          schema={this.props.schema}
          options={this.props.options}
          subReady={this.props.subReady}
          />
      </div>
    );
  }
}

export default createContainer((params) => {
  //Meteor.subscribe('projects');
  Meteor.subscribe('allusers');

  let autoSubscriber = new DN.AutoSubscriber(Orders.rawSchema());
  let resultSet = autoSubscriber.autoSubscribe();

  // TODO auto generate the prop object based on SchemaBase
  return {
    //projects: Projects.find({}, { sort: { "title": 1 } }).fetch(),
    users: Meteor.users.find({}, { fields: { "phoneNum": 1, "username": 1 } }).fetch(),
    schema: Orders.rawSchema(),
    options: resultSet,
    subReady: autoSubscriber.ready()
  };
}, EditSettings);