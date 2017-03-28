import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import Lists from '/imports/db/lists';
import Languages from '/imports/db/languages';
import Store from '/imports/stores/store';
import logger from '../loggers/logger';

// actions
import { setListsAction } from '/imports/actions/utils/listsAction';
import { setLangsAction } from '/imports/actions/utils/langsAction';

// pages
import AppRoot from '../ui/AppRoot';

import UserNew from '../ui/user/UserNew';
import UserLogin from '../ui/user/UserLogin';
import PasswordReset from '../ui/user/PasswordReset';

import LandingPage from '../ui/main/LandingPage';
import MainPage from '../ui/main/MainPage';

// import ProjectHome from '../ui/project/ProjectHome';
import SubletHome from '../ui/project/SubletHome';
import Detail from '../ui/project/Detail';

import OpApvedHome from '../ui/offPlans/OpApvedHome';

import DiscoverHome from '../ui/discover/DiscoverHome';
import InfoPage from '../ui/discover/InfoPage';
import InfoDetail from '../ui/discover/InfoDetail';
import ActivityPage from '../ui/discover/ActivityPage';
import ActivityDetail from '../ui/discover/ActivityDetail';

import MeHome from '../ui/me/MeHome';
import Home from '../ui/me/Home';
import MyFolder from '../ui/me/MyFolder';
import NewOffPlan from '../ui/me/NewOffPlan';
import OffPlansList from '../ui/me/OffPlansList';
import OffPlanHome from '../ui/me/OffPlanHome';
import MyOffPlanDetail from '../ui/me/MyOffPlanDetail';
import EditOffPlan from '../ui/me/EditOffPlan';

import MySublets from '../ui/me/MySublets';
import MySubletsHome from '../ui/me/MySubletsHome';

import MyLocations from '../ui/me/MyLocations';
import MyLocationsMapPage from '../ui/me/MyLocationMapPage.jsx';

import FriendHome from '../ui/friend/home';
import Sublet from '../ui/rent/Sublet';
import RoomDetail from '../ui/rent/RoomDetail';
import SubletDetailHome from '../ui/rent/DetailTopBar';

// bind phone number
import BindMobile from '../ui/home/BindMobile';
import NewHomePage from '../ui/home/HomePage';

import analytics from '../intg/analytics';

// tests
import TestRoutes from './TestRoutes';
import AlexTestPage from '../ui/common/AlexTestPage';


class Routes extends Component {
  constructor() {
    super();
    this.analytics = analytics.init({
      version: '1.0.0',
      channel: 'webApp'
    });
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

  componentWillMount() {
    browserHistory.listen((location) => {
      this.analytics.send({
        event: 'onEnter',
        attr: {
          pathname: location.pathname
        },
        duration: 6000
      }, function (result) {
        result && logger.debug('analytics send success');
      });

    });

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subReady) {
      nextProps.dispatch(setListsAction(nextProps.lists));
      nextProps.dispatch(setLangsAction(nextProps.langs));
    }
  }


  render() {
    // console.log(this.props)

    // prevents initial render without List from server. 
    // Thus all children will get List at their initial render.  
    // This is not Pretty
    // TODO: maybe think of another way. 


    if (this.props.subReady == false) return <div />;

    return (
      <Router history={browserHistory}>

        <Route path="/" component={AppRoot} >
          <IndexRedirect to="/landing" />

          <Route path="main" component={MainPage} showFooter={false} showBackButton={false}>
            <Route path="/landing" component={LandingPage} />
            <Route path="/alextestpage" component={AlexTestPage} />
          </Route>


          <Route path="main" component={MainPage} showFooter={true} showBackButton={false}>
            <IndexRoute component={NewHomePage} />
            <Route path="/home" component={NewHomePage} />
            {/*<Route path="/project" component={ProjectHome} />*/}
            <Route path="/project" component={SubletHome} />
            <Route path="/opapved" component={OpApvedHome} />
            <Route path="/friends" component={FriendHome} />
            <Route path="/discover" component={DiscoverHome} />
            <Route path="/me" component={MeHome} />
            <Route path="/me_test" component={Home} />
          </Route>

          <Route path="__main" component={MainPage} showFooter={false} showBackButton={true}>
            <Route path="/me/mylocations" component={MyLocations} />
            <Route path="/me/mylocations/new" component={MyLocationsMapPage} />
            <Route path="/me/mylocations/edit/:index" component={MyLocationsMapPage} />

            <Route path="/user_new" component={UserNew} />
            <Route path="/user_login" component={UserLogin} />
            <Route path="/user_password_reset" component={PasswordReset} />
          </Route>


          <Route path="/bind_phone" component={BindMobile} />


          {/*<Route path="/project/:_id" component={ProjectDetail} />*/}
          <Route path="/project/:_id" component={Detail} />
          <Route path="/me/my_folder" component={MyFolder} />
          <Route path="/me/offplan_lists" component={OffPlansList} />
          <Route path="/me/offplan_lists/newoffplan" component={NewOffPlan} />
          <Route path="/me/offplan_lists/item" component={OffPlanHome} />
          <Route path="/me/offplan_lists/item/:_id" component={MyOffPlanDetail} />
          <Route path="/me/offplan_lists/modify/:_id" component={EditOffPlan} />

          <Route path="/me/sublets" component={MySublets} />
          <Route path="/me/sublets/list" component={MySubletsHome} />
          <Route path="/me/sublets_new" component={Sublet} />
          <Route path="/me/sublets_new/room" component={RoomDetail} />
          <Route path="/me/sublets/list/:id" component={SubletDetailHome} />

          <Route path="/info" component={InfoPage} />
          <Route path="/activity" component={ActivityPage} />
          <Route path="/info/:_id" component={InfoDetail} />
          <Route path="/activity/:_id" component={ActivityDetail} />

          {/*TODO */}




        </Route>
        {TestRoutes}
      </Router>
    );
  }
}


const RouterContainer = createContainer(() => {

  const sub = Meteor.subscribe('lists')
  const subLang = Meteor.subscribe('languages');

  const rawLists = Lists.find().fetch() || [];
  const langs = Languages.find().fetch() || [];

  let listObject = {};
  rawLists.forEach((list) => {
    listObject[list.code] = list;
  });

  return {
    subReady: sub.ready() && subLang.ready(),
    lists: listObject,
    langs: langs
  };

}, Routes);

export default class RoutesPage extends Component {
  render() {
    const RoutesPage = connect()(RouterContainer);
    return (
      <Provider store={Store}>
        <RoutesPage {...this.props} />
      </Provider>
    );
  }
}
