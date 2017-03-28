import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// import { browserHistory } from 'react-router';

import swal from 'sweetalert';

export class EditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentWillMount() {
    if(this.props.role){
      this.setState({name: this.props.role.name});
    }
  }

  editRoleSubmit(e) {
    e.preventDefault();
    if(this.state.name === ''){
      swal('name is empty');
      return false;
    }
    // Meteor.call('createRole', this.state.name);
    // browserHistory.push('/roles/list');
    // TODO: edit role
    // console.log(this.state.name);
  }

  nameChange(e) {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div>
        <h3>修改角色</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.editRoleSubmit.bind(this)}>
                <div className="card">
                  <div className="card-content">
                    <div className="form-group">
                      <label className="control-label">Title</label>
                      <input type="text" className="form-control" value={this.state.name} onChange={this.nameChange.bind(this)} />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary" onClick={this.editRoleSubmit.bind(this)}>
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

export default createContainer((params) => {
  Meteor.subscribe('roles');
  return {
    role: Meteor.roles.findOne({ "_id": params.routeParams.id }),
  };
}, EditRole);