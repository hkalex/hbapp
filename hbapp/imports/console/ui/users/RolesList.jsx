import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import TableList from '/imports/console/ui/common/TableList';

export class RolesList extends React.Component {

  renderTbody() {
    return this.props.roles.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/roles/edit/" + item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{item._id}</td>
        <td>{item.name}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>角色清单</h3>
        <TableList header="Roles List"
          thead={['Action', 'Id', 'Name']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('roles');
  return {
    roles: Meteor.roles.find().fetch()
  };
}, RolesList);