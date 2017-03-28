import React, { Component } from 'react';

// common controls
import TextField from '/imports/ui/common/TextField';

export default class Register extends Component {
  componentWillMount() {
    this.state = {
      phoneNum: '111'
    };
    console.log("^^^");
  }

  onPhoneChange(e) {
    if (this.state.phoneNum != e.target.value) {
      this.setState({
        phoneNum: e.target.value
      });
      console.log("+" + e.target.value);
    }
  }


  render() {
    console.log("*" + this.state.phoneNum);

    return (
        <TextField
            type='number'
            value={this.state.phoneNum}
            onChange={this.onPhoneChange.bind(this)}
          />);
  }
}