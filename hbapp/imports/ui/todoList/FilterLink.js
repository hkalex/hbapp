import React,{Component} from 'react';
// import Link from './Link';
import setVisibilityFilter from '../../actions/todo/setVisibility';
import changePage from '../../actions/todo/changePage';

/**
 * This class is problematic. 
 * if i use a constructor, when props change, 'this.previousPropsContent' won't change
 * so i have to use this.props.xxx instead. So i can change correctly. 
 * i also deleted the Link below, because i see it as unnecessary. 
 */

export default class FilterLink extends Component {
  // constructor({ dispatch, filter, visibilityFilter, children }){
  //   super();
  //   this.dispatch = dispatch;
  //   this.filter = filter;
  //   this.visibilityFilter = visibilityFilter;
  //   this.children = children;
  // }

  setFilter() {
    this.props.dispatch(setVisibilityFilter(this.props.filter));
    this.props.dispatch(changePage(0));
  }

  render(){
    if(this.props.visibilityFilter === this.props.filter){
      return <span>{this.props.children}</span>;
    } 

    return <a href='#'
              onClick={(e) => {
                e.preventDefault();
                this.setFilter();
              }}
            >
            {this.props.children}
          </a>
    


    // return (
    //   <Link active={visibilityFilter === filter} onClick={()=> {return setFilter()}}>
    //     {children}
    //   </Link>
    // );
  }
}

// if (active) {
//     return <span>{children}</span>;
//   }

//   return (
//     <a href='#'
//        onClick={function(e) {
//          e.preventDefault();
//          onClick();
//        }}
//     >
//       {children}
//     </a>
//   );