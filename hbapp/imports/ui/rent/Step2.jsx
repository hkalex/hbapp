import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { TextField, AutoComplete, MenuItem, SelectField } from 'material-ui';
import TagsList from './TagsList';
// consts
import { CLASS_DATA, PAYTYPE, MAX_RANGE, MIN_RANGE } from '../../consts/Constants';
// actions
import Sublets from '/imports/db/sublets';
import { updateSubletForm } from '/imports/actions/sublet/updateForm';
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';


class HotTags extends Component {
  constructor(props) {
    super(props);
    var bills = props.subletForm.bill || props.m_sf.bill || {};
    var classes = props.subletForm.class || 'C';
    let billValue;
    if (bills) {
      if (bills.type == "A") {
        billValue = "小主不用交啦"
      } else if (bills.type == "E") {
        billValue = "按房间平摊"
      } else {
        billValue = bills.amount
      }
    }
    this.state = {
      classes: classes,

      pType: bills.type || 'M',
      pAbled: bills.type == "H" ? false : true,
      pHT: '',
      pTV: billValue || '费用交纳',
      bill: bills,

      subletForm: Object.assign({}, props.m_sf, props.subletForm),
      roomNum: props.subletForm.bedroom === 0 ? 0 : (props.subletForm.bedroom || ""),
      bathNum: props.subletForm.bathroom === 0 ? 0 : (props.subletForm.bathroom || ""),
      parkNum: props.subletForm.parking === 0 ? 0 : (props.subletForm.parking || ""),
    };
  }

  checkForm() {
    let subletForm = this.state.subletForm;
    Object.assign(subletForm, { bill: this.state.bill });
    console.log(subletForm)
    if ((subletForm.bedroom || subletForm.bedroom === 0) && (subletForm.bathroom || subletForm.bathroom === 0)
      && (subletForm.parking || subletForm.parking === 0) && subletForm.class != "C"
      && subletForm.publicArea.length && subletForm.kitchen.length && (subletForm.bill.type != "M")) {

      this.props.dispatch(updateSubletForm(subletForm));
      Sublets.update({ _id: this.props.m_sf._id }, { $set: subletForm });
      return true;
    }
    this.props.dispatch(simpleSnackbarAction({ message: "请填写完整" }));
    return false;
  }

  handleChange(e, index, event, value) {
    if (e == "bedroom") {
      this.setState({
        roomNum: value,
        subletForm: Object.assign(this.state.subletForm, { [e]: value })
      });
    } else if (e == "bathroom") {
      this.setState({
        bathNum: value,
        subletForm: Object.assign(this.state.subletForm, { [e]: value })
      });
    } else if (e == "parking") {
      this.setState({
        parkNum: value,
        subletForm: Object.assign(this.state.subletForm, { [e]: value })
      });
    } else {
      this.setState({
        classes: value,
        subletForm: Object.assign(this.state.subletForm, { [e]: value })
      });
    }
  }

  selectChange(event, index, value) {
    this.getBillValue(value);
    let bill = this.state.bill;
    Object.assign(this.state.subletForm, { bill })
  }

  getBillValue(value) {
    switch (value) {
      case 'M':
        this.setState({
          pType: value, pAbled: true, pHT: '', pTV: '费用交纳',
          bill: Object.assign({}, this.state.bill, { type: "M", amount: 0 })
        });
        break;
      case 'A': {
        this.setState({
          pType: value, pAbled: true, pHT: '小主不用交啦', pTV: '小主不用交啦',
          bill: Object.assign({}, this.state.bill, { type: "A", amount: 0 })
        });
        break;
      }
      case 'H':
        this.setState({ pType: value, pAbled: false, pHT: '给点小费吧', pTV: '' });
        break;
      case 'E': {
        this.setState({
          pType: value, pAbled: true, pHT: '', pTV: '按房间平摊',
          bill: Object.assign({}, this.state.bill, { type: "E", amount: 0 })
        });
        break;
      }
      default:
        break;
    }
  }

  onChange(e) {
    this.setState({
      pTV: e.target.value,
      bill: Object.assign({}, this.state.bill, { type: "H", [e.target.name]: e.target.value })
    })
  }

  handleUpdateInput(name, searchText) {
    this.setState({
      subletForm: Object.assign(this.state.subletForm, { [name]: searchText })
    })
  }

  updateForm(name, value) {
    this.setState({
      subletForm: Object.assign(this.state.subletForm, { [name]: value })
    });
  }

  render() {
    const FORM = this.state.subletForm;
    const ChARACTERS = ["近火车", "近大学", "交通方便"];
    const COMMON_DATA = ["电视", "沙发", "茶几", "餐桌", "椅子", "储物柜", "WIFI", "空调", "风扇"];
    const KITCHEN_DATA = ["煤气", "微波炉", "冰箱", "餐具", "烧水壶", "油烟机"];

    const menuItems = PAYTYPE.map((v, i) => {
      return <MenuItem key={i} value={v.type} primaryText={v.text} />;
    });
    const classMenuItems = CLASS_DATA.map((v, i) => {
      return <MenuItem key={i} value={v.type} primaryText={v.text} />;
    });
    let maxRange = MAX_RANGE.map((v, i) => {
      return <MenuItem key={i} value={v.code} primaryText={v.value} />;
    });
    maxRange.unshift(<MenuItem key="99" value={0} primaryText={0}>0</MenuItem>);

    let minRange = MIN_RANGE.map((v, i) => {
      return <MenuItem key={i} value={v.code} primaryText={v.value} />;
    });
    minRange.unshift(<MenuItem key="99" value={0} primaryText={0}>0</MenuItem>);

    const BEDROOM = this.state.roomNum === 0 || this.state.roomNum == 1 || this.state.roomNum == 2 || this.state.roomNum == 3
      || this.state.roomNum == 4 || this.state.roomNum == 5 || this.state.roomNum == 6 || this.state.roomNum == 7 || this.state.roomNum == 8
      || this.state.roomNum == 9;
    const BATHNUM = this.state.bathNum === 0 || this.state.bathNum == 1 || this.state.bathNum == 2 || this.state.bathNum == 3;
    const PARKNUM = this.state.parkNum === 0 || this.state.parkNum == 1 || this.state.parkNum == 2 || this.state.parkNum == 3;

    return (
      <div>
        <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >房子详情</p>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 col-sm-3 col-md-1" style={{ marginRight: "0.5rem", width: "100px" }}>
              <SelectField
                floatingLabelText="房间"
                value={this.state.roomNum}
                onChange={this.handleChange.bind(this, 'bedroom')}
                style={{ width: 100 }}
                maxHeight={200}
                errorText={!BEDROOM && "房间不能为空"}
              >
                {maxRange}
              </SelectField>
            </div>
            <div className="col-xs-6 col-sm-3 col-md-1" style={{ marginRight: "0.5rem", width: "100px" }}>
              <SelectField
                floatingLabelText="卫生间"
                value={this.state.bathNum}
                onChange={this.handleChange.bind(this, 'bathroom')}
                style={{ width: 100 }}
                maxHeight={200}
                errorText={!BATHNUM && "卫生间不能为空"}
              >
                {minRange}
              </SelectField>
            </div>
            <div className="col-xs-6 col-sm-3 col-md-1" style={{ marginRight: "0.5rem", width: "100px" }}>
              <SelectField
                floatingLabelText="车位"
                value={this.state.parkNum}
                onChange={this.handleChange.bind(this, 'parking')}
                style={{ width: 100 }}
                maxHeight={200}
                errorText={!PARKNUM && "车位不能为空"}
              >
                {minRange}
              </SelectField>
            </div>
            <div className="col-xs-6 col-sm-3 col-md-1" style={{ marginRight: "0.5rem", width: "100px" }}>
              <SelectField
                floatingLabelText="类型"
                value={this.state.classes}
                onChange={this.handleChange.bind(this, 'class')}
                style={{ width: 100 }}
                maxHeight={200}
              >
                {classMenuItems}
              </SelectField>
            </div>
          </div>
        </div>

        <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >特色</p>
        <div className="common-area" style={{
          display: "flex",
          flexWrap: "wrap",
        }}>
          <TagsList name="features" selected={FORM.features} tagsData={ChARACTERS} onChange={this.updateForm.bind(this, "features")} />
        </div>

        <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >公共区域</p>
        <div className="common-area" style={{
          display: "flex",
          flexWrap: "wrap",
        }}>
          <TagsList name="publicArea" selected={FORM.publicArea} tagsData={COMMON_DATA} onChange={this.updateForm.bind(this, "publicArea")} />
        </div>

        <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >厨房</p>
        <div className="kitchen" style={{
          display: "flex",
          flexWrap: "wrap",
        }}>
          <TagsList name="kitchen" selected={FORM.kitchen} tagsData={KITCHEN_DATA} onChange={this.updateForm.bind(this, "kitchen")} />
        </div>

        <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >账单</p>
        <div className="container-fluid">
          {/****-power-****/}
          <div className="row">
            <div className="col-xs-6 col-sm-4 col-md-4" style={{ marginRight: "0.5rem", width: "150px" }}>
              <SelectField
                name="type"
                floatingLabelText="电（气）/月"
                value={this.state.pType}
                onChange={this.selectChange.bind(this)}
                style={{ width: 150 }}
              >
                {menuItems}
              </SelectField>
            </div>

            <div className="col-xs-6 col-sm-4 col-md-4" style={{ marginRight: "0.5rem", width: "150px" }}>
              <TextField
                disabled={this.state.pAbled}
                name="amount"
                hintText={this.state.pHT}
                value={this.state.pTV}
                floatingLabelFixed={true}
                floatingLabelText="费用"
                style={{ width: 150 }}
                onChange={this.onChange.bind(this)}
              />
            </div>
          </div>

        </div>
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm || {}
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(HotTags);

HotTags.propTypes = {
  m_sf: PropTypes.object.isRequired
}