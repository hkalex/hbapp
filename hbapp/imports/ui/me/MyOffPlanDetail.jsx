import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { createContainer } from 'meteor/react-meteor-data';
import logger from '../../loggers/logger';
// collections
import OffPlans from '../../db/offPlans';
// components
import { AppBar, FlatButton, FontIcon } from 'material-ui';

// style json
import JsonStyle from './offplan.json';
import Styler from '/imports/utils/Styler.js';

// Actions
import { setFavoriteAction } from '/imports/actions/project/projectDetailActions';
import { isSureModifyDialogAction } from '/imports/actions/utils/dialogAction';

class OffPlanDetail extends Component {

  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subReady) {
      return true;
    }
    return false;

  }

  onBack() {
    this.props.router.goBack();
  }

  onFavorite() {
    if (Meteor.userId()) {
      // this.props.dispatch(setFavoriteAction(this.props.projectId));
      console.log("已登录，通过ID将此二手楼花收藏")
    } else {
      this.props.router.push('/user_login');
    }
  }

  onEdit() {
    this.props.dispatch(isSureModifyDialogAction({
      _id: this.props.offPlansData._id
    }))
  }


  render() {
    // console.log(this.props);
    // prevents initial render without List/data from server. 
    // Thus all children will get List at their initial render.   
    if (this.props.subReady == false) return <div />;

    let imageUrl, showCity, showCountry, statusClassname;

    const OFFPLANS = this.props.offPlansData;
    const listsCountry = this.props.lists.Country.detail;
    const photos = OFFPLANS.photos;
    const TOTAL = OFFPLANS.photos.length;
    const title = OFFPLANS.title;
    const address = OFFPLANS.address;
    const countryCode = OFFPLANS.country;
    const cityCode = OFFPLANS.city;
    const settleTime = OFFPLANS.expectedSettleAt;
    const parking = OFFPLANS.parking;
    const parlour = OFFPLANS.parlour;
    const room = OFFPLANS.room;
    const price = Math.ceil(OFFPLANS.amount / 10000);
    const shortDesc = OFFPLANS.shortDesc;
    const CONTAINER_HEIGHT = screen.height - 114;

    // const favorite = this.props.favoriteInfo ? this.props.favoriteInfo.projects : null;
    // let favoriteIconClass = "fa fa-heart-o";
    // if (favorite) {
    //     favorite.forEach((project) => {
    //         if (project.projectId == project_Id) { favoriteIconClass = "fa fa-heart"; }
    //         else { favoriteIconClass = "fa fa-heart-o" }
    //     });
    // }

    imageUrl = photos.map((v, i) => {
      return (
        <div key={i} className="sliderDiv" {...this.page.style("sliderDiv") }>
          <img className="sliderImg" {...this.page.style("sliderImg") } src={v || "/images/placeholder.jpg"} />
          <span className="sliderSpan"  {...this.page.style("sliderSpan") }>{i + 1}/{TOTAL}</span>
        </div>
      )
    });

    listsCountry.forEach((country) => {
      if (country.code == countryCode) {
        country.items.forEach((city) => {
          if (city.code == cityCode) {
            showCity = <i>{city.title}</i>;
          }
        });
        showCountry = <i>{country.title}</i>
      }
    })

    if (OFFPLANS.isApproval) {
      statusClassname = "hide"
    } else {
      statusClassname = "show"
    }


    return (
      <div>
        <div className="offplan-detail-header">
          <AppBar className="appBar DetailABop" title={title}
            {...this.page.style("appBar", "DetailABop") }
            iconElementRight={<i className="fa fa-pencil-square-o OHIconR"
              {...this.page.style("OHIconR") }
              onTouchTap={this.onEdit.bind(this)}
            />}
          >
          </AppBar>
          <FlatButton className="ABButton" {...this.page.style("ABButton") }
            icon={<FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className="offplan-detail-body DetailBody" {...this.page.style("DetailBody") }>
          <Slider infinite={true}
            speed={500}
            arrows={false}
            touchMove={true}
            touchThreshold={5}
            slidesToShow={1}
            slidesToScroll={1}>
            {imageUrl}
          </Slider>
          <div className='offplan-detail-title DetailTitle' {...this.page.style("DetailTitle") }>
            <p className="DetailP" {...this.page.style("DetailP") }>
              {showCountry} | {showCity}
              <span className="DetailSpan" {...this.page.style("DetailSpan") }>{price}</span><i>万</i>
            </p>
          </div>
          <div className={statusClassname} {...this.page.style("DetailChangeStatus") } >
            <span className="DetailStatus" {...this.page.style("DetailStatus") } >审核中</span>
          </div>
          <div>


            <div className="offplan-detail-settleTime DetailTimeDiv"
              {...this.page.style("DetailTimeDiv") } >
              <span className="fa fa-calendar DetailIcon" {...this.page.style("DetailIcon") }></span>
              <span className="DetailTimeSpan" {...this.page.style("DetailTimeSpan") }>交房日期:</span>
              <span>{settleTime}</span>
            </div>
            <div className="offplan-detail-address DetailDesc" {...this.page.style("DetailDesc") }>
              <span className="fa fa-map-marker DetailIcon" {...this.page.style("DetailIcon") }></span>
              <span className="DetailTimeSpan" {...this.page.style("DetailTimeSpan") }>地点:</span>
              <a href={`http://maps.apple.com/?address=${address}`}>{`${address}`}</a>
            </div>
            <div className="offplan-detail-floorPlan DetailDescHeight"
              {...this.page.style("DetailDesc", "DetailDescHeight") }>
              <span className="fa fa-home DetailIcon" {...this.page.style("DetailIcon") }></span>
              <span className="DetailTimeSpan" {...this.page.style("DetailTimeSpan") }>户型:</span>
              <span className="DetailFPIcon" {...this.page.style("DetailFPIcon") }>{room}<span className="fa fa-bed"></span></span>
              <span className="DetailFPIcon" {...this.page.style("DetailFPIcon") }>{parlour}<span className="fa fa-bath"></span></span>
              <span className="DetailFPIcon" {...this.page.style("DetailFPIcon") }>{parking}<span className="fa fa-car"></span></span>
            </div>
            <div className="offplan-detail-floorPlan DetailDescHeight"
              {...this.page.style("DetailDesc", "DetailDescHeight") }>
              <span className="fa fa-square-o DetailIcon" {...this.page.style("DetailIcon") }></span>
              <span className="DetailTimeSpan" {...this.page.style("DetailTimeSpan") }>房屋面积:</span>
              <span >100</span><span>m<sup>2</sup></span>
            </div>
            <div className="offplan-detail-shortDesc DetailDesc" {...this.page.style("DetailDesc") }>
              <span className="fa fa-diamond DetailIcon" {...this.page.style("DetailIcon") }></span>
              <span className="DetailTimeSpan" {...this.page.style("DetailTimeSpan") }>精彩描述:</span>
              <span >{shortDesc}</span>
            </div>
          </div>
        </div>

        <div className='offplan-detail-footer DetailFooter'
          {...this.page.style("DetailFooter") } >
          <FlatButton className="DetailFooterRB" label="收藏"
            disabled={true}
            {...this.page.style("DetailFooterRB") }
            icon={<i className="fa fa-heart-o DetailFooterRBIcon"
              {...this.page.style("DetailFooterRBIcon") } />}
            onClick={this.onFavorite.bind(this)} />

          <a href={"tel:" + Meteor.settings.public.FREE_PHONE_NUMBER}
            className="DetailFooterA" {...this.page.style("DetailFooterA") }>
            <FlatButton className="DetailFooterARB" label="免费电话"
              {...this.page.style("DetailFooterARB") } />
          </a>
        </div>

      </div >
    )
  }

}


const OffPlanDetailContainer = createContainer(({lists, offPlans, params}) => {
  const offPlansSub = Meteor.subscribe('offPlans');
  const offPlansData = OffPlans.findOne({ _id: OffPlans.ObjectID(params._id) });

  return {
    subReady: offPlansSub.ready(),
    offPlansData,
    lists

  }

}, OffPlanDetail);

function mapStateToProps(state) {
  return {
    lists: state.lists,
  };
}

export default connect(mapStateToProps)(OffPlanDetailContainer);