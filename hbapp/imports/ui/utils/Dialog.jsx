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

  submitSublet() {
    this.setState({
      open: false
    });
    browserHistory.push('/me/sublets');
  }

  cancleSublet() {
    this.setState({
      open: false
    });
    browserHistory.push('/me/sublets');
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
      label="确定"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    ];

    const editActions = [<FlatButton
      label="取消"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    <FlatButton
      label="退出"
      primary={true}
      onTouchTap={this.EditToBackOrSubmit.bind(this)}
    />,
    ];

    const modifyActions = [<FlatButton
      label="取消"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    <FlatButton
      label="继续"
      primary={true}
      onTouchTap={this.isSureModify.bind(this, _id)}
    />,
    ];

    const modifyTobackAction = [<FlatButton
      label="取消"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    <FlatButton
      label="退出"
      primary={true}
      onTouchTap={this.modifyBackOffplan.bind(this)}
    />,
    ];

    const subletActions = [<FlatButton
      label="取消"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    <FlatButton
      label="确定"
      primary={true}
      onTouchTap={this.submitSublet.bind(this)}
    />,
    ];

    const cancleSubletActions = [<FlatButton
      label="取消"
      primary={true}
      onTouchTap={this.handleClose.bind(this)}
    />,
    <FlatButton
      label="确定"
      primary={true}
      onTouchTap={this.cancleSublet.bind(this)}
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

      case 'SHARING_DIALOG':
        return dialog = <Dialog
          modal={false}
          actions={<FlatButton
            label="取消"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <div onClick={this.handleClose.bind(this)} style={{ display: "flex" }}>
            <div style={{ flex: 1, textAlign: "center" }}>{weChat}</div>
            <div style={{ flex: 1, textAlign: "center" }}>{circle}</div>
            {/**   <div style={{ flex: 1,textAlign:"center",lineHeight:"64px"}}>更多</div> */}
          </div>
        </Dialog>
        break;

      case 'ABOUT_DIALOG':
        return dialog = <Dialog
          title={title}
          actions={<FlatButton
            label="确定"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />}
          modal={true}
          open={this.state.open}
        >
          {message}
        </Dialog>
        break;

      case 'PASSWORDRESET_DIALOG':
        return dialog = <Dialog
          actions={<FlatButton
            label="确定"
            primary={true}
            onTouchTap={this.passwordReset.bind(this)}
          />}
          modal={true}
          open={this.state.open}
        >
          {message}
        </Dialog>
        break;

      case 'HALFEDITTOBACK_DIALOG':
        return dialog = <Dialog
          actions={editActions}
          modal={true}
          open={this.state.open}
        >
          {message}
        </Dialog>
        break;

      case 'HALFEDITTOSUBMIT_DIALOG':
        return dialog = <Dialog
          actions={<FlatButton
            label="继续"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />}
          modal={true}
          open={this.state.open}
        >
          信息尚未补全，不满足发布条件
        </Dialog>
        break;

      case 'EDITTOSUBMIT_DIALOG':
        return dialog = <Dialog
          title="发布成功"
          actions={<FlatButton
            label="我知道了"
            primary={true}
            onTouchTap={this.EditToBackOrSubmit.bind(this)}
          />}
          modal={true}
          open={this.state.open}
        >
          等待审核，请前去“我的二手楼花”进行查看
        </Dialog>
        break;

      case 'ISSUREMODIFY_DIALOG':
        return dialog = <Dialog
          actions={modifyActions}
          modal={true}
          open={this.state.open}
        >
          修改信息后，需要重新审核，您确定要修改吗？
        </Dialog>
        break;

      case 'MODIFYBACK_DIALOG':
        return dialog = <Dialog
          actions={modifyTobackAction}
          modal={true}
          open={this.state.open}
        >
          是否要放弃修改？继续退出
        </Dialog>
        break;

      case 'SUBLET_DIALOG':
        return dialog = <Dialog
          actions={subletActions}
          modal={true}
          open={this.state.open}
        >
          确定提交吗？
        </Dialog>
        break;

      case 'CANCLE_DIALOG':
        return dialog = <Dialog
          actions={cancleSubletActions}
          modal={true}
          open={this.state.open}
        >
          是否要放弃添加？继续退出

        </Dialog>
        break;


      default:
        break;
    }



    return (
      <div>
        {dialog}
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
