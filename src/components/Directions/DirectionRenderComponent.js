import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { convertLatLngToObj } from '../../utility/helper'
import { updateOrigin, updateDestination, updateCenter } from '../../actions/map.actions'
require('@babel/polyfill')

const { Marker, DirectionsRenderer } = require('react-google-maps')
let googleGeocoder

window.onload = () => {
  googleGeocoder = new window.google.maps.Geocoder()
}

const geoCoder = (address, callback) => {
  googleGeocoder.geocode({ address }, (results, status) => {
    // eslint-disable-next-line eqeqeq
    if (status == 'OK') {
      const Lat = results[0].geometry.location.lat()
      const Lng = results[0].geometry.location.lng()
      // eslint-disable-next-line standard/no-callback-literal
      callback(`${Lat}, ${Lng}`)
    } else {
      console.warn(results, status)
    }
  })
}

const calculateTimeCost = (props) => {
  console.log(props)
  const { mapPoints } = props
  let distance
  var service = new window.google.maps.DistanceMatrixService()

  if (mapPoints) {
    const origin = mapPoints.origin ? mapPoints.origin.split(',') : ['', '']
    const origin1 = new window.google.maps.LatLng(Number(origin[0]), Number(origin[1]))
    const destination = mapPoints.destination ? mapPoints.destination.split(',') : ['', '']
    const destination1 = new window.google.maps.LatLng(Number(destination[0]), Number(destination[1]))

    return service.getDistanceMatrix({
      origins: [origin1],
      destinations: [destination1],
      travelMode: 'DRIVING',
      avoidHighways: false,
      avoidTolls: false
    }, (result, status) => {
      console.log('DistanceMatrixService', result)

      distance =
        result &&
        result.rows &&
        result.rows[0] &&
        result.rows[0] &&
        result.rows[0] &&
        result.rows[0].elements &&
        result.rows[0].elements[0] &&
        result.rows[0].elements[0].distance &&
        result.rows[0].elements[0].distance.text ? result.rows[0].elements[0].distance.text : ''
      console.log('distance', distance)
    })
  }
}

class DirectionRenderComponent extends Component {
  state = {
    directions: null,
    wayPoints: null,
    currentLocation: null,
    origin: null,
    delayFactor: 2,
    distance: '',
    cost: ''
  }

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
      this.props.updateCenter('new center')
      calculateTimeCost(this.props)
    }
  }

  componentDidMount () {
    this.getDirections(
      this.props.mapPoints.origin,
      this.props.mapPoints.destination
    )
  }

  async getDirections (startLoc, destinationLoc, wayPoints = []) {
    const directionService = new window.google.maps.DirectionsService()
    directionService.route(
      {
        origin: startLoc,
        destination: destinationLoc,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now()),
          trafficModel: 'optimistic'
        }
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            wayPoints: result.routes[0].overview_path.filter((elem, index) => {
              return index % 30 === 0
            })
          })
        } else if (
          status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
        ) {
          this.state.delayFactor += 0.2
          // if (this.state.delayFactor <= 10) this.state.delayFactor = 0.2
          setTimeout(() => {
            this.getDirections(startLoc, destinationLoc, wayPoints)
          }, this.state.delayFactor * 200)
        } else {
          console.warn(`error fetching directions ${result}`)
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
              icon: { scale: 1 }
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
    updateDestination: (newValue) => dispatch(updateDestination(newValue)),
    updateCenter: (newValue) => dispatch(updateCenter(newValue))
  }
}

export default withRouter(
  connect(
    mapStateToProps, mapDispatchToProps
  )(DirectionRenderComponent)
)
