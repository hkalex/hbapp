import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, Avatar } from 'material-ui';
import { browserHistory } from 'react-router';
import logger from '../../loggers/logger';

// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';
import { CURRENCY } from '/imports/consts/Constants.js';

export default class PorjectListItem extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onClick() {
    browserHistory.push('/project/' + this.props.project._id);

  }

  render() {

    console.log(this.props);
    const project = this.props.project;
    const price = Math.ceil(project.fromPrice.amount / 10000);
    const currency = project.fromPrice.currency;
    let showCurrency;
    for (var i = 0, len = CURRENCY.length; i < len; i++) {
      if (currency == CURRENCY[i].code) {
        showCurrency = CURRENCY[i].icon
      }
    }
    const photoUrl = project.photos[0].cdnUrl || "/images/placeholder.jpg";

    return (
      <div className='project-listitem-container col-lg-3 col-md-6'
        style={{ padding: "10px 10px 0" }}
        onClick={this.onClick.bind(this)}>
        <Card className="card">
          <CardMedia className="cardmedia"
            overlay={<div className="row" >
              <div className="col-xs-3" style={{ paddingLeft: "3rem", marginBottom: "1rem" }}>
                <div>
                  <i style={{ backgroundColor: "#00BFFF", color: "#fff", borderRadius: "20px", fontSize: "18px" }}>{showCurrency}</i>
                  <span >{price}</span><span>/W</span>
                </div>
                <div>
                  <i className="icon-location-pin" style={{ backgroundColor: "#00BFFF", color: "#fff", borderRadius: "20px", fontSize: "18px" }}></i>
                  <span>address</span>
                </div>
              </div>
              <div className="col-xs-9 text-right" style={{ top: "-50px" }}>
                <div className="row">
                  <Avatar
                    src="/images/xue.jpg"
                    size={110}
                    style={{
                      position: "relative",
                      top: "-10px",
                      right: "-5px"
                    }}
                  />
                  <i style={{ fontSize: "25px", position: "relative", top: "40px", right: "30px" }} className="fa fa-heart-o"></i>
                  <p style={{ width: "70px", position: "relative", top: "-65px", right: "-100px" }}>我是四海八荒第一绝色</p>
                </div>
              </div>
            </div>}
            overlayContentStyle={{ backgroundColor: "#BFEFFF", opacity: 0.8, height: "60px" }} >
            <img className='project-listitem-img' src={photoUrl} {...this.page.style("project-listitem-img") } />
          </CardMedia>
        </Card>
      </div>
    );
  }
}

















class BottomTags extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  render() {

    const lists = this.props.lists["Project.Tag"]["detail"];
    const project = this.props.project;

    // make tags 
    let tag1 = '', tag2 = '';
    lists.forEach((v) => {
      if (project.tags[0] && project.tags[0] == v.code) {
        tag1 = <p className="project-listitem-tag"  {...this.page.style("project-listitem-tag") }>
          <i className="fa fa-bolt project-listitem-tagicon"
            {...this.page.style("project-listitem-tagicon") } />
          {v.title}
        </p>;
      }
      if (project.tags[1] && project.tags[1] == v.code) {
        tag2 = <p className="project-listitem-tag"  {...this.page.style("project-listitem-tag") }>
          <i className="fa fa-bolt project-listitem-tagicon"
            {...this.page.style("project-listitem-tagicon") } />
          {v.title}
        </p>;
      }
    });

    const floorPlans = this.props.project.floorPlans;
    const showFloorPlans = floorPlans.map((v, i) => {
      return (
        <div key={i} className="project-listitem-floorplan"
          {...this.page.style("project-listitem-floorplan") }>
          <p className="project-listitem-flp" {...this.page.style("project-listitem-flp") }>在售户型 {i + 1}</p>
          <span className="project-listitem-flspan" {...this.page.style("project-listitem-flspan") } >{v.numBed}卧</span>
          <span className="project-listitem-flspan" {...this.page.style("project-listitem-flspan") } >{v.numToilet}卫</span>
          <span className="project-listitem-flspan" {...this.page.style("project-listitem-flspan") } >{v.numCarPark}停车位</span>
          <span className="project-listitem-flspan" {...this.page.style("project-listitem-flspan") } >{v.area.area}m<sup>2</sup></span>
          <span className="project-listitem-flspan" {...this.page.style("project-listitem-flspan") } >
            <i className="fa fa-jpy" /> {Math.ceil(v.price.amount / 10000)} <span>万</span>
          </span>
        </div>
      );
    })

    return (
      <div className="project-listitem-content" {...this.page.style("project-listitem-content") } >
        <div className="project-listitem-fldiv" {...this.page.style("project-listitem-fldiv") } >
          {showFloorPlans}
        </div>
        <div className="project-listitem-tgdiv" {...this.page.style("project-listitem-tgdiv") } >
          <p className="project-listitem-tgp" {...this.page.style("project-listitem-tgp") } >
            {project.topTags[0].tag}
            <span className="project-listitem-earning" {...this.page.style("project-listitem-earning") } > 预期年收益</span>
          </p>
          {tag1}
          {tag2}
        </div>
      </div>
    );
  }
}
