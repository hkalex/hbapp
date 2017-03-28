import React, { Component } from 'react';
import { TextField, SelectField, MenuItem, DatePicker, FlatButton, FontIcon, AutoComplete } from 'material-ui';
import TagsList from './TagsList';
import ImagePicker from './ImagePicker';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Sublets from '/imports/db/sublets';
import { updateSubletForm } from '/imports/actions/sublet/updateForm';
import { createContainer } from 'meteor/react-meteor-data';

// actions
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';
// consts
import { BOND, REQUIREMENTS, MINSTAY, MIN_RANGE } from '../../consts/Constants';



class RoomDetail extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    let state = props.location.state || {};
    let singleRoom = state.singleRoom || {};
    this.state = {
      value: null,
      isIndefinite: false,
      subletForm: props.subletForm || {},
      room: props.subletForm.room || [],
      singleRoom: singleRoom,
      bathroom: singleRoom.bathroom === 0 ? 0 : (singleRoom.bathroom || ""),
      peopleNum: singleRoom.peopleNum || "",
      requirement: null,
      minStay: null,
      bond: null
    }
  }

  onBack() {
    browserHistory.push("/me/sublets_new")
  }

  /****-tags and img-****/
  update(name, value) {
    this.setState({
      singleRoom: Object.assign(this.state.singleRoom, { [name]: value })
    });
  }

  /****-textFeild-****/
  onChange(type, e) {
    let value = e.target.value;
    if (type == "n") {
      parseInt(value);
    }
    this.setState({
      singleRoom: Object.assign(this.state.singleRoom, { [e.target.name]: value })
    });
  }

  /****-requirement minStay bond-****/
  handleChange(name, event, index, value) {
    this.setState({
      [name]: value,
      singleRoom: Object.assign(this.state.singleRoom, { [name]: value })
    });
  }

  /****-date change-****/
  dateChange(name, e, date) {
    this.setState({
      singleRoom: Object.assign({}, this.state.singleRoom, { [name]: date })
    });
  }

  handleUpdateInput(name, searchText) {
    this.setState({
      singleRoom: Object.assign(this.state.singleRoom, { [name]: searchText })
    })
  }

  onSubmit() {
    let singleRoom = this.state.singleRoom;

    if (singleRoom.area && (singleRoom.bathroom || singleRoom.bathroom === 0) && singleRoom.bedNum && singleRoom.bond && singleRoom.config && singleRoom.fromDate
      && singleRoom.images && singleRoom.minStay && singleRoom.peopleNum && singleRoom.rental && singleRoom.requirement && singleRoom.title) {

      if (this.props.location.state) {
        let subletForm = this.state.subletForm;
        subletForm.room[this.props.location.state.index] = singleRoom;
        this.props.dispatch(updateSubletForm(subletForm));
        Sublets.update({ _id: this.state.subletForm._id }, { $set: subletForm });
        browserHistory.push("/me/sublets_new");
      } else {
        let room = this.state.room;
        let subletForm = this.state.subletForm;
        room.push(singleRoom);
        Object.assign(subletForm, { room });
        this.props.dispatch(updateSubletForm(subletForm));
        Sublets.update({ _id: this.state.subletForm._id }, { $set: subletForm });
        browserHistory.push("/me/sublets_new");
      }
    } else {
      this.props.dispatch(simpleSnackbarAction({ message: "请填写完整" }));
    }

  }

  render() {

    const NUM = ["0", "1", "2", "3"];
    const CONFIG_BED = ['单人床', '两单床', '三单床', 'Share', '双人', 'Queen', 'King', '上下'];
    const CONFIG_ROOM = ['独立阳台', '有书桌', '有衣柜', '入墙衣柜'];

    const bondMenuItems = BOND.map((v, i) => {
      return <MenuItem key={i} value={v.type} primaryText={v.text} />;
    });
    const requireMenuItems = REQUIREMENTS.map((v, i) => {
      return <MenuItem key={i} value={v.type} primaryText={v.text} />;
    });
    const minMenuItems = MINSTAY.map((v, i) => {
      return <MenuItem key={i} value={v.type} primaryText={v.text} />;
    });
    let minRange = MIN_RANGE.map((v, i) => {
      return <MenuItem key={i} value={v.code} primaryText={v.value} />;
    });
    minRange.unshift(<MenuItem key="99" value={0} primaryText={0}>0</MenuItem>);

    const PEOPLENUM = this.state.peopleNum === 0 || this.state.peopleNum == 1 || this.state.peopleNum == 2 || this.state.peopleNum == 3;
    const BATHNUM = this.state.bathroom === 0 || this.state.bathroom == 1 || this.state.bathroom == 2 || this.state.bathroom == 3;


    return (
      <div style={{ position: "fixed", left: "0", top: "0", width: "100%", height: "100%" }}>
        <div className="room-detail-header">
          <div className="app-title"
            style={{
              color: "#4388cc",
              fontSize: "22px",
              height: "44px",
              lineHeight: "44px",
              borderBottom: "1px solid #4388cc",
              textAlign: "center",
              width: "100%"
            }} >房间信息</div>
          <FlatButton
            style={{
              position: "absolute",
              top: "0.8%",
              zIndex: 9999999
            }}
            onClick={this.onBack.bind(this)}
            icon={<FontIcon className="fa fa-chevron-left " style={{ color: "rgb(67, 136, 204)", marginLeft: "-70%" }} />} />
        </div>

        <div className="room-detail-container" style={{ height: "calc(100% - 80px)", overflow: "auto", padding: "0 0.5rem 0.5rem" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6 col-sm-4 col-md-3">
                <TextField
                  hintText="如:01号/主卧/蓝猫主题"
                  floatingLabelText="房间名"
                  name="title"
                  value={this.state.singleRoom.title || ""}
                  hintStyle={{ fontSize: "14px" }}
                  style={{ width: 150 }}
                  onChange={this.onChange.bind(this, "s")} />
              </div>
              <div className="col-xs-6 col-sm-4 col-md-3">
                <TextField
                  hintText="房间面积"
                  floatingLabelText="大小"
                  name="area"
                  value={this.state.singleRoom.area || ""}
                  style={{ width: 150 }}
                  onChange={this.onChange.bind(this, "n")} />
              </div>
              <div className="col-xs-6 col-sm-4 col-md-3" >
                <SelectField
                  floatingLabelText="招租人数"
                  value={this.state.peopleNum}
                  onChange={this.handleChange.bind(this, 'peopleNum')}
                  style={{ width: 150 }}
                  maxHeight={200}
                  errorText={!PEOPLENUM && "招租人数不能为空"}
                >
                  {minRange}
                </SelectField>
              </div>
              <div className="col-xs-6 col-sm-4 col-md-3" >
                <SelectField
                  floatingLabelText="卫生间数"
                  value={this.state.bathroom}
                  onChange={this.handleChange.bind(this, 'bathroom')}
                  style={{ width: 150 }}
                  maxHeight={200}
                  errorText={!BATHNUM && "卫生间数不能为空"}
                >
                  {minRange}
                </SelectField>
              </div>
              <div className="col-xs-6 col-sm-4 col-md-3">
                <TextField
                  hintText="租金/周"
                  floatingLabelText="单间租金"
                  name="rental"
                  value={this.state.singleRoom.rental || ""}
                  floatingLabelShrinkStyle={{ color: "#4388cc" }}
                  style={{ width: 150 }}
                  onChange={this.onChange.bind(this, "n")} />
              </div>
              <div className="col-xs-6 col-sm-4 col-md-3" >
                <SelectField
                  floatingLabelText="单间押金"
                  value={this.state.singleRoom.bond || this.state.bond}
                  onChange={this.handleChange.bind(this, "bond")}
                  style={{ width: 150 }}
                >
                  {bondMenuItems}
                </SelectField>

              </div>
              <div className="col-xs-6 col-sm-4 col-md-3" >
                <SelectField
                  floatingLabelText="租客要求"
                  value={this.state.singleRoom.requirement || this.state.requirement}
                  name="requirement"
                  onChange={this.handleChange.bind(this, "requirement")}
                  style={{ width: 150 }}
                >
                  {requireMenuItems}
                </SelectField>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6">
                <SelectField
                  floatingLabelText="最短租期"
                  value={this.state.singleRoom.minStay || this.state.minStay}
                  name="minStay"
                  onChange={this.handleChange.bind(this, "minStay")}
                  style={{ width: 150 }}
                >
                  {minMenuItems}
                </SelectField>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6" >
                <DatePicker
                  floatingLabelText="起租日期"
                  hintText="起租日期"
                  value={this.state.singleRoom.fromDate || {}}
                  onChange={this.dateChange.bind(this, "fromDate")}
                  textFieldStyle={{ width: 150 }} />
              </div>
            </div>
          </div>
          <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >房间配置</p>
          <div className="panel panel-default panel-demo">
            <div className="panel-body">
              <em className="fa fa-bed"></em>
              <TagsList tagsData={CONFIG_BED} selected={this.state.singleRoom.bedNum} onChange={this.update.bind(this, "bedNum")} />
              <em className="fa fa-yelp"></em>
              <TagsList tagsData={CONFIG_ROOM} selected={this.state.singleRoom.config} onChange={this.update.bind(this, "config")} />
            </div>
          </div>

          <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >图片(最多可上传三张)</p>
          <ImagePicker id="room-images" max={3} defaultImages={this.state.singleRoom.images || []} onChange={this.update.bind(this, "images")} />
        </div>

        <div className="room-detail-footer">
          <FlatButton
            style={{ margin: 0, width: "100%", color: "#fff", height: "36px" }}
            backgroundColor="#4388cc"
            label="确定"
            onClick={this.onSubmit.bind(this)}
          />
        </div>
      </div >
    )
  }
}


const RoomDetailContainer = createContainer((props) => {
  const subletSub = Meteor.subscribe('sublets', Meteor.userId());
  const subletForm = Sublets.findOne();
  return {
    subReady: subletSub.ready(),
    subletForm: subletForm || {}
  };
}, RoomDetail);

const mapStateToProps = (state) => {
  return {
    subletForm: state.subletForm
  };
}

export default connect(mapStateToProps)(RoomDetailContainer);