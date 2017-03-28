import React, { Component } from 'react';
import { Link } from 'react-router';

export default class OrderListItem extends Component {
  render() {
    const order = this.props.item;
    const title = order.DN.project ? order.DN.project.projectName : 'title empty';
    return (
      <tr>
        <td>
          <Link to={"/orders/edit/" + this.props.item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>{order.orderNum}</td>
        <td>{order.userId}</td>
        <td>{title}</td>
        <td>{order.status.status}</td>
        <td>{order.agentId}</td>
      </tr>
    );
  }
}

