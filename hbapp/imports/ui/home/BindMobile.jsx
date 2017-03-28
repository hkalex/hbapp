import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Accounts } from 'meteor/accounts-base';
import { AppBar, FlatButton, FontIcon } from 'material-ui';
import { Link } from 'react-router';
import { TextField, Paper, Divider, RaisedButton, Checkbox } from 'material-ui';
import logger from '/imports/loggers/logger';

// style json
import JsonStyle from '../user/user.json';
import Styler from '/imports/utils/Styler.js';

// actions
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';
import { userLogout } from '/imports/actions/user/userLogout';

// import { passwordResetDialogAction } from '/imports/actions/utils/dialogAction';


class BindMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNum: '',
      verificationCode: '',
      count: 60,
      isSendingCode: false,
    }
    this.page = new Styler(JsonStyle);
  }

  getVerificationCode(e) {
    let that = this;
    if (!this.state.isSendingCode) {
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

    Meteor.call('SMS.sendCode', this.state.phoneNum, function (error, result) {
      error && logger.log(error);
      result && logger.log(result);

    });
  }

  componentDidMount() {
    this.refs.item.focus();
  }


  onPhoneChange(e) {
    let newState = {};
    if (e.target.value.length > 11)
      e.target.value = e.target.value.slice(0, 11);
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  onInputChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  login() {
    Meteor.call("addPhoneNumber", this.state.phoneNum, function (error, result) {
      if (result) {
        // console.log(result);
        browserHistory.push('/home');
      }
    });
  }

  logout() {
    this.props.dispatch(userLogout());
  }

  render() {
    const text = !this.state.isSendingCode ? '发送验证码' : this.state.count + '秒后重发';

    const phoneNumCheck = /^0?1[3|4|5|8][0-9]\d{8}$/;
    let phoneNumError = !phoneNumCheck.test(this.state.phoneNum);
    if (this.state.phoneNum === '') phoneNumError = false;
    const phoneNumErrorText = phoneNumError ? "请输入正确的手机号码" : "";


    const verificationCodeCheck = /^([0-9]{6})$/;
    let verificationCodeError = !verificationCodeCheck.test(this.state.verificationCode);
    if (this.state.verificationCode === '') verificationCodeError = false;
    const verificationCodeErrorText = verificationCodeError ? "请输入6位验证码" : "";

    const phoneNumField =
      <div className="box" {...this.page.style("box") }>
        <TextField
          tabIndex="1"
          id="phoneNum"
          type='number'
          ref="item"
          pattern="[0-9]*"
          className="textField"
          onChange={this.onPhoneChange.bind(this)}
          value={this.state.phoneNum}
          errorText={phoneNumErrorText}
          hintText="请输入手机号码"
          {...this.page.style("textField") }>
        </TextField>
        <RaisedButton
          className="requestBtn"
          label={text}
          primary={false}
          {...this.page.style("requestBtn") }
          disabled={this.state.phoneNum === '' ? true : (text == this.state.count + "秒后重发" ? true : phoneNumError)}
          onClick={this.getVerificationCode.bind(this)}
        />
      </div>;

    const verificationCodeField =
      <div className="divField" {...this.page.style("divField") }>
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
          {...this.page.style("textField") }>
        </TextField>
      </div>;

    let page =
      <Paper className="paper" {...this.page.style("paper") }>
        <form onSubmit={this.login.bind(this)}>
          {phoneNumField}

          {verificationCodeField}

          <RaisedButton
            label="确认"
            className="bindButton"
            onClick={this.login.bind(this)}
            {...this.page.style("loginButton") }
          />

          <input type="submit" className="hiddenIpt" {...this.page.style("hiddenIpt") } />

        </form>

      </Paper>;

    return (
      <div>
        <FlatButton
          className="ABButton"
          {...this.page.style("ABButton") }
          icon={<FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />}
          onClick={this.logout.bind(this)} />
        <AppBar
          title="绑定手机号"
          className="appBar"
          {...this.page.style("appBar") }>
        </AppBar>
        {page}
      </div>
    )
  }
}

export default connect()(BindMobile);