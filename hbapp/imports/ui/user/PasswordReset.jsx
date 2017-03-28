import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { AppBar, FlatButton, FontIcon } from 'material-ui';
import { Link } from 'react-router';
import { TextField, Paper, Divider, RaisedButton, Checkbox } from 'material-ui';
import logger from '/imports/loggers/logger';

// Constants
import C, { STYLE } from '../../consts/Constants';
// style json
import JsonStyle from './user.json';
import Styler from '/imports/utils/Styler.js';
// actions
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';
import { passwordResetDialogAction } from '/imports/actions/utils/dialogAction';


class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: '',
      verificationCode: '',
      password: '',
      verificationPassword: '',
      count: 60,
      isSendingCode: false,
    }
    this.page = new Styler(JsonStyle);
  }

  getVerificationCode(e) {
    let that = this;
    if (!this.state.isSendingCode) {
      Meteor.call('passwordResetGetCode', this.state.phoneNum, (err, result) => {
        if (err) {
          that.props.dispatch(simpleSnackbarAction({
            message: '您的 用户名/手机号 不存在, 请重新输入'
          }));
        } else {
          this.timer = setInterval(function () {
            let count = this.state.count;
            that.setState({ isSendingCode: true });
            count -= 1;

            // reset condition
            if (count < 1) {
              that.setState({
                isSendingCode: false
              })
              count = 60;
              clearInterval(this.timer);
            }
            this.setState({
              count,
            })
          }.bind(this), 1000);
        }
      });
    }
  }


  resetPassword(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.setState({
      isSendingCode: false
    })

    Meteor.call('SMS.verifyCode', this.state.verificationCode, this.state.phoneNum, function (error, result) {
      // error && logger.log(error);
      result && logger.log(result);

      if (error) {
        // TODO: handle errors           
        this.props.dispatch(simpleSnackbarAction({
          message: error.reason
        }));
      } else {
        // if verificationCode is correctly. reset password.
        Meteor.call("passwordReset", { login: this.state.phoneNum, password: this.state.password }, (err, result) => {
          if (err) {
            // Normall this won't go wrong.
          } else {
            this.props.dispatch(passwordResetDialogAction({
              message: "密码修改成功，请重新登录",
            }));

          }
        });
      }
    }.bind(this));

  }

  componentDidMount() {
    this.refs.item.focus();
  }

  onInputChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
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



  render() {
    const text = !this.state.isSendingCode ? '发送验证码' : this.state.count + '秒后重发';

    const phoneNumCheck = /^0?1[3|4|5|8][0-9]\d{8}$/;
    let phoneNumError = !phoneNumCheck.test(this.state.phoneNum);
    if (this.state.phoneNum === '') phoneNumError = false;
    const phoneNumErrorText = phoneNumError ? "请输入正确的手机号码" : "";

    const passwordCheck = new RegExp(Meteor.settings.public.PIN_CHECK_NUMBER);
    let passwordError = !passwordCheck.test(this.state.password);
    if (this.state.password === '') passwordError = false;
    const passwordErrorText = passwordError ? "密码至少8位数字" : "";

    const verificationPasswordCode = new RegExp(Meteor.settings.public.PIN_CHECK_NUMBER);
    let verificationPasswordCodeError = (this.state.verificationPassword == this.state.password ? false : true);
    if (this.state.verificationPassword === '' && verificationPasswordCodeError) verificationPasswordCodeError = false;
    const verificationPasswordCodeErrorText = verificationPasswordCodeError ? "密码不一致，请重新输入" : "";

    const verificationCodeCheck = /^([0-9]{6})$/;
    let verificationCodeError = !verificationCodeCheck.test(this.state.verificationCode);
    if (this.state.verificationCode === '') verificationCodeError = false;
    const verificationCodeErrorText = verificationCodeError ? "请输入6位验证码" : "";


    const phoneNumField =
      <div className="row">
        <div className="col-xs-8">
          <TextField
            autoFocus
            tabIndex="1"
            id="phoneNum"
            type='number'
            ref="item"
            pattern="[0-9]*"
            onChange={this.onPhoneChange.bind(this)}
            value={this.state.phoneNum}
            errorText={phoneNumErrorText}
            hintText="请输入手机号码"
            autoComplete="off"
            fullWidth={true}
            {...this.page.style("full-width")}
          />
        </div>
        <div className="col-xs-4">
          <button type="button" className="btn btn-default padding-0"
            {...this.page.style("usernew-smsbutton")}
            disabled={this.state.phoneNum === '' ? true : (text == this.state.count + "秒后重发" ? true : phoneNumError)}
            onClick={this.getVerificationCode.bind(this)}
          >{text}</button>
        </div>
      </div>;

    const verificationCodeField =
      <div className="row">
        <div className="col-xs-12">
          <TextField
            tabIndex="2"
            type='number'
            pattern="[0-9]*"
            id="verificationCode"
            className="textField"
            onChange={this.onInputChange.bind(this)}
            value={this.state.verificationCode}
            errorText={verificationCodeErrorText}
            hintText="请输入验证码"
            fullWidth={true}
            {...this.page.style("textField") } />
        </div>
      </div>;

    const passwordField =
      <div className="row">
        <div className="col-xs-12">
          <TextField
            tabIndex="3"
            pattern="[0-9]*"
            id="password"
            className="textField"
            type="tel"
            onChange={this.onPwdChange.bind(this)}
            value={this.state.password}
            errorText={passwordErrorText}
            hintText="请输入新的数字密码"
            fullWidth={true}
            {...this.page.style("textField") }
            inputStyle={{
              WebkitTextSecurity: 'disc',
              textSecurity: 'disc',
            }}
          />
        </div>
      </div>;

    const verificationPasswordField =
      <div className="row">
        <div className="col-xs-12">
        <TextField
          tabIndex="4"
          pattern="[0-9]*"
          id="verificationPassword"
          className="textField"
          type="tel"
          onChange={this.onPwdChange.bind(this)}
          value={this.state.verificationPassword}
          errorText={verificationPasswordCodeErrorText}
          hintText="请再次输入密码"
          fullWidth={true}
          {...this.page.style("textField") }
          inputStyle={{
            WebkitTextSecurity: 'disc',
            textSecurity: 'disc',
          }} />
        </div>
      </div>;

    return (
      <form onSubmit={this.resetPassword.bind(this)} className="form container-fluid">
          {phoneNumField}

          {verificationCodeField}

          {passwordField}

          {verificationPasswordField}

          <div className="right-top">
            <button className="btn btn-default" type="submit">重置密码</button>
          </div>
        </form>
    )
  }
}

export default connect()(PasswordReset);