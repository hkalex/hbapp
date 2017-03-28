import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import logger from '../../loggers/logger';
import wechatShare from '/imports/intg/wechatShare';

// collections
import Projects from '../../db/projects';
import Favorites from '../../db/favorites';

// components
import { AppBar, FlatButton, FontIcon } from 'material-ui';
import Slider from 'react-slick';
import { GridList } from 'material-ui/GridList';
import { Card, CardMedia, } from 'material-ui/Card';

// Actions
import { setFavoriteAction } from '/imports/actions/project/projectDetailActions';
import { sharingDialogAction } from '/imports/actions/utils/dialogAction'

// Constants
import C, { STYLE } from '../../consts/Constants';
// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';


class ProjectDetail extends Component {

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

  onBack() {
    this.props.router.goBack();
  }

  onFavorite() {
    if (Meteor.userId()) {
      this.props.dispatch(setFavoriteAction(this.props.projectId));
    } else {
      this.props.router.push('/user_login');
    }
  }


  share(title, type) {
    wechatShare(title, type);
  }

  onShare(title) {
    this.props.dispatch(sharingDialogAction({
      weChat: <img src="/images/icon64_wx_logo.png" onClick={this.share.bind(this, title, "wechat")} />,
      circle: <img src="/images/icon64_circle.png" onClick={this.share.bind(this, title, "circle")} />
    }));
  }

  render() {
    // prevents initial render without List/data from server. 
    // Thus all children will get List at their initial render.   
    if (this.props.subReady == false) return <div />;

    let backButtonClass, sharingButtonClass;
    if (Meteor.isInWeChat()) {
      backButtonClass = "fa fa-chevron-left hide";
      sharingButtonClass = "fa fa-share-square-o hide";
    } else {
      backButtonClass = "fa fa-chevron-left";
      sharingButtonClass = "fa fa-share-square-o";
    }

    // get Lists
    const statusDetail = this.props.lists["Project.Status"]["detail"];
    const countryDetail = this.props.lists.Country.detail;
    const subtagsDetail = this.props.lists["Project.Tag"]["detail"];
    const propertyTypeDetail = this.props.lists["Project.Type"]["detail"];

    // get info from props
    const projectDetailInfo = this.props.projectDetailInfo;
    const countryCode = projectDetailInfo.country;
    const cityCode = projectDetailInfo.city;
    const title = projectDetailInfo.title;
    const status = projectDetailInfo.status;
    const price = Math.ceil(projectDetailInfo.fromPrice.amount / 10000);
    const subtags = projectDetailInfo.tags;
    const photos = projectDetailInfo.photos;
    const TOTAL = projectDetailInfo.photos.length;
    const shortDesc = projectDetailInfo.shortDesc;
    const builder = projectDetailInfo.builder;
    const propertyType = projectDetailInfo.propertyType;
    const expectedSettleAt = projectDetailInfo.publishedAt.getFullYear() + "年" + (projectDetailInfo.publishedAt.getMonth() + 1) + "月";
    const usageYear = projectDetailInfo.usageYear;
    const landArea = projectDetailInfo.fromArea.area;
    const numLots = projectDetailInfo.numLots;
    const floorPlan = projectDetailInfo.floorPlans;
    const project_Id = this.props.projectId;
    const favorite = this.props.favoriteInfo ? this.props.favoriteInfo.projects : null;

    // val for show. 
    let showStatus, showCity, showCountry, showSubTag, showSubTagTitle, imageUrl, showType, showTypeTitle, showUsageYear;
    let favoriteIconClass = "fa fa-heart-o";

    const topTags = this.props.projectDetailInfo ? this.props.projectDetailInfo.topTags : null;
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
          <div key={i} className='tag' style={{
            flex: "1",
            padding: "17px 0",
            height: "100%",
            textAlign: "center",
            borderStyle: "solid",
            borderColor: " rgb(236, 236, 236)",
            borderWidth: 0,
            borderLeft: "1px solid #A9A9A9"
          }}>
            <p style={{ fontSize: '20px', color: 'red', margin: 0 }} >{v.tag}</p>
            <p style={{ fontSize: '12px', margin: 0 }} >{topTagType}</p>
          </div>
        )
      });
    }

    statusDetail.forEach((item) => {
      if (item.code == status) showStatus = <i>{item.title}</i>
    })

    countryDetail.forEach((country) => {
      if (country.code == countryCode) {
        country.items.forEach((city) => {
          if (city.code == cityCode) {
            showCity = <i>{city.title}</i>;
          }
        });
        showCountry = <i>{country.title}</i>
      }
    })

    if (subtags && subtagsDetail) {
      showSubTag = subtags.map((v, i) => {
        subtagsDetail.forEach((subtag) => {
          if (subtag.code == v) showSubTagTitle = <span>{subtag.title}</span>
        })
        return (
          <div className='tag' key={i}
            style={{
              flex: "1",
              padding: "17px 0",
              height: "100%",
              textAlign: "center",
              borderStyle: "solid",
              borderColor: " rgb(236, 236, 236)",
              borderWidth: 0,
            }}
          >
            <i className="fa fa-check-circle-o" style={{
              marginRight: "0.5rem",
              color: "#00F5FF"
            }}></i>
            {showSubTagTitle}
          </div>
        )
      })
    }

    if (favorite) {
      favorite.forEach((project) => {
        if (project.projectId == project_Id) { favoriteIconClass = "fa fa-heart"; }
        else { favoriteIconClass = "fa fa-heart-o" }
      });
    }

    if (photos) {
      imageUrl = photos.map((v, i) => {
        return (
          <div key={i} style={{ width: "100%", height: "200px" }}>
            <img style={{ width: "100%", height: "200px" }} src={v.cdnUrl || "/images/placeholder.jpg"} />
            <span
              style={{
                zIndex: 100,
                position: "fixed",
                bottom: 0,
                backgroundColor: "#fcf8e3",
                borderRadius: "15px",
                width: "30px",
                height: "30px",
                lineHeight: "30px",
                textAlign: "center",
                opacity: "0.5"
              }}>{i + 1}/{TOTAL}</span>
          </div>
        )
      });
    }

    if (propertyType) {
      showType = propertyType.map((v, i) => {
        propertyTypeDetail.forEach((ptd) => {
          if (v == ptd.code) showTypeTitle = ptd.title;
        });
        return <span key={i}>{showTypeTitle + ' '}</span>;
      })
    }

    if (!isNaN(usageYear)) {
      if (usageYear == 0) {
        showUsageYear = "永久产权"
      } else {
        showUsageYear = usageYear + "年"
      }
    }

    const FloorPlanGridList = () => (
      <div className="project-detail-gridlist-root" {...this.page.style("project-detail-gridlist-root") } >
        <GridList className="project-detail-gridlist" {...this.page.style("project-detail-gridlist") } cols={2} >
          {floorPlan && floorPlan.map((v, i) => (
            <Card key={i} className="project-detail-card" {...this.page.style("project-detail-card") } >
              <CardMedia>
                <img key={i} src={v.photos[0].cdnUrl || "/images/placeholder.jpg"} className="project-detail-img" {...this.page.style("project-detail-img") } />
              </CardMedia>
              <span>{v.title}</span>
            </Card>
          ))}
        </GridList>
      </div>
    );

    return (

      <div className='project-detail-contailer'>
        <div className='project-detail-header'>
          <AppBar className="appBar project-detail-appbar" title={title}
            {...this.page.style("appBar", "project-detail-appbar") }>
            <span className={sharingButtonClass}
              {...this.page.style("project-detail-sharingbutton") }
              onClick={this.onShare.bind(this, title)} />
          </AppBar>
          <FlatButton className="project-detail-abbutton"
            {...this.page.style("project-detail-abbutton") }
            icon={<FontIcon className={backButtonClass} {...this.page.style("ABIcon") } />}
            onClick={this.onBack.bind(this)} />
        </div>
        <div className='project-detail-body'
          {...this.page.style("project-detail-body") }  >
          <Slider infinite={true}
            speed={100}
            arrows={false}
            touchMove={true}
            touchThreshold={5}
            slidesToShow={1}
            slidesToScroll={1}>
            {imageUrl}
          </Slider>

          <div className='project-detail-title'
            {...this.page.style("project-detail-title") }>
            <p className="project-detail-titlep" {...this.page.style("project-detail-titlep") }>{title}</p>
            <p className="project-detail-titlep" {...this.page.style("project-detail-titlep") }>
              <span className="project-detail-titlespan" {...this.page.style("project-detail-titlespan") }>
                {showStatus}
              </span>
            </p>
            <p className="project-detail-showcc" {...this.page.style("project-detail-showcc") }>
              <span className="fa fa-map-marker project-detail-showcc-icon" {...this.page.style("project-detail-showcc-icon") } />
              {showCountry}.{showCity}
            </p>
          </div>

          <div className='project-detail-tags'
            {...this.page.style("project-detail-tags") }>
            <div className='project-detail-tag'
              {...this.page.style("project-detail-tag") }>
              <p className="project-detail-tagp"  {...this.page.style("project-detail-tagp") }>
                <i className="project-detail-tagi" {...this.page.style("project-detail-tagi") }>￥</i>
                {price}
              </p>
              <p className="project-detail-price" {...this.page.style("project-detail-price") }>万</p>
              <p className="project-detail-pricep project-listitem-flp" {...this.page.style("project-listitem-flp") } >总价</p>
            </div>
            {TOPTAG}
          </div>
          <div className='project-detail-subtags'
            {...this.page.style("project-detail-subtags") }>
            {showSubTag}
          </div>
          <div className="hrDiv" {...this.page.style("project-detail-tagp") } />
          <div className="special-detail-content">
            <div
              className='special-description'
              dangerouslySetInnerHTML={{ __html: this.props.projectDetailInfo ? this.props.projectDetailInfo.desc : "" }}>
            </div>
          </div>
          <div className="hrDiv" {...this.page.style("project-detail-tagp") } />
          <div>
            <div className="project-detail-building" {...this.page.style("project-detail-building") }>
              <span className="project-detail-buildingspan" {...this.page.style("project-detail-buildingspan") }>
                楼盘信息
              </span>
            </div>
            <div className="project-detail-shortdesc" {...this.page.style("project-detail-shortdesc") }>{shortDesc}</div>
            <div className="project-detail-builder" {...this.page.style("project-detail-builder") }>
              <div className="project-detail-builderdiv" {...this.page.style("project-detail-builderdiv") }>
                <p className="project-detail-floorplan" {...this.page.style("project-detail-floorplan") }>开发商: {builder}</p>
                <p className="project-detail-floorplan" {...this.page.style("project-detail-floorplan") }>物业类型: {showType}</p>
                <p className="project-detail-floorplan" {...this.page.style("project-detail-floorplan") }>交房日期: {expectedSettleAt}</p>
              </div>
              <div className="project-detail-builderdiv project-detail-usageyear" {...this.page.style("project-detail-builderdiv", "project-detail-usageyear") }>
                <p className="project-detail-floorplan" {...this.page.style("project-detail-floorplan") }>产权年限: {showUsageYear}</p>
                <p className="project-detail-floorplan" {...this.page.style("project-detail-floorplan") }>规划面积: {landArea}m<sup>2</sup></p>
                <p className="project-detail-floorplan" {...this.page.style("project-detail-floorplan") }>户数: {numLots}</p>
              </div>
            </div>
          </div>
          <div className="hrDiv" {...this.page.style("project-detail-tagp") } />
          <div>
            <div className="project-detail-building" {...this.page.style("project-detail-building") }>
              <span className="project-detail-buildingspan" {...this.page.style("project-detail-buildingspan") }>
                在售户型
              </span>
            </div>
            <FloorPlanGridList />
          </div>
        </div>

        <div className='project-detail-footer' {...this.page.style("project-detail-footer") }>
          <FlatButton className="project-detail-flatbutton" label="收藏"
            icon={<i className={favoriteIconClass}
              {...this.page.style("project-detail-favorite") } />}
            {...this.page.style("project-detail-flatbutton") }
            onClick={this.onFavorite.bind(this)} />
          {/**  <FlatButton
            icon={<i className="fa fa-commenting-o"
              aria-hidden="true"
              style={{
                display: "block",
                position: "absolute",
                top: "5px",
                left: "20px",
                color: "#0D0D0D",
                fontSize: "16px"
              }} />}
            style={{ height: "100%" }}
            label="在线预订"
            labelStyle={{ top: "10px", color: "#2B2B2B", fontSize: "12px" }}
            primary={true} /> */}
          <a href={"tel:" + Meteor.settings.public.FREE_PHONE_NUMBER}
            className="project-detail-flatbuttona"   {...this.page.style("project-detail-flatbuttona") } >
            <FlatButton className="project-detail-freecall" label="免费电话"
              {...this.page.style("project-detail-freecall") } />
          </a>
          {/** <FlatButton style={{
            height: "100%",
            backgroundColor: "rgb(255, 68, 59)",
            color: 'white',
            flex: '1'
          }}
            label="预约咨询"
            primary={true} /> */}
        </div>
      </div >
    );
  }
}


const ProjectDetailContainer = createContainer(({lists}) => {

  const _id = location.pathname.slice(9);
  const projectDetailSub = Meteor.subscribe('getProjectDetail', _id);
  const userFavoriteSub = Meteor.subscribe('favorites', Meteor.userId());

  const projectDetailSubReady = projectDetailSub.ready() && userFavoriteSub.ready();
  const projectDetailInfo = Projects.findOne({ _id: Projects.ObjectID(_id) }) || null;
  const favoriteInfo = Favorites.findOne({ userId: Meteor.userId() }) || null;

  return {
    subReady: projectDetailSubReady,
    projectDetailInfo,
    favoriteInfo,
    projectId: _id,
    lists,
  };
}, ProjectDetail);

function mapStateToProps(state) {
  return {
    lists: state.lists,
  };
}

export default connect(mapStateToProps)(ProjectDetailContainer);
