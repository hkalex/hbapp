import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MainPanel from '/imports/console/ui/common/MainPanel';
import Snackbar from '/imports/ui/utils/Snackbar';
import Dialog from '/imports/ui/utils/Dialog';
import Header from '/imports/ui/template/Layout/Header';
import Sidebar from '/imports/ui/template/Layout/Sidebar';
import Offsidebar from '/imports/ui/template/Layout/Offsidebar';
import Footer from '/imports/ui/template/Layout/Footer';

export default class HomePage extends React.Component {
  render() {
    const animationName = 'rag-fadeIn';
    return (
      <div className="wrapper">
        <Header />
        <Sidebar />
        <Offsidebar />
        <ReactCSSTransitionGroup
          component="section"
          transitionName={animationName}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <Snackbar />
          <Dialog />
          <MainPanel {...this.props} />
        </ReactCSSTransitionGroup>
        <Footer />
      </div>
    )
  }
}