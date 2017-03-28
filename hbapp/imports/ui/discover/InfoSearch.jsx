import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Menu, MenuItem } from 'material-ui/Menu';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { Collapse, Well } from 'react-bootstrap';
import { INFO_LOCATION, INFO_CLASSES } from '../../consts/Constants';

import getQueryParameter from '/imports/utils/getQueryParameter';

// actions
import { queryInfoAction } from '/imports/actions/discover/infoActions';

// style json
import JsonStyle from './discover.json';
import Styler from '/imports/utils/Styler.js';

class InfoSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: props.infoList.filter.location,
			classes: props.infoList.filter.classes,
			collapseOpen: false,
			collapseType: 'classes',
		};
		this.page = new Styler(JsonStyle);
	}

	openCollapse(type) {
		if (type == this.state.collapseType) {
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


	componentWillReceiveProps(nextProps) {
		this.setState({
			location: nextProps.infoList.filter.location,
			classes: nextProps.infoList.filter.classes
		})
	}


	setQuery(state, value) {
		// console.log(value);
		let newState = {};
		newState[state] = value;
		newState['collapseOpen'] = false;
		this.setState(newState);
		this.props.dispatch(queryInfoAction(Object.assign({}, {
			location: newState.location ? newState.location : this.state.location,
			classes: newState.classes ? newState.classes : this.state.classes,
		}, newState)));
	}

	render() {
		// console.log(this.props)

		const location = this.state.location.text == "不限" ? "地区" : (<div className="info-search-current" {...this.page.style("info-search-current") } >{this.state.location.text}</div>);
		const classes = this.state.classes.title == "不限" ? "类别" : (<div className="info-search-current" {...this.page.style("info-search-current") } >{this.state.classes.title}</div>);

		const INFO_TYPE = this.props.lists["Info.Type"]["detail"];

		// Use list data to create a location selectable list.
		let content, options;

		if (this.state.collapseType === 'location') {
			options = INFO_LOCATION.map((v, i) => {
				return (
					<MenuItem key={i} primaryText={v.text} onTouchTap={this.setQuery.bind(this, "location", v)} />
				)
			});
			content =
				<Well>
					<div className="info-search-well" {...this.page.style("info-search-well") }>
						{options}
					</div>
				</Well>;
		}

		if (this.state.collapseType === 'classes') {
			options = INFO_TYPE.map((v, i) => {
				return (
					<MenuItem key={i} primaryText={v.title} onTouchTap={this.setQuery.bind(this, "classes", v)} />
				)
			});
			content =
				<Well>
					<div className="info-search-well" {...this.page.style("info-search-well") }>
						{options}
					</div>
				</Well>;
		}

		return (
			<div className="info-search-container" {...this.page.style("info-search-container") }>
				<FlatButton className="info-search-fb-divider info-search-flatbutton"
					{...this.page.style("info-search-flatbutton", "info-search-fb-divider") }
					onClick={this.openCollapse.bind(this, 'location')}>
					{location}
				</FlatButton>
				<FlatButton className="info-search-flatbutton"
					{...this.page.style("info-search-flatbutton") }
					onClick={this.openCollapse.bind(this, 'classes')}>
					{classes}
				</FlatButton>
				<Collapse className="info-search-collapse" {...this.page.style("info-search-collapse") }
					in={this.state.collapseOpen}
					transitionAppear={false}
				>
					{content}
				</Collapse>

			</div>
		)
	}
}


const InfoSearchContainer = createContainer(({lists, infoList}) => {

	return {
		subReady: true,
		lists
	};

}, InfoSearch);

function mapStateToProps(state) {
	return {
		lists: state.lists,
		infoList: state.infoList
	};
}

export default connect(mapStateToProps)(InfoSearchContainer);