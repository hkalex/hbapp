import React, {Component}  from 'react';
import { Link } from 'react-router';
import Snackbar from './utils/Snackbar';
import TestDialog from './utils/TestDialog';
import Dialog from './utils/Dialog';
import { Provider } from 'react-redux';
import Store from '../stores/store'

// import '/public/font-awesome.min.css';

/**
 * Outer most component container after Router. 
 * This is the place to put globally used components like Toast/Dialogs.
 * 
 * @export
 * @class AppRoot
 * @extends {Component}
 */
export default class AppRoot extends Component {
  render() {
    return (
      <div>
        <Provider store={Store}>
          <Dialog />
        </Provider>
        <Provider store={Store}>
          <TestDialog />
        </Provider>
        <Provider store={Store}>
          <Snackbar />
        </Provider>
        {this.props.children}
      </div>
    );
  }
}