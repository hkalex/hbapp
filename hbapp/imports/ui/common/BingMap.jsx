import React, { Component, PropTypes } from 'react';

export default class BingMap extends Component {
  componentDidMount() {
    const self = this;
    window.loadMapScenario = function () {
      const bmap = window.Microsoft.Maps;
      const fromArr = self.props.from.split(',');
      const from = new bmap.Location(fromArr[0], fromArr[1]);

      const map = new bmap.Map(document.getElementById(self.props.id), {
        credentials: 'SENSITY-SENSITY',
        center: from,
        zoom: 16,
        navigationBarMode: bmap.NavigationBarMode.minified
      });

      if (self.props.to) {
        const toArr = self.props.to.split(',');
        const to = new bmap.Location(toArr[0], toArr[1]);
        bmap.loadModule('Microsoft.Maps.Directions', function () {
          var directionsManager = new bmap.Directions.DirectionsManager(map);
          // Set Route Mode to transit
          directionsManager.setRequestOptions({ routeMode: bmap.Directions.RouteMode.transit });
          var waypoint1 = new bmap.Directions.Waypoint({ address: '', location: from });
          var waypoint2 = new bmap.Directions.Waypoint({ address: '', location: to });
          directionsManager.addWaypoint(waypoint1);
          directionsManager.addWaypoint(waypoint2);
          // Set the element in which the itinerary will be rendered
          directionsManager.calculateDirections();
        });
      } else {
        const pushpin = new bmap.Pushpin(from, null);
        map.entities.push(pushpin);
      }
    }
  }

  render() {
    let style;
    if (this.props.type === 'insert') {
      style = {
        width: '100%',
        height: '20rem'
      }
    } else if (this.props.type === 'fullscreen') {
      style = {
        width: '100%',
        height: '100%'
      }
    }
    return (
      <div id={this.props.id} style={style}></div>
    );
  }
}

BingMap.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired
}