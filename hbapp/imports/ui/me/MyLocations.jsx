import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import UserLocations from '/imports/db/userLocations';



// style json
import JsonStyle from './myLocationsStyle.json';
import Styler from '/imports/utils/Styler.js';

class MyLocation extends Component {
  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }

  itemOnClick(i) {
    this.props.router.push('/me/mylocations/edit/' + i);
  }

  newLocation() {
    this.props.router.push('/me/mylocations/new');
  }

  render() {
    var locations = [];
    if(this.props.myLocations) {
      for(var i=0, l=this.props.myLocations.locations.length; i<l; i++) {
        var loc = this.props.myLocations.locations[i];

        locations.push(
          <RaisedButton key={i} className="OLRB OLRBAgent" label={loc.address}
            {...this.page.style("OLRB", "OLRBAgent") }
            onClick={this.itemOnClick.bind(this, i)}
            icon={<i className="fa fa-location-arrow OLRBIcon" {...this.page.style("OLRBIcon") } />} >
            <i className="fa fa-chevron-right OLRBringht" {...this.page.style("OLRBringht") }  ></i>
          </RaisedButton>
        );
      }
    }
    

    return (
      <div className="divContainer" {...this.page.style("divContainer") } >
        <div className="addButton" {...this.page.style("addButton")} onClick={this.newLocation.bind(this)} >
          <i className="fa fa-plus" />
        </div>
        {locations}
      </div>
    );
  }
}


const MyLocationContainer = createContainer(({filter, page, lists}) => {
  var userId = Meteor.userId();
  var userLocationSub = Meteor.subscribe('userLocations', userId);

  var subReady = userLocationSub.ready();
  var myLocations = UserLocations.findOne();
  
  return {
    lists,
    subReady,
    myLocations
  }

}, MyLocation);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    filter: state.myFolderList.filter,
    page: state.myFolderList.page,
    myLocations: state.myLocations,
    subReady: state.subReady
  };
}

export default connect(mapStateToProps)(MyLocationContainer);
