import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import UserLocations from '/imports/db/userLocations';



// style json
import JsonStyle from './myLocationsStyle.json';
import Styler from '/imports/utils/Styler.js';

class MyLocationMapPage extends Component {
  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);

    this.editIndex = this.props.routeParams.index;
    this.isEdit = this.props.routeParams.index != null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }


  render() {
    return (
      <div>
        <div>
          <input type="search" ref="address" maxLength="100" style={{width:"100%"}} placeholder="地址 或 名字" />
        </div>
        MyLocationMapPage + {this.props.routeParams.index}<br />
        isEdit: {this.isEdit ? "true" : "false"}<br />
        editIndex: {this.editIndex}
      </div>
    );
  }
}


const MyLocationMapPageContainer = createContainer(({filter, page, lists}) => {
  var userId = Meteor.userId();
  var userLocationSub = Meteor.subscribe('userLocations', userId);

  var subReady = userLocationSub.ready();
  var myLocations = UserLocations.findOne();
  
  return {
    lists,
    subReady,
    myLocations
  }

}, MyLocationMapPage);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    filter: state.myFolderList.filter,
    page: state.myFolderList.page,
    myLocations: state.myLocations,
    subReady: state.subReady
  };
}

export default connect(mapStateToProps)(MyLocationMapPageContainer);
