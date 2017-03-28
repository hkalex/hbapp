import React, { Component } from 'react';
import C, { STYLE } from '../../consts/Constants';
import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { browserHistory } from 'react-router';
// style json
import JsonStyle from './utility.json';
import Styler from '/imports/utils/Styler.js';

export default class GridListDiscover extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onClick(id) {
    if (this.props.discover == 'info') {
      browserHistory.push('/info/' + id);
    } else if (this.props.discover == 'activity') {
      browserHistory.push('/activity/' + id);
    } else if (this.props.discover == 'offplan') {
      browserHistory.push('/me/offplan_lists/item/' + id);
    } else if (this.props.discover == 'homepage') {
      browserHistory.push('/project/' + id);
    }
  }

  render() {

    // console.log(this.props);

    const gridStyles = {
      root: {
        display: 'flex',
        padding: '16px 0',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        margin: 0,
        height: '150px',
      },
      titleStyle: {
        color: 'rgba(255, 255, 255, 0.870588)',
        fontSize: '14px',
        lineHeight: '30px',
        width: '150px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      },
    };

    return (
      <div style={gridStyles.root}>
        <GridList style={gridStyles.gridList} cols={1} >
          {this.props.list && this.props.list.map((v, i) => {
            let imageUrl;
            if (this.props.discover && this.props.discover == 'offplan') {
              imageUrl = v.photos[0] || '/images/placeholder.jpg';
            } else if (this.props.discover && this.props.discover == 'homepage') {
              imageUrl = v.photos[0].cdnUrl || '/images/placeholder.jpg';
            } else {
              imageUrl = v.image[0].cdnUrl || '/images/placeholder.jpg';
            }
            return (
              <div key={i} onClick={this.onClick.bind(this, v._id)}>
                <Card className="GDcard" {...this.page.style("GDcard") } >
                  <CardMedia
                    overlay={<CardTitle className="GDcardtitle" {...this.page.style("GDcardtitle") }
                      title={v.title}
                      titleStyle={gridStyles.titleStyle} />} >
                    <img key={i} className="GDimg" src={imageUrl} {...this.page.style("GDimg") } />
                  </CardMedia>
                </Card>
              </div>
            );
          })}
        </GridList>
      </div>
    );
  }
}
