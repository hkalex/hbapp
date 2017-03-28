import React, { Component } from 'react';
import { AppBar, FlatButton, FontIcon, IconButton, Checkbox } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { createContainer } from 'meteor/react-meteor-data';
import { Provider, connect } from 'react-redux';
import MyOffPlanListItem from './MyOffPlanListItem';
import LoadSpinner from '/imports/ui/utils/LoadSpinner';

// collections
import OffPlans from '../../db/offPlans';

class MyOffPlanList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isInfiniteLoading: false,
      noMoreData: false,
    }

  }

    componentWillMount() {
    if (this.props.subReady) {
      const listLength = this.props.offPlansData ? this.props.offPlansData.length : 0;
      if (listLength == this.state.list.length) {
        // terminate condition. 
        this.setState({ noMoreData: true });
      } else {
        this.setState({
          isInfiniteLoading: false,
          list: this.buildElements(this.props.offPlansData)
        });
      }
    }
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
    if (nextProps.subReady) {
      if (nextProps.offPlansData.length == 0 || nextProps.offplanFinished) {
        // when filter changed, and new list has nothing
        this.setState({
          isInfiniteLoading: true,
          noMoreData: true,
          list: [],
        });
      } else {
        // when filter changed, new list has elements
        const processedOffplanList = this.buildElements(nextProps.offPlansData);
        this.setState({
          isInfiniteLoading: false,
          noMoreData: true,
          list: processedOffplanList.elements,
        });
      }
    }
  }

  buildElements(offplanList) {
    const elements = [];
    offplanList.forEach((offplan) => {
      elements.push(<MyOffPlanListItem offplan={offplan} key={offplan._id} />)
    });
    return { elements };
  }


  handleInfiniteLoad() {
    // this.props.dispatch(infiniteScrollPageChange());
    this.setState({
      isInfiniteLoading: true
    });
  }

  onBack() {
    this.props.router.push('/me/offplan_lists');
  }

  onAdd() {
    this.props.router.push('/me/offplan_lists/newoffplan');
  }

  render() {

    const offplan = this.props.offPlansData;
    const APP_BAR_HEIGHT = 64;
    const SEARCH_BAR_HEIGHT = 50;
    const BODY_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_BAR_HEIGHT;

    const content = this.state.list.length === 0 ?
      <div  >
        <LoadSpinner noMoreData={this.state.noMoreData} />
      </div>
      :
      <div >
        <Infinite
          timeScrollStateLastsForAfterUserScrolls={1000}
          elementHeight={110}
          containerHeight={BODY_HEIGHT}
          infiniteLoadBeginEdgeOffset={200}
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



const MyOffPlanListContainer = createContainer(({lists}) => {
  const offPlansSub = Meteor.subscribe('offPlans');
  const offPlansData = OffPlans.find().fetch() || [];
  const listsSub = Meteor.subscribe('lists');

  return {
    subReady: offPlansSub.ready() && listsSub.ready(),
    lists,
    offPlansData
  }

}, MyOffPlanList);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    // offPlans: state.offPlans,
  };
}

export default connect(mapStateToProps)(MyOffPlanListContainer);
