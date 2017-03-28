// import React, { Component } from 'react';
// import { Meteor } from 'meteor/meteor';
// import logger from '../../loggers/logger';

// export default class SMSDemo extends Component {
//   constructor() {
//     super();

//     this.state = {
//       phoneNumber: '',
//       code: ''
//     }
//   }

//   changePhoneNum(e) {
//     this.setState({ phoneNumber: e.target.value });
//   }

//   changeCode(e) {
//     this.setState({ code: e.target.value });
//   }

//   sendCode() {
//     // test sms
//     Meteor.call('SMS.sendCode', this.state.phoneNumber, 'register', function (error, value) {
//       error && logger.log(error);
//       value && logger.log(value);
//     });
//   }

//   verifyCode() {
//     Meteor.call('SMS.verifyCode', this.state.code, this.state.phoneNumber, function (error, value) {
//       error && logger.log(error);
//       value && logger.log(value);
//     });
//   }

//   render() {
//     return (
//       <div>
//         <input type="text"
//           onChange={this.changePhoneNum.bind(this)}
//           value={this.state.phoneNumber}
//           placeholder="input phone number" />

//         <button onClick={this.sendCode.bind(this)}>send message code</button>

//         <input type="text"
//           onChange={this.changeCode.bind(this)}
//           value={this.state.code}
//           placeholder="input send message" />

//         <button onClick={this.verifyCode.bind(this)}>OK</button>
//       </div>
//     );
//   }
// }
