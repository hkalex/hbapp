import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Infinite from 'react-infinite';
import _ from 'lodash';
import { AppBar } from 'material-ui';
import MyFolderListItem from './MyFolderListItem';
import OrderListItem from './OrderListItem';
import LoadSpinner from '../utils/LoadSpinner';

// style json
import JsonStyle from './me.json';
import Styler from '/imports/utils/Styler.js';

// actions
import { myFolderInfiniteScrollPageChangeAction } from '/imports/actions/myFolder/myFolderListActions';

export default class MyFolderList extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      isInfiniteLoading: false,
      noMoreData: false
    };
    this.page = new Styler(JsonStyle);
  }


  componentWillMount() {
    if (this.props.subReady) {
      const listLength = this.props.listInfo ? this.props.listInfo.projects.length : 0;
      if (listLength == this.state.list.length) {
        // terminate condition. 
        this.setState({ noMoreData: true });
      } else {
        this.setState({
          isInfiniteLoading: false,
          list: this.buildElements(this.props.listInfo.projects)
        });
      }
    }
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.subReady) {
      const listLength = nextProps.listInfo ? nextProps.listInfo.projects.length : 0;
      const listItems = nextProps.listInfo ? nextProps.listInfo.projects : [];
      if (this.props.filter == nextProps.filter) {
        if (listLength == this.state.list.length) {
          // terminate condition. 
          this.setState({ noMoreData: true });
        } else {
          this.setState({
            isInfiniteLoading: false,
            list: this.buildElements(listItems, nextProps.filter)
          });
        }
      } else {
        this.setState({
          isInfiniteLoading: false,
          list: this.buildElements(listItems, nextProps.filter)
        });
      }
    }
  }

  buildElements(list, filter) {
    const elements = [];
    if (filter == 'favorites') {
      list.forEach((project) => {
        elements.push(<MyFolderListItem router={this.props.router}
          lists={this.props.lists}
          project={project}
          key={project.projectId} />);
      });
    } else {
      list.forEach((project) => {
        elements.push(<OrderListItem router={this.props.router}
          lists={this.props.lists}
          project={project}
          key={project.projectId} />);
      });
    }
    return elements;
  }

  handleInfiniteLoad() {
    // need to figure out a better terminate condition.
    this.props.dispatch(myFolderInfiniteScrollPageChangeAction());
    this.setState({
      isInfiniteLoading: true
    });

  }

  render() {

    // console.log(this.props)
    // console.log(this.state)

    const content = this.state.list.length === 0 ?
      <div className="MFLnoContent" {...this.page.style("MFLnoContent") } >
        <LoadSpinner noMoreData={this.state.noMoreData} />
      </div>
      :
      <div className="MFLContent" {...this.page.style("MFLContent") } >
        <Infinite
          elementHeight={110}
          containerHeight={screen.height - 64}
          infiniteLoadBeginEdgeOffset={100}
          onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
          loadingSpinnerDelegate={<LoadSpinner noMoreData={this.state.noMoreData} />}
          isInfiniteLoading={this.state.isInfiniteLoading}
        >
          {this.state.list}
        </Infinite>
      </div>;
    return (
      <div>
        {content}
      </div>
    );
  }
}

