import React, { Component } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { browserHistory } from 'react-router';
import logger from '../../loggers/logger';

// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';

export default class ActivityListItem extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onClick() {
    browserHistory.push('/activity/' + this.props.item._id);
  }

  render() {
    // console.log(this.props);
    const photoUrl = this.props.item.image[0].cdnUrl || "/images/placeholder.jpg";
    return (
      <div className="activity-listitem-container" {...this.page.style("activity-listitem-container") }
        onClick={this.onClick.bind(this)}>
        <Card>
          <CardMedia
            overlay={<CardTitle className="activity-listitem-cardtitle"
              title={this.props.item.title}
              {...this.page.style("activity-listitem-cardtitle") }
            />}
          >
            <img src={photoUrl} className="activity-listitem-img" {...this.page.style("activity-listitem-img") } />
          </CardMedia>
        </Card>
      </div>
    );
  }
}
