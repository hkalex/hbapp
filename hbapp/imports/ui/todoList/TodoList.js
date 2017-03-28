import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import React, {Component} from 'react';
import { Counts } from 'meteor/tmeasday:publish-counts';

import {Todos} from '../../db/collection';
import changePage from '../../actions/todo/changePage';
import toggleTodo from '../../actions/todo/toggleTodo';
import Todo from './Todo';
import TodoPagination from './TodoPagination';


/**
 * First/Smart component
 * This conponent handles the date exchange with Redux Store.
 * Also the subscribe/publish with Meteor. 
 */
class TodoList extends Component {
  render() {
    const {dispatch} = this.props;
    const todos = this.props.todoList;
    const pagination = this.props.todoCount > 10 ? (
      <TodoPagination
        handlePageClick={(data)=> {return dispatch(changePage(data.selected));}}
        pageCount={this.props.todoCount / 10}
      />) : '';
    return (
      <div>
        <ul>
          {todos.map(todo =>
            <Todo
              key={todo._id}
              {...todo}
              onClick={() => dispatch(toggleTodo(todo._id))}
            />
          )}
        </ul>
        {pagination}
      </div>
    );
  }
}

const TodoContainer = createContainer(({visibilityFilter, pageSkip}) => {
  const todoSub = Meteor.subscribe('getTodos', visibilityFilter, pageSkip);
  return {
    todoSubReady: todoSub.ready(),
    todoList: Todos.find({}, {limit: 10}).fetch() || [],
    todoCount: Counts.get('TodoCount')
  };
}, TodoList);

function mapStateToProps(state) {
  return {
    visibilityFilter: state.visibilityFilter,
    pageSkip: state.pageSkip
  };
}

export default connect(mapStateToProps)(TodoContainer);
