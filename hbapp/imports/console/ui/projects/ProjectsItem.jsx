import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ProjectsItem extends Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={"/projects/edit/" + this.props.item._id}>
            <button className="btn btn-success btn-xs">
              <em className="fa fa-edit"></em>
            </button>
          </Link>
        </td>
        <td>
          <img className="media-box-object img-responsive img-rounded"
            style={{ "maxWidth": "200px" }}
            src={this.props.item.photos[0].cdnUrl || this.props.item.photos[0].url} />
        </td>
        <td>{this.props.item.title}</td>
        <td>{this.props.item.country + ": " + this.props.item.city}</td>
        <td>{this.props.item.fromPrice.amount + "-" + this.props.item.toPrice.amount}</td>
        <td>{this.props.item.status}</td>
        <td>{this.props.item.isPublished.toString()}</td>
      </tr>
    );
  }
}