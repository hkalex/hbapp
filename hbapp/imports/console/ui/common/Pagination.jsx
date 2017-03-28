import React from 'react';
import ReactPaginate from 'react-paginate';

export default class Pagination extends React.Component {
  render() {
    return (
      <div className="react-paginate">
        <ReactPaginate previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.props.pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={4}
          onPageChange={this.props.onPageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>
    )
  }
}