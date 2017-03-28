import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Orders from '/imports/db/orders';
import logger from '/imports/loggers/logger';

export class EditOrders extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/orders/list');
      },
      onError: function (err, msg) {
        logger.error(err, msg);
      }
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <h3>修改订单</h3>
        <QF
          collection={Orders}
          type="update"
          id="updateOrder"
          doc={this.props.order}
          hooksObject={this.hooksObject}
          omitFields="DN"
        />
      </div>
    );
  }
}

export default createContainer((params) => {
  Meteor.subscribe('orders');
  return {
    order: Orders.findOne({ "_id": Orders.ObjectID(params.routeParams.id) }),
  };
}, EditOrders);