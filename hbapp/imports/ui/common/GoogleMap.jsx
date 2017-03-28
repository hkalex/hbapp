import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class GoogleMap extends Component {
  componentDidMount() {
    if (this.props.type === 'map') {
      this.setMap();
    }
  }

  setMap() {
    const self = this;
    const gmap = window.google.maps;
    window.initMap = function () {
      const fromArr = self.props.from.split(',');
      const map = new gmap.Map(document.getElementById(self.props.id), {
        center: { lat: Number(fromArr[0]), lng: Number(fromArr[1]) },
        zoom: 16
      });

      map.addListener('drag', () => {
        self.props.onMove && self.props.onMove(map.getCenter().lat(), map.getCenter().lng());
      });

      if (self.props.to) {
        const toArr = self.props.to.split(',');
        const directionsService = new gmap.DirectionsService;
        const directionsDisplay = new gmap.DirectionsRenderer;
        directionsDisplay.setMap(map);

        directionsService.route({
          origin: new gmap.LatLng(fromArr[0], fromArr[1]),
          destination: new gmap.LatLng(toArr[0], toArr[1]),
          travelMode: gmap.TravelMode.TRANSIT
        }, function (response, status) {
          if (status === gmap.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

      } else {
        const marker = new gmap.Marker({
          position: new gmap.LatLng(fromArr[0], fromArr[1]),
          animation: gmap.Animation.BOUNCE
        });
        marker.setMap(map);
      }
    }
    gmap.event.addDomListener(window, 'load', window.initMap);
  }

  render() {
    let url = '';
    if (Meteor.settings.public.GOOGLE_MAP_REGION === 'cn') {
      url = `https://maps.google.cn/maps/api/staticmap?size=800x400&maptype=roadmap&markers=color:red%7C${this.props.from}&key=${Meteor.settings.public.GOOGLE_MAP_KEY}`;
    } else {
      url = `https://maps.googleapis.com/maps/api/staticmap?size=800x400&maptype=roadmap&markers=color:red%7C${this.props.from}&key=${Meteor.settings.public.GOOGLE_MAP_KEY}`;
    }
    if (this.props.type === 'image') {
      return (
        <div id={this.props.id} onClick={this.props.onClick} style={{ width: "100%", height: "100%" }}>
          <img src={url} style={{ width: "100%" }} />
        </div>
      );
    } else if (this.props.type === 'map') {
      return (
        <div id={this.props.id} style={{ width: "100%", height: "100%" }}></div>
      );
    }
    return (<div></div>);
  }
}

GoogleMap.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  onMove: PropTypes.func
}