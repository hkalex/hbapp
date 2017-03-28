import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import Languages from '/imports/db/languages';
import TableList from '/imports/console/ui/common/TableList';

export class Langs extends React.Component {

  renderTbody() {
    return this.props.langs.map((item) => {
      return <tr key={item._id}>
        <td>
          <Link to={"/settings/langs/edit/" + item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{item.langName}</td>
        <td>{item.langTag}</td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h3>语言管理</h3>
        <Link to="/settings/langs/new">
          <button className="btn btn-success pull-right"
            style={{ "marginBottom": "20px" }}>ADD</button>
        </Link>
        <TableList header="Languages Management"
          thead={['Action', 'Name', 'Tag']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('languages');
  return {
    langs: Languages.find().fetch(),
  };
}, Langs);