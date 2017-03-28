import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Infinite from 'react-infinite';
import _ from 'lodash';

import LoadSpinner from '/imports/ui/utils/LoadSpinner';
import InfolistItem from './InformationListItem';
import Info from '/imports/db/infos';

// actions
import { infoListPageChangeAction } from '/imports/actions/discover/infoActions';

class InfoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      listItemHeight: [],
      filter: {
        location: { code: 'ALL', text: '不限' },
        classes: { code: 'ALL', title: '不限' }
      },
      isInfiniteLoading: false,
      noMoreData: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // to prevent 1 render when there is no data
    if (nextProps.subReady === false) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    // when infoListData ready
    if (nextProps.subReady) {

      const filterChanged = !(nextProps.infoList.filter.location.code == this.state.filter.location.code || nextProps.infoList.filter.classes.code == this.state.filter.classes.code)

      if (filterChanged) {
        if (nextProps.infoListData.length == 0) {
          this.setState({
            isInfiniteLoading: true,
            noMoreData: true,
            list: [],
            listItemHeight: [],
            filter: nextProps.infoList.filter,
          });
        } else {
          const newInfoList = this.buildElements(nextProps.infoListData);
          this.setState({
            isInfiniteLoading: false,
            list: newInfoList.elements,
            listItemHeight: newInfoList.elementHeight,
            filter: nextProps.infoList.filter
          });
        }
      } else {
        if (nextProps.infoListData.length != this.state.list.length) {
          const newInfoList = this.buildElements(nextProps.infoListData);
          this.setState({
            isInfiniteLoading: false,
            list: newInfoList.elements,
            listItemHeight: newInfoList.elementHeight,
            filter: nextProps.infoList.filter
          });
        } else {
          this.setState({
            noMoreData: true
          })
        }
      }
    }
  }

  buildElements(info) {

    const elements = [];
    const elementHeight = [];
    info.forEach((lists) => {
      elementHeight.push(200 + 60);
      elements.push(<InfolistItem key={lists._id} item={lists} />);
    })

    return { elements, elementHeight }
    // const elements = info.map((v, i) => {
    //   return (<InfolistItem key={i} item={v} />);
    // });
    // return elements;
  }

  handleInfiniteLoad() {
    this.props.dispatch(infoListPageChangeAction());
    this.setState({
      isInfiniteLoading: true
    })
  }

  render() {
    // console.log(this.props)

    const APP_BAR_HEIGHT = 64;
    const SEARCH_HEIGHT = 50;
    const CONTAINER_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_HEIGHT;

    if (this.state.list.length === 0) {
      return (
        <LoadSpinner noMoreData={this.state.noMoreData} />
      )
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
      )
    }
  }
}

const InfoListContainer = createContainer(({lists, infoList}) => {

  const infoListSub = Meteor.subscribe('info', infoList.filter, infoList.page);
  let query = {};

  if (infoList.filter.location.code !== 'ALL') {
    query = Object.assign(query, {
      country: infoList.filter.location.text
    });
  }
  if (infoList.filter.classes.code !== 'ALL') {
    query = Object.assign(query, {
      type: infoList.filter.classes.code
    });
  }

  // if (infoList.filter.location.code === 'ALL') {
  // } else {
  //   query = Object.assign(query, {
  //     country: infoList.filter.location.text
  //   });
  // }
  // if (infoList.filter.classes.code === 'ALL') {

  // } else {
  //   query = Object.assign(query, {
  //     type: infoList.filter.classes.code
  //   });
  // }

  // console.log(query)
  const infoListData = Info.find(query).fetch() || [];

  return {
    subReady: infoListSub.ready(),
    infoListData
  }
}, InfoList)

function mapStateToProps(state) {
  return {
    lists: state.lists,
    infoList: state.infoList
  }
}

export default connect(mapStateToProps)(InfoListContainer)