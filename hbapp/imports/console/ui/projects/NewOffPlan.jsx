import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Lists from '/imports/db/lists';
import NewOffPlanC from '/imports/ui/me/NewOffPlan';

export class NewOffPlan extends Component {

  render() {
    if (!this.props.subReady) return <div></div>;
    return (
      <div>
        <h3>新增二手楼花</h3>
        <NewOffPlanC lists={this.props.lists} />
      </div>
    );
  }
}

export default createContainer((props) => {
  const subscribe = Meteor.subscribe('lists');

  const rawLists = Lists.find().fetch() || [];
  let listObject = {};
  rawLists.forEach((list) => {
    listObject[list.code] = list;
  });
  
  return {
    subReady: subscribe.ready(),
    lists: listObject
  };
}, NewOffPlan);