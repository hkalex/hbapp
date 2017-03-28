import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor'
import { AutoComplete } from 'material-ui';
import { connect } from 'react-redux';
import { HTTP } from 'meteor/http';

import Sublets from '/imports/db/sublets';
// actions
import { updateSubletForm } from '/imports/actions/sublet/updateForm';
import { simpleSnackbarAction } from '/imports/actions/utils/snackbarAction';


class Address extends Component {
  constructor(props) {
    super(props);
    const subletForm = Object.assign({}, props.m_sf, props.subletForm);
    this.state = {
      subletForm: subletForm || {},
      predictions: [],
      searchText: subletForm.address
    }
    this.handleTimeOut = null;
  }

  handleUpdateInput(searchText) {
    this.setState({ searchText });
    this.setState({ subletForm: { address: searchText } });
    if (this.handleTimeOut != null) {
      clearTimeout(this.handleTimeOut);
      this.handleTimeOut = null;
    }
    this.handleTimeOut = setTimeout(() => {
      Meteor.call('getPlaces', searchText, (error, result) => {
        var content = JSON.parse(result.content);
        if (content && content.status === "OK") {
          this.setState({
            predictions: content.predictions
          });
        }
      });
    }, 500);
  }

  handleNewRequest(chosenRequest, index) {
    if (chosenRequest.terms) {
      const addressDetail = {
        location: {}
      };
      let url = '';
      if (Meteor.settings.public.GOOGLE_MAP_REGION === 'cn') {
        url = encodeURI(`https://maps.google.cn/maps/api/geocode/json?address=${this.state.searchText}&key=${Meteor.settings.public.GOOGLE_MAP_KEY}`);
      } else {
        url = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.searchText}&key=${Meteor.settings.public.GOOGLE_MAP_KEY}`);
      }
      HTTP.get(url, (error, result) => {
        if (!error) {
          const content = JSON.parse(result.content);
          if (content.status === 'OK') {
            const location = content.results[0].geometry.location;
            addressDetail.location = location;
            addressDetail.street = chosenRequest.terms[0].value;
            addressDetail.suburb = chosenRequest.terms[1].value;
            addressDetail.state = chosenRequest.terms[2].value;
            addressDetail.country = chosenRequest.terms[3].value;
            this.setState({ subletForm: Object.assign({}, this.state.subletForm, { addressDetail }) });
          }
        }
      });
    }
  }

  checkForm() {
    if (this.state.subletForm.address) {
      this.props.dispatch(updateSubletForm(this.state.subletForm));
      Sublets.update({ _id: this.props.m_sf._id }, { $set: this.state.subletForm });
      return true;
    }
    this.props.dispatch(simpleSnackbarAction({ message: "请填写完整" }));
    return false;
  }

  render() {
    const dataSourceConfig = {
      text: 'description',
      value: 'description',
    };
    const ErrorText = this.state.searchText ? "" : "地址不能为空";

    return (
      <div>
        <AutoComplete
          floatingLabelText="地址"
          floatingLabelShrinkStyle={{ color: "#4388cc" }}
          filter={AutoComplete.noFilter}
          name="address" fullWidth={true}
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput.bind(this)}
          onNewRequest={this.handleNewRequest.bind(this)}
          dataSource={this.state.predictions}
          dataSourceConfig={dataSourceConfig}
          errorText={ErrorText}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm || {}
  };
}

export default connect(mapStateToProps, null, null, { withRef: true })(Address);

Address.propTypes = {
  m_sf: PropTypes.object.isRequired
}