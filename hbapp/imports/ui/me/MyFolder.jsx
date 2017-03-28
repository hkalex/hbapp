import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import DevTools from '/imports/utils/DevTools';
import { Provider, connect } from 'react-redux';
import Favorites from '/imports/db/favorites';
import Orders from '/imports/db/orders';
import Store from '../../stores/store';
import _ from 'lodash';
import Lists from '../../db/lists';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import { AppBar, FlatButton, FontIcon } from 'material-ui';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import RaisedButton from 'material-ui/RaisedButton';
import MyFolderList from './MyFolderList';


// actions
import { myFolderFilterChangeAction } from '/imports/actions/myFolder/myFolderFilterChangeAction';

// style json
import JsonStyle from './me.json';
import Styler from '/imports/utils/Styler.js';


class MyFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      open: false,
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

  onBack() {
    this.props.router.goBack();
  }

  onStepperClick(filter, index) {
    this.setState({ stepIndex: index });
    this.props.dispatch(myFolderFilterChangeAction(filter));
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  render() {
    // console.log(this.props)

    const shortDesc = this.props.lists["Order.step"] ? this.props.lists["Order.step"]["detail"] : null;
    let remark = null;
    // let  bgc = false;
    let stepper, showStepDesc;
    if (shortDesc) {
      stepper = shortDesc.map((v, i) => {
        // debugger;    
        return (
          <Step key={i + 1} className="MFStep" {...this.page.style("MFStep") }>
            <StepButton className="MFStepBtn" {...this.page.style("MFStepBtn") }
              value={v.code}
              onTouchTap={this.onStepperClick.bind(this, v.code, i + 1)}
              disableTouchRipple={true}
              disableFocusRipple={true} >
              {/**  <span style={{ fontSize: '10px' }}>{v.text}</span>*/}
            </StepButton>
          </Step>
        );
      });

      const favoriteStepper =
        <Step key={0} className="MFStep" {...this.page.style("MFStep") }>
          <StepButton className="MFStepBtn" {...this.page.style("MFStepBtn") }
            value={'favorites'}
            onTouchTap={this.onStepperClick.bind(this, 'favorites', 0)}
            disableTouchRipple={true}
            disableFocusRipple={true} >
            {/**  <span style={{ fontSize: '10px' }}>{v.text}</span>*/}
          </StepButton>
        </Step>;
      stepper.unshift(favoriteStepper);

      showStepDesc = shortDesc.map((v, i) => {
        // debugger;    
        return (
          <Step key={i + 1} className="MFStep" {...this.page.style("MFStep") } onTouchTap={this.handleClose.bind(this)}>
            <StepButton className="MFStepBtn" {...this.page.style("MFStepBtn") }
              value={v.code}
              onTouchTap={this.onStepperClick.bind(this, v.code, i + 1)}

              disableTouchRipple={true}
              disableFocusRipple={true} >
              {v.title}
            </StepButton>
            <StepContent active={true}>
              <p>
                这里即将告诉你房产预订的流程以及每一步骤的操作说明，你知道吗？
                你不知道怎么订房子呢？？你不定房子怎么付定金呢？？？你不付定金怎么投资呢？？？？你不投资怎么能挣钱呢？？？
                你不努力挣钱怎么买我们的房子呢？？所以啊，快来看看我们的description，然后来汇邦买房子呀
              </p>
            </StepContent>
          </Step>
        );
      });
      const favoriteStep =
        <Step key={0} className="MFStep" {...this.page.style("MFStep") } onTouchTap={this.handleClose.bind(this)}>
          <StepButton className="MFStepBtn" {...this.page.style("MFStepBtn") }
            value={'favorites'}
            onTouchTap={this.onStepperClick.bind(this, 'favorites', 0)}

            disableTouchRipple={true}
            disableFocusRipple={true} >
            我的收藏
            </StepButton>
          <StepContent active={true}>
            <p>
              这里即将告诉你房产预订的流程以及每一步骤的操作说明，你知道吗？
                你不知道怎么订房子呢？？你不定房子怎么付定金呢？？？你不付定金怎么投资呢？？？？你不投资怎么能挣钱呢？？？
                你不努力挣钱怎么买我们的房子呢？？所以啊，快来看看我们的description，然后来汇邦买房子呀
              </p>
          </StepContent>
        </Step>;

      showStepDesc.unshift(favoriteStep)

    }

    return (
      <div>
        <div className="MFHeader" {...this.page.style("MFHeader") } >
          <AppBar className="appBar MFappBar" title='我的收藏'
            {...this.page.style("appBar", "MFappBar") }
            iconElementRight={<i className="fa fa-question-circle MFIconR"
              {...this.page.style("MFIconR") }
              onTouchTap={this.handleToggle.bind(this)} />} >
            <FlatButton className="ABButton MFABButton"
              {...this.page.style("ABButton", "MFABButton") }
              icon={<FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />}
              onClick={this.onBack.bind(this)} />
          </AppBar>
          <MyFolderList {...this.props} />
        </div>
        <Drawer className="MFDrawer" {...this.page.style("MFDrawer") }
          openSecondary={true}
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })} >
          <AppBar className="MFABHelp" title="帮助"
            {...this.page.style("MFABHelp") }
            onTouchTap={this.handleClose.bind(this)} />
          <div className="MFHStepDIv" {...this.page.style("MFHStepDIv") }>
            <Stepper className="MFHStepper"
              activeStep={this.state.stepIndex}
              linear={false}
              {...this.page.style("MFHStepper") } >
              {showStepDesc}
            </Stepper>
          </div>
        </Drawer>
        <div className="MFstepdiv" {...this.page.style("MFstepdiv") } >
          <Stepper className="MFStepper"
            activeStep={this.state.stepIndex}
            linear={false}
            {...this.page.style("MFStepper") } >
            {stepper}
          </Stepper>
        </div>
      </div>
    );
  }
}

const MyFolderContainer = createContainer(({filter, page, lists}) => {

  let listInfo, myFolderListSub;

  if (filter == 'favorites') {
    myFolderListSub = Meteor.subscribe(filter, Meteor.userId(), page);
    listInfo = Favorites.findOne({ userId: Meteor.userId() }) || null;
  } else {
    myFolderListSub = Meteor.subscribe('orders', filter, Meteor.userId(), page);

    const projects = Orders.find({ 'status.status': filter }).fetch().map((v, i) => {
      return v.DN.project;
    });
    listInfo = {
      projects
    }
  }

  const myFolderListSubReady = myFolderListSub.ready();

  return {
    lists,
    subReady: myFolderListSubReady,
    listInfo
  }

}, MyFolder);

function mapStateToProps(state) {
  return {
    lists: state.lists,
    filter: state.myFolderList.filter,
    page: state.myFolderList.page
  };
}

export default connect(mapStateToProps)(MyFolderContainer);
