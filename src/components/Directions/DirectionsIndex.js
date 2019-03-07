import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import DirectionRenderComponent from './DirectionRenderComponent'
import { mapConstants } from '../../constants/maps.constants'
import DummyLocations from '../../utility/dummyLocations'
require('@babel/polyfill')

const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps')
class Directions extends Component {
  state = {
    defaultZoom: 13,
    map: null,
    center: {
      lat: 4.654096081693225,
      lng: -74.06782049957383
    }
  }
  render () {
    return (
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        center={this.state.center}
        defaultCenter={new window.google.maps.LatLng(4.598077, -74.0761028)}
      >
        {DummyLocations.map((elem, index) => {
          return (
            <DirectionRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={elem.from}
              to={elem.to}
            />
          )
        })}
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: mapConstants.G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions)
