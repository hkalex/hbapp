import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import pubsub from 'pubsub-js';
import { Collapse } from 'react-bootstrap';
import SidebarRun from './Sidebar.run';

class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      userBlockCollapse: false,
      collapse: {
        projects: this.routeActive(['/projects/list', '/projects/new']),
        infos: this.routeActive(['/infos/list', '/infos/new', '/activities/list', '/activities/new']),
        orders: this.routeActive(['/orders/list', '/orders/new']),
        users: this.routeActive(['/users/list', '/users/new', '/roles/list', '/roles/new']),
        settings: this.routeActive(['/settings/lists', '/settings/params', '/settings/langs']),
        sublet: this.routeActive(['/sublet/list'])
      }
    };
    this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
      this.setState({
        userBlockCollapse: !this.state.userBlockCollapse
      });
    });
  }

  componentDidMount() {
    // pass navigator to access router api
    SidebarRun(this.navigator.bind(this));
  }

  navigator(route) {
    this.props.router.push(route);
  }

  componentWillUnmount() {
    // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
    pubsub.unsubscribe(this.pubsub_token);
  }

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    for (let p in paths) {
      if (this.props.router.isActive(paths[p]) === true)
        return true;
    }
    return false;
  }

  toggleItemCollapse(stateName) {
    // var newCollapseState = {};
    // for (let c in this.state.collapse) {
    //   if (this.state.collapse[c] === true && c !== stateName)
    //     this.state.collapse[c] = false;
    // }
    this.setState({
      collapse: {
        [stateName]: !this.state.collapse[stateName]
      }
    });
  }

  render() {
    let offPlansList = null, newOffPlan = null;
    if (Meteor.user()) {
      offPlansList = Meteor.user().roles.includes('admin') ?
        <li className={this.routeActive('/offplans/list') ? 'active' : ''}>
          <Link to="/offplans/list" title="二手楼花清单">
            <span>二手楼花清单</span>
          </Link>
        </li> : null;
      newOffPlan = Meteor.user().roles.includes('admin') ?
        <li className={this.routeActive('/offplans/new') ? 'active' : ''}>
          <Link to="/offplans/new" title="新增二手楼花">
            <span>新增二手楼花</span>
          </Link>
        </li> : null;
    }

    return (
      <aside className='aside'>
        { /* START Sidebar (left) */}
        <div className="aside-inner">
          <nav data-sidebar-anyclick-close="" className="sidebar">
            { /* START sidebar nav */}
            <ul className="nav">

              { /* START user info */}
              <li className="has-user-block">
                <Collapse id="user-block" in={this.state.userBlockCollapse}>
                  <div>
                    <div className="item user-block">
                      { /* User picture */}
                      <div className="user-block-picture">
                        <div className="user-block-status">
                          <img src="/images/user/03.jpg" alt="Avatar" width="60" height="60" className="img-thumbnail img-circle" />
                          <div className="circle circle-success circle-lg"></div>
                        </div>
                      </div>
                      { /* Name and Job */}
                      <div className="user-block-info">
                        <span className="user-block-name">Hello, Mike</span>
                        <span className="user-block-role">Designer</span>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </li>
              { /* END user info */}

              { /* Iterates over all sidebar items */}
              <li className="nav-heading ">
                <span data-localize="sidebar.heading.HEADER">项目</span>
              </li>

              {/* projects */}
              <li className={this.state.collapse.projects ? 'active' : ''}>
                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'projects')}>
                  {/*<div className="pull-right label label-info">3</div>*/}
                  <em className="icon-home"></em>
                  <span data-localize="sidebar.nav.PROJECTS">项目</span>
                </div>
                <Collapse in={this.state.collapse.projects} timeout={100}>
                  <ul id="projects" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">项目</li>
                    <li className={this.routeActive('/projects/list') ? 'active' : ''}>
                      <Link to="/projects/list" title="项目清单">
                        <span>项目清单</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/projects/new') ? 'active' : ''}>
                      <Link to="/projects/new" title="新增项目">
                        <span>新增项目</span>
                      </Link>
                    </li>
                    {offPlansList}
                    {newOffPlan}
                  </ul>
                </Collapse>
              </li>

              {/* infos */}
              <li className={this.state.collapse.infos ? 'active' : ''}>
                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'infos')}>
                  <em className="icon-info"></em>
                  <span data-localize="sidebar.nav.INFOS">资讯</span>
                </div>
                <Collapse in={this.state.collapse.infos} timeout={100}>
                  <ul id="infos" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">资讯</li>
                    <li className={this.routeActive('/infos/list') ? 'active' : ''}>
                      <Link to="/infos/list" title="资讯清单">
                        <span>资讯清单</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/infos/new') ? 'active' : ''}>
                      <Link to="/infos/new" title="新增资讯">
                        <span>新增资讯</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/activities/list') ? 'active' : ''}>
                      <Link to="/activities/list" title="活动清单">
                        <span>活动清单</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/activities/new') ? 'active' : ''}>
                      <Link to="/activities/new" title="新增活动">
                        <span>新增活动</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>

              {/* orders */}
              <li className={this.state.collapse.orders ? 'active' : ''}>
                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'orders')}>
                  <em className="icon-basket"></em>
                  <span data-localize="sidebar.nav.ORDERS">订单</span>
                </div>
                <Collapse in={this.state.collapse.orders} timeout={100}>
                  <ul id="orders" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">订单</li>
                    <li className={this.routeActive('/orders/list') ? 'active' : ''}>
                      <Link to="/orders/list" title="订单清单">
                        <span>订单清单</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/orders/new') ? 'active' : ''}>
                      <Link to="/orders/new" title="新增订单">
                        <span>新增订单</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>

              {/* sublet */}
              <li className={this.state.collapse.sublet ? 'active' : ''}>
                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'sublet')}>
                  <em className="icon-basket"></em>
                  <span data-localize="sidebar.nav.SUBLET">分租</span>
                </div>
                <Collapse in={this.state.collapse.sublet} timeout={100}>
                  <ul id="sublet" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">分租</li>
                    <li className={this.routeActive('/sublet/list') ? 'active' : ''}>
                      <Link to="/sublet/list" title="订单清单">
                        <span>分租清单</span>
                      </Link>
                    </li>
                    {/*<li className={this.routeActive('/sublet/new') ? 'active' : ''}>
                      <Link to="/sublet/new" title="新增订单">
                        <span>新增分租</span>
                      </Link>
                    </li>*/}
                  </ul>
                </Collapse>
              </li>

              {/*<li>
                <div className="nav-item" title="Elements" onClick={this.toggleItemCollapse.bind(this, 'layouts')}>
                  <em className="icon-layers"></em>
                  <span>Layouts</span>
                </div>
                <Collapse in={this.state.collapse.layouts}>
                  <ul id="#" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">Layouts</li>
                    <li>
                      <Link to="dashboardv1h" title="Horizontal">
                        <span>Horizontal</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>*/}

              <li className="nav-heading ">
                <span data-localize="sidebar.heading.SETTINGS">管理</span>
              </li>

              {/* users */}
              <li className={this.state.collapse.users ? 'active' : ''}>
                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'users')}>
                  <em className="icon-user"></em>
                  <span data-localize="sidebar.nav.USERS">用户</span>
                </div>
                <Collapse in={this.state.collapse.users}>
                  <ul id="users" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">用户</li>
                    <li className={this.routeActive('/users/list') ? 'active' : ''}>
                      <Link to="/users/list" title="用户清单">
                        <span>用户清单</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/users/new') ? 'active' : ''}>
                      <Link to="/users/new" title="新增用户">
                        <span>新增用户</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/roles/list') ? 'active' : ''}>
                      <Link to="/roles/list" title="角色清单">
                        <span>角色清单</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/roles/new') ? 'active' : ''}>
                      <Link to="/roles/new" title="新增角色">
                        <span>新增角色</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>

              {/* settings */}
              <li className={this.state.collapse.settings ? 'active' : ''}>
                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'settings')}>
                  <em className="icon-settings"></em>
                  <span data-localize="sidebar.nav.SETTINGS">设定</span>
                </div>
                <Collapse in={this.state.collapse.settings}>
                  <ul id="settings" className="nav sidebar-subnav">
                    <li className="sidebar-subnav-header">设定</li>
                    <li className={this.routeActive('/settings/lists/list') ? 'active' : ''}>
                      <Link to="/settings/lists/list" title="列表管理">
                        <span>列表管理</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/settings/params/list') ? 'active' : ''}>
                      <Link to="/settings/params/list" title="参数管理">
                        <span>参数管理</span>
                      </Link>
                    </li>
                    <li className={this.routeActive('/settings/langs/list') ? 'active' : ''}>
                      <Link to="/settings/langs/list" title="语言管理">
                        <span>语言管理</span>
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </li>

            </ul>
            { /* END sidebar nav */}
          </nav>
        </div>
        { /* END Sidebar (left) */}
      </aside>
    );
  }

}

export default connect()(withRouter(Sidebar));

