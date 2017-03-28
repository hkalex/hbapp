import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Setting from '/imports/db/settings';

export default class NewParam extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/settings/params/list');
      }
    }
  }

  render() {
    return (
      <div>
        <h3>新增参数</h3>
        <QF
          collection={Setting}
          type="insert"
          id="insertParam"
          hooksObject={this.hooksObject}
          />
      </div>
    );
  }
}