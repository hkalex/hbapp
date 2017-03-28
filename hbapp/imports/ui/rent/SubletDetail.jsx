import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import logger from '../../loggers/logger';
import { Button, ButtonGroup, Tab, Tabs } from 'react-bootstrap';
// collections
import Sublets from '../../db/sublets';
// consts
import { CLASS_DATA, PAYTYPE } from '../../consts/Constants';
// components
import ImageGallery from '/imports/ui/common/ImageGallery';
import SingleRoom from './SingleRoom';

export default class SubletDetail extends Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }

  buildElements(projectList) {
    const elements = [];
    if (projectList instanceof Array) {
      projectList.forEach((project, i) => {
        elements.push(<SingleRoom room={project} key={i} />);
      });
    } else {
      if (typeof projectList === "object") {
        elements.push(<SingleRoom room={projectList} key={9999999} />);
      }
    }
    return elements;
  }


  onClick() {
    console.log("is like?")
  }

  render() {
    // console.log(this.props)
    // prevents initial render without List/data from server. 
    // Thus all children will get List at their initial render.   
    if (this.props.subReady == false) return <div />;
    // console.log(this.props.subletForm)

    const SUBLET_FORM = this.props.subletForm || {};
    const FEATURES = SUBLET_FORM.features || [];
    const KITCHEN = SUBLET_FORM.kitchen || [];
    const PUBLIC = SUBLET_FORM.publicArea || [];
    let classes, pay, price, features, kitchen, publicArea;
    const bill = SUBLET_FORM.bill || {};

    CLASS_DATA.forEach((item) => {
      if (item.type == SUBLET_FORM.class) classes = item.text
    })


    PAYTYPE.forEach((item) => {
      if (item.type == bill.type) pay = item.text
    })

    if (bill.type == "A") {
      price = "小主不用交啦"
    } else if (bill.type == "H") {
      price = bill.amount
    } else if (bill.type == "E") {
      price = "按房间平摊"
    }

    if (FEATURES) {
      features = FEATURES.map((v, i) => {
        return (
          <div key={i} className="col-xs-3 col-sm-2 col-md-1" style={{ marginBottom: 4 }}>
            <button type="button" className="mb-sm mr-sm btn-sm btn btn-primary btn-outline">{v}</button>
          </div>
        )
      });
    } else {
      return <div></div>
    }

    kitchen = KITCHEN.map((v, i) => {
      return (
        <div key={i} className="col-xs-3 col-sm-2 col-md-1" style={{ marginBottom: 4 }}>
          <button type="button" className="mb-sm mr-sm btn-sm btn btn-success btn-outline">{v}</button>
        </div>
      )
    });
    publicArea = PUBLIC.map((v, i) => {
      return (
        <div key={i} className="col-xs-3 col-sm-2 col-md-1" style={{ marginBottom: 4 }}>
          <button type="button" className="mb-sm mr-sm btn-sm  btn-warning btn-outline">{v}</button>
        </div>
      )
    });


    return (
      < div className='body' >
        <div className='detail-container' >
          <div className="ImageGallery">
            <ImageGallery images={SUBLET_FORM.images || []} enableLightbox={false} />
          </div>

          <div className="mask-title" style={{ backgroundColor: "#4388cc", opacity: 0.6, position: "relative", top: "-5rem", width: "100%", height: "5rem" }}>
            <div style={{ padding: "1.5rem 1rem 0" }}>
              <p>
                <i className="icon-location-pin" style={{ backgroundColor: "#00BFFF", color: "#fff", borderRadius: "20px", fontSize: "16px" }}></i>
                <span>{SUBLET_FORM.address || ""}</span>
              </p>
            </div>
            <i onClick={this.onClick.bind(this)} style={{ fontSize: "30px", position: "absolute", top: "1rem", right: "1.5rem" }} className="fa fa-heart-o"></i>
          </div>

          <p style={{ fontSize: "18px", textAlign: "center" }}>{SUBLET_FORM.title || ""}</p>

          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-3 col-sm-2 col-md-1">
                <button type="button" className="mb-sm mr-sm btn-sm btn btn-primary btn-outline">{classes}</button>
              </div>
              {features}
            </div>
            <p>{SUBLET_FORM.desc || ""}</p>
          </div>

          <div className="house-info">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >房间资料</p>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-social-reddit" style={{ color: "#4388cc" }} /><i>{SUBLET_FORM.bedroom || ""}</i></span>
                </div>
                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="fa fa-group" style={{ color: "#4388cc" }} /><i>{SUBLET_FORM.bathroom || ""}</i></span>
                </div>
                <div className="col-xs-3 col-sm-2 col-md-1">
                  <span><i className="icon-home" style={{ color: "#4388cc" }} /><i>{SUBLET_FORM.parking || ""}</i></span>
                </div>
              </div>
            </div>
            <ButtonGroup>
              <Button>关于账单</Button>
              <Button>{pay}</Button>
              <Button>{price}</Button>
            </ButtonGroup>
          </div>

          <div className="config">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >公共配置</p>
            <div className="container-fluid">
              <div className="row">
                {publicArea}
              </div>
            </div>
          </div>

          <div className="life">
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >厨房设施</p>
            <div className="container-fluid">
              <div className="row">
                {kitchen}
              </div>
            </div>
          </div>

          <div className="life">
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
            <p style={{ borderBottom: "1px solid", textAlign: "center", marginTop: "1rem" }} >单个房间</p>
            {this.buildElements(SUBLET_FORM.room || [])}
          </div>

        </div >
      </div >
    );
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
            <img src="/images/map-test.png" style={{ height: "180px", width: "100%" }} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

