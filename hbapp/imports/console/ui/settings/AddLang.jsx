import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Languages from '/imports/db/languages';

export default class AddLang extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/settings/langs/list');
      }
    }
  }

  render() {
    return (
      <div>
        <h3>新增语言</h3>
        <QF
          collection={Languages}
          type="insert"
          id="insertLang"
          hooksObject={this.hooksObject}
          />
      </div>
    );
  }
}