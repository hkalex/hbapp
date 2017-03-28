import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import HomePage from '/imports/console/ui/home/HomePage';

import Login from '/imports/console/ui/common/Login';

import ProjectsList from '/imports/console/ui/projects/ProjectsList';
import NewProject from '/imports/console/ui/projects/NewProject';
import EditProject from '/imports/console/ui/projects/EditProject';

import OffPlansList from '/imports/console/ui/projects/OffPlansList';
import NewOffPlan from '/imports/console/ui/projects/NewOffPlan';
import EditOffPlan from '/imports/console/ui/projects/EditOffPlan';

import UsersList from '/imports/console/ui/users/UsersList';
import NewUser from '/imports/console/ui/users/NewUser';
import EditUser from '/imports/console/ui/users/EditUser';

import RolesList from '/imports/console/ui/users/RolesList';
import NewRole from '/imports/console/ui/users/NewRole';
import EditRole from '/imports/console/ui/users/EditRole';
import EditUserRole from '/imports/console/ui/users/EditUserRole';

import InfosList from '/imports/console/ui/info/InfosList';
import NewInfo from '/imports/console/ui/info/NewInfo';
import EditInfo from '/imports/console/ui/info/EditInfo';

import ActivitiesList from '/imports/console/ui/info/ActivitiesList';
import NewActivity from '/imports/console/ui/info/NewActivity';
import EditActivity from '/imports/console/ui/info/EditActivity';

import OrdersList from '/imports/console/ui/orders/OrdersList';
import NewOrder from '/imports/console/ui/orders/NewOrder';
import EditOrder from '/imports/console/ui/orders/EditOrder';

import Lists from '/imports/console/ui/settings/Lists';
import NewList from '/imports/console/ui/settings/NewList';
import EditList from '/imports/console/ui/settings/EditList';

import Params from '/imports/console/ui/settings/Params';
import NewParam from '/imports/console/ui/settings/NewParam';
import EditParam from '/imports/console/ui/settings/EditParam';

import Langs from '/imports/console/ui/settings/Langs';
import AddLang from '/imports/console/ui/settings/AddLang';
import EditLang from '/imports/console/ui/settings/EditLang';

import SubletList from '/imports/console/ui/sublet/SubletList';
import ApprovalSublet from '/imports/console/ui/sublet/ApprovalSublet';

import ManageMongo from '/imports/console/ui/home/ManageMongo';

import HandsonTableDemo from '/imports/console/ui/testPages/HandsonTableDemo';

import TestRoutes from './TestRoutes';

export class Routes extends Component {

  handleOnEnter(nextState, replace) {
    if (!Meteor.userId()) {
      replace('/login#' + nextState.location.pathname);
    }
  }

  render() {
    if (this.props.subReady == false) return <div></div>;

    let offPlanRoutes = null;
    if (this.props.user) {
      offPlanRoutes = this.props.user.roles.includes('admin') ?
        (<Route>
          <Route path="offplans/list" component={OffPlansList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="offplans/new" component={NewOffPlan} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="offplans/edit/:_id" component={EditOffPlan} onEnter={this.handleOnEnter.bind(this)} />
        </Route>) : null;
    }

    return (
      <Router history={browserHistory}>
        <Route path="/" component={HomePage} >

          <IndexRedirect to="projects/list" />

          <Route path="projects/list" component={ProjectsList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="projects/new" component={NewProject} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="projects/edit/:id" component={EditProject} onEnter={this.handleOnEnter.bind(this)} />

          {offPlanRoutes}

          <Route path="users/list" component={UsersList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="users/new" component={NewUser} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="users/edit/:id" component={EditUser} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="roles/list" component={RolesList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="roles/new" component={NewRole} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="roles/edit/:id" component={EditRole} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="roles/edituser/:id" component={EditUserRole} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="infos/list" component={InfosList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="infos/new" component={NewInfo} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="infos/edit/:id" component={EditInfo} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="activities/list" component={ActivitiesList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="activities/new" component={NewActivity} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="activities/edit/:id" component={EditActivity} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="orders/list" component={OrdersList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="orders/new" component={NewOrder} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="orders/edit/:id" component={EditOrder} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="settings/lists/list" component={Lists} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="settings/lists/new" component={NewList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="settings/lists/edit/:id" component={EditList} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="settings/params/list" component={Params} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="settings/params/new" component={NewParam} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="settings/params/edit/:id" component={EditParam} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="settings/langs/list" component={Langs} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="settings/langs/new" component={AddLang} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="settings/langs/edit/:id" component={EditLang} onEnter={this.handleOnEnter.bind(this)} />

          <Route path="sublet/list" component={SubletList} onEnter={this.handleOnEnter.bind(this)} />
          <Route path="sublet/approval/:id" component={ApprovalSublet} onEnter={this.handleOnEnter.bind(this)} />

        </Route>

        <Route path="/manage" component={ManageMongo} />

        <Route path="/login" component={Login} />

        <Route path="/table" component={HandsonTableDemo} />

        {TestRoutes}
      </Router>
    );
  }
}

export default createContainer(() => {
  const sub = Meteor.subscribe('allusers');
  return {
    subReady: sub.ready(),
    user: Meteor.users.findOne({ "_id": Meteor.userId() })
  };
}, Routes);