import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Lists from '/imports/db/lists';
// import logger from '/imports/loggers/logger';

export class EditList extends Component {
  constructor(props) {
    super(props);
    
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/settings/lists/list');
      }
    }
  }

  render() {
    return (
      <div>
        <h3>修改列表</h3>
        <QF
          collection={Lists}
          type="update"
          id="updateList"
          hooksObject={this.hooksObject}
          doc={this.props.list}
          />
      </div>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('lists');
  return {
    list: Lists.findOne({ "_id": Lists.ObjectID(props.routeParams.id) }),
  };
}, EditList);