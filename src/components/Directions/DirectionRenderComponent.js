import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { convertLatLngToObj } from '../../utility/helper'
import { updateOrigin, updateDestination } from '../../actions/map.actions'
require('@babel/polyfill')
console.log('updateDestination', updateDestination)
const { Marker, DirectionsRenderer } = require('react-google-maps')
let googleGeocoder

window.onload = () => {
  // googleGeocoder = new window.google.maps.Geocoder()
}

const geoCoder = (address, callback) => {
  googleGeocoder = new window.google.maps.Geocoder()
  googleGeocoder.geocode({ address }, (results, status) => {
    // eslint-disable-next-line eqeqeq
    if (status == 'OK') {
      const Lat = results[0].geometry.location.lat()
      const Lng = results[0].geometry.location.lng()
      // eslint-disable-next-line standard/no-callback-literal
      callback(`${Lat}, ${Lng}`)
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
    // console.log('DistanceMatrixService', result, status)
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
      geoCoder(this.props.values.origin, (origin) => {
        this.props.updateOrigin(origin)
      })

      geoCoder(this.props.values.destination, (destination) => {
        this.props.updateDestination(destination)
      })

      this.getDirections(
        this.props.mapPoints.origin,
        this.props.mapPoints.destination
      )
    }
  }

  componentDidMount () {
    this.getDirections(
      this.props.mapPoints.origin,
      this.props.mapPoints.destination
    )
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
          departureTime: new Date(Date.now()),
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
    if (this.props.mapPoints) {
      originMarker = (
        <Marker
          defaultLabel='O'
          position={{
            lat: parseFloat(this.props.mapPoints.origin.split(',')[0]),
            lng: parseFloat(this.props.mapPoints.origin.split(',')[1])
          }}
        />
      )
      destinationMarker = (
        <Marker
          defaultLabel='D'
          position={{
            lat: parseFloat(this.props.mapPoints.destination.split(',')[0]),
            lng: parseFloat(this.props.mapPoints.destination.split(',')[1])
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
              lat: parseFloat(this.props.mapPoints.origin.split(',')[0]),
              lng: parseFloat(this.props.mapPoints.origin.split(',')[1])
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

const mapStateToProps = state => ({
  values: state.form.quote.values,
  mapPoints: state.map
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateOrigin: (newValue) => dispatch(updateOrigin(newValue)),
    updateDestination: (newValue) => dispatch(updateDestination(newValue))
  }
}

export default withRouter(
  connect(
    mapStateToProps, mapDispatchToProps
  )(DirectionRenderComponent)
)
