import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import OffPlans from '/imports/db/offPlans';
import Lists from '/imports/db/lists';
import EditOffPlanC from '/imports/ui/me/EditOffPlan';

export class EditOffPlan extends Component {

  handleApproval() {
    const idStr = this.props.offPlan._id._str;
    const srcArr = this.props.offPlan.photos;
    Meteor.call('approval', idStr, srcArr, (error, result) => {
      if (result) {
        browserHistory.push('/offplans/list');
      }
    });
  }

  render() {
    if (!this.props.subReady) return <div></div>;
    return (
      <div>
        <h3>修改二手楼花</h3>
        <EditOffPlanC lists={this.props.lists} offPlan={this.props.offPlan} />
        <button onClick={this.handleApproval.bind(this)}>审核</button>
      </div>
    );
  }
}

export default createContainer((props) => {
  const offPlansSub = Meteor.subscribe('offPlans');
  const offPlanId = props.params._id;
  const offPlan = OffPlans.findOne({ "_id": OffPlans.ObjectID(offPlanId) });

  const listsSub = Meteor.subscribe('lists');
  const rawLists = Lists.find().fetch() || [];
  let listObject = {};
  rawLists.forEach((list) => {
    listObject[list.code] = list;
  });

  return {
    subReady: offPlansSub.ready() && listsSub.ready(),
    lists: listObject,
    offPlan: offPlan
  };
}, EditOffPlan);