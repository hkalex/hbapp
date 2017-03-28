import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { AppBar, FlatButton, FontIcon } from 'material-ui';
import InfoSearch from './InfoSearch';
import Info from '../../db/infos';
import InfoList from './InfoList';

// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';

// Actions
import { queryInfoAction } from '/imports/actions/discover/infoActions';

class InfoPage extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onBack() {
    this.props.router.goBack();
  }

  componentDidMount() {
    this.props.dispatch(queryInfoAction({
      location: { code: 'ALL', text: '不限' },
      classes: { code: 'ALL', title: '不限' }
    }));
  }


  render() {
    // console.log(this.props);
    return (
      <div>
        <div className='app-bar'>
          <AppBar className="appBar" title="资讯"
            {...this.page.style("appBar") } >
          </AppBar>
          <FlatButton className="ABButton"
            {...this.page.style("ABButton") }
            icon={<FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className='info-page-body' {...this.page.style("info-page-body") }>
          <InfoSearch />
          <div className="info-page-lists" {...this.page.style("info-page-lists") }><InfoList /></div>
        </div>
      </div>
    );
  }
}

const InfoPageContainer = createContainer(({lists, infoList}) => {

  return {

  };

}, InfoPage);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    infoList: state.infoList
  };
}

export default connect(mapStateToProps)(InfoPageContainer);