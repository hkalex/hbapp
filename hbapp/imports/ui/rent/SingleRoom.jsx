import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

// consts
import {BOND,REQUIREMENTS ,MINSTAY} from '../../consts/Constants';

// components
import ImageGallery from '/imports/ui/common/ImageGallery';


export default class SingleRoom extends Component {

constructor(props){
  super(props);
  
}

  render() {
    // console.log(this.props)
    const ROOM = this.props.room || {};
    const DATE = ROOM.fromDate.getFullYear() + "年" + (ROOM.fromDate.getMonth() + 1) + "月" + ROOM.fromDate.getDate() + "日";
    const BED = ROOM.bedNum;
    const CONFIG = ROOM.config;

   let bond,requirements,minStay,bed,config;
    BOND.forEach((item) => {
      if (item.type == ROOM.bond) bond = item.text;
    });
    REQUIREMENTS.forEach((item) => {
      if (item.type == ROOM.requirement) requirements = item.text;
    });
    MINSTAY.forEach((item) => {
      if (item.type == ROOM.minStay) minStay = item.text;
    });
    bed = BED.map((v, i) => {
      return (
        <div key={i} className="col-xs-4 col-sm-2 col-md-1" style={{ marginBottom: 4 }}>
          <button type="button" className="mb-sm mr-sm btn btn-inverse btn-outline">{v}</button>
        </div>
      )
    });
    config = CONFIG.map((v, i) => {
      return (
        <div key={i} className="col-xs-4 col-sm-2 col-md-1" style={{ marginBottom: 4 }}>
          <button type="button"  className="mb-sm mr-sm btn btn-inverse btn-outline">{v}</button>
        </div>
      )
    });

    return (
      <div id="panelDemo10" className="panel panel-info">
        <div className="panel-heading">{ROOM.title}</div>
        <div className="panel-body">
          <img src={ROOM.images[0]} style={{ width: 100, height: 100,float:"left" }} />

          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6 col-sm-2 col-md-1"> <span>面积:</span><em>{ROOM.area}</em>m<sup>2</sup> </div>
              <div className="col-xs-6 col-sm-2 col-md-1"> <span>招租人数:</span><em>{ROOM.peopleNum}</em> </div>
              <div className="col-xs-6 col-sm-2 col-md-1"> <span>卫生间数:</span><em>{ROOM.bathroom}</em> </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-1"> <span>租金/周:</span><em>{ROOM.rental}</em> </div>
              <div className="col-xs-6 col-sm-6 col-md-1"> <span>押金:</span><em>{bond}</em> </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-1"> <span>租客要求:</span><em>{requirements}</em> </div>
              <div className="col-xs-6 col-sm-6 col-md-1"> <span>最短租期:</span><em>{minStay}</em> </div>
            </div>
            <p> <span>起租日期:</span><em>{DATE}</em> </p>             
          </div>

          <div className="container-fluid">
            <div className="row">
              {bed}
              {config}
            </div>
          </div>
        </div>
      </div>
    )
  }
}