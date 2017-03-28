import React, { Component } from 'react';
// style json
import JsonStyle from './utility.json';
import Styler from '/imports/utils/Styler.js';

export default class LoadSpinner extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle)
  }

  render() {
    if (this.props.noMoreData) {
      return (
        <div className="LSnomore" {...this.page.style("LSnomore") }>
          没有更多咯
				</div>
      );
    } else {
      return (
        <div className="LSload" {...this.page.style("LSload") }>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
          <span>努力加载中</span>
        </div>
      );
    }
  }
}
