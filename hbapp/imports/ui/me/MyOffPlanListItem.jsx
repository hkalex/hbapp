import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

// style json
import JsonStyle from './offplan.json';
import Styler from '/imports/utils/Styler.js';

export default class MyOffPlanListItem extends Component {

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
        browserHistory.push('/me/offplan_lists/item/' + this.props.offplan._id);
    }

    render() {
        // console.log(this.props)
        if (this.props.offplan.length == 0) return <div></div>;

        const offplan = this.props.offplan;
        const Src = offplan.photos[0] || "/images/placeholder.jpg";
        const price = Math.ceil(offplan.amount / 10000);
        const title = offplan.title;
        const room = offplan.room;
        const parlour = offplan.parlour;
        const parking = offplan.parking;

        return (
            <div className="OLIContent" {...this.page.style("OLIContent") } onClick={this.onClick.bind(this)}>
                <Card className="OLICard" {...this.page.style("OLICard") } >
                    <div className="OLICardDiv" {...this.page.style("OLICardDiv") } >
                        <CardMedia className="OLICardmedia" {...this.page.style("OLICardmedia") } >
                            <img className="OLIImg" {...this.page.style("OLIImg") } src={Src} />
                        </CardMedia>
                        <CardText className="OLICardtext" {...this.page.style("OLICardtext") } >
                            <div className="OLICardtextTitle" {...this.page.style("OLICardtextTitle") }>{title}</div>
                            <div className="OLICardtextDiv" {...this.page.style("OLICardtextDiv") } >
                                <div className="OLICardtextFLdiv" {...this.page.style("OLICardtextFLdiv") } >
                                    <p ><span className="OLICardtextFL" {...this.page.style("OLICardtextFL") } > {room}</span>室
                                        <span className="OLICardtextFL" {...this.page.style("OLICardtextFL") } > {parlour}</span>厅
                                        <span className="OLICardtextFL" {...this.page.style("OLICardtextFL") } > {parking}</span>车位
                                    </p>
                                </div>
                                <div className="OLICardPriceDiv" {...this.page.style("OLICardPriceDiv") } >
                                    <p >￥<span className="OLICardPrice" {...this.page.style("OLICardPrice") }  >{price}</span>万</p>
                                </div>

                            </div>

                        </CardText>
                    </div>
                </Card>
            </div>
        );
    }
}
