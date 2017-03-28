import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';

//import JsonStyle from './home.json';
import Styler from '/imports/utils/Styler.js';

class ImageGallery extends Component {

  constructor(props) {
    super(props);

    var self = this;

    this.page = new Styler();

    this.defaultSliderSettings = {
      infinite: true,
      autoplay: true,
      speed: 100,
      dots: true,
      dotsClass: 'dotsStyle',
      arrows: false,
      touchMove: true,
      touchThreshold: 5,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: function (nexIndex) {
        self.setState({ photoIndex: nexIndex });
      }
    };

    this.state = {
      showLightBox: false,
      photoIndex: 0,
    };
  }



  render() {
    var photoIndex = this.state.photoIndex;

    var images = this.props.images;

    var sliderSettings = Object.assign(this.defaultSliderSettings, this.props.settings);

    var imgs = [];
    if (images) {
      for (var i = 0, l = images.length; i < l; i++) {
        imgs.push(
          <img key={"img" + i} {...this.page.style("sliderImg") } src={images[i]} onClick={() => { this.props.enableLightbox && this.setState({ showLightBox: true }) }} />
        );
      }
    }
    var slider = (<Slider {...sliderSettings} >
      {imgs}
    </Slider>
    );

    var lightbox = null;
    if (this.props.enableLightbox && this.state.showLightBox) {
      lightbox = (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}

          onCloseRequest={() => this.setState({ showLightBox: false })}
          onMovePrevRequest={() => this.setState({
            photoIndex: (photoIndex + images.length - 1) % images.length,
          })}
          onMoveNextRequest={() => this.setState({
            photoIndex: (photoIndex + 1) % images.length,
          })}
          enableZoom={false}
        />
      );
    }

    var result = (<div>
      {slider}
      {lightbox}
    </div>
    );

    return result;
  }
}

ImageGallery.PropTypes = {
  settings: PropTypes.object,
  images: PropTypes.array.isRequired,
  enableLightbox: PropTypes.bool
}

export default ImageGallery;