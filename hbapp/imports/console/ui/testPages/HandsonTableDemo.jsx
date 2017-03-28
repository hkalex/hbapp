import React, { Component } from 'react';
import HT from '../common/HT';

export default class HandsonTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        data: [
          ['', 'Kia', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
          ['2012', 10, 11, 12, 13, 15, 16],
          ['2013', 10, 11, 12, 13, 15, 16],
          ['2014', 10, 11, 12, 13, 15, 16],
          ['2015', 10, 11, 12, 13, 15, 16],
          ['2016', 10, 11, 12, 13, 15, 16]
        ],
        rowHeaders: true,
        colHeaders: true
      }
    }
  }

  handleSave(data) {
    console.log(data);
  }

  render() {
    return (
      <HT options={this.state.options} handleSave={this.handleSave.bind(this)} />
    );
  }
}