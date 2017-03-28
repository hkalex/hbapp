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
import { halfEditToBackDialogAction, editToSubmitDialogAction, halfEditToSubmitDialogAction } from '/imports/actions/utils/dialogAction';


export class NewOffPlan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        address: '',
        country: '',
        city: '',
        room: '',
        area: '',
        parlour: '',
        parking: '',
        expectedSettleAt: '',
        currency: '',
        amount: '',
        photos: '',
        shortDesc: '',
        creatBy: Meteor.userId()
      },
    }
  }


  showCities() {
    const countries = this.props.lists.Country.detail;
    let current_country = this.state.country;
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

  onBack() {
    let values = this.state.form;
    if (!_.values(values).some(x => x !== undefined)) {
      this.props.router.goBack();
    } else {
      this.props.dispatch(halfEditToBackDialogAction({
        message: "是否退出此次编辑",
      }));
    }
  }


  handleChange(e) {
    this.setState(Object.assign(this.state.form, { [e.target.name]: e.target.value }));
  }

  handleSubmit(e) {
    const v = this.state.form;
    let form = {};
    if (v.title && v.address && v.country && v.city && v.room && v.parlour && v.parking && v.area && v.expectedSettleAt
      && v.currency && v.amount && v.photos && v.shortDesc) {
      OffPlans.insert(v);
      this.props.dispatch(editToSubmitDialogAction());
    } else {
      this.props.dispatch(halfEditToSubmitDialogAction());
    }
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

  renderImages() {
    if (this.state.form && this.state.form.photos) {
      return this.state.form.photos.map((v, i) => {
        const Src = "/images/placeholder.jpg";
        return (
          <div key={i} style={{ display: "inline-block" }}>
            <img src={v || Src} style={{ width: "100px", height: "100px", border: "1px solid #2a2c2e" }} />
            <i className="fa fa-minus-circle"
              onClick={this.removeImg.bind(this)}
              style={{ position: "relative", right: "20%", bottom: "30px", fontSize: "22px" }}></i>
          </div>
        );
      });
    }
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

  render() {

    // console.log(this.state.form);
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
            title="委托发布"
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
            <label style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>名称</span>:<input type="text" name="title" style={{ width: "90%" }} placeholder="请填写名称" onChange={this.handleChange.bind(this)} />
            </label><br />
            <label style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>地址</span>:<input type="text" name="address" style={{ width: "90%" }} placeholder="请填写具体地址" onChange={this.handleChange.bind(this)} />
            </label><br />
            <label style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>国家</span>:
                <select name="country" onChange={this.handleChange.bind(this)} style={{ marginRight: "10%" }}>
                {showCountry}
              </select>
              <span style={{ fontSize: "16px" }}>城市</span>:
                <select name="city" onChange={this.handleChange.bind(this)}>
                {this.showCities()}
              </select>
            </label><br />
            <label style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>价格</span>:
                 <select name="currency" onChange={this.handleChange.bind(this)}>
                {showCurrency}
              </select>
              <input type="text" name="amount" onChange={this.handleChange.bind(this)} />
            </label><br />
            <label  style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>面积</span>:<input type="text" name="area" onChange={this.handleChange.bind(this)} /><span>m<sup>2</sup></span>
            </label><br />
            <label  style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>户型</span>:<input type="text" name="room" style={{ fontSize: "18px", width: "20%", height: "32px" }} onChange={this.handleChange.bind(this)} /><span>室</span>
              <input type="text" name="parlour" style={{ fontSize: "18px", width: "20%", height: "32px" }} onChange={this.handleChange.bind(this)} /><span>厅</span>
              <input type="text" name="parking" style={{ fontSize: "18px", width: "20%", height: "32px" }} onChange={this.handleChange.bind(this)} /><span>车位</span>
            </label><br />
            <label  style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>交房日期</span>:<input type="date" name="expectedSettleAt" onChange={this.handleChange.bind(this)} />
            </label><br />
            <label  style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>简短描述</span>:
              <textarea type="text" name="shortDesc" placeholder="不得超过两百字"
                style={{ width: '260px', height: '100px', maxWidth: '260px', maxHeight: '100px'}} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label style={{width:"100%",height:"36px",lineHeight:"36px"}}>
              <span style={{ fontSize: "16px" }}>上传图片</span>:</label><br />
            <input type="file" name="photos" id="myFileUpload" style={{ visibility: "hidden", position: "absolute" }} onChange={this.imgChange.bind(this)} />
            {this.renderImages()}
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

          </form>
        </div>
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
      </div>
    );
  }
}

const NewOffPlanContainer = createContainer(({lists}) => {
  Meteor.subscribe('offPlans');
  Meteor.subscribe('lists');
  return { offPlans: null, lists }
}, NewOffPlan);

function mapStateToProps(state) {
  if (state.lists) {
    return {
      lists: state.lists
    };
  }
  return {};
}

export default connect(mapStateToProps)(NewOffPlanContainer);
