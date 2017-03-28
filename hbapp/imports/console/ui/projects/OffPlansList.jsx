import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import OffPlans from '/imports/db/offPlans';
import TableList from '/imports/console/ui/common/TableList';

export class OffPlansList extends React.Component {

  renderTbody() {
    return this.props.offPlans.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/offplans/edit/" + item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{item.title}</td>
        <td>{item.city}</td>
        <td>{item.expectedSettleAt.toLocaleString()}</td>
        <td>{item.isApproval ? "已审批" : "未审批"}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>二手楼花清单</h3>
        <TableList header="OffPlans List"
          thead={['Action', 'Title', 'City', 'Delivery Time', 'Approval Status']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('offPlans');
  return {
    offPlans: OffPlans.find().fetch()
  };
}, OffPlansList);