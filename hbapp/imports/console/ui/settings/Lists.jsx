import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import ListsC from '/imports/db/lists';
import TableList from '/imports/console/ui/common/TableList';

export class Lists extends React.Component {

  renderTbody() {
    return this.props.lists.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/settings/lists/edit/" + item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{item.title}</td>
        <td>{item.code}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>列表管理</h3>
        <Link to="/settings/lists/new">
          <button className="btn btn-success pull-right"
            style={{ "marginBottom": "20px" }}>ADD</button>
        </Link>
        <TableList header="List Management"
          thead={['Action', 'Title', 'Code']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('lists');
  return {
    lists: ListsC.find().fetch(),
  };
}, Lists);