import React, { Component } from 'react';
import GoogleMap from '/imports/ui/common/GoogleMap';

export default class FriendHome extends Component {
  testClick() {
    console.log('click static map');
  }

  move(lat, lng) {
    console.log(lat, lng);
  }

  render() {
    return (
      <div>
        <div style={{ "height": "300px" }}>
          <GoogleMap id="googleMap" type="map" onMove={this.move.bind(this)} from="-33.9304166,151.1479279" />
        </div>
        <div style={{ "marginTop": "50px" }}>
          <GoogleMap id="googleStaticMap" type="image" onClick={this.testClick.bind(this)} from="-33.9304166,151.1479279" />
        </div>
      </div>
    );
  }
}

