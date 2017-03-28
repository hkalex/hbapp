import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatButton, IconButton } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { queryFilterAction } from '../../actions/project/queryListActions';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Collapse, Well } from 'react-bootstrap';
import { PRICE_RANGE } from '../../consts/Constants';

import getQueryParameter from '/imports/utils/getQueryParameter';
// style json
import JsonStyle from './project.json';
import Styler from '/imports/utils/Styler.js';


class ProjectSearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rental: null,
			location: null,
			price: null,
			classes: null,
			collapseOpen: false,
			collapseType: 'price',
			selectableListValue: 'ALL'
		},
			this.page = new Styler(JsonStyle);
	}

	componentWillMount() {

		// if comes in with a query param
		const classParam = getQueryParameter('classes');
		const title = getQueryParameter('title');
		const filter = {
			location: { city: 'ALL', country: 'ALL', title: '不限' },
			price: { fromPrice: '-1', toPrice: '0', range: '不限' },
			classes: classParam ? { code: classParam, title } : { code: 'ALL', title: '不限' }
		};

		if (classParam) {
			this.setState({
				classes: { code: classParam, title }
			});
			this.props.dispatch(queryFilterAction(filter));
		} else {
			// if enters project page, auto search to ALL
			this.props.dispatch(queryFilterAction(filter));
		}
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
		this.props.dispatch(queryFilterAction(Object.assign({}, {
			location: newState.location ? newState.location : this.state.location,
			price: newState.price ? newState.price : this.state.price,
			classes: newState.classes ? newState.classes : this.state.classes,
		})));
	}

	testSetQuery(e) {
		let showRental = e.target.innerHTML;
		this.setState({
			rental: showRental,
			collapseOpen: false
		})
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
		const classLists = this.props.lists['Project.Class'] ? this.props.lists['Project.Class'].detail : [];

		const rental = this.state.rental ? <div className="project-search-current" {...this.page.style("project-search-current") }>{this.state.rental}</div> : "友家";
		const location = this.state.location ? <div className="project-search-current" {...this.page.style("project-search-current") }>{this.state.location.title}</div> : "地区";
		const price = this.state.price ? <div className="project-search-current" {...this.page.style("project-search-current") }>{this.state.price.range}</div> : "价格";
		const classes = this.state.classes ? <div className="project-search-current" {...this.page.style("project-search-current") }>{this.state.classes.title}</div> : "类别";

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
					<div className="project-search-well" {...this.page.style("project-search-well") }>
						<SelectableList
							defaultValue={this.state.selectableListValue} >
							<ListItem
								value={'all'}
								primaryText="不限"
								onTouchTap={() => { this.setState({ selectableListValue: 'ALL' }) }}
							/>
							{countries}
						</SelectableList>
						<List className="" style={{ flex: 2, overflowY: 'scroll' }} >
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
					<div className="project-search-options" {...this.page.style("project-search-options") }>
						{options}
					</div>
				</Well>;
		}

		if (this.state.collapseType === 'classes' && classLists.length != 0) {
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
					<div className="project-search-options" {...this.page.style("project-search-options") }>
						{options}
					</div>
				</Well>;
		}


		if (this.state.collapseType === 'rental') {

			content =
				<Well>
					<div className="project-search-options" {...this.page.style("project-search-options") }>
						<MenuItem value="友家" primaryText="友家" onTouchTap={this.testSetQuery.bind(this)} />
						<MenuItem value="整租" primaryText="整租" onTouchTap={this.testSetQuery.bind(this)} />
						<MenuItem value="整租一居" primaryText="整租一居" onTouchTap={this.testSetQuery.bind(this)} />
						<MenuItem value="整租两居" primaryText="整租两居" onTouchTap={this.testSetQuery.bind(this)} />
						<MenuItem value="整租三居" primaryText="整租三居" onTouchTap={this.testSetQuery.bind(this)} />
					</div>
				</Well>;
		}

		return (
			<div className="project-search-container" >
				<FlatButton className="project-search-flatbutton"
					{...this.page.style("project-search-flatbutton", "project-search-fbmiddle") }
					onClick={this.openCollapse.bind(this, 'rental')}>
					{rental}
				</FlatButton>
				<FlatButton className="project-search-flatbutton"
					{...this.page.style("project-search-flatbutton", "project-search-fbmiddle") }
					onClick={this.openCollapse.bind(this, 'location')}>
					{location}
				</FlatButton>
				<FlatButton className="project-search-flatbutton project-search-fbmiddle"
					{...this.page.style("project-search-flatbutton", "project-search-fbmiddle") }
					onClick={this.openCollapse.bind(this, 'price')}>
					{price}
				</FlatButton>
				{/**	<FlatButton className="project-search-flatbutton"
					{...this.page.style("project-search-flatbutton") }
					onClick={this.openCollapse.bind(this, 'classes')}>
					{classes}
				</FlatButton>*/}
				<IconButton iconClassName="fa fa-sort" style={{ width: "12.5%" }} />
				<IconButton iconClassName="fa fa-ellipsis-h" style={{ width: "12.5%" }} />
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
		filter: state.projectList.filter
	};
}

export default connect(mapStateToProps)(ProjectSearchBar);


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
				<ComposedComponent className="project-search-composed"
					{...this.page.style("project-search-composed") }
					value={this.state.selectedValue}
					onChange={this.handleRequestChange.bind(this)} >
					{this.props.children}
				</ComposedComponent>
			);
		}
	};
}

SelectableList = wrapState(SelectableList);
