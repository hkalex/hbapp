import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { MenuItem } from 'material-ui/Menu';
import { queryFilterAction } from '../../actions/project/queryOffPlanListActions';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Collapse, Well } from 'react-bootstrap';
import { PRICE_RANGE } from '../../consts/Constants';

import getQueryParameter from '/imports/utils/getQueryParameter';

// style json
import JsonStyle from './offPlan.json';
import Styler from '/imports/utils/Styler.js';

class OpApvedSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      price: null,
      // classes: null,
      collapseOpen: false,
      collapseType: 'price',
      selectableListValue: 'ALL'
    };
    this.page = new Styler(JsonStyle);
  }

  componentWillMount() {

    // if comes in with a query param
    const title = getQueryParameter('title');
    const filter = {
      location: { city: 'ALL', country: 'ALL', title: '不限' },
      price: { fromPrice: '-1', toPrice: '0', range: '不限' }
    };
    // if enters project page, auto search to ALL
    this.props.dispatch(queryFilterAction(filter));
  }

  setQuery(state, value) {
    let newState = {};
    if (state === 'location') {
      newState[state] = {
        country: value.countryCode,
        city: value.cityCode,
        title: value.title
      };
    } else {
      newState[state] = value;
    }
    newState['collapseOpen'] = false;

    this.setState(newState);
    // console.log("-------------",this.state);
    this.props.dispatch(queryFilterAction(Object.assign({}, {
      location: newState.location ? newState.location : this.state.location,
      price: newState.price ? newState.price : this.state.price
    })));
  }

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

  render() {
    // console.log(this.props)

    const countryLists = this.props.lists['Country'] ? this.props.lists['Country'].detail : [];
    // const classLists = this.props.lists['Project.Class'] ? this.props.lists['Project.Class'].detail : [];

    const location = this.state.location ? <div className="offplan-search-current" {...this.page.style("offplan-search-current") }>{this.state.location.title}</div> : "地区";
    const price = this.state.price ? <div className="offplan-search-current" {...this.page.style("offplan-search-current") }>{this.state.price.range}</div> : "价格";
    // const classes = this.state.classes ? <div style={{ color: 'red' }}>{this.state.classes.title}</div> : "类别";
    // moreStyle = this.state.more ? this.style = { borderColor: "red" } : this.style = { borderColor: "" },
    // divStyle = { width: "100px", display: "inline-block" };

    // Use list data to create a location selectable list.
    let content, options;
    if (this.state.collapseType === 'location' && countryLists.length != 0) {

      let countries, cities, templist = {}, tempCity;
      countries = countryLists.map((v, i) => {
        if (v.items) {
          templist[v.code] = v.items.map((val, index) => {
            return (
              <ListItem
                key={index}
                primaryText={val.title}
                onTouchTap={this.setQuery.bind(this, 'location', { countryCode: v.code, cityCode: val.code, title: val.title })}
              />
            );
          });
        } else {

          templist[v.code] = [];
        }
        tempCity =
          <ListItem
            key={999}
            primaryText="全国"
            onTouchTap={this.setQuery.bind(this, "location", { countryCode: v.code, cityCode: "ALL", title: v.title })}
          />;
        templist[v.code].unshift(tempCity);

        return (
          <ListItem
            key={i}
            value={v.code}
            primaryText={v.title}
            onTouchTap={() => { this.setState({ selectableListValue: v.code }) }}
          />
        );
      });

      tempCity =
        <ListItem
          key={1}
          primaryText="不限"
          onTouchTap={this.setQuery.bind(this, "location", { countryCode: 'ALL', cityCode: 'ALL', title: '不限' })}
        />;
      templist['ALL'] = [tempCity];
      cities = templist[this.state.selectableListValue];

      content =
        <div className="well">
          <div className="offplan-search-well" {...this.page.style("offplan-search-well") }>
            <SelectableList
              defaultValue={this.state.selectableListValue}
            >
              <ListItem
                value={'all'}
                primaryText="不限"
                onTouchTap={() => { this.setState({ selectableListValue: 'ALL' }) }}
              />
              {countries}
            </SelectableList>
            <List className="offplan-search-list" {...this.page.style("offplan-search-list") }>
              {cities}
            </List>
          </div>
        </div>;
    }


    if (this.state.collapseType === 'price') {
      options = PRICE_RANGE.map((v, i) => {
        return (
          <MenuItem key={i} primaryText={v.range} onTouchTap={this.setQuery.bind(this, "price", v)} />
        )
      });
      content =
        <Well>
          <div className="offplan-search-content" {...this.page.style("offplan-search-content") }>
            {options}
          </div>
        </Well>;
    }

    /*if (this.state.collapseType === 'classes' && classLists.length != 0) {
      options = classLists.map((v, i) => {
        return (
          <MenuItem key={i} primaryText={v.title} onTouchTap={this.setQuery.bind(this, "classes", v)} />
        )
      });
      options.unshift(
        <MenuItem key={999}
          primaryText="不限"
          onTouchTap={this.setQuery.bind(this, "classes", { code: 'ALL', title: '不限' })} />
      );
      content =
        <Well>
          <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            {options}
          </div>
        </Well>;
    }*/

    return (
      <div className="offplan-search-container" {...this.page.style("offplan-search-container") }>
        <FlatButton className="offplan-search-location"
          {...this.page.style("offplan-search-location") }
          onClick={this.openCollapse.bind(this, 'location')}>
          {location}
        </FlatButton>
        <FlatButton className="offplan-search-price"
          {...this.page.style("offplan-search-price") }
          onClick={this.openCollapse.bind(this, 'price')}>
          {price}
        </FlatButton>
        {/*<FlatButton
          style={{ flex: '1', height: '50px' }}
          onClick={this.openCollapse.bind(this, 'classes')}>
          {classes}
        </FlatButton>*/}

        <Collapse className="offplan-search-collapse"
          {...this.page.style("offplan-search-collapse") }
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
    filter: state.projectList.filter
  };
}

export default connect(mapStateToProps)(OpApvedSearchBar);


// Wrapping a List to a higher component, so it becomes selectable.
let SelectableList = makeSelectable(List);
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {

    constructor(props) {
      super(props);
      this.page = new Styler(JsonStyle);
    }

    componentWillMount() {
      this.setState({
        selectedValue: this.props.defaultValue,
      });
    }

    handleRequestChange(event, value) {
      this.setState({
        selectedValue: value,
      });
    }

    render() {
      return (
        <ComposedComponent className="offplan-search-composed"
          value={this.state.selectedValue}
          onChange={this.handleRequestChange.bind(this)}
          {...this.page.style("offplan-search-composed") } >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);
