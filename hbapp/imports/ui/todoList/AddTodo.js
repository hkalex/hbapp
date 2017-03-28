import React, {Component} from 'react';
import { connect } from 'react-redux';

// Actions
import addTodo from '../../actions/todo/addTodo';

class AddTodo extends Component {

  addButtonOnClick() {
    this.props.dispatch(addTodo(this.refs.inputText.value));
    this.refs.inputText.value = '';
  }
  render() {
    return (
      <div>
        <input ref="inputText"/>
        <button onClick={this.addButtonOnClick.bind(this)}>
          Add Todo
        </button>
      </div>
    );
  }
}

export default connect()(AddTodo);
