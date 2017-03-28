import React, { Component } from 'react';
import { Link } from 'react-router';

// style json
import JsonStyle from './footer.json';
import Styler from '/imports/utils/Styler.js';

export default class FooterBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 2
    };
    this.page = new Styler(JsonStyle);
  }

  getIndex(pathname) {
    switch (pathname) {
      case '/project':
        return 0;
      case '/friends':
        return 1;
      case '/home':
        return 2;
      case '/discover':
        return 3;
      case '/me':
        return 4;
      default:
        return false;
    }
  }

  componentWillMount() {
    this.setState({
      index: this.getIndex(this.props.location.pathname)
    });
  }

  renderFooterBtn(title, iconClass, index, link) {
    let itemStyle = this.page.style("itemStyle").style;

    if (this.state.index === index) {
      itemStyle = Object.assign(itemStyle, {
        color: '#4388cc'
      });
    } else {
      itemStyle = Object.assign(itemStyle, {
        color: '#999'
      });
    }

    const handleClick = () => {
      this.setState({
        index: index
      });
    }

    return (
      <Link to={link}>
        <div style={itemStyle} onClick={handleClick}>
          <i className={iconClass} {...this.page.style("iconStyle") }></i>
          <p {...this.page.style("textStyle") }>{title}</p>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div {...this.page.style("footerBarStyle") }>
        {this.renderFooterBtn('房子', 'flaticon-building', 0, '/project')}
        {this.renderFooterBtn('朋友', 'flaticon-social-relations', 1, '/friends')}
        {this.renderFooterBtn('主页', 'flaticon-home', 2, '/home')}
        {this.renderFooterBtn('发现', 'flaticon-newspaper', 3, '/discover')}
        {this.renderFooterBtn('朕', 'flaticon-user', 4, '/me')}
      </div>
    );
  }
}