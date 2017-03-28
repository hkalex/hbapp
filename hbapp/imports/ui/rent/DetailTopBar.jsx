import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
// collections
import ApprovedSublet from '../../db/approvedSublets';
import { FlatButton, FontIcon } from 'material-ui';
import SubletDetail from './SubletDetail'


class SubletDetailHome extends Component {


  constructor(props) {
    super(props);
    this.state = { isShow: false };
    this.showBar = this.showBar.bind(this)
  }
  showBar() {
    let { isShow } = this.state;
    if (window.scrollY > 200) {
      this.setState({
        isShow: true
      })
    } else {
      this.setState({
        isShow: false
      })
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.showBar.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.showBar.bind(this));
  }

  onBack() {
    browserHistory.goBack();
  }

  render() {
    if (this.props.subReady == false) return <div />;

    console.log(this.props);
    const showStyle = {
      position: "fixed",
      left: 0,
      top: 0,
      backgroundColor: "#4388cc",
      width: "100%",
      textAlign: "center",
      fontSize: "2.2rem",
      boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.2)",
      transition: "top .2s",
      lineHeight: "4.4rem",
      height: "4.4rem",
      color: "#fff",
      zIndex: 9
    };

    const hideStyle = {
      position: "absolute",
      top: "-400px"
    }

    let currentStyle = this.state.isShow ? showStyle : hideStyle;

    return (
      <div>
        <div className='header'>
          <div style={currentStyle} > 裸心社 </div>
          <FlatButton
            onTouchTap={this.onBack.bind(this)}
            style={{ position: "fixed", zIndex: 99 }}
            icon={<FontIcon className="icon-arrow-left-circle" style={{ color: "#fff", fontSize: "2.2rem", position: "fixed", top: "1rem", left: "0.5rem" }} />} />
          <FlatButton
            style={{ position: "fixed", right: 0, zIndex: 99 }}
            icon={<FontIcon className="icon-share" style={{ color: "#fff", fontSize: "2rem", position: "fixed", top: "1rem", right: "1rem" }} />} />
        </div>
        <SubletDetail subletForm={this.props.subletForm} />
      </div>
    )
  }
}

const SubletDetailHomeContainer = createContainer(({ params }) => {
  const subletsSub = Meteor.subscribe("subletsList");
  const subletForm = ApprovedSublet.findOne({ _id: ApprovedSublet.ObjectID(params.id) });

  return {
    subReady: subletsSub.ready(),
    subletForm
  }

}, SubletDetailHome);

function mapStateToProps(state) {
  return {
    subletForm: state.subletForm
  }
}

export default connect(mapStateToProps)(SubletDetailHomeContainer);
