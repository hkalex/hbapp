import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import QF from '/imports/ui/common/QF';

export class EditUser extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      before: {
        insert: function (doc) {
          this.result(false);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h3>修改用户</h3>
        <QF
          collection={Meteor.users}
          type="update"
          id="updateUser"
          doc={this.props.users}
          hooksObject={this.hooksObject}
          omitFields="username, services, createdAt, roles"
          />
      </div>
    );
  }
}

export default createContainer((params) => {
  Meteor.subscribe('allusers');
  return {
    users: Meteor.users.findOne({ "_id": params.routeParams.id }),
  };
}, EditUser);