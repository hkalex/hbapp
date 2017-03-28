import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Projects from '/imports/db/projects';
// import logger from '/imports/loggers/logger';
import swal from 'sweetalert';

export class EditProjects extends Component {
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
        browserHistory.push('/projects/list');
      }
    }
    this.state = {
      publishValue: ''
    }
  }

  clickPublish() {
    const self = this;
    if (self.props.project.isPublished) {
      Meteor.call('projectUnpublish', self.props.project, function (error, result) {
        if (result) {
          browserHistory.push('/projects/list');
        }
        if (error) {
          swal(error.error.toString(), error.reason);
        }
      });
    } else {
      Meteor.call('projectPublish', self.props.project, function (error, result) {
        if (result) {
          browserHistory.push('/projects/list');
        }
        if (error) {
          swal(error.error.toString(), error.reason);
        }
      });
    }
  }

  getURL(doc) {
    if (doc.$set.photos) {
      for (let i = 0, len = doc.$set.photos.length; i < len; i++) {
        doc.$set.photos[i].url = '/cfs/files/images/' + doc.$set.photos[i].image;
        doc.$set.photos[i].cdnUrl = doc.$set.photos[i].cdnUrl;
      }
    }
    if (doc.$set.floorPlans) {
      for (let i = 0, len = doc.$set.floorPlans.length; i < len; i++) {
        for (let j = 0, len = doc.$set.floorPlans[i].photos.length; j < len; j++) {
          doc.$set.floorPlans[i].photos[j].url = '/cfs/files/images/' + doc.$set.floorPlans[i].photos[j].image;
          doc.$set.floorPlans[i].photos[j].cdnUrl = doc.$set.floorPlans[i].photos[j].cdnUrl;
        }
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
    if (props.project) {
      if (props.project.isPublished) {
        this.setState({ publishValue: 'Unpublish' });
      } else {
        this.setState({ publishValue: 'Publish' });
      }
    }
  }

  render() {
    if (!this.props.subReady) return <div></div>;
    return (
      <div>
        <h3>修改项目</h3>
        <QF
          collection={Projects}
          type="update"
          id="updateProject"
          doc={this.props.project}
          hooksObject={this.hooksObject}
          omitFields="photos.$.url, floorPlans.$.photos.$.url, isPublished, publishedAt, publishedBy"
        />
        <button className="btn btn-primary" onClick={this.clickPublish.bind(this)}>{this.state.publishValue}</button>
      </div>
    );
  }
}

export default createContainer((params) => {
  // const _id = Projects.ObjectID(params.routeParams.id);
  const subscribe = Meteor.subscribe('projects');

  return {
    subReady: subscribe.ready(),
    project: Projects.findOne({ "_id": Projects.ObjectID(params.routeParams.id) })
  };
}, EditProjects);