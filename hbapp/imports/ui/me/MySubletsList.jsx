import React, { Component } from 'react';
import { AppBar, FlatButton, FontIcon, IconButton, Checkbox } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { createContainer } from 'meteor/react-meteor-data';
import { Provider, connect } from 'react-redux';
import MySubletsListItem from './MySubletsListItem';
import LoadSpinner from '/imports/ui/utils/LoadSpinner';

// collections
import Sublets from '../../db/sublets';

class MySubletsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isInfiniteLoading: false,
      noMoreData: true,
    }

  }

  componentWillMount() {
    if (this.props.subReady) {
      const listLength = this.props.subletsData ? this.props.subletsData.length : 0;
      if (listLength == this.state.list.length) {
        // terminate condition. 
        this.setState({ noMoreData: true });
      } else {
        this.setState({
          isInfiniteLoading: false,
          list: this.buildElements(this.props.subletsData)
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
      if (nextProps.subletsData.length == 0 || nextProps.offplanFinished) {
        // when filter changed, and new list has nothing
        this.setState({
          isInfiniteLoading: true,
          noMoreData: true,
          list: [],
        });
      } else {
        // when filter changed, new list has elements
        const processedSubletList = this.buildElements(nextProps.subletsData);
        this.setState({
          isInfiniteLoading: false,
          noMoreData: false,
          list: processedSubletList.elements,
        });
      }
    }
  }

  buildElements(subletsList) {
    const elements = [];
    subletsList.forEach((sublet) => {
      elements.push(<MySubletsListItem sublet={sublet} key={sublet._id} />)
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
    this.props.router.push('/me/sublets');
  }

  onAdd() {
    this.props.router.push('/me/sublets_new');
  }

  render() {
    // console.log(this.props)

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



const MySubletsListContainer = createContainer(({ subletForm }) => {
  const subletsSub = Meteor.subscribe('mySubletsList', Meteor.userId());
  const subletsData = Sublets.find().fetch() || [];

  return {
    subReady: subletsSub.ready(),
    subletForm,
    subletsData
  }

}, MySubletsList);

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm,
  };
}

export default connect(mapStateToProps)(MySubletsListContainer);
