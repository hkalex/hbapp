import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import QF from '/imports/ui/common/QF';
import Languages from '/imports/db/languages';

export class EditLang extends Component {
  constructor(props) {
    super(props);
    this.hooksObject = {
      onSuccess: function () {
        browserHistory.push('/settings/langs/list');
      }
    }
  }

  render() {
    if (!this.props.subReady) return <div></div>;
    return (
      <div>
        <h3>修改语言</h3>
        <QF
          collection={Languages}
          type="update"
          id="updateLang"
          doc={this.props.lang}
          hooksObject={this.hooksObject}
          />
      </div>
    );
  }
}

export default createContainer((props) => {
  const subscribe = Meteor.subscribe('languages');
  return {
    subReady: subscribe.ready(),
    lang: Languages.findOne({ "_id": Languages.ObjectID(props.routeParams.id) })
  };
}, EditLang);