import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Provider, connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
// components
import { AppBar, FlatButton, FontIcon, IconButton, Checkbox } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
// Constants
import C, { STYLE, OFF_PLAN_COUNTRY, OFF_PLAN_CITY, OFF_PLAN_CURRENCY } from '../../consts/Constants';
// collections
import OffPlans from '/imports/db/offPlans';
// actions
import { halfEditToBackDialogAction, editToSubmitDialogAction } from '/imports/actions/utils/dialogAction';

export class EditOffPlan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: [],
      creatBy: Meteor.userId()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.offPlans) {
      this.setState({
        form: nextProps.offPlans,
      });
    }
  }

  componentWillMount() {
    if (this.props.offPlans) {
      this.setState({
        form: this.props.offPlans,
      });
    }
  }

  onBack() {
    this.props.dispatch(halfEditToBackDialogAction({
      message: "您确定要放弃此次修改吗？",
    }));
  }

  handleChange(e) {
    this.setState(Object.assign(this.state.form, { [e.target.name]: e.target.value }));
  }

  imgChange() {
    let photos = this.state.form.photos || [];
    var reader = new FileReader();
    reader.onload = (e) => {
      photos.push(e.target.result);
      const formValues = Object.assign({}, this.state.form, {
        photos: photos
      });
      this.setState({ form: formValues });
    }
    reader.readAsDataURL(document.querySelector("#myFileUpload").files[0]);
  }

  handleSubmit(e) {
    OffPlans.update({ _id: this.state.form._id }, {$set: this.state.form});
    this.props.dispatch(editToSubmitDialogAction());
  }

  TriggleClick(e) {
    $("#myFileUpload").click();
  }

  removeImg(e) {
    let photos = this.state.form.photos;
    const Src = $(e.target).prev().attr('src');
    const index = photos.indexOf(Src);
    photos.splice(index, 1);
    this.setState({
      form: Object.assign(this.state.form, { photos })
    })
  }

  showCities() {
    const countries = this.props.lists.Country.detail;
    let current_country = this.state.form.country;
    if (current_country && current_country != "ALL") {
      return countries.map((v) => {
        if (current_country == v.code) {
          if (v.items) {
            const cities = v.items;
            return cities.map((v, i) => {
              return <option key={i} value={v.code}>{v.title}</option>;
            })
          } else {
            return <option key="99" value="ALL">全部</option>;
          }
        }
      })
    } else {
      return <option key="99" value="ALL">全部</option>;
    }

  }

  render() {

    // console.log(this.props);
    const countries = this.props.lists.Country.detail;
    let showCountry, showCurrency;
    showCountry = countries.map((v, i) => {
      return (
        <option key={i} value={v.code}>{v.title}</option>
      )
    });
    showCountry.unshift(<option key="99" value="ALL">全部</option>);
    showCurrency = OFF_PLAN_CURRENCY.map((v, i) => {
      return (
        <option key={i} value={v.code}>{v.code}</option>
      )
    })

    const title = this.state.form.title;
    const address = this.state.form.address;
    const parking = this.state.form.parking;
    const parlour = this.state.form.parlour;
    const room = this.state.form.room;
    const shortDesc = this.state.form.shortDesc;
    const expectedSettleAt = this.state.form.expectedSettleAt;
    const country = this.state.form.country;
    const area = this.state.form.area;
    const city = this.state.form.city;
    const currency = this.state.form.currency;
    const amount = this.state.form.amount;
    const photos = this.state.form.photos;
    const Src = "/images/placeholder.jpg";
    let date, showImg;
    if (typeof (this.state.form.expectedSettleAt) == "object") {
      const year = this.state.form.expectedSettleAt.getFullYear();
      const month = this.state.form.expectedSettleAt.getMonth() + 1;
      const day = this.state.form.expectedSettleAt.getDate();
      if (month < 10 && day < 10) {
        date = year + "-" + "0" + month + "-" + "0" + day;
      } else if (month < 10 && day > 9) {
        date = year + "-" + "0" + month + "-" + day;
      } else if (month > 9 && day > 9) {
        date = year + "-" + month + "-" + day;
      }
    } else if (typeof (this.state.form.expectedSettleAt) == "string") {
      date = this.state.form.expectedSettleAt
    }

    showImg = photos.map((v, i) => {
      return (
        <div key={i} style={{ display: "inline-block" }}>
          <img src={v || Src} style={{ width: "100px", height: "100px", border: "1px solid #2a2c2e" }} />
          <i className="fa fa-minus-circle"
            onClick={this.removeImg.bind(this)}
            style={{ position: "relative", right: "20%", bottom: "30px", fontSize: "22px" }}></i>
        </div>
      )
    });

    // style
    const labelStyle = {
      border: "1px solid rgb(236, 236, 236)",
      width: "100%",
      height: "60px",
      lineHeight: "60px"
    };
    const iptStyle = { width: "88%", height: "32px" };
    const floorPlansStyle = { fontSize: "18px", width: "20%", height: "32px" };

    return (
      <div>
        <div className='off-plan-header'>
          <AppBar showMenuIconButton={false}
            zDepth={0}
            title="修改信息"
            titleStyle={{ lineHeight: "64px", fontSize: "22px" }}
            style={{
              backgroundColor: STYLE.BACKGROUND_COLOR_2,
              textAlign: "center",
              padding: 0,
              position: "fixed",
              top: 0
            }}>
          </AppBar>
          <FlatButton style={{
            position: "fixed",
            top: "1.3rem",
            zIndex: 9999999,
            backgroundColor: "transparent"
          }}
            icon={< FontIcon className="fa fa-chevron-left" style={{ color: "#E3E3E3", marginLeft: "-70%" }} />}
            onClick={this.onBack.bind(this)} />
        </div>

        <div style={{ marginTop: "64px" }}>
          <form style={{ padding: "0 5px" }}>
            <label style={{ width: "100%", height: "36px", lineHeight: "36px" }}>
              名称:<input type="text" name="title" style={{ width: "90%" }} placeholder={title} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label style={{ width: "100%", height: "36px", lineHeight: "36px" }}>
              地址:<input type="text" name="address" style={{ width: "90%" }} placeholder={address} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label style={{ width: "100%", height: "36px", lineHeight: "36px" }}>
              国家:
                <select value={this.state.form.country} name="country" onChange={this.handleChange.bind(this)} style={{ marginRight: "10%" }}>
                {showCountry}
              </select>
              城市:
                 <select value={this.state.form.city} name="city" onChange={this.handleChange.bind(this)}>
                {this.showCities()}
              </select>
            </label><br />
            <label style={{ width: "100%", height: "36px", lineHeight: "36px" }}>
              价格:
                <select name="currency" value={this.state.form.currency} onChange={this.handleChange.bind(this)}>
                {showCurrency}
              </select>
              <input type="text" name="amount" value={amount} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label style={{ width: "100%", height: "36px", lineHeight: "36px" }}>
              面积:<input type="text" name="area" value={area} onChange={this.handleChange.bind(this)} /><span>m<sup>2</sup></span>
            </label><br />
            <label>
              户型:<input type="text" name="room" style={{ fontSize: "18px", width: "20%", height: "32px" }} value={room} onChange={this.handleChange.bind(this)} /><span>室</span>
              <input type="text" name="parlour" style={{ fontSize: "18px", width: "20%", height: "32px" }} value={parlour} onChange={this.handleChange.bind(this)} /><span>厅</span>
              <input type="text" name="parking" style={{ fontSize: "18px", width: "20%", height: "32px" }} value={parking} onChange={this.handleChange.bind(this)} /><span>车位</span>
            </label><br />
            <label style={{ width: "100%", height: "36px", lineHeight: "36px" }}>
              交房日期:<input type="date" name="expectedSettleAt" value={date} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label>
              简短描述:<textarea type="text"
                style={{ width: '260px', height: '100px', maxWidth: '260px', maxHeight: '100px' }}
                name="shortDesc" value={shortDesc} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label style={{ width: "100%", height: "36px", lineHeight: "36px" }}>
              上传图片:</label><br />
            {showImg}
            <input type="file" name="photos" id="myFileUpload" style={{ visibility: "hidden", position: "absolute" }} onChange={this.imgChange.bind(this)} />
            <FlatButton id="uploadImg"
              style={{
                width: 100,
                height: 100
              }}
              icon={< FontIcon className="fa fa-plus-square-o" style={{ fontSize: "100px" }} />}
              onClick={this.TriggleClick.bind(this)} /> <br />
            <input type="submit"
              id="submit-buttom"
              value="Submit"
              style={{ visibility: "hidden", position: "absolute" }} />

            <Checkbox label="阅读并同意《房屋委托出售协议》"
              checked={true}
              disabled={true}
              iconStyle={{ marginRight: "5px" }} />

            <button type="button"
              style={{
                width: "80%",
                backgroundColor: "#424242",
                height: "36px",
                fontSize: "16px",
                marginLeft: "10%",
                color: "#E3E3E3",
              }}
              onClick={this.handleSubmit.bind(this)}>
              提交
            </button>
          </form>

        </div>

      </div>
    );
  }
}

const EditOffPlanContainer = createContainer((props) => {
  const listsSub = Meteor.subscribe('lists');
  const offPlansSub = Meteor.subscribe('offPlans');
  let offPlans = null;
  if (!props.offPlan) {
    offPlans = OffPlans.findOne({ _id: OffPlans.ObjectID(props.params._id) });
  } else {
    offPlans = props.offPlan;
  }

  return {
    subReady: offPlansSub.ready() && listsSub.ready(),
    offPlans,
    lists: props.lists
  }
}, EditOffPlan);

function mapStateToProps(state) {
  if (state.lists) {
    return {
      lists: state.lists
    };
  }
  return {};
}

export default connect(mapStateToProps)(EditOffPlanContainer);
