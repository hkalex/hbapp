import React, { Component } from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import logger from '../../loggers/logger';
import { browserHistory } from 'react-router';

// constants
import C from '../../consts/Constants';
// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';

export default class InfoListItem extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onClick() {
    browserHistory.push('/info/' + this.props.item._id);
  }

  render() {
    const photoUrl = this.props.item.image[0].cdnUrl || "/images/placeholder.jpg";

    return (
      <div className="info-listitem-content" {...this.page.style("info-listitem-content") }
        onClick={this.onClick.bind(this)}>
        <Card>
          <CardMedia
            overlay={<CardTitle className="info-listitem-cardtitle"
              title={this.props.item.title}
              {...this.page.style("info-listitem-cardtitle") } />} >
            <img src={photoUrl} className="info-listitem-cardimg" {...this.page.style("info-listitem-cardimg") }  />
          </CardMedia>
          <BottomDiv {...this.props} className='bottom-div' />
        </Card>
      </div>
    )
  }
}

class BottomDiv extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  render() {
    const item = this.props.item;
    const date = item.date.getFullYear() + "年" + (item.date.getMonth() + 1) + "月" + item.date.getDate() + "日";

    return (
      <div className="info-listitem-container" {...this.page.style("info-listitem-container") }>
        <p className="info-listitem-desc" {...this.page.style("info-listitem-desc") }>{item.shortDesc}</p>
        <p className="info-listitem-date" {...this.page.style("info-listitem-date") }>{date}</p>
      </div>
    )
  }
}