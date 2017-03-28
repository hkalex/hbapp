import React, { Component, PropTypes } from 'react';

export default class TagsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || []
    }
  }

  handleClick(value) {
    let selected = this.state.selected || [];
    if (selected.includes(value)) {
      selected.splice(selected.indexOf(value), 1);
    } else {
      selected.push(value);
    }
    this.setState({ selected }, () => {
      this.props.onChange(selected);
    });
  }

  render() {
    const ulCss = {
      listStyle: "none",
      overflow: "hidden",
      padding: "0"
    }

    let liCss = {
      float: "left",
      margin: "4px 5px",
      textAlign: "center",
      padding: "3px 10px",
      border: "1px solid #4388cc",
      borderRadius: "6px"
    }

    const liItem = this.props.tagsData.map((v, i) => {
      if (this.state.selected.includes(v)) {
        liCss = Object.assign({}, liCss, {
          backgroundColor: "#4388cc",
          color: "#fff"
        });
      } else {
        liCss = Object.assign({}, liCss, {
          backgroundColor: "#fff",
          color: "#4388cc"
        });
      }
      return <li key={i} style={liCss} onClick={this.handleClick.bind(this, v)}>{v}</li>;
    });

    return (
      <div>
        <ul style={ulCss}>
          {liItem}
        </ul>
      </div>
    )
  }
}

TagsList.propTypes = {
  tagsData: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}