import React, { Component } from 'react';
import { AppBar, FlatButton, FontIcon, IconButton, Checkbox } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { createContainer } from 'meteor/react-meteor-data';
import { Provider, connect } from 'react-redux';
import MyOffPlanList from './MyOffPlanList';
import LoadSpinner from '/imports/ui/utils/LoadSpinner';

// collections
import OffPlans from '../../db/offPlans';
// style json
import JsonStyle from './offplan.json';
import Styler from '/imports/utils/Styler.js';

class OffPlanHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offplanType: 'releasing',
    };
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

  handleOffplanTypeChange(v) {
    this.setState({ offplanType: v });
  }


  onBack() {
    this.props.router.push('/me/offplan_lists');
  }

  onAdd() {
    this.props.router.push('/me/offplan_lists/newoffplan');
  }

  render() {

    // console.log(this.props);

    const offplan = this.props.offPlansData;
    const BODY_HEIGHT = screen.height - 64;

    return (
      <div>
        <div>
          <AppBar className="appBar OHAB" title="我的列表"
            {...this.page.style("appBar", "OHAB") }
            iconElementRight={<i className="fa fa-plus OHIconR"
              {...this.page.style("OHIconR") }
              onTouchTap={this.onAdd.bind(this)} />}
          >
          </AppBar>
          <FlatButton className="ABButton" {...this.page.style("ABButton") }
            icon={< FontIcon className="fa fa-chevron-left ABIcon"  {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>

        <div className="OHContent" {...this.page.style("OHContent") }>
          <Tabs className="OHTabs"
            {...this.page.style("OHTabs") }
            value={this.state.offplanType}
            onChange={this.handleOffplanTypeChange.bind(this)}
          >
            <Tab className="OHTab" {...this.page.style("OHTab") }  label="发布中" value='releasing'>
              <MyOffPlanList offplanFinished={false} />
            </Tab>
            <Tab className="OHTab" {...this.page.style("OHTab") } label="已结束" value='finished'>
              <MyOffPlanList offplanFinished={true} />
            </Tab>
          </Tabs>
        </div>

      </div >
    );
  }
}



const OffPlanHomeContainer = createContainer(({lists}) => {
  const offPlansSub = Meteor.subscribe('offPlans');
  const offPlansData = OffPlans.find().fetch() || [];
  const listsSub = Meteor.subscribe('lists');

  return {
    subReady: offPlansSub.ready() && listsSub.ready(),
    lists,
    offPlansData
  }

}, OffPlanHome);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    // offPlans: state.offPlans,
  };
}

export default connect(mapStateToProps)(OffPlanHomeContainer);
