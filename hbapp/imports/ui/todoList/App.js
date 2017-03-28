import React,{Component} from 'react';
import { Provider } from 'react-redux';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';
import DevTools from '../../utils/DevTools';
import Store from '../../stores/store';
// import ToRegist from './ToRegist';
// import ToSkip from './ToSkip';

export default class App extends Component {

  render() {
    return (
      <Provider store={Store}>
        <div className='todo-container'>
            <DevTools />
            <AddTodo/>
            <TodoList/>
            <Footer/>
        </div>
      </Provider>
      
    );
  }
}
