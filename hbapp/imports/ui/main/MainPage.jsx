import React, { Component } from 'react';

import TopBar from '/imports/ui/top/TopBar';
import FooterBar from '/imports/ui/footer/FooterBar';

// style json
import JsonStyle from './main.json';
import Styler from '/imports/utils/Styler.js';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);

    this.routeInfo = {
      routeParams: this.props.routeParams,
      route: this.props.route,
      router: this.props.router,
      routes: this.props.routes,
      params: this.props.params
    };
  }

  render() {
    var showFooter = this.props.route.showFooter;
    var showBackButton = this.props.route.showBackButton;

    var mainContentStyle = showFooter ? "mainContentNoFooter" : "mainContent";

    var footer = (<FooterBar location={this.props.location} {...this.routeInfo} />);
    if (!showFooter) {
      footer = null;
    }


    return (
      <div style={{ "position": "fixed", "top": "0", "left": "0", "width": "100%", "height": "100%" }}>
        <TopBar title={this.props.location} routeInfo={this.routeInfo} showBackButton={showBackButton} />
        <div {...this.page.style(mainContentStyle) }>
          {this.props.children}
        </div>
        {footer}
      </div>
    );
  }
}