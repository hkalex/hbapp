import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

export class EditUserRole extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: false,
      consultant: false,
      builder: false,
      admin: false
    }
  }

  componentWillMount() {
    if (this.props.user) {
      this.props.user.roles.map((elm) => {
        this.setState({
          [elm]: true
        });
      });
    }
  }

  changeRole(role, e) {
    this.setState({
      [role]: !this.state[role]
    });
  }

  editSubmit() {
    const rolesArr = [];
    for (let key in this.state) {
      if (this.state[key] === true) {
        rolesArr.push(key);
      }
    }
    Meteor.call('setUserRoles', this.props.params.id, rolesArr);
    browserHistory.push('/users/list');
  }

  render() {
    return (
      <div>
        <h3>修改用户权限</h3>
        <div className="container-fluid">
          <div className="col-md-12">
            <div className="card">
              <div className="card-content">

                <div className="checkbox form-control">
                  <label>
                    <input type="checkbox"
                      checked={this.state.customer}
                      onChange={this.changeRole.bind(this, 'customer')} />
                    Customer
                  </label>
                </div>

                <div className="checkbox form-control">
                  <label>
                    <input type="checkbox"
                      checked={this.state.consultant}
                      onChange={this.changeRole.bind(this, 'consultant')} />
                    Consultant
                  </label>
                </div>

                <div className="checkbox form-control">
                  <label>
                    <input type="checkbox"
                      checked={this.state.builder}
                      onChange={this.changeRole.bind(this, 'builder')} />
                    Builder
                  </label>
                </div>

                <div className="checkbox form-control">
                  <label>
                    <input type="checkbox"
                      checked={this.state.admin}
                      onChange={this.changeRole.bind(this, 'admin')} />
                    Admin
                  </label>
                </div>

              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={this.editSubmit.bind(this)}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer((params) => {
  Meteor.subscribe('allusers');
  return {
    user: Meteor.users.findOne({ "_id": params.routeParams.id })
  };
}, EditUserRole);