import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import swal from 'sweetalert';

export default class NewRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  newRoleSubmit(e) {
    e.preventDefault();
    if(this.state.name === ''){
      swal('name is empty');
      return false;
    }
    Meteor.call('createRole', this.state.name);
    browserHistory.push('/roles/list');
  }

  nameChange(e) {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div>
        <h3>新增角色</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.newRoleSubmit.bind(this)}>
                <div className="card">
                  <div className="card-content">
                    <div className="form-group">
                      <label className="control-label">Title</label>
                      <input type="text" className="form-control" onChange={this.nameChange.bind(this)} />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary" onClick={this.newRoleSubmit.bind(this)}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}