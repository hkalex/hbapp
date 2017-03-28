import React,{Component} from 'react';
import { connect } from 'react-redux';
import FilterLink from './FilterLink';

class Footer extends Component {
  constructor(props){
    super();
    this.props = props;
  }

  render(){
    return (
      <p>
        Show:
        {' '}
        <FilterLink filter='SHOW_ALL' {...this.props}>
          All
        </FilterLink>
        {', '}
        <FilterLink filter='SHOW_ACTIVE' {...this.props}>
          Active
        </FilterLink>
        {', '}
        <FilterLink filter='SHOW_COMPLETED' {...this.props}>
          Completed
        </FilterLink>
      </p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    visibilityFilter: state.visibilityFilter
  }
};

export default connect(mapStateToProps)(Footer);
