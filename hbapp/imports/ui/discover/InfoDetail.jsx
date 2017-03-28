import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { AppBar } from 'material-ui';
import { FlatButton, FontIcon } from 'material-ui';
import Info from '/imports/db/infos';
import wechatShare from '/imports/intg/wechatShare';
// Constants
import C, { INFO_CLASSES } from '../../consts/Constants';
// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';
// actions
import { sharingDialogAction } from '/imports/actions/utils/dialogAction'

class InfoDetail extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onBack() {
    this.props.router.goBack();
  }

  onShare(title) {
    this.props.dispatch(sharingDialogAction({
      weChat: <img src="/images/icon64_wx_logo.png" onClick={this.share.bind(this, title, "wechat")} />,
      circle: <img src="/images/icon64_circle.png" onClick={this.share.bind(this, title, "circle")} />
    }));
  }

  share(title, type) {
    wechatShare(title, type);
  }

  render() {
    // console.log(this.props);
    // to prevent 1 render
    // but not good method
    if (this.props.subReady == false) return <div />;

    let backButtonClass, sharingButtonClass;
    if (Meteor.isInWeChat()) {
      backButtonClass = "fa fa-chevron-left hide";
      sharingButtonClass = "fa fa-share-square-o hide";
    } else {
      backButtonClass = "fa fa-chevron-left";
      sharingButtonClass = "fa fa-share-square-o";
    }

    const infoDetail = this.props.infoDetailData;
    const title = infoDetail.title;
    const date = infoDetail.date.getFullYear() + '年' + (infoDetail.date.getMonth() + 1) + '月' + infoDetail.date.getDate() + '日';
    const imgUrl = infoDetail.image[0].cdnUrl || '/images/placeholder.jpg';
    const detail = infoDetail.detail;
    const type = infoDetail.type;
    let showType;

    INFO_CLASSES.forEach((item) => {
      if (item.code == type) showType = item.text
    })

    return (
      <div>
        <div className='app-bar'>
          <AppBar title="咨询详情" {...this.page.style("appBar") } >
            <span className={sharingButtonClass}
              {...this.page.style("info-detail-sharingbutton") }
              onClick={this.onShare.bind(this, title)}
            />
          </AppBar>
          <FlatButton className="ABButton" {...this.page.style("ABButton") }
            icon={<FontIcon className={backButtonClass} {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className='info-detail-container' {...this.page.style("info-detail-container") }>
          <div className='info-detail-header'>
            <p className='info-detail-title' {...this.page.style("info-detail-title") }>{title}</p>
            <p className='info-detail-date' {...this.page.style("info-detail-date") } >
              <span className='info-detail-day' {...this.page.style("info-detail-day") } >{date}</span>
              <span className="info-detail-auth" {...this.page.style("info-detail-auth") }>领跑财富</span>
            </p>
          </div>
          <div className='info-detail-introduction'>
            <img className="info-detail-img" {...this.page.style("info-detail-img") } src={imgUrl} />
            <p className="info-detail-shortdesc" {...this.page.style("info-detail-shortdesc") } >
              <span className="info-detail-keyword" {...this.page.style("info-detail-keyword") }>关键词：</span>
              <span>{infoDetail.country}</span>
              <span className="info-detail-type" {...this.page.style("info-detail-type") } >{showType}</span>
            </p>
            <p>
              <span className="info-detail-read" {...this.page.style("info-detail-read") }>导读：</span>
              {infoDetail.shortDesc}
            </p>
          </div>
          <div className="special-detail-content">
            <div className="info-detail-content" {...this.page.style("info-detail-content") }>
              <span className="info-detail-introduce" {...this.page.style("info-detail-introduce") } >资讯介绍</span>
            </div>
            <div className='special-description'
              dangerouslySetInnerHTML={{ __html: detail }}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const InfoDetailContainer = createContainer(({lists, routeParams}) => {

  const _id = routeParams._id;

  const InfoDetailSub = Meteor.subscribe('infoDetail', _id);
  const infoDetailData = Info.findOne({ _id: Info.ObjectID(_id) });

  return {
    subReady: InfoDetailSub.ready(),
    infoDetailData
  };
}, InfoDetail);

function mapStateToProps(state) {
  return {
    lists: state.lists,
  };
}

export default connect(mapStateToProps)(InfoDetailContainer);
