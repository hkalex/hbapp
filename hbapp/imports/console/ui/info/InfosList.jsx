import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import Infos from '/imports/db/infos';
import TableList from '/imports/console/ui/common/TableList';

export class InfosList extends React.Component {

  renderTbody() {
    return this.props.infos.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/infos/edit/" + item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{item.title}</td>
        <td>{item.country}</td>
        <td>{item.type}</td>
        <td>{item.date.toLocaleString()}</td>
        <td>{item.isPublished.toString()}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>资讯清单</h3>
        <TableList header="Infos List"
          thead={['Action', 'Title', 'Country', 'Type', 'Date', 'Published']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('infos');
  return {
    infos: Infos.find().fetch()
  };
}, InfosList);