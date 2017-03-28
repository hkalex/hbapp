import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Projects from '/imports/db/projects';

export default class NewProject extends Component {
  constructor(props) {
    super(props);
    const self = this;
    this.hooksObject = {
      before: {
        insert: function (doc) {
          return self.getURL(doc);
        }
      },
      onSuccess: function () {
        browserHistory.push('/projects/list');
      }
    }
  }

  getURL(doc) {
    if (doc.photos) {
      for (let i = 0, len = doc.photos.length; i < len; i++) {
        doc.photos[i].url = '/cfs/files/images/' + doc.photos[i].image;
      }
    }
    if (doc.floorPlans) {
      for (let i = 0, len = doc.floorPlans.length; i < len; i++) {
        for (let j = 0, len = doc.floorPlans[i].photos.length; j < len; j++) {
          doc.floorPlans[i].photos[j].url = '/cfs/files/images/' + doc.floorPlans[i].photos[j].image;
        }
      }
    }
    return doc;
  }

  render() {
    return (
      <div>
        <h3>新增项目</h3>
        <QF
          collection={Projects}
          type="insert"
          id="insertProject"
          hooksObject={this.hooksObject}
          omitFields="photos.$.url, photos.$.cdnUrl, floorPlans.$.photos.$.url, floorPlans.$.photos.$.cdnUrl, isPublished, publishedAt, publishedBy"
        />
      </div>
    );
  }
}