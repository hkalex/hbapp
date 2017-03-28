import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Provider, connect } from 'react-redux';
import Store from '../../stores/store';
import { RaisedButton } from 'material-ui';
import { AppBar, FlatButton, FontIcon } from 'material-ui';
import { Link } from 'react-router';
// style json
import JsonStyle from './offplan.json';
import Styler from '/imports/utils/Styler.js';

export default class MySublets extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
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

  }

  onBack() {
    this.props.router.push('/me');
  }

  // 我的分租
  onMySublet() {
    this.props.router.push('/me/sublets/list')
  }


  render() {

    // console.log(this.props)
    let container;

    container = <div>
      <RaisedButton className="OLRB" label="我的列表"
        {...this.page.style("OLRB") }
        onClick={this.onMySublet.bind(this)}
        icon={<i className="fa fa-building-o OLRBIcon" {...this.page.style("OLRBIcon") } />} >
        <i className="fa fa-chevron-right OLRBringht" {...this.page.style("OLRBringht") }  ></i>
      </RaisedButton>
    </div>

    return (
      <div>
        <div>
          <AppBar className="appBar" title="我的分租房"
            {...this.page.style("appBar") }>
          </AppBar>
          <FlatButton className="ABButton"  {...this.page.style("ABButton") }
            icon={< FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className="divContainer"   {...this.page.style("divContainer") } >
          {container}
        </div>
      </div >
    );
  }
}


