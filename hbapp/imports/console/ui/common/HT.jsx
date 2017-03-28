import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Handsontable from '/node_modules/handsontable/dist/handsontable.full';
import '/node_modules/handsontable/dist/handsontable.full.css';

export default class HT extends Component {
  /**
   * HandsonTable
   * get more informations please go to https://github.com/handsontable/handsontable
   * @memberOf HT
   */
  componentDidMount() {
    const elm = ReactDOM.findDOMNode(this);
    const container = elm.firstChild;
    const saveBtn = elm.lastChild;
    const hot = new Handsontable(container, Object.assign({}, this.props.options));
    Handsontable.Dom.addEvent(saveBtn, 'click', () => {
      this.props.handleSave(hot.getData());
    });
  }

  render() {
    return (
      <div>
        <div></div>
        <button className="btn btn-sm btn-success">保存</button>
      </div>
    );
  }
}

HT.propTypes = {
  options: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired
}