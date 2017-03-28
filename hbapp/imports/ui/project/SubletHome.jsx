import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import logger from '../../loggers/logger';
import Sublets from '/imports/db/sublets';
// components
import SearchBar from './SearchBar';
import SubletList from './SubletList';

// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';


class SubletHome extends Component {
  constructor() {
    super();
    this.page = new Styler(JsonStyle);
  }

  render() {
    // console.log(this.props)
    if (this.props.subReady == false) return <div />;

    return (
      <div className='project-home-body'>
        <SearchBar />
        <div className='project-home-content'  {...this.page.style("project-home-content") }>
          <SubletList />
        </div>
      </div>
    );
  }
}

const SubletHomeContainer = createContainer(() => {
  return {
    subReady: true
  };
}, SubletHome);

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm
  }
}

export default connect(mapStateToProps)(SubletHomeContainer);