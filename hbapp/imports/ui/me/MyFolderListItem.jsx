import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

// style json
import JsonStyle from './me.json';
import Styler from '/imports/utils/Styler.js';

export default class MyFolderListItem extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  onClick() {
    this.props.router.push('/project/' + this.props.project.projectId);
  }

  render() {
    // console.log(this.props)
    const photoUrl = this.props.project.projectImage.cdnUrl || "/images/placeholder.jpg";
    const title = this.props.project ? this.props.project.projectName : null;
    const price = this.props.project ? Math.ceil(this.props.project.projectPrice.amount / 10000) : null;
    const topTags = this.props.project ? this.props.project.projectTag : null;

    let TOPTAG, topTagType;
    if (topTags) {
      TOPTAG = topTags.map((v, i) => {
        if (v.type == "ER") {
          topTagType = "预期年收益"
        }
        if (v.type == "MR") {
          topTagType = "首付比例"
        }
        return (
          <div key={i} className="MFLITagDIV" {...this.page.style("MFLITagDIV") }>
            <p className="MFLITagP" {...this.page.style("MFLITagP") } >{v.tag}</p>
            <p className="MFLIToptagP" {...this.page.style("MFLIToptagP") }>{topTagType}</p>
          </div>

        )
      });
    }

    return (
      <div className="MFLIContent" {...this.page.style("MFLIContent") } onClick={this.onClick.bind(this)}>
        <Card className="MFLICard" {...this.page.style("MFLICard") } >
          <div className="MFLIDiv" {...this.page.style("MFLIDiv") } >
            <CardMedia className="MFLICardmedia" {...this.page.style("MFLICardmedia") } >
              <img className="MFLIImg" {...this.page.style("MFLIImg") } src={photoUrl} />
            </CardMedia>
            <CardText className="MFLICardtext" {...this.page.style("MFLICardtext") } >
              <div className="MFLITitleDiv" {...this.page.style("MFLITitleDiv") } >{title}</div>
              <div className="MFLIdivContent" {...this.page.style("MFLIdivContent") } >
                <div className="MFLIinnerDiv" {...this.page.style("MFLIinnerDiv") } >
                  <p className="MFLIPrice" {...this.page.style("MFLIPrice") } >
                    <i className="MFLIIcon" {...this.page.style("MFLIIcon") } >￥</i>
                    {price}
                  </p>
                  <p className="MFLIPtext" {...this.page.style("MFLIPtext") }  >万</p>
                  <p className="MFLIPcount" {...this.page.style("MFLIPcount") }  >总价</p>
                </div>
                {TOPTAG}
              </div>
            </CardText>
          </div>
        </Card>
      </div>
    );
  }
}
