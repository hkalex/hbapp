import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Infos from '/imports/db/infos';

import swal from 'sweetalert';

export class EditInfo extends Component {
  constructor(props) {
    super(props);
    const self = this;
    this.hooksObject = {
      before: {
        update: function (doc) {
          return self.getURL(doc);
        }
      },
      onSuccess: function () {
        browserHistory.push('/infos/list');
      }
    }
    this.state = {
      publishValue: ''
    }
  }

  getURL(doc) {
    if (doc.$set.image) {
      for (let i = 0, len = doc.$set.image.length; i < len; i++) {
        doc.$set.image[i].url = '/cfs/files/images/' + doc.$set.image[i].image;
        doc.$set.image[i].cdnUrl = doc.$set.image[i].cdnUrl;
      }
    }
    return doc;
  }

  componentWillMount() {
    this.setPublishBtnValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setPublishBtnValue(nextProps);
  }

  setPublishBtnValue(props) {
    if (props.infos) {
      if (props.infos.isPublished) {
        this.setState({ publishValue: 'Unpublish' });
      } else {
        this.setState({ publishValue: 'Publish' });
      }
    }
  }

  clickPublish() {
    const self = this;
    if (self.props.infos.isPublished) {
      Meteor.call('photoUnpublish', self.props.infos, 'infos', function (error, result) {
        if (result) {
          browserHistory.push('/infos/list');
        }
        if (error) {
          swal(error.error.toString(), error.reason);
        }
      });
    } else {
      Meteor.call('photoPublish', self.props.infos, 'infos', function (error, result) {
        if (result) {
          browserHistory.push('/infos/list');
        }
        if (error) {
          swal(error.error.toString(), error.reason);
        }
      });
    }
  }

  render() {
    if (!this.props.subReady) return <div></div>;
    return (
      <div>
        <h3>修改资讯</h3>
        <QF
          collection={Infos}
          type="update"
          id="updateInfo"
          doc={this.props.infos}
          hooksObject={this.hooksObject}
          omitFields="image.$.url, isPublished, publishedAt, publishedBy, DN"
          />
        <button className="btn btn-primary" onClick={this.clickPublish.bind(this)}>{this.state.publishValue}</button>
      </div>
    );
  }
}

export default createContainer((params) => {
  const subscribe = Meteor.subscribe('infos');
  return {
    subReady: subscribe.ready(),
    infos: Infos.findOne({ "_id": Infos.ObjectID(params.routeParams.id) })
  };
}, EditInfo);