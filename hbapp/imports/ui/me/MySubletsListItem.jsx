import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
// consts
import { CLASS_DATA, PAYTYPE } from '../../consts/Constants';
// style json
import JsonStyle from './offplan.json';
import Styler from '/imports/utils/Styler.js';

export default class MySubletsListItem extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This prevents 1 render when data is not yet supplied. 
    if (!!nextProps) {
      return true;
    }
    return false;
  }

  onClick() {
    browserHistory.push("/me/sublets/list/" + this.props.sublet._id)
  }

  render() {
    // console.log(this.props)
    if (this.props.sublet.length == 0) return <div></div>;
    const sublet = this.props.sublet;
    const Src = sublet.images[0] || "/images/placeholder.jpg";
    const title = sublet.title;
    const FEATURES = sublet.features;

    let classes, features;
    CLASS_DATA.forEach((item) => {
      if (item.type == sublet.class) classes = item.text
    })

    features = FEATURES.map((v, i) => {
      return (
        <div key={i} className="col-xs-3 col-sm-2 col-md-1" style={{ marginBottom: 4 }}>
          <button type="button" className="mb-sm mr-sm btn-sm btn btn-primary btn-outline">{v}</button>
        </div>
      )
    });

    return (
      <div className="OLIContent" {...this.page.style("OLIContent") } onClick={this.onClick.bind(this)}>
        <Card className="OLICard" {...this.page.style("OLICard") } >
          <div className="OLICardDiv" {...this.page.style("OLICardDiv") } >
            <CardMedia className="OLICardmedia" {...this.page.style("OLICardmedia") } >
              <img className="OLIImg" {...this.page.style("OLIImg") } src={Src} />
            </CardMedia>
            <CardText className="OLICardtext" {...this.page.style("OLICardtext") } >
              <div className="OLICardtextTitle" {...this.page.style("OLICardtextTitle") }>
                {title}
                <span style={{ fontSize: "16px", color: "red", marginLeft: "14px" }}>{classes}</span>
              </div>
              <div className="OLICardtextDiv" {...this.page.style("OLICardtextDiv") } >
                <div className="OLICardtextFLdiv" {...this.page.style("OLICardtextFLdiv") } >
                  {features}
                </div>
              </div>

            </CardText>
          </div>
        </Card>
      </div>
    );
  }
}
