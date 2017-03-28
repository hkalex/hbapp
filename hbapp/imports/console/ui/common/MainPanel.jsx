import React from 'react';

export default class MainPanel extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        {this.props.children}
      </div>
    )
  }
}