import React, { Component, PropTypes } from 'react';
import { TextField } from 'material-ui';
import { connect } from 'react-redux';

import ImagePicker from './ImagePicker';
import Sublets from '/imports/db/sublets.js';
import { updateSubletForm } from '/imports/actions/sublet/updateForm';
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';


export class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subletForm: Object.assign({}, props.m_sf, props.subletForm, { step: 2 })
    }
  }

  onChange(e) {
    this.setState(Object.assign(this.state.subletForm, { [e.target.name]: e.target.value }));
  }

  checkForm() {
    if (this.state.subletForm.title && this.state.subletForm.desc && this.state.subletForm.images) {
      this.props.dispatch(updateSubletForm(this.state.subletForm));
      Sublets.update({ _id: this.props.m_sf._id }, { $set: this.state.subletForm });
      return true;
    }
    this.props.dispatch(simpleSnackbarAction({ message: "请填写完整" }));
    return false;
  }


  imgChange(images) {
    let subletForm = this.state.subletForm;
    Object.assign(subletForm, { images });
    this.setState({ subletForm });
  }

  render() {

    return (
      <div>
        <TextField
          hintText="（例如：名都郡府）"
          floatingLabelText="标题（最多20字）"
          floatingLabelShrinkStyle={{ color: "#4388cc" }}
          maxLength="20"
          defaultValue={this.state.subletForm.title || ''}
          name="title" fullWidth={true} onChange={this.onChange.bind(this)}
        /><br />
        <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >房子详情（最多500字）</p>
        <textarea type="text"
          style={{ width: '100%', height: '100px', maxWidth: '1000px', maxHeight: '100px' }}
          defaultValue={this.state.subletForm.desc || ''}
          maxLength="500"
          name="desc" onChange={this.onChange.bind(this)} />
        <p style={{ borderBottom: "1px solid", marginTop: "1rem" }} >公共区域图片(最多可上传六张)</p>
        <ImagePicker id="subletImages" max={6}
          defaultImages={this.state.subletForm.images || []}
          onChange={this.imgChange.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm || {}
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(Description);

Description.propTypes = {
  m_sf: PropTypes.object.isRequired
}