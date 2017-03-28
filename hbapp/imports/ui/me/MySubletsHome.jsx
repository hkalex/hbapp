import React, { Component } from 'react';
import { AppBar, FlatButton, FontIcon, IconButton, Checkbox } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { createContainer } from 'meteor/react-meteor-data';
import { Provider, connect } from 'react-redux';
import MySubletsList from './MySubletsList';
import LoadSpinner from '/imports/ui/utils/LoadSpinner';

// collections
import Sublets from '../../db/sublets';
// style json
import JsonStyle from './offplan.json';
import Styler from '/imports/utils/Styler.js';

class MySubletsHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subletType: 'releasing',
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

  handleSubletsTypeChange(v) {
    this.setState({ subletType: v });
  }


  onBack() {
    this.props.router.push('/me/sublets');
  }

  onAdd() {
    this.props.router.push('/me/sublets_new');
  }

  render() {

    console.log(this.props);

    const sublets = this.props.subletsData;
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
            onChange={this.handleSubletsTypeChange.bind(this)}
          >
            <Tab className="OHTab" {...this.page.style("OHTab") } label="发布中" value='releasing'>
              <MySubletsList offplanFinished={false} />
            </Tab>
            <Tab className="OHTab" {...this.page.style("OHTab") } label="已结束" value='finished'>
              <MySubletsList offplanFinished={true} />
            </Tab>
          </Tabs>
        </div>

      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm,
  };
}
export default connect(mapStateToProps)(MySubletsHome);
