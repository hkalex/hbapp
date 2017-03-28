import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import Sublets from '/imports/db/sublets';
import SubletDetail from '/imports/ui/rent/SubletDetail';

export class ApprovalSublet extends React.Component {

  handleApproval() {
    Meteor.call('subletApproval', this.props.sublet, (error, result) => {
      if (!error) {
        browserHistory.push('/sublet/list');
      }
    });
  }

  render() {
    if (!this.props.subReady) { return <div></div> }
    return (
      <div>
        <SubletDetail subletForm={this.props.sublet} />
        <div className="container">
          <div className="row">
            <button className="btn btn-danger btn-outline" onClick={this.handleApproval.bind(this)}>审核</button>
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer((props) => {
  // const sub = Meteor.subscribe('oneSublet', props.params.id);
  const sub = Meteor.subscribe('sublets');
  return {
    subReady: sub.ready(),
    sublet: Sublets.findOne({ _id: Sublets.ObjectID(props.params.id) })
  };
}, ApprovalSublet);