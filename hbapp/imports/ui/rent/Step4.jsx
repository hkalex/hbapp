import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { RaisedButton, MenuItem } from 'material-ui';
import { browserHistory } from 'react-router';

import Sublets from '/imports/db/sublets';


class RoomList extends Component {

  constructor(props) {
    super(props);
    if (props.subletForm.room) {
      this.state = {
        className: "",
        isRoom: true,
        subletForm: Object.assign({}, props.m_sf, props.subletForm)
      }
    } else {
      this.state = {
        className: "hide",
        isRoom: false,
        subletForm: Object.assign({}, props.m_sf, props.subletForm)
      }
    }
  }

  onAdd() {
    let subletForm = this.state.subletForm;
    Object.assign(subletForm, { step: 3 });
    browserHistory.push("/me/sublets_new/room");
  }

  checkRoom(v, index) {
    browserHistory.push({ pathname: "/me/sublets_new/room", state: Object.assign({ singleRoom: v }, { index }) });
  }

  onDelete(i) {
    let subletForm = this.state.subletForm;
    subletForm.room.splice(i, 1);
    this.setState({ subletForm })
    Sublets.update({ _id: this.props.m_sf._id }, { $set: subletForm });
  }


  render() {

    let roomList;
    if (this.state.isRoom) {
      const ROOM = this.state.subletForm.room;
      roomList = ROOM.map((v, i) => {
        return (<div key={i}>
          <MenuItem
            style={{ backgroundColor: "#eee", borderBottom: "1px solid #fff" }}
            onTouchTap={this.checkRoom.bind(this, v, i)}
          >
            {v.title}
          </MenuItem>
          <i className="icon-close" style={{ fontSize: "20px", position: "relative", left: "325px", top: "-35px" }} onClick={this.onDelete.bind(this, i)} />
        </div>)
      })
    }

    return (
      <div className='body'>
        <div className={this.state.className}>{roomList}</div>
        <RaisedButton label="添加房间"
          labelColor="#424242"
          buttonStyle={{
            textAlign: "left",
            borderBottom: "#e3e3e3 solid 1px"
          }}
          labelStyle={{ fontSize: "16px" }}
          style={{
            width: "100%",
            height: "40px",
            lineHeight: "40px",
            marginTop: "15px"
          }}
          onClick={this.onAdd.bind(this)} >
          <i className="fa fa-plus-circle" style={{ fontSize: "20px", position: "absolute", right: "1rem", lineHeight: "40px" }}  ></i>
        </RaisedButton>

      </div >
    );
  }
}


function mapStateToProps(state) {
  return {
    subletForm: state.subletForm
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(RoomList);

RoomList.propTypes = {
  m_sf: PropTypes.object.isRequired
}
