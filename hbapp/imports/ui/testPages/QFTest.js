import React, {Component} from 'react';
import QF from '../common/QF';

import projects from '../../db/projects';

export default class QFTest extends Component {
  componentWillMount() {
    this.doc = {title:"ABC"};
    this.type = "insert";
  }

  render() {
    return (
      <div>
        <QF collection={projects} type={this.type} id="insertProject" doc={this.doc} />
      </div>
    );
  }
}