import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import TableList from '/imports/console/ui/common/TableList';

export class UsersList extends React.Component {

  renderTbody() {
    return this.props.allUsers.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/users/edit/" + item._id}>
            <button className="btn btn-success btn-xs" style={{"marginRight": "5px"}}>
              <em className="fa fa-edit"></em>
            </button>
          </Link>
          <Link to={"/roles/edituser/" + item._id}>
            <button className="btn btn-info btn-xs" title="权限设置">
              <em className="icon-link"></em>
            </button>
          </Link>
        </td>
        <td>
          <img src={item.profile.avatar}
            className="media-box-object img-responsive img-rounded thumb64" />
        </td>
        <td>{item.phoneNum || item.username}</td>
        <td>{item.createdAt && item.createdAt.toLocaleString()}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>用户清单</h3>
        <TableList header="Users List"
          thead={['Action', 'Avatar', 'Phone', 'CreatedAt']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('allusers');
  return {
    allUsers: Meteor.users.find({}).fetch(),
  };
}, UsersList);