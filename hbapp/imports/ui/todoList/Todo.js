import React, {Component} from 'react';

export default class Todo extends Component {
  constructor({ onClick, completed, text}){
    super();
    this.onClick = onClick;
    this.completed = completed;
    this.text = text;
  }

  render(){
    return (
      <li
        onClick={this.onClick}
        style={{ textDecoration: this.completed ? 'line-through' : 'none' }}
        >
        {this.text}
      </li>
    );
  }
}