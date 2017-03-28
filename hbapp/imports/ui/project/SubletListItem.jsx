import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, Avatar } from 'material-ui';
import { browserHistory } from 'react-router';
import logger from '../../loggers/logger';

// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';
import { CURRENCY } from '/imports/consts/Constants.js';

export default class SubletListItem extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onClick() {
    browserHistory.push('/me/sublets/list/' + this.props.subletForm._id);
  }

  render() {

    console.log(this.props.room);
    const subletForm = this.props.room;
    const title = subletForm.title;
    const address = subletForm.address;
    const PUBLICAREA = subletForm.publicArea;
    const Src = subletForm.images[0] || "/images/placeholder.jpg";
    let publicArea = PUBLICAREA.map((v, i) => {
      return (
        <span key={i} style={{ border: "1px solid #4388cc", marginLeft: "2px" }}>{v}</span>
      )
    })

    return (

      <div className='project-listitem-container col-lg-3 col-md-6'
        style={{ padding: "10px 10px 0" }}
        onClick={this.onClick.bind(this)}>

        <Card className="card">
          <CardMedia className="cardmedia"
            overlay={<div className="row" >
              <div className="col-xs-9" style={{ paddingLeft: "2.5rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "16px" }}>{title}</span>
                <div>
                  {publicArea}
                </div>
              </div>
              <div className="col-xs-3 text-right" style={{ top: "-50px" }}>
                <div className="row">
                  <i style={{ fontSize: "38px", position: "relative", top: "25px", right: "30px" }} className="fa fa-heart-o"></i>
                </div>
              </div>
            </div>}
            overlayContentStyle={{ backgroundColor: "#BFEFFF", opacity: 0.7, height: "60px" }} >
            <img className='project-listitem-img' src={Src} {...this.page.style("project-listitem-img") } />
          </CardMedia>
        </Card>

      </div>


    );
  }
}



