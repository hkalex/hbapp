import React, { Component } from 'react';
import { FlatButton, AutoComplete } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { Collapse, Well } from 'react-bootstrap';
import { connect } from 'react-redux';

// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';
import { SUBLET_PRICE_RANGE } from '/imports/consts/Constants';
import { querySubletList } from '/imports/actions/sublet/queryList';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.page = new Styler(JsonStyle);
    this.state = {
      collapseOpen: false,
      collapseType: 'price',
      searchText: '',
      suburbs: [],
      query: {}
    }
    this.handleTimeOut = null;
  }

  /**
   * open the dropdown collapse
   */
  openCollapse(type) {
    if (type === this.state.collapseType) {
      this.setState({
        collapseOpen: !this.state.collapseOpen
      });
    } else {
      this.setState({
        collapseType: type,
        collapseOpen: true
      });
    }
  }

  /**
   * AutoComplete onchange
   */
  handleUpdateInput(searchText) {
    this.setState({ searchText });
    if (this.handleTimeOut != null) {
      clearTimeout(this.handleTimeOut);
      this.handleTimeOut = null;
    }

    this.handleTimeOut = setTimeout(() => {
      Meteor.call('getSuburb', searchText, (error, result) => {
        this.setState({ suburbs: result });
      });
    }, 500);
  }

  /**
   * AutoComplete selected a item
   */
  handleNewRequest(chosenRequest, index) {
    const query = Object.assign({}, this.state.query, { suburb: chosenRequest.suburb });
    if (chosenRequest.suburb) {
      this.setState({ query });
    }
    this.props.dispatch(querySubletList(query));
  }

  setQueryParams(type, value) {
    const query = Object.assign({}, this.state.query, { price: value });
    if (type === 'price') {
      this.setState({ query, collapseOpen: !this.state.collapseOpen });
    }
    this.props.dispatch(querySubletList(query));
  }

  onClear() {
    console.log(1)
  }

  render() {
    const dataSourceConfig = {
      text: 'suburb',
      value: 'suburb',
    };
    let content, options;
    if (this.state.collapseType === 'price') {
      options = SUBLET_PRICE_RANGE.map((v, i) => {
        return (
          <MenuItem key={i} primaryText={v.range} onTouchTap={this.setQueryParams.bind(this, 'price', v)} />
        )
      });
      content =
        <Well>
          <div className="project-search-options" {...this.page.style("project-search-options") }>
            {options}
          </div>
        </Well>;
    };


    return (
      <div className="project-search-container" >

        <FlatButton className="project-search-flatbutton"
          onClick={this.openCollapse.bind(this, 'price')}
          style={{
            height: "50px",
            width: "50%",
            borderRight: "1px solid rgb(227,227,227)"
          }} >
          价格
        </FlatButton>
        <FlatButton icon={<i className="icon-close" style={{ fontSize: "18px" }} onClick={this.onClear.bind(this)} />} >
          <AutoComplete
            hintText="地区"
            filter={AutoComplete.noFilter}
            name="suburb"
            openOnFocus={true}
            onFocus={() => {
              this.setState({ collapseOpen: false })
            }}
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput.bind(this)}
            onNewRequest={this.handleNewRequest.bind(this)}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.suburbs}
            menuStyle={{ width: "100%", bottom: "17px" }}
            textFieldStyle={{ width: "100%", paddingBottom: "18px", lineHeight: "35px", left: "3px", bottom: "0px" }}
            style={{ width: "90%" }}
          />
        </FlatButton >

        <Collapse className="project-search-collapse"
          {...this.page.style("project-search-collapse") }
          in={this.state.collapseOpen}
          transitionAppear={false} >
          {content}
        </Collapse>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filter: state.subletList.filter
  };
}

export default connect(mapStateToProps)(SearchBar);