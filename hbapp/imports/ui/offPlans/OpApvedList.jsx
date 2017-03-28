import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Infinite from 'react-infinite';

// collections
import OffPlans from '/imports/db/offPlans';

// actions
import { infiniteScrollPageChange } from '../../actions/project/projectListActions';

// components
import LoadSpinner from '/imports/ui/utils/LoadSpinner';
import OpApvedListItem from './OpApvedListItem';

class OffPlanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      listItemHeight: [],
      filter: {
        location: { city: 'ALL', country: 'ALL', title: '不限' },
        price: { fromPrice: '-1', toPrice: '0', range: '不限' }
      },
      isInfiniteLoading: false,
      noMoreData: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    // When subscribe ready.
    if (nextProps.subReady) {
      const filterChanged = !((nextProps.offPlanList.filter.location.city == this.state.filter.location.city) &&
        (nextProps.offPlanList.filter.location.country == this.state.filter.location.country) &&
        (nextProps.offPlanList.filter.price && (nextProps.offPlanList.filter.price.fromPrice == this.state.filter.price.fromPrice)));

      if (filterChanged) {
        if (nextProps.offPlanListData.length == 0) {
          // when filter changed, and new list has nothing
          this.setState({
            isInfiniteLoading: true,
            noMoreData: true,
            list: [],
            listItemHeight: [],
            filter: nextProps.offPlanList.filter,
          });
        } else {
          // when filter changed, new list has elements
          const processedOffPlanList = this.buildElements(nextProps.offPlanListData);
          this.setState({
            isInfiniteLoading: false,
            list: processedOffPlanList.elements,
            listItemHeight: processedOffPlanList.elementHeight,
            filter: nextProps.offPlanList.filter
          });
        }
      } else {
        if (nextProps.offPlanListData.length != this.state.list.length) {
          const processedOffPlanList = this.buildElements(nextProps.offPlanListData);
          this.setState({
            isInfiniteLoading: false,
            list: processedOffPlanList.elements,
            listItemHeight: processedOffPlanList.elementHeight,
            filter: nextProps.offPlanList.filter
          });
        } else {
          // console.log('not updated');
          this.setState({ noMoreData: true });
        }
      }
    }
  }

  buildElements(offPlanListData) {
    // console.log(offPlanListData);
    const elements = [];
    const elementHeight = [];
    for (var i = 0, l = offPlanListData.length; i < l; i++) {
      if (offPlanListData[i].isApproval) {
        elements.push(<OpApvedListItem offPlan={offPlanListData[i]} key={offPlanListData[i]._id} lists={this.props.lists} />);
        elementHeight.push(290);
      }
    }
  //  offPlanListData.forEach((offPlan) => {
  //       // if only have 1 floorplan ,it should have 200(image height) + 90(tags height)
  //       elementHeight.push(200 + 90);
  //     elements.push(<OpApvedListItem offPlan={offPlan} key={offPlan._id} lists={this.props.lists}/>)
  //   });

    return { elements, elementHeight };
  }

  handleInfiniteLoad() {
    this.props.dispatch(infiniteScrollPageChange());
    this.setState({
      isInfiniteLoading: true
    });
  }

  render() {

    const APP_BAR_HEIGHT = 64;
    const SEARCH_BAR_HEIGHT = 50;
    const CONTAINER_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_BAR_HEIGHT;

    if (this.state.list.length === 0) {
      return (
        <LoadSpinner noMoreData={this.state.noMoreData} />
      );
    } else {
      return (
        <Infinite
          timeScrollStateLastsForAfterUserScrolls={1000}
          elementHeight={this.state.listItemHeight}
          containerHeight={CONTAINER_HEIGHT}
          infiniteLoadBeginEdgeOffset={200}
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

const ProjectListContainer = createContainer(({lists, offPlanList}) => {
  const offPlanListSub = Meteor.subscribe('offPlanList', offPlanList.filter, offPlanList.page);
  // TODO: make query
  const query = makeQuery(offPlanList.filter);

  const offPlanListData = OffPlans.find(query).fetch() || [];

  return {
    subReady: offPlanListSub.ready(),
    lists,
    offPlanListData
  };

}, OffPlanList);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    offPlanList: state.offPlanList
  };
}

export default connect(mapStateToProps)(ProjectListContainer);

function makeQuery(filter) {
  let query = {};

  if (filter.location) {
    if (filter.location.country === 'ALL') {
      // generate a clean filter 
    } else {
      if (filter.location.city === 'ALL') {
        query.country = filter.location.country;
      } else {
        // search both country and city
        query.country = filter.location.country;
        query.city = filter.location.city;
      }
    }
  }

  if (filter.price) {
    const fromPrice = parseInt(filter.price.fromPrice);
    const toPrice = parseInt(filter.price.toPrice);
    if (fromPrice === -1) {
      // do nothing
    } else {
      if (fromPrice === 9000000) {
        query['fromPrice.amount'] = { '$gte': fromPrice };
      } else {
        query['$and'] = [{ 'fromPrice.amount': { '$gte': fromPrice } }, { 'fromPrice.amount': { '$lt': toPrice } }];
      }
    }
  }
  if (filter.classes) {
    if (filter.classes.code === 'ALL') {
      // do nothing
    } else {
      query.classes = filter.classes.code;
    }
  }
  return query;
}