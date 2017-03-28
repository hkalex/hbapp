import React from 'react';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Activities from '/imports/db/activities';

export default class NewActivity extends React.Component {
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
        browserHistory.push('/activities/list');
      }
    }
  }

  getURL(doc) {
    if (doc.image) {
      for (let i = 0, len = doc.image.length; i < len; i++) {
        doc.image[i].url = '/cfs/files/images/' + doc.image[i].image;
      }
    }
    return doc;
  }

  render() {
    return (
      <div>
        <h3>新增活动</h3>
        <QF
          collection={Activities}
          type="insert"
          id="insertActivity"
          hooksObject={this.hooksObject}
          omitFields="image.$.url, image.$.cdnUrl, isPublished, publishedAt, publishedBy, DN"
        />
      </div>
    );
  }
}