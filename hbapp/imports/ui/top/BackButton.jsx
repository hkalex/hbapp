import React, { Component } from 'react';


// style json
import Styler from '/imports/utils/Styler.js';


export default class BackButton extends Component {
  constructor(props) {
    super(props);
    this.page = new Styler();
  }

  goBack() {
    this.props.routeInfo.router.goBack(); // this.props.router is passed from MainPage.jsx
  }

  render() {
    return (
      <i onClick={this.goBack.bind(this)} {...this.page.style("backButton")} />
    )
  }
}
