import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import logger from '../../loggers/logger';
import _ from 'lodash';
import Slider from 'react-slick';
import FlatButton from 'material-ui/FlatButton';
import GridList from '/imports/ui/utils/GridList';
// collections
import Projects from '../../db/projects';
// style json
import JsonStyle from './home.json';
import Styler from '/imports/utils/Styler.js';

import ImageGallery from '/imports/ui/common/ImageGallery';

class Home extends Component {
  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {

  }

  onClick(id) {
    this.props.router.push('/project/' + id);
  }

  onClassesSelected(value, title) {
    this.props.router.replace('/project?classes=' + value + '&title=' + title);
  }

  renderButton(title, iconClass) {
    return (
      <div {...this.page.style("homeBtnDiv") }>
        <i className={iconClass} {...this.page.style("homeBtnIcon") }></i>
        <p {...this.page.style("homeBtnTitle") }>{title}</p>
      </div>
    );
  }

  render() {

    const recommentData = this.props.getRecomment ? this.props.getRecomment.slice(0, 4) : null;
    var homeImages = [
      "/images/p-home-1.jpg",
      "/images/p-home-2.jpg",
      "/images/p-home-3.jpg",
    ]

    return (
      <div style={{ "height": "100%" }}>
        <div className="groupFB" {...this.page.style("groupFB") }>
          {this.renderButton('扫人', 'flaticon-qr-code')}
          {this.renderButton('被扫', 'flaticon-qr-code-1')}
          {this.renderButton('包包', 'flaticon-wallet')}
          {this.renderButton('找房', 'flaticon-search')}
          {/*<FlatButton label="投资房"
              className="commonFB"
              {...this.page.style("commonFB") }
              icon={<i className="fa fa-building-o commonIcon"  {...this.page.style("commonIcon") } />}
              onClick={this.onClassesSelected.bind(this, 'I', '投资房')} />
            <FlatButton
              label="学区房"
              className="commonFB graduationFB"
              {...this.page.style("commonFB", "graduationFB") }
              icon={<i className="fa fa-graduation-cap commonIcon graduationIcon" {...this.page.style("commonIcon", "graduationIcon") } />}
              onClick={this.onClassesSelected.bind(this, 'S', '学区房')} />
            <FlatButton label="移民房" className="commonFB globeFB"
              {...this.page.style("commonFB", "globeFB") }
              icon={<i className="fa fa-globe commonIcon globeIcon" {...this.page.style("commonIcon", "globeIcon") } />}
              onClick={this.onClassesSelected.bind(this, 'M', '移民房')} />
            <FlatButton className="commonFB" label="帮我找房"
              {...this.page.style("commonFB") }
              icon={<i className="fa fa-search commonIcon searchIcon" {...this.page.style("commonIcon", "searchIcon") } />}
              onClick={() => { this.props.router.replace('/project'); }} />*/}
        </div>

        <div {...this.page.style("homeContent") }>
          <div className="sliderBox" {...this.page.style("sliderBox") }>
            <ImageGallery images={homeImages} enableLightbox={true} />
          </div>
          {/*<div className="hrDiv" {...this.page.style("hrDiv") }></div>*/}
          <div className="middleDiv" {...this.page.style("middleDiv") } >
            <span className="shortAdvance" {...this.page.style("shortAdvance") } >热门房源</span>
            <GridList list={recommentData} discover="homepage" />
          </div>

          <div className="middleDiv" {...this.page.style("middleDiv") } >
            <span className="shortAdvance" {...this.page.style("shortAdvance") } >最新消息</span>
            <GridList list={recommentData} discover="homepage" />
          </div>

        </div>

      </div>
    )

  }
}
const HomeContainer = createContainer(({lists}) => {
  const getRecommentSub = Meteor.subscribe('getRecomment');
  const getRecomment = Projects.find().fetch() || [];

  return {
    lists,
    subReady: getRecommentSub.ready(),
    getRecomment
  };

}, Home);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    getRecomment: state.getRecomment
  };
}

export default connect(mapStateToProps)(HomeContainer);


