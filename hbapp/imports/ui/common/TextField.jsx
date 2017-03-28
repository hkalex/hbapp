import React, { Component } from 'react';


export default class TextField extends Component {
  constructor(props) {
    super(props);

    // .form-control is from bootstrap
    // .textbox is defined in common.css
    var defaultClassName = "form-control textfield"; 

    // set all props to htmlAttributes
    this.htmlAttributes = Object.assign({}, this.props);

    // merge className
    this.htmlAttributes.className = defaultClassName + " " + this.props.className;

    // set placeholder
    this.htmlAttributes.placeholder = this.props.hintText;
    delete this.htmlAttributes.hintText;

    // set errorText
    var hasError = !!this.htmlAttributes.errorText;
    delete this.htmlAttributes.errorText;
    if (hasError) {
      this.htmlAttributes.className += " error";
    }

    // remove the value from htmlAttributes
    delete this.htmlAttributes.value;

    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render() {
    return (
      <input type="text" {...this.htmlAttributes} value={this.state.value} />
    );
  }
}
