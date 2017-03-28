import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { AutoForm } from 'meteor/aldeed:autoform';
import { Spacebars } from 'meteor/spacebars';
import _ from 'lodash';

// import logger from '../../loggers/logger';

import CollectionBase from '/imports/db/CollectionBase';

//import './afTemplate.html';

/*
// This is the Template Render function!!!
// Refer to: http://blazejs.org/api/blaze.html#Blaze-Template

<template name="afTemplate">
  {{#autoForm collection=getAFCollection id=getAFId type=getAFType doc=getDoc fields=getFields omitFields=getOmitFields }}
    {{#each afFieldNames}}
      {{> afQuickField name=this.name options=(getTypeOptions this.name) }}
    {{/each}}
  {{/autoForm}}
</template>
*/

Template["afTemplate"] = new Template("Template.afTemplate", (function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      collection: Spacebars.call(view.lookup("getAFCollection")),
      id: Spacebars.call(view.lookup("getAFId")),
      type: Spacebars.call(view.lookup("getAFType")),
      doc: Spacebars.call(view.lookup("getDoc")),
      fields: Spacebars.call(view.lookup("getFields")),
      omitFields: Spacebars.call(view.lookup("getOmitFields"))
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {
      return [ Blaze.Each(function() {
          return Spacebars.call(view.lookup("afFieldNames"));
        }, function() {
          return [Blaze._TemplateWith(function() {
            return {
              name: Spacebars.call(Spacebars.dot(view.lookup("."), "name")),
              options: Spacebars.call(Spacebars.dataMustache(view.lookup("getTypeOptions"), Spacebars.dot(view.lookup("."), "name")))
            };
          }, function() {
            return Spacebars.include(view.lookupTemplate("afQuickField"));
          })];
        }) // end Blaze.Each
      ];
    }); // end autoForm
  });
}));   


function getDefaultMapper(relationship) {
  let valueField = relationship.parent.field;
  let labelField = relationship.parent.autoform ? relationship.parent.autoform.label : relationship.parent.field; 
  return function(ele, index) {
    return {
      label: ele[labelField] && ele[labelField].hasOwnProperty("_str") ? ele[labelField]._str : ele[labelField],
      value: ele[valueField] && ele[valueField].hasOwnProperty("_str") ? ele[valueField]._str : ele[valueField]
    }
  };
}


Template.afTemplate.helpers({
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
  },
  getTypeOptions: function(fieldName) {
    let options = Template.instance().props.options;
    let schema = Template.instance().props.schema;

    if (options && options[fieldName]) {
      if (options[fieldName] instanceof Mongo.Cursor) {
        let relationships = schema.getRelationships();
        let mapper = null;
        if (relationships) {
          let autoForm = relationships[fieldName].parent.autoform;
          mapper = autoForm.mapper
        }
        if (mapper) {
          return options[fieldName].fatch().map(mapper);
        } else {
          // construct default mapper
          mapper = getDefaultMapper(relationships[fieldName]);
          return options[fieldName].fetch().map(mapper);
        }
      } else {
        var option = options[fieldName];
        if (option && option.hasOwnProperty('fetch')) {
          return option.fetch();
        } else {
          let collection = options[fieldName].collection;
          let getter = options[fieldName].getter;
          let mapper = options[fieldName].mapper;

          let data = [];
          if (getter) {
            collection.fetch().forEach(function(ele, index) {
              getter(ele, data);
            });
          } else {
            data = collection.fetch();
          }

          if (mapper) {
            return data.map(mapper);
          } else {
            return data;
          }
        }
      }
    }
    return null;

  }
});

/**
 * @description QuickForm class <AF collection={CollectionBase} id={formNameInString} type={"insert"|"update"} doc={Object} />
 * @export
 * @class AF
 * @extends {Component}
 * @example https://github.com/aldeed/meteor-autoform
 */
export default class AF extends Component {
  componentWillMount() {
    let reactProps = this.props;
    Template.afTemplate.onCreated(function () {
      this.props = reactProps;
    });
    if (this.props.hooksObject) {
      AutoForm.addHooks(this.props.id, this.props.hooksObject);
    }
  }
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    /* eslint-disable react/no-find-dom-node */
    this.view = Blaze.render(Template.afTemplate, ReactDOM.findDOMNode(this.refs.afContainer));
    /* eslint-enable react/no-find-dom-node */
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="afContainer" />;
  }
}

AF.propTypes = {
  collection: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['insert', 'update']).isRequired,
  doc: PropTypes.object,
  hooksObject: PropTypes.object,
  schema: PropTypes.object,
  options: PropTypes.object,
  subReady: PropTypes.bool
};
