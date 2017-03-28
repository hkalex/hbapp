import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Pagination from '/imports/console/ui/common/Pagination';
import ProjectsItem from './ProjectsItem';
import Projects from '/imports/db/projects';
import TableList from '/imports/console/ui/common/TableList';

export class ProjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    }
    this.perPage = 4;
  }

  componentWillMount() {
    this.setState({
      listData: this.props.projects.slice(0, this.perPage)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listData: nextProps.projects.slice(0, this.perPage)
    });
  }

  handlePageClick(data) {
    let startIndex = data.selected * this.perPage;
    this.setState({
      listData: this.props.projects.slice(startIndex, startIndex + this.perPage)
    });
  }

  renderTbody() {
    return this.state.listData.map((item) => {
      return <ProjectsItem key={item._id} item={item} />;
    });
  }

  render() {
    return (
      <div>
        <h3>项目清单</h3>
        <TableList header="Projects List"
          thead={['Action', 'Image', 'Title', 'Address', 'Price', 'Status', 'Published']}
          renderTbody={this.renderTbody.bind(this)} />
        <Pagination pageCount={Math.ceil(this.props.projects.length / this.perPage)}
          onPageChange={this.handlePageClick.bind(this)} />
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('projects');
  return {
    projects: Projects.find().fetch()
  };
}, ProjectsList);