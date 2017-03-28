import React, { Component } from 'react';

import BackButton from './BackButton';

// style json
import JsonStyle from './top.json';
import Styler from '/imports/utils/Styler.js';
import { TITLE } from '/imports/consts/Constants';

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
    this.buildTitles();
  }

  buildTitles() {
    this.titles = [];
    for (var i = 0, len = TITLE.length; i < len; i++) {
      var code = TITLE[i].code;
      var text = TITLE[i].text;

      if (code.substr(0,1) === "/" && code.substr(-1, 1) === "/") {
        code = new RegExp(code.substr(1,code.length-2));
      }
      this.titles.push({code, text});
    }
  }

  getPageTitle() {
    const PATH = this.props.title.pathname;
    let name, title;
    name = PATH.substring(1, PATH.length);

    for (var i=0, l=this.titles.length; i<l; i++) {
      var code = this.titles[i].code;
      if (code instanceof RegExp) {
        if (code.test(name)) {
          title = this.titles[i].text;
          break;
        }
      } else {
        if (code === name) {
          title = this.titles[i].text;
        }
      }
    }

    if (!title) {
      title = this.props.headerTitle;
    }
    return title;
  }

  render() {

    var showBackButton = this.props.showBackButton;

    var title = this.getPageTitle();

    var backButton = null;
    if (showBackButton) {
      backButton = (<BackButton routeInfo={this.props.routeInfo} />);
    }

    return (
      <div {...this.page.style("TopBarStyle") } >
        {backButton}
        <span>{title}</span>
      </div>
    );
  }
}
