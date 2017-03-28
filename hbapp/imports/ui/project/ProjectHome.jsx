import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import DevTools from '../../utils/DevTools';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';
import logger from '../../loggers/logger';

// components
import ProjectSearchBar from './ProjectSearchBar';
import ProjectList from './ProjectList';

// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';


class ProjectHome extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.page = new Styler(JsonStyle);
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)

    return (
      <div className='project-home-body'>
        <ProjectSearchBar dispatch={this.props.dispatch} lists={this.props.lists} filter={this.props.filter} />
        <div className='project-home-content'  {...this.page.style("project-home-content") }>
          <ProjectList />
        </div>
      </div>
    );
  }
}

const ProjectListContainer = createContainer(({lists}) => {

  return {
    subReady: true
  };

}, ProjectHome);

function mapStateToProps(state) {
  return {
    lists: state.lists,
  };
}

export default connect(mapStateToProps)(ProjectListContainer); 
