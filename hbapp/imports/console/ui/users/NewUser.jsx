import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Chance from 'chance';

import QF from '/imports/ui/common/QF';
import swal from 'sweetalert';

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      before: {
        insert: function (doc) {
          if (!(/^1[3|4|5|7|8]\d{9}$/.test(doc.phoneNum))) {
            swal("Invalid phone number");
            return false;
          }
          const userInfo = {};
          const chance = new Chance();
          userInfo.username = chance.hash();
          userInfo.phoneNum = doc.phoneNum;
          userInfo.password = doc.phoneNum;

          Meteor.call('createNewUser', userInfo, (error, result) => {
            error && swal(error.error.toString(), error.reason);
            result && browserHistory.push('/users/list');
          });

          this.result(false);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h3>新增用户</h3>
        <QF
          collection={Meteor.users}
          type="insert"
          id="insertUser"
          hooksObject={this.hooksObject}
          omitFields="username, services, createdAt, roles"
          />
      </div>
    );
  }
}