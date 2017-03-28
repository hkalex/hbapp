import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Orders from '/imports/db/orders';
import OrderListItem from './OrderListItem';
import TableList from '/imports/console/ui/common/TableList';

export class OrderList extends React.Component {

  renderTbody() {
    return this.props.orders.map((item) => {
      return <OrderListItem key={item._id} item={item} />;
    });
  }

  render() {
    return (
      <div>
        <h3>订单清单</h3>
        <TableList header="Orders List"
          thead={['Action', 'Order Number', 'User ID', 'Property Title', 'Status', 'Agent ID']}
          renderTbody={this.renderTbody.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('orders');
  return {
    orders: Orders.find({}).fetch(),
  };
}, OrderList);