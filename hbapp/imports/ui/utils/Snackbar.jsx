import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

class SnackbarExampleSimple extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

   componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    if(nextProps.snackbar.message != ''){
      this.setState({
        open: true
      });
    }
  }


  handleTouchTap() {
    this.setState({
      open: true,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    const message = this.props.snackbar.message === "" ? "" : this.props.snackbar.message;

    return (
      <div>
       
        <Snackbar
          open={this.state.open}
          message={message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    snackbar: state.snackbar,
  };
}

export default connect(mapStateToProps)(SnackbarExampleSimple);





//  <RaisedButton onTouchTap={this.handleTouchTap.bind(this)} label="Add to my calendar"  />