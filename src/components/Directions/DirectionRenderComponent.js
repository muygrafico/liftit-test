import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { convertLatLngToObj } from '../../utility/helper'
import { mapConstants } from '../../constants/maps.constants'
require('@babel/polyfill')

const { Marker, DirectionsRenderer } = require('react-google-maps')
let googleGeocoder

window.onload = () => {
  // googleGeocoder = new window.google.maps.Geocoder()
}

const geoCoder = (props, callback) => {
  googleGeocoder = new window.google.maps.Geocoder()
  googleGeocoder.geocode({ address: props.values.origin }, (results, status) => {
    // eslint-disable-next-line eqeqeq
    if (status == 'OK') {
      const Lat = results[0].geometry.location.lat()
      const Lng = results[0].geometry.location.lng()
      // eslint-disable-next-line standard/no-callback-literal
      callback({ Lat, Lng })
    } else {
      const error = 'geoCode error :('
      throw error
    }
  })
}

const calculateTimeCost = () => {
  var service = new window.google.maps.DistanceMatrixService()
  service.getDistanceMatrix({
    origins: ['Bogota+Javeriana'],
    destinations: ['Bogota+Centro+Comercial+Andino'],
    travelMode: 'DRIVING',
    avoidHighways: false,
    avoidTolls: false
  }, (result, status) => {
    console.log('DistanceMatrixService', result, status)
  })
}

class DirectionRenderComponent extends Component {
  state = {
    directions: null,
    wayPoints: null,
    currentLocation: null,
    origin: null
  }
  delayFactor = 0

  componentDidUpdate (prevProps) {
    if (prevProps.values !== this.props.values) {
      console.log(this.props.values)
      if (this.props.values && this.props.values.origin) {
        geoCoder(this.props, (data) => {
          let startLoc = data.Lat + ', ' + data.Lng
          let destinationLoc = this.props.to.lat + ', ' + this.props.to.lng
          this.getDirections(startLoc, destinationLoc)
        })
      }
    }
  }

  componentDidMount () {
    const startLoc = this.props.from.lat + ', ' + this.props.from.lng
    const destinationLoc = this.props.to.lat + ', ' + this.props.to.lng
    this.getDirections(startLoc, destinationLoc)
    calculateTimeCost()
  }

  async getDirections (startLoc, destinationLoc, wayPoints = []) {
    const waypts = []
    if (wayPoints.length > 0) {
      waypts.push({
        location: new window.google.maps.LatLng(
          wayPoints[0].lat,
          wayPoints[0].lng
        ),
        stopover: false
      })
    }
    const directionService = new window.google.maps.DirectionsService()
    directionService.route(
      {
        origin: startLoc,
        destination: destinationLoc,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now()), // for the time N milliseconds from now.
          trafficModel: 'optimistic'
        }
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log('result', result)
          this.setState({
            directions: result,
            wayPoints: result.routes[0].overview_path.filter((elem, index) => {
              return index % 30 === 0
            })
          })
        } else if (
          status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
        ) {
          this.delayFactor += 0.2
          // if (this.delayFactor <= 10) this.delayFactor = 0.2
          setTimeout(() => {
            this.getDirections(startLoc, destinationLoc, wayPoints)
          }, this.delayFactor * 200)
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )
  }

  render () {
    let originMarker = null
    let destinationMarker = null
    if (this.state.directions && this.props.index) {
      originMarker = (
        <Marker
          defaultLabel={this.props.index.toString()}
          defaultIcon={null}
          position={{
            lat: parseFloat(this.props.from.lat),
            lng: parseFloat(this.props.from.lng)
          }}
        />
      )
      destinationMarker = (
        <Marker
          label={this.props.index.toString()}
          defaultIcon={null}
          position={{
            lat: parseFloat(this.props.to.lat),
            lng: parseFloat(this.props.to.lng)
          }}
        />
      )
    }
    return (
      <div>
        {originMarker}
        {destinationMarker}
        {this.state.currentLocation && (
          <Marker
            label={this.props.index.toString()}
            position={{
              lat: this.state.currentLocation.lat,
              lng: this.state.currentLocation.lng
            }}
          />
        )}
        {this.state.directions && (
          <DirectionsRenderer
            directions={this.state.directions}
            options={{
              polylineOptions: {
                storkeColor: this.props.storkeColor,
                strokeOpacity: 0.4,
                strokeWeight: 4
              },
              preserveViewport: true,
              suppressMarkers: true,
              icon: { scale: 3 }
            }}
          />
        )}
      </div>
    )
  }
}

// export default DirectionRenderComponent

const mapStateToText = state => ({
  values: state.form.quote.values
})

export const mapDispatch = dispatch => ({
  dispatch: dispatch
})

export default connect(
  mapStateToText,
  mapDispatch
)(withRouter((DirectionRenderComponent)))
