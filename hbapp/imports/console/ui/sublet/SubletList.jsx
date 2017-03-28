import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import Sublets from '/imports/db/sublets';
import TableList from '/imports/console/ui/common/TableList';

export class SubletList extends React.Component {

  renderTbody() {
    return this.props.sublets.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/sublet/approval/" + item._id}>
            <button className="btn btn-success btn-xs">
              审核
            </button>
          </Link>
        </td>
        <td>{item.title}</td>
        <td>{item.address}</td>
        <td>{item.status}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>分租清单</h3>
        <TableList header="Sublets List"
          thead={['Action', 'Title', 'Address', 'Status']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('sublets');
  return {
    sublets: Sublets.find().fetch()
  };
}, SubletList);