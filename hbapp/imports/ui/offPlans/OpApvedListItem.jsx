import React, { Component } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { browserHistory } from 'react-router';

import MyOffPlanDetail from '/imports/ui/me/MyOffPlanDetail';
// style json
import JsonStyle from './offPlan.json';
import Styler from '/imports/utils/Styler.js';

export default class OffPlanListItem extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  clickToDetail() {
    browserHistory.push('/me/offplan_lists/item/' + this.props.offPlan._id);
  }

  render() {
    const photoUrl = this.props.offPlan.photos[0] || "/images/placeholder.jpg";

    return (
      <div className="offplan-listitem-container" {...this.page.style("offplan-listitem-container") }
        onClick={this.clickToDetail.bind(this)}>
        <Card>
          <CardMedia
            overlay={<CardTitle className="offplan-listitem-cardtitle"
              {...this.page.style("offplan-listitem-cardtitle") } />}
          >
            <img className="offplan-listitem-img" src={photoUrl} {...this.page.style("offplan-listitem-img") } />
          </CardMedia>
          {<BottomTags offPlan={this.props.offPlan} />}
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
    const offPlan = this.props.offPlan;

    const showPrice = <div className="offplan-listitem-showprice"  {...this.page.style("offplan-listitem-showprice") }            >
      <span className="offplan-listitem-pricespan" {...this.page.style("offplan-listitem-pricespan") } >￥{parseInt(offPlan.amount / 10000)}</span>
      <span> 万</span>
    </div>;

    const showFloorPlan = <div className="offplan-listitem-showfloorplan"
      {...this.page.style("offplan-listitem-showfloorplan") }>
      <p className="offplan-listitem-showfloorplanp"
        {...this.page.style("offplan-listitem-showfloorplanp") } >户型</p>
      <span className="offplan-listitem-span" {...this.page.style("offplan-listitem-span") } >{offPlan.room}卧</span>
      <span className="offplan-listitem-span" {...this.page.style("offplan-listitem-span") } >{offPlan.parlour}卫</span>
      <span className="offplan-listitem-span" {...this.page.style("offplan-listitem-span") } >{offPlan.parking}停车位</span>
      <span className="offplan-listitem-span" {...this.page.style("offplan-listitem-span") } >88m<sup>2</sup></span>
    </div>;

    return (
      <div>
        <div className="offplan-listitem-floorplan" {...this.page.style("offplan-listitem-floorplan") } >
          {showFloorPlan}
        </div>
        <div className="offplan-listitem-price" {...this.page.style("offplan-listitem-price") } >
          {showPrice}
        </div>
        <div className="offplan-listitem-shortdesc" {...this.page.style("offplan-listitem-shortdesc") } >
          {offPlan.shortDesc}
        </div>
      </div>
    );
  }
}
