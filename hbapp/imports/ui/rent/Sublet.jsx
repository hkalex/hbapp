import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import { FlatButton, FontIcon, RaisedButton } from 'material-ui';
import { Step, Stepper, StepLabel, } from 'material-ui/Stepper';
import { browserHistory } from 'react-router'

import Sublets from '/imports/db/sublets';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import SubletDetail from './SubletDetail';

// style json
import Styler from '/imports/utils/Styler.js';

// actions
import { submitSubletDialogAction, cancleSubletDialogAction } from '/imports/actions/utils/dialogAction';
import { removeSubletForm } from '/imports/actions/sublet/updateForm';


export class Sublet extends Component {
  constructor(props) {
    super(props);
    let stepIndex = 0;
    console.log(props);
    if (props.subletForm.length !== 0) {
      stepIndex = props.subletForm.step || 0
    }
    this.state = {
      stepIndex: 0,
      subletForm: {},
      child: "s1"
    }

    this.page = new Styler();

  }


  shouldComponentUpdate(nextProps, nextState) {
    // console.log('should component update ?')
    // console.log(nextProps,nextState)

    // This prevents 1 render when data is not yet supplied. 
    if (nextProps.subReady == false) {
      return false;
    }
    return true;
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.subReady) {
      if (!nextProps.subletForm._id) {
        const subletId = Sublets.insert({
          createdBy: Meteor.userId()
        });
        this.setState({ subletForm: Sublets.findOne({ _id: subletId }) });
      } else {
        // if (props.subletForm.step == nextProps.subletForm.step) {
        //   this.setState({ subletForm: nextProps.subletForm, stepIndex: nextProps.subletForm.step || 0 });
        // } else {
        //   this.setState({ subletForm: nextProps.subletForm });
        // }
        this.setState({ subletForm: nextProps.subletForm });

      }
    }
  }

  handleNext(e) {
    if (this.refs.s1) {
      if (this.refs.s1.getWrappedInstance().checkForm()) {
        var _this = this;
        const { stepIndex } = _this.state;
        this.setState({
          stepIndex: stepIndex + 1,
        });
      }
    } else if (this.refs.s2) {
      if (this.refs.s2.getWrappedInstance().checkForm()) {
        var _this = this;
        const { stepIndex } = _this.state;
        this.setState({
          stepIndex: stepIndex + 1,
        });
      }

    } else if (this.refs.s3) {
      if (this.refs.s3.getWrappedInstance().checkForm()) {
        var _this = this;
        const { stepIndex } = _this.state;
        this.setState({
          stepIndex: stepIndex + 1,
        });
      }
    } else if (this.refs.s4) {
      var _this = this;
      const { stepIndex } = _this.state;
      this.setState({
        stepIndex: stepIndex + 1,
      });
    }
    if (this.state.stepIndex == 4) {
      this.props.dispatch(submitSubletDialogAction());
      let subletForm = this.props.subletForm;
      subletForm.status = "pending";
      Sublets.update({ _id: subletForm._id }, { $set: subletForm });
      this.props.dispatch(removeSubletForm());
      this.props.router.push('/me/sublets/list');
    }

  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }



  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Step1 ref="s1" m_sf={this.state.subletForm} />;
      case 1:
        return <Step2 ref="s2" m_sf={this.state.subletForm} />;
      case 2:
        return <Step3 ref="s3" m_sf={this.state.subletForm} />;
      case 3:
        return <Step4 ref="s4" m_sf={this.state.subletForm} />;
      case 4:
        return <SubletDetail ref="s5" subletForm={this.props.subletForm} />;

    }
  }

  onBack() {
    browserHistory.goBack();
  }

  onCancel() {
    this.props.dispatch(cancleSubletDialogAction());
  }



  render() {
    console.log(this.props);
    const { finished, stepIndex } = this.state;

    return (
      <div style={{ position: "fixed", left: "0", top: "0", width: "100%", height: "100%" }}>

        <div className="sublet-header">
          <div className="app-title" {...this.page.style("app-title") }>分租房子</div>
          <FlatButton className="ABButton"
            onTouchTap={this.onBack.bind(this)}
            {...this.page.style("ABButton") }
            icon={<FontIcon className="fa fa-chevron-left ABIcon" {...this.page.style("ABIcon") } />} />
        </div>

        <div className="sublet-step">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel className="stepLabel" style={{ margin: "4px 0 0" }} iconContainerStyle={{ position: "absolute", top: "5rem" }}>地址</StepLabel>
            </Step>
            <Step>
              <StepLabel style={{ margin: "4px 0 0" }} iconContainerStyle={{ position: "absolute", top: "5rem", margin: "0 12px" }} >房子标记</StepLabel>
            </Step>
            <Step>
              <StepLabel style={{ margin: "4px 0 0" }} iconContainerStyle={{ position: "absolute", top: "5rem", margin: "0 12px" }} >详细描述</StepLabel>
            </Step>
            <Step>
              <StepLabel style={{ margin: "4px 0 0" }} iconContainerStyle={{ position: "absolute", top: "5rem", margin: "0 12px" }} >房间情况</StepLabel>
            </Step>
            <Step>
              <StepLabel style={{ margin: "4px 0 0" }} iconContainerStyle={{ position: "absolute", top: "5rem" }} >预览</StepLabel>
            </Step>
          </Stepper>
        </div>

        <div className="sublet-content" style={{ height: "calc(100% - 157px)", overflow: "auto", overflowX: "hidden" }}>
          <div style={{ margin: "0 1rem" }}>{this.props.subReady ? this.getStepContent(stepIndex) : ''}</div>
        </div>

        <div className="sublet-footer">

          <div className="button-group">
            <FlatButton
              style={{ margin: 0, width: "33.33%" }}
              label="取消"
              primary={true}
              onTouchTap={this.onCancel.bind(this)}
            />
            <FlatButton
              style={{ margin: 0, width: "33.33%" }}
              label="上一步"
              primary={true}
              disabled={stepIndex === 0}
              onTouchTap={this.handlePrev.bind(this)}
            />
            <RaisedButton
              style={{ margin: 0, width: "33.33%" }}
              backgroundColor="#4388cc"
              primary={true}
              label={stepIndex === 4 ? '提交' : '下一步'}
              onTouchTap={this.handleNext.bind(this)}
            />
          </div>
        </div>

      </div>
    )
  }
}

const SubletContainer = createContainer(() => {
  const subletSub = Meteor.subscribe('sublets', Meteor.userId());
  const subletForm = Sublets.findOne() || {};
  return {
    subReady: subletSub.ready(),
    subletForm: subletForm || {}
  };
}, Sublet);

const mapStateToProps = (state) => {
  return {
    subletForm: state.subletForm
  };
}

export default connect(mapStateToProps)(SubletContainer);