import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class DialogModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if (nextProps.dialog.type != '') {
      this.setState({
        open: true
      });
    }
  }

  handleOpen() {
    this.setState({
      open: true
    });
  };

  handleClose() {
    this.setState({
      open: false
    });
  };

  passwordReset() {
    this.setState({
      open: false
    });
    browserHistory.push('/user_login');
  }

  EditToBackOrSubmit() {
    this.setState({
      open: false
    });
    browserHistory.push('/me/offplan_lists');
  }

  isSureModify(id) {
    this.setState({
      open: false
    });
    browserHistory.push('/me/offplan_lists/modify/' + id);
  }

  modifyBackOffplan() {
    this.setState({
      open: false
    });
    browserHistory.push('/me/offplan_lists/item/detail');
  }

  render() {
    // console.log(this.props)
    let dialog;
    const weChat = this.props.dialog.weChat == "" ? "" : this.props.dialog.weChat;
    const circle = this.props.dialog.circle == "" ? "" : this.props.dialog.circle;
    const title = this.props.dialog.title == "" ? "" : this.props.dialog.title;
    const message = this.props.dialog.message == "" ? "" : this.props.dialog.message;
    const _id = this.props.dialog._id == "" ? "" : this.props.dialog._id;
    const actions = [<FlatButton
      label="取消"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    <FlatButton
      label="确定/退出/继续"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    ];

    switch (this.props.dialog.type) {
      case 'SIMPLE_DIALOG':
        return dialog = <Dialog
          title={title}
          modal={true}
          actions={actions}
          open={this.state.open}
        >
          {message}
        </Dialog>
        break;

      default:
        break;
    }



    return (
      <div>
        <Dialog
         title="发布成功"
            label="继续"
            primary={true}
          actions={modifyTobackAction}
          modal={true}
            onTouchTap={this.EditToBackOrSubmit.bind(this)}
             onRequestClose={this.handleClose.bind(this)}
          open={this.state.open}
        >
           {message}
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dialog: state.dialog
  };
}

export default connect(mapStateToProps)(DialogModal);
