import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';

export default class TodoPagination extends Component {

  constructor({handlePageClick, pageCount}){
    super();
    this.handlePageClick = handlePageClick;
    this.pageCount= pageCount;
  }

  render(){
    return (
      <div className="paginate">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<li className="break"><a href="">...</a></li>}
          pageNum={this.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          clickCallback={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
