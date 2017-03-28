import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import DevTools from '../../utils/DevTools';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { AppBar, FlatButton, FontIcon } from 'material-ui';
import logger from '../../loggers/logger';

// components
import OpApvedSearchBar from './OpApvedSearchBar';
import OpApvedList from './OpApvedList';

// Constants
import C, { STYLE } from '../../consts/Constants';
// style json
import JsonStyle from './offPlan.json';
import Styler from '/imports/utils/Styler.js';


class OpApvedHome extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.page = new Styler(JsonStyle);
  }
  onBack() {
    this.props.router.goBack();
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    // const APP_BAR_HEIGHT = 64;
    // const SEARCH_BAR_HEIGHT = 50;
    // const CONTAINER_HEIGHT = screen.height - APP_BAR_HEIGHT - SEARCH_BAR_HEIGHT;

    return (
      <div>
        <div className='app-bar'>
          <AppBar className="appBar" title="更多二手楼花"
            {...this.page.style("appBar") } />
          <FlatButton className="offplan-home-flatbutton"
            {...this.page.style("offplan-home-flatbutton") }
            icon={<FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className='offplan-home-body' {...this.page.style("offplan-home-body") } >
          <OpApvedSearchBar dispatch={this.props.dispatch} lists={this.props.lists} filter={this.props.filter} />
          <div className="offplan-home-container" {...this.page.style("offplan-home-container") }>
            <OpApvedList />
          </div>
        </div>
      </div>
    );
  }
}

const OpApvedHomeContainer = createContainer(({lists}) => {

  return {
    subReady: true
  };

}, OpApvedHome);

function mapStateToProps(state) {
  return {
    lists: state.lists,
  };
}

export default connect(mapStateToProps)(OpApvedHomeContainer); 
