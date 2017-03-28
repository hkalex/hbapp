import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { AppBar } from 'material-ui';
import wechatShare from '/imports/intg/wechatShare';
import { FlatButton, FontIcon } from 'material-ui';

import Activity from '/imports/db/activities';
import { sharingDialogAction } from '/imports/actions/utils/dialogAction';
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';

// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';


class ActivityDetail extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onBack() {
    this.props.router.goBack();
  }

  share(title, type) {
    wechatShare(title, type);
  }

  onShare(title) {
    this.props.dispatch(sharingDialogAction({
      weChat: <img src="/images/icon64_wx_logo.png" onClick={this.share.bind(this, title, "wechat")} />,
      circle: <img src="/images/icon64_circle.png" onClick={this.share.bind(this, title, "circle")} />
    }));
  }

  addActivityToCalendar(data) {
    if (Meteor.isCordova) {
      Meteor.startup(() => {
        let startDate = new Date(data.date.getFullYear(),
          data.date.getMonth(),
          data.date.getDate(),
          data.fromTime.substr(0, 2),
          data.fromTime.substr(3, 2), 0, 0, 0);

        let endDate = new Date(data.date.getFullYear(),
          data.date.getMonth(),
          data.date.getDate(),
          data.toTime.substr(0, 2),
          data.toTime.substr(3, 2), 0, 0, 0);

        let title = data.title + '--来自' + Meteor.settings.public.APP_NAME;
        let eventLocation = data.address;
        let notes = data.shortDesc;

        window.plugins.calendar.deleteEvent(title, eventLocation, notes, startDate, endDate, (result) => { }, (error) => { });

        window.plugins.calendar.createEvent(title, eventLocation, notes, startDate, endDate, (result) => {
          this.props.dispatch(simpleSnackbarAction({ message: "已添加到系统日历，请在系统日历中查看" }));
        }, (error) => {
          this.props.dispatch(simpleSnackbarAction({ message: "添加到系统日历失败，请稍后重试" }));
        });
      });
    }
  }

  render() {
    // console.log(this.props);
    if (this.props.subReady == false) return <div />;

    let backButtonClass, sharingButtonClass;
    if (Meteor.isInWeChat()) {
      backButtonClass = "fa fa-chevron-left hide";
      sharingButtonClass = "fa fa-share-square-o hide";
    } else {
      backButtonClass = "fa fa-chevron-left";
      sharingButtonClass = "fa fa-share-square-o";
    }
    const data = this.props.activityDetailData;

    const getActivityDate = function () {
      return `${data.date.getFullYear()}年${data.date.getMonth() + 1}月${data.date.getDate()}日 ${data.fromTime}-${data.toTime}`;
    }

    return (
      <div className='activity-detail-contailer'>
        <div className='activity-detail-header'>
          <AppBar className="appBar" title="活动详情"  {...this.page.style("appBar") }>
            <span className={sharingButtonClass} {...this.page.style("info-detail-sharingbutton") }
              onClick={this.onShare.bind(this, data.title)} />
          </AppBar>
          <FlatButton className="ABButton"
            {...this.page.style("ABButton") }
            icon={<FontIcon className={backButtonClass} {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className='special-detail-body' >
          <div className='activity-detail-mainImg'>
            <img className="info-detail-img" src={data.image[0].cdnUrl || "/images/placeholder.jpg"}
              {...this.page.style("info-detail-img") } />
          </div>
          <div className='activity-detail-title' {...this.page.style("activity-detail-title") }  >
            <p className="activity-detail-titletext" {...this.page.style("activity-detail-titletext") } >{data.title}</p>
          </div>
          <div className="activity-detail-time" {...this.page.style("activity-detail-time") } >
            <span className="fa fa-calendar activity-detail-calendar" {...this.page.style("activity-detail-calendar") } ></span>
            <span className="activity-detail-date" {...this.page.style("activity-detail-date") }>时间</span>
            <span onClick={this.addActivityToCalendar.bind(this, data)}>{getActivityDate()}</span>
          </div>
          <div className="activity-detail-address" {...this.page.style("activity-detail-address") }>
            <span className="fa fa-map-marker activity-detail-marker" {...this.page.style("activity-detail-marker") }></span>
            <span className="activity-detail-addresstext" {...this.page.style("activity-detail-addresstext") }>地点</span>
            <a href={`http://maps.apple.com/?address=${data.address}`}>{`${data.city} ${data.address}`}</a>
          </div>
          <div className="activity-detail-divider" {...this.page.style("activity-detail-divider") }>
          </div>
          <div className="special-detail-content">
            <div className="activity-detail-content" {...this.page.style("activity-detail-content") }>
              <span className="shortAdvance" {...this.page.style("shortAdvance") }>活动介绍</span>
            </div>
            <div className='special-description'
              dangerouslySetInnerHTML={{ __html: data ? data.detail : "" }}>
            </div>
          </div>
        </div>
        <div className='activity-detail-footer' {...this.page.style("activity-detail-footer") }>

          <a href={"tel:" + Meteor.settings.public.FREE_PHONE_NUMBER} className='activity-detail-footerA' {...this.page.style("activity-detail-footerA") }>
            <FlatButton className="activity-detail-freeconsulting" label="免费咨询"
              labelPosition="before"
              {...this.page.style("activity-detail-freeconsulting") }
              icon={<i className="fa fa-phone activity-detail-phone"
                {...this.page.style("activity-detail-phone") } />} />
          </a>


          <FlatButton className="activity-detail-flatbutton" label="已结束" {...this.page.style("activity-detail-flatbutton") } />
        </div>
      </div >
    );
  }
}

const ActivityDetailContainer = createContainer(({lists, routeParams}) => {
  const _id = routeParams._id;
  const activityDetailSub = Meteor.subscribe('activityDetail', _id);
  const activityDetailData = Activity.findOne({ _id: Activity.ObjectID(_id) });
  return {
    subReady: activityDetailSub.ready(),
    activityDetailData
  };
}, ActivityDetail);

const mapStateToProps = (state) => {
  return {
    lists: state.lists
  };
}

export default connect(mapStateToProps)(ActivityDetailContainer);