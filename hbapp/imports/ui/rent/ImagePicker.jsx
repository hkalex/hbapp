import React, { Component, PropTypes } from 'react';

export default class ImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.defaultImages || []
    }
  }

  readFile(file) {
    let images = this.state.images;
    var reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      if (base64) {
        if (images.length < this.props.max) {
          images.push(base64);
          this.setState({ images }, () => {
            this.props.onChange(images);
          });
        }
      }
    }
    reader.readAsDataURL(file);
  }

  fileChange(event) {
    const files = document.querySelector("#" + this.props.id).files;
    for (var i = 0, l = files.length; i < l; i++) {
      this.readFile(files[i]);
    }
    event.target.value = '';
  }

  closeClick(index) {
    let images = this.state.images;
    images.splice(index, 1);
    this.setState({ images }, () => {
      this.props.onChange(images);
    });
  }

  render() {

    const inputDivStyle = {
      position: 'relative',
      width: '8.2rem',
      height: '8.2rem',
      lineHeight: '8.2rem',
      textAlign: 'center',
      border: '.1rem solid #ddd',
      borderRadius: '.3rem',
      float: 'left'
    }

    const inputStyle = {
      position: 'absolute',
      width: '8.2rem',
      height: '8.2rem',
      top: '0',
      left: '0',
      opacity: '0',
      overflow: 'hidden',
      marginRight: '.6rem',
      marginBottom: '.5rem'
    }

    const imgDivStyle = {
      float: "left",
      position: 'relative',
      width: '8.2rem',
      height: '8.2rem',
      borderRadius: '.3rem',
      overflow: 'hidden',
      marginRight: '.6rem',
      marginBottom: '.5rem'
    }

    const imgStyle = {
      width: '8.2rem',
      height: '8.2rem'
    }

    const closeStyle = {
      position: 'absolute',
      top: '.2rem',
      right: '.2rem',
      width: '2rem',
      height: '2rem',
      backgroundColor: '#000',
      textAlign: 'center',
      lineHeight: '2rem',
      opacity: '.5',
      borderRadius: '50%'
    }

    const closeImgStyle = {
      color: '#fff',
      fontSize: '1rem'
    }

    const imagesList = this.state.images.map((v, i) => {
      return (
        <div key={i} style={imgDivStyle}>
          <div style={closeStyle}>
            <i style={closeImgStyle} className="flaticon-delete-cross" onClick={this.closeClick.bind(this, i)}></i>
          </div>
          <img src={v} style={imgStyle} />
        </div>
      );
    });

    return (
      <div>
        <div style={{ overflow: 'hidden' }}>
          {imagesList}
          {this.state.images.length >= this.props.max ? '' :
            <div style={inputDivStyle}>
              <i className="flaticon-plus-symbol" style={{ fontSize: "30px" }}></i>
              <input type="file" id={this.props.id} multiple style={inputStyle} onChange={this.fileChange.bind(this)} />
            </div>}
        </div>
      </div>
    )
  }
}

ImagePicker.propTypes = {
  id: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  defaultImages: PropTypes.array,
  onChange: PropTypes.func.isRequired
}