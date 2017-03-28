import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export class TestDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ open: nextProps.open });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleBtn1Click() {
    if (this.props.params.handleBtn1) {
      this.props.params.handleBtn1();
    }
    this.handleClose();
  }

  handleBtn2Click() {
    if (this.props.params.handleBtn2) {
      this.props.params.handleBtn2();
    }
    this.handleClose();
  }

  render() {
    const btn = this.props.params.btn || [];
    let actions = [];
    if (btn[0]) {
      actions.push(
        <FlatButton label={btn[0]} primary={true}
          onTouchTap={this.handleBtn1Click.bind(this)} />
      );
    }
    if (btn[1]) {
      actions.push(
        <FlatButton label={btn[1]} primary={true}
          onTouchTap={this.handleBtn2Click.bind(this)} />
      );
    }
    if (btn.length === 0) {
      actions.push(
        <FlatButton label="确定" primary={true}
          onTouchTap={this.handleBtn1Click.bind(this)} />
      );
    }

    return (
      <div>
        <Dialog
          title={this.props.params.title || undefined}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          {this.props.params.msg || ''}
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params: state.testDialog.params || {},
    open: state.testDialog.open
  };
}

export default connect(mapStateToProps)(TestDialog);

// how to use 
/*
    this.props.dispatch(showDialog({
      title: 'this is title',
      msg: 'this is message',
      btn: ['取消', '确定'],
      handleBtn1: function() {
        console.log('点击了第1个按钮');
      },
      handleBtn2: function() {
        console.log('点击了第2个按钮');
      }
    }));
*/