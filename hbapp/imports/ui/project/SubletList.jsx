import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Infinite from 'react-infinite';
import _ from 'lodash';

import C from '../../consts/Constants';

// collections
import Sublets from '/imports/db/sublets';
import ApprovedSublet from '/imports/db/approvedSublets';

// actions
import { infiniteScrollPageChange } from '../../actions/project/projectListActions';

// components
import LoadSpinner from '/imports/ui/utils/LoadSpinner';
import SubletListItem from './SubletListItem';

class SubletList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subletForm: [],
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

    // When roomsData ready.
    if (nextProps.subReady) {
      if (nextProps.subletListData.length != this.state.subletForm.length) {
        // console.log('list length not equal')
        // console.log('updated')
        const processedSubletList = this.buildElements(nextProps.subletListData);
        this.setState({
          isInfiniteLoading: false,
          subletForm: processedSubletList,
        });
      } else {
        // console.log('list length equal')
        // console.log('not updated')        
        this.setState({ noMoreData: true });
      }
    }
  }

  buildElements(subletList) {
    const elements = [];
    subletList.forEach((room) => {
      elements.push(<SubletListItem room={room} key={room._id} />)
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
    // console.log(this.state.list)
    // console.log(this.props)
    if (this.props.subReady == false) return <div />;

    const APP_BAR_HEIGHT = 44;
    const SEARCH_BAR_HEIGHT = 50;
    const FOOTER_HEIGHT = 50;
    const CONTAINER_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_BAR_HEIGHT - FOOTER_HEIGHT;

    if (this.state.subletForm.length === 0) {
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
            {this.state.subletForm}
          </div>
        </Infinite>
      );
    }
  }
}

const SubletListContainer = createContainer(({ subletForm, subletList }) => {

  const subletListSub = Meteor.subscribe('getSubletsList', subletList.filter, subletList.page);
  const subletListData = ApprovedSublet.find().fetch() || [];
  // TODO: make query
  return {
    subReady: subletListSub.ready(),
    subletListData,
    subletForm
  };

}, SubletList);

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm,
    subletList: state.subletList
  };
}

export default connect(mapStateToProps)(SubletListContainer);