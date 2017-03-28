import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Setting from '/imports/db/settings';

export class EditParam extends Component {
  constructor(props) {
    super(props);
    
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/settings/params/list');
      }
    }
  }

  render() {
    return (
      <div>
        <h3>修改参数</h3>
        <QF
          collection={Setting}
          type="update"
          id="updateParam"
          hooksObject={this.hooksObject}
          doc={this.props.param}
          />
      </div>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('settings');
  return {
    param: Setting.findOne({ "_id": Setting.ObjectID(props.routeParams.id) }),
  };
}, EditParam);