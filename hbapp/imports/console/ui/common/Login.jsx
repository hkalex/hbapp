import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import logger from '/imports/loggers/logger';

import swal from 'sweetalert';
import '/node_modules/sweetalert/dist/sweetalert.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: '',
      password: ''
    }
  }

  loginUser(e) {
    e.preventDefault();

    if (this.state.phoneNum !== '18600000000') {
      swal('only admin can login');
      return false;
    }

    if (this.state.phoneNum && this.state.password) {
      Meteor.call('getUserIdForLogin', { login: this.state.phoneNum }, (error, result) => {
        error && swal(error.error.toString(), error.reason);
        if (result) {
          Meteor.loginWithPassword({ id: result }, this.state.password, (error) => {
            if (error) {
              swal(error.error.toString(), error.reason);
            } else {
              let path = this.props.location.hash.substring(1);
              path = path ? path : '/';
              browserHistory.push(path);
              // add userId to logger collection
              logger.setUserId();
            }
          });
        }
      });
    } else {
      swal('phone number or password is empty');
    }

  }

  valueChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return (
      <div className="block-center mt-xl wd-xl">
        { /* START panel */}
        <div className="panel panel-dark panel-flat">
          <div className="panel-heading text-center">
            <a href="#">
              <img src="/images/logo.png" alt="Image" className="block-center img-rounded" />
            </a>
          </div>
          <div className="panel-body">
            <p className="text-center pv">SIGN IN TO CONTINUE.</p>
            <form role="form" data-parsley-validate="" noValidate className="mb-lg">
              <div className="form-group has-feedback">
                <input id="phoneNum" type="tel"
                  placeholder="Enter Phone Number" autoComplete="off"
                  required="required" className="form-control"
                  onChange={this.valueChange.bind(this)} />
                <span className="icon-phone form-control-feedback text-muted"></span>
              </div>
              <div className="form-group has-feedback">
                <input id="password" type="password"
                  placeholder="Password" required="required"
                  className="form-control"
                  onChange={this.valueChange.bind(this)} />
                <span className="fa fa-lock form-control-feedback text-muted"></span>
              </div>

              <button type="submit"
                className="btn btn-block btn-primary mt-lg"
                onClick={this.loginUser.bind(this)}>Login</button>
            </form>
          </div>
        </div>
        { /* END panel */}
      </div>
    );
  }

}

export default Login;