import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import { AppBar, FlatButton, FontIcon } from 'material-ui';
import C, { STYLE, ACTIVITY_LOCATIONS } from '../../consts/Constants';
import { MenuItem } from 'material-ui/Menu';
import { Tabs, Tab } from 'material-ui/Tabs';
import DropDownMenu from 'material-ui/DropDownMenu';

import ActivityList from './ActivityList';
// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';

// actions
import { activitySearchAction } from '/imports/actions/discover/activityActions';

class ActivityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.activityList.filter.location,
      activityType: 'upcoming'
    };
    this.page = new Styler(JsonStyle);
  }


  componentUnMount() {
    const _this = this;
    if (Meteor.isCordova) {
      Meteor.startup(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
          let lat, lon, point, myGeo;
          lat = position.coords.latitude;  //纬度
          lon = position.coords.longitude;  // 经度
          point = new BMap.Point(lon, lat);  // 创建坐标点
          // 根据坐标得到地址描述
          myGeo = new BMap.Geocoder();
          myGeo.getLocation(point, function (result) {
            let city;
            city = result.addressComponents.city;

            ACTIVITY_LOCATIONS.forEach((item) => {
              if (item.text == city.substring(0, city.length - 1)) cityCode = item.code;
            });
            const location = { code: cityCode, text: city };
            _this.props.dispatch(activitySearchAction({ location }));
            _this.setState({ location });

          });
        });
      });
    } else {
      // 根据ip定位
      function myFun(result) {
        let cityName;
        cityName = result.name;

        ACTIVITY_LOCATIONS.forEach((item) => {
          if (item.text == cityName.substring(0, cityName.length - 1)) cityCode = item.code;
        })

        const location = { code: cityCode, text: cityName };
        _this.props.dispatch(activitySearchAction({ location }))
        _this.setState({ location });
      }

      const myCity = new BMap.LocalCity();
      myCity.get(myFun);
    }
  }

  componentDidMount() {
    const _this = this;
    if (Meteor.isCordova) {
      Meteor.startup(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
          let lat, lon, point, myGeo;
          lat = position.coords.latitude;  //纬度
          lon = position.coords.longitude;  // 经度
          point = new BMap.Point(lon, lat);  // 创建坐标点
          // 根据坐标得到地址描述
          myGeo = new BMap.Geocoder();
          myGeo.getLocation(point, function (result) {
            let city, cityCode;
            city = result.addressComponents.city;

            ACTIVITY_LOCATIONS.forEach((item) => {
              if (item.text == city.substring(0, city.length - 1)) cityCode = item.code;
            });
            const location = { code: cityCode, text: city };
            _this.setState({ location });
          });
        });
      });
    } else {
      // 根据ip定位
      function myFun(result) {
        let cityName, cityCode;
        cityName = result.name;

        ACTIVITY_LOCATIONS.forEach((item) => {
          if (item.text == cityName.substring(0, cityName.length - 1)) cityCode = item.code;
        })

        const location = { code: cityCode, text: cityName };
        _this.setState({ location });
      }

      const myCity = new BMap.LocalCity();
      myCity.get(myFun);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Read state.location from Store make sure local is at the same page as store.
    this.setState({ location: nextProps.activityList.filter.location });
  }


  handleLocationChange(e, i, v) {
    // console.log(e, i, v);

    // send action as well as setting state(optimistic update)
    const location = { code: v, text: e.target.innerHTML };
    this.props.dispatch(activitySearchAction({ location }))
    this.setState({ location });
  }

  handleActivityTypeChange(v) {
    this.setState({ activityType: v });
  }

  onBack() {
    this.props.router.goBack();
  }

  render() {
    // console.log(this.props)

    const APP_BAR_HEIGHT = 64;
    const SEARCH_BAR_HEIGHT = 50;
    const BODY_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_BAR_HEIGHT;

    const menuItems = ACTIVITY_LOCATIONS.map((v, i) => {
      return (
        <MenuItem value={v.code} primaryText={v.text} key={i} />
      );
    });

    return (
      <div>
        <div className='app-bar'>
          <AppBar className="appBar" title="活动" {...this.page.style("appBar") }>
          </AppBar>
          <FlatButton className="ABButton" title="活动" {...this.page.style("ABButton") }
            icon={<FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className='activity-page-body' {...this.page.style("activity-page-body") } >
          <DropDownMenu className="activity-page-dropdown"
            {...this.page.style("activity-page-dropdown") }
            value={this.state.location.code}
            onChange={this.handleLocationChange.bind(this)}>
            {menuItems}
          </DropDownMenu>
          <Tabs className="activity-page-tabs"
            {...this.page.style("activity-page-tabs") }
            value={this.state.activityType}
            onChange={this.handleActivityTypeChange.bind(this)}
          >
            <Tab className="activity-page-tab" {...this.page.style("activity-page-tab") } label="进行中" value='upcoming'>
              <ActivityList activityFinished={false} />
            </Tab>
            <Tab className="activity-page-tab" {...this.page.style("activity-page-tab") } label="已完成" value='finished'>
              <ActivityList activityFinished={true} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}


const ActivityPageContainer = createContainer(({lists, activityList}) => {

  return {
    subReady: true
  };

}, ActivityPage);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    activityList: state.activityList
  };
}

export default connect(mapStateToProps)(ActivityPageContainer);