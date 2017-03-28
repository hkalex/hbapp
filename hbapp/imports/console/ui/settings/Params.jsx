import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import Setting from '/imports/db/settings';
import TableList from '/imports/console/ui/common/TableList';

export class Params extends React.Component {

  renderTbody() {
    return this.props.params.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/settings/params/edit/" + item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{item.code}</td>
        <td>{item.value}</td>
        <td>{item.toClient.toString()}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>参数管理</h3>
        <Link to="/settings/params/new">
          <button className="btn btn-success pull-right"
            style={{ "marginBottom": "20px" }}>ADD</button>
        </Link>
        <TableList header="Params Management"
          thead={['Action', 'Code', 'Value', 'ToClient']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('settings');
  return {
    params: Setting.find({}).fetch(),
  };
}, Params);