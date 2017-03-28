import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Lists from '/imports/db/lists';

export default class NewList extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/settings/lists/list');
      }
    }
  }

  render() {
    return (
      <div>
        <h3>新增列表</h3>
        <QF
          collection={Lists}
          type="insert"
          id="insertList"
          hooksObject={this.hooksObject}
          />
      </div>
    );
  }
}