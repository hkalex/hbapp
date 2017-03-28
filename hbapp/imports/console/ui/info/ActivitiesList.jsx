import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import Activities from '/imports/db/activities';
import TableList from '/imports/console/ui/common/TableList';

export class ActivitiesList extends React.Component {

  renderTbody() {
    return this.props.activities.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/activities/edit/" + item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{item.title}</td>
        <td>{item.city}</td>
        <td>{item.address}</td>
        <td>{item.maxPeople}</td>
        <td>{item.type}</td>
        <td>{item.fromTime + "-" + item.toTime}</td>
        <td>{item.isPublished.toString()}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>活动清单</h3>
        <TableList header="Activities List"
          thead={['Action', 'Title', 'City', 'Address', 'Max People', 'Type', 'Activity Time', 'Published']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('activities');
  return {
    activities: Activities.find().fetch()
  };
}, ActivitiesList);