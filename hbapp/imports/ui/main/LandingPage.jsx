import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ImageGallery from '/imports/ui/common/ImageGallery';

// style json
import JsonStyle from './main.json';
import Styler from '/imports/utils/Styler.js';
// intg
import loginWithWechat from '/imports/intg/wechat';


class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imgStatus: null
    }
    this.page = new Styler(JsonStyle);
  }

  componentWillMount() {
    if (Meteor.userId()) {
      this.props.router.push('/home');
    }
  }

  onLoad() {
    this.setState({
      imgStatus: 'load'
    })
  }

  wechatLogin() {
    this.setState({
      noMoreData: true
    })
    loginWithWechat(this.props.dispatch);
  }

  redirect(url) {
    this.props.router.push(url);
  }


  render() {

    var landingImages = [
      "/images/landing-1.jpg",
      "/images/landing-2.jpg",
      "/images/landing-3.jpg"
    ];

    return (
      <div>
        <div {...this.page.style("landing-imagegallery")}>
          <ImageGallery images={landingImages} enableLightbox={false} />
        </div>
        <div {...this.page.style("landing-buttonGroup") }>
          <RaisedButton
            label="注册"
            {...this.page.style("landing-button", "button-highlight")}
            onClick={() => this.redirect('/user_new')}
          />
          <RaisedButton
            label="登录"
            {...this.page.style("landing-button", "button-normal")}
            onClick={() => this.redirect('/user_login')}
          />
          <RaisedButton
              label="跳过"
              {...this.page.style("landing-button", "button-lite")}
              onClick={() => this.redirect('/home')}>
            <i className="fa fa-chevron-right landing-left-icon" {...this.page.style("landing-left-icon") } />
          </RaisedButton>

          <RaisedButton
              label="Terms and conditions"
              {...this.page.style("landing-button", "button-lite")}
              onClick={() => this.redirect('/home')} />

          {Meteor.isCordova ?
            <div className="landing-cordovaDiv" {...this.page.style("landing-cordovaDiv") }>
              <IconButton iconClassName="fa fa-weixin" className="landing-cordovaIcon"
                {...this.page.style("landing-cordovaIcon") }
                onClick={this.wechatLogin.bind(this)} />
            </div> : ""}
        </div>

      </div>
    )
  }
}

export default connect()(Landing);
