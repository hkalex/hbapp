import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Infinite from 'react-infinite';
import _ from 'lodash';
import C, { ACTIVITY_LOCATIONS } from '../../consts/Constants';
// collections
import Activity from '/imports/db/activities';
// actions
import { activityListPageChangeAction } from '/imports/actions/discover/activityActions';
import { activitySearchAction } from '/imports/actions/discover/activityActions';
// components
import LoadSpinner from '/imports/ui/utils/LoadSpinner';
import ActivityListItem from './ActivityListItem';

class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filter: { location: { code: 'ALL', text: '不限' } },
      isInfiniteLoading: false,
      noMoreData: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('should component update ?')

    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    if (!(nextState.filter.location.code == "ALL")) {
      return true;
    }
    return true;
  }

  componentWillReceiveProps(nextProps,nextState) {
    
    // When projectListData ready.
    if (nextProps.subReady) {
      const filterChanged = !(nextProps.activityList.filter.location.code == this.state.filter.location.code);
      if (filterChanged) {
        // console.log('filter changed')     
        if (nextProps.activityListData.length == 0) {
          // when filter changed, and new list has nothing
          this.setState({
            isInfiniteLoading: true,
            noMoreData: true,
            list: [],
            filter: nextProps.activityList.filter,
          });
        } else {
          // when filter changed, new list has elements
          this.setState({
            isInfiniteLoading: false,
            list: this.buildElements(nextProps.activityListData),
            filter: nextProps.activityList.filter
          });
        }
      } else {
        // console.log('filter not changed')        
        if (nextProps.activityListData.length != this.state.list.length) {
          // console.log('list length not equal')
          // console.log('updated')
          this.setState({
            isInfiniteLoading: false,
            list: this.buildElements(nextProps.activityListData),
            filter: nextProps.activityList.filter
          });
        } else {
          // console.log('list length equal')
          // console.log('not updated')        
          this.setState({ noMoreData: true });
        }
      }
    }
  }

  buildElements(list) {
    const elements = list.map((v, i) => {
      return (<ActivityListItem item={v} key={i} />);
    });
    return elements;
  }

  handleInfiniteLoad() {
    this.props.dispatch(activityListPageChangeAction());
    this.setState({
      isInfiniteLoading: true
    });
  }

  render() {
    // console.log(this.state)
    console.log(this.props)

    const APP_BAR_HEIGHT = 64;
    const SEARCH_BAR_HEIGHT = 48;
    const CONTAINER_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_BAR_HEIGHT;

    if (this.state.list.length === 0) {
      return (
        <LoadSpinner noMoreData={this.state.noMoreData} />
      );
    } else {
      return (
        <Infinite
          timeScrollStateLastsForAfterUserScrolls={1000}
          elementHeight={200}
          containerHeight={CONTAINER_HEIGHT}
          infiniteLoadBeginEdgeOffset={150}
          onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
          loadingSpinnerDelegate={<LoadSpinner noMoreData={this.state.noMoreData} />}
          isInfiniteLoading={this.state.isInfiniteLoading}
        >
          {this.state.list}
        </Infinite>
      );
    }
  }
}

const ActivityListContainer = createContainer(({lists, activityList, activityFinished}) => {

  const ActivityListSub = Meteor.subscribe('activity', activityList.filter, activityList.page);
  const query = activityList.filter.location.code === 'ALL' ? {} : { city: activityList.filter.location.text };
  if (activityFinished) query.date = { '$lte': new Date() };
  else query.date = { '$gte': new Date() };
  const activityListData = Activity.find(query).fetch() || [];

  return {
    activityListData,
    subReady: ActivityListSub.ready()
  };

}, ActivityList);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    activityList: state.activityList
  };
}

export default connect(mapStateToProps)(ActivityListContainer);