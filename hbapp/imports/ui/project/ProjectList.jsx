import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Infinite from 'react-infinite';
import _ from 'lodash';

import C from '../../consts/Constants';

// collections
import Projects from '/imports/db/projects';

// actions
import { infiniteScrollPageChange } from '../../actions/project/projectListActions';

// components
import LoadSpinner from '/imports/ui/utils/LoadSpinner';
import ProjectListItem from './ProjectListItem';

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],

      filter: {
        location: { city: 'ALL', country: 'ALL', title: '不限' },
        price: { fromPrice: '-1', toPrice: '0', range: '不限' },
        classes: { code: 'ALL', title: '不限' }
      },
      isInfiniteLoading: false,
      noMoreData: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('should component update ?')
    // console.log(nextProps,nextState)

    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {

    // When projectListData ready.
    if (nextProps.subReady) {

      const filterChanged = !((nextProps.projectList.filter.location.city == this.state.filter.location.city) &&
        (nextProps.projectList.filter.location.country == this.state.filter.location.country) &&
        (nextProps.projectList.filter.price && (nextProps.projectList.filter.price.fromPrice == this.state.filter.price.fromPrice)) &&
        (nextProps.projectList.filter.classes && (nextProps.projectList.filter.classes.code == this.state.filter.classes.code)));

      if (filterChanged) {
        // console.log('filter changed')
        if (nextProps.projectListData.length == 0) {
          // when filter changed, and new list has nothing
          this.setState({
            isInfiniteLoading: true,
            noMoreData: true,
            list: [],

            filter: nextProps.projectList.filter,
          });
        } else {
          // when filter changed, new list has elements
          const processedProjectList = this.buildElements(nextProps.projectListData);
          this.setState({
            isInfiniteLoading: false,
            list: processedProjectList,

            filter: nextProps.projectList.filter
          });
        }
      } else {
        // console.log('filter not changed')        
        if (nextProps.projectListData.length != this.state.list.length) {
          // console.log('list length not equal')
          // console.log('updated')
          const processedProjectList = this.buildElements(nextProps.projectListData);
          this.setState({
            isInfiniteLoading: false,
            list: processedProjectList,

            filter: nextProps.projectList.filter
          });
        } else {
          // console.log('list length equal')
          // console.log('not updated')        
          this.setState({ noMoreData: true });
        }
      }
    }
  }

  buildElements(projectList) {

    const elements = [];

    projectList.forEach((project) => {

      elements.push(<ProjectListItem project={project} key={project._id} lists={this.props.lists} />)
    });

    return elements;
  }

  handleInfiniteLoad() {
    // this.props.dispatch(infiniteScrollPageChange());
    this.setState({
      isInfiniteLoading: true
    });
  }

  render() {
    console.log(this.state.list)
    console.log(this.props)

    const APP_BAR_HEIGHT = 44;
    const SEARCH_BAR_HEIGHT = 50;
    const FOOTER_HEIGHT = 50;
    const CONTAINER_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_BAR_HEIGHT - FOOTER_HEIGHT;

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
          <div className="row">
            {this.state.list}
          </div>
        </Infinite>
      );
    }
  }
}

const ProjectListContainer = createContainer(({lists, projectList}) => {

  const projectListSub = Meteor.subscribe('projectList', projectList.filter, projectList.page);
  // TODO: make query
  const query = makeQuery(projectList.filter);
  const projectListData = Projects.find(query).fetch() || [];

  return {
    subReady: projectListSub.ready(),
    projectListData,
    lists
  };

}, ProjectList);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    projectList: state.projectList

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