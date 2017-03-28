import React from 'react';
import { Route } from 'react-router';


// Testing website
import AppRoot from '../ui/AppRoot';
import TodoList from '../ui/todoList/App';
import User from '../ui/user/User.jsx';
import UserNew from '../ui/user/UserNew';
import QFTest from '/imports/ui/testPages/QFTest';
import RTE from '/imports/ui/testPages/RichTextEditorTest';

const TestRoutes = (
  <Route path="test" component={AppRoot}>
    <Route path="todo" component={TodoList}/>
    <Route path="user" component={User} />
    <Route path="new_user" component={UserNew} />
    <Route path="qftest" component={QFTest} />
    <Route path="rte" component={RTE} />
  </Route>
);

export default TestRoutes;