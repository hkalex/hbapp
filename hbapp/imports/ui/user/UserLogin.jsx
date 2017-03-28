import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import Store from '../../stores/store';
import { TextField, Paper, RaisedButton } from 'material-ui';
import { FlatButton, FontIcon } from 'material-ui';
import { Link } from 'react-router';
import loginWithWechat from '/imports/intg/wechat';
import LoadSpinner from '/imports/ui/utils/LoadSpinner';

// import logger from '/imports/loggers/logger';

// style json
import JsonStyle from './user.json';
import Styler from '/imports/utils/Styler.js';
// Actions
import { userLogin } from '../../actions/user/userLogin';

export default class UserLogin extends Component {

  render() {
    const UserLoginPage = connect()(Login);
    return (
      <Provider store={Store}>
        <div className='user-login-container'>
          <UserLoginPage {...this.props} />
        </div>
      </Provider>

    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      noMoreData: false,
    };
    this.page = new Styler(JsonStyle);
  }

  componentDidMount() {
    this.refs.item.focus();
  }

  loginUser(e) {
    this.props.dispatch(userLogin({
      login: this.state.login,
      password: this.state.password
    }));
    e.preventDefault();
  }

  onPhoneChange(e) {
    let newState = {};
    if (e.target.value.length > 11)
      e.target.value = e.target.value.slice(0, 11);
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  onPwdChange(e) {
    let newState = {};
    if (e.target.value.length > 15)
      e.target.value = e.target.value.slice(0, 15);
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  wechatLogin() {
    this.setState({
      noMoreData: true
    })
    loginWithWechat(this.props.dispatch);
  }

  render() {
    if (this.state.noMoreData) return <LoadSpinner noMoreData={!this.state.noMoreData} />;

    const phoneNumCheck = /^0?1[3|4|5|8][0-9]\d{8}$/;
    let phoneNumError = !phoneNumCheck.test(this.state.login);
    if (this.state.login === '') phoneNumError = false;
    const phoneNumErrorText = phoneNumError ? "请输入正确的手机号码" : "";

    const passwordCheck = new RegExp(Meteor.settings.public.PIN_CHECK_NUMBER);
    let passwordError = !passwordCheck.test(this.state.password);
    if (this.state.password === '') passwordError = false;
    const passwordErrorText = passwordError ? "密码至少8位数字" : "";

    const usernameField =
      <div className="row">
        <div className="col-xs-12">
          <TextField
            type='number'
            pattern="[0-9]*"
            tabIndex="1"
            id="login"
            ref="item"
            className="textField"
            onChange={this.onPhoneChange.bind(this)}
            value={this.state.login}
            errorText={phoneNumErrorText}
            hintText="请输入手机号码"
            fullWidth={true}
          />
        </div>
      </div>;

    const passwordField =
      <div className="row">
        <div className="col-xs-12">
          <TextField
            tabIndex="2"
            type='tel'
            pattern="[0-9]*"
            id="password"
            className="textField"
            onChange={this.onPwdChange.bind(this)}
            value={this.state.password}
            errorText={passwordErrorText}
            hintText="请输入密码"
            fullWidth={true}
            {...this.page.style("textField") }
            inputStyle={{
              WebkitTextSecurity: 'disc',
              textSecurity: 'disc',
            }}
          />
        </div>
      </div>;

    var oldButton = <RaisedButton
            className="loginButton"
            label="确定"
            onClick={this.loginUser.bind(this)}
            {...this.page.style("loginButton") }
          />;


    return (
      <div>

        <form onSubmit={this.loginUser.bind(this)} className="form container-fluid">
          {usernameField}
          {passwordField}
          
          <span className="linkReset" {...this.page.style("linkReset") }>
            <Link to="/user_password_reset"><span>忘记密码？</span></Link>
          </span>


          <div className="right-top">
            <button className="btn btn-default" type="submit">登录</button>
          </div>

        </form>
        
      </div>
    );
  }
}
