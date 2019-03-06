import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

// const LoggedIn = () => (
//   <div>
//     <h1>Home...YEY! </h1>
//   </div>
// )

const mapStyles = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
  render () {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: -1.2884,
          lng: 36.8233
        }}
      />
    )
  }
}

// export default LoggedIn

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCqlLhE4Fs9dLAiuS65NTTTe_udBr5VfE8'
})(MapContainer)
