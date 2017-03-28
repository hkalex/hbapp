import React, { Component } from 'react';
import { AppBar } from 'material-ui';
import C, { STYLE } from '../../consts/Constants';
import { RaisedButton } from 'material-ui';

import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import logger from '../../loggers/logger';
import Store from '../../stores/store';
import _ from 'lodash';

import Info from '/imports/db/infos';
import Activity from '/imports/db/activities';
import OffPlans from '/imports/db/offPlans';

import GridList from '/imports/ui/utils/GridList';
import { lbl } from '/imports/intg/lang';
// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';

class Discover extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onInfo() {
    this.props.router.push('info');
  }

  onActivity() {
    this.props.router.push('activity');
  }

  onOffplan() {
    this.props.router.push('opapved');
  }

  render() {

    // console.log(this.props);

    const infoList = this.props.info ? this.props.info.slice(0, 5) : null;
    const activityList = this.props.activity ? this.props.activity.slice(0, 5) : null;
    const offplanList = this.props.offplans ? this.props.offplans.slice(0, 5) : null;

    return (
      <div className='app-bar'>
        <div className="discover-home-body" {...this.page.style("discover-home-body") }>
          <RaisedButton className="discover-raised-button" label="更多资讯"
            {...this.page.style("discover-raised-button") }
            onClick={this.onInfo.bind(this)}
            icon={<i className="fa fa-globe discover-rb-icon"
              {...this.page.style("discover-rb-icon") } />}  >
            <i className="fa fa-chevron-right discover-rb-righticon"
              {...this.page.style("discover-rb-righticon") } />
          </RaisedButton>
          <GridList list={infoList} discover="info" />
          <RaisedButton className="discover-raised-button" label="更多活动"
            {...this.page.style("discover-raised-button") }
            onClick={this.onActivity.bind(this)}
            icon={<i className="fa fa-bell discover-rb-icon"
              {...this.page.style("discover-rb-icon") } />}  >
            <i className="fa fa-chevron-right discover-rb-righticon"
              {...this.page.style("discover-rb-righticon") } />
          </RaisedButton>
          <GridList list={activityList} discover="activity" />
          <RaisedButton className="discover-raised-button" label="二手楼花"
            {...this.page.style("discover-raised-button") }
            onClick={this.onOffplan.bind(this)}
            icon={<i className="fa fa-building discover-rb-icon"
              {...this.page.style("discover-rb-icon") } />}  >
            <i className="fa fa-chevron-right discover-rb-righticon"
              {...this.page.style("discover-rb-righticon") } />
          </RaisedButton>
          <GridList list={offplanList} discover="offplan" />

        </div>
      </div>
    );
  }
}


const DiscoverContainer = createContainer(({lists}) => {
  const getInfoInDiscoverSub = Meteor.subscribe('getInfoInDiscover');
  const getActivitiesInDiscoverSub = Meteor.subscribe('getActivityInDiscover');
  const getOffplansInDiscoverSub = Meteor.subscribe('offPlans');
  const info = Info.find().fetch() || [];
  const activity = Activity.find().fetch() || [];
  const offplans = OffPlans.find().fetch() || [];

  return {
    subReady: getInfoInDiscoverSub.ready() && getActivitiesInDiscoverSub.ready() && getOffplansInDiscoverSub.ready(),
    info,
    activity,
    offplans,
    lists
  }
}, Discover);

function mapStateToProps(state) {
  return {
    lists: state.lists,
  }
}

export default connect(mapStateToProps)(DiscoverContainer)