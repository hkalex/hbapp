import React, { Component } from 'react';

import { TextField, Checkbox, DropDownMenu, MenuItem } from 'material-ui';
import { Meteor } from 'meteor/meteor';
import { Provider, connect } from 'react-redux';
import Store from '../../stores/store';
import logger from '../../loggers/logger';


// style json
import JsonStyle from './user.json';
import Styler from '/imports/utils/Styler.js';

// Actions
import { userRegister } from '../../actions/user/userRegister'
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';

export default class UserNew extends Component {
  render() {
    const RegisterPage = connect()(Register);
    return (
      <Provider store={Store}>
        <div className='user-new-container'>
          <RegisterPage />
        </div>
      </Provider>

    );
  }
}
// No need to connect to store yet, but i feel it in the future. 

// function mapStateToProps(state) {
//   return {
//     visibilityFilter: state.visibilityFilter,
//     pageSkip: state.pageSkip
//   };
// }

// const RegisterContainer = createContainer(({visibilityFilter, pageSkip}) => {
//   const todoSub = Meteor.subscribe('getTodos', visibilityFilter, pageSkip);
//   return {
//     todoSubReady: todoSub.ready(),
//     todoList: Todos.find({}, {limit: 10}).fetch() || [],
//     todoCount: Counts.get('TodoCount')
//   };
// }, TodoList);

class Register extends Component {


  constructor() {
    super();
    this.state = {
      username: '',
      phoneNum: '',
      verificationCode: '',
      password: '',
      count: 60,
      isSendingCode: false,
      value: 86,
      areaCode: 86
    };
    this.page = new Styler(JsonStyle);
  }

  componentDidMount() {
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

    Meteor.call('SMS.sendCode', this.state.phoneNum, null, function (error, result) {
      error && logger.log(error);
      result && logger.log(result);
      // TODO: Handle error here and also disable get code btn for 1 min. 
      /**       if (error) {
                           // TODO: handle errors           
                           this.props.dispatch(simpleSnackbarAction({
                               message: error.reason
                           }));
                       } else {
                           // TODO:  disable get code btn for 1 min. 
                       } */
    });
  }

  registerUser(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.setState({
      isSendingCode: false
    })
    // TODO: check unique username, password requirements
    if (this.state.phoneNum && this.state.verificationCode) {
      Meteor.call('SMS.verifyCode', this.state.verificationCode, this.state.phoneNum, function (error, result) {
        // error && logger.log(error);
        result && logger.log(result);

        if (error) {
          // TODO: handle errors           
          this.props.dispatch(simpleSnackbarAction({
            message: error.reason
          }));
        } else {
          this.props.dispatch(userRegister({
            username: this.state.username,
            phoneNum: this.state.phoneNum,
            password: this.state.password
          }));
        }
      }.bind(this));
    } else {
      // TODO: handle when one of the field is empty.
    }
  }

  onInputChange(e) {
    let newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  onPhoneChange(e) {
    let newState = {};
    if (e.target.value.length > 11) {
      e.target.value = e.target.value.slice(0, 11);
    }
    newState.phoneNum = e.target.value;
    this.setState(newState);
  }

  onPwdChange(e) {
    let newState = {};
    if (e.target.value.length > 15)
      e.target.value = e.target.value.slice(0, 15);
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  handleChange(event, index, value) {
    this.setState({
      value,
      areaCode: value
    });
  }


  render() {
    const text = !this.state.isSendingCode ? '发送验证码' : this.state.count + '秒后重发';
    const passwordCheck = new RegExp(Meteor.settings.public.PIN_CHECK_NUMBER);
    const verificationCodeCheck = /^([0-9]{6})$/;
    const phoneNumCheck = /^0?1[3|4|5|8][0-9]\d{8}$/;
    let verificationCodeError = !verificationCodeCheck.test(this.state.verificationCode);
    if (this.state.verificationCode === '') verificationCodeError = false;
    const verificationCodeErrorText = verificationCodeError ? "请输入6位验证码" : "";
    let phoneNumError = !phoneNumCheck.test(this.state.phoneNum);
    if (this.state.phoneNum === '') phoneNumError = false;
    const phoneNumErrorText = phoneNumError ? "请输入正确的手机号码" : "";
    let passwordError = !passwordCheck.test(this.state.password);
    if (this.state.password === '') passwordError = false;
    const passwordErrorText = passwordError ? "密码至少8位数字" : "";

    const phoneNumField =
      <div className="row">
        <div className="col-xs-8">
          <TextField
            autoFocus
            tabIndex="1"
            id="phoneNum"
            type='number'
            ref="phoneNum"
            pattern="[0-9]*"
            onChange={this.onPhoneChange.bind(this)}
            value={this.state.phoneNum}
            hintText="请输入手机号码"
            errorText={phoneNumErrorText}
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
      </div >;

    const verificationCodeField =
      <div className="row">
        <div className="col-xs-12">
          <TextField
            tabIndex="2"
            id="verificationCode"
            type='number'
            pattern="[0-9]*"
            className="textField"
            autoComplete="off"
            onChange={this.onInputChange.bind(this)}
            hintText="请输入验证码"
            errorText={verificationCodeErrorText}
            fullWidth={true}
            {...this.page.style("full-width")}
          />
        </div>
      </div>;

    const passwordField =
      <div className="row">
        <div className="col-xs-12">

        <TextField
          tabIndex="3"
          id="password"
          type='tel'
          pattern="[0-9]*"
          className="textField"
          onChange={this.onPwdChange.bind(this)}
          value={this.state.password}
          hintText="请输入数字密码"
          errorText={passwordErrorText}
          fullWidth={true}
          {...this.page.style("full-width")}
          inputStyle={{
            WebkitTextSecurity: 'disc',
            textSecurity: 'disc',
            marginTop: "-5px"
          }}
        >
        </TextField>

        </div>
      </div>;

    let page =(
        <form onSubmit={this.registerUser.bind(this)} className="form container-fluid">

          <div className="row">
            <div className="col-xs-12 padding-0">
              <DropDownMenu className="usernew-dropdown" value={this.state.value}
                {...this.page.style("usernew-dropdown") }
                
                autoWidth={false}
                onChange={this.handleChange.bind(this)}>
                <MenuItem value={86} primaryText="中国 (+86)" />
                <MenuItem value={61} primaryText="澳大利亚 (+61)" />
              </DropDownMenu>
            </div>
          </div>
          {phoneNumField}

          {verificationCodeField}

          {passwordField}

          <Checkbox
            value={true}
            checked={true}
            disabled={true}
            label="我已阅读并同意此协议"
            className="checkBox"
            {...this.page.style("checkBox") } />

          <div className="right-top">
            <button className="btn btn-default" type="submit">注册</button>
          </div>
          
        </form>);

    return page;
  }
}