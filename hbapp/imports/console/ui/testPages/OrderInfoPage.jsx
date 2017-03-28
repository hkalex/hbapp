import React, { Component } from 'react';

import QF from '/imports/ui/common/QF';
import Orders from '/imports/db/orders';

export default class OrderInfoPage extends Component {
  render() {
    return (
      <div className="content">
        <QF
          collection={Orders}
          type="insert"
          id="insertOrderInfo"
          />
      </div>
    );
  }
}