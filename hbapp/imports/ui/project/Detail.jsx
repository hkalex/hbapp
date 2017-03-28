import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import logger from '../../loggers/logger';
import { FlatButton, FontIcon, Avatar, DatePicker, TimePicker } from 'material-ui';
import { Grid, Row, Col, Panel, Button, Tab, Tabs } from 'react-bootstrap';
// collections

// components
import ImageGallery from '/imports/ui/common/ImageGallery';
// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';



export default class ProjectDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: [],
      date: null,
      time: null,
      creatBy: Meteor.userId()
    }
    this.page = new Styler(JsonStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }

  onBack() {
    this.props.router.goBack();
  }


  onFavorite() {
    if (Meteor.userId()) {
      this.props.dispatch(setFavoriteAction(this.props.projectId));
    } else {
      this.props.router.push('/user_login');
    }
  }


  share(title, type) {
    wechatShare(title, type);
  }

  onClick() {
    console.log("is like ?")
  }

  handleChange(e) {
    this.setState({
      form: Object.assign(this.state.form, { [e.target.name]: e.target.value })
    });
  }

  pickerDate(event, newValue) {
    let newDate, year, month, day;
    year = newValue.getFullYear();
    month = newValue.getMonth() + 1;
    day = newValue.getDate();
    if (month < 10 && day < 10) {
      newDate = year.toString() + "0" + month.toString() + "0" + day.toString();
    } else if (month < 10 && day > 9) {
      newDate = year.toString() + "0" + month.toString() + day.toString();
    } else if (month > 9 && day > 9) {
      newDate = year.toString() + "-" + month.toString() + day.toString();
    }
    this.setState({
      date: newValue,
      form: Object.assign(this.state.form, { date: newDate })
    })
  }

  pickerTime(event, newValue) {
    let newTime, hours, minutes;
    hours = newValue.getHours();
    minutes = newValue.getMinutes();
    if (hours < 10 && minutes < 10) {
      newTime = "0" + hours.toString() + "0" + minutes.toString();
    } else if (hours < 10 && minutes > 9) {
      newTime = "0" + hours.toString() + minutes.toString();
    } else if (hours > 9 && minutes > 9) {
      newTime = hours.toString() + minutes.toString();
    }
    this.setState({
      time: newValue,
      form: Object.assign(this.state.form, { time: newTime })
    })
  }

  handleSubmit(e) {
    console.log(this.state.form)
  }


  render() {
    // prevents initial render without List/data from server. 
    // Thus all children will get List at their initial render.   
    if (this.props.subReady == false) return <div />;

    var landingImages = [
      "/images/landing-1.jpg",
      "/images/landing-2.jpg",
      "/images/landing-3.jpg"
    ];


    return (

      <div className='body'>
        <div className='header'>
          <TopBar />
          <FlatButton
            onTouchTap={this.onBack.bind(this)}
            style={{ position: "fixed", zIndex: 99 }}
            icon={<FontIcon className="icon-arrow-left-circle" style={{ color: "#fff", fontSize: "2.2rem", position: "fixed", top: "1rem", left: "0.5rem" }} />} />
          <FlatButton
            style={{ position: "fixed", right: 0, zIndex: 99 }}
            icon={<FontIcon className="icon-share" style={{ color: "#fff", fontSize: "2rem", position: "fixed", top: "1rem", right: "1rem" }} />} />
        </div>

        <div className='detail-container' >
          <div className="ImageGallery">
            <ImageGallery images={landingImages} enableLightbox={false} />
          </div>

          <div className="mask-title" style={{ backgroundColor: "#4388cc", opacity: 0.6, position: "absolute", top: "15.5rem", width: "100%", height: "5rem" }}>
            <div style={{ padding: "0.2rem 1rem 0" }}>
              <p style={{ margin: 0 }}>
                <i style={{ backgroundColor: "#00BFFF", color: "#fff", borderRadius: "20px", fontSize: "16px" }}>￥</i>
                <span >100</span><span>/W</span>
              </p>
              <p>
                <i className="icon-location-pin" style={{ backgroundColor: "#00BFFF", color: "#fff", borderRadius: "20px", fontSize: "16px" }}></i>
                <span>上海市闵行区城区虹桥天地1号楼</span>
              </p>
            </div>
            <i onClick={this.onClick.bind(this)} style={{ fontSize: "30px", position: "absolute", top: "1rem", right: "1.5rem" }} className="fa fa-heart-o"></i>
          </div>

          <div className="owner" style={{ height: "12rem" }}>
            <div style={{ float: "left", wordBreak: "break-word", width: "120px", padding: "2rem 1rem", textAlign: "right" }}>Introduce some information about the owner</div>
            <Avatar src="/images/xue.jpg" size={100} style={{ float: "left", margin: "2rem 0 0" }} />
            <div style={{ float: "right", width: "150px", wordBreak: "break-word", padding: "2rem 1rem" }}>something that the owner wants to express</div>
          </div>

          <div className="house-info">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >房间资料</p>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-4 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>
                <div className="col-xs-4 col-sm-2 col-md-1">
                  <span><i className="fa fa-group" style={{ color: "#4388cc" }} /><i>3</i></span>
                </div>
                <div className="col-xs-4 col-sm-2 col-md-1">
                  <span><i className="icon-home" style={{ color: "#4388cc" }} /><i>20m<sup>2</sup></i></span>
                </div>
              </div>
            </div>
            <p style={{ paddingLeft: "1rem", fontSize: "18px" }}>
              <i className="fa fa-calendar" style={{ color: "#4388cc" }} ></i><i>1 March 2017 - 28 Feb 2018</i>
            </p>
          </div>

          <div className="map">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >发现生活</p>
            <LifeView />
          </div>

          <div className="traffic">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >交通</p>
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr className="success">
                  <th>地点</th>
                  <th>距离</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td>悉尼大学</td>
                  <td>5km</td>
                </tr>
                <tr>
                  <td>Wolli Creek火车站</td>
                  <td>300m</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="roommates">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >同居密友</p>
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr className="info">
                  <th>性别</th>
                  <th>星座</th>
                  <th>描述</th>
                  <th>入住时间</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td style={{ textAlign: "center" }}><i className="fa fa-mars" style={{ color: "blue" }} /></td>
                  <td>双子<img src="/images/constel/006-gemini.png" style={{ height: "18px", width: "18px" }} /></td>
                  <td>IT总监</td>
                  <td>2017-02 - 2018-02</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}><i className="fa fa-venus" style={{ color: "pink" }} /></td>
                  <td>水瓶<img src="/images/constel/012-aquarius.png" style={{ height: "18px", width: "18px" }} /></td>
                  <td>销售总监</td>
                  <td>2017-02 - 2018-02</td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}><i className="fa fa-mars" style={{ color: "blue" }} /></td>
                  <td>狮子<img src="/images/constel/010-leo.png" style={{ height: "18px", width: "18px" }} /></td>
                  <td>UTS学生</td>
                  <td>2017-02 - 2018-02</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="house-dev">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >房间设备</p>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>公用</i></span>
                </div>

              </div>
            </div>
          </div>

          <div className="dating">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >约会吧</p>
            <form style={{ padding: "0 1rem" }}>
              <DatePicker hintText="Date"
                value={this.state.date}
                onChange={this.pickerDate.bind(this)} />
              <TimePicker format="24hr" hintText="24hr TimePicker"
                value={this.state.time}
                onChange={this.pickerTime.bind(this)} />
              <textarea placeholder="something that you want to say"
                name="message"
                style={{ width: "100%", height: "100px", maxWidth: '100%', maxHeight: '100px', resize: "none" }}
                onChange={this.handleChange.bind(this)}
                required={true} ></textarea>
              <button type="button"
                style={{
                  width: "100%",
                  backgroundColor: "#4388cc",
                  height: "36px",
                  fontSize: "16px",
                  borderRadius: "1rem",
                  margin: "1rem 0",
                  color: "#E3E3E3",
                }}
                onClick={this.handleSubmit.bind(this)}>
                Make Appointment
            </button>
            </form>
          </div>

        </div >
      </div >
    );
  }
}


// const ProjectDetailContainer = createContainer(({lists}) => {

//   const _id = location.pathname.slice(9);
//   const projectDetailSub = Meteor.subscribe('getProjectDetail', _id);
//   const userFavoriteSub = Meteor.subscribe('favorites', Meteor.userId());

//   const projectDetailSubReady = projectDetailSub.ready() && userFavoriteSub.ready();
//   const projectDetailInfo = Projects.findOne({ _id: Projects.ObjectID(_id) }) || null;
//   const favoriteInfo = Favorites.findOne({ userId: Meteor.userId() }) || null;

//   return {
//     subReady: projectDetailSubReady,
//     projectDetailInfo,
//     favoriteInfo,
//     projectId: _id,
//     lists,
//   };
// }, ProjectDetail);

// function mapStateToProps(state) {
//   return {
//     lists: state.lists,
//   };
// }

// export default connect(mapStateToProps)(ProjectDetailContainer);

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
    this.showBar = this.showBar.bind(this)
  }
  showBar() {
    let { isShow } = this.state;
    if (window.scrollY > 200) {
      this.setState({
        isShow: true
      })
    } else {
      this.setState({
        isShow: false
      })
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.showBar.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.showBar.bind(this));
  }


  render() {

    const showStyle = {
      position: "fixed",
      left: 0,
      top: 0,
      backgroundColor: "#4388cc",
      width: "100%",
      textAlign: "center",
      fontSize: "2.2rem",
      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.2)",
      transition: "top .2s",
      lineHeight: "4.4rem",
      height: "4.4rem",
      color: "#fff",
      zIndex: 9
    };

    const hideStyle = {
      position: "absolute",
      top: "-400px"
    }

    let currentStyle = this.state.isShow ? showStyle : hideStyle;
    return <div style={currentStyle} > 恒基旭辉中心 </div>
  }
}


class LifeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    return (
      <div style={{ zIndex: 0 }}>
        <Tabs className="tabs" activeKey={this.state.key} style={{ zIndex: 0 }} onSelect={this.handleSelect.bind(this)} id="tabID">
          <Tab className="tab col-md-4" style={{ zIndex: 0 }} eventKey={1} title="房源点评">
            <p>something thats introducing about the house</p>
          </Tab>
          <Tab className="tab col-md-4" style={{ zIndex: 0 }} eventKey={2} title="周边介绍">
            <p>something thats introducing around the house</p>
          </Tab>
          <Tab className="tab col-md-4" style={{ zIndex: 0 }} eventKey={3} title="交通介绍">
            {/*<p>something thats introducing about the traffic</p>*/}
            <img src="/images/map-test.png" style={{ height: "180px", width: "100%" }} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

