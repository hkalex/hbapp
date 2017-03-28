import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AutoForm } from 'meteor/aldeed:autoform';
// import logger from '../../loggers/logger';

import CollectionBase from '../../db/CollectionBase';

import './qfTemplate.html';

Template.qfTemplate.helpers({
  getAFCollection: () => {
    let collection = Template.instance().props.collection;
    if (collection instanceof CollectionBase || collection instanceof Mongo.Collection) {
      return collection;
    } else {
      return Meteor.allCollection[collection];
    }
  },
  getAFId: () => {
    return Template.instance().props.id;
  },
  getAFType: () => {
    return Template.instance().props.type;
  },
  getDoc: () => {
    return Template.instance().props.doc;
  },
  getFields: () => {
    return Template.instance().props.fields;
  },
  getOmitFields: () => {
    return Template.instance().props.omitFields;
  }
});

/**
 * @description QuickForm class <QF collection={CollectionBase} id={formNameInString} type={"insert"|"update"} doc={Object} />
 * @export
 * @class QF
 * @extends {Component}
 * @example https://github.com/aldeed/meteor-autoform
 */
export default class QF extends Component {
  componentWillMount() {
    let reactProps = this.props;
    Template.qfTemplate.onCreated(function () {
      this.props = reactProps;
    });
    if (this.props.hooksObject) {
      AutoForm.addHooks(this.props.id, this.props.hooksObject);
    }
  }
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    /* eslint-disable react/no-find-dom-node */
    let view = Blaze.render(Template.qfTemplate, ReactDOM.findDOMNode(this.refs.qfContainer));
    this.view = view;
    /* eslint-enable react/no-find-dom-node */
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="qfContainer" />;
  }
}

QF.propTypes = {
  collection: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['insert', 'update']).isRequired,
  doc: PropTypes.object,
  hooksObject: PropTypes.object,
};
